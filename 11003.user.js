// StudiVZ: Mitgliederfotos zoomen
// Version 1.2
// 2007-07-28
// Copyright (c) 2007 Ingo Mueller
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
// select "StudiVZ: Mitgliederfotos zoomen", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// ==UserScript==
// @name           StudiVZ: Mitgliederfotos zoomen
// @description    Zeigt eine groessere Version des Fotos eines Mitglieds an, wenn man mit der Maus ueber dessen verkleinertes Bild faehrt.
// @include        http://www.studivz.net/*
// ==/UserScript==

/*
 * Load on/off switch to grease menu
 * Copied form http://wiki.greasespot.net/Code_snippets#Make_menu_toggle
 */
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
	/* Load current value into variable */
	window[key] = GM_getValue(key, defaultValue);
	/* Add menu toggle */
	GM_registerMenuCommand(	(prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn),
							function() { GM_setValue(key, !window[key]); location.reload(); }
							);
}

/* Add possibility to (de)activate user/group/gallery zooming */
makeMenuToggle("zoom_user_images", true, "Mitgliederfotos zoomen", "Mitgliederfotos nicht zoomen");
makeMenuToggle("zoom_group_images", true, "Gruppenfotos zoomen", "Gruppenfotos nicht zoomen");
makeMenuToggle("zoom_gallery_images", true, "Fotoalben zoomen", "Fotoalben nicht zoomen");


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
div.setAttribute("style","position:absolute; z-index:999; display:none;");
div.addEventListener("mouseout", onHidePopupEvent, false);
div.addEventListener("click", hidePopup, false);

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
		
		var srcEnd = src.substr(-6);
		if (srcEnd == '-w.jpg' || srcEnd == '-m.jpg' || srcEnd == '-s.jpg') {
			/* set new image src */
			src = src.substr(0,src.length - 6) + '.jpg';
			popupImage.setAttribute('src',src);
			
			/* find coordinates of the original image */
			var parent = image;
			var top = 0;
			var left = 0;
			while (parent) {
				top += parent.offsetTop;
				left += parent.offsetLeft;
				parent = parent.offsetParent;
			}
			
			/* move popup over original image */
			popup.style.top = top + 'px';
			popup.style.left = left + 'px';
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
		if (src &&		( (src.substr(16,29) == '.imagevz.net/pics/de/members/' && zoom_user_images)		/* old links */
						|| (src.substr(16,22) == '.imagevz.net/profile1/' && zoom_user_images)			/* user images */
						|| (src.substr(16,20) == '.imagevz.net/group1/' && zoom_group_images)			/* group images */
						|| (src.substr(16,23) == '.imagevz.net/albums/de/' && zoom_gallery_images)		/* foto gallery images 1 */
						|| (src.substr(16,20) == '.imagevz.net/photo1/' && zoom_gallery_images)		/* foto gallery images 2 */
						|| (src.substr(16,20) == '.imagevz.net/photo2/' && zoom_gallery_images)		/* foto gallery images 3 */
						|| (src.substr(16,20) == '.imagevz.net/photo3/' && zoom_gallery_images)		/* foto gallery images 4 */
						|| (src.substr(16,20) == '.imagevz.net/photo4/' && zoom_gallery_images)		/* foto gallery images 5 */
						|| (src.substr(16,20) == '.imagevz.net/photo5/' && zoom_gallery_images)		/* foto gallery images 6 */
						|| (src.substr(16,20) == '.imagevz.net/photo6/' && zoom_gallery_images)		/* foto gallery images 7 */
						|| (src.substr(16,20) == '.imagevz.net/photo7/' && zoom_gallery_images)		/* foto gallery images 8 */
						|| (src.substr(16,20) == '.imagevz.net/photo8/' && zoom_gallery_images)		/* foto gallery images 9 */
						|| (src.substr(16,20) == '.imagevz.net/photo9/' && zoom_gallery_images) )		/* foto gallery images 10 */
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