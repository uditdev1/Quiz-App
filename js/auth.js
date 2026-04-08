function login() {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");

    if (!emailInput || !passwordInput) {
        alert("Input fields not found!");
        return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("No user found. Please signup first.");
        return;
    }

    if (user.email === email && user.password === password) {
        alert("Login successful");
        window.location.href = "games.html";
    } else {
        alert("Invalid email or password");
    }
}