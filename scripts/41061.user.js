// ==UserScript==
// @name Infocompte dutch translation
// @description Infocompte dutch translation by Frutelaken for ogame.nl
// @include        http://*.ogame.*game/index.php?page=b_building*
// @include        http://*.ogame.*game/index.php?page=buildings*
// @include        http://*.ogame.*game/index.php?page=overview*
// @include        http://*.ogame.*game/index.php?page=options*
// @include        http://*.ogame.*game/index.php?page=flotten1*
// ==/UserScript==
/* ******************************to be translated **********************/
var option16='<tr><th>Toon debug informatie op elke pagina';
var this_Planet='Deze planeet';
/* ******************************Nederlands ********************************/
if (Langue=='nl')
{
	var Mines='Mijnen';
	var Other_structure='Andere Gebouwen';
	var Structure = 'Gebouwen';
	var Technology='Technologie';
	var Fleet ='Vloot';
	var Defense = 'Verdediging';
	var Progression = 'Voortgang' ;
	var Moyenne = 'Gemiddelde';
	var Production = 'Productie';
	var Indestructible = 'Onverwoestbaar';
	
	var Depuis = 'Sinds';
	var Points = 'Punten';
	
	var nom_def = new Array('Raketlanceerder',"Kleine laser","Grote laser","Gausskanon","Ionkanon","Plasmakanon","Anti-ballistische raket","Interplanetaire raket","Kleine planetaire schildkoepel","Grote planetaire schildkoepel");
	var nom_tech = new Array('Spionagetechniek',"Computertechniek","Wapentechniek","Schildtechniek","Pantsertechniek","Energietechniek","Hyperruimtetechniek","Verbrandingsmotor","Impulsmotor","HyperruimtemotorLasertechniek","Iontechniek","Plasmatechniek","Intergalactisch Onderzoeksnetwerk","Expeditietechniek");
	var nom_bat = new Array('Metaalmijn',"Kristalmijn","Deuteriumfabriek","Zonne-energiecentrale","Fusiecentrale","Robotfabriek","Nanorobotfabriek","Werf","Metaalopslag","Kristalopslag","Deuteriumtank","Onderzoekslab","Terravormer","Raketsilo","Alliantie hangar","Maanbasis","Sensor phalanx","Sprongpoort");
	var nom_flotte = new Array("Klein vrachtschip","Groot vrachtschip","Licht gevechtsschip","Zwaar gevechtsschip",'Kruiser',"Slagschip","Kolonisatieschip","Recycler","Spionagesonde","Bommenwerper","Interceptor","Ster des Doods","Vernietiger");
	var construction_time = 'Productie tijd:';
	var level = 'Level ';
	var dispo = 'Beschikbaar';
	var rank= 'Rang ';	
	var Planet= 'Planeet';
	
	var soit = 'dat zijn';
	
	this_Planet='Deze Planeet';
	
	var BBcode_debut="[quote][center][size=22][b]Puntenverdeling:[/b][/size]\n\n[size=16]Totaalpunten: ";
	var BBcode_mine="Punten in Mijnen: ";
	var BBcode_bat="Punten in andere Gebouwen: ";
	var BBcode_batT="Punten in alle Gebouwen: ";
	var BBcode_fin1 = "Punten in Ontwikkeling: ";
	var	Bcode_fin2 = "Punten in de Vloot: ";
	var	BBcode_fin3 = "Punten in Verdediging: ";
	var	BBcode_fin4 = "Uw account heeft ";
	var	BBcode_fin5 = "onverwoestbare punten\n";	
	var	BBcode_fin6 = "Gemiddelde stijging: ";
	var Point_day = "Punten per dag";
	
	var sur_lune='op Maan';
	var en_vol='onderweg';
	var Avertissement ='Bent u zeker dat u uw voortgangswaarde wilt resetten?';
	var restart = 'Oude punten resetten';
	var AffBBcode = 'klik hier voor BBcode';
	
	var done ='Klaar! Pagina opnieuw laden';
	var ICoption = 'InfoCompte Instellingen';
	
	var option1 ='<tr><th>Kleuren';
	var option2 ='<tr><th>Toon totaal aantal punten van gebouwen';
	var option3 ='<tr><th>Toon onverwoestbare punten';
	var option4 ='<tr><th>Toon onderzoekspunten';
	var option5 ='<tr><th>Toon vlootpunten';
	var option6 ='<tr><th>Toon verdedgingspunten';
	var option7 ='<tr><th>Toon procent vloot in vlucht';
	var option8 ='<tr><th>Toon maanpunten';
	var option9 ='<tr><th>Toon alles op een lijn(voor vlootbeweging en maanpunten)';
	var option10 ='<tr><th>Toon voortgang';
	var option11 ='<tr><th>Invullen als er op deze computer meer dan een account per universum is';
	var option12 ='<tr><th>Toon kleuren naargelang stijging';
	var option13 ='<tr><th>Toon voortgang per dag';
	var option14 ='<tr><th>Toon door mijnen geproduceerde punten';
	var option15 ='<tr><td class="c" colspan="2">Veranderingen opslaan / Annuleren  :';
	option16='<tr><th>Toon details op elke pagina';
	
	var Save='Veranderingen opslaan';
	var valeurdefaut = 'Standaardwaarden';
	var speeduniX2 = new Array(50,60,70);
	var speeduniX5= new Array();
}