// ==UserScript==
// @name           InfoCompte3
// @namespace      vulca
// @description   InfoCompte pour ogame v1.2 version  3.2.7c
// @version        3.2.7c
// @author         Vulca  - Translation by farlo54

// @include        http://*ogame.*/game/index.php?page=overview*
// @include        http://*ogame.*/game/index.php?page=resources*
// @include        http://*ogame.*/game/index.php?page=station*
// @include        http://*ogame.*/game/index.php?page=research*
// @include        http://*ogame.*/game/index.php?page=defense*
// @include        http://*ogame.*/game/index.php?page=preferences*
// @include        http://*ogame.*/game/index.php?page=globalTechtree*
// @include        http://*ogame.*/game/index.php?page=movement*
// @include        http://*ogame.*/game/index.php?page=shipyard*
// @include        http://*ogame.*/game/index.php?page=statistics*
// @include        http://*ogame.*/game/index.php?page=empire*
// @include        http://*ogame.*/game/index.php?page=fleet*
// @include        http://*ogame.*/game/index.php?page=galaxy*
// @include        http://*ogame.*/game/index.php?page=network*
// @include        http://*ogame.*/game/index.php?page=messages*
// @include        http://*ogame.*/game/index.php?page=trader*
// @include        http://*ogame.*/game/index.php?page=premium*
// @include        http://*ogame.*/game/index.php?page=alliance*
// @include        http://vulca.netii.net/infoCompte/index.php?page=signature*
// @include        http://*ogame.*/game/index.php?page=combatreport*
// @include        http://mines.webinpact.com/index.php?*do=prod*

// ==/UserScript==

 var Version = '3.2.7c';


/*=================================================================================================================
 Topic du forum officiel : http://board.ogame.fr/thread.php?postid=8634035#post8634035
 Site Web : http://vulca.netii.net/index.php
 Forum : http://vulca.netii.net/forum/
 SCRIPT POUR OGAME.FR v 1.2 */
/*=================================================================================================================*/

var start_time = (new Date()).getTime();

/* **********************************************************************************************************************************************************************/
/* *********************************************************** Fonctions **************************************************************************************************/
/* **********************************************************************************************************************************************************************/

if (navigator.userAgent.indexOf('Firefox')>-1)  {var FireFox = true; var nomScript='';}
else 											{var FireFox = false; var nomScript='InfoCompte3';}
if (navigator.userAgent.indexOf('Opera')>-1) var Opera = true;
else var Opera = false;


	// Google Chrome 
	if(!FireFox) 
	{
		function GM_getValue(key,defaultVal) 
		{
			var retValue = localStorage.getItem(key);
			if ( !retValue ) 
			{
				return defaultVal;
			}
			return retValue;
		}

		function GM_setValue(key,value) 
		{
			localStorage.setItem(key, value);
		}
	}
		
		function trim(string)
			{return string.replace(/(^\s*)|(\s*$)/g,'');} 

		function fusion() 
		{
			var objet_retour = {};
			for(var i=0,l=arguments.length;i<l;i++) 
			{
				for(attribut in arguments[i]) 
				{
					 objet_retour[attribut] = (typeof arguments[i][attribut] == "object" && objet_retour[attribut]) ? fusion(objet_retour[attribut],arguments[i][attribut]) : arguments[i][attribut];
				}
			}
			return objet_retour;
		}
	

		function draw_pie(data)
		{
			var data_url = data.join(","); 
			if ((url.indexOf('page=overview',0))>=0) 
			{
				if(options.generale.mine)
					{var labels_url = text.Mines+"|"+text.Other_structure+"|"+text.Technology+"|"+text.Fleet+"|"+text.Defense;}
				if(options.generale.BatTotal)
					{var labels_url = text.Structure+"|"+text.Technology+"|"+text.Fleet+"|"+text.Defense;}
			}
			else if((url.indexOf('page=research',0))>=0) 
				{var labels_url = text.inutile+" "+pourcent(pointsInutile,pointRecherche)+"|"+text.utile+" "+pourcent(pointRecherche-pointsInutile,pointRecherche);}
			
			else if((url.indexOf('page=movement',0))>=0) 
				{var labels_url = text.aQuai+"|"+text.en_vol;}
			
			else err('error','Page incorrect pour le graphique ('+url+')');
			
			var google_url = "http://chart.apis.google.com/chart?cht=p3&chf=bg,s,efefef00&chs=280x100&chld=M&&chtt=&chl=" + labels_url + "&chco="+CouleurGraph+"&chd=t:" + data_url;
			var img = document.createElement("img");
			img.setAttribute("src",google_url);
			img.setAttribute("align","top");
			img.setAttribute("style", "margin-top:-30px");
			return img;
		}		

		function calculDefLune(f)
		{
			var nb_zero = 11;
			niveau = '';
			listeNiveau ='';
			totNiv =0;
			for (i=0 ; i<DATA.planet.length ; i++)
			{ 
				if(DATA.planet[i].moon=='true')
				{
					nb_zero = 7 - parseInt((addTrait(DATA.planet[i].defense[nom_def[f]])+'').length);
					if (nb_zero <0) nb_zero=0;
					
					for (var k=0; k< nb_zero; k++)
						{niveau +='_';}
					
					niveau += '[color=#'+options.couleur.CoulBBcode+']'+addTrait(DATA.planet[i].defense[nom_def[f]])+'[/color]';

					listeNiveau += '|'+niveau+'_';
					niveau='';
					totNiv += parseInt(DATA.planet[i].defense[nom_def[f]]);
				}
			}
		}

		function addTrait(nombre)
		{
			if (nombre<0) {return '_____0';} 	
			nombre=parseInt(nombre);
				var str = nombre.toString(), n = str.length;
				if (n <4) {return nombre;} 
				else 
				{
					return  (((n % 3) ? str.substr(0, n % 3) + '_' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('_'));
				}
		}

		function calculNiv(f)
		{
			listeNiveau ='';
			totNiv =0;
			for (i=0 ; i<DATA.planet.length ; i++)
			{ 
				if(DATA.planet[i].moon=='false')
				{
				if(DATA.planet[i].building[nom_bat[f]]<0)
					niveau='00';
				else if(DATA.planet[i].building[nom_bat[f]]<10)
					niveau='_'+DATA.planet[i].building[nom_bat[f]]+'';
				else 
					niveau=''+DATA.planet[i].building[nom_bat[f]]+'';

				listeNiveau += '|_'+niveau+'_';
				totNiv += parseInt(DATA.planet[i].building[nom_bat[f]]);
				}
			}
			totNiv= '[color=#'+options.couleur.CoulBBcode+']'+totNiv+'[/color]';
		}
		
				
		function calculFlotte(f)
		{
			var nbVaisseau =0;
			nbVaisseau+=parseInt(DATA.fleet[nom_flotte[f]]);
			
			for (var i=0 ; i<DATA.planet.length ; i++)
			{ 
				nbVaisseau += parseInt(DATA.planet[i].fleet[nom_flotte[f]]);
			}
			return nbVaisseau;
		}
		
		
		
		function calculNivLune(f)
		{
			listeNiveau ='';
			totNiv =0;
			for (i=0 ; i<DATA.planet.length ; i++)
			{ 
				if(DATA.planet[i].moon=='true')
				{
					if(DATA.planet[i].building[nom_bat[f]]<0)
						niveau='00';
					else if(DATA.planet[i].building[nom_bat[f]]<10)
						niveau='_'+DATA.planet[i].building[nom_bat[f]];
					else 
						niveau=DATA.planet[i].building[nom_bat[f]];

					listeNiveau += '|_'+niveau+'_';
					totNiv += parseInt(DATA.planet[i].building[nom_bat[f]]);
				}
			}
			totNiv= '[color=#'+options.couleur.CoulBBcode+']'+totNiv+'[/color]';
		}

		function calculPlanete()
		{
			var nb_zero = 11;
			niveau = '';
			listeNiveau ='';
			totNivCase =0;
			totNivCaseMax = 0;
			listeNiveauUse='';
			listeNiveauMax='';
			listenom='';
			
			for (i=0 ; i<DATA.planet.length ; i++)
			{ 
				if(DATA.planet[i].moon=='false')
				{
					nb_zero = 4 - (DATA.planet[i].resource.tailleConst+'').length;
					if (nb_zero <0) nb_zero=0;
					
					for (var k=0; k< nb_zero; k++)
						{niveau +='_';}
					
					niveau += DATA.planet[i].resource.tailleConst;

					listeNiveauUse += '|'+niveau+'_';
					niveau='';
					totNivCase += parseInt(DATA.planet[i].resource.tailleConst);
				/* *********/
					nb_zero = 4 - (DATA.planet[i].resource.taille+'').length;
					if (nb_zero <0) nb_zero=0;
					
					for (var k=0; k< nb_zero; k++)
						{niveau +='_';}
					
					niveau += parseInt(DATA.planet[i].resource.taille);

					listeNiveauMax += '|'+niveau+'_';
					niveau='';
					totNivCaseMax += parseInt(DATA.planet[i].resource.taille);
				}
			}
		}

		function calculDef(f)
		{
			var nb_zero = 11;
			niveau = '';
			listeNiveau ='';
			totNiv =0;
			for (i=0 ; i<DATA.planet.length ; i++)
			{ 
				if(DATA.planet[i].moon=='false')
				{
					nb_zero = 7 - parseInt((addTrait(DATA.planet[i].defense[nom_def[f]])+'').length);
					if (nb_zero <0) nb_zero=0;
					
					for (var k=0; k< nb_zero; k++)
						{niveau +='_';}
					
					niveau += '[color=#'+options.couleur.CoulBBcode+']'+addTrait(DATA.planet[i].defense[nom_def[f]])+'[/color]';

					listeNiveau += '|'+niveau+'_';
					niveau='';
					totNiv += parseInt(DATA.planet[i].defense[nom_def[f]]);
				}
			}
		}
				
		function addPoints(nombre)
		{
			
				var signe = '';
				if (nombre<0)
				{
					nombre = Math.abs(nombre);
					signe = '-';
				}
				nombre=parseInt(nombre);
				var str = nombre.toString(), n = str.length;
				if (n <4) {return signe + nombre;} 
				else 
				{
					return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
				}
			
		}

		function pourcent(nombre,ref)
		{
			if (ref == 0) 
				{return 0;}
			else
			{
				var pourcent = parseInt(nombre/ref*1000)/10;
				return pourcent;
			}
		}
		
		function arrondi(nombre)
		{
			if (Math.round(nombre) == 0) return 1 ; 
			else return Math.round(nombre);
		}
		
		function oui_non_en_checked(oui_non) 
		{
			if (oui_non == "true" || oui_non == true ) {return "checked";} else {return "unchecked";} 
		}
	
		function decheck(check)
		{
			if (check+''== 'checked') return "unchecked";
			else return "checked";
		}
	
		function checkLang(lang)
		{
			if (lang+'' == options.generale.langue+'' ) {return 'checked="checked"'; } else {return "";} 
		}
		
	function err(type, message) 
	{ 
	    var err = new Error(); 
		err.name = 'My API ' + type + ' Error'; 
	    err.message = message; 
	   throw(err); 
	} 	
	
	function plus(nb)
	{
		if(nb<0) return addPoints(nb);
		else return '+'+addPoints(nb);
	}
		
	var url=location.href;
if ((url.indexOf('vulca',0))>=0 && url.indexOf('testOgame')== -1) // Site de signature 
{
	GM_setValue(nomScript+ 'couleurSign' +trim(document.getElementById("univers").innerHTML) , document.getElementById("couleurFond").innerHTML+'-'+ document.getElementById("couleurText").innerHTML);
}	
else if(url.indexOf('globalTechtree') > -1)
{
	var nom = document.getElementsByTagName('a');
	var nom_vaisseau='';
	var nom_def='';
	var decalage = 0;
	
	if (nom.length == 119) // Dépo
	{
		decalage = 0;
	}
	
	else if (nom.length==117) // Pas de Dépo
	{
		decalage = 2;
	}
	
	else err('error','nombre incorrect de td dans la page globalTechtree ('+nom.length+')');
	
	nom_vaisseau= trim(nom[75-decalage].innerHTML)+';'+trim(nom[77-decalage].innerHTML)+';'+trim(nom[79-decalage].innerHTML)+';'+trim(nom[81-decalage].innerHTML)+';'+trim(nom[97-decalage].innerHTML)+';'+trim(nom[89-decalage].innerHTML)+';'+trim(nom[93-decalage].innerHTML)+';'+trim(nom[95-decalage].innerHTML)+';'+trim(nom[71-decalage].innerHTML)+';'+trim(nom[73-decalage].innerHTML)+';'+trim(nom[83-decalage].innerHTML)+';'+trim(nom[85-decalage].innerHTML)+';'+trim(nom[87-decalage].innerHTML)+';'+trim(nom[91-decalage].innerHTML)+';';
	
	for(var i = 99; i<nom.length ; i=i+2)
	{
		nom_def+= trim(nom[i-decalage].innerHTML)+';'
	}

	GM_setValue(nomScript+url.split('/')[2].replace(url.split('/')[2].split('.')[0],''), nom_vaisseau+'|'+nom_def);
}

else if (document.getElementById('playerName') || url.indexOf('page=combatreport',0)>=0) // Ogame Nouvelle version
{

/* **********************************************************************************************************************************************************************/
/* ************************************************************** Recherche de l'ID PM   ***********************************************************************************/
/* **********************************************************************************************************************************************************************/

	if (document.getElementById('playerName'))
	{
		var serveur = url.split('/')[2];
		var numeroUni = document.getElementsByTagName('title')[0].innerHTML;	
	
		if( ! parseInt(numeroUni.replace( /[^0-9]/g, "")) > 0 )
		{
			var adress = url.split('/')[2].split('.');
				adress[0]='';adress[1]='';
				
			serveur = (numeroUni+'.ogame'+adress.join('.').replace( '..', ".")).toLowerCase();
		}
		
		if (url.indexOf('http://vulca.netii.net/testOgame/')> -1) serveur = 'test.ogame.org';
	
		GM_setValue(url.split('/')[2], serveur);
		
		// Prix redesign ou non
		if(serveur.indexOf('uni')>-1 && url.indexOf('uni42.ogame.org') ==-1 && url.indexOf('uni6.ogame.de') ==-1 )
		{
			var nonRedesignPrix = true;
		}
		else var nonRedesignPrix =  false;

	
		var numeroplanete = 0;
		var nbLune = 0;
		var th_style="height:20px; font-size: 12px; font-weight:normal; color: white; border:1px solid black;";
		
		var pseudo = document.getElementById('playerName').getElementsByClassName('textBeefy')[0].innerHTML;
		var coordPM = document.getElementsByClassName('planet-koords')[0].innerHTML ;
		var idPlanete = GM_getValue(nomScript+'idPlanet'+pseudo+serveur , 'a;').split(';');
		var manqueId = false; if (idPlanete[0] =='a') manqueId = true;
		var listeId = '';
		var nbPlanet=1;
		
		var planets = document.getElementById("rechts").getElementsByClassName("smallplanet");
		var Lune = new Array();
		
		if ( planets.length >1 )
		{
			numeroplanete=-1;
			nbPlanet = 0;
			for ( var i=0; i<planets.length ; i++)
			{	
				if( !isNaN(planets[i].innerHTML.split('moonlink')[0].slice(planets[i].innerHTML.split('moonlink')[0].indexOf('&amp;cp=')+8, planets[i].innerHTML.split('moonlink')[0].indexOf('"', 40))))
				{
					idPlanete[nbPlanet] = planets[i].innerHTML.split('moonlink')[0].slice(planets[i].innerHTML.split('moonlink')[0].indexOf('&amp;cp=')+8, planets[i].innerHTML.split('moonlink')[0].indexOf('"', 40));				
				}
				else
				{	
					numeroplanete = nbPlanet;
				}
				
				if (idPlanete[nbPlanet] =='undefined') manqueId = true;
				
				listeId+= idPlanete[nbPlanet]+';';
				
				if (planets[i].innerHTML.indexOf('src="img/planets/moon/') > 0) 
				{
				
					nbPlanet++;
					Lune[nbPlanet] = true; 
					nbLune++;
					idPlanete[nbPlanet] = planets[i].innerHTML.split('moonlink')[1].slice(planets[i].innerHTML.split('moonlink')[1].indexOf('&amp;cp=')+8, planets[i].innerHTML.split('moonlink')[1].indexOf('"', 40));
		
					listeId+= idPlanete[nbPlanet]+';';
					
					if(numeroplanete == -1 && planets[i].innerHTML.indexOf('planetlink active tipsStandard' ) > -1) numeroplanete = nbPlanet; 
					
				}
				else Lune[nbPlanet] = false;
		
				nbPlanet++;		
			}
			
			var idPlaneteTrie = listeId.slice(0, listeId.length -1).split(';').sort();
				idPlanete = listeId.slice(0, listeId.length -1).split(';');
				
			var f=0;
			for ( var i=0; i< idPlaneteTrie.length ; i++) 
			{		
				if (!Lune[i])
				{
					if (idPlaneteTrie[0] == idPlanete[i])
						{ coordPM = document.getElementsByClassName('planet-koords')[f].innerHTML;}
					f++;
				}
			}	
		}
	
		if (nbPlanet == 1) manqueId = false;
		
		var CoordPM = coordPM;
		coordPM = coordPM.replace(':','0').replace(':','0').replace('[','').replace(']','');
	
		GM_setValue(nomScript+'Pseudo'+serveur , pseudo+'#'+coordPM);
		
		var DefPla = GM_getValue(nomScript+"DefPlanete"+coordPM+serveur,'||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;').split(';');
		var BatRes = GM_getValue(nomScript+"BatRes"+coordPM+serveur,'||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;').split(';');
		var BatSta = GM_getValue(nomScript+"BatSta"+coordPM+serveur,'|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;').split(';');
		var Techno = GM_getValue(nomScript+"nivTechno"+coordPM+serveur, '-1;-1;-1;-1;-1;-1;-1;-1;-1;-1;-1;-1;-1;-1;-1;-1;-1;-1' ).split(';');
		var flotte = GM_getValue(nomScript+"flotte"+coordPM+serveur,'0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;').split(';');

		var BatSta_const = GM_getValue(nomScript+"BatSta_const"+coordPM+serveur,'|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|').split(';');
		var BatRes_const = GM_getValue(nomScript+"BatRes_const"+coordPM+serveur,'|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|').split(';');
		var Res_const = GM_getValue(nomScript+"Res_const"+coordPM+serveur,'|');
		var Def_const = GM_getValue(nomScript+"Def_const"+coordPM+serveur,'|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|').split(';');
		
		if( url.indexOf('page=fleet2') == -1 ) // Evite bug disparition des planetes au fleet2
		{
			for (var i = 0; i<idPlanete.length ; i++)
			{
				if (idPlanete[i] != GM_getValue(nomScript+'idPlanet'+pseudo+serveur , '').split(';')[i])
				{
					DefPla[i] = '|||||||||||||'; GM_setValue(nomScript+"DefPlanete"+coordPM+serveur,DefPla.join(';'));
					BatRes[i] = '|||||||||||||'; GM_setValue(nomScript+"BatRes"+coordPM+serveur,BatRes.join(';'));
					BatSta[i] = '|||||||||||||'; GM_setValue(nomScript+"BatSta"+coordPM+serveur,BatSta.join(';'));
					BatRes_const[i] = '|'; 
					BatSta_const[i] = '|';
					Def_const[i]= '|';
					GM_setValue(nomScript+"BatSta_const"+coordPM+serveur,BatSta_const.join(';'));
					GM_setValue(nomScript+"BatRes_const"+coordPM+serveur,BatRes_const.join(';'));
					GM_setValue(nomScript+"Def_const"+coordPM+serveur,Def_const.join(';'));
				}
			}
		}
		GM_setValue(nomScript+'idPlanet'+pseudo+serveur , listeId)
	}
	else
	{
		var serveur = GM_getValue(url.split('/')[2], url.split('/')[2]);
		var pseudo = GM_getValue(nomScript+'Pseudo'+serveur , "pseudo#coordPM").split('#')[0];
		var coordPM = GM_getValue(nomScript+'Pseudo'+serveur , "pseudo#coordPM").split('#')[1];
	}
		/* **********************************************************************************************************************************************************************/
		/* ************************************************************ Options  *************************************************************************************************/
		/* **********************************************************************************************************************************************************************/

		var OptionSauvegarde = GM_getValue(nomScript+"options"+coordPM+serveur,'0000FF,0000CC,000099,000066,000033'+';'+false+';'+true+';'+true+';'+true+';'+true+';'+true+';'+false+';'+false+';'+true+';'+true+';'+true+';'+true+';'+true+';'+true+';'+false+';'+true+';'+true+';'+true+';'+false+';'+true+';'+true+';'+true+';'+false+';'+false+';'+false+';'+true+';'+true+';'+false+';;;;;;;;');
		var option = OptionSauvegarde.split(/;/);

		for (i=1; i<option.length ; i++)
		{
			if (option[i]== 'true' || option[i]== true) option[i] = true;
			else option[i] = false;
		}
		
		var CouleurGraph = option[0];
		
		var listeCouleur = option[0].split(/,/);
	
		var couleurFTurl = (GM_getValue(nomScript+'couleurSign'+serveur+coordPM , '0;0;0;-255;255;255|url|')+'|url|').split('|url|');
		
		var couleurFT = couleurFTurl[0].split('-')
		
		var couleurT =  couleurFT[1].split(';');
		var couleurF =  couleurFT[0].split(';');
		
		var optionCouleur = GM_getValue(nomScript+'OptionCouleur'+coordPM+serveur,'FF0000;00FF00;5050FF;ff9933;;;;;').split(';');
	
		//Verif derniere version pour modif
		if (GM_getValue(nomScript+"ancienneVersion"+coordPM+serveur,'3.2.4').indexOf( '3.2.4') > -1 )
		{
			option[26]= true;
			option[27]= true;
			GM_getValue(nomScript+"options"+coordPM+serveur, option.join(';'));
		}
		GM_setValue(nomScript+"ancienneVersion"+coordPM+serveur,Version);
		
		
	
		var options = 
		{
			generale: 
			{		
				BatTotal : option[1], 
				indestructible : option[2],
				techno : option[3],
				flottes : option[4],
				Def : option[5],
				VaisseauxVol  : option[6],
				pointLune : option[7],
				sauterLignePourPourcentageFlotteVol : option[8],
				progression : option[9],
				couleurPoint :option[10],
				ProgJours : option[11],
				ProdJours :option[12],
				Techno_utile :option[13],
				progOW:option[24],
				
				Point_planete : option[14],
				Masquer : option[15],
				Signa : option[16],
				SignaRc : option[26],
				langue : GM_getValue(nomScript+'Langue_text'+coordPM+serveur,(serveur+'').split('ogame.')[1].replace('.', '_')),
				bbcode_center : option[17],
				bbcode_pixel : option[18],
				bbcode_SMF : option[19],
				saveFleet :  option[20],
				rank: option[21],
				Alternative: option[22],
				transparant: option[23],
				baliseCenterHTML : option[25],
				constructing : option[27],
				AffDetailPla: option[28],
			},
			couleur:
			{
				graphA: listeCouleur[0], graphB: listeCouleur[1], graphC: listeCouleur[2], graphD: listeCouleur[3], graphE: listeCouleur[4],
				progPos: optionCouleur[1], progNeg:optionCouleur[0],
				
				SigntxtR : couleurT[0].replace(' ', '') , 
				SigntxtV : couleurT[1].replace(' ', '') , 
				SigntxtB : couleurT[2].replace(' ', '') , 
				SignfondR :couleurF[0].replace(' ',''),
				SignfondV :couleurF[1].replace(' ',''),
				SignfondB :couleurF[2].replace(' ',''),
				url : couleurFTurl[1].replace(' ',''), 
				CoulBBcode : optionCouleur[2],
				CoulBBcode2 : optionCouleur[3]
			},
		};	
		
		var speedUni = parseInt(GM_getValue(nomScript+'speed'+serveur+coordPM , '1;;;').split(';')[0]);
		
		if ((url.indexOf('draco.ogame.onet.pl') != -1) || (url.indexOf('uni40.ogame.fr') != -1) || (url.indexOf('uni50.ogame.fr') != -1)  || (url.indexOf('uni60.ogame.fr') != -1) || (url.indexOf('uni30.ogame.org') != -1) || (url.indexOf('uni40.ogame.org') != -1) || (url.indexOf('uni42.ogame.org') != -1) || (url.indexOf('uni50.ogame.de') != -1) || (url.indexOf('uni60.ogame.de') != -1) || (url.indexOf('uni70.ogame.de') != -1) || (url.indexOf('uni10.ogame.nl') != -1) || (url.indexOf('gemini.ogame.fr') != -1))
			{ speedUni =2;}
		if (url.indexOf('uni35.ogame.org') != -1 )
			{speedUni =5;}
		if ((url.indexOf('electra.ogame.pl') != -1 ) ||(url.indexOf('fornax.ogame.fr') != -1 ) || (url.indexOf('electra.ogame.de') != -1 ) || (url.indexOf('electra.ogame.org') != -1 )|| (url.indexOf('draco.ogame.it') != -1 )|| (url.indexOf('fornax.ogame.com.es') != -1 ))
			{speedUni =4;}
		
	var AJours = GM_getValue(nomScript+"aJours",true);
		
	/* **********************************************************************************************************************************************************************/
	/* *********************************************************** Traduction ************************************************************************************************/
	/* **********************************************************************************************************************************************************************/
		
	var text = new Array();

	text = 
	{
		ICoption : 'InfoCompte Seçenekleri', 
		Save:'Kayıt' ,
		Total:'Toplam',
		Lune:'Ay',	
		Mines:'Madenler',
		Other_structure:'Diğer binalar',
		Structure:'Binalar',
		Ressource:'Kaynaklar',
		Facilities:'Tesisler',
		Technology:'Araştırma',
        Technologies : 'Teknoloji',
		Fleet:'Filo',
		Defense:'Savunma',
		Progression:'Yükseltme',
		Moyenne:'Ortalama',
		Production:'Üretim',
		Indestructible:'Yıkılamaz',
		Depuis:'beri', 
		Points:'Puan',
		soit:'representing',
		BBcode_debut:"Puan detayları:",
		BBcode_debut2:"Toplam puan:",
		BBcode_mine:"Maden puanları:",
		BBcode_bat:"Diğer yapı puanları:",
		BBcode_batT:"Toplam yapı puanları:",
		BBcode_fin1:"Araştırma puanları:",
		Bcode_fin2:"Filo puanları:",
		BBcode_fin3:"Savunma puanları:",
		BBcode_fin4: "Hesabınızın ",
		BBcode_fin5 : "yıkılamaz puanı",
		BBcode_fin6 : "Ortalama ilerleme : ",
		Point_day : "Günlük puanlar",
		sur_lune:'ayda',
		en_vol:'uçan filo',
		aQuai: 'yerdeki filo', 
		vaisseaux : 'gemi',
		Avertissement :'İlerleme durumunuzu yeniden saymak istediğinize eminmisiniz? ',
		restart : 'ilerleme sayımı yeniden başlatmak için tıklayın ',
		AffBBcodeDetail : 'Ayrıntılı BBcode\'yi göstermeyi tıklayın', 
		AffBBcodeSimple : 'Ayrıntılı BBcode\'yi göstermek istemiyorsanız tıklayın', 
		AffBBcodeSansBBcode : 'BBcode olmadan', 
		valeurdefaut : 'varsayılan değerler',
		Manque:'Bu sayfaları üzerinden gitmek gerekir:',
		pas_a_jours :'Bir güncelleme mevcut: ',
		install : 'kurmak için tıklayınız', 
		utile : 'yararlı', 
		inutile :'yararsız',
		BBcode_fin42 :"Sizin işe yaramaz teknoloji temsil ",
		creeSign:'InfoCompte bir imza oluşturmak', 
		signature : 'imza',
		manqueVG : 'Gezegene genel bir bakış',
		info_new_version: 'Bu yeni sürüm \'ın haber bak',
		addTrad :'yeni/tam/Bir çeviri değiştirme',
		rank: 'rütbe',
		rank_indest: 'Filo ve savunma kaydettikten sonraki yeriniz',
		degats_infliges : 'Toplam hasar tarafından uğratılan',
		luneCree: 'Verilen aylar',
		constructing:'İnşa edilen puanlar',
		affDetailPla : 'Gezegen puanlarını detaylı görüntülemek için tıklayın',
		options:
			{ 
				creeSign :'Ekran bağlantı imza oluştur',
				creeSignRc : 'CR',
				Graphiccolours :'Grafik renkleri',
				BatTotal :'Toplam yapı puanını göster',
				indestructible :'Yıkılmaz puanı göster',
				techno :'Araştırma puanını göster',
				flottes :'Filo puanını göster',
				Def :'Savunma puanını göster',
				VaisseauxVol :'Harekette filonun yüzdesini göster', 
				pointLune :'Ay puanını göster',
				sauterLignePourPourcentageFlotteVol :'Aynı çizgide hepsini göster (Filo ve ay puanlarına hareket etmek için)',
				progression :'İlerlemeyi göster', 
				PlusieurSurMemeUni :'Dolgu orada aynı bilgisayarda ve evren üzerinde birden fazla oyuncu varsa', 
				couleurPoint :'İlerleme fonksiyonunu farklı renklerde göster',
				ProgJours :'Günlük ilerlemeyi göster',
				ProdJours :'Madenden kazanılan puanı göster',
				Techno_utile :"Teknolojinin ayrıntılarını göster",
				Point_planete :"Gezegene puan yatırımını göster",
				Masquer :"Varsayılan InfoCompte tablosunu gizle", 
				progNeg: "Negatif ilerleme \'ın renk", 
				progPos : "Pozitif ilerleme \'ın renk",
				Signtxt:'İmzadaki (yazı) rengi',
				Signfond:'İmzadaki (arkaplan) rengi',
				langue : 'Hangi dilde istiyorsun?',
				CoulBBcode: 'BBcode başlığı rengi',
				BBcode_center : 'BBcode\'yle metni koymanın nasıl olduğu ?',
				BBcode_size : 'BBCode için maksimum boyut (px / %)',
				enregFlotte: 'Filo keydet',
				rank: 'Ekran rütbeleri',
				alternative: 'Ekran bağlantı bilgi vermek için <a href="http://projet-alternative.fr/conect/projet">Alternatif web sitesi</a>',
				sansDesing :'Script tasarımını iptal et',
				design:'Dizayn',
				Display: 'Görüntü',
				speed: 'Evrenin Hızı',
				constructing:'Bina gösterin puanları',
				detailPointsPla : 'Otomatik gezegen puan detaylarını görüntüle',
			}, 
			tag: 
			{
				mmet: 'Metal Madeni',mcri: 'Kristal Madeni',mdet: 'Deuterium Sentezleyicisi',ces: 'Solar Enerji Santrali',cef: 'Füzyoenerji Santrali',rob: 'Robot Fabrikasi',nan: 'Nanit Fabrikasi',cspa: 'Uzay Tersanesi',hmet: 'Metal Deposu',hcri: 'Kristal Deposu',hdet: 'Deuterium Tankeri',lab: 'Bilimsel Arastirma Labarotuvari',ter: 'Terraformer',depo: 'Ittifak Deposu',silo: 'Roket Silosu',base: 'Ay Merkez Istasyonu',phal: 'Radar Istasyonu',port: 'Siçrama Geçidi',
				espi: 'Casusluk Teknigi',ordi: 'Bilgisayar Teknigi',arme: 'Silah Teknigi',bouc: 'Koruyucu Kalkan Teknigi',prot: 'Uzay Gemilerinin Zirhlandirilmasi',ener: 'Enerji Teknigi',hype: 'Hiperuzay Teknigi',comb: 'Yanmali Motor Takimi',impu: 'Impuls( Içtepi ) Motortakimi',phyp: 'Hiperuzay Iticisi',lase: 'Lazer Teknigi',ions: 'Iyon Teknigi',plas: 'Plazma Teknigi',rese: 'Galaksiler arasi arastirma agi',expe: 'Astrofizik',grav: 'Gravitasyon Arastirmasi',
				pt: 'Küçük Nakliye Gemisi',gt: 'Büyük Nakliye Gemisi',cle: 'Hafif Avci',clo: 'Agir Avci',crois: 'Kruvazör',vb: 'Komuta Gemisi',vc: 'Koloni Gemisi',rec: 'Geri Dönüsümcü',esp: 'Casus Sondasi',bomb: 'Bombardiman Gemisi',ss: 'Solar Uydu',dest: 'Muhrip',edlm: 'Ölüm Yildizi',traq: 'Firkateyn',
				lm: 'Roketatar',lle: 'Hafif Lazer Topu',llo: 'Agir Lazer Topu',gauss: ' Gaus Topu',ion: 'Iyon Topu',pla: 'Plazma Aticilar',pb: 'Küçük Kalkan Kubbesi',gb: 'Büyük Kalkan Kubbesi',mic: 'Yakaliyici Roketler',mip: 'Gezegenlerarasi Roketler',
				m: 'Metal',
				c: 'Kristal',
				d: 'Deuterium',
				rc: new Array('K.Nakliye','B.Nakliye', 'H.Avci', 'A.Avci','Kru.', 'Kom.','Koloni','GD','Sonda','Bomb','Muhrip','RIP','Firk','Solar.', 'Roketatar', 'H.Lazer', 'A.Lazer','Gaus', 'Iyon T.', 'Plazma', 'K.Kalkan', 'B.Kalkan', 'özgür metal muazzam miktarda ve kristal birlikte çizin' ),
			
			},
			bbcode:
			{
				Scientifique:'Bilimsel', 
				planet:'Gezegenler',
				Lune:'Aylar',
				Stockage:'Depo',
				Construction:'İnşaat',
				Militaire:'Ordu',
				Technologies_de_combat:'Savaş Teknolojileri',
				Technologies_de_vaisseaux:"Gemiler Teknolojileri",
				Technologies_annexes:'Diğer Teknolojiler' ,
				genere: 'oluşturmak',
				rapport:'Hesap ayrıntıları',
				dont : 'ile',
				empirePoint :'.:: İmparatorluk puanları ',
				Production:'.:: İmparatorluk günlük üretim',
				Structure : '.:: Bina ',
				Technology:'.:: Araştırma',
				Defense:'.:: Savunma',
				Energie : 'Enerji', 
				vaisseauCivil: 'Sivil Gemiler',
				vaisseauCombat: 'Savaş Gemileri',
			},
	 };

	if (options.generale.langue == 'fr')	
	{
			text = 
		    {
			Total:'Total',
			Lune:'Lune',
			Mines:'Mines ',
			Other_structure:'Autres bâtiments ',
			Structure:'Bâtiments ',
			Technology:'Recherche',
			Technologies:'Technologies',
			Ressource:'Ressources',
			Facilities:'Installations',
			Fleet:'Flotte ',
			Defense:'Defense ',
			Progression:'  Progression  ',
			Moyenne:'  Moyenne ',
			Production:'  Production ',
			Indestructible:'  Indestructibles ',
			Depuis:' depuis ',
			Points:'  Points ',
			soit:'  soit ',
			BBcode_debut:'Détail de l\'investissement des points ',
			BBcode_debut2:'Points total : ',
			BBcode_mine:'Points mines : ',
			BBcode_bat:'Points autres bâtiments : ',
			BBcode_batT:'Points batiment : ',
			BBcode_fin1:' Points technologie : ',
			Bcode_fin2:' Points flotte : ',
			BBcode_fin3:' Points defense : ',
			BBcode_fin4:' Votre compte a ',
			BBcode_fin5:' points indestructible',
			BBcode_fin6:' Progression moyenne : ',
			Point_day:' Points par jour',
			sur_lune:' sur lune ',
			en_vol:' en vol ',
			aQuai: 'à quai', 
			vaisseaux : 'vaisseaux',
			Avertissement:' Etes vous sur de vouloir réinitialiser votre progression ? ',
			restart:'  Cliquez pour remettre votre progression à 0 ',
			AffBBcodeDetail : 'Cliquez pour afficher le BBcode détaillé', 
			AffBBcodeSimple : 'Cliquez pour afficher le BBcode non détaillé', 
			AffBBcodeSansBBcode : 'Version sans BBcode :', 
			done:' Enregistré ! Actualisez la page ! ',
			ICoption:'  Options InfoCompte ',
			Save:' Sauvegarder ',
			valeurdefaut:'  Valeur par defaut ',
			Manque:' Il manque des infos, allez visiter les pages suivantes : ',
			pas_a_jours:'Il y a une nouvelle version disponible :',
			install:' Cliquez pour l\'installer',
			utile:'  utile ',
			inutile:' inutile ',
			BBcode_fin42:'Vos investissements en technologies inutiles représentent ',
			creeSign:' Créer une signature InfoCompte ',
			signature : 'signature',
			manqueVG : "La vue générale d'une autre planète",
			info_new_version: 'voir les améliorations de cette nouvelle version',
			addTrad :'ajouter/modifier/compléter une traduction',
			rank: 'Place',
			rank_indest: 'C\'est votre classement en cas de perte de votre flotte et de vos defenses',
			degats_infliges : 'Dégâts totaux infligés par',
			luneCree: 'Lunes créées',
			constructing:'Points en construction',
			affDetailPla : 'Cliquez pour afficher le détail des points des planètes',
			options:
				{
					BatTotal:' Afficher les points bâtiments total ',
					indestructible:' Afficher les points Indestructibles ',
					techno:' Afficher les points Technologie ',
					flottes:' Afficher les points Flotte ',
					Def:' Afficher les points Défense ',
					VaisseauxVol:' Afficher le pourcentage des vaisseaux en vol ',
					pointLune:' Afficher les points lune ',
					sauterLignePourPourcentageFlotteVol:' Tout afficher sur la même ligne (pour flotte en vol et points lune) ',
					progression:' Afficher la progression',
					couleurPoint:' Afficher en couleur en fonction de la progression ',
					ProgJours:' Afficher la progression par jours ',
					ProdJours:' Afficher la production des mines par jours  ',
					Techno_utile:'Montrer le detail des technos',
					Point_planete:' Montrer les points investis sur la planète ',
					Masquer:'Masquer InfoCompte par defaut',
					Graphiccolours :' Couleurs du graphique  ',
					progNeg: 'Couleur pour les chutes de points',
					progPos : 'Couleur pour les gains de points' ,
					Signtxt:'Couleur des Signatures (texte) ', 
					Signfond:'Couleur des Signatures (Fond)',
					creeSign :'Afficher le lien pour la création de signature',
					creeSignRc : 'RC',
					langue : 'Quelle langue voulez vous ?',
					CoulBBcode: 'Couleur des titres du BBcode',
					BBcode_center : 'Comment centrer le texte ?',
					BBcode_size : 'Taille maximum du BBcode (px / %)',
					enregFlotte: 'Enregistrer la flotte',
					rank: 'Afficher les classements',
					alternative: 'Afficher le lien pour envoyer ses informations sur le <a href="http://projet-alternative.fr/conect/projet">site Alternative</a>',
					sansDesing :'Désactiver le Design du script',
					design:'Design',
					Display: 'Affichage',	
					speed: 'Vitesse de l\'univers',
					constructing:'Afficher les points en cour de construction',
					detailPointsPla : 'Afficher le détail des points des planètes par défaut',
				},
			tag:
				{
					mmet: 'Mine de métal',mcri: 'Mine de cristal',mdet: 'Synthétiseur de deutérium',ces: 'Centrale électrique solaire',cef: 'Centrale électrique de fusion',rob: 'Usine de robots',nan: 'Usine de nanites',cspa: 'Chantier spatial',hmet: 'Hangar de métal',hcri: 'Hangar de cristal',hdet: 'Réservoir de deutérium',lab: 'Laboratoire de recherche',ter: 'Terraformeur',depo: 'Dépôt de ravitaillement',silo: 'Silo de missiles',base: 'Base lunaire',phal: 'Phalange de capteur',port: 'Porte de saut spatial',
					espi: 'Technologie Espionnage',ordi: 'Technologie Ordinateur',arme: 'Technologie Armes',bouc: 'Technologie Bouclier',prot: 'Technologie Protection des vaisseaux spatiaux',ener: 'Technologie Energie',hype: 'Technologie Hyperespace',comb: 'Réacteur à combustion',impu: 'Réacteur à impulsion',phyp: 'Propulsion hyperespace',lase: 'Technologie Laser',ions: 'Technologie Ions',plas: 'Technologie Plasma',rese: 'Réseau de recherche intergalactique',expe: 'Astrophysique',grav: 'Technologie Graviton',
					pt: 'Petit transporteur',gt: 'Grand transporteur',cle: 'Chasseur léger',clo: 'Chasseur lourd',crois: 'Croiseur',vb: 'Vaisseau de bataille',vc: 'Vaisseau de colonisation',rec: 'Recycleur',esp: 'Sonde d`espionnage',bomb: 'Bombardier',ss: 'Satellite solaire',dest: 'Destructeur',edlm: 'Étoile de la mort',traq: 'Traqueur',
					lm: 'Lanceur de missiles',lle: 'Artillerie laser légère',llo: 'Artillerie laser lourde',gauss: 'Canon de Gauss',ion: 'Artillerie à ions',pla: 'Lanceur de plasma',pb: 'Petit bouclier',gb: 'Grand bouclier',mic: 'Missile d`interception',mip: 'Missile Interplanétaire',
					m: 'Métal',
					c: 'Cristal',
					d: 'Deutérium',
					rc: new Array('P.transp.','G.transp.', 'Ch.léger', 'Ch.lourd','Croiseur', 'V.bataille','V.colo','Recycleur','Sonde','Bomb.','Destr.','Rip','Traqueur','Sat.sol.', 'Missile', 'L.léger.', 'L.lourd','Can.Gauss', 'Art.ions', 'Lanc.plasma', 'P.bouclier', 'G.bouclier', 'Les quantités énormes de métal et de cristal s' ),
				},
				bbcode:
				{
					genere: 'Généré le',
					rapport:'Rapport du compte de',
					dont : 'dont',
					empirePoint :'[img]http://vulca.netii.net/infoCompte/image/points.png[/img] ',
					Production:'[img]http://vulca.netii.net/infoCompte/image/production.png[/img]',
					Structure : '[img]http://vulca.netii.net/infoCompte/image/batiment.png[/img]',
					Technology:'[img]http://vulca.netii.net/infoCompte/image/labo.png[/img]',
					Defense:'[img]http://vulca.netii.net/infoCompte/image/defense.jpg[/img]',
					Energie : 'Energie',
					Scientifique:'Scientifique', 
					planet:'Planètaire',
					Lune:'Lunaire',
					Stockage:'Stockage',
					Construction:'Construction',
					Militaire:'Militaire',
					Technologies_de_combat:'Technologies de combat',
					Technologies_de_vaisseaux:"Technologies de vaisseaux",
					Technologies_annexes:'Technologies annexes',
					vaisseauCivil: 'Vaisseaux civils',
					vaisseauCombat: 'Vaisseaux de combat',
				}
			};
	}
	else if(FireFox)
	{ 
		if (unsafeWindow.infocompte_text)
		{
			if (options.generale.langue == 'de' && unsafeWindow.infocompte_text.de)
			{
				text = fusion(text,unsafeWindow.infocompte_text.de); 
				if(unsafeWindow.infocompte_text.de.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.de.tag.rc ; 
			}
			
			else if (options.generale.langue == 'com_pt' && unsafeWindow.infocompte_text.pt)
				{text = fusion(text,unsafeWindow.infocompte_text.pt);if(unsafeWindow.infocompte_text.pt.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.pt.tag.rc ; }
			else if (options.generale.langue == 'com_es' && unsafeWindow.infocompte_text.es)
				{text = fusion(text,unsafeWindow.infocompte_text.es);if(unsafeWindow.infocompte_text.es.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.es.tag.rc ; }
			else if (options.generale.langue == 'se' && unsafeWindow.infocompte_text.se)
				{text = fusion(text,unsafeWindow.infocompte_text.se);if(unsafeWindow.infocompte_text.se.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.se.tag.rc ; }
			else if (options.generale.langue == 'bg' && unsafeWindow.infocompte_text.bg)
				{text = fusion(text,unsafeWindow.infocompte_text.bg);if(unsafeWindow.infocompte_text.bg.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.bg.tag.rc ; }
			else if (options.generale.langue == 'nl' && unsafeWindow.infocompte_text.nl)
				{text = fusion(text,unsafeWindow.infocompte_text.nl);if(unsafeWindow.infocompte_text.nl.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.nl.tag.rc ; }
			else if (options.generale.langue == 'fi' && unsafeWindow.infocompte_text.fi)
				{text = fusion(text,unsafeWindow.infocompte_text.fi);if(unsafeWindow.infocompte_text.fi.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.fi.tag.rc ; }
			else if (options.generale.langue == 'dk' && unsafeWindow.infocompte_text.dk)
				{text = fusion(text,unsafeWindow.infocompte_text.dk);if(unsafeWindow.infocompte_text.dk.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.dk.tag.rc ; }
			else if (options.generale.langue == 'no' && unsafeWindow.infocompte_text.no)
				{text = fusion(text,unsafeWindow.infocompte_text.no);if(unsafeWindow.infocompte_text.no.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.no.tag.rc ; }
			else if (options.generale.langue == 'pl' && unsafeWindow.infocompte_text.onet_pl)
				{text = fusion(text,unsafeWindow.infocompte_text.onet_pl);if(unsafeWindow.infocompte_text.onet_pl.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.onet_pl.tag.rc ; }
			else if (options.generale.langue == 'gr' && unsafeWindow.infocompte_text.gr)
				{text = fusion(text,unsafeWindow.infocompte_text.gr);if(unsafeWindow.infocompte_text.gr.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.gr.tag.rc ; }
			else if (options.generale.langue == 'ba' && unsafeWindow.infocompte_text.ba)
				{text = fusion(text,unsafeWindow.infocompte_text.ba);if(unsafeWindow.infocompte_text.ba.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.ba.tag.rc ; }	
			else if (options.generale.langue == 'com_br' && unsafeWindow.infocompte_text.br)
				{text = fusion(text,unsafeWindow.infocompte_text.br);if(unsafeWindow.infocompte_text.br.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.br.tag.rc ; }	
			else if (options.generale.langue == 'ru' && unsafeWindow.infocompte_text.ru)
				{text = fusion(text,unsafeWindow.infocompte_text.ru);if(unsafeWindow.infocompte_text.ru.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.ru.tag.rc ; }	
			else if (options.generale.langue == 'ro' && unsafeWindow.infocompte_text.ro)
				{text = fusion(text,unsafeWindow.infocompte_text.ro);if(unsafeWindow.infocompte_text.ro.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.ro.tag.rc ; }
			else if (options.generale.langue == 'com_hr' && unsafeWindow.infocompte_text.hr)
				{text = fusion(text,unsafeWindow.infocompte_text.hr);if(unsafeWindow.infocompte_text.hr.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.hr.tag.rc ; }					
				
				
			else if (options.generale.langue == 'hu' && unsafeWindow.infocompte_text.hu)
				{text = fusion(text,unsafeWindow.infocompte_text.hu);if(unsafeWindow.infocompte_text.hu.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.hu.tag.rc ; }	
				else if (options.generale.langue == 'it' && unsafeWindow.infocompte_text.it)
				{text = fusion(text,unsafeWindow.infocompte_text.it);if(unsafeWindow.infocompte_text.it.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.it.tag.rc ; }	
			else if (options.generale.langue == 'lt' && unsafeWindow.infocompte_text.lt)
				{text = fusion(text,unsafeWindow.infocompte_text.lt);if(unsafeWindow.infocompte_text.lt.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.lt.tag.rc ; }	
			else if (options.generale.langue == 'cn' && unsafeWindow.infocompte_text.cn)
				{text = fusion(text,unsafeWindow.infocompte_text.cn);if(unsafeWindow.infocompte_text.cn.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.cn.tag.rc ; }	
			else if (options.generale.langue == 'jp' && unsafeWindow.infocompte_text.jp)
				{text = fusion(text,unsafeWindow.infocompte_text.cn);if(unsafeWindow.infocompte_text.jp.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.jp.tag.rc ; }	
			else if (options.generale.langue == 'cz' && unsafeWindow.infocompte_text.cz)
				{text = fusion(text,unsafeWindow.infocompte_text.cz);if(unsafeWindow.infocompte_text.cz.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.cz.tag.rc ; }	
			else if (options.generale.langue == 'kr' && unsafeWindow.infocompte_text.kr)
				{text = fusion(text,unsafeWindow.infocompte_text.kr);if(unsafeWindow.infocompte_text.kr.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.kr.tag.rc ; }			
			else if (options.generale.langue == 'lv' && unsafeWindow.infocompte_text.lv)
				{text = fusion(text,unsafeWindow.infocompte_text.lv);if(unsafeWindow.infocompte_text.lv.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.lv.tag.rc ; }				
			else if (options.generale.langue == 'tr' && unsafeWindow.infocompte_text.tr)
				{text = fusion(text,unsafeWindow.infocompte_text.tr);if(unsafeWindow.infocompte_text.tr.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.tr.tag.rc ; }				
			else if (options.generale.langue == 'sk' && unsafeWindow.infocompte_text.sk)
				{text = fusion(text,unsafeWindow.infocompte_text.sk);if(unsafeWindow.infocompte_text.sk.tag.rc) text.tag.rc = unsafeWindow.infocompte_text.sk.tag.rc ; }	
		}}
	
		var updateLang = false;
		
		if(FireFox)
		{
			if(unsafeWindow.infocompte_text) // Si y'a le script lang
			{
				if(unsafeWindow.infocompte_text.maj) // si y'a une version
				{
					if(unsafeWindow.infocompte_text.maj == 'false') updateLang = true;
				}
				else updateLang = true;
			}
		}
	/* *************************** Design du Script ****************************/
	if (document.getElementById('playerName'))
	{
		if(options.generale.transparant)
		{
			var background = '';
			var background2 = '';
			var background3='';
		}
		else
		{
			var background = 'data:image/gif;base64,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';
			var background2 = 'data:image/gif;base64,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';
			var background3 = 'data:image/gif;base64,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';
		}
		
/* **********************************************************************************************************************************************************************/
/* *********************************************************** Page Options   **********************************************************************************************/
/* **********************************************************************************************************************************************************************/
		var icone = 'data:image/gif;base64,R0lGODlhJgAdAMZlAAAAAAkKCgoKCg0ODg4ODhgaGx0eHx0fIB4fIR4gISEjJSUnKSgrLSosLi0wMi8xMzI1Nzo9QD1AQT1BQ0hISEZLTUhNUEpOUUtPUk5SVVJXWlNYXFRYW1VZXVhcX1hdYFpeYVxhZF1iZmJnamRpbGRqbmpvcmtxdW1zd291enF4fHN6f3d6e3V8gXh/hHmAhX2AgnqBhn6Fin+FioOJj4eKjImMj4qNj4uPkY2RlIyUmpGWmJOboZigp5ugo5ihp5miqJ+kp6ClqJ6nraOorKSpraSttKavtqevtaewt6qzubK3u7K5vbW7v7e9wbvBxr/Fyr/Gyr/Gy8LJzsTM0MXM0cnR1s7W29HY3dLa39Pb4dff5drj6Nzl6t3m697n7eDo7uDp7+Hp7+Hq7+Lq8P///////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAH8ALAAAAAAmAB0AAAf+gH+CFISFhoeIhIKLjI2Jj5AUjZN/kZaIlIyXm4qZg5yXnp+HPlVbX2JkqmJfW1U+iaKVhT5TWqq4ubljWDaGsoVTUsNXY7rHuFeFwBTDzlJWYMi5YVlRQp2eFEzPzlVex1tUS0E5N+cskqIUUN3OU1xdVk5FO+f39zXq2u3uw0848AnMty8ThSb+nBEZOBBGQUoCZhhRQrFiRSQmRmjcOIKERxASCMgCECPGjyQoU6bUEaKlS5cXIEAAMLJkDBlAjqhEeQTFyxAfMESQOXPkBpslafAYYkRnkh4eOGSoMIGozAM0RQEAUAKp15IqrIpdsHXkVg1fkYYVK9PA1qxGnt4CSNChRdq1RB8gCCDXrFwADSyIOLHCxYsUDhgoKDDgb1mtjiNL/ut3smXKkC9rfhx382ZZfzxfBi1ItGTSqFOrXk06EAA7';
		var icone2 = 'data:image/gif;base64,R0lGODlhJgAdAMZnAAAAAAoKCg4ODikbCzglDlc8H2U+FUhISHNGFnRHFnZIFm9NJoNPFo5UFZlZFaZfEalgEbJkEKNrL7ZsHa9xLq9yLrFyLrp1LLR3NMF3KMd4I8t4IM14Hc94GtF4GNV5Fdd5E9h5E7t+PNl+HNiUS+KbTeWcTdGibu6hTtisfPmnTvOoVvypTv6pTv+qTv+tVMm2ov+uV/WwZe+xbue1fuq3f+q8iuu9i/C/i/HAi9nErfXCiv7Bf/zCg9zHsP/Cf/jEjPzEiP3Eh/7Eh//Fh/vGjPzHjv/Hi+7MpvjOoe3Rs/LRq+3StfTRq/DSsPfRqPTSrffSq/nTqvnTq/HVt/7UqPXWtf/VqPXXt/TYuPjYt/PZvfrZt/XavPnauPnaufrat/Xbvfvat/bbvPfbu/fbvPjbu////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAH8ALAAAAAAmAB0AAAf+gH+CB4SFhoeIhIKLjI2Jj5AHjZN/kZaIlIyXm4qZg5yXnp+HPltkXmBiqmBeZFs+iaKVhTpQTKq4ublgZTCGsoVQV8NKXLrHuGOFwAdSw89OWsi7ZV1LnZ4HTc/cUFjHZl1WSUI/5jSSogdV3NxTVF9hWU9G5vb2POnZ7O3PUT33AuLTl0lbP25IBAqsQZBSgBFAjkicOLGIjBcYM76IwXHFBAGyAIQIgYOIyZMnbbhYyZJliQgRAIQcGeJEjiEoTQ6Z0dJFCxMYYMYMWYHmyBQ3dgTBSSQHCxUoSIgQCjOBTFEAAGQwynUkB6pgG2QNmZVCV6NfwcJEkPWqp7ZEAApY8HA2rVAICgbAJQsXwAIJFzR0+ABiwwMHDAwQ6DsWK+PHkPvyjUxZsuPKmBu/zZxZ1h/OlT0LAg1ZtOnTqFOLDgQAOw==';
		
		var aff_option ='<li><span class="menu_icon"><a href="http://vulca.netii.net/forum/" target="blank_" ><img class="mouseSwitch" src="'+icone+'" rel="'+icone2+'" height="29" width="38"></span><a class="menubutton " href="'+url+'&infocompte=scriptOptions" accesskey="" target="_self">';
			aff_option += '<span class="textlabel">InfoCompte</span></a></li>';
			
			
		var sp1 = document.createElement("span");
		sp1.setAttribute("id", "optionIFC");
		var sp1_content = document.createTextNode('');
		sp1.appendChild(sp1_content);				
		
		var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10];
		
		var parentDiv = sp2.parentNode;
		parentDiv.insertBefore(sp1, sp2.nextSibling);
		var tableau = document.createElement("span");
		tableau.innerHTML = aff_option;
		document.getElementById('optionIFC').insertBefore(tableau, document.getElementById('optionIFC').firstChild);
	
	// Page Options
	if ((url.indexOf('infocompte=scriptOptions',0))>=0)
	{		
			var couleur = new Array('','','','','');
			for (var i=0 ; i< listeCouleur.length ; i++)
				{couleur[i] = listeCouleur[i];}
			for(var i=0 ; i< option.length ; i++)
				{option[i] = oui_non_en_checked(option[i]);}
	
			var majLang = '';
			if(updateLang) majLang = '<a id="Maj lang" title="'+text.pas_a_jours+' '+text.install+'" href="http://userscripts.org/scripts/source/54665.user.js"><span style="font-color:#FF5555;">/!\\</span></a> ';
			
			var aff = '<br/><table id="IFC_table" style="width:675px; clear:right;"><br/><tr style="width:675px;"><th><table id="IFC_top" style="width:675px; margin:auto;margin-bottom: -2px; text-align:center;"><tr class="ICF_tr"><th class="IFC_th"  style="width:675px; font-size: 12px; font-weight: bold; color: #539fc8; line-height: 30px; height: 30px;" background="'+background+'" colspan="4" >'+text.ICoption+'</th><th class="IFC_th" ></th><th class="IFC_th2"></th></tr></table><center><table width="657px" id="IFC_mid" background="'+background2+'">';
				
			aff+= '<div class="group bborder"><div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.langue + majLang+'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('org')+' value="org" id="org" /> <label for="org"> tr </label> <input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('fr')+' value="fr" id="fr" /> <label for="fr"> fr </label>';
	
			if (FireFox) 
			{
			if ( unsafeWindow.infocompte_text)
			{
				if ( unsafeWindow.infocompte_text.de) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('de')+' value="de" id="de" /> <label for="de"> de </label>';
				if ( unsafeWindow.infocompte_text.se) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('se')+' value="se" id="se" /> <label for="se"> se </label><br/>' ;
				if ( unsafeWindow.infocompte_text.pt) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('com_pt')+' value="com_pt" id="com_pt" /> <label for="com_pt"> pt </label>';
				if ( unsafeWindow.infocompte_text.es) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('com_es')+' value="com_es" id="com_es" /> <label for="com_es"> es </label>';
				if ( unsafeWindow.infocompte_text.bg) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('bg')+' value="bg" id="bg" /> <label for="bg"> bg </label>';
				if ( unsafeWindow.infocompte_text.nl) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('nl')+' value="nl" id="nl" /> <label for="nl"> nl </label><br/>';
				if ( unsafeWindow.infocompte_text.fi) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('fi')+' value="fi" id="fi" /> <label for="fi"> fi </label>';
				if ( unsafeWindow.infocompte_text.dk) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('dk')+' value="dk" id="dk" /> <label for="dk"> dk </label>';
				if ( unsafeWindow.infocompte_text.no) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('no')+' value="no" id="no" /> <label for="no"> no </label>';
				if ( unsafeWindow.infocompte_text.onet_pl) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('pl')+' value="pl" id="pl" /> <label for="pl"> pl </label><br/>';
				if ( unsafeWindow.infocompte_text.gr) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('gr')+' value="gr" id="gr" /> <label for="gr"> gr </label>';
				if ( unsafeWindow.infocompte_text.ba) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('ba')+' value="ba" id="ba" /> <label for="ba"> ba </label>';
				if ( unsafeWindow.infocompte_text.ru) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('ru')+' value="ru" id="ru" /> <label for="ru"> ru </label>';
				if ( unsafeWindow.infocompte_text.ro) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('ro')+' value="ro" id="ro" /> <label for="ro"> ro </label><br/>';			
				if ( unsafeWindow.infocompte_text.it) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('it')+' value="it" id="it" /> <label for="it"> it </label>';			
				if ( unsafeWindow.infocompte_text.cn) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('cn')+' value="cn" id="cn" /> <label for="cn"> cn </label>';			
				if ( unsafeWindow.infocompte_text.cz) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('cz')+' value="cz" id="cz" /> <label for="cz"> cz </label>';			
				if ( unsafeWindow.infocompte_text.kr) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('kr')+' value="kr" id="kr" /> <label for="kr"> kr </label><br/>';			
				if ( unsafeWindow.infocompte_text.hu) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('hu')+' value="hu" id="hu" /> <label for="hu"> hu </label>';			
				if ( unsafeWindow.infocompte_text.hr) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('com_hr')+' value="com_hr" id="com_hr" /> <label for="com_hr"> hr </label>';	
				
				if ( unsafeWindow.infocompte_text.lt) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('lt')+' value="lt" id="lt" /> <label for="ro"> lt </label>';			
				if ( unsafeWindow.infocompte_text.jp) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('jp')+' value="jp" id="jp" /> <label for="jp"> jp </label>';			
				if ( unsafeWindow.infocompte_text.lv) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('lv')+' value="lv" id="lv" /> <label for="lv"> lv </label>';			
				if ( unsafeWindow.infocompte_text.tr) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('tr')+' value="tr" id="tr" /> <label for="tr"> tr </label>';			
				if ( unsafeWindow.infocompte_text.sk) aff += '<input style="cursor:pointer;" type="radio" class="langue" name="langue" '+checkLang('sk')+' value="sk" id="sk" /> <label for="sk"> sk </label>';			
					
				aff += ' </div></div><a href="http://vulca.netii.net/forum/viewtopic.php?f=23&t=7" style="float:center; font-size: 9px;" target="_blank"><br/>'+text.addTrad+' </a><br/>';  		
			}		
			else aff += ' </div></div><br/><sub><a href="http://userscripts.org/scripts/source/54665.user.js" >InfoCompte script başka diller yüklemek için buraya tıklayınız.</a> </sub>'; 
			}
		
			aff+= '<br/><br/><div style="size:30px; border-color:black; border-style:solid; border-width:1px; text-align:center;">'+text.options.Display+'</div>'
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.speed +'</label>';
			aff+=		'<div class="thefield"><input class="speed" value="'+speedUni+'" size="1" alt="24" maxlength="1" type="text"></div></div>';
						
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.Masquer +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[15]+' alt="15" type="checkbox"> </div></div>';
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.BatTotal +'</label>';
			aff+=		'<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[1]+' alt="1" type="checkbox"></div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.indestructible +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[2]+' alt="2" type="checkbox"> </div></div>';
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.techno +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[3]+' alt="3" type="checkbox"></div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.flottes+'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[4]+' alt="4" type="checkbox"> </div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+text.options.Def +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[5]+' alt="5" type="checkbox"></div></div>';
			aff+= '<div class="fieldwrapper" style="display:none;" ><label class="styled textBeefy">'+ text.options.VaisseauxVol +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[6]+' alt="6" type="checkbox"> </div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.pointLune +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[7]+' alt="7" type="checkbox"> </div></div>';
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.progression +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[9]+' alt="9" type="checkbox"> </div></div>';
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.ProgJours +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[11]+' alt="11" type="checkbox"> </div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.ProdJours +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[12]+' alt="12" type="checkbox"> </div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.Techno_utile +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[13]+' alt="13" type="checkbox"> </div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.Point_planete  +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[14]+' alt="14" type="checkbox"> </div></div>';
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.constructing  +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[27]+' alt="27" type="checkbox"> </div></div>';
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.enregFlotte +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[20]+' alt="20" type="checkbox"> </div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.rank +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[21]+' alt="21" type="checkbox"> </div></div>';
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.creeSign +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[16]+' alt="16" type="checkbox"> </div></div>';
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.creeSign +'('+text.options.creeSignRc+')</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[26]+' alt="26" type="checkbox"> </div></div>';
			
			
			var affAlterna ='';
			if( ! ((options.generale.langue == 'fr' ) || (url.indexOf('ogame.fr',0))>=0) )
			{
				affAlterna = 'style="display: none;"';
			}
			
			
			aff+= '<div '+affAlterna+' class="fieldwrapper"><label class="styled textBeefy">'+ text.options.alternative +'</label>';
			aff+=       '<div '+affAlterna+' class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[22]+' alt="22" type="checkbox"> </div></div>';
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.detailPointsPla +'</label>';
			aff+=       '<div  class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[28]+' alt="28" type="checkbox"> </div></div>';
			
			aff+= '<br/><br/><div style="size:30px; border-color:black; border-style:solid; border-width:1px; text-align:center;">'+text.options.design+'</div>'
	
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+text.options.Graphiccolours +'<br/></label>';
			if(option[1] == 'unchecked') 
			aff+=  		'<div class="thefield" ><input TITLE="'+text.Mines+' / '+text.en_vol+' / '+text.inutile+'" class="couleur" name="couleur" maxlength="6" value="'+couleur[0]+'" type="text" size="6" style="text-align:center; border:1px solid black;">  <input TITLE="'+text.Other_structure+'" class="couleur" name="couleur" maxlength="6" value="'+couleur[1]+'" type="text" size="6" style="text-align:center; border:1px solid black;">  <input TITLE="'+text.Technology+'" class="couleur" name="couleur" maxlength="6" value="'+couleur[2]+'" type="text" size="6" style="text-align:center; border:1px solid black;"><br/><input TITLE="'+text.Fleet+'"  class="couleur" name="couleur" maxlength="6" value="'+couleur[3]+'" type="text" size="6" style="text-align:center; border:1px solid black;"> <input TITLE="'+text.Defense+' / '+text.aQuai+' / '+text.utile+'" class="couleur" name="couleur" maxlength="6" value="'+couleur[4]+'" type="text" size="6" style="text-align:center; border:1px solid black;"></div></div>';
			else 
			aff+=  		'<div class="thefield" ><input TITLE="'+text.Structure+' / '+text.en_vol+' / '+text.inutile+'" class="couleur" name="couleur" maxlength="6" value="'+couleur[0]+'" type="text" size="6" style="text-align:center; border:1px solid black;">  <input TITLE="'+text.Technology+'" class="couleur" name="couleur" maxlength="6" value="'+couleur[1]+'" type="text" size="6" style="text-align:center; border:1px solid black;">  <input TITLE="'+text.Fleet+'" class="couleur" name="couleur" maxlength="6" value="'+couleur[2]+'" type="text" size="6" style="text-align:center; border:1px solid black;"><br/><input class="couleur" name="couleur" maxlength="6" value="'+couleur[3]+'" type="text" size="6" style="text-align:center; border:1px solid black;"> <input TITLE="'+text.Defense+' / '+text.aQuai+' / '+text.utile+'" class="couleur" name="couleur" maxlength="6" value="'+couleur[4]+'" type="text" size="6" style="text-align:center; border:1px solid black;"></div></div>';
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.Signtxt +'</label>';
			aff+=       '<div class="thefield"><input class="sign" name="couleur" maxlength="3" value="'+options.couleur.SigntxtR+'" type="text" size="4" style="text-align:center; border:1px solid black;"> <input class="sign" name="couleur" maxlength="3" value="'+options.couleur.SigntxtV+'" type="text" size="4" style="text-align:center; border:1px solid black;"> <input class="sign" name="couleur" maxlength="3" value="'+options.couleur.SigntxtB+'" type="text" size="4" style="text-align:center; border:1px solid black;"> <input  size="1" maxlength="0" class="testCouleur"/> </div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.Signfond +'</label>';
			aff+=       '<div class="thefield"><input class="sign" name="couleur" maxlength="3" value="'+options.couleur.SignfondR+'" type="text" size="4" style="text-align:center; border:1px solid black;"> <input class="sign" name="couleur" maxlength="3" value="'+options.couleur.SignfondV+'" type="text" size="4" style="text-align:center; border:1px solid black;"> <input class="sign" name="couleur" maxlength="3" value="'+options.couleur.SignfondB+'" type="text" size="4" style="text-align:center; border:1px solid black;"> <input size="1" maxlength="0" class="testCouleur"/></div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.progNeg +'</label>';
			aff+=       '<div class="thefield"><input class="coul" name="couleur" maxlength="6" value="'+options.couleur.progNeg+'" type="text" size="6" style="text-align:center; border:1px solid black;"></div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.progPos +'</label>';
			aff+=       '<div class="thefield"><input class="coul" name="couleur" maxlength="6" value="'+options.couleur.progPos+'" type="text" size="6" style="text-align:center; border:1px solid black;"></div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.CoulBBcode +'</label>';
			aff+=       '<div class="thefield"><input class="coul" name="couleur" maxlength="6" value="'+options.couleur.CoulBBcode+'" type="text" size="6" style="text-align:center; border:1px solid black;"><input class="coul" name="couleur" maxlength="6" value="'+options.couleur.CoulBBcode2+'" type="text" size="6" style="text-align:center; border:1px solid black;"></div></div>';	

			
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.BBcode_center +'</label>';
			aff+=       '<div class="thefield"><sub><input style="cursor:pointer;" type="radio" alt="17"  name="17"  id="center" '+option[17]+' class="InfoOptions" /> <label for="center">[center]</label> <input style="cursor:pointer;" type="radio" id="align" name="17" '+decheck(option[17])+' class="bbcode" /> <label for="align">[align=center]</label>';
			aff+=       ' <input style="cursor:pointer;" type="radio" id="center2" alt="25" name="17" '+option[25]+' class="InfoOptions" /> <label for="align">&lt;center&gt;</label></sub></div></div>';
			
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.BBcode_size +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" type="radio" alt="18"  name="18" '+option[18]+' id="30" class="InfoOptions" /> <label for="30">30</label> <input style="cursor:pointer;" type="radio" name="18" id="200" '+decheck(option[18])+' class="bbcode" /> <label for="200">200</label>'; 
			aff+= '			<input style="cursor:pointer;" type="radio" name="18" id="SMF" alt="19" '+option[19]+' class="InfoOptions" /> <label for="SMF">SMF</label></div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.sauterLignePourPourcentageFlotteVol+'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[8]+' alt="8" type="checkbox"> </div></div>';
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.couleurPoint +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[10]+' alt="10" type="checkbox"> </div></div>';
		
		
			aff+= '<div class="fieldwrapper"><label class="styled textBeefy">'+ text.options.sansDesing +'</label>';
			aff+=       '<div class="thefield"><input style="cursor:pointer;" class="InfoOptions" '+option[23]+' alt="23" type="checkbox"> </div></div>';
			
			aff+=       '<table id="IFC_down" style="clear: right;" width="663px" background="'+background3+'" height="22px"></table></table><br/>';
			
			document.getElementById('inhalt').innerHTML=aff;
   
  
	
			function enregistreOption() 
			{
			
				for(var i=0; i< document.getElementsByClassName('couleur').length ; i++)
					{document.getElementsByClassName('couleur')[i].style.background = '#'+document.getElementsByClassName('couleur')[i].value; }		
			
				for(var i=0; i< document.getElementsByClassName('coul').length ; i++)
					{document.getElementsByClassName('coul')[i].style.background = '#'+document.getElementsByClassName('coul')[i].value}
					
				document.getElementsByClassName('testCouleur')[0].style.background = 'rgb('+document.getElementsByClassName('sign')[0].value+','+document.getElementsByClassName('sign')[1].value+','+document.getElementsByClassName('sign')[2].value+')';
				document.getElementsByClassName('testCouleur')[1].style.background = 'rgb('+document.getElementsByClassName('sign')[3].value+','+document.getElementsByClassName('sign')[4].value+','+document.getElementsByClassName('sign')[5].value+')';
			
			/* ********************************************************** SAUVEGARDE ****************************************************************/
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
					
					var Block2 = document.getElementsByClassName('coul');
					var OptionCouleur = Block2[0].value+';'+Block2[1].value+';'+Block2[2].value+';'+Block2[3].value+';;;;;;;;;;;;;;'
					GM_setValue(nomScript+'OptionCouleur'+coordPM+serveur,OptionCouleur);
					
					var SOptions = new Array();
					SOptions[0] = CouleurGraph;
					var Block = document.getElementsByClassName('InfoOptions');
					for (var f=0 ; f < Block.length ; f++ )
					{
					
						SOptions[parseInt(Block[f].alt)]=Block[f].checked
					}
				
					GM_setValue(nomScript+"options"+coordPM+serveur, SOptions.join(';')+';;;;;;;;;');
				
					var couleursigna = document.getElementsByClassName('sign');
					var listeColSign = couleursigna[3].value+';'+couleursigna[4].value+';'+couleursigna[5].value+'-'+couleursigna[0].value+';'+couleursigna[1].value+';'+couleursigna[2].value+'|url|'+options.couleur.url;
					GM_setValue(nomScript+'couleurSign'+serveur+coordPM , listeColSign);
					
					//speed
					GM_setValue(nomScript+'speed'+serveur+coordPM ,document.getElementsByClassName('speed')[0].value+';;;');
		
					// Langue
					var list_lang = document.getElementsByClassName('langue');
					for (i=0 ; i<list_lang.length ; i++)
					{
						if (list_lang[i].checked == true ||list_lang[i].checked == 'true') 
						{
							GM_setValue(nomScript+'Langue_text'+coordPM+serveur,list_lang[i].value);
							i=list_lang.length;
						}
					}
			}
			setInterval(enregistreOption, 500);
			
	}
		
/* **********************************************************************************************************************************************************************/
/* *********************************************************** Page Défense   **********************************************************************************************/
/* **********************************************************************************************************************************************************************/

	else if ((url.indexOf('defense',0))>=0)
	{	
		var niv = new Array(0,0,0,0,0,0,0,0,0,0);
		
		var niveau ='';
		var pointRecherche=0;
		var bati ='';
		var niveaux = document.getElementsByClassName('level') ;
		var Encontruction = -1;
	
		for (var f=0; f<niv.length ; f++)
		{
			if(typeof(niveaux[f].getElementsByClassName('textlabel')[0])=="undefined") 
			{ 
				niveau = niveaux[f].innerHTML; 
				Encontruction = f;
			}
			else 
			{
				niveau = niveaux[f].innerHTML;
				bati = niveaux[f].getElementsByClassName('textlabel')[0].innerHTML;				
				niveau = niveau.replace(bati, '').replace(/<span class="textlabel"><\/span>/i, '');			
			}			
			niv[f]=parseInt(niveau.replace( /[^0-9-]/g, ""));			
		}
		
		var listeDef = niv.join('|')+'|';
	
		DefPla[numeroplanete] = listeDef;
		GM_setValue(nomScript+"DefPlanete"+coordPM+serveur,DefPla.join(";"));
		
		
		if(document.getElementById('shipSumCount'))
		{
			var nom_def = new Array('cle','clo','crois','vb','traq','bb','dest','rip','pt','gt','vc','rec','esp','sat','mic', 'mip','lm', 'lle', 'llo', 'gauss', 'ion', 'pla', 'pb', 'gb');
			var NomAffiche = GM_getValue(nomScript+url.split('/')[2].replace(url.split('/')[2].split('.')[0],''), '').replace('|','').split(';');
		
			Def_const[numeroplanete] = start_time + '-';

			for (var i=0 ; i< NomAffiche.length -1; i++)
			{
				if (document.getElementById('line').getElementsByClassName('data')[0].innerHTML.indexOf(NomAffiche[i]) >-1 )
					Def_const[numeroplanete]+= document.getElementById('shipSumCount').innerHTML+ '|'+nom_def[i] ;
			}
			
			if(document.getElementById('pqueue'))
			{
				var queue = document.getElementById('pqueue').getElementsByClassName('tipsStandard');
				for (var f=0 ; f< queue.length; f++)
				{
					for (var i=0 ; i< NomAffiche.length -1; i++)
					{
						if (queue[f].title.indexOf(NomAffiche[i]) >-1 )
							Def_const[numeroplanete]+= '-'+ queue[f].title.split('<')[0].replace( /[^0-9-]/g, "") + '|'+nom_def[i];
					}
				}
			}
		
		}
		else Def_const[numeroplanete]='|';

		if (GM_getValue(nomScript+url.split('/')[2].replace(url.split('/')[2].split('.')[0],''), 'PAS') != 'PAS')  // TechTree visité 
			GM_setValue(nomScript+"Def_const"+coordPM+serveur,Def_const.join(';'));
	}

	
	/* **********************************************************************************************************************************************************************/
	/* *********************************************************** Page Recherche   *******************************************************************************************/
	/* **********************************************************************************************************************************************************************/
	else if ((url.indexOf('page=research',0))>=0) 
	{ 
		
		var prixInitial = new Array(1.2,0.3,1.4,6,7,1,6.6,36,1.4,1,16,800,0,1,0.8,1);
		var nom_techno = new Array( 'ener', 'lase','ions','hype', 'plas', 'comb', 'impu', 'phyp', 'espi', 'ordi', 'astro' ,'rese', 'grav', 'arme','bouc', 'prot');
	
		var coutDeut = new Array(0.4,0,0.1,2,1,0.6,0.6,6,0.2,0.6,4,160,0,0,0,0);
		
		var LevelsTech = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		var exposant = new Array(2,2,2,2,2,2,2,2,2,2,1.75,2,2,2,2,2);
		
		
		// adaptation old uni avec new version prix Expé => PB si Expé devient Astro
		if( nonRedesignPrix )
			exposant = new Array(2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2);
		// **********//
		
		
		var niveau ='';
		var pointRecherche=0;
		var bati ='';
		var niveaux = document.getElementsByClassName('level') ;
		var listeNiv ='';
		var resEncontruction = -1;
		
	for (var f=0; f<prixInitial.length ; f++)
		{
			if(typeof(niveaux[f].getElementsByClassName('textlabel')[0])=="undefined") 
			{ 	
				niveau = niveaux[f].innerHTML; 
				resEncontruction=f;
			}
			else 
			{
				niveau = niveaux[f].innerHTML;
				bati = niveaux[f].getElementsByClassName('textlabel')[0].innerHTML;
				
				niveau = parseInt(niveau.replace(bati, '').replace(/<span class="textlabel"><\/span>/i, ''));
			}
			
				LevelsTech[f] = niveau;
				pointRecherche += Math.floor(prixInitial[f]*(Math.pow(exposant[f],LevelsTech[f])-1)/(exposant[f]-1)*1000)/1000;
		
				listeNiv += parseInt(LevelsTech[f])+';';
		}
		
			var pointsInutile =0;
			var pointstechInutile = 0;
		
			if (LevelsTech[1] > 12) // laser
			{
				pointsInutile+= Math.floor(prixInitial[1]*(Math.pow(2,LevelsTech[1])-1)*1000)/1000 - 1228.5;
				pointstechInutile+= LevelsTech[1] -12 ;
			}
			if (LevelsTech[2] > 5) // ions
			{
				pointsInutile+= Math.floor(prixInitial[2]*(Math.pow(2,LevelsTech[2])-1)*1000)/1000 - 43.4;
				pointstechInutile+= LevelsTech[2] -5 ;
			}
			if (LevelsTech[3] > 8) // Tech hyperespace
			{
				pointsInutile+= Math.floor(prixInitial[3]*(Math.pow(2,LevelsTech[3])-1)*1000)/1000 - 1530;
				pointstechInutile+= LevelsTech[3] -8 ;
			}
			if (LevelsTech[4] > 7) // Plasma
			{
				pointsInutile+=  Math.floor(prixInitial[4]*(Math.pow(2,LevelsTech[4])-1)*1000)/1000 - 889;
				pointstechInutile+= LevelsTech[4] -7 ;
			}
			
			if (LevelsTech[12] > 1) // Graviton
			{
				pointstechInutile+= LevelsTech[12] -1 ;
			}
		
			var PointsTech =0;
			for (var i=0 ; i<LevelsTech.length ; i++)
			{
				PointsTech+=parseInt(LevelsTech[i]);
			}
			
			if(options.generale.Techno_utile)
			{
				var affiche ='';
				if(document.getElementsByClassName('antires')[0]) affiche +='<div style="margin-top: -200px;margin-right: 260px;"><table style="margin:auto;">';
			
				affiche +='<div style="margin-top: -140px; margin-right:-20px;"><table id="IFC_top" style="clear:right; width:675px; margin:auto;margin-bottom: -2px; text-align:center;"><tr class="ICF_tr"><th class="IFC_th"  style="width:675px; font-size: 12px; font-weight: bold; color: #539fc8; line-height: 30px; height: 30px;" background="'+background+'" colspan="4" >'+text.Technology+'</th><th class="IFC_th" ></th><th class="IFC_th2"></th></tr></table><center><table id="IFC_mid" width="657px" background="'+background2+'" background-color="#0d1014">';
				affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="width:70px; '+th_style+'" >'+text.utile+'</th><th class="IFC_th"  style="'+th_style+'" >'+ addPoints(Math.round(pointRecherche-pointsInutile)) +' '+text.Points+' ( '+Math.round(PointsTech-pointstechInutile)+' '+text.Technologies+')</th><th class="IFC_th"  style="width:200px; border:1px solid black;" rowspan="2" id="piebox"></th></tr>';
				affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="width:70px; '+th_style+'" >'+text.inutile+'</th><th class="IFC_th"  style="'+th_style+'" >'+ addPoints(Math.round(pointsInutile)) +' '+text.Points+' ( '+pointstechInutile+' '+text.Technologies+')</th><th class="IFC_th"  width="4px"></th></tr>';
				affiche +='</table><table id="IFC_down" width="663px" background="'+background3+'" height="22px"></table></div><br/><br/><br/><br/>';
				
				if(document.getElementsByClassName('antires')[0]) affiche +='</table></div>';

				var sp1 = document.createElement("span");
				sp1.setAttribute("id", "newDivIFC");
				var sp1_content = document.createTextNode('');
				sp1.appendChild(sp1_content);
				var sp2 = document.getElementById("box");
				var parentDiv = sp2.parentNode;
				parentDiv.insertBefore(sp1, sp2.nextSibling);

				var tableau = document.createElement("span");
				tableau.innerHTML = '<br/><br/>'+affiche;
				 document.getElementById('newDivIFC').insertBefore(tableau, document.getElementById('newDivIFC').firstChild);
				
			
				var pie = draw_pie([pourcent(pointsInutile,pointRecherche),pourcent(pointRecherche-pointsInutile,pointRecherche)]);
				var piebox = document.getElementById('piebox');		
				piebox.appendChild(pie);
			}
			
			GM_setValue(nomScript+"pointTechnoUni"+coordPM+serveur,Math.round(pointRecherche)+';'+pointsInutile);
			GM_setValue(nomScript+"nivTechno"+coordPM+serveur, listeNiv );
			
		
		if(resEncontruction > -1  )
		{
			if (Res_const == '|')
			{
			
				var listLab = new Array();
				var laboTot = parseInt(BatSta[numeroplanete].split('|')[2]);
				var f=0;
				for(var i=0; i< BatSta.length-1 ; i++)
				{
					if(i != numeroplanete && BatSta[i].split('|')[2] != '')
					{ 
						listLab[f] = parseInt(BatSta[i].split('|')[2]);
						f++;
					}
					
				}
				listLab = listLab.sort();

				for(var i=0; i< LevelsTech[11] ; i++)
				{
					laboTot+= listLab[listLab.length-i];
				}
				
				
				var prix = Math.floor((prixInitial[resEncontruction]-coutDeut[resEncontruction])*(Math.pow(exposant[resEncontruction],LevelsTech[resEncontruction]))*1000);
				var timeFin =  Math.round((new Date()).getTime() + (prix / (1000 * (1 + laboTot)))/speedUni*3600000) ;
		
				Res_const = nom_techno[resEncontruction] + '|'+timeFin ;
			}
		}
		else Res_const ='|';
		
		if (GM_getValue(nomScript+url.split('/')[2].replace(url.split('/')[2].split('.')[0],''), 'PAS') != 'PAS')  // TechTree visité 		
			GM_setValue(nomScript+"Res_const"+coordPM+serveur,Res_const);	

	}
	
	/* **********************************************************************************************************************************************************************/
	/* *********************************************************** Page Bâtiments / ressources   *********************************************************************************/
	/* **********************************************************************************************************************************************************************/
	
	else if ((url.indexOf('page=resources',0))>=0) 
	{ 
		var tdnode = document.getElementsByClassName('level');
		
		var LUNE = false;
		if(document.getElementById('building').innerHTML.indexOf('<li id="button1" class="off">') != -1 && document.getElementById('building').innerHTML.indexOf('<li id="button2" class="off">') != -1&& document.getElementById('building').innerHTML.indexOf('<li id="button3" class="off">') != -1 && document.getElementById('building').innerHTML.indexOf('<li id="button4" class="off">') != -1 && document.getElementById('box').innerHTML.indexOf('title="Mode vacances|') == -1 )
 LUNE = true;
 
		// PROBLEME mode vacance => planete = lune 
		if (!LUNE) 
		{
		
			var prixInitial = new Array(0.075,0.072,0.3,0.105,1.44,0,1,1.5,2);
			var coutDeut = new Array(0,0,0,0,0.18,0,0,0,0);
			var nom_bat = new Array('mmet', 'mcri' , 'mdet', 'ces', 'cef','sat', 'hmet', 'hcri', 'hdet');
			var exposant = new Array(1.5,1.6,1.5,1.5,1.8,0,2,2,2);
		}
		else // Si Lune
		{
			var prixInitial = new Array(2,3,4);
			var nom_bat = new Array('hmet', 'hcri', 'hdet');
			var coutDeut = new Array(0,0,0);
			var exposant = new Array(2,2,2);
		}
			// adaptation old uni avec new version prix Expé => PB si Expé devient Astro
		
		if( nonRedesignPrix )
			prixInitial = new Array(0.075,0.072,0.3,0.105,1.44,0,2,3,4);
			

			
		var niv = new Array(0,0,0,0,0,0,0,0,0,0);
		var prod=0;
		
		var batEncontruction = -1;
		
		var niveaux = document.getElementsByClassName('level') ;
		
		var niveau ='';
		var bati = '';
		for (var f=0; f<prixInitial.length ; f++)
		{
			if(typeof(niveaux[f].getElementsByClassName('textlabel')[0])=="undefined") // Batiment en construction
			{ 
				niveau = niveaux[f].innerHTML;
				batEncontruction = f;
			}
			else 
			{
				niveau = niveaux[f].innerHTML;
				
				bati = niveaux[f].getElementsByClassName('textlabel')[0].innerHTML;
				
				niveau = parseInt(niveau.replace(bati, '').replace(/<span class="textlabel"><\/span>/i, ''));
			
			}
				niv[f] = niveau;
		}
		
		var nivPlanete = niv.join('|')+'|';
		
		BatRes[numeroplanete] = nivPlanete;
		GM_setValue(nomScript+"BatRes"+coordPM+serveur,BatRes.join(";"));

		if(batEncontruction > -1)
		{
			if (BatRes_const[numeroplanete] == '|')
			{
				var prix = Math.floor((prixInitial[batEncontruction]-coutDeut[batEncontruction])*(Math.pow(exposant[batEncontruction],niv[batEncontruction]))*1000);
				var timeFin = Math.round((new Date()).getTime() + ((prix/5000)*(2/(1+parseInt(BatSta[numeroplanete].split('|')[0])))*(1/Math.pow(2,parseInt(BatSta[numeroplanete].split('|')[5])))/speedUni)*3600000) ;
			
				BatRes_const[numeroplanete] = nom_bat[batEncontruction] + '|'+timeFin ;				
			}
		}
		else BatRes_const[numeroplanete] ='|';
		
		if (GM_getValue(nomScript+url.split('/')[2].replace(url.split('/')[2].split('.')[0],''), 'PAS') != 'PAS')  // TechTree visité 
			GM_setValue(nomScript+"BatRes_const"+coordPM+serveur,BatRes_const.join(';'));
	}

	/* **********************************************************************************************************************************************************************/
	/* *********************************************************** Page Bâtiments / Station   ************************************************************************************/
	/* **********************************************************************************************************************************************************************/

	else if ((url.indexOf('page=station',0))>=0)
	{ 
		var LUNE = false;
		if(!document.getElementById('details15')) LUNE = true; // Si planete (nanite)
		
		if (!LUNE) 		// Si planete 
		{	
			var prixInitial = new Array(0.720,0.7,0.8,60,41,1600,150);
			var coutDeut = new Array(0.2,0.1,0.2,0,1,100,100);
			var nom_bat = new Array('rob','cspa','lab', 'depo', 'silo', 'nan',  'ter' );
		}
		
		else 						 					// Si Lune
		{
			var prixInitial = new Array(0.720,0.7,80,80,8000);
			var coutDeut = new Array(0.2,0.1,20,20,2000);
			var nom_bat = new Array('rob','cspa', 'base', 'phal', 'port');			
		}

		var niv = new Array(0,0,0,0,0,0,0,0,0,0);
		var exposant = new Array(2,2,2,2,2,2,2,2,2,2,2,2,2,2);
		
		var niveaux = document.getElementsByClassName('level') ;
		var batEncontruction =-1;
		var niveau ='';
		var bati = '';
		for (var f=0; f<prixInitial.length ; f++)
		{
			if (!document.getElementById('details34') && (f == 3) && !LUNE) // Pas de depo sur planete, on le saute
			{
				niv[f] = 0;
				f++;
			}
			
			if(typeof(niveaux[f].getElementsByClassName('textlabel')[0])=="undefined") 
			{ 
				niveau = niveaux[f].innerHTML; 
				batEncontruction = f;
			}
			else 
			{
				niveau = niveaux[f].innerHTML;
				bati = niveaux[f].getElementsByClassName('textlabel')[0].innerHTML;
				niveau = parseInt(niveau.replace(bati, '').replace(/<span class="textlabel"><\/span>/i, ''));
			}
			niv[f] = niveau ; 			
		}
	
		var nivPlanete ='';
		
		if (!LUNE)
		{
			for(var i =0 ; i< prixInitial.length ; i++)
				{nivPlanete += niv[i] +'|';}
				nivPlanete += '0|0|0|'+LUNE+'|';
		}
		else		nivPlanete = niv[0]+'|'+niv[1]+'|0|0|0|0|0|'+niv[2]+'|'+niv[3]+'|'+niv[4]+'|'+LUNE+'|';
		
		BatSta[numeroplanete] = nivPlanete ;

		GM_setValue(nomScript+"BatSta"+coordPM+serveur,BatSta.join(";"));
		
		if(batEncontruction > -1)
		{
			if (BatSta_const[numeroplanete] == '|')
			{
				var prix = Math.floor((prixInitial[batEncontruction]-coutDeut[batEncontruction])*(Math.pow(2,niv[batEncontruction]))*1000);
				
				var timeFin =  Math.round((new Date()).getTime() + ((prix/5000)*(2/(1+parseInt(nivPlanete.split('|')[0])))*(1/Math.pow(2,parseInt(nivPlanete.split('|')[5])))/speedUni)*3600000) ;
			
				BatSta_const[numeroplanete] = nom_bat[batEncontruction] + '|'+timeFin ;
			}
			
		}
		else BatSta_const[numeroplanete] ='|';
		
		if (GM_getValue(nomScript+url.split('/')[2].replace(url.split('/')[2].split('.')[0],''), 'PAS') != 'PAS')  // TechTree visité 
			GM_setValue(nomScript+"BatSta_const"+coordPM+serveur,BatSta_const.join(';'));
		
	}
	
	/* **********************************************************************************************************************************************************************/
	/* *********************************************************** Page Flotte Movement  ***************************************************************************************/
	/* **********************************************************************************************************************************************************************/

	else if ((url.indexOf('page=movement',0))>=0) 
	{ 
	
		var niv = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		var listeFlotte = document.getElementsByClassName('fleetinfo');
		var listeVaisseau ='';
		var prix_vaisseau = new Array(4,10,29,60,85,90,125,10000,4,12,40,18,1);
		var nom_vaisseau = GM_getValue(nomScript+url.split('/')[2].replace(url.split('/')[2].split('.')[0],''),';;;;;;;;;;;;;;;;;;;').split('|')[0].split(';');
		var prixFlotteVol = 0;
		var pointFlotteVol = 0;
		var pointFlotteTotal = GM_getValue(nomScript+"pointFlotte"+coordPM+serveur,0);
	
		for (var i=0 ; i<listeFlotte.length ; i++)
		{
			listeVaisseau = listeFlotte[i].getElementsByTagName('td');
			
			for(var f=0; f<listeVaisseau.length-1 ; f++)
			{
				for (var j=0; j< nom_vaisseau.length ; j++)
				{
					if(listeVaisseau[f].innerHTML.indexOf(nom_vaisseau[j]) > -1) 
					{
						prixFlotteVol += parseInt(listeVaisseau[f+1].innerHTML.replace( /[^0-9-]/g, "")*prix_vaisseau[j]);
						pointFlotteVol += parseInt(listeVaisseau[f+1].innerHTML.replace( /[^0-9-]/g, ""));
						niv[j] += parseInt(listeVaisseau[f+1].innerHTML.replace( /[^0-9-]/g, ""));
					}
				}
			}
		}	
		if( options.generale.VaisseauxVol && prixFlotteVol > 0)
		{
			
			var affiche ='<br/><br/><div style="clear:both;margin-top: 0px; margin-right:0px;"><table id="IFC_top" style="clear:right; width:675px; margin:auto;margin-bottom: -2px; text-align:center;"><tr class="ICF_tr"><th class="IFC_th"  style="width:675px; font-size: 12px; font-weight: bold; color: #539fc8; line-height: 30px; height: 30px;" background="'+background+'" colspan="4" >'+text.Fleet+'</th><th class="IFC_th" ></th><th class="IFC_th2"></th></tr></table><center><table id="IFC_mid" width="657px" background="'+background2+'" background-color="#0d1014">';
			affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="width:70px; '+th_style+'" >'+text.en_vol+'</th><th class="IFC_th"  style="'+th_style+'" TITLE="'+pointFlotteVol+' '+text.vaisseaux+'" >'+ addPoints(prixFlotteVol) +' '+text.Points+' ( '+pourcent(prixFlotteVol,pointFlotteTotal)+' %) </th><th class="IFC_th"  style="width:200px; border:1px solid black;" rowspan="2" id="piebox"></th></tr>';
			affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="width:70px; '+th_style+'" >'+text.aQuai+'</th><th class="IFC_th"  style="'+th_style+'" >'+ addPoints(pointFlotteTotal-prixFlotteVol) +' '+text.Points+' ( '+pourcent(pointFlotteTotal-prixFlotteVol,pointFlotteTotal)+' %)</th><th class="IFC_th"  width="4px"></th></tr>';
			affiche +='</table><table id="IFC_down" width="663px" background="'+background3+'" height="22px"></table><br/><br/><br/><br/>';
			
			
			var sp1 = document.createElement("span");
			sp1.setAttribute("id", "newDivIFC");
			var sp1_content = document.createTextNode('');
			sp1.appendChild(sp1_content);
			if (document.getElementsByClassName("fleetDetails detailsOpened")[0]) var sp2 = document.getElementsByClassName("fleetDetails detailsOpened")[document.getElementsByClassName("fleetDetails detailsOpened").length-1];
			else var sp2 = document.getElementsByClassName("fleetStatus")[0];
			var parentDiv = sp2.parentNode;
			parentDiv.insertBefore(sp1, sp2.nextSibling);

			var tableau = document.createElement("span");
			tableau.innerHTML = affiche;
			document.getElementById('newDivIFC').insertBefore(tableau, document.getElementById('newDivIFC').firstChild);

			var pie = draw_pie([pourcent(pointFlotteTotal-prixFlotteVol,pointFlotteTotal),pourcent(prixFlotteVol,pointFlotteTotal)]);
			var piebox = document.getElementById('piebox');		
			piebox.appendChild(pie);	
		}
		
		if( options.generale.saveFleet)
		{
			flotte[0] = niv.join("|");
			GM_setValue(nomScript+"flotte"+coordPM+serveur,flotte.join(";"));
		}
	}
	

	
	
	/* **********************************************************************************************************************************************************************/
	/* *********************************************************** Page shipyard ***************************************************************************************/
	/* **********************************************************************************************************************************************************************/

	else if((url.indexOf('page=shipyard',0))>=0 )
	{
		var niv = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
			
		var niveau ='';
		var bati ='';
		var niveaux = document.getElementsByClassName('level') ;
		
		for (var f=0; f<niv.length ; f++)
		{
			if(typeof(niveaux[f].getElementsByClassName('textlabel')[0])=="undefined") 
			{ 
				niveau = niveaux[f].innerHTML; 
			}
			else 
			{
				niveau = niveaux[f].innerHTML;
				bati = niveaux[f].getElementsByClassName('textlabel')[0].innerHTML;
				
				niveau = niveau.replace(bati, '').replace(/<span class="textlabel"><\/span>/i, '');
				
			}			
			niv[f]=parseInt(niveau.replace( /[^0-9-]/g, ""));						
		}
		
		var listeFlotte = niv.join('|')+'|';

		flotte[numeroplanete+1] = listeFlotte;
		if(options.generale.saveFleet) GM_setValue(nomScript+"flotte"+coordPM+serveur,flotte.join(";"));
		
		function divise( n, d)
		{
			if (d==0) return n*10^10;
			else return Math.floor(n/d/1000);
		}
		
	//	if(!document.getElementById('shipSumCount')) Def_const[numeroplanete]='|'; // RaZ
		
		function VaisseauOuvert()
		{

			if(document.getElementsByClassName('build-it')[0])
			{
				if(first)
				{	
					first = false;
					document.getElementsByClassName('build-it')[0].addEventListener("click", function(event) 
					{
						var metal = parseInt(document.getElementById('resources_metal').innerHTML.replace( /[^0-9-]/g, ""));
						var cristal =  parseInt(document.getElementById('resources_crystal').innerHTML.replace( /[^0-9-]/g, ""));
						var deut =  parseInt(document.getElementById('resources_deuterium').innerHTML.replace( /[^0-9-]/g, ""));
						
						var prixM = new Array(3,	6,	20,	45,	30,	50,	60,	5000,	2,	6,	10,	10,	0,	0);
						var prixC = new Array(1,	4, 	7,	15,	40,	25,	50,	4000,	2,	6,	20,	6,	1,	2);
						var prixD = new Array(0,	0, 	0,	0,	15,	15,	15,	1000,	0,	0,	10,	2,	0,	0.5);
						
						var nom_def = new Array('cle','clo','crois','vb','traq','bb','dest','rip','pt','gt','vc','rec','esp','sat','mic', 'mip','lm', 'lle', 'llo', 'gauss', 'ion', 'pla', 'pb', 'gb');
						var NomAffiche = GM_getValue(nomScript+url.split('/')[2].replace(url.split('/')[2].split('.')[0],''), '').replace('|','').split(';');
		
						var nom = document.getElementById('detail').getElementsByTagName('h2')[0].innerHTML ;
						var nombre = parseInt(document.getElementById('number').value);
						
						if(isNaN(nombre)) nombre = 1; // Si on ecrit rien

						for( var i=0 ; i<prixM.length ; i++ )
						{
							if(nom.indexOf(NomAffiche[i]) >-1)
							{
								nombre = Math.min( nombre, divise(metal,prixM[i]), divise(cristal,prixC[i]), divise(deut,prixD[i]));
							
								if(Def_const[numeroplanete] == '|') // Si rien en construction
									Def_const[numeroplanete] = start_time + '-' + nombre +'|'+nom_def[i];
								else Def_const[numeroplanete] += '-' + nombre +'|'+nom_def[i]; // Si non, on ajout a la suite
								
									GM_setValue(nomScript+"Def_const"+coordPM+serveur,Def_const.join(';'));
							
								i=prixM.length;
							}
						}
						
					}, true);
				}
			}
			else first = true;
		}
		
		var first = true;
		
		if (GM_getValue(nomScript+url.split('/')[2].replace(url.split('/')[2].split('.')[0],''), 'PAS') != 'PAS') // TechTree visité 
			setInterval(VaisseauOuvert, 80);
	}
	
	/* **********************************************************************************************************************************************************************/
	/* *********************************************************** Page Flotte ***************************************************************************************/
	/* **********************************************************************************************************************************************************************/

	
	else if((url.indexOf('page=fleet1',0))>=0 && options.generale.saveFleet)
	{
	
		if (!document.getElementById('movements')) {flotte[0]='0|0|0|0|0|0|0|0|0|0|0|0|0|0|';}; // Pas de flotte en vol
		
		if (!document.getElementsByClassName('level')[0] ) {flotte[numeroplanete+1]='0|0|0|0|0|0|0|0|0|0|0|0|0|'+flotte[numeroplanete+1].split('|')[13]+'|';} // Pas de flotte a quai
		else
		{
			var niv = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);
				
			var niveau ='';
			var bati ='';
			var niveaux = document.getElementsByClassName('level') ;
			var listeVais = flotte[numeroplanete+1].split('|');
		
			for (var f=0; f<niv.length ; f++)
			{
				if(typeof(niveaux[f].getElementsByClassName('textlabel')[0])=="undefined") 
				{ 
					niveau = niveaux[f].innerHTML; 
				}
				else 
				{
					niveau = niveaux[f].innerHTML;
					bati = niveaux[f].getElementsByClassName('textlabel')[0].innerHTML;
					
					niveau = niveau.replace(bati, '').replace(/<span class="textlabel"><\/span>/i, '');
				}			
				niv[f]=parseInt(niveau.replace( /[^0-9-]/g, ""));							
				
				
				listeVais[f] =niv[f];

			}
			flotte[numeroplanete+1] =listeVais.join("|");
		}
		
		GM_setValue(nomScript+"flotte"+coordPM+serveur,flotte.join(";"));
	}
	
	/* **********************************************************************************************************************************************************************/
	/* *********************************************************** Page Statistique  ******************************************************************************************/
	/* **********************************************************************************************************************************************************************/
	else if ((url.indexOf('page=statistics',0))>=0) 
	{ 
		var pointIndest = parseInt(GM_getValue(nomScript+"pointIndest"+coordPM+serveur,'0'));
		var pointsUni=new Array();
		var statEnre = new Array();
			
		document.getElementsByTagName('body')[0].addEventListener("mouseover",function(event) 
		{
			
			if(document.getElementById('inhalt').getElementsByClassName('score') && document.getElementById('points').className== 'active' && document.getElementById('player').className== 'active')
			{ // si dans les stats points
				var numStat =parseInt(document.getElementById('claim').innerHTML.split('-')[1])/100 - 1;
				if(!statEnre[numStat])
				{
					var pointUniEnr = GM_getValue(nomScript+"pointUni"+coordPM+serveur,'0|0').split('|');
					var timeUniEnr = GM_getValue(nomScript+"timeUni"+coordPM+serveur,'0|0').split('|');
					statEnre[numStat]=true;
					pointsUni[numStat]=0;
					for( var i=1; i<document.getElementById('inhalt').getElementsByClassName('score').length-1 ; i++)
					{
						pointsUni[numStat] +=parseInt(document.getElementById('inhalt').getElementsByClassName('score')[i].innerHTML.split('<span')[0].replace( /[^0-9-]/g, ""));	
					
						if (pointIndest <= parseInt(document.getElementById('inhalt').getElementsByClassName('score')[i].innerHTML.replace( /[^0-9-]/g, "")) && pointIndest >= parseInt(document.getElementById('inhalt').getElementsByClassName('score')[i+1].innerHTML.replace( /[^0-9-]/g, "")))		
							GM_setValue(nomScript+'rankIndes'+coordPM+serveur, document.getElementById('inhalt').getElementsByClassName('position')[i+1].innerHTML.split('<span')[0].replace( /[^0-9-]/g, ""));	
					}
					
					pointUniEnr[numStat]=pointsUni[numStat];
					timeUniEnr[numStat] = (new Date()).getTime();
					GM_setValue(nomScript+"pointUni"+coordPM+serveur,pointUniEnr.join('|'));
					GM_setValue(nomScript+"timeUni"+coordPM+serveur,timeUniEnr.join('|'));
			
				}
				
			}
			
		}, true);
		
	}
	
	/* **********************************************************************************************************************************************************************/
	/* *********************************************************** Page Vue Générale  ******************************************************************************************/
	/* **********************************************************************************************************************************************************************/
	
	else if ((url.indexOf('page=overview',0))>=0) 
	{ 
	/* ********************************* Points total  *****************************************/
		var tdnode = document.getElementsByTagName('script');
		//alert(GM_getValue(nomScript+"pointUni"+coordPM+serveur,'0|0')+'\n'+GM_getValue(nomScript+"timeUni"+coordPM+serveur,'0|0'));

		var sentence1 = "<a href='index.php?page=statistics&session=";
		var sentence2 = "(";
		var sentence3 = ")";
		var nbJoueur='';
		
		
		for (var i=0 ; i<tdnode.length ; i++)
		{
			var pos1 = (tdnode[i].innerHTML).indexOf(sentence1,10);
			var pos3 = (tdnode[i].innerHTML).indexOf(sentence2,10);

			if (pos1>=0)
			{
				var pos2 = (tdnode[i].innerHTML).indexOf(sentence2,pos1+sentence1.length);
				var PointsTotal = (tdnode[i].innerHTML).substring(pos1+sentence1.length +14,pos2);
				PointsTotal=parseInt(PointsTotal.replace( /[^0-9-]/g, ""));
			
				GM_setValue(nomScript+"pointsTotal"+coordPM+serveur,PointsTotal);
				
				nbJoueur  = (tdnode[i].innerHTML).slice((tdnode[i].innerHTML).indexOf(sentence1)+sentence1.length +14, (tdnode[i].innerHTML).indexOf(')',(tdnode[i].innerHTML).indexOf(sentence1)+sentence1.length +14 ));
				nbJoueur = nbJoueur.split(/[^0-9\.]/)[nbJoueur.split(/[^0-9\.]/).length-1].replace( /[^0-9-]/g, "");
			}
		}
	}
	

		// efface si décolo
		if(DefPla[nbPlanet] != '|||||||||||||' && url.indexOf('page=fleet2') == -1 ) // Evite bug disparition des planetes au fleet2
		{
			//alert('erase nb planet :'+ nbPlanet);
			DefPla[nbPlanet] = '|||||||||||||'; GM_setValue(nomScript+"DefPlanete"+coordPM+serveur,DefPla.join(';'));
			BatRes[nbPlanet] = '|||||||||||||'; GM_setValue(nomScript+"BatRes"+coordPM+serveur,BatRes.join(';'));
			BatSta[nbPlanet] = '|||||||||||||'; GM_setValue(nomScript+"BatSta"+coordPM+serveur,BatSta.join(';'));
			BatRes_const[nbPlanet] = '|'; 
			BatSta_const[nbPlanet] = '|';
			Def_const[nbPlanet]= '|';
			GM_setValue(nomScript+"BatSta_const"+coordPM+serveur,BatSta_const.join(';'));
			GM_setValue(nomScript+"BatRes_const"+coordPM+serveur,BatRes_const.join(';'));
			GM_setValue(nomScript+"Def_const"+coordPM+serveur,Def_const.join(';'));
		}
		var DATA = new Array();	
		DATA.planet = new Array();				
		
		DATA.info = 
		{
			player : pseudo,
			coordPM : CoordPM,
			serveur : serveur,
			speed : speedUni,
			points : GM_getValue(nomScript+"pointsTotal"+coordPM+serveur,''),
			numeroPlanete : numeroplanete,
		}
		
		var f = 0;

		var prixInitial_defEtFlotteSansDeut = {'cle':4,'clo':10,'crois':27,'vb':60,'traq':70,'bb':75,'dest':115,'rip':9000,'pt':4,'gt':12,'vc':30,'rec':16,'esp':1,'sat':2,'lm':2,'lle':2,'llo':8,'gauss':35,'ion':8,'pla':100,'pb':20,'gb': 100,'mic':8,'mip':15};
		var prixInitial_defEtFlotte = {'cle':4,'clo':10,'crois':29,'vb':60,'traq':85,'bb':90,'dest':125,'rip':10000,'pt':4,'gt':12,'vc':40,'rec':18,'esp':1,'sat':2.5,'mic':10, 'mip':25,'lm':2,'lle':2,'llo':8,'gauss':37,'ion':8,'pla':130,'pb':20,'gb':100};
		
		var nom_flotte = new Array('cle','clo','crois','vb','traq','bb','dest','rip','pt','gt','vc','rec','esp','sat');
		
		var nom_def = new Array('lm', 'lle', 'llo', 'gauss', 'ion', 'pla', 'pb', 'gb', 'mic', 'mip');
		var prixInitial_def = new Array(2,2,8,37,8,130,20,100,10,25);

		var nom_techno = new Array('espi', 'ordi', 'arme', 'bouc', 'prot', 'ener', 'hype', 'comb', 'impu', 'phyp', 'lase', 'ions', 'plas', 'rese', 'astro');
		var OrdreTech = {'espi':0, 'ordi':1, 'arme':2, 'bouc':3, 'prot':4, 'ener':5, 'hype':6, 'comb':7, 'impu':8, 'phyp':9, 'lase':10, 'ions':11, 'plas':12, 'rese':13, 'astro':14}
		var prixInitial_tech = new Array(1.4,1,1,0.8,1,1.2,6,1,6.6,36,0.3,1.4,7,800,16);
		
		var exposant_tech = new Array(2,2,2,2,2,2,2,2,2,2,2,2,2,2,1.75);
		
		var nom_bat = new Array('mmet', 'mcri' , 'mdet', 'ces', 'cef', 'nan', 'lab', 'ter', 'silo', 'depo', 'cspa','rob', 'hmet', 'hcri', 'hdet', 'base', 'phal', 'port');
		var prixInitial_bat = new Array(0.075,0.072,0.3,0.105,1.44,1600,0.8,150,41,60,0.7,0.720,1,1.5,2,80,80,8000);
		var exposant = new Array(1.5,1.6,1.5,1.5,1.8,2,2,2,2,2,2,2,2,2,2,2,2,2);
		
		// adaptation old uni avec new version prix Expé => PB si Expé devient Astro
		if( nonRedesignPrix )
		{
			exposant_tech = new Array(2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2);
			prixInitial_bat = new Array(0.075,0.072,0.3,0.105,1.44,1600,0.8,150,41,60,0.7,0.720,2,3,4,80,80,8000);
		}
		
		var OrdreBat = {'mmet':0, 'mcri':1 , 'mdet':2, 'ces':3, 'cef':4, 'nan':5, 'lab':6, 'ter':7, 'silo':8, 'depo':9, 'cspa':10,'rob':11, 'hmet':12, 'hcri':13, 'hdet':14, 'base':15, 'phal':16, 'port':17}
			
		var Geolog = 1;
		if(document.getElementsByTagName('body')[0].innerHTML.indexOf('src="/game/img/layout/geologe_ikon.gif"') != -1) // Si géologue
			{	Geolog = 1.1;}
		
		var Constructing = 0;
		var listeMinepact='';
		
		for (var i=0 ; i< nbPlanet; i++)
		{
			DATA.planet[i] = 
			{	
				moon : BatSta[i].split('|')[10],
				building :
				{
					'mmet': BatRes[i].split('|')[0] , 
					'mcri': BatRes[i].split('|')[1] , 
					'mdet': BatRes[i].split('|')[2], 
					'ces': BatRes[i].split('|')[3], 
					'cef': BatRes[i].split('|')[4], 
					'nan': BatSta[i].split('|')[5], 
					'lab': BatSta[i].split('|')[2], 
					'ter': BatSta[i].split('|')[6], 
					'silo': BatSta[i].split('|')[4], 
					'depo': BatSta[i].split('|')[3], 
					'cspa': BatSta[i].split('|')[1],
					'rob': BatSta[i].split('|')[0], 
					'hmet': BatRes[i].split('|')[6], 
					'hcri': BatRes[i].split('|')[7], 
					'hdet': BatRes[i].split('|')[8], 
					'base':BatSta[i].split('|')[7],
					'phal':BatSta[i].split('|')[8], 
					'port':BatSta[i].split('|')[9],
				},
				defense:
				{
					'lm' : DefPla[i].split('|')[0] , 
					'lle': DefPla[i].split('|')[1] , 
					'llo': DefPla[i].split('|')[2] , 
					'gauss': DefPla[i].split('|')[3] , 
					'ion': DefPla[i].split('|')[4] , 
					'pla': DefPla[i].split('|')[5] , 
					'pb': DefPla[i].split('|')[6] , 
					'gb': DefPla[i].split('|')[7] , 
					'mic': DefPla[i].split('|')[8] , 
					'mip': DefPla[i].split('|')[9] 
				},
				fleet:
				{
					'cle':flotte[i+1].split('|')[0],
					'clo':flotte[i+1].split('|')[1],
					'crois':flotte[i+1].split('|')[2],
					'vb':flotte[i+1].split('|')[3],
					'traq':flotte[i+1].split('|')[4],
					'bb':flotte[i+1].split('|')[5],
					'dest':flotte[i+1].split('|')[6],
					'rip':flotte[i+1].split('|')[7],
					'pt':flotte[i+1].split('|')[8],
					'gt':flotte[i+1].split('|')[9],
					'vc':flotte[i+1].split('|')[10],
					'rec':flotte[i+1].split('|')[11],
					'esp':flotte[i+1].split('|')[12],
					'sat':flotte[i+1].split('|')[13],
				},
				resource:
				{
					prod:
					{
						'm': Math.floor((30*BatRes[i].split('|')[0]*Math.pow(1.1,BatRes[i].split('|')[0]))*speedUni*Geolog),
						'c': Math.floor((20*BatRes[i].split('|')[1]*Math.pow(1.1,BatRes[i].split('|')[1]))*speedUni*Geolog),
						'd': 0,
					},
				},	
			};
		
			if (!Lune[i])
			{
				DATA.planet[i].name = document.getElementsByClassName('planet-name')[f].innerHTML +' '+document.getElementsByClassName('planet-koords')[f].innerHTML;		
			
				var tempM = planets[f].innerHTML.split('°C')[1].replace( /[^0-9-]/g, "")
		
				DATA.planet[i].resource.prod.d = Math.floor((10*BatRes[i].split('|')[2]*Math.pow(1.1,BatRes[i].split('|')[2]))*(-0.004*(tempM)+1.44)*speedUni*Geolog);				
				if(nonRedesignPrix) DATA.planet[i].resource.prod.d = Math.floor((10*BatRes[i].split('|')[2]*Math.pow(1.1,BatRes[i].split('|')[2]))*(-0.002*(tempM)+1.28)*speedUni*Geolog);				
				
				DATA.planet[i].resource.temp =  parseInt(tempM);	
				DATA.planet[i].resource.tempmin = parseInt(planets[f].innerHTML.split(')')[1].split('°C')[0].replace( /[^0-9-]/g, ""));	
				
				var n=0;
				if(planets[f].innerHTML.split(/\s?([\(\)])\s?/)[2].indexOf('overmark') > -1) n=1;
				
				DATA.planet[i].resource.taille = planets[f].innerHTML.split(/\s?([\(\)])\s?/)[2].split('/')[1+n];
				DATA.planet[i].resource.tailleConst = planets[f].innerHTML.split(/\s?([\(\)])\s?/)[2].split('/')[0].replace( /[^0-9-]/g, "");
				
				f++;
			}
			else 
			{
				DATA.planet[i].name = text.Lune+' '+document.getElementsByClassName('planet-koords')[f-1].innerHTML ;
				DATA.planet[i].resource.temp = 0;
				DATA.planet[i].resource.tempmin =0;
				DATA.planet[i].resource.taille ='0';
			}
			
			listeMinepact += DATA.planet[i].resource.temp+'#'+DATA.planet[i].name+'#'+DATA.planet[i].moon+';';
			
			if(BatRes_const[i] != '|') // Ressource en construction
			{			
				if( parseInt(BatRes_const[i].split('|')[1]) < start_time)
				{
					DATA.planet[i].building[BatRes_const[i].split('|')[0]] = parseInt(DATA.planet[i].building[BatRes_const[i].split('|')[0]])+1;
				}
				else {Constructing+= prixInitial_bat[OrdreBat[BatRes_const[i].split('|')[0]]] *Math.pow( exposant[OrdreBat[BatRes_const[i].split('|')[0]]], parseInt(DATA.planet[i].building[BatRes_const[i].split('|')[0]]));}
				
			}
			
			if(BatSta_const[i] != '|') // Station en construction
			{
				if( parseInt(BatSta_const[i].split('|')[1]) < start_time)
				{
					DATA.planet[i].building[BatSta_const[i].split('|')[0]] = parseInt(DATA.planet[i].building[BatSta_const[i].split('|')[0]])+1;
				}
				else Constructing+= prixInitial_bat[OrdreBat[BatSta_const[i].split('|')[0]]] *Math.pow( exposant[OrdreBat[BatSta_const[i].split('|')[0]]], parseInt(DATA.planet[i].building[BatSta_const[i].split('|')[0]]));
			}
			
			var finiConst = false;			
			if(Def_const[i] != '|') // Defense en construction
			{
				var timeStartConstruction = parseInt(Def_const[i].split('-')[0]) ;
			
				for (var e=1 ; e<Def_const[i].split('-').length ; e++)
				{
					var nom = Def_const[i].split('-')[e].split('|')[1];
					var nombre = parseInt(Def_const[i].split('-')[e].split('|')[0]);
				
					if(timeStartConstruction < start_time)
					{	
						var tempsParDef = ((prixInitial_defEtFlotteSansDeut[nom]/5000)*(2/(1+parseInt(DATA.planet[i].building['cspa'])))*(1/Math.pow(2,parseInt(DATA.planet[i].building['nan'])))/speedUni)*3600000000 ;

						var nbDefConstruite = Math.min(Math.floor((start_time-timeStartConstruction)/tempsParDef), nombre );

						if( !isNaN(DATA.planet[i].defense[nom]))
							DATA.planet[i].defense[nom] = parseInt(DATA.planet[i].defense[nom])+ Math.round(nbDefConstruite) ;

						Constructing+= ( nombre - nbDefConstruite) * prixInitial_defEtFlotte[nom] ;
						
						timeStartConstruction+= tempsParDef* nombre ;
					
					}
					else 
					{
						Constructing +=  nombre * prixInitial_defEtFlotte[nom];
					}
				}
				
				if(timeStartConstruction < start_time) finiConst = true;		
			}
			
			if(finiConst)
			{
				Def_const[i] = '|';
				GM_setValue(nomScript+"Def_const"+coordPM+serveur,Def_const.join(';'));
				
				DefPla[i]= DATA.planet[i].defense.lm+'|'+DATA.planet[i].defense.lle+'|'+DATA.planet[i].defense.llo+'|'+DATA.planet[i].defense.gauss+
				'|'+DATA.planet[i].defense.ion+'|'+DATA.planet[i].defense.pla+'|'+DATA.planet[i].defense.pb+'|'+DATA.planet[i].defense.gb+'|'+
				DATA.planet[i].defense.mic+'|'+DATA.planet[i].defense.mip ;
				
				GM_setValue(nomScript+"DefPlanete"+coordPM+serveur, DefPla.join(';'));
				
			}
			
		}	
		
		GM_setValue(nomScript+'Minepact'+serveur ,listeMinepact ); 
		
		DATA.techno = 
		{
			'espi' : Techno[8], 
			'ordi': Techno[9], 
			'arme': Techno[13], 
			'bouc': Techno[14], 
			'prot': Techno[15], 
			'ener': Techno[0], 
			'hype': Techno[3], 
			'comb': Techno[5], 
			'impu': Techno[6], 
			'phyp': Techno[7], 
			'lase': Techno[1], 
			'ions': Techno[2], 
			'plas': Techno[4], 
			'rese': Techno[11], 
			'expe': Techno[16],
			'astro': Techno[10],
			'grav' : Techno[12]
		};
		
		DATA.fleet=
		{
			'cle':flotte[0].split('|')[0],
			'clo':flotte[0].split('|')[1],
			'crois':flotte[0].split('|')[2],
			'vb':flotte[0].split('|')[3],
			'traq':flotte[0].split('|')[4],
			'bb':flotte[0].split('|')[5],
			'dest':flotte[0].split('|')[6],
			'rip':flotte[0].split('|')[7],
			'pt':flotte[0].split('|')[8],
			'gt':flotte[0].split('|')[9],
			'vc':flotte[0].split('|')[10],
			'rec':flotte[0].split('|')[11],
			'esp':flotte[0].split('|')[12],
			'sat':flotte[0].split('|')[13],
		};
	
		
		if (FireFox) unsafeWindow.ifcDATA = DATA;
		
		if(Res_const != '|')
		{
			if( parseInt(Res_const.split('|')[1]) < start_time)
			{
				DATA.techno[Res_const.split('|')[0]] = parseInt(DATA.techno[Res_const.split('|')[0]])+1;
			}
			else {Constructing += prixInitial_tech[OrdreTech[Res_const.split('|')[0]]] *Math.pow( exposant_tech[OrdreTech[Res_const.split('|')[0]]], parseInt(DATA.techno[Res_const.split('|')[0]]));}
		}
		
	if ((url.indexOf('page=overview',0))>=0) 
	{
		/* ********************************* Options  *****************************************/
		
		var CouleurGraph = options.couleur.graphA+','+options.couleur.graphB+','+options.couleur.graphC+','+options.couleur.graphD+','+options.couleur.graphE;

		if(options.generale.BatTotal)
		{
			options.generale.AutreBat = false;
			options.generale.mine = false; 
		}
		else
		{
			options.generale.AutreBat = true;
			options.generale.mine = true; 
		}
	
		/* ********************************* Calcul des points  *****************************************/
		
			var PointsBatimentsTotal =0;
			var PointsMinesTotal=0;
			var PointsDefTotal=0;
			var pointLuneTotal = 0;
			var PointsTechno= 0;
			var PointsBatimentsTotalP =new Array();
			var PointsMinesTotalP=new Array();
			var PointsDefTotalP=new Array();
			
				
			var manqueBat='';
			var manqueDef='';
			var manqueMine='';
						
			var prod = new Array(0,0,0);
		var listeRes ='';
			for (var f=0; f<DATA.planet.length ; f++)
			{
				/* ******************************Production********************************/
				prod[0]+= DATA.planet[f].resource.prod.m;
				prod[1]+= DATA.planet[f].resource.prod.c;
				prod[2]+= DATA.planet[f].resource.prod.d;
				
				if(DATA.planet[f].moon=='false')
				{
					prod[0]+= 20*speedUni;
					prod[1]+= 10*speedUni;
				}
				
				/* ******************************Batiment********************************/
				if (DATA.planet[f].building[nom_bat[0]]=='') {manqueMine +=  DATA.planet[f].name+' | ' ;}
				if (DATA.planet[f].building[nom_bat[5]]=='') {manqueBat += DATA.planet[f].name+' | ';}
				if (DATA.planet[f].defense[nom_def[0]]=='')  {manqueDef += DATA.planet[f].name+' | ';}

				PointsBatimentsTotalP[f]=0;
				PointsMinesTotalP[f]=0;
				PointsDefTotalP[f]=0;
					
				for (var i = 0 ; i<nom_bat.length; i++)
				{	
					if (i<3)
					{
						PointsMinesTotalP[f]+=Math.floor(prixInitial_bat[i]*(Math.pow(exposant[i],DATA.planet[f].building[nom_bat[i]])-1)/(exposant[i]-1)*1000)/1000;
					}
					else
					{
						PointsBatimentsTotalP[f] += Math.floor(prixInitial_bat[i] *(Math.pow(exposant[i],DATA.planet[f].building[nom_bat[i]])-1)/(exposant[i]-1)*1000)/1000;
						
						if(DATA.planet[f].moon=='true')
							pointLuneTotal += Math.floor(prixInitial_bat[i] *(Math.pow(exposant[i],DATA.planet[f].building[nom_bat[i]])-1)/(exposant[i]-1)*1000)/1000;
				//	if(f==0) listeRes+=nom_bat[i] + ' lvl ( '+DATA.planet[f].building[nom_bat[i]]+' ) : '+ Math.floor(prixInitial_bat[i] *(Math.pow(exposant[i],DATA.planet[f].building[nom_bat[i]])-1)/(exposant[i]-1)*1000)/1000+'\n';
			
					}
			
					/* ******************************Defense********************************/
					if ( i< nom_def.length)
					{	
						PointsDefTotalP[f] += prixInitial_def[i] * DATA.planet[f].defense[nom_def[i]];
					}
				}
				
				PointsBatimentsTotal +=PointsBatimentsTotalP[f];
				PointsMinesTotal+=PointsMinesTotalP[f];
				PointsDefTotal+=PointsDefTotalP[f];
			}
		
			/* ******************************Recherche********************************/
			for (var k = 0 ; k< prixInitial_tech.length ; k++)
			{
				PointsTechno+= Math.floor(prixInitial_tech[k] * (Math.pow( exposant_tech[k], parseInt(DATA.techno[nom_techno[k]])) -1)/(exposant_tech[k]-1)*1000)/1000;	
			
			//	listeRes+=nom_techno[k] + ' lvl ( '+DATA.techno[nom_techno[k]]+' ) : '+ Math.floor(prixInitial_tech[k] * (Math.pow( exposant_tech[k], parseInt(DATA.techno[nom_techno[k]])) -1)/(exposant_tech[k]-1)*1000)/1000 +'\n';
			
			}
			if (PointsTechno < 0) PointsTechno= -1; // Page message pas visité
			
		//alert(listeRes);
			
			var PointPlanete = Math.round(PointsBatimentsTotalP[numeroplanete]+PointsMinesTotalP[numeroplanete]+PointsDefTotalP[numeroplanete]);
			
			/* ********************************* Prod/Jours  *****************************************/	
			
			prod[0]= Math.round(prod[0]*24);
			prod[1]= Math.round(prod[1]*24);
			prod[2]= Math.round(prod[2]*24);

			PointsBatimentsTotal=PointsBatimentsTotal;
			
			var PointsFlotteTotal = Math.round( PointsTotal-PointsTechno-PointsMinesTotal-PointsBatimentsTotal-PointsDefTotal);
			GM_setValue(nomScript+"pointFlotte"+coordPM+serveur,PointsFlotteTotal+'');
			
			PointIndest=Math.round(PointsMinesTotal+PointsBatimentsTotal+PointsTechno-pointLuneTotal);
			pointLuneTotal=Math.round(pointLuneTotal);
			PointsBatimentsTotal=Math.round(PointsBatimentsTotal);
			PointsMinesTotal=Math.round(PointsMinesTotal);
			PointsTechno=Math.round(PointsTechno);
			PointsDefTotal=Math.round(PointsDefTotal);

			 GM_setValue(nomScript+"pointIndest"+coordPM+serveur,PointIndest+'');
	
			var codeImg = 'R0lGODlhEAAQAPUAAChsKDA8EdrtwXvEApjWAYnNAur13EZRKoPJAidsJ8PjmJPTAcTxAIzDSJ3ZAbjJmqPdAZPKTJrVGozMHKfgAbvsALXoAHWRCXTAAqviAa/YepnMRFxlQ73hipSahLrgfJTQJ6ncN63If7PbfKPYOMHhl7HmALbch5+lkXS2BIekB4mtBni3BJTLRGu6AnmTCYzHPpS2Sc7t3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADIALAAAAAAQABAAAAaOQJlwSCwaE4Bk0igERAzQaARQBDQE2Cy2kSA2FJ3OY1xSmGFDp2b0EXk8qI/m1KLKAK4BiBQKxTgcIAMYdgAYKQEBB4sHiQgDhQMsiZSUBQiRBQsEGSYqiQQFkE0IBQQQK5QUDguYQxOmEBcXLwyrBRNEABsLDhUMwBALG3ZpEpwWFRYEEsVFSEpdTNNFQQA7';
				
			/* ******************************Récuperation des données de reférence********************************/
			date = new Date()+ '';
			
			var dates = date.split(/ /);
			if(options.generale.langue == 'fr') date = dates[2] +' '+dates[1];
			else date = dates[1] +' '+dates[2];
		
			var	PointRef = GM_getValue(nomScript+"PointRef"+coordPM+serveur,''+PointsTotal+';'+date+';'+PointsMinesTotal+';'+PointsBatimentsTotal+';'+PointsTechno+';'+PointsFlotteTotal+';'+PointsDefTotal+';true;'+PointsTotal+';'+(Date.parse(new Date())/1000-2)+';'+start_time+';'+document.getElementById('highscoreTT').getElementsByTagName('td')[5].innerHTML+';'+document.getElementById('highscoreTT').getElementsByTagName('td')[3].innerHTML+';'+GM_getValue(nomScript+'rankIndes'+coordPM+serveur, 0)+';'+PointIndest+';;').split(/;/);

			if(PointRef[7] == 'true' && manqueBat =='' && manqueDef =='' && manqueMine ==''&& PointsTechno != -1) // Si y'avais rien d'enregistré on enregistre
			{
				GM_setValue(nomScript+"PointRef"+coordPM+serveur,PointsTotal+';'+date+';'+PointsMinesTotal+';'+PointsBatimentsTotal+';'+PointsTechno+';'+PointsFlotteTotal+';'+PointsDefTotal+';false;'+PointsTotal+';'+(Date.parse(new Date()) / 1000)+';'+start_time+';'+document.getElementById('highscoreTT').getElementsByTagName('td')[5].innerHTML+';'+document.getElementById('highscoreTT').getElementsByTagName('td')[3].innerHTML+';'+GM_getValue(nomScript+'rankIndes'+coordPM+serveur, 0)+';'+PointIndest+';;;;;');	
			}
			
			// TEMPORAIRE 3.2.7c
			if(PointRef[14]== '' && manqueBat =='' && manqueDef =='' && manqueMine ==''&& PointsTechno != -1) // Si y'avais rien d'enregistré on enregistre
			{
				PointRef[14]=PointIndest;
				GM_setValue(nomScript+"PointRef"+coordPM+serveur,PointRef.join(';'));	
			
			}
			
			
			/* ****************************** BBCode détaillé  ********************************/
			
			var CoulBBcode = options.couleur.CoulBBcode;

			var size1 = '18';
			var size2 = '22';
			var size3 = '10';
			var center = 'center';
			var centerFin = 'center';
			
			if(!options.generale.bbcode_center && ! options.generale.baliseCenterHTML) 
			{
				center = 'align=center';
				centerFin = 'align';
			}
			if(!options.generale.bbcode_pixel && !options.generale.bbcode_SMF) 
			{
				size1 = '150';
				size2 = '180';
				size3 = '60';
			}
			if(options.generale.bbcode_SMF) 
			{
				size1 += 'pt';
				size2 += 'pt';
				size3 += 'pt';
			}
	
			/* ****************************** BBCode détaillé  ********************************/
				var CoulBBcode = options.couleur.CoulBBcode;
				var code= '<textarea style="width:100%;background-color:transparent;color:#999999;text-align:center;" onClick="javascript:this.select();">';
				var listeNiveau ='';
				var totNiv =0;
				
				code+= '['+center+'][u][size='+size2+']'+text.bbcode.rapport+' '+DATA.info.player+' uni '+serveur.replace('ogame.','').replace('uni','')+'[/size] \n ';
				code+= text.bbcode.genere+'[color=#'+options.couleur.CoulBBcode+'] '+date+' [/color] by [url=http://vulca.netii.net/][color=#'+CoulBBcode+']InfoCompte[/color][/url] [color=#'+CoulBBcode+']v'+Version+'[/color][/u][/'+centerFin+']\n\n\n';

				code+= ' [u][size='+size2+'][color=#'+options.couleur.CoulBBcode2+'] '+text.bbcode.empirePoint+' [/color][/size][/u]\n';
				code+= '- '+text.BBcode_mine +' [color=#'+options.couleur.CoulBBcode+']'+addPoints(PointsMinesTotal)+' ( '+pourcent(PointsMinesTotal,PointsTotal)+' % )[/color]\n';
				code+= '- '+text.BBcode_bat +' [color=#'+options.couleur.CoulBBcode+']'+addPoints(PointsBatimentsTotal)+' ( '+pourcent(PointsBatimentsTotal,PointsTotal)+' % )[/color]\n';		
				code+= '- '+text.BBcode_fin3 +' [color=#'+options.couleur.CoulBBcode+']'+addPoints(PointsDefTotal)+' ( '+pourcent(PointsDefTotal,PointsTotal)+' % )[/color]\n';
				code+= '- '+text.BBcode_fin1 +' [color=#'+options.couleur.CoulBBcode+']'+addPoints(PointsTechno)+' ( '+pourcent(PointsTechno,PointsTotal)+' %)[/color]\n';
				code+= '- '+text.Bcode_fin2 +' [color=#'+options.couleur.CoulBBcode+']'+addPoints(PointsFlotteTotal) + ' ( '+pourcent(PointsFlotteTotal,PointsTotal)+' %)[/color]\n';
				code+= '[b]'+text.BBcode_debut2+' [color=#'+options.couleur.CoulBBcode+']'+addPoints(PointsTotal)+'[/color] [size='+size3+']( '+text.bbcode.dont+' '+pourcent(PointsBatimentsTotal+PointsTechno+PointsMinesTotal,PointsTotal)+'% '+text.BBcode_fin5+')[/size][/b]\n\n\n';

				var niveau ='';
				code+= '[u][size='+size2+'][color=#'+options.couleur.CoulBBcode2+']'+text.bbcode.Production+'[/color][/size][/u]\n';
				code+= '[list][*]'+text.tag.m+' : [color=#'+options.couleur.CoulBBcode+'][b]'+addPoints(prod[0])+'[/b][/color]\n';
				code+= '[*]'+text.tag.c+' : [color=#'+options.couleur.CoulBBcode+'][b]'+addPoints(prod[1])+'[/b][/color]\n';
				code+= '[*]'+text.tag.d+' : [color=#'+options.couleur.CoulBBcode+'][b]'+addPoints(prod[2])+'[/b][/color][/list]\n\n\n';

			//	code+= '[u][size=24][center][color=#'+CoulBBcode+']'+text.planet+'[/color][/center][/size][/u]\n';
			//	calculPlanete();
			//	code+= listeNiveauUse+'| [b]'+text.Cases_use+'[/b] => '+text.Moyenne+' = '+Math.round(10*totNivCase/(nbPlanet-nbLune))/10+'\n';
			//	code+= listeNiveauMax+'| [b]'+text.Cases_tot+'[/b] => '+text.Moyenne+' = '+Math.round(10*totNivCaseMax/(nbPlanet-nbLune))/10+'\n';
				
				code+= '[u][size='+size2+'][color=#'+options.couleur.CoulBBcode2+']'+text.bbcode.Structure+' [/color][/size][/u]\n';
				code+= '['+center+'][i][size='+size1+'][color=#'+options.couleur.CoulBBcode+']'+text.bbcode.planet+' [/color][/size][/i][/'+centerFin+']\n';
				code+= '[color=#'+options.couleur.CoulBBcode+'][b][u]'+text.Mines+'[/u][/b][/color]\n';
				
				calculNiv(0);
				code+= listeNiveau+'| [b]'+text.tag.mmet+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNiv(1);
				code+= listeNiveau+'| [b]'+text.tag.mcri+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNiv(2);
				code+= listeNiveau+'| [b]'+text.tag.mdet+'[/b] => '+text.Total+' = '+totNiv+'\n\n';

				code+= '[color=#'+options.couleur.CoulBBcode+'][b][u]'+text.bbcode.Stockage+'[/u][/b][/color]\n';
				calculNiv(12);
				code+= listeNiveau+'| [b]'+text.tag.hmet+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNiv(13);
				code+= listeNiveau+'| [b]'+text.tag.hcri+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNiv(14);
				code+= listeNiveau+'| [b]'+text.tag.hdet+'[/b] => '+text.Total+' = '+totNiv+'\n\n';

				code+= '[color=#'+options.couleur.CoulBBcode+'][b][u]'+text.bbcode.Energie+'[/u][/b][/color]\n';
				calculNiv(4);
				code+= listeNiveau+'| [b]'+text.tag.cef+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNiv(3);
				code+= listeNiveau+'| [b]'+text.tag.ces+'[/b] => '+text.Total+' = '+totNiv+'\n\n';

				code+= '[color=#'+options.couleur.CoulBBcode+'][b][u]'+text.bbcode.Construction+'[/u][/b][/color]\n';
				calculNiv(11);
				code+= listeNiveau+'| [b]'+text.tag.rob+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNiv(5);
				code+= listeNiveau+'| [b]'+text.tag.nan+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNiv(7);
				code+= listeNiveau+'| [b]'+text.tag.ter+'[/b] => '+text.Total+' = '+totNiv+'\n\n';

				code+= '[color=#'+options.couleur.CoulBBcode+'][b][u]'+text.bbcode.Militaire+'[/u][/b][/color]\n';
				calculNiv(10);
				code+= listeNiveau+'| [b]'+text.tag.cspa+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNiv(9);
				code+= listeNiveau+'| [b]'+text.tag.depo+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNiv(8);
				code+= listeNiveau+'| [b]'+text.tag.silo+'[/b] => '+text.Total+' = '+totNiv+'\n\n';

				code+= '[color=#'+options.couleur.CoulBBcode+'][b][u]'+text.bbcode.Scientifique+'[/u][/b][/color]\n';
				calculNiv(6);
				code+= listeNiveau+'| [b]'+text.tag.lab+'[/b] => '+text.Total+' = '+totNiv+'\n\n';

				code+= '['+center+'][i][size='+size1+'][color=#'+options.couleur.CoulBBcode+'] '+text.bbcode.Lune+' [/color][/size][/i][/'+centerFin+']\n';

				code+= '[color=#'+options.couleur.CoulBBcode+'][b][u]'+text.bbcode.Stockage+'[/u][/b][/color]\n';
				calculNivLune(12);
				code+= listeNiveau+'| [b]'+text.tag.hmet+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNivLune(13);
				code+= listeNiveau+'| [b]'+text.tag.hcri+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNivLune(14);
				code+= listeNiveau+'| [b]'+text.tag.hdet+'[/b] => '+text.Total+' = '+totNiv+'\n\n';

				code+= '[color=#'+options.couleur.CoulBBcode+'][b][u]'+text.bbcode.Construction+'[/u][/b][/color]\n';
				calculNivLune(11);
				code+= listeNiveau+'| [b]'+text.tag.rob+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNivLune(15);
				code+= listeNiveau+'| [b]'+text.tag.base+'[/b] => '+text.Total+' = '+totNiv+'\n\n';

				code+= '[color=#'+options.couleur.CoulBBcode+'][b][u]'+text.bbcode.Militaire+'[/u][/b][/color]\n';
				calculNivLune(10);
				code+= listeNiveau+'| [b]'+text.tag.cspa+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNivLune(16);
				code+= listeNiveau+'| [b]'+text.tag.phal+'[/b] => '+text.Total+' = '+totNiv+'\n';
				calculNivLune(17);
				code+= listeNiveau+'| [b]'+text.tag.port+'[/b] => '+text.Total+' = '+totNiv+'\n\n\n';
				
				code+= '[u][size='+size2+'][color=#'+options.couleur.CoulBBcode2+']'+text.bbcode.Technology+'[/color][/size][/u]\n\n';
				code+= '[u][b][color=#'+options.couleur.CoulBBcode+']'+text.bbcode.Technologies_de_combat+' [/color][/b][/u] \n';
				code+= '[b]'+text.tag.arme+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.arme+'[/color]\n';
				code+= '[b]'+text.tag.bouc+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.bouc+'[/color]\n';
				code+= '[b]'+text.tag.prot+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.prot+'[/color]\n';
				code+= '[b]'+text.tag.espi+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.espi+'[/color]\n\n';

				code+= '[u][b][color=#'+options.couleur.CoulBBcode+']'+text.bbcode.Technologies_de_vaisseaux+' [/color][/b][/u] \n';
				code+= '[b]'+text.tag.ordi+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.ordi+'[/color]\n';
				code+= '[b]'+text.tag.comb+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.comb+'[/color]\n';
				code+= '[b]'+text.tag.impu+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.impu+'[/color]\n';
				code+= '[b]'+text.tag.phyp+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.phyp+'[/color]\n\n';

				code+= '[u][b][color=#'+options.couleur.CoulBBcode+']'+text.bbcode.Technologies_annexes+' [/color][/b][/u]\n'; 
				code+= '[b]'+text.tag.ener+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.ener+'[/color]\n';
				code+= '[b]'+text.tag.hype+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.hype+'[/color]\n';
				code+= '[b]'+text.tag.ions+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.ions+'[/color]\n';
				code+= '[b]'+text.tag.lase+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.lase+'[/color]\n';
				code+= '[b]'+text.tag.plas+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.plas+'[/color]\n';
				code+= '[b]'+text.tag.rese+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.rese+'[/color]\n';
				code+= '[b]'+text.tag.expe+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.astro+'[/color]\n';
				code+= '[b]'+text.tag.grav+'[/b]:  [color=#'+options.couleur.CoulBBcode+']'+DATA.techno.grav+'[/color]\n\n\n';

				if (options.generale.langue!= 'fr') code+= '[u][size='+size2+'][color=#'+options.couleur.CoulBBcode2+'].:: '+text.Fleet+' ::.[/color][/size][/u]\n\n';
				else code+= '[u][size='+size2+'][color=#'+options.couleur.CoulBBcode2+'][img]http://vulca.netii.net/infoCompte/image/flotte.jpg[/img][/color][/size][/u]\n\n';
				
				code+='[u][b][color=#'+options.couleur.CoulBBcode+']'+text.bbcode.vaisseauCivil+' [/color][/b][/u] \n';
				
				var nbDeVaisseau = new Array();
				
				nbDeVaisseau[8] = calculFlotte(8);
				code+= '[b]'+text.tag.pt+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[8])+'[/color]\n';
				nbDeVaisseau[9] = calculFlotte(9);
				code+= '[b]'+text.tag.gt+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[9])+'[/color]\n';
				nbDeVaisseau[10] = calculFlotte(10);
				code+= '[b]'+text.tag.vc+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[10])+'[/color]\n';
				nbDeVaisseau[11] = calculFlotte(11);
				code+= '[b]'+text.tag.rec+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[11])+'[/color]\n';
				nbDeVaisseau[12] = calculFlotte(12);
				code+= '[b]'+text.tag.esp+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[12])+'[/color]\n';
				nbDeVaisseau[13] = calculFlotte(13);
				code+= '[b]'+text.tag.ss+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[13])+'[/color]\n\n';
			
				
				code+='[u][b][color=#'+options.couleur.CoulBBcode+']'+text.bbcode.vaisseauCombat+' [/color][/b][/u] \n';
				nbDeVaisseau[0] = calculFlotte(0);
				code+= '[b]'+text.tag.cle+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[0])+'[/color]\n';
				nbDeVaisseau[1] = calculFlotte(1);
				code+= '[b]'+text.tag.clo+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[1])+'[/color]\n';
				nbDeVaisseau[2] = calculFlotte(2);
				code+= '[b]'+text.tag.crois+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[2])+'[/color]\n';
				nbDeVaisseau[3] = calculFlotte(3);
				code+= '[b]'+text.tag.vb+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[3])+'[/color]\n';
				nbDeVaisseau[4] = calculFlotte(4);
				code+= '[b]'+text.tag.traq+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[4])+'[/color]\n';
				nbDeVaisseau[5] = calculFlotte(5);
				code+= '[b]'+text.tag.bomb+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[5])+'[/color]\n';
				nbDeVaisseau[6] = calculFlotte(6);
				code+= '[b]'+text.tag.dest+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[6])+'[/color]\n';
				nbDeVaisseau[7] = calculFlotte(7);
				code+= '[b]'+text.tag.edlm+'[/b]: [color=#'+options.couleur.CoulBBcode+']'+addPoints(nbDeVaisseau[7])+'[/color]\n\n\n\n';
							
				code+= '[u][size='+size2+'][color=#'+options.couleur.CoulBBcode2+']'+text.bbcode.Defense+'[/color][/size][/u]\n';
				code+= '['+center+'][i][size='+size1+'][color=#'+options.couleur.CoulBBcode+'] '+text.bbcode.planet+' [/color][/size][/i][/'+centerFin+']\n\n';			

				calculDef(0);
				code+= listeNiveau+'| [b]'+text.tag.lm+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDef(1);
				code+= listeNiveau+'| [b]'+text.tag.lle+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDef(2);
				code+= listeNiveau+'| [b]'+text.tag.llo+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDef(4);
				code+= listeNiveau+'| [b]'+text.tag.ion+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDef(3);
				code+= listeNiveau+'| [b]'+text.tag.gauss+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDef(5);
				code+= listeNiveau+'| [b]'+text.tag.pla+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDef(6);
				code+= listeNiveau+'| [b]'+text.tag.pb+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDef(7);
				code+= listeNiveau+'| [b]'+text.tag.gb+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDef(8);
				code+= listeNiveau+'| [b]'+text.tag.mic+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDef(9);
				code+= listeNiveau+'| [b]'+text.tag.mip+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n\n';

				code+= '['+center+'][i][size='+size1+'][color=#'+options.couleur.CoulBBcode+'] '+text.bbcode.Lune+' [/color][/size][/i][/'+centerFin+']\n';

				calculDefLune(0);
				code+= listeNiveau+'| [b]'+text.tag.lm+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDefLune(1);
				code+= listeNiveau+'| [b]'+text.tag.lle+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDefLune(2);
				code+= listeNiveau+'| [b]'+text.tag.llo+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDefLune(4);
				code+= listeNiveau+'| [b]'+text.tag.ion+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDefLune(3);
				code+= listeNiveau+'| [b]'+text.tag.gauss+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDefLune(5);
				code+= listeNiveau+'| [b]'+text.tag.pla+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDefLune(6);
				code+= listeNiveau+'| [b]'+text.tag.pb+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDefLune(7);
				code+= listeNiveau+'| [b]'+text.tag.gb+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDefLune(8);
				code+= listeNiveau+'| [b]'+text.tag.mic+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n';
				calculDefLune(9);
				code+= listeNiveau+'| [b]'+text.tag.mip+'[/b] => '+text.Total+' = [color=#'+options.couleur.CoulBBcode+']'+addPoints(totNiv)+'[/color]\n\n</textarea>';

			/* ****************************** BBCode + nb colone pour graphique ********************************/
		
			var BBcode='['+center+'][size='+size2+'][b]'+text.BBcode_debut+'[/b][/size]\n\n[size='+size2+']'+text.BBcode_debut2+'[b][color=#ff0000]'+addPoints(PointsTotal)+'[/color][/b][/size]\n';
			var nbAfficher=0;
			if(options.generale.mine) 
			{
				nbAfficher++;
				BBcode+=text.BBcode_mine+"[b][color=#ff0000]"+addPoints(PointsMinesTotal)+"[/color][/b] ("+text.soit+" [b][color=#ff0000]"+pourcent(PointsMinesTotal,PointsTotal)+"[/color][/b] %)\n";
			}
			if(options.generale.AutreBat) 
			{
				nbAfficher++;
				BBcode+=text.BBcode_bat+"[b][color=#ff0000]"+addPoints(PointsBatimentsTotal)+"[/color][/b] ("+text.soit+" [b][color=#ff0000]"+pourcent(PointsBatimentsTotal,PointsTotal)+"[/color][/b] %)\n";
			}
			if(options.generale.BatTotal) 
			{
				nbAfficher++;
				BBcode+=text.BBcode_batT+"[b][color=#ff0000]"+addPoints(PointsMinesTotal+PointsBatimentsTotal)+"[/color][/b] ("+text.soit+" [b][color=#ff0000]"+pourcent(PointsMinesTotal+PointsBatimentsTotal,PointsTotal)+"[/color][/b] %) \n";
			}
			
			BBcode+=text.BBcode_fin1+"[b][color=#ff0000]"+addPoints(PointsTechno)+"[/color][/b] ("+text.soit+" [b][color=#ff0000]"+pourcent(PointsTechno,PointsTotal)+"[/color][/b] %)\n";;
			BBcode+=text.Bcode_fin2+"[b][color=#ff0000]"+addPoints(PointsFlotteTotal)+"[/color][/b] ("+text.soit+" [b][color=#ff0000]"+pourcent(PointsFlotteTotal,PointsTotal)+"[/color][/b] %) \n";
			BBcode+=text.BBcode_fin3+="[b][color=#fF0000]"+addPoints(PointsDefTotal)+"[/color][/b] ("+text.soit+" [b][color=#ff0000]"+pourcent(PointsDefTotal,PointsTotal)+"[/color][/b] %) \n\n";
			BBcode+=text.BBcode_fin4+="[b][color=#ff0000]"+addPoints(PointsMinesTotal+PointsBatimentsTotal+PointsTechno)+"[/color][/b] ("+text.soit+" [b][color=#ff0000]"+pourcent(PointsMinesTotal+PointsBatimentsTotal+PointsTechno,PointsTotal)+"[/color][/b] %) ";
			BBcode+=text.BBcode_fin5 +'\n';	
			
			if (options.generale.Techno_utile)
			{
				var PointsTechnoInu = (GM_getValue(nomScript+"pointTechnoUni"+coordPM+serveur,'0;0' )+'').split(';')[1];
				BBcode+=text.BBcode_fin42 +"[b][color=#ff0000]"+addPoints(PointsTechnoInu)+" "+text.Points+ "[/color][/b] ("+text.soit+" [b][color=#ff0000]"+pourcent(PointsTechnoInu,PointsTotal)+"[/color][/b] %) \n";
			}
		
			BBcode+=text.BBcode_fin6+'[b][color=#ff0000]'+addPoints(Math.round((PointsTotal- PointRef[8])/((Date.parse(new Date())/1000-PointRef[9])/(3600*24))))+ ' [/color][/b]'+text.Point_day+' \n';
			BBcode+= text.Production+' : [b][color=#ff0000]'+addPoints(Math.round((prod[0]+prod[1]+prod[2])/1000))+'[/color][/b] '+text.Point_day+' \n';
			BBcode+="[b]uni "+serveur.replace('ogame.','').replace('uni','') +"[/b][/"+centerFin+"]";
			
			if(options.generale.techno) nbAfficher++;
			if(options.generale.flottes) nbAfficher++;
			if(options.generale.Def) nbAfficher++;
			if(options.generale.indestructible) nbAfficher++;
			if(options.generale.constructing) nbAfficher++;

			if( options.generale.baliseCenterHTML)
			{ 
				code = code.replace(/\[center\]/g, '<center>').replace(/\[\/center\]/g, '</center>');
				BBcode = BBcode.replace(/\[center\]/g, '<center>').replace(/\[\/center\]/g, '</center>');
			}
			
			/* ****************************** options ********************************/
			var br = '';
			if (!options.generale.sauterLignePourPourcentageFlotteVol)
				{br ='<br/>';}
			
			
			var affichePointLune ='';
			if (options.generale.pointLune && options.generale.AutreBat)
				{affichePointLune = ' '+br+pourcent(pointLuneTotal,PointsBatimentsTotal)+' % '+text.sur_lune;}
			else if (options.generale.pointLune && options.generale.BatTotal)
				{affichePointLune = ' '+br+pourcent(pointLuneTotal,PointsMinesTotal+PointsBatimentsTotal)+' % '+text.sur_lune;}
			
			/* ****************************** Etablissement des couleurs ********************************/
			
			var Color_mine= 'style="color: #FFFFFF;"';
			var Color_autreBat= 'style="color: #FFFFFF;"';
			var Color_batTotal= 'style="color: #FFFFFF;"';
			var Color_techno= 'style="color: #FFFFFF;"';
			var Color_flotte= 'style="color: #FFFFFF;"';
			var Color_def= 'style="color: #FFFFFF;"';
			var Color_indestr= 'style="color: #FFFFFF;"';
			var Color_prog= 'style="color: #FFFFFF;"';
			var color_classFleet = 'style="color: #FFFFFF;"';
			var color_classRes = 'style="color: #FFFFFF;"';
			var color_classIndes = 'style="color: #FFFFFF;"';
			
			if	(options.generale.couleurPoint)
			{
				if(PointsMinesTotal>parseInt(PointRef[2])+1) 			{Color_mine= 'style="color: #'+options.couleur.progPos+';"';}
				else if (PointsMinesTotal<parseInt(PointRef[2]) -1) 	{Color_mine= 'style="color: #'+options.couleur.progNeg+';"';}
				
				if( PointsBatimentsTotal>parseInt(PointRef[3])+1) 		{Color_autreBat= 'style="color: #'+options.couleur.progPos+';"';}
				else if (PointsBatimentsTotal<parseInt(PointRef[3])-1) 	{Color_autreBat= 'style="color: #'+options.couleur.progNeg+';"';}
				
				if((PointsMinesTotal+PointsBatimentsTotal)>(parseInt(PointRef[2])+parseInt(PointRef[3])+1)) 			{Color_batTotal= 'style="color: #'+options.couleur.progPos+';"';}
				else if ((PointsMinesTotal+PointsBatimentsTotal)<(parseInt(PointRef[2])+parseInt(PointRef[3])) -1)  	{Color_batTotal= 'style="color: #'+options.couleur.progNeg+';"';}
				
				if( PointsTechno>parseInt(PointRef[4])+1) 			{Color_techno= 'style="color: #'+options.couleur.progPos+';"';}
				else if (PointsTechno<parseInt(PointRef[4]) -1) 		{Color_techno= 'style="color: #'+options.couleur.progNeg+';"';}
				
				if( PointsFlotteTotal>parseInt(PointRef[5])+1) 		{Color_flotte= 'style="color: #'+options.couleur.progPos+';"';}
				else if (PointsFlotteTotal<parseInt(PointRef[5]) -1) 	{Color_flotte= 'style="color: #'+options.couleur.progNeg+';"';}
				
				if( PointsDefTotal>parseInt(PointRef[6])+1)			{Color_def= 'style="color: #'+options.couleur.progPos+';"';}
				else if (PointsDefTotal<parseInt(PointRef[6]) -1) 		{Color_def= 'style="color: #'+options.couleur.progNeg+';"';}
				
				if((PointIndest)>(parseInt(PointRef[14])+1)) 			{Color_indestr= 'style="color: #'+options.couleur.progPos+';"';}
				else if((PointIndest)<(parseInt(PointRef[14]) -1)) 	{Color_indestr= 'style="color: #'+options.couleur.progNeg+';"';}
				
				
				if(PointRef[11] != '')
				{
					if( parseInt(document.getElementById('highscoreTT').getElementsByTagName('td')[5].innerHTML.replace( /[^0-9-]/g, "")) < parseInt(PointRef[11].replace( /[^0-9-]/g, "")))			{color_classRes= 'style="color: #'+options.couleur.progPos+';"';}
					else if (parseInt(document.getElementById('highscoreTT').getElementsByTagName('td')[5].innerHTML.replace( /[^0-9-]/g, "")) > parseInt(PointRef[11].replace( /[^0-9-]/g, ""))) 		{color_classRes= 'style="color: #'+options.couleur.progNeg+';"';}
					
					if( parseInt(document.getElementById('highscoreTT').getElementsByTagName('td')[3].innerHTML.replace( /[^0-9-]/g, "")) <parseInt(PointRef[12].replace( /[^0-9-]/g, "")))			{color_classFleet= 'style="color: #'+options.couleur.progPos+';"';}
					else if (parseInt(document.getElementById('highscoreTT').getElementsByTagName('td')[3].innerHTML.replace( /[^0-9-]/g, ""))> parseInt(PointRef[12].replace( /[^0-9-]/g, ""))) 		{color_classFleet= 'style="color: #'+options.couleur.progNeg+';"';}
					
					if( parseInt(GM_getValue(nomScript+'rankIndes'+coordPM+serveur, 0)) <parseInt(PointRef[13]))			{color_classIndes= 'style="color: #'+options.couleur.progPos+';"';}
					else if (parseInt(GM_getValue(nomScript+'rankIndes'+coordPM+serveur, 0)) > parseInt(PointRef[13])) 		{color_classIndes= 'style="color: #'+options.couleur.progNeg+';"';}
				}
			}	
			
			/* ****************************** Affichage des Rangs ********************************/
			var rankRes = 	'';
			var rankFleet=	'';
			var rankIndes =	'';
			
			if(options.generale.rank)
			{
				rankRes = 	'<br/><sub><span '+color_classRes+' title="'+plus(-parseInt(document.getElementById('highscoreTT').getElementsByTagName('td')[5].innerHTML.replace( /[^0-9-]/g, "")) +parseInt(PointRef[11].replace( /[^0-9-]/g, "")))+'"> '+text.rank+' : '+document.getElementById('highscoreTT').getElementsByTagName('td')[5].innerHTML+'</sub>';
				rankFleet=	'<br/><span '+color_classFleet+' title="'+plus(-parseInt(document.getElementById('highscoreTT').getElementsByTagName('td')[3].innerHTML.replace( /[^0-9-]/g, "")) +parseInt(PointRef[12].replace( /[^0-9-]/g, "")))+'"><sub>'+text.rank+' : '+document.getElementById('highscoreTT').getElementsByTagName('td')[3].innerHTML+'</sub>';
				rankIndes = '<br/><sub><span '+color_classIndes+' title="'+plus(-parseInt(GM_getValue(nomScript+'rankIndes'+coordPM+serveur, 0)) + parseInt(PointRef[13]))+' ('+text.rank_indest+')">'+text.rank+' : '+addPoints(GM_getValue(nomScript+'rankIndes'+coordPM+serveur, 0))+'</sub></span>';
			}
			
			/* ****************************** Affichage ********************************/
			var decaleImg = -40;
			if(Opera) decaleImg =  0;
			
			if(options.generale.Masquer)
			{
				var affiche = '<div style="width:650px; margin:auto; text-align:center; > <a href="#Table_info_2" onclick="if (document.getElementById(\'Table_info_1\').style.display==\'none\') {document.getElementById(\'Table_info_1\').style.display=\'\';} else {document.getElementById(\'Table_info_1\').style.display=\'none\';}">InfoCompte</a></div>';
				affiche += '<a name="Table_info_2"></a>';
				affiche += '<table style="width:675px; clear:right; width:650px;margin:auto;text-align:center;display:none;" id="Table_info_1"><br/><tr style="width:675px;"><th class="ICF_th3"><table id="IFC_top" style="width:675px; margin:auto;margin-bottom: -2px; text-align:center;"><tr class="ICF_tr"><th class="IFC_th"  style="width:675px; font-size: 12px; font-weight: bold; color: #539fc8; line-height: 30px; height: 30px;" background="'+background+'" colspan="4" >'+text.BBcode_debut+'<a TITLE="'+text.AffBBcodeSimple+'";><img id="copybbcode" style="cursor:pointer;float:right; margin-top:6px; margin-right:35px;  position:relative;" src="data:image/gif;base64,'+codeImg+'"/></a><a TITLE="'+text.AffBBcodeDetail+'";><img id="copybbcode2" style="cursor:pointer; float:right; position:relative; margin-right:3px; margin-top:6px;" src="data:image/gif;base64,'+codeImg+'"/></a></th></tr></table><center><table id="IFC_mid" width="657px" background="'+background2+'">';
				affiche +='<th colspan="4" class="IFC_th_bbcode" style="'+th_style+' display:none;" id="zonecode"; ><textarea style="width:100%;background-color:transparent;color:#999999;text-align:center;" onClick="javascript:this.select();">'+BBcode+'</textarea></th></tr>';
				affiche +='<th colspan="4" class="IFC_th_bbcode" style="'+th_style+' display:none;" id="zonecode2"; >'+code+'<br/>_______________________________________________________<br/>'+text.AffBBcodeSansBBcode+'<br/><br/>'+code.replace(/\[.[^\]]*\]/g,'').replace(/http:\/\/vulca.netii.net\/infoCompte\/image\//g,'').replace(/.(png|jpg)/g,'')+'</th></tr>';				
			}
			else
			{
				var affiche = '<table id="IFC_table" style="width:675px; clear:right;"><br/><tr class="ICF_tr" style="width:675px;"><th><table id="IFC_top" style="width:675px; margin:auto;margin-bottom: -2px; text-align:center;"><tr class="ICF_tr"><th class="IFC_th"  style="width:675px; font-size: 12px; font-weight: bold; color: #539fc8; line-height: 30px; height: 30px;" background="'+background+'" colspan="4" >'+text.BBcode_debut+'<a TITLE="'+text.AffBBcodeSimple+'";><img id="copybbcode" style="cursor:pointer;float:right; margin-top:6px; margin-right:35px;  position:relative;" src="data:image/gif;base64,'+codeImg+'"/></a><a TITLE="'+text.AffBBcodeDetail+'";><img id="copybbcode2" style="cursor:pointer; float:right; position:relative; margin-right:3px; margin-top:6px;" src="data:image/gif;base64,'+codeImg+'"/></a></th></tr></table><center><table id="IFC_mid" width="657px" background="'+background2+'">';
				affiche +='<th class="IFC_th_bbcode" colspan="4" style="'+th_style+' display:none;" id="zonecode"; ><textarea style="width:100%;background-color:transparent;color:#999999;text-align:center;" onClick="javascript:this.select();">'+BBcode+'</textarea></th></tr>';
				affiche +='<th class="IFC_th_bbcode" colspan="4" style="'+th_style+' display:none;" id="zonecode2"; >'+code+'<br/><br/><br/>_______________________________________________________<br/><br/>'+text.AffBBcodeSansBBcode+'<br/><br/>'+code.replace(/\[.[^\]]*\]/g,'').replace(/<center>/g,'').replace(/<\/center>/g,'').replace(/http:\/\/vulca.netii.net\/infoCompte\/image\//g,'').replace(/.(png|jpg)/g,'')+'</th></tr>';	
			}


			if(options.generale.mine)
				{affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="'+th_style+'" >'+text.Mines+'</th><th class="IFC_th"  class="IFC_th"  style="width:250px; '+th_style+'" ><a '+Color_mine+' TITLE="'+plus(Math.round(PointsMinesTotal-parseInt(PointRef[2])))+' '+text.Points+' ('+pourcent(PointsMinesTotal-parseInt(PointRef[2]),PointsMinesTotal)+' %)";>'+addPoints(PointsMinesTotal)+' ( '+pourcent(PointsMinesTotal,PointsTotal)+' % ) </a></th><th class="IFC_th"  class="IFC_th"  style="'+th_style+'" rowspan='+nbAfficher+' id="piebox" colspan="2"></th></tr>';}
			if(options.generale.AutreBat)
				{affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  class="IFC_th"  style="'+th_style+'" >'+text.Other_structure+'</th><th class="IFC_th"  style="width:250px; '+th_style+'" ><a '+Color_autreBat+' TITLE="'+plus(Math.round(PointsBatimentsTotal-parseInt(PointRef[3])))+' '+text.Points+'  ('+pourcent(PointsBatimentsTotal-parseInt(PointRef[3]),PointsBatimentsTotal)+' %)";>'+addPoints(PointsBatimentsTotal)+' ( '+pourcent(PointsBatimentsTotal,PointsTotal)+' % )  </a>'+affichePointLune+'</th><th class="IFC_th2"></th></tr>';}
			if(options.generale.BatTotal)
				{affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="'+th_style+'" >'+text.Structure+'</th><th class="IFC_th"  style="width:250px; '+th_style+'" ><a '+Color_batTotal+' TITLE="'+plus(Math.round((PointsMinesTotal+PointsBatimentsTotal)-(parseInt(PointRef[2])+parseInt(PointRef[3]))))+' '+text.Points+' ('+pourcent((PointsMinesTotal+PointsBatimentsTotal)-(parseInt(PointRef[2])+parseInt(PointRef[3])),PointsMinesTotal+PointsBatimentsTotal)+' %)";>'+addPoints(PointsMinesTotal+PointsBatimentsTotal)+' ( '+pourcent(PointsMinesTotal+PointsBatimentsTotal,PointsTotal)+' % )  </a>'+affichePointLune+' </th><th class="IFC_th"  style="'+th_style+'" rowspan='+nbAfficher+' id="piebox" colspan="2"></th></tr>';}
			if(options.generale.techno)
				{affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="'+th_style+'" >'+text.Technology+'</th><th class="IFC_th"  style="width:250px; '+th_style+'" ><a '+Color_techno+' TITLE="'+plus(Math.round(PointsTechno-parseInt(PointRef[4])))+' '+text.Points+' ('+pourcent(PointsTechno-parseInt(PointRef[4]),PointsTechno)+' %)";>'+addPoints(PointsTechno)+' ( '+pourcent(PointsTechno,PointsTotal)+' % ) </a> '+rankRes+'</th><th class="IFC_th2"></th></tr>';}
			if(options.generale.flottes)
				{affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="'+th_style+'" >'+text.Fleet+'</th><th class="IFC_th"  style="width:250px; '+th_style+'" ><a '+Color_flotte+' TITLE="'+plus(Math.round(PointsFlotteTotal-parseInt(PointRef[5])))+' '+text.Points+' ('+pourcent(PointsFlotteTotal-parseInt(PointRef[5]),PointsFlotteTotal)+' %)";>'+addPoints(PointsFlotteTotal) + ' ( '+pourcent(PointsFlotteTotal,PointsTotal)+' % ) </a> '+rankFleet+'</th><th class="IFC_th2"></th></tr>';}
			if(options.generale.Def)
				{affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="'+th_style+'" >'+text.Defense+'</th><th class="IFC_th"  style="width:250px; '+th_style+'" ><a '+Color_def+' TITLE="'+plus(Math.round(PointsDefTotal-parseInt(PointRef[6])))+' '+text.Points+' ('+pourcent(PointsDefTotal-parseInt(PointRef[6]),PointsDefTotal)+' %)";>'+addPoints(PointsDefTotal)+' ( '+pourcent(PointsDefTotal,PointsTotal)+' % ) </a></th><th class="IFC_th2"></th></tr>';}
			if(options.generale.indestructible)
				{affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="'+th_style+'" >'+text.Indestructible+'</th><th class="IFC_th"  style="width:250px; '+th_style+'" ><a '+Color_indestr+' TITLE="'+plus(Math.round((PointIndest)-parseInt(PointRef[14])))+' '+text.Points+' ('+pourcent((PointIndest)-(parseInt(PointRef[14])),PointIndest)+' %)";>'+addPoints(PointIndest)+' ( '+pourcent(PointIndest,PointsTotal)+' % ) </a> '+rankIndes+'</th><th class="IFC_th2"></th></tr>';}
			if(options.generale.constructing)
				{affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="'+th_style+'" >'+text.constructing+'</th><th class="IFC_th"  style="width:250px; '+th_style+'" >'+addPoints(Math.round(Constructing))+' ( '+pourcent(Constructing,PointsTotal)+' % ) </th><th class="IFC_th2"></th></tr>';}
			if(options.generale.Point_planete)			
				{affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th" style="'+th_style+'" >'+DATA.planet[numeroplanete].name+'</th><th class="IFC_th" id="listePla" colspan="3" style="'+th_style+'" ><a style="color: #FFFFFF;" TITLE="'+text.Mines+': '+addPoints(PointsMinesTotalP[numeroplanete])+' ('+pourcent(PointsMinesTotalP[numeroplanete],PointPlanete)+' %) | '+text.Other_structure+': '+addPoints(PointsBatimentsTotalP[numeroplanete])+' ('+pourcent(PointsBatimentsTotalP[numeroplanete],PointPlanete)+' %) | '+text.Defense+': '+addPoints(PointsDefTotalP[numeroplanete])+' ('+pourcent(PointsDefTotalP[numeroplanete],PointPlanete)+' %)">'+ addPoints(PointPlanete) +' '+text.Points+' ('+pourcent(PointPlanete,PointsTotal)+' %) </a></th><th class="IFC_th"  style="background-color:transparent;"><a TITLE="'+text.affDetailPla+'";><img id="Point_planete" style="cursor:pointer;position:relative; margin-left:'+decaleImg+'px;" src="data:image/gif;base64,'+codeImg+'"/></a><th></th></th></tr>';}
			if (options.generale.progression)
				{affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="'+th_style+'" >'+text.Progression+'</th><th class="IFC_th"  colspan="3" style="'+th_style+'" ><a style="color: #FFFFFF;" TITLE="'+text.Mines+': '+plus(Math.round(PointsMinesTotal-parseInt(PointRef[2])))+' ('+pourcent(PointsMinesTotal-parseInt(PointRef[2]),PointsTotal-parseInt(PointRef[0]))+' %) | '+text.Other_structure+': '+plus(Math.round(PointsBatimentsTotal-parseInt(PointRef[3])))+' ('+pourcent(PointsBatimentsTotal-parseInt(PointRef[3]),PointsTotal-parseInt(PointRef[0]))+' %) | '+text.Technology+': '+plus(Math.round(PointsTechno-parseInt(PointRef[4])))+' ('+pourcent(PointsTechno-parseInt(PointRef[4]),PointsTotal-parseInt(PointRef[0]))+' %) | '+text.Fleet+': '+plus(Math.round(PointsFlotteTotal-parseInt(PointRef[5])))+' ('+pourcent(PointsFlotteTotal-parseInt(PointRef[5]),PointsTotal-parseInt(PointRef[0]))+' %) | '+text.Defense+': '+plus(Math.round(PointsDefTotal-parseInt(PointRef[6])))+' ('+pourcent(PointsDefTotal-parseInt(PointRef[6]),PointsTotal-parseInt(PointRef[0]))+' %)">'+addPoints(Math.round(PointsTotal-parseInt(PointRef[0])))+' '+text.Points+' (' +pourcent((PointsTotal-PointRef[0]),PointRef[0]) +' %) '+text.Depuis+' '+PointRef[1]+' => '+addPoints(Math.round((PointsTotal-parseInt(PointRef[0]))/arrondi((Date.parse(new Date())-PointRef[10])/(1000*3600*24))))+' '+text.Point_day+'</a></th><th class="IFC_th"  style="background-color:transparent;"><a TITLE="'+text.restart+'";><img id="pointRef" style="cursor:pointer;position:relative; margin-left:'+decaleImg+'px;" src="data:image/gif;base64,'+codeImg+'"/></a><th></th></th></tr>';	}
			if (options.generale.ProgJours)
				{affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="'+th_style+'" >'+text.Moyenne+'</th><th class="IFC_th"  colspan="3" style="'+th_style+'" >'+addPoints(Math.round((PointsTotal- PointRef[8])/arrondi((Date.parse(new Date())/1000-PointRef[9])/(3600*24))))+ ' '+text.Point_day+'</th></tr>';	}
			if (options.generale.ProdJours)
				{affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="'+th_style+'" >'+text.Production+'</th><th class="IFC_th"  colspan="3" style="'+th_style+'" >'+addPoints(Math.round((prod[0]+prod[1]+prod[2])/1000))+ ' (<a style="color: #FFFFFF;" TITLE="'+text.tag.m+'">'+addPoints(Math.round(prod[0]/1000))+' </a>/ <a style="color: #FFFFFF;" TITLE="'+text.tag.c+'">'+addPoints(Math.round(prod[1]/1000))+' </a>/ <a style="color: #FFFFFF;" TITLE="'+text.tag.d+'">'+addPoints(Math.round(prod[2]/1000))+ '</a> ) '+text.Point_day+'</th></tr>';	}
			
			var techTree = Boolean ( GM_getValue(nomScript+url.split('/')[2].replace(url.split('/')[2].split('.')[0],''),'1').split('|')[1]);
			
			if (manqueBat !='' || manqueDef !='' || manqueMine !='' || PointsTechno < 0 || manqueId || !techTree )
			{
				affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="'+th_style+'" ><img src="http://uni42.ogame.org/game/img/icons/exclaim-red.gif" /></th><th class="IFC_th"  colspan="3" style="'+th_style+'" >'+text.Manque+'<br/><br/>';
				if(manqueId || !techTree) 
				{
					if(manqueId) affiche += text.manqueVG+'<br/>';
					if(!techTree) { affiche += '<a href="'+url.replace('overview','globalTechtree')+'" target="_blank" >Teknoloji Ağacı</a><br/>';}
				}
				else 
				{	if (manqueMine !='') {affiche += text.Ressource+' : '+manqueMine+'<br/>';}
					if (manqueBat !='') {affiche += text.Facilities+' : '+manqueBat+'<br/>';}
					if (manqueDef !='') {affiche += text.Defense+' : '+manqueDef+'<br/>';}
					if (PointsTechno < 0) {affiche += '<a href="'+url.replace('overview','research')+'" target="_blank" >'+text.Technology+'</a>';}
				}
				affiche += '</th></tr>';
			}
			
			if (!AJours)
			{
				affiche +='<tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  style="'+th_style+'" ><img src="http://uni42.ogame.org/game/img/icons/exclaim-red.gif" /></th><th class="IFC_th"  colspan="3" style="'+th_style+'" >';
				affiche += text.pas_a_jours+'<a id="MaJ" href="http://userscripts.org/scripts/source/54582.user.js">'+text.install+' </a>';
				if (options.generale.langue != 'fr') affiche +='<br/><a href="http://vulca.netii.net/forum/viewtopic.php?f=19&p=21" style="font-size: 9px;" target="_blank">'+text.info_new_version+'</a></th></tr>';
				else  affiche +='<br/><a href="http://vulca.netii.net/forum/viewtopic.php?f=4&p=20" style="font-size: 9px;" target="_blank">'+text.info_new_version+'</a></th></tr>';
			}
			
			var languesite = 'en';
			if (options.generale.langue== 'fr') languesite = 'fr';
			
			if (options.generale.Signa)
			{
				var signature ='<tr style="clear:both;" class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  colspan="4">';
				signature+= '<form action="http://vulca.netii.net/infoCompte/index.php?page=signature&langue='+languesite+'" target="_blank" method="post">';
				signature+=	'<textarea name="pseudo" style="display:none;">'+pseudo+'</textarea>';
				signature+=	'<textarea name="coordPM" style="display:none;">'+coordPM+'</textarea>';
				signature+=	'<textarea name="uni" style="display:none;">'+serveur+'</textarea>';
				signature+=	'<textarea name="langue" style="display:none;"></textarea>'; // TEMPORAIRE => Supr quand OGame Redesign partout

				signature+=	'<textarea name="total" style="display:none;">'+addPoints(PointsTotal)+'</textarea>';
				signature+=	'<textarea name="mine" style="display:none;">'+addPoints(PointsMinesTotal)+' '+text.Points+' ( '+pourcent(PointsMinesTotal,PointsTotal)+' % )</textarea>';
				signature+=	'<textarea name="bat" style="display:none;">'+addPoints(PointsBatimentsTotal)+' '+text.Points+' ( '+pourcent(PointsBatimentsTotal,PointsTotal)+' % )</textarea>';
				signature+=	'<textarea name="techno" style="display:none;">'+addPoints(PointsTechno)+' '+text.Points+' ( '+pourcent(PointsTechno,PointsTotal)+' % )</textarea>';
				signature+=	'<textarea name="flotte" style="display:none;">'+addPoints(PointsFlotteTotal) + ' '+text.Points+' ( '+pourcent(PointsFlotteTotal,PointsTotal)+' % )</textarea>';
				signature+= '<textarea name="def" style="display:none;">'+addPoints(PointsDefTotal)+' '+text.Points+' ( '+pourcent(PointsDefTotal,PointsTotal)+' % ) </textarea>';
				signature+=	'<textarea name="totalt" style="display:none;">'+text.BBcode_debut2+'</textarea>';
				signature+=	'<textarea name="minet" style="display:none;">'+text.Mines+'</textarea>';
				signature+=	'<textarea name="batt" style="display:none;">'+text.Other_structure+'</textarea>';
				signature+=	'<textarea name="technot" style="display:none;">'+text.Technology+'</textarea>';
				signature+=	'<textarea name="flottet" style="display:none;">'+text.Fleet+ '</textarea>';
				signature+=	'<textarea name="deft" style="display:none;">'+text.Defense+'</textarea>';
	
				signature+=	'<textarea name="img" style="display:none;">'+options.couleur.url+'</textarea>';
		
				signature+=	'<input style="display:none; type="text" size="1" maxlength="3" name="colfondR" value="'+options.couleur.SignfondR+'" />';
				signature+=	'<input style="display:none; size="1" maxlength="3" type="text" name="colfondV" value="'+options.couleur.SignfondV+'" />';
				signature+=	'<input style="display:none; type="text" name="colfondB" size="1" maxlength="3" value="'+options.couleur.SignfondB+'" />';
				signature+=	'<input style="display:none; type="text" size="1" maxlength="3" name="coltextR" value="'+options.couleur.SigntxtR+'" />';
				signature+=	'<input style="display:none; type="text" name="coltextV" size="1" maxlength="3" value="'+options.couleur.SigntxtV+'" />';
				signature+=	'<input style="display:none; type="text"  size="1" maxlength="3" name="coltextB" value="'+options.couleur.SigntxtB+'" />';		
		
				signature+='<input type="submit" value="'+text.creeSign+'" style="cursor:pointer;background-color:transparent; border: solid black 1px; color:#CCCCCC;"/></form>';
			
				affiche += signature ;
			}

			/* *************************************************************************************************************************/
			/* ************************************************* codeAlternative ************************************************************/
			/* *************************************************************************************************************************/
			/* *************************************************************************************************************************/
			
			if(options.generale.Alternative && (options.generale.langue == 'fr' || (url.indexOf('ogame.fr',0))>=0) )
			{
				
				var email= GM_getValue(nomScript+"email"+coordPM+serveur,'');

				var Atlerna =' <tr class="ICF_tr"><th class="IFC_th"  width="4px"></th><th class="IFC_th"  colspan="4"><form action="http://www.projet-alternative.fr/infoscompte/index.php"  target="_blank" method="post">';
				Atlerna+=	'<textarea style="display:none;"  name="pseudo" >'+pseudo+'</textarea>';
				Atlerna+=	'<textarea style="display:none;" id="email" name="email">'+email+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="coord" >'+CoordPM.replace('[', '').replace(']', '')+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="uni" >'+serveur.replace('ogame.',"")+'</textarea>';

				var listeNom = '';
				var listeTemperature = '';
				var listeTaille = '';
				var listelune = '';
				var listeTemperaturemin= '';
				var listeVaisseauxAquai='';
				var pointsFlotte=0;
				var prix_vaisseau = new Array(4,10,29,60,85,90,125,10000,4,12,40,18,1,2.5);
				
				for (var i =0 ; i<DATA.planet.length ; i++)
				{
					listeNom+= DATA.planet[i].name+';';
					listeTemperature+= DATA.planet[i].resource.temp+';';
					listeTaille += DATA.planet[i].resource.taille+';';
					listeTemperaturemin += DATA.planet[i].resource.tempmin+';';
					listelune+= DATA.planet[i].moon+';';
					listeVaisseauxAquai+=flotte[i+1]+';';
				
					for (var j =0 ; j<prix_vaisseau.length ; j++)
					{
						pointsFlotte+= parseInt(flotte[i+1].split('|')[j]) * prix_vaisseau[j];			
					}
				}
				
				for (var j =0 ; j<prix_vaisseau.length ; j++)
				{
					pointsFlotte+= parseInt(flotte[0].split('|')[j]) * prix_vaisseau[j];
				}

			if ( (PointsFlotteTotal-pointsFlotte)/PointsFlotteTotal < -0.05 && (PointsFlotteTotal-pointsFlotte) < -10 ) 
				listeVaisseauxAquai='PROBLEME';
				
				Atlerna+=	'<textarea style="display:none;"  name="nomPlanete" >'+listeNom+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="lune" >'+listelune+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="taille" >'+listeTaille+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="temperature" >'+listeTemperature+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="temperatureMini" >'+listeTemperaturemin+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="BatRes" >'+BatRes.join(';')+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="BatSta" >'+BatSta.join(';')+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="DefPla" >'+DefPla.join(';')+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="nbjoueur" >'+nbJoueur+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="statUni" >'+GM_getValue(nomScript+"pointUni"+coordPM+serveur,'0|0')+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="timeStatUni" >'+GM_getValue(nomScript+"timeUni"+coordPM+serveur,'0|0')+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="points" >'+PointsTotal+'</textarea>';
				Atlerna+=	'<textarea style="display:none;"  name="version" >'+Version+'</textarea>';
				Atlerna+=	'<textarea  style="display:none;" name="Techno" >'+Techno.join('|')+(PointsMinesTotal+PointsBatimentsTotal)+'|'+PointsTechno+'|'+PointsDefTotal+'|'+PointsFlotteTotal+'</textarea>';
				Atlerna+=	'<textarea  style="display:none;" name="flotte" >'+flotte[0]+'</textarea>';
				Atlerna+=	'<textarea  style="display:none;" name="flotteAquai" >'+listeVaisseauxAquai+'</textarea>';
				
				// ****************************************************************************************************************************/
				Atlerna +='<input title="C\'est un site permettant de participer aux records globaux ou d\'alliance, de voir ses statistiques personnelles, l\'évolution de son compte, de son alliance etc" id="alternativeBouton" type="submit" value="envoyer les infos vers Alternative" style="cursor:pointer; size:100px; background-color:transparent; border: solid black 1px; color:#CCCCCC;" /></form>';
				// ****************************************************************************************************************************/
				if(!options.generale.Masquer) affiche+=Atlerna;
			}
			/* *************************************************************************************************************************/
			/* *************************************************Fin codeAlternative ************************************************************/
			/* *************************************************************************************************************************/
			/* *************************************************************************************************************************/

			affiche += '</th></tr><tr class="ICF_tr"><th class="IFC_th" width="4px"></th><th class="IFC_th" colspan="4" ><sub><a style="font-style: italic;" href="http://vulca.netii.net/forum/" target="_blank">InfoCompte '+Version+'</a><br><br>Translation by farlo54</sub></th></tr></table>';
			
			if(options.generale.Masquer && options.generale.Alternative && (options.generale.langue == 'fr'|| (url.indexOf('ogame.fr',0))>=0) ) affiche+='<center><table  background="'+background2+'" style="width:657px; margin:auto; text-align:center;>'+Atlerna+'</table></center>';
			
			affiche += '<table id="IFC_down" style="clear: right;" width="663px" background="'+background3+'" height="22px"></table>';
			affiche+='</th></tr></table><br/>';
			
			var sp1 = document.createElement("span");
			sp1.setAttribute("id", "newDivIFC");
			var sp1_content = document.createTextNode('');
			sp1.appendChild(sp1_content);		
			
			if(document.getElementById('newEventBox')) var sp2 = document.getElementById('newEventBox') ;
			else var sp2 = document.getElementsByClassName("content-box-s")[2];
			
			
			var parentDiv = sp2.parentNode;
			parentDiv.insertBefore(sp1, sp2.nextSibling);

			var tableau = document.createElement("span");
			tableau.innerHTML = affiche;
	

			if (FireFox) document.getElementById('newDivIFC').insertBefore(tableau, document.getElementById('newDivIFC').firstChild);
			else document.getElementById('box').insertBefore(tableau, document.getElementsByClassName('rechts')[0]);
				
			
			/* ****************************** Affichage du graphique ********************************/
			if (options.generale.mine)
				{var pie = draw_pie([pourcent(PointsMinesTotal,PointsTotal),pourcent(PointsBatimentsTotal,PointsTotal),pourcent(PointsTechno,PointsTotal),pourcent(PointsFlotteTotal,PointsTotal),pourcent(PointsDefTotal,PointsTotal)]);}
			else if(options.generale.BatTotal)
				{var pie = draw_pie([pourcent(PointsMinesTotal+PointsBatimentsTotal,PointsTotal),pourcent(PointsTechno,PointsTotal),pourcent(PointsFlotteTotal,PointsTotal),pourcent(PointsDefTotal,PointsTotal)]);}
			var piebox = document.getElementById('piebox');		
			if (piebox) {piebox.appendChild(pie)};
			
			
			/* ****************************** Demande Email Alternative ********************************/
			if(document.getElementById("alternativeBouton"))
			{
				document.getElementById("alternativeBouton").addEventListener("click", function(event) 
				{
					document.getElementById("email").innerHTML = prompt('Quelle adresse email voulez vous utiliser pour le site Alternative ?',GM_getValue(nomScript+"email"+coordPM+serveur, '' ) );
					if (document.getElementById("email").innerHTML != '') GM_setValue(nomScript+"email"+coordPM+serveur,document.getElementById("email").innerHTML );	
					if ( Math.abs(PointsFlotteTotal-pointsFlotte)/PointsFlotteTotal> 0.05 && Math.abs(PointsFlotteTotal-pointsFlotte) > 10 ) 
						alert('Il y a un problème avec vos vaisseaux, \n\n Visitez toutes vos pages chantier spatial et une page flotte ( mouvement de flotte si vous avez des flottes en vol) et/ou defense pour résoudre le problème \n(Si cela ne change rien, allez voir les pages batiments/technologies) \n\n Si vous êtes sûr d\'être passé sur toutes les pages nécessaires, merci de reporter le problème ici : http://board.ogame.fr/index.php?page=Thread&threadID=850132');
					
				}, true);
			}
			
			/* ****************************** BBcode ouvrant/fermant ********************************/
			
			document.getElementById("copybbcode").addEventListener("click", function(event) 
			{
				var cellule = document.getElementById('zonecode');
				if (cellule.style.display == 'none') 
					{cellule.style.display = '';}
				else 
					{cellule.style.display = 'none';}
			}, true);
						
			document.getElementById("copybbcode2").addEventListener("click", function(event) 
			{
				var cellule = document.getElementById('zonecode2');
				
				if (cellule.style.display == 'none') 
					{cellule.style.display = '';}
				else 
					{cellule.style.display = 'none';}
			}, true);
			
			
			function AffDetailPla()
			{
				var aff = '<br/><table style="margin:auto;"><tr><td>'+text.bbcode.planet+' </td><td> '+text.Mines+' </td><td> '+text.Other_structure+' </td><td style=""> '+text.Defense+' </td><td>=> '+text.BBcode_debut2+'</td></tr>';
				for (var f = 0 ; f < nbPlanet ; f++)
				{
					
					if(DATA.planet[f].moon== 'true')
							img = 'background-image: url(http://vulca.netii.net/infoCompte/image/lune.gif);background-repeat:no-repeat;background-position:top right;padding-right: 15px;';
					else 	img = '';
							
					aff+= '<tr><td style="text-align:left;font-size:0.75em;'+img+'">'+DATA.planet[f].name +'</td><td style="font-size:0.75em;text-align:right;color:#'+options.couleur.graphA+';">'+addPoints(Math.round(PointsMinesTotalP[f]))+'</td><td style="font-size:0.75em;text-align:right;color:#'+options.couleur.graphB+';">'+addPoints(Math.round(PointsBatimentsTotalP[f]))+'</td><td style="font-size:0.75em;text-align:right;color:#'+options.couleur.graphE+';">'+addPoints(Math.round(PointsDefTotalP[f]))+'</td><td style="font-size:0.75em;text-align:left;">=> '+addPoints(Math.round(PointsMinesTotalP[f]+PointsBatimentsTotalP[f]+PointsDefTotalP[f]))+' ( '+pourcent(PointsMinesTotalP[f]+PointsBatimentsTotalP[f]+PointsDefTotalP[f],PointsTotal)+'% ) </td></tr>';
				}
					
				document.getElementById('listePla').innerHTML= aff+'<br/></table>' ;
				document.getElementById("Point_planete").style.display='none';
			}
			
			if(document.getElementById("Point_planete"))
			{
				document.getElementById("Point_planete").addEventListener("click", function(event) 
				{
					AffDetailPla();
				}, true);
			}	
			
			if(options.generale.AffDetailPla) AffDetailPla();
			
			/* ****************************** RaZ progression ********************************/
			if(document.getElementById("pointRef"))
			{
				document.getElementById("pointRef").addEventListener("click", function(event) 
				{
					if(confirm(text.Avertissement)) 
					{	
						GM_setValue(nomScript+"PointRef"+coordPM+serveur,PointsTotal+';'+date+';'+PointsMinesTotal+';'+PointsBatimentsTotal+';'+PointsTechno+';'+PointsFlotteTotal+';'+PointsDefTotal+';false;'+PointRef[8]+';'+PointRef[9]+';'+start_time+';'+document.getElementById('highscoreTT').getElementsByTagName('td')[5].innerHTML+';'+document.getElementById('highscoreTT').getElementsByTagName('td')[3].innerHTML+';'+GM_getValue(nomScript+'rankIndes'+coordPM+serveur, 0)+';;;');
					}	
				}, true);
			}
			
			if (!AJours)
			{
				/* ******************************A Jours apres clique ********************************/
				document.getElementById("MaJ").addEventListener("click", function(event) 
				{
					GM_setValue(nomScript+"aJours",true);
					GM_setValue(nomScript+"dateMaJ",Date.parse(new Date()) / 1000);
				}, true);
			}
			
			if(FireFox) 
			{	
				/* ******************************Recherche des MaJ ********************************/
				if (parseInt(GM_getValue(nomScript+"dateMaJ",0))+23*3600< Date.parse(new Date()) / 1000 ) 
				{
					GM_xmlhttpRequest(
					{
						method: 'GET',
						url: 'http://userscripts.org/scripts/show/54582',
						
						onload: function(response) 
						{
							var PageUserScript = response.responseText;
							
							var Derniere_Version = trim(PageUserScript.substring(PageUserScript.indexOf('<b>Version:</b>')+15, PageUserScript.indexOf('<br />', PageUserScript.indexOf('<b>Version:</b>'))));
							
							Version=Version+'';
							
							if (Derniere_Version.length < 10 && Derniere_Version.length > 3 ) 
							{
								if (Derniere_Version != Version ) 
								{							
									GM_setValue(nomScript+"aJours",false);
									GM_setValue(nomScript+"dateMaJ",Date.parse(new Date()) / 1000);
								}
								else 
								{					
									GM_setValue(nomScript+"aJours",true);
									GM_setValue(nomScript+"dateMaJ",Date.parse(new Date()) / 1000);
								}
							}
						}
					});
					
			/*		GM_xmlhttpRequest(
					{
						method: 'GET',
						url: 'http://vulca.evoserv.net/script/version.txt',
						
						onload: function(response) 
						{
							var Derniere_Version = response.responseText;
						}
					});
					*/
				}
			}
	}	
}}
/* **********************************************************************************************************************************************************************/
/* *********************************************************** Page Empire  ******************************************************************************************/
/* **********************************************************************************************************************************************************************/
	
else if ((url.indexOf('page=empire',0))>=0) 
{
	
	function stripHTML(txt)
	{ 
		return txt.replace(/<\S[^><]*>/g, "")
	}
	
	function empire()
	{
		var table = document.getElementById("mainWrapper");
		if (!table || table.getAttribute("done14111") == "done") return;
			table.setAttribute("done14111","done");
		
			var serveur = GM_getValue(url.split('/')[2], url.split('/')[2]);
			var pseudo = GM_getValue(nomScript+'Pseudo'+serveur , '#').split('#')[0];
			var coordPM = GM_getValue(nomScript+'Pseudo'+serveur , '#').split('#')[1];
			
			var DefPla = GM_getValue(nomScript+"DefPlanete"+coordPM+serveur,'||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;').split(';');
			var BatRes = GM_getValue(nomScript+"BatRes"+coordPM+serveur,'||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;').split(';');
			var BatSta = GM_getValue(nomScript+"BatSta"+coordPM+serveur,'|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;|||||||||||||;').split(';');
			var flotte = GM_getValue(nomScript+"flotte"+coordPM+serveur,'0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;0|0|0|0|0|0|0|0|0|0|0|0|0|0;').split(';');
			var infTech = GM_getValue(nomScript+"pointTechnoUni"+coordPM+serveur,'0;0').split(';');
			
			var idPlanete = GM_getValue(nomScript+'idPlanet'+pseudo+serveur , 'a;').split(';');
			
			var prixInitial = new Array(1.2,0.3,1.4,6,7,1,6.6,36,1.4,1,16,800,0,1,1,0.8);
			var exposant = new Array(2,2,2,2,2,2,2,2,2,2,1.75,2,2,2,2,2);
		
			// adaptation old uni avec new version prix Expé => PB si Expé devient Astro
			if( nonRedesignPrix )
				exposant = new Array(2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2);
			// **********//
			var nom_techno = new Array( 'ener', 'lase','ions','hype', 'plas', 'comb', 'impu', 'phyp', 'espi', 'ordi', 'astro' ,'rese', 'grav', 'prot','arme', 'bouc');
		
			if(url.indexOf('&planetType=1')==-1)
			{
				for(var nbplanete =0 ; nbplanete< idPlanete.length -1 ; nbplanete++)
				{
					if(document.getElementById('planet'+idPlanete[nbplanete]))
					{
						var infoPlanet = document.getElementById('planet'+idPlanete[nbplanete]);
						var infoSta = infoPlanet.getElementsByClassName('values group station groupstation')[0].getElementsByTagName('div');
							
						var infoRes = infoPlanet.getElementsByClassName('values group supply groupsupply')[0].getElementsByTagName('div');
												
						BatRes[nbplanete] ='';
						
						for(var f =0 ; f< infoRes.length ; f++)
						{
							BatRes[nbplanete] +=infoRes[f].getElementsByTagName('a')[0].innerHTML.replace('-','0') +'|';
							if (f==4) BatRes[nbplanete] +='0|';
						}		
						
						BatSta[nbplanete] =	infoSta[0].getElementsByTagName('a')[0].innerHTML.replace('-','0') +'|'+
										infoSta[2].getElementsByTagName('a')[0].innerHTML.replace('-','0') +'|'+
										infoSta[3].getElementsByTagName('a')[0].innerHTML.replace('-','0') +'|'+
										infoSta[5].getElementsByTagName('a')[0].innerHTML.replace('-','0') +'|'+
										infoSta[6].getElementsByTagName('a')[0].innerHTML.replace('-','0') +'|'+
										infoSta[1].getElementsByTagName('a')[0].innerHTML.replace('-','0') +'|'+
										infoSta[4].getElementsByTagName('a')[0].innerHTML.replace('-','0') +'|0|0|0|false';
						
					
					
						var infoFlotte = infoPlanet.getElementsByClassName('values group ships groupships')[0].getElementsByTagName('div');
							
						flotte[nbplanete+1] =infoFlotte[2].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
										infoFlotte[3].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
										infoFlotte[4].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
										infoFlotte[5].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
										infoFlotte[13].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
										infoFlotte[9].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
										infoFlotte[11].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
										infoFlotte[12].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
										infoFlotte[0].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
										infoFlotte[1].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
										infoFlotte[6].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
										infoFlotte[7].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
										infoFlotte[8].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
										infoFlotte[10].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|';
			
						var infoDef = infoPlanet.getElementsByClassName('values group defence groupdefence')[0].getElementsByTagName('div');
						DefPla[nbplanete] ='';
						for(var f =0 ; f< infoDef.length ; f++)
						{
							DefPla[nbplanete] +=infoDef[f].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|';
						}
					
						if (nbplanete == 0)
						{
							var infoTech = infoPlanet.getElementsByClassName('values group research groupresearch')[0].getElementsByTagName('div');
							
							var listeNivTech =infoTech[5].innerHTML.replace('-','0').split('<img')[0] +';'+
											infoTech[10].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[11].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[6].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[12].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[7].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[8].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[9].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[0].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[1].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[14].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[13].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[15].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[4].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[2].innerHTML.replace('-','0').split('<img')[0]  +';'+
											infoTech[3].innerHTML.replace('-','0').split('<img')[0]  +';';
						
							infTech[0]=0;
							for (var f=0; f<prixInitial.length ; f++)
							{
								 infTech[0] += Math.floor(prixInitial[f]*(Math.pow(exposant[f],listeNivTech.split(';')[f])-1)/(exposant[f]-1)*1000)/1000;
							}
							
							GM_setValue(nomScript+"nivTechno"+coordPM+serveur, listeNivTech );
							GM_setValue(nomScript+"pointTechnoUni"+coordPM+serveur, infTech.join(';'));
						}
					}
				}
			}
			else // lune
			{
				for(var nbplanete =0 ; nbplanete< idPlanete.length -1 ; nbplanete++)
				{
					if(document.getElementById('planet'+idPlanete[nbplanete]))
					{
						var infoPlanet = document.getElementById('planet'+idPlanete[nbplanete]);
						var infoSta = infoPlanet.getElementsByClassName('values group station groupstation')[0].getElementsByTagName('div');
							
						var infoRes = infoPlanet.getElementsByClassName('values group supply groupsupply')[0].getElementsByTagName('div');

						BatRes[nbplanete] ='0|0|0|0|0|0|'+
						infoRes[0].getElementsByTagName('a')[0].innerHTML.replace('-','0')+'|'+
						infoRes[1].getElementsByTagName('a')[0].innerHTML.replace('-','0')+'|'+
						infoRes[2].getElementsByTagName('a')[0].innerHTML.replace('-','0')+'|';

						BatSta[nbplanete] =	infoSta[0].getElementsByTagName('a')[0].innerHTML.replace('-','0')+'|'+
									infoSta[1].getElementsByTagName('a')[0].innerHTML.replace('-','0')+'|0|0|0|0|0|'+
									infoSta[2].getElementsByTagName('a')[0].innerHTML.replace('-','0')+'|'+
									infoSta[3].getElementsByTagName('a')[0].innerHTML.replace('-','0')+'|'+
									infoSta[4].getElementsByTagName('a')[0].innerHTML.replace('-','0')+'|true';

				
						var infoFlotte = infoPlanet.getElementsByClassName('values group ships groupships')[0].getElementsByTagName('div');
					
						flotte[nbplanete+1] =infoFlotte[2].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
									infoFlotte[3].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
									infoFlotte[4].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
									infoFlotte[5].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
									infoFlotte[13].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
									infoFlotte[9].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
									infoFlotte[11].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
									infoFlotte[12].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
									infoFlotte[0].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
									infoFlotte[1].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
									infoFlotte[6].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
									infoFlotte[7].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
									infoFlotte[8].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|'+
									infoFlotte[10].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|';
		
						var infoDef = infoPlanet.getElementsByClassName('values group defence groupdefence')[0].getElementsByTagName('div');
						DefPla[nbplanete] ='';
						for(var f =0 ; f< infoDef.length ; f++)
						{
							DefPla[nbplanete] +=infoDef[f].innerHTML.replace('-','0').replace( /[^0-9-]/g, "") +'|';
						}
					}
				}
			}
			

			GM_setValue(nomScript+"DefPlanete"+coordPM+serveur,DefPla.join(';'));
			GM_setValue(nomScript+"BatRes"+coordPM+serveur,BatRes.join(';'));
			GM_setValue(nomScript+"BatSta"+coordPM+serveur,BatSta.join(';'));
			GM_setValue(nomScript+"flotte"+coordPM+serveur,flotte.join(';'));
			
			GM_setValue(nomScript+"BatSta_const"+coordPM+serveur,'|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|');
			GM_setValue(nomScript+"BatRes_const"+coordPM+serveur,'|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|');
			GM_setValue(nomScript+"Res_const"+coordPM+serveur,'|');
			GM_setValue(nomScript+"Def_const"+coordPM+serveur,'|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|');
	

	}
	
		setInterval(empire, 500);
	
	}
/*	else if ((url.indexOf('page=showmessage',0))>=0) 
	{	
		//if(document.getElementsByClassName('new')[0]) // Si c'est un nouveau message
		{
			if (document.getElementById('battlereport')) // Si c'est un RC
			{
				var idRC = document.getElementById('shortreport').getElementsByClassName('textCenter next')[0].innerHTML.split('nID=')[1].split("','CombatReport")[0];
				window.open(url.split('&msg_id=')[0].replace('showmessage', 'combatreport')+'&nID='+idRC,"CombatReport");
			}
		}
	}
*/
	if ((url.indexOf('page=combatreport',0))>=0) 
	{
		var idRC = url.split('nID=')[1];
			
		if (GM_getValue(nomScript+'listeRCs'+ serveur + coordPM, ';').indexOf(';'+idRC+';')==-1)
				var newRc = true;
		else 	var newRc = false;
	
		function getVaisseau(numRound, statut)	
		{
			var nbVaisseau = 
			{
				'cle':0,'clo':0,'crois':0,'vb':0,'traq':0,'bb':0,'dest':0,'rip':0,'pt':0,'gt':0,'vc':0,'rec':0,'esp':0,'sat':0,
				'lm' : 0 ,'lle': 0 ,'llo': 0, 'gauss': 0 , 'ion': 0 ,'pla': 0 , 'pb': 0,'gb': 0, 'mic': 0, 'mip': 0, 
			};
			var nbVaisseauPerso = nbVaisseau;
			var nb=0;
			var taFlotte=false;
			var nom='';
			var prot = 0;
			var arme = 0;
			
			for (var k = 0 ; k< rounds[numRound].getElementsByClassName('round_'+statut+' textCenter')[0].getElementsByClassName('newBack').length ; k++)
			{
			//	var NomVaisseauSurRc = rounds[numRound].getElementsByClassName('round_'+statut+' textCenter')[0].getElementsByClassName('newBack')[k].getElementsByClassName('textGrow');

				if (rounds[numRound].getElementsByClassName('round_'+statut+' textCenter')[0].getElementsByClassName('newBack')[k].getElementsByClassName('textBeefy')[0].innerHTML.indexOf(pseudo) == -1)
					taFlotte = false;
				else taFlotte = true;
				
				if(rounds[numRound].getElementsByClassName('round_'+statut+' textCenter')[0].getElementsByClassName('newBack')[k].getElementsByTagName('tr')[1])
				{
					var structure = rounds[numRound].getElementsByClassName('round_'+statut+' textCenter')[0].getElementsByClassName('newBack')[k].getElementsByTagName('tr')[4].getElementsByTagName('td');
					var attaque = rounds[numRound].getElementsByClassName('round_'+statut+' textCenter')[0].getElementsByClassName('newBack')[k].getElementsByTagName('tr')[2].getElementsByTagName('td');
					
					var techno = rounds[0].getElementsByClassName('round_'+statut+' textCenter')[0].getElementsByClassName('newBack')[k].getElementsByClassName('weapons textBeefy')[0].innerHTML.split('%');
					
					for (var i = 1 ; i< structure.length ; i++)
					{
						prot = Math.round(parseInt(structure[i].innerHTML.replace( /[^0-9-]/g, ""))/(1+parseInt(techno[2].replace( /[^0-9-]/g, ""))/100))*10;
						arme = Math.round(parseInt(attaque[i].innerHTML.replace( /[^0-9-]/g, ""))/(1+parseInt(techno[0].replace( /[^0-9-]/g, ""))/100));
						
						if(nomVaisseauC[prot]) 
						{
							nom = nomVaisseauC[prot][arme];
							nb = parseInt(rounds[numRound].getElementsByClassName('round_'+statut+' textCenter')[0].getElementsByClassName('newBack')[k].getElementsByTagName('td')[i].innerHTML.replace( /[^0-9-]/g, ""));
							nbVaisseau[nom] += nb;
							if (taFlotte) nbVaisseauPerso[nom] += nb;
							
							if(nomVaisseauC[prot][arme] == 'undefined') err('error','vaisseau non detecté (arme) : prot '+prot+' arme : '+arme+ ' structure '+structure[i].innerHTML.replace( /[^0-9-]/g, "") + ' attaque '+attaque[i].innerHTML.replace( /[^0-9-]/g, ""));
						//alert(nom+nb+ '  '+prot+ '  '+arme+ '  '+rounds[numRound].getElementsByClassName('round_'+statut+' textCenter')[0].getElementsByClassName('newBack')[k].getElementsByTagName('td')[i].innerHTML.replace( /[^0-9-]/g, ""));
						}
						else err('error','vaisseau non detecté (prot) : prot '+prot+' arme : '+arme+ ' structure '+structure[i].innerHTML.replace( /[^0-9-]/g, "") + ' attaque '+attaque[i].innerHTML.replace( /[^0-9-]/g, ""));
					
					}
				}
			}
			
			return nbVaisseau['pt']+';'+nbVaisseau['gt']+';'+nbVaisseau['cle']+';'+nbVaisseau['clo']+';'+nbVaisseau['crois']+';'+nbVaisseau['vb']+';'+
			nbVaisseau['vc']+';'+nbVaisseau['rec']+';'+nbVaisseau['esp']+';'+nbVaisseau['bb']+';'+nbVaisseau['dest']+';'+nbVaisseau['rip']+';'+
			nbVaisseau['traq']+';'+nbVaisseau['sat']+';'+nbVaisseau['lm']+';'+nbVaisseau['lle']+';'+nbVaisseau['llo']+';'+nbVaisseau['gauss']+
			';'+nbVaisseau['ion']+';'+nbVaisseau['pla']+';'+nbVaisseau['pb']+';'+nbVaisseau['gb']+';0|'+nbVaisseauPerso['pt']+';'+
			nbVaisseauPerso['gt']+';'+nbVaisseauPerso['cle']+';'+nbVaisseauPerso['clo']+';'+nbVaisseauPerso['crois']+';'+nbVaisseauPerso['vb']+';'+
			nbVaisseauPerso['vc']+';'+nbVaisseauPerso['rec']+';'+nbVaisseauPerso['esp']+';'+nbVaisseauPerso['bb']+';'+nbVaisseauPerso['dest']+
			';'+nbVaisseauPerso['rip']+';'+nbVaisseauPerso['traq']+';'+nbVaisseauPerso['sat']+';'+nbVaisseauPerso['lm']+';'+nbVaisseauPerso['lle']+
			';'+nbVaisseauPerso['llo']+';'+nbVaisseauPerso['gauss']+';'+nbVaisseauPerso['ion']+';'+nbVaisseauPerso['pla']+';'+nbVaisseauPerso['pb']+
			';'+nbVaisseauPerso['gb']+';0';
		}

	
			var rounds = document.getElementsByClassName('combat_round');
			
			var attaquant = true;
			
			for(var i=0; i< rounds[0].getElementsByClassName('round_defender textCenter')[0].getElementsByClassName('textBeefy').length; i++)
			{
				if(rounds[0].getElementsByClassName('round_defender textCenter')[0].getElementsByClassName('textBeefy')[i].innerHTML.indexOf(pseudo) > -1) attaquant = false;
			}
			
			if(attaquant)	{var statut = 'defender';var statutAutre = 'attacker';}
			else 			{var statut = 'attacker';var statutAutre = 'defender';}

			var nbVaisseauTotal = GM_getValue(nomScript+'Vaisseaux'+ serveur + coordPM, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;' ).split(';'); 
			
			var nomVaisseauC = 
			{
				'4000' : 
				{
					'5' : 'pt',
					'50' : 'cle',
				},
				'2000':
				{
					'80': 'lm',
					'100': 'lle',
					'1' : 'sat',
				},
				'8000':
				{
					'250': 'llo',
					'150' : 'ion',
				},
				'100000':
				{
					'3000':'pla',
					'1':'gb',
				},
				'10000': {'150': 'clo',},
				'27000':{'400':'crois',},
				'60000':{'1000':'vb',},
				'12000':{'5':'gt',},
				'30000':{'50':'vc',},
				'70000':{'700':'traq',},
				'75000':{'1000':'bb',},
				'110000':{'2000':'dest',},
				'9000000':{'200000':'rip',},
				'16000':{'1':'rec',},
				'1000':{'0':'esp',},
				'35000':{'1100':'gauss',},
				'20000':{'1':'pb',},
			};
			

			
			var nomVaisseau = text.tag.rc;
			var prixVaisseau = new Array( 4, 12, 4, 10, 29, 60, 40, 18, 1, 90, 125, 10000, 85, 2.5 , 2, 2,8,37,8, 130 ,20 ,100, 0);

			var nbVaisseau_initial = getVaisseau(0, statut).split('|')[0].split(';');
			var nbVaisseau_final = getVaisseau(rounds.length-1, statut).split('|')[0].split(';');
			
			var allier = getVaisseau(0, statutAutre);
			
			var nbVaisseau_perso = allier.split('|')[1].split(';');
			var nbVaisseau_Autre = allier.split('|')[0].split(';');
		
		//alert('Nouveau Rc :'+newRc+'\n vaisseaux a quai '+nbVaisseau_initial+'\n vaisseaux restant'+nbVaisseau_final+'\n tes vaisseaux envoyé'+nbVaisseau_perso+'\n total vaisseaux envoyé'+nbVaisseau_Autre);
	
		
	
			var totdega = 0;
			var totVaisseau = 0;
			var totdegaDef = 0;
			var totTaFlotte = 0;
			var totFlotte = 0;
			var totDef =0;
			
			// Création de lune
			if( document.getElementsByTagName('body')[0].innerHTML.indexOf(nomVaisseau[22]) > -1 && statut == 'defender') nbVaisseau_initial[22] = 1;
	
			for (var i = 0 ; i< nomVaisseau.length ; i++)
			{
				totTaFlotte+=nbVaisseau_perso[i]*prixVaisseau[i];
				totFlotte+=nbVaisseau_Autre[i]*prixVaisseau[i];
			}

			if(newRc && totTaFlotte != 0)
			{
		
				var pourcentTaFlotte = totTaFlotte/totFlotte;
				
				var coef = new Array(pourcentTaFlotte,pourcentTaFlotte,pourcentTaFlotte,pourcentTaFlotte,pourcentTaFlotte,pourcentTaFlotte,pourcentTaFlotte,pourcentTaFlotte,pourcentTaFlotte,pourcentTaFlotte,pourcentTaFlotte,pourcentTaFlotte,pourcentTaFlotte,pourcentTaFlotte,pourcentTaFlotte*30/100,pourcentTaFlotte*30/100,pourcentTaFlotte*30/100,pourcentTaFlotte*30/100,pourcentTaFlotte*30/100,pourcentTaFlotte*30/100,pourcentTaFlotte*30/100,pourcentTaFlotte*30/100, pourcentTaFlotte);
			
				for (var i = 0 ; i< nomVaisseau.length ; i++)
				{
					nbVaisseauTotal[i] = Math.round(nbVaisseauTotal[i]*10)/10 + Math.round((parseInt(nbVaisseau_initial[i]) - parseInt(nbVaisseau_final[i]))*coef[i]*10)/10;
				}
				
				
				var listeRC = GM_getValue(nomScript+'listeRCs'+ serveur + coordPM, ';|').split('|');
				var listeDateRC = GM_getValue(nomScript+'listeDateRCs'+ serveur + coordPM, '|').split('|');
				
				for(var i=0; i<listeDateRC.length ; i++)
				{
					if(start_time - 9*24*3600*1000 > parseInt(listeDateRC[i]))
					{
						listeDateRC[i]='';
						listeRC[i]='';
					}
				}
				
				//alert(listeDateRC.length+'\n'+listeDateRC.length);
			
				GM_setValue(nomScript+'listeDateRCs'+ serveur + coordPM, listeDateRC.join('|').replace( /\|{2,}/g, "|")+'|'+start_time);
				GM_setValue(nomScript+'listeRCs'+ serveur + coordPM,listeRC.join('|').replace( /\|{2,}/g, "|")+'|;'+idRC+';');
				GM_setValue(nomScript+'Vaisseaux'+ serveur + coordPM,nbVaisseauTotal.join(';'));
			}
			
			//alert(GM_getValue(nomScript+'listeRCs'+ serveur + coordPM, ';')+'\n'+GM_getValue(nomScript+'listeDateRCs'+ serveur + coordPM, '|'));
			
			for (var i = 0 ; i< 14 ; i++)
			{
				totdega+= nbVaisseauTotal[i] * prixVaisseau[i];
				totVaisseau += parseInt(nbVaisseauTotal[i]);
			}
			
			for (var i = 14 ; i< nomVaisseau.length ; i++)
			{
				totdegaDef+= nbVaisseauTotal[i] * prixVaisseau[i];
				totDef += parseInt(nbVaisseauTotal[i]);
			}
			
			for (var i = 0 ; i< nomVaisseau.length ; i++)
			{
				nbVaisseauTotal[i] = addPoints(parseInt(nbVaisseauTotal[i]));
			}
			
			var languesite = 'en';
			if (options.generale.langue== 'fr') languesite = 'fr';
			
			var signature ='<center><form action="http://vulca.netii.net/infoCompte/index.php?page=signatureVaisseau&langue='+languesite+'"  target="_blank" method="post">';	
			
			if (totTaFlotte == 0 && statut == 'defender' )
			{			
				signature+='<p><br/><br/><img src="http://uni42.ogame.org/game/img/icons/exclaim-red.gif" />Infocompte error : No ship is detected ... <img src="http://uni42.ogame.org/game/img/icons/exclaim-red.gif" />';
			}		
	
				signature+=	'<textarea name="nomVaisseau" style="display:none;">'+nomVaisseau.join(';')+'</textarea>';
				signature+=	'<textarea name="coordPM" style="display:none;">'+coordPM+'</textarea>';
				signature+=	'<textarea name="nbVaisseau" style="display:none;">'+nbVaisseauTotal.join(';')+'</textarea>';
				signature+=	'<textarea name="pseudo" style="display:none;">'+pseudo+'</textarea>';
				signature+=	'<textarea name="serveur" style="display:none;">'+serveur+'</textarea>';
				signature+=	'<textarea name="totdega" style="display:none;">'+addPoints(Math.round(totdega))+'</textarea>';
				signature+=	'<textarea name="points" style="display:none;">'+text.Points+'</textarea>';
				signature+=	'<textarea name="textDegats" style="display:none;">'+text.degats_infliges+'</textarea>';
				signature+=	'<textarea name="totVaisseau" style="display:none;">'+addPoints(totVaisseau)+'</textarea>';
				signature+=	'<textarea name="totdegaDef" style="display:none;">'+addPoints(Math.round(totdegaDef+totdega))+'</textarea>';
				signature+=	'<textarea name="lune" style="display:none;">'+text.luneCree+'</textarea>';
				signature+=	'<textarea name="img" style="display:none;">'+options.couleur.url+'</textarea>';
				signature+=	'<textarea name="uni" style="display:none;">'+serveur+'</textarea>';
				
				signature+=	'<input style="display:none; type="text" size="1" maxlength="3" name="colfondR" value="'+options.couleur.SignfondR+'" />';
				signature+=	'<input style="display:none; size="1" maxlength="3" type="text" name="colfondV" value="'+options.couleur.SignfondV+'" />';
				signature+=	'<input style="display:none; type="text" name="colfondB" size="1" maxlength="3" value="'+options.couleur.SignfondB+'" />';
				signature+=	'<input style="display:none; type="text" size="1" maxlength="3" name="coltextR" value="'+options.couleur.SigntxtR+'" />';
				signature+=	'<input style="display:none; type="text" name="coltextV" size="1" maxlength="3" value="'+options.couleur.SigntxtV+'" />';
				signature+=	'<input style="display:none; type="text"  size="1" maxlength="3" name="coltextB" value="'+options.couleur.SigntxtB+'" />';		
		
				
				
				signature+=	'<input style="cursor:pointer;" type="radio" class="type" name="type" checked value="Flotte"  /> <label for="Flotte"> '+text.Fleet+ ' </label>';
				signature+=	'<input style="cursor:pointer;" type="radio" class="type" name="type" unchecked value="Def"  /> <label for="Def"> '+text.Defense+ ' </label><br/><br/>';
				signature+='<input type="submit" value="'+text.creeSign+'" style="cursor:pointer;background-color:transparent; border: solid black 1px; color:#CCCCCC;"/></form><br/><br/><br/><br/></center>';

			if (options.generale.SignaRc)
			{
				document.getElementsByTagName('body')[0].innerHTML += signature ;
			}	
	}
	
	if( url.indexOf('mines.webinpact.com') >-1 ) 
	{
	
		function Insert(where, what, avec) 
		{
			var Object = document.createElement(what);
			where.appendChild(Object);
			Object.innerHTML = avec;
		}
		
		var idProfile = url.split('profil=')[1];
		
		var listeAccount = document.getElementsByClassName('linksMenu')[5].getElementsByClassName('menu');
		
		for(var i = 0 ; i<listeAccount.length ; i++)
		{
			if(listeAccount[i].href.indexOf(idProfile) > -1)
			{
				var href = listeAccount[i].innerHTML.split(' : Uni ');
				var serveur = (trim(href[1])+'.'+trim(href[0])).toLowerCase();
				
				if(!isNaN(href[1])) serveur= 'uni'+serveur;				// Anciens uni 
				
				i=listeAccount.length;
			}
		}
		
		var coordPM = GM_getValue(nomScript+'Pseudo'+serveur , '#').split('#')[1];
			
		var BatRes = GM_getValue(nomScript+"BatRes"+coordPM+serveur,'||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;||||||||||||||;').split(';');
		var BatRes_const = GM_getValue(nomScript+"BatRes_const"+coordPM+serveur,'|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|;|').split(';');
		
		var info = GM_getValue(nomScript+'Minepact'+serveur ,'##;' ).split(';');
		var colorFond = "#4040FF";
		var f=1;
		
		var metal;var cristal; var deut;
		
		for(var i = 0 ; i< info.length ; i++)
		{
			if(info[i].split('#')[2] == 'false') // Si planete 
			{
				metal = parseInt(BatRes[i].split('|')[0]);
				cristal = parseInt(BatRes[i].split('|')[1]);
				deut = parseInt(BatRes[i].split('|')[2]);
				
				if(BatRes_const[i] != '|') // upgrade mine en construction si terminé
				{
					if( parseInt(BatRes_const[i].split('|')[1]) < start_time)
					{
						if(BatRes_const[i].split('|')[0] == 'mmet') metal++;
						if(BatRes_const[i].split('|')[0] == 'mcri') cristal++;
						if(BatRes_const[i].split('|')[0] == 'mdet') deut++;
						
					}
				}
				
				
				if(document.getElementById('planete'+f).value != info[i].split('#')[1])
				{
					document.getElementById('planete'+f).value = info[i].split('#')[1];
					document.getElementById('planete'+f).style.background =colorFond;
				}
				
				if(document.getElementById('temp'+f).value != info[i].split('#')[0])
				{
					document.getElementById('temp'+f).value = info[i].split('#')[0];
					document.getElementById('temp'+f).style.background =colorFond;
				}
				
				if(parseInt(document.getElementById('metal'+f).value) != metal)
				{
					document.getElementById('metal'+f).title = plus(metal-parseInt(document.getElementById('metal'+f).value));
					document.getElementById('metal'+f).value = metal;
					document.getElementById('metal'+f).style.background =colorFond;
				}
					
				if(parseInt(document.getElementById('cristal'+f).value) != cristal)
				{
					document.getElementById('cristal'+f).title = plus(cristal-parseInt(document.getElementById('cristal'+f).value));
					document.getElementById('cristal'+f).value = cristal;
					document.getElementById('cristal'+f).style.background =colorFond;
				}
				
				if(parseInt(document.getElementById('deut'+f).value) != deut)
				{
					document.getElementById('deut'+f).title = plus(deut-parseInt(document.getElementById('deut'+f).value));
					document.getElementById('deut'+f).value = deut;
					document.getElementById('deut'+f).style.background =colorFond;
				}
				
				f++;
			}
		}
		
		if(info[0] != '##')
		{
			var Table = document.getElementById('saisie').getElementsByTagName('table')[0];
			
			Insert(Table, 'tr', '<td id="majIFC" class="corps" colspan="5">Mise à jour par InfoCompte, cliquez sur OK pour que les changements soient pris en compte</td>');
		document.getElementById("majIFC").style.color=colorFond;
		}		
	}

	
//alert((new Date()).getTime() - start_time);


