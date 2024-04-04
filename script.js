let para =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et mollitia accusamus amet veniam? Tenetur autem voluptatibus vitae nostrum exercitationem quae eaque itaque odio aliquid veritatis, labore vel, obcaecati unde at dolore cupiditate aliquam, ea sapiente ad inventore veniam eveniet voluptas minus? Laudantium enim, consequuntur tenetur atque laborum unde possimus commodi incidunt fugiat voluptatibus, quam aliquid nulla quae nihil inventore architecto adipisci repellat vero consequatur tempora perferendis explicabo! Et nisi architecto omnis reiciendis eum explicabo qui consequuntur suscipit adipisci error, id totam in ut, dolorum delectus.";
let list = para.split();
let typingSpace = document.querySelector("#typingSpace").firstElementChild;
let result = document.querySelector("#result");
let body = document.querySelector("body");
let count = 0;
let words = 0;

function displayList() {
  for (let i = 0; i < list[0].length; i++) {
    typingSpace.innerHTML += `<span id='span'>${list[0].charAt(i)}<span>`;
  }
}
displayList();

let i = 0;
let interval;
let totelKeyPressed = 0;
let correct = 0;
let token = 0;

body.addEventListener("keydown", (e) => {
  if(i != 0){
  if (e.key == "Backspace") {
    if (token < 2) {
      i--;
      typingSpace.children.item(i).removeAttribute("class", "wrong");
    } else {
      typingSpace.children.item(i).removeAttribute("class", "wrong");
    }
    token--;
  }
}
});
body.addEventListener("keypress", fun);

function fun(e) {
  if (i === 0) interval = setInterval(timer, 100);
  if (e.key == list[0].charAt(i)) {
    typingSpace.children.item(i).setAttribute("class", "correct");
    if (list[0].charAt(i) === " ") words++;
    i++;
    correct++;
    token = 0;
  } else {
    typingSpace.children.item(i).setAttribute("class", "wrong");
    if (token < 2) {
      i++;
      token++;
    }
  }
  totelKeyPressed++;
}

function timer() {
  count++;
  result.firstElementChild.innerText = `WPM : ${Math.floor((words*60)/(count/10))}`;
  document.getElementById("aquracy").innerText = `ACCURACY : ${Math.floor((correct / totelKeyPressed) * 100)}%`;
  document.querySelector("#time").style.width = `${count/6}%`;

  if (count === 600) {
    document.querySelector("#time").style.width = `0%`;
    clearInterval(interval);
    result.firstElementChild.innerText = `WPM : ${Math.floor(words)}`;
  
      document.getElementById("aquracy").innerText = `ACCURACY : ${Math.floor((correct / totelKeyPressed) * 100)}%`;
    
    body.removeEventListener("keypress", fun);
    (i = 0), (count = 0), (words = 0), (wrongWords = 0), (correct = 0);
    displayList();

    typingSpace.parentElement.style.display = "none";
  }
}

document.querySelector('button').addEventListener("click", (e) => {
  if(e.pointerType === 'mouse'){
  body.addEventListener("keypress", fun);
  typingSpace.innerHTML = null;
  displayList();

  clearInterval(interval);
  result.firstElementChild.innerText = `WPM : ${0}`;

    document.getElementById("aquracy").innerText = `ACCURACY : ${0}%`;
    (i = 0), (count = 0), (words = 0), (wrongWords = 0), (correct = 0);

    typingSpace.parentElement.style.display = "block";
    document.querySelector("#time").style.width = `0%`;
  }
});
