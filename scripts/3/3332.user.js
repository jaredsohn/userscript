// Version 5.2
// Wednesday, January, 10, 2007.
// Myspace Annoyance Removal
// Daniel Teichman
// danielteichman[xATx]gmail[xDOTx]com
//
// Much code added, replaced, and otherwise tweaked by James Bodell
// james.bodell[^7]gmail[*]com
//
// ==UserScript==
// @name         Myspace Annoyance Removal
// @description  Removes the Cool New People, the Featured Profile, the block ads, the ad at the top of the page, and other assorted annoyances.  Optionally removes certain elements on a per-profile basis.  It even updates automatically!
// @include      http://*.myspace.com*
// @include      http://myspace.com*
// @include      http://*.myspace.com
// @include      http://myspace.com
// ==/UserScript==
/*
COPYRIGHT NOTICE:
Copyright (C) 2006 and onwards  Daniel Teichman

This script is provided free of charge and may be distributed
free of charge.  This script may only be bundled with other software
that is to be provided free of charge.  If you wish to use this script
for any other use, ask the author.

This script is distributed WITHOUT ANY WARRANTY whatsoever.

If you suddenly find that you computer won't boot or that someone stole
your credit cards, it wasn't my fault.
*/
var loc = document.location.toString();
var i;
var version = "5.2";
var latest;

var closebutton = "data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00%60%00%60%00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.'%20%22%2C%23%1C%1C(7)%2C01444%1F'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222222222222222222222222222222222222222222222%FF%C0%00%11%08%00%0F%00%0F%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%91%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26'()*456789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26'()*56789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%EB%BCC%E3%3Dc%C2%BE1x%EFm%BC%ED%12%7D%86%1F%90%06%0A%14%07%D8%C3%A9%DCrC%7Bt%04%1A%B1%E0o%13%EB%9E%26%D65%1B%8B%9BuM%24.%22%C2%8CD%F9%18%40%DC%16%25I'%DF%1Ft%10%09%E2%7F%03j%3E%26%F1%3C%177%1A%9A%8D%25%14%0F%24d%3CC%1F0Q%8C%12%C4%0F%98%F3%CFB%14%03w%C1%1E%11%BD%F0%B7%DBR%E3R%F3%E1%95%FF%00u%0Cc%09%81%FCg%3C%86%23%8C%03%8E9-%C6%3E9%B8ry%9F%5BV%A6%5D%FD%9F%EE%A8%FBnT%B6%7D%FE%EEkn%FF%00F%7F%FF%D9";

function removeCSS () {
styles = document.getElementsByTagName("style");
for (i = styles.length - 1; i >= 0; i--) styles[i].parentNode.removeChild(styles[i]);
}

function removeImages () {
images = document.getElementsByTagName("img");
for (i = images.length - 1; i >= 0; i--) images[i].parentNode.removeChild(images[i]);
}

function removeAV () {
media = document.getElementsByTagName("embed");
for (i = media.length - 1; i >= 0; i--)
	if (media[i].getAttribute("src").toLowerCase().indexOf(".swf") == -1)
		media[i].parentNode.removeChild(media[i]);
}

function removeFlash () {
flash = document.getElementsByTagName("embed");
for (i = flash.length - 1; i >= 0; i--)
	if (flash[i].getAttribute("src").toLowerCase().indexOf(".swf") > -1)
		flash[i].parentNode.removeChild(flash[i]);
}

function removeFalling () {
marquee = document.getElementsByTagName("marquee");
for (i = marquee.length - 1; i >= 0; i--)
	if (marquee[i].getAttribute("direction").toLowerCase().indexOf("down") > -1)
		marquee[i].parentNode.removeChild(marquee[i]);
}

function removeMarquee () {
marquee = document.getElementsByTagName("marquee");
for (i = marquee.length - 1; i >= 0; i--)
	marquee[i].parentNode.removeChild(flash[i]);
}

function isBlocked(item) {
var prefs = GM_getValue(loc, "none");
if (prefs.indexOf(item) > -1) return true;
else return false;
}

function filterProfile () {
var prefs = GM_getValue(loc, "none");
if (prefs.indexOf("css") > -1) removeCSS();
if (prefs.indexOf("images") > -1) removeImages();
if (prefs.indexOf("flash") > -1) removeFlash();
if (prefs.indexOf("av") > -1) removeAV();
if (prefs.indexOf("falling") > -1) removeFalling();
if (prefs.indexOf("marquee") > -1) removeMarquee();
}

function setObnox () {
var valueToSet = "";
if (document.getElementById("check_css").checked) valueToSet += "css";
if (document.getElementById("check_images").checked) valueToSet += "images";
if (document.getElementById("check_flash").checked) valueToSet += "flash";
if (document.getElementById("check_av").checked) valueToSet += "av";
if (document.getElementById("check_falling").checked) valueToSet += "falling";
if (document.getElementById("check_marquee").checked) valueToSet += "marquee";
GM_setValue(loc, valueToSet);
}

function displayObnoxOps () {
document.getElementById("ctl00_Main_ctl00_UserNetwork1_ctrlMessage").parentNode.innerHTML = '<a id="annoysme" style="cursor:pointer;">Is this profile annoying?</a>';
document.addEventListener('click', function(event) {
//event.stopPropagation();
//event.preventDefault();
if (!document.getElementById("obnoxious") && event.target == document.getElementById("annoysme")){
document.body.innerHTML += '<div id="obnoxious" style="background-color:#FFFFCC;position:absolute;top:0px;right:0px;width:350px;height:auto;z-index:100001"><table><tr><td align="center" valign="top"><font color="black"><b>Profile Annoyance Options</b></font></td><td align="right" valign="top"><img src='+closebutton+' style="cursor:pointer;" onClick="document.getElementById(\'obnoxious\').parentNode.removeChild(document.getElementById(\'obnoxious\'))"></td></tr><tr><td align="left" valign="top" colspan="2"><font size="1" color="black">Is this profile annyoing you?  Is it time to zap something?  Let\' do it! Just check everything you want to block. To unblock an item, simply return to this panel, and leave that item unblocked.  After unblocking items, you will not see them again until you reload the page.  Note that you may have to block Audio/Video for some tricky flash elements.</font><br><br><center><table border="0"><tr><td><input type="checkbox" id="check_css"></td><td>CSS</td></tr><tr><td><input type="checkbox" id="check_images"></td><td>Images</td></tr><tr><td><input type="checkbox" id="check_flash"></td><td>Flash</td></tr><tr><td><input type="checkbox" id="check_av"></td><td>Audio/Video</td></tr><tr><td><input type="checkbox" id="check_falling"></td><td>Falling Objects</td></tr><tr><td><input type="checkbox" id="check_marquee"></td><td>Marquees/Scrollers</td></tr></table></center><br><center><input type="button" value="Fix It!" id="fixitbutton"></center></td></tr></table></div>';
if (isBlocked("css")) document.getElementById("check_css").click();
if (isBlocked("images")) document.getElementById("check_images").click();
if (isBlocked("flash")) document.getElementById("check_flash").click();
if (isBlocked("av")) document.getElementById("check_av").click();
}
if (document.getElementById("obnoxious") && event.target == document.getElementById("fixitbutton")) {
setObnox();
document.getElementById("obnoxious").parentNode.removeChild(document.getElementById("obnoxious"));
filterProfile();
}

}, true);

}

function displayObnoxOpsGroup () {
document.body.innerHTML += '<div id="obnoxious" style="background-color:#FFFFCC;position:absolute;top:0px;right:0px;width:350px;height:auto;z-index:100001"><table><tr><td align="center" valign="top"><font color="black"><b>Profile Annoyance Options</b></font></td><td align="right" valign="top"><img src='+closebutton+' style="cursor:pointer;" onClick="document.getElementById(\'obnoxious\').parentNode.removeChild(document.getElementById(\'obnoxious\'))"></td></tr><tr><td align="left" valign="top" colspan="2"><font size="1" color="black">Is this profile annyoing you?  Is it time to zap something?  Let\' do it! Just check everything you want to block. To unblock an item, simply return to this panel, and leave that item unblocked.  After unblocking items, you will not see them again until you reload the page.  Note that you may have to block Audio/Video for some tricky flash elements.</font><br><br><center><table border="0"><tr><td><input type="checkbox" id="check_css"></td><td>CSS</td></tr><tr><td><input type="checkbox" id="check_images"></td><td>Images</td></tr><tr><td><input type="checkbox" id="check_flash"></td><td>Flash</td></tr><tr><td><input type="checkbox" id="check_av"></td><td>Audio/Video</td></tr></table></center><br><center><input type="button" value="Fix It!" id="fixitbutton"></center></td></tr></table></div>';
if (isBlocked("css")) document.getElementById("check_css").click();
if (isBlocked("images")) document.getElementById("check_images").click();
if (isBlocked("flash")) document.getElementById("check_flash").click();
if (isBlocked("av")) document.getElementById("check_av").click();
document.addEventListener('click', function(event) {
//event.stopPropagation();
//event.preventDefault();
if (document.getElementById("obnoxious") && event.target == document.getElementById("fixitbutton")) {
setObnox();
filterProfile();
}

}, true);

}

function checkOutdated () {
GM_xmlhttpRequest({
    method: 'GET',
    url: "http://www.holyhell.net/userscripts/mar/version.php",
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml,text/javascript,text',
    },
    onload: function(responseDetails) {
	latest = responseDetails.responseText;
	//if (version != latest) {
	if (version < latest) {
		document.body.innerHTML += '<div id="updateavailable" style="background-color:#FFFFCC;position:absolute;top:'+window.pageYOffset+'px;right:0px;width:350px;height:auto;z-index:100001"><table><tr><td align="center" valign="top"><font color="black"><b>Update Available</b></font></td><td align="right" valign="top"><a style="cursor:pointer;" onClick="document.getElementById(\'updateavailable\').style.display = \'none\'"><font size="-3" color="red">[X]</font></a></tr><tr><td align="left" valign="top" colspan="2"><font size="1" color="black">There is an update available for the Myspace Annoyance Remover. Simply right-click the link below and &quot;Install User Script&quot;</font><br><br><center><a href=\"http://userscripts.org/scripts/source/3332.user.js"><font size="-3" color="blue">http://userscripts.org/scripts/source/3332.user.js</font></a><br><a href="http://userscripts.org/scripts/show/3332"><font size="-3" color="blue">Script Homepage @ Userscripts.org</font></a></center></td></tr></table></div>';
	updateOutdated();
	setTimeout("document.getElementById('updateavailable').style.display = 'none'", 15000);
	}
    }
});
}

function updateOutdated () {
if (document.getElementById("updateavailable").style.display != "none") {
document.getElementById("updateavailable").style.top = window.pageYOffset;
setTimeout(updateOutdated, 5);
}
}


var mainpage = false;
if (loc == "http://www.myspace.com") mainpage = true;
else if (loc == "http://www.myspace.com/") mainpage = true;
else if (loc == "http://myspace.com/") mainpage = true;
else if (loc == "http://myspace.com") mainpage = true;
else if (loc.indexOf("home.myspace.com") > -1 && loc.indexOf("fuseaction=splash") > -1) mainpage = true;
else if (loc == "http://home.myspace.com") mainpage = true;
else if (loc == "http://home.myspace.com/") mainpage = true;
else if (loc.indexOf(".com/index.cfm") > -1 && loc.indexOf("&") == -1) mainpage = true;

if (loc.indexOf("dex.cfm?fuseaction=ad") > -1 || loc.indexOf("collect.myspace.com") > -1) {
var links = document.links;
for (var i = 0; i < links.length; i++)
	if (links[i][i].innerHTML.indexOf("ip th") > -1)
		document.location.href = links[i].href;

}

else {

var scriptElements;
scriptElements = document.getElementsByTagName("script");
for (var i = 0; i < scriptElements.length; i++)
	if (scriptElements[i].innerHTML.indexOf("oas_ad") > -1)
//		scriptElements[i].parentNode.innerHTML = "";
		scriptElements[i].parentNode.style.display = "none";

var bannerAd = document.getElementById("advert");
if (bannerAd != undefined)
	bannerAd.innerHTML = "";

if (loc.indexOf("http://home.myspace.com") > -1 && loc.indexOf("n=user") > -1) {
	document.getElementById("splash_profile").style.display = "none";
	document.getElementById("splash_coolNewPeople").style.display = "none";	
	document.getElementById("squareAd").style.display = "none";
	document.getElementById("ctl00_Main_ctl00_ProfileHome_gads").style.display = "none";
//	document.getElementById("advert").style.display = "none";
//	document.getElementById("advert").innerHTML = "";
}

else if (mainpage) {
	document.getElementById("splash_coolNewPeople").style.display = "none";
//	document.getElementById("ad300x100").style.display = "none";
//	document.getElementById("ad440x160").style.display = "none";
	document.getElementById("splash_getStarted").style.display = "none";
	checkOutdated();
}

else if (loc.indexOf("profile.myspace.com") > -1 || document.getElementsByTagName("title").item(0).innerHTML.indexOf("www.myspace.com/") > -1) {
displayObnoxOps();
filterProfile();
}

else if (loc.indexOf("groups.myspace.com") > -1 && loc.indexOf("fuseaction=groups.groupProfile&groupID") > -1) {
displayObnoxOpsGroup();
}
};


if (unsafeWindow.parent == unsafeWindow){
	var footer = document.getElementById("footer");
	if (footer == undefined)
		footer = document.getElementById("msft");
	if (footer != undefined) 
		footer.innerHTML += "<center><div id=\"adrmvr\" style=\"width:640px;background-color:#FFFFCC;\" align=\"left\">This page was processed by the Myspace Adremove userscript for Greasemonkey.  If you have any comments or questions, head over to <a href=\"http://userscripts.org/scripts/show/3332\">http://userscripts.org/scripts/show/7049</a> or send an e-mail to james.bodell[xATx]gmail[xDOTx]com  You can help out by reporting pages that get around this script.</div></center><br>";	
//This is insanely buggy.  If anyone can figure out how to make this not cause a JavaScript error, drop me a line
}
//displayObnoxOps();
//checkOutdated();



