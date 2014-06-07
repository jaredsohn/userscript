// ==UserScript==
// @name         Add title
// @namespace    http://localhost
// @description  Add title and any watch-vid-title to top of page
// @author       bob2005euro
// @version      0.0.1
// @include      
// @exclude      http://*
// ==/UserScript==

/*
This is an attempt to track down why this YouTube Downloader script from
http://userscripts.org/scripts/show/29184 does not work on Firefox:

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
    - Works as a greasemonkey script installed on Firefox
Version 0.0.2
    - test document.getElementById("watch-this-vid")
    - Works on Opera 9.27 build 8841 Win32 Windows Vista on uk.youtube.com and other sites
    - Works on http://www.w3schools.com/js/tryit.asp?filename=try_dom_tut_changetext
Version 0.0.3
    - replaced with YouTube Downloader source inside a function wrapper.
    - Note youtube pages define the variable swfArgs
    - works on Opera
    - works partly on http://www.w3schools.com/js/tryit.asp (after part-faking a youtube DOM)
Version 0.0.4
    - Testing unsafeWindow.swfArgs - seems not to work on Greasemonkey
*/

function display(_) {
    if (_ == 1)
        document.getElementById("alert-15646456418").style.display = "inline";
    else
        document.getElementById("alert-15646456418").style.display = "none"        
}

(function()
{
    log="<b>Global variables in unsafeWindow:</b><br/>";
    logfull="<b>Global variables and values:</b><br/>";
    if (typeof unsafeWindow != "undefined") {
	// list all the variables in the content's global scope
	GM_log("index : variable (index)" + "\n");
	for (var p in unsafeWindow) {
	    log=log + p + "<br/>";
	    logfull=logfull + p + "= " + unsafeWindow[p] + "<br/>";
	    GM_log(p + ": " + unsafeWindow[p] + "\n");
	}
	GM_log("End of GM_Log" + "\n");
    }
    if (document.getElementById("watch-vid-title"))
	title = document.getElementById("watch-vid-title").getElementsByTagName("div")[0].innerHTML.replace(/ /g, "_");
    if (document.getElementById("watch-this-vid"))
	place = document.getElementById("watch-this-vid");
    
    if (typeof place !="undefined")
	placevalue="defined"
	else
	    placevalue="undefined";
    document.body.innerHTML = 'Title: '+typeof title+'; place: '+typeof place+' place='+placevalue
	+' swfUrl='+typeof swfUrl+' swfArgs '+typeof swfArgs + "<br/>"
        +' unsafeWindow.swfArgs '+typeof unsafeWindow.swfArgs + "<br/>" 
        +' unsafeWindow.swfArgs["video_id"] '
        + unsafeWindow.swfArgs["video_id"] + "<br/>" 
        + log + logfull;
    /*
if (typeof place !="undefined")
    place.innerHTML = '<div style="margin: 0px 100% 0px 0px;" onmouseover="display(1); '+'this.style.margin=\'0px 0px 0px 0px\'" onmouseout="display(0); '
+'this.style.margin=\'0px 100% 0px 0px\'"><a href="http://www.youtube.com/get_video?video_id='
+unsafeWindow.swfArgs["video_id"]+'&t='+unsafeWindow.swfArgs["t"]
+'">Download</a><span style="display:none" id="alert-15646456418"><br />Please change the file from "<b>get_video</b>" to "<b>'
+title+'.flv</b>".</span></div>'+place.innerHTML;
*/
})();
