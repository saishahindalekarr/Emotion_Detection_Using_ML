import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from flask import Flask, render_template, Response

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TensorFlow logs
import tensorflow as tf
tf.get_logger().setLevel('ERROR')  # Suppress detailed logs


app = Flask(__name__)

# Load pre-trained emotion detection model
model = load_model(r"C:\Users\Saisha\OneDrive\Desktop\EmotionDetectionProject\Emotion-detection-main\best_model.h5")

# Load Haar Cascade classifier for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Define class labels for emotions
emotion_labels = ["Angry", "Disgust", "Fear", "Happy", "Neutral", "Sad", "Surprise"]

# Initialize the webcam
camera = cv2.VideoCapture(0)  # Change to 1 if using an external webcam

def generate_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.3, 5)

            for (x, y, w, h) in faces:
                face_roi = gray[y:y + h, x:x + w]  # Extract face region
                face_roi = cv2.resize(face_roi, (224, 224))  # Resize to match model input shape
                face_roi = np.expand_dims(face_roi, axis=-1)  # Add channel dimension (grayscale)
                face_roi = np.repeat(face_roi, 3, axis=-1)  # Convert grayscale to 3-channel RGB
                face_roi = np.expand_dims(face_roi, axis=0)  # Add batch dimension
                face_roi = face_roi / 255.0  # Normalize pixel values

                # Predict emotion
                # prediction = model.predict(face_roi)
                prediction = model.predict(face_roi, verbose=0)  # Disable progress bar

                emotion_label = emotion_labels[np.argmax(prediction)]

                # Draw rectangle and label on frame
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
                cv2.putText(frame, emotion_label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX,
                            0.9, (255, 255, 255), 2)

            # Encode and yield frame
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

# New page
@app.route('/quiz')
def quiz():
    return render_template("quiz.html")

# dropdown menu
@app.route("/article1")
def article1():
    return render_template("article1.html")

@app.route("/article2")
def article2():
    return render_template("article2.html")  

# new quiz pages
@app.route('/relationship_quiz')
def relationship_quiz():
    return render_template("relationship_quiz.html")

@app.route('/depression_quiz')
def depression_quiz():
    return render_template("depression_quiz.html")

@app.route('/anxiety_quiz')
def anxiety_quiz():
    return render_template("anxiety_quiz.html")

@app.route('/ocd_quiz')
def ocd_quiz():
    return render_template("ocd_quiz.html")

@app.route('/breathing')
def breathing():
    return render_template('breathing.html')

if __name__ == "__main__":
    app.run(debug=True)



