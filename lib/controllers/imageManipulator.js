const fs = require('fs');
const os = require('os');
const sharp = require('sharp');
const faceDetection = require('../services/faceDetection').default;

const resize = (image, width = null, height = null) => {
    return sharp(image).resize(width, height).toBuffer();
};

const convert = (image, format) => {
    return sharp(image).toFormat(format).toBuffer();
};

const crop = (image, left, top, width, height) => {
    return sharp(image).extract({ left, top, width, height }).toBuffer();
};

const resample = async (image, quality) => {
    let tempImage = image;

    const qualityPercentage = quality && Boolean(parseInt(quality)) ? parseInt(quality) : 100;

    // Getting the image original width
    const originalWidth = await sharp(image)
        .metadata()
        .then(({ width }) => width);

    if (qualityPercentage > 0 && qualityPercentage < 100) {
        tempImage = await sharp(tempImage)
            .resize((originalWidth * qualityPercentage) / 100)
            .toBuffer();

        tempImage = await sharp(tempImage).resize(originalWidth).toBuffer();
    }

    return tempImage;
};

const rotate = (image, angle) => {
    return sharp(image).rotate(angle).toBuffer();
};

const filter = async (image, filters = []) => {
    let tempImage = image;

    for (const filterItem of filters) {
        try {
            if (sharp(tempImage)[filterItem]) {
                tempImage = await sharp(tempImage)[filterItem]().toBuffer();
            }
        } catch (e) {}
    }

    return tempImage;
};

const imageManipulator = async ({ query, imageBuffer, fileName }, res) => {
    if (!imageBuffer) return res.status(500).send({ error });

    let localImageBuffer = imageBuffer;

    const queries = Object.keys(query);

    for (const param of queries) {
        if (param === 'resize') {
            let [width, height] = query[param].split('x');

            width = width && Boolean(parseInt(width)) ? parseInt(width) : null;
            height = height && Boolean(parseInt(height)) ? parseInt(height) : null;

            localImageBuffer = await resize(localImageBuffer, width, height);
        }

        if (param === 'convert') {
            localImageBuffer = await convert(localImageBuffer, query[param]);
        }

        if (param === 'crop') {
            let [left, top, width, height] = query[param].split(',');

            left = left && Boolean(parseInt(left)) ? parseInt(left) : null;
            top = top && Boolean(parseInt(top)) ? parseInt(top) : null;
            width = width && Boolean(parseInt(width)) ? parseInt(width) : null;
            height = height && Boolean(parseInt(height)) ? parseInt(height) : null;

            localImageBuffer = await crop(localImageBuffer, left, top, width, height);
        }

        if (param === 'resample') {
            if (Boolean(parseInt(query[param]))) {
                localImageBuffer = await resample(localImageBuffer, parseInt(query[param]));
            }
        }

        if (param === 'rotate') {
            if (Boolean(parseInt(query[param]))) {
                localImageBuffer = await rotate(localImageBuffer, parseInt(query[param]));
            }
        }

        if (param === 'filter') {
            const filters = query[param].split(',');

            localImageBuffer = await filter(localImageBuffer, filters);
        }

        if (param === 'face') {
            localImageBuffer = await faceDetection(localImageBuffer)
        }
    }

    const tempDir = os.tmpdir();

    fs.writeFileSync(`${tempDir}/${fileName}`, localImageBuffer);

    return res.status(200).download(`${tempDir}/${fileName}`);
};

exports['default'] = imageManipulator;
