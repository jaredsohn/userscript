var GMSU_meta_55848 = <><![CDATA[
// ==UserScript==
	// @name         Another  Fonctions diverses
	// @author        Citizator
			// @description	  Fonctions diverses pour sites (1.4.1)
	// @version       1.4.1

// ==/UserScript==
]]></>;

//			Mise à jours				
//Usage GMSU.init(int scriptID, optional boolean force, optional boolean depForce)
//Usage GMSU.setLang(string lang)
//Usage setCheckInterval(int days)

if (typeof GM_log == "function") {
if(location.href==window.parent.window.location){ //	Empèche l'éxécution du script sur les iframes et assimilés
var check_update = function (){GMSU.init(55848,true);}
GMSU.setCheckInterval(2)
GMSU.setLang("fr")
GM_registerMenuCommand("fonctions diverses - check update", check_update);
//			Fin mise à jour				

var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://userscripts.org/scripts/source/55848.user.js';
document.getElementsByTagName("head")[0].appendChild(newScript);

//			Prompt to exec JS code		
	function keyCapt(ev) { 
		if(ev.keyCode === 120) { // F9
			var casURL=/(?:\/*url\:\'(.*[^\*][^\/])\'\*\/)/m, code = prompt("Code à exécuter (un ; est rajouté automatiquement à la fin) : ")+";";
			GM_log(code);
			if (casURL.test(code.toLowerCase()==true)) {getPageCtrl.jslauncher(casURL.exec(code)[1]);/*code=code.replace(casURL*/}
			eval(code);
		}
	}
	if(document.addEventListener) {document.addEventListener("keydown", keyCapt, false);} /* else {document.attachEvent("onkeydown", keyCapt);} //code for IE -- no need to bother since only FF can have userscripts */

}}

//							Fonctions que je groupe (mon titre) sous getIdCTRL							
//			Verion: 2.4.1	Changements :
//2.4.1 : Modifié $() : Rectification erreur en cas de non éxistance de la propriété
//2.4.0 : Modifié $() : $ : $(ID,propriete,returnAll)
//	Détail ->	S'il n'y a pas de propriete l'id est recherchée pour le critère (returnAll renvoi un array, dans ce cas, il est nécessaire de mettre propriete à cause de l'ordre)
//			Modifié ShowMaskById() : si le premier argument n'est pas un boolean, la fonction le masquera s'il est affiché, et l'affichera s'il est déjà masqué. Remarque : Si la propriété de style visibility n'existe pas ou est nulle, la fonction masque.
//				ID : Valeur de la propriété (propriete) pour les éléments à recherché
//				propriete : propriété de l'objet sur lequel se porte la recherche
//2.3.0 : Ajouté $all() comme document.getElementsByTagName("*") ou le document.all[] de IE sauf que c'est une fonction
//2.2.1 : Modifié Erreur removeElementById
//	Modifié : Amélioration ShowMaskById
//2.2.0 : Ajout setbackgroundImage(ID,adresse)
//2.1.0 : Ajout fonctions affichage/masquage par ID
//2.0.0 : Structure objet
//	Ajout: Fonction $(ID)
//1.0.0 : Création fichier (fusion de fonctions diverses)

getIdCtrl = {
$all : function () {
	return document.getElementsByTagName('*');
},
$ : function (ID,propriete,returnAll) {
	if (typeof propriete != "string") {propriete="id"};
	if(propriete=="class"){propriete="className"};
	var ID = new String(ID);
	var resultat = [],source=getIdCtrl.$all(),name;
	for (name in source) {
	if (typeof source[name][propriete]!="undefined"){
	if (source[name][propriete].toLowerCase()==ID.toLowerCase()) {
	if(returnAll!==true){return source[name]}else{resultat.push(source[name])};
	}}}
	return resultat;
},
removeElementById : function (id){
	var id = new String(id);
	var elm = getIdCtrl.$(id);
	if(elm) {
	elm.parentNode.removeChild(elm);
	return true;
	} else {return false};
},
ShowMaskById : function () {
	var Obj, i, showmask, Arg = arguments, forStart=0, style, styleprop;
	if (typeof Arg[0] == "boolean") {show=Arg[0];forStart=1};
	for(i=forStart; i< arguments.length; i++){ // On parcours la liste
		var id = new String(Arg[i]);
		Obj = getIdCtrl.$(id); // Récup Objet correspondant
		if(Obj){
		var style = Obj.style;
		if(typeof show != "boolean"){styleprop=(style.visibility=="visible"||style.visibility=="")?false:true;
		} else {styleprop = show}
		showmask =(styleprop === true) ? ["visible",""] : ["hidden","none"];
		style.visibility = showmask[0];
		style.display = showmask[1];
		}
	}
},
Affiche_OBJ : function (){
	var i;
	for(i=0; i< arguments.length; i++){getIdCtrl.ShowMaskById(true,arguments[i])};		// Affichage des éléments
},
Masque_OBJ : function (){
	var i;
	for(i=0; i< arguments.length; i++){getIdCtrl.ShowMaskById(false,arguments[i])};		// masquage des éléments
},
setbackgroundImage : function (ID,adresse) {
imageurl = "url(" + adresse + ")";
var mystring = new String(ID);
getIdCtrl.$(mystring).style.backgroundImage= imageurl;
},
}
//							Fin Fonctions										

//							Fonctions que je groupe (mon titre) sous getVar			
//			Verion: 1.3.0	Changements :
// 1.3.0 : Ajouté : Fonction VarCtrl.somme()
//				Détail: Retourne la somme des nombre des argument, que les arguments soit des nombres, ou des objets (la fonction analyse les variables contenus dans les objets, les sous-objets, ...). Les variables autres que les nombres ou les objets ne sont pas analysés ou comptés dans la somme, comme les booléans.
// 1.2.0 : Modifié : Fonction VarCtrl.type_de(Variable) améliorée pour les variables issues d'un element HTML
// 1.1.0 : Ajouté : Fonction VarCtrl.matchAll(mystring,myregexp)
//				Détail: Retourne les réponses où le regexp est trouvé (un peu comme la fonction match de l'objet string, sauf pour toutes les fois où c'est trouvé)
//			Modifié : Fonction VarCtrl.dateToString()
//				Détail: Amélioration Jour en num de la date sur 2 chiffre maintenant au lieu de un quand ce jour était inférieur à 10
// 1.0.1 :	Modifié : Erreur fonction VarCtrl.dateToString()
// 1.0.0 :	Ajouté : Fonction VarCtrl.arrondi(nombre,arrondi)
//			Ajouté : Fonction VarCtrl.type_de(Variable)
//			Ajouté : Fonction VarCtrl.replaceAll(OldString,FindString,ReplaceString)
//			Ajouté : Fonction VarCtrl.dateToString(date,masque)
//				Détail Renvoi la date en string selon le masque

var VarCtrl = {
arrondi : function (nombre,arrondi) { //(arrondi) 2 : après la virgule ; -2 avant la virgule
		if (typeof nombre != "number" || typeof arrondi != "number") {
			return "Erreur type arguments";
		} else {
			with (Math)
			{
			//Math.pow(10,arrondi) : 10 "puissance" arrondi
			return (round(nombre * pow(10,arrondi)) )/pow(10,arrondi);
			}
		}
	},
type_de : function (Variable){
		if(Variable===null) {return "null"};
		if(Variable===undefined) {return "undefined"};
		var constructeur = new String(Variable.constructor.toString().toLowerCase());
		var ConstrFunction = /(?:function\s*(.*)\s*\(.*\)(?:\s*)?(?:\{*)?)/i
		var ConstrObject = /(?:\[object\s*(.*)element\])/i
		if (ConstrFunction.test(constructeur) == true) {return ConstrFunction.exec(constructeur)[1]};
		if (ConstrObject.test(constructeur) == true) {return ConstrObject.exec(constructeur)[1]};
		return "unkown :\n" + constructeur;
	},
somme : function(){
	var num,subnum,somme=0, arg=arguments;
	for(num=0; num<arg.length; num++){ // On parcours la liste
	switch(typeof arg[num]){
		case "number" : somme+=arg[num];break;
		case "object" : for (subnum in arg[num]){somme+=VarCtrl.somme(arguments[num][subnum]);};break;
	}};
	return somme;
},
matchAll : function (mystring,myregexp){
	if(typeof mystring=="string"||typeof VarCtrl.type_de(myregexp)=="regexp") {
	var result = [];
	while(myregexp.test(mystring)==true) {
	result.push(mystring.match(myregexp));
	mystring=mystring.replace(myregexp,"");}
	} else {
	throw "Erreur argument type"
	}
	return result;
	},
replaceAll : function (OldString,FindString,ReplaceString) {
		var OldString = new String(OldString), FindString = new String(FindString);
		var SearchIndex = 0;
		var NewString = ""; 
		while (OldString.indexOf(FindString,SearchIndex) != -1) {
			NewString += OldString.substring(SearchIndex,OldString.indexOf(FindString,SearchIndex));
			NewString += ReplaceString;
			SearchIndex = (OldString.indexOf(FindString,SearchIndex) + FindString.length);
		}
		NewString += OldString.substring(SearchIndex,OldString.length);
		return NewString;
	},
dateToString : function (date,masque) {
	var type_de = VarCtrl.type_de, replaceAll = VarCtrl.replaceAll;
	if (type_de(date) != "date" || type_de(masque) != "string") {
		throw "dateToString : Erreur type"; return;
	} else {
	//jjj : jour de la samaine
	//jj : jour 1 à 31
	//mmmm : mois entier Janvier par ex.
	//mmm : mois court Janv. par ex.
	//mm : mois en num
	//aaa : année entière
	//aa : année courte (pour les 19xx)
	//HH : heures
	//MM : minutes
	//SS : secondes
	//MMM : Millisecondes
	jours_semaine=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
	mois_court=["Janv.","Févr.","Mars","Avr.","Mai","Juin","Juil.","Août","Sept.","Oct.","Nov.","Déc."];
	mois_long=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
	var resultat = masque;
	resultat = replaceAll(resultat,"jjj",jours_semaine[date.getDay()]);
	resultat = replaceAll(resultat,"jj",(date.getDate()<10)?"0"+date.getDate():date.getDate());
	resultat = replaceAll(resultat,"jj",date.getDate());
	resultat = replaceAll(resultat,"mmmm",mois_long[date.getMonth()]);
	resultat = replaceAll(resultat,"mmm",mois_court[date.getMonth()]);
	var moisnum = date.getMonth()+1;
	resultat = replaceAll(resultat,"mm",(Math.abs(moisnum < 10)) ? "0" + moisnum : moisnum);
	resultat = replaceAll(resultat,"aaa",date.getFullYear());
	if (navigator.userAgent.indexOf('Firefox') != -1) {
	var anneeCourt = date.getYear()-100;
	resultat = replaceAll(resultat,"aa",(Math.abs(anneeCourt)<10) ? "0" + anneeCourt : anneeCourt);
	} else {resultat = replaceAll(resultat,"aa",date.getYear())};
	resultat = replaceAll(resultat,"HH",(date.getHours()<10)?"0"+date.getHours():date.getHours());
	resultat = replaceAll(resultat,"MMM",(date.getMilliseconds()<10)?"0"+date.getMilliseconds():date.getMilliseconds());
	resultat = replaceAll(resultat,"MM",(date.getMinutes()<10)?"0"+date.getMinutes():date.getMinutes());
	resultat = replaceAll(resultat,"SS",(date.getSeconds()<10)?"0"+date.getSeconds():date.getSeconds());
	return resultat;
	}},
}
//							Fin Fonctions											

//							Fonctions que je groupe (mon titre) sous getPageCtrl			
getPageCtrl={
	navlanguage : function (type) {
	var language = new String();
	if (navigator.browserLanguage) {
	language = navigator.browserLanguage;
	//Bon on commence avec une détection de la propriété browserLanguage de l'objet navigator et voir si le visiteur viens avec Internet Explorer (Si ce script est lancé avec une balise script sur IE).
	//Pourquoi ? Simplement car les développeurs de Micro$$oft ont "oubliés" d'implanter une propriété (language pour ne pas la citer) de l'objet navigator pour mettre la leur (qui n'existe donc pas dans les autres naviguateurs ! !). Encore prévoir un cas spécial ! !
	} else {language = navigator.language};
	//Donc s'il a les développeurs du navigateur sont intelligent (comprennent un minimum javascript). On va récupérer la valeur retournée par la propriété language de l'objet navigator.
	var navlanguageindex = {
	fr : "Français",	nl : "Neerlandais",		en : "Anglais",		de : "Allemand",
	ja : "Japonais",	it : "Italien",			pt : "Portugais",	es : "Espagnol",
	sv : "Suedois",		zh : "Chinois"}
	// On passe en revue les autres (la liste n'est pas complète hein...)
	// M'envoyer si vous désirez que j'ajoute d'autres langues !
	var navigatorlanguage = new String();
	for (name in navlanguageindex) {
	if (typeof navlanguageindex[name] == "string") {
	if (type == 0 && language.indexOf(name) != -1) {navigatorlanguage = name};
	if (type == 1 && language.indexOf(name) != -1) {navigatorlanguage = navlanguageindex[name]};
	} }
	if (type == 2) {navigatorlanguage = language};
	return navigatorlanguage;
	},
	getVarFromUrl : function (outputobj) {
		var name, parse_querryinurl = /^(?:[^?]*)?(?:\?([^#]*))(?:#.*)?$/, getVar = /^([^=]*)(?:=(.*))?$/;
		if (parse_querryinurl.test(location.href) === true) {
			querry = parse_querryinurl.exec(location.href)[1]; //Plus de "?"
			var querryarray = querry.split("&");
			if (typeof outputobj !== "object") {outputobj={}}
			for (name in querryarray) {
				if (typeof outputobj === "object") {
					var myString = getVar.exec(querryarray[name]);
					var myname = myString[1], myvalue = (myString[2]) ? unescape(myString[2]) : true;
					try {myvalue = eval(myvalue)} catch (e) {}
					outputobj[myname] = myvalue;
				}
			}
		}
		return (typeof outputobj!="object")?null:outputobj;
	},
	querryToFrame : function(frameID,DataBase,AllowHTTP,querryName) {
	//querryName facultatif si l'ID de la frame est = au nom dans l'URL (?mmm=aaa et ID : mmm)
		var frame=document.getElementById(frameID), querry=getPageCtrl.getVarFromUrl();
		if (typeof querryName!="string"){var querryName=frameID;}
		if ((querry[querryName] && DataBase[querry[querryName]])) {
			if (frame != null && frame.src){
				frame.src = DataBase[querry[querryName]]; return true;
			}
		};
		if (AllowHTTP==true && typeof querry[querryName]=="string" && /^http:\/\/.+$/.test(querry[querryName])){
			frame.src = querry[querryName]; return true;
		}
		return false;
	},
	jslauncher : function () {
		var deuxpoints = /^([^\:]*)(?:\s*\:\s*)(.*)$/, name, URL;
		var Arg = getPageCtrl.jslauncher.arguments; // Récup liste des arguments passée à la fonction
		for (var i=0; i<Arg.length; ++i) {
		if (typeof Arg[i]=="string") {
			if (deuxpoints.test(Arg[i])) {
				var myarray = deuxpoints.exec(Arg[i]);
				var myname = myarray[1];
				var myvalue = myarray[2];
				eval(myname + " = \"" + myvalue + "\"");
			continue;}
			var newscript = document.createElement('script');
			newscript.type="text/javascript";
			newscript.src= folder + Arg[i];
			document.getElementsByTagName('head')[0].appendChild(newscript);
		}}
	},
	displayObjectProperties :function (myobjet,divid) {
		// Affiche les propriétés de l'object demandé
		var obj = (typeof myobjet!='string')?myobjet:eval(myobjet), div_object, id, valeurHTML;
		if (typeof divid != "undefined") {
			id = new String(divid);
			div_object = document.getElementById(id);
			div_object.innerHTML = div_object.innerHTML + "<HR NOSHADE SIZE=1>";
		}
		if (typeof obj == "object") {
			for (prop in obj) {
			valeurHTML = myobjet + "." + prop + " = " + obj[prop] + "<br>";
			if (prop != "displayObjectProperties") {
			if (typeof divid == "string") {div_object.innerHTML += valeurHTML;} else {document.write(valeurHTML);}
			}}
		} else {
			document.write("Erreur : " + myobjet + " n'est pas un objet, mais un " + typeof myobjet + " !");
		}
		if (typeof divid == "string") {
		div_object.innerHTML+="<HR NOSHADE SIZE=1>";
		} else {
		document.write("<HR NOSHADE SIZE=1>");
		}
	},
}
//							Fin Fonctions