// ==UserScript==
// @name           GLB Top/End Buttons with Clock 
// @namespace      GLB
// @description    
// @include        http://goallineblitz.com*
// ==/UserScript==

// Create link to top.
function create_back_to_top() {
if(document.body){
  
	var to_top = document.createElement('span');
	to_top.id= 'top';
	to_top.innerHTML = "Top";
	var to_top_c = "opacity:0.7;position:fixed;text-align:left;left:780px;top:2px;z-index:50000;";
	to_top_c+="border: 3px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-Bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 2px;color: MenuText;background-color: Menu;font-size:8pt;font-family:arial,sans-serif;cursor:pointer;";
	to_top.style.cssText = to_top_c;
	to_top.addEventListener('mouseover', function(){ to_top.style.opacity = 1; }, false);
	to_top.addEventListener('mouseout', function(){ to_top.style.opacity = 0.5; }, false);
	to_top.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
	document.body.appendChild(to_top);

	var z = document.createElement('span');
	z.id= 'Bot';
	z.innerHTML = "End";
	var y = "opacity:0.7;position:fixed;text-align:left;left:820px;top:2px;z-index:50000;";
	y+="border: 3px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-Bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 2px;color: MenuText;background-color: Menu;font-size:8pt;font-family:arial,sans-serif;cursor:pointer;";
	z.style.cssText = y;
	var winWidth = (document.body.clientWidth);
	var winHeight = (document.body.clientHeight);
	z.addEventListener('mouseover', function(){ z.style.opacity = 1; }, false);
	z.addEventListener('mouseout', function(){ z.style.opacity = 0.5; }, false);
	z.addEventListener('click', function(){ window.scrollTo(winWidth*0,winHeight*50000); }, false);
	document.body.appendChild(z);
	}
};

if(self==top) create_back_to_top();

var toolbar = document.getElementById('toolbar')
var currentTime = new Date ()
var currentHours = currentTime.getHours ( );
var currentMinutes = currentTime.getMinutes ( );
var currentSeconds = currentTime.getSeconds ( );
currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
currentHours = ( currentHours == 0 ) ? 12 : currentHours;
var currentTimeString = currentHours + ":" + currentMinutes + " "+ timeOfDay; 
var utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
serverTime = new Date(utc + (3600000*-7));
var serverHours = serverTime.getHours ( );
var serverMinutes = serverTime.getMinutes ( );
var serverSeconds = serverTime.getSeconds ( );
serverMinutes = ( serverMinutes < 10 ? "0" : "" ) + serverMinutes;
serverSeconds = ( serverSeconds < 10 ? "0" : "" ) + serverSeconds;


//serverHours = ( serverHours > 12 ) ? serverHours - 12 : serverHours;
//serverHours = ( serverHours == 0 ) ? 12 : serverHours;

var timeOfDay = ( serverHours < 12 ) ? "AM" : "PM";
var serverTimeString = serverHours + ":" + serverMinutes + " "+ timeOfDay;
var clock = document.createElement('div')

clock.setAttribute('style', 'float:right; color: white; font-size: 10px; font-family: arial;')
clock.innerHTML = 'Cur:&nbsp; ' + currentTimeString + '&nbsp;'+ '<br>Ser:&nbsp;&nbsp;' + serverTimeString;
toolbar.appendChild(clock)