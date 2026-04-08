// SIGNUP FUNCTION
function signup() {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    const user = {
        name,
        email,
        password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup successful");
    window.location.href = "login.html";
}


// LOGIN FUNCTION
function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

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