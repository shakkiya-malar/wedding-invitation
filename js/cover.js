document.addEventListener('DOMContentLoaded', function () {
  const coverOverlay = document.getElementById('invitation-cover-overlay');
  const sealWrapper = document.querySelector('.cover-seal-wrapper');
  const reopenBtn = document.getElementById('reopen-cover-btn');

  if (!coverOverlay || !sealWrapper) return;

  // Function to open the bi-fold cover
  function openCover() {
    if (coverOverlay.classList.contains('cover-opened')) return;

    coverOverlay.classList.add('cover-opened');
    coverOverlay.style.pointerEvents = 'none';

    // Remove body scroll lock immediately
    document.body.classList.remove('cover-locked');

    // After door animation completes, hide overlay from layout
    setTimeout(function () {
      coverOverlay.classList.add('cover-hidden');
    }, 900);

    // Show floating re-open button if present
    if (reopenBtn) {
      setTimeout(function () {
        reopenBtn.style.display = 'flex';
      }, 900);
    }
  }

  // Function to re-close cover
  function closeCover() {
    coverOverlay.style.pointerEvents = 'auto';
    coverOverlay.classList.remove('cover-hidden');
    // Force reflow
    void coverOverlay.offsetWidth;
    coverOverlay.classList.remove('cover-opened');
    document.body.classList.add('cover-locked');
    if (reopenBtn) {
      reopenBtn.style.display = 'none';
    }
  }

  // Event listener on center seal
  sealWrapper.addEventListener('click', function (e) {
    e.stopPropagation();
    openCover();
  });

  // Also allow clicking anywhere on the doors to open
  coverOverlay.addEventListener('click', function () {
    openCover();
  });

  // Re-open button listener
  if (reopenBtn) {
    reopenBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeCover();
    });
  }
});
