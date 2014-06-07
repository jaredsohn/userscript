// ==UserScript==
// @name           NexonEU Forum Tweaker changed by BaalMcKloud
// @namespace      NexonEU Forum Tweaker
// @description    Little script to hide signatures, add Google search + some extra features for Nexon forums;-) !***! ALL CREDITS BY dvil88 AND _brajan_ !***!
// @version        version 0.6 - based on the sourcecode from "NexonEU Tweaker v0.7.3" - http://userscripts.org/scripts/show/88894
// @include        http://forum.nexoneu.com/NXEU.aspx?g=posts&t=*
// @include        http://forum.nexoneu.com/NXEU.aspx?g=posts&m=*
// @include        http://forum.nexoneu.com/NXEU.aspx?g=topics&f=*
// @include        http://forum.nexoneu.com/NXEU.aspx?g=forum&c=*
// @include        http://forum.nexoneu.com/NXEU.aspx?g=profile&u=*
// ==/UserScript==
/*
NexonEU Forum Tweaker changed by BaalMcKloud

Developed by _brajan_ <brajan at un dot pl>
Hide Signatures made by dvil88 <dvil88 at gmail dot com>
Some Changes by BaalMcKloud <clan-selection at gmx dot de>
*/

/* ## USER CONFIGURABLE STUFF - START ## */

/* Enable/Disable features ( true = enable, false = disable ) */
var HideSignatures = true;
var GoogleSearch = true;
var HighlightNames = true;
var ResizeImages = true;

/* this feature has been implemented directly in Nexon Europe Forum sourcecode and is no longer needed here in the tweaker, if you enable this you will break it and get no pop-ups at all */
var ExternalLinksWarning = false;

/* User lists for HighlightNames */
var friends =  new Array('NEXONEurope','NXSyn','Esserterp','NXBelsazar','NXFallenLux');

var fms =  new Array('BoneWeaver','daylight01','noctis21','fskpark','jerejen','hadesmotherf','snickers08','chloepe','MugiwaraNeko','GwenhyffarM','ahngajang2','Metrofono','samanthacart','iThrowArrows','NXSeraphine','NXJioZun','NXKupi','Juhee321','Pyrdacor','zeusman666','Pr0methe','NXKheops','NXThalia','Niunaski','Ylathor','NXMelody','NXKronos','Seikakaze','NXDecurio','NXIzanagi','NXPoke','NXRaziel','NXTakeya','NXZyava','Neidrag','Matrix1403','NXDew','NXNeko','NXIsikk');
var cafms =  new Array('Quillan1977','nmandic','Zalensia','BugyBug','sertunc','Slugger89','Bootros','crxs99','brajan19','sledge1234','Leka83');
var cagms =  new Array('Ciryl','Time2Hammer','MaxB4N','SYK3S','Positronic','M4xtreme','GNitroM','NXCypher');

/* Colors for HighlightNames */
var friends_color = '#00FFFF';

var fms_color = '#FF6600';
var cafms_color = '#00FF00';
var cagms_color = '#FF0000';

/* ## USER CONFIGURABLE STUFF - END ## */


///////////////////////////////////////////////////////////////////////////////
//  DO NOT EDIT ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING  //
///////////////////////////////////////////////////////////////////////////////
var version = '0.7.1';

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
function getRandomNumber(range){
	return Math.floor(Math.random() * range);
}

function getRandomChar(){
	var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
	return chars.substr( getRandomNumber(62), 1 );
}

function randomID(size){
	var str = "";
	for(var i = 0; i < size; i++)
	{
		str += getRandomChar();
	}
	return str;
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

	for(i=0; i <= friends.length-1; i++){
		if(friends[i] == undefined) { continue; }
			newBodyText = Highlight(newBodyText, friends[i], friends_color);
	}
	for(i=0; i <= fms.length-1; i++){
		if(fms[i] == undefined) { continue; }
			newBodyText = Highlight(newBodyText, fms[i], fms_color);
	}
	for(i=0; i <= cafms.length-1; i++){
		if(cafms[i] == undefined) { continue; }
			newBodyText = Highlight(newBodyText, cafms[i], cafms_color);
	}
	for(i=0; i <= cagms.length-1; i++){
		if(cagms[i] == undefined) { continue; }
			newBodyText = Highlight(newBodyText, cagms[i], cagms_color);
	}

	return newBodyText;
}


/* ## CORE FEATURES - START ## */
function add_google_search(){
	var source = document.getElementById('navlinks').innerHTML;
	document.getElementById('navlinks').innerHTML = '<table style="width:100%; height:20px; padding: 5px; vertical-align: top; text-align:right; background-color:#9CBEF7"><tr><td><input id="str" name="str" type="text" style="width:250px" /></td><td style="width:16px"><input type="image" align="right" src="http://www.brajan.dev.un.pl/img/google.png?v='+version+'" id="google_search" value="Search" onclick="window.open(\'http://www.google.com/search?q=site:forum.nexoneu.com \'+document.getElementById(\'str\').value+\'\')" /></td></tr></table>'+source;
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

function doResizeImages(){
// ADD CHROME
	 if (BrowserDetect.browser=="Netscape") {
	  winW = window.innerWidth-16;
	  winH = window.innerHeight-16;
	 }
	  if (BrowserDetect.browser=="Opera") {
	  winW = window.innerWidth-16;
	  winH = window.innerHeight-16;
	 }
	 if (BrowserDetect.browser=="Firefox") { 
	  winW = document.body.offsetWidth-20;
	  winH = document.body.offsetHeight-20;
	 }
	
	var maxht = winH;
	var maxwt = winW;
	var minht = winH / 1.90;
	var minwt = winW / 1.90;
	var imgs = document.getElementsByTagName('img');
	var resize_image = function(img, newht, newwt) {
		var ranID = randomID(8);
		img.setAttribute('id', ranID); 
		img.setAttribute('width', '100%');
		img.setAttribute('rel', 'resized_'+ranID); 
		img.setAttribute('alt', 'This image is too big and has been auto-resized by NexonEU (Forum) Tweaker!'); 
		img.setAttribute('title', 'This image is too big and has been auto-resized by NexonEU (Forum) Tweaker!'); 
	};
 	for (var i = 0; i < imgs.length; i++) {
		var img = imgs[i];
		if (img.height > maxht || img.width > maxwt) {
	       	resize_image(img);
		}
	}
}
function externalLinks() {
	if (!document.getElementsByTagName) return;
	var anchors = document.getElementsByTagName("a");
	var warning_text = "WARNING! \\nYou have clicked on a link to a website that is not one of Nexon\\\'s official websites. It could be dangerous. \\nRemember: \\n- Never enter your login information anywhere other than on Nexon\\\'s official websites. \\n- Never let anyone else know your account details (login, password). \\n- Never download anything from a site that you do not know, regardless of what the rewards claim to be. \\n\\nNever install any kind of software from a site that you do not know, whatever that software may be (plugin, certificate etc.), it could in fact be a keylogger or spyware designed to steal your account. \\n\\nDo you still want to access: \"[externalurl]\"?"; 
	
	for (var i=anchors.length-1; i>=0; i--){
		var local = false;
		var anchor = anchors[i];
		
		if( (anchor.href.indexOf("javascript:__doPostBack") ==-1) && (anchor.href.indexOf("javascript:scroll")==-1) && (anchor.href.indexOf("javascript:DataPanel_ExpandCollapse")==-1) && (anchor.href.indexOf("youtube.com")==-1) && (anchor.href.indexOf("youtu.be")==-1) && (anchor.href.indexOf("imageshack.us")==-1) && (anchor.href.indexOf("facebook.com")==-1) && (anchor.href.indexOf("imgur.com")==-1) && (anchor.href.indexOf("directupload.net")==-1) && (anchor.href.indexOf("google.com")==-1) && (anchor.href.indexOf("microsoft.com")==-1) && (anchor.href.indexOf("wikipedia.org")==-1) ) { 

			var regex = (anchor.href == '') ? true : anchor.hostname.match((/^(www\.|http:\/\/|https:\/\/|http:\/\/www\.|https:\/\/www\.)?([a-zA-Z0-9]+[.]{1})?([a-zA-Z0-9]+[.]{1})?(nexoneu.com|nexon.net)$/));

			if (!regex) {
				anchor.setAttribute('target','_blank');
				anchor.setAttribute('onClick','return confirm(\''+ warning_text.replace('[externalurl]',anchor.href) +'\')');
			}
		}
	}
}
/* ## CORE FEATURES - END ## */

window.addEventListener('load',function(e){
	if(HideSignatures){ add_hide_signatures(); }
	if(HighlightNames && !HideSignatures){ add_highlight_names(); };
	if(GoogleSearch) { add_google_search(); }
	if(ResizeImages) { doResizeImages(); }
	if(ExternalLinksWarning) { externalLinks(); }
},true);