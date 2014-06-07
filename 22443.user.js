// ==UserScript==
// @name          autokadabra_new_window
// @description   Open comments in new window instead of current for autokadabra.ru
// @include       http://autokadabra.ru/*
// ==/UserScript==

//для совместимости с opera script
if( location.hostname.indexOf('autokadabra.ru') != -1 ) {

//true - включено; false - выключено

//установки поведения при нажатии на логотип Автокадабры
var mainRedirect=true; //при нажатии на логотип перемещаться по указанной ниже ссылке
var mainRedirectUrl="http://autokadabra.ru/clubs/all/";

//установки открытия новых окон при нажатии на ссылки. true - открывать новое окно, false - открывать в текущем
var commentNewWindow=true; //при нажатии на один из комментариев из "Что говорят" или кнопку "Комментировать" внизу публикации
var acutNewWindow=true; //при нажатии на кнопку "Читать дальше..." при использовании адабраката
var extLinkNewWindow=true; //при нажатии на ссылки, ведущие на внешние сайты


var allLinks, thisLink;
allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    

    if ( (thisLink.href.match("comment") && commentNewWindow) ||
         ( (!thisLink.href.match("autokadabra")) && extLinkNewWindow ) ||
         ( thisLink.href.match("acut")  && acutNewWindow)
//       ) thisLink.href = "javascript:window.open('"+thisLink.href+"'); void(0);";
) thisLink.target="_blank";

    if (mainRedirect && thisLink.href=="http://autokadabra.ru/" ) thisLink.href = mainRedirectUrl;


}
}