// ==UserScript==
// @name             ogame micanje reklama
// @description  ogame micanje reklama
// @author          zagu
// @namespace   zagiiii
// @version        0.1
// @include http://xnova*.danubis.*/

// ==/UserScript==

(function() {

	if (self.document.URL.indexOf("game/overview.php") != -1) {
		var tables = document.getElementsByTagName('table');
		for (var i = 0; i < tables.length; i++) {
			if (tables[i].innerHTML.indexOf("OGame Komandant") != -1) {
				tables[i].style['display'] = 'none';
				break;
			}
		}
	}
	
	

//ovaj dio je posudjen od nekog lika ... nemam pojma ko je on ..jednostavno mi mrsko bilo muciti se sa pravljenjem ovoga kad ima gotovo ;)

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

