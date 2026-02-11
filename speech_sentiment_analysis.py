import speech_recognition as sr
from textblob import TextBlob

# Function to analyze speech sentiment
def analyze_speech_sentiment():
    # Initialize recognizer class (for recognizing the speech)
    recognizer = sr.Recognizer()

    # Use the microphone as the audio source
    with sr.Microphone() as source:
        print("Say something...")
        # Listen for the first phrase and store it as audio data
        audio = recognizer.listen(source)

    try:
        # Recognize the speech using Google's speech recognition
        speech_text = recognizer.recognize_google(audio)
        print("You said: " + speech_text)

        # Perform sentiment analysis using TextBlob
        blob = TextBlob(speech_text)
        sentiment = blob.sentiment.polarity  # returns a value between -1 (negative) and 1 (positive)

        # Classify the sentiment
        if sentiment > 0:
            return "Positive"
        elif sentiment < 0:
            return "Negative"
        else:
            return "Neutral"
    
    except sr.UnknownValueError:
        print("Sorry, I couldn't understand your speech.")
        return "Uncertain"
    except sr.RequestError as e:
        print(f"Could not request results; {e}")
        return "Error"
