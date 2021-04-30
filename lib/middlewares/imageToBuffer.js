const axios = require('axios').default;

const imageHandler = async (req, res, next) => {
    const { query: { url } = null } = req;

    if (!url) return res.status(400).send({ error: { message: 'You need to provide a valid image url.' } })

    try {
        const { imageBuffer, fileExtension } = await axios.get(url, { responseType: 'arraybuffer' })
            .then(({ data, headers }) => {
            return { imageBuffer: Buffer.from(data, 'utf-8'), fileExtension: headers['content-type'].split('/').pop() }
        })

        req.fileName = url.split('/').pop() || `image.${fileExtension}`;

        req.imageBuffer = imageBuffer;

        next()
    } catch (error) {
        return res.status(400).send({ error: { message: 'An error occured while accessing the image url.' } })
    }

}

exports['default'] = imageHandler;
