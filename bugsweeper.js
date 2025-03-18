// minesweeper.js //

var mine = {
    // (A) properties
    total: 40, // total number of mines
    height: 16, // number of rows
    width: 16, // number of columns
    board: [], // current game board
    rCell: 0, // number of remaining hidden cells
    timer: null, // timer reference
    time: 0, // elapsed time
    minesLeft: 40, // mines left to flag

    // Theme handling
    toggleSettings: () => {
        const panel = document.getElementById("settings-panel");
        panel.classList.toggle("show");
    },

    setTheme: (themeName) => {
        // Remove all theme classes
        document.body.classList.remove(
            'theme-spring',
            'theme-rain',
            'theme-night',
            'theme-summer',
            'theme-day',
            'theme-autumn'
        );
        
        // Add new theme class
        if (themeName) {
            document.body.classList.add(`theme-${themeName}`);
            localStorage.setItem('minesweeper-theme', themeName);
        }

        // Update active button
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeName);
        });
    },

    initTheme: () => {
        // Load saved theme or default to spring
        const savedTheme = localStorage.getItem('minesweeper-theme') || 'spring';
        mine.setTheme(savedTheme);

        // Add click handlers for theme buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.onclick = () => mine.setTheme(btn.dataset.theme);
        });

        // Add settings toggle handler
        document.getElementById('settings-toggle').onclick = mine.toggleSettings;

        // Close settings when clicking outside
        document.getElementById('settings-panel').onclick = (e) => {
            if (e.target.id === 'settings-panel') {
                mine.toggleSettings();
            }
        };
    },

    // Update display functions
    updateMineCounter: () => {
        document.getElementById("mine-counter").innerHTML = 
            mine.minesLeft.toString().padStart(3, '0');
    },

    updateTimeCounter: () => {
        document.getElementById("time-counter").innerHTML = 
            mine.time.toString().padStart(3, '0');
    },

    startTimer: () => {
        if (!mine.timer) {
            mine.timer = setInterval(() => {
                mine.time++;
                if (mine.time > 999) mine.time = 999;
                mine.updateTimeCounter();
            }, 1000);
        }
    },

    stopTimer: () => {
        if (mine.timer) {
            clearInterval(mine.timer);
            mine.timer = null;
        }
    },

    // (B) reset & initialize game
    reset: () => {
        // Reset counters
        mine.stopTimer();
        mine.time = 0;
        mine.minesLeft = mine.total;
        mine.updateTimeCounter();
        mine.updateMineCounter();

        // Reset board
        mine.board = [];
        mine.rCell = mine.height * mine.width;

        // Get & reset HTML wrapper
        let wrap = document.getElementById("mine-wrap");
        wrap.innerHTML = "";

        // Generate cells
        for (let row=0; row<mine.height; row++) {
            mine.board.push([]);
            for (let col=0; col<mine.width; col++) {
                mine.board[row].push({
                    r: false, // cell is revealed?
                    x: false, // cell is marked?
                    m: false, // cell has a mine?
                    a: 0, // number of mines in adjacent cells
                    c: document.createElement('div'), // html reference
                    f: Math.floor(Math.random() * 4) + 1 // random flower (1-4)
                });

                let cell = mine.board[row][col].c;
                cell.classList.add("cell");
                cell.id = "mine-" + row + "-" + col;
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.onclick = () => mine.open(cell);
                cell.oncontextmenu = e => {
                    e.preventDefault();
                    mine.mark(cell);
                };
                cell.innerHTML = "&nbsp;";
                wrap.appendChild(cell);
            }
        }

        // Randomly lay mines
        let mToLay = mine.total;
        while (mToLay > 0) {
            let row = Math.floor(Math.random() * mine.height);
            let col = Math.floor(Math.random() * mine.width);
            if (!mine.board[row][col].m) {
                mine.board[row][col].m = true;
                mToLay--;
            }
        }

        // Calculate adjacent mines
        for (let row=0; row<mine.height; row++) {
            let lastRow = row - 1,
                nextRow = row + 1;
            if (nextRow == mine.height) { nextRow = -1; }

            for (let col=0; col<mine.width; col++) {
                let lastCol = col - 1,
                    nextCol = col + 1;
                if (nextCol == mine.width) { nextCol = -1; }

                if (!mine.board[row][col].m) {
                    if (lastRow != -1) {
                        if (lastCol != -1) { if (mine.board[lastRow][lastCol].m) {mine.board[row][col].a++} }
                        if (mine.board[lastRow][col].m) { mine.board[row][col].a++; }
                        if (nextCol != -1) { if (mine.board[lastRow][nextCol].m) {mine.board[row][col].a++}}
                    }

                    if (lastCol != -1) { if (mine.board[row][lastCol].m) { mine.board[row][col].a++; }}
                    if (nextCol != -1) { if (mine.board[row][nextCol].m) { mine.board[row][col].a++;}}

                    if (nextRow != -1) { 
                        if (lastCol != -1) { if (mine.board[nextRow][lastCol].m) {mine.board[row][col].a++; }}
                        if (mine.board[nextRow][col].m) { mine.board[row][col].a++; }
                        if (nextCol != -1) { if (mine.board[nextRow][nextCol].m) {mine.board[row][col].a++; }}
                    }
                }
            }
        }
    },

    // (C) mark a cell
    mark: cell => {
        let row = cell.dataset.row,
            col = cell.dataset.col;

        if (!mine.board[row][col].r) {
            mine.startTimer(); // Start timer on first action
            cell.classList.toggle("mark");
            mine.board[row][col].x = !mine.board[row][col].x;
            
            // Update mine counter
            mine.minesLeft += mine.board[row][col].x ? -1 : 1;
            mine.updateMineCounter();
            
            if (mine.board[row][col].x) {
                cell.innerHTML = `<div class="stinkflower flower${mine.board[row][col].f}"></div>`;
            } else {
                cell.innerHTML = "&nbsp;";
            }
        }
    },

    // (D) open cell
    open: cell => {
        let row = cell.dataset.row,
            col = cell.dataset.col;

        mine.startTimer(); // Start timer on first action

        if (mine.board[row][col].x) {
            return;
        }

        if (mine.board[row][col].m) {
            mine.stopTimer();
            for (let r=0; r<mine.height; r++) {
                for (let c=0; c<mine.width; c++) {
                    if (mine.board[r][c].m) {
                        const rotation = Math.floor(Math.random() * 360);
                        mine.board[r][c].c.innerHTML = `<div class="stinkbug" style="transform: rotate(${rotation}deg)"></div>`;
                        mine.board[r][c].c.classList.add("boom");
                    }
                }
            }
            setTimeout(() => {
                alert("don't squish the bugs, they're stinky!");
                mine.reset();
            }, 100);
        }

        else {
            let toReveal = [],
                toCheck = [],
                checked = [];
            for (let i=0; i<mine.height; i++) { checked.push({}); }
            toCheck.push([row,col]);

            while (toCheck.length>0) {
                let thisRow = parseInt(toCheck[0][0]),
                    thisCol = parseInt(toCheck[0][1]);

                if(mine.board[thisRow][thisCol].m || mine.board[thisRow][thisCol].r || mine.board[thisRow][thisCol].x) {}
                else {
                    if (!checked[thisRow][thisCol]) { toReveal.push([thisRow, thisCol]); }

                    if (mine.board[thisRow][thisCol].a == 0) {
                        let lastRow = thisRow - 1,
                            nextRow = thisRow + 1,
                            lastCol = thisCol - 1,
                            nextCol = thisCol + 1;
                        if (nextRow == mine.height) { nextRow = -1; }
                        if (nextCol == mine.width) { nextCol = -1; }

                        if (lastRow != -1) {
                            if (lastCol != -1 && !checked[lastRow][lastCol]) { toCheck.push([lastRow, lastCol]); }
                            if (!checked[lastRow][thisCol]) { toCheck.push([lastRow, thisCol]); }
                            if (nextCol != -1 && !checked[lastRow][nextCol]) { toCheck.push([lastRow, nextCol]); }
                        }

                        if (lastCol != -1 && !checked[thisRow][lastCol]) { toCheck.push([thisRow, lastCol]); }
                        if (nextCol != -1 && !checked[thisRow][nextCol]) { toCheck.push([thisRow, nextCol]); }

                        if (nextRow != -1) {
                            if (lastCol != -1 && !checked[nextRow][lastCol]) { toCheck.push([nextRow, lastCol]); }
                            if (!checked[nextRow][thisCol]) { toCheck.push([nextRow, thisCol]); }
                            if (nextCol != -1 && !checked[nextRow][nextCol]) { toCheck.push([nextRow, nextCol]); }
                        }
                    }
                }
                checked[thisRow][thisCol] = true;
                toCheck.shift();
            }

            if (toReveal.length > 0) {
                for (let cell of toReveal) {
                    let thisRow = parseInt(cell[0]);
                    let thisCol = parseInt(cell[1]);
                    mine.board[thisRow][thisCol].r = true;
                    if (mine.board[thisRow][thisCol].a != 0) {
                        mine.board[thisRow][thisCol].c.innerHTML = mine.board[thisRow][thisCol].a;
                    } else {
                        mine.board[thisRow][thisCol].c.innerHTML = "&nbsp;";
                    }
                    mine.board[thisRow][thisCol].c.classList.add("reveal");
                    mine.rCell = mine.rCell - 1;
                }
            }

            if (mine.rCell == mine.total) {
                mine.stopTimer();
                setTimeout(() => {
                    alert("big man blastoise big man blastiose big man blastoise");
                    mine.reset();
                }, 100);
            }
        }
    }
};

// Initialize game when page loads
window.addEventListener("DOMContentLoaded", () => {
    mine.initTheme();
    mine.reset();
    document.getElementById("reset-button").onclick = mine.reset;
});