// ==UserScript==
// @name           Marginal Revolution Kill File
// @description    Wipe out annoying people on MR blog
// @namespace      Mr
// @author         Dan Weber
// @include        http://marginalrevolution.com/*
// @match          http://marginalrevolution.com/*
// @version        0.51.0
// ==/UserScript==

if (typeof GM_getValue == 'undefined') {
    var GM_getValue = function(name, defaultVaue) {
	return localStorage.getItem(name);
    }
}

if (typeof GM_setValue == 'undefined') {
    var GM_setValue = function(name, value) {
	localStorage.setItem(name, value);
    }
}

function addToKillFile(entry) {
    killfile.push(entry);
    GM_setValue("mr_killfile", JSON.stringify(killfile));
    scan_posts();
    show_turn_off();
}

function removeFromKillFile(entry) {
    var index = killfile.indexOf(entry);
    if (index > -1) {
	killfile.splice(index, 1);
    }
    GM_setValue("mr_killfile", JSON.stringify(killfile));
    scan_posts();
    show_turn_off();
}

function show_turn_off() {
    console.log("bob");
    console.log(undo_bar);
    undo_bar.innerHTML = '';
    console.log(123);
    console.log("x-length is " + killfile.length);
    for (var i = 0; i < killfile.length; i++) {
	var name = killfile[i];
	var elem = document.createElement('span');
	elem.style.fontSize = "small";
	elem.style.color = "green";
	elem.style.cursor = "pointer";
	elem.innerHTML = ' Un-kill ' + name;
	
	var returnsfunction2 = function(bob) { return function() { removeFromKillFile(bob); } };
	elem.addEventListener('click', 
			      returnsfunction2(name),
			      false);
	undo_bar.appendChild(elem);
    }
}

function scan_posts(first_time) {
    console.log("scanning...");
    for (var i = 0; i < allSpans.snapshotLength; i++) {
	var a = allSpans.snapshotItem(i);
	if (a.className == "comment_author") {
	    var author = a.innerText;
	    if (author == undefined)
		author = a.textContent;
	    if (first_time) {
		var elem = document.createElement('span');
		elem.style.fontSize = "x-small";
		elem.style.color = "red";
		elem.innerHTML = " killfile";
		elem.style.cursor = "pointer";
		var returnsfunction2 = function(bob) { return function() { addToKillFile(bob); } };
		elem.addEventListener("click", 
				      returnsfunction2(author),
				      false);
		a.parentNode.appendChild(elem);
	    }
	    
	    var parent = a.parentNode;
	    if (killfile.indexOf(author) == -1) {
		//console.log("displaying " + author);
		parent.style.display = '';
		parent.nextElementSibling.style.display = '';
	    } else {
		//console.log("hiding " + author);
		//		console.log(i);
		// console.log(a);
		parent.style.display = 'none';
		parent.nextElementSibling.style.display = 'none';
	    }
	}
    }
}

var value = GM_getValue("mr_killfile", null);
var killfile = JSON.parse(value);
console.log(killfile)
if (killfile === null) {
    killfile = [ ]
}
var allSpans = document.evaluate('//span[@class]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var content = document.getElementById("content_box");
var undo_bar = document.createElement('div');
undo_bar.setAttribute("id", "undo_bar");
undo_bar.align = "right";
content.appendChild(undo_bar);

scan_posts(true);
show_turn_off();
