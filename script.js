// Get references to the popup elements
const popup = document.getElementById('project-popup');
const closeBtn = document.querySelector('.close-btn');
const projectCards = document.querySelectorAll('.project-card');

// Open the popup when a "View Project" button is clicked
projectCards.forEach(card => {
  card.querySelector('.view-project-btn').addEventListener('click', () => {
    const title = card.getAttribute('data-title');
    const description = card.getAttribute('data-description');
    const link = card.getAttribute('data-link');

    // Update the popup content
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-description').textContent = description;
    document.getElementById('popup-link').setAttribute('href', link);

    // Show the popup
    popup.style.display = 'block';
  });
});

// Close the popup when the close button is clicked
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Close the popup when clicking outside of the popup content
window.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none';
  }
});

async function renderReviews() {
  const response = await fetch('http://localhost:5000/reviews');
  const reviews = await response.json();

  const reviewsContainer = document.getElementById('reviews');
  reviewsContainer.innerHTML = '';

  reviews.forEach((review) => {
    const reviewElement = document.createElement('div');
    reviewElement.innerHTML = `
      <h4>${review.name}</h4>
      <p>Rating: ${review.rating}</p>
      <p>${review.comment}</p>
      <small>${new Date(review.created_at).toLocaleString()}</small>
    `;
    reviewsContainer.appendChild(reviewElement);
  });
}

renderReviews();