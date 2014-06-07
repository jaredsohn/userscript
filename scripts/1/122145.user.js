// ==UserScript==
// @name           ogspylink
// @description    de la vue galaxie ogame, permet la recherche ds ogspy 3.0.8, galaxy tool et war rider
// @namespace      la faucille
// @author         la faucille (inspired by other scripts)
// @version        1.1
// @include        http://*.*/game/index.php*
// @include        http://*.*/game/index.php?page=galaxy*
// @include        http://*.*/game/index.php?page=fleet1*

// ==/UserScript==
document.getElementById('mmonetbar').style.display = 'none';
document.getElementsByTagName('div')[0].className = document.getElementsByTagName('div')[0].className.replace('no-commander', '');

var start_time = (new Date()).getTime();
var nomscript = 'ogspylink';
var version   = '1.1';
var numeroscript = 122145;
String.prototype.pick  = function (reg, def) { var m; return (m = this.match(reg)) ? m[m.length - 1 && 1] : def === undefined ? false : def; };
Number.prototype.pick  = function (reg, def) { String.prototype.pick.call(this.toString(), reg, def); };
String.prototype.find  = function (value) { return this.search(value) > -1; };
String.prototype.trim  = function () { return this.replace(/^\s+|\s+$/gm, ''); };

function ToInt(value){
	if(!value) return 0;
	return parseInt(value.toString().replace(/[^0-9-]/g,''));
}

function Sauver(param,valeur){
	if(param!='ListeVar') SauverListeVar(param);

	GM_setValue(server+'-'+nomscript+'-'+param+((param!='pseudo')?pseudo:''),valeur);	
}

function Charger(param,defaut){
	if(param!='ListeVar') SauverListeVar(param);
	
	return GM_getValue(server+'-'+nomscript+'-'+param+((param!='pseudo')?pseudo:''),defaut);
}

function SauverListeVar(param){
	var ListeVar = Charger('ListeVar','').split(';');
	var trouve = false;
	for(p in ListeVar)	trouve = trouve || (ListeVar[p] == param && ListeVar[p].length>0) ;
	if(!trouve){
		if(ListeVar.length>1) Sauver('ListeVar',Charger('ListeVar')+param+';');
		else Sauver('ListeVar',param+';');
	}
}

var url = location.href;
var page = url.pick(/page=([^&]+)/);
var session = url.pick(/session=([a-zA-Z0-9]{12})/);
var server = url.split('/')[2];

var pays = '';
for(var i = (server.split('.')[0]=='ogame')?1:2 ; i< server.split('.').length ; i++ ) {
	if(pays) pays += '.';
	pays += server.split('.')[i];
}
var univers = '';
var pageajax = url.pick(/ajax=([0-1]{1})/)==1;
if( server.split('.').length < 3 )
	univers = '';
else
{
	univers = server.split('.')[0];
	if(  univers == 'www' || univers == 'board' )
		univers = '';
	else
	{
		univers = (univers.indexOf('uni')>-1)?univers.split('uni')[1]:univers;
	}
}

if(univers == '') return ;


var planeteactiveislune = false; 

if(pays=='fr'){
var language = {
	oui:'Oui',
	non:'Non',
	chargement:'Chargement...',
	a:'à',
	metal:'Métal',
	cristal:'Cristal',
	deut:'Deutérium',
	lune:'(Lune)',
	galaxylinkfast: 'Liens directs dans la galaxie',
	linkogspy : 'URL de votre Ogspy',
	linkgalaxytool : 'URL de votre galaxytool',
	save : 'Sauver infos Ogspylink',
	configureoption : 'Configurer page options',
	};

}else{
var language = {
	oui:'yes',
	non:'No',
	chargement:'loading...',
	a:'to',
	metal:'Metal',
	cristal:'Cristal',
	deut:'Deuterium',
	lune:'(moon)',
	galaxylinkfast: 'directs link in galaxy view',
	linkogspy : 'URL Ogspy',
	linkgalaxytool : 'URL galaxytool',
	save : 'Save Ogspylink setup',
	configureoption : 'setup page options',
	};
}

if(document.getElementsByClassName('textBeefy')[0] && !pageajax && ToInt(Charger('derniereSauvePseudo',0))+48*3600< start_time / 1000){
	var pseudo = document.getElementsByClassName('textBeefy')[0].innerHTML;
	Sauver('pagecourante',url);
	Sauver('pseudo',pseudo);
	Sauver('derniereSauvePseudo',Date.parse(new Date()) / 1000);
}else{
	pseudo = Charger('pseudo','');
}

if(!pageajax){
	lienpub = document.getElementById('banner_skyscraper');
	if(lienpub){
		lienpub.innerHTML='';
	}
	
	Sauver('modevacance',unsafeWindow.vacation);

	active = document.getElementsByClassName('planetlink active tipsStandard')[0];

	if(document.getElementById('selectedPlanetName')){
		nomactive = document.getElementById('selectedPlanetName').innerHTML;
	}else nomactive = 'Erreur';
	
	planeteactiveislune = nomactive.find('(Lune)');
	if(active){
		nomactivecomplet = nomactive +' '+active.getElementsByClassName('planet-koords')[0].innerHTML;
		numactive = Charger(nomactivecomplet+'num');
		cpactive  = Charger(nomactivecomplet);
		if(!Charger(cpactive+'Tmax'))Sauver(cpactive+'Tmax',ToInt(active.title.split(language.a)[1]));
	}else{
		cpactive = -1;
		numactive = -1;
	}
	
	var lienmenu = document.getElementById('menuTable').getElementsByTagName('li');
	var lienmenujaune = '';
	for(var i=0;i<lienmenu.length;i++)
	{
		lienmenujaune = lienmenu[i].getElementsByClassName('menubutton premiumHighligt');
		for(var j=0;j<lienmenujaune.length;j++)
			lienmenujaune[j].setAttribute('class','menubutton ');
	}
	
}else{
	numactive = -1;
	cpactive = -1;
}

function AddPoint(nombre){
	nombre=parseInt(nombre);
	if (nombre<0){
		signe = '-';
		nombre = -nombre;
	}else{
		signe = '';
	}
	var str = nombre.toString(), n = str.length;
	if (n <4) {return signe + nombre;} 
	else 
	{
		return  signe +(((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
	}
}

function GetRess(nom){	
	return ToInt(document.getElementById('resources_'+nom).innerHTML);
}

function trim(string)
			{return string.replace(/(^\s*)|(\s*$)/g,'');} 


if(page=='preferences'){
	function OptionScript(){
		var boutonsoptions = document.getElementById('tabs-pref');
		boutonsoptions.innerHTML +='<li><a href="#five" id="tabEasy"><span><font color="gold">'+nomscript+'</font></span></a>';
		
		document.getElementsByClassName('content')[0].innerHTML += '<div id="five" class="wrap ui-tabs-panel ui-tabs-hide" style="display: none;"></div>';
		
		var listeOptions = '';
		
		listeOptions += '<div class="fieldwrapper">';
		listeOptions += '<label class="styled textBeefy">'+language.galaxylinkfast+' : </label>';
		listeOptions += '<div class="thefield">';
		listeOptions += '<select id="optionliendirect" size="1">';
		listeOptions += '<option value="1" '+(Charger('liendirect',0)?'selected':'')+'>'+language.oui+'</option>';
		listeOptions += '<option value="0" '+(Charger('liendirect',0)?'':'selected')+'>'+language.non+'</option>';
		listeOptions += '</select>';
		listeOptions += '</div>';
		listeOptions += '</div>';

		listeOptions += '<div class="fieldwrapper">';
		listeOptions += '<label class="styled textBeefy">'+language.linkogspy+' : </label>';
		listeOptions += '<div class="thefield">';
		listeOptions += '<input id="optionlienogspy" type="text" value="'+Charger('lienogspy','')+'">';
		listeOptions += '</div>';
		listeOptions += '</div>';
		
		listeOptions += '<div class="fieldwrapper">';
		listeOptions += '<label class="styled textBeefy">'+language.linkgalaxytool+' : </label>';
		listeOptions += '<div class="thefield">';
		listeOptions += '<input id="optionliengalaxytool" type="text" value="'+Charger('liengalaxytool','')+'">';
		listeOptions += '</div>';
		listeOptions += '</div>';
	
	
		listeOptions += '<input type="submit" id="valider" class="button188" value="'+language.save+'" onclick="return false;"/>';

		
		document.getElementById('five').innerHTML = listeOptions;

		function enregistreOption(){
			
			Sauver('liendirect',(document.getElementById('optionliendirect').value*1));
			
			Sauver('lienogspy',(document.getElementById('optionlienogspy').value));
			
			Sauver('liengalaxytool',(document.getElementById('optionliengalaxytool').value));
	
		}
		if(document.getElementById("valider")){
			document.getElementById("valider").addEventListener("click", function(event) 		
			{
			enregistreOption();
			unsafeWindow.fadeBox('Options sauvées .',false);
			url = 'http://'+server+'/game/index.php?page=overview&session='+session;
			setTimeout(function(){window.location.replace(url);},1000);	
			}, true);
		}
	}
	OptionScript();
}else
if(page=='fleet2'){
	Sauver('nbrecyclo',0);
	
}else
if(page =='galaxy'){

contenu = document.getElementById('galaxytable');
if(!contenu){
	Interval= setInterval(function RecyclerEspionner(){
		var Input = document.getElementById('galaxytable');
		if (!Input || Input.getAttribute('done141111') == 'done' || Charger('commander')) {return;}
		Input.setAttribute('done141111', 'done');
		contenu = Input.getElementsByClassName('row');
		var liensonder;
		var arajouter = '';
		var galaxie = document.getElementById('galaxy_input').value;
		var systeme = document.getElementById('system_input').value;
		var lienOgspy = Charger('lienogspy','');
			var liengalaxytool = Charger('liengalaxytool','');
		for(i=0;i<contenu.length;i++){
			var pseudogal = contenu[i].getElementsByClassName('playername')[0].getElementsByTagName('span')[0].innerHTML.trim();
			var alliance = '';
			if(pseudogal.length>0){
				alliance = contenu[i].getElementsByClassName('allytag')[0];
				alliance = alliance.getElementsByClassName('spacing');
				if(alliance[0]) alliance = alliance[0].innerHTML.split('Alliance ')[1];
				else alliance = '';	
			}

			if(pseudogal && pseudogal!=pseudo){
						
				var lienWR = contenu[i].getElementsByTagName('td')[7].getElementsByClassName('ListLinks')[0];			
				lienWR.innerHTML += ('<li><a href="http://www.war-riders.de/?lang='+"fr"+'&uni='+"113"+'&page=search'+'&post=1&type=player&name='+pseudogal+'" target="_blank" ><font color=green size="1">War-rider</font></a></li>');
				if(lienOgspy) lienWR.innerHTML += ('<li><a href="'+lienOgspy+'?action=search&type_search=player&string_search='+pseudogal+'" target="_blank"><font color=orange size="1">Ogspy 3.07</font></a></li>');
				
				if(liengalaxytool) lienWR.innerHTML += ('<li><a href="'+liengalaxytool+'show.php'+'?post=spieler='+pseudogal+'" target="_blank"><font color=darkblue size="1">Galaxytool</font></a></li>');
				
			}
			if(alliance){
				var lienWR = contenu[i].getElementsByTagName('td')[9].getElementsByClassName('ListLinks')[0];
				lienWR.innerHTML += ('<li><a href="http://www.war-riders.de/?lang='+pays+'&uni='+univers+'&page=search'+'&post=1&type=ally&name='+alliance+'" target="_blank" ><font color=green size="1">War-rider</font></a></li>');
				if(lienOgspy) lienWR.innerHTML += ('<li><a href="'+lienOgspy+'?action=search&type_search=ally&string_search='+alliance+'&order=coords&order_o=asc&start=0" target="_blank">Ogspy 3.07</li>');
			}
			liensonder = document.getElementById('moon'+(i+1));
			if(liensonder){
				liensonder = liensonder.getElementsByClassName('ListLinks')[0];
				if(Charger('liendirect',0)){
					arajouter = '<li><a href="javascript:;" onclick="sendShips(6,'+galaxie+','+systeme+','+(i+1)+',3,5);return false;">Espionner</a></li>';
				}else{
					arajouter = '<li><a href="index.php?page=fleet1&amp;session='+session+'&amp;galaxy='+galaxie+'&amp;system='+systeme+'&amp;position='+(i+1)+'&amp;type=3&amp;mission=6">Espionner</a></li>';
				}
				liensonder.innerHTML = liensonder.innerHTML + arajouter;
			}
			if(document.getElementById('debris'+(i+1))){
				contenurecyclage = document.getElementById('debris'+(i+1));
				newURL  = 'http://'+server+'/game/index.php?page=fleet1&session='+session;
				newURL += '&galaxy='+galaxie+'&system='+systeme;
				newURL += '&position='+(i+1)+'&type=2&mission=8';
				nbrecyclo = ToInt(contenurecyclage.getElementsByClassName('debris-recyclers')[0].innerHTML);
				contenurecyclage = contenurecyclage.getElementsByTagName('a')[0];
				if(Charger('liendirect',0)){
					contenurecyclage.setAttribute('onclick','sendShips(8,'+galaxie+','+systeme+','+(i+1)+',2,'+nbrecyclo+'); return false;');
				}else{
					contenurecyclage.setAttribute('onclick','');
					Sauver('nbrecyclo',nbrecyclo);
					contenurecyclage.setAttribute('href',newURL);
				}
			}
			//alert(contenu[i].innerHTML);
		}
		
		
	}, 500);
}
}

(function ()
{
	var url = document.location.href;
	if (url.indexOf ("/game/index.php?page=galaxy") >= 0)
	{
		var isIE;
		function addEspMenuItem (event)
		{
			if (isIE)
			{
				if (document.getElementById ("galaxyContent") == null)
					return;
			}
			else
			{
				if (event.target.innerHTML.indexOf('id="galaxyheadbg2"') < 0)
					return;
			}
			setTimeout (function ()
			{
				var lis = document.querySelectorAll ("ul.ListLinks>li");
				for (var i = 0; i < lis.length; i++)
				{
					var theLi = lis [i];
					var myAs = theLi.getElementsByTagName ("a");
					for (var j = 0; j < myAs.length; j++)
					{
						var theA = myAs [j];
						var attr = theA.getAttribute ("onclick");
						if ((attr != null) && (attr.indexOf ("sendShips" >= 0)))
						{
							var session = url.match (/\&session=([a-f0-9]{1,12})/i);
							if (session && (session.length > 1))
								session = "&session=" + session [1];
							else
								session = "";
							var params = attr.split (/[\(,\)]+/);
							if (params [1] != "6")
								continue;
							var newItem = document.createElement ("li");
							var newA = document.createElement ("a");
							var newText = theA.textContent;
							newA.href	= url.split (/\?/) [0] + "?page=fleet1" + session +
									"&galaxy="   + params [2] +	// Galaxy
									"&system="   + params [3] +	// System
									"&position=" + params [4] +	// Position
									"&type="     + params [5] +	// Target type
									"&mission=1" +	// Mission type ("6")
									"&probes="   + params [6];	// Number of probes
							var buttonLinks = document.querySelectorAll ("a.menubutton");
							for (var k = 0; k < buttonLinks.length; k++)
								if (buttonLinks [k].href.indexOf ("fleet1") >= 0)
								{
									newText += " (crash sonde)";
									break;
								}
							newA.appendChild (document.createTextNode (newText));
							newItem.appendChild (newA);
							theLi.parentNode.insertBefore (newItem, theLi.nextSibling);
						}
					}
				}
			}, 0);
		}
		isIE = (navigator.appName == "Microsoft Internet Explorer");
		if (isIE)
			setInterval (addEspMenuItem, 1000);
		else
			document.addEventListener ("DOMNodeInserted", addEspMenuItem, false);
	}
	else if (url.indexOf ("/game/index.php?page=fleet1") >= 0)
	{
		if (url.indexOf ("&probes=") >= 0)
		{
			var numProbes = url.match (/&probes=(\d+)/i) [1];
			var button = document.getElementById ("button210");
			if (button == null)
				return;
			mySpans = button.getElementsByTagName ("span");
			var probesAvailable = parseInt (mySpans [1].childNodes [1].textContent.replace (/\D+/, ""));
			if (numProbes > probesAvailable)
				numProbes = probesAvailable;
			document.getElementById ("ship_210").value = 1;
		}
	}
}

) ();