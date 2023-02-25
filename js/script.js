const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    tryAgainBtn = document.querySelector(".stats .redo"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".error span b"),
    wpmTag = document.querySelector(".wpm span b"),
    cpmTag = document.querySelector(".cpm span b");

const paragraphs = [
    "I checked to make sure that he was still alive.",
    "I never knew what hardship looked like until it started raining bowling balls.",
    "It would have been a better night if the guys next to us weren't in the splash zone.",
    "He picked up trash in his spare time to dump in his neighbor's yard.",
    "People who insist on picking their teeth with their elbows are so annoying!",
    "The tart lemonade quenched her thirst, but not her longing.",
    "It was difficult for Mary to admit that most of her workout consisted of exercising poor judgment.",
    "Their argument could be heard across the parking lot.",
    "Nothing is as cautiously cuddly as a pet porcupine.",
];

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

document.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        resetGame();
    }
});

function loadParagraph() {
    console.log("Loading Sentences...")
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(word => {
        let span = `<span>${word}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    console.log("Started Typing Test...")
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
        loadParagraph;
    }
}

function initTimer() {
    console.log("Started Timing...")
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
        inpField.value = "";
        loadParagraph;
    }
}

function resetGame() {
    console.log("Resetting Test...")
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

// theme stuffs
function showThemeCenter() {
    document.getElementById('theme-center').classList.remove('hidden');
    document.getElementById('command-center').classList.add('hidden');
}

function hideThemeCenter() {
    document.getElementByClassName('theme-center').classList.add('hidden');
    document.getElementByClassName('command-center').classList.remove('hidden');
}

// init
console.log("Loaded!")
loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
    cpmTag.innerText = 0;


console.log("Loaded!")
loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
resetGame();
    