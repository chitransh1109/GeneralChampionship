# Logo Setup Instructions

## How to Add Your Championship Logo

1. **Save the logo image:**
   - Take the sports-themed logo image (with basketball, soccer ball, tennis rackets, cricket bat, and badminton shuttlecock on orange wings)
   - Save it as `championship-logo.png` in this `public` folder
   - The file should be: `/Users/chitranshyadav/Downloads/championship-vortex-main/public/championship-logo.png`

2. **Image specifications:**
   - Recommended size: 500x500 pixels or larger (square aspect ratio)
   - Format: PNG (for transparency) or JPG
   - The image has a black background with orange sports equipment and wings

3. **Where the logo appears:**
   - **Navbar:** Top-left corner (14x14 with dark background and orange border)
   - **Footer:** Bottom section (14x14 with dark background and orange border)

4. **Current styling:**
   - Rounded square shape with black background
   - Orange border accent matching the sports theme
   - Logo bounces slightly on page load (animation)

5. **After saving the image:**
   - The website will automatically use the new logo
   - Refresh your browser if needed
   - The logo will appear in the navbar and footer

## File Location
```
championship-vortex-main/
  └── public/
      └── championship-logo.png  ← Save your logo here
```

## Alternative: Use a different image path
If you want to use a different filename or location, update these files:
- `src/components/Navbar.tsx` (line 4)
- `src/components/Footer.tsx` (line 3)

Change the `championshipLogo` constant to your preferred path.
