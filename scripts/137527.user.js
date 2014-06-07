
// ==UserScript==
//@author 		Lurk
// @name          	Produktu kainos 
// @namespace     belekas
// @description   parašo produktų kainas iš doco į erepa
// @include      	 http://www.erepublik.com/en/economy/inventory*
// @exclude  
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js 
// ==/UserScript==

var bKaina=1,FRM,WRM, item= new Array(),salis= new Array(),mokesciai= new Array();
var logo = document.createElement("small");
var pasteElement = document.getElementsByClassName('relative');
	
 GM_xmlhttpRequest({ //nuskaitau www
  method: "GET",
  url: "https://docs.google.com/spreadsheet/pub?key=0AiiWu2sXJx0GdGVTT0M1djhjdWZMTWwzdllMclJ0bHc&gid=0",
  onload: function(response) {  
	var n;
	var xmlString=response.responseText;		//irasau i stringa
	
	n=xmlString.search("FRM baze");				// randu ieskoma vieta
	FRM=Number(xmlString.slice(n+25,n+31));		// nusikopijuoju reikiama dali

	n=xmlString.search("WRM baze");				// radu ieskoma vieta	
	WRM=Number(xmlString.slice(n+25,n+31));		// nusikopijuoju reikiama dali
	
	addEvent();
	delElement();
	gautiDuomenis();
  }  
});


function addEvent() {	
	var elmLink;
	elmLink = document.getElementById('product_select'); // produktai , po img uzkrovimo
	elmLink.addEventListener("load", gautiDuomenis, true);
	
	elmLink = document.getElementById('market_select'); //salys , po img uzkrovimo
	elmLink.addEventListener("load", gautiDuomenis, true);
}
function delElement() {
	var deleteElement = document.getElementById('tax');  //istrinam tax elemntus
		deleteElement.parentNode.removeChild(deleteElement);
		deleteElement = document.getElementById('tax_text'); 
		deleteElement.parentNode.removeChild(deleteElement);		
}

function gautiDuomenis(){ 
	var q = document.getElementById('sell_product'); 	//preke
	
	item[0]=q.src.substr(q.src.lastIndexOf('/')+2,1); 	//quality
	item[1]=q.src.substr(q.src.lastIndexOf('/')-1,1); 	// sort
	
	q = document.getElementById('market_select');		//salis
	salis[0]=q.innerHTML.substring(q.innerHTML.indexOf('alt="')+5,q.innerHTML.lastIndexOf('"')); //cs salis
	salis[1]=q.innerHTML.substring(q.innerHTML.lastIndexOf('/')+1,q.innerHTML.lastIndexOf('.')); //pasirinkta salis
	
	if(salis[1]){		
		gautiMokescius();
	}
}
function gautiMokescius(){

  GM_xmlhttpRequest({ //nuskaitau www
  method: "GET",
  url: "http://www.erepublik.com/en/country/economy/"+salis[1],
  onreadystatechange: function(response) {  //onload buvo
	var xmlString2=response.responseText;			//irasau i stringa		
	xmlString2=xmlString2.substring(xmlString2.indexOf('citizens largepadded')-14,xmlString2.indexOf('<h2 class="section">Salary</h2>')-7); //atkerpu table dali
	var doc = new DOMParser().parseFromString(xmlString2,'text/xml'); //parsinu
	if (item[1]==2){
		bKaina=10*WRM; //jei weapons
	}else{
		bKaina=1*FRM; //jei maistas
	}
	if (item[1] == 1){ //jei maistas
		mokesciai[0]=doc.evaluate("//table[@class='citizens largepadded']/tr[2]/td[4]/span[@class='special']", doc, null, XPathResult.STRING_TYPE, null).stringValue;//gaunu import ,maisto
		mokesciai[1]=doc.evaluate("//table[@class='citizens largepadded']/tr[2]/td[5]/span[@class='special']", doc, null, XPathResult.STRING_TYPE, null).stringValue;//gaunu VAT ,maisto
		if(salis[0]==salis[1]){ 	// jei cs salis
			bKaina=bKaina*2*item[0]*(1+mokesciai[1]/100);
		}
		if(salis[0]!=salis[1]){ 	//jei ne cs salis
			bKaina=(bKaina*2*item[0]*(mokesciai[0]/100))+(bKaina*2*item[0]*(mokesciai[1]/100))+bKaina*2*item[0];
		}
	}
		if (item[1] == 2){ 			//jei ginklai
		mokesciai[0]=doc.evaluate("//table[@class='citizens largepadded']/tr[3]/td[4]/span[@class='special']", doc, null, XPathResult.STRING_TYPE, null).stringValue;//gaunu import ,maisto
		mokesciai[1]=doc.evaluate("//table[@class='citizens largepadded']/tr[3]/td[5]/span[@class='special']", doc, null, XPathResult.STRING_TYPE, null).stringValue;//gaunu VAT ,maisto	
		if(salis[0]==salis[1]){		//jei cs salis
			bKaina=bKaina*2*item[0]*(1+mokesciai[1]/100);
		}
		if(salis[0]!=salis[1]){		//jei ne cs salis
			bKaina=(bKaina*2*item[0]*(mokesciai[0]/100))+(bKaina*2*item[0]*(mokesciai[1]/100))+bKaina*2*item[0];
		}	
	}
    paste();
  }
 });
}


function paste() {
	if (pasteElement) {		//iklijuoja i pslp	
		logo.innerHTML = '<span id="tax_text "> Dėti po: ' + Math.round(bKaina*1000)/1000+'</span>';
		pasteElement[0].appendChild(logo);		
	}
}

