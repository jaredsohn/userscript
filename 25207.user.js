// ==UserScript==
// @name           mouseless-autoscroll
// @namespace      Utopiah
// @description    autoscroll without using your hands (keep them for the coffee cup ;)
// @include        *
// @exclude        *?action=edit
// @exclude        *tube.com/*
// @exclude        *cartoons*
// @exclude        *://mail.google.com/*
// @exclude        *video*
// @exclude        *.tv/*
// @exclude        *vimeo.com/* 
// @exclude        *putlocker.com/file/*
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// ==/UserScript==

// the require script is a part of ecmanaut grand project 
// to re-organize the world starting with the annoying interface to the DOM API

/* 
 * Script homepage : http://userscripts.org/forums/1/topics/2150
 * To do           : check the homepage http://fabien.benetou.fr/Tools/Greasemonkey#MouselessAutoscroll
 */




//=================================== Configuration =======================================

var SPEED_STEP=1;		// step size for increase and decrease of speed
var BASE_TIME=4;		// default scrolling speed in speed-step      
var MAX_SLOWEST_SPEED=10;	// define the slowest speed-step
  
var speed=GM_getValue("speed", BASE_TIME); // load last speed value 

var timer = null;		// handle for the periodic call to the scrolling function

//=================================== Core =============================================

// loop as fast as required, don't loop when speed is inferior to the small timestep
function reset_timer() { 
	if (timer) { window.clearTimeout(timer); };
	if (speed >= MAX_SLOWEST_SPEED) timer = null;
	else timer = window.setInterval(scroll, Math.exp(speed));
}

// actually scroll the window one pixel down
function scroll () { window.scrollBy(0, 1); };
	// Reminder : use window.scrollBy(0, -1) to scroll up

// call the scrolling loop
reset_timer();			


//=================================== Interface =========================================


function scroll_faster () {
	if(speed>=SPEED_STEP){ 	speed-=SPEED_STEP;	}  
	// else { find a way to display to the user we reached the maximum speed... any idea ? }
	hideallbuttons();
	// instead each action should individually self-clean their picture with a setTimeout
	// that would need 5 different functions because of the setTimeout Greasemonkey specificity
	// (especially since we can't specify parameters within setTimeout call in GM afaik)
	var button = document.getElementById('button_faster'); button.style.visibility="visible";
	setTimeout(hideallbuttons,2000); 
	reset_timer(); 
};
function scroll_slower () { 
	if(speed>=MAX_SLOWEST_SPEED-SPEED_STEP) { speed=MAX_SLOWEST_SPEED; scroll_pause(); return;} 
	if(speed<MAX_SLOWEST_SPEED-SPEED_STEP) { speed+=SPEED_STEP; } 
	hideallbuttons();
	var button = document.getElementById('button_slower'); button.style.visibility="visible";
	setTimeout(hideallbuttons,2000);
	reset_timer(); 
};
function scroll_start () { 
	hideallbuttons();
	var button = document.getElementById('button_start'); button.style.visibility="visible";
	setTimeout(hideallbuttons,2000);
	reset_timer();
};
function scroll_pause () {
	// should use var with local page scope, NOT global GM getValue
	speed=MAX_SLOWEST_SPEED; // does not use a specific pause var/const, could be interesting to make the distinction
	hideallbuttons();
	var button = document.getElementById('button_pause'); button.style.visibility="visible";
	reset_timer(); 
};
function scroll_reset () { 
	speed=BASE_TIME; 
	hideallbuttons();
	var button = document.getElementById('button_reset'); button.style.visibility="visible";
	setTimeout(hideallbuttons,2000);
	reset_timer();
};


function hideallbuttons() { 
	document.getElementById('button_pause').style.visibility="hidden"; 
	document.getElementById('button_start').style.visibility="hidden"; 
	document.getElementById('button_faster').style.visibility="hidden"; 
	document.getElementById('button_slower').style.visibility="hidden"; 
	document.getElementById('button_reset').style.visibility="hidden"; 
};


GM_registerMenuCommand( "Start scrolling",		scroll_start, "s", "", "t" );
GM_registerMenuCommand( "Pause scrolling",		scroll_pause, "p", "", "p" );
GM_registerMenuCommand( "Scroll faster",		scroll_faster, "l", "", "f" );
GM_registerMenuCommand( "Scroll slower",		scroll_slower, "k", "", "s" );
GM_registerMenuCommand( "Reset scrolling speed",	scroll_reset, "r", "", "r" );


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


addGlobalStyle( 'div#scrollercontroller { position:fixed; bottom:0; right:0;visibility:visible;}'
		+'p.button { visibility:hidden; position:fixed; bottom:0; right:0; } '
		);

var scrollercontroller = document.createElement('div');
scrollercontroller.id = 'scrollercontroller';

var pauseButtonElement = document.createElement('p');
pauseButtonElement.className = 'button';
pauseButtonElement.id = 'button_pause';
pauseButtonElement.innerHTML = '||';

var playButtonElement = document.createElement('p');
playButtonElement.className = 'button';
playButtonElement.id = 'button_start';
playButtonElement.innerHTML = 'Autoscroll';

var slowerButtonElement = document.createElement('p');
slowerButtonElement.className = 'button';
slowerButtonElement.id = 'button_slower';
slowerButtonElement.innerHTML = '&lt;&lt;';

var fasterButtonElement = document.createElement('p');
fasterButtonElement.className = 'button';
fasterButtonElement.id = 'button_faster';
fasterButtonElement.innerHTML = '&gt;&gt;';

var resetButtonElement = document.createElement('p');
resetButtonElement.className = 'button';
resetButtonElement.id = 'button_reset';
resetButtonElement.innerHTML = 'reset';

scrollercontroller.appendChild(pauseButtonElement);
scrollercontroller.appendChild(playButtonElement);
scrollercontroller.appendChild(slowerButtonElement);
scrollercontroller.appendChild(fasterButtonElement);
scrollercontroller.appendChild(resetButtonElement);

// Display the visual interface
document.body.insertBefore(scrollercontroller, document.body.firstChild);

function shortcuts (e){
	switch(e.charCode)
	{
		case "s".charCodeAt(0) : scroll_start();  break;
		case "p".charCodeAt(0) : scroll_pause();  break;
		case "l".charCodeAt(0) : scroll_faster(); break;	
		case "k".charCodeAt(0) : scroll_slower(); break;
		case "r".charCodeAt(0) : scroll_reset();  break;
	}

};

function registerShortcuts() {
	window.addEventListener("keypress", shortcuts, true);
};

function unregisterShortcuts() {
	window.removeEventListener("keypress",  shortcuts, true);
};

registerShortcuts();

$x('//input | //textarea | //select').forEach(registerListener);

function registerListener(node) { 
	node.addEventListener("mouseover", function() { 
			unregisterShortcuts();
			scroll_pause(); }, true); 
	node.addEventListener("mouseout", function() { 
			scroll_start (); 
			registerShortcuts();
			}, true); 
}
