// ==UserScript==
// @name           App Launcher
// @namespace      http://arkq.awardspace.us/
// @description    Run local applications from web browser (linux oriented)
// @include        http://*
// @version        0.1.2
// @author         (c) Arkadiusz Bokowy
// ==/UserScript==
/* HOWTO: Registering new mimetype for this script (FF 3.6)
	1. Edit mimeTypes.rdf file in Firefox profile directory.
		Add <RDF:li RDF:resource="urn:scheme:apprun"/>
		into <RDF:Seq RDF:about="urn:schemes:root"> tag and add
		<RDF:Description RDF:about="urn:scheme:apprun" NC:value="apprun">
		</RDF:Description> into <RDF:RDF......> tag (main tag).
	2. Restart browser and go to Edit->Preferences->Applications. Find content
		type named 'apprun' and set for it your 'launching' application.
*/

var appLauncher = {
splashID: 'appLauncherSplash',
splashFOTime: 3000.0, //fade out time
splash: null, //splash element

// Create our splash screen (for later usage)
createSplash: function() {
	// revers text color for background purpose
	var rgb = document.defaultView.getComputedStyle(document.body, null).
			getPropertyValue('color').match(/\d+/g);
	var splashStr = '<div id="' + appLauncher.splashID + '" style="' +
			'position:fixed; z-index:101; display:block; font-size:2em;' +
			'border: solid; padding:0.5em; background-color:rgb(' + (255 ^ rgb[0]) +
			',' + (255 ^ rgb[1]) + ',' + (255 ^ rgb[2]) + ');' +
			'-moz-border-radius:1em;">Launching...</div>';

	var range = document.createRange();
	range.selectNode(document.body);
	document.body.appendChild(range.createContextualFragment(splashStr));

	appLauncher.splash = document.getElementById(appLauncher.splashID);
	appLauncher.splash.style.left = window.innerWidth/2 -
			appLauncher.splash.offsetWidth/2 + 'px'; 
	appLauncher.splash.style.top = window.innerHeight/2 -
			appLauncher.splash.offsetHeight/2 + 'px';
	appLauncher.splash.style.display = 'none';
},

// Fade out splash box (javasctript has to be enabled)
splashLastTick: 0,
splashFadeOut: function() {
	var curTick = new Date().getTime();
	if(curTick - appLauncher.splashLastTick >= appLauncher.splashFOTime){
		appLauncher.splash.style.display = 'none';
		return;}

	appLauncher.splash.style.opacity -= 1.0/(appLauncher.splashFOTime/50);
	appLauncher.splachLastTick = new Date().getTime();
	setTimeout(appLauncher.splashFadeOut, 50);
},

// Navigate to 'apprun' protocol from name properties
appRunner: function() {
	appLauncher.splash.style.opacity = 1;
	appLauncher.splash.style.display = 'block';
	appLauncher.splashLastTick = new Date().getTime() + 1000;
	setTimeout(appLauncher.splashFadeOut, 1000);

	window.location.href = 'apprun:' + this.name;
},

// Initialize launch event
setInitLauncher: function(elem, param) {
	elem.name = param;
	elem.addEventListener('click', appLauncher.appRunner, false);
},

// Initialize launcher class
init: function() {
	appLauncher.createSplash();
}
}


// Insert 'Play' button on YT video preview image
function insertYTRunButton() {
	elems = [];
	vids = document.getElementsByClassName('video-entry');
	for (x in vids) {
		lnk = vids[x].getElementsByTagName('a').item(0);
		elems.push([vids[x], lnk.href]);
	}

	var butt = '<button class="yt-uix-button app-launcher" ' +
			'style="position:absolute; top:3px; left:3px;">' +
			'<span class="yt-uix-button-content">Play</span></button>';

	for (x in elems) {
		// add 'relative' style to our _link_ element
		elems[x][0].style.position = 'relative';

		elems[x][0].innerHTML += butt;
		mybutt = elems[x][0].getElementsByClassName('app-launcher')[0];
		mybutt.title = 'Play video in MPlayer';
		appLauncher.setInitLauncher(mybutt, elems[x][1]);
	}
}

appLauncher.init();

if(/^http:\/\/www\.youtube\.com\/.*/.test(window.location.href))
	insertYTRunButton();
