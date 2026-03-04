# ENGLISH <img width="25px" src="./assets/logo.png" alt="English Janala Logo"/> JANALA

Welcome to the **English Janala** project! This project aims to build an interactive vocabulary learning application.

---

## ⚡ API Endpoints

Here are the API endpoints used to fetch curriculum levels and vocabulary data:

1. **Get All Levels**

   ```bash
   https://openapi.programming-hero.com/api/levels/all
   ```

2. **Get Words by Level**
   _Endpoint Pattern_: `https://openapi.programming-hero.com/api/level/{id}`

   ```bash
   https://openapi.programming-hero.com/api/level/5
   ```

3. **Get Word Details**
   _Endpoint Pattern_: `https://openapi.programming-hero.com/api/word/{id}`

   ```bash
   https://openapi.programming-hero.com/api/word/5
   ```

4. **Get All Words**
   ```bash
   https://openapi.programming-hero.com/api/words/all
   ```

---

## 🛠️ Work To Do

### 1. Show Levels on the UI

- [ ] Show a center-aligned heading as per the Figma design.
- [ ] Create dynamically generated buttons from **API-01 (All Levels)** for each lesson/level.
- [ ] Ensure the lesson buttons are displayed automatically on page load.
- [ ] Create functionality to highlight the active lesson button.

### 2. Show Word Cards Based on Level

- [ ] Show default text in the Vocabulary section initially before any level is selected.
- [ ] On clicking a specific lesson button, load all the words from **API-02 (Words by Level)**.
- [ ] Display all words for a selected lesson in a card format, showing:
  - [ ] Word
  - [ ] Word meaning & pronunciation
  - [ ] Two buttons with relevant icons (as per Figma).
- [ ] Show a **"No Word Found"** message if no words exist for a lesson.

### 3. Highlight the Active Level Button

- [ ] After successfully loading words for a level, visually differentiate the active button so the user can easily understand which level they are currently browsing.

### 4. Vocabulary Details Modal

- [ ] Open a modal when clicking the details icon on a word card.
- [ ] Load modal data from **API-03 (Word Details)**.
- [ ] The modal should display:
  - [ ] Word with pronunciation
  - [ ] Example sentence
  - [ ] Synonyms
  - [ ] A "Complete Learning" button to close the modal

### 5. Handle Invalid Data

- [ ] Avoid displaying falsy values like `undefined` or `null` in the UI.
- [ ] Display a relevant message or fallback UI if no data is found for specific fields.

### 6. Loading Spinner

- [ ] Create a loading spinner that runs while vocabulary data is being fetched from the API.

### 7. Search Functionality

- [ ] Add an input box for searching.
- [ ] As the user types (on change), search the available words and live-update the UI.
- [ ] If a user starts a search, reset the active lesson button state (since they are no longer purely browsing a specific level).

### 8. Save Words Feature

- [ ] Add a `Heart icon` button to the word card UI.
- [ ] On click, store the word as "Saved".
- [ ] Display all saved words in a separate, dedicated section.

### 9. Pronounce Vocabularies

- [ ] Create functionality for text-to-speech pronunciation of vocabulary words.
- [ ] Implement this feature to trigger when clicking the sound icon using the following function:

```javascript
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US"; // English (US)
  window.speechSynthesis.speak(utterance);
}
```
