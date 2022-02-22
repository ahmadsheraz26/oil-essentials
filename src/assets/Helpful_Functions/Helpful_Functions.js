export const OscillateColors = (currentColorIndex, MaxColors) => {
    if (currentColorIndex >= MaxColors - 1) return 0;
    else if (currentColorIndex >= 0) return (currentColorIndex + 1);
    return 0;
}