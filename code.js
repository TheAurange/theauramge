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

let y = new Date().getFullYear();

if(y > 2022) document.querySelector("section#footer").innerText += " - " + y;
document.querySelector("section#footer").innerHTML += " <a href=\"https://twitter.com/True_Aurange/with_replies/\" target=\"_blank\">Aurange</a>";
