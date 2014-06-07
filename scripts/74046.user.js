// ==UserScript==
// @name           berlinonly.de spendenlinke intrager
// @namespace      Boggler @ Pennerhack ( visit:http://pennerhack.de.tc/ )
// @description    erstellt einen button mit dem man seionen berlin change link auf berlinonly eintargen kann
// @include        http://*berlin.pennergame.de/overview/*
// ==/UserScript==

var right = '200'; //Pixel von rechts
var top = '250'; //Pixel von oben

var linkbereich = document.getElementsByTagName('body')[0];
var id = document.getElementsByName('reflink')[0].value.split('change_please/')[1].split('/')[0];
linkbereich.innerHTML += '<div style="position:absolute;right:'+right+'px;top:'+top+'px"><input type="button" id="berlinonly" value="Id '+id+' auf berlinonly eintragen"></div>';

document.getElementById('berlinonly').addEventListener('click', function eintragen(){

 GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://berlinonly.de/seite2.php',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: encodeURI('spl='+document.getElementsByName('reflink')[0].value+''),
            onload: function(responseDetails) {
			
				
				}})


},false);