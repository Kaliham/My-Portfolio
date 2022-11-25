const menuBtn = document.querySelector(".menu-btn");
const hamMenu = document.querySelector(".hamburger-list");
const toggleopens = document.querySelectorAll(".toggle-open");

let menuOpen = false;
menuBtn.addEventListener("click", () => {
	console.log("clicked");
	toggleOpen();
});
toggleopens.forEach((el) => {
	el.addEventListener("click", () => {
		toggleOpen();
	});
});

function toggleOpen() {
	console.log(" toggle");
	if (!menuOpen) {
		menuBtn.classList.add("open");
		hamMenu.classList.add("open");
		menuOpen = true;
	} else {
		menuBtn.classList.remove("open");
		hamMenu.classList.remove("open");
		menuOpen = false;
	}
}
