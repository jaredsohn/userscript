// ==UserScript==
// @name          Link Redirector
// @namespace     http://userscripts.org/users/156496
// @description   --
// @include       http://boy1000.wgservice.com/linkbucks.html*
// @include       http://*.linkbucks.com/link/*
// ==/UserScript==

var c = 0
var t, div;
var checked = 0;

var gLinkchecker = {
	//MAXREQ:   4,    // max. number of simultaneous page requests
	links: [],      // link objects
	requests: 0,    // number of active XHR's
	bucks:   0,    // number of bucks links
	interval: null, // heartbeat interval
	href: "", //href
	buckLinkNo: 0, //buck link number
	maxClick: 0,
	populate: function(bln) {

		var ll = document.evaluate('//a[contains(@href,"linkbucks.com")]', 
					document, null, 
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
					null);
		
		for (var i = 0; i < ll.snapshotLength; i++) {

			var l = ll.snapshotItem(i);
			href = l.getAttribute("href");
			l.style.background = "white none";
			l.style.color = "darkblue";
			l.textDecoration = "underline";
			l.setAttribute("title", "Link wil be checked");

			// filter out javascript: mailto: ftp:// etc. links
			if (href.match(/^(?!http)[^\/:]{2,}:/i)) {
				l.setAttribute("title", "Link type not checked");
				l.style.backgroundColor = "silver";
				continue;
			}

			// skip links to internal anchors
			if (href.indexOf('#') == 0) {
				l.setAttribute("title", "Internal anchor, not ckecked");
				l.style.backgroundColor = "silver";
				continue;
			}

			//this.links.push(new Link(l, href));
			gLinkchecker.bucks++;
		}
		if (bln != -1)
		{
			var a = ll.snapshotItem(bln - 1);
			gLinkchecker.href = a.href;
		}
		//alert(bln);
		//alert(gLinkchecker.href);
	},
	evtStart: function() {
		var btn = document.getElementById("gm_lichckr_btn");
		btn.setAttribute("value", "Initializing...");
		btn.style.backgroundColor = "orange";
		btn.removeEventListener('click', gLinkchecker.evtStart, true);
		btn.addEventListener('click', gLinkchecker.evtStop, true);
		gLinkchecker.populate(-1);
		gLinkchecker.interval = setInterval(heartBeat, 333);
	},
	evtStop: function() {
		if (window.confirm("Stop Link Checker?")) {
			clearInterval(gLinkchecker.interval);
			// output results right away
			var btn = document.getElementById("gm_lichckr_btn");
			btn.setAttribute("value", "Resume");
			btn.style.backgroundColor = "lime";
			btn.removeEventListener('click', gLinkchecker.evtStop, true);
			btn.addEventListener('click', gLinkchecker.evtResume, true);
		}
	},
	evtResume: function() {
		gLinkchecker.interval = setInterval(heartBeat, 200);
		var btn = document.getElementById("gm_lichckr_btn");
		btn.setAttribute("value", "Resuming...");
		btn.style.backgroundColor = "orange";
		btn.removeEventListener('click', gLinkchecker.evtResume, true);
		btn.addEventListener('click', gLinkchecker.evtStop, true);
	},
	evtDone: function() {
		var btn = document.getElementById("gm_lichckr_btn");
		btn.setAttribute("value", "Found " + gLinkchecker.bucks +
			" buck link" + ((gLinkchecker.bucks != 1) ? "s" : ""));
		btn.setAttribute("disabled", "disabled");
		btn.style.backgroundColor = "lime";
	},
	evtClick: function(){
		var btn = document.getElementById("gm_ok_btn");
		btn.setAttribute("value", "Clicking.....");
		btn.style.backgroundColor = "orange";
		//btn.removeEventListener('click', gLinkchecker.evtClick, true);
		//btn.addEventListener('click', gLinkchecker.evtClicking, true);
		//btn.setAttribute("disabled", "disabled");

		gLinkchecker.buckLinkNo = document.getElementById('buckLinkNo').value;
		gLinkchecker.maxClick = document.getElementById('maxClickNo').value;
		if ((!gLinkchecker.buckLinkNo) || (!gLinkchecker.maxClick))
		{
			alert("error: please refresh page!!");
			return;
		}
		//alert(gLinkchecker.buckLinkNo);
		//alert(gLinkchecker.maxClick);
		gLinkchecker.populate(gLinkchecker.buckLinkNo);
		//window.open(gLinkchecker.href)
		gLinkchecker.interval = setInterval(clickLing, 5000);
	},
	evtClickDone: function() {
		var btn = document.getElementById("gm_ok_btn");
		btn.setAttribute("value", "Click " + gLinkchecker.maxClick +
			" time" + ((gLinkchecker.maxClick != 1) ? "s" : " done"));
		//btn.setAttribute("disabled", "disabled");
		btn.style.backgroundColor = "lime";
	},
	//evtClicking: function(){
	//	window.setInterval(gLinkchecker.evtClick, 5000);
	//},
	initialize: function() {
		// work in main window only (too many iframe crap sites, sorry)
		if (window != top) return;
	
		// "start" button on page
		var ovl = document.createElement("input");
		ovl.setAttribute("id", "gm_lichckr_btn");
		ovl.setAttribute("type", "button");
		ovl.setAttribute("value", "Check links");
		ovl.style.position = "fixed";
		ovl.style.zIndex = 99999; // insane, sometimes needed though
		ovl.style.top = "12px";
		ovl.style.right = "400px";
		ovl.style.backgroundColor = "lime";
		// start watching request queue every interval period
		ovl.addEventListener('click', gLinkchecker.evtStart, true);

		// "Click" button on page
		var ovl3 = document.createElement("input");
		ovl3.setAttribute("id", "gm_ok_btn");
		ovl3.setAttribute("type", "button");
		ovl3.setAttribute("value", "Click");
		ovl3.style.position = "fixed";
		ovl3.style.zIndex = 99999; // insane, sometimes needed though
		ovl3.style.top = "12px";
		ovl3.style.right = "290";
		ovl3.style.backgroundColor = "lime";
		// start watching request queue every interval period
		ovl3.addEventListener('click', gLinkchecker.evtClick, true);

		//input buck link number
		var ovl2 = document.createElement("input")
		ovl2.setAttribute("id", "buckLinkNo");
		ovl2.setAttribute("type", "text");
		ovl2.style.position = "fixed";
		ovl2.style.zIndex = 99999; // insane, sometimes needed though
		ovl2.style.top = "12px";
		ovl2.style.right = "150px";
		ovl2.style.backgroundColor = "lime";

		//input buck link number
		var ovl4 = document.createElement("input")
		ovl4.setAttribute("id", "maxClickNo");
		ovl4.setAttribute("type", "text");
		ovl4.style.position = "fixed";
		ovl4.style.zIndex = 99999; // insane, sometimes needed though
		ovl4.style.top = "12px";
		ovl4.style.right = "12px";
		ovl4.style.backgroundColor = "lime";

		if(document.body.innerHTML.match("Site will load"))
		{
			//Skips if intermission
			//window.location = document.getElementById("lb_wrap").getElementsByTagName('a')[1].href;
			setTimeout("window.close();", 5000);
		}
		else if(document.body.innerHTML.match("topBanner"))
		{
			//Skips if topbar
			//parent.window.location = parent.document.getElementById("frame2").src;
			setTimeout("window.close();", 5000);
		}
		
		document.getElementsByTagName("body")[0].appendChild(ovl);
		document.getElementsByTagName("body")[0].appendChild(ovl2);
		document.getElementsByTagName("body")[0].appendChild(ovl3);
		document.getElementsByTagName("body")[0].appendChild(ovl4);
	}
};

function clickLing() {
	if (gLinkchecker.maxClick != 0)
	{
		//alert(gLinkchecker.maxClick );
		var btn = document.getElementById("gm_ok_btn");
		btn.setAttribute("value", "Clicking (" + gLinkchecker.maxClick + ")..."); 
		window.open(gLinkchecker.href);
		gLinkchecker.maxClick--;
	}else {
		clearInterval(gLinkchecker.interval);
		gLinkchecker.evtClickDone();
	}
}

function heartBeat() {
	if (gLinkchecker.links.length) {
		// update remaining links
		var btn = document.getElementById("gm_lichckr_btn");
		btn.setAttribute("value", "Spidering (" + gLinkchecker.links.length + ")..."); 
		// work: shift next URL from stack
		gLinkchecker.links.shift().ping();
	}
	if ((gLinkchecker.requests <= 0) && (gLinkchecker.links.length == 0)) {
		clearInterval(gLinkchecker.interval);
		// output results after last request has been processed
		//outputToTab(gLinkchecker.toDotString());
		gLinkchecker.evtDone();
	}
}
gLinkchecker.initialize();


function redirectLink()
{
	var links, a, herf;

	links = document.evaluate('//a[contains(@href,"linkbucks.com/link")]', 
		document, null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		null);

//	for (var i = 0; i < links.snapshotLength; i++) {
		a = links.snapshotItem(0);
		href = a.href;
		document.location = href;
//	}
}

function linkBack()
{
	document.location = history.go(-1);
}

/*function timeCount(){
	c = c+1;
	t = setTimeout("timedCount()", 1000);

	if	(t == 7)
	{
		redirectLink();
		linkBack();
	}
}*/

//redirectLink();
//var obj = document.getElementsByTagName('input');
//document.setTimeout("linkBack()", 5000);

/*document.setTimeout(function (){
	redirectLink();
	linkBack();
}, 5000);*/