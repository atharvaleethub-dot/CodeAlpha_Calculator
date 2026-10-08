# CodeAlpha Calculator

A clean, responsive calculator built with **React**, **Vite** and **Tailwind CSS**. It was created as Task 2 of the **CodeAlpha Frontend Development Internship**.

It supports mouse, touch and keyboard input, and works on mobile, tablet and desktop screens.

## Features

- Display screen with a running expression line and a large result line
- Number buttons `0-9` and a decimal point
- Operation buttons: addition, subtraction, multiplication and division
- Clear (`C`), Backspace (`⌫`) and Percent (`%`) buttons
- Equals button with instant, accurate results
- Chained calculations, for example `5 + 3 × 2 =`
- Negative number support
- Division-by-zero handling with a clear error message
- Floating-point rounding fix, so `0.1 + 0.2` shows `0.3`
- Input limit of 12 digits, with automatic font shrinking for long numbers
- Safe calculation logic (no `eval()`)
- Accessible buttons with `aria-label`, visible focus states and a live-updating display

## Technologies Used

- React.js
- Vite
- Tailwind CSS
- JavaScript (ES6+)
- HTML (JSX)
- npm

## Calculator Operations

| Operation      | Symbol | Example      |
| -------------- | ------ | ------------ |
| Addition       | `+`    | `5 + 5 = 10` |
| Subtraction    | `−`    | `10 − 4 = 6` |
| Multiplication | `×`    | `6 × 3 = 18` |
| Division       | `÷`    | `20 ÷ 5 = 4` |
| Percent        | `%`    | `50 % = 0.5` |

## Keyboard Support

| Key                  | Action                |
| -------------------- | --------------------- |
| `0` - `9`            | Enter a digit         |
| `.`                  | Decimal point         |
| `+`                  | Add                   |
| `-`                  | Subtract              |
| `*`                  | Multiply              |
| `/`                  | Divide                |
| `%`                  | Percent               |
| `Enter` or `=`       | Calculate the result  |
| `Backspace`          | Delete the last digit |
| `Escape`             | Clear everything      |

## Responsive Design

The layout adapts to different screen sizes using Tailwind's responsive classes. It was tested at these widths:

`320px` · `375px` · `425px` · `768px` · `1024px` · `1440px`

- The calculator stays centered on every screen
- Buttons stay large enough to tap on small phones
- There is no horizontal scrolling at any width
- Buttons have hover, active and focus effects with smooth transitions

## How to Run Locally

**Requirements:** [Node.js](https://nodejs.org) (LTS version) and Git.

```bash
# 1. Clone the repository
git clone https://github.com/atharvaleethub-dot/CodeAlpha_Calculator.git

# 2. Go into the project folder
cd CodeAlpha_Calculator

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Other commands

```bash
npm run build     # create a production build in the dist folder
npm run preview   # preview the production build locally
npm run lint      # check the code for problems
```

## Project Structure

```text
CodeAlpha_Calculator/
├── public/
├── src/
│   ├── components/
│   │   ├── Button.jsx        # Reusable calculator button
│   │   ├── Calculator.jsx    # Calculator logic, keyboard support and layout
│   │   └── Display.jsx       # Expression and result display
│   ├── App.jsx               # Page layout
│   ├── index.css             # Tailwind CSS import and base styles
│   └── main.jsx              # React entry point
├── index.html
├── eslint.config.js
├── package.json
├── vite.config.js
└── README.md
```

## GitHub Repository

- **Repository name:** `CodeAlpha_Calculator`
- **Repository URL:** https://github.com/atharvaleethub-dot/CodeAlpha_Calculator

## Author

Built by **Atharva** as part of the CodeAlpha Frontend Development Internship.

GitHub: [@atharvaleethub-dot](https://github.com/atharvaleethub-dot)