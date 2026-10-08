import io

import numpy as np
import tensorflow as tf
from PIL import Image


class Classifier:

    def __init__(self, model_path: str):
        self.interpreter = tf.lite.Interpreter(
            model_path = model_path
        )

        self.interpreter.allocate_tensors()

        self.input_details = (
            self.interpreter.get_input_details()
        )

        self.output_details = (
            self.interpreter.get_output_details()
        )

    async def classify(self, file):

        contents = await file.read()

        image = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        image = image.resize((128, 128))

        image = np.array(
            image,
            dtype=np.float32
        )

        image = np.expand_dims(
            image,
            axis=0
        )

        self.interpreter.set_tensor(
            self.input_details[0]["index"],
            image
        )

        self.interpreter.invoke()

        output = self.interpreter.get_tensor(
            self.output_details[0]["index"]
        )

        garantido = float(output[0][0])
        caprichoso = float(output[0][1])

        if garantido >= caprichoso:
            classe = "Garantido"
            confianca = garantido
        else:
            classe = "Caprichoso"
            confianca = caprichoso

        return {
            "classe": classe,
            "confianca": confianca,
            "probabilidades": {
                "Garantido": garantido,
                "Caprichoso": caprichoso
            }
        }


classifier = Classifier(
    "models/model.tflite"
)