// ==UserScript==
// @name           header
// @namespace      boards.4chan.org/g
// @include        http://www.brchan.org/*/res/*.html
// @include        http://www.brchan.org/*/
// ==/UserScript==

inputs = document.getElementsByTagName("input");

navbar = document.getElementsByClassName('navbar');
newbar = document.createElement('div');
newbar.innerHTML = navbar[0].innerHTML;
newbar.setAttribute('id','header');
newbar.style.position = "fixed";
newbar.style.background = "rgba(200,200, 200, 0.85)";

navbar[0].parentNode.removeChild(navbar[0]);
navbar[0].parentNode.removeChild(navbar[0]);

document.body.appendChild(newbar);

hideb = document.createElement('a');
hideb.href = "javascript:";
hideb.appendChild(document.createTextNode("[Esconder Posts]"));
hideb.addEventListener("click", hidePosts, false);


showb = document.createElement('a');
showb.href = "javascript:";
showb.appendChild(document.createTextNode("[Mostrar Posts]"));
showb.addEventListener("click", showPosts, false);

newbar.appendChild(hideb);
newbar.appendChild(showb);

function showPosts() {
	for (var i = 10; i < inputs.length; i++) {
		if (inputs[i].type == "checkbox") {
			inputs[i].parentNode.parentNode.style.display = "table";
		}
	}
}
function hidePosts() {
	for (var i = 10; i < inputs.length; i++) {
		if (inputs[i].type == "checkbox" && inputs[i].name == "post[]" && inputs[i].checked == true) {
  			inputs[i].parentNode.parentNode.style.display = "none";
		}
	}
}


