const errorImg = '<i class="fas fa-bomb"></i>  ';
const sentImg = '<i class="fas fa-envelope-open-text"></i>  ';
const fixImg = '<span id="ex-mark">!</span>  ';
const emailRegex = new RegExp(
	/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
);

$("#quick-email-btn").click(() => {
	let emailVal = $("#quick-email-input").val();
	validateEmail(emailVal)
		.then((request) => trim(request))
		.then((request) => sendQuickEmail(request))
		.then((data) => handleEmailSentResponse(data))
		.catch((msg) => showSnackBar(msg));
});
$("#contactme-send-button").click(() => {
	let emailVal = $("#full-email-email").val();
	let subjectVal = $("#full-email-subject").val();
	let bodyVal = $("#contactme-textarea").val();
	validateEmail(emailVal)
		.then((email) => validateSubject(email, subjectVal))
		.then((response) => validateBody(response, bodyVal))
		.then((response) => trim(response))
		.then((response) =>
			sendFullEmail(response.email, response.subject, response.body)
		)

		.then((data) => handleEmailSentResponse(data))
		.catch((errorMsg) => {
			showSnackBar(errorMsg);
			console.log("subjectVal:" + subjectVal);
			console.log("bodyVal:" + bodyVal);
		});
});
let trim = (text) => {
	console.log(text);

	return new Promise((resolve) => {
		Object.keys(text).map((key, ind) => text[key].replace(/ /g, "%20"));
		resolve(text);
	});
};
let validateEmail = (email) =>
	new Promise((resolve, reject) => {
		//regex from http://emailregex.com/
		if (emailRegex.test(email)) {
			resolve({ email: email });
		} else {
			reject(fixImg + " Check the email!");
		}
	});
let validateSubject = (response, subject) =>
	new Promise((resolve, reject) => {
		const nonEmptyRegex = new RegExp(/(\w{2,})\W(\w{2,})/gim);
		if (nonEmptyRegex.test(subject)) {
			console.log("hellow?");
			resolve({ email: response.email, subject: subject });
		} else {
			reject(fixImg + " Check the subject!");
		}
	});
let validateBody = (response, body) =>
	new Promise((resolve, reject) => {
		const nonEmptyRegex = new RegExp(/(\w{2,})\W(\w{2,})/gim);
		if (nonEmptyRegex.test(body)) {
			resolve({ email: response.email, subject: response.subject, body: body });
		} else {
			reject(fixImg + " Check the body!");
		}
	});
let handleEmailSentResponse = (data) => {
	console.log("data:" + data);
	if (data.status == "OK") {
		showSnackBar(sentImg + " Email sent !");
	} else {
		showSnackBar(errorImg + " An Error occurred !");
	}
};
let sendQuickEmail = (request) =>
	fetch("https://kaliham-emailing-service-PROD.up.railway.app/quick-email", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "text/plain",
		},
		body: JSON.stringify({ toEmail: request.email }),
	}).then((response) => response.json());
let sendFullEmail = (toEmailVal, subjectVal, bodyVal) =>
	fetch("https://kaliham-emailing-service-PROD.up.railway.app/full-email", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "text/plain",
		},
		body: JSON.stringify({
			toEmail: toEmailVal,
			body: bodyVal,
			subject: subjectVal,
		}),
	}).then((response) => response.json());

let showSnackBar = (text) => {
	let snackbar = document.getElementById("snackbar");

	snackbar.className = "show";
	snackbar.innerHTML = text;

	setTimeout(function () {
		snackbar.className = snackbar.className.replace("show", "");
	}, 2300);
};
