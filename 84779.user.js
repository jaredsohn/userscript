// ==UserScript==
// @name     Google Ads (Adsense) Remover
// @description     Removes Google Ads (Adsense) from all web pages.
// @author     Atdhe
// @date     2010-8-28
// ==/UserScript==

(function() {

    var searchTable = document.evaluate("//a[contains(@href,'http://toolbar.google.com/')]/ancestor::table", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


    if (searchTable.snapshotLength > 0)
    {
        var innerTable = searchTable.snapshotItem(searchTable.snapshotLength - 1);


        innerTable.parentNode.removeChild(innerTable);}
	

	var searchTable = document.evaluate("//a[contains(@href,'http://desktop.google.com/')]/ancestor::table", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


    if (searchTable.snapshotLength > 0)
    {
        var innerTable = searchTable.snapshotItem(searchTable.snapshotLength - 1);


        innerTable.parentNode.removeChild(innerTable);}
	
	var GoogleAdsenseRemover =
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

    GoogleAdsenseRemover.checkPage();

})();