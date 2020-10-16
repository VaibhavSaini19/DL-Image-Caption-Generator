from flask import Flask, request
from flask_cors import CORS, cross_origin

import json
import io
from PIL import Image
import cv2
import base64
import numpy as np


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['POST'])
@cross_origin()
def hello():
    data = request.data
    imgdata = base64.b64decode(data[22:])
    image = Image.open(io.BytesIO(imgdata))
    # print(np.array(image))
    image.save('my.png')
    return json.dumps("Hello World!")

if __name__ == '__main__':
    app.run(port=3001)