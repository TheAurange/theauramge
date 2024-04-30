//Created by Aurange

"use strict";

document.querySelector("span#footerCurrent").innerText += ` - ${new Date().getFullYear()}`;

document.querySelectorAll("nav#primary > ul > li").forEach(e => {
	e.addEventListener("click", function(evt){
		if(this.id !== "primary-selected"){
			document.querySelector("section.main#" + document.querySelector("nav#primary > ul > li#primary-selected > span").innerText.replace(" ", "").toLowerCase()).style.display = "none";
			document.querySelector("nav#primary > ul > li#primary-selected").removeAttribute("id");

			this.id = "primary-selected";
			document.querySelector("section.main#" + this.children[0].innerText.replace(" ", "").toLowerCase()).style.display = "block";
		}
	});
});

fetch("https://raw.githubusercontent.com/TheAurange/theaurange.github.io/main/news.json").then(res => res.json()).then(data => {
	data.posts.forEach(e => {
		let tempTitle = document.createElement("span"),
		    tempMeta = document.createElement("span"),
		    tempDetails = document.createElement("span"),
		    tempElem = document.createElement("div");

		tempTitle.classList.add("main-item-title");
		tempTitle.innerHTML = e.title;

		tempMeta.classList.add("main-item-meta");
		tempMeta.innerText = e.meta;

		tempDetails.innerHTML = e.details;

		tempElem.classList.add("main-item");
		tempElem.append(tempTitle, tempMeta, document.createElement("br"), tempDetails);

		document.querySelector("#news").append(tempElem);
	});
});

fetch("https://api.github.com/users/TheAurange/repos", {
	method: "GET",
	headers: {
		"Accept": "application/vnd.github.v3+json"
	}
}).then(res => res.json()).then(data => {
	let abbreviations = ["IP", "UI"];

	data.forEach(e => {
        	if(e.name !== "theaurange.github.io"){
			let tempTitle = document.createElement("span"),
			    tempButton = document.createElement("button"),
			    tempA = document.createElement("a"),
			    tempElem = document.createElement("div");

			tempTitle.classList.add("main-item-title");
			tempTitle.innerText = e.name.replace(/-/g, " ").replace(/(^\w)|(\s\w)/g, l => l.toUpperCase()).replace(new RegExp(`(?:^|\\s)(${abbreviations.join("|")})(?:\\s|$)`, "gi"), w => w.toUpperCase()).replace("Livechart", "LiveChart").replace("Gmail", "GMail");

			tempButton.innerText = "Repo";

			tempA.href = e.html_url + "/";
			tempA.target = "_blank";
			tempA.append(tempButton);

			tempElem.classList.add("main-item");
			tempElem.append(tempTitle, document.createElement("br"), e.description, document.createElement("br"), document.createElement("br"), tempA);

            		if(e.topics.indexOf("userscript") === -1) document.querySelector("#projects").append(tempElem);
            		else document.querySelector("#userscripts").append(tempElem);
        	}
	});
});
