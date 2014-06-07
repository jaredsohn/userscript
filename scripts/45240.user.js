// ==UserScript==
// @name          RS_Bundle
// @namespace     http://gmscripts.bigsleep.net/
// @description	  Rapidshare Free service helper (v1.4)
// @version       1.4
// @include       http://*.rapidshare.tld/*
// @include       http://rapidshare.tld/*
// @exclude       http://rapidshare.tld/users/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
// Modified from the original Jillian "Rapidshare Bundle" script #5907
//
// To install in Firefox [http://www.getfirefox.com/]
// Install the Greasemonkey extension: http://greasemonkey.mozdev.org/
//
// To install in SeaMonkey [http://www.mozilla.org/projects/seamonkey/]
// Install the Greasemonkey-Mod extension:
//    http://xsidebar.mozdev.org/modifiedmisc.html#greasemonkey
//
// If you saved this script to your computer - use File -> Open File (this file)
// or go to userscripts.org -> RS Bundle and Install Script
//
// To uninstall, go to Tools|(Greasemonkey)|Manage User Scripts,
// select the script and click Uninstall.
//
// To update this script - go to userscripts.org - > RS Bundle
// and Install Script again - no need to uninstall.
//
/* ********************************************************************
			  Script Features

	- A download link instead of a form.
	This allows you to use a download manager with Rapidshare Free accounts.
	DO NOT CLICK THE LINK! The link is for passing to a download manager.
	Alt-Clicking the link can send it to your favorite download manager,
	or you can just Copy Link Location and paste it into any download
	manager, whatever works for you.
	- Download Page cleanup. Removes some of the extra stuff.
	- Auto-clicks the free button.
	user pref "freeSubmit" (true or false) - if set to true the "button will
	be clicked for you". If set to false it won't, but it will still add focus
	so you can just the hit enter key.
	- Download ready alert.
	user pref "showAlerts" (true or false) - if set to true; whenever you wait
	for a download you'll be alerted when the wait is over.
	- Time has passed alert
	user pref "showAlerts" (true or false) - if set to true; you will get an
	alert when the "bandwidth exceeded" wait timer runs out.
	When you click the alerts' OK, or this option is set to false, the last page
	in history is loaded, and the Free button clicked (if enabled) to get your
	new download link. Of course you can just close the window and come back later.
	- Wait Timer in the title
	user pref "timerInTitle" (true or false) - Just shows the "bandwidth exceeded"
	wait time (mentioned above) in the browser's title.
	- Options stored in prefs file
	See [http://kb.mozillazine.org/Editing_configuration]
	Search the config for greasemonkey, scriptvals or "RS_Bundle"
	To change this behavior see the RS_Store_Prefs option below
	- Super-Easy navigation
	Focus is added so you can just follow these steps...
	Load RS file URL - focus will be on Free button
	Hit enter when ready (unless "freeSubmit" enabled) - focus is now on captcha box
	Enter captcha code then hit Enter (or click button) - focus now on link
	Alt-Click or Right-Click and "Copy link location" - whatever works for you
	--
	- BUGS -
	- Focus depends on the window being on top
	  If the window is not on top, e.g. a tab loading in background, focus is not set
	  to the Free button nor the captcha box. The window must be in focus before an
	  element can be in focus. If tabs load in foreground there shouldn't be a problem.
	  Just make sure the Free button has a dotted selection outline before hitting Enter.
	- Not tested in FireFox
	  I've only tested this script in SeaMonkey, but I don't know why it wouldn't work
	  in FireFox just the same why - except the above bug when tabs load in background.
   ******************************************************************** */

// FIRST: Allow storing settings in user prefs file? (true or false)
var RS_Store_Prefs = true;

// -- If you set the above to false, then you can change these defaults here --
// --   or change these before installing, else your pref settings are used  --

// Auto-click "Free" submit - user pref "freeSubmit" (true or false)
var RS_Free_Submit = true;

// Show pop-up alerts - user pref "showAlerts" (true or false)
var RS_Enable_Alerts = true;

// Show "wait" timer in title - user pref "timerInTitle" (true or false)
var RS_TimerIn_Title = true;

// Set this to false to disable link "(alt)+click" link creation
//  - user pref "createLink" (true or false)
var RS_Create_Link = true;

// -- If script fails check these values --

// Paragraph showing your requested download file (contains text)
var RS_YourFile_P_Text = "You have requested ";

// You have reached the download limit text
var RS_Reached_Limit_Text = "reached the download-limit";

// Form name of download form
var RS_DL_FormName = "dl";

// -- Other misc variables --
var RS_getLinkText = "(alt) click to download";
var RS_helpText = "RS_Bundle Help: Copy the above link, or use ALT+Click if your download manager suports it. If you Left-Click the link the download will fail if it gets passed to a download manager. If ALT+Click fails then hit the Back button and try again using copy-paste. If you make a mistake entering the captcha code you shouldn't have to go Back, just enter the correct code, click the button and try again.";

// -- End User Config - Begin Techno-Babble --
// --------------------------------------------------------------------
// globals
var domain = window.location.host;
// functions
// Creates a download link instead of submitting the form.
//  Called from pollFormCreation()
function prepareDownloadLink()
{
    var dlform = document.forms.namedItem(RS_DL_FormName);
    if (!dlform) {
        GM_log("Something is wrong, the form named 'dl' should exist by now!");
        return;
    }
    var elements = dlform.elements;
    // add focus to captcha box
    var captchabox = elements.namedItem("captcha") || elements.namedItem("accesscode");
    if (captchabox)
    {
        captchabox.focus();
        var realBox = captchabox.wrappedJSObject || captchabox;
        realBox.scrollIntoView();
    }
    // for skipping link creation
    if(!RS_Create_Link) return;
    var btn = elements.namedItem("actionstring"); // The submit button
    var actionstring = btn.value;
    btn.value = "create link";
    // Prevent mirror selection radio buttons from changing the label
    btn.wrappedJSObject.watch("value", function (p, oldval, newval) {
        actionstring = newval;
        return this.value; // For some reason oldval == undefined
    });
    dlform.addEventListener("submit", createLink, true);

   // On submit, add captcha code and create the download link
    function createLink(evt)
    {
        evt.preventDefault(); // Prevent form submission
        var input;
        var string = "";
        if(domain == "rapidshare.de")
        {
            input = elements.namedItem("captcha");
            // .de requires this input, but doesn't check the value
            string = "actionstring="+encodeURIComponent(actionstring)+"&";
        }
        else {
            input = elements.namedItem("accesscode");
        }
        if (!input) {
            GM_log("Error: Could not find the captcha input element");
            return;
        }
        var captcha = input.value;
        if (captcha == "") {
            alert("You must enter the captcha code before the link can be created.");
            return;
        }
        var fullurl = dlform.action + "?" + string + input.name + "=" + captcha;
        if(document.getElementById("rsbundleGetLink")){
            document.getElementById("rsbundleGetLink").href = fullurl;
            document.getElementById("rsbundleGetLink").focus();
            return;
        }
        var linkp = document.createElement("p");
        linkp.id = "rsbundleLinkP";
				var link = document.createElement("a");
				link.href = fullurl;
				link.id = "rsbundleGetLink";
				link.appendChild(document.createTextNode(RS_getLinkText));
				linkp.appendChild(link);
				dlform.appendChild(linkp);
				// focus on the link
				link.focus();
				// help text box
				var helpp = document.createElement("p");
				helpp.id = "rsbundleHelpP";
				helpp.appendChild(document.createTextNode(RS_helpText));
				dlform.appendChild(helpp);
    }
}

// Auto-clicks the free button in the pre-download page
function clickFreeButton()
{
    var freeBtn = getFirstXPathResult("//input[@value='Free']");
    if (freeBtn)
    {
        if(RS_Free_Submit) { freeBtn.click(); }
        else { freeBtn.focus(); }
    }
}

function cleanDownloadPage()
{
    var tdchild = getFirstXPathResult("//p[contains(text(), '"+RS_YourFile_P_Text+"')]");
    if (!tdchild)
        return;
    // remove iframes
    var adiframe = getFirstXPathResult("preceding-sibling::iframe", tdchild);
    if (adiframe) adiframe.parentNode.removeChild(adiframe);
    // maybe 2
    var adiframe = getFirstXPathResult("preceding-sibling::iframe", tdchild);
    if (adiframe) adiframe.parentNode.removeChild(adiframe);

    // In the TD element, clean everything from the bottom up to the ad.
    var ad = getFirstXPathResult("following-sibling::img", tdchild);
    if (ad) {
        var td = tdchild.parentNode;
        var i = td.childNodes.length - 1;
        while (td.removeChild(td.childNodes[i]) != ad) {
            i--;
        }
    }
    else {
        // If there's no ad (the new design) - delete the premium table
        var prmTable = (document.getElementById("premiumtable") || document.getElementById("premiumtable2"));
        if (prmTable) {
            prmTable.parentNode.removeChild(prmTable);
        }
    }

    // Remove anything related to the upload form
    var ulform = getFirstXPathResult("//form[@name='ul']");
    var ulscript = getFirstXPathResult("preceding-sibling::script", ulform);
    var uliframe = getFirstXPathResult("//iframe[contains(@src, 'uploadid')]");
    if (ulform)    ulform.parentNode.removeChild(ulform);
    if (ulscript)  ulscript.parentNode.removeChild(ulscript);
    if (uliframe)  uliframe.parentNode.removeChild(uliframe);
}

// Alerts the user when the waiting time is over
function waitUntilReady()
{
    if (unsafeWindow.c) {
        unsafeWindow.c -= 5; // a little speedup
        pollFormCreation();
    }
    // or there must be no window timer set
    else {
    	var dlpage = getFirstXPathResult("//p[contains(text(), '"+RS_YourFile_P_Text+"')]");
    	if (dlpage) pollFormCreation();
    }
    // Wait for the script to create the form
    function pollFormCreation()
    {
        if (document.forms.namedItem(RS_DL_FormName)) {
            prepareDownloadLink();
            if(RS_Enable_Alerts) alert('Ready to download');
        }
        else {
            setTimeout(pollFormCreation, 2000);
        }
    }
}

// Alerts the user when the wait between downloads is over
function waitToDownloadAgain()
{
    var font = getFirstXPathResult("//*[contains(text(), '"+RS_Reached_Limit_Text+"')]");
    if (!font)
        return;
    var p = font.parentNode;
    var minutes = Number(p.textContent.match(/or wait (\d+) minutes?/i)[1]);
    if(RS_Enable_Alerts){
        p.innerHTML += "<h3> If you keep this page open, you'll be alerted when you can download again.</h3>";
    }
    else {
        p.innerHTML += "<h3> If you keep this page open it will go back when you can download again.</h3>";
    }
    // Create a span to hold the time ticker
    p.innerHTML = p.innerHTML.replace(/\d+ minutes?/i,
        "<span id='timer' style='font-weight: bold; color: grey; font-size: larger'></span>");
    var timeReady = new Date();
    timeReady.setMinutes(timeReady.getMinutes() + minutes);
    waitTimeoff();

    function waitTimeoff()
    {
        var now = new Date();
        if (now < timeReady) {
            var left = new Date(timeReady - now);
            // Match hours only if not 00
            var strTime = left.toUTCString().match(/(0[1-9]:)?\d\d:\d\d /)[0];
            document.getElementById("timer").textContent = strTime;
            if (RS_TimerIn_Title) {
                document.title = "RS (" + strTime + ")";
            }
            setTimeout(waitTimeoff, 1000);
        }
        else {
            if(RS_Enable_Alerts) alert("Time has passed - you can download again.");
            history.back();
        }
    }
}

// set user pref if not already set
function set_RS_userPref(pref,val){
	var curPref = GM_getValue(pref);
	if(curPref !== undefined) return curPref;
	if(typeof val !== "boolean"){
		alert("RS_Bundle error: var RS_"+pref+" must be true or false");
		val = true;
	}
	var userval = confirm("RS_Bundle option: enable pref "+pref+"? OK = true");
	if(typeof userval === "boolean"){ val = userval }
	GM_setValue(pref, val);
	return val;
}
// Returns null if expr didn't match anything
function getFirstXPathResult(expr, node)
{
    if (!node) node = document;
    var res = document.evaluate(expr, node, null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return res.singleNodeValue;
}
// end of functions

if(RS_Store_Prefs && GM_getValue){
    RS_TimerIn_Title = set_RS_userPref("timerInTitle",RS_TimerIn_Title);
    RS_Free_Submit = set_RS_userPref("freeSubmit",RS_Free_Submit);
    RS_Enable_Alerts = set_RS_userPref("showAlerts",RS_Enable_Alerts);
    RS_Create_Link = set_RS_userPref("createLink",RS_Create_Link);
}
// As each of the following functions has its own validity checks,
//  they will only perform their task when appropriate.
clickFreeButton();
cleanDownloadPage();
waitUntilReady();
waitToDownloadAgain();

// styles
GM_addStyle("#rsbundleGetLink { color:green !important; background:silver !important; font-weight:bold; font-size:1.1em; padding:0.5em; -moz-border-radius:2px; }");
GM_addStyle("#rsbundleHelpP { color:black !important; background:white !important; width:400px; padding:0.4em; border:solid silver 2px; -moz-border-radius:5px; }");

// :: Descriptor :: //
//
// --- Change Log ---
// v1.4 - 2007/05/27
//      * Created confirm dialogs to set new user prefs
// v1.3 - 2007/05/27
//      * Added user pref "createLink"
// v1.2 - 2007/05/10
//      * Fixed undeclared variable
//      * Fixed duplicate links when changing captcha or server
//      * Fixed pref false changing to true
//      * Added some help text
//      * Added styles to new text
// v1.1 - 2007/05/08
//      * Fixed my mistake with de links
// v1.0 - 2007/05/08
//      * Completely modified Rapidshare Bundle
//      * Added option to store setting in prefs (or not)
//      * Settings stored in prefs, no need to copy-paste pref name
//      * Option to turn off alerts "Ready to download" and "Time has passed"
//      * User option for auto "click free button"
//      * Moved some variables to top for easier editing
//      * Added variables to make repairing easier
//      * Added focus on link when captcha entered - no need to click button
//      * Added focus on captcha box and scroll into view
//      * Added focus on Free button
//      * Removed iframe ads on rs.de
//      * Bug fix: script failed when there was no timer (rs.com)
//      * Updated for RS site changes (element ID changed)
//      * Various clean up
//
// ----------------------------------------------------------------
// The original comments by Jillian are included to give him credit
// name: Rapidshare Bundle; userscripts.org script # 5907
/* ********************************************************************
                          Script Features

        - A download link instead of a form. Because Firefox starts the download in
        the background, once the download-form is submitted, it's not possible
        to use a download manager (Rapidshare will see it as a second DL).
        This extension replaces the form with a link, thus providing the possibility
        to use external download managers. With Flashgot installed, Alt-clicking the link
        will send it to your favorite download manager.
        - Download Page cleanup.
        - Auto-clicks the free button.
        - Download alert. Whenever you wait for a download, or between downloads,
        you'll be alerted when the wait is over.
        - Timer in the title (optional, to turn off set a boolean value named
          greasemonkey.scriptvals.Jillian/Rapidshare Bundle.timerInTitle
          to false.
    ******************************************************************** */

// What's New:
// v1.2 - bug fixes.
// v1.1 - * Rapidshare moves to .com - so @include all of Rapidshare's TLDs
//        * Updated cleanDownloadPage()
//        * Fixed timerInTitle config option being checked too late.
// v1.0 - First release.

