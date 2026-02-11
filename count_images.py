import os

def count_images(directory):
    if not os.path.exists(directory):
        print(f"Error: {directory} does not exist.")
        return

    for emotion in os.listdir(directory):
        emotion_path = os.path.join(directory, emotion)
        if os.path.isdir(emotion_path):
            print(f"{emotion}: {len(os.listdir(emotion_path))} images")

print("Training Set:")
count_images(r"C:\Users\Saisha\OneDrive\Desktop\EmotionDetectionProject\Emotion-detection-main\train")
print("\nTesting Set:")
count_images(r"C:\Users\Saisha\OneDrive\Desktop\EmotionDetectionProject\Emotion-detection-main\test")
