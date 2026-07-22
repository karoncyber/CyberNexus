# CyberNexus

A collection of lightweight, browser based cybersecurity tools for developers, students, and security enthusiasts. No frameworks, no build step, no backend everything runs client-side in vanilla HTML, CSS, and JavaScript, so nothing you type ever leaves your browser.

## Live Demo

Enable GitHub Pages for this repo (Settings → Pages → Deploy from branch → `main` / `root`) and it will be served directly, since `index.html` sits at the project root.

## Tools

### Password Tools
- **Password Generator** - configurable length, numbers, and symbols, with a live strength meter
- **Password Strength Checker** - checks length, character variety, common passwords, keyboard patterns, and sequences
- **Hash Generator** - SHA-1, SHA-256, and SHA-512 via the Web Crypto API

### Encoding Tools
- **Base64 Tool** - UTF-8 safe encode/decode
- **URL Encoder / Decoder** - component or full-URI encoding
- **JWT Decoder** - decodes header and payload, flags expiry (no signature verification, decode-only)

### Network Tools
- **Subnet Calculator** - network/broadcast address, subnet mask, wildcard mask, and usable host range from an IP + CIDR
- **IP Converter** - IPv4 to binary, hex, and decimal
- **My IP Address** - looks up your public IP via [ipify](https://www.ipify.org/)

### Web Security
- **Security Headers Analyzer** - checks pasted response headers against common security header best practices
- **Cookie Analyzer** - inspects a `Set-Cookie` string for `Secure`, `HttpOnly`, and `SameSite`
- **CSP Analyzer** - breaks down a `Content-Security-Policy` header and flags risky directives

## Project Structure

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── background.js
│   └── ... (one file per tool)
└── pages/
    └── ... (one page per tool + category pages)
```

## Running Locally

No build step required. Either open `index.html` directly in a browser, or serve the folder so relative paths and `fetch` calls behave normally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Tech

Vanilla HTML5, CSS3, and JavaScript (ES6+). Uses the native Web Crypto API for hashing and Canvas 2D for the background animation.

## License

MIT — see [LICENSE](LICENSE).
