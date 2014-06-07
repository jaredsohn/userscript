// ==UserScript==
// @name           Dexter Fix
// @namespace      http://userscripts.org/users/441938
// @include        https://delagardiegymnasiet.dexter-ist.com/Lidkoping/default.asp?page=auth/common/startpage
// ==/UserScript==



var links = document.links;

links[24].href = "https://delagardiegymnasiet.dexter-ist.com/Lidkoping/DexterExt?action=goToIts";
links[25].href = "http://euterpe.webuntis.com/WebUntis/?school=LidkopingDLG";
links[26].href = "http://www.lidkoping.se/matsedeldlg";
links[27].href = "http://lidkoping.se/delagardie";


document.getElementsByClassName("clsTextBold")[1].innerHTML = "<b>Because I Can</b>";

//var txt = document.getElementsByClassName("clsTextBold")[1].innerHTML;


//document.getElementsByClassName("clsTextBold")[1].innerHTML = txt.replace("Arvid","Victor");

