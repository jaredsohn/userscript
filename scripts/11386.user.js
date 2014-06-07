// ==UserScript==
// @name           Open Dir Image Viewer (Edited by Mitchell)
// @namespace      lenzm.net
// @include        *
// ==/UserScript==
var thequickfixbymitch = document.createElement("div");
  thequickfixbymitch.innerHTML = '<style type="text/css">a .preview{display: none;}a:hover .preview{display: block;position: absolute;top: 0px; right:0px; z-index: 1;}.preview{border-color: #000;}</style>';
document.body.insertBefore(thequickfixbymitch, document.body.firstChild);
function DocFileNameExtract()
{
   wholeurl = a.href;
   x = wholeurl.length;
   while((wholeurl.substring(x,x-1)) != "/"){ x--; } clipstart = x;
   return wholeurl.substring(wholeurl.length,clipstart);
}
function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
var title = document.getElementsByTagName('title')[0].innerHTML;
if(title.match(/^Index of /)) {
    var links = xpath("//a[@href]");
    for (var i = 0; i < links.snapshotLength; i++) {
        var a = links.snapshotItem(i);
        if (a.href.match(/\.(jpg|jpeg|gif|png)$/i)) {
            a.innerHTML = "" + DocFileNameExtract() + "<img src=\"" + a.href + "\" class=\"preview\">";
        }
    }
}