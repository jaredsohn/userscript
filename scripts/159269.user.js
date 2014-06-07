// ==UserScript==
// @name        Amazon add Download link
// @namespace   http://beeswax.noneofyours.inc
// @description Adds back the AMZ download link for just-purchased tracks.
// @include     http://www.amazon.com/gp/dmusic/purchase*
// @include     https://www.amazon.com/gp/dmusic/purchase*
// @version     0.1
// ==/UserScript==

var replaceLink = function(){
    if (mp3store){
        link=document.getElementById('linuxDownloadAMZLink')
        if (link) {
            link.href="http://www.amazon.com/gp/dmusic/media/cirrus_amz_retriever.html/ref=dm_typ_ffcd_amz_nojs?orderId="+mp3store.orderID+"&asins="+mp3store.asinCsv
        }
    }
}

document.body.appendChild(document.createElement("script")).innerHTML = "("+replaceLink+")()";
document.addEventListener("DOMNodeInserted", replaceLink, false);