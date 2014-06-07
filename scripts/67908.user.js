// ==UserScript==
// @name           PR customizer
// @namespace      !
// @description    Cleans third-party PR ads and renders pages with custom images and colours
// @include        http://www.purerave.com/*
// ==/UserScript==

// just removes the google ad frame, if you want the projectwonderful
// ad to remain on its own then uncomment this and comment out the second
// chunk of code below
// var adSidebar = document.getElementById('google_ads_frame1');
// if (adSidebar) {
//    adSidebar.parentNode.removeChild(adSidebar);
// }

// rough hack to not only blank out but actually crop out the pair
// of ad boxes on the front page (leaving the event banner intact)
// if anywhere else on the site uses a 497px-wide div, it will be
// deleted by this.  so far i haven't found such a place, though.
var allAds, thisAd;
allAds = document.evaluate(
    '//div[@style="float: left; width: 497px; -margin-bottom: -10px"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    // do something with thisLink
    if (thisAd) {
    thisAd.parentNode.removeChild(thisAd);
    }
}

// creates a pink banner at the top of the pages and
// certain other elements with a piece of text surrounded by two images
// to customize, just change the text (#ffffff), border (#D889B8) & background-color,
// the image URLs and the text in between the two image URLs (PLURAV3 by default)
var logo = document.createElement("div");
// logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
//     'border: 1px solid #6a8791; margin-bottom: 0px; ' +
//     'font-size: small; background-color: #black; ' +
//     'color: #FFFFFFF;"><p style="margin: 0px 0 0px 0;"> ' +
//     '<center><font size="+2"><font color="#1c31e9">P</font><font color="#392bce">L</font><font  color="#5725b3">U</font><font color="#741f98">R</font><font color="#91197e">A</font><font color="#ae1363">V</font><font color="#cc0d48">3</font></font>' +
//     '<hr color="#D889B8" width="216"><br> ' +
// text gradient here as well as PLURAV3 (above) were generated using http://www.tektek.org/color/
//     '<font color="#05e1da">D</font><font color="#0ddad4">e</font><font color="#14d3cf">m</font> <font color="#24c5c4">n</font><font color="#2cbebe">a</font> <font color="#3bb0b3">w</font><font color="#43aaad">a</font><font color="#4ba3a8">n</font> <font color="#5a959c">f</font><font color="#628e97">e</font><font color="#6a8791">e</font><font color="#71808c">l</font> <font color="#05e1da">•</font> <font color="#628e97">m</font><font color="#5a959c">a</font><font color="#529ca2">d</font> <font color="#43aaad">P</font><font color="#3bb0b3">R</font> <font color="#2cbebe">s</font><font color="#24c5c4">k</font><font color="#1cccc9">i</font><font color="#14d3cf">l</font><font color="#0ddad4">l</font></center> ' +
//     '</p></div>';
document.body.insertBefore(logo, document.body.firstChild);

// this adds a menu item to the User Script Commands menu which
// you can access by right-clicking the GreaseMonkey logo.
// this allows users to change the background image on a given page
// without altering the code.  not a permanent change.
// this code is also necessary to having the background change at all,
// so do not comment it out (although the menu item part could be removed)
function setImage() {
    // prompt alert box
   var image=prompt("enter url for background image:",GM_getValue("image"));
   if (image!=null && image!="") {
       // save the url
       GM_setValue("image", image);
        // set the background
       setBackground();
   }
}

// function to set the background image.  change URL to change image.
function setBackground() {
    // add the background style
//    GM_addStyle('body { background: #000 url("http://img2.purerave.com/5/53/5654453_.jpg") repeat center !important;}');
    GM_addStyle('body { background: #000 url("http://s4.postimage.org/azso8mjrf/5654453.jpg") fixed no-repeat center !important;}');
// 
}

// put the alert box in the user script command menu thing
GM_registerMenuCommand("set background image..", setImage);

// set the background on load
setBackground()