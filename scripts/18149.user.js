// ==UserScript==
// @name           Visionner galaxies
// @namespace      dtc.com
// @include        http://*ogame*/game/index.php?page=galaxy*
// ==/UserScript==

//Script parcourant les galaxies et les systèmes solaires
//Dernière modification le 29/01/2008 à 20h45

var reg = new RegExp("&t","g");
var fin = new RegExp("&f","g");
var formul = document.getElementsByTagName('form')[0];

formul.innerHTML += 'Activer le défilement : <input id="valid" type="checkbox" onclick="if(this.checked==true){document.getElementsByTagName(\'form\')[0].action+=\'&t\'\;}"/>';
formul.innerHTML += '<br />Parcourir uniquement cette galaxie : <input id="fin" type="checkbox" onclick="if(this.checked==true){document.getElementsByTagName(\'form\')[0].action+=\'&f\'\;}"/>';


if((reg.exec(window.location.search) == '&t') && (formul.getElementsByTagName('input')[3].value + formul.getElementsByTagName('input')[6].value != '9499'))
{

	if(formul.getElementsByTagName('input')[6].value == '499' && fin.exec(window.location.search) != '&f')
	{
	
	formul.action += '&t';
	document.getElementById('valid').checked = true;
		
	formul.getElementsByTagName('input')[6].value = '1';
	var galaxie = parseInt(formul.getElementsByTagName('input')[3].value);
	galaxie += 1;
	formul.getElementsByTagName('input')[3].value = '' + galaxie;
	
	setTimeout('document.getElementsByTagName(\'form\')[0].submit()',800);
	
	}
	else if(formul.getElementsByTagName('input')[6].value != '499')
	{
	
		if(fin.exec(window.location.search) == '&f')
		{
		
		formul.action += '&f';
		document.getElementById('fin').checked = true;
		
		}
	
	formul.action += '&t';
	document.getElementById('valid').checked = true;
	setTimeout('galaxy_submit(\'systemRight\')',500);
	
	}

}