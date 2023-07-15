const screens = document.querySelectorAll(".screen");
const choosebirdButtons = document.querySelectorAll(".choose-bird-btn");
const startButton = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const message = document.getElementById("message");
let seconds = 0;
let score = 0;
let selectedbird = {};

startButton.addEventListener("click", () => screens[0].classList.add("up"));

const increaseScore = () => {
  score++;
  if (seconds>60)  message.classList.add("visible");
  scoreElement.innerHTML = `Score: ${score}`;
};

const addbirds = () => {
  setTimeout(createbird, 1000);
  setTimeout(createbird, 1500);
};

const catchbird = function () {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove, 2000);
  addbirds();
};

const getRandomLocation = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
};

const createbird = () => {
  const bird = document.createElement("div");
  bird.classList.add("bird");
  const { x, y } = getRandomLocation();
  bird.style.top = `${y}px`;
  bird.style.left = `${x}px`;
  bird.innerHTML = `<img src="${selectedbird.src}" 
  alt="${selectedbird.alt}" 
  style="transform: rotate(${Math.random() * 360}deg)" />`;
  bird.addEventListener("click", catchbird);
  gameContainer.appendChild(bird);
};

const increaseTime = () => {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeElement.innerHTML = `Time: ${m}:${s}`;
  seconds++;
};

const startGame = () => setInterval(increaseTime, 1000);

choosebirdButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    const src = image.getAttribute("src");
    const alt = image.getAttribute("alt");
    selectedbird = { src, alt };
    screens[1].classList.add("up");
    setTimeout(createbird, 1000);
    startGame();
  });
});