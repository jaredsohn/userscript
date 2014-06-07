// ==UserScript==
// @name       Bifrost - Fix new mail
// @namespace  https://https://humtek.hum.au.dk/opgaver/opgavevisning.php?
// @version    0.1
// @description  Bifrost now opens response window en new window
// @match      https://humtek.hum.au.dk/opgaver/opgavevisning.php?*
// @copyright  2012+, You
// ==/UserScript==

function getUrlVars(){
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


var urlArray = getUrlVars();
var OpgaveNummer = urlArray['Opgnr'];

$(function(){
	var sendButton = $("table#korrespondance input");
    console.debug(sendButton);
    sendButton.attr('onclick', '');
    sendButton.click(function(){
    	mailwin = window.open('nymail.php?Opgnr='+OpgaveNummer, '_blank', 'width=700,height=600'); 
      	if (!mailwin){
            alert('Popup blocked Turn of your Popup-blocker');
          }
    })
});
