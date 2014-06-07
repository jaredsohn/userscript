// ==UserScript==
// @name           Reddit message instead hover
// @description    Useful when browsing on iPad (jailbroken as only on jailbroken iPad can you install userscripts) and cannot hover mouse over stuff
// @namespace      http://userscripts.org/users/424650
// @author         JonnyRobbie
// @include        http://*.reddit.com/*
// @version        1.0.2
// ==/UserScript==


function main() {
	console.log("reddit click alert");
	var links = document.getElementsByTagName("a");
	for (var i=0; i<links.length; i++) {
		if (links[i].title && links[i].href!="http://www.reddit.com/message/inbox/" && links[i].href!="http://www.reddit.com/message/unread/") {
			//links[i].title = "test";
			if (links[i].innerHTML == "") {
				links[i].addEventListener('click', function(){if (confirm(this.title + "\nContinue to the link?")){window.location.href=this.href;};}, false);
				links[i].onclick = function(){return false;};
			}
			if (links[i].innerHTML != "") {
				//links[i].addEventListener('click', function(){alert(this.innerHTML + ": " + this.title);}, false);
				links[i].addEventListener('click', function(){if (confirm(this.innerHTML + ": " + this.title + "\nContinue to the link?")){window.location.href=this.href;};}, false);
				links[i].onclick = function(){return false;};
			}
		}
		else if (links[i].href == "http://www.reddit.com/spoiler" || links[i].href == "http://www.reddit.com/s") {
			links[i].addEventListener('click', function(){if (confirm("Spoiler: " + this.innerHTML + "\nContinue to the link?")){window.location.href=this.href;};}, false);
			links[i].onclick = function(){return false;};
		}
	}
}
main();