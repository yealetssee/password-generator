let copyicon = document.querySelector(".copySVG");
let password = document.querySelector(".pswrd");
let copied = document.querySelector(".copy span");

let charLength = document.querySelector(".charLength span");
let range = document.querySelector("input[type='range']");
let rangeValue = range.value;
let uppercase = document.querySelector("#uppercase");
let lowercase = document.querySelector("#lowercase");
let numbers = document.querySelector("#numbers");
let symbols = document.querySelector("#symbols");
let bar1 = document.querySelector(".first");
let bar2 = document.querySelector(".second");
let bar3 = document.querySelector(".third");
let bar4 = document.querySelector(".fourth");
let strength = document.querySelector(".showStrength p");
let button = document.querySelector("button");
let bars = document.querySelectorAll(".bar");

let checkboxes = document.querySelectorAll("input[type='checkbox']");

charLength.innerHTML = rangeValue;

range.addEventListener("input", (e) => {
  let target = e.target;
  let value = target.value;
  let min = target.min;
  let max = target.max;
  target.style.backgroundSize = `${((value - min) * 100) / (max - min)}% 100%`;
  charLength.innerHTML = value;
});

button.addEventListener("click", (e) => {
  const Numbers = "0123456789";
  const Uppercase = "ABCDEFGHIJKLMNOPQRSTUVDXYZ";
  const Lowercase = "abcdefghijklmnopqrstuvwxyz";
  const Symbols = "!@#$%^&*()_+-=\\|[{]};:'\",<.>/?";
  length = range.value;
  let characters = "";

  if (uppercase.checked) {
    characters += Uppercase;
  }

  if (lowercase.checked) {
    characters += Lowercase;
  }
  if (numbers.checked) {
    characters += Numbers;
  }
  if (symbols.checked) {
    characters += Symbols;
  }
  if (
    uppercase.checked === false &&
    lowercase.checked === false &&
    numbers.checked === false &&
    symbols.checked === false
  ) {
    password.textContent = "You must choose a password type";
    password.style.color = `${"var(--red)"}`;
    password.style.fontSize = "2rem";
    return;
  }
  let checkedNumber = 0;
  checkboxes.forEach((i) => {
    if (i.checked) {
      checkedNumber += 1;
    }
  });
  strength.style.display = "block";
  if (checkedNumber == 1) {
    if (length <= 8) {
      bars.forEach((bar) => {
        bar.className = "";
      });

      strength.textContent = "Too Weak!";
      bar1.classList.add("tooweak");
    } else if (length > 12) {
      bar1.classList.add("weak");
      bar2.classList.add("weak");
      strength.textContent = "Weak!";
    }
  } else if (checkedNumber == 2) {
    bars.forEach((bar) => {
      bar.className = "";
    });
    strength.textContent = "Weak!";

    bar1.classList.add("weak");
    bar2.classList.add("weak");
    if (length >= 10) {
      strength.textContent = "Medium";

      bar1.classList.add("medium");
      bar2.classList.add("medium");
      bar3.classList.add("medium");
    }
  } else if (checkedNumber == 3) {
    bars.forEach((bar) => {
      bar.className = "";
    });
    strength.textContent = "Medium";

    bar1.classList.add("medium");
    bar2.classList.add("medium");
    bar3.classList.add("medium");
    if (length >= 12) {
      strength.textContent = "Strong";
      bar1.classList.add("strong");
      bar2.classList.add("strong");
      bar3.classList.add("strong");
      bar4.classList.add("strong");
    }
  } else if (checkedNumber == 4) {
    strength.textContent = "Strong";
    bar1.classList.add("strong");
    bar2.classList.add("strong");
    bar3.classList.add("strong");
    bar4.classList.add("strong");
  }

  let pswrd = "";

  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    pswrd += characters[array[i] % characters.length];
  }

  password.textContent = pswrd;
  password.style.color = "var(--almost-white)";

  copyicon.addEventListener("click", () => {
    // password.select();
    // password.setSelectionRange(0, 9999);
    let copyText = password.innerHTML;

    navigator.clipboard.writeText(copyText);
    copied.style.display = "inline";
  });
});
