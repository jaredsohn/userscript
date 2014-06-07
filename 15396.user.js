// ==UserScript==
// @name           ShareManga
// @namespace      http://www.sharemanga.com
// @description    Looks for things in the page that look like URLs but aren't hyperlinked, and converts them to clickable links.
// @include	http://www.sharemanga.com/*
// @exclude	http://www.sharemanga.com/index.php?act=Shoutbox*
// ==/UserScript==
	
	/**********************************
	*  Variables 
	**********************************/

	

	
	var cssRules = [
			'body  {margin-top:20px} ',
			'form#GMSHM_form  {position:fixed; top:0; right:0; background:#fff; border:1px solid #5684AD; padding:2px; }',
			'form#GMSHM_form input[type=button] {font-size:9px; background:#D1DCEB; padding:1px; margin:1px; border:2px outset #4C77B6}',
			'form#GMSHM_form input[type=button]:active  {border-style:inset}',
			'form#GMSHM_form input.btnlist  {background:#92D397 !important}',
			'form#GMSHM_form input.activebtnlist  {background-color:#FFA991 !important}',
			'.GMSHList {height:90%; width:50%;  overflow:auto; text-align:left; position:fixed; top:0; left:0; bottom:0; background:#fff; border:1px solid #5684AD; padding:2px;z-index:10000;}',
			'#GMSHM_txtarea  {height:150px; text-align:left; overflow:auto}'
		].join('\n');
		
	/*Variables globales*/
	//document.body = document.getElementsByTagName("BODY")[0];
	var Page = function (url, begin, end) {
		this.url = url;
		this.begin = begin;
		this.end = end;
	}
	
	/*liste des pages d'animes (ed2k lists)*/
	document.AnimeList = [
		new Page("http://www.sharemanga.com/index.php?showtopic=325","<!-- THE POST 2572 -->","<!--IBF.ATTACHMENT_2572-->"), //A a F
		new Page("http://www.sharemanga.com/index.php?showtopic=4855","<!-- THE POST 90717 -->","<!--IBF.ATTACHMENT_90717-->"), //G a K
		new Page("http://www.sharemanga.com/index.php?showtopic=13401","<!-- THE POST 298795 -->","<!--IBF.ATTACHMENT_298795-->"), //L a R
		new Page("http://www.sharemanga.com/index.php?showtopic=18736","<!-- THE POST 488706 -->","<!--IBF.ATTACHMENT_488706-->") //S a Z
	];
	document.OSTList = new Page("http://www.sharemanga.com/index.php?showtopic=7339","<!-- THE POST 142497 -->","<!--IBF.ATTACHMENT_142497-->");
	
	/**********************************
	*  Fonctions
	**********************************/
	
	/*Cr�� un bouton pour le formulaire*/
	var createFormButton = function (value, f) {
		var input = form.appendChild(document.createElement("input"));
		input.type = "button";
		input.value = value;	
		input.addEventListener('click', f, true); 
	}
	
		/* fonction de recuperation d'une page via xmlhttprequest */
	var pageGet = function(url) {
		var xmlhttp = new XMLHttpRequest();
		var contenu = "";
		//xmlhttp.setRequestHeader("Content-Type", "text/html; charset=iso-8859-1");
		xmlhttp.overrideMimeType("text/xml; charset=ISO-8859-1")
		xmlhttp.open("GET", url, false); 
		xmlhttp.send(null);
		if ( xmlhttp.status != "200" ) {
		      alert("R\u00E9ception erreur " + xmlhttp.status);
		    } else {
		      contenu=xmlhttp.responseText;
		      // traitement du contenu
		    }
		return contenu;
	}
	
	/*Traitement de la page, ne retourne que le contenu n�cessaire*/
	var pageTraitment = function(content,begin, end) {
		var body = content.indexOf(begin)+begin.length;
		var endbody = content.indexOf(end);
		return content.substring(body,endbody);
	}
	
	/*R�cup�re une liste et la nettoie*/
	function getList(button, newButtonValue, listId, list) {
		var newContent = "";
		if (list.length!=null) {
			for (var i=0; i<list.length; i++) {
				var page = pageGet(list[i].url);
				newContent+=pageTraitment(page, list[i].begin, list[i].end);
			}
		} else {
			var page = pageGet(list.url);
			newContent+=pageTraitment(page, list.begin, list.end);
		}
		var div = document.createElement("div");
		div.id = listId;
		div.className="GMSHList";
		div.innerHTML = newContent;
		/*document.body.appendChild(div);*/
		document.body.insertBefore(div, document.body.firstChild);
		var allA = div.getElementsByTagName("a");
		for (var i=0; i<allA.length; i++){
			allA[i].target = "";
		}
		createListButton(button, newButtonValue, listId);
	}
	
	
	/*Cr�� un bouton qui g�re  une liste*/
	var createListButton = function (button, value, listId) {
		var form = document.getElementById("GMSHM_form");
		var input = form.insertBefore(document.createElement("input"),button);
		input.type = "button";
		input.value = value;
		input.className = "btnlist";
		input.setAttribute("listId",listId);
		input.addEventListener('click', function() {
			this.value = (this.value.indexOf("Afficher")!=-1) ? this.value.replace("Afficher","Cacher") : this.value.replace("Cacher","Afficher");
			this.className = (this.className=="btnlist") ? "activebtnlist" : "btnlist";
			GMSHM_SH(this.getAttribute("listId"));
		}, true);
		button.parentNode.removeChild(button);
	}
	
	/*Transforme les liens ed2k en listes pretes a etre C/C dans emule*/
	var transformLinks = function(button) {
		var AllLinks = document.getElementsByTagName("A"); //Recuperation de tous les liens de la page
		var txtArea = document.createElement("div"); //Creation du TextArea qui va contenir tous les liens ed2k de la page, ce textarea peut etre utile afin d'eviter de fouiller partout dans une page web
		txtArea.id="GMSHM_txtarea";
		body.insertBefore(txtArea, body.firstChild);
		var Txt = '';
		for (var i=AllLinks.length-1; i>=0; i--) {	//on scanne tous les liens de la page et on leur applique les elements necessaires
			if (AllLinks[i].href.indexOf("ed2k:")!=-1) {
			var NowLink = AllLinks[i];
			var Parent = NowLink.parentNode;  //On recupere le parent 
			var NewNode = document.createElement("span"); //On cree notre nouveau noeud
			NewNode.innerHTML = NowLink.href;
			Txt = NowLink.href + "\n" + Txt;  //On ajoute le lien a la variable TXT qui sera le resultat final du textarea
			var Nouveau = Parent.insertBefore(NewNode,NowLink);  //On rajoute ce nouveau noeud avant le lien
			if (NowLink.nextSibling) { //On regarde si le noeud apr�s le lien est une ","  et dans ce cas on la supprime
				if (NowLink.nextSibling.nodeValue == ",") Parent.removeChild(NowLink.nextSibling);
				if (NowLink.nextSibling.nodeName != "BR") Parent.insertBefore(document.createElement("BR"),NowLink); //on rajoute un <BR> apres le lien s'il n'y en a pas
			}
			Parent.removeChild(NowLink); 	//On cache ensuite le lien en lui mettant une class speciale
			}
		}
		txtArea.innerHTML = Txt;
		if (Txt=="") { txtArea.style.display ="none"; alert("aucun lien ed2k sur cette page")}
		button.parentNode.removeChild(button);
	}
	
	
	/*Fonctions g�n�riques*/
	
	/*Afficher Cacher un bloc*/
	var GMSHM_SH = function (EltId,Action) {
		var elt = document.getElementById(EltId); if(!elt) return;
		Action = (typeof Action=="undefined" ) ? "" : Action.substring(0,1).toLowerCase();
        with(elt.style) {
            display = (Action=="" ) ? (display=="block" || display=="" ) ? "none" : "block" : (Action=="h" ) ? "none" : "block";
        }
    }
	
	
	/**********************************
	*  Programme principal 
	**********************************/

	/*initialisation du systeme*/
	body = document.body;
	var style=document.createElement("style"); /*feuille de style*/
		style.type = "text/css";
		style.innerHTML = cssRules;
		document.getElementsByTagName("head")[0].appendChild(style);
	var form = document.createElement("form"); /*formulaire contenant les boutons d'action*/
		form.id = "GMSHM_form";
		form = body.insertBefore(form, body.firstChild);
	
		createFormButton("Transform links",function() { transformLinks(this); }); 
		createFormButton("Animes Liens",function() { getList(this,"Cacher Liste Animes","GMSHM_AnimeEd2KList",document.AnimeList); })
		createFormButton("OST Liens",function() { getList(this,"Cacher Liste OST","GMSHM_OSTEd2KList",document.OSTList); })
		/*var input = form.appendChild(document.createElement("input"));
			input.type = "button";
			input.value = "Animes ED2K";	
			input.addEventListener('click', , true); 
		*/
