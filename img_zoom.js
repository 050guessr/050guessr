document.addEventListener('DOMContentLoaded', () => {
    const zoomContainer = document.getElementById('zoom-container');
    const zoomImage = zoomContainer.querySelector('.zoom-image');

    zoomContainer.addEventListener('mousemove', (event) => {
      const rect = zoomContainer.getBoundingClientRect();
      const x = (event.clientX - rect.left) / zoomContainer.offsetWidth;
      const y = (event.clientY - rect.top) / zoomContainer.offsetHeight;
      zoomImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    });
  });