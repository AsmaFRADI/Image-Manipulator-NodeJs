# Endpoint DOCUMENTATTION 

image example: https://visavie.com/app/uploads/2020/10/comment-aider-personnes-agees-au-quotidien-1-42.jpg

#Resizing image
*URL: 
http://localhost:8080/magic-image?url=https://visavie.com/app/uploads/2020/10/comment-aider-personnes-agees-au-quotidien-1-42.jpg&resize=300x200

*Method:
request type: Get

*URL Params: resize=widthxheight

*Success Response:
code: 200
content: resized image 

#Converting images between formats
*URL: 
http://localhost:8080/magic-image?convert=png&url=https://visavie.com/app/uploads/2020/10/comment-aider-personnes-agees-au-quotidien-1-42.jpg

*Method:
request type: Get

*URL Params: convert=image_format(png, jpeg,..)

*Success Response:
code: 200
content: converted image 

#Cropping images
*URL: 
http://localhost:8080/magic-image?crop=90,90,300,200&url=https://visavie.com/app/uploads/2020/10/comment-aider-personnes-agees-au-quotidien-1-42.jpg

*Method:
request type: Get

*URL Params: crop=left,top,width,height

*Success Response:
code: 200
content: cropped image 

#Resampling images to different quality levels
*URL: 
http://localhost:8080/magic-image?resample=100&url=https://visavie.com/app/uploads/2020/10/comment-aider-personnes-agees-au-quotidien-1-42.jpg

*Method:
request type: Get

*URL Params: resample=quality(exp 10,20, ...)

*Success Response:
code: 200
content: Resampled image 

#Rotations
*URL: 
http://localhost:8080/magic-image?rotate=50&url=https://visavie.com/app/uploads/2020/10/comment-aider-personnes-agees-au-quotidien-1-42.jpg

*Method:
request type: Get

*URL Params: rotate=percentage_rotation(exp 10,20, ...)

*Success Response:
code: 200
content: rotated image 

# Filters like grayscale, posterization, etc*
*URL: 
http://localhost:8080/magic-image?filter=grayscale,blur&url=https://visavie.com/app/uploads/2020/10/comment-aider-personnes-agees-au-quotidien-1-42.jpg

*Method:
request type: Get

*URL Params: filter=filter1,filter2,...

*Success Response:
code: 200
content: filtred image 

#AI for facial detection
*URL: 
http://localhost:8080/magic-image?url=https://visavie.com/app/uploads/2020/10/comment-aider-personnes-agees-au-quotidien-1-42.jpg&face

*Method:
request type: Get

*URL Params: face

*Success Response:
code: 200
content: image with detected faces

#NOTE: We can use each parameter individually as I explained above or with other parameters
*example:
we can resize, rotate and filter image:

*URL: 
http://localhost:8080/magic-image?filter=grayscale,blur&rotate=50&url=https://visavie.com/app/uploads/2020/10/comment-aider-personnes-agees-au-quotidien-1-42.jpg&resize=300x200

*Method:
request type: Get

*URL Params: resize=widthxheight,
             rotate=percentage_rotation(exp 10,20, ...)
             filter=filter1,filter2,..

*Success Response:
code: 200
content: image resized, rotated and filtred 

*Error Response:
code: 400
content: An error occured while accessing the image url