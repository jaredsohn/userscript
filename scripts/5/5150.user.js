/*
    Rewrite ThemeXp.org links to
    point directly to the zip file
    LRWD, lrwd@cougars.com

    Currently returns a 404 (at least for me)
    I guess the guys at themexp.org changed something
    either in the normal course of updating, or
    to stop people bypassing the ad-ware.
    Any fixes please email the address above
*/

// ==UserScript==
// @name          ThemeXP.org Link ReWriter
// @namespace     http://userscripts.org/scripts/show/5150
// @description   Rewrites ThemeXP.org links to point straight to the zip files
// @include       http://*themexp.org/*
// ==/UserScript==

(function()
{
    function selectNodes(doc, context, xpath)
    {
       var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
       var result = new Array( nodes.snapshotLength );

       for (var x=0; x<result.length; x++)
       {
          result[x] = nodes.snapshotItem(x);
       }

       return result;
    }

    doc = window.document;

    // Get a list of all A tags with href attribute containing the download info.
       var tgtLinks = selectNodes(doc, doc.body, "//A[contains(@href,'theme_control.php')][contains(@href,'mid=')]");
       
    for (var x=0; x<tgtLinks.length; x++)
    {
        // Get 'mID' code
        var tmatch = tgtLinks[x].href.match( /mid=([0-9]+)([0-9])([0-9])/ );

        // If we found some...
        if (tmatch)
        {
            // Replace the hrefs with the true location using the mid code from above.
            tgtLinks[x].href = "http://ddl.themexp.org/uploads/g/" + tmatch[3] +"/" + tmatch[2] + "/" + tmatch[1] + tmatch[2] + tmatch[3] + ".zip";
        }
    }
})();

