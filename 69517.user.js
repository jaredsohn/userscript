// ==UserScript==
// @name           Blocket.se Search
// @namespace      SwePopeen (Proxym)
// @include        http://*blocket.se
// @include        http://*blocket.se/
// @exclude        http://*blocket.se/*?*
// ==/UserScript==



var navbar, newElement;
navbar = document.getElementById('AdSquare');
if (navbar) {
    newElement = document.createElement('div');
    newElement.innerHTML = '<table id="AdSquare" cellspacing="0" cellpadding="0"><tr><td class="LeftCol"><p><form id="search_form" name="f" action="http://www.blocket.se/ostergotland?ca=14" method="get"><input type="text" id="searchtext" name="q" ><input type="hidden" name="w" id="searcharea_simple" value="3"></td></tr><tr><td><select name="w" id="searcharea_expanded"><option value="3" selected>Hela Sverige </option><option value="101" >Norrbotten</option><option value="102" >V&auml;sterbotten</option><option value="103" >J&auml;mtland</option><option value="104" >V&auml;sternorrland</option><option value="105" >G&auml;vleborg</option><option value="106" >Dalarna</option><option value="107" >V&auml;rmland</option><option value="108" >&Ouml;rebro</option><option value="109" >V&auml;stmanland</option><option value="110" >Uppsala</option><option value="111" >Stockholm</option><option value="112" >S&ouml;dermanland</option><option value="113" >Skaraborg</option><option value="114">&Ouml;sterg&ouml;tland</option><option value="115" >G&ouml;teborg</option><option value="116" >&Auml;lvsborg</option><option value="117" >J&ouml;nk&ouml;ping</option><option value="118" >Kalmar</option><option value="119" >Gotland</option><option value="120" >Halland</option><option value="121" >Kronoberg</option><option value="122" >Blekinge</option><option value="123" >Sk&aring;ne</option></select><input id="searchbutton" class="search_button" value="&nbsp;&nbsp;S&ouml;k&nbsp;&nbsp;" type="submit"></form></td></tr><tr><td><a href="http://www.google.com/chrome" target="_blank"><img src="http://i48.tinypic.com/ehi1iu.png" width="200" height="200" border="0"/></a><p>Skriptet &auml;r skrivet f&ouml;r Google Chrome<br/>men b&ouml;r fungera i alla greasemonkey<br/>kompatibla browsers</td></tr></table>';
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}

var navbar, newElement;
navbar = document.getElementById('AdTop');
if (navbar) {
    newElement = document.createElement('div');
    newElement.innerHTML = '<iframe src="http://proxymscripts.webs.com/inscripts/Blocket/Reklam/index.htm" width="700" height="150" frameborder="0" scrolling="no"></iframe>';
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}

var adSidebar = document.getElementById('AdSquare');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

var adSidebar = document.getElementById('Footer');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

var adSidebar = document.getElementById('AdTop');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}