// ==UserScript==
// @id             og_time
// @name           Ogame Time
// @version        1.3
// @namespace      
// @author         Tsuna77
// @description    Affichage du temps de production des ressources manquantes
// @include        http://*.ogame.*/game/index.php*
// @run-at         document-end
// @updateURL 	   http://userscripts.org/scripts/source/128456.user.js
// ==/UserScript==

var Metal_dispo;
var Cristal_dispo;
var Deut_dispo;
var nrj_dispo;

var metal_prod;
var Cristal_prod;
var Deut_prod;

var need_metal;
var need_crist;
var need_deut;
var need_nrj;
var test_wrap = false;
var old_metal_diff;
var old_cristal_diff;
var old_deut_diff;
var old_nrj_diff;
var nom;

var pseudo;
var serveur = location.href.split('/')[2];
var planete_active;
var temp_max;

function found_planete_active(){
	pseudo = document.getElementById('playerName').getElementsByClassName('textBeefy')[0].innerHTML;
	var myworld = document.getElementById('myWorlds');
	for (i = 1; i < myworld.children.length; i++){
		var planete = myworld.children[i];
		var toto = planete.children[0].getAttribute('class').match('active');
		if ( toto != null){
			// planete active;
			var reg = new RegExp("<B>(.*)</B>","");
			var test = myworld.children[i].children[0].title.match(reg);
			temp_max = myworld.children[i].children[0].title.split("<BR>")[2].split("à")[1].replace(" ","").replace("°C","");
			test = test[1].split(' ')[0];
			planete_active = test;
		}
	}
}
found_planete_active();
function load_prod(){
	metal_prod = GM_getValue("metal_prod"+serveur+pseudo+planete_active,0);
	Cristal_prod = GM_getValue("cristal_prod"+serveur+pseudo+planete_active,0);
	Deut_prod = GM_getValue("deut_prod"+serveur+pseudo+planete_active,0);


}
load_prod();

function update_ressource(){
	Metal_dispo = document.getElementById('resources_metal').innerHTML.replace('.','');
	Cristal_dispo = document.getElementById('resources_crystal').innerHTML.replace('.','');
	Deut_dispo = document.getElementById('resources_deuterium').innerHTML.replace('.','');
	nrj_dispo = document.getElementById('resources_energy').innerHTML.replace('.','');
	
	setTimeout(update_ressource,100);
}

function udt_ressource_prod(){
	var metal = document.getElementById('metal_box').title.match("undermark'>+(.{1,10})</span>")[1].replace('.','').replace('+','');
	var cri = document.getElementById('crystal_box').title.match("undermark'>+(.{1,10})</span>")[1].replace('.','').replace('+','');
	var det = document.getElementById('deuterium_box').title.match("undermark'>+(.{1,10})</span>")[1].replace('.','').replace('+','');
	console.info("Production : \nMetal = "+metal+"\nCristal = "+cri+"\nDeut = "+det);
	GM_setValue("metal_prod"+serveur+pseudo+planete_active,metal);
	GM_setValue("cristal_prod"+serveur+pseudo+planete_active,cri);
	GM_setValue("deut_prod"+serveur+pseudo+planete_active,det);
	load_prod();
}
udt_ressource_prod();


function udt_ressource_needed(){
	// vérification si nous somme toujours sur le même batiment/recherche/etc
	var n_nom = document.getElementById('content').children[0].innerHTML;
	if ( n_nom != nom){
		// reset des besoins
		nom = n_nom;
		need_metal = 0;
		need_crist = 0;
		need_deut = 0;
		need_nrj = 0;
	}
	
	var bc_ressource = document.getElementById('costswrapper').children[0].children[0];
	var nb_ress = bc_ressource.children.length;
	for (i = 0; i< nb_ress; i++){
		if ( bc_ressource.children[i].getAttribute('title') != null){
			var type = bc_ressource.children[i].getAttribute('title').split(' ')[1];
			var costs = bc_ressource.children[i].children[2].innerHTML;
			costs = costs.substr(22);
			var end = costs.length - 17;
			costs = costs.substr(0,end);
			costs = costs.replace('M','000000').replace('.','');
			if ( type == "Métal" ){
				need_metal = costs
			}
			else if (type == "Cristal" ){
				need_crist = costs;
			}
			else if (type == "Deutérium"){
				need_deut = costs;
			}
			else if (type == "Energie"){
				need_nrj = costs;
			}
		}
	}
}

function check_price(){
	var cost_block = document.getElementById('costswrapper');
	if (cost_block != null){
		test_wrap = true;
		// recherche de la listes des prix
		udt_ressource_needed();
		// comparaison entre les ressources néscessaire et le ressource en stock
		var diff_met = Metal_dispo - need_metal;
		var diff_cri = Cristal_dispo - need_crist;
		var diff_deu = Deut_dispo - need_deut;
		var diff_nrj = nrj_dispo - need_nrj;
		var update = false;
		if ( diff_met != old_metal_diff && diff_met < 0){
			update = true;

			old_metal_diff = diff_met;
		}
		if ( diff_cri != old_cristal_diff && diff_cri < 0 ){
			update = true;

			old_cristal_diff = diff_cri;
		}
		if ( diff_deu != old_deut_diff && diff_deu < 0 ){
			update = true;

			old_deut_diff = diff_deu;
		}
		if ( diff_nrj != old_nrj_diff && diff_nrj < 0 ){
			update = true;

			old_nrj_diff = diff_nrj;
		}

		if ( update)
			tps_prod(diff_met, diff_cri, diff_deu, diff_nrj);

		
	}
	else{
		if ( test_wrap == true){
			console.log("Impossible de trouver le bloc costwrapper");
			test_wrap = false;
		}
	}
	setTimeout(check_price,100);
}

function tps_prod(metal,cristal,deut,nrj){
	var msg = '<table><tr><th colspan=3>Ressources manquantes</th></tr>';
	var ok = false;
	var prod;
	var tps;
	if ( metal < 0){
		// il y a un manque de métal
		metal = Math.ceil(Math.abs(metal));
		prod = metal_prod;
		tps = timeToString(metal / prod);
		msg += '<tr><td>Métal : </td><td>'+metal+'</td><td>'+tps+'</td></tr>';
		ok = true;
	}
	if ( cristal < 0){
		// il y a un manque de cristal
		cristal = Math.ceil(Math.abs(cristal));
		prod = Cristal_prod;
		tps =  timeToString(cristal / prod);
		msg += '<tr><td>Cristal : </td><td>'+cristal+'</td><td>'+tps+'</td></tr>';
		ok = true;
	}
	if ( deut < 0){
		// il y a un manque de deutérium
		deut = Math.ceil(Math.abs(deut));
		prod = Deut_prod;
		tps =  timeToString(deut / prod);
		msg += '<tr><td>Deut : </td><td>'+deut+'</td><td>'+tps+'</td></tr>';
		ok = true;
	}
	if ( nrj < 0){
		// il y a un manque d'énergie
		nrj = Math.ceil(Math.abs(nrj));
		var sat_prod = Math.ceil(temp_max/4)+20;
		console.log("Max temp ="+temp_max+"\nProduction = "+sat_prod);
		var nb_sat = Math.ceil(nrj/sat_prod);

		msg += '<tr><td>Energie : </td><td>'+nrj+'</td><td>'+nb_sat+'sat</td></tr>';
		ok = true;
	}

	if (ok){
		write_info(msg);
	}
}

function write_info(msg){
	var cost_block = document.getElementById('costswrapper');

	if (cost_block != null){
		document.getElementById('description').innerHTML = msg;
	}
}

function timeToString(time){
	var heure = Math.floor(time);
	var minute = (time-heure)*60;
	var seconde = Math.ceil(minute*100%60);
	minute = Math.floor(minute);
	var jour = Math.floor(heure/24);
	heure = heure%24;
	
	var msg = "";
	if (jour > 0)
		msg += jour+"j ";
	if (heure > 0)
		msg += heure+"h ";
	if (minute > 0)
		msg += minute+"min ";
	/*if (seconde > 0)
		msg += seconde+'s';*/
	return msg;
}

update_ressource();
check_price();

