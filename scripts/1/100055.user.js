// ==UserScript==
// @name           Facebook Configurable Hide Likes
// @namespace      hunsley@gmail.com
// @description    Hides the Like posts from sites and pages on the News Feed.  Configurable as to which kinds of posts should be shown.  Based on KramerC's original script at http://userscripts.org/scripts/review/77487
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

// Global script variables
var scriptNum = "100055";
var scriptName = "Facebook Configurable Hide Likes";
var homepageURL = "http://userscripts.org/scripts/show/" + scriptNum;
var scriptVersion = "1.0"

// Set globals based on script saved options or defaults
// These two are set to true to mimic functionality of the original script
window.hideLikesRemovePage = GM_getValue('removePage','true');
window.hideLikesRemoveSite = GM_getValue('removeSite','true');
// These two are off by default
window.hideLikesRemovePhoto = GM_getValue('removePhoto','false');
window.hideLikesRemoveStatus = GM_getValue('removeStatus','false');



function remove_page_likes() {
	$('li[id*="stream_story"][data-ft*="sty":161,]').remove();
	$('li[id*="stream_story"][data-ft*="sty":"161",]').remove();

	// sty 8 is also used for friend connection notifications, so an extra selector is required
	$('li[id*="stream_story"][data-ft*="sty":8,]:not([data-ft*="fbid":])').remove();
	$('li[id*="stream_story"][data-ft*="sty":"8",]:not([data-ft*="fbid"L])').remove();
}

function remove_site_likes() {
	$('li[id*="stream_story"][data-ft*="sty":283,]').remove();
	$('li[id*="stream_story"][data-ft*="sty":"283",]').remove();
}

function remove_photo_likes() {
	$('li[id*="stream_story"][data-ft*="sty":7,]').remove();
	$('li[id*="stream_story"][data-ft*="sty":"7",]').remove();
}

// There isn't currently a reliable way to separate status likes and status comments, unfortunately
function remove_status_likes() {
	$('li[id*="stream_story"][data-ft*="sty":11,]').remove();
	$('li[id*="stream_story"][data-ft*="sty":"11",]').remove();
}

function remove_likes() {
	if (window.hideLikesRemovePage=='true') {
		remove_page_likes();
	}
	if (window.hideLikesRemoveSite=='true') {
		remove_site_likes();
	}
	if (window.hideLikesRemovePhoto=='true') {
		remove_photo_likes();
	}
	if (window.hideLikesRemoveStatus=='true') {
		remove_status_likes();
	}
}

// Functions related to the options menu

// Verify the options menu can be added to
if (!GM_registerMenuCommand) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}

function saveOptions()
{
	if (document.getElementById('hidePage').checked) {
		GM_setValue('removePage', 'true' );
		window.hideLikesRemovePage = "true";
	}
	else {
		GM_setValue('removePage', 'false' ); 
		window.hideLikesRemovePage = "false";
	}

	if (document.getElementById('hideSite').checked) {
		GM_setValue('removeSite', 'true' );
		window.hideLikesRemoveSite = "true";
	}
	else {
		GM_setValue('removeSite', 'false' ); 
		window.hideLikesRemoveSite = "false";
	}

	if (document.getElementById('hidePhoto').checked) {
		GM_setValue('removePhoto', 'true' );
		window.hideLikesRemovePhoto = "true";
	}
	else {
		GM_setValue('removePhoto', 'false' ); 
		window.hideLikesRemovePhoto = "false";
	}

	if (document.getElementById('hideStatus').checked) {
		GM_setValue('removeStatus', 'true' );
		window.hideLikesRemoveStatus = "true";
	}
	else {
		GM_setValue('removeStatus', 'false' ); 
		window.hideLikesRemoveStatus = "false";
	}
}

function hideOptions()
{
	document.getElementById("optionsDiv").className="hidden";
	document.getElementById("modalDiv").className="hidden";
}

//full thanks to "Google Anonymizer" code for visual options - http://userscripts.org/scripts/review/10448
function showOptions()
{
	pageChecked = "";
	siteChecked = "";
	photoChecked = "";
	statusChecked = "";

	if (window.hideLikesRemovePage=='true') {
		pageChecked = "checked = \"yes\"";
	}
	if (window.hideLikesRemoveSite=='true') {
		siteChecked = "checked = \"yes\"";
	}
	if (window.hideLikesRemovePhoto=='true') {
		photoChecked = "checked = \"yes\"";
	}
	if (window.hideLikesRemoveStatus=='true') {
		statusChecked = "checked = \"yes\"";
	}


	var div1=document.getElementById("modalDiv");
	if (div1==null)
	{
		GM_addStyle("#modalDiv{position:fixed; top:0px; left:0px; z-index:10; width:100%; height:100%; background-color:black; opacity:0.75;}");
		GM_addStyle(".hidden{display:none; visibility:hidden;}");
		
		div1=document.createElement("DIV");
		div1.id="modalDiv";
		div1.className="hidden";
		div1.title="Click to cancel and close";
		document.body.appendChild(div1);
		
		div1.addEventListener("click",hideOptions,false);
	}
	var div2=document.getElementById("optionsDiv");
	if (div2==null)
	{
		GM_addStyle("#optionsDiv{position:fixed; top:10%; left:20%; z-index:20; width:40%; height:25%; background-color:white; border:solid 3px #0033CC; overflow:auto;}");
		
		div2=document.createElement("DIV");
		div2.id="optionsDiv";
		div2.className="hidden";
		div2.setAttribute("style","text-align:justify;padding:10px");
		
		var text1="";
		text1+="<center><font size=\"+1\"><a href=\""+ homepageURL + "\" target=\"_blank\">" + scriptName + " " + scriptVersion + "</a> Options</font>";
		text1+="<form id=\"FCHLO\" name=\"titleform\"><ul>"
		text1+="<li>Hide Page Likes <input type=\"checkbox\" id=\"hidePage\" " + pageChecked + "/>";
		text1+="<li>Hide Site Likes <input type=\"checkbox\" id=\"hideSite\" " + siteChecked + "/>";
		text1+="<li>Hide Photo Likes <input type=\"checkbox\" id=\"hidePhoto\" " + photoChecked + "/>";
		text1+="<li>Hide Status Likes and Comments <input type=\"checkbox\" id=\"hideStatus\" " + statusChecked + "/>";
		text1+="</ul><center><input type=\"button\" value=\"Ok\" id=\"okButton\" /><input type=\"button\" value=\"Cancel\" id=\"cancelButton\" /></center></form>";
		div2.innerHTML=text1;
		
		document.body.appendChild(div2);
		
		document.getElementById("okButton").addEventListener("click",function(){saveOptions();hideOptions();location.reload(true);},false);
		document.getElementById("cancelButton").addEventListener("click",function(){hideOptions();},false);
	}
	document.getElementById("optionsDiv").className="";
	document.getElementById("modalDiv").className="";
	div1.className="";
	div2.className="";
}


// Register the options menu
GM_registerMenuCommand("Facebook Hide Likes Options", showOptions);

window.addEventListener("load", function() { remove_likes(); }, false);
window.addEventListener("DOMNodeInserted", function() { remove_likes(); }, false);