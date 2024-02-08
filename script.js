document.addEventListener('DOMContentLoaded', function() {
  var images = ['zago0.png', 'zago1.png', 'zago2.png', 'zago3.png', 'zago4.png']; 
  var currentIndex = 0;
  var imgElement = document.getElementById('rotatingImage');
  var intervalId;

  function changeImage() {
    currentIndex = Math.floor(Math.random() * images.length); // Índice aleatorio
    imgElement.src = images[currentIndex];
  }

  intervalId = setInterval(changeImage, 500); // Cambia cada 500ms

  document.getElementById('stopButton').addEventListener('click', function() {
    clearInterval(intervalId); // Detiene la rotación
  });
});
