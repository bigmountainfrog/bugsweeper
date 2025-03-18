# bugsweeper

A charming twist on the classic Minesweeper game, where players must avoid disturbing stinkbugs while tending to their garden! 

## Features

### Core Gameplay
- **16x16 Grid**: Classic Minesweeper layout with 40 stinkbugs
- **Dynamic Difficulty**: Numbers indicate nearby stinkbugs
- **Flower Markers**: Place flowers to mark suspected stinkbug locations
- **Random Flower Variety**: Four different flower sprites randomly selected for markers

### Visual Design
- **Pixel Perfect Graphics**: Retro-style sprites with crisp rendering
- **Responsive Design**: Smooth animations and hover effects
- **Themed Interface**: Customizable color schemes for the entire game
- **Pixel Font**: DotGothic16 font for authentic retro feel

### User Interface
- **Game Header**:
  - Mine Counter: Tracks remaining stinkbugs
  - Timer: Records your solving speed
  - Ladybug Reset Button: Start a new game
  - Theme Selector: Customize game appearance

### Theme Options
- **Day** (🌿): Classic green garden theme
- **Spring** (🌸): Soft pink cherry blossom palette
- **Rain** (🌧️): Calming blue rainy day colors
- **Night** (🌙): Elegant purple twilight scheme
- **Summer** (☀️): Bright yellow sunshine theme
- **Autumn** (🍁): Warm orange fall colors

## How to Play

1. **Basic Rules**:
   - Click to reveal a cell
   - Right-click to place a flower marker
   - Numbers show how many stinkbugs are in adjacent cells
   - Avoid clicking on stinkbugs!

2. **Winning Strategy**:
   - Use numbers as clues to locate stinkbugs
   - Mark suspected stinkbugs with flowers
   - Clear all safe cells to win

3. **Controls**:
   - Left Click: Reveal cell
   - Right Click: Place/remove flower marker
   - Reset Button: Start new game
   - Theme Button: Change color scheme

## Technical Details

### File Structure
- `minesweeper.html`: Main game structure and layout
- `minesweeper.css`: Styling and animations
- `minesweeper.js`: Game logic and mechanics
- Asset files:
  - `ladybug.png`: Reset button and favicon
  - `stinkbug.png`: Mine sprite
  - `Flowers 2-5.png`: Marker sprites
  - `PaintBrush.png`: Theme selector icon

### Implementation Notes
- Pure JavaScript implementation
- CSS Grid for game board layout
- CSS Variables for theme management
- Responsive design principles
- Event-driven gameplay mechanics

## Sources & Acknowledgements

This game was made possible thanks to the following generous creators and resources:

### Graphics & Assets
- **Ladybug Icon**: Created by Didier Capdevielle  
  [Free 2D Topview Bugs Sprites Sheet](https://didier-capdevielle.itch.io/free-2d-topview-bugs-sprites-sheet)
  - Used for: Reset button and favicon
  - Features: Pixel-perfect sprite design

- **Paintbrush Icon**: Created by Crusenho  
  [Icons Essential Pack](https://crusenho.itch.io/icons-essential-pack-free-icons)
  - Used for: Theme selector button
  - Features: Clean, minimalist design

- **Flower Icons**: Created by Kyi Phyu Khin  
  [Simple Free Flowers Pack](https://akyioo-arts.itch.io/flowers-simple-free)
  - Used for: Cell markers
  - Features: Four unique flower designs

### Typography
- **DotGothic16 Font**: Created by Fontworks Inc.  
  Available on [Google Fonts](https://fonts.google.com/specimen/DotGothic16)
  - Used for: All game text
  - Features: Pixel-perfect at specific sizes
  - License: Open Font License

### Code & Development
- **Base Code**: JavaScript Minesweeper implementation by code-boxx  
  [Simple JavaScript Minesweeper Tutorial](https://code-boxx.com/simple-javascript-minesweeper/)
  - Core game mechanics adapted and expanded
  - Additional features and styling added

- **Development Tools**:
  - Visual Studio Code: Primary development environment
  - Goose AI: Development assistance and code review
  - Chrome DevTools: Testing and debugging

### Special Thanks
Special thanks to:
- All content creators who make their work available for game developers
- Claude for assistance with naming and font selection
- The Minesweeper community for inspiration
- Block's Goose team for development support

## Version History

### v1.0.0 - Initial Release
- Complete game implementation
- Six color themes
- Rotating stinkbugs
- Custom flower markers
- Pixel-perfect graphics
- Responsive design

---

*bugsweeper is a fan-made project and is not affiliated with any of the creators listed above. All assets have been used in accordance with their respective licenses.*
