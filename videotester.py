import os
import cv2
import numpy as np
from keras.preprocessing import image
import warnings
from keras.models import load_model
import time

warnings.filterwarnings("ignore")

# Load the pre-trained model
model = load_model("C:/Users/Saisha/OneDrive/Desktop/EmotionDetectionProject/Emotion-detection-main/best_model.h5")

# Initialize the face detector from OpenCV's Haar-cascade
face_haar_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Initialize the webcam
cap = cv2.VideoCapture(0)

# Set a higher confidence threshold to stabilize predictions
confidence_threshold = 0.85  # You can adjust this based on your preference (0.7 to 0.8 for better stability)

# List of emotions corresponding to the model output
emotions = ('angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral')

# Variables to store the previous predictions for smoothing
prev_prediction = None
prev_emotion = None
prev_confidence = 0

# Smooth the emotion prediction over multiple frames to avoid fluctuating predictions
def get_stable_prediction(predictions, threshold=0.8, temperature=1.5):
    global prev_prediction, prev_emotion, prev_confidence

     # Apply softmax with temperature scaling
    scaled_predictions = np.exp(predictions[0] / temperature)
    scaled_predictions /= np.sum(scaled_predictions)
    
    max_index = np.argmax(predictions[0])
    max_confidence = predictions[0][max_index]
    
    if max_confidence > threshold:
        # If the confidence is above the threshold, use the predicted emotion
        prev_prediction = max_index
        prev_emotion = emotions[max_index]
        prev_confidence = max_confidence
    else:
        # If the confidence is low, keep the previous prediction
        if prev_prediction is not None:
            prev_emotion = emotions[prev_prediction]
    
    return prev_emotion

while True:
    ret, test_img = cap.read()  # Captures frame and returns a boolean and the image
    if not ret:
        continue

    # Convert the image to grayscale
    gray_img = cv2.cvtColor(test_img, cv2.COLOR_BGR2RGB)

    # Detect faces in the image
    faces_detected = face_haar_cascade.detectMultiScale(gray_img, scaleFactor=1.1, minNeighbors=6)

    # Iterate over the detected faces
    for (x, y, w, h) in faces_detected:
        # Draw a rectangle around the detected face
        cv2.rectangle(test_img, (x, y), (x + w, y + h), (255, 0, 0), thickness=7)
        
        # Extract the face region of interest
        roi_gray = gray_img[y:y + w, x:x + h]
        roi_gray = cv2.resize(roi_gray, (224, 224))
        img_pixels = image.img_to_array(roi_gray)
        img_pixels = np.expand_dims(img_pixels, axis=0)
        img_pixels /= 255

        # Predict the emotion from the image
        predictions = model.predict(img_pixels)

        # Get the stable prediction with the set threshold
        predicted_emotion = get_stable_prediction(predictions, threshold=confidence_threshold)

        # Display the predicted emotion on the image
        cv2.putText(test_img, predicted_emotion, (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    # Resize the image for better display
    resized_img = cv2.resize(test_img, (1000, 700))
    
    # Show the image in a window
    cv2.imshow('Facial Emotion Analysis', resized_img)

    # Break the loop when 'q' is pressed
    if cv2.waitKey(10) == ord('q'):
        break

# Release the webcam and close the window
cap.release()
cv2.destroyAllWindows()
