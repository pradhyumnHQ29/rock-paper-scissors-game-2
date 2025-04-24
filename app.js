let userScore = 0;
let compScore = 0;
let isMuted = false;  // Boolean to track whether sound is muted or not

const choices = document.querySelectorAll(".choice");
const clickSound = new Audio("mouse-click-sound-233951.mp3");
const winSound = new Audio("win.mp3");
const loseSound = new Audio("lose.mp3");
const drawSound = new Audio("draw.mp3");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const muteButton = document.querySelector("#mute-button");  // Mute button reference

function genCompChoice() {
    const option = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return option[randIdx];
}

// Function to mute/unmute the sounds
const toggleMute = () => {
    isMuted = !isMuted;  // Toggle mute state
    if (isMuted) {
        muteButton.innerHTML = "Unmute";  // Change button text
    } else {
        muteButton.innerHTML = "Mute";  // Change button text back
    }
}

// Function to play sounds only if not muted
const playSound = (sound) => {
    if (!isMuted) {
        sound.currentTime = 0;  // Reset sound to start
        sound.play();
    }
};

const drawGame = () => {
    msg.innerHTML = "Game was a draw. Play again!";
    msg.style.backgroundColor = "#081c24";
    playSound(drawSound);  // Play draw sound if not muted
};

const showWinner = (userwin) => {
    if (userwin) {
        userScore++;
        userScorePara.innerHTML = userScore;
        msg.innerHTML = "You win!";
        msg.style.backgroundColor = "green";
        playSound(winSound);  // Play win sound if not muted
    } else {
        compScore++;
        compScorePara.innerHTML = compScore;
        msg.innerHTML = "You lose!";
        msg.style.backgroundColor = "red";
        playSound(loseSound);  // Play lose sound if not muted
    }
};

const playGame = (userchoice) => {
    const compchoice = genCompChoice();
    if (userchoice === compchoice) {
        drawGame();
    } else {
        let userwin = true;
        if (userchoice === "rock") {
            userwin = compchoice === "paper" ? false : true;
        } else if (userchoice === "paper") {
            userwin = compchoice === "scissors" ? false : true;
        } else {
            userwin = compchoice === "rock" ? false : true;
        }
        showWinner(userwin);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        playSound(clickSound);  // Play click sound if not muted
        choice.classList.add("clicked");
        setTimeout(() => {
            choice.classList.remove("clicked");
        }, 150);
        const userchoice = choice.getAttribute("id");
        playGame(userchoice);
    });

    choice.addEventListener("touchstart", () => { // For mobile touch support
        playSound(clickSound);  // Play click sound if not muted
        choice.classList.add("clicked");
        setTimeout(() => {
            choice.classList.remove("clicked");
        }, 150);
    });
});

// Mute button functionality
muteButton.addEventListener("click", toggleMute);
