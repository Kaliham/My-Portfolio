let blink;
window.onload = (event) => {
	blink = '<span id="blinking"></span>';
	let titleEL = document.getElementById("title-title");
	let titleTexts = [
		"Software Engineer",
		"BackEnd / Fullstack Developer",
		"Computer Scientist",
	];
	let subtitleEl = document.getElementById("title-title-bot");
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

let typewriteWord = async (text, el) => {
	el.innerHTML = "";
	for (let j = 0; j < text.length; j++) {
		el.innerHTML = text.substring(0, j + 1) + blink;
		await sleep(120);
	}
};
let deleteWord = async (text, el) => {
	el.innerHTML = text + blink;

	for (let j = text.length; j > 0; j--) {
		el.innerHTML = text.substring(0, j) + blink;
		await sleep(120);
	}
};

let sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
