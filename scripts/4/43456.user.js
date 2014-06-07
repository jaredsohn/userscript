// ==UserScript==
// @name           InfoCompteES
// @namespace      vulca
// @description    InfoCompte
// @include        http://*.ogame.com.es/game/index.php?page=b_building*
// @include        http://*.ogame.com.es/game/index.php?page=buildings*
// @include        http://*.ogame.com.es/game/index.php?page=overview*
// @include        http://*.ogame.com.es/game/index.php?page=options*
// ==/UserScript==




/*=================================================================================================================
 DERNIERE MISE A JOUR : 27/10/2008
 TOPIC DU FORUM OFFICIEL : http://board.ogame.fr/thread.php?postid=8634035#post8634035
 SCRIPT POUR OGAME.FR v 0.83

 

=================================================================================================================*/

// Affichage du graphique
var draw_pie = function(data)
  {
		var data_url = data.join(","); 
		if(mine)
			{var labels_url = "Minas|Edificios|tecnologias|Flota|Defensas";}
		if(BatTotal)
			{var labels_url = "Edificios|tecnologias|Flota|Defensas";}
		var google_url = "http://chart.apis.google.com/chart?cht=p3&chf=bg,s,efefef00&chs=250x100&chld=M&&chtt=&chl=" + labels_url + "&chco="+CouleurGraph+"&chd=t:" + data_url;
		var img = document.createElement("img");
		img.setAttribute("src",google_url);
		img.setAttribute("align","top");
		if (!debugGraphique) {img.setAttribute("style", "margin-top:-30px");} 
		return img;
  }

	

var url=location.href;
var eaigu = String.fromCharCode(233);
var egrave = String.fromCharCode(232);
var agrave = String.fromCharCode(224);
var aaccent = String.fromCharCode(226);
var aaigu = String.fromCharCode(225);
var ptvirg = String.fromCharCode(59);
var apos = String.fromCharCode(39);
var emaj = String.fromCharCode(201);
var echap = String.fromCharCode(234);
var oaigu = String.fromCharCode(243);
var nacc = String.fromCharCode(241);

var selectnode = document.getElementsByTagName('select');
var numeroplanete = selectnode[0].selectedIndex+1;
var nbplanetesetlunes = selectnode[0].length;


if (selectnode.length >0) 
{
    var numeroplanete = selectnode[0].selectedIndex;
	var nombreplanetesetlunes = selectnode[0].options.length;
}


if (PlusieurSurMemeUni)
	{var pseudo = GM_getValue("pseudo"+uni,'');}
else
	{var pseudo ='';}
	
	
// Recuperation de session
MatchTab = url.match(/uni([0-9]{1,2}).ogame.com.es.game.index.php.page=([a-zA-Z0-9_]+)(?:&dsp=1)?(?:&no_header=1)?&session=([a-z0-9]{12})(?:&mode=([a-zA-Z0-9]+))?/);
var uni = MatchTab[1];
var session = MatchTab[3];

/* *****************************************************   OPTION    ******************************************************** */

		
function oui_non_en_checked(oui_non) 
{
	if (oui_non == "true") {return "checked";} else {return "unchecked";} 
}

var OptionSauvegarde = GM_getValue("options"+uni+pseudo,"3333ff;false;false;true;true;true;true;false;false;true;false;true;")+'false';
var option = new Array();
option = OptionSauvegarde.split(/;/);

var CouleurGraph = option[0];

// Page Options

if ((url.indexOf('option',0))>=0)
{
	if ((url.indexOf('&infocompte_plus=oui',0))>=0) 
	{
		var couleur = new Array('','','','','');
		var listeCouleur = new Array();
		listeCouleur = option[0].split(/,/);
		
		for (var i=0 ; i< listeCouleur.length ; i++)
			{couleur[i] = listeCouleur[i];}

		for(var i=0 ; i< option.length ; i++)
			{option[i] = oui_non_en_checked(option[i]);}

		var tdnode = document.getElementById('content').getElementsByTagName('table');
		
		// Ajout du tableau :
		tdnode[0].innerHTML = '<tr><td class="c" colspan="2">Opciones InfoCompte:</td></tr>';
		tdnode[0].innerHTML += '<tr><th>Color de los graficos</th> <th><input class="couleur" name="couleur" maxlength="6" value="'+couleur[0]+'" type="text" size="8" style="text-align:center;">  <input class="couleur" name="couleur" maxlength="6" value="'+couleur[1]+'" type="text" size="8" style="text-align:center;">  <input class="couleur" name="couleur" maxlength="6" value="'+couleur[2]+'" type="text" size="8" style="text-align:center;">  <input class="couleur" name="couleur" maxlength="6" value="'+couleur[3]+'" type="text" size="8" style="text-align:center;"> <input class="couleur" name="couleur" maxlength="6" value="'+couleur[4]+'" type="text" size="8" style="text-align:center;"></th></tr>';			
		tdnode[0].innerHTML += '<tr><th >Porcentaje de punctos en edificios</th> 					<th><input class="InfoOptions" '+option[1]+' name="batTotal" type="checkbox"></th></tr>';
		tdnode[0].innerHTML += '<tr><th>Porcentaje de punctos indestructibles</th> 								<th><input class="InfoOptions" '+option[2]+' name="indestructible" type="checkbox"></th></tr>';
		tdnode[0].innerHTML+= '<tr><th>Porcentaje de punctos tecnologias</th> 									<th><input class="InfoOptions" '+option[3]+' name="Techno" type="checkbox"></th></tr>';
		tdnode[0].innerHTML += '<tr><th>Porcentaje de punctos en flota</th> 										<th><input class="InfoOptions" '+option[4]+' name="Flotte" type="checkbox"></th></tr>';
		tdnode[0].innerHTML += '<tr><th>Porcentaje de punctos defensas</th> 								<th><input class="InfoOptions" '+option[5]+' name="Defense" type="checkbox"></th></tr>';
		tdnode[0].innerHTML += '<tr><th>Porcentaje de puntos de flota en vuelo</th> 							<th><input class="InfoOptions" '+option[6]+' name="vol" type="checkbox"></th></tr>';
		tdnode[0].innerHTML += '<tr><th>Porcentaje de punctos en la luna</th> 											<th><input class="InfoOptions" '+option[7]+' name="lune" type="checkbox"></th></tr>';
		tdnode[0].innerHTML += '<tr><th>todos los porcentajes juntos (para la flota en vuelo y puntos de la luna)</th> <th><input class="InfoOptions" '+option[8]+' name="br" type="checkbox"></th></tr>';
		tdnode[0].innerHTML += '<tr><th>Porcentaje de la progresion</th> 											<th><input class="InfoOptions" '+option[9]+' name="prog" type="checkbox"></th></tr>';
		tdnode[0].innerHTML += '<tr><th>compruebe si son varios en el mismo equipo e incluso universo</th><th><input class="InfoOptions" '+option[10]+' name="plein" type="checkbox"></th></tr>';
		tdnode[0].innerHTML += '<tr><th>Ver en color en funcion de los progresos</th>					<th><input class="InfoOptions" '+option[11]+' name="couleurProg" type="checkbox"></th></tr>';
		
		tdnode[0].innerHTML += '<tr><td class="c" colspan="2">Anular / Guardar las modificaciones :</td></tr>';
		tdnode[0].innerHTML += '<tr><th class="boutton_VG"><input title="valores por defecto" value="valores por defecto" type="submit" class="Reset_VG"></th><th class="boutton_VG"><input title="guardar cambios" value="guardar cambios" type="submit" class="Sauver_VG"></th></tr>';
		

	
			// Definition du code du bouton de reset :
		var Boutton = document.getElementsByClassName("Reset_VG");
				
		if (Boutton[0]) 
		{
			Boutton[0].addEventListener("click", function() 
			{

					GM_setValue("options"+uni+pseudo, "3333ff;false;false;true;true;true;true;false;false;true;false;true;");

					BOUTTON = document.getElementsByClassName("boutton_VG");
					BOUTTON[0].innerHTML = '<a href="http://uni'+uni+'.ogame.com.es/game/index.php?page=options&session='+session+'&infocompte_plus=oui">guardar cambios</a>';

			}, true);
		}
		// Definition du code du bouton de sauvegarde :
		var Boutton = document.getElementsByClassName("Sauver_VG");
				
		if (Boutton[0]) 
		{
			Boutton[0].addEventListener("click", function() 
			{
				var Block1 = document.getElementsByClassName('couleur');
				if (Block1[0].value) 
				{
					CouleurGraph='';
					for (var i =0 ; i< Block1.length; i++)
					{
						if (Block1[i].value.length == 6)
						{
							CouleurGraph += Block1[i].value + ',';
						}
					}
				}
				CouleurGraph = CouleurGraph.substring(0, CouleurGraph.length-1)
				
				var SOptions = CouleurGraph+';';
				var Block = document.getElementsByClassName('InfoOptions');
				for (var f=0 ; f < Block.length ; f++ )
				{
					if (Block[f].checked) 
						{SOptions += "true;";} 
					else 
						{SOptions += "false;";}
				}
				GM_setValue("options"+uni+pseudo, SOptions);
				
				BOUTTON = document.getElementsByClassName("boutton_VG");
				BOUTTON[1].innerHTML = '<a href="http://uni'+uni+'.ogame.com.es/game/index.php?page=options&session='+session+'&infocompte_plus=oui">guardar cambios</a>';
			}, true);
		}
	 }
	
	else 
	{
		if (url.indexOf('=oui',0) == -1) 
		{
			var tdnode = document.getElementsByTagName('table')[0];
			var New_Table = document.createElement('table');
			New_Table.style.width = "519";
			New_Table.innerHTML = '<tr><td colspan="2" class="c"><a href="http://uni'+uni+'.ogame.com.es/game/index.php?page=options&session='+session+'&infocompte_plus=oui">Opciones de InfoCompte</a></td></tr>';
				
			var tdnode = document.getElementById('content').getElementsByTagName('table')[0];
			tdnode.parentNode.insertBefore(New_Table, tdnode.nextSibling);
		}
	}
} 

/* ******************************************************* fin OPTION************************************************************************************/


var BatTotal = false; 
var indestructible = false; 
var techno = false; 
var flottes = false; 
var Def = false; 
var VaisseauxVol  = false; 
var pointLune = false; 
var sauterLignePourPourcentageFlotteVol = false; 
var progression = false; 
var PlusieurSurMemeUni  = false;
var debugGraphique = false;
var couleurPoint = false ;


if (option[1] == 'true')
	{BatTotal = true;} 
if (option[2] == 'true')
	{indestructible = true;}
if (option[3] == 'true')
	{techno = true; }
if (option[4] == 'true')
	{flottes = true; }
if (option[5] == 'true')
	{Def = true; }
if (option[6] == 'true')
	{VaisseauxVol  = true;}
if (option[7] == 'true')
	{pointLune = true;}
if (option[8] == 'true')
	{sauterLignePourPourcentageFlotteVol = true;}
if (option[9] == 'true')
	{progression = true;}
if (option[10] == 'true')
	{PlusieurSurMemeUni  = true; }
if (option[11] == 'true')
	{couleurPoint = true; }

	
if(BatTotal)
{
	var AutreBat = false;
	var mine = false; 
}
else
{
	var AutreBat = true;
	var mine = true; 
}


// FONCTION SEPARATEUR DE MILLIERS
function addPoints(nombre)
{
	if (nombre==0) {return nombre;} 
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


function pourcent (nombre)
{	
	if (PointsTotal == 0) 
		{return 0;}
	else
	{	
		var pourcent = parseInt(nombre/PointsTotal*1000)/10;
		return pourcent;
	}	
}

function pourcent2(nombre,ref)
{
	if (ref == 0) 
		{return 0;}
	else
	{
		var pourcent = parseInt(nombre/ref*1000)/10;
		return pourcent;
	}
}
	

function trouverInfo(def, init, R, sentence1 ,sentence2)
{
	var pos1 = (tdnode[f].innerHTML).indexOf(sentence1,10);
	if (pos1>=0) 
	{ 
		var pos2 = (tdnode[f].innerHTML).indexOf(sentence2,pos1+sentence1.length);
		var nombre = (tdnode[f].innerHTML).substring(pos1+sentence1.length,pos2);
		nombre = parseInt(nombre.replace(/\./g,'')); 
		var cout= init *(Math.pow(R,nombre)-1)/(R-1) + def *nombre;
		return cout;
	}
	else return 0;
}
	
	
	
	
/* ******************************************************PAGE DEFENSE*****************************************************************************/ 
if ((url.indexOf('mode=Verteidigung',0))>=0)
{	
	var tdnode = document.getElementsByTagName('td');
	
	var nom = new Array('Lanzamisiles',"ser peque","ser grande","n Gauss","nico","n de plasma","Misil de intercepc","Misil interplanetario","a de protecc","pula grande de protecc");
	var valeur = new Array(2,2,8,37,8,130,10,25,20,100);
	var prix = new Array(0,0,0,0,0,0,0,0,0,0);
	
	for (var f=54; f<tdnode.length ; f++)
	{
		if(tdnode[f].innerHTML.length<1000)
		{
			for(var i =0 ; i< nom.length ; i++)
			{
				if ((tdnode[f].innerHTML).indexOf(nom[i],0)>=0)
				{	
					prix[i]=trouverInfo(valeur[i],0,0,"("," dispo");
				}		
			}
		}
	}

	var PointsDef = 0;
	for(var i =0 ; i< nom.length ; i++)
		{PointsDef += prix[i];}

	var DefPlanete = new Array();
	DefPlanete = GM_getValue("DefPlanete"+uni+pseudo,'0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0').split(/;/);
	DefPlanete[numeroplanete] = parseInt(PointsDef);
	GM_setValue("DefPlanete"+uni+pseudo,DefPlanete.join(";"));
}




/* ****************************************************************** PAGE RECHERCHES*****************************************************************************/ 
if ((url.indexOf('mode=Forschung',0))>=0) 
{ 
	var tdnode = document.getElementsByTagName('td');
		
	var nom = new Array('a de espionaje',"a de computaci","a militar","a de defensa","a de blindaje","a de energ","a de hiperespacio","Motor de combust",
	"Motor de impulso","Propulsor hiperespacial","a l"+aaigu+"ser","a i"+oaigu+"nica","a de plasma","Red de investigaci","a de expedici");
	var prixInitial = new Array(1.4,1,1,0.8,1,1.2,6,1,6.6,36,0.3,1.3,7,800,16);
	var prix = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		
	
	
	for (var f=54; f<tdnode.length ; f++)
	{
		if(tdnode[f].innerHTML.length<1000)
		{
			for(var i =0 ; i< nom.length ; i++)
			{
				if ((tdnode[f].innerHTML).indexOf(nom[i],0)>=0)
				{	
					prix[i]=trouverInfo(0,prixInitial[i],2,"Nivel ",")");
				}		
			}
		}
	}

	var pointRecherche=0;
	for(var i =0 ; i< prix.length ; i++)
		{pointRecherche += prix[i];}
		
	if(pointRecherche != 0 )
		{GM_setValue("pointTechnoUni"+uni+pseudo,parseInt(pointRecherche));} // enregistrement si  y'as des chose a enregistrer
}



/* ************************************************************PAGE BATIMENTS************************************************************************/
if ((url.indexOf('/game/index.php?page=b_building',0))>=0) 
{ 
	var tdnode = document.getElementsByTagName('td');
	var temps=0; 
	
	var nom = new Array('Mina de me',"Mina de cri","Sintetizador de de","Planta de energ","lanta de fusi","brica de Robots","brica de Nanobots","Hangar","Almac"+eaigu+"n de cristal","ontenedor de deuterio","Laboratorio ","Terraformer","Silo","sito de la Alianza","Base lunar","Sensor Phalanx","Salto cu");
	var prixInitial = new Array(0.075,0.072,0.3,0.105,1.44,0.720,1600,0.7,2,3,4,0.8,150,41,60,80,80,8000);
	var exposant = new Array(1.5,1.6,1.5,1.5,1.8,2,2,2,2,2,2,2,2,2,2,2,2,2)
	var prix = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

	for (var f=54; f<tdnode.length ; f++)
	{
		if(tdnode[f].innerHTML.length<1000)
		{
			for(var i =0 ; i< nom.length ; i++)
			{
				if ((tdnode[f].innerHTML).indexOf(nom[i],0)>=0)
				{	
					prix[i]=trouverInfo(0,prixInitial[i],exposant[i],"Nivel ",")");
					
					if (i == 0)
					{
						// On recupere le temps de construction
						var sentence3 = "Tiempo de producci"+oaigu+"n:";
						var sentence4 = "s";
						var pos3 = (tdnode[f].innerHTML).indexOf(sentence3,0);
						if(pos3>=0)
						{
							var pos4 = (tdnode[f].innerHTML).indexOf(sentence4,pos3+sentence3.length);
							temps = (tdnode[f].innerHTML).substring(pos3+sentence3.length,pos4);
						}										
					}
				}		
			}
		}
	}
	

	if( prix[5] < 736.56 && temps != 0 && prix[0] >0) // Si les robot sont inferieur a 10 et y'a un temps de contruction pour le metal, on calcul le niveau de la nanite avec les temps de construction ( niveau de nanite pas affichï¿½ ...)
	{	
		var JHMS= new Array();
		temps = temps.replace('d ',';');
		temps = temps.replace('h ',';');
		temps = temps.replace('m ',';');
		JHMS = temps.split(/;/);
		
		var seconde = 0; 
		var minute = 0; 
		var heure = 0; 
		var jours = 0;
		
		seconde = JHMS[JHMS.length-1];
		if (JHMS.length-2 >= 0)
			{minute = JHMS[JHMS.length-2];}
		if (JHMS.length-3 >= 0)
			{heure = JHMS[JHMS.length-3];}
		if (JHMS.length-4 >= 0)
			{jours = JHMS[JHMS.length-4];}
	
		temps = (24*60*60*parseInt(jours)+60*60*parseInt(heure)+60*parseInt(minute)+parseInt(seconde))/3600; // temps construction en heure de la mine de metal
		
		var niveauM = Math.round(Math.log(prix[0]*0.5/0.075+1)/Math.log(1.5));
		var PrixNivMetal = 75*Math.pow(1.5,niveauM);
		var niveauBOT = Math.round(Math.log(prix[5]/0.72+1)/Math.log(2));

		if(temps>0)
		{
			var niveauNanite = Math.round(Math.log(2500*(1+niveauBOT)*temps/PrixNivMetal)/Math.log(0.5)); // Calcul du niv des nanite en fonction du temps de construction
			if (uni == 50 || uni == 60) // si speeduni on baisse la nanite
				{niveauNanite--;}
			prix[6]=1600*(Math.pow(2,niveauNanite)-1);
		}
	}
	
	var prixMines=Math.round(prix[0]+prix[1]+prix[2]);
	
	var prixBatiment=0;
	for(var i =3 ; i< nom.length ; i++)
		{prixBatiment+=prix[i];	}
	prixBatiment=Math.round(prixBatiment);
	
	var BatPlanete = new Array(); // recuperation des données
	BatPlanete = GM_getValue("BatPlanete"+uni+pseudo,'0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0').split(/;/);
	BatPlanete[2*(numeroplanete+1)-1] = prixBatiment;
	BatPlanete[2*(numeroplanete+1)-2] = prixMines;
	GM_setValue("BatPlanete"+uni+pseudo,BatPlanete.join(";"));

}



/* ***********************************************************************VUE GENERALE************************************************************************/
if ((url.indexOf('/game/index.php?page=overview',0))>=0) 
{ 

	var thnode = document.getElementsByTagName('th');
	var tdnode = document.getElementsByTagName('td');
	var f=0; 
	if (PlusieurSurMemeUni)
	{
		for (f=0 ; f<tdnode.length ; f++)
		{
			if ((tdnode[f].innerHTML).indexOf(">Planeta",0)>=0)
			{
				var sentence1 = '(';
				var sentence2 = ")";
				var pos1 = (tdnode[f].innerHTML).indexOf(sentence1,0);
				if (pos1>=0)
				{
					var pos2 = (tdnode[f].innerHTML).indexOf(sentence2,pos1+sentence1.length);
					pseudo = (tdnode[f].innerHTML).substring(pos1+1,pos2);
					GM_setValue("pseudo"+uni,pseudo);
				}
			}
		}
	}

	var PointsMinesTotal=0;
	var PointsBatimentsTotal=0;
	var PointsDefTotal=0;
	
	var PointsMines= new Array();
	var PointsBat= new Array();
	
	var BatPlanete = new Array();
	BatPlanete = GM_getValue("BatPlanete"+uni+pseudo,'0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0').split(/;/);
	
	var DefPlanete = new Array();
	DefPlanete = GM_getValue("DefPlanete"+uni+pseudo,'0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0').split(/;/);
	var pointLuneTotal = 0;

	for (var i = 0; i < 2*nombreplanetesetlunes; i++) 
	{
		if (i%2 == 0) // Si i est pair c'est une mine
		{
			PointsMinesTotal += parseInt(BatPlanete[i]);
			if (parseInt(BatPlanete[i]) == 0 && pointLune)
			{
				pointLuneTotal += parseInt(BatPlanete[i+1]);
			}
		} 
			
		if(i%2 == 1) // si i est impair
			{PointsBatimentsTotal += parseInt(BatPlanete[i]);} // c'est un bat
		
		if (i < nombreplanetesetlunes)
			{PointsDefTotal += parseInt(DefPlanete[i]);}
	}
	
	var PointsTechno=GM_getValue("pointTechnoUni"+uni+pseudo,0);
	var temps=0; 

	var prixVaisseauxVol =0;
	var vaisseaux = new Array();
	
	for (f=0 ; f<thnode.length ; f++)
	{
		if ((thnode[f].innerHTML).indexOf("Hora del servidor",0)>=0)
		{
			var date = thnode[f+1].innerHTML;
		}
		if ((thnode[f].innerHTML).indexOf("Lugar",0)>=0)
		{
			var sentence1 = "";
			var sentence2 = " (Lugar";
			var pos1 = (thnode[f].innerHTML).indexOf(sentence1,0);
			if (pos1>=0)
			{
				var pos2 = (thnode[f].innerHTML).indexOf(sentence2,pos1+sentence1.length);
				var PointsTotal = (thnode[f].innerHTML).substring(pos1+0,pos2);
				PointsTotal=PointsTotal.replace(/\./g,'');
				
				var PointsFlotteTotal = PointsTotal-PointsTechno-PointsMinesTotal-PointsBatimentsTotal-PointsDefTotal;
			}
		}
		
		if (((thnode[f].innerHTML).indexOf("return own",0)>=0 || (thnode[f].innerHTML).indexOf("flight owndeploy",0)>=0) && VaisseauxVol)
		{ // Comptage des points vaisseau en vol, en comptant les flottes sur le retour + les stationnés
			var sentence1 = "<b>";
			var sentence2 = "</b>";
			var pos1 = (thnode[f].innerHTML).indexOf(sentence1,0);
			if (pos1>=0)
			{
				var pos2 = (thnode[f].innerHTML).indexOf(sentence2,pos1+sentence1.length);
				var flottes = (thnode[f].innerHTML).substring(pos1+3,pos2);
				var PT = 'Nave peque'+nacc+'a de carga';
				vaisseaux = flottes.split(/<br>/);

				for (var i=0 ; i<vaisseaux.length ; i++)
				{
					if (vaisseaux[i].indexOf("Nave peque",0)>=0)
						{prixVaisseauxVol += 4 * vaisseaux[i].replace(/\./g,'').replace(PT,'');}
					if (vaisseaux[i].indexOf("Nave grande de carga",0)>=0)
						{prixVaisseauxVol += 12 * vaisseaux[i].replace(/\./g,'').replace(/Nave grande de carga /,'');}
					if (vaisseaux[i].indexOf("Cazador ligero ",0)>=0)
						{prixVaisseauxVol += 4* vaisseaux[i].replace(/\./g,'').replace(/Cazador ligero /,'');}
					if (vaisseaux[i].indexOf("Cazador pesado",0)>=0)
						{prixVaisseauxVol += 10* vaisseaux[i].replace(/\./g,'').replace(/Cazador pesado /,'');}
					if (vaisseaux[i].indexOf("Crucero",0)>=0)
						{prixVaisseauxVol += 29* vaisseaux[i].replace(/\./g,'').replace(/Crucero /,'');}
					if (vaisseaux[i].indexOf("Nave de batalla",0)>=0)
						{prixVaisseauxVol += 60* vaisseaux[i].replace(/\./g,'').replace(/Nave de batalla /,'');}
					if (vaisseaux[i].indexOf("Colonizador",0)>=0)
						{prixVaisseauxVol += 40 * vaisseaux[i].replace(/\./g,'').replace(/Colonizador /,'');}
					if (vaisseaux[i].indexOf("Reciclador",0)>=0)
						{prixVaisseauxVol += 18 * vaisseaux[i].replace(/\./g,'').replace(/Reciclador /,'');}
					if (vaisseaux[i].indexOf("Sonda de espionaje",0)>=0)
						{prixVaisseauxVol += 1* vaisseaux[i].replace(/\./g,'').replace(/Sonda de espionaje /,'');}
					if (vaisseaux[i].indexOf("Bombardero",0)>=0)
						{prixVaisseauxVol += 90* vaisseaux[i].replace(/\./g,'').replace(/Bombardero /,'');}
					if (vaisseaux[i].indexOf("Destructor",0)>=0)
						{prixVaisseauxVol += 125* vaisseaux[i].replace(/\./g,'').replace(/Destructor /,'');}
					if (vaisseaux[i].indexOf("Estrella de la muerte",0)>=0)
						{prixVaisseauxVol += 10000* vaisseaux[i].replace(/\./g,'').replace(/Estrella de la muerte /,'');}
					if (vaisseaux[i].indexOf("Acorazado",0)>=0)
						{prixVaisseauxVol += 85* vaisseaux[i].replace(/\./g,'').replace(/Acorazado /,'');}
				}
			}
		}			
	}
	
	var BBcode="[quote][center][size=22][b]Detalle de la inversión en puntos[/b][/size]\n\n";
	BBcode+="[size=16]Puntos Totales : [b][color=#ff0000]"+addPoints(PointsTotal)+"[/color][/b][/size]\n";

	var nbAfficher=0;
	if(mine) 
	{
		nbAfficher++;
		BBcode+="Puntos Minas :	[b][color=#ff0000]"+addPoints(PointsMinesTotal)+"[/color][/b] son el  [b][color=#ff0000]"+pourcent(PointsMinesTotal)+"[/color][/b] % \n";
	}
	if(AutreBat) 
	{
		nbAfficher++;
		BBcode+="Puntos otros Edificios :	[b][color=#ff0000]"+addPoints(PointsBatimentsTotal)+"[/color][/b] son el [b][color=#ff0000]"+pourcent(PointsBatimentsTotal)+"[/color][/b] % \n";
	}
	if(BatTotal) 
	{
		nbAfficher++;
		BBcode+="Puntos Edificios : [b][color=#ff0000]"+addPoints(PointsMinesTotal+PointsBatimentsTotal)+"[/color][/b] son el  [b][color=#ff0000]"+pourcent(PointsMinesTotal+PointsBatimentsTotal)+"[/color][/b] % \n";
	}
	if(techno) nbAfficher++;
	if(flottes) nbAfficher++;
	if(Def) nbAfficher++;
	if(indestructible) nbAfficher++;
	
	var br = '';
	if (!sauterLignePourPourcentageFlotteVol)
		{br ='<br/>';}
	
	var flottesEnVol = '';
	if(VaisseauxVol && PointsFlotteTotal>0) 
		{flottesEnVol = ' '+br+parseInt(prixVaisseauxVol/PointsFlotteTotal*1000)/10+' % en vuelo';}
		
	var affichePointLune ='';
	if (pointLune && AutreBat)
	{
		affichePointLune = ' '+br+parseInt(pointLuneTotal/PointsBatimentsTotal*1000)/10+' % de lunas';
	}
	else if (pointLune && BatTotal)
	{
		affichePointLune = ' '+br+parseInt(pointLuneTotal/(PointsMinesTotal+PointsBatimentsTotal)*1000)/10+' % de lunas';
	}
	

	BBcode+="Puntos en tecnologías  :	[b][color=#ff0000]"+addPoints(PointsTechno)+"[/color][/b] son el [b][color=#ff0000]"+pourcent(PointsTechno)+"[/color][/b] %\n";
	BBcode+="Puntos en Flota :	[b][color=#ff0000]"+addPoints(PointsFlotteTotal)+"[/color][/b] son el [b][color=#ff0000]"+pourcent(PointsFlotteTotal)+"[/color][/b] % \n";
	BBcode+="Puntos en Defensas :	[b][color=#fF0000]"+addPoints(PointsDefTotal)+"[/color][/b] son el [b][color=#ff0000]"+pourcent(PointsDefTotal)+"[/color][/b] % \n\n";
	BBcode+="su cuenta tiene [b][color=#ff0000]"+addPoints(PointsMinesTotal+PointsBatimentsTotal+PointsTechno)+"[/color][/b] son el [b][color=#ff0000]"+pourcent(PointsMinesTotal+PointsBatimentsTotal+PointsTechno)+"[/color][/b] % de puntos indestructibles[/center][/quote]\n";	
	
	// recuperation des points de reference
	var dates = new Array();
	dates = date.split(/ /);
	date = dates[2] +' '+dates[1];
	
	var PointRef = GM_getValue("PointRef"+uni+pseudo,PointsTotal+';'+date+';'+PointsMinesTotal+';'+PointsBatimentsTotal+';'+PointsTechno+';'+PointsFlotteTotal+';'+PointsDefTotal+';true').split(/;/);
		
	if(PointRef[7]== 'true') // Si y'avais rien d'enregistré on enregistre
	{
		GM_setValue("PointRef"+uni+pseudo,PointsTotal+';'+date+';'+PointsMinesTotal+';'+PointsBatimentsTotal+';'+PointsTechno+';'+PointsFlotteTotal+';'+PointsDefTotal+';false');
	}
	// Etablissement des couleurs
	
	var Color_mine= '';
	var Color_autreBat= '';
	var Color_batTotal= '';
	var Color_techno= '';
	var Color_flotte= '';
	var Color_def= '';
	var Color_indestr= '';
	var Color_prog= '';
	
	if	(couleurPoint)
	{
		if(PointsMinesTotal>parseInt(PointRef[2])+1) 			{Color_mine= 'style="color: #00FF00;"';}
		else if (PointsMinesTotal<parseInt(PointRef[2]) -1) 	{Color_mine= 'style="color: #FF0000;"';}
		
		if( PointsBatimentsTotal>parseInt(PointRef[3])+1) 		{Color_autreBat= 'style="color: #00FF00;"';}
		else if (PointsBatimentsTotal<parseInt(PointRef[3])-1) 	{Color_autreBat= 'style="color: #FF0000;"';}
		
		if((PointsMinesTotal+PointsBatimentsTotal)>(parseInt(PointRef[2])+parseInt(PointRef[3])+1)) 			{Color_batTotal= 'style="color: #00FF00;"';}
		else if ((PointsMinesTotal+PointsBatimentsTotal)<(parseInt(PointRef[2])+parseInt(PointRef[3])) -1)  	{Color_batTotal= 'style="color: #FF0000;"';}
		
		if( PointsTechno>parseInt(PointRef[4])+1) 			{Color_techno= 'style="color: #00FF00;"';}
		else if (PointsTechno<parseInt(PointRef[4]) -1) 		{Color_techno= 'style="color: #FF0000;"';}
		
		if( PointsFlotteTotal>parseInt(PointRef[5])+1) 		{Color_flotte= 'style="color: #00FF00;"';}
		else if (PointsFlotteTotal<parseInt(PointRef[5]) -1) 	{Color_flotte= 'style="color: #FF0000;"';}
		
		if( PointsDefTotal>parseInt(PointRef[6])+1)			{Color_def= 'style="color: #00FF00;"';}
		else if (PointsDefTotal<parseInt(PointRef[6]) -1) 		{Color_def= 'style="color: #FF0000;"';}
		
		if((PointsMinesTotal+PointsBatimentsTotal+PointsTechno)>(parseInt(PointRef[2])+parseInt(PointRef[3])+parseInt(PointRef[4])+1)) 			{Color_indestr= 'style="color: #00FF00;"';}
		else if((PointsMinesTotal+PointsBatimentsTotal+PointsTechno)>(parseInt(PointRef[2])+parseInt(PointRef[3])+parseInt(PointRef[4]) -1)) 	{Color_indestr= 'style="color: #FF0000;"';}

		if( PointsTotal>parseInt(PointRef[0])+1) 				{Color_prog= 'style="color: #00FF00;"';}
		else if (PointsTotal<parseInt(PointRef[0]) -1) 		{Color_prog= 'style="color: #FF0000;"';}
	}	
	
	
	var tr_evenements = document.getElementsByTagName('tbody')[5];	//pour trouver l'Ã©lÃ©ment
	var tr1 = tr_evenements.appendChild(document.createElement('tr'));
	tr1.innerHTML = '<td class="c" colspan="4" width="96%">Detalle de la inversión en puntos</td><td style="background-color:transparent;"><a TITLE="Haga clic aquí para ver BBcode (por el foro)";><img id="copybbcode" style="margin-left:-20px; position:relative;" src="data:image/gif;base64,R0lGODlhEAAQAPUAAChsKDA8EdrtwXvEApjWAYnNAur13EZRKoPJAidsJ8PjmJPTAcTxAIzDSJ3ZAbjJmqPdAZPKTJrVGozMHKfgAbvsALXoAHWRCXTAAqviAa/YepnMRFxlQ73hipSahLrgfJTQJ6ncN63If7PbfKPYOMHhl7HmALbch5+lkXS2BIekB4mtBni3BJTLRGu6AnmTCYzHPpS2Sc7t3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADIALAAAAAAQABAAAAaOQJlwSCwaE4Bk0igERAzQaARQBDQE2Cy2kSA2FJ3OY1xSmGFDp2b0EXk8qI/m1KLKAK4BiBQKxTgcIAMYdgAYKQEBB4sHiQgDhQMsiZSUBQiRBQsEGSYqiQQFkE0IBQQQK5QUDguYQxOmEBcXLwyrBRNEABsLDhUMwBALG3ZpEpwWFRYEEsVFSEpdTNNFQQA7"/></a></td>';
	// On rajoute la zone de texte, mais invisible :
	var tr_zone_txt_invis = tr_evenements.appendChild(document.createElement('tr'));
	tr_zone_txt_invis.setAttribute('id', 'zonecode');
	tr_zone_txt_invis.setAttribute('style', 'display:none;');
	tr_zone_txt_invis.innerHTML='<td colspan="4" width="96%"><textarea cols="20" onClick="javascript:this.select();">'+BBcode+'</textarea></td>';
	
	if(mine)
	{
		var tr_mine = tr_evenements.appendChild(document.createElement('tr'));
		tr_mine.innerHTML='<th width="60px" colspan="1">Minas</th><th colspan=\"2\" ><a '+Color_mine+' TITLE="'+addPoints(Math.round(PointsMinesTotal-parseInt(PointRef[2])))+' Puntos ('+pourcent2(PointsMinesTotal-parseInt(PointRef[2]),PointsMinesTotal)+' %)";>'+addPoints(PointsMinesTotal)+' ( '+pourcent(PointsMinesTotal)+' % ) </a></th><th id="piebox" rowspan="'+nbAfficher+'"></th>';
	}
	if(AutreBat)
	{
		var tr_AutreBat = tr_evenements.appendChild(document.createElement('tr'));
		tr_AutreBat.innerHTML='<th width="60px" colspan="1">otros Edificios</th><th colspan=\"2\" ><a '+Color_autreBat+' TITLE="'+addPoints(Math.round(PointsBatimentsTotal-parseInt(PointRef[3])))+' Puntos  ('+pourcent2(PointsBatimentsTotal-parseInt(PointRef[3]),PointsBatimentsTotal)+' %)";>'+addPoints(PointsBatimentsTotal)+' ( '+pourcent(PointsBatimentsTotal)+' % )  </a>'+affichePointLune+'</th>';
	}
	if(BatTotal)
	{
		var tr_BatTotal = tr_evenements.appendChild(document.createElement('tr'));
		tr_BatTotal.innerHTML='<th width="60px" colspan="1">Edificios</th><th colspan=\"2\" ><a '+Color_batTotal+' TITLE="'+addPoints(Math.round((PointsMinesTotal+PointsBatimentsTotal)-(parseInt(PointRef[2])+parseInt(PointRef[3]))))+' Puntos ('+pourcent2((PointsMinesTotal+PointsBatimentsTotal)-(parseInt(PointRef[2])+parseInt(PointRef[3])),PointsMinesTotal+PointsBatimentsTotal)+' %)";>'+addPoints(PointsMinesTotal+PointsBatimentsTotal)+' ( '+pourcent(PointsMinesTotal+PointsBatimentsTotal)+' % )  </a>'+affichePointLune+' </th><th id="piebox" rowspan="'+nbAfficher+'"></th>';
	}
	if(techno)
	{
		var tr_techno = tr_evenements.appendChild(document.createElement('tr'));
		tr_techno.innerHTML='<th width="60px" colspan="1"><a href="http://uni'+uni+'.ogame.com.es/game/index.php?page=statistics&session='+session+'&who=player&type=research&start=-1&sort_per_member=0">tecnologías</a></th><th colspan=\"2\" ><a '+Color_techno+' TITLE="'+addPoints(Math.round(PointsTechno-parseInt(PointRef[4])))+' Puntos ('+pourcent2(PointsTechno-parseInt(PointRef[4]),PointsTechno)+' %)";>'+addPoints(PointsTechno)+' ( '+pourcent(PointsTechno)+' % ) </a></th>';
	}
	if(flottes)
	{
		var tr_flottes = tr_evenements.appendChild(document.createElement('tr'));
		tr_flottes.innerHTML='<th width="60px" colspan="1"><a href=http://uni'+uni+'.ogame.com.es/game/index.php?page=statistics&session='+session+'&who=player&type=fleet&start=-1&sort_per_member=0">Flota</a></th><th colspan=\"2\"><a '+Color_flotte+' TITLE="'+addPoints(Math.round(PointsFlotteTotal-parseInt(PointRef[5])))+' Puntos ('+pourcent2(PointsFlotteTotal-parseInt(PointRef[5]),PointsFlotteTotal)+' %)";>'+addPoints(PointsFlotteTotal) + ' ( '+pourcent(PointsFlotteTotal)+' % ) </a>'+flottesEnVol+'</th>';
	}
	if(Def)
	{
		var tr_Def = tr_evenements.appendChild(document.createElement('tr'));
		tr_Def.innerHTML='<th width="60px" colspan="1">Defensas</th><th colspan=\"2\" ><a '+Color_def+' TITLE="'+addPoints(Math.round(PointsDefTotal-parseInt(PointRef[6])))+' Puntos ('+pourcent2(PointsDefTotal-parseInt(PointRef[6]),PointsDefTotal)+' %)";>'+addPoints(PointsDefTotal)+' ( '+pourcent(PointsDefTotal)+' % ) </a></th>';
	}
	if(indestructible)
	{
		var tr_indestructible = tr_evenements.appendChild(document.createElement('tr'));
		tr_indestructible.innerHTML='<th width="60px" colspan="1">indestructibles</th><th colspan=\"2\" ><a '+Color_indestr+' TITLE="'+addPoints(Math.round((PointsMinesTotal+PointsBatimentsTotal+PointsTechno)-(parseInt(PointRef[2])+parseInt(PointRef[3])+parseInt(PointRef[4]))))+' Puntos ('+pourcent2((PointsMinesTotal+PointsBatimentsTotal+PointsTechno)-(parseInt(PointRef[2])+parseInt(PointRef[3])+parseInt(PointRef[4])),PointsMinesTotal+PointsBatimentsTotal+PointsTechno)+' %)";>'+addPoints(PointsMinesTotal+PointsBatimentsTotal+PointsTechno)+' ( '+pourcent(PointsMinesTotal+PointsBatimentsTotal+PointsTechno)+' % ) </a></th>';
	}

	if (progression)
	{		
		var tr_progression = tr_evenements.appendChild(document.createElement('tr'));
		tr_progression.innerHTML = '<th width="60px" colspan="1" >Progresión</th><th colspan=\"3\" ><a '+Color_prog+' TITLE="'+addPoints(Math.round(PointsTotal-parseInt(PointRef[0])))+' Puntos";>' +Math.round((PointsTotal-PointRef[0])/PointRef[0]*1000)/10 +' % despues del día  '+PointRef[1]+'</th><td style="background-color:transparent;"><a TITLE="haga clic aquí para poner su progresión a 0";><img id="pointRef" style="margin-left:-20px; position:relative;" src="data:image/gif;base64,R0lGODlhEAAQAPUAAChsKDA8EdrtwXvEApjWAYnNAur13EZRKoPJAidsJ8PjmJPTAcTxAIzDSJ3ZAbjJmqPdAZPKTJrVGozMHKfgAbvsALXoAHWRCXTAAqviAa/YepnMRFxlQ73hipSahLrgfJTQJ6ncN63If7PbfKPYOMHhl7HmALbch5+lkXS2BIekB4mtBni3BJTLRGu6AnmTCYzHPpS2Sc7t3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADIALAAAAAAQABAAAAaOQJlwSCwaE4Bk0igERAzQaARQBDQE2Cy2kSA2FJ3OY1xSmGFDp2b0EXk8qI/m1KLKAK4BiBQKxTgcIAMYdgAYKQEBB4sHiQgDhQMsiZSUBQiRBQsEGSYqiQQFkE0IBQQQK5QUDguYQxOmEBcXLwyrBRNEABsLDhUMwBALG3ZpEpwWFRYEEsVFSEpdTNNFQQA7"/></a></td>';	
	}
	
	
	if (mine)
		{var pie = draw_pie([pourcent(PointsMinesTotal),pourcent(PointsBatimentsTotal),pourcent(PointsTechno),pourcent(PointsFlotteTotal),pourcent(PointsDefTotal)]);}
	else if(BatTotal)
		{var pie = draw_pie([pourcent(PointsMinesTotal+PointsBatimentsTotal),pourcent(PointsTechno),pourcent(PointsFlotteTotal),pourcent(PointsDefTotal)]);}
	var piebox = document.getElementById('piebox');		
	piebox.appendChild(pie);
	
	// On modifi la fonction pour qu'elle soit ouvrante/fermante :
	var imgbbcode=document.getElementById("copybbcode");
	imgbbcode.addEventListener("click", function(event) 
	{
		var cellule = document.getElementById('zonecode');
		if (cellule.style.display == 'none') 
			{cellule.style.display = '';}
		else 
			{cellule.style.display = 'none';}
	}, true);
	
	// RaZ de la progression si clique
	document.getElementById("pointRef").addEventListener("click", function(event) 
	{
		if(confirm('¿Le restablecer su progresión?')) 
		{	
			GM_setValue("PointRef"+uni+pseudo,PointsTotal+';'+date+';'+PointsMinesTotal+';'+PointsBatimentsTotal+';'+PointsTechno+';'+PointsFlotteTotal+';'+PointsDefTotal+';false');
		}	
	}, true);
}
	