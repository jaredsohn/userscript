// ==UserScript==
// @id             ogame_tool
// @name           Ogame Tool
// @version        1.20
// @namespace      
// @author         Tsuna77
// @description    Ajout de différentes fonctionnalité dans ogame, voir le détail sur http://ogame.tsuna.fr/
// @include        http://*.ogame.fr/game/*
// @include        http://ogame.tsuna.fr/*
// @include        http://www.tsuna.fr/ogame/*
// @match          http://*.ogame.fr/game/*
// @match          http://ogame.tsuna.fr/*
// @match          http://www.tsuna.fr/ogame/*
// @run-at         document-end
// @updateURL 	   http://userscripts.org/scripts/source/130021.user.js
// ==/UserScript==

// parametre
var debug = false;
var snd = new Audio("http://tsuna.fr/contruct_finiched.wav");
var refresh_time = 2000;

// stockage de la production
var production_metal;
var production_cristal;
var production_deut;

// Ressources disponible
var Metal_dispo;
var Cristal_dispo;
var Deut_dispo;
var nrj_dispo;

// Place dans les hangars
var max_metal;
var max_cristal;
var max_deut;

// info général
var planete_active;
var serveur;
var pseudo;
var page;
var temp_max;

// niveau des batiments
var mine_metal = 0;
var mine_cristal = 0;
var mine_deut = 0;
var central_solaire = 0;
var central_fusion = 0;
var hangar_metal = 0;
var hangar_cristal = 0;
var hangar_deut = 0;
var cache_metal = 0;
var cache_cristal = 0;
var cache_deut = 0;
var usine_robot = 0;
var chantier_spatial = 0;
var labo = 0;
var depot = 0;
var silo = 0;
var nanite = 0;
var terraformer = 0;


var search_nrj = 0;
var search_laser = 0;
var search_ions = 0;
var search_thyper = 0;
var search_plasma = 0;
var search_comb = 0;
var search_imp = 0;
var search_phyper = 0;
var search_espio = 0;
var search_ordi = 0;
var search_astro = 0;
var search_rsx = 0;
var search_graviton = 0;
var search_arme = 0;
var search_bouclier = 0;
var search_protec = 0;

// param
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
var need_wait = false;
var id_account;

// ratio défenses 1
var nb_lm = 1;
var nb_ll = 0.5;
var nb_LL = 0.125;
var nb_io = 0.0415;
var nb_ga = 0.0165;
var nb_pl = 0.005;
var min_pb = 40;
var min_gb = 200;

var nb_construction = 0;        // nombre de construction en cours
var old_nb_construction = 0;



// Définition des Fonction greaseMonkey si on est sous Chrome
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}


function getpseudo(){
    var pseudo = docId('playerName').getElementsByClassName('textBeefy')[0].innerHTML;
    var reg= /([a-zA-Z0-9]+)/;
    return reg.exec(pseudo)[0];
}
function load_ress_place(){
    // Récupération de la taille des hangars
    var reg = /([0-9\.]+)/;
    max_metal = parseInt(reg.exec(docId("metal_box").title.split("stockage")[1])[1].replace(/\./g,''));
    max_cristal = parseInt(reg.exec(docId("crystal_box").title.split("stockage")[1])[1].replace(/\./g,''));
    max_deut = parseInt(reg.exec(docId("deuterium_box").title.split("stockage")[1])[1].replace(/\./g,''));
    //my_info("Hangar métal = "+max_metal);
    //my_info("Hangar cristal = "+max_cristal);
    //my_info("Hangar deutérium = "+max_deut);
}
function load_prod(){
    production_metal = GM_getValue("production_metal"+serveur+pseudo+planete_active,0);
    production_cristal = GM_getValue("production_cristal"+serveur+pseudo+planete_active,0);
    production_deut = GM_getValue("production_deut"+serveur+pseudo+planete_active,0);
}
function udt_ressource_needed(){
    // vérification si nous somme toujours sur le même batiment/recherche/etc
    var n_nom = docId('content').children[0].innerHTML;
    if ( n_nom != nom){
        // reset des besoins
        need_metal = 0;
        need_crist = 0;
        need_deut = 0;
        need_nrj = 0;
        nom = n_nom;
        need_wait = false;
    }
    
    var bc_ressource = docId('costswrapper').children[0].children[0];
    var nb_ress = bc_ressource.children.length;
    for (i = 0; i< nb_ress; i++){
        if ( bc_ressource.children[i].getAttribute('title') != null){
            var type = bc_ressource.children[i].getAttribute('title').split(' ')[1];
            var costs = bc_ressource.children[i].children[2].innerHTML;
            costs = costs.substr(22);
            var end = costs.length - 17;
            costs = costs.substr(0,end);
            costs = costs.replace(/\./g,'');
            if (costs.indexOf('M') != -1){
                costs = costs.replace(',','.');
                costs = parseFloat(costs);
                costs *= 1000000;
            }
            else{
                costs = parseInt(costs);
            }
            costs = Math.floor(costs);

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
function update_info(){
        my_info("Profile du joueur : "+pseudo);
        my_info("Serveur : "+serveur);
        my_info("Affichage de la page : "+page);
        if (page.match("resources"))
            update_resources();
        else if (page.match("station"))
            update_station();
        else if (page.match("defense"))
            nb_def_needed();
        else if(page.match("research"))
            update_research();
        update_stock();
        setTimeout(update_info,refresh_time);
}
function update_research(){
    my_info("Mise à jour des recherches");
    var info_search = docId("buttonz");
    var base = info_search.getElementsByTagName("ul")[0];
    var prop = info_search.getElementsByTagName("ul")[1];
    var advance = info_search.getElementsByTagName("ul")[2];
    var fight = info_search.getElementsByTagName("ul")[3];

    search_nrj = take_level(base.children[0]);
    //my_info("Recherche énergie niveau "+search_nrj);
    search_laser =take_level(base.children[1]);
    search_ions = take_level(base.children[2]);
    search_thyper = take_level(base.children[3]);
    search_plasma = take_level(base.children[4]);
    search_comb = take_level(prop.children[0]);
    search_imp = take_level(prop.children[1]);
    search_phyper = take_level(prop.children[2]);
    search_espio = take_level(advance.children[0]);
    search_ordi = take_level(advance.children[1]);
    search_astro = take_level(advance.children[2]);
    search_rsx = take_level(advance.children[3]);
    search_graviton = take_level(advance.children[4]);
    search_arme = take_level(fight.children[0]);
    search_bouclier = take_level(fight.children[1]);
    search_protec = take_level(fight.children[2]);
    write_settings();
}
function update_stock(){
    Metal_dispo = parseInt(docId('resources_metal').innerHTML.replace(/\./g,''));
    Cristal_dispo = parseInt(docId('resources_crystal').innerHTML.replace(/\./g,''));
    Deut_dispo = parseInt(docId('resources_deuterium').innerHTML.replace(/\./g,''));
    nrj_dispo = parseInt(docId('resources_energy').innerHTML.replace(/\./g,''));

    my_write("stock_metal",true, Metal_dispo);
    my_write("stock_cristal",true, Cristal_dispo);
    my_write("stock_deut",true, Deut_dispo);
    my_write("stock_nrj",true, nrj_dispo);

    setTimeout(update_stock,refresh_time);
}
function update_resources(){
        my_info("Mise à jour des ressources");
        var info_building = docId('buttonz').getElementsByTagName('ul')[0];
        var info_storage = docId('buttonz').getElementsByTagName('ul')[1];
        var info_den = docId('buttonz').getElementsByTagName('ul')[2];
        mine_metal = take_level(info_building.children[0],"mine_metal");
        mine_cristal = take_level(info_building.children[1],"mine_cristal");
        mine_deut = take_level(info_building.children[2],"mine_deut");
        central_solaire = take_level(info_building.children[3],"central_solaire");
        central_fusion = take_level(info_building.children[4],"central_fusion");
        hangar_metal = take_level(info_storage.children[0],"hangar_metal");
        hangar_cristal = take_level(info_storage.children[1],"hangar_cristal");
        hangar_deut = take_level(info_storage.children[2],"hangar_deut");
        cache_metal = take_level(info_den.children[0],"cache_metal");
        cache_cristal = take_level(info_den.children[1],"cache_cristal");
        cache_deut = take_level(info_den.children[2],"cache_deut");

        write_settings();
}
function take_level(msg,nom){
    var message;
    message = msg.children[0];
    message = message.getElementsByClassName('buildingimg')[0];
    if (message.getElementsByClassName('construction')[0]){
        message = message.getElementsByClassName('construction')[0];
    }
    if (message.getElementsByClassName('detail_button')[0]){
        message = message.getElementsByClassName('detail_button')[0];
    }
    else{
        message = message.children[0];
    }
    message = message.getElementsByClassName('ecke')[0];
    message = message.getElementsByClassName('level')[0];
    message = message.innerHTML.replace( /[^0-9-]/g, "");

    // recherche de la construction en cours
    looking_for_construction(msg,nom);

    var level = parseInt(message);
    return level;
}
function looking_for_construction(msg,nom){
    // recherche si quelque chose est en cours de construction
    var tmp_name = "working_"+page+"_"+nom;
    var niveau_construction = ""
    var info = msg.getElementsByClassName("eckeoben");
    var tmp_restant = "";
    var message = "";
    if (info.length > 0){
        niveau_construction = info[0].children[0].innerHTML;
        //my_info("construction en cours : "+nom+"("+niveau_construction+")")
        tmp_restant = msg.getElementsByClassName("time")[0].innerHTML;

        message = niveau_construction+"|"+tmp_restant;
        my_info(message);
    }

    my_write(tmp_name,1,message);
}
function update_station(){
        my_info("Mise à jour des installations");
        var info_building = docId('buttonz').getElementsByTagName('ul')[0];
        usine_robot = take_level(info_building.children[0]);
        chantier_spatial = take_level(info_building.children[1]);
        labo = take_level(info_building.children[2]);
        depot = take_level(info_building.children[3]);
        silo = take_level(info_building.children[4]);
        nanite = take_level(info_building.children[5]);
        terraformer = take_level(info_building.children[6]);
        write_settings();
}
function docId(id){

    return document.getElementById(id);
}
function string_recovered(string){
    var new_string = string.replace("\n","").substr(28);
    var taille = new_string.length-24;
    new_string = new_string.substr(0, taille);
    return new_string;
}
function load_settings(){
        // TODO : chargement des variables
        // Ressources
        mine_metal = my_load("mine_metal",true,0);
        mine_cristal = my_load("mine_cristal",true,0);
        mine_deut = my_load("mine_deut",true,0);
        central_solaire = my_load("central_solaire",true,0);
        central_fusion = my_load("central_fusion",true,0);
        hangar_metal = my_load("hangar_metal",true,0);
        hangar_cristal = my_load("hangar_cristal",true,0);
        hangar_deut = my_load("hangar_deut",true,0);
        cache_metal = my_load("cache_metal",true,0);
        cache_cristal = my_load("cache_cristal",true,0);
        cache_deut = my_load("cache_deut",true,0);


        // Installations
        usine_robot = my_load("usine_robot",true,0);
        chantier_spatial = my_load("chantier_spatial",true,0);
        labo = my_load("labo",true,0);
        depot = my_load("depot",true,0);
        silo = my_load("silo",true,0);
        nanite = my_load("nanite",true,0);
        terraformer = my_load("terraformer",true,0);

        // ratio défenses
        nb_lm = my_load("ratio_lm",true,1);
        nb_ll = my_load("ratio_ll",true,0.5);
        nb_LL = my_load("ratio_LL",true,0.125);
        nb_io = my_load("ratio_io",true,0.0415);
        nb_ga = my_load("ratio_ga",true,0.0165);
        nb_pl = my_load("ratio_pl",true,0.005);
        min_pb = my_load("ratio_pb",true,40);
        min_gb = my_load("ratio_gb",true,200);
}
function my_load(nom, pl, def){
    var valueStartString = serveur+pseudo;
    var cookieName = nom+valueStartString;
    if(pl){
        cookieName += planete_active;
    }
    var info = GM_getValue(cookieName, def);
    //my_info(nom+" de la planete "+planete_active+" = "+info);
    return info;
}
function my_write(nom, pl, value){
    var valueStartString = serveur+pseudo;
    var cookieName = nom+valueStartString;
    if(pl){
        cookieName += planete_active;
    }
    GM_setValue(cookieName,value);

    // mise à jour du timestamp de la page
    cookieName = "last_update_"+page+"_"+planete_active;
    var ma_date = new Date();
    //my_info("Cookie : "+cookieName+" => "+ma_date.getTime());
    GM_setValue(cookieName,ma_date.getTime().toString());
}
function load_time(page){
    cookieName = "last_update_"+page+"_"+planete_active;
    var ntime = GM_getValue(cookieName,"jamais");
    // coloration en fonction du temps écoulé
    var ma_date = new Date();
    var diff = (ma_date.getTime() - ntime );
    var color = "lightgreen";
    if (diff > 3600000){
        // plus d'une heure
        color = "red";
    }
    else if (diff>300000){
        // plus de 5 minutes
        color = "orange";
    }
    else if (diff>60000){
        // plus d'une minute depuis la dernière mise à jour
        color = "green";
    }
    my_info ("diff = "+diff+" => color = "+color);
    // conversion du temps en Français

    ttime = Math.round(diff/1000);  // retour en seconde
    var stime = "";
    if (ttime >= (60*60*24*365)){
        // plus d'une journé
        stime += Math.round(ttime/(60*60*24*365))+" années ";
        ttime = ttime%(60*60*24*365);
    }
    if (ttime >= (60*60*24*30)){
        // plus d'une journé
        stime += Math.round(ttime/(60*60*24*30))+" mois ";
        ttime = ttime%(60*60*24*30);
    }
    if (ttime >= (60*60*24)){
        // plus d'une journé
        stime += Math.round(ttime/(60*60*24))+" jour ";
        ttime = ttime%(60*60*24);
    }
    if (ttime >= (60*60)) {
        stime += Math.round(ttime/(60*60))+" heure ";
        ttime = ttime%(60*60);
    }
    if (ttime >= (60)) {
        stime += Math.round(ttime/(60))+" minutes ";
        ttime = ttime%(60);
    }
    stime += ttime+" secondes";
    message = "<span style='color:"+color+"'>"+stime+"</span>";
    return message;
}
function write_settings(){
        // TODO : enregistrement des variables (GM_setValue)
        // Ressource
        my_write("mine_metal",true,mine_metal);
        my_write("mine_cristal",true,mine_cristal);
        my_write("mine_deut",true,mine_deut);
        my_write("central_solaire",true,central_solaire);
        my_write("central_fusion",true,central_fusion);
        my_write("hangar_metal",true,hangar_metal);
        my_write("hangar_cristal",true,hangar_cristal);
        my_write("hangar_deut",true,hangar_deut);
        my_write("cache_metal",true,cache_metal);
        my_write("cache_cristal",true,cache_cristal);
        my_write("cache_deut",true,cache_deut);

        // Installations
        my_write("usine_robot",true,usine_robot);
        my_write("chantier_spatial",true,chantier_spatial);
        my_write("labo",true,labo);
        my_write("depot",true,depot);
        my_write("silo",true,silo);
        my_write("nanite",true,nanite);
        my_write("terraformer",true,terraformer);

        // recherche
        my_write("search_nrj",true,search_nrj);
        my_write("search_laser",true,search_laser);
        my_write("search_ions",true,search_ions);
        my_write("search_thyper",true,search_thyper);
        my_write("search_plasma",true,search_plasma);
        my_write("search_comb",true,search_comb);
        my_write("search_imp",true,search_imp);
        my_write("search_phyper",true,search_phyper);
        my_write("search_espio",true,search_espio);
        my_write("search_ordi",true,search_ordi);
        my_write("search_astro",true,search_astro);
        my_write("search_rsx",true,search_rsx);
        my_write("search_graviton",true,search_graviton);
        my_write("search_arme",true,search_arme);
        my_write("search_bouclier",true,search_bouclier);
        my_write("search_protec",true,search_protec);
}
function my_info(msg){
    if (debug){
        console.info(msg);
    }
}
function found_planete_active(){
	
	var myworld = docId('myWorlds');
    if (myworld === null){
        myworld = docId('myPlanets');
    }
	var reg = new RegExp("<B>(.*)</B>","");
	if (myworld.children.length > 2){
		for (i = 1; i < myworld.children.length; i++){
			var planete = myworld.children[i];
			var toto = planete.children[0].getAttribute('class').match('active');
			if ( toto != null){
				// planete active;
				
				var test = myworld.children[i].children[0].title.match(reg);
				temp_max = myworld.children[i].children[0].title.split("<BR>")[2].split("à")[1].replace(" ","").replace("°C","");
				test = test[1].split(' ')[0];
				planete_active = test;
				my_info("Planete active trouvé : "+test);
			}
		}
	}
	else{
		var test = myworld.children[1].children[0].title.match(reg);
		temp_max = myworld.children[1].children[0].title.split("<BR>")[2].split("à")[1].replace(" ","").replace("°C","");
		test = test[1].split(' ')[0];
		planete_active = test;
		my_info("Planete active trouvé : "+test);
	}
}
function udt_nb_to_build(id, needed, only_one){

    var reg = /([0-9]+)/;
    var info = docId("details"+id).getElementsByClassName("ecke")[0].children[0].innerHTML.replace(".","");
    info = parseInt(reg.exec(info)[0]);
    var dnb_lm = docId("details401").getElementsByClassName("ecke")[0].children[0].innerHTML.replace(".","");
    dnb_lm = parseInt(reg.exec(dnb_lm)[0]);
    var need = 0;
    if (only_one){
        if (dnb_lm >= needed)
            need = 1; 
    }
    else{
        need = Math.floor(needed * dnb_lm);
    }
    docId("details"+id).getElementsByClassName("level")[0].innerHTML = info+"/"+need;
}
function nb_def_needed(){
    // récupération des défenses
    // test si la construction est en cours
    udt_nb_to_build("401", nb_lm, false)
    udt_nb_to_build("402", nb_ll, false)
    udt_nb_to_build("403", nb_LL, false)
    udt_nb_to_build("404", nb_ga, false)
    udt_nb_to_build("405", nb_io, false)
    udt_nb_to_build("406", nb_pl, false)
    udt_nb_to_build("407", min_pb, true)
    udt_nb_to_build("408", min_gb, true)

    // affichage de l'interface de paramétrage du ratio
    if (docId("param_ratio") == null){
        docId("planet").innerHTML += "<div id='param_ratio' style='margin:5px;padding:5px;background-color:rgba(0,0,0,0.5);'></div>";
        
        docId("param_ratio").innerHTML = table_param_ratio();
    }
    setTimeout(udt_ratio,100);
    setTimeout(nb_def_needed, 500);
}
function table_param_ratio(){
    var info = "<table><tr>";
        //info += "<td>Lanceur de missile : <input type='text' style='width:158px' id='ratio_lm' value='"+nb_lm+"'/></td>";
        info += "<td>Laser légère : <input type='text' style='width:118px' id='ratio_ll' value='"+nb_ll+"'/></td>";
        info += "<td>Laser lourde : <input type='text' style='width:118px' id='ratio_LL' value='"+nb_LL+"'/></td>";
        info += "<td>Canon gauss : <input type='text' style='width:118px' id='ratio_ga' value='"+nb_ga+"'/></td>";
        info += "<td>Artillerie Ions : <input type='text' style='width:118px' id='ratio_io' value='"+nb_io+"'/></td>";
        info += "<td>Lanceur plasma : <input type='text' style='width:118px' id='ratio_pl' value='"+nb_pl+"'/></td>";
        info += "</tr><tr><td colspan=3>Nombre de lanceur de missile pour débloquer les boucliers</td>";
        info += "</tr><tr><td>Petit bouclier : <input type='text' style='width:118px' id='ratio_pb' value='"+min_pb+"'/></td>";
        info += "<td>Grand bouclier : <input type='text' style='width:118px' id='ratio_gb' value='"+min_gb+"'/></td>";
        info += "</tr></table>";
    return info;
}
function udt_ratio(){
    // lecture du ratio dans le bloc de paramétrage, enregistrement et mise à jour du visuel
    
    /* désactivé car les lanceur de missile sont toujours la base donc ratio 1:1
    if (!isNaN(docId("ratio_lm").value) && nb_lm != docId("ratio_lm").value){
        nb_lm = docId("ratio_lm").value;
        my_write("ratio_lm",true,nb_lm);
    }
    */
    if (!isNaN(docId("ratio_ll").value) && nb_lm != docId("ratio_ll").value){
        nb_ll = docId("ratio_ll").value;
        my_write("ratio_ll",true,nb_ll);
    }
    if (!isNaN(docId("ratio_LL").value) && nb_lm != docId("ratio_LL").value){
        nb_LL = docId("ratio_LL").value;
        my_write("ratio_LL",true,nb_LL);
    }
    if (!isNaN(docId("ratio_io").value) && nb_lm != docId("ratio_io").value){
        nb_io = docId("ratio_io").value;
        my_write("ratio_io",true,nb_io);
    }
    if (!isNaN(docId("ratio_ga").value) && nb_lm != docId("ratio_ga").value){
        nb_ga = docId("ratio_ga").value;
        my_write("ratio_ga",true,nb_ga);
    }
    if (!isNaN(docId("ratio_pl").value) && nb_lm != docId("ratio_pl").value){
        nb_pl = docId("ratio_pl").value;
        my_write("ratio_pl",true,nb_pl);
    }
    if (!isNaN(docId("ratio_pb").value) && nb_lm != docId("ratio_pb").value){
        min_pb = docId("ratio_pb").value;
        my_write("ratio_pb",true,min_pb);
    }
    if (!isNaN(docId("ratio_gb").value) && nb_lm != docId("ratio_gb").value){
        min_gb = docId("ratio_gb").value;
        my_write("ratio_gb",true,min_gb);
    }
}
function update_ressource_dispo(){
    Metal_dispo = parseInt(docId('resources_metal').innerHTML.replace(/\./g,''));
    Cristal_dispo = parseInt(docId('resources_crystal').innerHTML.replace(/\./g,''));
    Deut_dispo = parseInt(docId('resources_deuterium').innerHTML.replace(/\./g,''));
    nrj_dispo = parseInt(docId('resources_energy').innerHTML.replace(/\./g,''));
    
    setTimeout(update_ressource_dispo,refresh_time);
}
function check_price(){
    var cost_block = docId('costswrapper');
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
        else if (diff_met > 0){
            diff_met = 0;
        }
        if ( diff_cri != old_cristal_diff && diff_cri < 0 ){
            update = true;

            old_cristal_diff = diff_cri;
        }
        else if (diff_cri > 0){
            diff_cri = 0;
        }
        if ( diff_deu != old_deut_diff && diff_deu < 0 ){
            update = true;

            old_deut_diff = diff_deu;
        }
        else if (diff_deu > 0){
            diff_deu = 0;
        }
        if ( diff_nrj != old_nrj_diff && diff_nrj < 0 ){
            update = true;

            old_nrj_diff = diff_nrj;
        }
        else if (diff_nrj > 0){
            diff_nrj = 0;
        }

        if ( update ){
            need_wait = true;
        //    my_info("need = "+need_metal+" stock = "+max_metal);
            if (need_metal > max_metal){
                // impossible de produire suffisement
                diff_met = "NaN";
                need_wait = false;
            }
            if (need_crist > max_cristal){
                // impossible de produire suffisement
                diff_cri = "NaN";
                need_wait = false;
            }
            if (need_deut > max_deut){
                // impossible de produire suffisement
                diff_deu = "NaN";
                need_wait = false;
            }
            tps_prod(diff_met, diff_cri, diff_deu, diff_nrj);
        }
        if (!(diff_met <0 || diff_cri < 0 || diff_deu <0 || diff_nrj <0) && need_wait){
            my_info("Refresh de la page");
            need_wait=false;
            window.location.href=window.location.href;
        }
    }
    else{
        if ( test_wrap == true){
            my_info("Impossible de trouver le bloc costwrapper");
            test_wrap = false;
            need_wait = false;
        }
    }
    setTimeout(check_price,100);
}
function tps_prod(metal,cristal,deut,nrj){
    var msg = '<table style="border:1px solid gray; border-collapse:collapse;width:100%; text-align:center">';
    var ok = false;
    var prod;
    var tps;
    var tr = '<tr style="border:1px solid gray;">';
    var tre = '</tr>';
    var td = '<td style="border:1px solid gray;">';
    var tde = '</td>';
    var tden = tde+td;
    if ( metal < 0){
        // il y a un manque de métal
        metal = Math.ceil(Math.abs(metal));
        prod = production_metal;
        tps = timeToString(metal / prod);
        msg += tr+td+'Métal : '+tden+metal+" unitées"+tden+tps+tde+tre;
        ok = true;
    }
    else if (metal == "NaN"){
        msg += tr+td+'Métal : '+tden+tden+"Pas de stockage"+tde+tre;
        ok = true;
    }
    if ( cristal < 0){
        // il y a un manque de cristal
        cristal = Math.ceil(Math.abs(cristal));
        prod = production_cristal;
        tps =  timeToString(cristal / prod);
        msg += tr+td+'Cristal : '+tden+cristal+" unitées"+tden+tps+tde+tre;
        ok = true;
    }
    else if (cristal == "NaN"){
        msg += tr+td+'Cristal : '+tden+tden+"Pas de stockage"+tde+tre;
        ok = true;
    }
    if ( deut < 0){
        // il y a un manque de deutérium
        deut = Math.ceil(Math.abs(deut));
        prod = production_deut;
        tps =  timeToString(deut / prod);
        msg += tr+td+'Deut : '+tden+deut+" unitées"+tden+tps+tde+tre;
        ok = true;
    }
    else if (deut == "NaN"){
        msg += tr+td+'Deut : '+tden+tden+"Pas de stockage"+tde+tre;
        ok = true;
    }
    if ( nrj < 0){
        // il y a un manque d'énergie
        nrj = Math.ceil(Math.abs(nrj));
        var sat_prod = Math.ceil(temp_max/4)+20;
        my_info("Max temp ="+temp_max+"\nProduction = "+sat_prod);
        var nb_sat = Math.ceil(nrj/sat_prod);

        msg += tr+td+'Energie : '+tden+nrj+tden+nb_sat+'sat'+tde+tre;
        ok = true;
    }

    if (ok){
        write_info(msg);
    }
}
function write_info(msg){
    var cost_block = docId('costswrapper');

    if (cost_block != null){
        docId('description').innerHTML = msg;
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

    if ( msg == "")
        msg = "moins d'une minute";
    return msg;
}
function udt_ressource_prod(){
    var reg = /([0-9\.]+)/
    var metal = reg.exec(docId('metal_box').title.split('Production')[1])[1].replace(/\./g,'');
    var cri = reg.exec(docId('crystal_box').title.split('Production')[1])[1].replace(/\./g,'');
    var det = reg.exec(docId('deuterium_box').title.split('Production')[1])[1].replace(/\./g,'');
    my_info("Production : \nMetal = "+metal+"\nCristal = "+cri+"\nDeut = "+det);
    GM_setValue("production_metal"+serveur+pseudo+planete_active,metal);
    GM_setValue("production_cristal"+serveur+pseudo+planete_active,cri);
    GM_setValue("production_deut"+serveur+pseudo+planete_active,det);
    load_prod();
}
function load_account(){
    var nb_account = GM_getValue("exist_number",0);
    my_info("il y a "+nb_account+" compte enregistré");
    var select_inner = "<option value='0'></option>"
    for (i = 1; i <= nb_account; i++ ){
        select_inner += "<option value='"+i+"'>"+GM_getValue("exist_pseudo"+i)+" ("+GM_getValue("exist_serv"+i)+")</option>";
    }
    if (nb_account > 0)
        docId('select_account').innerHTML = select_inner;
}
function chk_account_saved(){
    id_account = GM_getValue("exist"+serveur+pseudo,0);
    if (id_account == 0){
        // compte non enregistré, création de la variable de stockage
        var nb_account = GM_getValue("exist_number",0);
        id_account = nb_account+1;
        GM_setValue("exist_number",id_account);
        GM_setValue("exist_pseudo"+id_account,pseudo);
        GM_setValue("exist_serv"+id_account,serveur);
        GM_setValue("exist"+serveur+pseudo,id_account);
    }
    var nb_pla_colo = document.getElementById("countColonies").children[0].children[0].innerHTML.split('/')[0];
    GM_setValue("exist_nb_planete_"+id_account,nb_pla_colo);
    for (var i = 1; i <= nb_pla_colo; i++){
        my_world = document.getElementById("myWorlds");
        if (my_world === null){
            my_world = document.getElementById("myPlanets");
        }
        GM_setValue("exist_pla_nom"+i+id_account,my_world.children[i].children[0].getElementsByClassName('planet-name')[0].innerHTML)
    }
}
function clear_empire(){

    var ress_block = docId("my_empire").innerHTML = "Aucun empire sélectionné";
}
function write_on_empire_page(){
    var ress_block = docId("my_empire");
    id_account = docId("select_account").value;
    // lecture du nombre de planète
    var nb_planete = GM_getValue("exist_nb_planete_"+id_account,0);
    var page = "<table class='block_empire'>"+"<tr id='empire_title'>";

    // affichage des titres des colones
    var title = new Array("","Ressources","Mines","Hangar","Central","Usines","Installations","Recherche fondamentale","propulsion","avancée","Combat");
    var colspan = new Array(0,4,3,3,2,2,5,5,3,5,3);
    var classe = new Array("","","");
    for(var i = 0; i < title.length; i++){
        page += "<td class='col_"+classe[i]+"' colspan='"+colspan[i]+"' onclick='javascript:masquer_col(\""+classe[i]+"\")'>"+title[i]+"</td>";
    }
    page += "</tr>";

    for (var i = 1; i <= nb_planete; i++){
        planete_active = GM_getValue("exist_pla_nom"+i+id_account);
        production_metal = my_load("production_metal",true,0);
        production_cristal = my_load("production_cristal",true,0);
        production_deut = my_load("production_deut",true,0);
        Metal_dispo = my_load("stock_metal", true,0);
        Cristal_dispo = my_load("stock_cristal", true,0);
        Deut_dispo = my_load("stock_deut", true,0);
        nrj_dispo = my_load("stock_nrj", true,0);
        load_settings();
        load_working();
        if (i == 1){
            // ajout de l'entete du tableau
            title = new Array("&nbsp;","Metal","Cristal","Deutérium","Energie","Metal","Cristal","Deutérium","Metal","Cristal","Deutérium","Solaire","Fusion","Robots","Nanite","Chantier Spatial","Laboratoire","Dépot","Silo","Terraformer","Energie","Laser","Ions","Hyperespace","Plasma","Combustion","Impulsion","Hyperespace","Espionage","Ordinateur","Astrophysique","Réseaux de recherche","Graviton","Armes","Boucliers","Protection");
            classe= new Array("","td_ressource","td_ressource","td_ressource","td_ressource","td_mines","td_mines","td_mines","td_usines")
            page += "<tr>";
            for (var j = 0; j < title.length; j++){
                page += "<td class='"+classe[j]+"'>"+title[j]+"</td>";
            }
            page += "</tr>";
        }
        page += "<tr><td>"+planete_active+"</td>";
        page += write_on_empire_page_ressource();
        page += write_on_empire_page_mines();
        page += write_on_empire_page_central();
        page += write_on_empire_page_usines();
        page += write_on_empire_page_install();
        if (i == 1){
            page += write_on_empire_page_recherche();
        }
        page += "</tr>";
    }


    page += "</table>";

    page += "<br/><br/><br/><table class='block_empire'>";
    page += "<legend>Date des mise à jour</legend>";
    page += "<tr><th>Planète</th><th>Ressources</th><th>Installation</th><th>Recherche</th></tr>";
    for (var i = 1; i <= nb_planete; i++){
        planete_active = GM_getValue("exist_pla_nom"+i+id_account);
        page += "<tr><td>"+planete_active+"</td><td>"+load_time("resources")+"</td><td>"+load_time("station")+"</td><td>"+load_time("research")+"</td></tr>";
    }
    page += "</table>";    

    ress_block.innerHTML = page;
}
function beep(){

    snd.play();
}
function write_on_empire_page_central(){
    msg = "";
    msg += "<td>"+central_solaire+"</td>";
    msg += "<td>"+central_fusion+"</td>";
    return msg;
}
function write_on_empire_page_usines(){
    msg = "";
    msg += "<td>"+usine_robot+"</td>";
    msg += "<td>"+nanite+"</td>";
    return msg;
}
function write_on_empire_page_install(){
    msg = "";
    msg += "<td>"+chantier_spatial+"</td>";
    msg += "<td>"+labo+"</td>";
    msg += "<td>"+depot+"</td>";
    msg += "<td>"+silo+"</td>";
    msg += "<td>"+terraformer+"</td>";
    return msg;  
}
function write_on_empire_page_recherche(){
    msg = "";
    msg += "<td>"+search_nrj+"</td>";
    msg += "<td>"+search_laser+"</td>";
    msg += "<td>"+search_ions+"</td>";
    msg += "<td>"+search_thyper+"</td>";
    msg += "<td>"+search_plasma+"</td>";
    msg += "<td>"+search_comb+"</td>";
    msg += "<td>"+search_imp+"</td>";
    msg += "<td>"+search_phyper+"</td>";
    msg += "<td>"+search_espio+"</td>";
    msg += "<td>"+search_ordi+"</td>";
    msg += "<td>"+search_astro+"</td>";
    msg += "<td>"+search_rsx+"</td>";
    msg += "<td>"+search_graviton+"</td>";
    msg += "<td>"+search_arme+"</td>";
    msg += "<td>"+search_bouclier+"</td>";
    msg += "<td>"+search_protec+"</td>";
    return msg;   
}
function write_on_empire_page_mines(){
    var info = "";
    info += "<td>"+mine_metal+"</td>";
    info += "<td>"+mine_cristal+"</td>";
    info += "<td>"+mine_deut+"</td>";
    info += "<td>"+hangar_metal+"</td>";
    info += "<td>"+hangar_cristal+"</td>";
    info += "<td>"+hangar_deut+"</td>";
    return info;
}
function write_on_empire_page_ressource(){

    var info = "";
    var color_nrj = "";
    info += "<td class='td_ressource'>"+number2stringformat(Metal_dispo)+"(+"+production_metal+")</td>";
    info += "<td class='td_ressource'>"+number2stringformat(Cristal_dispo)+"(+"+production_cristal+")</td>";
    info += "<td class='td_ressource'>"+number2stringformat(Deut_dispo)+"(+"+production_deut+")</td>";
    if (nrj_dispo <= 0){
        color_nrj="class='red'";
    }
    info += "<td "+color_nrj+" >"+number2stringformat(nrj_dispo)+"</td>";

    return info;
}
function number2stringformat(valeur){
    var decimal = 0;
    var separateur = "'";
    var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ; 
    var val=Math.floor(Math.abs(valeur));
    if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
    var val_format=val+"";
    var nb=val_format.length;
    for (var i=1;i<4;i++) {
        if (val>=Math.pow(10,(3*i))) {
            val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
        }
    }
    if (decimal>0) {
        var decim=""; 
        for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
        deci=decim+deci.toString();
        val_format=val_format+"."+deci;
    }
    if (parseFloat(valeur)<0) {val_format="-"+val_format;}
    return val_format;
}
function udt_page_empire(){
    var account = docId('select_account').value;
    if (account != 0){
        pseudo = GM_getValue("exist_pseudo"+account);
        serveur = GM_getValue("exist_serv"+account);
        //my_info("Ouverture du compte "+pseudo);
        write_on_empire_page();
        // comparaison de l'ancien nombre de construction en cours, si inférieur lancé un beep
        //my_info("Consrution : "+nb_construction+"/"+old_nb_construction);
        if (nb_construction < old_nb_construction){
            beep();
        }
        old_nb_construction = nb_construction;
        nb_construction = 0;
    }
    else{
        clear_empire();
    }
    setTimeout(udt_page_empire,refresh_time);
}
function clear_all_settings(){
    var keys = GM_listValues();
    for (var i=0, key=null; key=keys[i]; i++) {
        GM_deleteValue(key);
    }
}
function load_working(){
    //my_info ("Planète active = "+planete_active)
    // remplace le niveau des constructions en cours par leur niveau actuel suivit du prochain niveau
    var listes = new Array("mine_metal","mine_cristal","mine_deut","central_solaire","central_fusion","hangar_metal","hangar_cristal","hangar_deut","cache_metal","cache_cristal","cache_deut","usine_robot","chantier_spatial","labo"   ,"depot"  ,"silo"   ,"nanite" ,"terraformer");
    var pages = new Array( "resources" ,"resources"   ,"resources","resources"      ,"resources"     ,"resources"   ,"resources"     ,"resources"  ,"resources"  ,"resources"    ,"resources" ,"station"    ,"station"         ,"station","station","station","station","station");
    for (i=0; i<listes.length;i++){
        // vérification de l'état de la construction
        //my_info("test");
        tmp_name = "working_"+pages[i]+"_"+listes[i];
        tmp = my_load(tmp_name,1,"");
        if (tmp != ""){
            // un batiment trouvé
            //my_info (planete_active+" : "+listes[i]+"("+tmp+")");
            //my_info(planete_active+" : "+listes[i]+" => "+eval(listes[i]));
            var splitted = tmp.split("|");
            var infp = "<span title='"+splitted[1]+"'>"+eval(listes[i])+" => "+splitted[0]+"</span>";
            var cmd = listes[i]+" = \""+infp+"\"";
            //my_info(cmd);
            eval(cmd);
            //my_info(eval(listes[i]));
            nb_construction++;
        }
    }
}

// Script main :
if (location.href.split('/')[2].split('.')[1] != "tsuna"){
    serveur = location.href.split('/')[2].split('.')[0];
    pseudo = getpseudo();
    page = document.URL.split("page=")[1].split("&")[0];
    chk_account_saved();
    found_planete_active();
    load_settings();
    udt_ressource_prod();
    load_ress_place();
    load_prod();
    setTimeout(update_info,refresh_time);
    setTimeout(update_ressource_dispo,refresh_time);
    check_price();
}
else{
    my_info("Ouverture de la page sur tsuna.fr");
    load_account();
    setTimeout(udt_page_empire,refresh_time);
}
