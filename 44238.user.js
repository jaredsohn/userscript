// ==UserScript==
// @name           Streamlined Gaia
// @namespace      *
// @description     Gets rid of the annoying stuff on the Home and My Gaia pages.
// @include        http://www.gaiaonline.com/mygaia/
// ==/UserScript==
function removeContent(id){
var node = 
document.getElementById(id);
if (node) {
node.parentNode.removeChild(node);
node = null;
}
}
function getElementsByHref(hrefToFind)
{
    return [i for each (i in document.getElementsByTagName("a")) if (i.href == hrefToFind)];
}
function getElementsByClass(tagName, className)
{
    return [i for each (i in document.getElementsByTagName(tagName)) if (i.className == className)];
}
function hideHrefs(hrefToHide)
{
    for each ( x in getElementsByHref(hrefToHide)) x.style.display = "none";
}

function hideElementByClass(tagName, className)
{
    for each ( x in getElementsByClass(tagName, className)) x.style.display = "none";
}
hideElementByClass ("div","yui-b middle");
hideElementByClass ("div","needGold");
hideElementByClass ("div","needGold needCash");
hideElementByClass ("div","status_wrapper");
hideElementByClass ("div","about_me logged_in");
removeContent(
'gaia_guilds'
);
removeContent(
'yui-main'
);
removeContent(
'worldMap'
);
removeContent(
'item_update'
);
removeContent(
'mygaia_status'
);
removeContent(
'todos'
);