// ==UserScript==
// @name           SmugMugQuickDelete
// @namespace      userscript.smugmug.com
// @description    Adds a quick link for deleting albums to the category view at <user>.smugmug.com.
// @include        http://*.smugmug.com/*
// @exclude        http://www.smugmug.com/*
// ==/UserScript==
var SMBD_active = false;
// Add jQuery
(
 function addJQ(){
     if (typeof unsafeWindow.jQuery == 'undefined') {
	 var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
	     GM_JQ = document.createElement('script'),
	     GM_da = document.createElement('script');
	     
	 
	 GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	 GM_JQ.type = 'text/javascript';
	 GM_JQ.async = true;
	 GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
     }
     GM_wait();
 })();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    SMBD_active = $('body').hasClass('category');
    
    if (SMBD_active) {
	modifyPage();
    }
}

function modifyPage () {
    $('[id^=albumTitle_]')
	.append(
		function (index, html) {		    
		    var currId = this.id;
		    var last = currId.lastIndexOf('_');
		    var albumId = currId.substring(last + 1, currId.length);
		    var aNav= $(this).find("a").eq(0);
		    var albumTitle = aNav.text();
		    var aElem = document.createElement("a");		    
		    aElem.id="delete" + albumId;
		    aElem.innerHTML = "delete";
		    aElem.addEventListener("click", function(){deleteAlbum(albumId, albumTitle)}, false);
		    aElem.href = "javascript:void(0);"
		    aElem.className += " note deleteLnk";
		    aElem.style.color = "red"
		    return aElem;
		});
}

function deleteAlbum (albumId, albumTitle) { 
    if (confirm("Really DELETE album \"" + albumTitle + "\"? (no undo available)")) {
      GM_xmlhttpRequest({		
	method: "post",
	url: "/gallery/delete.mg",
	headers: { "Content-type" : "application/x-www-form-urlencoded" },
	data: "dodelete=true" 
	    + "&AlbumID=" + albumId
	    + "&userID="
	    + "&submit=submit",
	onload: function(e) { document.getElementById("delete"+albumId).innerHTML="DELETED"; }
	});
    }
}
