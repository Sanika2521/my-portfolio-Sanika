function toggleSettings() {
  const panel = document.getElementById("settingsPanel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
}

function changeTheme(theme) {
  document.body.className = "theme-" + theme;
}

function changeFont(font) {
  document.body.style.fontFamily = font;
}

function changeFontSize(size) {
  document.body.style.fontSize = size;
}

// Optional: apply default large size on load
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.fontSize = "18px";
});
document.addEventListener("DOMContentLoaded", () => {
  let text = "Sanika’s Portfolio";
  let i = 0;
  function type() {
    if (i < text.length) {
      document.getElementById("typing").innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }
  type();
});
window.addEventListener("scroll", () => {
  const about = document.querySelector(".about-content");
  const sectionPos = about.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;
  if (sectionPos < screenPos) {
    about.style.opacity = "1";
  }
});
let currentArt = '';
let currentUser = '';


document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('userName');
  const stars = document.querySelectorAll('.star-rating span');

  // Check if name already saved
  if (localStorage.getItem('art_user')) {
    currentUser = localStorage.getItem('art_user');
    nameInput.value = currentUser;
    nameInput.style.display = 'none'; // Hide after 1st time
  }

  // Artwork image click = open modal
  document.querySelectorAll('.art-card img').forEach(img => {
    img.addEventListener('click', () => {
      document.getElementById('modal').style.display = 'flex';
      document.getElementById('modalImage').src = img.src;
      document.getElementById('modalTitle').textContent = img.alt || "Artwork";
      currentArt = img.src;
      highlightPreviousRating(currentArt);
    });
  });

  // Close modal
  document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
  });

  // Star selection
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = star.dataset.star;
      stars.forEach(s => s.classList.remove('selected'));
      for (let i = 0; i < rating; i++) {
        stars[i].classList.add('selected');
      }
    });
  });

  // Save rating
  window.saveRating = function () {
    let name = nameInput.value.trim();

    // If name already saved, use that
    if (!currentUser && name) {
      currentUser = name;
      localStorage.setItem('art_user', name);
      nameInput.style.display = 'none';
    }

    if (!currentUser || document.querySelectorAll('.star-rating span.selected').length === 0) {
      alert('Please enter your name and select a rating.');
      return;
    }

    const data = {
      name: currentUser,
      rating: document.querySelectorAll('.star-rating span.selected').length,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem(`rating_${currentArt}`, JSON.stringify(data));
    alert('Thanks for rating!');
    document.getElementById('modal').style.display = 'none';
  };

  // Prefill previous rating if exists
  function highlightPreviousRating(imageSrc) {
    const data = localStorage.getItem(`rating_${imageSrc}`);
    stars.forEach(s => s.classList.remove('selected'));
    if (data) {
      const parsed = JSON.parse(data);
      for (let i = 0; i < parsed.rating; i++) {
        stars[i].classList.add('selected');
      }
    }
  }

  // Optional: Reset user
  const resetBtn = document.getElementById('resetUser');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('art_user');
      location.reload();
    });
  }
});
// Load saved journal entries on page load
window.onload = function () {
  loadJournalEntries();
};

function saveJournalEntry() {
  const journalText = document.getElementById('journalText').value.trim();
  if (journalText === '') return;

  const entry = {
    text: journalText,
    timestamp: new Date().toLocaleString()
  };

  // Retrieve existing entries or initialize
  let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  entries.unshift(entry); // Add new entry to top
  localStorage.setItem('journalEntries', JSON.stringify(entries));

  document.getElementById('journalText').value = '';
  loadJournalEntries(); // Refresh entries
}

function loadJournalEntries() {
  const entriesContainer = document.getElementById('entriesContainer');
  entriesContainer.innerHTML = '';

  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];

  entries.forEach(entry => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('journal-entry');
    entryDiv.innerHTML = `
      <p>${entry.text}</p>
      <span style="font-size: 0.8rem; color: #aaa;">🕒 ${entry.timestamp}</span>
    `;
    entriesContainer.appendChild(entryDiv);
  });
}
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}
// Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("projectModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalTags = document.getElementById("modalTags");
  const modalDesc = document.getElementById("modalDesc");
  const closeBtn = document.querySelector(".close");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const image = card.getAttribute("data-image");
      const title = card.getAttribute("data-title");
      const tags = card.getAttribute("data-tags");
      const desc = card.getAttribute("data-desc");

      modalImage.src = image;
      modalTitle.textContent = title;

      // Clear old tags
      modalTags.innerHTML = "";
      tags.split(",").forEach(tag => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag.trim();
        modalTags.appendChild(span);
      });

      modalDesc.textContent = desc;

      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target == modal) modal.style.display = "none";
  });
});
