// ==UserScript==
// @name        Res Übersicht
// @namespace   hnot
// @include     http://*.ogame.*/game/index.php?*page=*
// @version     0.5.1
// @updateURL      http://userscripts.org/scripts/source/165940.meta.js
// @downloadURL    https://userscripts.org/scripts/source/165940.user.js
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_deleteValue
// @grant		GM_log
// @grant		GM_getResourceURL
// ==/UserScript==

if (document.getElementById('playerName'))
		{
		
var FireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1;
		var Skriptname  = FireFox? '' : 'Resuebersicht';
		var IsMoon   = document.getElementsByName('ogame-planet-type')[0].content == 'moon' ;
			var spielername   = document.getElementsByName('ogame-player-name')[0].content;
			var spielerid = document.getElementsByName('ogame-player-id')[0].content;
			var server  = document.getElementsByName('ogame-universe')[0].content;
			
			var server_split = server.split('.');
			var domain   = '.'+ server_split[1]+"."+server_split[2];
			
			if( server_split.length == 4 )
			{
				domain += "."+server_split[3];
			}
			
			planeten_temp=document.getElementById("planetList").innerHtml;
			
			
			var Uni = document.getElementsByTagName('title')[0].innerHTML;	
			var numeroplanete = 0;
			var nbLune = 0;
			
			//var Koordinaten = document.getElementsByClassName('planet-koords')[0].innerHTML ;
			if (IsMoon) {
			var Koordinaten=document.getElementsByName('ogame-planet-coordinates')[0].content+":m" ;
			} else {
			var Koordinaten=document.getElementsByName('ogame-planet-coordinates')[0].content ;
			}
			var idPlanete = new Array();// = */GM_getValue(nomScript+'idPlanet'+IdJoueur+serveur , GM_getValue(nomScript+'idPlanet'+pseudo+serveur , 'a;')).split(';');
			
			var listeId = '';
			var nbPlanet=1;
			
			var planets = document.getElementById("rechts").getElementsByClassName("smallplanet");
			var Lune = new Array();
			var planeten = new Array();
			var planetennamen= new Array();
			var planetenanzahl=planets.length;
			
					{
				numeroplanete=-1;
				nbPlanet = 0;
				var testlabelPlanet = 'planetlink active';;
				var testlabelLune = 'moonlink active';
				
				var f=0;
				for ( var i=0; i<planets.length ; i++)
				{	
				planeten[f] = document.getElementsByClassName('planet-koords')[i].innerHTML.replace("[","").replace("]","");
				planetennamen[f] = document.getElementsByClassName('planet-name')[i].innerHTML.replace("[","").replace("]","");
				if (planets[i].innerHTML.indexOf('class="icon-moon"') > 0) 
				{
				f++;
				planeten[f] = document.getElementsByClassName('planet-koords')[i].innerHTML.replace("[","").replace("]","")+":m";
				planetennamen[f] = document.getElementsByClassName('planet-name')[i].innerHTML.replace("[","").replace("]","");
				}
				f++;
				}
				
				
			}
			
			
			
			var met=document.getElementById('resources_metal').innerHTML;
			met=met.replace (/^\s+/, '').replace (/\s+$/, '').replace ('.', '');
			met=met.replace ('.', '');
			var kris=document.getElementById('resources_crystal').innerHTML;
			kris=kris.replace (/^\s+/, '').replace (/\s+$/, '').replace ('.', '');
			kris=kris.replace ('.', '');
			var deut=document.getElementById('resources_deuterium').innerHTML;
			deut=deut.replace (/^\s+/, '').replace (/\s+$/, '').replace ('.', '');
			deut=deut.replace ('.', '');
			
			GM_setValue(Skriptname+"_"+server+"_"+Koordinaten+"_"+"Ressourcen", met+"|"+kris+"|"+deut);
			
			
			
			
			
			var res;
			var ResDiv = document.createElement('div');
ResDiv.id = 'ResDiv';

var innerhtml='<div class="ago_panel_tab" ago-data="{"tab":"Res","type":"toggle"}">Res &Uuml;bersicht</div><div class="ago_panel_tab_content">';

//var innerhtml='<div class="ago_panel_section_header">Res &Uuml;bersicht</div><div class="ago_panel_section_content">';
innerhtml +='<table>';
var Res_gesamt = new Array(0,0,0);
for (var i = 0; i < f; i++) {
innerhtml +='<tr><td width="100%" colspan=3" style="text-align:center;"><br />';
innerhtml+=planetennamen[i] +" - "+planeten[i];
var res_temp=GM_getValue(Skriptname+"_"+server+"_"+planeten[i]+"_"+"Ressourcen", met+"|"+kris+"|"+deut);
res_temp = res_temp.split("|");
for (var z = 0; z < 3; z++) {
Res_gesamt[z]=parseInt(Res_gesamt[z])+parseInt(res_temp[z]);
if (res_temp[z]>1000000) {
res_temp[z]=Math.round(res_temp[z] / 10000)/100+"M";
}
else if (res_temp[z]>1000) {
res_temp[z]=Math.round(res_temp[z] / 1000)+"K";
}
res=res_temp.join('</td><td width="33%">');

}



innerhtml +='</td></tr><tr><td width="33%">'+res;
innerhtml +='</td></tr>';
}
for (var z = 0; z < 3; z++) {
if (Res_gesamt[z]>1000000) {
Res_gesamt[z]=Math.round(Res_gesamt[z] / 10000)/100+"M";
}
else if (Res_gesamt[z]>1000) {
Res_gesamt[z]=Math.round(Res_gesamt[z] / 1000)+"K";
}
}
Res_gesamt=Res_gesamt.join('</td><td width="33%">');
innerhtml +='<tr><td width="33%"></td><td width="33%"><br />Gesamt:</td><td width="33%"></td></tr><tr><td width="33%">'+Res_gesamt;
innerhtml +='</td></tr>';
innerhtml +='</table>';
innerhtml +='</div>';
ResDiv.innerHTML=innerhtml;

//ResDiv.innerHTML += '<a href="http://capella.ogame.de/game/index.php?page=network&session=d4acae0da616">Allianz</a>';
document.getElementById('ago_panel').getElementsByClassName("ago_panel_wrapper")[0].appendChild(ResDiv);

if (GM_getValue(Skriptname+"_"+server+"_"+"Resanzeige")=='true') {
document.getElementById("ResDiv").getElementsByClassName("ago_panel_tab_content")[0].style.display="block";
}


document.getElementById("ResDiv").addEventListener("click", function(event)
{ 
var innerDiv = document.getElementById("ResDiv").getElementsByClassName("ago_panel_tab_content")[0];
if (innerDiv.style.display=="") {
innerDiv.style.display="block";
GM_setValue(Skriptname+"_"+server+"_"+"Resanzeige",'true');
} else {
innerDiv.style.display="none";
GM_setValue(Skriptname+"_"+server+"_"+"Resanzeige",'false');
}

var test2;
}); 
		}