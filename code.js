let projects = [],
    userscripts = [],
    y = new Date().getFullYear();

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
	data.forEach(e => {
        	if(e.name !== "theaurange.github.io"){
            		if(e.topics.indexOf("userscript") === -1) projects.push([e.name, e.description, e.html_url + "/"]);
            		else userscripts.push([e.name, e.description, e.html_url + "/"]);
        	}
	});

	document.querySelectorAll("section.main").forEach(e1 => {
		if(e1.id === "projects"){
			projects.forEach(e2 => {
				let tempElem = document.createElement("div"),
				    tempTitle = document.createElement("span"),
				    tempBr1 = document.createElement("br"),
				    tempBr2 = document.createElement("br"),
				    tempBr3 = document.createElement("br"),
				    tempBr4 = document.createElement("br"),
				    tempA = document.createElement("a"),
				    tempButton = document.createElement("button");

				tempElem.classList.add("main-item");

				tempTitle.classList.add("main-item-title");
				tempTitle.innerText = e2[0].replace(/-/g, " ").replace(/(^\w{1})|(\s{1}\w{1})/g, l => l.toUpperCase()).replace("And", "&");

				tempA.href = e2[2];
				tempA.target = "_blank";

				tempButton.innerText = "Repo";

				tempA.appendChild(tempButton);

				tempElem.appendChild(tempTitle);
				tempElem.appendChild(tempBr1);
				tempElem.appendChild(tempBr2);
				tempElem.appendChild(document.createTextNode(e2[1]));
				tempElem.appendChild(tempBr3);
				tempElem.appendChild(tempBr4);
				tempElem.appendChild(tempA);

				e1.appendChild(tempElem);
			});
		}
		else if(e1.id === "userscripts"){
			userscripts.forEach(e2 => {
				let tempElem = document.createElement("div"),
				    tempTitle = document.createElement("span"),
				    tempBr1 = document.createElement("br"),
				    tempBr2 = document.createElement("br"),
				    tempBr3 = document.createElement("br"),
				    tempBr4 = document.createElement("br"),
				    tempA = document.createElement("a"),
				    tempButton = document.createElement("button");

				tempElem.classList.add("main-item");

				tempTitle.classList.add("main-item-title");
				tempTitle.innerText = e2[0].replace(/-/g, " ").replace(/(^\w{1})|(\s{1}\w{1})/g, l => l.toUpperCase()).replace("And", "&");

				tempA.href = e2[2];
				tempA.target = "_blank";

				tempButton.innerText = "Repo";

				tempA.appendChild(tempButton);

				tempElem.appendChild(tempTitle);
				tempElem.appendChild(tempBr1);
				tempElem.appendChild(tempBr2);
				tempElem.appendChild(document.createTextNode(e2[1]));
				tempElem.appendChild(tempBr3);
				tempElem.appendChild(tempBr4);
				tempElem.appendChild(tempA);

				e1.appendChild(tempElem);
			});
		}
	});
});

if(y > 2022) document.querySelector("section#footer").innerText += " - " + y;
document.querySelector("section#footer").innerHTML += " <a href=\"https://twitter.com/True_Aurange/with_replies/\" target=\"_blank\">Aurange</a>";
