// ==UserScript==

// @name           HupuSoccerAdBlk

// @namespace      soccer.hupu.com

// @description    HupuSoccerAdBlk

// @include        http://soccer.hupu.com/*

// @include        http://www.hupu.com/*

// @include        *hupu.com/*

// ==/UserScript==



/*killAds: Delete the ad node given by xpath*/
function killAds(xpath)
{
        var targets;
   	targets = document.evaluate(xpath, document, null,

		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
        for (var i=0; i<targets.snapshotLength; i++) {

		var target = targets.snapshotItem(i);

		target.parentNode.removeChild(target);

	}
}

/*main process: kill different patterns of ad nodes on hupu.com*/

function process()

{

	var xpath;

        xpath ='//div[starts-with(@id,"ad")]';
        killAds(xpath);
        xpath ='//div[starts-with(@id,"google_ads")]';

 	killAds(xpath);
        xpath ='//div[starts-with(@class,"ad")]';
        killAds(xpath);
        xpath ='//div[contains(@class," ad")]';
        killAds(xpath);
        xpath='//div[contains(@class,"topic_ad")]';
        killAds(xpath);

        xpath = '//div[contains(@id,"divplay")]';	
        killAds(xpath);

}







window.addEventListener("load", process, false);