// ==UserScript==
// @name           Helgon - Betatest - Kaosmatic
// @namespace      http://userscripts.org/users/khaosmat
// @description    This userscript alters the design of the Helgon Beta.
// @include        http://beta.helgon.se/*
// ==/UserScript==

// 
// Inloggningsidan
//


//Ta bort alla iframes
// Delete the Facebook object (if it was already created)
unsafeWindow.FB = new Object();

// Delete all script blocks hosted on the Facebook site
// Source: http://www.briandonovan.info/articles/public/gm-dom-xpath-01/
var xpathResult = document.evaluate('//script[starts-with(@src, "http://connect.facebook.net")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<xpathResult.snapshotLength; i++) {
    var nodeToDelete = xpathResult.snapshotItem(i);
    nodeToDelete.parentNode.removeChild(nodeToDelete);
}

// Delete all iframes hosted on the Facebook site
var xpathResult = document.evaluate('//iframe[starts-with(@src, "http://www.facebook.com/")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<xpathResult.snapshotLength; i++) {
    var nodeToDelete = xpathResult.snapshotItem(i);
    nodeToDelete.parentNode.removeChild(nodeToDelete);
}

//Lägg till Helgons logo framför formuläret i 'out' diven, förutsatt att båda visas.
var logo, fm, out
out = document.getElementById('out');
if (out) {
    fm = document.getElementById('fm');
    if (fm) {
        logo = document.createElement("div");
        logo.innerHTML = '<br/><br/><br/><br/><center><img src="http://beta.helgon.se/_static/i/logo.png"></center><br/><br/>';
        fm.parentNode.insertBefore(logo, fm);
    }
}

//Ändra färg på font (gäller en stor del av sidan, inte bara inloggningssidan) samt ändrar bakggrundsfärgen på inloggningssidan
GM_addStyle("html { color:#ffffff; background-color:#000000;}");

//Öka höjden på 'out' diven
GM_addStyle("#out { height:556px;}");

//
// Allmänt
//

//Minska maxbredden på sidan
//GM_addStyle(".wrapper_ext { max-width: 1240px;"); // Orginal
//GM_addStyle(".wrapper_ext { max-width: 1024px;");
GM_addStyle(".wrapper_ext { max-width: 1000px;"); // Bäst anpassad för bakgrundsbilden
//GM_addStyle(".wrapper_ext { max-width: 950px;");
//GM_addStyle(".wrapper_ext { max-width: 900px;");
//GM_addStyle(".wrapper_ext { max-width: 850px;");
//GM_addStyle(".wrapper_ext { max-width: 800px;");

//Öka bredden på wrappern
//GM_addStyle(".wrapper { width: 850px; } ");
//GM_addStyle(".wrapper { width: 789px; } ");

//Ta bort underline på hover över länkar och ändra istället färg
GM_addStyle("a:hover { text-decoration: none; color:#a3b78d }");

//Ändra färgen på inloggade personer
GM_addStyle(".o { color:#53e809; }");

//Justera fakta på presentationer till vänstersidan
//GM_addStyle(".p_sl { text-align:left; }");

//Justera användarbilder på presentationer till vänstersidan
//GM_addStyle(".p_r { float:left; text-align:left; }");

//Justera fakta på presentationer till vänstersidan
GM_addStyle(".p_sl { text-align:left; }");

//Justera användarbilder på presentationer till vänstersidan
GM_addStyle(".p_r { float:left; text-align:left; }");

//
// Färgschema
//

//Bakgrundfärg och -bild
GM_addStyle("body { background-color:#000000; }");

//Toppens bakgrund (helsvart, avaktiverad)
//GM_addStyle("#top { background-image:url(http://i43.tinypic.com/7300p0.png); }");

//Toppens bakgrund
//GM_addStyle("#top { background-image:url(none); }");

//Första toppmenyns (mmt) bakgrund
GM_addStyle("#mmt { background-image:url(http://i42.tinypic.com/5a4z2d.png); }");

//Första toppmenyns (mmt) bakgrund under hover
GM_addStyle("#mmt a:hover { background-image:url(http://i44.tinypic.com/s2s9j6.png); }");

//Gör första toppmenyns (mmt) höjd mindre
GM_addStyle("#mmt a { height:20px; line-height:20px; }");

//Andra toppmenyns (smt) bakgrund
GM_addStyle("#smt { background-image:url(http://i44.tinypic.com/s2s9j6.png); }");

//Gör andra toppmenyns (smt) höjd mindre
GM_addStyle("#smt { height:20px; line-height:18px; }");

//Ändra fonten i den andra toppmenyn (smt) till bold
GM_addStyle("#smt a { font-weight:bold; }");

//Ändra main divens bakgrundsfärg, minska padding
//GM_addStyle("#main { background-color:#1e1e1e; padding:3px; } "); // Innehåller bugg som flyttar ner kolumnen ett antal pixlar på vissa sidor

//Dirty hack för att få texten i den andra toppmenyn (smt) att justeras fullt till vänster (påverkar alla element med klassen 'center'), samt indenterar menyn och paddar texten innuti
GM_addStyle(".center { text-align:left; }" + "#smt { margin-left:6px; margin-right:6px; padding-left:6px; }");

//Dirty hack för att få texten i den andra toppmenyn (smt) att justeras fullt till höger (påverkar alla element med klassen 'center'), samt indenterar menyn och paddar texten innuti
//GM_addStyle(".center { text-align:right; }" + "#smt { margin-left:6px; margin-right:6px; padding-right:10px; }");

//Ändra main divens bakgrundsfärg till transparent
GM_addStyle("#main { background-color:transparent; } ");

//Bakgrundsbilder för allmäna divar
GM_addStyle(".b_t, .b_xt { background-image:url(http://i44.tinypic.com/s2s9j6.png); }");

//Bakgrundsbilder för allmäna divar med knappfunktion
GM_addStyle(".b_tr, .b_xtr { background-image:url(http://i40.tinypic.com/2r3dnuq.png); }");

//Bottenmenyns bakgrund (smb)
GM_addStyle("#smb { background-image:url(http://i40.tinypic.com/anfql0.jpg); }");

//Gör bottenmenyns (smb) höjd mindre
GM_addStyle("#smb { height:22px; line-height:22px; } #smb img { margin-bottom:-3px; margin-top:-4px;");

//Minska margin vid toppen
//GM_addStyle("#main { margin-top:4px; }") // Innehåller bugg som flyttar ner kolumnen ett antal pixlar på vissa sidor

//Eliminera bordern på den tillfälliga (test) rutan
GM_addStyle("#sidebar-contents { margin-top: 132px; border:none }")