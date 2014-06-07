// ==UserScript==
// @name           Recapt fleet3
// @namespace      snaquekiller
// @include        http://*.ogame.*/game/index.php?page=fleet3*
// ==/UserScript==

vari = {
	pt: 'Petit transporteur ',gt: 'Grand transporteur',cle: 'Chasseur léger',clo: 'Chasseur lourd',cro: 'Croiseur',vb: 'Vaisseau de bataille',vc: 'Vaisseau de colonisation :',rec: 'Recycleur',esp: 'Sonde d`espionnage',bb: 'Bombardier',sat: 'Satellite solaire',dest: 'Destructeur',edlm: 'Étoile de la mort',tra: 'Traqueur',
}
function addPoints(nombre){
		if (nombre == '?') {return nombre;} 
		else if (nombre==0) {return nombre;} 
		else 
		{
			var signe = '';
			if (nombre<0)
			{
				nombre = Math.abs(nombre);
				signe = '-';
			}
			var str = nombre.toString(), n = str.length;
			if (n <4) {return signe + nombre;} 
			else 
			{
				return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
			}
		}
	}
	
var vaisseau_type = new Array(vari.pt, vari.gt, vari.cle, vari.clo, vari.cro, vari.vb, vari.vc, vari.rec, vari.esp, vari.bb, vari.dest, vari.edlm, vari.tra);
var vaisseau = 	new Array('am202', 'am203', 'am204', 'am205', 'am206', 'am207', 'am208', 'am209', 'am210', 'am211', 'am213', 'am214', 'am215'); 

var vitesse = parseInt(document.getElementById("wrap").getElementsByTagName('input')[7].value);
var a_rajouter2 = '<li>Vitesse : ' + vitesse*10 +'%</li>';
var a_rajouter = '<thead style="background-color:#525354;"><tr><th>Nom de Vaisseau</th><th>Nombre</th></tr></thead><tbody>';

var type_vaisseau ='';
for(var i=7;i<(document.getElementById("wrap").getElementsByTagName('input').length);i++){
	if(document.getElementById("wrap").getElementsByTagName('input')[i].name != 'metal'){

		type_vaisseau = document.getElementById("wrap").getElementsByTagName('input')[i].name;
		for(var k=0; k<vaisseau.length ; k++)
		{
			if(type_vaisseau == vaisseau[k])
			{
				a_rajouter = a_rajouter +'<tr><td style="background-color:#374A54;">'+ vaisseau_type[k] +'</td><td style="background-color:#4F6577;">'+ addPoints(parseInt(document.getElementById("wrap").getElementsByTagName('input')[i].value)) +'</td></tr>';
			}
		}
	}
}
		var sp1 = document.createElement('span');
		sp1.innerHTML = a_rajouter2;
		document.getElementById('roundup').getElementsByTagName('ul')[0].appendChild(sp1);

		var sp2 = document.createElement('table');
		sp2.setAttribute('style','border: 2px solid black;position:relative;left:27%;width:45%;text-align:center;');
		sp2.innerHTML = a_rajouter +'</tbody>';
		document.getElementById('contentWrapper').appendChild(sp2);
