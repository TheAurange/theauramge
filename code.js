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
			    tempA = document.createElement("a"),
			    tempButton = document.createElement("button");

			tempElem.classList.add("main-item");

			tempTitle.classList.add("main-item-title");
			tempTitle.innerText = e.name.replace(/-/g, " ").replace(/(^\w)|(\s\w)/g, l => l.toUpperCase()).replace("And", "&").replace(new RegExp(`(?:^|\\s)(${abbreviations.join("|")})(?:\\s|$)`, "gi"), w => w.toUpperCase()).replace("Pokeclicker", "PokeClicker");

			tempA.href = e.html_url + "/";
			tempA.target = "_blank";

			tempButton.innerText = "Repo";

			tempA.appendChild(tempButton);

			tempElem.appendChild(tempTitle);
			tempElem.appendChild(document.createTextNode(e.description));
			tempElem.appendChild(tempBr1);
			tempElem.appendChild(tempBr2);
			tempElem.appendChild(tempA);

            		if(e.topics.indexOf("userscript") === -1) document.querySelector("#projects").appendChild(tempElem);
            		else document.querySelector("#userscripts").appendChild(tempElem);
        	}
	});
});

if(y > 2022) document.querySelector("section#footer").innerText += " - " + y;

document.querySelector("section#footer").innerHTML += " <a href=\"https://twitter.com/True_Aurange/with_replies/\" target=\"_blank\">Aurange</a>";
