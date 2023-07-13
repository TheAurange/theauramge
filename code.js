//Created by Aurange

"use strict";

let y = new Date().getFullYear();

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
		let tempElem = document.createElement("div"),
		    tempTitle = document.createElement("span"),
		    tempMeta = document.createElement("span"),
		    tempBr = document.createElement("br"),
		    tempDetails = document.createElement("span");

		tempElem.classList.add("main-item");

		tempTitle.classList.add("main-item-title");
		tempTitle.innerHTML = e.title;

		tempMeta.classList.add("main-item-meta");
		tempMeta.innerText = e.meta;

		tempDetails.innerHTML = e.details;

		tempElem.appendChild(tempTitle);
		tempElem.appendChild(tempMeta);
		tempElem.appendChild(tempBr);
		tempElem.appendChild(tempDetails);

		document.querySelector("#news").appendChild(tempElem);
	});
});

fetch("https://api.github.com/users/TheAurange/repos?sort=created_at&direction=asc", {
	method: "GET",
	headers: {
		"Accept": "application/vnd.github.v3+json"
	}
}).then(res => res.json()).then(data => {
	let abbreviations = ["IP", "UI"];

	data.forEach(e => {
        	if(e.name !== "theaurange.github.io"){
			let tempElem = document.createElement("div"),
			    tempTitle = document.createElement("span"),
			    tempBr1 = document.createElement("br"),
			    tempBr2 = document.createElement("br"),
			    tempBr3 = document.createElement("br"),
			    tempA = document.createElement("a"),
			    tempButton = document.createElement("button");

			tempElem.classList.add("main-item");

			tempTitle.classList.add("main-item-title");
			tempTitle.innerText = e.name.replace(/-/g, " ").replace(/(^\w)|(\s\w)/g, l => l.toUpperCase()).replace("And", "&").replace(new RegExp(`(?:^|\\s)(${abbreviations.join("|")})(?:\\s|$)`, "gi"), w => w.toUpperCase()).replace("Pokeclicker", "PokeClicker");

			if(e.archived === true) tempTitle.innerText += " (Archived)";

			tempA.href = e.html_url + "/";
			tempA.target = "_blank";

			tempButton.innerText = "Repo";

			tempA.appendChild(tempButton);

			tempElem.appendChild(tempTitle);
			tempElem.appendChild(tempBr1);
			tempElem.appendChild(document.createTextNode(e.description));
			tempElem.appendChild(tempBr2);
			tempElem.appendChild(tempBr3);
			tempElem.appendChild(tempA);

            		if(e.topics.indexOf("userscript") === -1) document.querySelector("#projects").appendChild(tempElem);
            		else document.querySelector("#userscripts").appendChild(tempElem);
        	}
	});
});

if(y > 2022) document.querySelector("span#footerCurrent").innerText += " - " + y;
