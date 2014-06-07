// ==UserScript==
// @name CNBAForo
// @description Otro theme para CNBAForo
// @version 1.4159
// @include http://*.cnbaforo.com.ar/*
// @include http://cnbaforo.com.ar/*
// @match http://www.cnbaforo.com.ar/*
// @match http://cnbaforo.com.ar/*
// ==/UserScript==

/*
This script is under a CC BY-SA 3.0 license.
You can read more about the license here :http://creativecommons.org/licenses/by-sa/3.0/

contact: joa.dev@live.com 
*/

/*
@object NewStlyes;
@description: object that injects the styles into the DOM.

*/
var newStyles = {
	/*
		@function void init(void )
		@description Creates the element that will act as a buffer.
		@return nothing
	*/
	'init': function() {
		newStyles.StylesheetElement = document.createElement('style');
	},
	/*
		@function void(str line)
		@description Appends a style into the buffer.
		@return nothing
	*/
	'append':function(line) {
		newStyles.StylesheetElement.innerHTML+=line;
	},
	/*
		@function void inject() 
		@description Injects the element into the DOM.
		@return nothing
	*/
	'inject':function() {
		document.getElementsByTagName("head")[0].appendChild(newStyles.StylesheetElement);
		
	}
}
//Randomly selects one of the three available colours to use in the menu. Every time this script is executed, i.e., you load/reload the page, a colour gets  randomly chosen again.
var MenuColour = Array("#5cae1c","#0290fe","#d57a75")[Math.floor(Math.random()*3)];
var images;
var z;

/*
	@function mixed Get(string Element [, object Namespace])
	@description Returns the matched element. Precede the element with a hash ("#") to search for an ID, a dot (".") to search for classes, and nothing if you want to search for tags.
	@return Array or Object :Array when searching for tags/classes, object when searching for an ID.
*/
function Get(Element) { 
	var object = (arguments.length > 1)? arguments[1]:document;
	switch(Element.charAt(0)) {
		case '#': 
		return object.getElementById(Element.substr(1));
		break;
	case '.':
		return object.getElementsByClassName(Element.substr(1));
		break;
	default:
		return object.getElementsByTagName(Element);  
	} 
}

images = Get('img');
/*
	@function void addEventImageToggle(int z)
	@description When you replace the collapse/expand images, the event of changing the images when clicked does not work. This function adds the event to toggle the images. 
	@return nothing
*/
function addEventImageToggle(z) {
	Get('img')[z].addEventListener("click",function(){
		var source = images[z].src;
		if(source.indexOf('xAKd3.png') != -1) {
			Get('img')[z].src="http://i.imgur.com/chzvF.png";
		} else {
			Get('img')[z].src="http://i.imgur.com/xAKd3.png";
		}
	},false);
}

newStyles.init();
newStyles.append(
	"body { background-image: url(http://i.imgur.com/CAuzT.jpg);background-repeat:no-repeat;background-position:center top;background-color:#eeeeee; }"+
	".page {border-radius:4px;margin-top:10px;background-color:rgba(255,255,255,.5)}"+
	".thread { } " + 
	".thead, .tcat { background: #eee; color:gray;}" +
	".thead a:link, .thead_alink { color:gray; }" +
	".tcat a:link, .tcat_alink { color:gray; } " + 
	".tborder { background:#ddd;}" +
	".vbmenu_control { background:none; }" +
	"h2 { font-weight:normal; }" +
	"h2 a { font-weight:bold; }" +
	".vbmenu_popup {padding:0px;background:transparent;position:relative;left:-20px;border:none;}" + 
	".vbmenu_popup table {background:white;-webkit-box-shadow:black 0px 0px 2px;-moz-box-shadow:black 0px 0px 2px;box-shadow:black 0px 0px 2px;padding:2px;}" +
	".vbmenu_hilite, .vemnu_hilite_alink {background:#eee;color:gray;}" +
	".vbmenu_hilite a:hover {color:gray;}" +
	".vbmenu_popup .thead { background:"+MenuColour+"; color:white; }"  +
	".vbmenu_popup .vbmenu_option_alink { background:white;color:black;}" +
	".navbar_notice input[type=\"image\"] { margin-top:20px; }" + 
	".tfoot { background:#eee; }" +
	".tfoot .smallfont strong a { color:gray; } " + 
	"#usercss { padding:0px; }" + 
	"#content_container { color:gray;}"
);
//Logo 
Get('img')[0].src ="http://i.imgur.com/lir6w.png";
Get('img')[0].style.opacity=".5";

//The div between the logo and the menu
Get('.tborder')[0].setAttribute("cellspacing",5);
Get('.tborder')[0].style.background="rgba(0,0,0,.5)";
Get('.tborder')[0].style.borderRadius="2px";

//Menu 
Get('.tborder')[1].style.borderRadius="2px";
Get('.tborder')[1].style.WebkitBoxShadow="black 0px 0px 3px";
Get('.tborder')[1].style.MozBoxShadow="black 0px 0px 3px";
Get('.tborder')[1].style.boxShadow="black 0px 0px 3px";
Get('.tborder')[1].style.marginTop="10px";
Get('.tborder')[1].style.background="#eee";

//Change the images one by one if they match a certain criteria
for(z=0;z<images.length;z++) {
	switch(images[z].src) {
		// Reply button 
		case "http://www.cnbaforo.com.ar/images/azul/buttons/reply.gif":
			Get('img')[z].parentNode.setAttribute("style","float:right;display:block;width:75px;height:20px;background-image:url(http://i.imgur.com/AKHls.png);background-position: -205px 0px;");
			Get('img')[z].parentNode.removeChild(Get('img')[z]);
			break;
		// This forum has no new posts
		case "http://www.cnbaforo.com.ar/images/azul/statusicon/forum_old.gif":
			Get('img')[z].src="http://i.imgur.com/TUXJC.png";
			break;
		// This forum has new posts
		case "http://www.cnbaforo.com.ar/images/azul/statusicon/forum_new.gif":
			Get('img')[z].src="http://i.imgur.com/QiLgv.png";
			break;
		// Collapse button 
		case "http://www.cnbaforo.com.ar/images/azul/buttons/collapse_tcat.gif":
			Get('img')[z].src="http://i.imgur.com/xAKd3.png";
			addEventImageToggle(z);
			break;
		// Expand button
		case "http://www.cnbaforo.com.ar/images/azul/buttons/collapse_tcat_collapsed.gif":
			Get('img')[z].src="http://i.imgur.com/chzvF.png";
			addEventImageToggle(z);
			break;
	}
}
//Inject element into the DOM.
newStyles.inject();