// Loading Screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen")
  const loadingProgress = document.getElementById("loadingProgress")

  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 30
    if (progress >= 100) {
      progress = 100
      clearInterval(interval)
      setTimeout(() => {
        loadingScreen.classList.add("hidden")
      }, 500)
    }
    loadingProgress.style.width = progress + "%"
  }, 200)
})

// Scroll Progress Indicator
window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scrollProgress")
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = (window.scrollY / windowHeight) * 100
  scrollProgress.style.width = scrolled + "%"
})

// Particles Canvas Animation
const canvas = document.getElementById("particlesCanvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particles = []
const particleCount = 50

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 1 - 0.5
    this.speedY = Math.random() * 1 - 0.5
    this.opacity = Math.random() * 0.5 + 0.2
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > canvas.width) this.x = 0
    if (this.x < 0) this.x = canvas.width
    if (this.y > canvas.height) this.y = 0
    if (this.y < 0) this.y = canvas.height
  }

  draw() {
    ctx.fillStyle = `rgba(139, 69, 19, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle) => {
    particle.update()
    particle.draw()
  })

  // Draw connections
  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach((b) => {
      const dx = a.x - b.x
      const dy = a.y - b.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        ctx.strokeStyle = `rgba(139, 69, 19, ${0.2 * (1 - distance / 100)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    })
  })

  requestAnimationFrame(animateParticles)
}

initParticles()
animateParticles()

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// Music Player Functionality
const musicPlayer = document.getElementById("musicPlayer")
const backgroundMusic = document.getElementById("backgroundMusic")
const musicIcon = document.getElementById("musicIcon")
let isPlaying = false

musicPlayer.addEventListener("click", () => {
  if (isPlaying) {
    backgroundMusic.pause()
    musicPlayer.classList.remove("playing")
    musicIcon.innerHTML = '<path d="M9 18V5l12-2v13M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>'
  } else {
    backgroundMusic.play()
    musicPlayer.classList.add("playing")
    musicIcon.innerHTML =
      '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>'
  }
  isPlaying = !isPlaying
})

// Accordion Functionality
function toggleAccordion(header) {
  const item = header.parentElement
  const content = item.querySelector(".accordion-content")
  const allItems = document.querySelectorAll(".accordion-item")

  allItems.forEach((otherItem) => {
    if (otherItem !== item) {
      otherItem.querySelector(".accordion-header").classList.remove("active")
      otherItem.querySelector(".accordion-content").classList.remove("active")
    }
  })

  header.classList.toggle("active")
  content.classList.toggle("active")
}

// Mobile Menu Functionality
const menuButton = document.getElementById("menuButton")
const mobileMenu = document.getElementById("mobileMenu")
const menuLinks = document.querySelectorAll(".mobile-menu-link")

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("active")
  mobileMenu.classList.toggle("active")
})

menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    menuButton.classList.remove("active")
    mobileMenu.classList.remove("active")

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" })
    }
  })
})

document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
    menuButton.classList.remove("active")
    mobileMenu.classList.remove("active")
  }
})

// Smooth scroll for scroll indicator
document.querySelector(".scroll-indicator").addEventListener("click", () => {
  document.querySelector("#countdown").scrollIntoView({ behavior: "smooth" })
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el)
})

// Countdown Timer Functionality
function updateCountdown() {
  const weddingDate = new Date("2025-11-30T11:00:00").getTime()
  const now = new Date().getTime()
  const distance = weddingDate - now

  if (distance < 0) {
    document.getElementById("days").textContent = "00"
    document.getElementById("hours").textContent = "00"
    document.getElementById("minutes").textContent = "00"
    document.getElementById("seconds").textContent = "00"
    return
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  document.getElementById("days").textContent = String(days).padStart(2, "0")
  document.getElementById("hours").textContent = String(hours).padStart(2, "0")
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0")
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0")
}

updateCountdown()
setInterval(updateCountdown, 1000)

// Form Validation and Submission
const rsvpForm = document.getElementById("rsvpForm")
const messageForm = document.getElementById("messageForm")

function showToast(title, message) {
  const toast = document.getElementById("toast")
  const toastTitle = toast.querySelector(".toast-title")
  const toastMessage = toast.querySelector(".toast-message")

  toastTitle.textContent = title
  toastMessage.textContent = message

  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 4000)
}

if (rsvpForm) {
  rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(rsvpForm)

    try {
      const response = await fetch(rsvpForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        showToast("Success!", "Your RSVP has been submitted successfully!")
        rsvpForm.reset()
      } else {
        showToast("Error", "There was a problem submitting your RSVP. Please try again.")
      }
    } catch (error) {
      showToast("Error", "There was a problem submitting your RSVP. Please try again.")
    }
  })
}

if (messageForm) {
  messageForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(messageForm)

    try {
      const response = await fetch(messageForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        showToast("Success!", "Your message has been sent successfully!")
        messageForm.reset()
      } else {
        showToast("Error", "There was a problem sending your message. Please try again.")
      }
    } catch (error) {
      showToast("Error", "There was a problem sending your message. Please try again.")
    }
  })
}

// Ripple Effect for Buttons
document.querySelectorAll(".ripple-button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    ripple.classList.add("ripple")

    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Tilt Effect for Cards
document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
  })
})

// Lazy Loading for Images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.add("loaded")
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    imageObserver.observe(img)
  })
}

// Smooth Scroll Enhancement
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Console Easter Egg
console.log("%c👨‍💻 Built By Orapeleng Madibela", "color: #8B4513; font-size: 16px; font-weight: bold;")
console.log("%c🎉 Congratulations to Madibela's Family!", "color: #D4AF37; font-size: 14px;")
