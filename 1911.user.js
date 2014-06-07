// Monkeyfish
// version 0.1 BETA!
// 2005-10-05
// Copyright (c) 2005, Mike Bohn
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
// select "Monkeyfish", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// www.snapfish.com/selectalbumshare/:
// - selects all albums when sharing
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Monkeyfish
// @namespace       http://bohnfamily.com/
// @description     Adds functionality to snapfish
// @include         http://www.snapfish.com/*
// ==/UserScript==

(function() {

    var MonkeyfishServices = {

		_selectAlbums: function() {
		    var s = '';
		    s += '<div style="margin: 0 auto; padding: 5px; border-bottom: 1px solid #000000; background-color: #000000; color: #ffffff; text-align:center;"><form name="MonkeyFish" onsubmit="return CheckSelect()"> &#x2605; Select All Albums <strong>OR</strong> Select by matching descriptions <input type="button" onClick="CheckAll()" value="Select All"/> <input type="button" onClick="ClearAll()" value="Reset"/> <input id="SelectText" type="text" name="SelectText" value="Keyword1, Keyword2, etc..." onFocus="ClearDefault()"> <input type="button" onClick="CheckSelect()" value="Go"> &#x2605;</form></div>';
		    return s;
		},
		
		_checkAllFunction: function() {
			var s = ' \
<script language="JavaScript"> \
function CheckAll() { \
for (var i=0;i<document.shareselectform.elements.length;i++){ \
var e = document.shareselectform.elements[i]; \
if(!e.checked) { \
onSelection(e); \
} \
} \
} \
</script> \
';	
		    return s;
		},

		_clearDefaultFunction: function() {
			var s = ' \
<script language="JavaScript"> \
function ClearDefault() { \
var d = "Keyword1, Keyword2, etc..."; \
if(document.MonkeyFish.SelectText.value == d) { \
document.MonkeyFish.SelectText.value = ""; \
onSelection(e); \
} \
} \
</script> \
';	
		    return s;
		},

		_clearAllFunction: function() {
			var s = ' \
<script language="JavaScript"> \
function ClearAll() { \
document.MonkeyFish.SelectText.value = ""; \
for (var i=0;i<document.shareselectform.elements.length;i++){ \
var e = document.shareselectform.elements[i]; \
if(e.checked) { \
onSelection(e); \
} \
} \
} \
</script> \
';	
		    return s;
		},

		_checkSelectFunction: function() {
			var s = ' \
<script language="JavaScript"> \
function CheckSelect() { \
var rtn = " \\n "; \
var sa = document.getElementById("SelectText").value; \
var meb = sa.split(","); \
var album = ""; \
var albumnumber = 0; \
var albumselected = ""; \
if(meb.length > 0) { \
for( var j = 0; j < meb.length ; j++ ) { \
for( var i = 0; i < albumIDs.length ; i++ ) { \
album = "album_"+albumIDs[i]; \
if (albumCaptions[i].search(meb[j]) != -1) { \
if(!document.shareselectform[album].checked) { \
onSelection(document.shareselectform[album]); \
albumnumber++; \
albumselected = albumselected+" "+albumCaptions[i]+rtn; \
} \
} \
} \
} \
} \
if(albumnumber == 0) { \
alert("No albums match that/those descriptions"); \
} else { \
alert("Success. You selected "+albumnumber+"albums:"+rtn+albumselected); \
} \
return false; \
} \
</script> \
';	
		    return s;
		}
	
    }

    var Monkeyfish = {

	// add the select all button at the top of page
	addSelectButton: function() {
		var logo = document.createElement("div");		
		var s = '';
	    s += MonkeyfishServices._checkAllFunction();
	    s += MonkeyfishServices._clearAllFunction();
	    s += MonkeyfishServices._clearDefaultFunction();
	    s += MonkeyfishServices._checkSelectFunction();
	    s += MonkeyfishServices._selectAlbums();
		logo.innerHTML = s;
		document.body.insertBefore(logo, document.body.firstChild);
	}
	
    }

    var href = window.location.href;

    // match album share page
    if (href.match(/^http:\/\/www\.snapfish\.com\/selectalbumshare/i)) {
		Monkeyfish.addSelectButton();
    }

    //alert('completed Monkeyfish successfully at ' + href);
})();

/*
TODO:
- nothing in queue

CHANGELOG:
0.1 - 2005-03-14 - initial release
*/

// END FILE
