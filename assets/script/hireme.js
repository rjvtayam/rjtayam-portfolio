// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

// Set event listeners for the arrow buttons
document.querySelector(".next-arrow").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
});

document.querySelector(".prev-arrow").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
});

// Function to update the slider position
function updateSlider() {
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const offset = -currentSlide * 100;
  sliderWrapper.style.transform = `translateX(${offset}%)`;
}

// Modal view functionality
const modal = document.getElementById("certificateModal");
const fullImage = document.getElementById("fullCertificateImage");
const closeModal = document.querySelector(".close-modal");

// Open modal with full image when a certificate is clicked
slides.forEach((slide) => {
  slide.querySelector(".certificate-img").addEventListener("click", () => {
    const fullImgSrc = slide.querySelector(".certificate-img").dataset.full;
    fullImage.src = fullImgSrc;
    modal.style.display = "flex";
  });
});

// Close modal when the close button is clicked
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside of the image
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
