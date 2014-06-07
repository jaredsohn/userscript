// ==UserScript==
// @name           Buton Recrutare
// @namespace      http://userscripts.org/users/andone
// @include        http://*.triburile.ro/*
// ==/UserScript==

function log(text) {
	try {
		console.log(text);
	} catch(ex2) {
		alert(text);
	}
}
	function getElementByName(id) {
		var set = document.getElementsByName(id);
		if ( set.length > 0 )
			return set[0];
		return null;
	}
	function faAltButon(recrutareBut, valMax) {
		var butonNou = document.createElement("input");
		butonNou.type = "button";
		butonNou.value = "echilibrat";
		butonNou.addEventListener("click", function(){ 
			val1 = parseInt((valMax/1000)/3)*1000;
			val2 = valMax - 2*val1;
			getElementByName("wood").value=val1;
			getElementByName("stone").value=val2;
			getElementByName("iron").value=val1;
			//alert(getElementByName("iron").value);
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
			recrutareBut.dispatchEvent(evt);
		}, false);
		recrutareBut.parentNode.appendChild(butonNou);
	}
function faTarg(recrutareBut) {
	var textCautat = "Capacitate maximală de transport: ";
	var findMax = '//table[@class="vis"]/tbody/tr/th[contains(.,"'+textCautat+'")]';
	var snap = document.evaluate( findMax, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var producator=null;
	if ( snap.snapshotLength>0 ) {
		producator = snap.snapshotItem(0);
	}
	if ( producator ) {
		var valMax = parseInt(producator.innerHTML.substring(textCautat.length));
		//alert(valMax);
		faAltButon(recrutareBut, valMax);
	}
}
	function faButon(recrutareBut, numar, nume, id) {
		var butonNou = document.createElement("input");
		butonNou.type = "button";
		butonNou.value = ""+numar+" "+nume;
		butonNou.addEventListener("click", function(){ 
			document.getElementById(id).value=numar;
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
			recrutareBut.dispatchEvent(evt);
		}, false);
		recrutareBut.parentNode.appendChild(butonNou);
	}
try {
	function calcOptim(recrutareBut) {
		var optim = 0;
		var valMax = 0;
		//vezi pentru cine lucram
		var findProducator = '//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/img';
		var snap = document.evaluate( findProducator, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
		var producator=null;
		if ( snap.snapshotLength>0 ) {
			producator = snap.snapshotItem(0);
		}
		if ( producator ) {
			var id, nume, val1, val2;
			var isInit = false;
			//alert(prducator.title);
			if ( producator.title=="Cazarmă" ) {
				id = 'axe';
				nume = "toporasi";
				val1 = 500;
				val2 = 400;
				isInit = true;
			} else if ( producator.title=="Grajd" ) {
				id = 'light';
				nume = "cavalerie";
				val1 = 300;
				val2 = 200;
				isInit = true;
			} else if ( producator.title=="Atelier" ) {
				id = 'ram';
				nume = "berbeci";
				val1 = 100;
				val2 = 50;
				isInit = true;
			} else if ( producator.title=="Târg" ) {
				faTarg(recrutareBut);
			}
			if ( isInit ) {
				//cam 500 sa fie diferenta
				var axeInput = document.getElementById(id);
				nextInput = axeInput.nextSibling;
				while ( nextInput && nextInput.nodeType!=1 )
					nextInput = nextInput.nextSibling;
				//am ajuns la <a href...
				if ( nextInput ) {
					valMax = parseInt(nextInput.innerHTML.substr(6));
					if ( ((valMax-val1)%100) < 50 )
						optim = parseInt((valMax-val1)/100)*100;
					else
						optim = parseInt((valMax-val2)/100)*100;
				}
				faButon(recrutareBut, optim, nume, id);
				faButon(recrutareBut, valMax, nume, id);
			}
		}
		
	}
	var findRecrutareBut = '//form//input[@type="submit"][@value="Recrutare"] | //form//input[@type="submit"][@value="» OK «"]';
	var pageDocument=document;
	var snap = pageDocument.evaluate( findRecrutareBut, pageDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
	if ( snap.snapshotLength>0 ) {
		var recrutareBut = snap.snapshotItem(0);
		calcOptim(recrutareBut);
	} else {
		log("nu e buton de recrutare!");
	}
} catch(ex) {
	log(ex.message);
}
