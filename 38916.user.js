// ==UserScript==
// @name           InfoCompte International
// @author         originally Vulca, now maintained by Fim
// @date           21-03-2009
// @version        1.3.10
// @namespace      InfoCompte old
// @description    InfoCompte International - with German - for ogame v0.83
// @include        http://*.ogame.*game/index.php?page=b_building*
// @include        http://*.ogame.*game/index.php?page=buildings*
// @include        http://*.ogame.*game/index.php?page=overview*
// @include        http://*.ogame.*game/index.php?page=options*
// @include        http://*.ogame.*game/index.php?page=flotten1*
// @exclude		http://*.ogame.fr/game*
// @exclude		http://uni42.ogame.org/*
// @exclude		http://uni6.ogame.de/*
// ==/UserScript==




/*===================================================================================================
 DERNIERE MISE A JOUR : 27/10/2008
 TOPIC DU FORUM OFFICIEL : http://board.ogame.fr/thread.php?postid=8634035#post8634035 
 SCRIPT POUR OGAME.FR v 0.83

 
=====================================================================================================
 Even though it says "for ogame.fr v0.83" this version here
  doesn't work with .fr ..  maybe I should re-add .fr support?

 # German Adaption & other modifications by Fimbulvetr ("Fim","Fuyu")
 #####################################
 ## "InfoCompte - deutsch" v1.3.10  ##
 #####################################
 ###  for ogame v0.83 - NOT the redesign
 Notes: 
  x This script should be first in the list of scripts for ogame, otherwise it might not be able to
     properly parse the pages. But I guess that depends on the other scripts and their settings,
     probably works either way. (Unlike the Resource Panel Script, which _will_ break if you run
     something that changes the appearance of the resource screen.)
  x When installing a new version it is recommended to uninstall the old version and trash the values
     of the old variables while you're at it. It should not be necessary anymore though.
     However, if you got a version lower than 1.3.7 you need to remove that, newer than 1.3.6 will not
     overwrite the old versions, which will lead to the funny situation that both versions will be run.
  x This script's own production calculation doesn't care about temperature, energy, or mine settings
     lower than 100%. If you want exact values, use Resouce Panel. For german unis:
     http://userscripts.org/scripts/show/39110 -  and let's hope this works everywhere else:
     http://userscripts.org/scripts/show/38879 .
  x Power plants are not included in the calcution of mine points, even though I think it should. But
     I guess other people can have other opinions, so I'll leave it as it is.
     
  x Still on ToDo List: 
     * Rewriting price/point calculation (trouverinfo())
     * Giving the script the ability to learn new languages on its own,
        using a GM_xmlhttpRequest on the TechTree page (Overview page and BBcode would still
        be english though, the script will never be able to make up its own words.)
     * Adding an option to turn off planet pies if that is needed
     * fleet page: showing tf that would be created if the fleet that is standing there is crashed
     * overall fleet calculation from fleet pages (standing) and overview (flying)
        - this will require prediction, I do not have that kind of time right now.
   
  
 version history: 
 1.3.10 (21.03.2009)
  - Eliminated all . (dots) that were used as decimal points and replaced them with a comma.
  - Moon points no longer count as indestructible (requested).
  - Fixed Production display with res panel script for crys and deut values over 1kk/day (thx Vess).
  - Added debug info for Overview page so that you can see how the fleet points are calculated, 
     it's not displayed by default though, you need to click on your fleet points to unhide it.
  - My attempt to fix IPMs and ABMs for .pl broke Def when ogs with cargo option was active, fixed.
     I still don't know if IBMs are still broken for some languages, so please let me know.
  1.3.9.7 (09.02.2009)
  - Brasilian and Portuguese should be working now, as well as Polish. 
  - If you still have troubles with Nanite detection, just disable it be editing this script:
     replace "var detect_nanites = true;" with "var detect_nanites = false;" and don't forget to
     report it to me so I can try to fix it.
  1.3.9.6 (27.01.2009)
  - Balkan language fixed too now.
  - Useless Tech info (HyperTech > 8, Laser > 12, Ion > 5, Plasma > 7, Network > 7, Graviton > 1):
     If 'debug points' is enabled and you have some of some useless technologies, then you should
     now see how many points you spent on those on the Research page.
  1.3.9.5 (26.01.2009)
  - Dutch should work now, balkan is still not fixed, hopefully next update.
  - Autoupdate function included: You should now see it on the Overview page if there's a new version
     of this script, links to the /show/ page and a direct link to the new script will be provided.
     I hope I didn't fuck this up completely.
  1.3.9.4 (24.01.2009)
  - No changes, just two more languages.
  1.3.9.3 (18.01.2009)
  - Minor fixes/changes in 'This Planet' info and fleet page code. 
  1.3.9.2 (18.01.2009)
  - Added sol sats detection for 'This Planet' info, so now you have to visit fleet pages too
     if you have sats there.
  - Fixed Spanish and Swedish (hopefully) - strings were broken, should be fixed, but no way to test.
  1.3.9: (16.01.2009)
  - Fixed hidden Nanites level calculation for german unis. I knew it was fucking up so it
     was commented out before 1.3.7, now finally I managed to find what caused it to go berserk.
  - Fixed flying fleets detection, that one only worked properly for english so far.
  - Minor cosmetics for current planet point info: Zero values will be omitted now.
  - Average Progress counter is now reset along with Progress, and even sits in the same line
     if both are active.
  - Added a pie to 'This Planet' line. If you know a better place for it or if you have it, tell me.
     So far you can only turn it off manually by replacing the 'true' with a 'false' in line 142.
  1.3.8: (13.01.2009)
  - Fixed a bug that caused the script to fail on Overview page if you didn't have enough colors
     specified.
  - On Overview page you can now see the points of the current planet.
  - Production calculation now uses Resource Panel cookies if present.
  1.3.7: (29.12.2008)
  - Changed name and namespace so that Vulca's script for the new ogame won't overwrite this one.
  - Added Planet ID info to buildings and def pages (minor stuff).
  - Nanites detection that made no sense to me before was commented back in - it tries to detect
     Nanites if robotics has been deconstructed.
  1.3.6: (21.12.2008)
  - Finally made the settings page work in FireFox 2 too by adding document.getElementsByClassName(),
     FF2 is now completely supported. 
  1.3.5: (20.12.2008)
  - This file is UTF-8 encoded, and not changing that for hosting fixed all troubles with special
     characters. At the same time it should have broken Swedisch language support since it was made
     for ANSI. All those ISO 8859-1 character entity names for special characters are now replaced
     with the actual characters, thus most likely fixing Swedish again.
  1.3.4: (19.12.2008)
  - Every single building/tech/def structure with total points > 1k was bugged because thousands
     separator function "addPoints()" fucks up if the values aren't integer.
  1.3.3: (19.12.2008)
  - Fixed typo that caused the script not to load at all with Total Structure option on.
  - Fixed incompability issue on building and defence page with ogame-skript when debuginfo-option
     is on and there is only one type of structure present.
  - Added '.' as thousands separator for the debuginfo numbers (Overview page already had them
     since the beginning).
  1.3: (19.12.2008)
  - Added Debug Info option, defaults to true.
  1.2: (18.12.2008)
  - Commented out 2 whole code blocks that were only trying to determine Nanites points
     by using level and construction time of the metal mine, level of robotics factory and
     speeduni information, which just made no sense to me. It's a normal building 
     and all calculations should be done as with all other buildings.
     
     Maybe this fixes some of the huge numbers people were getting for Other Buildings points?
     probably not ..
     More likely, people just need to reorder their GreaseMonkey scripts, letting this script do its
     job before some other script changes the pages.
     
  - Production calculation now actually cares if it's a speeduni, and it detects active Geologist
     for its +10% bonus.
  - Added the +'</a>' to all (tdnode[f].innerHTML).indexOf(nom_def/bat/tech[i]+'</a>',0)
     and removed all </a> inside all languages' nom_ arrays - the real fix to the Iontech issue.
     
  1.1: (18.12.2008)
   - attempted to fix bad 'other structures' values on big planets, hope it works. (It didn't.)
   - added colors to braces on overview when enough colors are defined.
   
  1.0: (17.12.2008)
   - fixed Iontech value, and improper parsing when Plasmatech was present.
   - added Speedunis.
   - something else?
   

===================================================================================================*/



var start_time = new Date();

var url=location.href;
var Langue='';

var tr_evenements;
var this_version='1.3.10';
var new_version='';

var debug_points = new Boolean(true);
var show_this_planet_pie = new Boolean(true);
//someone needs to tell me why '= new Boolean(false);' behaves differently from '= false'
//with new Boolean I need to query (x==true) instead of just (x) ..
var use_res_panel = true;
var detect_nanites = true;


/*******************************FUNCTIONS***********************************/

//For FireFox2: 
if (!document.getElementsByClassName) {
	 document.getElementsByClassName = function(clsName) {
	 	 var retVal = new Array();
	 	 var elements = document.getElementsByTagName("*");
	 	 for(var i = 0;i < elements.length;i++){
	 	  if(elements[i].className.indexOf(" ") >= 0){
	 	  	var classes = elements[i].className.split(" ");
	 	  	for(var j = 0;j < classes.length;j++) {
	 	  		if(classes[j] == clsName) retVal.push(elements[i]);
	 	  	}
	 	 } else if(elements[i].className == clsName) retVal.push(elements[i]);
	 } return retVal; 
  }
}

var checkUpdate = function() {
	var scriptUrl='http://userscripts.org/scripts/source/38916.meta.js';
	var version_identifier="@version";
	var updateinfo=GM_getValue('updateinfo',"0,false,"+this_version+','+this_version).split(/,/);
	  //[time of the last update/1000, needs update,version string of NEW version,version string of the old one]
	var last_update=parseInt(updateinfo[0]);
	new_version=updateinfo[2];
	var old_version=updateinfo[3];
	var now_secs=new Date();
	now_secs=Math.round(now_secs/1000);
	var checkEvery = 1*(24*60*60); // 1 day in seconds
	var needs_update=updateinfo[1];
	if ((now_secs-last_update) > checkEvery || old_version != this_version) {
	 GM_xmlhttpRequest({
		method: 'GET',
		url: scriptUrl,
		headers: {
			 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			 'Accept': 'text/html,application/xml,text/xml,text/javascript',
			 },
		onload: function(responseDetails) { 
		  var pos3=responseDetails.responseText.indexOf(version_identifier)+version_identifier.length;
		  var pos4=responseDetails.responseText.indexOf("\n",pos3);
		  if (pos3!=-1 && pos4!=-1) {
		    new_version=(responseDetails.responseText.substring(pos3,pos4)).replace(/\s/g,'');
	 	    if (this_version!=new_version) { needs_update='true'; }
	 	    else { needs_update='false'; }
			  GM_setValue('updateinfo', now_secs+','+needs_update+','+new_version+','+this_version); 
			}
		}
	 })
  } else if (needs_update=='true') { return true; } //it's not time for recheck and old_version==this_version and needs_update==true
  else { return false; } //it's not time for recheck and old_version==this_version and needs_update==false
  
  //it was either time for recheck or old_version != this_version:
  if (old_version==this_version && needs_update=='true') { return true; }
  else { return false; }
}

//For usage of resource panel info:
function getCookieVal (offset){
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));	
}

function GetCookie (name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen){
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return getCookieVal (j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) 
			break; 
	}
	return null;
}

function SetCookie (name, value){
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	//var expires = (2 < argc) ? argv[2] : null;
	var ahora=new Date(); //fecha actual
	var unAño=new Date(ahora.getTime()+1000*60*60*24*365); //le sumamos un año 
	var expires = unAño;//expira en un año
	var path = (3 < argc) ? argv[3] : null;
	var domain = (4 < argc) ? argv[4] : null;
	var secure = (5 < argc) ? argv[5] : false;

	document.cookie = name + "=" + escape (value) +
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
	((path == null) ? "" : ("; path=" + path)) +
	((domain == null) ? "" : ("; domain=" + domain)) +
	((secure == true) ? "; secure" : "");
}

var replace_cen = function(txt,tld){
 txt=txt.replace(/\&amp\;/g,'\&');
 if (txt==''||tld=='') { return txt;} else
 {
 	if ((tld.lastIndexOf('.'))!=-1) { tld = tld.substring(tld.lastIndexOf('.')+1); }
    //tld: top level domain, for language detection
    //sc: special characters / cen: ISO 8859-1 character entity names
  if (tld=='mx') { tld='es'; }
  if (tld=='br') { tld='pt'; }
	switch(tld)
	{
		case 'de': { // German
        //var cen = new Array('\\&auml\\;','\\&ouml\\;','\\&uuml\\;','\\&szlig\\;','\\&Auml\\;','\\&Ouml\\;','\\&Uuml\\;');
        //var sc = new Array('ä','ö','ü','ß','Ä','Ö','Ü');
		  //using only the ones that are actually part of ship names:
			var cen = new Array('\\&auml\\;','\\&ouml\\;');
			var sc = new Array('ä','ö');	
      break; }
			
		case 'se': { // Swedisch
        //var cen = new Array('\\&auml\\;','\\&ouml\\;','\\&aring\\;','\\&Auml\\;','\\&Ouml\\;','\\&Aring\\;');
        //var sc = new Array('ä','ö','å','Ä','Ö','Å');
			//using only the ones that are actually part of ship names:
			var cen = new Array('\\&auml\\;','\\&Aring\\;');
			var sc = new Array('ä','Å');
      break; }
			
		case 'pt': { // Portuguese - 36 special characters, I'm skipping 34 of them
			var cen = new Array('\\&ccedil\\;','\\&otilde\\;');
			var sc = new Array('ç','õ');
      break; }
      
		case 'es': { // Spanish: only 1 character matters here
			var cen = new Array('\\&ntilde\\;');
			var sc = new Array('ñ');
      break; }
      
     default: { return txt; }
  }
  for (var i = 0; i < sc.length; i++)
    {
			var repl = new RegExp(cen[i],"g");
			var txt = txt.replace(repl,sc[i]);
		}
	return txt;
 }
}

var this_planet_pie = function() {
  var this_pie_colors = (BatTotal) ? CouleurGraph.substring(0,7)+'' : CouleurGraph.substring(0,14);
  this_pie_colors+=CouleurGraph.substring(CouleurGraph.length-13,CouleurGraph.length-6);
  this_pie_colors+=CouleurGraph.substring(CouleurGraph.length-6);
  var this_pie_values = ((BatTotal) ? Math.round((PointsBatimentsThis+PointsMinesThis)*1000/(PointsTotalThis))/10+',' : Math.round(PointsMinesThis*1000/(PointsTotalThis))/10+','+Math.round(PointsBatimentsThis*1000/(PointsTotalThis))/10+',') + Math.round(PointsSatsThis*1000/(PointsTotalThis))/10 + ',' + Math.round(PointsDefThis*1000/(PointsTotalThis))/10;
	var google_url = "http://chart.apis.google.com/chart?cht=p3&chf=bg,s,efefef00&chs=112x56&chco="+this_pie_colors+"&chd=t:"+this_pie_values;
	var img = '<img';
	img+=' src="'+google_url+'"';
	img+=' width="56"';
	img+=' height="28"';
  img+=' style="margin-top:-9px;margin-bottom:-8px;margin-left:-2px;margin-right:-0px;"';
	img+='>';
	return img;
	}


/*****************START OF LANGUAGE SECTION***********************/
/* ******************************Recherche la langue du serveur********************************/
const langue = new Array('de','org','us','se','com.es','com.pt','nl','ba','com.br','gr','onet.pl','bg','mx');

for(var i=0 ; i<langue.length ; i++)
{
	if ((url.indexOf('ogame.'+langue[i],0))>=0)
		{
			Langue = langue[i];
			if (langue[i]=='org')
			{
			 if (url.indexOf('ba.ogame.',0)>=0) { Langue = 'ba'; }
			 else if (url.indexOf('bg.ogame.',0)>=0) { Langue = 'bg'; }
			 else if (url.indexOf('mx.ogame.',0)>=0) { Langue = 'mx'; }
			}
			break;
		}
}

/* ******************************to be translated **********************/
var option16='<tr><th>Show Debug Info on every page';
var this_Planet='This Planet';
var bunttext='colorful';
// 'Useless:' 

/* ******************************German ********************************/
if (Langue=='de')
{
	var Mines='Minen';
	var Other_structure='Andere Gebäude';
	var Structure = 'Gebäude';
	var Technology='Forschung';
	var Fleet ='Flotte';
	var Defense = 'Verteidigung';
	var Progression = 'Steigerung' ;
	var Moyenne = 'Durchschnitt';
	var Production = 'Produktion';
	var Indestructible = 'unzerstörbar';
	
	var Depuis = 'seit';
	var Points = 'Punkte';
	
	var nom_def = new Array('Raketenwerfer',"Leichtes Lasergeschütz","Schweres Lasergeschütz","Gaußkanone","Ionengeschütz","Plasmawerfer","Abfangrakete","Interplanetarrakete","Kleine Schildkuppel","Große Schildkuppel");
	var nom_tech = new Array('Spionagetechnik',"Computertechnik","Waffentechnik","Schildtechnik","Raumschiffpanzerung","Energietechnik","Hyperraumtechnik","Verbrennungstriebwerk","Impulstriebwerk","Hyperraumantrieb","Lasertechnik","Ionentechnik","Plasmatechnik","Intergalaktisches Forschungsnetzwerk","Expeditionstechnik");
	var nom_bat = new Array('Metallmine',"Kristallmine","Deuteriumsynthetisierer","Solarkraftwerk","Fusionskraftwerk","Roboterfabrik","Nanitenfabrik","Raumschiffwerft","Metallspeicher","Kristallspeicher","Deuteriumtank","Forschungslabor","Terraformer","Raketensilo","Allianzdepot","Mondbasis","Sensorphalanx","Sprungtor");
	var nom_flotte = new Array("Kleiner Transporter","Großer Transporter","Leichter Jäger","Schwerer Jäger",'Kreuzer',"Schlachtschiff","Kolonieschiff","Recycler","Spionagesonde","Bomber","Zerstörer","Todesstern","Schlachtkreuzer");
	var construction_time = 'Produktionsdauer:';
	var level = 'Stufe ';
	var dispo = 'vorhanden';
	var rank= 'Platz ';	
	var Planet= 'Planet';
	
	var soit = 'das sind';
	this_Planet='Dieser Planet';
	bunttext='bunt';
	var Pointdetails="Punkteverteilung";
	
	var BBcode_debut="[quote][center][b]"+Pointdetails+":[/b]\n\nGesamtpunkte: ";
	var BBcode_mine="Punkte in Minen: ";
	var BBcode_bat="Punkte in anderen Gebäuden: ";
	var BBcode_batT="Punkte in allen Gebäuden: ";
	var BBcode_fin1 = "Punkte in Forschung: ";
	var	Bcode_fin2 = "Punkte in der Flotte: ";
	var	BBcode_fin3 = "Punkte in Verteidigung: ";
	var	BBcode_fin4 = "Dein Account hat ";
	var	BBcode_fin5 = "unzerstörbare Punkte\n";	
	var	BBcode_fin6 = "Durchschnittliche Steigerung: ";
	var Point_day = "Punkte pro Tag";
	
	var sur_lune='auf Mond';
	var en_vol='unterwegs';
	var Avertissement ='Bist du sicher, dass du deinen Steigerungszähler zurücksetzen willst?';
	var restart = 'Alte Daten löschen';
	var AffBBcode = 'klick hier für BBcode';
	
	var done ='Fertig! Seite neu laden';
	var ICoption = 'InfoCompte Einstellungen';
	
	var option1 ='<tr><th>Farben (füll aus soviele du willst)';
	var option2 ='<tr><th>Zeige Gesamtgebäudepunkte';
	var option3 ='<tr><th>Zeige unzerstörbare Punkte';
	var option4 ='<tr><th>Zeige Forschungspunkte';
	var option5 ='<tr><th>Zeige Flottenpunkte';
	var option6 ='<tr><th>Zeige Verteidigungspunkte';
	var option7 ='<tr><th>Zeige Anteil an fliegenden Schiffen';
	var option8 ='<tr><th>Zeige Mondpunkte';
	var option9 ='<tr><th>Zeige alles in einer Zeile (für Flottenbewegung und Mondpunkte)';
	var option10 ='<tr><th>Zeige Steigerungung';
	var option11 ='<tr><th>Es gibt auf diesem Computer mehr als einen Account pro uni';
	var option12 ='<tr><th>Zeige Farben in der Steigerungsfunktion';
	var option13 ='<tr><th>Zeige Steigerung pro Tag';
	var option14 ='<tr><th>Zeige von Minen produzierte Punkte';
	var option15 ='<tr><td class="c" colspan="2">Änderungen speichern / verwerfen  :';
	option16='<tr><th>Zeige Detailinformationen auf jeder Seite';
	
	var Save='Änderungen speichern';
	var valeurdefaut = 'Standardwerte';
	var speeduniX2 = new Array(50,60,70);
	var speeduniX5= new Array();
}

/* ******************************English ********************************/
if (Langue=='org' || Langue=='us')
{
	var Mines='Mines';
	var Other_structure='Other structures';
	var Structure = 'Structure';
	var Technology='Technology';
	var Fleet ='Fleet';
	var Defense = 'Defense';
	var Progression = 'Progress' ;
	var Moyenne = 'Average';
	var Production = 'Production';
	var Indestructible = 'Indestructible';
	
	var Depuis = 'since';
	var Points = 'Points';
	
	var nom_def = new Array('Rocket Launcher',"Light Laser","Heavy Laser","Gauss Cannon","Ion Cannon","Plasma Turret","Anti-Ballistic Missiles","Interplanetary Missiles","Small Shield Dome","Large Shield Dome");
	var nom_tech = new Array('Espionage Technology',"Computer Technology","Weapons Technology","Shielding Technology","Armour Technology","Energy Technology","Hyperspace Technology","Combustion Drive","Impulse Drive","Hyperspace Drive","Laser Technology","Ion Technology","Plasma Technology","Intergalactic Research Network","Expedition Technology");
	var nom_bat = new Array('Metal Mine',"Crystal Mine","Deuterium Synthesizer","Solar Plant","Fusion Reactor","Robotics Factory","Nanite Factory","Shipyard","Metal Storage","Crystal Storage","Deuterium Tank","Research Lab","Terraformer","Missile Silo","Alliance Depot","Lunar Base","Sensor Phalanx","Jump Gate");
	var nom_flotte = new Array("Small Cargo","Large Cargo","Light Fighter","Heavy Fighter",'Cruiser',"Battleship","Colony Ship","Recycler","Espionage Probe","Bomber","Destroyer","Deathstar","Battlecruiser");
	var construction_time = 'Construction Time:';
	var level = 'level ';
	var dispo = 'available';
	var rank= 'Rank ';	
	var Planet= 'Planet';
	
	var soit = 'that\'s';
	this_Planet='This Planet';
	var Pointdetails="Pointdetails";
	
	var BBcode_debut="[quote][center][b]"+Pointdetails+":[/b]\n\nTotal points :";
	var BBcode_mine="Points in mines: ";
	var BBcode_bat="Points in other structures: ";
	var BBcode_batT="Point in total structure: ";
	var BBcode_fin1 = "Points in technology : ";
	var	Bcode_fin2 = "Points in fleet : ";
	var	BBcode_fin3 = "Points in defense : ";
	var	BBcode_fin4 = "Your account has ";
	var	BBcode_fin5 = "indestructible points\n";	
	var	BBcode_fin6 = "Average progress : ";
	var Point_day = "Points per day";
	
	var sur_lune='on moon';
	var en_vol='flying';
	var Avertissement ='Are you sure you want to restart your progresscount?';
	var restart = 'Click to restart your progresscount';
	var AffBBcode = 'click to have the BBcode';
	
	var done ='Done! Renew the page!';
	var ICoption = 'InfoCompte\'s options';
	
	var option1 ='<tr><th>Graphiccolours (fill in the number of cases you want)';
	var option2 ='<tr><th >Show total structure points';
	var option3 ='<tr><th>Show indestructible points';
	var option4 ='<tr><th>Show technology points';
	var option5 ='<tr><th>Show fleet points';
	var option6 ='<tr><th>Show defense points';
	var option7 ='<tr><th>Show percentage of fleet in movement';
	var option8 ='<tr><th>Show moonpoints';
	var option9 ='<tr><th>Show all in the same line (for fleet movement and moonpoints)';
	var option10 ='<tr><th>Show progress';
	var option11 ='<tr><th>Fill in if there is more than one player on the same computer and universe';
	var option12 ='<tr><th>Show in coulours in fonction of the progress';
	var option13 ='<tr><th>Show progress per day';
	var option14 ='<tr><th>Show points earned from mine';
	var option15 ='<tr><td class="c" colspan="2">Cancel / Save the made modifications  :';
	option16='<tr><th>Show Debug Info on every page';
	
	var Save='Save the made modifications';
	var valeurdefaut = 'defaultvalues';
	bunttext = 'colorful';
	var speeduniX2 = new Array(30,40);
	var speeduniX5= new Array(35);
}

/* ****************************** Portuguese 1 ******************************/
if (Langue=='com.pt')
{
	var Mines='Minas';
	var Other_structure='Outras estruturas';
	var Structure = 'Estruturas';
	var Technology='Tecnologia';
	var Fleet ='Frota';
	var Defense = 'Defesa';
	var Progression = 'Progresso' ;
	var Moyenne = 'Média';
	var Production = 'Produção';
	var Indestructible = 'Indestrutivel';

	var Depuis = 'Desde';
	var Points = 'Pontos';

	var nom_def = new Array('Lançador de Mísseis',"Laser Ligeiro","Laser Pesado","Canhão de Gauss ","Canhão de Iões","Canhão de Plasma","Mísseis de Intercepção","Mísseis Interplanetários","Pequeno Escudo Planetário","Grande Escudo Planetário");
	var nom_tech = new Array('Tecnologia de Espionagem',"Tecnologia de Computadores","Tecnologia de Armas","Tecnologia de Escudo","Tecnologia de Blindagem","Tecnologia de Energia","Tecnologia de hiperespaço","Motor de Combustão","Motor de Impulsão","Motor Propulsor de Hiperespaço","Tecnologia Laser","Tecnologia de Iões","Tecnologia de Plasma","Rede Intergaláctica de Pesquisas","Tecnologia de Exploração Espacial");
	var nom_bat = new Array('Mina de Metal',"Mina de Cristal","Sintetizador de Deutério","Planta de Energia Solar","Planta de Fusão","Fábrica de Robots","Fábrica der Nanites","Hangar","Armazém de Metal","Armazém de Cristal","Armazém de Deutério","Laboratório de Pesquisas","Terra-formador","Silo de Mísseis","Depósito da Aliança","Base Lunar","Sensor Phalanx","Portal de Salto Quântico");
	var nom_flotte = new Array("Cargueiro Pequeno","Cargueiro Grande","Caça Ligeiro","Caça Pesado",'Cruzador',"Nave de Batalha","Nave de Colonizaçõa","Reciclador","Sonda de Espionagem","Bombardeiro","Destruidor","Estrela da Morte","Interceptor");
	var construction_time = 'Tempo de construção:';
	var level = 'Nível';
	var dispo = 'Disponivel';
	var rank= 'Classificação'; if (Langue=='com.br') { rank= 'classificação'; }
	var Planet= 'Planeta';

	var soit = 'representa';
	var Pointdetails="Detalhes de Pontuação";

	var BBcode_debut="[quote][center][b]"+Pointdetails+":[/b]\n\nPontuação Total :";
	var BBcode_mine="Pontos em Minas: ";
	var BBcode_bat="Pontos em outras estruturas: ";
	var BBcode_batT="Pontuação Total em Estruturas: ";
	var BBcode_fin1 = "Pontuação em Tecnologia : ";
	var Bcode_fin2 = "Pontuaçao em Frota : ";
	var BBcode_fin3 = "Pontuação em Defesa : ";
	var BBcode_fin4 = "A tua conta tem";
	var BBcode_fin5 = "Pontuação Indestrutivel";
	var BBcode_fin6 = "Média de progresso : ";
	var Point_day = "Pontos por dia";

	var sur_lune='Na Lua';
	var en_vol='Em movimento';
	var Avertissement ='Tens a certeza que queres reiniciar a tua contagem de Progresso?';
	var restart = 'Carrega para reiniciar a contagem do teu progresso';
	var AffBBcode = 'Carrega para obteres os BBcode';

	var done ='Concluido! Actualiza a página!';
	var ICoption = "Opções do InfoComplete's";

	var option1 ='<tr><th>Graficos (Preenche o numero de casas que quiseres)';
	var option2 ='<tr><th >Mostrar pontuação total das estruturas';
	var option3 ='<tr><th>Mostrar pontuação indestrutivel';
	var option4 ='<tr><th>Mostrar pontuação em tecnologia';
	var option5 ='<tr><th>Mostrar pontuação em frota';
	var option6 ='<tr><th>Mostrar pontuação em defesa';
	var option7 ='<tr><th>Mostrar percentagem de frota em movimento';
	var option8 ='<tr><th>Mostrar pontuação da lua';
	var option9 ='<tr><th>Mostrar tudo na mesma linha (Para a frota em movimento e para a pontuação da lua)';
	var option10 ='<tr><th>Mostrar Progresso';
	var option11 ='<tr><th>Preenche aqui se existirem mais que 1 jogador no mesmo computador e universo';
	var option12 ='<tr><th>Mostrar em cores em função do teu progresso';
	var option13 ='<tr><th>Mostrar Progresso Diário';
	var option14 ='<tr><th>Mostrar Pontuação ganho em Minas';
	var option15 ='<tr><td class="c" colspan="2">Cancelar / Gravar configuração:';

	var Save='Gravar Configuração'; 
	var valeurdefaut = 'valores padrão';
	var speeduniX2 = new Array();
	var speeduniX5= new Array();
}
/* ****************************** Portuguese 2 ******************************/
if (Langue=='com.br')
{
	var Mines='Minas';
	var Other_structure='Outras estruturas';
	var Structure = 'Estruturas';
	var Technology='Tecnologia';
	var Fleet ='Frota';
	var Defense = 'Defesa';
	var Progression = 'Progresso' ;
	var Moyenne = 'Média';
	var Production = 'Produção';
	var Indestructible = 'Indestrutivel';

	var Depuis = 'Desde';
	var Points = 'Pontos';

	var nom_def = new Array('Lançador de Mísseis',"Laser Ligeiro","Laser Pesado","Canhão de Gauss ","Canhão de Íons","Canhão de Plasma","Mísseis de Intercepção","Mísseis Interplanetários","Pequeno Escudo Planetário","Grande Escudo Planetário");
	var nom_tech = new Array('Tecnologia de Espionagem',"Tecnologia de Computadores","Tecnologia de Armas","Tecnologia de Escudo","Tecnologia de Blindagem","Tecnologia de Energia","Tecnologia de hiperespaço","Motor de Combustão","Motor de Impulsão","Motor Propulsor de Hiperespaço","Tecnologia Laser","Tecnologia de Íons","Tecnologia de Plasma","Rede Intergaláctica de Pesquisas","Tecnologia de Expedição");
	var nom_bat = new Array('Mina de Metal',"Mina de Cristal","Sintetizador de Deutério","Planta de Energia Solar","Planta de Fusão","Fábrica de Robôs","Fábrica der Nanites","Hangar","Armazém de Metal","Armazém de Cristal","Armazém de Deutério","Laboratório de Pesquisas","Terra-formador","Silo de Mísseis","Depósito da Aliança","Base Lunar","Sensor Phalanx","Portal de Salto Quântico");
	var nom_flotte = new Array("Cargueiro Pequeno","Cargueiro Grande","Caça Ligeiro","Caça Pesado",'Cruzador',"Nave de Batalha","Nave de Colonizaçõa","Reciclador","Sonda de Espionagem","Bombardeiro","Destruidor","Estrela da Morte","Interceptador");
	var construction_time = 'Tempo de construção:';
	var level = 'Nível';
	var dispo = 'Disponivel';
	var rank= 'Classificação'; if (Langue=='com.br') { rank= 'classificação'; }
	var Planet= 'Planeta';

	var soit = 'representa';
	var Pointdetails="Detalhes de Pontuação";

	var BBcode_debut="[quote][center][b]"+Pointdetails+":[/b]\n\nPontuação Total :";
	var BBcode_mine="Pontos em Minas: ";
	var BBcode_bat="Pontos em outras estruturas: ";
	var BBcode_batT="Pontuação Total em Estruturas: ";
	var BBcode_fin1 = "Pontuação em Tecnologia : ";
	var Bcode_fin2 = "Pontuaçao em Frota : ";
	var BBcode_fin3 = "Pontuação em Defesa : ";
	var BBcode_fin4 = "A tua conta tem";
	var BBcode_fin5 = "Pontuação Indestrutivel";
	var BBcode_fin6 = "Média de progresso : ";
	var Point_day = "Pontos por dia";

	var sur_lune='Na Lua';
	var en_vol='Em movimento';
	var Avertissement ='Tens a certeza que queres reiniciar a tua contagem de Progresso?';
	var restart = 'Carrega para reiniciar a contagem do teu progresso';
	var AffBBcode = 'Carrega para obteres os BBcode';

	var done ='Concluido! Actualiza a página!';
	var ICoption = "Opções do InfoComplete's";

	var option1 ='<tr><th>Graficos (Preenche o numero de casas que quiseres)';
	var option2 ='<tr><th >Mostrar pontuação total das estruturas';
	var option3 ='<tr><th>Mostrar pontuação indestrutivel';
	var option4 ='<tr><th>Mostrar pontuação em tecnologia';
	var option5 ='<tr><th>Mostrar pontuação em frota';
	var option6 ='<tr><th>Mostrar pontuação em defesa';
	var option7 ='<tr><th>Mostrar percentagem de frota em movimento';
	var option8 ='<tr><th>Mostrar pontuação da lua';
	var option9 ='<tr><th>Mostrar tudo na mesma linha (Para a frota em movimento e para a pontuação da lua)';
	var option10 ='<tr><th>Mostrar Progresso';
	var option11 ='<tr><th>Preenche aqui se existirem mais que 1 jogador no mesmo computador e universo';
	var option12 ='<tr><th>Mostrar em cores em função do teu progresso';
	var option13 ='<tr><th>Mostrar Progresso Diário';
	var option14 ='<tr><th>Mostrar Pontuação ganho em Minas';
	var option15 ='<tr><td class="c" colspan="2">Cancelar / Gravar configuração:';

	var Save='Gravar Configuração'; 
	var valeurdefaut = 'valores padrão';
	var speeduniX2 = new Array();
	var speeduniX5= new Array();
}
//
/* ******************************Spanish ********************************/
if (Langue=='com.es' || Langue=='mx')
{
	var Mines='Minas';
	var Other_structure='Edificios';
	var Structure = 'Edificios';
	var Technology='tecnologias';
	var Fleet ='Flota';
	var Defense = 'Defensas';
	var Progression = 'Progresión' ;
	var Moyenne = 'Promedio';
	var Production = 'Production';
	var Indestructible = 'Indestructibles';
	
	var Depuis = 'desde el';
	var Points = 'Puntos';

  var nom_def = new Array("Lanzamisiles","Láser pequeño","Láser grande","Cañón Gauss","Cañón iónico","Cañón de plasma","Misil de intercepción","Misil interplanetario","Cúpula pequeña de protección","Cúpula grande de protección");
  var nom_tech = new Array("Tecnología de espionaje","Tecnología de computación","Tecnología militar","Tecnología de defensa","Tecnología de blindaje","Tecnología de energía","Tecnología de hiperespacio","Motor de combustión","Motor de impulso","Propulsor hiperespacial","Tecnología láser","Tecnología iónica","Tecnología de plasma","Red de investigación","Tecnología de expedición");
  var nom_bat = new Array("Mina de metal","Mina de cristal","Sintetizador de deuterio","Planta de energía solar","Planta de fusión","Fábrica de Robots","Fábrica de Nanobots","Hangar","Almacén de metal","Almacén de cristal","Contenedor de deuterio","Laboratorio de investigación","Terraformer","Silo","Depósito de la Alianza","Base lunar","Sensor Phalanx","Salto cuántico");
  var nom_flotte = new Array("Nave pequeña de carga","Nave grande de carga","Cazador ligero ","Cazador pesado","Crucero","Nave de batalla","Colonizador","Reciclador","Sonda de espionaje","Bombardero","Destructor","Estrella de la muerte","Acorazado");
  var construction_time = 'Tiempo de producción:';
	var level = 'Nivel ';
	var dispo = 'disponible';
	var rank= 'Lugar';	
	var Planet= 'Planeta';
	
	var soit = 'son el';
	var Pointdetails="Detalle de la inversión en puntos";
	
	var BBcode_debut="[quote][center][b]"+Pointdetails+":[/b]\n\nPuntos Totales : ";
	var BBcode_mine="Puntos Minas : ";
	var BBcode_bat="Puntos otros Edificios : ";
	var BBcode_batT="Puntos Edificios : ";
	var BBcode_fin1 = "Puntos en tecnologías  :";
	var	Bcode_fin2 = "PPuntos en Flota : ";
	var	BBcode_fin3 = "Puntos en Defensas : ";
	var	BBcode_fin4 = "su cuenta tiene  ";
	var	BBcode_fin5 = "de puntos indestructibles\n";	
	var	BBcode_fin6 = "promedio : ";
	var Point_day = "Puntos por día";
	
	var sur_lune='de lunas';
	var en_vol='en vuelo';
	var Avertissement ='Are you sure you want to restart your progresscount?';
	var restart = 'haga clic aquí para poner su progresión a 0';
	var AffBBcode = 'Haga clic aquí para ver BBcode (por el foro)';
	
	var done ='guardar cambios';
	var ICoption = 'Opciones InfoCompte:';
	
	var option1 ='<tr><th>Color de los graficos';
	var option2 ='<tr><th >Porcentaje de punctos en edificios';
	var option3 ='<tr><th>Porcentaje de punctos indestructibles';
	var option4 ='<tr><th>Porcentaje de punctos tecnologias';
	var option5 ='<tr><th>Porcentaje de punctos en flota';
	var option6 ='<tr><th>Porcentaje de punctos defensas';
	var option7 ='<tr><th>Porcentaje de puntos de flota en vuelo';
	var option8 ='<tr><th>Porcentaje de punctos en la luna';
	var option9 ='<tr><th>todos los porcentajes juntos (para la flota en vuelo y puntos de la luna)';
	var option10 ='<tr><th>Porcentaje de la progresion';
	var option11 ='<tr><th>compruebe si son varios en el mismo equipo e incluso universo';
	var option12 ='<tr><th>Ver en color en funcion de los progresos';
	var option13 ='<tr><th>Mostrar los avances de días';
	var option14 ='<tr><th>Mostrar los puntos obtenidos de las minas';
	var option15 ='<tr><td class="c" colspan="2">Anular / Guardar las modificaciones :';
	
	var valeurdefaut = 'valores por defecto';
	var Save='guardar cambios';
	var speeduniX2 = new Array();
	var speeduniX5= new Array();
}

/* ******************************Swedish ********************************/
if (Langue=='se')
{	
	var Mines='Gruvor';
	var Other_structure='Andra byggnader';
	var Structure = 'Byggnader';
	var Technology='Teknologi';
	var Fleet ='Flotta';
	var Defense = 'Försvar';
	var Progression = 'Genomsnitt' ;
	var Moyenne = 'Tillväxt';
	var Production = 'Resursproduktion';
	var Indestructible = 'Indestructible';
	
	var Depuis = 'sen';
	var Points = 'Poäng';
	
	var nom_def = new Array('Raketramp',"Litet lasertorn","Stort lasertorn","Gausskanon","Jonkanon","Plasmakanon","Antiballistiska missiler","Interplanetära missiler","Liten sköldkupol","Stor sköldkupol");
	var nom_tech = new Array('Spionageteknologi',"Datorteknologi","Vapenteknologi","Sköldteknologi","Pansarteknologi","Energiteknologi","Hyperrymdteknologi","Raketmotor","Impulsmotor","Hyperrymdmotor","Laserteknologi","Jonteknologi","Plasmateknologi","Intergalaktiskt forskningsnätverk ","Expeditionsteknologi");
	var nom_bat = new Array('Metallgruva',"Kristallgruva","Deuteriumplattform","Solkraftverk","Fusionskraftverk","Robotfabrik","Nanofabrik","Skeppsvarv","Metallager","Kristallager","Deuteriumtank","Forskningslabb","Terraformare","Missilsilo","Alliansdep","Månbas","Radarstation","Månportal");
	var nom_flotte = new Array("Litet transportskepp","Stort transportskepp","Litet jaktskepp","Stort jaktskepp",'Kryssare',"Slagskepp","Koloniskepp","Återvinnare","Spionsond","Bombare","Flaggskepp","Dödsstjärna","Jagare");
	var construction_time = 'Konstruktionstid:';
	var level = 'level ';
	var dispo = 'tillg';
	var rank= 'rank ';	
	var Planet= 'Planet';
	
	var soit = 'representerar';
	var Pointdetails="Poängdetaljer";
	
	var BBcode_debut="[quote][center][b]"+Pointdetails+":[/b]\n\nTotala poäng :";
	var BBcode_mine="Poäng i gruvor: ";
	var BBcode_bat="Poäng i övriga byggnader : ";
	var BBcode_batT="Totala poäng i byggnader : ";
	var BBcode_fin1 = "Poäng i teknologi : ";
	var	Bcode_fin2 = "Poäng i flotta : ";
	var	BBcode_fin3 = "Poäng i försvar :";
	var	BBcode_fin4 = "Ditt konto har ";
	var	BBcode_fin5 = "oförstörbara poäng\n";	
	var	BBcode_fin6 = "Genomsnittlig tillväxt : ";
	var Point_day = "Poäng per dag";
	
	var sur_lune='på måne';
	var en_vol='flygande';
	var Avertissement ='OBS! Detta kommer reseta allt!';
	var restart = 'Click to restart your progresscount';
	var AffBBcode = 'klicka för att få BBcode';
	
	var done ='Klart! Uppdatera sidan!';
	var ICoption = 'InfoCompte\'s inställningar';
	
	var option1 ='<tr><th>Graf färger (fyll i för olika färger i fälten)';
	var option2 ='<tr><th >Visa totala poängen för byggnader';
	var option3 ='<tr><th>Visa oförstörbara poäng';
	var option4 ='<tr><th>Visa poängen för teknologi';
	var option5 ='<tr><th>Visa poängen för flottan';
	var option6 ='<tr><th>Visa poängen för försvaret';
	var option7 ='<tr><th>Visa procent av flottan i rörelse';
	var option8 ='<tr><th>Visa poängen för månar';
	var option9 ='<tr><th>Visa allt i samma fält (för flott rörelser och månpoäng)';
	var option10 ='<tr><th>Visa tillväxt';
	var option11 ='<tr><th>Tryck i om det är fler än en spelare på samma dator som spelar i samma universum';
	var option12 ='<tr><th>Visa färger i poängen för tillväxt';
	var option13 ='<tr><th>Visa tillväxt per dag';
	var option14 ='<tr><th>Visa poäng intjänat från gruvor';
	var option15 ='<tr><td class="c" colspan="2">Avbryt / Spara Ändringarna  :';
	
	var Save='Spara Ändringar';
	var valeurdefaut = 'Standard';
	var speeduniX2 = new Array();
	var speeduniX5= new Array();
}

/* ******************************Dutch ********************************/
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
	
	var Depuis = 'sinds';
	var Points = 'Punten';
	
	var nom_def = new Array('Raketlanceerder',"Kleine laser","Grote laser","Gausskanon","Ionkanon","Plasmakanon","Anti-ballistische raket","Interplanetaire raket","Kleine planetaire schildkoepel","Grote planetaire schildkoepel");
	var nom_tech = new Array('Spionagetechniek',"Computertechniek","Wapentechniek","Schildtechniek","Pantsertechniek","Energietechniek","Hyperruimtetechniek","Verbrandingsmotor","Impulsmotor","Hyperruimtemotor","Lasertechniek","Iontechniek","Plasmatechniek","Intergalactisch Onderzoeksnetwerk","Expeditietechniek");
	var nom_bat = new Array('Metaalmijn',"Kristalmijn","Deuteriumfabriek","Zonne-energiecentrale","Fusiecentrale","Robotfabriek","Nanorobotfabriek","Werf","Metaalopslag","Kristalopslag","Deuteriumtank","Onderzoekslab","Terravormer","Raketsilo","Alliantie hangar","Maanbasis","Sensor phalanx","Sprongpoort");
	var nom_flotte = new Array("Klein vrachtschip","Groot vrachtschip","Licht gevechtsschip","Zwaar gevechtsschip",'Kruiser',"Slagschip","Kolonisatieschip","Recycler","Spionagesonde","Bommenwerper","Interceptor","Ster des Doods","Vernietiger");
	var construction_time = 'Productie tijd:';
	var level = 'Niveau ';
	var dispo = 'beschikbaar ';
	var rank= 'rang ';	
	var Planet= 'Planeet';
	
	var soit = 'dat zijn';
	this_Planet='Deze Planeet';
	var Pointdetails='Puntenverdeling';
	
	var BBcode_debut="[quote][center][b]"+Pointdetails+":[/b]\n\nTotaalpunten: ";
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
	var speeduniX2 = new Array(10);
	var speeduniX5= new Array();
}

/* ******************************Bosnian ********************************/
if (Langue=='ba') {
  var Mines='Rudnici'; 
	var Other_structure='Ostale Zgrade';
	var Structure = 'Zgrade';
	var Technology='Tehnologija';
	var Fleet ='Flota';
	var Defense = 'Obrana';
	var Progression = 'Napredak' ;
	var Moyenne = 'Prosjecno';
	var Production = 'Produkcija';
	var Indestructible = 'Neunistivo';
	
	var Depuis = 'od';
	var Points = 'Bodovi';
	
	var nom_def = new Array('Raketobacaci',"Mali laser","Veliki laser","Gausov top","Ionski top","Plazma top","Anti-balisticke rakete","Interplanetarne rakete","Mala stitna kupola","Velika stitna kupola");
	var nom_tech = new Array('Tehnologija za spijunazu',"Tehnologija za kompjutere","Tehnologija za oruzje","Tehnologija za stitove","Tehnologija za oklop","Tehnologija za energiju","Tehnologija za hiperzonu","Mehanizam sagorjevanja","Impulsni pogon","Hyperspace pogon","Tehnologija za lasere","Tehnologija za ione","Tehnologija za plazmu","Intergalakticna znanstvena mreza","Tehnologija za Ekspedicije");
	var nom_bat = new Array('Rudnik metala',"Rudnik kristala","Sintizer deuterija","Solarna elektrana","Fuzijska elektrana","Tvornica robota","Tvornica nanita","Tvornica brodova","Spremnik metala","Spremnik kristala","Spremnik deuterija","Centar za istrazivanje","Terraformer","Silos za rakete","Depo saveza","Svemirska baza na mjesecu","Senzorfalanga","Odskocna vrata");
	var nom_flotte = new Array("Mali transporter","Veliki transporter","Mali lovac","Veliki lovac",'Krstarice',"Borbeni brodovi","Kolonijalni brodovi","Recikler","Sonde za spijunazu","Bombarder","Razaraci","Zvijezda smrti","Oklopna krstarica");
	var construction_time = 'Trajanje izgradnje:';
	var level = 'Level ';
	var dispo = 'postoji';
	var rank= 'Mjesto ';	
	var Planet= 'Planeta';
	
	var soit = 'predstavljanje';
	this_Planet='Ova Planeta';
	var Pointdetails='Detalji bodova';
	
	var BBcode_debut="[quote][center][b]"+Pointdetails+":[/b]\n\nUkupno bodova :";
	var BBcode_mine="Bodovi u Rudnicima: ";
	var BBcode_bat="Bodovi u Ostalim Zgradama: ";
	var BBcode_batT="Bodovi u ukupnoj izgradnji: ";
	var BBcode_fin1 = "Bodovi u Tehnologiji : ";
	var	Bcode_fin2 = "Bodovi u Floti : ";
	var	BBcode_fin3 = "Bodovi u Obrani : ";
	var	BBcode_fin4 = "Vas racun ima ";
	var	BBcode_fin5 = "neunistivih bodova";	
	var	BBcode_fin6 = "Prosjecni napredak : ";
	var Point_day = "Bodovi po danu";
	
	var sur_lune='na Mjesecu';
	var en_vol='u letu';
	var Avertissement ='Jeste li sigurni da zelite resetirati vas brojac napretka?';
	var restart = 'Kliknite za resetiranje brojaca napretka';
	var AffBBcode = 'Kliknite za BBcode';
	
	var done ='Gotovo! Obnovite stranicu!';
	var ICoption = 'InfoStat opcije';
	
	var option1 ='<tr><th>Boje grafikona (popunite brojem ukoliko zelite)';
	var option2 ='<tr><th >Prikazi Ukupno Bodovi u Ukupnoj Izgradnji';
	var option3 ='<tr><th>Prikazi neunistive bodove';
	var option4 ='<tr><th>Prikazi Bodove u Tehnologiji';
	var option5 ='<tr><th>Prikazi Bodove u Floti';
	var option6 ='<tr><th>Prikazi Bodove u Obrani';
	var option7 ='<tr><th>Prikazi postotak flote u pokretu';
	var option8 ='<tr><th>Prikazi bodove na Mjesecu';
	var option9 ='<tr><th>Prikazi sve u istom redu (za flotu u pokretu i bodove na Mjesecu)';
	var option10 ='<tr><th>Prikazi napredak';
	var option11 ='<tr><th>Popunite ako je vise od jednog igraca na istom PC-u ili univerzumu';
	var option12 ='<tr><th>Prikazi u boji u fonction napretka';
	var option13 ='<tr><th>Prikazi napredak po danu';
	var option14 ='<tr><th>Prikazi bodove dobivene od rudnika';
	var option15 ='<tr><td class="c" colspan="2">Odustani / Spremi napravljene preinake  :';
	option16='<tr><th>Prikazi Debug Info na svakoj stranici';
	
	var Save='Spremi napravljene preinake';
	var valeurdefaut = 'defaultvalues';
	var speeduniX2 = new Array(); 
	var speeduniX5= new Array();
}

/* ******************************Greek ********************************/
if (Langue=='gr')
{
	var Mines='Ορυχεία';
	var Other_structure='Άλλα κτίρια';
	var Structure = 'Κτίρια';
	var Technology='Έρευνα';
	var Fleet ='Στόλος';
	var Defense = 'Άμυνα';
	var Progression = 'Πρόοδος' ;
	var Moyenne = 'Μέσος Όρος';
	var Production = 'Παραγωγή';
	var Indestructible = 'Μη καταστρέψιμα';
	
	var Depuis = 'από την';
	var Points = 'Βαθμοί';
	
	var nom_def = new Array('Εκτοξευτής Πυραύλων',"Ελαφρύ Λέιζερ","Βαρύ Λέιζερ","Κανόνι Gauss","Κανόνι Ιόντων","Πυργίσκοι Πλάσματος","Αντι-Βαλλιστικοί Πύραυλοι","Διαπλανητικοί Πύραυλοι","Μικρός Αμυντικός Θόλος","Μεγάλος Αμυντικός Θόλος");
	var nom_tech = new Array('Τεχνολογία Κατασκοπείας',"Τεχνολογία Υπολογιστών","Τεχνολογία Όπλων","Τεχνολογία Ασπίδων","Τεχνολογία Θωράκισης","Τεχνολογία ενέργειας","Υπερδιαστημική Τεχνολογία","Προώθηση Καύσεως","Ωστική Προώθηση","Υπερδιαστημική Προώθηση","Τεχνολογία Λέιζερ","Τεχνολογία Ιόντων","Τεχνολογία Πλάσματος","Διαγαλαξιακό Δίκτυο Έρευνας","Τεχνολογία Αποστολών");
	var nom_bat = new Array('Ορυχείο Μετάλλου',"Ορυχείο Κρυστάλλου","Συνθέτης Δευτέριου","Εργοστάσιο Ηλιακής Ενέργειας","Αντιδραστήρας Σύντηξης","Εργοστάσιο Ρομποτικής","Εργοστάσιο Νανιτών","Ναυπηγείο","Αποθήκη Μετάλλου","Αποθήκη Κρυστάλλου","Δεξαμενή Δευτέριου","Εργαστήριο Ερευνών","Terraformer","Σιλό Πυραύλων","Σταθμός Συμμαχίας","Σεληνιακή Βάση","Αισθητήρας Φάλαγγας","Διαγαλαξιακή Πύλη");
	var nom_flotte = new Array("Μικρό Μεταγωγικό","Μεγάλο Μεταγωγικό","Ελαφρύ Μαχητικό","Βαρύ Μαχητικό",'Καταδιωκτικό',"Καταδρομικό","Σκάφος Αποικιοποίησης","Ανακυκλωτής","Κατασκοπευτικό Στέλεχος","Βομβαρδιστικό","Destroyer","Deathstar","Θωρηκτό Αναχαίτισης");
	var construction_time = 'Χρόνος Κατασκευής:';
	var level = 'επίπεδο ';
	var dispo = 'available';
	var rank= 'Κατάταξη ';	
	var Planet= 'Πλανήτης';
	
	var soit = 'δηλαδή';
	this_Planet='Σε αυτόν τον Πλανήτη';
	var Pointdetails="Πληροφορίες βαθμών";
	
	var BBcode_debut="[quote][center][b]"+Pointdetails+":[/b]\n\nΣυνολικοί βαθμοί: ";
	var BBcode_mine="Βαθμοί από ορυχεία: ";
	var BBcode_bat="Βαθμοί από άλλα κτίρια: ";
	var BBcode_batT="Συνολικοί βαθμοί από κτίρια: ";
	var BBcode_fin1 = "Βαθμοί από έρευνα: ";
	var	Bcode_fin2 = "Βαθμοί από στόλο: ";
	var	BBcode_fin3 = "Βαθμοί από άμυνα: ";
	var	BBcode_fin4 = "Ο λογαριασμός σας έχει ";
	var	BBcode_fin5 = "μη καταστρέψιμους βαθμούς\n";	
	var	BBcode_fin6 = "Μέσος όρος προόδου: ";
	var Point_day = "Βαθμοί τη μέρα";
	
	var sur_lune='σε φεγγάρι';
	var en_vol='σε πτήση';
	var Avertissement ='Είστε σίγουροι ότι θέλετε να μηδενίσετε το δείκτη προόδου;';
	var restart = 'Κάντε κλικ για να μηδενίσετε το δείκτη προόδου';
	var AffBBcode = 'Κάντε κλικ για να πάρετε το BBcode';
	
	var done ='Έγινε! Ανανεώστε τη σελίδα!';
	var ICoption = 'Επιλογές του InfoCompte';
	
	var option1 ='<tr><th>Χρώματα γραφήματος (συμπληρώστε όσες περιπτώσεις χρειάζεστε)';
	var option2 ='<tr><th>Εμφάνιση συνολικών βαθμών από κτίρια';
	var option3 ='<tr><th>Εμφάνιση μη καταστρέψιμων βαθμών';
	var option4 ='<tr><th>Εμφάνιση βαθμών από έρευνα';
	var option5 ='<tr><th>Εμφάνιση βαθμών από στόλο';
	var option6 ='<tr><th>Εμφάνιση βαθμών από άμυνα';
	var option7 ='<tr><th>Εμφάνιση ποσοστού του στόλου σε κίνηση';
	var option8 ='<tr><th>Εμφάνιση βαθμών σε φεγγάρια';
	var option9 ='<tr><th>Εμφάνιση όλων στην ίδια σειρά (για κίνηση στόλου και βαθμούς σε φεγγάρια)';
	var option10 ='<tr><th>Εμφάνιση προόδου';
	var option11 ='<tr><th>Τσεκάρετε αν υπάρχουν περισσότεροι από ένας παίκτες στον ίδιο υπολογιστή και το ίδιο σύμπαν';
	var option12 ='<tr><th>Εμφάνιση λειτουργίας προόδου με χρώματα';
	var option13 ='<tr><th>Εμφάνιση προόδου ανά μέρα';
	var option14 ='<tr><th>Εμφάνιση βαθμών που κερδίζονται από τα ορυχεία';
	var option15 ='<tr><td class="c" colspan="2">Ακύρωση / Αποθήκευση των αλλαγών:';
	option16='<tr><th>Εμφάνιση Πληροφοριών Αποσφαλμάτωσης σε κάθε σελίδα';
	
	var Save='Αποθήκευση των αλλαγών';
	var valeurdefaut = 'Προεπιλεγμένες ρυθμίσεις';
	bunttext = 'με χρώματα';
	var speeduniX2 = new Array();
	var speeduniX5= new Array();
}

/* ******************************Polish ********************************/
if (Langue=='onet.pl')
{
var Mines='Kopalnie';
	var Other_structure='Inne budynki';
	var Structure = 'Budynki';
	var Technology='Technologia';
	var Fleet ='Flota';
	var Defense = 'Obrona';
	var Progression = 'Postęp' ;
	var Moyenne = 'Średnica';
	var Production = 'Produkcja';
	var Indestructible = 'Niezniszczalne';
	
	var Depuis = 'od';
	var Points = 'Punkty';
	
	var nom_def = new Array('Wyrzutnia rakiet',"Lekkie działo laserowe","Ciężkie działo laserowe","Działo Gaussa","Działo jonowe","Wyrzutnia plazmy","Przeciwrakieta","Rakieta międzyplanetarna","Mała powłoka ochronna","Duża powłoka ochronna");
	var nom_tech = new Array('Technologia szpiegowska',"Technologia komputerowa","Technologia bojowa","Technologia ochronna","Opancerzenie","Technologia energetyczna","Technologia nadprzestrzenna","Napęd spalinowy","Napęd impulsowy","Napęd nadprzestrzenny","Technologia laserowa","Technologia jonowa","Technologia plazmowa","Międzygalaktyczna Sieć Badań Naukowych","Technologia Ekspedycji");
	var nom_bat = new Array('Kopalnia metalu',"Kopalnia kryształu","Ekstraktor deuteru","Elektrownia słoneczna","Elektrownia fuzyjna","Fabryka robotów","Fabryka nanitów","Stocznia","Magazyn metalu","Magazyn kryształu","Zbiornik deuteru","Laboratorium badawcze","Terraformer","Silos rakietowy","Depozyt sojuszniczy","Stacja księżycowa","Falanga czujników","Teleporter");
	var nom_flotte = new Array("Mały transporter","Duży transporter","Lekki myśliwiec","Ciężki myśliwiec",'Krążownik',"Okręt wojenny","Statek kolonizacyjny","Recykler","Sonda szpiegowska","Bombowiec","Niszczyciel","Gwiazda Śmierci","Pancernik");
	var construction_time = 'Czas ukończenia:';
	var level = 'Poziom';
	var dispo = "wybudowano";
	var rank= 'Miejsce';	
	var Planet= 'Planeta';
	
	var soit = 'to są';
	this_Planet='ta planeta';
	var Pointdetails="Szczegóły punktów";
	
	var BBcode_debut="[quote][center][b]"+Pointdetails+":[/b]\n\nWszystkie punkty :";
	var BBcode_mine="Punkty w kopalniach: ";
	var BBcode_bat="Punkty w innych budynkach: ";
	var BBcode_batT="Punkty we wszystkich budynkach: ";
	var BBcode_fin1 = "Punkty w technologii : ";
	var	Bcode_fin2 = "Punkty we flocie : ";
	var	BBcode_fin3 = "Punkty w obronie : ";
	var	BBcode_fin4 = "Twoje konto posiada ";
	var	BBcode_fin5 = "Niezniszczalne punkty";	
	var	BBcode_fin6 = "Średni postęp : ";
	var Point_day = "Punkty na dzień";
	
	var sur_lune='na księżycu';
	var en_vol='w locie';
	var Avertissement ='Czy napewno chcesz zresetować postęp';
	var restart = 'Kliknij aby zresetować postęp';
	var AffBBcode = 'Kliknij tutaj po BBcode';
	
	var done ='Gotowe! Odswież stronę!';
	var ICoption = 'opcje InfoCompte';
	
	var option1 ='<tr><th>Kolory (wypełnij jak chcesz)';
	var option2 ='<tr><th >Pokoaż punkty wszystkich budynków';
	var option3 ='<tr><th>Pokoaż punkty niezniszczalne';
	var option4 ='<tr><th>Pokoaż punkty technologii';
	var option5 ='<tr><th>Pokoaż punkty floty';
	var option6 ='<tr><th>Pokoaż punkty obrony';
	var option7 ='<tr><th>Pokoaż procent floty w locie';
	var option8 ='<tr><th>Pokoaż punkty księżyca';
	var option9 ='<tr><th>Pokoaż w jednej lini(dla ruchu flot i  punkty księżyca)';
	var option10 ='<tr><th>Pokoaż postęp';
	var option11 ='<tr><th>Zaznacz jeżeli jest wiecej niż jedna osoba na tym komputerze i universum';
	var option12 ='<tr><th>Pokoaż postęp w kolorze';
	var option13 ='<tr><th>Pokoaż postęp na dzień';
	var option14 ='<tr><th>Pokoaż punkty zyskane z kopalnii';
	var option15 ='<tr><td class="c" colspan="2">Anuluj / Zapisz dokonane modyfikacje  :';
	option16='<tr><th>Pokoaż szczegóły na każdej stronie';
	
	var Save='Zapisz zmiany';
	var valeurdefaut = 'ustawienia fabryczne';
	bunttext = 'w kolorach';
	var speeduniX2 = new Array(50,60);
	var speeduniX5= new Array();
}

/* ****************************** Bulgarian ********************************/
if (Langue=='bg')
{
	var Mines='Мини';
	var Other_structure='Други структури';
	var Structure = 'Структури';
	var Technology='Технологии';
	var Fleet ='Флоти';
	var Defense = 'Защити';
	var Progression = 'Прогрес' ;
	var Moyenne = 'Средно';
	var Production = 'Продукция';
	var Indestructible = 'Неразрушими';
	
	var Depuis = 'от';
	var Points = 'Точки';
	
	var nom_def = new Array('Ракетна установка',"Лек лазер","Тежък лазер","Гаус оръдие","Йонно оръдие","Плазмено оръдие","Анти-балистични ракети","Междупланетарни ракети","Малък щит","Голям щит");
	var nom_tech = new Array('Технология за Шпионаж',"Компютърна технология","Оръжейна технология","Технология за щитовете","Технология за Броня","Енергийна технология","Хипер Технология","Реактивен Двигател","Импулсен Двигател","Хипер Двигател","Лазерни технологии","Йонова Технология","Плазмена Технология","Интергалактическа Проучвателна Мрежа","Технология за експедиции");
	var nom_bat = new Array('Мина за метал',"Мина за Кристал","Синтезатор за Деутериум","Соларен панел","Ядрен Реактор","Фабрика за роботи","Фабрика за наноботи","Докове","Склад за метал","Склад за кристали","Резервоар за деутериум","Изследователска лаборатория","Тераформер","Ракетен силоз","Склад на съюза","Лунна база","Фронтален сензор","Портал");
	var nom_flotte = new Array("Малък Транспортьор","Голям Транспортьор","Лек Изтребител","Тежък Изтребител","Кръстосвач","Боен Кораб","Колонизатор","Рециклатор","Шпионска сонда","Бомбардировач","Унищожител","Звезда на смъртта","Боен Кръстосвач");
	var construction_time = 'Време за изграждане:';
	var level = 'ниво ';
	var dispo = 'в наличност';
	var rank= 'Място ';
	var Planet= 'Планета';
	
	var soit = 'или';
	this_Planet='Тази планета';
	var Pointdetails="Pазбивка";
	
	var BBcode_debut="[quote][center][b]"+Pointdetails+":[/b]\n\nОбщо точки:";
	var BBcode_mine="Точки от мини: ";
	var BBcode_bat="Точки от други структури: ";
	var BBcode_batT="Общо точки от структури: ";
	var BBcode_fin1 = "Теочки от технологии: ";
	var	Bcode_fin2 = "Точки от флот: ";
	var	BBcode_fin3 = "Точки от защити: ";
	var	BBcode_fin4 = "Акаунтът има ";
	var	BBcode_fin5 = "неунищожими точки\n";	
	var	BBcode_fin6 = "Средно развитие: ";
	var Point_day = "Точки на ден";
	
	var sur_lune='на луна';
	var en_vol='в полет';
	var Avertissement ='Сигурен ли сте, че искате да рестартирате брояча на развитието?';
	var restart = 'Рестартиране на брояча на развитието';
	var AffBBcode = 'BBcode';
	
	var done ='Готово! Обновете страницата!';
	var ICoption = 'Опции на InfoCompte';
	
	var option1 ='<tr><th>Цветове (Попълнете колко случая желаете)';
	var option2 ='<tr><th>Показване на точките от структури';
	var option3 ='<tr><th>Показване на неунищожимите точки';
	var option4 ='<tr><th>Показване на точките от технологии';
	var option5 ='<tr><th>Показване на точките от флот';
	var option6 ='<tr><th>Показване на точките от защита';
	var option7 ='<tr><th>Показване на процента флот в движение';
	var option8 ='<tr><th>Показване на точките от луната';
	var option9 ='<tr><th>Показване на всичко на един ред (за движението на флота и точките от луната)';
	var option10 ='<tr><th>Показване на развитието';
	var option11 ='<tr><th>Попълнете, ако има повече от един играч за един и същи компютър и вселена';
	var option12 ='<tr><th>Показване на цветове, в зависимост от развитието';
	var option13 ='<tr><th>Показване на дневното развитие';
	var option14 ='<tr><th>Показване на точките, печелени от мините';
	var option15 ='<tr><td class="c" colspan="2">Отказ / Запазване на промените:';
	
	var Save='Запазване на направените промени';
	var valeurdefaut = 'стойности по подразбиране';
	bunttext = 'цветно';
	var speeduniX2 = new Array();
	var speeduniX5= new Array();
}
/*****************END OF LANGUAGE SECTION***********************/


if (Langue != '')	
{
	var update = checkUpdate();
	
	var selectnode = document.getElementsByTagName('select');
	//var numeroplanete = selectnode[0].selectedIndex+1;
	//var nbplanetesetlunes = selectnode[0].length;

	if (selectnode.length > 0) 
	{
	  var numeroplanete = selectnode[0].selectedIndex;
		var nombreplanetesetlunes = selectnode[0].options.length;
	}


	var pseudo='';
		
	// Recuperation de session/uni
	var uni_url='uni'; if (Langue=='onet.pl') { uni_url='s'; }
	var ogame_url='.ogame.'+Langue; if (Langue=='ba' || Langue=='bg' || Langue=='mx') { ogame_url='.'+Langue+'.ogame.org'; } 
	MatchTab = url.match(uni_url+'([0-9]{1,2})'+ogame_url+'/game/index\.php.page=([a-zA-Z0-9_]+)(?:&dsp=1)?(?:&no_header=1)?&session=([a-z0-9]{12})(?:&mode=([a-zA-Z0-9]+))?');
	var uni = MatchTab[1];
	var session = MatchTab[3];
  var link_start='http://'+uni_url+uni+ogame_url+'/game/';
  
  // Planet IDs
  var PlanetIDs = new Array();
  var PlanetCoords = new Array();
  var IDMatch; var CoordMatch; var PlanetOption; var PIDerror=''; var emptyOptions = new Array();
  for(var i = 0; i < selectnode[0].options.length; i++) 
  {
  	PlanetOption=selectnode[0].options[i];
    if (PlanetOption==undefined) { if(i==0) { PIDerror='NO_OPTIONS<BR\>'; break; } else { PIDerror+='NO_OPTION_AT_INDEX_'+i+'<BR\>'; continue; } }
  	
  	IDMatch = PlanetOption.value.match(/&cp=(\d+)/);
  	CoordMatch = PlanetOption.innerHTML.match(/\d\:\d{1,3}\:\d{1,2}/);

  	if (i != numeroplanete && IDMatch == null && CoordMatch == null) { emptyOptions[emptyOptions.length]= i; }
  	else {
  	if (IDMatch != null) { PlanetIDs[i] = IDMatch[1]; }
  	else { PIDerror+='<span style="color:#FF0000;">NO_ID_MATCH</span>_AT_INDEX_'+i+'<BR\>'; }
  	
  	if (CoordMatch != null) { PlanetCoords[i] = CoordMatch[0]; }
  	else { PIDerror+='NO_COORD_MATCH_AT_INDEX_'+i+'<BR\>'; }
  	}
  }
  if (selectnode[0].options.length > 0) { } else { PIDerror+='SELECT_LENGTH_ZERO<BR\>'; }
  	
  if (PlanetIDs[numeroplanete] == null) { PIDerror+='<span style="color:#FF0000;">NO_ID_FOR_ACTIVE_PLANET</span><BR\>'; }
  if (emptyOptions.length > 1) { PIDerror+='<span style="color:#FF0000;">MULTIPLE_EMPTY_OPTIONS</span><BR\>'; }

	/* *****************************************************   OPTION    ******************************************************** */	
	function oui_non_en_checked(oui_non) 
	{
		if (oui_non == "true") {return "checked";} else {return "unchecked";} 
	}

	var OptionSauvegarde = GM_getValue("options"+uni+pseudo,"339966,3399FF,00CCFF,FF9900,FFFF66;false;true;true;true;true;true;true;false;true;false;true;true;true;true");
	var option = new Array();
	option = OptionSauvegarde.split(/;/);
	
	if (option.length < 15) {
		for(i=option.length;i<15;i++) {
			option[i]="true";
		}
	}

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

			for(var i=1 ; i< option.length ; i++)
				{option[i] = oui_non_en_checked(option[i]);}

			var tdnode = document.getElementById('content').getElementsByTagName('table');
			
			// Ajout du tableau :
				tdnode[0].innerHTML = '<tr><td class="c" colspan="2">'+ICoption+' :</td></tr>';
				tdnode[0].innerHTML += option1 +'</th> 		<th><input class="couleur" name="couleur" maxlength="6" value="'+couleur[0]+'" type="text" size="8" style="text-align:center;">  <input class="couleur" name="couleur" maxlength="6" value="'+couleur[1]+'" type="text" size="8" style="text-align:center;">  <input class="couleur" name="couleur" maxlength="6" value="'+couleur[2]+'" type="text" size="8" style="text-align:center;">  <input class="couleur" name="couleur" maxlength="6" value="'+couleur[3]+'" type="text" size="8" style="text-align:center;"> <input class="couleur" name="couleur" maxlength="6" value="'+couleur[4]+'" type="text" size="8" style="text-align:center;"></th></tr>';			
				tdnode[0].innerHTML += option2 +'</th> 		<th><input class="InfoOptions" '+option[1]+' name="batTotal" type="checkbox"></th></tr>';
				tdnode[0].innerHTML += option3 +'</th> 		<th><input class="InfoOptions" '+option[2]+' name="indestructible" type="checkbox"></th></tr>';
				tdnode[0].innerHTML += option4 +'</th> 		<th><input class="InfoOptions" '+option[3]+' name="Techno" type="checkbox"></th></tr>';
				tdnode[0].innerHTML += option5 +'</th> 		<th><input class="InfoOptions" '+option[4]+' name="Flotte" type="checkbox"></th></tr>';
				tdnode[0].innerHTML += option6 +'</th> 		<th><input class="InfoOptions" '+option[5]+' name="Defense" type="checkbox"></th></tr>';
				tdnode[0].innerHTML += option7 +'</th> 		<th><input class="InfoOptions" '+option[6]+' name="vol" type="checkbox"></th></tr>';
				tdnode[0].innerHTML += option8 +'</th> 		<th><input class="InfoOptions" '+option[7]+' name="lune" type="checkbox"></th></tr>';
				tdnode[0].innerHTML += option9 +'</th> 		<th><input class="InfoOptions" '+option[8]+' name="br" type="checkbox"></th></tr>';
				tdnode[0].innerHTML += option10 +'</th> 	<th><input class="InfoOptions" '+option[9]+' name="prog" type="checkbox"></th></tr>';
				tdnode[0].innerHTML += option11 +'</th>		<th><input class="InfoOptions" '+option[10]+' name="plein" type="checkbox"></th></tr>';
				tdnode[0].innerHTML += option12 +'</th>		<th><input class="InfoOptions" '+option[11]+' name="couleurProg" type="checkbox"></th></tr>';
				tdnode[0].innerHTML += option13 +'</th>		<th><input class="InfoOptions" '+option[12]+' name="progjours" type="checkbox"></th></tr>';
				tdnode[0].innerHTML += option14 +'</th>		<th><input class="InfoOptions" '+option[13]+' name="prodjours" type="checkbox"></th></tr>';
				tdnode[0].innerHTML += option16 +'</th>		<th><input class="InfoOptions" '+option[14]+' name="debug" type="checkbox"></th></tr>';
				
				
				tdnode[0].innerHTML += option15 +'</td></tr>';
				tdnode[0].innerHTML += '<tr><th class="boutton_VG"><input title="'+valeurdefaut+'" value="'+valeurdefaut+'" type="submit" class="Reset_VG"> - <input title="'+bunttext+'" value="'+bunttext+'" type="submit" class="Bunt_VG"></th><th class="boutton_VG"><input title="'+Save+' " value="'+Save+' " type="submit" class="Sauver_VG"></th></tr>';

		
				// Definition du code du bouton de reset :
			var Boutton = document.getElementsByClassName("Reset_VG");
					
			if (Boutton[0]) 
			{
				Boutton[0].addEventListener("click", function() 
				{
									
						GM_setValue("options"+uni+pseudo, "3333ff;false;false;true;true;true;true;false;false;true;false;true;true;true;false");

						BOUTTON = document.getElementsByClassName("boutton_VG");
						BOUTTON[0].innerHTML = '<a href="'+link_start+'index.php?page=options&session='+session+'&infocompte_plus=oui">'+done+'</a>';

				}, true);
			}
			
							// Definition du code du bouton de 'bunt' :
			var Boutton = document.getElementsByClassName("Bunt_VG");
					
			if (Boutton[0]) 
			{
				Boutton[0].addEventListener("click", function() 
				{

						CouleurGraph = "339966,3399FF,00CCFF,FF9900,FFFF66";
						GM_setValue("options"+uni+pseudo, "339966,3399FF,00CCFF,FF9900,FFFF66;false;true;true;true;true;true;true;false;true;false;true;true;true;true");
						
						BOUTTON = document.getElementsByClassName("boutton_VG");
						BOUTTON[0].innerHTML = '<a href="'+link_start+'index.php?page=options&session='+session+'&infocompte_plus=oui">'+done+'</a>';

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
							{SOptions += "true";} 
						else 
							{SOptions += "false";}
						if (f!=Block.length-1) { SOptions += ";"; }
					}
					GM_setValue("options"+uni+pseudo, SOptions);
					
					BOUTTON = document.getElementsByClassName("boutton_VG");
					BOUTTON[1].innerHTML = '<a href="'+link_start+'index.php?page=options&session='+session+'&infocompte_plus=oui">'+done+'</a>';
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
				New_Table.innerHTML = '<tr><td colspan="2" class="c"><a href="'+link_start+'index.php?page=options&session='+session+'&infocompte_plus=oui">'+ICoption+'</a></td></tr>';
					
				var tdnode = document.getElementById('content').getElementsByTagName('table')[0];
				tdnode.parentNode.insertBefore(New_Table, tdnode.nextSibling);
			}
		}
	}// fin page option 
	
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
	var ProgJours = true;
	var ProdJours = true;

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
	if (option[12] == 'false')
		{ProgJours = false; }
	if (option[13] == 'false')
		{ProdJours = false; }
	if (option[14] == 'false')
		{debug_points = false; }

		if (PlusieurSurMemeUni)
		{pseudo = GM_getValue("pseudo"+uni+Langue,'');}


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
	/* ******************************************************* fin OPTION************************************************************************************/

	/* ******************************Fonctions********************************/
	var draw_pie = function(data)
	  {
			var data_url = data.join(","); 
			
			
			if(Langue=='de')
			{
				if (mine)
					{var labels_url = "Minen|Andere Bauten|Forschung|Flotte|Verteidigung";}
				if(BatTotal)
					{var labels_url = "Bauten|Forschung|Flotte|Verteidigung";}				
			}
			else if(Langue=='se')
			{
				if (mine)
					{var labels_url = "Gruvor|Andra byggnader|Teknologi|Flotta|F'o'rsvar";}
				if (BatTotal)
					{var labels_url = "Byggnader|Teknologi|Flotta|F'o'rsvar";}
			}
			else if(Langue=='gr')
			{
				if(mine)
					{var labels_url = "Oryxeia|Alla ktiria|Erevna|Stolos|Amyna";}
				if(BatTotal)
					{var labels_url = "Ktiria|Erevna|Stolos|Amyna";}
			}
			else if(Langue=='bg')
			{
				if(mine)
					{var labels_url = "Mini|Drugi strukturi|Tehnologii|Floti|Zashtiti";}
				if(BatTotal)
					{var labels_url = "Strukturi|Tehnologii|Floti|Zashtiti";}
			}
			else
			{
				if(mine)
					{var labels_url = Mines+"|"+Other_structure+"|"+Technology+"|"+Fleet+"|"+Defense;}
				if(BatTotal)
					{var labels_url = Structure+"|"+Technology+"|"+Fleet+"|"+Defense;}
			}	
			var google_url = "http://chart.apis.google.com/chart?cht=p3&chf=bg,s,efefef00&chs=280x100&chld=M&&chtt=&chl=" + labels_url + "&chco="+CouleurGraph+"&chd=t:" + data_url;
			var img = document.createElement("img");
			img.setAttribute("src",google_url);
			img.setAttribute("align","top");
			img.setAttribute("width","280");
			img.setAttribute("height","100");
			if (!debugGraphique) {img.setAttribute("style", "margin-top:-30px;");} 
			return img;
	  }
	  
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
	
	
		// I know this function is ugly but I didn't write it and in the end it works
	function trouverInfo(def, init, R, sentence1 ,sentence2)
	{
		var pos1 = (tdnode[f].innerHTML).indexOf(sentence1,10);
		if (pos1>=0) 
		{ 
			var pos2 = (tdnode[f].innerHTML).indexOf(sentence2,pos1+sentence1.length);
			if ((pos2==pos1+sentence1.length || pos2==-1) && sentence2!=")") { //I hope this solves .pl Def page problems
				if (pos2!=-1) { pos1+=sentence2.length; }
				poskomma=(tdnode[f].innerHTML).indexOf(',',pos1+sentence1.length);
				pospar=(tdnode[f].innerHTML).indexOf(')',pos1+sentence1.length);
				if (poskomma!=-1) { pos2=Math.min(poskomma,pospar); }
				else { pos2=pospar; }
				var posGT=(tdnode[f].innerHTML).indexOf('<!--');
				if (posGT != -1 && posGT < pos2) { return 0; }
			}
			var nombre = (tdnode[f].innerHTML).substring(pos1+sentence1.length,pos2);
			nombre = parseInt(nombre.replace(/\./g,'')); 
			if(isNaN(nombre)) { parseInt(nombre.replace(/\D/g,'')); };
			if(isNaN(nombre)) nombre = 0;
			var cout= init *(Math.pow(R,nombre)-1)/(R-1) + def *nombre;
			return cout;
		}
		else return 0;
	}
	
	
	/* ******************************************************PAGE DEFENSE*****************************************************************************/ 
	if ((url.indexOf('mode=Verteidigung',0))>=0)
	{	
		var tdnode = (document.getElementById('content')).getElementsByTagName('td');
		var valeur = new Array(2,2,8,37,8,130,10,25,20,100);
		var prix = new Array(0,0,0,0,0,0,0,0,0,0);

   if (debug_points==true) {
		tr_evenements = (document.getElementById('content')).getElementsByTagName('tbody')[2];
		if(typeof tr_evenements != 'object') { tr_evenements = (document.getElementById('content')).getElementsByTagName('tbody')[1]; }
    var tr_add1 = tr_evenements.appendChild(document.createElement('tr'));
		tr_add1.innerHTML='<td class="c" colspan="3">[<a name="pointdetails">'+Defense+'</a>] - [#'+(numeroplanete+1)+']</td>';
    var tr_add3 = tr_evenements.appendChild(document.createElement('tr'));
		var debug_def='<td colspan="3"><table>';
		var debug_lines=0;
   }

		for (var f=1; f<tdnode.length ; f++)
		{
			if(true)
			{
				for(var i =0 ; i< nom_def.length ; i++)
				{
					if ((tdnode[f].innerHTML).indexOf(nom_def[i]+'</a>',0)>=0)
					{	
						prix[i]=parseInt(trouverInfo(valeur[i],0,0,"(",dispo));
						
						if (debug_points && prix[i]>0) {
							var value_formatted;
							if (prix[i]<1000) { value_formatted=(Math.round(prix[i]*10)/10); }
							else { value_formatted=addPoints(Math.round(prix[i])); }
					    debug_def+='<tr><td>'+nom_def[i]+'</td><td align="right"><b>'+value_formatted+'</b> '+Points+'</td></tr>';
					    debug_lines++;
					    }

					}				
				}		
			}	
		}
		
		var PointsDef = 0;
		for(var i =0 ; i< nom_def.length ; i++)
			{PointsDef += prix[i];}
			
   
   if (debug_points==true) {
   	  var extra_line='';
   	  if (debug_lines==1) { extra_line='<tr><td></td><td></td></tr>'; }
      tr_add3.innerHTML=debug_def+extra_line+'</table></td>';
      var tr_add2 = tr_evenements.appendChild(document.createElement('tr'));
			tr_add2.innerHTML='<td class="c" colspan="3">Total: '+addPoints(PointsDef)+' '+Points+'</td>';
		}


		var DefPlanete = new Array();
		DefPlanete = GM_getValue("DefPlanete"+uni+pseudo+Langue,'0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0').split(/;/);
		DefPlanete[numeroplanete] = parseInt(PointsDef);
		GM_setValue("DefPlanete"+uni+pseudo+Langue,DefPlanete.join(";"));
	}

	
	/* ****************************************************************** PAGE RECHERCHES*****************************************************************************/ 
	if ((url.indexOf('mode=Forschung',0))>=0) 
	{ 
		var tdnode = (document.getElementById('content')).getElementsByTagName('td');
		var prixInitial = new Array(1.4,1,1,0.8,1,1.2,6,1,6.6,36,0.3,1.4 ,7,800,16);
		var prix = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		var prixUseful =  new Array(0,0,0,0,0,0,1530,0,0,0,1228.5,88.2,889,101600,0);
		
    if (debug_points==true) {
		tr_evenements = (document.getElementById('content')).getElementsByTagName('tbody')[1];
    var tr_add1 = tr_evenements.appendChild(document.createElement('tr'));
		tr_add1.innerHTML='<td class="c" colspan="3">[<a name="pointdetails">'+Technology+'</a>]</td>';
    var tr_add3 = tr_evenements.appendChild(document.createElement('tr'));
		var debug_tech='<td colspan="3"><table>';
		var debug_lines=0;
	  }


		
		for (var f=1; f<tdnode.length ; f++)
		{
			if(true)
			{
				for(var i =0 ; i< nom_tech.length ; i++)
				{
					if ((tdnode[f].innerHTML).indexOf(nom_tech[i]+'</a>',0)>=0)
					{	
						prix[i]=trouverInfo(0,prixInitial[i],2,"("+level ,")");
						
						if (debug_points && prix[i]>0) {
							var value_formatted;
							if (prix[i]<1000) { value_formatted=(Math.round(prix[i]*10)/10).toString().replace(/\./,','); }
							else { value_formatted=addPoints(Math.round(prix[i])); }
						  debug_tech+='<tr><td>'+nom_tech[i]+'</td><td align="right"><b>'+value_formatted+'</b> '+Points+'</td></tr>';
						  debug_lines++;
					  }

					}		
				}
			}
		}
		var pointRecherche=0;
		var pointUselessRecherche=0;
		for(var i =0 ; i< prix.length ; i++)
			{
				pointRecherche += prix[i];
				if (prixUseful[i]!=0 && prix[i]>prixUseful[i]) { pointUselessRecherche+=prix[i]-prixUseful[i]; }
			}
				if(pointRecherche != 0 )
			{
				pourcentUselessRecherche = Math.round(pointUselessRecherche*1000/pointRecherche)/10;
				pointRecherche = Math.floor(pointRecherche);
				pointUselessRecherche = Math.round(pointUselessRecherche);

       if (debug_points==true) {
       	var uselessTech='';
       	if (pointUselessRecherche!=0) { uselessTech=' Useless:&nbsp;'+pointUselessRecherche+'&nbsp;'+Points+' (&nbsp;'+pourcentUselessRecherche+'%&nbsp;)'; }
        tr_add3.innerHTML=debug_tech+'</table></td>';
        var tr_add2 = tr_evenements.appendChild(document.createElement('tr'));
			  tr_add2.innerHTML='<td class="c" colspan="3">Total:&nbsp;'+addPoints(pointRecherche)+'&nbsp;'+Points+uselessTech+'</td>';
       }
				
				GM_setValue("pointTechnoUni"+uni+pseudo+Langue,parseInt(pointRecherche));} // enregistrement si  y'as des chose a enregistrer
	}



	/* ************************************************************PAGE BATIMENTS************************************************************************/
	if ((url.indexOf('/game/index.php?page=b_building',0))>=0) 
	{ 
		
	
		var tdnode = (document.getElementById('content')).getElementsByTagName('td');
		var temps=0; 
		
		var prixInitial = new Array(0.075,0.072,0.3,0.105,1.44,0.720,1600,0.7,2,3,4,0.8,150,41,60,80,80,8000);
		var exposant = new Array(1.5,1.6,1.5,1.5,1.8,2,2,2,2,2,2,2,2,2,2,2,2,2)
		var prix = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		var prod=0;
		var uni_Speed=1;
		

								if (speeduniX2.length>0) {
								for(var i=0 ; i<speeduniX2.length ; i++)
			  					{
									if (uni == speeduniX2[i])
											{uni_Speed=2}
									}
								}


								if (speeduniX5.length>0) {
								for(var i=0 ; i<speeduniX5.length ; i++)
			  					{
									if (uni == speeduniX2[i])
											{uni_Speed=5}
									}
								}
								
          //if an uni is listed in both speeduniX2 and speeduniX5 arrays, speed 5 overrides speed 2
          
    if (debug_points==true) {
		tr_evenements = (document.getElementById('content')).getElementsByTagName('tbody')[1];
    var tr_add1 = tr_evenements.appendChild(document.createElement('tr'));
		tr_add1.innerHTML='<td class="c" colspan="3">[<a name="pointdetails">'+Structure+'</a>] - [#'+(numeroplanete+1)+'] - (Speed: '+uni_Speed+'x in uni'+uni+'.'+Langue+')'+'</td>';
    var tr_add3 = tr_evenements.appendChild(document.createElement('tr'));
		var debug_bat='<td colspan="3"><table>';
		var debug_lines=0;
	  }
		
		for (var f=1; f<tdnode.length ; f++)
		{
			if(true)
			{
				for(var i =0 ; i< nom_bat.length ; i++)
				{
					if ((tdnode[f].innerHTML).indexOf(nom_bat[i]+'</a>',0)>=0)
					{	
						prix[i]=trouverInfo(0,prixInitial[i],exposant[i],"("+level,")");
						
						if (debug_points && prix[i]>0) {
							var value_formatted;
							if (prix[i]<1000) { value_formatted=(Math.round(prix[i]*10)/10).toString().replace(/\./,','); }
							else { value_formatted=addPoints(Math.round(prix[i])); }
						  debug_bat+='<tr><td>'+nom_bat[i]+'</td><td align="right"><b>'+value_formatted+'</b> '+Points+'</td></tr>';
						  debug_lines++;
						}


						
						if (i == 0)
						{
							// On recupere le temps de construction
							var sentence3 = construction_time;
							var sentence4 = "<br>";
							var pos3 = (tdnode[f].innerHTML).indexOf(sentence3,0);
							if(pos3>=0)
							{
								var pos4 = (tdnode[f].innerHTML).indexOf(sentence4,pos3+sentence3.length);
								temps = (tdnode[f].innerHTML).substring(pos3+sentence3.length+1,pos4-1);
								if ((tdnode[f].innerHTML).substr(pos4-1,1)==' ') { temps+=' '; }
							}										
						}
						
						
						if (i<3) 
						{ // Calcul de la production 
							var sentence1 = "("+level;
							var sentence2 = ")";
							
							var pos1 = (tdnode[f].innerHTML).indexOf(sentence1,10);
							if (pos1>=0) 
							{ 
								var pos2 = (tdnode[f].innerHTML).indexOf(sentence2,pos1+sentence1.length);
								var nombre = (tdnode[f].innerHTML).substring(pos1+sentence1.length,pos2);
								nombre = parseInt(nombre.replace(/\./g,'')); 
								if(isNaN(nombre)) nombre = 0;

								prod += Math.floor((3-i)*10*nombre*uni_Speed*Math.pow(1.1,nombre));
							}			
						}
					}		
				}
			}
		}
  // this part is supposed to detect Nanites level if robotics has been deconstructed. Let's hope it works (it definitely didn't before 1.3.9)
		if( detect_nanites && prix[5] < 736.56 && temps != 0 && prix[0] > 0 && prix[6] == 0) // Si les robot sont inferieur a 10 et y'a un temps de contruction pour le metal, on calcul le niveau de la nanite avec les temps de construction
		{	

			var JHMS= new Array();
			JHMS = temps.split(/[^\s\d]{1,4} /);
				
			var seconde = 0; 
			var minute = 0; 
			var heure = 0; 
			var jours = 0;
			
			seconde = JHMS[JHMS.length-1];
			if (seconde=='') { seconde='0'; }
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
				
				for(var i=0 ; i<speeduniX2.length ; i++)
				{
					if (uni == speeduniX2[i]) // si speeduni on baisse la nanite
						{niveauNanite--;}
				}
				for(var i=0 ; i<speeduniX5.length ; i++)
				{
					if (uni == speeduniX5[i])
					{
						niveauNanite = Math.round(Math.log(12500*(1+niveauBOT)*temps/PrixNivMetal)/Math.log(0.5));
					}
				}	
				prix[6]=1600*(Math.pow(2,niveauNanite)-1);
				
			  if (debug_points && prix[6]>0) {
					var value_formatted;
					if (prix[6]<1000) { value_formatted=(Math.round(prix[6]*10)/10); }
					else { value_formatted=addPoints(Math.round(prix[6])); }
					debug_bat+='<tr><td>detected: '+nom_bat[6]+'&nbsp;'+niveauNanite+'</td><td align="right"><b>'+value_formatted+'</b> '+Points+'</td><td> because Metal const time of '+jours+'d '+heure+'h '+minute+'m '+seconde+'s '+'</td></tr>';
					debug_lines++;
				}

				
			}
		}
		
		
		var prixMines=Math.round(prix[0]+prix[1]+prix[2]);
		
		var prixBatiment=0;
		for(var i =3 ; i< nom_bat.length ; i++)
			{prixBatiment+=prix[i];}
		prixBatiment=Math.round(prixBatiment);

   if (debug_points==true) {
     	var extra_line='';
   	  if (debug_lines==1) { extra_line='<tr><td></td><td></td></tr>'; }
      tr_add3.innerHTML=debug_bat+extra_line+'</table></td>';
      var tr_add2 = tr_evenements.appendChild(document.createElement('tr'));
			tr_add2.innerHTML='<td class="c" colspan="3">Total: '+Mines+': '+addPoints(prixMines)+' '+Points+' & '+Other_structure+': '+addPoints(prixBatiment)+' '+Points+'</td>';
		}



		ProdPlanete = GM_getValue("ProdPlanete"+uni+pseudo+Langue,'0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0').split(/;/);
		ProdPlanete[numeroplanete] = prod;
		GM_setValue("ProdPlanete"+uni+pseudo+Langue,ProdPlanete.join(";"));
		
		var BatPlanete = new Array(); // recuperation des données
		BatPlanete = GM_getValue("BatPlanete"+uni+pseudo+Langue,'0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0').split(/;/);
		BatPlanete[2*(numeroplanete+1)-1] = prixBatiment;
		BatPlanete[2*(numeroplanete+1)-2] = prixMines;
		GM_setValue("BatPlanete"+uni+pseudo+Langue,BatPlanete.join(";"));
	}

	/* *************************************** FLEET PAGE *************************** */
	//only detecting Solar Satellites, for now
	if ((url.indexOf('/game/index.php?page=flotten1',0))>=0) {
		var sats=0;
		var satlist = new Array();
		if (GetCookie("sats") == null) {
			for (var i=0 ; i < nombreplanetesetlunes ; i++) {
				satlist[i]=0;
			}
		} else {
			satlist=GetCookie("sats").split(',');
		  for (var i = satlist.length ; i < nombreplanetesetlunes ; i++) { satlist[i]=0; }
		}
		inputs = (document.getElementById('content')).getElementsByTagName("input");
		//fleetform = document.forms[(document.forms.length-1)];
		//inputs = fleetform.getElementsByTagName("input");
		for (var i = inputs.length-1 ; i>=0 ; i--) {
			if (inputs[i].name=="maxship212") {
				sats = inputs[i].getAttribute("value");
				var listeCouleur = new Array();
	      listeCouleur = option[0].split(/,/);
	      if (listeCouleur.length==5 || (listeCouleur.length==4 && BatTotal)) {
	      	inputs[i].parentNode.setAttribute("style","color:#"+listeCouleur[listeCouleur.length-2]+";");
	      }
				tr_evenements=((inputs[i].parentNode).parentNode).parentNode;
				break;
			}
		}
		satlist[numeroplanete]=sats;
		SetCookie("sats",satlist);
	}
	/* ***********************************************************************VUE GENERALE************************************************************************/
	if ((url.indexOf('/game/index.php?page=overview',0))>=0) 
	{ 
		var thnode = document.getElementsByTagName('th');
		var tdnode = document.getElementsByTagName('td');
		//var thnode = (document.getElementById('content')).getElementsByTagName('th');
		//var tdnode = (document.getElementById('content')).getElementsByTagName('td');
		if (Langue=='ba') {   //Because 'Server Time' field is too small to display it in one line in .ba
			var i = 0; if (thnode[i].getAttribute('colspan')=="4") { i++; }
			thnode[i].setAttribute('colspan','2');thnode[i+1].setAttribute('colspan','2');
		}
		
		var f=0; 
		/* ******************************Récuperation pseudo********************************/
		if (PlusieurSurMemeUni)
		{
			for (f=0 ; f<tdnode.length ; f++)
			{
				if ((tdnode[f].innerHTML).indexOf(">"+Planet,0)>=0)
				{
					var sentence1 = '(';
					var sentence2 = ")";
					var pos1 = (tdnode[f].innerHTML).indexOf(sentence1,0);
					if (pos1>=0)
					{
						var pos2 = (tdnode[f].innerHTML).indexOf(sentence2,pos1+sentence1.length);
						pseudo = (tdnode[f].innerHTML).substring(pos1+1,pos2);
						GM_setValue("pseudo"+uni+Langue,pseudo);
					}
				}
			}
		}
		
		/* ******************************Calculs des points********************************/
		var PointsMinesTotal=0;
		var PointsBatimentsTotal=0;
		var PointsDefTotal=0;
		
		var PointsMinesThis=0;
		var PointsBatimentsThis=0;
		var PointsDefThis=0;
		var PointsSatsThis=0;
		if(GetCookie("sats")!=null) {
			var satlist = GetCookie("sats").split(',');
		  var sats = parseInt(satlist[numeroplanete]);
      if (sats>0) { PointsSatsThis=Math.floor(sats*2.5); }
		}
		
		var PointsMines= new Array();
		var PointsBat= new Array();
		
		var BatPlanete = new Array();
		BatPlanete = GM_getValue("BatPlanete"+uni+pseudo+Langue,'0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0').split(/;/);
		
		var DefPlanete = new Array();
		DefPlanete = GM_getValue("DefPlanete"+uni+pseudo+Langue,'0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0').split(/;/);
		var pointLuneTotal = 0;

		for (var i = 0; i < nombreplanetesetlunes; i++) 
		{
			// to handle a single empty <option></option> tag as introduced by some ogs setting
				if (emptyOptions.length == 1 && emptyOptions[0] == i) { continue; } 

				PointsMinesTotal += parseInt(BatPlanete[2*i]);
				if (parseInt(BatPlanete[2*i]) == 0)
				{
					pointLuneTotal += parseInt(BatPlanete[2*i+1]);
				}
				if (i==numeroplanete) { PointsMinesThis=parseInt(BatPlanete[2*i]); } 
				

				PointsBatimentsTotal += parseInt(BatPlanete[2*i+1]);
				if (i==numeroplanete) { PointsBatimentsThis=parseInt(BatPlanete[2*i+1]); }
			
				PointsDefTotal += parseInt(DefPlanete[i]);
				if (i==numeroplanete) { PointsDefThis=parseInt(DefPlanete[i]); }
		}
		
		var PointsTotalThis=PointsMinesThis+PointsBatimentsThis+PointsDefThis+PointsSatsThis;
		
		var PointsTechno=GM_getValue("pointTechnoUni"+uni+pseudo+Langue,0);
		var temps=0; 

		var prixVaisseauxVol =0;
		var vaisseaux = new Array();
		
		/* ******************************Récuperation point total********************************/
		for (f=0 ; f<thnode.length ; f++)
		{
			if ((thnode[f].innerHTML).indexOf(rank,0)>=0)
			{
				var sentence1 = "";
				var sentence2 = " ("+rank;
				var pos1 = (thnode[f].innerHTML).indexOf(sentence1,0);
				if (pos1>=0)
				{
					var pos2 = (thnode[f].innerHTML).indexOf(sentence2,pos1+sentence1.length);
					var PointsTotal = (thnode[f].innerHTML).substring(pos1+0,pos2);
					PointsTotal=PointsTotal.replace(/\./g,'');
					
					var PointsFlotteTotal = PointsTotal-PointsTechno-PointsMinesTotal-PointsBatimentsTotal-PointsDefTotal;
				}
				//f is the ID of th with rank (I wanted to do something here but scrapped it)		
			}
			
			/* ******************************Calculs Point flotte en vol ********************************/
			if (((thnode[f].innerHTML).indexOf("return own",0)>=0 || (thnode[f].innerHTML).indexOf("flight owndeploy",0)>=0) && VaisseauxVol)
			{ // Comptage des points vaisseau en vol, en comptant les flottes sur le retour + les stationnés
				var sentence1 = "<b>";
				var sentence2 = "</b>";
				var pos1 = (thnode[f].innerHTML).indexOf(sentence1,0);
				if (pos1>=0)
				{
					var pos2 = (thnode[f].innerHTML).indexOf(sentence2,pos1+sentence1.length);
					var flottes = (thnode[f].innerHTML).substring(pos1+3,pos2);
					flottes = replace_cen(flottes,Langue);
					var vaisseaux = flottes.split(/<br>/);
					
					var prix_vaisseau = new Array(4,12,4,10,29,60,40,18,1,90,125,10000,85);
				
					for (var i=0 ; i<vaisseaux.length ; i++)
					{
						for(var j = 0 ; j<nom_flotte.length ; j++)
						{
							if (vaisseaux[i].indexOf(nom_flotte[j],0)==0)
								{prixVaisseauxVol += prix_vaisseau[j] * vaisseaux[i].replace(/\./g,'').replace(nom_flotte[j]+' ','');}
						}
					}
				}			
			}
		}
		
		/* ******************************Calcul Prod ********************************/
		var prod = 0;
		var prod_info = " ";
		// Use resource panel info if it's there
		var Planeten_Cookie="planetas";
		var Resource_Cookie="recursos";
		if (Langue=='de') { Planeten_Cookie="planeten"; Resource_Cookie="ressourcen"; }
		if(use_res_panel==true && GetCookie(Planeten_Cookie) != null) 
		 { 
	    var planeten_format = GetCookie(Planeten_Cookie);
	    planeten_format = planeten_format.split (",");
    	planeten_format= planeten_format.sort();
    	var planeten_format_final="";

	    for (var i=1; i<planeten_format.length; i++){
	    	planeten_format_final+='['+planeten_format[i]+'] ';
       }
	
      var planeten_ressourcen = GetCookie(Resource_Cookie);
      planeten_ressourcen = planeten_ressourcen.split (",");
      var planeten_ressourcen_metall=0;
      var planeten_ressourcen_kristall=0;
      var planeten_ressourcen_deuterium=0;
	
	// Suma de los recuros diarios de cada planeta
	for (var i=1; i<planeten_ressourcen.length; i++){
		if(i%3 == 1){
		planeten_ressourcen_metall=planeten_ressourcen_metall+parseInt(planeten_ressourcen[i]);
		}
		if(i%3 == 2){
		planeten_ressourcen_kristall=planeten_ressourcen_kristall+parseInt(planeten_ressourcen[i]);
		}
		if(i%3 == 0){
		planeten_ressourcen_deuterium=planeten_ressourcen_deuterium+parseInt(planeten_ressourcen[i]);
		}
	}
		  
	prod=Math.round((planeten_ressourcen_metall+planeten_ressourcen_kristall+planeten_ressourcen_deuterium)*24/1000);
	if (debug_points==true) {
		prod_info=' <span style="font-weight:lighter;"> &nbsp; (&nbsp;</span><span style="color:#FF8800;font-weight:lighter;">';
		prod_info+=(Math.round(planeten_ressourcen_metall*24/1000)>=1000) ? addPoints(Math.round(planeten_ressourcen_metall*24/1000)) : (Math.round(planeten_ressourcen_metall*24/100)/10).toString().replace(/\./,',') ;
		prod_info+='k</span><span style="color:#CCCCCC;font-weight:lighter;">+</span><span style="color:#55B4DD;font-weight:lighter;">';
		prod_info+=(Math.round(planeten_ressourcen_kristall*24/1000)>=1000) ? addPoints(Math.round(planeten_ressourcen_kristall*24/1000)) : (Math.round(planeten_ressourcen_kristall*24/100)/10).toString().replace(/\./,',') ;
		prod_info+='k</span><span style="color:#CCCCCC;font-weight:lighter;">+</span><span style="color:#99ABCC;font-weight:lighter;">';
		prod_info+=(Math.round(planeten_ressourcen_deuterium*24/1000)>=1000) ? addPoints(Math.round(planeten_ressourcen_deuterium*24/1000)) : (Math.round(planeten_ressourcen_deuterium*24/100)/10).toString().replace(/\./,',') ;
		prod_info+='k</span><span style="font-weight:lighter;">&nbsp;)</span>';
	}
		 }
		 else{
		
		ProdPlanete = GM_getValue("ProdPlanete"+uni+pseudo+Langue,'0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0').split(/;/);
		for (var i = 0; i < nombreplanetesetlunes; i++) 
		{
			prod+=parseInt(ProdPlanete[i]);
		}
		
		var prod_bonus = 1;
		if ((tdnode[23].innerHTML).indexOf("geologe_ikon.gif",0)>=0) { prod_bonus*=1.1; prod_info+="(Geologe: +10%)";}
		prod= Math.round(prod*24*prod_bonus/1000);
	}
		/* ******************************Récuperation des données de reférence********************************/
		date = new Date()+ '';
		
		var dates = new Array();
		dates = date.split(/ /);
		date = dates[1] +' '+dates[2];
		
		var PointRef = GM_getValue("PointRef"+uni+pseudo+Langue,PointsTotal+';'+date+';'+PointsMinesTotal+';'+PointsBatimentsTotal+';'+PointsTechno+';'+PointsFlotteTotal+';'+PointsDefTotal+';true').split(/;/);
			
		if(PointRef[7]== 'true') // Si y'avais rien d'enregistré on enregistre
		{
			GM_setValue("PointRef"+uni+pseudo+Langue,PointsTotal+';'+date+';'+PointsMinesTotal+';'+PointsBatimentsTotal+';'+PointsTechno+';'+PointsFlotteTotal+';'+PointsDefTotal+';false;'+PointsTotal+';'+Date.parse(new Date()) / 1000);
		}

		if (PointRef[9]==undefined)
		{
			PointRef[8] = PointsTotal;
			PointRef[9] = Date.parse(new Date()) / 1000;
			GM_setValue("PointRef"+uni+pseudo+Langue,PointRef.join(";"));
		}
		
		/* ****************************** BBCode + nb colone pour graphique ********************************/
		var BBcode=BBcode_debut+"[b][color=#ff0000]"+addPoints(PointsTotal)+"[/color][/b]\n";
		var nbAfficher=0;
		if(mine) 
		{
			nbAfficher++;
			BBcode+=BBcode_mine+"[b][color=#ff0000]"+addPoints(PointsMinesTotal)+"[/color][/b] ("+soit+" [b][color=#ff0000]"+pourcent(PointsMinesTotal)+"[/color][/b]%)\n";
		}
		if(AutreBat) 
		{
			nbAfficher++;
			BBcode+=BBcode_bat+"[b][color=#ff0000]"+addPoints(PointsBatimentsTotal)+"[/color][/b] ("+soit+" [b][color=#ff0000]"+pourcent(PointsBatimentsTotal)+"[/color][/b]%)\n";
		}
		if(BatTotal) 
		{
			nbAfficher++;
			BBcode+=BBcode_batT+"[b][color=#ff0000]"+addPoints(PointsMinesTotal+PointsBatimentsTotal)+"[/color][/b] ("+soit+" [b][color=#ff0000]"+pourcent(PointsMinesTotal+PointsBatimentsTotal)+"[/color][/b]%) \n";
		}
		
		BBcode+=BBcode_fin1+"[b][color=#ff0000]"+addPoints(PointsTechno)+"[/color][/b] ("+soit+" [b][color=#ff0000]"+pourcent(PointsTechno)+"[/color][/b]%)\n";;
		BBcode+=Bcode_fin2+"[b][color=#ff0000]"+addPoints(PointsFlotteTotal)+"[/color][/b] ("+soit+" [b][color=#ff0000]"+pourcent(PointsFlotteTotal)+"[/color][/b]%) \n";
		BBcode+=BBcode_fin3+="[b][color=#fF0000]"+addPoints(PointsDefTotal)+"[/color][/b] ("+soit+" [b][color=#ff0000]"+pourcent(PointsDefTotal)+"[/color][/b]%) \n\n";
		BBcode+=BBcode_fin4+="[b][color=#ff0000]"+addPoints(PointsMinesTotal+PointsBatimentsTotal+PointsTechno)+"[/color][/b] ("+soit+" [b][color=#ff0000]"+pourcent(PointsMinesTotal+PointsBatimentsTotal+PointsTechno)+"[/color][/b]%)";
		BBcode+=" "+BBcode_fin5;	
		BBcode+=BBcode_fin6+addPoints(Math.round((PointsTotal- PointRef[8])/((Date.parse(new Date())/1000-PointRef[9])/(3600*24))))+ ' '+Point_day+((PointRef[0]==PointRef[8]) ? ' '+Depuis+' '+PointRef[1] : '')+' \n';
		BBcode+="Uni: [b][color=#ff0000]"+ uni+"[/color][/b]."+Langue+"[/center][/quote]";
		
		if(techno) nbAfficher++;
		if(flottes) nbAfficher++;
		if(Def) nbAfficher++;
		if(indestructible) nbAfficher++;
		
		/* ****************************** options ********************************/
		var br = '';
		if (!sauterLignePourPourcentageFlotteVol)
			{br ='<br/>';}
		
		var flottesEnVol = '';
		if(VaisseauxVol && PointsFlotteTotal>0) 
			{flottesEnVol = ' '+br+(Math.round(prixVaisseauxVol/PointsFlotteTotal*1000)/10).toString().replace(/\./,',')+'% '+en_vol;}
			
		var affichePointLune ='';
		if (pointLune && AutreBat)
			{affichePointLune = ' '+br+(Math.round(pointLuneTotal/PointsBatimentsTotal*1000)/10).toString().replace(/\./,',')+'% '+sur_lune;}
		else if (pointLune && BatTotal)
			{affichePointLune = ' '+br+(Math.round(pointLuneTotal/(PointsMinesTotal+PointsBatimentsTotal)*1000)/10).toString().replace(/\./,',')+'% '+sur_lune;}
		
		/* ****************************** Etablissement des couleurs ********************************/
		
		
		/* BUNT */
	  var Bunt_mine='';
    var Bunt_autreBat= '';
		var Bunt_batTotal= '';
	  var Bunt_techno= '';
		var Bunt_flotte= '';
	  var Bunt_def= '';
	  var Bunt_endTag= '';
    var Bunt_char = '';



		var listeCouleur = new Array();
	  listeCouleur = option[0].split(/,/);
		
		if (listeCouleur.length==5) {
	  Bunt_mine='<span style="color: #'+listeCouleur[0]+'; font-weight:bolder;">';
    Bunt_autreBat= '<span style="color: #'+listeCouleur[1]+'; font-weight:bolder;">';
		Bunt_batTotal= '<span style="color: #'+listeCouleur[1]+'; font-weight:bolder;">';
	  Bunt_techno= '<span style="color: #'+listeCouleur[2]+'; font-weight:bolder;">';
		Bunt_flotte= '<span style="color: #'+listeCouleur[3]+'; font-weight:bolder;">';
	  Bunt_def= '<span style="color: #'+listeCouleur[4]+'; font-weight:bolder;">';
	  Bunt_endTag= '</span>';
    Bunt_char = '';
    if (BatTotal) { CouleurGraph = listeCouleur[1]+","+listeCouleur[2]+","+listeCouleur[3]+","+listeCouleur[4]; }
    
    }
	else if (BatTotal && listeCouleur.length == 4) {
 		Bunt_batTotal= '<span style="color: #'+listeCouleur[0]+'; font-weight:bolder;">'; 
	  Bunt_techno= '<span style="color: #'+listeCouleur[1]+'; font-weight:bolder;">';
	  Bunt_flotte= '<span style="color: #'+listeCouleur[2]+'; font-weight:bolder;">'; 
	  Bunt_def= '<span style="color: #'+listeCouleur[3]+'; font-weight:bolder;">';		
	  Bunt_endTag= '</span>';
	  Bunt_char = '';
	  }


		
		
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
	/* It doesn't make sense, you can't lose points in Tech at all, and not in Buildings unless you blow up Planets */ /*
			if(PointsMinesTotal>parseInt(PointRef[2])+1) 			{Color_mine= 'style="color: #00FF00;"';}
			else if (PointsMinesTotal<parseInt(PointRef[2]) -1) 	{Color_mine= 'style="color: #FF0000;"';}
			
			if( PointsBatimentsTotal>parseInt(PointRef[3])+1) 		{Color_autreBat= 'style="color: #00FF00;"';}
			else if (PointsBatimentsTotal<parseInt(PointRef[3])-1) 	{Color_autreBat= 'style="color: #FF0000;"';}
			
			if((PointsMinesTotal+PointsBatimentsTotal)>(parseInt(PointRef[2])+parseInt(PointRef[3])+1)) 			{Color_batTotal= 'style="color: #00FF00;"';}
			else if ((PointsMinesTotal+PointsBatimentsTotal)<(parseInt(PointRef[2])+parseInt(PointRef[3])) -1)  	{Color_batTotal= 'style="color: #FF0000;"';}
			
			if( PointsTechno>parseInt(PointRef[4])+1) 			{Color_techno= 'style="color: #00FF00;"';}
			else if (PointsTechno<parseInt(PointRef[4]) -1) 		{Color_techno= 'style="color: #FF0000;"';}
	*/
			if( PointsFlotteTotal>parseInt(PointRef[5])+1) 		{Color_flotte= 'style="color: #00FF00;"';}
			else if (PointsFlotteTotal<parseInt(PointRef[5]) -1) 	{Color_flotte= 'style="color: #FF0000;"';}
			
			if( PointsDefTotal>parseInt(PointRef[6])+1)			{Color_def= 'style="color: #00FF00;"';}
			else if (PointsDefTotal<parseInt(PointRef[6]) -1) 		{Color_def= 'style="color: #FF0000;"';}
	/* Indestrucable points only go up .. so useless
			if((PointsMinesTotal+PointsBatimentsTotal+PointsTechno)>(parseInt(PointRef[2])+parseInt(PointRef[3])+parseInt(PointRef[4])+1)) 			{Color_indestr= 'style="color: #00FF00;"';}
			else if((PointsMinesTotal+PointsBatimentsTotal+PointsTechno)<(parseInt(PointRef[2])+parseInt(PointRef[3])+parseInt(PointRef[4]) -1)) 	{Color_indestr= 'style="color: #FF0000;"';}
	*/
			if( PointsTotal>parseInt(PointRef[0])+1) 				{Color_prog= 'style="color: #00FF00;"';}
			else if (PointsTotal<parseInt(PointRef[0]) -1) 		{Color_prog= 'style="color: #FF0000;"';}
		}	
		
		//Info about the current planet
		var this_info='';
		var bunt_weight=(show_this_planet_pie==true) ? 'normal' : 'bolder' ;

		if(Bunt_techno!='' && (PointsTotalThis-PointsSatsThis)!=0) {
			if(debug_points==true) {
			if(BatTotal) {
				this_info=((PointsMinesThis+PointsBatimentsThis) > 0) ? Bunt_batTotal.replace(/bolder/,bunt_weight)+addPoints(PointsMinesThis+PointsBatimentsThis)+Bunt_endTag : '';
				this_info+=((PointsMinesThis+PointsBatimentsThis) > 0 && PointsDefThis > 0) ? '<span style="color:#CCCCCC;font-weight:lighter;">+</span>' : '';
			} else {
				this_info=(PointsMinesThis > 0) ? Bunt_mine.replace(/bolder/,bunt_weight)+addPoints(PointsMinesThis)+Bunt_endTag : '';
				this_info+=(PointsMinesThis > 0 && (PointsBatimentsThis+PointsDefThis+PointsSatsThis) > 0) ? '<span style="color:#CCCCCC;font-weight:lighter;">+</span>' : '';
				this_info+=(PointsBatimentsThis > 0) ? Bunt_autreBat.replace(/bolder/,bunt_weight)+addPoints(PointsBatimentsThis)+Bunt_endTag : '';
				this_info+=(PointsBatimentsThis > 0 && (PointsDefThis+PointsSatsThis) > 0) ? '<span style="color:#CCCCCC;font-weight:lighter;">+</span>' : '';
			}
			this_info+=(PointsSatsThis > 0) ? Bunt_flotte.replace(/bolder/,bunt_weight)+((PointsSatsThis < 100) ? PointsSatsThis : addPoints(Math.round(PointsSatsThis)) )+Bunt_endTag : '';
			this_info+=(PointsSatsThis > 0 && PointsDefThis) ? '<span style="color:#CCCCCC;font-weight:lighter;">+</span>' : '';
			this_info+=(PointsDefThis > 0) ? Bunt_def.replace(/bolder/,bunt_weight)+addPoints(PointsDefThis)+Bunt_endTag : '';
		  }
		  this_info+=(show_this_planet_pie==true || this_info.indexOf('+')==-1) ? '' : ' = ';
		  this_info+=(show_this_planet_pie==true) ? this_planet_pie() : '' ;
			this_info+=(show_this_planet_pie==true || this_info.indexOf('+')!=-1 || debug_points==false) ? addPoints(PointsTotalThis) : '';
			this_info+='&nbsp;'+Points+' (&nbsp;'+pourcent(PointsTotalThis).toString().replace(/\./,',')+'%&nbsp;)';
		} else this_info=addPoints(PointsTotalThis)+'&nbsp;'+Points+' (&nbsp;'+pourcent(PointsTotalThis)+'%&nbsp;)';
		
		
		
		//Fleet Calculation Table
		var FleetCalc;
		var fclink=true;
		FleetCalc ='<td id="fct" colspan="4" style="display:none"><table>';
		for (var i = 0; i < nombreplanetesetlunes; i++)
		{		
			  // to handle a single empty <option></option> tag as introduced by some ogs setting
				if (emptyOptions.length == 1 && emptyOptions[0] == i) { continue; } 

			if(i!=numeroplanete && PlanetIDs[i] == undefined) { fclink=false; }
			FleetCalc+='<tr>';
			FleetCalc+='<td>'+((fclink) ? '<a href="'+link_start+'index.php?page=overview&session='+session+'&cp='+PlanetIDs[i]+'" style="font-weight:normal;">' : '')+'[#'+(i+1)+'] - ['+PlanetCoords[i]+']'+((fclink) ? '</a>' : '')+'</td>';
			FleetCalc+='<td style="text-align:right;">'+((fclink) ? '<a href="'+link_start+'index.php?page=b_building&session='+session+((i==numeroplanete) ? '' : '&cp='+PlanetIDs[i])+'#pointdetails">' : '')+Bunt_mine.replace(/bolder/,'normal')+BatPlanete[2*i]+Bunt_endTag+((fclink) ? '</a>' : '')+'</td>';
			FleetCalc+='<td style="text-align:right;">'+((fclink) ? '<a href="'+link_start+'index.php?page=b_building&session='+session+((i==numeroplanete) ? '' : '&cp='+PlanetIDs[i])+'#pointdetails">' : '')+Bunt_autreBat.replace(/bolder/,'normal')+BatPlanete[2*i+1]+Bunt_endTag+((fclink) ? '</a>' : '')+'</td>';
			FleetCalc+='<td style="text-align:right;">'+((fclink) ? '<a href="'+link_start+'index.php?page=buildings&session='+session+((i==numeroplanete) ? '' : '&cp='+PlanetIDs[i])+'&mode=Verteidigung#pointdetails">' : '')+Bunt_def.replace(/bolder/,'normal')+DefPlanete[i]+Bunt_endTag+((fclink) ? '</a>' : '')+'</td>';
			if(i==0) { FleetCalc+='<td class="c" rowspan="'+nombreplanetesetlunes+'"></td>' }
			if (satlist==undefined) { var sats = 0; }
			else { var sats = parseInt(satlist[i]); }
			var PointsSatsCurrent=0;
      if (sats>0) { PointsSatsCurrent=Math.floor(sats*2.5); }
			var PointsTotalCurrent=parseInt(BatPlanete[2*i])+parseInt(BatPlanete[2*i+1])+parseInt(DefPlanete[i])+PointsSatsCurrent;
			var PercentCurrent=pourcent(PointsTotalCurrent).toString().replace(/\./,',')+'%';
			if (PointsSatsCurrent==0) { FleetCalc+='<td style="text-align:right;">(</td>'; }
			else { FleetCalc+='<td style="text-align:right;">'+Bunt_flotte.replace(/bolder/,'normal')+PointsSatsCurrent+Bunt_endTag+' (</td>'; }
			FleetCalc+='<td style="text-align:right;">'+PercentCurrent+'&nbsp;)</td>';
			FleetCalc+='</tr>';
			fclink=true;
		}
		
		if(nombreplanetesetlunes > 1) {
		FleetCalc+='<tr><td></td><td class="c" colspan="3"></td></tr>';
		FleetCalc+='<tr>';
		FleetCalc+='<td style="text-align:right;">[totals]</td>';
		FleetCalc+='<td style="text-align:right;">'+Bunt_mine.replace(/bolder/,'normal')+PointsMinesTotal+Bunt_endTag+'</td>';
		FleetCalc+='<td style="text-align:right;">'+Bunt_autreBat.replace(/bolder/,'normal')+PointsBatimentsTotal+Bunt_endTag+'</td>';
		FleetCalc+='<td style="text-align:right;">'+Bunt_def.replace(/bolder/,'normal')+PointsDefTotal+Bunt_endTag+'</td>';
		FleetCalc+='</tr>';
		}

		FleetCalc+='<tr>'+'<td style="text-align:right;">[tech]</td>'+'<td colspan="2" style="text-align:right;">'+'<a href="'+link_start+'index.php?page=buildings&session='+session+'&mode=Forschung#pointdetails">'+Bunt_techno.replace(/bolder/,'normal')+PointsTechno+Bunt_endTag+'</a>'+'</td>'+'</tr>';
		FleetCalc+='<tr>'+'<td class="c" colspan="5" style="text-align:center; white-space:nowrap;">&Sigma; = '+(PointsTechno+PointsMinesTotal+PointsBatimentsTotal+PointsDefTotal)+'</td>'+'</tr>';
		FleetCalc+='<tr>'+'<td style="text-align:right;">[rest]</td>'+'<td colspan="6"  style="text-align:center; white-space:nowrap;">'+PointsTotal+' - '+(PointsTechno+PointsMinesTotal+PointsBatimentsTotal+PointsDefTotal)+' = '+Bunt_flotte.replace(/bolder/,'normal')+(PointsTotal-PointsTechno-PointsMinesTotal-PointsBatimentsTotal-PointsDefTotal)+Bunt_endTag+'</td>'+'</tr>';
		FleetCalc+='</table></td>';
		
		
		/* ****************************** Affichage ********************************/
		tr_evenements = (document.getElementById('content')).getElementsByTagName('tbody')[0];
		var tr_this = tr_evenements.appendChild(document.createElement('tr'));
		tr_this.innerHTML = '<th>'+this_Planet+'</th><th colspan="3">'+this_info+'</th>';
		var tr1 = tr_evenements.appendChild(document.createElement('tr'));
		tr1.innerHTML = '<td class="c" colspan="4" width="96%">'+Pointdetails+': </td><td style="background-color:transparent;"><a TITLE="'+AffBBcode+'";><img id="copybbcode" style="margin-left:-20px; position:relative;" src="data:image/gif;base64,R0lGODlhEAAQAPUAAChsKDA8EdrtwXvEApjWAYnNAur13EZRKoPJAidsJ8PjmJPTAcTxAIzDSJ3ZAbjJmqPdAZPKTJrVGozMHKfgAbvsALXoAHWRCXTAAqviAa/YepnMRFxlQ73hipSahLrgfJTQJ6ncN63If7PbfKPYOMHhl7HmALbch5+lkXS2BIekB4mtBni3BJTLRGu6AnmTCYzHPpS2Sc7t3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADIALAAAAAAQABAAAAaOQJlwSCwaE4Bk0igERAzQaARQBDQE2Cy2kSA2FJ3OY1xSmGFDp2b0EXk8qI/m1KLKAK4BiBQKxTgcIAMYdgAYKQEBB4sHiQgDhQMsiZSUBQiRBQsEGSYqiQQFkE0IBQQQK5QUDguYQxOmEBcXLwyrBRNEABsLDhUMwBALG3ZpEpwWFRYEEsVFSEpdTNNFQQA7"/></a></td>';
		// On rajoute la zone de texte, mais invisible :
		var tr_zone_txt_invis = tr_evenements.appendChild(document.createElement('tr'));
		tr_zone_txt_invis.setAttribute('id', 'zonecode');
		tr_zone_txt_invis.setAttribute('style', 'display:none;');
		tr_zone_txt_invis.innerHTML='<td colspan="4" width="96%"><textarea cols="20" onClick="javascript:this.select();">'+BBcode+'</textarea></td>';

		if(mine)
		{
			var add_plus = ''; if ((PointsMinesTotal-parseInt(PointRef[2])) > 0) { add_plus='+'; }
			var tr_mine = tr_evenements.appendChild(document.createElement('tr'));
			tr_mine.innerHTML='<th width="60px" colspan="1">'+Mines+'</th><th colspan=\"2\" >'+Bunt_mine+Bunt_char+Bunt_endTag+'<a '+Color_mine+' TITLE="'+add_plus+addPoints(Math.round(PointsMinesTotal-parseInt(PointRef[2])))+' '+Points+' ( '+add_plus+pourcent2(PointsMinesTotal-parseInt(PointRef[2]),PointsMinesTotal).toString().replace(/\./,',')+'% )";>'+addPoints(PointsMinesTotal)+'</a> '+Bunt_mine+'('+Bunt_endTag+'&nbsp;'+pourcent(PointsMinesTotal).toString().replace(/\./,',')+'%&nbsp;'+Bunt_mine+') '+Bunt_char+Bunt_endTag+'</th><th id="piebox" rowspan="'+nbAfficher+'"></th>';
		}
		if(AutreBat)
		{
			var add_plus = ''; if ((PointsBatimentsTotal-parseInt(PointRef[3])) > 0) { add_plus='+'; }
			var tr_AutreBat = tr_evenements.appendChild(document.createElement('tr'));
			tr_AutreBat.innerHTML='<th width="60px" colspan="1">'+Other_structure+'</th><th colspan=\"2\" >'+Bunt_autreBat+Bunt_char+Bunt_endTag+'<a '+Color_autreBat+' TITLE="'+add_plus+addPoints(Math.round(PointsBatimentsTotal-parseInt(PointRef[3])))+' '+Points+'  ( '+add_plus+pourcent2(PointsBatimentsTotal-parseInt(PointRef[3]),PointsBatimentsTotal).toString().replace(/\./,',')+'% )";>'+addPoints(PointsBatimentsTotal)+'</a> '+Bunt_autreBat+'('+Bunt_endTag+'&nbsp;'+pourcent(PointsBatimentsTotal).toString().replace(/\./,',')+'%&nbsp;'+Bunt_autreBat+')  '+Bunt_char+Bunt_endTag+affichePointLune+'</th>';
		}
		if(BatTotal)
		{
			var add_plus = ''; if (((PointsMinesTotal+PointsBatimentsTotal)-(parseInt(PointRef[2])+parseInt(PointRef[3]))) > 0) { add_plus='+'; }			
			var tr_BatTotal = tr_evenements.appendChild(document.createElement('tr'));
			tr_BatTotal.innerHTML='<th width="60px" colspan="1">'+Structure+'</th><th colspan=\"2\" >'+Bunt_batTotal+Bunt_char+Bunt_endTag+'<a '+Color_batTotal+' TITLE="'+add_plus+addPoints(Math.round((PointsMinesTotal+PointsBatimentsTotal)-(parseInt(PointRef[2])+parseInt(PointRef[3]))))+' '+Points+' ( '+add_plus+pourcent2((PointsMinesTotal+PointsBatimentsTotal)-(parseInt(PointRef[2])+parseInt(PointRef[3])),PointsMinesTotal+PointsBatimentsTotal).toString().replace(/\./,',')+' )";>'+addPoints(PointsMinesTotal+PointsBatimentsTotal)+'</a> '+Bunt_batTotal+'('+Bunt_endTag+'&nbsp;'+pourcent(PointsMinesTotal+PointsBatimentsTotal).toString().replace(/\./,',')+'%&nbsp;'+Bunt_batTotal+')  '+Bunt_char+Bunt_endTag+affichePointLune+' </th><th id="piebox" rowspan="'+nbAfficher+'"></th>';
		}
		if(techno)
		{
			var add_plus = ''; if ((PointsTechno-parseInt(PointRef[4])) > 0) { add_plus='+'; }
			var tr_techno = tr_evenements.appendChild(document.createElement('tr'));
			tr_techno.innerHTML='<th width="60px" colspan="1"><a href="'+link_start+'index.php?page=statistics&session='+session+'&who=player&type=research&start=-1&sort_per_member=0">'+Technology+'</a></th><th colspan=\"2\" >'+Bunt_techno+Bunt_char+Bunt_endTag+'<a '+Color_techno+' TITLE="'+add_plus+addPoints(Math.round(PointsTechno-parseInt(PointRef[4])))+' '+Points+' ( '+add_plus+pourcent2(PointsTechno-parseInt(PointRef[4]),PointsTechno).toString().replace(/\./,',')+'% )";>'+addPoints(PointsTechno)+'</a> '+Bunt_techno+'('+Bunt_endTag+'&nbsp;'+pourcent(PointsTechno).toString().replace(/\./,',')+'%&nbsp;'+Bunt_techno+') '+Bunt_char+Bunt_endTag+'</th>';
		}
		if(flottes)
		{
			var add_plus = ''; if ((PointsFlotteTotal-parseInt(PointRef[5])) > 0) { add_plus='+'; }
			var tr_flottes = tr_evenements.appendChild(document.createElement('tr'));
			tr_flottes.innerHTML='<th width="60px" colspan="1"><a href="'+link_start+'index.php?page=statistics&session='+session+'&who=player&type=fleet&start=-1&sort_per_member=0">'+Fleet+'</a></th><th id="fleetpoints" colspan=\"2\">'+Bunt_flotte+Bunt_char+Bunt_endTag+'<a '+Color_flotte+' TITLE="'+add_plus+addPoints(Math.round(PointsFlotteTotal-parseInt(PointRef[5])))+' '+Points+' ( '+add_plus+pourcent2(PointsFlotteTotal-parseInt(PointRef[5]),PointsFlotteTotal).toString().replace(/\./,',')+'% )";>'+addPoints(PointsFlotteTotal) + '</a> '+Bunt_flotte+'('+Bunt_endTag+'&nbsp;'+pourcent(PointsFlotteTotal).toString().replace(/\./,',')+'%&nbsp;'+Bunt_flotte+') '+Bunt_char+Bunt_endTag+flottesEnVol+'</th>';
		}
		if(Def)
		{
			var add_plus = ''; if ((PointsDefTotal-parseInt(PointRef[6])) > 0) { add_plus='+'; }
			var tr_Def = tr_evenements.appendChild(document.createElement('tr'));
			tr_Def.innerHTML='<th width="60px" colspan="1">'+Defense+'</th><th colspan=\"2\" >'+Bunt_def+Bunt_char+Bunt_endTag+'<a '+Color_def+' TITLE="'+add_plus+addPoints(Math.round(PointsDefTotal-parseInt(PointRef[6])))+' '+Points+' ( '+add_plus+pourcent2(PointsDefTotal-parseInt(PointRef[6]),PointsDefTotal).toString().replace(/\./,',')+'% )";>'+addPoints(PointsDefTotal)+'</a> '+Bunt_def+'('+Bunt_endTag+' '+pourcent(PointsDefTotal).toString().replace(/\./,',')+'% '+Bunt_def+') '+Bunt_char+Bunt_endTag+'</th>';
		}
		if(indestructible)
		{
			var indesPoints = PointsMinesTotal+PointsBatimentsTotal-pointLuneTotal+PointsTechno;
			var add_plus = ''; if (((indesPoints)-(parseInt(PointRef[2])+parseInt(PointRef[3])+parseInt(PointRef[4]))) > 0) { add_plus='+'; }
			var tr_indestructible = tr_evenements.appendChild(document.createElement('tr'));
			tr_indestructible.innerHTML='<th width="60px" colspan="1">'+Indestructible+'</th><th colspan=\"2\" ><a '+Color_indestr+' TITLE="'+add_plus+addPoints(Math.round((indesPoints)-(parseInt(PointRef[2])+parseInt(PointRef[3])+parseInt(PointRef[4]))))+' '+Points+' ( '+add_plus+pourcent2((indesPoints)-(parseInt(PointRef[2])+parseInt(PointRef[3])+parseInt(PointRef[4])),indesPoints).toString().replace(/\./,',')+'% )";>'+addPoints(indesPoints)+'</a> (&nbsp;'+pourcent(indesPoints).toString().replace(/\./,',')+'%&nbsp;) </th>';
		}

		if (progression)
		{		
			var perday = (ProgJours) ? ' <span style="color: gray;">||</span> <span '+Color_prog+'>'+addPoints(Math.round((PointsTotal- PointRef[8])/((Date.parse(new Date())/1000-PointRef[9])/(3600*24))))+ '</span>&nbsp;'+Point_day : '';
			var tr_progression = tr_evenements.appendChild(document.createElement('tr'));
			tr_progression.innerHTML = '<th width="60px" colspan="1" >'+Progression+'</th><th colspan=\"3\" ><a '+Color_prog+' TITLE="";>'+addPoints(Math.round(PointsTotal-parseInt(PointRef[0])))+'</a>&nbsp;'+Points+' ('+soit+'&nbsp;' +(Math.round((PointsTotal-PointRef[0])/PointRef[0]*1000)/10).toString().replace(/\./,',') +'%) '+Depuis+' '+PointRef[1]+perday+'</th><td style="background-color:transparent;"><a TITLE="'+restart+'";><img id="pointRef" style="margin-left:-20px; position:relative;" src="data:image/gif;base64,R0lGODlhEAAQAPUAAChsKDA8EdrtwXvEApjWAYnNAur13EZRKoPJAidsJ8PjmJPTAcTxAIzDSJ3ZAbjJmqPdAZPKTJrVGozMHKfgAbvsALXoAHWRCXTAAqviAa/YepnMRFxlQ73hipSahLrgfJTQJ6ncN63If7PbfKPYOMHhl7HmALbch5+lkXS2BIekB4mtBni3BJTLRGu6AnmTCYzHPpS2Sc7t3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADIALAAAAAAQABAAAAaOQJlwSCwaE4Bk0igERAzQaARQBDQE2Cy2kSA2FJ3OY1xSmGFDp2b0EXk8qI/m1KLKAK4BiBQKxTgcIAMYdgAYKQEBB4sHiQgDhQMsiZSUBQiRBQsEGSYqiQQFkE0IBQQQK5QUDguYQxOmEBcXLwyrBRNEABsLDhUMwBALG3ZpEpwWFRYEEsVFSEpdTNNFQQA7"/></a></td>';	
		} else
		
		if (ProgJours)
		{		
			var tr_ProgJours = tr_evenements.appendChild(document.createElement('tr'));
			tr_ProgJours.innerHTML = '<th width="60px" colspan="1" >'+Moyenne+'</th><th colspan=\"3\" ><span '+Color_prog+'>'+addPoints(Math.round((PointsTotal- PointRef[8])/((Date.parse(new Date())/1000-PointRef[9])/(3600*24))))+ '</span> '+Point_day+'</td>';	
		}
		if (ProdJours)
		{		
			var tr_ProdJours = tr_evenements.appendChild(document.createElement('tr'));
			tr_ProdJours.innerHTML = '<th width="60px" colspan="1" >'+Production+'</th><th colspan=\"3\" >'+addPoints(Math.round(prod))+ ' '+Point_day+prod_info+'</td>';	
		}
		
		if (update)
		{
			var tr_update = tr_evenements.appendChild(document.createElement('tr'));
			tr_update.innerHTML = '<th colspan="1"><a href="http://userscripts.org/scripts/source/38916.user.js" style="color:#FF0000;">Update!</a></th><th colspan="3">New InfoCompte version <a href="http://userscripts.org/scripts/show/38916" style="color:#00FF00;" target="_blank">'+new_version+'</a> available. [<a href="http://userscripts.org/scripts/source/38916.user.js" style="color:#FF0000;">direct link</a>]</th>';
		}
		if (debug_points==true)
		{
			var tr_fct = tr_evenements.appendChild(document.createElement('tr'));
			tr_fct.innerHTML = FleetCalc;
		}
		
		/* ****************************** Affichage du graphique ********************************/
		if (mine)
			{var pie = draw_pie([pourcent(PointsMinesTotal),pourcent(PointsBatimentsTotal),pourcent(PointsTechno),pourcent(Math.max(PointsFlotteTotal,0)),pourcent(PointsDefTotal)]);}
		else if(BatTotal)
			{var pie = draw_pie([pourcent(PointsMinesTotal+PointsBatimentsTotal),pourcent(PointsTechno),pourcent(Math.min(PointsFlotteTotal,0)),pourcent(PointsDefTotal)]);}
		var piebox = document.getElementById('piebox');		
		piebox.appendChild(pie);
		
		/* ****************************** BBcode ouvrant/fermant ********************************/
		var imgbbcode=document.getElementById("copybbcode");
		imgbbcode.addEventListener("click", function(event) 
		{
			var cellule = document.getElementById('zonecode');
			if (cellule.style.display == 'none') 
				{cellule.style.display = '';}
			else 
				{cellule.style.display = 'none';}
		}, true);
		
		//Fleet calc
	  var fctable = document.getElementById("fct");
		var fleetlink=document.getElementById("fleetpoints");
		fleetlink.addEventListener("click", function(event) 
		{
			if (fctable.style.display == 'none') 
				{fctable.style.display = '';}
			else 
				{fctable.style.display = 'none';}
		}, true);		
		
		/* ****************************** RaZ progression ********************************/
		document.getElementById("pointRef").addEventListener("click", function(event) 
		{
			if(confirm(Avertissement)) 
			{	
				// 2 new lines: reset counter for average progress too. Makes more sense to me than keeping
				// the value from the first day you installed, or even the first day you played in an uni.
				PointRef[8] = PointsTotal;
				PointRef[9] = Date.parse(new Date()) / 1000;
				GM_setValue("PointRef"+uni+pseudo+Langue,PointsTotal+';'+date+';'+PointsMinesTotal+';'+PointsBatimentsTotal+';'+PointsTechno+';'+PointsFlotteTotal+';'+PointsDefTotal+';false;'+PointRef[8]+';'+PointRef[9]);
			}	
		}, true);
	}
}

if (debug_points==true) {
var end_time = new Date();
var ic_runtime = end_time.getTime() - start_time.getTime();
if (typeof tr_evenements == 'object')
 { 
	var tr_add_runtime = tr_evenements.appendChild(document.createElement('tr'));
	tr_add_runtime.innerHTML='<td colspan="2">Runtime: '+ic_runtime+'ms</td>';
	if (PIDerror.indexOf('FF0000') != -1) // display only if there's some red text (critical errors)
	{
		document.getElementById("fct").style.display = '';
		var sometext='The script encountered an error,<BR/> please paste this text to the forums ';
		sometext+='<a href="http://userscripts.org/scripts/discuss/38916">here</a><BR/>or to the respective threads on the ';
		sometext+='<a href="http://board.ogame.de/thread.php?threadid=683287">german</a> or ';
		sometext+='<a href="http://board.ogame.org/thread.php?threadid=491786">english</a> ogame boards, thank you.';
		var tr_selectnode = tr_evenements.appendChild(document.createElement('tr'));
		tr_selectnode.innerHTML = '<td colspan="4">'+sometext+'<BR/>'+PIDerror+selectnode[0].innerHTML.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</td>';
	}
 } 
}