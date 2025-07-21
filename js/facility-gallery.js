// Facility gallery functionality

// Facility gallery data
const facilityImages = [
    {
        src: "../images/warehouse/facility-1.jpg",
        alt: "Warehouse Overview"
    },
    {
        src: "../images/warehouse/facility-2.jpg",
        alt: "Quality Control Lab"
    },
    {
        src: "../images/warehouse/facility-3.jpg",
        alt: "Storage Area"
    },
    {
        src: "../images/warehouse/facility-4.jpg",
        alt: "Loading Bay"
    },
    {
        src: "../images/warehouse/facility-5.jpg",
        alt: "Packaging Area"
    },
    {
        src: "../images/warehouse/facility-6.jpg",
        alt: "Inventory Management"
    }
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

// Initialize facility gallery functionality
document.addEventListener('DOMContentLoaded', () => {
    const facilityImagesDetailed = [
        {
            src: "2016_10_18_panorama_03.jpg",
            title: "Processing Floor Overview",
            description: "Our main production floor featuring state-of-the-art equipment for sorting, cleaning, and processing premium cacao beans.",
            alt: "Processing Floor Overview"
        },
        {
            src: "untitled-1.jpg",
            title: "Quality Control Laboratory",
            description: "Advanced testing facility where every batch undergoes rigorous analysis to ensure consistent quality and purity standards.",
            alt: "Quality Control Lab"
        },
        {
            src: "2016_10_18_07.jpg",
            title: "Precision Roasting Department",
            description: "Temperature-controlled roasting chambers with computerized monitoring systems for optimal flavor development.",
            alt: "Roasting Department"
        },
        {
            src: "2017_01_26_0049.jpg",
            title: "Automated Packaging Line",
            description: "Hygienic packaging system ensuring product freshness and maintaining quality from facility to customer.",
            alt: "Packaging Line"
        },
        {
            src: "2017_01_26_0026.jpg",
            title: "Climate-Controlled Storage",
            description: "Warehouse facility with optimal temperature and humidity controls to preserve cacao bean integrity.",
            alt: "Storage Warehouse"
        },
        {
            src: "2017_01_26_0056.jpg",
            title: "Research & Development Center",
            description: "Innovation laboratory where our team develops new products and refines existing processes.",
            alt: "Research & Development"
        }
    ];

    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                // Remove active class from all thumbnails
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                thumbnail.classList.add('active');
                
                // Update main image
                const imageData = facilityImagesDetailed[index];
                mainImage.innerHTML = `
                    <img src="${imageData.src}" alt="${imageData.alt}" class="main-facility-image">
                    <div class="image-overlay">
                        <h4>${imageData.title}</h4>
                        <p>${imageData.description}</p>
                    </div>
                `;
                
                // Add smooth transition effect
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.style.opacity = '1';
                }, 150);
            });
        });
    }

    // Auto-cycle through images (optional)
    let currentImageIndex = 0;
    const autoChangeInterval = 8000; // 8 seconds

    function autoChangeImage() {
        const nextIndex = (currentImageIndex + 1) % facilityImagesDetailed.length;
        const nextThumbnail = thumbnails[nextIndex];
        
        if (nextThumbnail) {
            nextThumbnail.click();
            currentImageIndex = nextIndex;
        }
    }

    // Start auto-cycle (uncomment to enable)
    // setInterval(autoChangeImage, autoChangeInterval);

    // Pause auto-cycle on hover
    if (mainImage) {
        mainImage.addEventListener('mouseenter', () => {
            // clearInterval(autoChangeInterval);
        });
        
        mainImage.addEventListener('mouseleave', () => {
            // Resume auto-cycle if needed
        });
    }
});

// Auto-cycle through images (optional)
let currentImageIndex = 0;
let autoPlayInterval;

// Initialize auto-play (uncomment to enable)
// startAutoPlay();

// Pause auto-play on hover
const mainImage = document.getElementById('mainImage');

// Export functions for global access
window.switchMainImage = switchMainImage;