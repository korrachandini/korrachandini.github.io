# Wabi-Sabi Inspired Portfolio Website

A minimalist, aesthetic portfolio website for architects, artists, and craftspeople. The design embraces the Japanese aesthetic principles of wabi-sabi, celebrating imperfection, natural materials, and the beauty of age and impermanence.

## Features

- Clean, minimalist design with organic elements
- Responsive layout for all devices
- Subtle animations and transitions
- Portfolio section with filtering capability
- Wabi-Sabi inspired design elements:
  - Subtle texture overlays
  - Handwritten typography accents
  - Intentional asymmetry
  - Natural color palette

## Pages

1. **Home** - A welcoming introduction with featured works
2. **About** - Personal information, skills, and experience
3. **Work** - Portfolio with filterable projects
4. **Contact** - Contact form and information

## Getting Started

### Local Setup

1. Clone or download this repository
2. Open the files in your preferred code editor
3. For local development, you can use a simple development server

For example, using Python:

```bash
# If you have Python installed
cd aesthetic-portfolio
python -m http.server
```

Then visit `http://localhost:8000` in your browser.

## Customization

### Content

1. Replace placeholder text in HTML files with your own content
2. Update the navigation links if you change page names
3. Replace "Architect Name" with your actual name throughout the files

### Images

1. Replace placeholder elements with your own images
2. Recommended image sizes:
   - Hero image: 1500px width (maintain aspect ratio)
   - Portfolio thumbnails: 600px width, 400px height
   - About page image: 500px width, 700px height

### Styling

The website uses a customizable color scheme defined in CSS variables. To modify the color palette:

1. Open `css/style.css`
2. Find the `:root` section at the top
3. Update the following variables as desired:
   - `--color-paper`: Background color
   - `--color-ink`: Main text color
   - `--color-earth-dark`: Secondary dark color
   - `--color-earth-light`: Secondary light color
   - `--color-accent`: Primary accent color
   - `--color-accent-muted`: Secondary accent color
   - `--color-accent-light`: Tertiary accent color

### Fonts

The website uses Google Fonts. To change them:

1. Update the Google Fonts link in the HTML head sections
2. Update the corresponding font variables in CSS:
   - `--font-serif`
   - `--font-sans`
   - `--font-handwritten`

## Deploying to GitHub Pages

1. Create a GitHub repository
2. Push your code to the repository
3. Go to the repository settings
4. Scroll down to the GitHub Pages section
5. Select the branch you want to deploy (usually `main`)
6. Your site will be published at `https://yourusername.github.io/repository-name/`

## Credits

- Fonts: Google Fonts (Cormorant Garamond, Work Sans, Shadows Into Light)
- Icons: Text-based links with CSS styling
- Inspiration: Japanese wabi-sabi aesthetic principles

## License

This project is available for personal and commercial use. 