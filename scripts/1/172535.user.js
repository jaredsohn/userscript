// ==UserScript==
// @name        tumblr widescreen fix
// @namespace   http://www.tumblr.com
// @version     0.8.1
// @description enhance the tumblr dashboard with more width and two columns for photosets
// @author      Nickel
// @copyright   2013, Nickel
// @include     http*://www.tumblr.com/dashboard*
// @include     http*://www.tumblr.com/tagged/*
// @include     http*://www.tumblr.com/likes*
// @include     http*://www.tumblr.com/inbox*
// @include     http*://www.tumblr.com/blog/*
// @include     http*://www.tumblr.com/send*
// @exclude     http*://www.tumblr.com/blog/*/followers*
// @exclude     http*://www.tumblr.com/blog/*/members*
// @downloadURL https://userscripts.org/scripts/source/160799.user.js
// @updateURL   https://userscripts.org/scripts/source/160799.meta.js
// ==/UserScript==

//don't run in frames
if (frameElement){
	return;
}

var elm, i;

function work() {
	//console.log("working...");

	// stretch post boxes
	elm = document.getElementsByClassName("post");
	for (i=0; i<elm.length; i++) {
		if( ! elm[i].classList.contains('new_post_buttons') && ! elm[i].parentNode.classList.contains('radar_content') ) {
			elm[i].setAttribute('style', 'width:1000px;');
		}
	}
	// 2 columns for photosets (depending on original layout)
	elm = document.getElementsByClassName("photoset_row");
	for (i=0; i<elm.length; i++) {
		elm[i].setAttribute('style', 'width:50%; float:left; margin-top:0px; margin-top:10px;');
	}
	// separate captions (for photosets)
	elm = document.getElementsByClassName("post_body");
	for (i=0; i<elm.length; i++) {
		elm[i].setAttribute('style', 'width:100%; float:left;');
	}

	// widen source text
	elm = document.getElementsByClassName("post_source_link");
	for (i=0; i<elm.length; i++) {
		elm[i].setAttribute('style', 'max-width:200px;');
	}

	// indent notes
	// FIXME: bad idea, style is modified by tumblr too
	/*elm = document.getElementsByClassName("notes_outer_container");
	for (i=0; i<elm.length; i++) {
		elm[i].setAttribute('style', 'padding-left:200px;');
	}*/
	// indent notifications
	elm = document.getElementsByClassName("notification");
	for (i=0; i<elm.length; i++) {
		elm[i].setAttribute('style', 'left:200px;');
	}
	// fix repeat pattern on fanmail
	elm = document.getElementsByClassName("message")
	for (i=0; i<elm.length; i++) {
		elm[i].style.background = elm[i].style.background.replace(/repeat-y/,"repeat");
	}
   	// highres images for non-photoset photos
	function replaceimage() {
		if( elm[i].unreplaced == 1 ) {
			return; // abort if replace had to be reverted once before
		}
		elm[i].onerror = function() {
			//console.log("unreplacing %s", this.src);
			this.src = this.src.replace(/_1280/,"_500");
			this.unreplaced = 1;
		}

		elm[i].src = elm[i].src.replace(/_500/,"_1280");
		elm[i].setAttribute('style', 'max-width:965px; max-height:800px; margin-left:-2px');
                
		elm[i].removeAttribute("width");
		elm[i].removeAttribute("height");
	}

	elm = document.getElementsByTagName("img");
	for (i=0; i<elm.length; i++) {
		if( elm[i].parentNode.classList.contains('high_res_link') ) {
			replaceimage();
			elm[i].parentNode.parentNode.setAttribute('style', 'width:0px;'); //fix link area
		}
		else if( elm[i].parentNode.classList.contains('panorama') ) {
			replaceimage();
			//elm[i].parentNode.setAttribute('style', 'width:50px;'); //fix link area (FIXME: breaks panorama view)
		}
	}

}


// fan mail submission page
if ( window.location.href.indexOf("www.tumblr.com/send") > -1 ) {
	document.getElementById("container").style.width = "1230px"; //was: 730px
	document.getElementById("container").style.left = "-615px"; //was: -365px
	document.getElementById("fan_mail").style.width = "1048px"; //was: 548px
	document.getElementById("fan_mail").style.backgroundSize = "1048px 385px"; //was: ""
	document.getElementById("message").style.width = "985px"; //was: 485px
	document.getElementById("submit_controls").style.left = "1077px"; //was: 577px
}
// normal pages
else {
	// main stretching
	document.getElementById('container').setAttribute('style', 'width:1420px');
	document.getElementById('left_column').setAttribute('style', 'width:1145px');

	// indent footer
	elm = document.getElementById('sidebar_footer_nav');
	if (elm != null) {
		elm.setAttribute('style', 'width: 1150px');
	}
	// indent new post buttons
	elm = document.getElementById('new_post');
	if (elm != null) {
		elm.setAttribute('style', 'width:1000px;');
	}

	// first iteration
	work();

	// repeat whenever page changes
	var counter = document.getElementsByTagName('div').length;

	function trigger() {
		//console.log("triggered...");
		if (document.getElementsByTagName('div').length != counter) {
			counter = document.getElementsByTagName('div').length;
			work();
		}
	}

	setInterval(trigger,1000);
}