// Couchsurfing: Bigger pictures
// Version 1.0
// 2008-11-24
// 2008 by Marcel Schwarz
// for couchsurfing.com modified version of the GPL-licensed 
// greasemonkey script "StudiVZ: Mitglieder zoomen" by Ingo Mueller
// (http://userscripts.org/scripts/show/11003). I also used a tiny 
// snipplet (just concerning the style) from the inYOf4ceBook 
// thumbnail enlargement script by Justin Rosenthal modified by znerp 
// (http://userscripts.org/scripts/show/8712).
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Couchsurfing: Bigger pictures", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// ==UserScript==
// @name           Couchsurfing: Bigger pictures
// @description    Displays the pictures larger when you roll over smaller ones on couchsurfing.com
// @include        http://*couchsurfing.com/*
// @include        http://*couchsurfing.org/*
// ==/UserScript==

/*
 * Load on/off switch to grease menu
 * Copied from http://wiki.greasespot.net/Code_snippets#Make_menu_toggle
 */
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
	/* Load current value into variable */
	window[key] = GM_getValue(key, defaultValue);
	/* Add menu toggle */
	GM_registerMenuCommand(	(prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn),
							function() { GM_setValue(key, !window[key]); location.reload(); }
							);
}

/* Add possibility to (de)activate thumbnail/medium image size zooming */
makeMenuToggle("zoom_thumbnail_images", true, "Zoom thumbnails", "Don't zoom thumbnails");
makeMenuToggle("zoom_medium_images", true, "Zoom medium sized images", "Don't zoom medium sized images");


/*
 * The only way I could find to have global variables
 */
function global() {}

/* Calls the counts of showPopup, which will only react to the last call */
global.countCalls = 0;

/* Stores the next unused image id for the id tag. Needs to be incremented when used. */
global.nextImageId = 0;


/*
 * Add popup div into html body
 */
var div = document.createElement("div");
div.setAttribute("id","popup");
div.setAttribute("style","background:url('+loading+') no-repeat;min-height:0px;min-width:0px;position:fixed;z-index:1000;top:20px;left:20px;background-color:#F7F7F7;");
div.addEventListener("mouseout", onHidePopupEvent, false);
div.addEventListener("click", hidePopup, false);
div.addEventListener("mousemove",hidePopup, true);

var img = document.createElement("img");
img.setAttribute("id","popupImage");

div.appendChild(img);
document.body.appendChild(div);


/*
 * Show and hide the popup div with the user/group image
 */

/* Show popup in 0.5s (unless this function will be called again before that) */
function onShowPopupEvent(event) {
	window.setTimeout(showPopup, 500, event.target.id, ++global.countCalls);
}

/* Moves div called popup to the position of a user/group image and loads a bigger version of the image in there */
function showPopup(imageId, callId) {
	/* Only react on call when it was the last one made */
	if (global.countCalls == callId) {
		var image = document.getElementById(imageId);
		var src = image.getAttribute('src');
		
		var popup = document.getElementById('popup');
		var popupImage = document.getElementById('popupImage');
		
		var srcBegin = src.substr(0,52);
		if ((srcBegin == 'http://images.couchsurfing.eu.s3.amazonaws.com/img_t' && zoom_thumbnail_images )|| (srcBegin == 'http://images.couchsurfing.eu.s3.amazonaws.com/img_m' && zoom_medium_images)) {
			/* set new image src */
			src = 'http://images.couchsurfing.eu.s3.amazonaws.com/img_l' + src.substr(52,src.length);



			popupImage.setAttribute('src',src);

/* NOT USED, HAVING IT ON TOP LEFT IS MORE ELEGANT		*/	
			/* find coordinates of the original image */
			var parent = image;
			var top = 0;
			var left = 0;
/*			while (parent) {
				top += parent.offsetTop;
				left += parent.offsetLeft;
				parent = parent.offsetParent;
			}
*/			
			/* move popup over original image */
/*			popup.style.top = top + 'px';
			popup.style.left = left + 'px';
			popup.style.display = 'block';
*/
			popup.style.top = '20px';
			popup.style.left = '20px';
			popup.style.display = 'block';


		}
	}
}

/* Hides the popup in 0.5s */
function onHidePopupEvent() {
	window.setTimeout(hidePopup, 500);
}

/* Hides the popup and changes its src to '', to prevent the old image from being displayed while the new one is loading */
function hidePopup() {
	var popup = document.getElementById('popup');
	popup.style.display = 'none';
	
	var popupImage = document.getElementById('popupImage');
	popupImage.setAttribute('src','');
}


/*
 * Inject script into event handlers 
 */

/* add event handlers to member images  */
function loadEventHandlers() {
	var images = document.getElementsByTagName('img');

	for (var i = 0; i < images.length; i++) {
		var src = images[i].getAttribute("src");
		if (src &&		( src.substr(0,29) == 'http://images.couchsurfing.eu')		/* all CS pics*/
					) {
			/* Set id to the image, so we can access it easily later. */
			if (images[i].getAttribute("id") == null) {
				images[i].setAttribute("id","memberImage" + (global.nextImageId++));
			}
			
			images[i].addEventListener("mousemove", onShowPopupEvent, false);
			images[i].addEventListener("mouseout", function f() { global.countCalls++; }, false);
		}
	}
}

/* Reload event handlers when document changed (because of AJAX scripts) */
document.addEventListener("DOMAttrModified", documentChanged, false);

function documentChanged(event) {
	// alert(event.target.id);
	if (event.target.id == "get_kds_link" ||		/* Gets changed on "Start" page when kds has been loaded */
		event.target.id == "checkcode") {			/* Gets changed on "Nachrichtendienst" page when message has been opened */
		loadEventHandlers();
	}
}

/* initially load event handlers (somehow, nothing is executed after this command, so it's in the end of the file...) */
document.addEventListener("load", loadEventHandlers(), false);