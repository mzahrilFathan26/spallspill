document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const modal = document.getElementById("previewModal");
  const modalBg = document.querySelector(".modal-bg");
  const previewImage = document.getElementById("previewImage");
  const previewVideo = document.getElementById("previewVideo");
  const closeModal = document.getElementById("closeModal");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;

  // Tampilkan media di galeri
  mediaFiles.forEach((file, index) => {
    const item = document.createElement("div");
    item.classList.add("gallery-item");

    if (file.type === "image") {
      const img = document.createElement("img");
      img.src = file.src;
      img.loading = "lazy";
      item.appendChild(img);
      img.addEventListener("click", () => openPreview(index));
    } else {
      const video = document.createElement("video");
      video.src = file.src;
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";
      item.appendChild(video);
      video.addEventListener("click", () => openPreview(index));
    }

    gallery.appendChild(item);
  });

  function openPreview(index) {
    currentIndex = index;
    const file = mediaFiles[index];
    modal.style.display = "flex";

    if (file.type === "image") {
      previewImage.src = file.src;
      previewImage.classList.remove("hidden");
      previewVideo.classList.add("hidden");
    } else {
      previewVideo.src = file.src;
      previewVideo.classList.remove("hidden");
      previewImage.classList.add("hidden");
      previewVideo.play();
    }
  }

  function closePreview() {
    modal.style.display = "none";
    previewVideo.pause();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % mediaFiles.length;
    openPreview(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + mediaFiles.length) % mediaFiles.length;
    openPreview(currentIndex);
  }

  closeModal.addEventListener("click", closePreview);
  modalBg.addEventListener("click", closePreview);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  // Tombol panah keyboard
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closePreview();
    }
  });
});
