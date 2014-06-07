// ==UserScript==
// @name           Google save to Delicious
// @namespace      http://freevo.mad.hu/
// @description    Places a 'Post to Delicious' link next to each Google search result
// @include        http://www.google.*/search*
// ==/UserScript==

(function() {


function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}

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


var doc = window.document;

// Get a list of all A tags that have an href attribute containing the start and stop key strings.
var googLinks = selectNodes(doc, doc.body, "//A[@class='l']");
var googResults = selectNodes(doc, doc.body, "//DIV[@class='g']");

for (var x=0; x<googLinks.length; x++)
{
    var glink = googLinks[x].href;
    var gtitle = googLinks[x].innerHTML.replace(/<[^>]+>/ig,"");
    gtitle = gtitle.replace(/\'/ig,"\\'");
    var postText = " - <a class=fl href=\"http://delicious.com/save?url=" + encodeURIComponent(glink) + '&amp;title=' + encodeURIComponent(gtitle) + "&amp;v=5\">Post to Delicious</a>";
    var postLink = document.createElement('font');
    postLink.setAttribute('size','-1');
    postLink.innerHTML = postText;
    googResults[x].getElementsByTagName('nobr')[0].appendChild(postLink);
}

})();
