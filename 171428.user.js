// ==UserScript==
// @name           XKCD title on click
// @description    Shows mousqe hover title on comic click
// @namespace      http://userscripts.org/users/424650
// @author         JonnyRobbie
// @grant		   none
// @include        /^https?:\/\/(www\.)?xkcd\.com\/(\d+\/)?$/
// @updateURL      https://userscripts.org/scripts/source/171428.meta.js
// @downloadURL    https://userscripts.org/scripts/source/171428.user.js
// @version        2
// ==/UserScript==


function main() {
	var comicDiv = document.getElementById("comic");
	var comic = comicDiv.getElementsByTagName("img")[0];
	var titleWrap = document.createElement("div");
		titleWrap.style.height = "0px";
		titleWrap.style.color = "#fff";
		titleWrap.style.fontStyle = "italic";
		titleWrap.style.fontSize = "0.8em";
		titleWrap.style.marginLeft = "20px";
		titleWrap.style.marginRight = "20px";
	var altTitle = document.createElement("div");
		altTitle.innerHTML = comic.title;
	titleWrap.appendChild(altTitle);
	function animListener() {
		animateIn(titleWrap, altTitle, comic, animListener);
	}
	comic.addEventListener("click", animListener);
	comicDiv.parentNode.insertBefore(titleWrap, comicDiv.nextSibling);
}

function animateIn(outer, inner, comic, animListener){
	var size = 0.0;
	var rgb = 255;
	comic.removeEventListener("click", animListener);
	function animListenerOut() {
		animateOut(outer, inner, comic, animListenerOut);
	}
	var id = setInterval(function() {
		size = size + (inner.clientHeight / 10)
		outer.style.height = Math.round(size) + "px";
		if (inner.clientHeight <= outer.clientHeight) {
			clearInterval(id);
			var id2 = setInterval(function() {
				outer.style.color = "rgb(" + rgb + "," + rgb + "," + rgb + ")";
				if (rgb < 25) {
					clearInterval(id2)
					comic.addEventListener("click", animListenerOut)
				}
				rgb = rgb - 25;
			}, 20)
		}
	}, 20)
}

function animateOut(outer, inner, comic, animListener){
	var size = outer.clientHeight;
	var rgb = 0;
	comic.removeEventListener("click", animListener);
	function animListenerIn() {
		animateIn(outer, inner, comic, animListenerIn);
	}
	var id = setInterval(function() {
		outer.style.color = "rgb(" + rgb + "," + rgb + "," + rgb + ")";
		if (rgb > 230) {
			clearInterval(id);
			var id2 = setInterval(function() {
				size = size - (inner.clientHeight / 10)
				outer.style.height = Math.round(size) + "px";
				if (0 >= outer.clientHeight) {
					clearInterval(id2)
					comic.addEventListener("click", animListenerIn)
				}
			}, 20)
		}
		rgb = rgb + 25;
	}, 20)
}

main();