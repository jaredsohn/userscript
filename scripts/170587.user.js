// ==UserScript==
// @name        Youtube Minimal
// @namespace   YTM
// @include     http*://www.youtube.com/watch?*
// @version     1.0.2
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @run-at      document-start
// ==/UserScript==


//Hide body until after the script was executed to avoid visual glitch
//Proceed with execution as soon as the page is loaded
document.addEventListener('DOMContentLoaded', execOnPageLoad, false);
hideBody(true);


//Execute the script on page load
var ids, hidden, d, di, ct_t, player, pagecontainer;
function execOnPageLoad() {
	ids = ["guide", "watch7-sidebar", "watch7-headline", "watch7-user-header", "watch7-action-buttons", "watch7-action-panels", "yt-masthead-container", "watch-discussion", "footer-container"];
	hidden = GM_getValue("isHidden", true);

	//on/off button
	d = document.createElement("div");
	d.id = "ct_iconbg";
	d.setAttribute("style", "position:fixed;left:0;bottom:0px;border-right:solid 1px #ccc;border-top:solid 1px #ccc;cursor:pointer;background:#ddd");
	di = document.createElement("img");
	di.id = "ct_icon";
	di.style.width = "40px";
	di.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QYLEgEoCTk5VQAAAj1JREFUaN7tmE9rU0EUxX9R8W7cChUh0IUbF91UhEIhIAhCIQsJVJB2lX1BwQ%2FhxxAKLYSKUtBVqeCmJd0UAkIWglAS6tbNgYa4mUIYXtK892aeVufAQN6fufee%2B%2B6cOxlISPg7Iakh6ciNxnUkMJA0dmMQy08tIoHx5LWZRfF147qXaiLwLxM4m%2FI7PgFJK5JOJX2TtFbQdhsYutEuKARrLoZTSSt5JvYnJFCSWn9AhlvO92Uc%2FaIldBvYkbReYfDrwI7zXWgNvAZGE9c3ge0S5ZSrbIBt5%2FMSIxdTvixIupj4hGNJ3QoIdD2fF7O%2B%2Fq1pD8xsVxJeNoZXOH8MPAOeAHeAZffoBPgFHACfzex4hpmhl%2FmXZrZbJiNNtyH7JGlxyjsbknpe5maNnqSNKbYWna8jSc2oeyFJ94F3LuNFcABsmlnhPlErEfwqsAfcLVn2P4HnZva1sk4saRnYzwh%2BBHSAF8CSmdXcLnTJ3et46oazse%2FWTyUavSDpPKOu9yTV55hfd%2B%2F688%2FnmR%2BCQJbzrQJ2tjLsHMYOvpnh9FUJe1kkWjEJHHrOPkT4ot0oKiTpIdDzFuwDM%2FtekkAd6Hv7nkdmdhJahfym0ikbvOv4P4D33u2nMWTUl7mPAavTt7WaDqYSEsLLaAN4m7GYQ%2BMYeGNmX0ITGAALFSV2aGb3QsvoqMLKmNtXHgLtq%2F5Shsp%2B0XOkhITUB%2FJtg0P1hVy6H5JAyL4wt%2B4HOZWI0BcK2ypDIFRfSLqfkPA%2F4zfeZQm2FD6xkgAAAABJRU5ErkJggg%3D%3D";
	d.appendChild(di);
	document.getElementsByTagName("body")[0].appendChild(d);
	d.onclick = function () {
		hideall(ids);
	}
	GM_addStyle("#ct_icon{opacity:0.3} #ct_icon:hover {opacity:1.0} #ct_iconbg{opacity:1.0} #ct_iconbg:hover{opacity:1.0}");
	
	//video title
	ct_t = document.createElement("div");
	ct_t.id = "ct_title";
	ct_t.setAttribute("style", "text-align:center;font-size:26px;margin:12px 0 12px 0;display:none;");
	ct_t.innerHTML = document.getElementById("eow-title").innerHTML;
	document.getElementById("page").parentNode.insertBefore(ct_t, document.getElementById("page"));

	//for repositiong after resizing
	player = document.getElementById("player");
	pagecontainer = document.getElementById("page-container");

	//init
	(function () {
		if (hidden) { //if last known state is hidden, hide everything initially
			for (var i = 0; i < ids.length; ++i) {
				document.getElementById(ids[i]).setAttribute("style", "display:none");
			}
			ct_t.style.display = "block";
			document.body.style.overflow = "hidden";
			scroll(0, 0);
			pagecontainer.style.padding = "0";
			adjustSizes();
		}
	})();
	hideBody(false); //the script was executed, unhide body
}
	
function hideBody(hide) {
	hide = typeof hide !== "undefined" ? hide : true;
	if (!document.body && !hide) {
		setTimeout(hideBody, 20);
	} else {
		document.body.style.opacity = (hide ? "0.0" : "1.0");
	}
}

//Adjust player position, when the player is resized
function adjustSizes() {
	var p = (window.innerWidth - document.getElementById("player-api").offsetWidth) / 2 + 1;

	player.style.padding = "0 0 0 " + p + "px";

	if (hidden) setTimeout(adjustSizes, 200);
	else player.style.padding = "";
}

//Toggle hide, save the new state
function hideall() {
	for (var i = 0; i < ids.length; ++i) {
		document.getElementById(ids[i]).setAttribute("style", "display:" + (hidden ? "block" : "none"));
	}
	if (hidden) { // if it was hidden until now
		ct_t.style.display = "none";
		document.body.style.overflow = "visible";
		pagecontainer.style.padding = "";
	} else {
		ct_t.style.display = "block";
		document.body.style.overflow = "hidden";
		scroll(0, 0);
		pagecontainer.style.padding = "0";
	}
	hidden = (hidden ? false : true);
	GM_setValue("isHidden", hidden);

	adjustSizes(); // has to be called after assigning new value to hidden
}