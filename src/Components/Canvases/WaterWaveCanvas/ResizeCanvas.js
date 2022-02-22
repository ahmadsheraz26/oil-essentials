export const resizeCanvasToDisplaySize = (canvas,w,h) => {
    const width = w;
    const height = h;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
    return false;

}