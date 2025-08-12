const fs = require("fs");
const readline = require("readline");
const VOCAB_FILE = "vocab.json";
class CustomTokenizer {
    constructor() {
        this.vocab = {};
        this.reverseVocab = {};
        this.nextId = 1;
        this.loadVocab();
    }

    loadVocab() {
        if (fs.existsSync(VOCAB_FILE)) {
            try {
                const raw = fs.readFileSync(VOCAB_FILE, "utf-8").trim();
                if (raw) {
                    const data = JSON.parse(raw);
                    this.vocab = data.vocab || {};
                    this.reverseVocab = data.reverseVocab || {};
                    this.nextId = data.nextId || 1;
                } else {
                    console.warn("vocab.json was empty. Creating fresh vocab.");
                    this.createEmptyVocab();
                }
            } catch (err) {
                console.error("⚠vocab.json is corrupted. Creating fresh vocab.");
                this.createEmptyVocab();
            }
        } else {
            console.log("vocab.json not found. Creating fresh vocab.");
            this.createEmptyVocab();
        }
    }

    createEmptyVocab() {
        this.vocab = {};
        this.reverseVocab = {};
        this.nextId = 1;
        this.saveVocab();
    }

    saveVocab() {
        fs.writeFileSync(
            VOCAB_FILE,
            JSON.stringify(
                {
                    vocab: this.vocab,
                    reverseVocab: this.reverseVocab,
                    nextId: this.nextId
                },
                null,
                2
            )
        );
    }

    splitToSubwords(text) {
        return text.toLowerCase().match(/[a-zA-Z0-9]+|[^\s\w]/g) || [];
    }

    encode(text) {
        const subwords = this.splitToSubwords(text);
        let ids = [];
        for (let sw of subwords) {
            if (!(sw in this.vocab)) {
                this.vocab[sw] = this.nextId;
                this.reverseVocab[this.nextId] = sw;
                this.nextId++;
            }
            ids.push(this.vocab[sw]);
        }
        this.saveVocab();
        return ids;
    }

    decode(idsArray) {
        return idsArray.map(id => this.reverseVocab[id] || "<UNK>").join(" ");
    }
}

const tokenizer = new CustomTokenizer();
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("Custom Tokenizer Console");
console.log("Commands:");
console.log("  encode <text>   → convert text to token IDs");
console.log("  decode <ids>    → convert IDs back to text (IDs space-separated)");
console.log("Press Ctrl+C to exit.\n");

rl.on("line", (input) => {
    const [command, ...rest] = input.trim().split(" ");

    switch (command.toLowerCase()) {
        case "encode": {
            const text = rest.join(" ");
            const encoded = tokenizer.encode(text);
            console.log("Encoded IDs:", encoded.join(" "));
            break;
        }
        case "decode": {
            const ids = rest.map(Number);
            console.log("Decoded:", tokenizer.decode(ids));
            break;
        }
        default:
            console.log("Unknown command. Use 'encode <text>' or 'decode <ids>'.");
    }
});
