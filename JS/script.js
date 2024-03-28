let skorPemain = 0;
let skorKomputer = 0;
let statusPemain = "";

function playRound(pilihanPemain, pilihanKomputer) {
    if (pilihanPemain === pilihanKomputer) {
        statusPemain = "tie";
    }
    if (
        (pilihanPemain === "BATU" && pilihanKomputer === "GUNTING") ||
        (pilihanPemain === "GUNTING" && pilihanKomputer === "KERTAS") ||
        (pilihanPemain === "KERTAS" && pilihanKomputer === "BATU")
    ) {
        skorPemain++;
        statusPemain = "player";
    }
    if (
        (pilihanKomputer === "BATU" && pilihanPemain === "GUNTING") ||
        (pilihanKomputer === "GUNTING" && pilihanPemain === "KERTAS") ||
        (pilihanKomputer === "KERTAS" && pilihanPemain === "BATU")
    ) {
        skorKomputer++;
        statusPemain = "computer";
    }
    updateScoreMessage(statusPemain, pilihanPemain, pilihanKomputer);
}

function getRandomChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
        case 0:
            return "BATU";
        case 1:
            return "KERTAS";
        case 2:
            return "GUNTING";
    }
}

function isGameOver() {
    return skorPemain === 5 || skorKomputer === 5;
}

const scoreInfo = document.getElementById("scoreInfo");
const scoreMessage = document.getElementById("scoreMessage");
const playerScorePara = document.getElementById("playerScore");
const computerScorePara = document.getElementById("computerScore");
const playerSign = document.getElementById("playerSign");
const computerSign = document.getElementById("computerSign");
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const endgameModal = document.getElementById("endgameModal");
const endgameMsg = document.getElementById("endgameMsg");
const overlay = document.getElementById("overlay");
const restartBtn = document.getElementById("restartBtn");

rockBtn.addEventListener("click", () => handleClick("BATU"));
paperBtn.addEventListener("click", () => handleClick("KERTAS"));
scissorsBtn.addEventListener("click", () => handleClick("GUNTING"));
restartBtn.addEventListener("click", restartGame);
overlay.addEventListener("click", closeEndgameModal);

function handleClick(pilihanPemain) {
    if (isGameOver()) {
        openEndgameModal();
        return;
    }

    const pilihanKomputer = getRandomChoice();
    playRound(pilihanPemain, pilihanKomputer);
    updateChoices(pilihanPemain, pilihanKomputer);
    updateScore();

    if (isGameOver()) {
        openEndgameModal();
        setFinalMessage();
    }
}

function updateChoices(pilihanPemain, pilihanKomputer) {
    switch (pilihanPemain) {
        case "BATU":
            playerSign.textContent = "✊";
            break;
        case "KERTAS":
            playerSign.textContent = "✋";
            break;
        case "GUNTING":
            playerSign.textContent = "✌";
            break;
    }

    switch (pilihanKomputer) {
        case "BATU":
            computerSign.textContent = "✊";
            break;
        case "KERTAS":
            computerSign.textContent = "✋";
            break;
        case "GUNTING":
            computerSign.textContent = "✌";
            break;
    }
}

function updateScore() {
    if (statusPemain === "tie") {
        scoreInfo.textContent = "Itu adalah seri";
    } else if (statusPemain === "player") {
        scoreInfo.textContent = "Kamu menang!";
    } else if (statusPemain === "computer") {
        scoreInfo.textContent = "Kamu kalah!";
    }

    playerScorePara.textContent = `Pemain: ${skorPemain}`;
    computerScorePara.textContent = `Komputer: ${skorKomputer}`;
}

function updateScoreMessage(winner, pilihanPemain, pilihanKomputer) {
    if (winner === "player") {
        scoreMessage.textContent = `${capitalizeFirstLetter(
            pilihanPemain
        )} melawan ${pilihanKomputer.toLowerCase()}`;
        return;
    }
    if (winner === "computer") {
        scoreMessage.textContent = `${capitalizeFirstLetter(
            pilihanPemain
        )} terkalahkan oleh ${pilihanKomputer.toLowerCase()}`;
        return;
    }

    scoreMessage.textContent = `${capitalizeFirstLetter(
        pilihanPemain
    )} sama dengan ${pilihanKomputer.toLowerCase()}`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function openEndgameModal() {
    endgameModal.classList.add("active");
    overlay.classList.add("active");
}

function closeEndgameModal() {
    endgameModal.classList.remove("active");
    overlay.classList.remove("active");
}

function setFinalMessage() {
    return skorPemain > skorKomputer
        ? (endgameMsg.textContent = "Kamu Menang!")
        : (endgameMsg.textContent = "Maaf, Kamu Kalah...😭");
}

function restartGame() {
    skorPemain = 0;
    skorKomputer = 0;
    scoreInfo.textContent = "Pilih Jari Mu!";
    scoreMessage.textContent = "Raih 5 Poin Untuk Memenangkan Pertandingan";
    playerScorePara.textContent = "Kamu: 0";
    computerScorePara.textContent = "Komputer: 0";
    playerSign.textContent = "❌";
    computerSign.textContent = "❌";
    endgameModal.classList.remove("active");
    overlay.classList.remove("active");
}
