// ADS REMOVER for GOOGLE/ADSENSE
// former 'Google Toolbar Ad Remover'
//
// This is the last script solution for removing every google ads in all pages.
// It actually removes Google Toolbar Ad and Google Desktop Search Ad from bottom of Google Search Pages,
// and of course it also removes Google AdSense Ads from every http or https web page.
//
// Keep this project alive!
// Any feedback is welcome! ramax4u AT GMail
// Y VAMOS ARGENTINA CARAJO!

// ==UserScript==
// @name             Ads Remover for Google/AdSense
// @description  Removes Google AdSense from all web pages. It also removes toolbar ad and desktop search ad too.
// @author          David Lima Cohen
// @namespace   http://www.ideas4u.com.ar/adsremoverforgoogle
// @date             2006-1-7
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