// ==UserScript==
// @name           TvTv
// @namespace      m
// @description    Tvtv adsl tv recorder
// @include        http://www.tvtv.fr*
// ==/UserScript==

var allLinks, hdebut, hfin, titre, dateprog, chaine,adsltvdate, adsltvdebut, adsltvfin, adsltvurl, adsltvonlineurl
allLinks = document.evaluate(
'//*[@id="box-small-light"]',
    //'//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	hdebut = allLinks.snapshotItem(0).innerHTML;
	hfin = allLinks.snapshotItem(1).innerHTML;

	
	


allLinks = document.evaluate(
'//*[@id="box-small"]',
    //'//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);	
	titre = allLinks.snapshotItem(0).textContent || allLinks.snapshotItem(0).innerText ;
	
	dateprog = allLinks.snapshotItem(1).textContent|| allLinks.snapshotItem(1).innerText ;

	
	
	
	allLinks = document.evaluate(
'/html/body/div/div[3]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td',
    //'//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);	
	chaine  = allLinks.snapshotItem(0).textContent || allLinks.snapshotItem(0).innerText ;
		
	
	
	
	//adsltv://prog=JJMMAAAAHHMMhhmm-chaîne|nom  	Programme l'enregistrement de la chaîne indiquée le JJMMAAAA de HH:MM à hh:mm et lui donne le nom indiqué (le nom est optionnel)
 adsltvdate = dateprog.substr( dateprog.length-10,2) +dateprog.substr( dateprog.length-7,2)+dateprog.substr( dateprog.length-4,4)
 
 adsltvdebut = hdebut.substr(hdebut.length-5,2) +  hdebut.substr(hdebut.length-2,2)
  
 adsltvfin = hfin.substr(hfin.length-5,2) +  hfin.substr(hfin.length-2,2)
  
	
	
	adsltvurl = 'adsltv://prog='+ adsltvdate+adsltvdebut+adsltvfin +'-' + chaine+ '|' +escape(titre)
	
	adsltvonlineurl ='http://www.adsltv.org/site/programme-tv/prog.php?prog='+ adsltvdate+adsltvdebut+adsltvfin +'-' + chaine+ '|' +escape(titre)
	var logo = document.createElement("div");
logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #000000; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' 
  
	+ '<a style=color:white target=_blank href='
	+ adsltvurl
	+ '>'
	+ 'Enregistrement de ' + titre + ' sur logiciel adsl tv'
	+'</a>'
	
	+ '<hr>' 
	+ '<a style=color:white target=_blank href=\''
	+ adsltvonlineurl
	+ '\'>'
	+ 'Enregistrement de ' + titre + ' sur logiciel adsl tv par interface web'
	+'</a>'
	
	
    + '</p></div>';
document.body.insertBefore(logo, document.body.firstChild);


