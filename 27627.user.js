// ==UserScript==
// @name           Google reader FavIcon Alerts
// @description    Show the number of unread items in Google Reader's favicon 
// @version        1.2
// @date           2011-03-23
// @author         Jordi De Groof
// @namespace      http://www.netvibes.com/jordi
// @include        http://www.google.tld/reader/view/*
// @include        https://www.google.tld/reader/view/*
// ==/UserScript==

// Inspired by Gmail FavIcon Alerts		(http://userscripts.org/scripts/show/24430)

var prevCount= null, canvas, ctx, imgIcon, head, newIcon;

function setIcon(count) {
	if(count>0) {
		// Clear canvas
		canvas.width= canvas.width;
		ctx.globalAlpha= 0.5;
		ctx.drawImage(imgIcon, 0, 0);
		ctx.globalAlpha= 1.0;

		// Add the unread count
		ctx.textAlign="right";
		ctx.fillText(count, canvas.width, canvas.height, canvas.width);
	} else {
		// Clear the canvas
		canvas.width= canvas.width;
		ctx.drawImage(imgIcon, 0, 0);
	}

	var icon= canvas.toDataURL(); 	// Convert the canvas to an image
	canvas.style.display= "none"; 	// The canvas has to be hidden after every repaint
	// Replace the previous favicon with the new one
	newIcon.href= icon;
	head.removeChild(newIcon);
	head.appendChild(newIcon);
}

function poll() {
	// Look for unread count in the title
      	var re1='.*?'; 		// Non-greedy match on filler
      	var re2='(\\d+)';	// Integer Number 1
	
	var p = new RegExp(re1+re2,["i"]);
	var m = p.exec(document.title);
	var count= 0;
	if (m !== null) {
		count=m[1];
	}

	// Update icon when the count has changed
	if(count == prevCount) {
		return;
	} else {
		prevCount= count;
		setIcon(count);
	}
}

function init() {
	// Append a canvas to the dom to create the favicon
	var body = document.getElementsByTagName("body")[0];
	canvas = document.createElement("canvas");
	canvas.id= "favicon";
	canvas.width= "16";
	canvas.height= "16";
	body.appendChild(canvas);

	// Get context for canvas
	ctx = canvas.getContext("2d");

	// Fetch the favicon and keep it in memory 
	imgIcon = new Image();   // Create new Image object  
	imgIcon.src= "/reader/ui/favicon.ico";
	
	// Remove original favicon
	head= document.getElementsByTagName("head")[0];
	var links = head.getElementsByTagName("link");
	for (var i = 0; i < links.length; i++) {
		if (links[i].rel.toLowerCase() == "shortcut icon" || links[i].rel.toLowerCase() =="icon") {
			head.removeChild(links[i]);
		}
	}
	
	// Create new favicon
	newIcon = document.createElement("link");
	newIcon.type = "image/x-icon";
	newIcon.rel = "shortcut icon";
	newIcon.href = imgIcon;
	head.appendChild(newIcon);
	
	// Start the polling
	setInterval(poll, 500);
}

init();
