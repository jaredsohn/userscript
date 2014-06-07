// ==UserScript==
// @name           Baidu Image Search Direct Links
// @namespace      George_Ang
// @description     Rewrites Baidu Image Search links to point straight to the pictures, and adds links to the corresponding websites without baidu frames.
// @include        http://image.baidu.com/*
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

    // Get a list of all A tags that have an href attribute containing the start and stop key strings.
    var baiduLinks = selectNodes(doc, doc.body, "//A[contains(@href,'ir?t=1&u=')][contains(@href,'&f=')]");
       
       
    for (var x=0; x<baiduLinks.length; x++)
    {
        // Capture the stuff between the start and stop key strings.
        var imgmatch = baiduLinks[x].href.match( /\/ir\?t\=1\&u\=(.*?)\&f\=/ );
        var urlmatch = baiduLinks[x].href.match( /\&f\=(.*?)\&jn\=/ );

        // If it matched successfully...
        if (imgmatch)
        {
            // Replace the description of the image with link to the webpage containing the image.
            
            baiduLinks[x].href = decodeURI(urlmatch[1]);

            // Replace the link's href with the contents of the text captured in the regular expression's parenthesis.
	    baiduLinks[x].parentNode.parentNode.firstChild.firstChild.firstChild.href = decodeURI(imgmatch[1]);
        }
    }
})();


