document.addEventListener('DOMContentLoaded', function() {
  const images = ['zago0.png', 'zago1.png', 'zago2.png', 'zago3.png', 'zago4.png']; 
  const correctImage = 'zago0.png';
  let currentIndex = 0;
  const imgElement = document.getElementById('rotatingImage');
  let intervalId;
  let rotationStopped = false;


  const modal = document.getElementById("myModal");
  modal.style.display = "block";

  // Cierra el modal cuando el usuario hace clic en el botón de cerrar (x)
  document.querySelector(".close").onclick = function() {
    modal.style.display = "none";
  }

  // Cierra el modal si el usuario hace clic fuera de él
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  function changeImage() {
    currentIndex = Math.floor(Math.random() * images.length);
    imgElement.src = images[currentIndex];
  }

  function startRotation() {
    if (!intervalId) { // Verifica si ya hay una rotación en curso
      intervalId = setInterval(changeImage, 400);
    }
    rotationStopped = false;
  }

  function stopRotation() {
    clearInterval(intervalId);
    intervalId = null;
    rotationStopped = true;
  }

  imgElement.addEventListener('click', function() {
    if (!rotationStopped) { // Si la rotación está activa
      stopRotation();
      const isCorrect = imgElement.src.includes(correctImage);
      showExtraImage(isCorrect);
    }
  });

  function showExtraImage(isCorrect) {
    
    const extraImageSrc = isCorrect ? 'santillan.png' : (Math.random() > 0.5 ? 'menem.png' : 'francos.png');
    const extraImage = document.createElement('img');
    extraImage.id = 'extraImage';
    extraImage.src = extraImageSrc;
    extraImage.style.position = 'absolute';
    extraImage.style.top = '50%';
    extraImage.style.left = isCorrect ? '50%' : (Math.random() > 0.5 ? '25%' : '75%');
    extraImage.style.transform = 'translate(-50%, -50%)';
    extraImage.style.zIndex = 1000;
    document.body.appendChild(extraImage);

    setTimeout(() => { // Asegura que se añada después del clic actual para evitar la inmediata reactivación
      document.addEventListener('click', restartRotationAndRemoveExtraImage);
    }, 0);

    function restartRotationAndRemoveExtraImage() {
      if (rotationStopped) { // Verifica si la rotación está detenida
        startRotation();
        document.body.removeChild(extraImage);
        document.removeEventListener('click', restartRotationAndRemoveExtraImage); // Remueve el evento para evitar efectos no deseados
      }
    }
  }

  startRotation(); // Comienza la rotación al cargar la página
});

