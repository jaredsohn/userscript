// ==UserScript==
// @name	The West - ChatRoom [SOM]
// @namespace	http://userscripts.org/scripts/show/95135
// @include	http://*.the-west.*/game.php*
// @include	http://userscripts.org/scripts/review/95135*
// @include	http://userscripts.org/scripts/source/95135.meta.js*
// @description	Integration of mibbit irc chat in TW
// @website	http://scripts-o-maniacs.leforum.eu
// @release	Y.
// @author	Y.
// @translator	Y.
// @version	1.7
//
// @history	1.7 correction boucle infinie.
// @history	1.6 Ajout contrôles de saisies du nom de salon
// @history	1.5 correction bug
// @history	1.4 Ajout d'une aide dialogue pour la connection aux salons mibbit
// @history	1.4 Ajout updater SOM + gestion safari
// @history	1.3 correction probleme serveur 03 mib 
// @history	1.2 modification compatibilité safari + suppression popup cookie + affichage version 
// @history	1.2 ajout fonction SOM mise à jour automatique
// @history	1.1 fonction auto join ajoutée en paramètre modifiable
// @history	1.1 ajout de l'authentification a l'affichage mibbit
// @history	1.0 ajout de la liste des serveurs mib pour contourner les problemes de surcharge du serveur pour widget
// @history	1.0 image bouton encodé base64 + highlight 
// @history	1.0 correction compatibilité Mozilla pour bannière cache pub(a questionner sur la conservation de la banniere)
// @history	1.0 ajout d'une bannière SOM + suppression de Chatango +
// @history	1.0 beta ajout mibbit embed + onglets test(chatango) et Parametre
// @history	beta chatango
// ==/UserScript==

//-----------------------\/
// Pour la mise à jour
var url = window.location.href;

//Cas du script exécuté dans le jeu (ou fenêtre principale)
if (url.indexOf(".the-west.") != -1) {

	//Création d'une fonction globale pour tout le script
	(function(fonctionGZA){
		var documentGZA=document,scriptGZA=documentGZA.createElement("script");
		scriptGZA.type = "application/javascript";
		scriptGZA.textContent = "("+fonctionGZA.toString()+")()";
		(documentGZA.body||documentGZA.head||documentGZA.documentElement).appendChild(scriptGZA);
		scriptGZA.parentNode.removeChild(scriptGZA)
	})(function(){

	/////////////////////////////////////////////////////////
	//
	// DÉCLARATION DES CONSTANTES
	//
	/////////////////////////////////////////////////////////

	//MISE À JOUR
	var VERSION 			= "1.7" ;
	var NUMERO_SCRIPT		= "95135" ;
	var NB_HISTORY			= 7 ;
	var MENU_maj			= "GZA_" + NUMERO_SCRIPT + "_MAJ" ;
	var DELTA_maj 			= 24 * 3600 ; // 24 h en s
//-----------------------/\

//-----------------------\/

	function maj_a_verifier()
	{
		//
		// Gestion de la màj toute les 24 h
		//

		var heure_dernier_maj = 0 ;
		//Lit le contenu de la variable
		var donnee = localStorage.getItem(MENU_maj) ;
		if (donnee != null)
		{
			heure_dernier_maj = donnee ;
		}

		//Récupération de l'heure actuelle (en s depuis 1970)
		var heure_actuelle = new Date().getTime() / 1000 ;
				
		//Calcul le delta entre la dernière vérif et maintenant
		var delta = heure_actuelle - heure_dernier_maj ;
		if (delta < DELTA_maj) 
		{
//			return false ; //Pas de màj à vérifier
			return true ; //Pas de màj à vérifier
		}
		else
		{
			return true ;
		}
	}
	
	//Fonction de traitement du retour du source de l'iframe
	function trait_ret_iframe(contenu_iframe)
	{
		if (contenu_iframe.origin != "http://userscripts.org") return; //Sort si le retour n'est pas le contenu d'un script
		var version_recuperee = unescape(contenu_iframe.data);
		if (version_recuperee.match(/^\d+/) == NUMERO_SCRIPT)	//vérifie si le message commence par le bon numéro de script
		{
			var script_version = version_recuperee.match(/\/\/ @version+\s*(.*)/)[1]; //Récupération du contenu après @version

			if (script_version != VERSION) //Ne fais rien si la version est identique
			{
				var script_nom = version_recuperee.match(/\/\/ @name+\s*(.*)/)[1]; //Récupération du contenu après @name
				var script_auteur = version_recuperee.match(/\/\/ @release+\s*(.*)/)[1]; //Récupération du contenu après @release

				//
				//Travaille sur les variables @history
				//
				var tab_history = version_recuperee.match(/\/\/ @history+\s*(.*)/g); //Récupération du tableau des lignes

				//Initialisation des variables
				var version_history_precedente	= "" ;
				var nb_version_history_trouvee	= 0 ;
				var contenu_fenetre_history		= "<DIV STYLE='text-align:center;font-weight:bold'>"+script_nom+"<span style='font-size:9px'> "+VERSION+"</span><span style='font-size:11px'>";
				contenu_fenetre_history	+= eval(TheWestApi.displayOutdated.toString().match(/(currentVersionMsg *= *)([^;]+)/)[2].replace("this.version", "\"<span style='color:rgb(34,34,136)'>"+script_version+"</span></span>\""));
				contenu_fenetre_history	+= "</DIV><DIV STYLE='border:1px #DABF83 inset;overflow:auto;height: 250px;margin-top:3px;'><TABLE>";

				//Boucle qui parcours les @history
				for (var i=0 ; i<tab_history.length ; i++)
				{
					ligne 				= tab_history[i].match(/\/\/ @history+\s*(.*)/)[1];
					version_history_avec_espace	= ligne.match(/^[a-zA-Z0-9\.\-\|\/]*\s/)[0] ; //contient les n° de version
					version_history_full = version_history_avec_espace.replace(/(^\s*)|(\s*$)/g,""); //suppression des espaces
					version_history = version_history_full.split("|")[0];
					version_history_date = version_history_full.split("|")[1] || "";

					//Teste si la version a changée
					if (version_history != version_history_precedente)
					{
					if (i>0) contenu_fenetre_history += "</UL></TD></TR>";
						contenu_fenetre_history += "<TR><TD style='border: solid 1px #666666;background: url(../images/profile/settings_profile_input_bg.png);font-size:12px;vertical-align:top;'><B>" + version_history + "</B> <span style='float:right;font-size:10px;font-style:italic'>"+version_history_date+"</span><BR><UL style='margin-bottom:4px;'>" ;
						nb_version_history_trouvee++ ;
						version_history_precedente = version_history ;
					}
					version_history_full=version_history_full.replace("|","\\|");
					var reg = new RegExp(version_history_full + "+\s*(.*)");
					texte_history = ligne.match(reg)[1];
					contenu_fenetre_history += "<LI>" + texte_history + "</LI>" ;
					
					if (i==tab_history.length-1) contenu_fenetre_history += "</UL></TD></TR>";

					//Sort si le nb maximum d'historique est atteint
					if (nb_version_history_trouvee == NB_HISTORY) break ;
				}

				contenu_fenetre_history += "</TABLE></DIV>";
				contenu_fenetre_history	+= "<DIV style='float:left;font-size:10px;margin-top:2px;margin-left:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.website *\?.+(?=['"]['"]\)*,'*\)* *"*\)*<\/div)/)[0].replace(" | ", "").replace(/api.website/g, "\"http://userscripts.org/scripts/show/"+NUMERO_SCRIPT+"\\\"\"+\"\\\" target='_blank'\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<DIV style='float:right;font-size:10px;margin-top:2px;margin-right:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.author *\?.+(?=['"]['"]\)*,\(* *api.website *\?)/)[0].replace(" | ", "").replace(/api.author/g, "\""+script_auteur+"\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<BR><DIV STYLE='margin-bottom:-10px;text-align:center;font-weight:bold'>Install ?</DIV>";

				//Boutons du bas de la fenêtre
/*				var ferme_maj = "javascript:AjaxWindow.close('Mise_a_jour_" + NUMERO_SCRIPT + "');" ;
				contenu_fenetre_history += "<TABLE WIDTH=100%><TR>" ;
				contenu_fenetre_history += "<TD ALIGN='center'><SPAN><A onClick=\"" + ferme_maj + "\" CLASS='button_wrap button' href='http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".user.js'><SPAN CLASS='button_left'></SPAN><SPAN CLASS='button_middle'>" + CHERCHER + "</SPAN><SPAN CLASS='button_right'></SPAN></SPAN></A></SPAN></TD>"
				contenu_fenetre_history += "<TD ALIGN='center'><SPAN><A CLASS='button_wrap button' href=\""+ ferme_maj + "\"><SPAN CLASS='button_left'></SPAN><SPAN CLASS='button_middle'>" + ANNULER + "</SPAN><SPAN CLASS='button_right'></SPAN><SPAN STYLE='clear: both;'></SPAN></A></SPAN></TD>" ;
				contenu_fenetre_history += "</TR></TABLE>" ;
*/
				//Affichage de la fenêtre
//				AjaxWindow.show("Mise_a_jour", undefined, NUMERO_SCRIPT, contenu_fenetre_history, {title:script_nom}, true);
/* new MessageBox({
	            title: "Mise_a_jour",
	            message: contenu_fenetre_history,
	            width: 480,
	            height: undefined,
	            options: [ ['ok'] ],
	            cancelOnOutsideClick: false
	        }).show();*/

//-----------Safari installer------------\/

	var funcIframeInstaller = function () {
		try{
		var n = this;	
		if (n.safari)	{//
				var top = (window.innerHeight - 350) / 2;
				var left = (window.innerWidth - 500) / 2;

				if ((document.getElementById('greaseSafari-installer'))) {
					$('greaseSafari-installer').setAttribute('style', '-webkit-box-shadow: 4px 4px 4px rgba(0,0,0,0.5);display:block;z-index:90000;border-radius:10px;background:-webkit-gradient(linear, left top, left bottom, from(rgba(246,246,246,0.7)), to(rgba(202,202,202,0.7)));position:fixed;height:350px;width:500px;left:' + left + 'px;top:' + top + 'px;');
				}
			
		}else{
			//alert("else");
				location.href = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".user.js";
			}
		}catch(e){}
	}
    showMessage(contenu_fenetre_history, "Script Updater by [<a href='http://scripts-o-maniacs.leforum.eu' target='_blank'>SOM</a>]", 400, undefined, [["ok", funcIframeInstaller], ["cancel"]]);			

//-----------Safari installer------------/\
				//Titre en centré
//				document.getElementById("window_Mise_a_jour_" + NUMERO_SCRIPT).getElementsByTagName("h2")[0].style.cssText = "text-align:center";

			}

			//Stocke l'heure de la dernière vérif
			var heure_actuelle = new Date().getTime() / 1000 ;
			localStorage.setItem(MENU_maj,heure_actuelle) ;
		}
	}
//-----------------------/\


	function init(v) {

	/*Check for Opera*/
	if (!window.location.href.match(/http:\/\/.+\.the-west\..*\/game\.php.*/i)) {
		return;
	} /*  Language Settings */
	var lang = window.location.href.substring(window.location.href.indexOf("//") + 2, window.location.href.indexOf("//") + 4);
	chatY.resourceBundle = chatY.getLanguage(lang);
	this.myVersion =v;
	this.banpub='iVBORw0KGgoAAAANSUhEUgAAAfQAAABKCAIAAADCAzFsAAAACXBIWXMAAAsTAAALEwEAmpwYAAAPY2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarVd5ONRv1z/fmTFjnRhjyTpCyRayy76vMWStGDNjHWOMQUSWFi1a+JGIitKiZCuRkhIVSkIKpeKnBS1IJOb9g/q91/Nc7/v885w/7utzf+5z7vM557qv674OgIgMhcVioAAgislhk+2tSL5+/iTcICAgAxhQAiKFGsuydHd3gf/TZp8DAgDQo0FhsRj7HX6WEfuJXTJpvbZnZE5Kwf9veLavnz8Aog4AxNBlbAEAxOBl7AUAxAQOiwOAhAEAkRpGoQEgyQCgzvYiWwMgFwEAH7qM6wEAH7yMHwIAPp4aygFAXgBgCUxaOBMANwGANaPRY6kAeHUAoNFiqVEA+GMAKLOoqGgagPBTAFChstgcAOE5AFDy9fMnLUsOQQMYdwBgB//hIucAKg8AKEz/wykNAIi1AZT7/MNNkwEBAES8KzZkow4AACCCVgA8r7nc6bUAuByAxWwud6GUy108C4AeAmhmUOPY8Sv9QpDHAP9pv1zziqERABQAyEMUjCCByCSqAO2HUeURx6JxRF5TPjr/GYFJISt80apfItGEcSJFbFIiRHJaKlEGI5srL006vUZTsVHZfG2LiuP6JjV79UZN+Q352midHRuf6enrFxtMG9kY55l8MjUzSzC/bolYWVhvtzlu22H32UHAUdXJzpnqkuqa79aw+a0HirzO08Urcss+7xKfO779ftMBq7dqb7PeTglMDsqhlAXfoHbQBujjIQthfOGiETKRCoy1URuYOtGGLIMYI7ZOrBpnfZxCvGQCcQf/jsXEz0mDOx8l30i5tCs3NTUtIt01Q3+3/B7+PV/3du+7npm7f/cB2kHbQ4pZqKyPh0ePLByTydbP2fzX9ty4vIPHr+Q3nuguGCr8UsRXLHlK6bTeGbsSr9LtZ8POJZTtPJ954djFQ5eOlmdfzrmSU1F8taAypyqrek/Nztq4azHXqXXeN1zqLRp0bio2EhqXbk3cHmhqulPVfPzurnuhLZ73N7WubRNpm38w/LDxUVn7wQ5Op89jjcezTy53bXsq/LSlO/qZ/LO+nozeDb2v+7Kemzwf7y944fRi4eWFAd9B/sGGIforsVedrxOH1w+/eXPsrcXbqXcXRvxH8aNtf+8a0xubeF/2gfZR8ePgp8Lx7ROKE6OTVz4nfLH+iv/64Vv91LHp6BmP70azaj/U5jTmzX+GLZQv4pfquVwAEAZD4MA9hITsR7ioHLQ+egJzm6cIexR3nLeCr0cALegslI1/I2wqclIUS4wUeyxhKFkhJSWdLDMiZyF/XkFoTZhip7LW2sx1Q+tVVNlqLRpETa8NeVpDOoobfXXP6g0YgKGxUbxxicnDTVNmCubuFqGWOVaV1g9tRmyX7KUcDBzdnejOHJc01yy305tr3Js9OsjPPce8prbMei/5CvkR/EUDZLYqbJPZLh0oHSRNkQ+WoorRROl8IRAyH/o57F34i4jOyFuMK1HFzCPRaazYmFC2R6wNRztOLl4wfj5hdMezxNtJF3bmJe9NCd+1NdUuTTtdKgOdMbl7aE/f3uF9XzN/HeA5yH9IJEv2sPoRvaNmxyyyHXMC/qLk0vJYx3fm7z1xqOBo4ZmTJUWVxY2nWk8/OfO85FXpyNmJcz/Poy/wXsRfkixXuax7xbTC8Sq50reKXh1Xk1y759qR64V1l2/crr/X0HnzXePYrdkm3juEZpm7qvdMWjzu01vZbckPdj6kPrJuV2hf7OjuvPo48wm1y/yp+NMP3S3PintYvTZ9Un1fnjf357+IeGk2QBh4NVg9lPkq8LXuMG743Ztrbw+9o4wYjAqOfvi7bazsffqHbR83fSKN84xPTnRO1n0u/ZL1dce3sCn/afcZx++Ws8Y/9Ob05g1/blow/WW36L5E4TpxuQCABy2gwgWYRzyRBpQa6hJaB92KofEI8dzHpuIsefl53/Ld4i8USBNkCtHwW1d5C28RIRN8RbcRKWIR4okSmZLZq4ulaqTvyrTJ9st9kv9GmluDKAoo8SoT1q5aJ6gitZ5PFaOGqE2rT2gMaT7aUKdVrJ2mQ99oraupx6v3Tr/ZoMRwjxHN2MpE2uT7pj7TOrNcc6aFg6WaFWI1ZH3Lpsg2wc7NXsNBwGHMsdmpwJnlYucq4zrr1rH5jPsODyeyEnnW85HXqS0x3lY+BJ9R31q/NH/PANmA91uvbUvf7hEoH/ghqIqSGGxLXUV9STtLZ4Roh3wPbQhLDXeLEI3ojyxmhEepRn1l1kfvYrnEEGIG2GWxTI5ZHF9cb3xpAnOHYSImsTupeGdUsmmKUMrQrsupSWnk9DXpMxkPdxftid9rv09m30xm5/7SA4kHyYdUs1BZA4drj+QdjT7mkE3Kns95/ld9bl4e+7hT/roTmBPDBbcLT52MK/Ip1jtFPA1nUCWCpYSzxHMSZdLn5S/IX5S+JFkudpl4RbSCeFWsUrJKulq6RqxW4pr8dZU6jRsa9boNVjc9Gim3Ym/vayq+86B5+O5Ci9J9p9aktuoHHx8ptQd1lHbOPfHsquoWfpbQM913oF/0Re1AzNDGV4vDC+8wo/Zjlz8aTxh/OTxdP1/J5QIs/30AAFh9gBOBAH6yAB72AFmbANYZAogFAbgLAXgZAUqTCMj3e4BYHf3zf6wGY/CHZCiGuzCCYBAVxAVhIblIAzKMwqI0UVtQKagy1FPUPFoR7YFOQZejX2J4MYaYMEwh5gkPmseQJ4rnLM8gVgzrjj2EfYDjxdnj9uIe8ArxevMW8o7wafBx+O7zi/HT+GsFcAKBAvWCBMEowYdCykKHhKbxPvibq5RXFQsLCu8U/irCFJkkRBG+inJE54m7xQTFjolLiJ+T0JS4KeksObw6Xopf6py0pfRLGZasqGyDnJ/cL/lzpM2kJYXyNdsUCYqtSinKhso/1jasS1WxWy+w/qXqObVEdScNFU0ezeENrVoXtQ/qJGyk627V89TfbGBraGfkaOxmErQp3DTBLMO8xKLBcsjqsw3B1sgu1D7HodyxzOmYc7pLkivLLX5zjHuMB53M9Iz2St2S5X3YJ9/3qt89/+6Asa3c7XKBpkE+lIzgUuojOjpEO5QWVhjeEwkMq6j9zKcs6Zhw9vXYpbig+LodQonMpKfJeilnU0XSdqVzdzP2TO6Lypw4EHbwSxbr8NzRPdkqOTW5znl9+bsK7E96FTNO7y25cbbrPOaiYXnMlbKrI9Wra0Oun7rx/uamW7FNXXeFWiitNx4i7X6dp5+Md5v2HOhrfEEY8BhKf33/zdSIxN8O78kf48d3TaZ8ifvmPy0/MzZbMKc+f2GB7xd5cftSGpcLANoQAsehFb4hcogjwkFOI+3ILIqEckEloS6getFotA6ags5Bt6LnMRqYIMxxzGMeHI8VTwrPLZ6fWCNsIvY2DnA2uAO4Z7wyvGG89Xx8fP58l/mW+H34qwUEBOgCdwWVBdMF3wk5C93Ek/CZ+NlV4ateCXsIt4oYi9wm6BGui5qI3iU6ELvFAsTGxOMkcBKnJA0ln69mSQlIlUu7Ss/IFMqayY7LnZJ3lp8jVSlErJFfM6hYohSsvE55Ym3VujSVzetl1/9QfaJ2Xn2/Roim/QYtLSltrPaMzsjGZ7otes361wxqDWuNaowbTJo2tZn2mr0x/2SJscJbr7Mxs91ql2Sf71DhWONU7nzZpdK1we3B5m73fo9h8jcvZIuct4aPoe8WP47/gYDSrXe2vQ3EBslRnIMjqIdptfShUFyYfnhIREHkPcYUUzWayiqOeRwLHJO4+PjqhKlEw6SYnRXJP3aZp+5L68gQ2u22p2TvVKbm/oMH+g/JZbEPdxwlHYvNvvfXqtzgvHv5CicKCy1OjhcXng4sESvtOZd13vWi0qX3lysrsiqDqg1qZa7N1A3VN9y8dqu4Kb2Zdi/g/qY23YekdtFOocdzXcPdrT11fRf7D71kDDq9MhsWfzP1rne0Yizjg/cnufHxycYvmd9cp/Ez7bN5c64/hRZuLTK5XAAwggS4DjPIRiQGqUFmUHqoHajbaBTaHn0Y/Rwjj2Fg6nmwPD48l3gWsG7YMiwX54ur4hXmjeV9xqfLV8yP42fzDwt4CdwXNBWsF1IXqsXr4m+ssl7VIbxdeFrkIEGd0CkaT5QktouliGuJv5XIlySvJq7ul8qT9pNRlJmSvSmXLU8lbVQQUJhY06Z4TilTOXptwDoXFbP1mqpqamvUFTXkNFU2aGgZaDvoBGyM1j2qd0G/y+CHkbyxvUnspgrTMXM5i62WJ62GbdRtU+16HaQcOU49LsquR9wm3MkeVzxXe6Vs+eDj6NvgvyYgZxvv9qTAaUpI8ADNk94V6hZ2J8ImsinKglnHsohpjjXnPIh3S+hJDEz6lJyYMpeamS6dUbPHfm9XJnX//MGiLJ3DvUfZ2YI5N3PJeYv5RQWEwviTg8Xup+6e0S+5dFbuXOn5tRfKL2mW114xqLhVaVHVWuNY+/Y6u262PqlhsfGv28pNF5tV715p0bxf2ab14MojfHtWp8Bj9pORpx7dVT34Xkbfo37lF2kvnw9KDvm+OvG6/43YW/K7zJGroy1/D45xP4h9VPy0ZlxhQn5S9vPqz4tfXn9t+lY8FTatPT09U/09apY02/cjbk5w7ty87vydn84/2xeMFi7+kviV/Ovhothi8OLVxYUl+6VjSy+5ilwGt47LBVielwAAgN86mhHNJrlY28B/16IYcb9zEABAkBnstnkFf2Bx3L0AQBwAfsbGe9oCgDAAIhwSbue4gkk0io0zAMgAIFpJYdZuACAIgLiEsO3Iy/cgvhEUJ3cAwAMgEXTmFs8VfgeL4e6ygg+yOFZkAJAEQIrosba/fa4lhXn5rMS2sePIWwBACQDpjYx2Jq/kmqPRbVa0oTBMhpvLsmYUMZzj6AUARACUKtgBBdgQCnTQABewBpuVlQQUIIE1RAMb6BALdjAKbAj94+UNo8CG8H+J0oAQoAAb4oEOsRAJY8CGqMDwDDaQVjweARXYQAHmb0brstZHrV9/zq0hGhgQDf9EOP8b81vhP77hQIPoPzz1Nx8YnsGOqgmJPxGdaOwdhlmL0cHoYawwphgzjBGQMOIYKdDA6GIMMZYYc4wJRg9j9GTixsSfPMu9Cf5TozMwgA5xwAY6MP+tX9T/pQaWZ3cAAKwwQNEBAICW6iKFf31nHPoODgCAdTQrkR0eGsYhWbJYDLo6yZFJ1VQn6Whpa8P/ALgXVGMY2AJvAAAAIGNIUk0AAG2YAABzjgAA4uQAAIb7AAB14QAAzXMAADKtAAAa3euge1MAANC9SURBVHja7P13mGVXdSYOr51OvDlUzqFzDmrlhBICJBFsgsE4YTAY5zj+mJ/D2GOPIzPGHhtMMGHIQaCAEsrqVudY3ZVz1a2b04k7fH/c6pYwMkiCGcDWflr9PLpVfe++55z97ne/611roZMP/xH8aAzfl4vz/pkzF/ILC6VaWQnlBCpf891QOL5UAEEoMAZKCOdCIyARRUhRAkgBIQRhZhkQQRITFLGN/oGBm2+7qqMD/9+YqlLw9MMTR+6/T5BozZWeEEgpLgVXwufSF5IDeEohgEw8vmf76J7LtrVlaDJlmSb9Qc2Bc/XEk/P/81/urtUbjBCLIYWwxAQAFCCKEWNEKYUAKQCCZMSws53t8VikUW8sLa82XVcq5Tj+wPDAr/3CHSNDGkIv6nM9T83NNbiAiEn3dEVXa9Vmia8FzuRC+eTY4vTZqYbktBESCYgg4XpKisGtg+/77Tdl0jrG8CI/5ZXxyvjPNS6tC/UDe0v6I/LVglAdPLh45tnjitcCDpWa6/i87qtSk1MEXIEQSikIpKREAkDIAeOAYhQESCnAiGualJz4WMZ0FQYIybnz57sz2ZHW7/9gR6PBjz99motYLfCDQIQSEABHILgKZMgDBQAYlA+wuJaf+Mby1x54esvowNBI7y03bmnvjBr6D+CyKwVNj3tu4AdcEkVVC9wBIVBKSUykUkiBAqUUUKwCykMuQj/0G47n+74fSgDPD4HzlwS4hoG6u63p2drcfJEFjq1TjMH3+dL4QnFmqdpsOAiZEBqKQIgcKVUQnjk1PT61lkptAOkRol5ZyK+M/8wgjlpAjhBax3QE0Fq2rXWtQCmlfgDL5EcC3IXA42P5c0ePu06l6QlHcN/nHkeOL6RErpRKKSEkxkhnNAi5VErXqK5pfhiCUjyUgIExBEL4CgcKiPJcH3IrZdfB0egPHtzPnliprOZNjUkpMaD13VYBKEAADCFfKQ1QCIAwjkR0KeH42MSJk+dPn5q8/Kqtt9y4O50i3yeHlUq5vhcKjgG1+LBCCBBcfCxU62lBgNSl6YGSCPlKKiURQkiBQshEipLWE/Zin6dIhIwMRWcIOT2/ZhGFKa7XvPMTi9OreUWwTkGTmBAUusrAmq+B6wdf//JjO7d1xqL0ldX9yvhPiuoIAQKEMEIIYwwYXcL51g+VAqWkElJKCUopJb9PFv8jsdiarjx97IxoVoQAgcFxhSdx0wu9UCqlEAAmSCmkMSKkkkoBgJQASuoEmr6QAAxjJbnEiguWr4YRg0giV3Jlz/OiP2hAcV124dAJqoVNoArJQKFvO1itQ2kL6pVSgAAQgG3qSpOnx2fH55YtzXzN7ZsZ+74kIwQgw1DwEDC69IoCQAghhAjBoFBrOgghAKVgXaIRCpBSLYqAFPI4T6YIQt/tOWrUw4ZHPNcHCV4QgEJKhEDNeDJRK1e9mtssVCZyxXooo4wRJTGgUElm4tBVumIYBadOTj10/+nX3LFD18kr6/yV8R+Wj7dI+LefsS/CN8IYY4IxIZgQhDFCGNAlAq9ayC6EECGXQkj5/fL3Hz64C4EvnFstrK0FQHwRhkEoAtV0ecBlyCWjRAGEIQeAIBSgAAAppYQQDVcAACNEYSWECpEkuiZFKBSWhIIIy6WVSt3PZOgPVuedm1tbXFqlyAyFkBy3TlOX2PLzbvJz+glCoAAQxklTa/rB3NQCIVsAQEqFEJZScS4AgFICAORFo58fCs8XmkYVQIMrhrhBBCcMAOF1tFYArc8GBEhJSQJHydaUW4dBRXQzDH0A6wU/opCHhfm8lBxTHRMkBG/WmkzTRBg0mgWhlOOF0veLpWrDD6mmSS4ElS7GlkQSFMKgBGAAEPIr9zxz/c1bXgH3V8Z/KEBHCCG49N9FsL7E89bxGSHAGGNKCWWEUkwwF1IBMI3puraWK+fXShigvTNl6BZCLg8BuJJKfj/4/qMA7sr1QiUl8FCAooQiESiJDII0gzRDxYVssfXW1cMIYYQAQGM44CrggjGCsBJStTZAiymmpMeh2XTPjS3192zVtPAFP9rzBCEaY+LFz5ZzmJuYqzcD3TIlV1woAaAAOALEhRTP3QkJ64KIAsSFoqAAIaQU0oyzE/NLixXB+cpyTSqt0nCWciWGoKMthQgdHrDbuzKmjr87tZdSOU0vFFLH65Q9kAqB0ogSSoWcM0ZarF2uHyMg8H0HaZKHQmKpRMiFBDApkvzfvQKajhO2cdmGNBDd8xw38GeXAQsUNMIFTguFWhiEknuLxUoyYlkR2w88yQMEIIRACFEDBVwSwBEkl5dzX/va8dtv396etV9BhlfGj7vG0qLiCGOMMcIIYbz+SkudXcd12dLQASFCKaE609nxo+ePHhqTUmFKOrozbsM7fmTMso1TR8e3bB/6zT/4eUO3AByulPr+yPsPH9wZQz19iSNPEyGU8KUPghOqUSW5ElKGXLSkBo0SBeAHocYoweAFUkpJCCileCg1RhQoBYogKqWSiCAkQy/0fQ/gBXi7Umgt7z302Nl63d8wHBsd6urtTb6Y2ZZL/omnTiOkpJCeFAJAtMQPIblSPhIgMFcClPKUChFgQEIBlmBgUBh8RgwE5Url7//3Nz03KBUrxWI5AEkAYQANKUlIf1fb0Kah3TsG9+0dicbQvw/uwvd9jNHFYx8AgC8RhCFhOiDUkmVCLhECQEgpAIQChCXIlpiHkEJKKYIB/7u7SCwm52d5seJsHTKKIUGIdiWiTi2sI18XPiPgNmrjc2u5mpdIJKUUkhkcIxkEUgmLmIAQZoFSFhKuLsXdX/3W4sLqm99yzfBglvxfCHS/Ml4ZPzB15dv493cgO8aYEEIJJhQTijHFFGMMmGBApFFvhCEXnMcTEQRIKYkwIpQtr5S+8tmHFxfXMCDX8xZmVl3XD/wgErWVVFt3DT/9+HEFH/6tP/hZQ9OUlFJI9H0EV3/44I6QJDhUhAEAY6Tpi0ACA17kMpRqXdNQqqVBIYQcL5BKWYYGCvxAYIIpRQqAYMAIKYxDIahQli4V1UCBki9ASz03fPiR0x/95L2+UF3ZWEcm+fPvfPX2HZ0Y/7uIUyoqwzDOHh4rFsqRaFRKSVpbtWzdewQEG4BAKcEQAmQqpRCEIBRXPkFKKC+UHAAp8KU4dvICYEwwQhqLYcTwulgvMVpYK04trp44fObcqW2ve/1VfX0vzHM1jXmhAFDrGp9SLWndF2AxUFJJrKRSXEhAQDHmUvCQI4x4KKRUQkgApBDSkMLfNXDTN5g4OlW+sFip+5xgmdaQ56qVphvUHS+/dn6huFANKNOE4AiwLgUDWZecU6pAUMSoRryA+6AQgC/E7OkLn6o373rLLTu2Z+kr4dVXxo8ME4eWmtnSwdcpoFrn3fAcwraQnVBCGKNMo5q+mivOzaw2G04kZm/fvaFerTx47zNKqdWlQjwRed9v/hRCAgAV8pV/+dCXJ87PlQrV9q50OpPo6WsvlaqMsdWlvBACAAxDf+ieY7v3bX7tXVdhSjHnreDqjyu4A4Dv+ozgkDEdSxZqmqzXuUQITIZchYWQAMBlS1oAggnFiBJCsYqYuhdyISQhCiMkRWjpDBhBSvEQMeDCD8ULMXdCaTxqJi3a8FWlUq+Wa//w0ft+9T1v6GgnPDCr9WahWK3V6uWVoiukVLjecMqFCpd+rdRoclGu1UEpCUpTqGUs5whCpEAhAMlDEQBIIUIBEhQo4KBAQWtzagU9NV1rzURHwPCl26cUxpQyorGq7z/4yMG5+ZX3/9pP9vSY3xk2qJZxs9awDF2jJOCiFTUFjBGoMOSaRjkXat0iA6HkoRBeGCgEQegpyYWUCCAIOADS2Hd7DGJRtHVLYnXNUz6uVWuz5abv81ChYrl56PxaiLFpMsUlwwpJKZGSmDoYa+unCaRAcsqFQmDoGCPLIM2V5U//01f4z712//6uV2zvr4z/J8o4PBfofM7dpp6j5QgwxggTQkkL3wFASamkkFJKIeGid2WdszOmGYYEdOrU5NOPn3Cb/spyPgh4/s8/pWmaZrBaudbd1/Hko0eLherv/ckvRKKRb3zlicnzc42a093fAUqdPj4ReEG2M1Ur19s6U4VcKQy4YepMc04eG7/ttVcSSjkmCImXrcv8SIC7bZuGwRoVgRRCCDBCCiGKASGgWBFMMEIhF1IB58ILecTQpZJSIgmhkgpjpC6KL0JBwsYqkE1AkmlEZy8YTtU0eNWrtrYlIo89eHixXFleLeWXlv75Q59NZ9OLy4VSo97wQy9YJ8Ot925trS1V7VKQ5FIkfB2e1/U2wAgUAuOi3bHlVmkFOS/9IwVgtJB9HQaRwFhh1BLnCSMI4MLE3Cc//s33/+pd0di/kZVgarl4YWaZMaprjBCMEFIKKCGUIECAMaIYUYKUAi4wITJm2aZlKwWGZgS6UAhLBYxxPwwJ0b77DdI03NfTirgarVfW8v7DpbpgGsaghyEF6WGkCDCpKMFK1zmABkhxiQB0ziSjPpYIwKJaUjfqvveNzz80MvITqZT5Cv58/0MpNTtT7+mNfJ8WrP8gosq3G8gRavkP0bf5WFrByou8uAXshDFMiAIkpAJQumlLEQjOBeeSCyVlSyImlDBNA0Lv++qT//rhryOkuvs6EunY5OHzBCMpJCa4VKwNjfbpGnvg68/EEtE3/8yrl5dyYcgrlfrQht6VxTWlVDITv+7myyJRc352tVZpOI5nmIYQ4Lq+64cRU0cYfT/s50cC3HVD13VdCikAS+lLTChSrpAEtcRlUEghhJSUlBILIwnK87mQEjDGABolOkUKABALvaBBWFRHmpCAECMEEIQB8kLFBY7ail5MojEM2H9V/8Bw+8Jy6Zmj0+MX5g6fnWmcX4oaDCPcekyQUut2EwSE4JavsQXf6/B80Z4Kl/xMAAiBThBB62HMi6e55z+CLc6uNAxSIVCgMBIUo4vQ32ITGBDV2fHjYwcPbrzuho0aw1KCUlrIXUMnwg/yxQrBWAqCEEagMEgRCgQUYUwJZZQwTUMIEUwoxrGIacXjpmW5rlsqlkTIFQbX9TFl80veplEL4Ze0H9OlQtUiSCqBQElABmCiBCWYKIEIqyuMuHLChpDCpeARhQFCCYamYgZihFRL5a9/+dm3/fQNTHtFfH8x8A1KKYxREIhi0c1mrRNH13r6Ih2dEQCYnqre+7WF9//m9v98fPw5TWXdsnKJpKN1ZG9RcryeHo0uCi4t16FQQiqlEMaEUqbpR49eqFaanhcuLeSuuWH3zt2jYRCEfsBRILhASmGCCaWEmV/54iOf++T9sYQdi9pSyhOHznX2tIdBUMxXS4VljHEQhKZtKVXzXO+pR48hhBhjiWSkUXeCIHSd8MDVo7/3x+9yHPTVz31DKRge7fnGF7+FCdRrjWbdiZoGQhftd+rHFtxbgWYACDkXQgICjRFNKkaZ64VeGAIGUKrlDNU1AlJYBkvG9A5db1KjXK06wkMI6Zg2uPBCiQUgrHTCKcIAyvPwSokVq82tIyxmf9t1ynYY2Y6uHTt65xcLh48vXTg7+eihc/JS6k+LDyPUstuvZxpc9LO3HhL03EFPtX5DKOAK8LoF8SLEK0AXb1PrDRhGUikAJSlRCJ4ftkEASiGJEZXKDfz77zu0/7IhLaEHoTpxJreay3Uk6NnxnBtIgwHFAVeYIAVCEopDLltOGM4J9gKEgFFCCQvC0Aq4YTZ8P/DDABQgrpRQYcPxHA9h6yXdsiPHFnK5';
	this.CRimg='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'
	this.uriParam='';
	this.loadParam();
	this.addCRButton();
	}

	function addCRButton() {
		var menuElem = new Element('div', {
			'id': 'menu_chatroom'
		});
		menuElem.innerHTML = '<a href="#" ><img  alt="" src="images/transparent.png" width="128px" height="25px" onclick="chatY.openChatWindow();" style="z-index:300; background-image:url(data:image/png;base64,'+this.CRimg+');" onmouseover ="this.style.backgroundPosition = \'0px -25px\';" onmouseout ="this.style.backgroundPosition = \'0px 0px\';" ></img></a>';																																										
		menuElem.injectAfter($('menu_forts'));
		var marginTop = parseInt($('workbar_right').getStyle('margin-top')) + 27;
		$('workbar_right').setStyle('margin-top', marginTop + 'px');
	}

	function changeServMib()	{
		var selectedSrvMib = $('serverMibList').options[$('serverMibList').selectedIndex].value;
		if (selectedSrvMib == 'wbe01')
			this.serverMib = 'http://wbe01.mibbit.com/?settings=655b397c88cdfeb5fd5aec7bb968d015&server=irc.Mibbit.Net&channel=%23som'+this.uriParam+'&PromptPass=true';
		if (selectedSrvMib == 'wbe02')
			this.serverMib = 'http://wbe02.mibbit.com/?settings=655b397c88cdfeb5fd5aec7bb968d015&server=irc.Mibbit.Net&channel=%23som'+this.uriParam+'&PromptPass=true';
		if (selectedSrvMib == 'wbe04')
			this.serverMib = 'http://wbe04.mibbit.com/?settings=655b397c88cdfeb5fd5aec7bb968d015&server=irc.Mibbit.Net&channel=%23som'+this.uriParam+'&PromptPass=true';
	
		$('iframeMib').contentWindow.location.replace(this.serverMib);
	}

	function openChatWindow() {
	var loopOK = 1;
	if (this.uriParam != '') {
		while (loopOK == 1) {
			var salon = prompt("entrer le nom du #salon que vous souhaitez rejoindre");
			if (salon !=null){
				if ((salon.indexOf('#',0) != '-1') && (salon.indexOf(' ') == '-1')) {
					this.uriParam = ',%23' + salon.substring(1,salon.length) + this.uriParam ;
					loopOK=0;
				}else{
					alert("attention pensez au # avant le nom du salon et à supprimer les espaces");
				}
			}else{
				loopOK=0;
			}
		}		
	}else{
		while (loopOK == 1) {
			var salon = prompt("entrer le nom du #salon que vous souhaitez rejoindre");
			if (salon !=null){
				if ((salon.indexOf('#',0) != '-1') && (salon.indexOf(' ') == '-1')) {
					this.uriParam = ',%23' + salon.substring(1,salon.length);
					loopOK=0;
				}else{
					alert("attention pensez au # avant le nom du salon et à supprimer les espaces");
				}
			}else{
				loopOK=0;
			}
		}		
	}
	this.serverMib = 'http://wbe01.mibbit.com/?settings=655b397c88cdfeb5fd5aec7bb968d015&server=irc.Mibbit.Net&channel=%23som'+this.uriParam+'&PromptPass=true';
		var windowName = 'Chatting_space';
		var group = 'Chat';

		$ES('.mousepopup').each(function (el) {
			el.setStyle('visibility', 'hidden')
		});

		var window_div = $('window_' + windowName);
		if (!window_div) {
			window_div = new Element('div', {
				'id': 'window_' + windowName,
				'class': 'window'
			});
			AjaxWindow.windows[windowName] = window_div;
			window_div.injectInside('windows');
			window_div.centerLeft();
		} else {
			window_div.empty();
		}
		AjaxWindow.bringToTop(window_div);

		
		var xhtml = '<div id="window_" class="window css_job" style="z-index: 103; top: 0px; left: 0px; position: absolute; background-image: url(http://bananapple.free.fr/ChatBG.png); ">';
		xhtml += '<div class="window_borders">';
		xhtml += '  <h2 id="window_' + windowName + '_title" class="window_title" style="background-image:url(img.php?type=window_title&value=Chat);"><span>' + windowName + '</span></h2>';
		xhtml += '  <a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a>';
		xhtml += '  <a href="javascript:AjaxWindow.toggleSize(\'' + windowName + '\', \'' + group + '\');" class="window_minimize"></a>';
		xhtml += '  <a href="javascript:AjaxWindow.close(\'' + windowName + '\');" class="window_close"></a>';
		xhtml += '  <div id="window_' + windowName + '_content" class="window_content">';
		xhtml += '    <div class="tab_container" style="margin-left:7px; width:100%; height:275px">';
		xhtml += '      <ul class="tabs">';
		xhtml += '        <li class="active" id="chat.tab.1" onclick="chatY.showTab(this);">Miaou</li>'; 
		xhtml += '        <li id="chat.tab.2" onclick="chatY.showTab(this);">Aide</li>';
		xhtml += '      </ul>';
		xhtml += '	<table>';
		xhtml += '		<tr>';
		xhtml += '			<td>';
		xhtml += '			<div id="chat.tab.1.div">';
		xhtml += '				<div id="pubSOMDIV" style ="width:500px; height:74px; position:absolute; top:67px; left:50px; z-index:10;">';
		xhtml += '					<a href="http://forum.the-west.fr/showthread.php?t=13200&highlight=script" target= "_blank"><img alt="" src="images/transparent.png" width="500px" height="74px" style="background-image:url(http://bananapple.free.fr/banpub.png);"></a>';
		xhtml += '				</div>';
		xhtml += '				<table>';
		xhtml += '					<tr>';
		xhtml += '							<td style="position:relative; z-index: 70;"colspan="2">';
		xhtml += '							</td>';
		xhtml += '						</tr>';
		xhtml += '						<tr>';
//z-index -1 ok chrome & safari
		xhtml += '							<td colspan="2"style="position:relative;z-index:0;">';
		xhtml += '								<iframe id="iframeMib"  width="550" height="350" src="'+this.serverMib+'" allowtransparency="false"></iframe>';
		xhtml += '							</td>';
		xhtml += '							<td>	<span style="position:absolute; top:120px;">';
		xhtml += '								<UL>';
		xhtml += '									<li><b>/nick <i>pseudo</i></b><br>';
		xhtml += '									<li> <b>/ns identify <i>motdepasse</i></b>';
		xhtml += '									<li><b>/j <i>#som</i></b><br>';
		xhtml += '					 			</UL><br>';
		xhtml += '								<select id="serverMibList" size="1" style="width:125px" onChange="chatY.changeServMib()">';
		xhtml += '									<option value="wbe01">wbe01.mibbit.com</option>';
		xhtml += '									<option value="wbe02">wbe02.mibbit.com</option>';
		xhtml += '									<option value="wbe04">wbe04.mibbit.com</option>';
		xhtml += '								</select>';
		xhtml += '							</span></td>';
		xhtml += '						</tr>';
		xhtml += '					</table>';
		xhtml += '				</div>';
		xhtml += '			</td>';
		xhtml += '			<td>';
		xhtml += '			<div style="display:none;padding:5px;" id="chat.tab.2.div">';	
		xhtml += '			<span style="position:absolute; left:295px; top:50px;">';
		xhtml += '			<UL>';
		xhtml += '					<li>changer de pseudo <b>/nick <i>pseudo</i></b><br>';
		xhtml += '					<li>s\'enregistrer <b>/ns register <i>tonMotDePasse email@email.com</i></b><br>';
		xhtml += '					<li>confirmer l\'enregistrement <b>/ns confirm <i>code</i></b><br>';
		xhtml += '					<i>le code de confirmation se trouve dans l\'email que mibbit envoie après l\'enregistrement</i><br><br>';
		xhtml += '					<li>s\'identifier à chaque connexion <b>/ns identify <i>motdepasse</i></b>';
		xhtml += '			</UL>';
		xhtml += '<br><br>for auto join use a comma separated channel list like :<br><i> %23ch1,%23ch2%20key1,key2</i><br>';
		xhtml += '			<INPUT id="uriParamTxt" style="width:200px" type="text" >';
		xhtml += '			<INPUT onclick=chatY.saveParam($(\'uriParamTxt\').value) type=button value="save">';
		xhtml += '			</span>';
		xhtml += '			</div>';
		xhtml += '		</td>';
		xhtml += '	</tr>';
		xhtml += '	</table>';
		xhtml += '	<span style="position:absolute; right:22px; top:19px;">' + chatY.getString('author') + '&nbsp;' + chatY.getAuthor() + '<br>Version:&nbsp;'+this.myVersion+'</span>';
		xhtml += '  <span id="chatY.confBar" style="position:absolute; right:22px;">&nbsp;</span>';
		xhtml += '  </div>';
		xhtml += '</div>';
		xhtml += '</div>';
		window_div.setHTML(xhtml);
		
		$ES('.window_closeall').each(function (el) {
			el.addMousePopup(new MousePopup('<b>' + chatY.getString("dialog.closeAll.popup") + '<\/b>'));
		});
		$ES('.window_minimize').each(function (el) {
			el.addMousePopup(new MousePopup('<b>' + chatY.getString("dialog.minimize.popup") + '<\/b>'));
		});
		$ES('.window_close').each(function (el) {
			el.addMousePopup(new MousePopup('<b>' + chatY.getString("dialog.close.popup") + '<\/b>'));
		});
		var window_title_div = $('window_' + windowName + '_title');
		window_div.makeDraggable({
			handle: window_title_div
		});
		window_title_div.addEvent('dblclick', function () {
			window_div.centerLeft();
			window_div.setStyle('top', 133);
		});
		window_div.addEvent('mousedown', AjaxWindow.bringToTop.bind(AjaxWindow, [window_div]));
		window_title_div.addEvent('mousedown', AjaxWindow.bringToTop.bind(AjaxWindow, [window_div]));
		chatY.loadParam();
	}

	function saveParam(param) {
		var nom = 'TW_CR_Param';
		if ((param!=null)||(param!='')){
			chatY.cre_cook(nom,"",-1);
			chatY.cre_cook(nom,param,30);	
		}
	}

	function loadParam() {
		c=chatY.r_cook('TW_CR_Param');
		if(c!="") {
			if ($('uriParamTxt')!=null) $('uriParamTxt').value = c; 
			this.uriParam =','+ c;
		}	
	}

	function cre_cook(nom,contenu,jours) {
		var expireDate = new Date();
		expireDate.setTime(expireDate.getTime() + jours*24*3600*1000);
		document.cookie = nom + "=" + escape(contenu) + ";expires=" + expireDate.toGMTString();
	}

	function r_cook(nom) {
		var deb,fin;
		deb = document.cookie.indexOf(nom + "=");
		if (deb >= 0) {
			deb += nom.length + 1;
			fin = document.cookie.indexOf(";",deb);
			if (fin < 0) fin = document.cookie.length;
			return unescape(document.cookie.substring(deb,fin));
		}
		return "";
	}
	function showTab(obj) {

		var showTab1 = (obj.id == 'chat.tab.1');
		$('chat.tab.1.div').setStyle('display', showTab1 ? 'block' : 'none');
		$('chat.tab.2.div').setStyle('display', showTab1 ? 'none' : 'block');
		if(showTab1) {
			$('chat.tab.1.div').setStyle('display', 'block');
			$('chat.tab.2.div').setStyle('display', 'none');
			$('chat.tab.1').addClass('active');
			$('chat.tab.2').removeClass('active');
		}else{
			$('chat.tab.1.div').setStyle('display', 'none');
			$('chat.tab.2.div').setStyle('display', 'block');
			$('chat.tab.1').removeClass('active');
			$('chat.tab.2').addClass('active');
		}
}

	function getString(key, param) {
		var str = $defined(chatY.resourceBundle[key]) ? chatY.resourceBundle[key] : key;

		if ($defined(param)) {
			if (!(param instanceof Array)) {
				param = new Array(param);
			}
			for (var i = 0; i < param.length; i++) {
				str = str.replace('%' + (i + 1), param[i]);
			}
		}
		return str;
	};

	function getAuthor() {
		var hrefStr = 'mailto:knownas.y@gmail.com';
		switch (window.location.hostname.substr(0, window.location.hostname.search(/\./))) {
		case 'fr6':
			hrefStr = 'javascript:AjaxWindow.show(\'profile\',{char_id:578826},\'578826\');';
			break;
		default:
			hrefStr = 'mailto:knownas.y@gmail.com';
		}
		return '<a href=\"' + hrefStr + '\">Y.</a>';
	}

	function getLanguage(lang) {
		res = new Array();
		res['en'] = {
			'text.about': 'set your message about chat room',
			'dialog.closeAll.popup': 'Close All',
			'dialog.minimize.popup': 'Minimize',
			'dialog.close.popup': 'Close',

			'message.test': 'this is a test',
			'message.ServerLoaded': 'Loaded %1.',

			'author': 'Author:'
		};


		return (res[lang] != null ? res[lang] : res['en']);
	}
//-----------------------\/
			if (maj_a_verifier())
			{
				//Test safari
				var navigateur = navigator.userAgent.toLowerCase();
//alert("test");
				//Initialisation de la variable
				var scr_script = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".meta.js";

				//Vu que pour chrome, il y a "safari", je teste avant la présence de chrome
				var chrome = navigateur.indexOf("chrome") + 1 ;
				if (!chrome)
				{
					safari = navigateur.indexOf("safari") + 1 ;
					if (safari)
					{
						var scr_script = "http://userscripts.org/scripts/review/" + NUMERO_SCRIPT;
					}
				}

				//
				//IFRAME
				//

				//Écriture dans une iframe le contenu de la source de l'en-tête du script
				var source_script=document.createElement('iframe');

				source_script.setAttribute('id', 'maj_' + NUMERO_SCRIPT);
				source_script.setAttribute('style', 'display:none;');
				//source_script.setAttribute('style', 'display:inline; position:absolute; width:500px; height:600px;');
				source_script.src = scr_script ;

				document.body.appendChild(source_script);
				// Fin de la génération de l'iframe

				// fix for iframe bad content loading
				var f=document.getElementsByTagName("iframe");
				for(var i=0;i<f.length;i++){
					if(f[i].src.substr(f[i].src.length-1)=="#") f[i].src=f[i].src.substr(0,f[i].src.length-1);
					else f[i].src=f[i].src+"#";
				}

				//Ajout d'un évènement pour récupérer le contenu de l'iframe
				window.addEventListener('message', trait_ret_iframe, true);
			}
//-----------------------/\
	var chatYFuncs = ['init', 'cre_cook', 'r_cook', 'loadParam', 'saveParam', 'addCRButton', 'changeServMib','openChatWindow', 'showTab', 'getString', 'getAuthor', 'getLanguage'];

	var chatY_script = document.createElement('script');
	chatY_script.type = 'text/javascript';
	chatY_script.text = 'if(window.chatY == undefined) {\n';
	chatY_script.text += '  window.chatY = new Object();\n';

	for (var i = 0; i < chatYFuncs.length; i++) {
		var chatYFunc = chatYFuncs[i];
		chatY_script.text += '  chatY.' + chatYFunc + ' = ' + eval(chatYFunc.toString()) + '\n';
	};
	chatY_script.text += '  chatY.init('+VERSION+');\n';
	chatY_script.text += '}';
	document.body.appendChild(chatY_script);
//-----------------------\/
	})

//-----------Safari installer------------\/
			var n = this;
			if (n.safari) { 
				if (!(document.getElementById('gsID'))) {
					var gsiSrc =n.safari.extension.baseURI;
					var headID = document.getElementsByTagName("head")[0];         
					var greaseScript = document.createElement('script');
					greaseScript.type = 'text/javascript';
					greaseScript.id = 'gsID';
					greaseScript.src = gsiSrc + 'js/grease_dialog.js';
					headID.appendChild(greaseScript);
				}
				if (!(document.getElementById('greaseSafari-installer'))) {
				//////////////////////////////////////////////////////////////////////////////////////////////////////
				//
				// DÉCLARATION SCRIPT NUMBER POUR SAFARI
				//
				//////////////////////////////////////////////////////////////////////////////////////////////////////
					var scpNum = "95518";
				//////////////////////////////////////////////////////////////////////////////////////////////////////
				 	var iframeSafariInstaller = document.createElement('iframe');
					var href = "http://userscripts.org/scripts/source/"+scpNum+".user.js";
					iframeSafariInstaller.name = 'greaseSafari-installer'+scpNum+'';
					iframeSafariInstaller.id = 'greaseSafari-installer';
					iframeSafariInstaller.src = n.safari.extension.baseURI + 'grease.html';
					document.body.appendChild(iframeSafariInstaller);

					iframeSafariInstaller.onload = function () {
					var data = {
							type: '.user.js',
							original: 'http://userscripts.org/scripts/review/'+scpNum+'',
							src: href
						};
						sendRequest(data, install_response, "NinjaKit.install");
					};
					var top = (window.innerHeight - 350) / 2;
					var left = (window.innerWidth - 500) / 2;
					iframeSafariInstaller.setAttribute('style', '-webkit-box-shadow: 4px 4px 4px rgba(0,0,0,0.5);display:none;z-index:90000;border-radius:10px;background:-webkit-gradient(linear, left top, left bottom, from(rgba(246,246,246,0.7)), to(rgba(202,202,202,0.7)));position:fixed;height:350px;width:500px;left:' + left + 'px;top:' + top + 'px;');
				}
			}

function install_response(meta) {
	window.onmessage = function (evt) {
		if (evt.data.type === 'install') {
			if (meta_json === JSON.stringify(evt.data.meta)) {
				!n.safari && sendRequest({
					type: 'install',
					meta: meta
				}, installed_response);
			}
		} else if (evt.data.type === 'view_source') {
			if (meta_json === JSON.stringify(evt.data.meta)) {
				!n.safari && sendRequest({
					type: 'view_source',
					meta: meta
				});
			}
			installed_response();
		} else if (evt.data.type === 'cancel') {
			installed_response();
		} else if (evt.data.type === 'end') {
			installed_response();
		}
	};
}

function installed_response(meta) {
	document.body.removeChild(iframeSafariInstaller);
	iframeSafariInstaller = null;
}
//-----------Safari installer------------/\

}
else	//Cas du script exécuté dans l'iframe pour la mise à jour
{
	//Création d'une fonction globale pour tout le script
	(function(fonctionGZA2){
		var documentGZA2=document,scriptGZA2=documentGZA2.createElement("script");
		scriptGZA2.type = "application/javascript";
		scriptGZA2.textContent = "("+fonctionGZA2.toString()+")()";
		(documentGZA2.body||documentGZA2.head||documentGZA2.documentElement).appendChild(scriptGZA2);
		scriptGZA2.parentNode.removeChild(scriptGZA2)
	})(function(){

	/////////////////////////////////////////////////////////
	//
	// DÉCLARATION DES CONSTANTES
	//
	/////////////////////////////////////////////////////////

	var NUMERO_SCRIPT	= "95135" ;

	/////////////////////////////////////////////////////////
	//
	// FONCTIONS
	//
	/////////////////////////////////////////////////////////

	//Envoi des informations à la fenêtre principale
	function envoi_info(){
		var destination = window.parent;
		message = String(escape(document.body.textContent));

		//Indiquer le n° du script pour identifier la communication
		if(destination.postMessage) {
			destination.postMessage(NUMERO_SCRIPT + message, '*');
		}
	}

	/////////////////////////////////////////////////////////
	//
	// PROGRAMME PRINCIPAL
	//
	/////////////////////////////////////////////////////////

	envoi_info();
	})
}
//-----------------------/\
