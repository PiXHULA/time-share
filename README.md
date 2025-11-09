# 🕒 TimeShare
Share a timer with a friend and be on time together.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

---

### 🧰 Prerequisites

Make sure you have the following installed:

- **Node.js** v22.18.0 or later  
- **npm** or **yarn** (comes with Node.js)  
- **Expo CLI** v11.6.2  

If you don’t have Expo CLI yet, install it globally:
```bash
npm install -g expo
```

You can verify your versions:
```bash
node -v
npm -v
expo --version
```

---

### 📦 Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd TimeShare
npm install
# or
yarn install
```

---

### ▶️ Running the App

Start the Expo development server:

```bash
npx expo start
```
or
```bash
npm start
```

This will open the **Expo Developer Tools** in your browser.

You can then:

- Press **`i`** to run on iOS Simulator (macOS only)
- Press **`a`** to run on Android Emulator
- Scan the QR code in the terminal or browser using the **Expo Go** app on your phone

📱 **Expo Go App:**  
- iOS: [Download on the App Store](https://apps.apple.com/app/expo-go/id982107779)  
- Android: [Get it on Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

---

### 🧹 Optional: Clearing Cache

If you encounter issues, clear the Metro bundler cache:

```bash
npx expo start -c
```

---

### 🧪 Running on a physical device

1. Connect your phone and computer to the same Wi-Fi network.  
2. Open the **Expo Go** app.  
3. Scan the QR code displayed in your terminal or browser.

---

### 🧱 Building the App (optional)

To build a standalone app:

```bash
npx expo prebuild
npx expo run:android
# or
npx expo run:ios
```

---
