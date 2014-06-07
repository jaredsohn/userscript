// ==UserScript==
// @name          I hate white
// @namespace     http://mtk.co.il
// @description	  Changes all the white to lighter white. saves screen's energy.and ease on gamers... Motty Katan(c) 31-01-2010 updated 10/07/10
// @include       *
// ==/UserScript==
//Change Log:
//01/02/10: added inline style handling, improved source code management
//01/02/10: handeled security exception on bad css import(presumably)
//          Checking the default browser setting, in case the site has no bgcolor definition!
//02/02/10  - No more deleting of old styles. overwriting using GM_addStyle. It messed up Yahoo! mail beta
//          - should consider adding a smaller rule(just color changes) and readding the delete rule
//            low priority.
//05/02/10  Handle imports, fix some optimisation.
//06/02/10  Fix a bug in the setting of the browser default (didn't use the 
//10/07/10  Fix a condition that in some cases resulted in an error

function detectWhite(sInlineCss){ 
    //special case white-space don't detect!
    return (sInlineCss) ? sInlineCss.match(/(FFFFFF)|(white[^\-])|(#FFF;)|(rgb\(255, 255, 255\))/i):"";
}

function replaceWhite(sInlineCss)
{
    var sWhiteReplacement = "DDDDDD";
    //special case white-space don't detect!
    sNewCss = sInlineCss.replace(/(FFFFFF)|(white[^\-])|(#FFF;)/i, sWhiteReplacement);
    sNewCss = sNewCss.replace(/(rgb\(255, 255, 255\))/i, "rgb(221, 221, 221)");
    return sNewCss;

}

function processBrowserDef(oDoc)
{
    var oCS = oDoc.defaultView.getComputedStyle(oDoc.body,null);
    if (oCS)
    {
	    var sBgColor = oCS.getPropertyValue('background-color');
	    if (detectWhite(sBgColor))
	    {
	        oDoc.body.style.backgroundColor = replaceWhite(sBgColor);
	    }
    }
}

function processDoc(oDoc)
{
    var oTags = oDoc.evaluate("//*[@bgcolor]", oDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    for(var i=0; i<oTags.snapshotLength; i++)
    {
        if (detectWhite(oTags.snapshotItem(i).bgColor))
        {
            oTags.snapshotItem(i).bgColor = replaceWhite(oTags.snapshotItem(i).bgColor);
        }
    }
}

function processSS(oSS)
{
    try
    {
        var nLength = oSS.cssRules.length;
    }
    catch(e)
    {
        nLength = 0;

    }

    var sPropDetect = /$(color)|(background(-color)?)|(border(-\w+)?):/;

    for (var i=0; i<nLength; i++)//
    {
        if (!oSS.cssRules[i].styleSheet)
        {

            if (sPropDetect.test(oSS.cssRules[i].cssText) && detectWhite(oSS.cssRules[i].cssText))
            {
                    sNewRule = replaceWhite(oSS.cssRules[i].cssText);

                    GM_addStyle(sNewRule);
                    i++;
            }
        }
        else
        {
            processSS(oSS.cssRules[i].styleSheet);
        }
    }

}

function documentReplaceWhite()
{
    var nLength = window.document.styleSheets.length;
    //starting the good stuff now.
    for (var i=nLength-1; i>=0; i--)
    {
        if (window.document.styleSheets[i].media.mediaText!="print"){
            //external style
            processSS(window.document.styleSheets[i]);
        }
    }
    //inline style
    processDoc(window.document);
    //process browser defaults
    processBrowserDef(window.document);
}
documentReplaceWhite();
