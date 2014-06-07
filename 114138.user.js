// ==UserScript==
// @name           Gestion de la configuration
// @namespace      help me
// @description    Permet de gerer la configuration de vos avions
// @author         Alecets
// @include        http://dream.airlines-manager.com/config_appareil*
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version 	   1.0
// @history        1.0 Première sortie du script
// ==/UserScript==

function getElementsByClass(searchClass,node,tag){var classElements=new Array();if(node==null)node=document;if(tag==null)tag='*';var els=node.getElementsByTagName(tag);var elsLen=els.length;var pattern=new RegExp("(^|\\s)"+searchClass+"(\\s|$)");for(i=0,j=0;i<elsLen;i++){if(pattern.test(els[i].className)){classElements[j]=els[i];j++}}return classElements}

function select(e) {	
	if(e.target.id == 'SelectAll') {
		var span = 'jquery-checkbox jquery-checkbox-checked';
	}

	else if(e.target.id == 'UnSelectAll') {
		var span = 'jquery-checkbox';
	}
	
	for(var i = 1; i <= 17; i++) {
		var option = document.getElementById('option_'+i);
		option.className = span;
	}
	
	unsafeWindow.devis_option(0,'');
}

var divOption = document.getElementById("cadre_option");

if(divOption) {
	GM_log('divOption trouve');
	
	var divSelect = document.createElement("div");
	divSelect.setAttribute("style", "margin-left : 60px;");
	divSelect.innerHTML = '<input id="SelectAll" type="button" class="go_btn" value="Selectionner toutes les options" /><input id="UnSelectAll" type="button" class="go_btn" value="Deselectionner toutes les options" />';

	divOption.parentNode.insertBefore(divSelect, divOption);
	
	document.getElementById("SelectAll").addEventListener("click", select, true);
	document.getElementById("UnSelectAll").addEventListener("click", select, true);
}

function save(e) {
	var options = '';
	
	for(var i = 1; i <= 17; i++) {
		var option = document.getElementById('option_'+i);
		if(option.className == 'jquery-checkbox jquery-checkbox-checked') {
			options += '-' + i ;
		}
	}
	
	options = options.substring(1);
	
	var name = prompt('Entrez le nom de la config:');
	var devis = unsafeWindow['cout_total_options']+unsafeWindow['cout_eco']+unsafeWindow['cout_biz']+unsafeWindow['cout_fir']+unsafeWindow['restructuration'];
	var config = name + ';' + unsafeWindow['place_max_total'] + ';' + unsafeWindow['place_act_eco'] + ';' + unsafeWindow['place_act_biz'] + ';' + unsafeWindow['place_act_fir'] + ';' + options + ';' + devis;
	
	GM_log(config);
	
	GM_setValue(name, config);
	
	list();
	
	alert(name + 'Sauvegardee');
}

function list() {
	var list = [], option = document.createElement('select'), test = 0;
	option.id = 'SelectConf';
	for each (var val in GM_listValues()) {