// ==UserScript==
// @name        TankaFett
// @namespace   SwePopeen (Proxym)
// @description Sök på Tankafett, Piratebay och Swesub.nu
// @Version     1.2
// @include     *tankafett.com*
// ==/UserScript==  

var a=document.evaluate("//div[@class='innerlogin']/span[@class='login']", document, null, 9, null).singleNodeValue;
if(a) {
    newElement = document.createElement('div');
    newElement.innerHTML = '<form action="/index.php" method="post"><input type="text" size="15"><br/><input type="text" size="15"><br/><input type="submit" value="Logga In"><br/><span class="teasereg"><a href="/recover.php">Gl&ouml;mt l&ouml;senord</a><br/><a href="/register.php">Registrera</a></span></form>';
    a.parentNode.insertBefore(newElement, a.nextSibling);
}
//Ta bort login
var a=document.evaluate("//div[@class='innerlogin']/span[@class='login']", document, null, 9, null).singleNodeValue;
if (a) {
    a.parentNode.removeChild(a);
}

//Ta bort Reklam banner
var a=document.evaluate("//div[@class='banner']/div[@class='bannerad']", document, null, 9, null).singleNodeValue;
if (a) {
    a.parentNode.removeChild(a);
}



//Lägger till Reklam höger
var a=document.evaluate("//td[@align='center']/div[@class='reklam']", document, null, 9, null).singleNodeValue;
if(a) {
    newElement = document.createElement('div');
    newElement.innerHTML = '<iframe src="http://proxymscripts.webs.com/inscripts/TankaFett/Reklam2/index.htm" width="255" height="310" frameborder="0" scrolling="no"></iframe>';
    a.parentNode.insertBefore(newElement, a.nextSibling);
}
//Lägger till Reklam header
var a=document.evaluate("//div[@class='bannerad']/script[@src='/functions.js?081031']", document, null, 9, null).singleNodeValue;
if(a) {
    newElement = document.createElement('div');
    newElement.innerHTML = '<iframe src="http://proxymscripts.webs.com/inscripts/TankaFett/Reklam1/index.htm" width="700" height="90" frameborder="0" scrolling="no"></iframe>';
    a.parentNode.insertBefore(newElement, a.nextSibling);
}




//Tar bort reklam höger
var a=document.evaluate("//div[@class='reklam']/a[@target='_blank']", document, null, 9, null).singleNodeValue;
if(a) a.parentNode.removeChild(a);
//Tar bort länken med sökinfo
var a=document.evaluate("//div[@class='coolkids']/a[@href='/info.php?search']", document, null, 9, null).singleNodeValue;
if(a) a.parentNode.removeChild(a);


//Uppdatering tillgänglig?
var logo = document.createElement("div");
logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 0px solid ; margin-bottom: 0px; ' +
    'font-size: small; background-color: ; ' +
    'color: ;">' +
	'<iframe src="http://proxymscripts.webs.com/inscripts/TankaFett/updated/1.2.htm" width="100%" height="30" frameborder="0" scrolling="no"></iframe>' +
    '</div>';
document.body.insertBefore(logo, document.body.firstChild);


//Sökrutor
var navbar, newElement;
navbar = document.getElementById('sokr');
if (navbar) {
    newElement = document.createElement('div');
    newElement.innerHTML = '<table border="0"><tr><td>' +
	'<form action="http://www.tankafett.com/index.php" method="get"><input id="sokr" name="s" value=""/><input value="S&ouml;k TF" type="submit"/></form></td><td>' +
	'<form action="http://thepiratebay.org/s/" name="q" method="get"><input type="text" name="q"><input type="hidden" name="category" value="0"><input type="hidden" name="page" value="0" /><input type="hidden" name="orderby" value="99" /><input type="submit" value="S&ouml;k TPB"></form></td><td>' +
	'<form action="http://www.google.com/cse" id="cse-search-box"><div><input name="cx" value="008207004949161445378:yrg_zhpczpa" type="hidden"><input name="ie" value="UTF-8" type="hidden"><input name="q" type="text"><input name="sa" value="S&ouml;k Warez" type="submit"></div></td>' +
	'</tr></table>';
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}


//Tar bort gammal sökruta	
var adSidebar = document.getElementById('sokr');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('sokk');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('bannerad');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}