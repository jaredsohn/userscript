// ==UserScript==
// @name				marktUebersicht
// @author				Ferdie_der_Hamster
// @description			marktUebersicht
// @include				http://www.zityland.net/index.php*cmd=markt*
// @include				http://www.zityland.net/index.php*cmd=marktprodukt*

// ==/UserScript==

var products = {
'Saatgut':'1','Weintrauben':'67','Himbeeren':'105',
'Bananen':'12','Mangos':'11','Orange':'10',
'Kiwi':'9','Zitrone':'8','Clementinen':'7',
'Erdbeeren':'6','Pflaumen':'5','Kirschen':'4',
'Birne':'2','Apfel':'3','Oliven':'55',
'Holz':'18','Kartoffeln':'17','Kaffeebohnen':'16',
'Kakaobohnen':'15','Zuckerrohr':'14','Getreide':'13',
'Olivenoel':'56','Butter':'51','Pommes frites':'23',
'Kakao':'21','Kaffee':'22','Zucker':'20',
'Mehl':'19','Tisch':'25','Stuhl':'26',
'Bett':'27','Holzregal':'24','Wasser':'28',
'Ei':'29','Rind':'41','Schwein':'57',
'Wolle':'31','Milch':'30','Huhn':'94',
'Karamellbonbons':'36','Kirschbonbons':'35','Mangobonbons':'34',
'Zitronenbonbons':'33','Orangenbonbons':'32','Himbeerbonbons':'106',
'Weißwein':'68','Zitronenlimonade':'66','Apfelsaft':'37',
'Orangensaft':'38','Trinkkakao':'39','Bier':'40',
'Pudelmütze':'149','Schuhe':'44','Hose':'45',
'Leder':'43','Textilien':'42','Pullover':'77',
'Bananeneis':'60','Schokoladeneis':'48','Zitroneneis':'47',
'Kaffeeeis':'49','Erdbeereis':'46','Muffin':'52',
'Brötchen':'53','Pflaumenkuchen':'54','Apfelkuchen':'65',
'Toastbrot':'50','Käsekuchen':'148','Kirschkuchen':'86',
'Brathähnchen, halbiert':'95','Frikadellen':'59','Wurst':'58',
'Kiwigelee':'89','Zitronengelee':'90','Mangomarmelade':'64',
'Kirschmarmelade':'62','Erdbeermarmelade':'61','Orangenmarmelade':'63'
};
var dropDown = document.createElement('select');

function getCookie(name) {
	if(document.cookie.match(/;/)) {
		var cooks = document.cookie.split("; ");
		for(var x = 0; x < cooks.length; x++) {
			var cookie = cooks[x];
			if(cookie.match(name + "=")) {
				var value = cookie.replace(name + "=", "");
				break;
			} else {
				var value = false;
			}
		}
	} else {
		var cookie = document.cookie;
		if(cookie.match(name + "="))
			var value = cookie.replace(name + "=", "");
		else
			var value = false;
	}
	
	return value;
}

var go = function(){
	pid = dropDown.options[dropDown.options.selectedIndex].value;
	sessid = getCookie('PHPSESSID');
	window.location.href='http://www.zityland.net/index.php?cmd=marktprodukt&pid='+ pid +'&zi='+sessid;
};

function main(){
	cells = document.getElementsByClassName('white-holz');
	for(c=0;c<cells.length;c++){
		if(cells[c].innerHTML.match(/bersicht/)) {

			dropDown.setAttribute('id', 'dropDown');
			dropDown.style.display = 'block';
			dropDown.onchange =go;
			option = document.createElement('option');
			option.appendChild(document.createTextNode('Bitte auswählen!'));
			dropDown.appendChild(option);
		
			
			for(product in products){
				option = document.createElement('option');
				option.appendChild(document.createTextNode(product));
				option.value=products[product];
				dropDown.appendChild(option);
			}
			


			newTr = document.createElement('tr');
			newTd_1 = document.createElement('td');
			newTd_1.setAttribute('colspan', '3');
			newTd_1.appendChild(dropDown);
			newTr.appendChild(newTd_1);
			
			cells[c].parentNode.parentNode.appendChild(newTr);
					
			break;
		}
	}
}

main();

//end
