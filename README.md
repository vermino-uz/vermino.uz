# vermino.uz

A modern, interactive terminal-based personal website with a unique macOS-inspired lock screen interface. Built with vanilla JavaScript, HTML, and CSS, this website combines the aesthetics of a terminal with the security of a lock screen.

## Features

### Lock Screen
- 🔒 Secure password protection
- 🖼️ Custom user icon display
- 🎨 Modern blur effect and gradient background
- ⌨️ Interactive password input with visual feedback
- 🔄 Smooth transition animations

### Terminal Interface
- 💻 Fully functional terminal emulator
- 🎵 Built-in music player with playlist support
- 🖱️ Draggable terminal window (stays within viewport)
- 🎨 macOS-inspired design with blur effects
- 📱 Responsive layout for all screen sizes

### Security Features
- 🛡️ Protected against dev tools inspection
- 🔒 Anti-debugging measures
- 🚫 Disabled source code viewing
- 💪 Robust input validation

### Dock
- 📱 Social media quick links
- 💬 Telegram integration
- 🖥️ Terminal quick access
- ✨ Hover effects and tooltips

## Technical Details

### Built With
- HTML5
- CSS3 (with modern features like backdrop-filter)
- Vanilla JavaScript
- Git LFS for media files

### File Structure
```
├── index.html           # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Terminal and lock screen logic
├── images/             # Icons and background images
└── music/              # Audio files for music player
```

### Commands
The terminal supports various commands:
- `help` - List all available commands
- `play` - Play music from the playlist
- `pause` - Pause current music
- `whoami` - Display user information
- `clear` - Clear terminal screen

## Development

### Prerequisites
- Modern web browser with CSS backdrop-filter support
- Git LFS for handling large media files

### Setup
1. Clone the repository
```bash
git clone https://github.com/vermino-uz/vermino.uz.git
```

2. Install Git LFS
```bash
brew install git-lfs  # For macOS
git lfs install
```

3. Pull LFS files
```bash
git lfs pull
```

### Running Locally
Simply open `index.html` in a modern web browser or use a local server:
```bash
python -m http.server 8000
```

## License
MIT License - feel free to use and modify as you wish!

## Author
Elbek Shukurullayev (vermino)
- Telegram: [@vermino](tg://resolve?domain=vermino)

---

🔐 Default password: `root`
