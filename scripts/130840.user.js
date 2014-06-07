// ==UserScript==
// @name       NoComplicatedFrameSetupPlz
// @namespace  http://www.sltosis.org/
// @version    0.61
// @description  add simple link to challenge&resources [no frame kthxbye]
// @match      http://www.root-me.org/*/Challenges*
// @match      http://www.root-me.org/?lang=*
// @grant      none
// @copyright  2012+, samlt
// ==/UserScript==


if ('/' == document.location.pathname) {
    // on links in the main page
    for (var i=0; a=document.links.item(i); i++) {
        // basic tests which should be enough
        if (-1 == a.href.indexOf('page=externe&'))
            continue;
        pos = a.href.indexOf('target=http');
        if (-1 == pos)
            continue;
        a.href = decodeURIComponent(a.href.substring(pos + 7));  
    }
} else {
    // on challenges
    for (var i=0; link=document.links.item(i);i++) {
        if(!link.hasAttribute("target") || "_BLANK" != link.getAttribute("target"))
            continue;
        if(!link.hasAttribute("onclick") || 0 != link.getAttribute("onclick").indexOf("window.open"))
            continue;
        if (0 != link.href.indexOf("http://challenge.root-me.org/"))
            continue;
        var a = document.createElement('a');
        a.title = 'kthxbye';
        a.href = link.href;
        a.appendChild(document.createTextNode("Go to chall/save files[CLICKME]"));
        link.parentNode.insertBefore(a,link);
        break;
    }
}