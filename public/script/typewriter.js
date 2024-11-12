// import data from "./data/skills.json";

let blink;
let skillBlink;
let inUse;

window.onload = async (event) => {
  blink = '<span id="blinking"></span>';
  skillBlink = '<span id="blinking-skill-info"></span>';
  inUse = false;
  let titleEL = document.getElementById("title-title");
  let titleTexts = [
    "Software Engineer",
    "BackEnd / Fullstack Developer",
    "Computer Scientist",
  ];
  let skillsInfo = [];
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch("skills.json", { headers: myHeaders })
    .then((response) => response.json())
    .then((json) => {
      skillsInfo = json.map(
        (skill) => `${skill.title} </br></br>${skill.skills.join("</br>")}`,
      );
      console.log(skillsInfo);
    });
  let subtitleEl = document.getElementById("title-title-bot");
  let skillInfoEl = document.getElementById("skill-info");
  let choosen = -1;
  let skillOnClickListener = async (el) => {
    let index = el.dataset.index;
    let sleepTime = 67;
    if (choosen == index) {
      sleepTime = 0;
    }
    choosen = index;
    inUse = !inUse;

    if (inUse == false) {
      await sleep(90);
      inUse = true;
    }

    typewriteWord(skillsInfo[index], skillInfoEl, sleepTime, skillBlink, true);
  };
  document.querySelectorAll(".skill-container").forEach((el) => {
    el.addEventListener("click", async () => skillOnClickListener(el));
  });
  typewriter(titleEL, titleTexts);
  typewriter(subtitleEl, titleTexts);
};

let typewriter = async (el, texts) => {
  let i = 0;
  while (true) {
    await typewriteWord(texts[i], el);
    await sleep(1000);
    await deleteWord(texts[i], el);
    i = i + 1 >= texts.length ? 0 : i + 1;
  }
};

let typewriteWord = async (
  text,
  el,
  sleeptime = 120,
  blinkel = blink,
  quitable = false,
) => {
  el.innerHTML = "";
  for (let j = 0; j < text.length; j++) {
    if (!inUse && quitable) return;
    el.innerHTML = text.substring(0, j + 1) + blinkel;
    await sleep(sleeptime);
  }
  if (quitable) inUse = false;
};

let deleteWord = async (text, el, sleeptime = 120) => {
  el.innerHTML = text + blink;

  for (let j = text.length; j > 0; j--) {
    el.innerHTML = text.substring(0, j) + blink;
    await sleep(sleeptime);
  }
};
//helper
let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
