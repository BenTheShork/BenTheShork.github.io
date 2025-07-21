// Facility gallery data
const facilityImages = [
    {
        src: "..images/warehouse/facility-1.jpg",
        alt: "Warehouse Overview"
    },
    {
        src: "..images/warehouse/facility-2.jpg",
        alt: "Quality Control Lab"
    },
    {
        src: "..images/warehouse/facility-3.jpg",
        alt: "Storage Area"
    },
    {
        src: "..images/warehouse/facility-4.jpg",
        alt: "Loading Bay"
    },
    {
        src: "..images/warehouse/facility-5.jpg",
        alt: "Packaging Area"
    },
    {
        src: "..images/warehouse/facility-6.jpg",
        alt: "Inventory Management"
    },
    
];

// Switch main image function
function switchMainImage(index) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    const imageData = facilityImages[index];
    
    // Remove active class from all thumbnails
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to clicked thumbnail
    thumbnails[index].classList.add('active');
    
    // Update main image with fade effect
    mainImage.style.opacity = '0';
    setTimeout(() => {
        mainImage.innerHTML = `
            <img src="${imageData.src}" alt="${imageData.alt}" class="main-facility-image">
            <div class="image-overlay">
            </div>
        `;
        mainImage.style.opacity = '1';
    }, 200);
}

// Auto-cycle through images (optional)
let currentImageIndex = 0;
let autoPlayInterval;


// Initialize auto-play (uncomment to enable)
// startAutoPlay();

// Pause auto-play on hover
const mainImage = document.getElementById('mainImage');