// public/js/login.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const msg = document.getElementById('loginMsg');
  
    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        msg.innerHTML = `<span class="text-success">${data.message}</span>`;
        // Redirect to the main page after successful login
        setTimeout(() => window.location.href = '/index', 1500);
      } else {
        msg.innerHTML = `<span class="text-danger">${data.error}</span>`;
      }
    } catch (err) {
      msg.innerHTML = `<span class="text-danger">Login failed. Please try again.</span>`;
    }
  });
  