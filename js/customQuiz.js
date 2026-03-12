if (!user) {
    window.location.href = "login.html";
}

const user = JSON.parse(localStorage.getItem("user"));

document.getElementById("welcomeUser").innerText =
    `Welcome ${user.name}, here is your custom quiz`;

const customQuestion = {
    question: `${user.name}, which technology do you enjoy most?`,
    options: ["HTML", "CSS", "JavaScript", "React"],
};

document.getElementById("customQuestion").innerText = customQuestion.question;

const optionsContainer = document.getElementById("customOptions");

customQuestion.options.forEach((option) => {
    let btn = document.createElement("button");
    btn.innerText = option;
    btn.classList.add("option");

    btn.onclick = () => {
        alert(`${option} selected`);
    };

    optionsContainer.appendChild(btn);
});
