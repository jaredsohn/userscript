// ==UserScript==
// @name          Gmail's Old Look
// @namespace     sevenkul
// @description	  Gmail's Old Look to prevent label list & chat list fight
// @include       https://mail.google.*/*
// @version       3.0.1
// @author        cihan çobanoğlu
// ==/UserScript==

if (window.top != window.self) return;

//Adjust the main body of document in the main frame.
function adjustFrameBody() {
	var frame = document.getElementById("canvas_frame");
	try {
		frame.contentDocument.body.style.overflowX = "hidden";
		frame.contentDocument.body.style.overflowY = "visible";
		frame.contentDocument.body.parentNode.style.overflowY = "visible"; //<html> element
	}
	catch(e) {
		//console.log(e.message);
	}
}

//Adjust tag list and buddy list.
function adjustLeftPanel() {
	var frame = document.getElementById("canvas_frame");
	var tagBox = frame.contentDocument.getElementsByClassName("ajl aib lKgBkb")[0];
	var tagBoxContent = frame.contentDocument.getElementsByClassName("r9gPwb")[0];
	var chatBox = frame.contentDocument.getElementsByClassName("akc lKgBkb")[0];
	var chatBoxContent = frame.contentDocument.getElementsByClassName("T0 pp aj3")[0];
	var leftPanel = frame.contentDocument.getElementsByClassName("oy8Mbf aeN")[0];
	
	try {
		var calibratingHeight = 114; //Default
		try {
		    gmailMenu = document.getElementById("canvas_frame").contentDocument.getElementsByClassName("aki pp")[0].clientHeight; //67
		    newEmailHeight = document.getElementById("canvas_frame").contentDocument.getElementsByClassName("z0")[0].clientHeight; //37
		    seperatorHeight = document.getElementById("canvas_frame").contentDocument.getElementsByClassName("aeO")[0].clientHeight; //10
		    calibratingHeight = gmailMenu + newEmailHeight + seperatorHeight;
		} catch(e) {}
		
		tagBox.style.minHeight = tagBoxContent.clientHeight + "px";
		tagBox.style.maxHeight = tagBoxContent.clientHeight + "px"; //If there aren't many labels, set limit to height.
		tagBox.style.overflow = "hidden"; //Necessary for small screen computers.
		frame.contentDocument.getElementsByClassName("aeO")[0].style.height = "0"; //Remove unnecessary line.
		frame.contentDocument.getElementsByClassName("aeO")[0].style.overflow = "hidden";
		chatBox.style.minHeight = chatBoxContent.clientHeight + 5 + "px";
		chatBox.style.maxHeight = chatBoxContent.clientHeight + 5 + "px";
		leftPanel.style.minHeight = (tagBoxContent.clientHeight + chatBoxContent.clientHeight + calibratingHeight) + "px";
		
		//Recalculate the height if something is added in the panel.
		leftPanel.removeEventListener("DOMSubtreeModified", adjustLeftPanel, false);
		leftPanel.addEventListener("DOMSubtreeModified", adjustLeftPanel, false);
	}
	catch(e) {
		//console.log(e.message);
	}
}

//Adjust mail list and mail content.
function adjustMailPanel() {
	var frame = document.getElementById("canvas_frame");
	var mailBoxContent = frame.contentDocument.getElementById(":rr");
	var mailBox = frame.contentDocument.getElementById(":rr").parentNode;
	var mailBoxFooter = frame.contentDocument.getElementById(":rq");
	
	try {
		mailBoxFooter.style.height = "60px";
		try { mailBoxFooter.firstChild.style.paddingBottom = "0px"; } catch(e) { }
		mailBox.style.minHeight = (mailBoxContent.clientHeight + mailBoxFooter.clientHeight) + "px";
		
		window.addEventListener("resize", function() {
			//By Gmail's default, mailBox have a scroll with overflowY = "scroll";
			//Normally, this scroll remains under the iframe's scroll
			//and this scroll is good for a proper right margin.
			//When the window is resized, Gmail tries to correct margin.
			//Then, we don't want this scroll anymore.
			document.getElementById("canvas_frame").contentDocument.getElementById(":rr").parentNode.style.overflowY = "visible";
		}, false);
		
		//Recalculate the height if something is added in the panel.
		mailBox.removeEventListener("DOMSubtreeModified", adjustMailPanel, false);
		mailBox.addEventListener("DOMSubtreeModified", adjustMailPanel, false);
	}
	catch(e) {
		//console.log(e.message);		
	}
}

//Adjust top bar so that it stays on top as you scroll.
function adjustTopBar() {
	var frame = document.getElementById("canvas_frame");
	var topBar = frame.contentDocument.getElementById(":ro");
	
	if ((topBar != null) && (typeof(topBar) != "undefined")) {
		frame.contentWindow.addEventListener("scroll", setTopBarOffset, false);
	}
	else {
		var tryAgain = setTimeout(adjustTopBar, 1000);   
	}
}

//Function to be called when scrolling the frame.
function setTopBarOffset() {
	var frame = document.getElementById("canvas_frame");
	var topBar = frame.contentDocument.getElementById(":ro");
	var mailBoxContent = frame.contentDocument.getElementById(":rr");
	
	topBar.style.position = "fixed";
	topBar.style.width = topBar.parentNode.clientWidth + "px";
	mailBoxContent.style.paddingTop = topBar.clientHeight + "px";
	
	var currentOffset = frame.contentDocument.documentElement.scrollTop;
	var startPos = topBar.parentNode.offsetTop;
	var desiredOffset = startPos - currentOffset;
	if (desiredOffset < 0)
		desiredOffset = 0;
	if (desiredOffset != parseInt(topBar.style.top)) 
		topBar.style.top = desiredOffset + 'px';
}

//Gmail adds a class to canvas frame when it finishes loading.
function isLoaded() {		
	try {
		if (document.getElementById("canvas_frame").className == "cO") return true;
		else { return false; }
	}
	catch(e) {
		//console.log(e.message);
		return false;
	}
}

//initialize function.
function initialize() {
	if (isLoaded() == true) {
		adjustFrameBody();
		adjustLeftPanel();
		adjustMailPanel();
		adjustTopBar();
		clearInterval(initInterval);
	}
}

//initialize();
var initInterval = setInterval(function() { initialize(); }, 1000);