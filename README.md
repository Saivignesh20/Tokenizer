# 📝 Custom Tokenizer CLI (Persistent Vocabulary)

This project implements a **simple subword tokenizer** in Node.js that can **encode text into token IDs** and **decode token IDs back into text**, while **persisting the vocabulary** across runs using a `vocab.json` file.

---

## ✨ Features

- **Subword tokenization** using regex: splits words and punctuation separately.
- **Persistent vocabulary** — stores tokens in `vocab.json` so IDs remain consistent across runs.
- **Automatic vocab creation** if `vocab.json` is missing or empty.
- **Error handling** for corrupted vocab files.
- **Command-line interface (CLI)** with `encode` and `decode` commands.

---

## 📂 Project Structure

├── tokenizer.js # Main tokenizer code
├── vocab.json # Persistent vocabulary file (auto-created)
└── README.md # Documentation

1. **Clone the repository**
2.Install Node.js (if not installed)
3.Run the program
 node Tokenizer.js
---
->When you run the script, you'll get an interactive console:
Custom Tokenizer Console
Commands:
  encode <text>   → convert text to token IDs
  decode <ids>    → convert IDs back to text (IDs space-separated)
Press Ctrl+C to exit.

Encode Example
***encode Hello world!*** 
Output:
Encoded IDs: 1 2 3

Decode Example
***decode 1 2 3***
Output:
Decoded: hello world !
