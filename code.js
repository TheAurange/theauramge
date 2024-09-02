//Created by Aurange

"use strict";

let yr = new Date().getFullYear();

if(yr !== 2024){
	document.querySelector("span#footerCurrent").innerText += ` - ${yr}`;
}

fetch("https://api.github.com/users/TheAurange/repos", {
	method: "GET",
	headers: {
		"Accept": "application/vnd.github.v3+json"
	}
}).then(res => res.json()).then(data => {
	data.forEach(e => {
        	if(!e.name.match(/theaurange/i)){
			let tempTitle = document.createElement("span"),
			    tempType = document.createElement("span"),
			    tempElem = document.createElement("div"),
			    tempA = document.createElement("a");

			tempTitle.classList.add("itemTitle");
			tempTitle.innerText = e.name.replace(/-/g, " ").replace(/(^\w)|(\s\w)/g, l => l.toUpperCase()).replace("Gmail", "GMail");

			tempType.innerText = (e.topics.indexOf("userscript") === -1) ? ` ${String.fromCodePoint(0x1F4A1)}` : ` ${String.fromCodePoint(0x1F435)}`;

			tempElem.classList.add("item");
			tempElem.append(tempTitle, tempType, document.createElement("br"), document.createElement("br"), e.description);

			tempA.href = e.html_url + "/";
			tempA.target = "_blank";
			tempA.append(tempElem);

			document.querySelector("section#wrap").append(tempA);
        	}
	});
});
