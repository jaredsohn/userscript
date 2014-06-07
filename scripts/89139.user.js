// ==UserScript==
// @name           NexonEU Tweaker
// @namespace      website / forum
// @description    A script to hide the signatures of the nexon forum and add google search for a forums
// @include        http://forum.nexoneu.com/NXEU.aspx?g=posts&t=*
// @include        http://forum.nexoneu.com/NXEU.aspx?g=posts&m=*
// @include        http://forum.nexoneu.com/NXEU.aspx?g=topics&f=*
// @include        http://forum.nexoneu.com/NXEU.aspx?g=forum&c=*
// ==/UserScript==
/*
NexonEU Tweaker 0.5

Developed by dvil88 <dvil88 at gmail dot com> (Hide Signatures)
Developed by _brajan_ <brajan at un dot pl>
*/

/* ## USER CONFIGURABLE STUFF - START ## */

/* Enable/Disable features ( true = enable, false = disable ) */
var HideSignatures = false;
var GoogleSearch = true;
var HighlightNames = true;

/* User lists for HighlightNames */
var friends =  new Array('NEXONEurope',);


var fms =  new Array('BoneWeaver','Leka83','chloepe','nmandic','iTzObi','Astrakopowa','ahngajang2','sledge1234','MinaTepes','jerejen','M1gNo','kazz','snickers08','carloshax','Zalensia','Bootros','daylight01');
var gms =  new Array('Ciryl','Time2Hammer','MaxB4N','SYK3S');


/* Colors for HighlightNames */
var fms_color = '#FF6600';
var gms_color = '#663300';
var friends_color = '#009999';


/* ## USER CONFIGURABLE STUFF - END ## */


///////////////////////////////////////////////////////////////////////////////
//  DO NOT EDIT ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING  //
///////////////////////////////////////////////////////////////////////////////
function setDOM(idname){
	if (document.getElementById)
		{ return document.getElementById(idname); }
	else if (document.all) 
		{ return document.all[idname]; }
	else if (document.layers)
		{ return document.layers[idname]; }
	else
		{ return null; }
}

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
	],

};
BrowserDetect.init();

function Highlight(bodyText, searchTerm, color) {
    highlightStartTag = "<span style='color:"+color+"; font-weight:bold'>";
    highlightEndTag = "</span>";
	var newText = "";
	var i = -1;
	var lcSearchTerm = searchTerm.toLowerCase();
	var lcBodyText = bodyText.toLowerCase();
	while (bodyText.length > 0) {
		i = lcBodyText.indexOf(lcSearchTerm, i+1);
			if (i < 0) {
				newText += bodyText;
				bodyText = "";
			} else {
			if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
				if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
					newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
					bodyText = bodyText.substr(i + searchTerm.length);
					lcBodyText = bodyText.toLowerCase();
					i = -1;
				}
			}
		}
	}
  return newText;
}

function doHighlight(bodyText){
var newBodyText = bodyText;

	for(i=0; i <= fms.length-1; i++){
		if(fms[i] == undefined) { continue; }
			newBodyText = Highlight(newBodyText, fms[i], fms_color);
	}
	for(i=0; i <= gms.length-1; i++){
		if(gms[i] == undefined) { continue; }
			newBodyText = Highlight(newBodyText, gms[i], gms_color);
	}
	for(i=0; i <= friends.length-1; i++){
		if(friends[i] == undefined) { continue; }
			newBodyText = Highlight(newBodyText, friends[i], friends_color);
	}
	return newBodyText;
}


/* ## CORE FEATURES - START ## */
function add_google_search(){
	var source = document.getElementById('navlinks').innerHTML;
	document.getElementById('navlinks').innerHTML = '<table style="width:100%; height:20px; padding: 5px; vertical-align: top; text-align:right; background-color:#9CBEF7"><tr><td><input id="str" name="str" type="text" style="width:250px" /></td><td style="width:16px"><input type="image" align="right" src="http://www.brajan.dev.un.pl/img/google.png" id="google_search" value="Search" onclick="window.open(\'http://www.google.com/search?q=inurl:nexoneu.com  site:forum.nexoneu.com \'+document.getElementById(\'str\').value+\'\')" /></td></tr></table>'+source;
} 
function add_highlight_names(){
	strReplaceAll = document.body.innerHTML;
	document.body.innerHTML = doHighlight(strReplaceAll);
}

function add_hide_signatures(){
	forum_hr = ((BrowserDetect.browser == 'Opera') || (BrowserDetect.browser == 'Chrome')) ? '<hr noshade="">' : '<hr noshade="noshade">';
	var is = document.getElementsByTagName ('hr');
	strReplaceAll = document.body.innerHTML;
	for (i = 0; i <= is.length; i++){
		strReplaceAll = strReplaceAll.replace( forum_hr, "<br /><br /><input type=\"button\" onclick=\"var state = document.getElementById("+ i +").style.display; new_display = (state == 'none') ? 'block' : 'none'; document.getElementById("+ i +").style.display = new_display;\" style=\"cursor:pointer;float:right;\" class=\"pbutton\" value=\"Show/hide\" /><div style=\"height:1px; width:100%; background-color:#ccc;\"></div><div id=\""+ i +"\" style=\"display:none;\">");
	}
	if(HighlightNames){
		document.body.innerHTML = doHighlight(strReplaceAll);
	}
	else{
		document.body.innerHTML = strReplaceAll;
	}
}

/* ## CORE FEATURES - END ## */

window.addEventListener('load',function(e){
	if(HideSignatures){ add_hide_signatures(); }
	if(HighlightNames && !HideSignatures){ add_highlight_names(); };
	if(GoogleSearch) { add_google_search(); }
},true);