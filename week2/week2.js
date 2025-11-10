// 1. Toggle show/hide for container 1
function toggleContainer1() {
  const text = document.getElementById("toggleText1");
  const button = event.target;

  if (text.style.display === "none") {
    text.style.display = "block";
    button.textContent = "Hide Content";
  } else {
    text.style.display = "none";
    button.textContent = "Show Content";
  }
}

// 2. Show container 2
function showContainer() {
  document.getElementById("container2").style.display = "block";
}

// 3. Change image between download1.jpg and download2.jpg
let currentImage = 1;
function changeImage() {
  const image = document.getElementById("demoImage");
  if (currentImage === 1) {
    image.src = "download2.jpg";
    currentImage = 2;
  } else {
    image.src = "download1.jpg";
    currentImage = 1;
  }
}

// 4. Change background color randomly
function changeColor() {
  const container = document.getElementById("container4");
  const colors = ["#ffcccc", "#ccffcc", "#ccccff", "#ffffcc", "#ffd9b3"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  container.style.backgroundColor = randomColor;
}

// 5. Change HTML content
function changeContent() {
  const content = document.getElementById("contentText");
  content.innerHTML = "<b>Content has been changed successfully!</b>";
}

// 6. Show sum of 5 + 6
function showSum() {
  const sum = 5 + 6;
  const result = document.getElementById("sumResult");
  result.textContent = `The sum of 5 + 6 is ${sum}.`;
}
function ControlF(){
    let num1 = 2;
    let num2 = 5;
    if (num1 > num2) {
        return epp = num1 - num2;
    } else {
        return epp = num2 + num1;
    }
}

function display4()
{
    document.getElementById("Controlifelse").innerHTML = ControlF();
}