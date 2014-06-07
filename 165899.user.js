// ==UserScript==
// @name         StarsQuest : viderRess
// @namespace    StarsQuest : viderRess
// @description	 Permet de vider les ressources plus facilement [StarsQuest's scripts string]
// @author       Benoit485
// @version      0.3
// @date         2013-10-20 19H20
// @include      http://s*.starsquest.co.uk/game.php?page=fleet*
// ==/UserScript==

/*
	V_0.3 => 2013-10-20 19H20 (Ansaerys devient StarsQuest)
	V_0.2 => 2013-04-26 22H15
*/

var ansa = unsafeWindow.ansa;
eval(ansa.initScript(
{
	id: 'viderRess',
	name: 'Vidage des ressources',
	version: '0.3',
	url: 'http://userscripts.org/scripts/source/165899.user.js',
	options: {}
}) );

if(ansa.url.get == 'page=fleet' || ansa.url.get.match(/page=fleet&mode=&cp=/) || ansa.url.get.match(/page=fleet&mode=&cp=/) )
{
	var tableRess = getId('resources');
	var titane = getId('ress_count_metal');
	var carbone = getId('ress_count_crystal');
	var tritium = getId('ress_count_deuterium');
	var form = document.getElementsByTagName('form');
	var nbGt = getId('ship203_value');
	var inputGt = getId('ship203_input');

	titane = titane.innerHTML.trimInt();
	carbone = carbone.innerHTML.trimInt();
	tritium = tritium.innerHTML.trimInt();
	form = form[(form.length-1)];
	var tableVaiss = form.getElementsByTagName('table');
	tableVaiss = tableVaiss[0];

	unsafeWindow.remplirInputGt = function(nbGtNeccessaire)
	{
		var nbGtDispo = document.getElementById('ship203_value');
	
		if(nbGtDispo == undefined) 
		{
			log('Aucuns GT disponible sur la planete');
			return false;
		}
	
		var inputGt = document.getElementById('ship203_input');
	
		nbGtDispo = nbGtDispo.innerHTML.replace(/\D/g,'');
		nbGtDispo = nbGtDispo ? parseInt(nbGtDispo) : 0;
	
		if(nbGtNeccessaire <= nbGtDispo)
		{
			inputGt.value = Math.floor(nbGtNeccessaire);
		}
		else
		{
			inputGt.value = nbGtDispo;
		}
	}

	var trA = createElem('tr');
	var tdA = createElem('td');

	var trB = createElem('tr');
	var tdBA = createElem('td');
	var tdBB = createElem('td');

	var trC = createElem('tr');
	var tdCA = createElem('td');
	var tdCB = createElem('td');

	var trD = createElem('tr');
	var tdDA = createElem('td');
	var tdDB = createElem('td');

	tdA.setAttribute('colspan', '2');
	tdA.setAttribute('align', 'center');
	trA.appendChild(tdA);

	tdBA.setAttribute('align', 'center');
	tdBB.setAttribute('align', 'center');
	trB.appendChild(tdBA);
	trB.appendChild(tdBB);

	tdCA.setAttribute('align', 'center');
	tdCB.setAttribute('align', 'center');
	trC.appendChild(tdCA);
	trC.appendChild(tdCB);

	tdDA.setAttribute('align', 'center');
	tdDB.setAttribute('align', 'center');
	trD.appendChild(tdDA);
	trD.appendChild(tdDB);

	tableVaiss.appendChild(trA);
	tableVaiss.appendChild(trB);
	tableVaiss.appendChild(trC);
	tableVaiss.appendChild(trD);

	var capaGt = 50000;
	var viderRess = (titane+carbone+tritium)/capaGt;
	var viderTit = (titane)/capaGt;
	var viderCarb = (carbone)/capaGt;
	var viderTitCarb = (titane+carbone)/capaGt;
	var viderTrit = (tritium)/capaGt;
	var viderTitTrit = (titane+tritium)/capaGt;
	var viderCarbTrit = (carbone+tritium)/capaGt;

	tdA.innerHTML = '<a style="cursor:pointer;" onclick="remplirInputGt('+viderRess+');">Vider ressources</a>'
	              + '<a onclick="alert(\'Raccourcis clavier :\\nù => Titane\\n! => Carbone\\n* => Tritium\\n< => Titane + Carbone\\n$ => Tous\');" style="left:50px;position:relative;">???</a>';

	tdBA.innerHTML = '<a style="cursor:pointer;" onclick="remplirInputGt('+viderTit+');">Vider le Titane</a>';
	tdBB.innerHTML = '<a style="cursor:pointer;" onclick="remplirInputGt('+viderCarb+');">Vider le Carbone</a>';

	tdCA.innerHTML = '<a style="cursor:pointer;" onclick="remplirInputGt('+viderTitCarb+');">Vider Titane et Carbone</a>';
	tdCB.innerHTML = '<a style="cursor:pointer;" onclick="remplirInputGt('+viderTrit+');">Vider le Tritium</a>';

	tdDA.innerHTML = '<a style="cursor:pointer;" onclick="remplirInputGt('+viderTitTrit+');">Vider Titane et Tritium</a>';
	tdDB.innerHTML = '<a style="cursor:pointer;" onclick="remplirInputGt('+viderCarbTrit+');">Vider le Carbone et Tritium</a>';
	
	document.addEventListener('keypress', function(event)
	{
		if(event.which != 42 && event.which != 249 && event.which != 33 && event.which != 60 && event.which != 36) 
			return;
		
		// Nombre GT neccessaire
		if(event.which == 249 /* Tit */) unsafeWindow.remplirInputGt(viderTit);
		else if(event.which == 33 /* Carb */) unsafeWindow.remplirInputGt(viderCarb);
		else if(event.which == 42 /* Trit */) unsafeWindow.remplirInputGt(viderTrit);
		else if(event.which == 60 /* Tit+Carb */) unsafeWindow.remplirInputGt(viderTitCarb);
		else if(event.which == 36 /* Tit+Carb+Trit */) unsafeWindow.remplirInputGt(viderRess);
	}, true);
}
else if(ansa.url.get == 'page=fleet2')
{
	document.addEventListener('keypress', function(event)
	{
		if(event.which != 42 && event.which != 249 && event.which != 33 && event.which != 60 && event.which != 36) 
			return;
		
		// Nombre GT neccessaire
		if(event.which == 249 /* Tit */) unsafeWindow.maxResource('metal');
		else if(event.which == 33 /* Carb */) unsafeWindow.maxResource('crystal');
		else if(event.which == 42 /* Trit */) unsafeWindow.maxResource('deuterium');
		else if(event.which == 60 /* Tit+Carb */) { unsafeWindow.maxResource('metal');unsafeWindow.maxResource('crystal'); }
		else if(event.which == 36 /* Tit+Carb+Trit */) { unsafeWindow.maxResource('metal');unsafeWindow.maxResource('crystal'); unsafeWindow.maxResource('deuterium');}
	}, true);
}

