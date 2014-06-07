// Magickartenmarkt WantsLinker
// version 0.4 BETA!
// 2009-04-25
// Copyleft 2009
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Magickartenmarkt WantsLinker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Magickartenmarkt WantsLinker
// @description   Zeigt neben Anbietern einen Link zu Deinen Wants bei diesem
//                Anbieter an.
// @include       http://magickartenmarkt.de/*.prod
// @include       http://www.magickartenmarkt.de/*.prod
// @include       http://magickartenmarkt.de/index.php?mainPage=showProduct*
// @include       http://www.magickartenmarkt.de/index.php?mainPage=showProduct*
// @include       http://magickartenmarkt.de/index.php?mainPage=showMetacard&idMetacard=*
// @include       http://www.magickartenmarkt.de/index.php?mainPage=showMetacard&idMetacard=*

// ==/UserScript==

var links, link, url, wantsLink, td;

var image = "<img src=\"img/wants.png\" class=\"icon\" onmouseover=\"showMsgBox(window.event,'Deine Wants')\" onmouseout=\"hideMsgBox()\">";

links = document.evaluate("//tr[@class='virgin']//a",
                          document,
                          null,
                          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                          null);

for (var i = 0; i < links.snapshotLength; i++) 
{
    link = links.snapshotItem(i);
    
    if (link.href.match("idInfoUser")) 
    {   
        url = link.href;
        url = url.replace("showSellerChart", "browseUserProducts");
        url = url.replace("idInfoUser", "idUser");        
        url += "&isWanted=Y&&idExpansion=&rarity=&condition=&idLanguage=&isFoil=0&cardName=&minPrice=&maxPrice=&idCategory=1";
        
        wantsLink = document.createElement('a');
        wantsLink.href = url;
        wantsLink.innerHTML = image;
        
        td = document.createElement('td');
        td.className = "sellerInfo";
        td.appendChild(wantsLink);
        
        
        link.parentNode.parentNode.insertBefore(td, link.parentNode.nextSibling);
    }
}
