// ==UserScript==
// @name           ThisIgnore
// @description    Provides manual filtering controls for dis.4chan.org. Users can hide threads or posts by clicking on links added to the right side of the screen, or reset an entire thread's filtered status by hiding a thread that already contains filtered posts (requires page reload.)
// @namespace      http://dis.4chan.org
// @include        http://dis.4chan.org/*

var censors = eval(localStorage.getItem("censors"));
if(censors == null || censors == "") censors = [];
localStorage.setItem("censors", censors.toSource());

killthread = function() {
	var censors = eval(localStorage.getItem("censors"));
	if(censors[this.target] != null) {
		delete censors[this.target];
		alert("Reset all visibility for " + this.target);
	} else {
		this.parentNode.parentNode.parentNode.className += " threadspam";
		censors[this.target] = 1;
	}
	localStorage.setItem("censors", censors.toSource());
}

function killpost() {
	var censors = eval(localStorage.getItem("censors"));
	this.parentNode.className += " spam";
	if(censors[this.target] == null) censors[this.target] = new Object();
	censors[this.target][this.post] = 1;
	localStorage.setItem("censors", censors.toSource());
}

var arr = document.getElementsByTagName("div");

GM_addStyle(".killbutton { float: right; display: block; cursor: pointer; }");
GM_addStyle(".threadspam { height: 33px; overflow: hidden; opacity: 0.4 }");
GM_addStyle(".spam { height: 20px; overflow: hidden; opacity: 0.4 }");
GM_addStyle(".threadkillbutton { margin-left: 3px; cursor: pointer; }");

for (i = 0; i < arr.length; i++) {
	if(arr[i].className == "border") {
		var h2s = arr[i].getElementsByTagName("h2");
		var threadid = "t" + h2s[0].firstChild.nextSibling.nextSibling.name;

		var spans = arr[i].getElementsByTagName("span");
		for (j = 0; j < spans.length; j++) {
			if(spans[j].className == "navlinks") {
				threadnav = spans[j];
				break;
			}
		}

		var killbutton = document.createElement("span");
		killbutton.className = "threadkillbutton navlinks";
		killbutton.target = threadid;
		killbutton.innerHTML = '<a>&#x25c6;</a>';
		killbutton.addEventListener("click", killthread);
		// arr[i].insertBefore(killbutton, arr[i].firstChild);
		threadnav.appendChild(killbutton);

		if(censors[threadid] == 1) arr[i].className += " threadspam";
	} else if(arr[i].className == "post even" || arr[i].className == "post odd") {
		if(threadid == null) {
			var spans = document.getElementsByTagName("span");
			for (j = 0; j < spans.length; j++) {
				if(spans[j].className == "threadnavlinks") {
					threadid = "t" + spans[j].firstChild.nextSibling.nextSibling.href.split("/")[5];
					break;
				}
			}
		}
		
		var spans = arr[i].getElementsByTagName("span");
		for (j = 0; j < spans.length; j++) {
			if(spans[j].className == "postnum") {
				var postid = "p" + spans[j].firstChild.innerHTML;

				var killbutton = document.createElement("span");
				killbutton.className = "killbutton";
				killbutton.target = threadid;
				killbutton.post = postid;
				killbutton.innerHTML = "hide";
				killbutton.addEventListener("click", killpost);
				arr[i].insertBefore(killbutton, arr[i].firstChild);

				if(censors[threadid] != null) {
					if(censors[threadid][postid] == 1) {
						arr[i].className += " spam";
					}
				}
				break;
			}
		}
	}
}

// ==/UserScript==