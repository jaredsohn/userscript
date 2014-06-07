// ==UserScript==
// @name        Secret Gmail
// @namespace   lkaiman
// @description bouton pour afficher/masquer les messages des curieux
// @include     http*://mail.google.com/*
// @version     3
// @updateURL	   https://userscripts.org/scripts/source/155500.meta.js
// @downloadURL	   https://userscripts.org/scripts/source/155500.user.js
// ==/UserScript==


/*
To do:
 - --

 History: 
	V1 - 2 janvier 2013
		- Création
	V2 - 2 janvier 2013
		- Raccourci clavier (touche "S")
	V3 - 30 juin 2013
		- Changement de CLASS pour l'apparence du bouton
*/


  /****************************************/
 /*  V  A  R  I  A  B  L  E  S     S  Y  S  T  E  M  E  */
/****************************************/
	className_div_gmail = 'AO';
	id_bp_secret = 'BP_Secret_Gmail';
	touch_secret = 'S';
        class_gmail = 'T-I J-J5-Ji ar7 nf T-I-ax7 L3';

  /***************************************/
 /*  F  O  N  C  T  I  O  N     S  Y  S  T  E  M  E  */
/***************************************/
function injectSCRIPT(scriptdata){
	// Inject your own SCRIPT in the page.
	// Example: Do not underline link:
	//          injectSCRIPT('alert("hello world!")')
	head = document.getElementsByTagName("head")[0];
	style = document.createElement("script");
	style.setAttribute("language", 'javascript');
	style.innerHTML = scriptdata;
	head.appendChild(style);
}
function Hide_Gmail(className){
	var elements = document.getElementsByClassName(className);
	for(var i = 0, length = elements.length; i < length; i++) {
			if(elements[i].style.display == 'none')
				elements[i].style.display = 'block';
			else
				elements[i].style.display = 'none';
	}
}
function Nom_Bp_Secret(){
		var id1 = id_bp_secret;
		var cn1 = className_div_gmail;
		if(document.getElementsByClassName(cn1)[0].style.display != 'none')
			document.getElementById(id1).innerHTML = '&nbsp;Secret&nbsp;';
		else
			document.getElementById(id1).innerHTML = 'Afficher';
		document.getElementById(id1).innerHTML = document.getElementById(id1).innerHTML + ' Gmail';
}
function secret_key(event) {
	element = event.target;
	elementName = element.nodeName.toLowerCase();
	if (elementName == "input" || elementName == "textarea") return true;
	if (String.fromCharCode(event.which)==touch_secret && !event.ctrlKey && !event.metaKey) {
		Hide_Gmail(className_div_gmail);
		Nom_Bp_Secret();
	}
	return true;
}

  /*****************/
 /*      M  A  I  N       */
/*****************/
function main(){
		
	if(!document.getElementById(id_bp_secret)){
		
		var res = document.evaluate('//div[@id=":ro"]/div/div/div/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var node = res.snapshotItem(0);		
		var elDiv = document.createElement("div");
		var elSpan = elDiv.appendChild(document.createElement('span'));
		
		elDiv.setAttribute('aria-label', "&nbsp;Secret&nbsp; Gmail");
		elDiv.setAttribute('data-tooltip', "&nbsp;Secret&nbsp; Gmail");
		elDiv.setAttribute('style', "-moz-user-select: none;");
		elDiv.setAttribute('class', class_gmail);
		elDiv.setAttribute('act', "");
		elDiv.setAttribute('role', "button");
		elDiv.setAttribute('onclick', "Hide_Gmail('"+className_div_gmail+"');Nom_Bp_Secret();");
		elDiv.setAttribute('tabindex', "0");
		
		elSpan.setAttribute('id', id_bp_secret);
		elSpan.setAttribute('class', "greasemonkey");
		elSpan.setAttribute('style', "font-size:9px;");
		elSpan.innerHTML = '&nbsp;Secret&nbsp; Gmail';
		
		node.insertBefore(elDiv, null);
		
		
		var F1 = "function Hide_Gmail(className){";
				F1+= "	var elements = document.getElementsByClassName(className);";
				F1+= "	for(var i = 0, length = elements.length; i < length; i++) {";
				F1+= "		  if(elements[i].style.display == 'none')";
				F1+= "				elements[i].style.display = 'block';";
				F1+= "		  else";
				F1+= "				elements[i].style.display = 'none';";
				F1+= "	}";
				F1+= "}";
			
				F1+= "function Nom_Bp_Secret(){";
				F1+= "		var id1 = '"+id_bp_secret+"';";
				F1+= "		var cn1 = '"+className_div_gmail+"';";
				F1+= "		if(document.getElementsByClassName(cn1)[0].style.display != 'none')";
				F1+= "			document.getElementById(id1).innerHTML = '&nbsp;Secret&nbsp;';";
				F1+= "		else";
				F1+= "			document.getElementById(id1).innerHTML = 'Afficher';";
				F1+= "		document.getElementById(id1).innerHTML = document.getElementById(id1).innerHTML + ' Gmail';";
				F1+= "}";
		
		injectSCRIPT(F1);
	}
	
}

// Lancement des evenements
	document.addEventListener('DOMNodeInserted', main, false);
	document.addEventListener("keydown", secret_key, false);
