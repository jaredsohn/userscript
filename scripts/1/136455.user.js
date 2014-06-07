// ==UserScript==
// @name           D4rkv3nom_Scripts_SpacesWars
// @namespace      none
// @include        http://spaceswars.fr*
// @include        http://www.spaceswars.fr*
// @include        http://spaceswars.com*
// @include        http://www.spaceswars.com*
// ==/UserScript==
// 
// DATE : 08/08/2012
// Script created by D4rkv3nom -
// 
// 

//Version 08/08/2012
//CORRECTION : Convertisseur RC
//CORRECTION : Envoi de messages vides
//CORRECTION : Ressources en vol
//CORRECTION : Bug limite de caractère Chat
//AMELIORATION : Messages détaillés pour Alliance, espionnage
//AMELIORATION : Equivalent deut ajoutés pour ressources dynamiques et ressources en vol
//AMELIORATION : Enlever auto coord Chat 
//AMELIORATION : Retours planètes assombrits pour une meilleure distinction 


//TODO :Planètes sur le coté

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}


var location = "", uni="", div;
var max_uni = 15; // Pour avoir quelques univers d'avance
var default_main = document.getElementById("default_main");
var main = document.getElementById("main");
var debug=0;
var version=100, toUpdate=101, lastCheckUpdate=102, news=103
var nb_scripts=9;
var NB_VAISSEAUX_SW=19;
var versionscript = "1.1";
//Capacités flottes
var capacites_flottes = [];
var div, img, tmp;
capacites_flottes = [["ship202",5000],["ship203",25000],["ship204",50],["ship205",150],["ship206",800],["ship207",1500],["ship208",7500],["ship209",20000],["ship210",0],["ship212",500],["ship213",2000],["ship214",1000000],["ship215",750],["ship216",2000000],["ship217",10000000],["ship218",300000],["ship219",8000],["ship235",20000]];
var fleet_deut = [["Petit transporteur",1500],["Grand transporteur",4500],["Chasseur léger",1250],["Chasseur lourd",3500],["Croiseur",10500],["Vaisseau de bataille",18750],["Vaisseau de colonisation",22500],["Recycleur",7500],["Sonde espionnage",500],["Bombardier",40000],["Satellite solaire",1000],["Destructeur",55000],["Étoile de la mort",4250000],["Traqueur",42500],["Supernova",15500000],["Convoyeur",3750000],["Collecteur",75000],["Foudroyeur",89500],["Vaisseau Extracteur",62500]];
var couleurs_rc = {"P.transp. :":"#0000FF","G.transp. :":"#8A2BE2","Ch.léger :":"#A52A2A","Ch.lourd :":"#D2691E","Croiseur :":"#6495ED","V.bataille :":"#DC143C","V.colo. :":"#00008B","Recycleur :":"#008B8B","Sonde :":"#006400","Bombardier :":"#8B008B","Destr. :":"#8B0000","Rip :":"#1E90FF","Traqueur :":"#B22222","Supernova :":"#008000","Convoyeur :":"#4B0082","Collecteur :":"#800000","Foudroyeur :":"#800080","Vaisseau Extracteur :":"#FF4500","Sat.sol. :":"#000","Missile :":"#2E8B57","L.léger. :":"#4682B4","L.lourd :":"#8B4513","Art.ions :":"#FA8072","Can.Gauss :":"#FF0000","Lanc.plasma :":"#DA70D6","P.bouclier :":"#7B68EE","G.bouclier :":"#3CB371","Protec.Pl :":"#0000CD"};	
var mips_defense = [["Lanceur de missiles",13],["Artillerie laser légère",7],["Artillerie laser lourde",1.8],["Canon de Gauss",0.3],["Artillerie à ions",1.3],["Lanceur de plasma",0.07],["Petit bouclier",0.1],["Grand bouclier",0.1],["Protecteur Planètaire",0.0006],["Missile d'Interception",0.25],["Missile Interplanétaire",50000]];

					

	//Fonction créee par NiArK 
	function get_infos_from_page()
	{
		tab = [];
		tab["location"] = (/spaceswars\.(?:fr|com)\/univers[0-9]{1,2}\/(.*)\.php/.test(window.location.href)) ? /spaceswars\.(?:fr|com)\/univers[0-9]{1,2}\/(.*)\.php/.exec(window.location.href)[1] : "index";
		tab["universe"] = (/univers([0-9]{1,2})/.test(window.location.href)) ? /univers([0-9]{1,2})/.exec(window.location.href)[1] : 0;
		return tab;
	}
	//Fonction créee par NiArK 
	function get_nb_from_stringtab (tab)
	{
		var result="";
		for (k=0; k<tab.length; k++)
			result += tab[k];
		return parseInt(result);
	}
	function sw_to_number(sw_stringnumber)
	{
		var sw_number = parseInt(sw_stringnumber.replace(/\./g,''));
		return sw_number;
	}
	
	function extractUrlParams(){	
		var t = window.location.search.substr(1).split('&');
		var f = [];
		for (var i=0; i<t.length; i++){
			var x = t[ i ].split('=');
			f[x[0]]=x[1];
		}
		return f;
	}

	function sw_to_number_rc(sw_stringnumber) //Spéciale pour les RC ( virgules à la place des points)
	{
		var sw_number = parseInt(sw_stringnumber.replace(/\,/g,''));
		return sw_number;
	}
	
	function isset(variable){
	if ( typeof( window[variable] ) != "undefined" ) {
		 return true;
	   }
	else {
		 return false;
	   }
	}
	
	//Fonction créee par NiArK 
	function build_node (type, attr, attrValue, content, event, eventFunc)
	{
		var elem = document.createElement(type);
		for (k=0; k<attr.length; k++)
			elem.setAttribute(attr[k], attrValue[k]);
		if (event)
			elem.addEventListener(event, eventFunc, false);
		elem.innerHTML = content;
		return elem;
	}
	
	function set_infos_scripts()
	{
		var tab = [], tabsettings = [],date = new Date();
		for (i=0; i<nb_scripts; i++)
			tab[i] = {};
		for (i=0; i<nb_scripts; i++)
			tabsettings[i] = {};
		tab[version] = "1.0";
		tab[toUpdate] = false;
		tab[lastCheckUpdate] = date.getTime();
		tab[0].options = []; tab[0].options[0]={}; ; tab[0].name = "RC Convert";		tab[0].active = 1;		tab[0].description = "Convertir les rapports de combats en rapports détaillés et lisibles sur le forum";
		tab[0].options[0].name="Images personnalisées";
		tab[0].options[0].description="Choisissez des images personnalisées si celles par defaut ne vous conviennent pas ( laissez vide pour image par defaut )";
		tab[0].options[0].html="</br><b>Image Header</b><input id='0-imageheader'style='margin-left:20px;background:#FFF;color:black;' type=text/></br><b>Image Boom</b><input id='0-imageboom'style='margin-left:20px;background:#FFF;color:black;' type=text/></br><b>Image Résultat</b><input id='0-imageresultat'style='margin-left:20px;background:#FFF;color:black;' type=text/></br><b>Image Rentabilité</b><input id='0-imagerenta'style='margin-left:20px;background:#FFF;color:black;' type=text/>";
		tabsettings[0]['imageheader']="";
		tabsettings[0]['imageboom']="";
		tabsettings[0]['imageresultat']="";
		tabsettings[0]['imagerenta']="";
		
		tab[1].options = []; tab[1].options[0]={}; tab[1].name = "Ress. Dynamiques";		tab[1].active = 1;		tab[1].description = "Affiche le nombre de ressources nécessaires à la création de x Vaisseaux/défenses, le tout dynamiquement";
		tab[1].options[0].name="Equivalent deutérium";
		tab[1].options[0].description="Afficher l'équivalent deutérium du nombre de ressources nécéssaires, utile lorsque l'on veut avoir un aperçu de combien va nous couter tant de vaisseaux par rapport à un stock de deutérium";
		tab[1].options[0].html="</br><INPUT type=radio name='1-equivalentdeut' id='1-equivalentdeut-yes' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio name='1-equivalentdeut' id='1-equivalentdeut-no' style='margin-left:20px;' value='no'>	Désactivé  ";
		tabsettings[1]['equivalentdeut']='yes';
		
		tab[2].options = []; tab[2].options[0]={}; tab[2].options[4]={}; tab[2].options[1]={}; tab[2].options[2]={}; tab[2].options[3]={}; tab[2].name = "Messagerie";		tab[2].active = 1;		tab[2].description = "Version améliorée de la messagerie";
		tab[2].options[0].name="Combat";
		tab[2].options[0].description="Titres rapports de combats améliorés";
		tab[2].options[0].html="</br><INPUT type=radio name='2-combat' id='2-combat-yes' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio name='2-combat' id='2-combat-no' style='margin-left:20px;' value='no'>	Désactivé  ";
		tab[2].options[1].name="Alliance";
		tab[2].options[1].description="Messages d'alliance préouverts et modifiés pour une lecture rapide";
		tab[2].options[1].html="</br><INPUT type=radio id='2-alliance-yes' name='2-alliance' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio id='2-alliance-no' name='2-alliance' style='margin-left:20px;' value='no'>	Désactivé  ";
		tab[2].options[2].name="Espionnage";
		tab[2].options[2].description="Coordonnées dans le titre du message d'activité d'espionnage";
		tab[2].options[2].html="</br><INPUT type=radio id='2-espionnage-yes' name='2-espionnage' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio id='2-espionnage-no' name='2-espionnage' style='margin-left:20px;' value='no'>	Désactivé  ";
		tab[2].options[3].name="Message envoyés";
		tab[2].options[3].description="Vous permets de visualiser tout les messages que vous avez envoyés";
		tab[2].options[3].html="</br><INPUT type=radio id='2-msgenvoyes-yes' name='2-msgenvoye' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio id='2-msgenvoyes-no' name='2-msgenvoye' style='margin-left:20px;' value='no'>	Désactivé  ";
		tab[2].options[4].name="Missiles interplanétaires";
		tab[2].options[4].description="Vous permets de savoir à peu prêt combien faut il lancer de missiles interplanétaires ( Attention, ceci est juste une approximation et dépend de plein de choses! )";
		tab[2].options[4].html="</br><INPUT type=radio id='2-mips-yes' name='2-mips' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio id='2-mips-no' name='2-mips' style='margin-left:20px;' value='no'>	Désactivé  ";
		tabsettings[2]['espionnage']='yes';
		tabsettings[2]['combat']='yes';
		tabsettings[2]['alliance']='yes';
		tabsettings[2]['msgenvoyes']='yes';
		tabsettings[2]['msgenvoyestab']=[];
		tabsettings[2]['mips']='yes';
		
		tab[3].options = []; tab[3].options[0]={}; tab[3].options[1]={}; tab[3].options[2]={}; tab[3].name = "Vue Générale Améliorée";		tab[3].active = 1;		tab[3].description = "Quelques modifications de la vue générale";
		tab[3].options[0].name="Ressources en vol";
		tab[3].options[0].description="Affiche le nombre de ressources en vol";
		tab[3].options[0].html="</br><INPUT type=radio name='3-ressourcesvol' id='3-ressourcesvol-yes' value='yse' style='margin-left:20px;'> Activé <INPUT type=radio name='3-ressourcesvol' id='3-ressourcesvol-no' style='margin-left:20px;' value='no'>	Désactivé  </br></br>Afficher l'équivalent deut ?</br><INPUT type=radio name='3-equivalentdeut' id='3-equivalentdeut-yes' value='yse' style='margin-left:20px;'> Activé <INPUT type=radio name='3-equivalentdeut' id='3-equivalentdeut-no' style='margin-left:20px;' value='no'>	Désactivé  ";
		tab[3].options[1].name="Retours de flotte";
		tab[3].options[1].description="Assombrit les flottes en mode retour afin de les distinguer plus facilement";
		tab[3].options[1].html="</br><INPUT type=radio name='3-retourflotte' id='3-retourflotte-yes' value='yse' style='margin-left:20px;'> Activé <INPUT type=radio name='3-retourflotte' id='3-retourflotte-no' style='margin-left:20px;' value='no'>	Désactivé  ";
		tab[3].options[2].name="Modifier flèches changement de planète";
		tab[3].options[2].description="Modifie légèrement les flèches du changement de planète afin que celles ci soit plus facile à utiliser ( trop petites et trop proches )";
		tab[3].options[2].html="</br><INPUT type=radio name='3-fleches' id='3-fleches-yes' value='yse' style='margin-left:20px;'> Activé <INPUT type=radio name='3-fleches' id='3-fleches-no' style='margin-left:20px;' value='no'>	Désactivé  </br>";
		tabsettings[3]['equivalentdeut']='yes';
		tabsettings[3]['fleches']='yes';
		tabsettings[3]['ressourcesvol']='yes';
		tabsettings[3]['retourflotte']='yes';
		
		tab[4].options = []; tab[4].options[0]={}; tab[4].name = "Couleur Chat";		tab[4].active = 1;		tab[4].description = "Propose d'écrire en une certaine couleur dans le chat";
		tab[4].options[0].name="Effacer les coordonnées";
		tab[4].options[0].description="Efface les coordonnées automatiquement lors d'oubli pour éviter quelques bans ;)";
		tab[4].options[0].html="</br><INPUT type=radio name='4-stopcoord' value='yes' id='4-stopcoord-yes' style='margin-left:20px;'> Activé <INPUT type=radio id='4-stopcoord-no' name='4-stopcoord' style='margin-left:20px;' value='no'>	Désactivé  ";
		tabsettings[4]['stopcoord']='yes';
		
		tab[5].options = []; tab[5].options[0]={}; tab[5].options[1]={}; tab[5].options[2]={}; tab[5].name = "Galaxie";		tab[5].active = 1;		tab[5].description = "Ajout de diverses fonctionnalités dans la galaxie";
		tab[5].options[0].name="Marqueurs de galaxie";
		tab[5].options[0].description="Ajoute des marqueurs de cibles";
		tab[5].options[0].html="</br><INPUT type=radio name='5-marqueurs' value='yes' id='5-marqueurs-yes' style='margin-left:20px;'> Activé <INPUT type=radio id='5-marqueurs-no' name='5-marqueurs' style='margin-left:20px;' value='no'>	Désactivé  </br>Afficher les marqueurs dans les rapports d'espionnages<br/><INPUT type=radio name='5-msgespio' value='yes' id='5-msgespio-yes' style='margin-left:20px;'> Activé <INPUT type=radio id='5-msgespio-no' name='5-msgespio' style='margin-left:20px;' value='no'>	Désactivé  ";
		tab[5].options[1].name="Couleurs personnalisées du marqueur";
		tab[5].options[1].description="Choisissez des couleurs personnalisées si celles par defaut ne vous conviennent pas";
		tab[5].options[1].html="</br><b>Couleur Frigo</b><input class='color' id='5-couleurfrigo'style='margin-left:20px;background:#FFF;color:black;' type=text/></br><b>Couleur Bunker</b><input class='color' id='5-couleurbunker'style='margin-left:20px;background:#FFF;color:black;' type=text/></br><b>Couleur A recycler</b><input class='color' id='5-couleurarecycler'style='margin-left:20px;background:#FFF;color:black;' type=text/></br><b>Couleur Ne pas attaquer</b><input class='color' id='5-couleurnepasattaquer'style='margin-left:20px;background:#FFF;color:black;' type=text/>";
		tab[5].options[2].name="Derniers rapports d'espionnages";
		tab[5].options[2].description="Affiche dans la galaxie le dernier rapport d'espionnage connu de chaque planètes";
		tab[5].options[2].html="</br><INPUT type=radio name='5-rapportsespio' value='yes' id='5-rapportsespio-yes' style='margin-left:20px;'> Activé <INPUT type=radio id='5-rapportsespio-no' name='5-rapportsespio' style='margin-left:20px;' value='no'>	Désactivé   ";
		tabsettings[5]['options'] = "defautmarqueur,frigo,bunker,arecycler,nepasattaquer";
		tabsettings[5]['couleurdefautmarqueur']="transparent";
		tabsettings[5]['couleurfrigo']="30A5FF";
		tabsettings[5]['couleurbunker']="FF9317";
		tabsettings[5]['couleurarecycler']="44BA1F";
		tabsettings[5]['couleurnepasattaquer']="FF2626";
		tabsettings[5]['msgespio']="yes";
		tabsettings[5]['marqueurs']="yes";
		tabsettings[5]['rapportsespio']="yes";
		tabsettings[5]['rapportsespiotab']={};
		
		tab[6].options = []; tab[6].options[0]={};  tab[6].name = "Batiments";		tab[6].active = 1;		tab[6].description = "Modifications sur la page Batiments";
		tab[6].options[0].name="Equivalent deut";
		tab[6].options[0].description="Affiche l'équivalent deut d'un batiment";
		tab[6].options[0].html="</br><INPUT type=radio name='6-equivalentdeut' id='6-equivalentdeut-yes' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio name='6-equivalentdeut' id='6-equivalentdeut-no' style='margin-left:20px;' value='no'>	Désactivé  ";
		tabsettings[6]['equivalentdeut']='yes';
		
		tab[7].options = []; tab[7].options[0]={};  tab[7].name = "Recherches";		tab[7].active = 1;		tab[7].description = "Modifications sur la page Recherches";
		tab[7].options[0].name="Equivalent deut";
		tab[7].options[0].description="Affiche l'équivalent deut d'un batiment";
		tab[7].options[0].html="</br><INPUT type=radio name='7-equivalentdeut' id='7-equivalentdeut-yes' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio name='7-equivalentdeut' id='7-equivalentdeut-no' style='margin-left:20px;' value='no'>	Désactivé  ";
		tabsettings[7]['equivalentdeut']='yes';
		
		tab[8].options = []; tab[8].options[0]={};  tab[8].options[1]={};tab[8].name = "Flottes";		tab[8].active = 1;		tab[8].description = "Modifications sur la page Flotte";
		tab[8].options[0].name="Envoi rapide";
		tab[8].options[0].description="redirige automatiquement sur la page flotte lorsque la page résumé de flotte ( dernière page lors d'un envoi ) s'affiche";
		tab[8].options[0].html="</br><INPUT type=radio name='8-envoirapide' id='8-envoirapide-yes' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio name='8-envoirapide' id='8-envoirapide-no' style='margin-left:20px;' value='no'>	Désactivé  ";
		tab[8].options[1].name="Flotte en vol";
		tab[8].options[1].description="Affiche sous forme graphique le pourcentage de flotte en vol/à quai ( utile pour savoir si on n'a pas oublié de flotte sur les planètes )";
		tab[8].options[1].html="</br><INPUT type=radio name='8-flotteenvol' id='8-flotteenvol-yes' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio name='8-flotteenvol' id='8-flotteenvol-no' style='margin-left:20px;' value='no'>	Désactivé  ";
		
		tabsettings[8]['flotteenvol']='yes';
		tabsettings[8]['flotteaquaipts']=-1;
		tabsettings[8]['envoirapide']='yes';
		
		GM_setValue("infosScripts", JSON.stringify(tab));
		for(j=1;j<=max_uni;j++)
		{
			GM_setValue("settingsScripts"+j, JSON.stringify(tabsettings));
		}
		return tab;
	}

	function chargerjscolor()
	{
		//On charge le script JSCOLOR
		var GM_JScolor = document.createElement('script'); 
		GM_JScolor.src = 'http://cluster006.ovh.net/~simutran/js/jscolor.js';
		GM_JScolor.type = 'text/javascript'; 
		document.getElementsByTagName('head')[0].appendChild(GM_JScolor); 
	}
	function calcul_capacite(event)
	{
		var capacite_tot = 0;
		for (var i=0; i<capacites_flottes.length; i++){
			if (document.getElementById(capacites_flottes[i][0])!=null){
				capacite_tot += parseInt(document.getElementById(capacites_flottes[i][0]).value*capacites_flottes[i][1]);
			}
		}
		main.getElementsByClassName("divtop curvedtot")[1].getElementsByTagName("font")[0].innerHTML=get_slashed_nb(capacite_tot);
	}
	
	function get_slashed_nb(nStr)
	{
		nStr += '';
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + '.' + '$2');
		}
		return x1 + x2;
	}
	
	function getPosition(elementNode){
		var left = 0;
		var top = 0;
		/*Tant que l'on a un élément parent*/
		while (elementNode.offsetParent != undefined && elementNode.offsetParent != null)
		{
			/*On ajoute la position de l'élément parent*/
			left += elementNode.offsetLeft + (elementNode.clientLeft != null ? elementNode.clientLeft : 0);
			top += elementNode.offsetTop + (elementNode.clientTop != null ? elementNode.clientTop : 0);
			elementNode = elementNode.offsetParent;
		}
		return new Array(left,top);
	}
	 function injectCSS(cssdata)
	{
        head = document.getElementsByTagName("head")[0];
        style = document.createElement("style");
        style.setAttribute("type", 'text/css');
        style.innerHTML = cssdata;
        head.appendChild(style);
	}
	
	
	
	uni = (get_infos_from_page())["universe"];
	location = (get_infos_from_page())["location"];	
	
	//Récupération des infos locales 
	var infos_scripts = eval(GM_getValue("infosScripts"));
	var settings_scripts = eval(GM_getValue("settingsScripts"+uni));
	//var infos_version = eval(GM_getValue("infosVersion"));
	
	
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////  SCRIPT GENERAL  //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////	
if (location=="overview")
{
	if (GM_getValue("infosScripts") == undefined || debug){
		var infos_scripts = set_infos_scripts();
		var settings_scripts = eval(GM_getValue("settingsScripts"+uni));
	}
	if( infos_scripts[version]!=versionscript ){
		
		infos_scripts[6] = {};
		infos_scripts[7] = {};
		infos_scripts[8] = {};
		infos_scripts[2].name = "Messagerie";
		
		infos_scripts[2].options[3]={};
		infos_scripts[2].options[3].name="Message envoyés";
		infos_scripts[2].options[3].description="Vous permets de visualiser tout les messages que vous avez envoyés";
		infos_scripts[2].options[3].html="</br><INPUT type=radio id='2-msgenvoyes-yes' name='2-msgenvoyes' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio id='2-msgenvoyes-no' name='2-msgenvoyes' style='margin-left:20px;' value='no'>	Désactivé  ";
		

		infos_scripts[6].options = []; infos_scripts[6].options[0]={};  infos_scripts[6].name = "Batiments";		infos_scripts[6].active = 1;		infos_scripts[6].description = "Modifications sur la page Batiments";
		infos_scripts[6].options[0].name="Equivalent deut";
		infos_scripts[6].options[0].description="Affiche l'équivalent deut d'un batiment";
		infos_scripts[6].options[0].html="</br><INPUT type=radio name='6-equivalentdeut' id='6-equivalentdeut-yes' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio name='6-equivalentdeut' id='6-equivalentdeut-no' style='margin-left:20px;' value='no'>	Désactivé  ";
			
		infos_scripts[7].options = []; infos_scripts[7].options[0]={};  infos_scripts[7].name = "Recherches";		infos_scripts[7].active = 1;		infos_scripts[7].description = "Modifications sur la page Recherches";
		infos_scripts[7].options[0].name="Equivalent deut";
		infos_scripts[7].options[0].description="Affiche l'équivalent deut d'un batiment";
		infos_scripts[7].options[0].html="</br><INPUT type=radio name='7-equivalentdeut' id='7-equivalentdeut-yes' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio name='7-equivalentdeut' id='7-equivalentdeut-no' style='margin-left:20px;' value='no'>	Désactivé  ";
		

		infos_scripts[version] = "1.1";
		infos_scripts[toUpdate] = false;
		date = new Date();
		infos_scripts[lastCheckUpdate] = date.getTime();
		
		infos_scripts[5].options[1]={};
		infos_scripts[5].options[1].name="Rapports d'espionnages";
		infos_scripts[5].options[1].description="Afficher les marqueurs dans les rapports d'espionnages";
		infos_scripts[5].options[1].html="</br><INPUT type=radio name='5-msgespio' value='yes' id='5-msgespio-yes' style='margin-left:20px;'> Activé <INPUT type=radio id='5-msgespio-no' name='5-msgespio' style='margin-left:20px;' value='no'>	Désactivé  ";
		
		
 
		infos_scripts[5].name = "Galaxie"; 	infos_scripts[5].description = "Ajout de diverses fonctionnalités dans la galaxie";
		infos_scripts[5].options[0].name="Marqueurs de galaxie";
		infos_scripts[5].options[0].description="Ajoute des marqueurs de cibles";
		infos_scripts[5].options[0].html="</br><INPUT type=radio name='5-marqueurs' value='yes' id='5-marqueurs-yes' style='margin-left:20px;'> Activé <INPUT type=radio id='5-marqueurs-no' name='5-marqueurs' style='margin-left:20px;' value='no'>	Désactivé  </br>Afficher les marqueurs dans les rapports d'espionnages<br/><INPUT type=radio name='5-msgespio' value='yes' id='5-msgespio-yes' style='margin-left:20px;'> Activé <INPUT type=radio id='5-msgespio-no' name='5-msgespio' style='margin-left:20px;' value='no'>	Désactivé  ";
		infos_scripts[5].options[1].name="Couleurs personnalisées du marqueur";
		infos_scripts[5].options[1].description="Choisissez des couleurs personnalisées si celles par defaut ne vous conviennent pas";
		infos_scripts[5].options[1].html="</br><b>Couleur Frigo</b><input class='color' id='5-couleurfrigo'style='margin-left:20px;background:#FFF;color:black;' type=text/></br><b>Couleur Bunker</b><input class='color' id='5-couleurbunker'style='margin-left:20px;background:#FFF;color:black;' type=text/></br><b>Couleur A recycler</b><input class='color' id='5-couleurarecycler'style='margin-left:20px;background:#FFF;color:black;' type=text/></br><b>Couleur Ne pas attaquer</b><input class='color' id='5-couleurnepasattaquer'style='margin-left:20px;background:#FFF;color:black;' type=text/>";
		

		
		infos_scripts[5].options[2]={};
		infos_scripts[5].options[2].name="Derniers rapports d'espionnages";
		infos_scripts[5].options[2].description="Affiche dans la galaxie le dernier rapport d'espionnage connu de chaque planètes";
		infos_scripts[5].options[2].html="</br><INPUT type=radio name='5-rapportsespio' value='yes' id='5-rapportsespio-yes' style='margin-left:20px;'> Activé <INPUT type=radio id='5-rapportsespio-no' name='5-rapportsespio' style='margin-left:20px;' value='no'>	Désactivé   ";
		
		
		infos_scripts[3].options[2]={};
		infos_scripts[3].options[2].name="Modifier flèches changement de planète";
		infos_scripts[3].options[2].description="Modifie légèrement les flèches du changement de planète afin que celles ci soit plus facile à utiliser ( trop petites et trop proches )";
		infos_scripts[3].options[2].html="</br><INPUT type=radio name='3-fleches' id='3-fleches-yes' value='yse' style='margin-left:20px;'> Activé <INPUT type=radio name='3-fleches' id='3-fleches-no' style='margin-left:20px;' value='no'>	Désactivé  </br>";
		
		
		infos_scripts[8].options = []; infos_scripts[8].options[0]={};  infos_scripts[8].options[1]={};infos_scripts[8].name = "Flottes";		infos_scripts[8].active = 1;		infos_scripts[8].description = "Modifications sur la page Flotte";
		infos_scripts[8].options[0].name="Envoi rapide";
		infos_scripts[8].options[0].description="redirige automatiquement sur la page flotte lorsque la page résumé de flotte ( dernière page lors d'un envoi ) s'affiche";
		infos_scripts[8].options[0].html="</br><INPUT type=radio name='8-envoirapide' id='8-envoirapide-yes' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio name='8-envoirapide' id='8-envoirapide-no' style='margin-left:20px;' value='no'>	Désactivé  ";
		infos_scripts[8].options[1].name="Flotte en vol";
		infos_scripts[8].options[1].description="Affiche sous forme graphique le pourcentage de flotte en vol/à quai ( utile pour savoir si on n'a pas oublié de flotte sur les planètes )";
		infos_scripts[8].options[1].html="</br><INPUT type=radio name='8-flotteenvol' id='8-flotteenvol-yes' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio name='8-flotteenvol' id='8-flotteenvol-no' style='margin-left:20px;' value='no'>	Désactivé  ";
		
		

		infos_scripts[2].options[4]={};
		infos_scripts[2].options[4].name="Missiles interplanétaires";
		infos_scripts[2].options[4].description="Vous permets de savoir à peu prêt combien faut il lancer de missiles interplanétaires ( Attention, ceci est juste une approximation et dépend de plein de choses! )";
		infos_scripts[2].options[4].html="</br><INPUT type=radio id='2-mips-yes' name='2-mips' value='yes' style='margin-left:20px;'> Activé <INPUT type=radio id='2-mips-no' name='2-mips' style='margin-left:20px;' value='no'>	Désactivé  ";
	
		infos_scripts[version] = versionscript;
		
		GM_setValue("infosScripts", JSON.stringify(infos_scripts));
		
		
		for(j=1;j<=max_uni;j++)
		{
			settings_scripts = eval(GM_getValue("settingsScripts"+j));
			settings_scripts[6] = {};
			settings_scripts[7] = {};
			settings_scripts[8] = {};
			
			settings_scripts[8]['envoirapide']='yes';
			settings_scripts[8]['flotteenvol']='yes';
			settings_scripts[8]['flotteaquaipts']=-1;
			settings_scripts[2]['mips']='yes';
			settings_scripts[3]['fleches']='yes';
			settings_scripts[5]['rapportsespio']="yes";
			settings_scripts[5]['rapportsespioinfos_scripts']=[];
			settings_scripts[5]['marqueurs']="yes";
			settings_scripts[5]['msgespio']="yes";
			settings_scripts[7]['equivalentdeut']='yes';
			settings_scripts[6]['equivalentdeut']='yes';
			settings_scripts[2]['msgenvoyes']='yes';
			settings_scripts[2]['msgenvoyestab']=[];
			settings_scripts[5]['rapportsespiotab'] = {};
			GM_setValue("settingsScripts"+j, JSON.stringify(settings_scripts));
		}
		alert('MAJ Effectuée');
	}
	
	date = new Date();
	if (date.getTime()-infos_scripts[lastCheckUpdate] >= 10000 )
					GM_xmlhttpRequest({ url: "http://94.23.53.107/spaceswars/version.php", method: "GET", onload: function (response) {
																																	if (infos_scripts[version]!=response.responseText)
																																	{
																																		infos_scripts[lastCheckUpdate]=date.getTime();
																																		infos_scripts[toUpdate]=true;
																																		GM_setValue("infosScripts", JSON.stringify(infos_scripts));
																																	}else{
																																		infos_scripts[lastCheckUpdate]=date.getTime();
																																		infos_scripts[toUpdate]=false;
																																		GM_setValue("infosScripts", JSON.stringify(infos_scripts));
																																	}
																																	}});
					
	function afficherConfig()
	{
		var selected=-1;
		var html="";
        html+='<center><div style="color:black; border:2px solid white; border-radius: 10px; font-family:Times; position:relative; top:40px; left:10px; width:91%; height:680px; text-align:left; background-color:white; opacity:0.7;" align="center"><div style="height:150px;padding:10px; background-color:#BBB;border:2px solid white;border-radius: 10px;"><img style="display:inline; float:left;background-color:#BBB; opacity:1;" src="http://img1.imagilive.com/0812/test.png"/><div style="border-radius: 4px;color:white;font-size:14px;height:20px;margin-left:300px;background-color:#999;"><b><center>D4rkv3nom Script\'s News</center></b></div><div style="border-radius: 4px;color:#444;font-size:14px;height:110px;margin-left:300px;background-color:#FFF;padding-top:10px" id="news_script">  </div></div><div style="height:500px; background-color:#BBB;border:2px solid white;border-radius: 10px;"><div style="float:left;color:white;height:500px;font-size:14px;width:190px;background-color:#999;border-radius: 10px;text-align:center;"><b>Scripts</b><ul style="padding:0;">';
		for (i=0; i<nb_scripts; i++){
			html+='<li title='+i+' id="displayconfig'+i+'" style="cursor : pointer;border:1px solid black;color:'+((infos_scripts[i].active==0)?"Red":"Green")+';list-style-type:none;font-size:14px;background-color:#FFF;border-radius: 10px;padding:0"><center>'+infos_scripts[i].name+'<img id="statescript'+i+'" title='+i+' style="float:left" src="http://94.23.53.107/spaceswars/'+((infos_scripts[i].active==0)?"Disable":"Enable")+'.png"/></center></li>';
		}
		html+='<li title=999 id="displayconfig999" style="cursor : pointer;border:1px solid black;color:Black;list-style-type:none;font-size:14px;background-color:#FFF;border-radius: 10px;padding:0;margin-top:10px;"><center>Contact</center></li><li  id="savconfig" style="color:Black;list-style-type:none;font-size:14px;padding:0;margin-top:10px;"><center><input id="sauvegarderconfig" name="sauvegarder" style="cursor:pointer;width:120px; height:30px" type=submit value="Sauvegarder"/></center></li><li  id="resetconfig" style="color:Black;list-style-type:none;font-size:14px;padding:0;margin-top:10px;"><center><input id="resetconfig" name="reset" style="cursor:pointer;width:120px; height:30px" type=submit value="Reset"/></center></li><li style="border:1px solid black;color:Black;list-style-type:none;font-size:14px;background-color:#FFF;border-radius: 10px;padding:0;margin-top:30px;"><center>Un bug à rapporter ? <br/> une amélioration à apporter ? <br/> N\'hésitez pas à contacter l\'auteur de ce script via l\'onglet Contact</center></li></ul></div>';
		for (i=0; i<nb_scripts; i++)
		{
											html += '<div id="configscript'+i+'" style="display:none;color:black;height:490px;font-size:14px;background-color:#EEE;margin:5px;margin-left:195px;border-radius: 10px;"><b><center>'+infos_scripts[i].description+'</center></b>';
											
											for (j=0; j<infos_scripts[i].options.length; j++)
											{
												html += '<div style="padding:10px; margin:1%; border:2px solid black;">';
												html += '<div id="Pillage0"><span style="color:red; cursor:pointer;">'+infos_scripts[i].options[j].name+'</span></div><div>'+infos_scripts[i].options[j].description;
												html += infos_scripts[i].options[j].html+'</div></div>';
											}
											html += '</div>';
		}
		html += '<div id="configscript999" style="display:none;color:black;height:490px;font-size:14px;background-color:#EEE;margin:5px;margin-left:195px;border-radius: 10px;"><b><center>Contacter le développeur</center></b>';
		html += '<div style="padding:10px; margin:1%; border:2px solid black;"><div id="Contact"><span style="color:red; cursor:pointer;">Contact Forum</span></div><div>Profil développeur : <a style="color:blue" href="http://spaceswars.fr/forum/memberlist.php?mode=viewprofile&u=3605">http://spaceswars.fr/forum/memberlist.php?mode=viewprofile&u=3605</a></br>Page forum du script: <a style="color:blue" href="http://spaceswars.fr/forum/viewtopic.php?f=167&t=8761">http://spaceswars.fr/forum/viewtopic.php?f=167&t=8761</a></div></div><div style="padding:10px; margin:1%; border:2px solid black;"><div id="Contact2"><span style="color:red; cursor:pointer;">Contact IG</span></div><div>Pseudo Univers 12 : <b>Barthos</b></div></div></div>';
		html += '</div>';
		html+='</div></div></center>';
		document.getElementsByTagName("body")[0].innerHTML=html;
		
		
		//Autoremplissage
		var inputs = document.getElementsByTagName("input");
		for (i=0; i<inputs.length; i++)
		{
			switch (inputs[i].type) {
				case "radio":
					if(settings_scripts[parseInt(inputs[i].id.split('-')[0])][inputs[i].id.split('-')[1]]==inputs[i].id.split('-')[2])
					{	
						inputs[i].checked=true;
					}
					break;
				case "text":
					inputs[i].value=settings_scripts[parseInt(inputs[i].id.split('-')[0])][inputs[i].id.split('-')[1]];
					break;
			}
		}
		
		//Sauvegarde
		document.getElementById('sauvegarderconfig').addEventListener("click", function(){
																						var inputs = document.getElementsByTagName("input");
																						for (i=0; i<inputs.length; i++)
																						{
																							switch (inputs[i].type) {
																								case "radio":
																									if(inputs[i].checked)
																									{	
																										settings_scripts[parseInt(inputs[i].id.split('-')[0])][inputs[i].id.split('-')[1]]=inputs[i].id.split('-')[2];
																									}
																									break;
																								case "text":
																									settings_scripts[parseInt(inputs[i].id.split('-')[0])][inputs[i].id.split('-')[1]]=inputs[i].value;
																									break;
																							}
																						}
																						GM_setValue("settingsScripts"+uni, JSON.stringify(settings_scripts));
																						alert("Sauvegarde effectuée");
																						}, false);
		//Sauvegarde
		document.getElementById('resetconfig').addEventListener("click", function(){
																						if(confirm("Ceci supprimera toutes les données de ce script, êtes vous sur de vouloir continuer ? ")){
																							set_infos_scripts();
																							alert("Reset effectué");
																						}
																						}, false);
																						
		GM_xmlhttpRequest({ url: "http://94.23.53.107/spaceswars/news.php", method: "GET", onerror: function(response){alert(response.status)}, onload: function (response) {document.getElementById("news_script").innerHTML=response.responseText;	}});
		for (i=0; i<nb_scripts; i++){
			document.getElementById('statescript'+i).addEventListener("click", function(){
																						infos_scripts[parseInt(this.title)].active=((infos_scripts[parseInt(this.title)].active==0)?1:0);
																						GM_setValue("infosScripts", JSON.stringify(infos_scripts));
																						this.src='http://94.23.53.107/spaceswars/'+((infos_scripts[parseInt(this.title)].active==0)?"Disable":"Enable")+'.png';
																						this.parentNode.style.color=(infos_scripts[parseInt(this.title)].active==0)?"Red":"Green";
																						}, false);
			document.getElementById('displayconfig'+i).addEventListener("click", function(){
																						if(selected!=-1){
																						document.getElementById('configscript'+selected).style.display="none";
																						}
																						document.getElementById('configscript'+parseInt(this.title)).style.display="";
																						selected=parseInt(this.title);
																						}, false);
		}
		document.getElementById('displayconfig999').addEventListener("click", function(){
																						if(selected!=-1){
																						document.getElementById('configscript'+selected).style.display="none";
																						}
																						document.getElementById('configscript'+parseInt(this.title)).style.display="";
																						selected=parseInt(this.title);
																						}, false);
		chargerjscolor();
	}
	var linkconfig = build_node("a", ["style"], ["position:absolute;top:0px;left:0px;float:left; margin-top:6px; margin-left:6px;color: #7BE654;"],"D4rkv3nom\'s Script"+((infos_scripts[toUpdate])?' (Nouvelle version disponible)<img style=\"vertical-align:top;\" src=\"http://cdn2.iconfinder.com/data/icons/fugue/icon/arrow_circle_double.png\"/>':''), "click", function(){afficherConfig()});
	default_main.parentNode.insertBefore(linkconfig, default_main.parentNode.firstChild);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////  Aligner les ressources  ///////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////// Fonctionnalité ajoutée sur SW le 02/07/2012 /////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


	
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////  0 - RC Convert   ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

	if (location == "rw" && infos_scripts[0].active)
	{
		var rapport = document.getElementById('rc_main').getElementsByClassName('rc_contain curvedtot');
		var nb_tours=((rapport.length==3)?1:2); //nb_tours = 2 lorsqu'il y a au moins deux tours
		
		var rapport_tour1 = rapport[0];
		if(nb_tours!=1){
			var rapport_tour2 = rapport[rapport.length-3];
		}

		var date_rc = document.getElementById('rc_main').getElementsByClassName('divtop curvedtot')[0].innerHTML;
		var participants = [];
		participants[0]=[]; // Pseudos et techs
		participants[1]=[]; // Flottes Avant
		participants[2]=[]; // Flottes Après
		//Noms des joueurs et technos
		for(var i=0; i<rapport_tour1.getElementsByClassName('divtop curvedtot').length; i++){
			participants[0][i] = rapport_tour1.getElementsByClassName('divtop curvedtot')[i].innerHTML.replace(/Attaquant ([a-zA-Z0-9_]*)/g,'Attaquant [b][size=128][color=#FF0040]$1[/color][/size][/b]').replace(/Défenseur ([a-zA-Z0-9_]*)/g,'Défenseur [b][size=128][color=#008040]$1[/color][/size][/b]').replace(/\(/g,'\n').replace(/\)/g,'\n').replace(/<font color=\"#7BE654\">/g,'[b]').replace(/<\/font>/g,'[/b]');
		}
		
		var flotte_joueur_tmp, nom_vaisseau, quantite_vaisseau;

		var flottes = rapport_tour1.getElementsByClassName('rc_space curvedtot');
		for(var i=0; i<flottes.length; i++){
			flotte_joueur_tmp = flottes[i].getElementsByClassName('rc_rows');
			participants[1][i]=[];
				for(var j=0; j<flotte_joueur_tmp.length; j++){
						nom_vaisseau = flotte_joueur_tmp[j].getElementsByClassName('rc_rows1')[0].innerHTML;
						quantite_vaisseau = flotte_joueur_tmp[j].getElementsByTagName('font')[0].innerHTML;
						participants[1][i][j]= [nom_vaisseau,quantite_vaisseau];
				}
		}
		
		if(nb_tours!=1){
			var flottes = rapport_tour2.getElementsByClassName('rc_space curvedtot');
			for(var i=0; i<flottes.length; i++){
				flotte_joueur_tmp = flottes[i].getElementsByClassName('rc_rows');
				participants[2][i]=[];
					for(var j=0; j<flotte_joueur_tmp.length; j++){
							nom_vaisseau = flotte_joueur_tmp[j].getElementsByClassName('rc_rows1')[0].innerHTML;
							quantite_vaisseau = flotte_joueur_tmp[j].getElementsByTagName('font')[0].innerHTML;
							participants[2][i][j]= [nom_vaisseau,quantite_vaisseau];
					}
			}
		}
		
		var resultat_combat = rapport[rapport.length-2].getElementsByClassName('divtop curvedtot')[0].innerHTML;
		if(rapport[rapport.length-2].getElementsByClassName('space0')[0]!=null){
			resultat_combat+="  "+rapport[rapport.length-2].getElementsByClassName('space0')[0].innerHTML.replace(/<font color=\"#7BE654\">/g,'[b][size=120][color=#C03000]').replace(/<\/font>/g,'[/b][/size][/color]')
		}
		var resultat_CDR = rapport[rapport.length-1].getElementsByClassName('space0')[2].innerHTML.replace(/<font color=\"#7BE654\">/g,'[b][size=120][color=#7BE654]').replace(/<\/font>/g,'[/b][/size][/color]');
		var renta_attaquant = rapport[rapport.length-1].getElementsByClassName('space0')[3].innerHTML.replace(/<font color=\"#7BE654\">/g,'[b][size=120][color=#7BE654]').replace(/<\/font>/g,'[/b][/size][/color]').replace(/<font color=\"#DB5656\">/g,'[b][size=120][color=#DB5656]').replace(/<\/font>/g,'[/b][/size][/color]').replace(/<br>/g,'\n');
		var renta_defenseur = rapport[rapport.length-1].getElementsByClassName('space0')[4].innerHTML.replace(/<font color=\"#7BE654\">/g,'[b][size=120][color=#7BE654]').replace(/<\/font>/g,'[/b][/size][/color]').replace(/<font color=\"#DB5656\">/g,'[b][size=120][color=#DB5656]').replace(/<\/font>/g,'[/b][/size][/color]').replace(/<br>/g,'\n');;
		
		var rapport_converti = "";
		rapport_converti+="[center][b][img]"+((settings_scripts[0]['imageheader']=='')?'http://img1.imagilive.com/0612/SpaceWarsHof_Headfd2.png':settings_scripts[0]['imageheader'])+"[/img]\n\n";
		rapport_converti+=date_rc+"[/b]\n";	
		rapport_converti+="_________________________________________________\n\n";
		for(var i=0; i<participants[0].length; i++){
			rapport_converti+=participants[0][i] ;
			if (participants[1][i].length==0){
				rapport_converti+="[color=#E65454]Détruit[/color]\n" ;
			}
			for(var j=0; j<participants[1][i].length; j++){
				rapport_converti+="[color="+couleurs_rc[participants[1][i][j][0]]+"]"+participants[1][i][j][0]+" "+participants[1][i][j][1]+"[/color]\n";
			}
			rapport_converti+="\n\n";
		}
		
		if (nb_tours!=1){
			var difference;
			rapport_converti+="[img]"+((settings_scripts[0]['imageboom']=='')?'http://img1.imagilive.com/0612/SpaceWarsHof_Boom.png':settings_scripts[0]['imageboom'])+"[/img]";
			rapport_converti+="\n\n";
			
			for(var i=0; i<participants[0].length; i++){
				rapport_converti+=participants[0][i] ;
				if (participants[2][i].length==0){
					rapport_converti+="[color=#E65454]Détruit[/color]\n" ;
				}
				for(var j=0; j<participants[2][i].length; j++){
					for(var k=0; k<participants[1][i].length; k++){
						if(participants[2][i][j][0]==participants[1][i][k][0]){
							difference=sw_to_number_rc(participants[1][i][k][1])-sw_to_number_rc(participants[2][i][j][1]);
							break;
						}
					}
					rapport_converti+="[color="+couleurs_rc[participants[2][i][j][0]]+"]"+participants[2][i][j][0]+" "+participants[2][i][j][1]+"[/color][color=#FF0040]         -"+get_slashed_nb(difference)+"[/color]\n";
				}
				rapport_converti+="\n\n\n";
			}
		}
		rapport_converti+="[img]"+((settings_scripts[0]['imageresultat']=='')?'http://img1.imagilive.com/0612/SpaceWarsHof_Resultat.png':settings_scripts[0]['imageresultat'])+"[/img]\n";
		rapport_converti+=resultat_combat+"\n\n";
		rapport_converti+=resultat_CDR+"\n\n";
		rapport_converti+="[img]"+((settings_scripts[0]['imagerenta']=='')?'http://img1.imagilive.com/0612/SpaceWarsHof_Renta.png':settings_scripts[0]['imagerenta'])+"[/img]\n";
		rapport_converti+=renta_attaquant+"\n\n";
		rapport_converti+=renta_defenseur+"\n\n";
		rapport_converti+="[url=http://www.spaceswars.fr/forum/viewtopic.php?f=167&t=8761]Rapport Converti par D4rkv3nom's Script[/url]";
		rapport_converti+="[/center]";
		document.getElementById('rc_main').getElementsByClassName('space1')[0].innerHTML+="<div>Rapport Converti par D4rkv3nom's Script</div><textarea id='rapport_conv' cols=70 rows=10>"+rapport_converti+"</textarea><div>Pour Copier le Rapport Converti, Cliquez à l'intérieur de la zone de texte ci dessus, et faites Ctrl+A pour tout sélectionner et Ctrl + C pour copier</div>";
	}
	
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////  1 - Ressources Dynamiques    /////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////	
	if ((location == "build_fleet" || location =="build_def") && infos_scripts[1].active)
	{
		
		var type;
		if (location =="build_fleet"){
			type ="flottes";
		}else{
			type ="defenses";
		}
		var couts = main.getElementsByClassName(type+"_2a1");
		
		for (var i=0; i<couts.length; i++){
			couts[i].innerHTML+=((couts[i].getElementsByTagName("font")[0]!=null) ? "<br/><p style='margin:0'>Total Métal <span style='color:#7BE654'>"+couts[i].getElementsByTagName('font')[0].innerHTML+"</span></p>" : "");
			couts[i].innerHTML+=((couts[i].getElementsByTagName("font")[1]!=null) ? "<p style='margin:0'>Total Cristal <span style='color:#7BE654'>"+couts[i].getElementsByTagName('font')[1].innerHTML+"</span></p>" : "");
			couts[i].innerHTML+=((couts[i].getElementsByTagName("font")[2]!=null) ? "<p style='margin:0'>Total Deutérium <span style='color:#7BE654'>"+couts[i].getElementsByTagName('font')[2].innerHTML+"</span></p>" : "");
			if(settings_scripts[1]['equivalentdeut']=='yes') couts[i].innerHTML+="Equivalent Deutérium <span style='color:#7BE654'>0</span><br/>";
		}
		var inputs_construction = main.getElementsByClassName("space0")[0].getElementsByTagName("input");
		
		for (var j=0; j<inputs_construction.length; j=j+2){
		inputs_construction[j].addEventListener('keyup', function() {				
														var couts = this.parentNode.parentNode.parentNode.getElementsByClassName(type+"_2a1");
														var cout_total_deut=0;
														for (var i=0; i<3; i++){
															if(couts[0].getElementsByTagName("font")[0]!=null){
																var cout = ((couts[0].getElementsByTagName("font")[i]!=null) ? couts[0].getElementsByTagName("font")[i].innerHTML.replace(/\./g,'') : 0);
																couts[0].getElementsByTagName("span")[i].innerHTML = get_slashed_nb(cout * this.value);
																if(settings_scripts[1]['equivalentdeut']=='yes'){
																	if(couts[0].getElementsByTagName("span")[i].parentNode.innerHTML.indexOf("Métal")!=-1){
																		cout_total_deut+=(cout * this.value)/4;
																	}else if(couts[0].getElementsByTagName("span")[i].parentNode.innerHTML.indexOf("Cristal")!=-1){
																		cout_total_deut+=(cout * this.value)/2;
																	}else if(couts[0].getElementsByTagName("span")[i].parentNode.innerHTML.indexOf("Deutérium")!=-1){
																		cout_total_deut+=cout * this.value;
																	}
																}
															}
														}
														couts[0].getElementsByTagName("span")[couts[0].getElementsByTagName("span").length-1].innerHTML=get_slashed_nb(cout_total_deut);
													}, false);
		inputs_construction[j].addEventListener('focus', function() {				
														var couts = this.parentNode.parentNode.parentNode.getElementsByClassName(type+"_2a1");
														var cout_total_deut=0;
														for (var i=0; i<3; i++){
															if(couts[0].getElementsByTagName("font")[0]!=null){
																var cout = ((couts[0].getElementsByTagName("font")[i]!=null) ? couts[0].getElementsByTagName("font")[i].innerHTML.replace(/\./g,'') : 0);
																couts[0].getElementsByTagName("span")[i].innerHTML = get_slashed_nb(cout * this.value);
																if(settings_scripts[1]['equivalentdeut']=='yes'){
																	if(couts[0].getElementsByTagName("span")[i].parentNode.innerHTML.indexOf("Métal")!=-1){
																		cout_total_deut+=(cout * this.value)/4;
																	}else if(couts[0].getElementsByTagName("span")[i].parentNode.innerHTML.indexOf("Cristal")!=-1){
																		cout_total_deut+=(cout * this.value)/2;
																	}else if(couts[0].getElementsByTagName("span")[i].parentNode.innerHTML.indexOf("Deutérium")!=-1){
																		cout_total_deut+=cout * this.value;
																	}
																}
															}
														}
														couts[0].getElementsByTagName("span")[couts[0].getElementsByTagName("span").length-1].innerHTML=get_slashed_nb(cout_total_deut);
													}, false);
		}
	

		
	}
	
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////  2 - Messagerie  ///////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////	
	if (location == "messages" && infos_scripts[2].active)
	{
		var paramsurl = extractUrlParams();
		var messages = document.getElementsByClassName("message_space0 curvedtot");
		for (i=0; i<messages.length; i++)
			{
				if (messages[i].innerHTML.indexOf("Rapport de combat") != -1 && paramsurl["messcat"]==3 && settings_scripts[2]['combat']=='yes')
				{
					messages[i].getElementsByClassName("message_2a3")[0].innerHTML=messages[i].getElementsByTagName("a")[1].innerHTML;
					messages[i].getElementsByClassName("message_2a3")[0].style.width="346px";
					messages[i].getElementsByClassName("message_2a3")[1].innerHTML="";
					messages[i].getElementsByClassName("message_2a3")[1].style.width="0";
					messages[i].getElementsByTagName("a")[1].innerHTML="Lien du Rapport de Combat";
				}
				if (messages[i].innerHTML.indexOf("Activité d'espionnage") != -1 && paramsurl["messcat"]==0 && settings_scripts[2]['espionnage']=='yes')
				{
					if(settings_scripts[2]['espionnage']=='yes'){
						messages[i].getElementsByClassName("message_2a3")[0].innerHTML="";
						messages[i].getElementsByClassName("message_2a3")[0].style.width="0";
						reg=new RegExp("<.[^>]*>", "gi" );
						messages[i].getElementsByClassName("message_2a3")[1].innerHTML=messages[i].getElementsByClassName("shideme")[0].innerHTML.replace(reg,'').replace("Une flotte ennemie en provenance de","Espionnage de").replace("a été aperçue à proximité de","sur").replace("Fermer ce message","");
						messages[i].getElementsByClassName("message_2a3")[1].style.width="346px";
						messages[i].getElementsByClassName("message_2a3")[1].style.textAlign="left";
					}
					
				}
				if( messages[i].innerHTML.indexOf("Rapport d'espionnage") != -1 && settings_scripts[2]['mips']=='yes')
				{
					var classRank=(messages[i].getElementsByClassName("message_space0")[2].getElementsByClassName("half_left").length-1),nbmiptotal=0, mipinter=0;
					for (j=(mips_defense.length-1); j>=0; j--){
						if (messages[i].innerHTML.indexOf(mips_defense[j][0]+" : ") != -1)
						{
							var regNb = /\s([0-9,.]{1,})/;
							var nbdef = get_nb_from_stringtab(regNb.exec(messages[i].getElementsByClassName("message_space0")[2].getElementsByClassName("half_left")[classRank].innerHTML)[1].split(","));
							if(mips_defense[j][0]=="Lanceur de missiles"){
								var nbmip = (nbdef-((nbmiptotal-mipinter)*4))/mips_defense[j][1]; //puisqu'a chaque mip 4lm sont touchés/missile peu importe sur quoi on tire
								if(nbmip<0){ nbmip=0 }
							}else{
								var nbmip = nbdef/mips_defense[j][1];
							}
							if(mips_defense[j][0]=="Missile d'Interception"){
								mipinter = nbdef/mips_defense[j][1];
							}
							nbmiptotal+=parseInt(nbmip);
							classRank--;
						}
						
					}
					messages[i].getElementsByClassName("message_space1 curvedtot shideme")[0].insertBefore(document.createTextNode("Nombres de mips nécéssaires : " + get_slashed_nb(nbmiptotal)),messages[i].getElementsByClassName("message_space1 curvedtot shideme")[0].getElementsByClassName("hideit message_space0 curvedtot")[0]);
				}
				if (paramsurl["messcat"]==2 && settings_scripts[2]['alliance']=='yes' )
				{
					document.getElementsByClassName("showall")[0].click();
					messages[i].getElementsByClassName("shideme")[0].innerHTML=messages[i].getElementsByClassName("shideme")[0].innerHTML.replace('<div class="hideit message_space0 curvedtot">Fermer ce message</div>','')
				}
			}
		
		if ((paramsurl["mode2"]=="write" || paramsurl["mode"]=="write") && settings_scripts[2]['msgenvoyes']=='yes' )
		{
			document.getElementsByTagName("form")[1].addEventListener("submit", function(){
																						var nomjoueur = this.getElementsByTagName("select")[0].options[this.getElementsByTagName("select")[0].selectedIndex].innerHTML;
																						var titremessage = this.getElementsByTagName("input")[2].value;
																						var contenu = this.getElementsByTagName("textarea")[0].value;
																						var lengthtab = settings_scripts[2]["msgenvoyestab"].length;
																						settings_scripts[2]["msgenvoyestab"][lengthtab]={};
																						settings_scripts[2]["msgenvoyestab"][lengthtab].destinataire=nomjoueur;
																						settings_scripts[2]["msgenvoyestab"][lengthtab].titremsg=titremessage;
																						settings_scripts[2]["msgenvoyestab"][lengthtab].contenumsg=contenu;
																						var datetmp = new Date();
																						settings_scripts[2]["msgenvoyestab"][lengthtab].datemessage=datetmp.getDay()+"/"+datetmp.getMonth()+"/"+(datetmp.getYear()-100)+" "+datetmp.getHours()+":"+datetmp.getMinutes()+":"+datetmp.getSeconds();
																						GM_setValue("settingsScripts"+uni, JSON.stringify(settings_scripts));
																					}, false);
		}
		if (settings_scripts[2]['msgenvoyes']=='yes')
		{
			var link = build_node("a", ["style"], ["color:#3CD0ED"], "Messages Envoyés [" + settings_scripts[2]["msgenvoyestab"].length+"]");
			div = build_node("div", ["class","style"], ["message_button1 curvedtot","margin-bottom:7px"], "");
			div.appendChild(link);
			div.addEventListener("click", function(){
													var messageriehtml ="";
													for(i=(settings_scripts[2]["msgenvoyestab"].length-1); i>=0; i--){
														messageriehtml += '<div class="message_space0 curvedtot"><div class="space0 donthide">	<div class="message_2a1"><input name="showmes" type="hidden" value="1"> <span id="img"> </span></div><div class="message_2a6"> </div><div class="message_2a2">'+settings_scripts[2]["msgenvoyestab"][i].datemessage+'</div><div class="message_2a3">'+settings_scripts[2]["msgenvoyestab"][i].destinataire+'</div><div class="message_2a3">'+settings_scripts[2]["msgenvoyestab"][i].titremsg+'<a href="messages.php?token=97fee15b552528b9ab5765d09777f503&amp;mode=write&amp;id=65&amp;subject=Re : Alliance"></a></div></div><div class="message_space1 curvedtot shideme">'+settings_scripts[2]["msgenvoyestab"][i].contenumsg+'<br><br><div class="hideit message_space0 curvedtot">Fermer ce message</div></div></div><div class="message_save curvedtot" id="">&nbsp;</div>';
													}
													document.getElementsByClassName("message_2a")[0].innerHTML=messageriehtml;
													document.getElementsByClassName("message_2")[0].getElementsByClassName("space0")[1].innerHTML="<input type=button id='buttonreset' value='Effacer les messages'>";
													document.getElementById("buttonreset").addEventListener("click", function(){
																																settings_scripts[2]["msgenvoyestab"]=[];
																																GM_setValue("settingsScripts"+uni, JSON.stringify(settings_scripts));
																																alert("Messages supprimés");
																																},false);
													},false);
													
			document.getElementsByClassName('message_1')[0].getElementsByClassName("space0")[0].insertBefore(div,document.getElementsByClassName('message_1')[0].getElementsByClassName('message_button1 curvedtot')[0]);
		}
	}

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////  3 - VUE GENERALE AMELIOREE   //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////	

	if(settings_scripts[3]['fleches']=="yes" && infos_scripts[3].active && location!="chat"){
			document.getElementById("previousplanet").value="<<<<";
			document.getElementById("nextplanet").value=">>>>";
	}
	if (location == "overview" && infos_scripts[3].active)
	{
		if(settings_scripts[3]['ressourcesvol']=="yes"){
			var i = 1, ressources, metal, cristal, deut, metal_total=0, cristal_total=0, deut_total=0, equivalent_deut_total=0,chaine_total="";
			while(document.getElementById("data_tooltip_"+i)!=null){
				ressources = document.getElementById("data_tooltip_"+i).getElementsByTagName("div");
				if(ressources[0].innerHTML.indexOf("Métal") != -1){
					metal = ressources[0].innerHTML.replace(/[^0-9]/g,'');
					cristal = ressources[1].innerHTML.replace(/[^0-9]/g,'');
					deut = ressources[2].innerHTML.replace(/[^0-9]/g,'');
					if ( chaine_total.indexOf(metal)==-1 || chaine_total.indexOf(cristal)==-1 || chaine_total.indexOf(deut)==-1){
						metal_total += parseInt(metal);
						cristal_total += parseInt(cristal);
						deut_total += parseInt(deut);
						chaine_total += metal+cristal+deut;
					}
				}
				i=i+1;
			}
			if (settings_scripts[3]['equivalentdeut']=='yes') equivalent_deut_total=parseInt(metal_total/4)+parseInt(cristal_total/2)+deut_total;
			var events = document.getElementsByClassName("divtop curvedtot")[1];
			div = build_node("div", ["class"], ["divtop curvedtot"], "Ressources en vol");
			main.insertBefore(div,events);
			div = build_node("div", ["class"], ["space0"], "<font color='#58ACFA'>Métal : "+get_slashed_nb(metal_total)+"</font></br><font color='#FFBF00'>Cristal : "+get_slashed_nb(cristal_total)+"</font></br><font color='#58FA82'>Deutérium : "+get_slashed_nb(deut_total)+"</font></br>"+((settings_scripts[3]['equivalentdeut']=='yes')?"<font color='#FFFFFF'>Equivalent deutérium : "+get_slashed_nb(equivalent_deut_total)+"</font></br>":"")); 
			main.insertBefore(div,events);
		}
		if(settings_scripts[3]['retourflotte']=="yes"){
			var retours = document.getElementsByClassName('curvedtot return');
			for(i=0;i<retours.length;i++){
				retours[i].style.opacity="0.6";
			}
		}
		
	}

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////  Capacité Flotte   /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// Fonctionnalité ajoutée sur SW le 02/07/2012 ///////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
	
	
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////  Empire Total   /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////	
////////////// Fonctionnalité ajoutée sur SW le 02/07/2012 /////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////  4 - COLOR CHAT   ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////		
	function setColor(){
		GM_setValue("jscolor",document.getElementById("jscolorid").value);
	}

	if(location=="chat" && infos_scripts[4].active){
	
		
		var color;
		
		if(GM_getValue("jscolor")==null){
			color = "FFFFFF";
		}else{
			color = GM_getValue("jscolor");
		}
		
		document.getElementsByClassName('toolbar')[0].innerHTML+=' Ecrire en <input class="color" id="jscolorid" value="'+color+'">';
		if (navigator.userAgent.indexOf("Firefox")!=-1){
			document.getElementsByClassName('toolbar')[0].innerHTML+=' <a href="#" id="savColor">Sauvegarder Couleur</a>';
		}
		document.getElementById("message").id ="message2";
		document.getElementById("message2").cols=90;
		document.getElementsByClassName('toolbar')[0].innerHTML+=' <textarea  id="message" style="display:none" name="message"></textarea>';
		
		//Correction ToolBar
		document.getElementsByClassName('toolbar')[0].innerHTML = document.getElementsByClassName('toolbar')[0].innerHTML.replace(/'message'/g,'\'message2\''); 
		
		//Correction Smileys
		var smileys = document.getElementById('smiley').getElementsByTagName('img');
		for(var i=0; i<smileys.length;i++){
			smileys[i].addEventListener('click', function(e) {
								document.getElementById("message2").value+=this.alt;
								document.getElementById("message").value="[color=#"+document.getElementById('jscolorid').value+"]"+document.getElementById("message2").value+"[/color]";
			}, false);
		}
		if (navigator.userAgent.indexOf("Firefox")!=-1){ //Sur Firefox, sur un Event Onchange, le GM_setValue ne marche pas, mystère
			var savColor = document.getElementById("savColor");
			savColor.addEventListener('click', setColor, false);
		}else{
			var jscolorid = document.getElementById("jscolorid");
			jscolorid.addEventListener('change', setColor, false);
		}	
		
		var textarea = document.getElementById("message2");
		textarea.addEventListener('keyup', function(e) {
								if(this.value.length>232) this.value=this.value.substring(0,232); //¨La limite de 255 - la place que les balises colors prennent
								if(this.value.charAt(0)!="/" && this.value!=""){
									if(settings_scripts[4]['stopcoord']=="yes"){
										reg=new RegExp("\[[0-9]+\:[0-9]+\:[0-9]+\]", "gi" );
										this.value= this.value.replace(reg,"[x:xxx:x]");
									}
									document.getElementById("message").value="[color=#"+document.getElementById('jscolorid').value+"]"+this.value+"[/color]";
								}else{
									document.getElementById("message").value=this.value;
								}
								if (e.keyCode == 13){
										this.value="";
										if (navigator.userAgent.indexOf("Firefox")!=-1){
											document.getElementById("send").click();
										}
								}
								}, false);
		var textarea = document.getElementById("send");
		textarea.addEventListener('click', function(e) {								
								document.getElementById("message2").value="";
								}, false);
		
	}
	
	chargerjscolor();
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////  5 -  GALAXIE   //////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////	
	if(location=="galaxy" && infos_scripts[5].active){
		if(settings_scripts[5]['marqueurs']=="yes" || settings_scripts[5]['rapportsespio']=="yes"){
			var SS = document.getElementById("galaxy_form").getElementsByTagName("input")[7].value;
			var G = document.getElementById("galaxy").value;
			var planete;
			var marqueur, player, color;
			var regPlayer = /([a-zA-Z0-9]+)/;
			
			////////////////////////////////////////
			// 1 ligne / 2 : classe "space curvedot"
			for (j="space";j.length<7;j+="1"){
				if(j=="space"){min=1;max=9}else{min=0;max=7}
				for (i=min; i<max; i++)
				{
					player = main.getElementsByClassName(j+" curvedtot")[i].getElementsByClassName("galaxy_float150")[1].getElementsByTagName("a")[0];
					if (player)
					{
						planete = main.getElementsByClassName(j+" curvedtot")[i].getElementsByClassName("galaxy_float25")[0].getElementsByTagName("a")[0].innerHTML;
						if(settings_scripts[5]['marqueurs']=="yes"){
							if(settings_scripts[5]["["+G+":"+SS+":"+planete+"]"]!=undefined && settings_scripts[5]["["+G+":"+SS+":"+planete+"]"]!="transparent"){
								color = settings_scripts[5]["couleur"+settings_scripts[5]["["+G+":"+SS+":"+planete+"]"]];
								color="#"+color;
								img = "http://94.23.53.107/spaceswars/"+settings_scripts[5]["["+G+":"+SS+":"+planete+"]"]+".png";
							}else{
								color = "";
								img = "http://94.23.53.107/spaceswars/defautmarqueur.png"
							}
							marqueur = document.createElement("div");
							marqueur.setAttribute("style", "width:22px; background-color:"+color+"; height:22px; float:left; cursor:pointer; margin-left:5px; border:0px solid #EEE;");
							marqueur.innerHTML="<img src=\'"+img+"'/>";
							player.style.color=color;
							marqueur.addEventListener('click', function() {		
																			var options = settings_scripts[5]["options"].split(',');
																			img = this.getElementsByTagName("img")[0];
																			planete = this.parentNode.parentNode.getElementsByClassName("galaxy_float25")[0].getElementsByTagName("a")[0].innerHTML;
																			for (i=0;i<=options.length;i++){
																				if(img.src=="http://94.23.53.107/spaceswars/"+options[i]+".png"){
																					img.src = "http://94.23.53.107/spaceswars/"+options[(i+1)%(options.length)]+".png";
																					color = settings_scripts[5]["couleur"+options[(i+1)%(options.length)]];
																					if (color!="none"){color="#"+color;}
																					this.style.backgroundColor=color;
																					if(options[(i+1)%(options.length)]=="defautmarqueur"){
																						color = "white";
																						this.style.backgroundColor="transparent";
																					}
																					this.parentNode.getElementsByTagName("a")[0].style.color = color;
																					settings_scripts[5]["["+G+":"+SS+":"+planete+"]"]=options[(i+1)%(options.length)];
																					break;
																				}
																			}
																			GM_setValue("settingsScripts"+uni, JSON.stringify(settings_scripts));
																				}, false);
							player.parentNode.insertBefore(marqueur,player);
						}
						if(settings_scripts[5]['rapportsespio']=="yes"){
							if(settings_scripts[5]['rapportsespiotab']["["+G+":"+SS+":"+planete+"]"]!=undefined){
								
								marqueur = document.createElement("div");
								marqueur.setAttribute("style", "color:white; float:left; cursor:pointer; margin-right:2px; margin-top:2px; height:11px; width:10px; ");
								marqueur.appendChild(build_node("img", ["src"], ["http://94.23.53.107/spaceswars/marqueurespio.png"],""));
								player.parentNode.parentNode.getElementsByClassName("galaxy_float80")[1].appendChild(marqueur);	
								player.parentNode.parentNode.getElementsByClassName("galaxy_float80")[1].style.width="92px";
								var coordelement = getPosition(marqueur);
								var toppopup = coordelement[1]-250;
								var leftpopup = coordelement[0]+20;
								if(toppopup<30){toppopup=30}
								if(leftpopup<30){leftpopup=30}
								var popup = build_node("div", ["class","style"], ["popupespio","overflow:visible; z-index:10; background-color:#111; width:300px;  position: absolute; top:"+toppopup+"px; left:"+leftpopup+"px; visibility: hidden"], settings_scripts[5]['rapportsespiotab']["["+G+":"+SS+":"+planete+"]"].replace("Fermer ce message",""));
								player.parentNode.parentNode.getElementsByClassName("galaxy_float80")[1].appendChild(popup);	
								if(popup.getElementsByClassName("divtop curvedtot")[1]!=undefined){popup.getElementsByClassName("divtop curvedtot")[1].style.width="290px"};
								if(popup.getElementsByClassName("divtop curvedtot")[2]!=undefined){popup.getElementsByClassName("divtop curvedtot")[2].style.width="290px"};
								if(popup.getElementsByClassName("divtop curvedtot")[3]!=undefined){popup.getElementsByClassName("divtop curvedtot")[3].style.width="290px"};
								if(popup.getElementsByClassName("divtop curvedtot")[4]!=undefined){popup.getElementsByClassName("divtop curvedtot")[4].style.width="290px"};
								marqueur.addEventListener('mouseover', function() {	
																				this.parentNode.getElementsByClassName("popupespio")[0].style.visibility = "visible";										
																			}, false);
								marqueur.addEventListener('mouseout', function() {	
																				this.parentNode.getElementsByClassName("popupespio")[0].style.visibility = "hidden";										
																			}, false);
							}
						}
					}
				}
			}
		}
	}

		
	if(location=="messages" && infos_scripts[5].active && ( settings_scripts[5]['msgespio']=="yes" || settings_scripts[5]['rapportsespio']=="yes")){
		
		var messages = document.getElementsByClassName("message_space0 curvedtot");
		for (i=0; i<messages.length; i++)
		{
			var reg=new RegExp("\\(.*\\)", "gi" );
			if(messages[i].getElementsByClassName("message_2a3")[0]!=undefined){
				var position = messages[i].getElementsByClassName("message_2a3")[0].innerHTML.replace("QG | ","").replace(reg,"").trim();
				if (messages[i].innerHTML.indexOf("Rapport d'espionnage") != -1){
					if(settings_scripts[5]['rapportsespio']=="yes"){
						settings_scripts[5]['rapportsespiotab']['['+position+']'] = messages[i].getElementsByClassName("message_space1 curvedtot shideme")[0].innerHTML;
						GM_setValue("settingsScripts"+uni, JSON.stringify(settings_scripts));
					}
					if(settings_scripts[5]['msgespio']=="yes"){
						var marqueur, player, color;
						
						if(settings_scripts[5]["["+position+"]"]!=undefined && settings_scripts[5]["["+position+"]"]!="transparent"){
							color = settings_scripts[5]["couleur"+settings_scripts[5]['['+position+']']];
							color="#"+color;
							img = "http://94.23.53.107/spaceswars/"+settings_scripts[5]['['+position+']']+".png";
						}else{
							color = "";
							img = "http://94.23.53.107/spaceswars/defautmarqueur.png"
						}
						marqueur = document.createElement("div");
						marqueur.setAttribute("style", "width:22px; background-color:"+color+"; height:22px; float:left; cursor:pointer; margin-left:5px; border:0px solid #EEE;");
						marqueur.innerHTML="<img src=\'"+img+"'/>";
						messages[i].getElementsByClassName("message_2a3")[0].style.color=color;
						messages[i].getElementsByClassName("message_2a3")[0].style.width="151px";
						messages[i].getElementsByClassName("message_2a3")[1].style.width="151px";
						marqueur.addEventListener('click', function() {		
																		var options = settings_scripts[5]["options"].split(',');
																		img = this.getElementsByTagName("img")[0];
																		position = this.parentNode.getElementsByClassName("message_2a3")[0].innerHTML.replace("QG | ","").replace(reg,"").trim();
																		for (i=0;i<=options.length;i++){
																			if(img.src=="http://94.23.53.107/spaceswars/"+options[i]+".png"){
																				img.src = "http://94.23.53.107/spaceswars/"+options[(i+1)%(options.length)]+".png";
																				color = settings_scripts[5]["couleur"+options[(i+1)%(options.length)]];
																				if (color!="none"){color="#"+color;}
																				this.style.backgroundColor=color;
																				if(options[(i+1)%(options.length)]=="defautmarqueur"){
																					color = "white";
																					this.style.backgroundColor="transparent";
																				}
																				this.parentNode.getElementsByClassName("message_2a3")[0].style.color = color;
																				settings_scripts[5]["["+position+"]"]=options[(i+1)%(options.length)];
																				break;
																			}
																		}
																		GM_setValue("settingsScripts"+uni, JSON.stringify(settings_scripts));
																			}, false);
						messages[i].getElementsByClassName("message_2a3")[0].parentNode.insertBefore(marqueur,messages[i].getElementsByClassName("message_2a3")[0]);
						
					}
				}
			}
		}
		
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////  6 - Batiments   /////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////	
	if(location=="buildings" && infos_scripts[6].active){
		var couts = main.getElementsByClassName("buildings_1b1");
		for (var i=2; i<couts.length; i=i+3){
			var couttot = 0;
			var metal = couts[i].getElementsByTagName("font")[0];
			var cristal = couts[i].getElementsByTagName("font")[1];
			var deuterium = couts[i].getElementsByTagName("font")[2];
			if (metal) { couttot+=parseInt(sw_to_number(metal.innerHTML)/4); }
			if (cristal) { couttot+=parseInt(sw_to_number(cristal.innerHTML)/2); }
			if (deuterium) { couttot+=sw_to_number(deuterium.innerHTML); }
			if(settings_scripts[6]['equivalentdeut']=='yes') couts[i].innerHTML+="<br/>Equivalent Deutérium : <span style='color:#7BE654'>"+get_slashed_nb(couttot)+"</span><br/>";
		}
		var inputs_construction = main.getElementsByClassName("space0")[0].getElementsByTagName("input");
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////  7 - Recherches   /////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////	
	if(location=="research" && infos_scripts[7].active){
		var couts = main.getElementsByClassName("research_1b1");
		for (var i=2; i<couts.length; i=i+3){
			var couttot = 0;
			var metal = couts[i].getElementsByTagName("font")[0];
			var cristal = couts[i].getElementsByTagName("font")[1];
			var deuterium = couts[i].getElementsByTagName("font")[2];
			if (metal) { couttot+=parseInt(sw_to_number(metal.innerHTML)/4); }
			if (cristal) { couttot+=parseInt(sw_to_number(cristal.innerHTML)/2); }
			if (deuterium) { couttot+=sw_to_number(deuterium.innerHTML); }
			if(settings_scripts[6]['equivalentdeut']=='yes') couts[i].innerHTML+="<br/>Equivalent Deutérium : <span style='color:#7BE654'>"+get_slashed_nb(couttot)+"</span><br/>";
		}
		var inputs_construction = main.getElementsByClassName("space0")[0].getElementsByTagName("input");
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////  8 - Flotte   /////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////	

	if(location=="floten3" && infos_scripts[8].active){
		if(settings_scripts[8]['envoirapide']="yes"){
			self.location.href = document.location.href.substring( 0 ,document.location.href.lastIndexOf( "/" ) ) + "/fleet.php";
		}
	}
	if(location=="overview" && infos_scripts[8].active){
			if(settings_scripts[8]['flotteenvol']=="yes"){
				var i=1, chaine_total="", metal,cristal, deut, prevflotte = {}, nbvaisseaux, tabflotteenvol;
				var tabflotteenvol={};
				while(document.getElementById("data_tooltip_"+i)!=null){
					var tooltip = document.getElementById("data_tooltip_"+i).getElementsByTagName("div");
					for(j=0;j<tooltip.length;j++){
						if(document.getElementById("data_tooltip_"+(i+1)))
						{	
							var tooltip_ress = document.getElementById("data_tooltip_"+(i+1)).getElementsByTagName("div");
							var withressources = (tooltip_ress[0].innerHTML.indexOf("Métal")!=-1)?true:false;
						}else{
							withressources = false;
						}
						
						if(withressources){
							metal = tooltip_ress[0].innerHTML.replace(/[^0-9]/g,'');
							cristal = tooltip_ress[1].innerHTML.replace(/[^0-9]/g,'');
							deut = tooltip_ress[2].innerHTML.replace(/[^0-9]/g,'');
							if ( chaine_total.indexOf(metal)==-1 || chaine_total.indexOf(cristal)==-1 || chaine_total.indexOf(deut)==-1){
								nomvaisseau =  tooltip[j].innerHTML.replace(/ : [^a-z]*/g,''); 
								nbvaisseaux =  sw_to_number(tooltip[j].innerHTML.replace(/[^0-9]* : /g,''));
								if(tabflotteenvol[nomvaisseau]==undefined){tabflotteenvol[nomvaisseau]=0}
								tabflotteenvol[nomvaisseau]+=nbvaisseaux;
							}
						}else{
							nomvaisseau =  tooltip[j].innerHTML.replace(/ : [^a-z]*/g,''); 
							nbvaisseaux =  sw_to_number(tooltip[j].innerHTML.replace(/[^0-9]* : /g,''));
							if(tabflotteenvol[nomvaisseau]==undefined){tabflotteenvol[nomvaisseau]=0}
							if(document.getElementById("tooltip_"+i).parentNode.innerHTML.indexOf("Stationner")==-1)
							{
								if(document.getElementById("tooltip_"+i).parentNode.innerHTML.indexOf("venant de la planète")!=-1 && document.getElementById("tooltip_"+i).parentNode.innerHTML.indexOf("Extractions")==-1){
									tabflotteenvol[nomvaisseau]+=nbvaisseaux;
								}
							}else{
								tabflotteenvol[nomvaisseau]+=nbvaisseaux;
							}
							
							
						}
					}
					withressources?(i=i+2):(i=i+1);
				}
				var ptsenvol=0;
				for(i=0;i<fleet_deut.length;i++){
					if (tabflotteenvol[fleet_deut[i][0]]!=undefined) { 
						ptsenvol += tabflotteenvol[fleet_deut[i][0]] * (fleet_deut[i][1]*4);
					}
				}
			div = build_node("div", ["id", "style"], ["reloadlotte", "overflow:hidden; background-color:black; opacity:0.8; border:2px solid white; font:normal 10px Tahoma; padding:5px 5px 5px 5px;"], "<a id='reloadflottelink' href='#'>Réactualiser le graph</a>");
			
			div.addEventListener("click", function(){
												GM_xmlhttpRequest({ url: "imperium.php", method: "GET", onload: function (response) {
																									var div = document.createElement('div');
																									div.innerHTML = response.responseText;
																									var tabflotte={};
																									
																									for (j="space";j.length<7;j+="1"){
																										if(j=="space"){min=10;max=20}else{min=15;max=24}
																										for (i=min; i<max; i++)
																										{
																											var nbflotte = div.getElementsByClassName(j+" curvedtot")[i].getElementsByClassName("empire_sub");
																											tabflotte[div.getElementsByClassName(j+" curvedtot")[i].getElementsByTagName("a")[0].innerHTML.trim()]=sw_to_number(nbflotte[nbflotte.length-1].innerHTML);
																										}
																										
																									}
																									var ptsaquai=0;
																									for(i=0;i<fleet_deut.length;i++){
																										if (tabflotte[fleet_deut[i][0]]!=undefined) { 
																											ptsaquai += tabflotte[fleet_deut[i][0]] * (fleet_deut[i][1]*4);
																										}
																									}
																									settings_scripts[8]['flotteaquaipts']=ptsaquai;
																									GM_setValue("settingsScripts"+uni, JSON.stringify(settings_scripts));
																									self.location.href="overview.php";
																								}});
												
																						
												}, false);
			
			document.getElementById("main").appendChild(div);
			if(settings_scripts[8]['flotteaquaipts']==-1)
			{
				settings_scripts[8]['flotteaquaipts']=0;
				GM_setValue("settingsScripts"+uni, JSON.stringify(settings_scripts));
				div.click();
			}
			//alert(settings_scripts[8]['flotteaquaipts']);
			var pourcentageaquai = (settings_scripts[8]['flotteaquaipts']/(ptsenvol+ settings_scripts[8]['flotteaquaipts']))*100;
			var pourcentageenvol = (ptsenvol/(ptsenvol+ settings_scripts[8]['flotteaquaipts']))*100;
			div = build_node("div", ["id", "style"], ["flotteenvol", "overflow:hidden; background-color:white; opacity:none border:2px solid white; font:normal 10px Tahoma; padding:5px 5px 5px 5px;"], "<img src='http://chart.apis.google.com/chart?chdl=Flotte en vol|Flotte à quai&cht=p3&chf=bg,s,efefef00&chf=bg,s,FFF&efefef00&chs=380x100&chld=M&&chtt=&chl=Flotte en vol|Flotte à quai&chco=00F00F,0000CC&chd=t:"+pourcentageenvol+","+pourcentageaquai+"'/>");
			document.getElementById("main").appendChild(div);
		}
	}
	return;