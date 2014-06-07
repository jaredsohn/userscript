// ADS REMOVER for GOOGLE/ADSENSE Hacked w/ New Google Code
// former 'Google Toolbar Ad Remover'
//
// This is the last script solution for removing every google ads in all pages.
// It actually removes Google Toolbar Ad and Google Desktop Search Ad from bottom of Google Search Pages,
// and of course it also removes Google AdSense Ads from every http or https web page.
//
// Keep this project alive!
// Any feedback is welcome! ramax4u AT GMail
// Y VAMOS ARGENTINA CARAJO!
// Any hack feedback is welcome as well:
// Speeddymon 'AT' gmail

// ==UserScript==
// @name             Ads Remover for Google/AdSense Hacked w/ New Google Code
// @description  Removes Google AdSense from all web pages. It also removes toolbar ad and desktop search ad too.
// @author          David Lima Cohen (HACKED by Tom Booker)
// @namespace   http://www.ideas4u.com.ar/adsremoverforgoogle (none for hack)
// @date             2006-01-23
// @version        0.1
// @include         http://*
// @include         https://*
// ==/UserScript==

(function() {

	// First we get rid of Google Toolbar Ad..

    var searchTable = document.evaluate("//a[contains(@href,'http://toolbar.google.com/')]/ancestor::table", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


    if (searchTable.snapshotLength > 0)
    {
        var innerTable = searchTable.snapshotItem(searchTable.snapshotLength - 1);


        innerTable.parentNode.removeChild(innerTable);}
	
	// ..and now from Google Desktop Search Ad
	
	var searchTable = document.evaluate("//a[contains(@href,'http://desktop.google.com/')]/ancestor::table", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


    if (searchTable.snapshotLength > 0)
    {
        var innerTable = searchTable.snapshotItem(searchTable.snapshotLength - 1);


        innerTable.parentNode.removeChild(innerTable);}
	
	// Finally we remove the infamous Google AdSense Ads
	
	var RemoveGoogleAds =
    {
        checkPage: function()
        {
            currentDoc = document;

            try {
                if (currentDoc.getElementsByTagName("body")[0].innerHTML.match(/google_ads_frame/i))
                {
                    this.injectCSS("iframe[name='google_ads_frame'] { display: none; }");
                }
                if (currentDoc.getElementsByTagName("body")[0].innerHTML.match(pagead))
                {
                    currentDoc.getElementsByTagName("body")[0].innerHTML.match(pagead).style.display='none'
                    // this.injectCSS("script[src='http://pagead2.googlesyndication.com/pagead/show_ads.js'] { display: none; }");
                }
            }
            catch(e) {}
        },


        injectCSS: function(css)
        {
            head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.setAttribute("type", 'text/css');
            style.innerHTML = css;
            head.appendChild(style);
        }
    }

    RemoveGoogleAds.checkPage();

})();
