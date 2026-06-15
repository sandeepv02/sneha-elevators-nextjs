document.addEventListener('DOMContentLoaded', function () {
  // Create lightbox modal elements
  const lightboxModal = document.createElement('div');
  lightboxModal.id = 'simpleLightbox';
  lightboxModal.className = 'simple-lightbox';
  lightboxModal.innerHTML = `
    <button class="slb-close" aria-label="Close">&times;</button>
    <img class="slb-image" alt="" />
    `;
  document.body.appendChild(lightboxModal);

  const slb = document.getElementById('simpleLightbox');
  const slbImage = slb.querySelector('.slb-image');
  const slbClose = slb.querySelector('.slb-close');

  function openLightbox(src, alt) {
    // prepare animation start state
    slbImage.style.transform = 'scale(0.85)';
    slbImage.style.opacity = '0';
    slb.classList.add('open');
    document.body.style.overflow = 'hidden';

    // when image loads, trigger zoom-in transition
    slbImage.onload = function () {
      requestAnimationFrame(function () {
        slbImage.style.transform = 'scale(1)';
        slbImage.style.opacity = '1';
      });
      // remove onload handler after run
      slbImage.onload = null;
    };

    // set src/alt last to start loading
    slbImage.src = src;
    slbImage.alt = alt || '';
  }

  function closeLightbox() {
    // animate scale down then clear
    slbImage.style.transform = 'scale(0.85)';
    slbImage.style.opacity = '0';
    slb.classList.remove('open');
    setTimeout(function () {
      slbImage.src = '';
      document.body.style.overflow = '';
    }, 300);
  }

  // Delegate click on links with .lightbox-link
  document.body.addEventListener('click', function (e) {
    const link = e.target.closest('.lightbox-link');
    if (!link) return;
    e.preventDefault();
    const imgSrc = link.getAttribute('href') || link.querySelector('img')?.src;
    const imgAlt = link.querySelector('img')?.getAttribute('alt') || '';
    if (imgSrc) openLightbox(imgSrc, imgAlt);
  });

  slbClose.addEventListener('click', closeLightbox);
  slb.addEventListener('click', function (e) {
    if (e.target === slb) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && slb.classList.contains('open')) closeLightbox();
  });
});
