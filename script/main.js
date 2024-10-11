// Select all navigation links and the main content area
const navLinks = document.querySelectorAll(".nav-links a");
const contentArea = document.querySelector(".content");
const mainSections = document.querySelectorAll("main, section.stats"); 

// Function to remove the active class from all navigation links
const removeActiveClass = () => {
  navLinks.forEach((link) => link.classList.remove("active"));
};

// Function to set the active link based on the current URL or hash
const setActiveLink = () => {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  removeActiveClass(); 

  // Set active class based on current URL
  if (currentHash === "#home-main" || currentPath === "/your-home-page.html") {
    // Adjust path if needed
    document.getElementById("home").classList.add("active");
  } else if (
    currentPath.includes("service.html") ||
    currentHash === "#services"
  ) {
    document.getElementById("services").classList.add("active");
  } else if (currentPath.includes("resume.html") || currentHash === "#resume") {
    document.getElementById("resume").classList.add("active");
  } else if (currentPath.includes("work.html") || currentHash === "#work") {
    document.getElementById("work").classList.add("active");
  } else if (currentHash === "#testimonials") {
    document.getElementById("testimonials").classList.add("active");
  } else if (
    currentPath.includes("contact.html") ||
    currentHash === "#contact"
  ) {
    document.getElementById("contact").classList.add("active");
  }
};

// Function to load content dynamically
const loadContent = async (url) => {
  try {
    const response = await fetch(url);

    // Check if the response is okay (status 200-299)
    if (!response.ok) {
      throw new Error(
        `Failed to load content from ${url}: ${response.statusText}`
      );
    }

    const html = await response.text(); 
    contentArea.innerHTML = html; 
    setActiveLink(); 
  } catch (error) {
    console.error("Error loading content:", error);
    contentArea.innerHTML =
      "<p>Error loading content. Please try again later.</p>"; 
  }
};

// Function to initialize the page
const initPage = () => {
  const homeLink = document.getElementById("home");
  homeLink.classList.add("active");
  loadContent("home.html"); 
};

// Function to handle link clicks
const handleLinkClick = (event) => {
  event.preventDefault(); 

  // Load content based on the clicked link's href attribute
  const page = event.currentTarget.getAttribute("href"); 
  // Toggle visibility based on the clicked link
  mainSections.forEach((section) => {
    section.style.display = "none"; 
  });

  if (page === "#home") {
    // Show the main section with id home
    document.querySelector("main#home").style.display = "block"; 
    document.querySelector("section.stats").style.display = "block"; 
  } else if (page === "service.html" || page === "#services") {
    document.querySelector("main#services").style.display = "block";
  } else if (page === "resume.html" || page === "#resume") {
    document.querySelector("main#resume").style.display = "block"; 
  } else if (page === "work.html" || page === "#work") {
    document.querySelector("main#work").style.display = "block"; 
  } else if (page === "#testimonials") {
    document.querySelector("main#testimonials").style.display = "block"; section
  } else if (page === "contact.html" || page === "#contact") {
    document.querySelector("main#contact").style.display = "block"; 
  } else {
    loadContent(page); 
  }

  // Scroll to the top of the page with a smooth behavior
  window.scrollTo({
    top: 0, 
    behavior: "smooth", 
  });
};

// Initialize the page on DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  initPage();
  setActiveLink(); 
});

// Add event listeners to each navigation link for content loading
navLinks.forEach((link) => {
  link.addEventListener("click", handleLinkClick);
});

// Add an event listener for hash changes to update the active link
window.addEventListener("hashchange", setActiveLink);

