// ==UserScript==
// @name           Mimiaukcie_Features
// @namespace      mjano
// @description    (mimiaukcie.sk, mimiaukce.cz) Vytiahnutie aukcii do jednej tabulky
// @include        http://www.mimiaukcie.sk/nove_aukce.php*
// @include        http://www.mimiaukcie.sk/dnesni_aukce.php*
// @include        http://www.mimiaukce.cz/nove_aukce.php*
// @include        http://www.mimiaukce.cz/dnesni_aukce.php*
//
// @require        http://userscripts.org/scripts/source/57756.user.js
//
// @version 0.2
//
// @history 0.2 k cenam je doplnena aj vyska minimalneho prihodenia
// @history 0.2 zmenene farby cien (zelena - neprihodene, cervena - prihodene)
// @history 0.2 zmenena farba ukoncenia aukcie (zelena - novy tovar)
// @history 0.1 prvy pokus
//
// ==/UserScript==


// zdrojak berte s rezervou, dalo sa to spravit aj lepsie

ScriptUpdater.check(69496, "0.2");

var aukcia = new Array();

var farba1 = 'fff2cb';
var farba2 = 'f7e5ad';

function CisloNaText(suma) {
	// prevedie ciselnu cenu na SK textovy format
	suma = suma.toString().replace(/\./g,',');
	if ((suma.indexOf(',') != -1) && (suma.length - suma.indexOf(',') == 2)) {
		suma = suma + '0';
	}
	return suma;
}

function ZiskajPoziciu( oElement ) {
	// ziska absolutnu poziciu elementu
	var position = new Object;
	position.x = 0;
	position.y = 0;
	var iReturnValue = 0;
	while( oElement != null ) {
		position.x += oElement.offsetLeft;
		position.y += oElement.offsetTop;
		oElement = oElement.offsetParent;
	}
	return position;
}

function ZiskajData() {
	// ziska potrebne informacie o aukciach
	
	var results = document.evaluate("//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text']/a/img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < results.snapshotLength; i++) {
		aukcia[i] = new Object;
		aukcia[i].obrazok = results.snapshotItem(i).src;
		aukcia[i].novyTovar = false;
		if ((results.snapshotItem(i).parentNode.parentNode.previousSibling)
				&& ((results.snapshotItem(i).parentNode.parentNode.previousSibling.textContent.match(/NOV. TOVAR/))
				|| (results.snapshotItem(i).parentNode.parentNode.previousSibling.textContent.match(/NOV. ZBO../)))) {
			aukcia[i].novyTovar = true;
		}
	}

	var results = document.evaluate("//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text']/font/a[not(child::*)]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < results.snapshotLength; i++) {
		aukcia[i].link = results.snapshotItem(i).href;
		aukcia[i].nadpis = results.snapshotItem(i).textContent.replace(/\n/g,'<br>').replace(/'/g,'&apos;').replace(/"/g,'&quot;');
		aukcia[i].id = results.snapshotItem(i).href.match(/\d+/g)[0].toString();
		aukcia[i].popis = '';
		if (!results.snapshotItem(i).parentNode.parentNode.nextSibling.textContent.match(/^PO.TOVN. A BALN./)) {
			aukcia[i].popis = results.snapshotItem(i).parentNode.parentNode.nextSibling.textContent.replace(/\n/g,'<br>').replace(/'/g,'&apos;').replace(/"/g,'&quot;');
		}
	}

	if (window.location.href.match(/mimiaukcie\.sk/)) {
		var results = document.evaluate("//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][contains(.,' A BALN')][last()]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < results.snapshotLength; i++) {
			aukcia[i].postovne = Math.round(results.snapshotItem(i).textContent.match(/\d+,\d+/)[0].toString().replace(/,/g,'.')*100.0)/100.0
		}

		var results = document.evaluate("//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][contains(.,'CENA')][last()]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < results.snapshotLength; i++) {
			var ceny = results.snapshotItem(i).textContent.match(/\d+,\d+/g);
			aukcia[i].cena = Math.round(ceny[0].toString().replace(/,/g,'.')*100.0)/100.0;
			aukcia[i].prihodenie = 0;
			if (ceny.length == 3) {
				aukcia[i].prihodenie = Math.round(ceny[2].toString().replace(/,/g,'.')*100.0)/100.0;
			}
			aukcia[i].suma = Math.round((aukcia[i].cena+aukcia[i].postovne)*100.0)/100.0;
			aukcia[i].sumaSKK = Math.round((aukcia[i].cena+aukcia[i].postovne)*30.126);
			aukcia[i].prihodenieSKK = Math.round(aukcia[i].prihodenie * 30.126);
		}

		var results = document.evaluate("//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][contains(.,'koniec aukcie')][count(b)=2]/font/b|//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][contains(.,'koniec aukcie')][count(b)=3]/b[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < results.snapshotLength; i++) {
			aukcia[i].koniec = results.snapshotItem(i).textContent;
		}

		var results = document.evaluate("//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][contains(.,'koniec aukcie')][count(b)=2]/b[2]|//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][contains(.,'koniec aukcie')][count(b)=3]/b[3]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < results.snapshotLength; i++) {
			aukcia[i].koniec += ' ' + results.snapshotItem(i).textContent;
		}

		var results = document.evaluate("//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][starts-with(.,'Pred')][last()]/b/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < results.snapshotLength; i++) {
			aukcia[i].predavajuci = results.snapshotItem(i).textContent;
			aukcia[i].predavajuciLink = results.snapshotItem(i).href;
			aukcia[i].predavajuciId = results.snapshotItem(i).href.match(/\d+/g)[0].toString();
			aukcia[i].predavajuciHodnotenie = '';
			img = results.snapshotItem(i).parentNode.parentNode.getElementsByTagName('img');
			if (img.length == 1) {
				aukcia[i].predavajuciHodnotenie = img[0].src;
			}
		}

	}

	if (window.location.href.match(/mimiaukce\.cz/)) {
		var results = document.evaluate("//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][contains(.,'TOVN')][last()]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < results.snapshotLength; i++) {
			aukcia[i].postovne = parseInt(results.snapshotItem(i).textContent.match(/\d+/g)[0].toString());
		}

		var results = document.evaluate("//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][contains(.,'CENA')][last()]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < results.snapshotLength; i++) {
			var ceny = results.snapshotItem(i).textContent.match(/\d+/g);
			aukcia[i].cena = parseInt(results.snapshotItem(i).textContent.match(/\d+/g)[0].toString());

			aukcia[i].prihodenie = 0;
			if (ceny.length == 3) {
				aukcia[i].prihodenie = parseInt(ceny[2].toString());
			}


			aukcia[i].suma = Math.round((aukcia[i].cena+aukcia[i].postovne)*100.0)/100.0;
		}

		var results = document.evaluate("//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][contains(.,'konec aukce')][count(b)=2]/font/b|//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][contains(.,'konec aukce')][count(b)=3]/b[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < results.snapshotLength; i++) {
			aukcia[i].koniec = results.snapshotItem(i).textContent;
		}

		var results = document.evaluate("//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][contains(.,'konec aukce')][count(b)=2]/b[2]|//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][contains(.,'konec aukce')][count(b)=3]/b[3]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < results.snapshotLength; i++) {
			aukcia[i].koniec += ' ' + results.snapshotItem(i).textContent;
		}

		var results = document.evaluate("//table[@id='content'][@class='t']/tbody/tr/td/div[@class='text'][starts-with(.,'Prod')][last()]/b/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < results.snapshotLength; i++) {
			aukcia[i].predavajuci = results.snapshotItem(i).textContent;
			aukcia[i].predavajuciLink = results.snapshotItem(i).href;
			aukcia[i].predavajuciId = results.snapshotItem(i).href.match(/\d+/g)[0].toString();
			aukcia[i].predavajuciHodnotenie = '';
			img = results.snapshotItem(i).parentNode.parentNode.getElementsByTagName('img');
			if (img.length == 1) {
				aukcia[i].predavajuciHodnotenie = img[0].src;
			}
		}

	}

}

function Zotried() {
	var zmena = 0;
	do {
		zmena = 0;
		for (var i = 1; i < aukcia.length; i++) {
			if (aukcia[i].suma < aukcia[i-1].suma) {
				tmp = aukcia[i-1];
				aukcia[i-1] = aukcia[i];
				aukcia[i] = tmp;
				zmena = 1;
			}
		}
	} while (zmena == 1);
}

function UpravStranku() {
	// upravi vzhlad stranky
	var hlavicka = document.body.childNodes[1];

	var div = document.createElement('div');
	var text = '';
	var x = Math.floor(window.innerWidth / 184);
	var y = Math.ceil(aukcia.length / x);
	for (j = 0; j < y; j++) {
		text += '<div style="border-style:solid;border-width:1px"><table style="text-align:center;font-family:Arial;font-size:10px;border-width:0px;border-spacing:0px;border-style:none;border-collapse:collapse"><tr>';
		for (var i = 0; i < x; i++) {
			if (j*x+i >= aukcia.length) break;
			text += '<td id="r1_'+(j*x+i)+'" style="border-width:0px;background-color:#';
			if ((j*x+i) % 2) {
				text += farba1;
			} else {
				text += farba2;
			}
			if (aukcia[j*x+i].prihodenie > 0.0) {
				text += ';color:red;font-weight:bold';
			} else {
				text += ';color:green;font-weight:bold';
			}

			text += ';width:184px;padding:2px;border-style:solid"><div style="margin-left:auto;margin-right:auto;width:100px;" onmouseover="window.setTimeout(function(){var elm=document.getElementById(\'divNadpis\');elm.innerHTML=\''+aukcia[j*x+i].popis+'\';var position=new Object;position.x=0;position.y=0;var oelm=document.getElementById(\'r2_'+(j*x+i)+'\');while(oelm!=null){position.x+=oelm.offsetLeft;position.y+=oelm.offsetTop;oelm=oelm.offsetParent;}elm.style.top=position.y+20;elm.style.left=position.x+20;elm.style.visibility=\'visible\';},200);" onmouseout="var elm=document.getElementById(\'divNadpis\');elm.style.visibility=\'hidden\';">'+CisloNaText(aukcia[j*x+i].suma) + ' (+' + CisloNaText(aukcia[j*x+i].prihodenie) + ') ';
			if (window.location.href.match(/mimiaukcie\.sk/)) {
				text += 'EUR<br>'+aukcia[j*x+i].sumaSKK+' (+' + CisloNaText(aukcia[j*x+i].prihodenieSKK) + ') SKK';
			}
			if (window.location.href.match(/mimiaukce\.cz/)) {
				text += 'CZK';
			}
			text += '</div></td>';
		}
		text += '</tr><tr>';
		for (var i = 0; i < x; i++) {
			if (j*x+i >= aukcia.length) break;
			text += '<td id="r2_'+(j*x+i)+'" style="background-color:#';
			if ((j*x+i) % 2) {
				text += farba1;
			} else {
				text += farba2;
			}
			text += ';width:184px;border-width:0px;padding:2px;border-style:solid"><a href="'+aukcia[j*x+i].link+'"><img src="'+aukcia[j*x+i].obrazok+'" onmouseover="window.setTimeout(function(){var elm=document.getElementById(\'divNadpis\');elm.innerHTML=\''+aukcia[j*x+i].nadpis+'\';var position=new Object;position.x=0;position.y=0;var oelm=document.getElementById(\'r1_'+(j*x+i)+'\');while(oelm!=null){position.x+=oelm.offsetLeft;position.y+=oelm.offsetTop;oelm=oelm.offsetParent;}elm.style.top=position.y;elm.style.left=position.x;elm.style.visibility=\'visible\'},200);" onmouseout="var elm=document.getElementById(\'divNadpis\');elm.style.visibility=\'hidden\';"></a></td>';
		}
		text += '</tr><tr>';
		for (var i = 0; i < x; i++) {
			if (j*x+i >= aukcia.length) break;
			text += '<td id="r3_'+(j*x+i)+'" style="background-color:#';
			if ((j*x+i) % 2) {
				text += farba1;
			} else {
				text += farba2;
			}
			if (aukcia[j*x+i].novyTovar == true) {
				text += ';color:green;font-weight:bold';
			}
			text += ';width:184px;border-width:0px;padding:2px;border-style:solid"><div>'+aukcia[j*x+i].koniec;
			if (aukcia[j*x+i].predavajuciHodnotenie) {
				text += '<br><img src="'+aukcia[j*x+i].predavajuciHodnotenie+'"></img>';
			}
			text += '<div style="position:relative;float:right;"><b><a href="http://www.';
			if (window.location.href.match(/mimiaukcie\.sk/)) {
				text += 'mimiaukcie.sk';
			}
			if (window.location.href.match(/mimiaukce\.cz/)) {
				text += 'mimiaukce.cz';
			}
			text += '/sledovat.php?id='+aukcia[j*x+i].id+'">+</a></b></div></div></td>';
		}
		text += '</tr></table></div>';
	}
	text += '<br><hr>';
	div.innerHTML = text;
	document.body.insertBefore(div, document.body.firstChild);

	var pozicia = ZiskajPoziciu(hlavicka).y+hlavicka.offsetHeight;
	document.getElementById('navleft').style.top=pozicia+'px';
	document.getElementById('navright').style.top=pozicia+'px';

	var divNadpis = document.createElement('div');
	divNadpis.id = 'divNadpis';
	divNadpis.style.position = 'absolute';
	divNadpis.style.top = '10px';
	divNadpis.style.left = '10px';
	divNadpis.style.borderColor = 'green';
	divNadpis.style.borderStyle = 'solid';
	divNadpis.style.borderWidth = '1px';
	divNadpis.style.backgroundColor = '#b6dfbd';
	divNadpis.style.visibility = 'hidden';
	divNadpis.style.padding = '4px';
	divNadpis.style.fontFamily='Arial';
	divNadpis.style.fontSize='12px';
	divNadpis.style.maxWidth='400px';
	document.body.appendChild(divNadpis);
}


ZiskajData();
Zotried();
UpravStranku();
