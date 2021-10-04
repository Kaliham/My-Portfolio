//Elements
let nameEl;
let titleEl;
let descriptionEl;
let introContainerEl;
let introArticleEl;
let setupImgContianerEL;
//Speeds
let nameSpeed;
let titleSpeed;
let initDone;
let init = () => {
	console.log("init..");
	nameEl = document.getElementById("title-name");
	titleEl = document.getElementById("title-title");
	descriptionEl = document.getElementById("title-description");
	introContainerEl = document.getElementById("intro-container");
	introArticleEl = document.getElementById("intro-atricle");
	setupImgContianerEL = document.getElementById("setup-img-container");
	//Speeds
	nameSpeed = 0.28;
	titleSpeed = -0.32;
	initDone = true;
};

$(window).scroll(function () {
	if (initDone != true) init();
	let scrollPos = $(this).scrollTop();
	if (scrollPos > setupImgContianerEL.clientHeight) {
		setupImgContianerEL.style.position = "absolute";
		setupImgContianerEL.style.bottom = "0vh";
		// $("#setup-img-container").css({ bottom: });
	} else {
		setupImgContianerEL.style.position = "fixed";
	}
	let percentage = scrollPos / (introContainerEl.clientHeight * 0.6);
	let InvPercentage = max(1 - percentage, 0);

	let bgSize = max(400 - 300 * percentage, 100);
	$("#setup-img-container").css({
		"background-size": bgSize + "%",
	});
	nameScroll(scrollPos);
	titleScroll(scrollPos);
	changeOpacity(InvPercentage, introArticleEl);
});
let changeOpacity = (percentage, element) => {
	element.style.opacity = percentage;
	console.log(percentage);
};
let nameScroll = (scrollPos) => {
	horizontalScroll(scrollPos, nameSpeed, nameEl);
};
let titleScroll = (scrollPos) => {
	horizontalScroll(scrollPos, titleSpeed, titleEl);
};
let horizontalScroll = (scrollPos, speed, element) => {
	element.style.transform = `translateX(${scrollPos * speed}px)`;
};
let verticalScroll = (scrollPos, speed, element) => {
	element.style.transform = `translateY(${scrollPos * speed}px)`;
};
// $(window).on("resize", calculate());
// $(window).on("load", calculate());

// function calculate() {
// 	var scroll = $(window).scrollTop();
// 	console.log("scrol:" + scroll);
// 	var img = document.getElementById("setup-img");
// 	var imgContainer = document.getElementById("setup-img-container");
// 	var imgWidth = img.clientWidth;
// 	var imgHeight = img.clientHeight;
// 	var percentage = scroll / window.outerHeight;
// 	var percentageInverse = window.innerHeight / scroll;
// 	console.log(percentage);
// 	let InvPercentage = max(1 - percentage, 0);
// 	$("#setup-img").css({
// 		height: 100 * (1 + InvPercentage * 2) + "vh",
// 		left: "0px",
// 		right: "0px",
// 		top: 0,
// 	});
// 	if (percentage > 1) {
// 		$("#setup-img").css({
// 			top: 0 - (percentage - 1) * 100 + "vh",
// 		});
// 	} else {
// 		imgContainer.style.position = "fixed";
// 		console.log(" fixed");
// 	}
// 	$("#setup-img-container").css({
// 		bottom: 0 + 170 * InvPercentage + "vh",
// 	});

// }
let max = (x, y) => {
	return x < y ? y : x;
};
let min = (x, y) => {
	return -1 * max(x * -1, y * -1);
};
