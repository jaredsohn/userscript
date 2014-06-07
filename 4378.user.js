// ==UserScript==
// @name           thickFaceBook
// @description    Thickbox Implementation for Facebook Photo Albums
// @include        http://*facebook.com*album.php*
// @include	  	   http://*facebook.com*photo_search*
// ==/UserScript==
//
// By: Justin Rosenthal
// Email: justin.rosenthal at gmail
// Last Update:  06/30/2006

// This script made use of the original code of Thickbox
// It was heavily modified, however.


// Original Thickbox Disclaimer & Credits:
/*
 * Thickbox - One box to rule them all.
 * By Cody Lindley (http://www.codylindley.com)
 * Under an Attribution, Share Alike License
 * Thickbox is built on top of the very light weight jquery library.
 */

// Globals
var imgPreloader;
var allImages, thisImage;
var TB_WIDTH, TB_HEIGHT;
var NXT_WIDTH, NXT_HEIGHT;
var PREV_WIDTH, PREV_HEIGHT;


allImages = document.evaluate(
	'//*[contains(@href, "photo.php?pid")]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

var imgLinkArray = new Array();

for (var i = 0; i < allImages.snapshotLength; i++) {
	thisImage = allImages.snapshotItem(i);
	imgLinkArray.push(thisImage);

	//add thickbox to href elements that have a class of .thickbox
	//when the document is loaded
	thisImage.addEventListener(
		'click',
		function(event) {
			var t = this.firstChild.title;
			var src = this.firstChild.src;
			var path = src.substring( 0, src.lastIndexOf('/') + 1 );
			var fileName = 'n' + src.substring( src.lastIndexOf('/') + 2, src.length );
			TB_show(t, path + fileName, this.href, this);
			this.blur();
			event.stopPropagation();
			event.preventDefault();
		},
		true);
}

//function called when the user clicks on a thickbox link
function TB_show(caption, url, jumpToURL, linkObj) {
	try {
		// Find this object in the array
		var prevLink = null;
		var nextLink = null;
		for(var i=0; i < imgLinkArray.length; i++) {
			if (imgLinkArray[i].firstChild.src == linkObj.firstChild.src) {
				if (i > 0) prevLink = imgLinkArray[i-1];
				if (i < imgLinkArray.length - 1) nextLink = imgLinkArray[i+1];
			}
		}

		// div for 'next' picture
		var nextLinkDiv = document.createElement('div');
		nextLinkDiv.id = "TB_nextPicture";
		// Fill the div if there is one.
		if (nextLink != null) {
			var tmpLink = document.createElement('a');
			tmpLink.innerHTML = "<img src='" + nextLink.firstChild.src + "' title='" + nextLink.firstChild.title + "'>";
			tmpLink.href = nextLink.href;
			tmpLink.addEventListener(
				'click',
				function(event) {
					TB_remove();
					var t = this.firstChild.title;
					var src = this.firstChild.src;
					var path = src.substring( 0, src.lastIndexOf('/') + 1 );
					var fileName = 'n' + src.substring( src.lastIndexOf('/') + 2, src.length );
					TB_show(t, path + fileName, this.href, this);
					this.blur();
					event.stopPropagation();
					event.preventDefault();
				},
				true);
			nextLinkDiv.appendChild(tmpLink);
			NXT_WIDTH = tmpLink.firstChild.width;
			NXT_HEIGHT = tmpLink.firstChild.height;
		} else {
			// Find out if there is a "next page" button
			pageLinks = document.evaluate(
				'//a[contains(@href, "album.php")] | //a[contains(@href, "photo_search.php")]',
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);

			var thisLink;
			var nxtHref = "";
			for (var i = 0; i < pageLinks.snapshotLength; i++) {
				thisLink = pageLinks.snapshotItem(i);
				if (thisLink.innerHTML.indexOf('next') >= 0) {
					nxtHref = thisLink.href;
					i = pageLinks.snapshotLength;
				}
			}

			if (nxtHref != "") {
				var nxt = document.createElement('a');
				nxt.href = nxtHref;
				nxt.className = "pageChange";
				nxt.innerHTML = "next page";
				nextLinkDiv.appendChild(nxt);
				nextLinkDiv.style.width = "100px";
				nextLinkDiv.style.height = "50px";
				NXT_WIDTH = 100;
				NXT_HEIGHT = 50;

				// Make sure nextLinkDiv gets shown
				nextLink = true;
			}
		}
		document.body.appendChild(nextLinkDiv);

		// div for 'prev' picture
		var prevLinkDiv = document.createElement('div');
		prevLinkDiv.id = "TB_prevPicture";
		// Fill the div if there is one.
		if (prevLink != null) {
			var tmpLink = document.createElement('a');
			tmpLink.innerHTML = "<img src='" + prevLink.firstChild.src + "' title='" + prevLink.firstChild.title + "'>";
			tmpLink.href = prevLink.href;
			tmpLink.addEventListener(
				'click',
				function(event) {
					TB_remove();
					var t = this.firstChild.title;
					var src = this.firstChild.src;
					var path = src.substring( 0, src.lastIndexOf('/') + 1 );
					var fileName = 'n' + src.substring( src.lastIndexOf('/') + 2, src.length );
					TB_show(t, path + fileName, this.href, this);
					this.blur();
					event.stopPropagation();
					event.preventDefault();
				},
				true);
			prevLinkDiv.appendChild(tmpLink);
			PREV_WIDTH = tmpLink.firstChild.width;
			PREV_HEIGHT = tmpLink.firstChild.height;
		} else {
			// Find out if there is a "prev page" button
			pageLinks = document.evaluate(
				'//a[contains(@href, "album.php")] | //a[contains(@href, "photo_search.php")]',
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);

			var thisLink;
			var prevHref = "";
			for (var i = 0; i < pageLinks.snapshotLength; i++) {
				thisLink = pageLinks.snapshotItem(i);
				if (thisLink.innerHTML.indexOf('prev') >= 0) {
					prevHref = thisLink.href;
					i = pageLinks.snapshotLength;
				}
			}

			if (prevHref != "") {
				var prev = document.createElement('a');
				prev.href = prevHref;
				prev.className = "pageChange";
				prev.innerHTML = "prev page";
				prevLinkDiv.appendChild(prev);
				prevLinkDiv.style.width = "100px";
				prevLinkDiv.style.height = "50px";
				PREV_WIDTH = 100;
				PREV_HEIGHT = 50;

				// Make sure nextLinkDiv gets shown
				prevLink = true;
			}
		}
		document.body.appendChild(prevLinkDiv);

		// Create Overlay
		var tb_overlay = document.createElement('div')
		tb_overlay.id = "TB_overlay";
		tb_overlay.style.display = "none";
		document.body.appendChild(tb_overlay);
		yScroll = window.innerHeight + window.scrollMaxY;
		tb_overlay.style.height = yScroll +"px";
		tb_overlay.style.display = "block";

		// Create Image Window
		var tb_window = document.createElement('div')
		tb_window.id = "TB_window";
		document.body.appendChild(tb_window);

		// Loader
		var tb_load = document.createElement('div')
		tb_load.id = "TB_load";
		tb_load.innerHTML = "<div id='TB_loadContent'><h2 style='color: white; font-family: sans-serif; font-size: 2em;'>Loading...</h2></div>";
		document.body.appendChild(tb_load);


		var urlString = /.jpg|.jpeg|.png|.gif|.html|.htm/g;
		var urlType = url.match(urlString);

		if(urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif'){

			imgPreloader = new Image();

			imgPreloader.addEventListener(
				'load',
				function() {
					TB_WIDTH = imgPreloader.width + 30;
					TB_HEIGHT = imgPreloader.height + 60;
					document.getElementById("TB_window").innerHTML += "<img id='TB_Image' src='"+url+"' width='"+imgPreloader.width+"' height='"+imgPreloader.height+"' alt='"+caption+"'/>"
										 + "<div id='TB_closeWindow'><a href='" + jumpToURL + "' id='TB_closeWindowButton'>see comments</a></div>" + "<div id='TB_caption'>"+caption+"</div>";

					// Add 'click image to close message' if they haven't chosen to hide it yet
					try{
						if ( GM_getValue('TB_HideCloseMsg') != "1" ) {
							var closeMsg = document.createElement('div');
							closeMsg.id = "TB_closeMsg";
							var closeMsgLink = document.createElement('a');
							closeMsgLink.href = "#";
							closeMsgLink.innerHTML = "x";
							closeMsgLink.title = "Don't show this message";
							closeMsgLink.addEventListener(
								'click',
								function() {
									GM_setValue('TB_HideCloseMsg', '1');
									this.parentNode.style.display = "none";
								},
								true);
							closeMsg.appendChild(closeMsgLink);
							var closeMsgTxt = document.createElement('p');
							closeMsgTxt.innerHTML = "Click anywhere on the picture to close this window";
							closeMsg.appendChild(closeMsgTxt);
							document.getElementById("TB_caption").appendChild(closeMsg);
						}
					} catch(e) { /* If greasemonkey variable somehow is broken, just ignore */ }

					document.getElementById("TB_Image").addEventListener(
						'click',
						function(event) {
							TB_remove();
						},
						true);


					TB_position();
					document.getElementById("TB_load").style.display = "none";
					document.getElementById("TB_window").style.display = "block";
					if (nextLink != null) document.getElementById("TB_nextPicture").style.display = "block";
					if (prevLink != null) document.getElementById("TB_prevPicture").style.display = "block";

				},
				true);

			imgPreloader.src = url;
		}
	} catch(e) {
		alert( e );             // REMOVE ME BEFORE DISTRIBUTION
	}
}


function TB_remove() {
	document.body.removeChild( document.getElementById("TB_window") );
	document.body.removeChild( document.getElementById("TB_overlay") );
	document.body.removeChild( document.getElementById("TB_load") );
	document.body.removeChild( document.getElementById("TB_nextPicture") )
	document.body.removeChild( document.getElementById("TB_prevPicture") );
	return false;
}


function TB_position() {
	var de = document.documentElement;
	var w = self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;

	document.getElementById("TB_window").style.width = TB_WIDTH+"px";
	//document.getElementById("TB_window").style.height = TB_HEIGHT+"px";
	document.getElementById("TB_window").style.left = ((w - TB_WIDTH)/2)+"px";
	document.getElementById("TB_window").style.top = ((h - TB_HEIGHT)/2)+"px";

	if (NXT_WIDTH && NXT_HEIGHT) {
		document.getElementById("TB_nextPicture").style.left = (w-((((w - TB_WIDTH)/2)-NXT_WIDTH)/2)-NXT_WIDTH)+"px";
		document.getElementById("TB_nextPicture").style.top = ((h - NXT_HEIGHT)/2)+"px";
	}

	if (PREV_WIDTH && PREV_HEIGHT) {
		document.getElementById("TB_prevPicture").style.left = ((((w - TB_WIDTH)/2)-PREV_WIDTH)/2)+"px";
		document.getElementById("TB_prevPicture").style.top = ((h - PREV_HEIGHT)/2)+"px";
	}

}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


addGlobalStyle('#contentPad{margin:20px;}');
addGlobalStyle('#TB_overlay {position: absolute;top: 0;left: 0;z-index:100;width: 100%;height: 100%;background-color: #000;-moz-opacity: 0.6;opacity: 0.6;}');
addGlobalStyle('#TB_window {top: 0px;left: 0px;position: fixed;background: #fff;z-index: 102;color:#000000;display:none;border: 4px solid #525252;}');
addGlobalStyle('#TB_window img {display:block;margin: 15px 0 0 15px;border-right: 1px solid #ccc;border-bottom: 1px solid #ccc;border-top: 1px solid #666;border-left: 1px solid #666;}');
addGlobalStyle('#TB_caption{padding:5px 30px 5px 15px;font-size:1.2em;color:#000;font-weight:bold;}');
addGlobalStyle('#TB_closeWindow{margin: 0 15px 0 40px;padding:5px 0px 5px 0;float:right;}');
addGlobalStyle('#TB_load{text-align: center;position: absolute;top: 50%;left: 0px;width: 100%;overflow: visible;visibility: visible;display: block;z-index:101;}');
addGlobalStyle('#TB_loadContent {margin-left: -125px;position: absolute;top: -50px;left: 50%;width: 250px;height: 100px;visibility: visible;}');
addGlobalStyle('#TB_closeMsg p { margin: 0 0 0 0.3em; display: inline; color: gray; font-weight: normal; }');
addGlobalStyle('#TB_nextPicture { display:none;position:fixed;z-index:102;padding:5px;background-color:white;border:3px solid #525252; }');
addGlobalStyle('a.pageChange { display: block; text-align: center; font-size: 15px; padding-top: 15px; color: #3B5998; font-weight: bold; height: 35px; width: 100%;}');
addGlobalStyle('#TB_prevPicture { display:none;position:fixed;z-index:102;padding:5px;background-color:white;border:3px solid #525252; }');
