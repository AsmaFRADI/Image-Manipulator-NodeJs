const faceapi = require('face-api.js');
const canvas = require('canvas');

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const faceDetectionNet = faceapi.nets.ssdMobilenetv1;

// SsdMobilenetv1Options
const minConfidence = 0.5;

// TinyFaceDetectorOptions
const inputSize = 408;
const scoreThreshold = 0.5;

function getFaceDetectorOptions(net) {
    return net === faceapi.nets.ssdMobilenetv1 ? new faceapi.SsdMobilenetv1Options({ minConfidence }) : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold });
}

const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet);

const faceDetection = async imageBuffer => {
    await faceDetectionNet.loadFromDisk('./lib/services/weights');

    const img = await canvas.loadImage(imageBuffer);
    const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);

    const out = faceapi.createCanvasFromMedia(img);
    faceapi.draw.drawDetections(out, detections);

    return out.toBuffer();
};

exports['default'] = faceDetection;
