let blink;
let skillBlink;
let inUse;

window.onload = (event) => {
	blink = '<span id="blinking"></span>';
	skillBlink = '<span id="blinking-skill-info"></span>';
	inUse = false;
	let titleEL = document.getElementById("title-title");
	let titleTexts = [
		"Software Engineer",
		"BackEnd / Fullstack Developer",
		"Computer Scientist",
	];
	let skillsInfo = [
		"Spring Boot<br><br>• Work Experience at Amazon<br> • Spring JPA<br>• Spring Security " +
			"<br>• Reactive Spring<br>• Spring MVC<br>• Spring Injections and patterns" +
			"<br>• REST API<br>• Lombok<br>• Spring Testing/JUnit 5",
		"Java <br><br>• OOP<br>• Multithreading<br>• JDBC<br>• Functional Programming<br>• Streams<br>• Maven",
		"NodeJS <br><br>• Express.js <br>• Middleware<br>• RESTAPIs<br>• Axios<br>• MongoDB<br>• Sockets.IO<br>• Yarn<br>• Setting up a discord bot.",
		"C# <br><br>• ASP.Net <br>• Entity Framework<br>• Work Experience at EHS.com.jo",
		"MySQL<br><br>• Join<br>• nested statements<br>• aggregation<br>• ordering",
		"PostgreSQL<br><br>• Join<br>• nested statements<br>• aggregation<br>• ordering",
		"AWS<br><br>• EC2 Containers<br>• Setting up VPC<br>• AWS Elastic IPs <br>• setting up a NAT",
		"git<br><br>• git pull<br>• git commit<br>• merging/pull request<br>• resloving conflict<br>• branching",
		"Javascript<br><br>• Async, promises<br>• ES6<br>• Jquery<br>• DOM elements<br>• functional programming",
		"Dart<br><br>• Async<br>• Streams<br>• functional programming",
		"Flutter<br><br>• Working with google maps<br>• BLoC<br>• Providers<br>• Firebase<br>• GetIt(Service Locator Pattern)<br>• Flutter hooks ",
		"mongoDB<br><br>• Setting DB using atlas cloud platform<br>• Reactive mongoDB<br>• connecting to <br>1. Spring<br>2. Node.js<br>Django",
		"Unix Shell<br><br>•Basic unix commands<br>• Ubunto Package Manger<br>• Bash Script<br>• Brew macos Package manger",
		"ZSH<br><br>• Setting up .zshrc<br>• ohmyzsh",
		"vim<br><br>• setting up .vimrc<br>• proficient in shortcuts<br>• Experience with neoVim<br>• vim script to execute code. ",
	];

	let subtitleEl = document.getElementById("title-title-bot");
	let skillInfoEl = document.getElementById("skill-info");
	let skillOnClickListener = async (el) => {
		let index = el.dataset.index;
		inUse = !inUse;

		if (inUse == false) {
			await sleep(90);
			inUse = true;
		}

		typewriteWord(skillsInfo[index], skillInfoEl, 67, skillBlink, true);
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
	quitable = false
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
