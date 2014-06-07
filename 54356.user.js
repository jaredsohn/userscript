// ==UserScript==
// @name          Odstranjevalec oglasov v videih na 24ur.com
// @description   Odstarnite oglase iz videov na 24ur.com
// @version       1.3
// @include       *24ur.com*
// @include       http://poptv.si/*
// ==/UserScript==
var allLinks, thisLink;
allLinks = document.evaluate(
    "//embed[@type='application/x-shockwave-flash']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    var embed_tag = document.createElement("embed");
    embed_tag.type = "application/x-shockwave-flash";
    embed_tag.id="mediacenter"
    embed_tag.name="mediacenter"
    embed_tag.setAttribute('allowfullscreen','true')
    embed_tag.setAttribute('qualitity','high')
 for (var i = 0; i < allLinks.snapshotLength; i++) {
    div = allLinks.snapshotItem(i);
    embed_tag.src=div.src
    flashvars='media_id=' + isolate(div.getAttribute('flashvars'),'media_id=','&')+'&color='+isolate(div.getAttribute('flashvars'),'&color=','&')+'&'
    if (div.getAttribute('flashvars').indexOf('config_file=') > 0) { flashvars+='config_file='+isolate(div.getAttribute('flashvars'),'config_file=','&')+'&' }
    embed_tag.setAttribute('flashvars',flashvars)
    embed_tag.height=div.getAttribute('height')
    embed_tag.width=div.getAttribute('width')

    div.parentNode.replaceChild(embed_tag, div); 
}

function isolate(str1,start2,end2)
{
var isotmp2 = str1
var isotmp = isotmp2.indexOf(start2)
isotmp2 = isotmp2.substring(isotmp + start2.length)
isotmp = isotmp2.indexOf(end2)
return isotmp2.substring(0, isotmp) 
}