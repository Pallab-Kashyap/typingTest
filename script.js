let para =
  "JavaScript, the dynamic wizard of web development, serves as the transformative force behind the digital landscape. It's the enchanting storyteller that brings static web pages to life, infusing them with interactivity, responsiveness, and charm. Much like a skilled magician, JavaScript wields its spellbinding syntax to orchestrate the seamless interaction between HTML and CSS, creating captivating user experiences. From form validation to dynamic content updates, JavaScript empowers developers to craft immersive web applications that engage and delight users. Its versatility knows no bounds, allowing it to adapt to various tasks and scenarios effortlessly. With its ubiquity across browsers and platforms, JavaScript has become the lingua franca of the web, bridging the gap between technology and creativity. Like a master illusionist, it dazzles users with its ability to animate, manipulate the DOM, and create stunning visual effects, turning mundane websites into captivating digital experiences. In the ever-evolving landscape of web development, JavaScript remains a cornerstone, continuously enchanting developers and users alike with its boundless potential and endless possibilities."
let list = para.split();
let typingSpace = document.querySelector("#typingSpace")
let typingContent = typingSpace.firstElementChild;
let result = document.querySelector("#result");
let body = document.querySelector("body");
let timeLeft = document.querySelector("#time");
let speed = result.firstElementChild;
let accuracy = document.getElementById("aquracy");
let tryAgainBtn = document.querySelector('button');

function displayList() {
  for (let i = 0; i < list[0].length; i++) {
    typingContent.innerHTML += `<span id='span'>${list[0].charAt(i)}<span>`;
  }
}
displayList();

let count = 0;
let words = 1;
let i = 0;
let interval;
let totelKeyPressed = 0;
let correct = 0;
let token = 0;

body.addEventListener("keydown", (e) => {
  if (e.key == "Backspace" && i != 0) {
    if (token < 2) {
      i--;
      typingContent.children.item(i).removeAttribute("class", "wrong");
    } else {
      typingContent.children.item(i).removeAttribute("class", "wrong");
    }
    token--;
  }
});

body.addEventListener("keypress", fun);

function fun(e) {
  e.preventDefault();
  if (i === 0) interval = setInterval(timer, 100);
  if (e.key == list[0].charAt(i)) {
    typingContent.children.item(i).setAttribute("class", "correct");
    if (list[0].charAt(i) === " ") words++;
    if(words % 9 === 0){
        typingSpace.scrollTo({top: 5*words, behavior: 'smooth'})
    }
    i++;
    correct++;
    token = 0;
  } else {
    typingContent.children.item(i).setAttribute("class", "wrong");
    if (token < 2) {
      i++;
      token++;
    }
  }
  totelKeyPressed++;
}

function timer() {
  count++;
  speed.innerText = `WPM : ${Math.floor(((Math.floor(correct/5))*60)/(count/10))}`;
  accuracy.innerText = `ACCURACY : ${Math.floor((correct / totelKeyPressed) * 100)}%`;
  document.querySelector("#time").style.width = `${count/6}%`;

  if (count === 600) {
    clearInterval(interval);
    timeLeft.style.width = `0%`;
    speed.innerText = `WPM : ${Math.floor(correct/5)}`;
    accuracy.innerText = `ACCURACY : ${Math.floor((correct / totelKeyPressed) * 100)}%`;
    body.removeEventListener("keypress", fun);
    typingSpace.style.display = "none";
  }
}

tryAgainBtn.addEventListener("click", (e) => {
  if(e.pointerType === 'mouse'){
  body.addEventListener("keypress", fun);
  typingContent.innerHTML = null;
  displayList();

  clearInterval(interval);
  speed.innerText = `WPM : ${0}`;
  accuracy.innerText = `ACCURACY : ${0}%`;
    (i = 0), (count = 0), (words = 0), (wrongWords = 0), (correct = 0),(totelKeyPressed = 0);

    typingSpace.scrollTo({top: -1000, behavior: 'smooth'})
    typingSpace.style.display = "block";
    timeLeft.style.width = `0%`;
  }
});

