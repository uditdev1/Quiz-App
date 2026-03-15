const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

document.getElementById("profileName").innerText =
`${user.name}'s Profile`;

document.getElementById("totalQuiz").innerText =
localStorage.getItem("totalQuiz") || 0;

document.getElementById("lastScore").innerText =
localStorage.getItem("lastScore") || 0;

document.getElementById("lastGame").innerText =
localStorage.getItem("lastGame") || "General Quiz";

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}