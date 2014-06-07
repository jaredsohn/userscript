// ==UserScript==
// @name        HF Deny PM Response
// @namespace   http://www.sublyme.net
// @description This adds a button to the PM Notice bar that lets Ub3rs deny receipt of the message.
// @include     *.hackforums.net/*
// @version     1
// @grant       none
// ==/UserScript==

function main(){
    var pmNotice = document.getElementsByClassName('pm_alert')[0].innerHTML
    var firstPart = pmNotice.split('\n')[1];
    var secondPart = pmNotice.split('\n')[2];
    var pmid = secondPart.split('pmid=')[1].split('" style')[0];
    var denyURL = "http://www.hackforums.net/private.php?action=read&pmid="+pmid+"&denyreceipt=1";
    var secondPart = secondPart.split('</div>')[0]+"&nbsp;&nbsp;<small><i><a href="+denyURL+">[deny receipt]</a></i></small></div>";
    document.getElementsByClassName('pm_alert')[0].innerHTML = firstPart + "\n" + secondPart;
}

main();