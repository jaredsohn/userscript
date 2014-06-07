// ==UserScript==
// @name		Irc-urls.net Image Dereferer
// @namespace	http://juhani.naskali.net/files/gm/
// @description	Modifies image links to go through imgred.com (bypass hotlinking in a nice way)
// @version	0.2
// @date		2007-11-08
// @include	http://irc-urls.net/pics.php*
// @include	http://*.irc-urls.net/pics.php*
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
	
    // Get a list of all images.
    var imgs = selectNodes(doc, doc.body, "//img");
       
    for (var x=0; x<imgs.length; x++)
    {
		// Replace the link's href.
		imgs[x].parentNode.href = "http://ultimod.org/?url=" + imgs[x].parentNode.href;
    }
})();

