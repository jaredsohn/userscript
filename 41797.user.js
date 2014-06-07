// ==UserScript==
// @name            Craigslist Best of Button
// @namespace       http://test.com
// @description     Displays buttons on the item list so you can flag items as best of without having to click on the item and view it.
// Copied this from another person's script
// @include         http://*.craigslist.*/*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var tables = document.getElementsByTagName("blockquote");
if (document.body.className == 'toc' && tables[1]) {

	var domain = window.location.hostname;

	// create an iframe to use for flagging
	flagframe = document.createElement("iframe");
	// start the iframe on the home page. The iframe must always remain in the same subdomain to avoid cross-domain scripting errors
	flagframe.src = "http://"+domain+"/";
	flagframe.setAttribute("width", "0");
	flagframe.setAttribute("height", "0");
	flagframe.setAttribute("name", "flagger");
	flagframe.setAttribute("id", "flagger");
	flagframe.setAttribute("scrolling", "yes");
	// comment the next line to show the flagging iframe for debugging (change the width & height, too)
	flagframe.style.visibility="hidden";

	document.body.appendChild(flagframe);
	
	// iframe onload event handler so we know when the post is loaded in the iframe
	addFlagHandler();

	// create a popup message div
	var popup = document.createElement("div");
	popup.style.visibility="hidden";
	popup.style.position="absolute";
	popup.style.background="#fff";
	popup.style.border="2px solid #ccc";
	popup.style.width="300px";
	popup.style.height="100px";
	popup.style.left="100px";
	popup.style.top="100px";
	popup.innerHTML = "<p align='center'><strong><br>Flagging Item as Best Of<br>Please Wait...</strong></p>";

	document.body.appendChild(popup);

	// add a style so visited spam links are changed
	addGlobalStyle('a.spamlink:visited { color:red; font-weight:bold; text-decoration:line-through; padding-right: 6px; }');
	
	// get city out of domain name
	var regex = new RegExp(/^([^\.]*)\./);
	var retval = regex.exec(domain);
	var city = retval[1];

	// expression for getting posting ID
	regex = new RegExp(/\/(\d+)\.html/);

	var paras = tables[1].getElementsByTagName("p");

	for (i=0;i<paras.length;i++) {
		var atags = paras[i].getElementsByTagName("a");
		if (atags.length > 0) {
			href = atags[0].getAttribute("href");
			if (retval = regex.exec(href)) {
				var postingID = retval[1];
				newlink = document.createElement("a");

				// our flagging link actually goes to the post but since the onclick returns false, it won't go anywhere
				// we do this so that when the iframe visits the post, the link will show up as visited and we can
				// know that we've already flagged an item
				newlink.setAttribute("href",href);

				newlink.setAttribute("style","font-size: 9px; padding-right: 6px;");
				newlink.setAttribute("title","Click to mark this item as spam.");
				newlink.setAttribute("onclick","return markAsSpam('"+postingID+"','"+href+"')");
				newlink.setAttribute("id","sl_"+postingID);
				newlink.setAttribute("class","spamlink");
				newlink.innerHTML = '[bestof]';
				paras[i].insertBefore(newlink,paras[i].firstChild);
			}
		}
	}
}

function findPosY(obj)
{
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop;
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}

function findPosX(obj)
{
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft;
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function showPopup(obj) {
	popup.style.left = findPosX(obj);
	popup.style.top = findPosY(obj);
	popup.style.visibility="visible";
}

function hidePopup() {
	popup.style.visibility="hidden";
	popup.innerHTML = "<p align='center'><strong><br>Flagging Item as Best Of<br>Please Wait...</strong></p>";
}

var retry = 0;

flagPost = function(postingID, postingLink) {
	// change link style to show it's been flagged already
	var newlink = document.createElement("a");
	newlink.setAttribute("style","text-decoration:line-through; color:red; font-weight:bold; font-size:9px; padding-right: 6px;");
	newlink.innerHTML = '[bestof]';
	document.getElementById("sl_" + postingID).parentNode.replaceChild(newlink,document.getElementById("sl_" + postingID));

	// pop up a status dialog
	showPopup(newlink);

	// show some progress
	popup.innerHTML = "<p align='center'><strong><br>Flagging...<br>Please Wait...</strong></p>";

	// go to the post listing page 
	flagframe.contentDocument.location.replace(postingLink);

	return false;
};

function flagIt() {

	// click the flag link
	var flink = flagframe.contentDocument.getElementById('flag9');

	if (flink) {
		var evObj = document.createEvent('MouseEvents');
		evObj.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		flink.dispatchEvent(evObj);
	}

	hidePopup();
}

function addFlagHandler() {

	// this waits for load event from child frames but doesn't wait for all images. The problem is that the click function
	// doesn't seem to work unless the page is fully loaded
//	flagframe.addEventListener("DOMFrameContentLoaded", function() {

	// this waits for iframe contents to load completely
	flagframe.addEventListener("load", function() {

		var tags = flagframe.contentDocument.getElementsByTagName('h2');
	
		if (tags.length > 0) {

			// check if already flagged for removal
			if (tags[0].innerHTML.indexOf('flagged')+1) {
				popup.innerHTML = "<p align='center'><strong><br><font color='red'>Post already Flagged!</font></strong></p>";
				setTimeout(hidePopup,1000);
				return;
			}

			// wait just a little bit longer to make sure page is ready for a click
			setTimeout(flagIt,100);
		}
	}, true);
}

// place the function into the window differently for Opera and FireFox
if (navigator.appName == "Opera") {
	window.markAsSpam = flagPost;
}
else {
	unsafeWindow.markAsSpam = flagPost;
}