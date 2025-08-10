# Russian Word Gender Identifier

A minimal web application for identifying the grammatical gender of Russian words.

https://ru-word-gender.vercel.app

## Features

- Real-time gender identification as you type
- Support for Russian and English interfaces
- Clean, distraction-free design
- Handles common exceptions and special cases
- Visual feedback for invalid input

## Usage

Enter any Russian word in Cyrillic script to identify whether it is masculine, feminine, or neuter. The app uses standard grammatical rules and patterns to determine gender based on word endings.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Rules

The application identifies gender based on standard Russian grammar patterns:

- **Masculine**: Words ending in consonants or -й
- **Feminine**: Words ending in -а, -я, or soft sign (ь)
- **Neuter**: Words ending in -о, -е, or -ё

Special handling for exceptions like папа (masculine despite -а ending) and время (neuter despite -я ending).

## Technologies

Built with React and Vite for optimal performance and development experience.
