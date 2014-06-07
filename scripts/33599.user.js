// ==UserScript==
// @name		Nuage de mots
// @namespace	http://sylvain.comte.online.fr/AirCarnet/#NuageDeMots
// @description	cree un nuage de mots a partir de la page affichee
// @include	*
// @exclude         
// @version	a.1
// @licence	creative commons by-nc-sa
// ==/UserScript==.

/* VARIABLES */
var Mots; 				// tableau contenant les mots retenus
//var motSur;				// mot surligne
var Vide=new Array();
var contenu;			// contenu du nuage (html)
var max=0;				// nombre d'occurence du mot le plus represente
var nuageActif=0;		// indicateur d'activite du nuage
var indexActif=0;		// indicateur d'activite de l'indexation au cours du processus

/* PARAMETRES */
//seuil d'affichage (nombre minimal de mots)
var coef=0.5;
var seuil;
// logo Nuage de Mots
var imageLogo='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAQCAYAAADnEwSWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gsPDywBYmpo0AAABE1JREFUeNqNlWtoHFUUx/937ryT2WeWNrU2yZoHGlqiwbo1oLa1DYQiJAgiRILQQjG1AQn5tOgHS6tosRhE+sUXFqnQohXKYovSlLSpul2ltolWa9us2bya3Z3sNjs7j+uHnd00VjAHDpzzv/ee3xnmzB2C/7DBwcGHDMPY6PP5plpaWhK9vb0mAMRiMTo5OdnP8/xuQRD8qqqOaJo2tGPHjr+xCiP3JrFYjDt27NgR0zT7FbWKEwUeqqpmqqqqPq+rq3svm81+KEryzubWdng8PsxP34RtFm76/f4nAoGA3tjYaKiqylYF6+npGTQt553nXhpC0yPtKC7pmLl1FdevjMI0crY/GKLP7uqFPxAA5QgIs5AYOwvmWGlRFH2KokzKsvyCz+ebcBxnvyRJHaIoJkVRPLJmzZorFdjAwEB1PB6f3Pn8Pl9kaw94CgiUQKAAHAM/jXyF9i3bEawJQaAAzxHwFMguzGB+Jon1D9ZhfjaFbObOnCzLd9Wq6jqPLwQwC4RZBZ7ntxP3iWqSyeRBwgl7hg6fhqoqLswF8stxRedLjZSb4jmAwMHF0XPQPB40P9wGBxwsG0jP3YZdvHuK37ZtWyCRSPzoC66rf7rrZRBehmUzEELAEYAQBmITELixq3PuHkIAjjBwhECgHCJbnoQg8MwBJZYNEDCYpoX84qLEX7t2bUDxhOr3vvk1qqs1lDasfJsEbmEbANg9iytjBgKeSnBKR0AAGIU8krf+gCRJJ3ld1zs2PfUiOLEapr18mK0o5CqMgDEArFSYAXDAwBwCxwFsh8HiUBoet5W/blxHJpOxgsHgKSrL8jPTyT8flVUv1je2uWVXDOmKvByXoCW4y4fDCByGitsO4PWH8PvEFW5R15NcJBIZ0hdSbHExi6IFFC3AtBhMi1Xyohsbbmy4umGxkptAwQIMk8EwGQpFoGAChgnYjILjJei6Xs/19fUtUEpzouJ1AfdD/g0sAUoQwwQKZYgJ1911d990agq5XG6GAIDX6/2AV4KvvPrueaRuxPH9icPYf+gbyJK4PNrumPPcck65skZAOYBSgJKSTgiQy97Bb7/+gMTYWbu2tnYTAYBIJBJIJBIXTNNqARgcx8Hg+6NoaGmvfEu5dApfDA9g3xufQVGUCqQMTd0ehySKeGBDIygHXL08gtiJo5BlWfd6vfuHh4c/pQCQTCaXOjs7P56bmzvf1NT0Vj6fr4+fO9lEqADFU4O8nsFHb+/GxM8j8ARqsaH5scpgOAzQM3dw9FA/Ll88AwaChflZxC98i2x69tLmzZtbDxw4EL/vbixbV1eXMjY29noul9tTLBaDACDL8rimaafT6fRrre1bycbHtyMYWodcZhqXvvsSzFr6RdO0EdM0dwmCEJIkaXzt2rV7jx8/fnk1fwREo1EaDodbGxoa2qLRKAWAcDjcoWnaJ6qqXpVleaqmpmY8HA4f7O7u1v6v3j/FlgKIC//MwwAAAABJRU5ErkJggg==';

// liste des termes a exclure
var exclure="";					
// termes francais de base
exclure +=" a à au aussi aux avec c'est ça ce cela ces cette chez comme dans de des dont donc du elle elles est être fait ici il ils je en et la le les leur ma mais me mes mon nous ont ou oý page par pas plus pour puis que qui quoi sans se ses si son sont sur ta tant te tes ton tous tout trýs tu un une vos votre votres vous ";
// termes anglais de base - tres incomplet
exclure +=" a all am and any are as be but by can for from has if in is it not of on than that the they this those to which with you your ";
// termes techniques et balises
exclure +=" - + * / , . ; : ... ! ? | [ ] { } < > = ý \s \" ý ";

// Analyse specifique des sites
var count=0;var classIncluLong,classExcluLong;
var ClassInclu=new Array();
var ClassExclu=new Array();
// dýtection de l'adresse 
var siteSpeci=location.hostname;
var PathNom=location.pathname.split(/\//);
siteSpeci+="/"+PathNom[1];
contenu="analyse specifique pour "+siteSpeci;
switch (siteSpeci) {
	// Google Reader
	case "www.google.com/reader" : 
		ClassInclu["entry-body"]=1;
		ClassInclu["entry-title"]=1;
		ClassInclu["entry-secondary"]=1;
		ClassExclu["entry-source-title link"]=1;
		for(classe in ClassInclu) {count++}
		classIncluLong=count;count=0;
		for(classe in ClassExclu) {count++}
		classExcluLong=count;count=0;
		exclure +=" depeche ";
		break;
	default : var nothingtodo;
	}
// coeficients par type de balise
var Types=new Array();
	Types["a"]=1.5;Types["div"]=1;Types["h1"]=3;Types["h2"]=2.25;Types["h3"]=2;Types["h4"]=1.75;Types["h5"]=1.5;Types["strong"]=1.5;Types["p"]=1;Types["script"]=0;Types["#comment"]=0;
	
/* STYLES */
GM_addStyle("#nuage {margin:20px; width:90%;background:#36a;color:#fff;-moz-border-radius:1em;z-index:99;}");
GM_addStyle("#nuage li {display:inline;font-family:wingdings symbol decotype diwani serif;}");
GM_addStyle("#nuageBouton {position:absolute; top:3px; right:23px; background:url("+imageLogo+"); width:27px; height:16px; z-index:651972}");
GM_addStyle(".surligne {background:#ffff00;}");

/* FONCTIONS */
function creeNuage() {
// parcours du fichier
	contenu=siteSpeci+"<br/>";
	Mots=new Array();
	if(nuageActif==0) {
// creation du div d'affichage
	var nuageDiv=document.createElement("div");
	with(nuageDiv) {
		setAttribute("id","nuage");
		}
	document.body.insertBefore(nuageDiv,document.body.firstChild);
	nuageDiv=document.getElementById("nuage");
	var ulNuage=document.createElement("ul");
	nuageDiv.appendChild(ulNuage);
// creation de la liste de mots
		bodyCopie=document.body.cloneNode(true);
		max=0;
		listeMots(bodyCopie);
		seuil=max*coef;
		for(tous in Mots) {
			if(Mots[tous]>seuil) {
				var taille=Mots[tous]*(5-1)/(max-3)+1-3*(5-1)/(max-3);
				if(tous!="") {
					var item=document.createElement("li");
					with(item) {
						innerHTML="<span style='font-size:"+taille+"em'>"+tous+"</span> ("+Mots[tous]+")";
						addEventListener("click",diminueMot,true);
						}
					nuageDiv.firstChild.appendChild(item);
					}
				}
			}
		nuageActif=1;
		}
	else {
		document.getElementById("nuage").parentNode.removeChild(document.getElementById("nuage"));
		nuageActif=0;
		}
	}
	
function listeMots(objet) {
	var typObj=objet.nodeName.toLowerCase();
	var classObj;
	classObj=objet.className;
	var valParent;
	if(objet.parentNode) {
		if(Types[objet.parentNode.nodeName.toLowerCase()]>-1) valParent=Types[objet.parentNode.nodeName.toLowerCase()];
		else valParent=1;
		}
	else valParent=1;
	var valObj;
	if(Types[typObj]>-1) {
		valObj=Types[typObj]*valParent;
		}
	else valObj=1;
	var InWords=new Array();
	if(classIncluLong>0) {
		if(indexActif==1 && ClassExclu[classObj]==1) indexActif=0;
		if(indexActif==0 && ClassInclu[classObj]==1) indexActif=1;
		}
	else indexActif=1;
	var indexActifObjet=indexActif;
	while(objet.hasChildNodes()) {
		var prems=objet.firstChild;
		if(prems.innerHTML!="") {
			if(prems.nodeName!="#text") {
				if(valObj>0) {
					listeMots(prems);
					indexActif=indexActifObjet;
					}
				}
			else {				
				if(valObj>0 && indexActif==1) dansMots(prems,valObj);
				}
			}
		prems.parentNode.removeChild(prems);
		}		
	}
	
function sortNumber(a,b) {
	return a-b;
	}
	
function dansMots(enfant,valeur) {
	var texte=enfant.nodeValue.toLowerCase();
	if(texte.split(/[\s \( \) \[ \] \{ \} \' ,]/)) {
		InWords=texte.split(/[\s \( \) \[ \] \{ \} \' ,]/);
		for(var i=0;i<InWords.length;i++) {
			var moti=InWords[i];
			if(exclure.indexOf(moti)==-1) {
				if(Mots[moti]) Mots[moti]+=valeur;
				else Mots[moti]=valeur;
				if(Mots[moti]>max) max=Mots[moti];
				}
			}
		}
	else {
		if(exclure.indexOf(texte)==-1) {
			if(Mots[texte]) Mots[texte]+=valeur;
			else Mots[texte]=valeur;
			if(Mots[texte]>max) max=Mots[texte];
			}
		}
	}

function diminueMot() {
	var boutDeTexte=this.firstChild.innerHTML;
	document.getElementById("nuage").removeChild(document.getElementById("nuage").firstChild);
	nuageDiv=document.getElementById("nuage");
	var ulNuage=document.createElement("ul");
	nuageDiv.appendChild(ulNuage);
	Mots[boutDeTexte]=Mots[boutDeTexte]/10;
	max=0;
	for(mot in Mots) {
		if(Mots[mot]>max) max=Mots[mot];
		}
	seuil=max*coef;
	for(tous in Mots) {
		if(Mots[tous]>seuil) {
			var taille=Mots[tous]*(5-1)/(max-3)+1-3*(5-1)/(max-3);
			if(tous!="") {
				var item=document.createElement("li");
				with(item) {
					innerHTML="<span style='font-size:"+taille+"em'>"+tous+"</span> ("+Mots[tous]+")";
					addEventListener("click",diminueMot,true);
					}
				nuageDiv.firstChild.appendChild(item);
				}
			}
		}
	}
	
/* EXECUTION */
// creation du bouton
var nouvBouton=document.createElement("div");
with(nouvBouton) {
	//setAttribute("href","#");
	setAttribute("id","nuageBouton");
	addEventListener("click",creeNuage,true);
	//innerHTML="nuage";
	}
document.body.appendChild(nouvBouton);