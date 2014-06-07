// ==UserScript==
// @name       Bifrost - Send IDM mail
// @namespace  https://humtek.hum.au.dk/opgaver/
// @version    0.2
// @description  enter something useful
// @match      https://humtek.hum.au.dk/opgaver/nymail.php*
// @copyright  2012+, You
// @include https://humtek.hum.au.dk/opgaver/opgavevisning.php
// @require http://code.jquery.com/jquery-1.9.1.js
// ==/UserScript==

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var queryArray = getUrlVars();
var indsender = decodeURIComponent(queryArray['redaktor']);
var taskID = decodeURIComponent(queryArray['taskID']);

if(indsender != 'undefined'){
	doMoreCoolStuff(taskID);
}

function doMoreCoolStuff(taskID){
    
    var taskText = getTaskText(taskID);
    
    var opgaveNummer = queryArray['Opgnr'];
    var brugeren = decodeURIComponent(queryArray['brugeren']);
    
    var tekst = "Hej "+indsender+"\r\n\r\nARFA support har nu opdateret dine inddateringer i systemet IDM/PURE\r\n";
    var tekst1 = tekst+"Opdateringen omfatter følgende person(er):\r\n\r\n";
    var tekst2 = tekst1+"Navn : "+brugeren+"\r\n";
    var tekst3 = tekst2+"Opgave Nummer : "+opgaveNummer+"\r\n";
    var tekst4 = tekst3+"Opgave : "+taskText+"\r\n\r\n";
    var tekst5 = tekst4+"Opdateringerne vil være synlige inden for 48 timer.\r\n\r\n";
    var tekst6 = tekst5+"Hvis du har spørgsmål eller mener, at  der er sket en fejl, kontakt os venligst via linket herunder.\r\n";
    
    var messageWin = $("textarea[name=msg]");
    var signatur = messageWin.val();
    messageWin.val(tekst6+signatur);
}

function getTaskText(tID){
    if(tID == 1){return "Opdatering eller Oprettelse";}
    if(tID == 2){return "Sletning";}
    return "Opdatering eller Oprettelse";
}