
const ourStoryImg = document.getElementById('ourstory-img');
const overlay = document.getElementById('overlay');
function showOverlay() {
  overlay.style.display = 'flex';
  ourStoryImg.classList.add('blury');
}

function hideOverlay() {
  overlay.style.display = 'none';
  ourStoryImg.classList.remove('blury');
}


ourStoryImg.addEventListener('mouseenter', showOverlay);
ourStoryImg.addEventListener('mouseleave', hideOverlay);


