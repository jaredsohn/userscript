// ==UserScript==
// @name           google web search image relinker
// @namespace      none
// @include        http://www.google.tld/search?*
// ==/UserScript==

var getParam = function(key, aelement){
    var rx = new RegExp("^http://[^?]+\\?(?:.+?&)*?"+key+"=([^&]+).*$");
    var value = aelement.href.match(rx)[1];
    return (decodeURIComponent(value));
}

var thumbs = document.querySelectorAll("img[id^='imgthumb'],img[class^='imgthumb']");
for (var i=0; i<thumbs.length; i++){
    var img = thumbs[i];
    var anc = img.parentNode;
    var div = anc.parentNode;
    var ndiv = document.createElement("div");
    ndiv.setAttribute("style", img.getAttribute("style"));
    var nanc = document.createElement("a");
    nanc.setAttribute("style", "display:inline-block;position:absolute;z-index:2");
    nanc.href = getParam("imgrefurl", anc);
    nanc.textContent = "site";
    ndiv.appendChild(nanc);
    anc.href = getParam("imgurl", anc);
    img.removeAttribute("style");
    ndiv.appendChild(anc.cloneNode(true));
    div.replaceChild(ndiv, anc);
}
