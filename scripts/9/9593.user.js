// ==UserScript==
// @name GA referer link
// @namespace http://www.upian.net/maxime/dev/ga-referer/
// @description Ajoute un lien pour accéder au referers sur Google Analytics
// @include https://www.google.com/analytics/reporting/referring_*
// ==/UserScript==

var delay_recreate_link = 1200;
var length_before_url = 18;

gm_referer ();


function gm_referer(){
	
	var base_url = document.getElementById('report_header').getElementsByTagName('h1')[0].firstChild.nodeValue;
	base_url = base_url.substr(length_before_url,base_url.length);
	base_url = base_url.replace(/(^\s*)|(\s*$)/g,"");
	var rootTable = document.getElementById('f_table_data').getElementsByTagName('tbody')[0];	
	var longueur_table = rootTable.getElementsByTagName('tr').length;
	//alert(longueur_table);
	for(i=0;i<longueur_table;i++){
		if(!rootTable.getElementsByTagName('tr')[i].getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('a')[1]){
			var end_url = rootTable.getElementsByTagName('tr')[i].getElementsByTagName('a')[0].firstChild.nodeValue;
			end_url = end_url.replace(/(^\s*)|(\s*$)/g,"");
			var referer = 'http://'+base_url+end_url;
			//alert(referer);
			
			var newlink=document.createElement("a");
			newlink.setAttribute("href", referer);
			newlink.setAttribute("target", '_blank');
			newlink.innerHTML='<img src="http://www.upian.net/maxime/dev/ga-referer/img/link.png" alt="" />';
			
			var spacer =document.createTextNode(" | ");
			rootTable.getElementsByTagName('tr')[i].getElementsByTagName('div')[0].getElementsByTagName('div')[0].appendChild(spacer);
			rootTable.getElementsByTagName('tr')[i].getElementsByTagName('div')[0].getElementsByTagName('div')[0].appendChild(newlink);
	}
	}
	

	// Recrée les liens lors du changement de période
	
	document.getElementById('f_apply').addEventListener('click', function() {setTimeout(gm_referer,delay_recreate_link);}, true);

	// Recrée les liens lors du changement de type d'affichage (Fréquentation / conversion des objectifs)
	

	tab_0 = document.getElementById('tab_0').getElementsByTagName('a')[0];
	tab_1 = document.getElementById('tab_1').getElementsByTagName('a')[0];

	tab_0.addEventListener('click', function() {setTimeout(gm_referer,delay_recreate_link);}, true);
	tab_1.addEventListener('click', function() {setTimeout(gm_referer,delay_recreate_link);}, true);


	// recrée les liens lors de la recherche en AJAX
	
	container_button = document.getElementById('Table').getElementsByTagName('form')[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('div')[0];
	
	base_search = container_button.getElementsByTagName('div')[0];
	btn_search = base_search.getElementsByTagName('a')[0];
	btn_search.addEventListener('click', function() {setTimeout(gm_referer,delay_recreate_link);}, true);
	

	// recrée les liens lors du changement de page en AJAX
	
	base_button = container_button.getElementsByTagName('div')[1];
		
	btn_prev = base_button.getElementsByTagName('a')[0];
	btn_next = base_button.getElementsByTagName('a')[1];
	btn_next.addEventListener('click', function() {setTimeout(gm_referer,delay_recreate_link);}, true);
	btn_prev.addEventListener('click', function() {setTimeout(gm_referer,delay_recreate_link);}, true);
	
	// recrée les liens lors du choix du nombre de lignes affichées	
	
	btn_select = base_button.getElementsByTagName('select')[0];
	btn_select.addEventListener('change', function() {setTimeout(gm_referer,delay_recreate_link);}, true);
	
	
}
