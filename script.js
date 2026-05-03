/* =========================
   KEY GENERATOR
========================= */

class KeyGenerator {
  constructor() {
    this.prefixInput = document.getElementById("prefix");
    this.lengthInput = document.getElementById("length");
    this.typeSelect = document.getElementById("keyType");
    this.generateBtn = document.getElementById("generateBtn");
    this.outputDiv = document.getElementById("output");
    this.outputValue = document.getElementById("outputValue");
    this.copyBtn = document.getElementById("copyBtn");
    this.messageDiv = document.getElementById("message");

    this.init();
  }

  /* =========================
     INIT
  ========================= */
  init() {
    this.generateBtn.addEventListener("click", () => this.generate());
    this.copyBtn.addEventListener("click", () => this.copyToClipboard());
  }

  /* =========================
     GENERATE KEY
  ========================= */
  generate() {
    const prefix = this.prefixInput.value || "";
    const length = parseInt(this.lengthInput.value) || 16;
    const type = this.typeSelect.value;

    if (length < 1 || length > 1000) {
      this.showMessage("Length must be between 1 and 1000", "error");
      return;
    }

    let key = "";

    switch (type) {
      case "alphanumeric":
        key = this.generateAlphanumeric(length);
        break;
      case "numeric":
        key = this.generateNumeric(length);
        break;
      case "hex":
        key = this.generateHex(length);
        break;
      case "uuid":
        key = this.generateUUID();
        break;
      case "alpha":
        key = this.generateAlpha(length);
        break;
      default:
        key = this.generateAlphanumeric(length);
    }

    const finalKey = prefix + key;
    this.outputValue.textContent = finalKey;
    this.outputDiv.classList.add("show");
    this.showMessage("Key generated successfully!", "success");
  }

  /* =========================
     ALPHANUMERIC
  ========================= */
  generateAlphanumeric(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return this.randomString(chars, length);
  }

  /* =========================
     NUMERIC
  ========================= */
  generateNumeric(length) {
    const chars = "0123456789";
    return this.randomString(chars, length);
  }

  /* =========================
     HEXADECIMAL
  ========================= */
  generateHex(length) {
    const chars = "0123456789abcdef";
    return this.randomString(chars, length);
  }

  /* =========================
     ALPHABETIC
  ========================= */
  generateAlpha(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return this.randomString(chars, length);
  }

  /* =========================
     UUID v4
  ========================= */
  generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /* =========================
     RANDOM STRING
  ========================= */
  randomString(chars, length) {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /* =========================
     COPY TO CLIPBOARD
  ========================= */
  copyToClipboard() {
    const text = this.outputValue.textContent;

    if (!text) {
      this.showMessage("No key to copy", "error");
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      this.showMessage("Copied to clipboard!", "success");
      this.copyBtn.textContent = "Copied!";
      setTimeout(() => {
        this.copyBtn.textContent = "Copy Key";
      }, 2000);
    }).catch(() => {
      this.showMessage("Failed to copy", "error");
    });
  }

  /* =========================
     SHOW MESSAGE
  ========================= */
  showMessage(text, type) {
    this.messageDiv.textContent = text;
    this.messageDiv.className = `message show ${type}`;

    setTimeout(() => {
      this.messageDiv.classList.remove("show");
    }, 3000);
  }
}

/* =========================
   INIT ON LOAD
========================= */
document.addEventListener("DOMContentLoaded", () => {
  new KeyGenerator();
});
