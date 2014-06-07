// ==UserScript==
// @name           new google developed
// @namespace       https://google.ps/
// @description    Change Ritaj background color
// @include        https://google.ps/*
// ==/UserScript==

// Anonymous function wrapper
(function() {
 
/**
 * Inject Prototype and Scriptaculous libraries.
 */
 //'http://wiki.script.aculo.us/javascripts/prototype.js',
   // 'http://wiki.script.aculo.us/javascripts/scriptaculous.js',
var scripts = [
];
for (i in scripts) {
    var script = document.createElement('script');
    script.src = scripts[i];
    document.getElementsByTagName('head')[0].appendChild(script);
}

function addScriptRef(url) {
			var s = document.createElement("script");
			s.type = "text/javascript";
			s.src = url;
			document.getElementsByTagName("head")[0].appendChild(s);
		}
function waitForLoadLibs() {
			// libs loaded?
			if( typeof Prototype != 'undefined' 
					&& typeof Effect != 'undefined' 
					&& typeof Draggable != 'undefined')
			{
				// call api 
				    new Draggable('course_menu', { revert: true });
					} else {
				setTimeout( waitForLoadLibs, 100 );
			}
		}

// make some style:

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addBGImage() {
    var body, style;
    body = document.getElementsByTagName('body')[0];
    if (!body) { return; }
    body.background = "http://www.sirena.lf.lv/wallpapers/music/avril_lavigne/avril_lavigne1d.jpg";
   
  
}
addBGImage();

function chabgeTR(){
	var allLinks, thisLink;
	allLinks = document.evaluate( '//tr[@bgcolor]',
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
				
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		thisLink.style.background = "#EF77B4";
		thisLink.style.color = "#FFFFFF";
	}
}	
chabgeTR();

function chabgeTables(){
	var allLinks, thisLink, myLink, newElement;
	allLinks = document.evaluate( '//table[@cellpadding="3"]',
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
				
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		thisLink.style.background = "#FFCFE9";
		thisLink.style.opacity = "0.5";
		if (i == 6){
			myLink = thisLink;
		}
	}
	//newElement = document.createElement('hr');
	var tableElement = document.createElement('table');
	//tableElement.style="border-style: none solid solid; border-color: black; border-width: 0pt 1px 1px; background: rgb(255, 255, 255) none repeat scroll 0% 0 opacity: 0.5;";
	tableElement.width="100%";
	tableElement.cellspacing="1";
	tableElement.cellpadding="3";
	
	var tbodyElement = document.createElement('tbody');
	var trElement = document.createElement('tr');
	trElement.setAttribute('align','cenetr');
	tbodyElement.appendChild(trElement);
	tableElement.appendChild(tbodyElement);
	
	
	newElement = document.createElement('object');
	newElement.type = "application/x-shockwave-flash";
	newElement.data = "http://widgets.clearspring.com/o/48cdb582f68609a3/4b5f07b5488642d9/48cdb582f68609a3/6f8e4970/-cpid/5bf3852716741b09";
	newElement.id = "W48cdb582f68609a34b5f07b5488642d9";
	newElement.width = "51%";
	newElement.height = "200";
	
	paramEle2 = document.createElement('param');
	paramEle2.setAttribute('name','wmode');
	paramEle2.setAttribute('value','transparent');
	newElement.appendChild(paramEle2);

	soccerEle = document.createElement('script');
	soccerEle.src="http://www.gmodules.com/ig/ifr?url=http://gamesville.com/gadgets/penguin/penguin.xml&amp;up_penguinName=the%20Penguin&amp;up_backgroundColor=F0F7FF&amp;synd=open&amp;w=320&amp;h=310&amp;title=Poke+__UP_penguinName__&amp;border=%23ffffff%7C3px%2C1px+solid+%23999999&amp;output=js";
	
	
	Ele = document.createElement('embed');
	Ele.type="application/x-shockwave-flash"; 
	Ele.pluginspage="http://www.macromedia.com/go/getflashplayer";
	Ele.quality="high" ;
	Ele.src="http://game.freegamesjungle.com/game_0002/free/islandcolonizer.swf";
	Ele.width="640"; 
	Ele.height="480"; 
	Ele.menu="false";
	//trElement.appendChild(newElement);
	//myLink.parentNode.insertBefore(tableElement, myLink.nextSibling);
	//myLink.parentNode.insertBefore(Ele, myLink.nextSibling);
}	
chabgeTables();
/*addGlobalStyle(
'table tbody tr{' +
'background-color: #FFFFFF; border:13px solid #FFFFFF;' +
'}');

*/
// add ref to script.aculo.us-controls-lib
		addScriptRef("http://script.aculo.us/prototype.js");

/**
 * When the window is finished loading, attach the Shake-It on-click event.
 */
window.addEventListener('load', function(event) {
 
    // Grab a reference to the Effect object which was loaded by the scriptaculous library earlier.
       

 
}, 'false');
 
})(); // end anonymous function wrapper