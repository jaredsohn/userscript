// ==UserScript==
// @name          Rapidshare Bundle
// @namespace     Jillian
// @description	  Makes Rapidshare's free service more tolerable (v1.2).
// @include       http://*.rapidshare.tld/*
// @include       http://rapidshare.tld/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Firefox  http://www.getfirefox.com and
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools|Manage User Scripts,
// select the script and click Uninstall.
//
// --------------------------------------------------------------------

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


// Returns null if expr didn't match anything
function getFirstXPathResult(expr, node)
{
    if (!node) node = document;
    var res = document.evaluate(expr, node, null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return res.singleNodeValue;
}


// Creates a download link instead of submitting the form.
//  Called from pollFormCreation()
function prepareDownloadLink()
{
    var dlform = document.forms.namedItem("dl");
    if (!dlform) {
        GM_log("Something is wrong, the form named 'dl' should exist by now!");
        return;
    }

    var elements = dlform.elements;
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
        var input = elements.namedItem("captcha") || elements.namedItem("accesscode");
        if (!input) {
            GM_log("Error: Could not find the captcha input element");
            return;
        }

        var captcha = input.value;
        if (captcha == "") {
            alert("You must enter the captcha code before the link can be created.");
            return;
        }
        var fullurl = dlform.action + "?actionstring=" + encodeURIComponent(actionstring) +
                                    "&" + input.name + "=" + captcha;
        // Using 'dlform.innerHTML +=' resets form data, which would confuse the user.
        var link = document.createElement("a");
        link.href = fullurl;
        link.innerHTML = "<b>(alt) click to download</b>";
        dlform.appendChild(link);
    }
}

// Auto-clicks the free button in the pre-download page
function clickFreeButton()
{
    var freeBtn = getFirstXPathResult("//input[@value='Free']");
    if (freeBtn) {
        freeBtn.click();
    }
}

function cleanDownloadPage()
{
    var tdchild = getFirstXPathResult("//p[contains(text(), 'You have requested ')]");
    if (!tdchild)
        return;

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
        var prmTable = document.getElementById("premiumtable");
        prmTable.parentNode.removeChild(prmTable);
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

    // Wait for the script to create the form
    function pollFormCreation()
    {
        if (document.forms.namedItem("dl")) {
            prepareDownloadLink();
            alert('Ready to download');
        }
        else {
            setTimeout(pollFormCreation, 2000);
        }
    }
}

var putTimerInTitle = true;
// Alerts the user when the wait between downloads is over
function waitToDownloadAgain()
{
    var font = getFirstXPathResult("//*[contains(text(), 'reached the download-limit')]");
    if (!font)
        return;
    var p = font.parentNode;
    var minutes = Number(p.textContent.match(/or wait (\d+) minutes?/i)[1]);
    p.innerHTML +=
        "<h3> If you keep this page open, you'll be alerted when you can download again.</h3>";
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
            if (putTimerInTitle) {
                document.title = "RS (" + strTime + ")";
            }
            setTimeout(waitTimeoff, 1000);
        }
        else {
            alert("Time has passed - you can download again.");
            history.back();
        }
    }
}

try {
    putTimerInTitle = GM_getValue("timerInTitle", true);
}
catch (e) {}

// As each of the following functions has its own validity checks,
//  they will only perform their task when appropriate.
clickFreeButton();
cleanDownloadPage();
waitUntilReady();
waitToDownloadAgain();
