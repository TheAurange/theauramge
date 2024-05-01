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
	let abbreviations = ["IP", "UI"];

	data.forEach(e => {
        	if(!e.name.match(/theaurange/i)){
			let tempTitle = document.createElement("span"),
			    tempButton = document.createElement("button"),
			    tempA = document.createElement("a"),
			    tempElem = document.createElement("div");

			tempTitle.classList.add("itemTitle");
			tempTitle.innerText = e.name.replace(/-/g, " ").replace(/(^\w)|(\s\w)/g, l => l.toUpperCase()).replace(new RegExp(`(?:^|\\s)(${abbreviations.join("|")})(?:\\s|$)`, "gi"), w => w.toUpperCase()).replace("Livechart", "LiveChart").replace("Gmail", "GMail");

			tempButton.innerText = "Repo";

			tempA.href = e.html_url + "/";
			tempA.target = "_blank";
			tempA.append(tempButton);

			tempElem.classList.add("item");
			tempElem.append(tempTitle, document.createElement("br"), document.createElement("br"), e.description, document.createElement("br"), document.createElement("br"), tempA);

            		if(e.topics.indexOf("userscript") === -1) document.querySelector("#projects > .itemWrap").append(tempElem);
            		else document.querySelector("#userscripts > .itemWrap").append(tempElem);
        	}
	});
});
