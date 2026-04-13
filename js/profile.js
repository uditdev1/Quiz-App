const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

document.getElementById("profileName").innerText =
`${user.name}'s Profile`;

document.getElementById("userBadge").innerText =
localStorage.getItem("badge") || "Beginner 🐣";

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

document.getElementById("lastGame").innerText =
localStorage.getItem("lastGame") || "General Quiz";

const activityList = document.getElementById("activityList");
const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

activityList.innerHTML = "";

history.slice().reverse().forEach(item => {
    let div = document.createElement("div");
    div.classList.add("activity-card");

    div.innerHTML = `
        <strong>${item.quiz}</strong><br>
        Score: ${item.score}<br>
        Date: ${item.date}
    `;

    activityList.appendChild(div);
});

const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

const labels = history.map(item => item.date);
const scores = history.map(item => {
    return parseInt(item.score.split("/")[0]);
});

const ctx = document.getElementById("scoreChart");

new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: "Quiz Scores",
            data: scores,
            borderColor: "#013220",
            backgroundColor: "rgba(1,50,32,0.1)",
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        }
    }
});
