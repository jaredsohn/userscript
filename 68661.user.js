// ==UserScript==
// @name           FB Bookmark Bar
// @version        0.98
// @include        http://*.facebook.com/*
// ==/UserScript==

var thisVer = '0.98';
var blankIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAzSURBVChTY9gEA////yfIZgCqAKojBgBVkqiaGFPhakg0e9TdqKELip1BFd6QpEdMGgQA0F94yA36KTsAAAAASUVORK5CYII%3D";


if(GM_getValue('default') != undefined) {
	var firefox = 'false';
	function GM_setValue(name,data) {
		localStorage.setItem(name, data);
	}
	function GM_getValue(name) {
		data = localStorage.getItem(name);
		return data;
	}
}
	
function checkUpdates(thisVer) {

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://radicalpi.net/hosted/scripts/FBbar_currentVer.php?version='+thisVer,
    headers: {
        'User-agent': 'Greasemonkey Script - FBbar Updater',
        'Accept': 'text/html',
    },
    onload: function(responseDetails) {
		value = responseDetails.responseText;
		if(value > thisVer) {
		showPopup("FBbar Update Available", "<a href='http://userscripts.org/scripts/source/68661.user.js' target='_blank'>Click Here To Update to v"+value+"</a>", 0);
		} else {
		showPopup("No Updates Available", "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHeSURBVHjaYvz//z8DJQAggJgIKcjbn7wqa1c8My55gAAiaMDvX781fv/6sxeXPEAAMSJ7ofREpsO/v/8a/v75a//nz1+GP7//MkhzyzD8+fOH4faL27uWRa53RzcAIIDgBpQcB2n+26PNr28sxiHO8Pf/X4Z/QPz3318w++z9swy3Ht+6uzFjpwqyAQABxAJjAG2NVOfVNBZlF2O4+PI8w703d0HOZ5DhkwW74MajW3s2Z+1yRXcBQADBXZC7L+nBn99/5EHOBvr58IKglXYg8cDZnpeABn34/fOPA5Bm31dx9DuyAQABxAAyAB1HLgtghrG9Jjmtce2xZcamDoQBAogBl4TfdLc1uOSQMUAAsSC7JmKxPyfQmT9//fxzAEgLwMQta4wPAfm2QK8BY+bPw6tTbynA5AACiBE9JfpMddktLyrv8vv3b4Zrd26AwoNBSVaBwdTQkOHazZsMhw4fm3Vr9r10mHqAAEJxgfdk55dyonJiuira4OjTUdOCR+ft+/cYDh46ehYYW8uR9QAEEIYL7FssdypIybmBEtLVG9cZ/oCdDUxUf/4eBGpuuL/w0QFk9QABhDVgjEt1D+jla14iJhABAghrXvj187cz0O83iMmNAAHESGl2BggwAO0Ha6gBlK0WAAAAAElFTkSuQmCC'>Your Version "+thisVer+" is Current", 0);
		}
		
		}
});

}

document.body.innerHTML = document.body.innerHTML.replace('www.','apps.');

GM_registerMenuCommand("FB Bookmark Settings", showSettings);
var moveFrom = null;

var popupHolder = document.createElement('div');
document.getElementById('blueBar').appendChild(popupHolder);
popupHolder.id='gm_popupHolder';

var bookmarkHolder = document.createElement('div');
document.getElementById('blueBar').appendChild(bookmarkHolder);
bookmarkHolder.id='gm_bookmarkBarHolder';
document.getElementById('gm_bookmarkBarHolder').innerHTML="<div id='gm_bookmark_bar' style='position:fixed; z-index:300; bottom:-3px; left:10px; border:1px solid #999999; padding:2px; height:22px;width:auto; background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAZCAYAAAAiwE4nAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAACGSURBVEhLvdZZDoAgDEVRy/4XqUQGFUVk+FTRRdySfp+8UAZ5eg1gSW0NBktlwVIKC+ZMg1dmE6YrseCZThRUw8eBLTFGNKEcx86CIQQU5Pdw21Y0oazLwoLeexZ0zrGgtZYFZ2NQsB+Lu19tXIvWGk0o0ziioHr6U0EuBf4Qf0qB8/LP5gtFYCbdp1AyDwAAAABJRU5ErkJggg%3D%3D\");'></div>";

document.getElementById('gm_bookmark_bar').innerHTML = "<a href='#' id='settingsLink'><div style='position:absolute; top:-1px; left:-1px; border:0px solid #999999; width:16px; background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABWSURBVChTY5w5cyYDQQBU9B8vACpgQjNlFhigCbLA+chyEHZaWhpEFt0krM6DKoIbA9QNNwAuSIpJyLqRTSXBTQjfQQxD8xfEJIQiCB9uL7I3GYmJFgBqtD73T1MARQAAAABJRU5ErkJggg%3D%3D\"); background-repeat:no-repeat; height:16px;'></div></a>&nbsp;&nbsp;&nbsp;";


for(i=1; i<9; i++) {
	var icon = GM_getValue('icon'+i);
	var bookmark = GM_getValue('bookmark'+i);
	if(!icon) {var icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAzSURBVChTY9gEA////yfIZgCqAKojBgBVkqiaGFPhakg0e9TdqKELip1BFd6QpEdMGgQA0F94yA36KTsAAAAASUVORK5CYII%3D'; GM_setValue('icon'+i,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAzSURBVChTY9gEA////yfIZgCqAKojBgBVkqiaGFPhakg0e9TdqKELip1BFd6QpEdMGgQA0F94yA36KTsAAAAASUVORK5CYII%3D'); }
	if(!bookmark) {var bookmark = '#'; GM_setValue('bookmark'+i,'#');}

	if(bookmark != '#') {
		document.getElementById('gm_bookmark_bar').innerHTML+="<a href='"+bookmark+"' id='bookmark_"+i+"'><img src='"+icon+"' id='icon_"+i+"' style='padding:3px;'></a>";
	} else {
		document.getElementById('gm_bookmark_bar').innerHTML+="<a href='#' id='bookmark_"+i+"'><img src='null' id='icon_"+i+"'></a>";
	}
}




function showSettings() {

var gm_settingsDiv = document.createElement('div');
document.getElementById('blueBar').appendChild(gm_settingsDiv);
gm_settingsDiv.id='gm_settingsHolder';

if(document.getElementById('gm_settingsHolder').style.visibility == 'visible') {
hideSettings();
} else {
document.getElementById('gm_settingsHolder').style.visibility='visible';
document.getElementById('gm_settingsHolder').innerHTML="<div id='gm_settings' style='position:fixed; bottom:30px; left:10px; border:1px solid #000000; padding:2px; width:225px; height:100px; background-color:#f5f5f5; z-index:250;'></div>";
document.getElementById('gm_settings').innerHTML+="<div style='position:absolute; top:0px; left:0px; height:16px; background-color:#526EA6; width:229px;'>&nbsp;<font style='color:#ffffff;'>My Bookmarks</font>";
document.getElementById('gm_settings').innerHTML+="<a href='#'><div id='settingsCheckUpdates' style='position:absolute; top:2px; right:20px; width:12px; height:16px; background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABRSURBVChTYwzKW/afgQTAhE3t5HJ7BhDGBjA0ICvEpglFAzYF6GJwDbicAHIWshxYAz7FMH/A1DCihxK65tzOgyh+xxpK+EJ5EGrA8DShVAIA0VIXH/x+M68AAAAASUVORK5CYII%3D\"); background-repeat:no-repeat;'></div></a>";
document.getElementById('gm_settings').innerHTML+="<a href='#'><div id='settingsClose' style='position:absolute; top:2px; right:2px; width:12px; height:16px; background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABrSURBVChTYwzKW/afgQTABFI7udyeoBaYGrAGQpqQDQRryO08iFMTTDFMDdwGbJrQFYNMZUT3NLp/YAbBnA63ASaArABdMUgNhgZkG7CFHooGZDfjCgiMYMXmJIxgxRYa6H6CqcEIJUJRDgClRTNp34UA3QAAAABJRU5ErkJggg%3D%3D\"); background-repeat:no-repeat;'></div></a></div>";

var icon1 = GM_getValue('icon1');
if(!icon1) {var icon1 = blankIcon; }
var icon2 = GM_getValue('icon2');
if(!icon2) {var icon2 = blankIcon; }
var icon3 = GM_getValue('icon3');
if(!icon3) {var icon3 = blankIcon; }
var icon4 = GM_getValue('icon4');
if(!icon4) {var icon4 = blankIcon; }
var icon5 = GM_getValue('icon5');
if(!icon5) {var icon5 = blankIcon; }
var icon6 = GM_getValue('icon6');
if(!icon6) {var icon6 = blankIcon; }
var icon7 = GM_getValue('icon7');
if(!icon7) {var icon7 = blankIcon; }
var icon8 = GM_getValue('icon8');
if(!icon8) {var icon8 = blankIcon; }


document.getElementById('gm_settings').innerHTML+="<div style='height:20px;'></div><img src='"+icon1+"' id='setting_icon_1' style='vertical-align:text-top;'>&nbsp;<a href='#' id='setBookmark1'>Set Bookmark #1</a>";
document.getElementById('gm_settings').innerHTML+="<div style='position:absolute; top:18px; left:110px; height:75px; width:1px; background-color:#999999; padding:0px;'></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	document.getElementById('gm_settings').innerHTML+="<img src='"+icon2+"' id='setting_icon_2' style='vertical-align:text-top;'>&nbsp;<a href='#' id='setBookmark2'>Set Bookmark #2</a>";
document.getElementById('gm_settings').innerHTML+="<div style='height:5px;'></div><img src='"+icon3+"' id='setting_icon_3' style='vertical-align:text-top;'>&nbsp;<a href='#' id='setBookmark3'>Set Bookmark #3</a>";
document.getElementById('gm_settings').innerHTML+="<div style='position:absolute; top:108px; left:110px; width:2px; padding:0px;'></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	document.getElementById('gm_settings').innerHTML+="<img src='"+icon4+"' id='setting_icon_4' style='vertical-align:text-top;'>&nbsp;<a href='#' id='setBookmark4'>Set Bookmark #4</a>";
document.getElementById('gm_settings').innerHTML+="<div style='height:5px;'></div><img src='"+icon5+"' id='setting_icon_5' style='vertical-align:text-top;'>&nbsp;<a href='#' id='setBookmark5'>Set Bookmark #5</a>";
document.getElementById('gm_settings').innerHTML+="<div style='position:absolute; top:108px; left:110px; width:2px; padding:0px;'></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	document.getElementById('gm_settings').innerHTML+="<img src='"+icon6+"' id='setting_icon_6' style='vertical-align:text-top;'>&nbsp;<a href='#' id='setBookmark6'>Set Bookmark #6</a>";
document.getElementById('gm_settings').innerHTML+="<div style='height:5px;'></div><img src='"+icon7+"' id='setting_icon_7' style='vertical-align:text-top;'>&nbsp;<a href='#' id='setBookmark7'>Set Bookmark #7</a>";
document.getElementById('gm_settings').innerHTML+="<div style='position:absolute; top:108px; left:110px; width:2px; padding:0px;'></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	document.getElementById('gm_settings').innerHTML+="<img src='"+icon8+"' id='setting_icon_8' style='vertical-align:text-top;'>&nbsp;<a href='#' id='setBookmark8'>Set Bookmark #8</a>";

document.getElementById('gm_settings').innerHTML+="<div id='bookmarkIconLoader' style='position:absolute; top:150px; left:5px; border:0px solid #000000; z-index:257;'></div>";

document.getElementById('setBookmark1').addEventListener('click', function() {setBookmark('1'); }, false);  
document.getElementById('setBookmark2').addEventListener('click', function() {setBookmark('2'); }, false); 
document.getElementById('setBookmark3').addEventListener('click', function() {setBookmark('3'); }, false); 
document.getElementById('setBookmark4').addEventListener('click', function() {setBookmark('4'); }, false); 
document.getElementById('setBookmark5').addEventListener('click', function() {setBookmark('5'); }, false); 
document.getElementById('setBookmark6').addEventListener('click', function() {setBookmark('6'); }, false);
document.getElementById('setBookmark7').addEventListener('click', function() {setBookmark('7'); }, false);
document.getElementById('setBookmark8').addEventListener('click', function() {setBookmark('8'); }, false); 
document.getElementById('settingsClose').addEventListener('click', hideSettings, false);
document.getElementById('settingsCheckUpdates').addEventListener('click', function() {checkUpdates(thisVer)}, true);



  
}
document.addEventListener('click', function() {hideSettings();}, true );
}

function hideSettings() {
document.removeEventListener('click', function() {hideSettings();}, true );
document.getElementById('gm_settingsHolder').style.visibility='hidden';
}


function setBookmark(i) {
bookmark = prompt('Enter URL for Bookmark #'+i, document.location);
if(bookmark.indexOf('apps.facebook.com') != -1) {
	document.getElementById('setting_icon_'+i).src = "http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif";
	document.getElementById('bookmark_'+i).innerHTML="<img src='http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif' id='icon_"+i+"' style='padding:3px;'>";
	getIcon(bookmark, i);
} else if(bookmark =="") {
	GM_setValue('bookmark'+i, "#");
	GM_setValue('icon'+i, "");
	document.getElementById('setting_icon_'+i).src = blankIcon;
	document.getElementById('bookmark_'+i).innerHTML="<img src='null' id='icon_"+i+"'>";
	document.getElementById('bookmark_'+i).src = "#";
} else {
	alert('Only apps.facebook.com links are supported at this time.');
	bookmark="";
	setBookmark(i);
}

}

function getIcon(target, i) {

GM_xmlhttpRequest({
    method: 'GET',
    url: target,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html',
    },
    onload: function(responseDetails) {
		value = responseDetails.responseText;

		title = value.split("<title>");
		if(value.indexOf('Page Not Found') != -1) {
		showPopup("Error Adding Bookmark", "The App Cannot Be Found", 0);
		var img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAzSURBVChTY9gEA////yfIZgCqAKojBgBVkqiaGFPhakg0e9TdqKELip1BFd6QpEdMGgQA0F94yA36KTsAAAAASUVORK5CYII%3D';
		target="#";

		} else if(value.indexOf('Log in to') != -1) {
		showPopup("Error Adding Bookmark", "Allow Access Before Bookmarking", 0);
		var img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAzSURBVChTY9gEA////yfIZgCqAKojBgBVkqiaGFPhakg0e9TdqKELip1BFd6QpEdMGgQA0F94yA36KTsAAAAASUVORK5CYII%3D';
		target="#";
		
		} else if(value.indexOf('Login |') != -1) {
		showPopup("Error Adding Bookmark", "Please login to Facebook", 0);
		var img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAzSURBVChTY9gEA////yfIZgCqAKojBgBVkqiaGFPhakg0e9TdqKELip1BFd6QpEdMGgQA0F94yA36KTsAAAAASUVORK5CYII%3D';
		target="#";

		} else {
			title = title[1].split("on Facebook");
			value = value.split("<link rel=\"shortcut icon\" href=\"");
			value = value[1].split("\" /></head>");
			document.getElementById('setting_icon_'+i).src = value[0];
			document.getElementById('bookmarkIconLoader').innerHTML = "<img src='"+value[0]+"'>&nbsp;"+title[0]+" Has Been Bookmarked";
			showPopup("New Bookmark Added", "<img src='"+value[0]+"'>&nbsp;"+title[0], 0);
			var img = value[0];
			}
		document.getElementById('bookmark_'+i).innerHTML = "<img src='"+img+"' style='padding:3px;'>";
		GM_setValue('bookmark'+i, target);
		GM_setValue('icon'+i, img);
		}
});

}


function refreshBookmarks() {

document.getElementById('gm_bookmark_bar').innerHTML = "";
document.getElementById('gm_bookmark_bar').innerHTML = "<a href='#' id='settingsLink'><div style='position:absolute; top:-1px; left:-1px; border:0px solid #999999; width:16px; background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABWSURBVChTY5w5cyYDQQBU9B8vACpgQjNlFhigCbLA+chyEHZaWhpEFt0krM6DKoIbA9QNNwAuSIpJyLqRTSXBTQjfQQxD8xfEJIQiCB9uL7I3GYmJFgBqtD73T1MARQAAAABJRU5ErkJggg%3D%3D\"); background-repeat:no-repeat; height:16px;'></div></a>&nbsp;&nbsp;&nbsp;";

for(i=1; i<9; i++) {
	var icon = GM_getValue('icon'+i);
	var bookmark = GM_getValue('bookmark'+i);
	if(!icon) {var icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAzSURBVChTY9gEA////yfIZgCqAKojBgBVkqiaGFPhakg0e9TdqKELip1BFd6QpEdMGgQA0F94yA36KTsAAAAASUVORK5CYII%3D'; GM_setValue('icon'+i,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAzSURBVChTY9gEA////yfIZgCqAKojBgBVkqiaGFPhakg0e9TdqKELip1BFd6QpEdMGgQA0F94yA36KTsAAAAASUVORK5CYII%3D'); }
	if(!bookmark) {var bookmark = '#'; GM_setValue('bookmark'+i,'#');}

	if(bookmark != '#') {
		document.getElementById('gm_bookmark_bar').innerHTML+="<a href='"+bookmark+"' id='bookmark_"+i+"'><img src='"+icon+"' id='icon_"+i+"' style='padding:3px;'></a>";
	} else {
		document.getElementById('gm_bookmark_bar').innerHTML+="<a href='#' id='bookmark_"+i+"'><img src='null' id='icon_"+i+"'></a>";
	}
}
prepareDrag();


}
prepareDrag();

function prepareDrag() {
document.getElementById('settingsLink').removeEventListener('click', function() {showSettings();}, false );
document.getElementById('settingsLink').addEventListener('click', function() {showSettings();}, false );


document.getElementById('bookmark_1').addEventListener('mousedown', function(evt) {evt.preventDefault(); moveFrom = '1';}, false );
document.getElementById('bookmark_2').addEventListener('mousedown', function(evt) {evt.preventDefault(); moveFrom = '2';}, false );
document.getElementById('bookmark_3').addEventListener('mousedown', function(evt) {evt.preventDefault(); moveFrom = '3';}, false );
document.getElementById('bookmark_4').addEventListener('mousedown', function(evt) {evt.preventDefault(); moveFrom = '4';}, false );
document.getElementById('bookmark_5').addEventListener('mousedown', function(evt) {evt.preventDefault(); moveFrom = '5';}, false );
document.getElementById('bookmark_6').addEventListener('mousedown', function(evt) {evt.preventDefault(); moveFrom = '6';}, false );
document.getElementById('bookmark_7').addEventListener('mousedown', function(evt) {evt.preventDefault(); moveFrom = '7';}, false );
document.getElementById('bookmark_8').addEventListener('mousedown', function(evt) {evt.preventDefault(); moveFrom = '8';}, false );


document.getElementById('bookmark_1').addEventListener('mouseup', function(evt) {evt.preventDefault(); moveFrom = null;}, false );
document.getElementById('bookmark_2').addEventListener('mouseup', function(evt) {evt.preventDefault(); moveFrom = null;}, false );
document.getElementById('bookmark_3').addEventListener('mouseup', function(evt) {evt.preventDefault(); moveFrom = null;}, false );
document.getElementById('bookmark_4').addEventListener('mouseup', function(evt) {evt.preventDefault(); moveFrom = null;}, false );
document.getElementById('bookmark_5').addEventListener('mouseup', function(evt) {evt.preventDefault(); moveFrom = null;}, false );
document.getElementById('bookmark_6').addEventListener('mouseup', function(evt) {evt.preventDefault(); moveFrom = null;}, false );
document.getElementById('bookmark_7').addEventListener('mouseup', function(evt) {evt.preventDefault(); moveFrom = null;}, false );
document.getElementById('bookmark_8').addEventListener('mouseup', function(evt) {evt.preventDefault(); moveFrom = null;}, false );


document.getElementById('bookmark_1').addEventListener('mouseover', function() {if(moveFrom) {oldBookmark1 = GM_getValue('bookmark'+moveFrom); oldBookmark2 = GM_getValue('bookmark1'); if(oldBookmark2){GM_setValue('bookmark1', oldBookmark1); GM_setValue('bookmark'+moveFrom, oldBookmark2); oldIcon1 = GM_getValue('icon'+moveFrom); oldIcon2 = GM_getValue('icon1'); GM_setValue('icon1', oldIcon1); GM_setValue('icon'+moveFrom, oldIcon2); refreshBookmarks(); moveFrom='1'; }};}, false );
document.getElementById('bookmark_2').addEventListener('mouseover', function() {if(moveFrom) {oldBookmark1 = GM_getValue('bookmark'+moveFrom); oldBookmark2 = GM_getValue('bookmark2'); if(oldBookmark2){GM_setValue('bookmark2', oldBookmark1); GM_setValue('bookmark'+moveFrom, oldBookmark2); oldIcon1 = GM_getValue('icon'+moveFrom); oldIcon2 = GM_getValue('icon2'); GM_setValue('icon2', oldIcon1); GM_setValue('icon'+moveFrom, oldIcon2); refreshBookmarks(); moveFrom='2'; }};}, false );
document.getElementById('bookmark_3').addEventListener('mouseover', function() {if(moveFrom) {oldBookmark1 = GM_getValue('bookmark'+moveFrom); oldBookmark2 = GM_getValue('bookmark3'); if(oldBookmark2){GM_setValue('bookmark3', oldBookmark1); GM_setValue('bookmark'+moveFrom, oldBookmark2); oldIcon1 = GM_getValue('icon'+moveFrom); oldIcon2 = GM_getValue('icon3'); GM_setValue('icon3', oldIcon1); GM_setValue('icon'+moveFrom, oldIcon2); refreshBookmarks(); moveFrom='3'; }};}, false );
document.getElementById('bookmark_4').addEventListener('mouseover', function() {if(moveFrom) {oldBookmark1 = GM_getValue('bookmark'+moveFrom); oldBookmark2 = GM_getValue('bookmark4'); if(oldBookmark2){GM_setValue('bookmark4', oldBookmark1); GM_setValue('bookmark'+moveFrom, oldBookmark2); oldIcon1 = GM_getValue('icon'+moveFrom); oldIcon2 = GM_getValue('icon4'); GM_setValue('icon4', oldIcon1); GM_setValue('icon'+moveFrom, oldIcon2); refreshBookmarks(); moveFrom='4'; }};}, false );
document.getElementById('bookmark_5').addEventListener('mouseover', function() {if(moveFrom) {oldBookmark1 = GM_getValue('bookmark'+moveFrom); oldBookmark2 = GM_getValue('bookmark5'); if(oldBookmark2){GM_setValue('bookmark5', oldBookmark1); GM_setValue('bookmark'+moveFrom, oldBookmark2); oldIcon1 = GM_getValue('icon'+moveFrom); oldIcon2 = GM_getValue('icon5'); GM_setValue('icon5', oldIcon1); GM_setValue('icon'+moveFrom, oldIcon2); refreshBookmarks(); moveFrom='5'; }};}, false );
document.getElementById('bookmark_6').addEventListener('mouseover', function() {if(moveFrom) {oldBookmark1 = GM_getValue('bookmark'+moveFrom); oldBookmark2 = GM_getValue('bookmark6'); if(oldBookmark2){GM_setValue('bookmark6', oldBookmark1); GM_setValue('bookmark'+moveFrom, oldBookmark2); oldIcon1 = GM_getValue('icon'+moveFrom); oldIcon2 = GM_getValue('icon6'); GM_setValue('icon6', oldIcon1); GM_setValue('icon'+moveFrom, oldIcon2); refreshBookmarks(); moveFrom='6'; }};}, false );
document.getElementById('bookmark_7').addEventListener('mouseover', function() {if(moveFrom) {oldBookmark1 = GM_getValue('bookmark'+moveFrom); oldBookmark2 = GM_getValue('bookmark7'); if(oldBookmark2){GM_setValue('bookmark7', oldBookmark1); GM_setValue('bookmark'+moveFrom, oldBookmark2); oldIcon1 = GM_getValue('icon'+moveFrom); oldIcon2 = GM_getValue('icon7'); GM_setValue('icon7', oldIcon1); GM_setValue('icon'+moveFrom, oldIcon2); refreshBookmarks(); moveFrom='7'; }};}, false );
document.getElementById('bookmark_8').addEventListener('mouseover', function() {if(moveFrom) {oldBookmark1 = GM_getValue('bookmark'+moveFrom); oldBookmark2 = GM_getValue('bookmark8'); if(oldBookmark2){GM_setValue('bookmark8', oldBookmark1); GM_setValue('bookmark'+moveFrom, oldBookmark2); oldIcon1 = GM_getValue('icon'+moveFrom); oldIcon2 = GM_getValue('icon8'); GM_setValue('icon8', oldIcon1); GM_setValue('icon'+moveFrom, oldIcon2); refreshBookmarks(); moveFrom='8'; }};}, false );

}

function showPopup(title, message, value) {

	if(value == 0) {
		document.getElementById('gm_popupHolder').innerHTML="<div id='gm_popup' style='position:fixed; left:10px; bottom:30px; width:180px; height:40px; background-color:#D8DFEA; border:1px solid #526EA6; -moz-border-radius:5px; padding:4px; z-index:249;'><b>"+title+"</b></div>"
		document.getElementById('gm_popup').innerHTML+="<a href='#' id='closePopup'><div style='position:absolute; top:0px; right:4px; color:#526EA6'>X</div></a>";
		document.getElementById('gm_popup').innerHTML+="<div style='height:6px;'></div>&nbsp;&nbsp;&nbsp;&nbsp;"+message+"</div>";
	}

	if(value < 1.1 && value > -.1) {
		document.getElementById('gm_popupHolder').style.opacity=value;
		value+=.1;
		setTimeout(function() {showPopup('null', 'null', value);}, 50);
	} else {
		document.getElementById('closePopup').removeEventListener('click', function() {closePopup(0.9);}, false );
		document.getElementById('closePopup').addEventListener('click', function() {closePopup(0.9);}, false );
		closeTimeout = setTimeout(function() {closePopup(0.9);}, 5000);
	}

}

function closePopup(value) {
	clearTimeout(closeTimeout);
	if(value > -.1) {
		document.getElementById('gm_popupHolder').style.opacity=value;
		value-=.1;
		setTimeout(function() {closePopup(value);}, 50);
	} else {
		document.getElementById('closePopup').removeEventListener('click', function() {closePopup(0.9);}, false );
		//document.getElementById('gm_popupHolder').innerHTML="";
	}
}




