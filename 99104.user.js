// ==UserScript==
// @name           Remplissage automatique des sondages
// @namespace      http://www.fcasset.fr/
// @description    Petit plugin pour auto-remplir les questionnaires, formulaires et autres sondages du web

// @include        http*://*

// @version        3.3.2
// @author         Florian Casset
// @mail           webmaster@fcasset.fr
// @copyright      © 2011
// ==/UserScript==
//special date
var date = new Date();
//var qui va contenir les autocomplete des select
var autoComplete = new Array('Juillet', 'juillet', '1987', '27', '77', 'Employé', 'Un homme', ''+date.getFullYear()-1987, 'Montereau Fault Yonne', 'France', 'france');
// lancement de la fonction de capture clavier
(function(){
	//affichage conditionnel du menu
	if(GM_getValue('keyboardshortcuts', true) == false) GM_registerMenuCommand('Activer les raccourcis clavier', swapRaccourcis);
	else GM_registerMenuCommand('Désactiver les raccourcis clavier', swapRaccourcis);
	//si on a activé les raccourcis clavier, on definit les fonctions utilisées
	if(GM_getValue('keyboardshortcuts', true) == true){
		//Ctrl+< : remplissage auto des formulaires
		shortcut("Ctrl+gt",function(){remplir();});
	}
	//sinon, on affiche un bouton qui va le faire
	else{
		//on créé une div
		var GM_Body = unsafeWindow.document.getElementsByTagName('body')[0];
		var GM_Div = unsafeWindow.document.createElement('div');
		var txt_div = unsafeWindow.document.createTextNode("Raccourci clavier désactivé.");
		GM_Div.appendChild(txt_div);
		//on rajoute un poil de CSS
		GM_Div.style.position = 'absolute';
		GM_Div.style.top = '0';
		GM_Div.style.right = '0';
		GM_Div.style.padding = '3px';
		GM_Div.style.background = '#f88';
		GM_Div.style.textAlign = 'center';
		GM_Div.style.color = '#fff';
		GM_Div.style.zIndex  = '9999';
		GM_Div.id = 'SONDAGE';
		//on ajoute un br
		var GM_br = unsafeWindow.document.createElement('br');
		GM_Div.insertBefore(GM_br, GM_Div.nextSibling);
		//et un lien qui va forcer la fonction
		var GM_A = unsafeWindow.document.createElement('a');
		var txt_a = unsafeWindow.document.createTextNode("Remplir les champs");
		GM_A.style.color = "#";
		GM_A.appendChild(txt_a);
		GM_A.href = "javascript:remplir2();";
		GM_Div.insertBefore(GM_A, GM_Div.nextSibling);
		GM_Body.insertBefore(GM_Div, GM_Body.firstChild);
	}
})();
//si raccourci clavier desactivé, on force la fonction dans le navigateur
unsafeWindow.remplir2 = function(){remplir();}
//remplissage des sondages
function remplir(){
	//on check toutes les checkbox +click
	var search = unsafeWindow.document.querySelectorAll("input[type=checkbox]");
	var nb = search.length;
	for(var i = 0; i < nb; i++){
		search[i].click();
		search[i].setAttribute("checked","checked");
	}
	//on remplit toutes les cases de formulaire dispo
	search = unsafeWindow.document.querySelectorAll("input[type=radio]");
	nb = search.length;
	for(var i = 0; i < nb; i++){
		search[i].click();
		search[i].setAttribute("checked","checked");
	}
	//on remplit les autres inputs sauf les hidden
	search = unsafeWindow.document.querySelectorAll("input[type=text], input[type=password]");
	nb = search.length;
	for(var i = 0; i < nb; i++){
		search[i].click();
		if(search[i].value == '') search[i].setAttribute("value",search[i].name);
	}
	//on remplit les textarea
	search = unsafeWindow.document.querySelectorAll("textarea");
	nb = search.length;
	for(var i = 0; i < nb; i++){
		if(search[i].innerHTML == '') search[i].innerHTML = search[i].name;
		//search[i].onchange();
	}
	//on selectionne une valeur pour les select
	search = unsafeWindow.document.querySelectorAll("select");
	nb = search.length;
	for(var i = 0; i < nb; i++){
		var stop = false;
		//on remplit de maniere specifique les select avec les données du tableau
		for(j = 0; j < search[i].options.length;j++){
			for(k in autoComplete){
				if(search[i].options[j].value == autoComplete[k]){
					search[i].selectedIndex = j;
					stop = true;
					break;
				}
			}
			if(stop == true) break;
		}
		if(stop == false) search[i].selectedIndex = search[i].options.length -1;
	}
	return;
}
//permet d'activer/desactiver les raccourcis clavier
function swapRaccourcis(){
	if(GM_getValue('keyboardshortcuts', true) == false){
		GM_setValue('keyboardshortcuts', true);
		alert("Raccourcis activés!\nTouche de raccourci par défaut : Ctrl + <");
		window.location.reload();
		return;
	}
	if(GM_getValue('keyboardshortcuts', true) == true){
		GM_setValue('keyboardshortcuts', false);
		alert("Raccourcis désactivés.\n! ATTENTION !\nUne div va s'ouvrir automatiquement si vous allez sur un site compatible, en vous proposant de remplir les champs au clic.");
		window.location.reload();
		return;
	}
}
//permet de simplifier la facon de remplir la raccourcis claviers
function shortcut(shortcut,callback,opt){
	//Provide a set of default options
	var default_options = {'type':'keydown','propagate':false,'target':document}
	if(!opt) opt = default_options;
	else{
		for(var dfo in default_options){
			if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
		}
	}
	var ele = opt.target
	if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
	var ths = this;
	//The function to be called at keypress
	var func = function(e){
		e = e || window.event;
		//Find Which key is pressed
		if(e.keyCode) code = e.keyCode;
		else if(e.which) code = e.which;
		var character = String.fromCharCode(code).toLowerCase();
		var keys = shortcut.toLowerCase().split("+");
		//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
		var kp = 0;
		//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
		var shift_nums = {"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"}
		//Special Keys - and their codes
		var special_keys = {'esc':27,'escape':27,'tab':9,'space':32,'return':13,'enter':13,'backspace':8,'scrolllock':145,'scroll_lock':145,'scroll':145,'capslock':20,'caps_lock':20,'caps':20,'numlock':144,'num_lock':144,'num':144,'pause':19,'break':19,'insert':45,'home':36,'delete':46,'end':35,'pageup':33,'page_up':33,'pu':33,'pagedown':34,'page_down':34,'pd':34,'left':37,'up':38,'right':39,'down':40,'f1':112,'f2':113,'f3':114,'f4':115,'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123,'gt':226}
		for(var i=0; k=keys[i],i<keys.length; i++){
			//Modifiers
			if(k == 'ctrl' || k == 'control'){if(e.ctrlKey) kp++;}
			else if(k ==  'shift'){if(e.shiftKey) kp++;}
			else if(k == 'alt'){if(e.altKey) kp++;}
			else if(k.length > 1){if(special_keys[k] == code) kp++;}
			else{
				if(character == k) kp++;
				else{
					if(shift_nums[character] && e.shiftKey){ //Stupid Shift key bug created by using lowercase
						character = shift_nums[character]; 
						if(character == k) kp++;
					}
				}
			}
		}
		if(kp == keys.length){
			callback(e);
			if(!opt['propagate']) { //Stop the event
				//e.cancelBubble is supported by IE - this will kill the bubbling process.
				e.cancelBubble = true;
				e.returnValue = false;
				//e.stopPropagation works only in Firefox.
				if (e.stopPropagation){
					e.stopPropagation();
					e.preventDefault();
				}
				return false;
			}
		}
	}
	//Attach the function with the event
	if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
	else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
	else ele['on'+opt['type']] = func;
	return;
}