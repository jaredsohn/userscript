// ==UserScript==
// @name         YouTube Downloader GM
// @namespace    http://localhost
// @description  Adds a Download link just above YouTube embedded videos, designed for both Opera and Firefox Greasemonkey
// @author       bob2005euro
// @version      0.0.1
// @include      http://youtube.com/watch*	
// @include      http://*.youtube.com/watch*	
// @include      http://*.youtube.com/profile*
// @exclude
// ==/UserScript==

/*

====================================================
EXPERIMENTAL ONLY - DO NOT USE! Only works in Opera.
====================================================

In Firefox will try to access Greasemonkey's unsafeWindow in vain attempt at finding swfArgs.

Instead of this script use teridon's
"YouTube to me v2" script http://userscripts.org/scripts/show/12119

Which works on both Firefox and Opera.

This is an adaptation of script YouTube Downloader by Fábio Domingues aka fnds,
( http://userscripts.org/scripts/show/29184 )
so that it also works with Greasemonkey on Firefox.
It also detects and reports problems if the YouTube page is missing components  necessary to enable downloading.

OLD UserScript==
OLD name           YouTube Downloader
OLD version        0.1
OLD autor          Fábio Domingues aka fnds
OLD email          fnds3000@gmail.com
OLD namespace      http://www.portugal-a-programar.org/forum/index.php/topic,26637
OLD description    A simple Greasemonkey script that creates a link on the page to download the movie hosted on YouTube. Tested successfully in Opera.
OLD include        http://youtube.com/watch*
OLD include        http://*.youtube.com/watch*
OLD include        http://*.youtube.com/profile*
OLD UserScript==

CHANGELOG
=========
Version 0.0.1
    - Works on Opera 9.27 build 8841 Win32 Windows Vista on uk.youtube.com and other sites
    - Works on http://www.w3schools.com/js/tryit.asp?filename=try_dom_tut_changetext
    - Testing as a greasemonkey script installed on Firefox
*/

function display(_) {
    if (_ == 1)
        document.getElementById("alert-15646456418").style.display = "inline";
    else
        document.getElementById("alert-15646456418").style.display = "none"        
}

(function()
{
    youtube_download_fatal="";
    // Check whether we can access YouTube's swfArgs
    if (typeof swfArgs != "undefined")
	swf_pars='video_id='+swfArgs["video_id"]+'&t='+swfArgs["t"];
    else
	// swfArgs is undefined so see if we are in a Greasemonkey context
	if (typeof unsafeWindow != "undefined")
	    // we might be in Greasemonkey, so look inside unsafeWindow
	    if (typeof unsafeWindow.swfArgs != "undefined")
		// unsafeWindow contains swfArgs, so use it
		swf_pars='video_id='+unsafeWindow.swfArgs["video_id"]+'&t='+unsafeWindow.swfArgs["t"];
	    else
		// swfArgs is not found, maybe youtube changed its name? We have to give up.
		youtube_download_fatal="YouTube downloader cannot find swfArgs - download not possible here<br/>";
   
    if (youtube_download_fatal == "")
	if (document.getElementById("watch-vid-title"))
	    title = document.getElementById("watch-vid-title").getElementsByTagName("div")[0].innerHTML.replace(/ /g, "_");
	else
	    // watch-vid-title element not found, but we still might be able to download.
	    title="something meaningful";

    if (youtube_download_fatal == "")
	if (document.getElementById("watch-this-vid"))
	    place = document.getElementById("watch-this-vid");
	else
	    // watch-this-vid element not found, so not possible to download
	    youtube_download_fatal="YouTube downloader cannot find watch-this-vid element - download not possible here<br/>";
    
    if (youtube_download_fatal == "")
	if (typeof place =="undefined")
	    youtube_download_fatal="YouTube downloader cannot find watch-this-vid's HTML - download not possible here<br/>";
    
    if (youtube_download_fatal != "")
	document.body.innerHTML = youtube_download_fatal + document.body.innerHTML;
    else
        place.innerHTML = '<div style="margin: 0px 100% 0px 0px;" onmouseover="display(1); '
+'this.style.margin=\'0px 0px 0px 0px\'" onmouseout="display(0); '
+'this.style.margin=\'0px 100% 0px 0px\'"><a href="http://www.youtube.com/get_video?'
+swf_pars
+'">Download</a><span style="display:none" id="alert-15646456418"><br />Please change the file from "<b>get_video</b>" to "<b>'
+title+'.flv</b>".</span></div>'+place.innerHTML;
})();