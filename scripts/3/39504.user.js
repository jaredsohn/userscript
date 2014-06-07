// ==UserScript==
// @name			dlmania http links
// @description		Reveal http links on dlmania
// @include			http://www.dl-mania.fr/*
// @author			StalkR
// @version			1.0
// ==/UserScript==

document.body.oncontextmenu="";
chg = document.getElementById("chargement");
chg.style.visibility = "hidden";
chg.innerHTML = "";

var opts = document.evaluate('//div[@class="telecharger"]/div/select', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (opts.snapshotLength > 0) {
    var select = opts.snapshotItem(0);
    var links = select.innerHTML.match(/https?:\/\/[^<]+/gi);
    var msg = "";
    if (links.length > 0) {
        for (var i=0 ; i < links.length; i++)
            msg += links[i] + '<br />';
    }
    else msg = "no link found";

    var fiche = document.evaluate('//div[@id="fiche"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (fiche.snapshotLength > 0)
        fiche.snapshotItem(0).innerHTML += "<br>"+msg
    else
        document.body.innerHTML += "<br>"+msg;

    select.parentNode.removeChild(select);
}
