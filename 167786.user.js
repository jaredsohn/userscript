// ==UserScript==
// @name         E-UniverS : setRessInConvertoWithPercent
// @namespace    E-UniverS : setRessInConvertoWithPercent
// @description	 Permet de remplir les convertos suivant un poucentage du maximum
// @author       Benoit485
// @version 	   0.1
// @date		     2012-05-18 16H45
// @include      http://beta*.e-univers.org/index.php?action=convert*
// ==/UserScript==

/* Supprime tous ce qui n'est pas un chiffre, et parse en tant que nombre */
String.prototype.trimInt = function() 
{
	string = this.replace(/\D/g,'');
	return string ? parseInt(string) : 0;
}

if(document.getElementsByName('r1').length > 0)
{
	var clickO = false;
	
	var level = document.getElementsByName('c2')[0].value; var speed = document.getElementsByName('c3')[0].value;
	var qteRessRequis = level * 1000000 * speed; var inputRess = document.getElementsByName('r1')[0];
	var selectRessA = document.getElementsByName('t1')[0]; var selectRessB = document.getElementsByName('t2')[0];

	var divEntete = document.getElementById('diventete'); var thEntete = divEntete.getElementsByTagName('th');
	var titaneAQuai = thEntete[1].innerHTML.trimInt(); var carboneAQuai = thEntete[3].innerHTML.trimInt();
	
	percentConvert = getValue('percentConvert', '100');
	qteRessRequis = qteRessRequis*parseInt(percentConvert)/100; inputRess.value=qteRessRequis;
	selectRessA.value=getValue('selectRessAValue', '1'); selectRessB.value=getValue('selectRessBValue', '3');
	unsafeWindow.convertir(); var a = document.createElement('a'); 
	a.innerHTML = '<br>'+percentConvert+'%'; a.style.cursor='pointer';
	a.addEventListener('click', function()
	{
		var val = selectRessA.value=='1'?(titaneAQuai<qteRessRequis?titaneAQuai:qteRessRequis):(carboneAQuai<qteRessRequis?carboneAQuai:qteRessRequis);
		document.forms[0].r1.value=val;
	}, true);
	inputRess.parentNode.appendChild(a); 
	
	document.addEventListener('keypress', function(event)
	{
		if(event.which == '111' || event.which == '79') clickO = true;
		else if(event.which == '178' && clickO) showOptions();
		else clickO = false;
	}, false);
}

function showOptions()
{
	var percent, rInp, rOut;
	if(percent = prompt('Pourcentage de conversion ?', getValue('percentConvert', '100') ) ) setValue('percentConvert', percent);
	if(rInp = prompt('Ressources d\'origine ?\n1 pour Titane\n2 pour Carbone\n3 pour Tritium', getValue('selectRessAValue', '1')) ) setValue('selectRessAValue', rInp);
	if(rOut = prompt('Ressources crées ?\n1 pour Titane\n2 pour Carbone\n3 pour Tritium', getValue('selectRessBValue', '3')) ) setValue('selectRessBValue', rOut);
}

function log(txt) 
{ 
	unsafeWindow.console.log(txt); 
}

function getValue(key, defaultValue)
{
	var retValue = localStorage.getItem(key);
		
	/**/ if ( !retValue ) return defaultValue; /**/
	
	return retValue;
}

function setValue(key, val)	
{
	localStorage.setItem(key, val);
}

