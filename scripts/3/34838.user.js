// ==UserScript==
// @name		Fiches Territoriales
// @namespace	http://userscripts.org/scripts/source/34838.user.js
// @include	http://intra.dre-haute-normandie.i2/article.php3?id_article=6072*
// @include	file://*FichesTerritoriales.html*
// @include	http://sylvain.comte.googlepages.com/FichesTerritoriales.html*
// @version	0.2.b
// @author		Sylvain Comte	sylvain.comte@developpement-durable.gouv.fr
// @description	aggrège des informations multiples pour constituer une fiche de synthèse territoriale (à la commune pour l'instant)
//			pour l'instant à un niveau de développement très basique. Ne fonctionne que sur l'intranet du ministère de l'écologie à la page spécifiée
// ==/UserScript==
/* PARAMETRES PERSONALISABLES */
// Bases de données par défaut - adresses intranet des fichiers js (communes, comcom et scot/pays)
var aideTexte;
if(getUrlDomain()=="intra.dre-haute-normandie.i2") {
	var bcDefautUrl='http://intra.dre-haute-normandie.i2/IMG/txt/Com-NomCanEpciScot-js_cle61e71c.txt';
	var bcaDefautUrl='http://intra.dre-haute-normandie.i2/IMG/txt/Cant-NomCheflieu-js_cle0e7da3.txt';
	var bccDefautUrl='http://intra.dre-haute-normandie.i2/IMG/txt/Epci-NomCom-js_cle51dc9a.txt';
	var bscotDefautUrl='http://intra.dre-haute-normandie.i2/IMG/txt/Scot-NomCom-js_cle518f77.txt';
	aideTexte="<a href='article.php3?id_article=6530'>aide</a> | <a href='article.php3?id_article=6531'>à propos</a> | <a href='article.php3?id_article=6532'>bugs</a>";
	}
// Miroir internet
else {
/* petit problème d'encodage des caractères sur internet :
- sur sites.google.com ou mediafire.com, les caractères m'arrivent avec des encodages "anglais" > accents pourris
- on peut convertir é en e&cute; etc... mais du coup, page.title est pourri...
*/
//	document.getElementsByTagName("meta")[9].setAttribute("content","text/html; charset=ANSI");
	var bcDefautUrl='http://sites.google.com/site/cdtohn/fiches-territoriales/Com-NomCanEpciScot-js.txt?attredirects=0';
	var bcaDefautUrl='http://sites.google.com/site/cdtohn/fiches-territoriales/Cant-NomCheflieu-js.txt?attredirects=0';
	var bccDefautUrl='http://sites.google.com/site/cdtohn/fiches-territoriales/Epci-NomCom-js.txt?attredirects=0';
	var bscotDefautUrl='http://sites.google.com/site/cdtohn/fiches-territoriales/Scot-NomCom-js.txt?attredirects=0';
	aideTexte="<a href='http://sites.google.com/site/cdtohn/fiches-territoriales'>aide</a> | <a href='http://sites.google.com/site/cdtohn/fiches-territoriales'>à propos</a> | <a href='http://sites.google.com/site/cdtohn/fiches-territoriales'>bugs</a>";
	}
// url de base de la page (sans le code commune)
var baseurl="http://intra.dre-haute-normandie.i2/article.php3?id_article=6072";
// couleurs
var coul0="black";
var coul1="white";
var coul2="#fa7f41";	// orange "giseh"
var coul3="#e0f3fb";	// bleu ciel "giseh"
var coul4="#005fb8";	// bleu franc "giseh"
var coul5="";var coul6="";	// réserve de couleurs

/* Vérification de la version du script (fonction en fin de script)  */
var thisId=34838;			// your script userscript id
var thisVersion="0.2.b";	// the @version metadata value
/* This script version control  */
GM_scriptVersionControl(thisId,thisVersion);
// cache le message d'alerte de la version 0.2 ou antérieur
document.getElementById("alert02").setAttribute("style","display:none");


// thèmes
/* nb : la liste des thèmes ne sera pas forcémment la même en fonction des niveaux géographiques.
le contenu non-plus */
var Themes=new Array();Themes[0]=new Array();Themes[1]=new Array();Themes[2]=new Array();
// thèmes de la fiche "commune"
Themes[0][0]="Généralités";Themes[0][1]="Démographie";Themes[0][2]="Aménagement";Themes[0][3]="Risques";
// thèmes de la fiche "comcom"
Themes[1][0]="Généralités";Themes[1][1]="G2";
// thèmes de la fiche "SCoT/Pays"
Themes[2][0]="Généralités";Themes[2][1]="G4";Themes[2][2]="G5";Themes[2][3]="G6";

// Mise en place des modules
var Modules=new Array();Modules[0]=new Array();Modules[1]=new Array();Modules[2]=new Array();
// appel des modules pour tous les niveaux géographiques
function callModules() {
	idDep=left(idCom,2);
	if(ComBase[idCom][4]=="") {idSCoT=ComBase[idCom][5];scotAdm=0;}
	else {idSCoT=ComBase[idCom][4];scotAdm=1;}
	nomSCoT=SCoTBase[idSCoT][0];
	if(ComBase[idCom][2]=="") {idCC=ComBase[idCom][3];ccAdm=0;}
	else {idCC=ComBase[idCom][2];ccAdm=1;}
	nomCC=CCBase[idCC][0];
	idCant=ComBase[idCom][1];
	nomCant=CantBase[idCant][0];
	nomCom=ComBase[idCom][0];
	for(var i=0;i<Themes.length-1;i++) {
	// remettre en place une fonction hasChanged pour éviter de recharger les niveaux supérieurs quand c'est inutile?		
		callModGeo(i);
		document.getElementById("titre-0").innerHTML=nomCom+" ("+idCom+")";
		document.getElementById("titre-1").innerHTML=nomCC+" ("+idCC+")";
		document.getElementById("titre-2").innerHTML=nomSCoT+" ("+idSCoT+")";
		}
	setTimeout(debug,5000);
	}

function callModGeo(niv) {
	var Contenus=new Array();
	for(var k=0;k<Themes[niv].length;k++) {
		Contenus[k]="";
		}
	if(Modules[niv].length>0) {
		for(var j=0;j<Modules[niv].length;j++) {
			var leTheme=Modules[niv][j][0];
			var laFonction=Modules[niv][j][1];
			var lesParam=Modules[niv][j][2];
			var leContenu=eval(laFonction+"("+lesParam+")");
			if(!leContenu) leContenu="chargement en cours";
			Contenus[leTheme]+="<span id='cont-"+niv+"-"+j+"'>"+leContenu+"</span>";
			}
		for(var k=0;k<Themes[niv].length;k++) {
			document.getElementById("fo"+niv+""+k).innerHTML="<h3>"+Themes[niv][k]+"</h3>"+Contenus[k];
			}
		}
	}

/********** VARIABLES GLOBALES **********/
//departements
var idDep;						// département courant
var TabDep=new Array(); 		// indicateurs de chargement des départements
var ListeDep=new Array();		// liste des départements chargés
// grands territoires (SCoT)
// SCoT courant
var idSCoT;			// identifiant SCoT courant
var nomSCoT;		// nom SCoT courant
var LimitSCoT;		// SCoTs limitrophes
var scotAdm;		// appartenance administrative de la commune au SCoT
// EPCI (ComCom et CA)
// EPCI courant
var idCC;			// identifiant SCoT courant
var nomCC;			// nom SCoT courant
var LimitCC;		// ComCom limitrophes
var ccAdm;			// appartenance administrative de la commune à la CC
// Cantons (pas d'onglet)
// Canton courant;
var idCant;
var nomCant;
var LimitCant;
// Communes
var comIsIn;
// Commune courante
var idCom; 
var nomCom;
var Limitrophes;
// Liste des communes
var ComBase=new Array();		// tableau des communes : ComBase[insee]=(nom,canton,epci,epci virtuel,scot,scot virtuel) + ComBase[nom]=insee
var CantBase=new Array();		// tableau des cantons : CantBase[insee]=(nom,id capitale) + CantBase[nom]=insee
var CCBase=new Array();			// tableau des EPCI...
var SCoTBase=new Array();		// tableau des SCoT...
var TabCom=new Array(); 		// tableau des communes : TabCom[insee]=nom ET Tabcom[nom]=insee
var ListeCom=new Array(); 		// tableau des communes pour autocomplétion
var listeCom="";				// liste des communes affichée
// Temoins et indicateurs
var hasChanged=new Array(0,0,0);

/************* TEMPORAIRES  *************************/
// debugage
var textDeb="";

/************************************************************************************************************************/	
/***************************************************** MODULES *********************************************************/
/************************************************************************************************************************/
Modules[0][0]=new Array(0,"carteGoogle","nomCom,idDep");
Modules[0][1]=new Array(0,"localisation","idCom");
//Modules[0][1]=new Array(1,"infosPLU","idCom,nomCom");
Modules[0][2]=new Array(1,"demoCom","");
Modules[0][3]=new Array(0,"liensCom","idCom,nomCom");
//Modules[0][4]=new Array(0,"liensDoc","");

Modules[1][0]=new Array(0,"liensCC","idCC,nomCC");
/***********************************************************/
// Mise en place des affichages pour CC et SCoT, établissement des liens avec eux
function localisation(id) {
	if(ComBase[id]) {
		var texte="";
//textDeb+="ccAdm : "+ccAdm;
		texte+="canton : "+nomCant+"<br/>";
		if(ccAdm==1) texte+="EPCI : "+nomCC+"<br/>";
		else texte+="EPCI : peut-être associée au territoire de la "+nomCC+"<br/>";
		if(scotAdm==1) texte+="SCoT / Pays : "+nomSCoT+"<br/>";
		else texte+="SCoT / Pays : peut-être associée au territoire du "+nomSCoT+"<br/>";
		return texte;
		}
	else return("désolé, cette commune est hors du périmètre par défaut");
	}
/***********************************************************/
/***********************************************************/
// insertion de lien vers des sites externes de type encyclopédiques
function liensCom(id,nom) {						
	var texte="<h4>quelques liens intéressants</h4>";
	// lien vers wikipedia [fr]
	if(idDep=="27") texte+="<a href='http://www.eure.pref.gouv.fr/categorie/departement/intercommunalite/commune/communerenseignement.php?commune="+id+"'>"+nom+" sur le site de la préfecture de l'Eure</a><br/>";
	texte+="<a href='http://fr.wikipedia.org/wiki/"+nom+"'>"+nom+" sur wikipedia [fr]</a><br/>";
	// lien vers http://www.lescommunes.com/commune-thiouville-76692.html
//	texte+="<a href='http://www.lescommunes.com/commune-"+nom+"-"+id+".html'>"+nom+" sur lescommunes.com</a><br/>";
	// lien vers l'état des PLU
	if(idDep=="76") texte+="<a href='http://172.29.48.3/plu/consultation/Info_commune.asp?Commune="+id+"|"+nom+"'>documents d'urbanisme pour "+nom+"</a><br/>";
// documents à télécharger sur le site de l'Insee
	texte+="télécharger des fiches de synthèse sur le site de l'Insee :<br/>";
	texte+="- <a href='http://www.statistiques-locales.insee.fr/FICHES%5CRS%5CDEP%5C"+idDep+"%5CCOM%5CRS_COM"+id+".pdf'>résumé statistique pour "+nom+"</a> [pdf]<br/>";
	texte+="- <a href='http://www.statistiques-locales.insee.fr/FICHES%5CDL%5CDEP%5C"+idDep+"%5CCOM%5CDL_COM"+id+".pdf'>dossier thématique pour "+nom+"</a> [pdf]<br/>";
// insertion dans une zone non-imprimable	
	texte="<span class='enligne'>"+texte+"</span>";
	return texte;
	}
/*
function liensDoc() {
	if(idDep=="76") {
		setTimeout(
		function() {alert("go");GM_xmlhttpRequest({
		    method:'GET',
			url:'http://172.29.48.3/intra_dde76/newdocsat/BaspageRequete.asp',
//			data:encodeURI('communes='+idCom),
			headers: {
				'User-agent':'Mozilla/4.0 (compatible) Greasemonkey/0.3',
//				'Content-type':'application/x-www-form-urlencoded',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				 },
		    onload: function(responseDetails) {
				alert(responseDetails.responseText);
//				var parser=new DOMParser();
//				var dom=parser.parseFromString(responseDetails.responseText,"application/xml");
				var texte="<h4>Documentation intéressante</h4>";
//				texte+=dom.getElementsByTagName("table").length;//[0].textContent;
				texte+="<hr/>"+responseDetails.responseText;
				return texte;
				},
			})},0);
		}
	}
*/

function liensCC(id,nom) {						
	var texte="<h4>quelques liens intéressants</h4>";
	// lien vers le site de la préfecture de l'Eure
	if(idDep=="27") texte+="<a href='http://www.eure.pref.gouv.fr/categorie/departement/intercommunalite/epci/epcirenseignement.php?codesiren="+id+"'>"+nom+" sur le site de la préfecture de l'Eure</a><br/>";
	texte="<span class='enligne'>"+texte+"</span>";
	return texte;
	}
/***********************************************************/
function infosPLU(id,nom) {
	//return("<p id='infosPlu'>récupération des infos sur les PLU et CC</p>");
	GM_xmlhttpRequest({
	    method: 'GET',
		//url: "http://172.29.48.3/Intra_DDE76/Amenagt_Urba/sat_urba/sat_urba.asp",
	    url:'http://172.29.48.3/plu/consultation/Info_commune.asp?Commune='+id+'|'+nom,
		headers: {
			 'User-agent':'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			 'Accept': 'text/html,application/xml,text/xml',
			 },
	    onload: function(responseDetails) {
			var texte="";
			var parser=new DOMParser();
			var dom=parser.parseFromString(responseDetails.responseText,"application/xml");
			texte+=dom.getElementsByTagName("table").length;//[0].textContent;
/**/			texte+="<hr/>"+responseDetails.responseText;
			return texte
			},
		onerror: function(responseDetails) {
			// message d'erreur
			var texte="désolé, récupération des données impossible";
			// informations (?)
			return texte
			}
		});


/*	texte="procédures en cours<br/>";
	texte+="<iframe src='http://172.29.48.3/plu/Tab_Bords/tb02.asp?E=checked&R=checked&M=checked&A=checked&S=checked&C=&UneFois=&offset=1&Commune="+id+"|"+nom+"'></iframe><br/>";
	texte+="<iframe src='http://172.29.48.3/plu/Tab_Bords/tb02CC.asp?E=&R=&M=&A=&S=&C=checked&UneFois=&offset=1&Commune="+id+"|"+nom+"'></iframe><br/>";
	texte+="historique PLU<br/>";
	texte+="<iframe src='http://172.29.48.3/plu/consultation/Info_commune.asp?Commune="+id+"|"+nom+"'></iframe>";
	/*E=&R=&M=&A=&S=&C=checked&UneFois=&offset=1&*/
	//return (texte);	
	}
/***********************************************************/	
// insertion d'une petite carte google et de liens vers d'autres cartes
function carteGoogle(nom,dep) {
	var texte='<span id="carte" style="float:right;width:250px;">';
	// insertion de la carte dans un iframe. Passage par map-generator (google maps filtré par le proxy)
	texte+='<iframe id="embedCarte" style="width:100%;height:250px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://www.map-generator.net/extmap.php?name='+nom+'&amp;address='+nom+'%2C'+dep+'%2CFrance&amp;width=250&amp;height=250&amp;maptype=map&amp;zoom=9&amp;hl=en&amp;t=1222691083"></iframe>';
	// lien vers la carte grand format (prévoir des liens vers plusieurs cartes : google, msn, yahoo, géoportail...
	texte+='<span class="enligne"><small>afficher une carte sur <a href="http://maps.google.com/maps?num=30&amp;hl=en&amp;safe=off&amp;q='+nom+','+dep+',France&amp;lr=lang_fr&amp;ie=UTF8&amp;spn=0.0515,0.125828&amp;z=11&amp;iwloc=addr&amp;source=embed">Google</a></small></span></span>';
	return texte;
	}
/***********************************************************/
var PopInsee=new Array();	
function demoCom() {
	if(PopInsee.length>0) {
		var texte="";var lg1="";var lg2="";var lg3a="";var lg3b="";var maxValue=0;var minValue=100000000;
		var lgi=1;
		for(v in PopInsee[idCom]) {
			if(PopInsee[idCom][v]>maxValue) maxValue=PopInsee[idCom][v];
			if(PopInsee[idCom][v]<minValue) minValue=PopInsee[idCom][v];
			lg1+=PopInsee[idCom][v]+",";lg2+="|"+PopInsee[0][v];
			if(lgi>0) {lg3a+="|"+PopInsee[idCom][v];lg3b+="|"}
			else {lg3b+="|"+PopInsee[idCom][v];lg3a+="|"}
			lgi=-1*lgi;
			}
		if(eval(minValue*0.6)<100) minValue=0;
		else minValue=Math.round(eval(minValue*0.6)/100-1)*100;
		maxValue=Math.round(1+eval(maxValue*1.05)/100)*100;
		if(minValue==maxValue) maxValue+=100;
		var interval=Math.round((maxValue-minValue)/40)*10;
		var lg4=minValue+"|"+(minValue+interval)+"|"+(minValue+2*interval)+"|"+(minValue+3*interval)+"|"+maxValue;
		lg1=left(lg1,lg1.length-1);lg2=lg2+"|";
		var imgUrl="http://chart.apis.google.com/chart?cht=bvs&chs=250x200&chd=t:"+lg1+"&chds="+minValue+","+maxValue+"&chxt=x,y,t,t&chxl=0:"+lg2+"|1:|"+lg4+"|2:"+lg3a+"|3:"+lg3b+"&chco="+right(coul4,6)+"&chg=0,25,4,3";
		texte="<h4>Evolution démographique depuis 1962</h4><img src='"+imgUrl+"'/><br/>source : Insee ©1999"+texte;
		return texte;
		debug();
		}
	else {
	setTimeout(
		function() {
		GM_xmlhttpRequest({
		    method:'GET',
		    url:'http://intra.dre-haute-normandie.i2/IMG/txt/recensements-62-99-Insee-1999-js_cle719ded.txt',
			headers: {
				'User-agent':'Mozilla/4.0 (compatible) Greasemonkey/0.3',
				'Accept': 'text/html,application/xml,text/xml',
				},
			onload:function(responseDetails) {
				eval(responseDetails.responseText);
		var texte="";var lg1="";var lg2="";var lg3a="";var lg3b="";var maxValue=0;var minValue=100000000;
		var lgi=1;
		for(v in PopInsee[idCom]) {
			if(PopInsee[idCom][v]>maxValue) maxValue=PopInsee[idCom][v];
			if(PopInsee[idCom][v]<minValue) minValue=PopInsee[idCom][v];
			lg1+=PopInsee[idCom][v]+",";lg2+="|"+PopInsee[0][v];
			if(lgi>0) {lg3a+="|"+PopInsee[idCom][v];lg3b+="|"}
			else {lg3b+="|"+PopInsee[idCom][v];lg3a+="|"}
			lgi=-1*lgi;
			}
		if(eval(minValue*0.6)<100) minValue=0;
		else minValue=Math.round(eval(minValue*0.6)/100-1)*100;
		maxValue=Math.round(1+eval(maxValue*1.05)/100)*100;
		if(minValue==maxValue) maxValue+=100;
		var interval=Math.round((maxValue-minValue)/40)*10;
		var lg4=minValue+"|"+(minValue+interval)+"|"+(minValue+2*interval)+"|"+(minValue+3*interval)+"|"+maxValue;
		lg1=left(lg1,lg1.length-1);lg2=lg2+"|";
		var imgUrl="http://chart.apis.google.com/chart?cht=bvs&chs=250x200&chd=t:"+lg1+"&chds="+minValue+","+maxValue+"&chxt=x,y,t,t&chxl=0:"+lg2+"|1:|"+lg4+"|2:"+lg3a+"|3:"+lg3b+"&chco="+right(coul4,6)+"&chg=0,25,4,3";
		texte="<h4>Evolution démographique depuis 1962</h4><img src='"+imgUrl+"'/><br/>source : Insee ©1999"+texte;
				document.getElementById("cont-0-2").innerHTML=texte;
				},
			})},0);}
	}
				/*
		        Communes=xmlDoc.getElementsByTagName(tagGeoCom);
				for (var i=0;i<Communes.length;i++) {
					TabCom[dep][i]=[Communes[i].getElementsByTagName(tagGeoCodeCom)[0].textContent,Communes[i].getElementsByTagName(tagGeoNom)[0
				*/
/************************************************************************************************************************/
/**********************************************LANCEMENT DU SCRIPT ***************************************************/
/************************************************************************************************************************/
/* INTERFACE UTILISATEUR */
// affichage de la zone masquée pour ceux qui n'ont pas le script
document.getElementById("lesFiches").setAttribute("style","display:block");
/* création de la zone de contrôle */
/* nb pour l'instant une partie du code est intégrée dans la page Gizeh en raison d'un bug de Firefox sur la fonction autosuggest */
// styles
GM_addStyle(".infos{text-align:right}");
GM_addStyle("h1,h2,h3,h4,h5{font-family:sans-serif}");
GM_addStyle("#lesFiches {font-size:100%;font-family:sans-serif} #lesFiches h2 {margin:3px 0;font-size:120%;padding:0 0 2px 0} #lesFiches h3{margin:1px} #lesFiches h4{margin:0px}");
GM_addStyle(".onglets{margin:0;padding:0;} .onglets ul{list-style:none;margin:0;padding:0;} .onglets li{display:inline;margin:0 1px 0 1px;padding:2px;background:"+coul1+";border:solid 2px "+coul2+"} .onglets li.selection {background:"+coul2+";color:"+coul1+"} .onglets li:hover{background:"+coul3+";color:"+coul0+"} .onglets li.selection:hover{background:"+coul2+";color:"+coul3+"} .onglets hr{width:100%;background-color:"+coul2+";border:0;height:5px;margin:1px 0 0 0;padding:0;} .enligne{display:block;padding:5px;background-color:"+coul3+"} #listeDep{float:right} #listeDep ul{display:inline;list-style:none;} #listeDep li{background:"+coul2+";margin:2px;padding:2px;}");
GM_addStyle(".fiches div.cachee {display:none;} .fiches div.selection {display:block} .fiches span{display:block}");
GM_addStyle(".listedoc {display:none !important}");
// remplacement du texte de présentation par une "aide"
with(document.getElementById("information")) {
	innerHTML=aideTexte;
	setAttribute('class','infos');
	}
// ajout de la fonction de selection aux onglets géographiques, selection de l'onglet communes
for(var i=0;i<3;i++) {
	var onglet=document.getElementById("og"+i);
	onglet.addEventListener("click",selectTab,false);
	if(i==0) onglet.setAttribute("class","selection");
	else onglet.setAttribute("class","");
	// création des onglets thématiques pour les trois niveaux géographiques
	createOnglets(i);
	}
	
// fonction de creation des onglets thématiques
function createOnglets(divNum) {
	var h2=document.createElement("h2");
		h2.setAttribute("id","titre-"+divNum);
	var ul=document.createElement("ul");
	var hr=document.createElement("hr");
	var divOng=document.createElement("div");
		divOng.setAttribute("class","onglets");
	var allFi=document.createElement("div");
		allFi.setAttribute("id","fiches");
		allFi.setAttribute("class","fiches");
	for(var i=0;i<Themes[divNum].length;i++) {
		var nom=document.createTextNode(Themes[divNum][i]);
		var li=document.createElement("li");
			li.setAttribute("id","o"+divNum+""+i);
			if(i==0) li.setAttribute("class","selection");
			li.addEventListener("click",selectTab,false);
			li.innerHTML=Themes[divNum][i];
			ul.appendChild(li);
		var h3=document.createElement("h3");
			h3.innerHTML=Themes[divNum][i];
		var fiCont=document.createElement("span");
			fiCont.setAttribute("id","fo"+divNum+""+i+"C");
		var fi=document.createElement("div");
			fi.setAttribute("id","fo"+divNum+""+i);
			if(i==0) fi.setAttribute("class","selection");
			else fi.setAttribute("class","cachee");
			fi.appendChild(h3);
			fi.appendChild(fiCont);		
		allFi.appendChild(fi);
		}
	divOng.appendChild(ul);divOng.appendChild(hr);
	var contenu=document.getElementById("fog"+divNum+"C");
		contenu.appendChild(h2);
		contenu.appendChild(divOng);
		contenu.appendChild(allFi);
	}	
	
// fonction de selection des onglets
function selectTab() {
	var ongId=this.getAttribute("id");
	var Onglets=this.parentNode.getElementsByTagName('li');
	for(var o=0;o<Onglets.length;o++) {
		if(Onglets[o].parentNode==this.parentNode) {
			var laFiche=document.getElementById("f"+Onglets[o].getAttribute("id"));
			if(Onglets[o]==this) {
				Onglets[o].setAttribute('class','selection');
				laFiche.setAttribute('class','selection');
				}
			else {
				Onglets[o].setAttribute('class','cachee');
				laFiche.setAttribute('class','cachee');
				}
			}
		}
	}

function selectTabById(id) {
	var onglet=document.getElementById(id);
	var Onglets=onglet.parentNode.getElementsByTagName('li');
	for(var o=0;o<Onglets.length;o++) {
		if(Onglets[o].parentNode==this.parentNode) {
			var laFiche=document.getElementById("f"+Onglets[o].getAttribute("id"));
			if(Onglets[o]==this) {
				Onglets[o].setAttribute('class','selection');
				laFiche.setAttribute('class','selection');
				}
			else {
				Onglets[o].setAttribute('class','cachee');
				laFiche.setAttribute('class','cachee');
				}
			}
		}
	}
/* LANCEMENT */
/* chargement du département par défaut */
/* RECUPERATION DE PARAMETRES  */
// code insee
var insee=getUrlParameter("insee");
if(insee!=null) {
	idCom=insee;
	idDep=left(idCom,2);
	}
chargeFirst();
setTimeout(debug,5000);

/************************************************************************************************************************/
/**********************************************FONCTIONS PRINCIPALES ***************************************************/
/************************************************************************************************************************/
/* Chargement initial */
function chargeFirst() {
	if(idCom!=null && idDep!="76" && idDep!="27") {
		chargeComXml(idDep);
		}
	else chargeDefaut();
	}
		
/* Chargement par défaut */
function chargeDefaut() {
// note : supprimé les indicateurs permettant de vérifier les départements chargés. A remettre? réflexion nécessaire		
	loadJsDb(ComBase,bcDefautUrl,'choixCom','ComBase');			// chargement des communes par défaut
	loadJsDb(CantBase,bcaDefautUrl);
	loadJsDb(CCBase,bccDefautUrl,'choixComCom','CCBase');		// chargement des comcom par défaut
	loadJsDb(SCoTBase,bscotDefautUrl,'choixSCoT','SCoTBase');	// chargement des SCoT/Pays par défaut
	}	
function loadJsDb(database,adresse,autosug,sugId) {
	if(database.length==0) {
	// chargement des cantons
		GM_xmlhttpRequest({
		    method:'GET',
			url:adresse,									// adresse de la base au format -js.txt
		    headers: {
				'User-agent':'Mozilla/4.0 (compatible) Greasemonkey/0.3',
				'Accept':'text/html,application/xml,text/xml',
				},
		    onload: function(responseDetails) {
				eval(responseDetails.responseText);			// chargement du tableau
				var n=0; for(d in database) {if(n>0) {
						database[database[d][0]]=d;			// mise en place de database[Nom]=id
						} else n++;}
				if(autosug) new AutoSuggest(document.getElementById(autosug),database,sugId);
				if(idCom!=null) {if(ComBase[idCom]!=null) chargeById(idCom)};
//textDeb+="<hr/>"+responseDetails.responseText;
				},
			});
		}
	}

/************* CONTROLES DE BASE ******************/
// version de Firefox utilisée (problème lié au DOMParser pour les tags de domaines - geo:Communes)
var verFF=left(navigator.userAgent.split("Firefox/")[1],1);
var tagGeoCom,tagGeoCodeCom,tagGeoNom;
switch (verFF) {
	case "2":
		tagRdf="RDF";
		tagGeoCom="Commune";
		tagGeoCodeCom="code_commune";
		tagGeoNom="nom";
		tagGeoCodeCan="code_canton";
		tagGeoChef="chef-lieu";
		tagGeoVoisin="voisin";
		attrRes="resource";
		break;
	case "3":
		tagRdf="rdf:RDF";
		tagGeoCom="geo:Commune";
		tagGeoCodeCom="geo:code_commune";
		tagGeoNom="geo:nom";
		tagGeoCodeCan="geo:code_canton";
		tagGeoChef="geo:chef-lieu";
		tagGeoVoisin="geo:voisin";
		attrRes="rdf:resource";
		break;
	default:
		tagRdf="RDF";
		tagGeoCom="Commune";
		tagGeoCodeCom="code_commune";
		tagGeoNom="nom";
		tagGeoCodeCan="code_canton";
		tagGeoChef="chef-lieu";
		tagGeoVoisin="voisin";
		attrRes="resource";
	}	
function chargeComXml(dep) {
	// initialisation des tables SCoT et CC qui n'existent pas pour ce département
	SCoTBase['dep-'+dep]=new Array("SCoT et Pays non disponibles pour ce département","");
	CCBase['dep-'+dep]=new Array("EPCI non disponibles pour ce département","");
textDeb+="En raison d'un problème de navigation, vous devez ouvrir le lien suivant, puis recharger la fenêtre pour voir le script fonctionner. Désolé...<br/><a href='"+rdfInsee(dep)+"'>"+rdfInsee(dep)+"</a>";
	GM_xmlhttpRequest({
		method:'GET',
		url:rdfInsee(dep),
		headers: {
			'User-agent':'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept':'text/html,application/xml,text/xml',
			},
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(responseDetails.responseText,"application/xml");
	        Communes=xmlDoc.getElementsByTagName(tagGeoCom);
			for (i in Communes) {
				var lId=Communes[i].getElementsByTagName(tagGeoCodeCom)[0].textContent;
				var leNom=Communes[i].getElementsByTagName(tagGeoNom)[0].textContent;
				if(Communes[i].parentNode.tagName==tagRdf) {
					var lIdCan="multi";
					var leNomCan="Cette commune est divisée en plusieurs cantons";
					leChefCan=lId;
					}
				else {
					if(Communes[i].parentNode.tagName!=tagGeoVoisin) {
						var lIdCan=Communes[i].parentNode.parentNode.getElementsByTagName(tagGeoCodeCan)[0].textContent;
						var leNomCan=Communes[i].parentNode.parentNode.getElementsByTagName(tagGeoNom)[0].textContent;
						var leChefCan=right(Communes[i].parentNode.parentNode.getElementsByTagName(tagGeoChef)[0].getAttribute(attrRes),5);
						}
					}
				if(Communes[i].parentNode.tagName!=tagGeoVoisin) {
					var nulLink='dep-'+left(lId,2);
					if(!ComBase[lId]) {
						ComBase[lId]=new Array(leNom,lIdCan,nulLink,nulLink,nulLink,nulLink);
						ComBase[leNom]=lId;
						}
					if(!CantBase[lIdCan]) {
						CantBase[lIdCan]=new Array(leNomCan,leChefCan);
						CantBase[leNomCan]=lIdCan;
						}
					}
/* Lignes permettant de récupérer les données idCom > idCant > nomCant > chefLieuCant */
// textDeb+="<table>";
// textDeb+="<tr><td>"+lId+"</td><td>"+lIdCan+"</td><td>"+leNomCan+"</td><td>"+leChefCan+"</td></tr>";
// textDeb+="</table>";
/* à décommenter pour l'usage */
				}
			new AutoSuggest(document.getElementById("choixCom"),ComBase,"ComBase");
			if(idCom!=null) chargeById(idCom);
			},
		});
	}

/*********** FONCTIONS DE CHARGEMENT UNIFIEE ***************/
function charge() {
	// Normalement, tous les liens sont en href='#code' à surveiller
	var param;
	if(this.getAttribute("href")) code=this.getAttribute("href").split("#")[1];
	else code=this.getAttribute("id").split("-")[1];
	chargeById(code);
	this.parentNode.parentNode.parentNode.style.display ='none';
	}
	
function chargeById(id) {
	// chargement en fonction de l'identifiant. teste le niveau communal en premier...
	if(ComBase[id]) {
	// chargement à la commune
		idCom=id;nomCom=ComBase[id][0];hasChanged[0]=1;
		document.title=nomCom+" ("+idCom+") | DRE Haute-Normandie / fiches territoriales";
		callModules();
		}
	else if(CCBase[id]) {
	// chargement à la Com Com
		idCC=id;nomCC=CCBase[id][0];idCom=CCBase[id][1];
		document.title=nomCC+" ("+idCC+") | DRE Haute-Normandie / fiches territoriales";
		callModules();
		}
	else if(SCoTBase[id]) {
	// chargement à la Com Com
		idSCoT=id;nomSCoT=SCoTBase[id][0];idCom=SCoTBase[id][1];
		document.title=nomSCoT+" ("+idSCoT+") | DRE Haute-Normandie / fiches territoriales";
		callModules();
		}
	else alert("désolé il y a eu un problème avec la fonction\n chargeById\n L'id "+id+" n'a pas été trouvé dans la base...");
/***********************************************/
/***********************************************/
/***********************************************/
/*	else {
	// chargement à la commune à partir du code insee
		var leDep=left(id,2);
		chargeComXml(leDep);
		}*/
	} 
/***********************************************/
/***********************************************/
/***********************************************/	
function chargeByName(name) {
	// pas utilisée pour l'instant...
	// chargement en fonction du nom. teste le niveau communal en premier...
	if(ComBase[name]) {
	// chargement à la commune
		idCom=ComBase[name];chargeById(idCom);
		}
	else if(CCBase[name]) {
	// chargement à la Com Com
		idCC=CCBase[name];chargeById(idCC);
		}
	else if(SCoTBase[name]) {
	// chargement à la Com Com
		idSCoT=SCoTBase[name];chargeById(idSCoT);
		}
	else alert("désolé il y a eu un problème avec la fonction\n chargeByName\n Le nom "+name+" n'a pas été trouvé dans la base...");
	}	
	
/************************************************************************************************************************/
/**********************************************FONCTIONS SUPPORTS***************************************************/
/************************************************************************************************************************/	
/* URL DE DONNEES */
// geo rdf de l'insee
function rdfInsee(codeDep) {return 'http://rdf.insee.fr/geo/cantons-'+codeDep+'-2003.rdf'};
/* récupération des paramètres de l'url  */
// adapté de : http://www.netlobo.com/comments/url_query_string_javascript
function getUrlParameter(param) {
	param=param.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS="[\\?&]"+param+"=([^&#]*)";
	var regex=new RegExp(regexS);
	var results=regex.exec(window.location);
	if(results==null) return null;
	else return results[1];
	}
function getUrlDomain() {
	return window.location.host;
	}	
function right(texte,longueur) {
	return(texte.substr(texte.length-longueur));
	}
function left(texte,longueur) {
	return(texte.substr(0,longueur));
	}

function insertAfter(newChild,refChild) {
// thanks to Fotiman : http://www.webmasterworld.com/javascript/3304115.htm
	refChild.parentNode.insertBefore(newChild,refChild.nextSibling);
	}
function insertBefore(newChild,refChild) {
// thanks to Fotiman : http://www.webmasterworld.com/javascript/3304115.htm
	refChild.parentNode.insertBefore(newChild,refChild);
	}
function nGetFirstChild(n) {
// adapté de : http://www.w3schools.com/dom/prop_element_firstchild.asp
	x=n.firstChild;
	while (x.nodeType!=1) x=x.nextSibling;
	return x;
	}
function addEvent(obj,type,fn,par){
// simplifié de http://forum.alsacreations.com/topic-5-32720-1-AddEventListener.html#p257856
	obj.addEventListener(type,function(event){return fn.call(obj,event,par);},false );
	}
	
/* débuggeur */
function debug() {
	if(textDeb!="") {
		document.getElementById("debug").innerHTML=textDeb;
		document.getElementById("debug").setAttribute("style","display:block;background:#ff0");
		}}	

////////////////////////////////////////////////////////////////////
/* note : ne fonctionne que pour un élément "autosuggest" unique dans la page. A adapter pour permettre plusieurs autosuggest... */	
var idCounter = 0;
// Styling
GM_addStyle(".suggestion_list{background:"+coul3+";padding:4px;} .suggestion_list ul{padding:0;margin:0;list-style-type:none;} .suggestion_list a{text-decoration:none;color:"+coul0+";} .suggestion_list .selected{background:"+coul2+";color:"+coul0+";} .suggestion_list li:hover{background:"+coul2+";color:"+coul0+";} #autosuggest{display:none;}");
function AutoSuggest(elem,suggestions,sugId) {
// adaptée de http://gadgetopia.com/autosuggest/autosuggest.js
	//The 'me' variable allow you to access the AutoSuggest object
	//from the elem's event handlers defined below.
	var me=this;
	//A reference to the element we're binding the list to.
	this.elem=elem;
	this.suggestions=suggestions;
	//Arrow to store a subset of eligible suggestions that match the user's input
	this.eligible=new Array();
	//The text input by the user.
	this.inputText=null;
	//A pointer to the index of the highlighted eligible item. -1 means nothing highlighted.
	this.highlighted=-1;
	//A div to use to create the dropdown.
	this.div=document.getElementById("auto"+sugId);
	//Do you want to remember what keycode means what? Me neither.
	var TAB=9;
	var ESC=27;
	var KEYUP=38;
	var KEYDN=40;
	var ENTR=13;
	//The browsers' own autocomplete feature can be problematic, since it will 
	//be making suggestions from the users' past input.
	//Setting this attribute should turn it off.
	elem.setAttribute("autocomplete","off");
	//We need to be able to reference the elem by id. If it doesn't have an id, set one.
	if(!elem.id) {
		var id="autosuggest"+idCounter;
		idCounter++;
		elem.id=id;
		}
	/********************************************************
	onkeydown event handler for the input elem.
	Tab key = use the highlighted suggestion, if there is one.
	Esc key = get rid of the autosuggest dropdown
	Up/down arrows = Move the highlight up and down in the suggestions.
	********************************************************/
	elem.addEventListener("keydown",toucheEnfoncee,true);
	function toucheEnfoncee(ev) {
//	elem.onkeydown=function(ev) {
	    me.showDiv();
		var key = me.getKeyCode(ev);
		switch(key)	{
			case ENTR:
				me.useSuggestion();
				break;
			case TAB:
				me.useSuggestion();
				break;
			case ESC:
				me.hideDiv();
				break;
			case KEYUP:
				if (me.highlighted > 0) me.highlighted--;
				me.changeHighlight(key);
				break;
			case KEYDN:
				if (me.highlighted < (me.eligible.length - 1)) me.highlighted++;
				me.changeHighlight(key);
				break;
			}
		};
	/********************************************************
	onkeyup handler for the elem
	If the text is of sufficient length, and has been changed, 
	then display a list of eligible suggestions.
	********************************************************/
	elem.addEventListener("keyup",toucheRelachee,true);
	function toucheRelachee(ev) {
//	elem.onkeyup=function(ev) {
		var key = me.getKeyCode(ev);
		switch(key)	{
		//The control keys were already handled by onkeydown, so do nothing.
			case TAB:
			case ESC:
			case KEYUP:
			case KEYDN:
			return;
		default:
			if (this.value != me.inputText && this.value.length > 0) {
				me.inputText = this.value;
				me.getEligible();
				me.createDiv();
				me.positionDiv();		
				me.showDiv();
				}
			else me.hideDiv();
			}
		};
	/********************************************************
	Insert the highlighted suggestion into the input box, and 
	remove the suggestion dropdown.
	********************************************************/
	this.useSuggestion = function()	{
		if (this.highlighted > -1) {
			this.elem.value = this.eligible[this.highlighted];
			this.hideDiv();
			chargeByName(this.elem.value);
			//It's impossible to cancel the Tab key's default behavior. 
			//So this undoes it by moving the focus back to our field right after
			//the event completes.
			setTimeout(".getElementById('" + this.elem.id + "').focus()",0);
			}
		};
	/********************************************************
	Display the dropdown. Pretty straightforward.
	********************************************************/
	this.showDiv = function() {this.div.style.display='block';};
	/********************************************************
	Hide the dropdown and clear any highlight.
	********************************************************/
	this.hideDiv = function() {
		this.div.style.display = 'none';
		this.highlighted = -1;
		};
	/********************************************************
	Modify the HTML in the dropdown to move the highlight.
	********************************************************/
	this.changeHighlight=function() {
		var lis=this.div.getElementsByTagName('li');
		for(i in lis) {
			var li=lis[i];
			if (this.highlighted==i) li.setAttribute('class','selected');
			else li.setAttribute('class','');
			}
		};
	/********************************************************
	Position the dropdown div below the input text field.
	********************************************************/
	this.positionDiv = function() {
		var el = this.elem;
		var x = 0;
		var y = el.offsetHeight;
		//Walk up the DOM and add up all of the offset positions.
		while (el.offsetParent && el.tagName.toUpperCase() != 'BODY') {
			x += el.offsetLeft;
			y += el.offsetTop;
			el = el.offsetParent;
			}
		x += el.offsetLeft;
		y += el.offsetTop;
		this.div.style.left = x + 'px';
		this.div.style.top = y + 'px';
		};
	/********************************************************
	Build the HTML for the dropdown div
	********************************************************/
	this.createDiv=function() {
		var ul=document.createElement('ul');
		//Create an array of LI's for the words.
		for (i in this.eligible) {
			var word=this.eligible[i];
			var li=document.createElement('li');
				li.setAttribute('class','');
				li.setAttribute('id','li-'+word);
			var lId=suggestions[word];
			var a=document.createElement('a');
				a.href="#"+lId;
				a.addEventListener("click",charge,false);
				a.innerHTML=word;
			li.appendChild(a);
			if (me.highlighted==i) li.setAttribute('class','selected');
			ul.appendChild(li);
			}
		this.div.setAttribute("class","suggestion_list");		
		this.div.replaceChild(ul,this.div.childNodes[0]);
		/********************************************************
		mouseover handler for the dropdown ul
		move the highlighted suggestion with the mouse
		********************************************************/
		ul.onmouseover=function(ev) {
			//Walk up from target until you find the LI.
			var target=me.getEventSource(ev);
			while (target.parentNode && target.tagName != 'li')target = target.parentNode;		
			var lis = me.div.getElementsByTagName('li');
			for (i in lis) {
				var li = lis[i];
				if(li == target) {
					me.highlighted = i;
					break;
					}
				}
			me.changeHighlight();
			};
		/********************************************************
		click handler for the dropdown ul
		insert the clicked suggestion into the input
		********************************************************/
		ul.onclick = function(ev) {
			me.useSuggestion();
			me.hideDiv();
			me.cancelEvent(ev);
			return false;
			};
		this.div.setAttribute('class','suggestion_list');
		this.div.style.position='absolute';
		};
	/********************************************************
	determine which of the suggestions matches the input
	********************************************************/
	this.getEligible = function() {
		this.eligible=new Array();
		for (i in this.suggestions) {
			var suggestion=this.suggestions[i][0];
			function cleanName(texte) {
			// nettoyage des noms (- et espaces, é è ê...)
				var reg=new RegExp("-| ", "g");
				texte=texte.replace(reg,"");
				reg=new RegExp("[éèê]","g");
				texte=texte.replace(reg,"e");
				reg=new RegExp("CC|CA|SCoT|del'|du|dela","g");
				texte=texte.replace(reg,"");
				reg=new RegExp("st|saint","g");
				texte=texte.replace(reg,"saint");
				reg=new RegExp("ste|sainte","g");
				texte=texte.replace(reg,"sainte");
				return texte.toLowerCase();
				}
			if(cleanName(suggestion).indexOf(cleanName(this.inputText))=="0") {
				this.eligible[this.eligible.length]=suggestion;
				}
			}
		};
	/********************************************************
	Helper function to determine the keycode pressed
	********************************************************/
	this.getKeyCode = function(ev) {return ev.keyCode;};
	/********************************************************
	Helper function to determine the event source element
	********************************************************/
	this.getEventSource = function(ev) {return ev.target;};
	/********************************************************
	Helper function to cancel an event (Returning false helps too).
	********************************************************/
	this.cancelEvent = function(ev)	{
		ev.preventDefault();
		ev.stopPropagation();
		}
	/********************************************************
	Ajouts personnels
	********************************************************/
	// remise en route du script en cliquant sur la zone
	elem.addEventListener("click",ajoutFonctions,true);
	function ajoutFonctions() {
		elem.addEventListener("keydown",toucheEnfoncee,true);
		elem.addEventListener("keyup",toucheRelachee,true);
		}
	}

/******************* STYLES POUR L'IMPRESSION **************************/
GM_addStyle("@media print {input,.onglets *,#information,h2,#alerte,#gauche,#entete,#menuprincipal,#droite,.spip-admin-float,#navpath,#outils,#copyright,.o2paj,span.enligne{display:none} #milieu {width:100%;margin:0;padding:0} #contenu h2 {display:block;font-size:80%;color:#999;} #lesFiches h2 {display:block;font-size:130%;margin:0 0 5px;color:#000} #lesFiches h3 {display:block;width:100%;background:#ddd;padding:2px;font-size:120%;margin:0 0 5px} #lesFiches h4 {display:block;font-size:110%;margin:3px 0 3px} .cachee div.selection {display:none;} .selection div.cachee {display:block;clear:both}}");
/*****************************************************************/
/* VERIFICATION DE LA VERSION DU SCRIPT */
/* Version du script pour vérification */
/* paramètres du script définis en début de script...
/* script version control parameters */
var GMSUCtime=11;			// delay before alert disapears. Set to 0 if you don't want it to disapear (might be a bit intrusive!)
var GMSUCbgColor=coul4;	// background color
var GMSUCfgColor=coul3;	// foreground color

// define function
function GM_scriptVersionControl(scriptId,version) {
//  http://userscripts.org/scripts/show/35611 - version 0.1
	var scriptUrl="http://userscripts.org/scripts/show/"+scriptId;
	// go to script home page to get official release number and compare it to current one
	GM_xmlhttpRequest({
		method: 'GET',
		url: scriptUrl,
		headers: {
			 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			 'Accept': 'text/html,application/xml,text/xml',
			 },
		onload: function(responseDetails) {
			var parser=new DOMParser();
			var dom=parser.parseFromString(responseDetails.responseText,"text/xml");
			var offRel=dom.getElementById('summary').getElementsByTagName('b')[1].nextSibling.textContent;
			var scriptName=dom.getElementById('content').getElementsByTagName('h1')[0].textContent;
			if(offRel!=" "+version) {
				// Styling
				GM_addStyle("#GMSUC-alerte {position:absolute;top:5px;left:50%;margin:20px 0 0 -128px;padding:6px;width:250px;background:"+GMSUCbgColor+";border:"+GMSUCfgColor+" 1px solid;color:"+GMSUCfgColor+";font-size:1em;text-align:center} #GMSUC-alerte a {font-weight:bold;font-size:1em} #GMSUC-alerte * {color:"+GMSUCfgColor+";} #GMSUC-alerte table {width:100%} #GMSUC-alerte td {width:33%;border:solid 1px "+GMSUCfgColor+"} #GMSUC-alerte td:hover{background:"+GMSUCfgColor+"} #GMSUC-alerte td:hover a {color:"+GMSUCbgColor+"} #GMSUC-timer {font:big bolder} #GMSUC-info {text-align:right} #GMSUC-info a {font:small sans-serif;text-decoration:none}  #GMSUC-info a:hover {background:"+GMSUCfgColor+";color:"+GMSUCbgColor+"}");
				// Lang detection and apply
				var Langues="en, fr";
				var lang=navigator.language;
				var reg=new RegExp(lang,"g");
				if(!Langues.match(lang)) lang="en";
				/* traductions / translations */
					var Txt=new Array();
					for(i=1;i<7;i++) {Txt[i]=new Array();} 
					// français
					Txt[1]["fr"]="Vous utilisez la version";
					Txt[2]["fr"]="du script";
					Txt[3]["fr"]="La version officielle est différente";
					Txt[4]["fr"]="installer";
					Txt[5]["fr"]="voir le code";
					Txt[6]["fr"]="propulsé par";
					// english
					Txt[1]["en"]="You're using";
					Txt[2]["en"]="version of";
					Txt[3]["en"]="script. Official release version is different";
					Txt[4]["en"]="install";
					Txt[5]["en"]="view code";
					Txt[6]["en"]="powered by";
				/* ------------------------------- */	
				var alerte=document.createElement('div');
				alerte.setAttribute('id','GMSUC-alerte');
				var GMSUCtextAlerte=Txt[1][lang]+" "+version+" "+Txt[2][lang]+" <i><b>"+scriptName+"</b></i>";
				GMSUCtextAlerte+=". "+Txt[3][lang]+" (<a href='http://userscripts.org/scripts/show/"+scriptId+"'>"+offRel+"</a>)";
				GMSUCtextAlerte+="";
				GMSUCtextAlerte+="<table><tr><td><a href='http://userscripts.org/scripts/show/"+scriptId+"'>v."+offRel+"</a></td><td><a href='http://userscripts.org/scripts/review/"+scriptId+"'>"+Txt[5][lang]+"</a></td><td><a  href='http://userscripts.org/scripts/source/"+scriptId+".user.js'>"+Txt[4][lang]+"</a></td></tr></table>"
				if(GMSUCtime>0) GMSUCtextAlerte+="<div id='GMSUC-timer'>"+GMSUCtime+" s</div>";
				GMSUCtextAlerte+="<div id='GMSUC-info'>"+Txt[6][lang]+" <a href='http://userscripts.org/scripts/show/35611'>GM Script Update Control</a></div>";
				document.body.appendChild(alerte);
				document.getElementById('GMSUC-alerte').innerHTML=GMSUCtextAlerte;
				if(GMSUCtime>0) {
					function disparition() {
						if(GMSUCtime>0) {
							document.getElementById("GMSUC-timer").innerHTML=GMSUCtime+" s";
							GMSUCtime+=-1;
							setTimeout(disparition,1000)
							}
						else document.getElementById("GMSUC-alerte").setAttribute("style","display:none");
						}
					disparition();
					}
				}
			}
		});
	}
/* fin du script de vérification de la version */
/* Note pour le développement (idées et autres) */
/******************************************
Ce que doit faire le script :
- être capable de récupérer un code en paramètre
	par exemple : &code_insee=xxxxx pour afficher directement les infos d'une commune
	d'identifier différents types de codes aux différentes échelles (commune, cc ou agglo, scot?)
- être modulable quant aux informations à afficher
- aller puiser dans des bases de données extérieures
	en utilisant GM_xmlhttprequest (permet la requête cross-domain sans proxy)
- proposer d'autres communes ou collectivités
	les communes limitrophes, la cc dont fait partie la commune
	les cc limitrophes, les communes faisant partie de la cc
- faire des liens vers des sources d'informations extérieures
	insee, geoportail, wikipedia...
**********************************************/	
