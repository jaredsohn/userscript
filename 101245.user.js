// ==UserScript==
// @name           Bloc note et calculette [Redesign]
// @namespace      Snaquekiller
// @version        0.1
// @author       snaquekiller (93% ) & autre(7%)
// @creator       snaquekiller
// @description   Bloc note et calculette v0.1
// @date 2011-04-16
// @include        http://*.ogame.*/game/index.php?page=*
// @exclude http://*.ogame.*/game/index.php?page=buddies*
// @exclude http://*.ogame.*/game/index.php?page=notices*
// @exclude http://*.ogame.*/game/index.php?page=search*
// @exclude http://*.ogame.*/game/index.php?page=eventList*
// @exclude http://*.ogame.*/game/index.php?page=jump*
// @exclude http://*.ogame.*/game/index.php?page=show*
// @exclude http://*.ogame.*/game/index.php?page=combatreport*
// @exclude http://*.ogame.*/game/index.php?page=phalanx*
// ==/UserScript==

//POUR LIRE ET COMPRENDRE MON SCRIPTS JE VOUS CONSEIL  DE REPLIER TOUT LES BLOCS. LE SCRIPTS SERA BIEN PLUS LISIBLE COMME CELA.//

// variable 
	var url = location.href;
	var serveur = url.split('/')[2];
	var texte_sauvegarder = GM_getValue('bloc_note' + serveur, '');
/**** function de vulca et mushrorn pour autre navigateur que firefox ***/
var FireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1;
var nomScript = FireFox? '' : 'Raide_facile';
var Opera = navigator.userAgent.indexOf('Opera')>-1;

	// Google Chrome  
	if(!FireFox){

			GM_getValue = function(key, defaultValue) {
			var retValue = localStorage.getItem(key);
				if (!retValue) {
					retValue = defaultValue;
				}
				return retValue;
			}
			GM_setValue = function(key, value) {
				localStorage.setItem(key, value);
			}
			GM_deleteValue = function(key) {
				localStorage.removeItem(key);
			}
			GM_addStyle = function (css) {
				var NSURI = 'http://www.w3.org/1999/xhtml';
				var hashead = document.getElementsByTagName('head')[0];
				var parentel = hashead || document.documentElement;
				var newElement = document.createElementNS(NSURI,'link');
				newElement.setAttributeNS(NSURI,'rel','stylesheet');
				newElement.setAttributeNS(NSURI,'type','text/css');
				newElement.setAttributeNS(NSURI,'href','data:text/css,'+encodeURIComponent(css));
				if( hashead ) {
					parentel.appendChild(newElement);
				} else {
					parentel.insertBefore(newElement,parentel.firstChild);
				}
			}
	
	}

{/************************************ PARTIE BLOC NOTE **********************/	
// fonction qui fait changer le display
	function display_change(idclique, idouvre_f){
		document.getElementById(idclique).addEventListener("click", function(event) 
			{
				var cellule = document.getElementById(idouvre_f);
				if (cellule.style.display == 'none') 
					{cellule.style.display = 'block';}
				else 
					{cellule.style.display = 'none';}
			}, true);
	}
	// pour afficher le bloc note
	function afficher_bloc_note(texte_sauvegarder){
		var css = '<style type="text/css"> #textearea_bloc{width:100%;background-color:#090366;color:#999999;text-align:center}'+
				' #sauvegarder_bloc{background-color:#090366;color:white;} #messages_sauvegarde{color:green;}</style>';
		var html_entete = "<div id='bloc_note_entete'>Bloc Note + Calculette <a href='#' id='plus_moin_bloc_note'>+/-</a></div>"; 
		var html_calculette = '<div id="calculette_id" style="display:none;" ><input type="text" id="textearea_calculette"/><br/><input type="button" title="Calculer" value="Calculer" id="calculer_button"/><span id="resultat"></span></div>';
		var html_bloc_note = '<div id="bloc_note_id" style="display:none;"><textarea id="textearea_bloc" >'+ texte_sauvegarder +'</textarea><br/><input type="button" title="sauvegarder" value="Sauvegarder" id="sauvegarder_bloc"/><span id="messages_sauvegarde"></span></div>';
	
		var newdiv = document.createElement("div");
		newdiv.setAttribute("style","position:fixed;left:0px;top:100px;z-index:10000;border:1px;background-color:black;");
		newdiv.innerHTML = css + html_entete + html_calculette + html_bloc_note;
		document.getElementsByTagName('body')[0].appendChild(newdiv);
	}
	
	function sauvegarder_textearea(){
		var texte_a_sauvegarder = document.getElementById('textearea_bloc').value;
		GM_setValue('bloc_note' + serveur, texte_a_sauvegarder);

		document.getElementById('messages_sauvegarde').innerHTML = "texte sauvegarder";
			
	}
	function supp_mess(){document.getElementById('messages_sauvegarde').innerHTML = "";}
}

/************************************ PARTIE Calculette **********************/	
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
	
function calculer(){
	var a_calculer = document.getElementById('textearea_calculette').value; 	
	a_calculer = a_calculer.replace(/\s/g,''); 	
	a_calculer = a_calculer.replace(/[mM]/g,'000.000'); 
	a_calculer = a_calculer.replace(/[kK]/g,'000'); 	
	a_calculer = a_calculer.replace(/(\+|\s)000/g,'+1.000'); 	
	a_calculer = a_calculer.replace(/(\-)000/g,'-1.000'); 	
	a_calculer = a_calculer.replace(/(\*)000/g,'*1.000'); 	
	a_calculer = a_calculer.replace(/(\/)000/g,'/1.000'); 
	a_calculer = a_calculer.replace(/[gG]/g,'000.000.000'); 
	a_calculer = a_calculer.replace(/\./g,''); 	
	a_calculer = a_calculer.replace(/,/g,'.'); 	 	
	var moin;
	var mult;
	var divi;	
	var calcul = 0;
	var calcul_part1 = 0;
	var calcul_part2 = 0;
	var plus = a_calculer.split('+');
	for(var p=0; p<plus.length; p++)
	{
		moin = plus[p].split('-');
		for(var q=0 ; q<moin.length; q++)
		{
				mult = moin[q].split('*');
				var mult_inter = 1;
				for(var a=0 ; a<mult.length; a++)
				{	
					// on divise par rapport a l'intérieur des multiliers, on fait la divisions puis on remplace la division par un chiffre ou on fait les différents calcul
						divi = mult[a].split('/');
						mult[a] = parseFloat(divi[0]);
						for(var b=1 ; b<divi.length; b++)
						{							
							mult[a] = mult[a]/parseFloat(divi[b]);
						}
						
					mult_inter= mult_inter*parseFloat(mult[a]);
				}
				if(q==0){calcul = calcul + mult_inter;}
				else{calcul = calcul - mult_inter;}
		}
	}
	calcul = (calcul+'').split('.');
	calcul_part1 = calcul[0];
	if(calcul[1]){calcul_part2 = calcul[1];}
	document.getElementById('resultat').innerHTML = addPoints(calcul_part1) +','+addPoints(calcul_part2);
}


/**** afficher tout ****/
afficher_bloc_note(texte_sauvegarder);
display_change('plus_moin_bloc_note', 'bloc_note_id');
display_change('plus_moin_bloc_note', 'calculette_id');
document.getElementById('calculette_id').addEventListener("keydown", function(event){if(event.keyCode==13){document.getElementById("calculer_button").click();};}, true);
document.getElementById('sauvegarder_bloc').addEventListener("click", function(event){sauvegarder_textearea();setTimeout(supp_mess, 2000);}, true);
document.getElementById('calculer_button').addEventListener("click", function(event){calculer();}, true);
