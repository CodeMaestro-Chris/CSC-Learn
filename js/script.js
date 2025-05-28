// For the FAQ Accordion 
const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;

        // Toggle current content
        if (content.classList.contains('drop')) {
            content.classList.remove('drop');
            header.classList.remove('active');
        } else {
            // Close all other contents
            document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('drop'));
            document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));

            // Open current content
            content.classList.add('drop');
            header.classList.add('active');
        }
    });
});


// To the top button slide in and out
const toTopBtn = document.querySelector('.to-top');

  window.addEventListener('scroll', () => {
    const halfway = document.documentElement.scrollHeight / 2;

    if (window.scrollY > halfway) {
      toTopBtn.style.right = '-20px'; // Slide in
    } else {
      toTopBtn.style.right = '-70px'; // Slide out
    }
  });



// The course preview modal on the course details page
function previewNote(noteUrl) {
  document.getElementById('notePreviewFrame').src = noteUrl;
  document.getElementById('downloadLink').href = noteUrl;

  const modal = new bootstrap.Modal(document.getElementById('notePreviewModal'));
  modal.show();
}


// Exam Date Countdown 
  function updateCountdown() {
    const examDate = new Date("2025-07-14T09:00:00"); // Set exam date & time
    const now = new Date();
    const diff = examDate - now;

    if (diff <= 0) {
      document.getElementById("examTimer").textContent = "It's exam day!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("examTimer").textContent = 
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // Initial run and refresh every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

// Countdown ends here




// For The Section of Year Two Courses
const courseTopics = [
  {
    course: "Software Engineering",
    topics: [
      { title: "History of Software Engineering", page: 1 },
      { title: "Principles: Modularity, Abstraction", page: 2 },
      { title: "Software Quality & Goals", page: 3 },
      { title: "CASE Tools", page: 4 },
      { title: "SDLC Models", page: 5 },
      { title: "Waterfall, Spiral, XP", page: 8 }
    ]
  },
  {
    course: "Software Security & Management",
    topics: [
      { title: "CIA Triad", page: 1 },
      { title: "Security Tools & Controls", page: 2 },
      { title: "Risk Management", page: 4 },
      { title: "Pen Testing", page: 6 },
      { title: "ISO Standards", page: 8 },
      { title: "Policy Frameworks", page: 11 }
    ]
  },
  {
    course: "Logic & Digital Systems",
    topics: [
      { title: "Logic Gates", page: 1 },
      { title: "Boolean Algebra", page: 2 },
      { title: "Combinational Circuits", page: 3 },
      { title: "Flip-Flops", page: 4 },
      { title: "Registers & Counters", page: 6 },
      { title: "Timing Diagrams", page: 9 }
    ]
  }
];

const input = document.getElementById("searchInput");
const results = document.getElementById("searchResults");

input.addEventListener("input", () => {
  const keyword = input.value.toLowerCase();
  results.innerHTML = "";

  if (keyword.trim() === "") return;

  courseTopics.forEach(course => {
    course.topics.forEach(topic => {
      if (topic.title.toLowerCase().includes(keyword)) {
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        item.innerHTML = `
          <strong>${topic.title}</strong><br>
          <small class="text-muted">${course.course} — Page ${topic.page}</small>
        `;
        results.appendChild(item);
      }
    });
  });

  if (results.innerHTML === "") {
    results.innerHTML = `<li class="list-group-item" style="color: rgb(231, 2, 2); font-weight: 551">No matches found.</li>`;
  }
});



