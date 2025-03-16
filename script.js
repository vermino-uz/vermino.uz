// Global mobile detection
let isMobileView = window.innerWidth <= 768;

// Dev tools detection and prevention
function blockDevTools() {
    // Detect debugger statements
    setInterval(function() {
        debugger;
    }, 100);

    // Override properties used for dev tools detection
    Object.defineProperty(window, 'console', {
        get: function() {
            if (window.outerHeight - window.innerHeight > 160) {
                document.documentElement.innerHTML = '';
                window.location.reload();
            }
            return {};
        }
    });

    // Detect source inspection
    (() => {
        function detectInspect() {
            const element = document.createElement('div');
            Object.defineProperty(element, 'id', {
                get: function() {
                    document.documentElement.innerHTML = '';
                    window.location.reload();
                    return '';
                }
            });
            console.log(element);
        }
        setInterval(detectInspect, 1000);
    })();

    // Detect right click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Detect keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Block common dev tools shortcuts
        if (
            // CMD + Option + I (Mac)
            (e.metaKey && e.altKey && e.code === 'KeyI') ||
            // CMD + Option + J (Mac)
            (e.metaKey && e.altKey && e.code === 'KeyJ') ||
            // CMD + Option + C (Mac)
            (e.metaKey && e.altKey && e.code === 'KeyC') ||
            // CMD + Shift + C (Mac)
            (e.metaKey && e.shiftKey && e.code === 'KeyC') ||
            // F12
            e.code === 'F12' ||
            // CMD + Shift + I
            (e.metaKey && e.shiftKey && e.code === 'KeyI')
        ) {
            e.preventDefault();
            return false;
        }
    });

    // Detect dev tools using window size
    let devtools = function() {};
    devtools.toString = function() {
        blockDevTools();
        return '';
    };

    // Detect using console.log
    setInterval(function() {
        console.log(devtools);
        console.clear();
    }, 100);

    // Additional dev tools detection
    function detectDevTools() {
        if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
            document.documentElement.innerHTML = '';
            window.location.reload();
        }
    }

    setInterval(detectDevTools, 1000);
}

// Initialize dev tools blocking
blockDevTools();

// Prevent view source
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.code === 'KeyU' || e.code === 'KeyS')) {
        e.preventDefault();
        return false;
    }
});

// Disable selection
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

// Disable drag and drop of elements
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

// Disable copy
document.addEventListener('copy', function(e) {
    e.preventDefault();
    return false;
});

// Handle unlock
const correctPassword = 'root'; // You can change this to any password

function unlockScreen() {
    const lockScreen = document.getElementById('lock-screen');
    const terminal = document.querySelector('.terminal');
    const dock = document.querySelector('.dock');
    const terminalContent = document.querySelector('.terminal-content');
    
    // Add hidden class for smooth transition
    lockScreen.classList.add('hidden');
    terminal.style.display = 'block';
    dock.style.display = 'block';
    
    // Enable terminal input
    terminalContent.style.pointerEvents = 'auto';
    
    // Remove the lock screen element after transition
    setTimeout(() => {
        lockScreen.style.display = 'none';
    }, 500);

    // Show welcome message
    const welcomeOutput = createOutput(commands.whoami());
    terminalContent.appendChild(welcomeOutput);

    // Create initial terminal line
    const line = createLine();
    terminalContent.appendChild(line);
    line.querySelector('.command').focus();
}

function showError() {
    const input = document.querySelector('.password-input');
    input.classList.add('error');
    input.value = '';
    input.placeholder = 'Incorrect';
    
    setTimeout(() => {
        input.classList.remove('error');
        input.placeholder = 'Enter password';
    }, 1500);
}

// Handle window resize for mobile detection
window.addEventListener('resize', () => {
    const wasMobile = isMobileView;
    isMobileView = window.innerWidth <= 768;
    
    // If view mode changed, refresh the whoami output
    if (wasMobile !== isMobileView) {
        const terminal = document.querySelector('.terminal-content');
        if (terminal) {
            const output = createOutput(commands.whoami());
            terminal.innerHTML = '';
            terminal.appendChild(output);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.querySelector('.terminal-content');
    
    // Clear and disable terminal initially
    terminalContent.innerHTML = '';
    terminalContent.style.pointerEvents = 'none';
    
    const passwordInput = document.querySelector('.password-input');
    const submitButton = document.querySelector('.submit-button');

    // Function to check password
    function checkPassword() {
        if (passwordInput.value === correctPassword) {
            unlockScreen();
        } else {
            showError();
        }
    }

    // Set up password input handler
    passwordInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    // Set up submit button handler
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        checkPassword();
    });

    // Dragging functionality
    const terminalWindow = document.querySelector('.terminal');
    const terminalHeader = document.querySelector('.terminal-header');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    // Set initial position
    const rect = terminalWindow.getBoundingClientRect();
    xOffset = 0;
    yOffset = 0;

    terminalHeader.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        const rect = terminalWindow.getBoundingClientRect();
        if (e.target === terminalHeader) {
            isDragging = true;
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            const newX = e.clientX - initialX;
            const newY = e.clientY - initialY;
            terminalWindow.style.left = `${newX}px`;
            terminalWindow.style.top = `${newY}px`;
            terminalWindow.style.transform = 'none';
        }
    }

    function dragEnd() {
        isDragging = false;
    }

    const terminal = document.querySelector('.terminal-content');
    let commandHistory = [];
    let historyIndex = -1;
    let currentSong = null;
    let currentVolume = 0.5; // Default volume 50%
    let isLooping = true; // Enable loop by default
    const musicList = [
        { path: '/music/Nelly Mes - Портофино.mp3', name: 'Nelly Mes - Портофино' },
        { path: '/music/Murat Gamidov - Автопилот.mp3', name: 'Murat Gamidov - Автопилот'}
    ];

    const commands = {
        loop: () => {
            isLooping = !isLooping;
            const player = document.getElementById('music-player');
            player.loop = isLooping;
            return `Loop ${isLooping ? 'enabled' : 'disabled'}`;
        },

        volume: (args) => {
            const player = document.getElementById('music-player');
            if (!args.length) {
                return `Current volume: ${Math.round(currentVolume * 100)}%`;
            }
            
            const vol = parseInt(args[0]);
            if (isNaN(vol) || vol < 0 || vol > 100) {
                return 'Please provide a valid volume between 0 and 100';
            }
            
            currentVolume = vol / 100;
            player.volume = currentVolume;
            return `Volume set to ${vol}%`;
        },

        music: () => {
            const player = document.getElementById('music-player');
            
            try {
                if (player.paused) {
                    // Set up the audio player
    const musicCount = musicList.length;
    
                    if (musicCount === 0) {
                        return 'No music available in the playlist.';
                    }
                    
                    const randomIndex = Math.floor(Math.random() * musicCount);
                    currentSong = musicList[randomIndex];
                    
                    // Handle spaces and special characters in the path
                    const audioPath = currentSong.path.split('/').map(part => 
                        part.replace(/[\s\u0400-\u04FF]/g, c => encodeURIComponent(c))
                    ).join('/');
                    
                    player.src = audioPath;
                    player.volume = currentVolume;
                    player.loop = isLooping;

                    // Add error handling
                    player.onerror = () => {
                        console.error('Audio error:', player.error);
                        return 'Error loading audio file';
                    };

                    // Play the audio
                    const playPromise = player.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.error('Playback failed:', error);
                        });
                    }

                    return `Playing: ${currentSong.name}
                           <div class="music-playing">
                               <span></span>
                               <span></span>
                               <span></span>
                               <span></span>
                           </div>`;
                } else {
                    player.pause();
                    return 'Music paused';
                }
            } catch (err) {
                console.error('Music player error:', err);
                return 'Error with music player. Please try again.';
            }
        },

        whoami: () => {
            // Use the global mobile detection
            if (isMobileView) {
                return `<div class="maintext">[Welcome to Vermino's Terminal]</div>

I'm a Full Stack Developer extraordinaire!
Type 'help' to see available commands.`;
            }
            
            return `╔═══════════════════════════════════════════════════════════════╗
║  ██╗   ██╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ ██████╗    ║
║  ██║   ██║██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔═══██╗   ║
║  ██║   ██║█████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║██║   ██║   ║
║  ╚██╗ ██╔╝██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██║   ██║   ║
║   ╚████╔╝ ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║╚██████╔╝   ║
║                                                               ║
║   Full Stack Developer extraordinaire!                        ║
║                                                               ║
║   Type 'help' to see available commands                       ║
╚═══════════════════════════════════════════════════════════════╝`;
        },

        help: () => `[Available Commands]
<a class="maintext">about</a>     - <a class="description">Learn about me</a>
<a class="maintext">projects</a>  - <a class="description">View my projects</a>
<a class="maintext">skills</a>    - <a class="description">See my technical skills</a>
<a class="maintext">contact</a>   - <a class="description">Get my contact information</a>
<a class="maintext">ls</a>        - <a class="description">List available commands</a>
<a class="maintext">telegram</a>  - <a class="description">Open Telegram profile</a>
<a class="maintext">instagram</a> - <a class="description">Open Instagram profile</a>
<a class="maintext">github</a>    - <a class="description">Open GitHub profile</a>
<a class="maintext">music</a>     - <a class="description">Play/Pause background music</a>
<a class="maintext">volume</a>    - <a class="description">Control music volume (0-100)</a>
<a class="maintext">loop</a>      - <a class="description">Toggle music loop (on/off)</a>
<a class="maintext">clear</a>     - <a class="description">Clear the terminal screen</a>
<a class="maintext">help</a>      - <a class="description">Display this help message</a>
<a class="maintext">copyright</a> - <a class="description">View copyright information</a>`,

        about: () => `[About Me]
I am Elbek Shukurullayev, a professional from Jizzakh, Uzbekistan.
My expertise lies in Full Stack development, with a primary focus on backend technologies.
I also specialize in Cross Platform application development using Flutter.
With one year of experience as a System Administrator, I am dedicated to creating and maintaining efficient, robust systems.
My passion for technology drives me to continuously improve and innovate in my field.`,
        copyright: () => `<a class="maintext">Copyright © 2025 Vermino. All rights reserved.</a>`,
        projects: () => `[Recent Projects]
<a class="maintext">• Terminal Portfolio</a> — <a class="description">A minimal terminal-style website</a>
<a class="maintext">• Haad certificate platform</a> — <a class="description">A certificate management platform</a>
<a class="maintext">• Haady</a> — <a class="description">A mobile app for Haad (in development)</a>
<a class="maintext">• Morpheus</a> — <a class="description">AI chat based on ChatGPT</a>`,

        skills: () => `[Technical Stack]
<a class="maintext">• Languages: PHP, Python, Dart</a>
<a class="maintext">• Frontend: Blade, React, CSS/SASS</a>
<a class="maintext">• Mobile APP: Flutter</a>
<a class="maintext">• Backend: Laravel, PostgreSQL</a>
<a class="maintext">• DevOps: Docker, AWS, CI/CD</a>`,
        links: () => `<a class="maintext">[Telegram channel]</a>
• Link: <a href="https://t.me/saturian_boy" target="_blank" class="link">t.me/saturian_boy</a>
<a class="maintext">[GitHub]</a>
• Link: <a href="https://github.com/vermino-uz" target="_blank" class="link">github.com/vermino-uz</a>
<a class="maintext">[Instagram]</a>
• Link: <a href="https://www.instagram.com/saturian_boy" target="_blank" class="link">instagram.com/saturian_boy</a>
<a class="maintext">[Twitter]</a>
• Link: <a href="https://x.com/vermino_uz" target="_blank" class="link">x.com/vermino_uz</a>
<a class="maintext">[Playlist]</a>
• Link: <a href="https://music.yandex.com/users/verminvibe/playlists/3" target="_blank" class="link">music.yandex.com/users/verminvibe/playlists/3</a>
`,
        contact: () => `[Contact]
• Email: <a href="mailto:shukurullayev.elbek@icloud.com" class="link">shukurullayev.elbek@icloud.com</a>
• Telegram: <a href="https://t.me/vermino" target="_blank" class="link">t.me/vermino</a>
• Phone: <a href="tel:+998885219924" class="link">+998885219924</a>`,
        telegram: () => {
            window.location.href = 'tg://resolve?domain=vermino';
            return '<span class="navigating">Opening Telegram...</span>';
        },
        mail: () => {
            window.location.href = 'mailto:shukurullayev.elbek@icloud.com';
            return '<span class="navigating">Opening Mail...</span>';
        },

        instagram: () => {
            setTimeout(() => {
                window.open('https://www.instagram.com/saturian_boy', '_blank');
            }, 1000);
            return '<span class="navigating">Navigating to Instagram...</span>';
        },

        github: () => {
            setTimeout(() => {
                window.open('https://github.com/vermino-uz', '_blank');
            }, 1000);
            return '<span class="navigating">Navigating to GitHub...</span>';
        },
        

        ls: () => `<a class="maintext">projects  skills  contact  help  telegram  instagram  github  music  volume  loop  copyright</a>`,

        clear: () => {
            const lines = terminal.querySelectorAll('.line, .output');
            lines.forEach(line => line.remove());
            return '';
        }
    };

    function createLine(command = '') {
        const line = document.createElement('div');
        line.className = 'line';
        line.innerHTML = `
            <span class="prompt">root@vermino.uz:~$</span>
            <span class="command">${command}</span>
        `;
        return line;
    }

    function createOutput(content) {
        const output = document.createElement('div');
        output.className = 'output';
        
        // Special handling for ASCII art (when content contains ║)
        if (content.includes('║')) {
            output.innerHTML = content.split('\n').join('<br>');
            output.style.whiteSpace = 'pre';
        } else {
            output.innerHTML = content.split('\n').map(line => line.trim()).join('<br>');
        }
        
        // Add click event listeners to links
        const links = output.querySelectorAll('.link');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent terminal from getting focus
            });
        });
        
        return output;
    }

    function executeCommand(command) {
        const cmd = command.toLowerCase().trim();
        if (cmd in commands) {
            const output = commands[cmd]();
            if (output) {
                terminal.appendChild(createOutput(output));
            }
        } else if (cmd) {
            terminal.appendChild(createOutput(`zsh: command not found: ${cmd}`));
        }
        
        // Add new prompt line
        const newLine = createLine();
        terminal.appendChild(newLine);
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        newLine.appendChild(cursor);
        
        // Scroll to bottom
        terminal.scrollTop = terminal.scrollHeight;
    }

    // Handle keyboard input
    document.addEventListener('keydown', (e) => {
        // Ignore terminal input if lock screen is visible
        if (!document.getElementById('lock-screen').classList.contains('hidden')) {
            return;
        }

        const currentLine = terminal.querySelector('.line:last-child');
        const commandSpan = currentLine.querySelector('.command');
        const cursor = currentLine.querySelector('.cursor');

        if (e.key === 'Enter') {
            e.preventDefault();
            const command = commandSpan.textContent;
            cursor.remove();
            if (command) {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
            }
            executeCommand(command);
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            commandSpan.textContent = commandSpan.textContent.slice(0, -1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                commandSpan.textContent = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandSpan.textContent = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                commandSpan.textContent = '';
            }
        } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            commandSpan.textContent += e.key;
        }
    });

    // Execute initial 'whoami' command
    executeCommand('whoami');
});
