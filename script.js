let para =
  ["JavaScript, the dynamic wizard of web development, serves as the transformative force behind the digital landscape. It's the enchanting storyteller that brings static web pages to life, infusing them with interactivity, responsiveness, and charm. Much like a skilled magician, JavaScript wields its spellbinding syntax to orchestrate the seamless interaction between HTML and CSS, creating captivating user experiences. From form validation to dynamic content updates, JavaScript empowers developers to craft immersive web applications that engage and delight users. Its versatility knows no bounds, allowing it to adapt to various tasks and scenarios effortlessly. With its ubiquity across browsers and platforms, JavaScript has become the lingua franca of the web, bridging the gap between technology and creativity. Like a master illusionist, it dazzles users with its ability to animate, manipulate the DOM, and create stunning visual effects, turning mundane websites into captivating digital experiences. In the ever-evolving landscape of web development, JavaScript remains a cornerstone, continuously enchanting developers and users alike with its boundless potential and endless possibilities.",   
"In JavaScript, the DOM (Document Object Model) is a programming interface that represents the structure of an HTML document as a tree-like structure of objects. Each element in an HTML document, such as <div>, <p>, or <img>, is represented by a corresponding object in the DOM tree. These objects can be accessed and manipulated using JavaScript, allowing developers to dynamically update the content, structure, and style of a web page.The DOM provides methods and properties for interacting with these objects, enabling tasks such as creating new elements, modifying attributes, changing styles, and handling events. For example, developers can use DOM manipulation techniques to dynamically add or remove elements from a page, update the content of existing elements based on user interactions, or respond to user input events like clicks or keystrokes.By leveraging the DOM, JavaScript can transform static HTML documents into dynamic and interactive web applications, providing a powerful tool for building modern web experiences. Additionally, frameworks like React and Vue.js abstract away much of the DOM manipulation complexity, making it easier for developers to create complex user interfaces efficiently.",
"In JavaScript, events are actions or occurrences that happen in the browser or the web page. These events can be triggered by the user, the browser, or by other scripts. Examples of events include mouse clicks, keyboard presses, page loading, form submissions, and many more.Events in JavaScript are typically handled by event listeners, which are functions that are executed in response to a specific event occurring. Event listeners are attached to HTML elements using methods such as addEventListener(), allowing developers to define custom behavior for when an event occurs. For example, you can add a click event listener to a button element to perform a specific action when the button is clicked.Event handling in JavaScript enables developers to create dynamic and interactive web pages by responding to user interactions and other browser events. By leveraging events, developers can build features like form validation, drag-and-drop functionality, animations, and much more, enhancing the user experience of their web applications. Additionally, event-driven programming is a fundamental concept in JavaScript and is widely used in modern web development frameworks and libraries.",
"In JavaScript, an API (Application Programming Interface) refers to a set of rules, protocols, and tools that allow different software applications to communicate and interact with each other. APIs provide a standardized way for developers to access specific functionalities or data from external systems, libraries, or services without needing to understand their underlying implementation details.In the context of JavaScript, APIs can be categorized into two main types: browser APIs and third-party APIs. Browser APIs are built into web browsers and provide developers with functionalities to manipulate web pages, handle user interactions, make HTTP requests, and more. Examples include the Document Object Model (DOM) API, the Fetch API for making HTTP requests, and the Web Audio API for working with audio.Third-party APIs are created by external companies or developers and provide access to their services or data. These APIs enable developers to integrate features such as social media sharing, mapping, weather data retrieval, and more into their JavaScript applications, expanding their functionality and enhancing user experiences.Overall, APIs in JavaScript empower developers to create dynamic, interactive, and feature-rich web applications by leveraging the functionalities and data provided by various APIs.",
]
let list = [];
for(let i of para){
  list.push(i);
}
let typingSpace = document.querySelector("#typingSpace")
let typingContent = typingSpace.firstElementChild;
let result = document.querySelector("#result");
let body = document.querySelector("body");
let timeLeft = document.querySelector("#time");
let speed = result.firstElementChild;
let accuracy = document.getElementById("aquracy");
let tryAgainBtn = document.querySelector('button');
let randomNumber = 0;
randomNumber = Math.floor(Math.random() * 4) + 1;

function displayList() {
  for (let i = 0; i < list[randomNumber].length; i++) {
    typingContent.innerHTML += `<span id='span'>${list[randomNumber].charAt(i)}<span>`;
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
  if (e.key == list[randomNumber].charAt(i)) {
    typingContent.children.item(i).setAttribute("class", "correct");
    if (list[randomNumber].charAt(i) === " ") words++;
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
    typingSpace.scrollTo({top: 0, behavior: 'smooth'})
    timeLeft.style.width = `0%`;
    speed.innerText = `WPM : ${Math.floor(correct/5)}`;
    accuracy.innerText = `ACCURACY : ${Math.floor((correct / totelKeyPressed) * 100)}%`;
    body.removeEventListener("keypress", fun);
    typingSpace.style.display = "none";
    randomNumber = Math.floor(Math.random() * 4) + 1;
  }
}

tryAgainBtn.addEventListener("click", (e) => {
  if(e.pointerType === 'mouse'){
    typingSpace.style.display = "block";
    typingContent.innerHTML = null;
    displayList();
    timeLeft.style.width = `0%`;
    typingSpace.scrollTo({top: 0, behavior: 'smooth'})
    clearInterval(interval);
    body.addEventListener("keypress", fun);
    speed.innerText = `WPM : ${0}`;
    accuracy.innerText = `ACCURACY : ${0}%`;
    (i = 0), (count = 0), (words = 0), (wrongWords = 0), (correct = 0),(totelKeyPressed = 0);
  }
});

