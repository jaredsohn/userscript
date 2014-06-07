// ==UserScript==

// @name           Grepolis Wall Tool

// @author         balping

// @namespace      balping

// @include        http://*.grepolis.*/game/building_wall*

// @icon           http://static.grepolis.com/images/game/main/wall.png

// @version        2.0

// @description    Shows losses since last saved wall and calculates resources

// ==/UserScript==




/*init*/

    var ff = (typeof unsafeWindow !== 'undefined');

    var uW = ((ff) ? unsafeWindow : window), $ = uW.jQuery;

    

    var n = /(\w+)(\d+)\.grepolis\.com/.exec(window.location.host);

	server = n[2];

	orszag = n[1];

    var lang = (n[1] || 'en'); // , server = (n[1] + n[2]);

    var townId = parseInt(uW.Game.townId, 10);

	player = uW.Game.player_id;

    var nwWall = ($('.wall_report_unit').length > 0);

    var Ts = {
    	en: {

            save: 'Save',
            help: 'Help',

			settings: "Settings",

			settings_text: "You can change the 'Grepolis Wall Tool' script's settings here.",

			show_res: "Show resources",

			show_info: "Show unit info",

			show_sum: "Show summary",

			show_comp: "Show comparison",

			calc_save: "Calculate losts since the save:",
			saved: 'Saved. Set the "Calculate losses since the save" settind\'s value.',

			no_calc: "Turn this function off",

			yes: "Yes",

			no: "No",

			save_color: "Color of losses",

			red: "red",

			white: "white",

			wood: "Wood",

			stone: "Stone",

			iron: "Iron",
			res: "Resources",

			sum_res: "All resources",

			sum_r: "All lost own unit",

			sum_l: "All killed enemy unit",

			population: "Population",

			favor: "Favor",

			cancel: "Cancel",
			delete_save: "Delete save",

			label_pop: {// -1 means:  nothing will be displayed

							lc: "The enemy's losses are in this column.",

							rc: "Your own losses are in this column.",

							lt: "Enemy units you have killed when you attacked",

							rt: "Own units who have died when you attacked.",

							lb: "Enemy units you have killed when they attacked you.",

							rb: "Your own units who have died when they attacked you."

						},

			label: {// -1 means:  nothing will be displayed

							lc: "Enemy units you have killed...",

							rc: "Your own units who have died when you...",

							lt: -1,

							rt: "...attacked",

							lb: -1,

							rb: "...were on the defensive"

					}

        },

		hu: {

            save: 'Mentés',
            help: 'Súgó',

			settings: "Beállítások",

			settings_text: "Itt állíthatod be a városfal script tulajdonságait.",

			show_res: "Nyersanyagok mutatása",

			show_info: "Egység információk mutatása",

			show_sum: "Összesítés mutatása",

			show_comp: "Összehasonlítás mutatása",

			calc_save: "Veszteségek számítása a következő mentéshez képest:",
			saved: 'Városfal állapota mentve. Ahhoz, hogy a script ehhez a mentéshez képest számoljon, állísd át a "Veszteségek számítása a következő mentéshez képest" beállítás értékét!',

			no_calc: "Funkció kikapcsolása",

			yes: "Igen",

			no: "Nem",

			save_color: "Veszteségek színe",

			red: "piros",

			white: "fehér",

			wood: "Fa",

			stone: "Kő",

			iron: "Ezüst",

			res: "Nyersanyag",

			sum_res: "Összes nyersanyag",

			sum_r: "Összes elvesztett saját egység",

			sum_l: "Összes leölt ellenséges egység",

			population: "Népesség",

			favor: "Áldás",

			cancel: "Mégse",
			delete_save: "Mentés törlése",

			label_pop: {// -1 means:  nothing will be displayed

							lc: "Ebben az oszlopban az ellenség veszteségei láthatóak.",

							rc: "Ebben az oszlopban a saját veszteségeid láthatóak.",

							lt: "Ellenséges katonák, akiket akkor öltél meg, amikor te támadtál.",

							rt: "Saját katonáid, akik akkor haltak meg, amikor te támadtál.",

							lb: "Ellenséges katonák, akiket védekezés során öltél meg, amikor téged támadtak.",

							rb: "Saját katonáid, akik védekezés során haltak meg, amikor téged támadtak."

						},

			label: {// -1 means:  nothing will be displayed

							lc: "Ellenséges katonák, akiket te öltél meg...",

							rc: "Saját katonák, akik akkor haltak meg, amikor te...",

							lt: -1,

							rt: "...támadtál",

							lb: -1,

							rb: "...védekeztél"

					}

        }

    };

    var T = Ts[lang];

    var reUnit = /game\/units\/(\w+)_\d+x\d+\.png/;
    

	sett = load_settings();

	GM_addStyle(".GM_wall_settings { position: fixed; z-Index: 9002; width: 450px; align: middle; top: 100px;}");

	GM_addStyle("#GM_wall_hide { z-Index: 9001; background-color: black; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; }");

	GM_addStyle(".GM_wall_unit_values {width: 257px; border-width: 1px; border-style: solid; border-collapse: collapse; padding: 2px; border-color: #e1af55;  position: relative; white-space:nowrap;}");

	GM_addStyle(".GM_wall_unit_values td {height: 30px; background: #ffe2a1; border-color: #e1af55; text-align: center;}");

	GM_addStyle(".GM_wall_place_unit_top_red {position: absolute; color: " + (sett.GM_wall_set_color) + "; left: 1px; top: 1px;}");

	GM_addStyle(".GM_wall_place_unit_top_black {position: absolute; color: black; left: 2px; top: 2px;}");

	uW.sets=false;

	help();

	kiirasok();

	getUnitData();

	
/*init end*/



	function help(){

		//egyértelműsítés

		var cimek = new Array(); 

		var lll	= document.getElementsByClassName('list_item_left');

		var rrr	= document.getElementsByClassName('list_item_right');



		cimek["lc"]	= lll[0];

		cimek["rc"]	= rrr[0];



		cimek["lt"]	= lll[1];

		cimek["rt"]	= rrr[1];



		cimek["lb"]	= lll[3];

		cimek["rb"]	= rrr[3];



		

		var script = null;

		for (nev in cimek){

			cimek[nev].id = "GM_grepowall_" + nev;

			if (T.label[nev] != -1){

				switch (nev.substr(1, 1)){

					case "c":

						cimek[nev].innerHTML = "<h3>" + T.label[nev] + "</h3>";

						break;

					case "t":

						cimek[nev].innerHTML = "<h4><span class=\"wall_symbol wall_att\"></span>" + T.label[nev] + "</h4>";

						break;

					case "b":

						cimek[nev].innerHTML = "<h4><span class=\"wall_symbol wall_def\"></span>" + T.label[nev] + "</h4>";

						break;

				}

			}

			script = null;

			script	= document.createElement('script');

			script.setAttribute("type", "text/javascript");

			script.innerHTML = "$(\"#" + cimek[nev].id + "\").mousePopup(new MousePopup(\"" + T.label_pop[nev] + "\"));";

			cimek[nev].appendChild(script);

		}

	}



	function res(unitdata){

		var sett = load_settings();

		var mentesek = olvas();
		if (mentesek == null){ sett.GM_wall_set_current_save = -1; }

		if (sett.GM_wall_set_current_save != -1){

			var amentes = mentesek[orszag][player][server][sett.GM_wall_set_current_save];

		}

		if (sett.GM_wall_set_show_res == 1 || sett.GM_wall_set_show_info == 1){

		//var most = most(); //mentés tulajdonságai vannak

		var cellak = document.getElementsByClassName('wall_unit_container');

		var osszes = null;

		var script = null;

		var db = null;

		var sum = {db:0, wood:0, stone:0, iron:0, population:0, favor:0, res:0};

		var cella = 0;

		var newspan1 = null;

		var newspan2 = null;

		var kulonb = 0;

		for (cella=0; cella<cellak.length; cella++){

			osszes = null;

			sum = {db:0, wood:0, stone:0, iron:0, population:0, favor:0, res:0, kul_db:0, kul_wood:0, kul_stone:0, kul_iron:0, kul_population:0, kul_favor:0, kul_res:0};

			osszes = cellak[cella].getElementsByClassName('wall_report_unit');

			var egyseg = 0;

			for (egyseg=0; egyseg<osszes.length; egyseg++){

				db = osszes[egyseg].getElementsByTagName("span")[0].innerHTML;

				nev = getUnitName(osszes[egyseg]);

				osszes[egyseg].getElementsByTagName("span")[0].parentNode.id = "GM_wall_cella" + cella + "_unit_" + nev;

				if (sett.GM_wall_set_current_save != -1){

					if(typeof amentes[cella][nev] === "undefined"){amentes[cella][nev] = 0;}

					kulonb = db - amentes[cella][nev];

					newspan1 = null;

					newspan2 = null;

					newspan1 = document.createElement("span");

					newspan2 = document.createElement("span");

					newspan1.setAttribute("class", "GM_wall_place_unit_top_red bold");

					newspan2.setAttribute("class", "GM_wall_place_unit_top_black bold");

					newspan1.innerHTML = kulonb;

					newspan2.innerHTML = kulonb;

					osszes[egyseg].appendChild(newspan2);

					osszes[egyseg].appendChild(newspan1);

				}

				//most[cella][nev] = db;

//alert('HH');

//(typeof unitdata[nev].favor != "undefined") ?

//alert((unitdata[nev].resources != null) ? nev + " van" : nev + " nincs");



				if(unitdata[nev].resources == null){

					unitdata[nev].resources = {}; 

					unitdata[nev].resources.wood = 0;

					unitdata[nev].resources.stone = 0;

					unitdata[nev].resources.iron = 0;

				}



				sum.db = sum.db + db*1;

				sum.wood = sum.wood + (unitdata[nev].resources.wood * db);

				sum.stone = sum.stone + (unitdata[nev].resources.stone * db);

				sum.iron = sum.iron + (unitdata[nev].resources.iron* db);

				sum.population = sum.population + (unitdata[nev].population * db);

				sum.favor = sum.favor + (unitdata[nev].favor * db);

				sum.kul_db = sum.kul_db + kulonb;

				sum.kul_wood = sum.kul_db + (unitdata[nev].resources.wood * kulonb);

				sum.kul_stone = sum.kul_db + (unitdata[nev].resources.stone * kulonb);

				sum.kul_iron = sum.kul_db + (unitdata[nev].resources.iron * kulonb);

				sum.kul_populatiom = sum.kul_db + (unitdata[nev].resources.population * kulonb);

				sum.kul_favor = sum.kul_db + (unitdata[nev].resources.favor * kulonb);



				var popup ="<div style=\"width: " + ((sett.GM_wall_set_show_info == 1) ? "520px" : "auto") + ";\"><div style=\"float:left;\">";//"<table border=\"1\" style=\"vertical-align: top; border-style: solid; border-width: 1px;\"><tbody><tr style=\"vertical-align: top;\"><td>";

				if (sett.GM_wall_set_show_info == 1){

				if (typeof unitdata[nev].defense == "undefined"){//unit or ship

					//unit

					popup += '<div class="temple_unit_popup" style="width: auto;"><h4>' + unitdata[nev].name + '</h4><img src="http://static.grepolis.com/images/game/units/' + nev + '_90x90.jpg" alt="' + unitdata[nev].name + '" style="padding-right: 20px;"><div class="temple_unit_popup_info" style="width: auto;"><table id="unit_order_unit_info" style="font-weight: bold; top: 0px;" border="1"><tbody><tr><td><div id="unit_order_att_' + unitdata[nev].attack_type + '"></div>' + ((typeof unitdata[nev].attack !="undefined") ? unitdata[nev].attack : "0") + '</td><td><div id="unit_order_def_hack"></div>' + ((typeof unitdata[nev].def_hack !="undefined") ? unitdata[nev].def_hack : "0") + '</td></tr><tr><td><div id="unit_order_speed"></div>' + ((typeof unitdata[nev].speed !="undefined") ? unitdata[nev].speed : "0") + '</td><td><div id="unit_order_def_pierce"></div>' + ((typeof unitdata[nev].def_pierce !="undefined") ? unitdata[nev].def_pierce : "0") + '</td></tr><tr><td><div id="unit_order_booty"></div>' + ((typeof unitdata[nev].booty !="undefined") ? unitdata[nev].booty : "0") + '</td><td><div id="unit_order_def_distance"></div>' + ((typeof unitdata[nev].def_distance !="undefined") ? unitdata[nev].def_distance : "0") + '</td></tr></tbody></table></div></div>';

					//popup += '<td><table id="unit_order_unit_info" style="font-weight: bold; top: 0px; align: left;" border="1"><tbody><tr><td><div id="unit_order_att_' + unitdata[nev].attack_type + '"></div>' + ((typeof unitdata[nev].attack !="undefined") ? unitdata[nev].attack : "0") + '</td><td><div id="unit_order_def_hack"></div>' + ((typeof unitdata[nev].def_hack !="undefined") ? unitdata[nev].def_hack : "0") + '</td></tr><tr><td><div id="unit_order_speed"></div>' + ((typeof unitdata[nev].speed !="undefined") ? unitdata[nev].speed : "0") + '</td><td><div id="unit_order_def_pierce"></div>' + ((typeof unitdata[nev].def_pierce !="undefined") ? unitdata[nev].def_pierce : "0") + '</td></tr><tr><td><div id="unit_order_booty"></div>' + ((typeof unitdata[nev].booty !="undefined") ? unitdata[nev].booty : "0") + '</td><td><div id="unit_order_def_distance"></div>' + ((typeof unitdata[nev].def_distance !="undefined") ? unitdata[nev].def_distance : "0") + '</td></tr></tbody></table></td></tr></tbody></table><p style="width: 240px;">' + unitdata[nev].description + '</p></div></div>';

				}else{

					//ship

					popup += '<div class="temple_unit_popup" style="width: auto;"><h4>' + unitdata[nev].name + '</h4><img src="http://static.grepolis.com/images/game/units/' + nev + '_90x90.jpg" alt="' + unitdata[nev].name + '" style="padding-right: 20px;"><div class="temple_unit_popup_info" style="width: auto;"><table id="unit_order_unit_info" style="font-weight: bold; top: 0px;" border="1"><tbody><tr><td><div id="unit_order_attack"></div>' + unitdata[nev].attack + '</td><td><div id="unit_order_defense"></div>' + unitdata[nev].defense + '</td></tr><tr><td><div id="unit_order_speed"></div>' + unitdata[nev].speed + '</td><td><div id="unit_order_transport"></div>' + unitdata[nev].capacity + '</td></tr></tbody></table></div></div>';

				}

				}

				//popup += "</td><td>";

				popup += "</div>";

				if (sett.GM_wall_set_show_res == 1){

					popup += "<div style=\"top: 5px; float: " + ((sett.GM_wall_set_show_info == 1) ? "right" : "left") + ";\">";

					popup += "<table border=\"1\" class=\"GM_wall_unit_values\" ><thead><tr><td colspan=\"2\" >" + T.res + "</td><td colspan=\"2\">" + T.sum_res + "</td></tr></thead><tbody>";



					popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/wood.png\"  alt=\"" + T.wood + "\"></td><td>" + unitdata[nev].resources.wood + "</td><td>" + szepszam(unitdata[nev].resources.wood * db) + (((unitdata[nev].resources.wood*kulonb)>0) ? "<br/>(+" + szepszam(unitdata[nev].resources.wood * kulonb) + ")" : "" ) + "</td><td rowspan=\"3\">" + (szepszam((unitdata[nev].resources.wood + unitdata[nev].resources.stone + unitdata[nev].resources.iron)*db)) + (  ((((unitdata[nev].resources.wood + unitdata[nev].resources.stone + unitdata[nev].resources.iron)*kulonb)>0)? ("<br/>(+" + (szepszam((unitdata[nev].resources.wood + unitdata[nev].resources.stone + unitdata[nev].resources.iron)*kulonb) + ")")) : "") ) + "</td></tr>";



					popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/stone.png\"  alt=\"" + T.stone + "\"></td><td>" + unitdata[nev].resources.stone + "</td><td>" + szepszam(unitdata[nev].resources.stone * db) + (((unitdata[nev].resources.stone*kulonb)>0) ? "<br/>(+" + szepszam(unitdata[nev].resources.stone * kulonb) + ")" : "") + "</td></tr>";



					popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/iron.png\"  alt=\"" + T.iron+ "\"></td><td>" + unitdata[nev].resources.iron + "</td><td>" + szepszam(unitdata[nev].resources.iron * db) + (((unitdata[nev].resources.iron*kulonb)>0) ? "<br/>(+" + szepszam(unitdata[nev].resources.iron * kulonb) + ")" : "") + "</td></tr>";



					popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/pop.png\"  alt=\"" + T.population + "\"></td><td>" + unitdata[nev].population + "</td><td colspan=\"2\">" + szepszam(unitdata[nev].population * db) + (((unitdata[nev].population*kulonb)>0) ? "<br/>(+" + szepszam(unitdata[nev].population * kulonb) + ")" : "") + "</td></tr>";



					popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/favor.png\"  alt=\"" + T.favor + "\"></td><td>" + unitdata[nev].favor + "</td><td colspan=\"2\">" + szepszam(unitdata[nev].favor * db) + (((unitdata[nev].favor*kulonb)>0) ? "<br/>(+" + szepszam(unitdata[nev].favor * kulonb) + ")" : "") + "</td></tr>" ;

					popup += "</tbody></table></div>";

				}



				

				popup += ((sett.GM_wall_set_show_res == 0) ? "<div style=\"position: relative; padding-top: 20px; padding-left: 5px;\">" : "<div>") + ((sett.GM_wall_set_show_info == 1) ? unitdata[nev].description : "" ) + "</div></div>";

				uW.GM_wall_popup = popup;



				script = null;

				script	= document.createElement('script');

				script.setAttribute("type", "text/javascript");

				script.innerHTML = "$(\"#" + "GM_wall_cella" + cella + "_unit_" + nev + "\").mousePopup(new MousePopup(GM_wall_popup));";

				osszes[egyseg].appendChild(script);

				uW.GM_wall_popup = null;

				//alert("GM_wall_cella" + cella + "_unit_" + nev);

			}



		if (sett.GM_wall_set_show_res == 1 && sum.db>0 && sett.GM_wall_set_show_sum == 1){

			sum.res = sum.wood + sum.stone + sum.iron;

			sum.kul_res = sum.kul_wood + sum.kul_stone + sum.kul_iron;

			table = null;

			table = document.createElement('div');

			//table.setAttribute("class", "wall_report_unit");

			table.setAttribute("style", "float: left; margin: 1px; position: relative; width: 50px; height: 50px; border: 1px solid #431; font-weight: bold; background-color: red; background-image: url(http://static.grepolis.com/images/game/place/simulator/ground_factor.png); background-repeat:no-repeat; background-position:center; ");

			table.id = "GM_wall_cella" + cella + "_sum";

			table.innerHTML = '<span class="place_unit_black bold" style="font-size: 25px;">&#8721;</span><span class="place_unit_white bold" style="font-size: 25px;">&#8721;</span>';

			cellak[cella].appendChild(table);



			popup = "<table border=\"1\" class=\"GM_wall_unit_values\" ><thead><tr><td colspan=\"3\" >" + T.sum_res + "</td></tr></thead><tbody>";

			popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/ally/leader.png\"></td><td colspan=\"2\" >" + szepszam(sum.db) + ( (sum.kul_db>0)? ("<br/>(+" + szepszam(sum.kul_db) + ")") : "" ) + "</td></tr>";

			popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/wood.png\"  alt=\"" + T.wood + "\"></td><td>" + szepszam(sum.wood) + ( (sum.kul_wood>0)? ("<br/>(+" + szepszam(sum.kul_wood) + ")") : "" ) + "</td><td rowspan=\"3\">" + szepszam(sum.res) + ( (sum.kul_res>0)? ("<br/>(+" + szepszam(sum.kul_res) + ")") : "" ) + "</td></tr>";

			popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/stone.png\"  alt=\"" + T.stone + "\"></td><td>" + szepszam(sum.stone) + ( (sum.kul_stone>0)? ("<br/>(+" + szepszam(sum.kul_stone) + ")") : "" ) + "</td></tr>";

			popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/iron.png\"  alt=\"" + T.iron+ "\"></td><td>" + szepszam(sum.iron) + ( (sum.kul_iron>0)? ("<br/>(+" + szepszam(sum.kul_iron) + ")") : "" ) + "</td></tr>";

			popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/pop.png\"  alt=\"" + T.population + "\"></td><td colspan=\"2\" >" + szepszam(sum.population) + ( (sum.kul_population>0)? ("<br/>(+" + szepszam(sum.kul_population) + ")") : "" ) + "</td></tr>";

			popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/favor.png\"  alt=\"" + T.favor + "\"></td><td colspan=\"2\" >" + szepszam(sum.favor) + ( (sum.kul_favor>0)? ("<br/>(+" + szepszam(sum.kul_favor) + ")") : "" ) + "</td></tr>" ;

			popup += "</tbody></table>";

			uW.GM_wall_popup = popup;



			script = null;

			script	= document.createElement('script');

			script.setAttribute("type", "text/javascript");

			script.innerHTML = "$(\"#" + "GM_wall_cella" + cella + "_sum" + "\").mousePopup(new MousePopup(GM_wall_popup));";

			cellak[cella].appendChild(script);

			uW.GM_wall_popup = null;

		}

		}

		}

		if (sett.GM_wall_set_show_sum == 1){

		var ossz = most();

		

		var suml = {db:0, wood:0, stone:0, iron:0, res:0, population:0, favor:0, units:{}, kul_db:0, kul_wood:0, kul_stone:0, kul_iron:0, kul_res:0, kul_population:0, kul_favor:0, kul_units:{}};

		var sumr = {db:0, wood:0, stone:0, iron:0, res:0, population:0, favor:0, units:{}, kul_db:0, kul_wood:0, kul_stone:0, kul_iron:0, kul_res:0, kul_population:0, kul_favor:0, kul_units:{}};

		var cellan = 0;

		for (cellan=0; cellan<=3; cellan++){

			for (unitname in ossz[cellan]){

				if(	unitdata[unitname].resources == null){

					unitdata[unitname].resources = {}; 

					unitdata[unitname].resources.wood = 0;

					unitdata[unitname].resources.stone = 0;

					unitdata[unitname].resources.iron = 0;

				}

				if (typeof amentes == "undefined"){kulonb = 0;  }else{ kulonb = ossz[cellan][unitname] - amentes[cellan][unitname];}

				

				if (cellan == 0 || cellan == 2){//left				

					suml.units[unitname] = ((typeof suml.units[unitname] == "undefined") ? (ossz[cellan][unitname] * 1) : (suml.units[unitname] * 1 + ossz[cellan][unitname] * 1));

					suml.db = suml.db + ossz[cellan][unitname] * 1;

					suml.wood = suml.wood + unitdata[unitname].resources.wood * ossz[cellan][unitname];

					suml.stone = suml.stone + unitdata[unitname].resources.stone * ossz[cellan][unitname];

					suml.iron = suml.iron + unitdata[unitname].resources.iron * ossz[cellan][unitname];

					suml.population = suml.population + unitdata[unitname].population * ossz[cellan][unitname];

					suml.favor = suml.favor + unitdata[unitname].favor * ossz[cellan][unitname];

					suml.res = suml.wood + suml.stone + suml.iron;



					suml.kul_units[unitname] = ((typeof suml.kul_units[unitname] == "undefined") ? (kulonb * 1) : (suml.kul_units[unitname] * 1 + kulonb * 1));

					suml.kul_db = suml.kul_db + kulonb *1;

					suml.kul_wood = suml.kul_wood + unitdata[unitname].resources.wood * kulonb;

					suml.kul_stone = suml.kul_stone + unitdata[unitname].resources.stone * kulonb;

					suml.kul_iron = suml.kul_iron + unitdata[unitname].resources.iron * kulonb;

					suml.kul_population = suml.kul_population + unitdata[unitname].population * kulonb;

					suml.kul_favor = suml.kul_favor + unitdata[unitname].favor * kulonb;

					suml.kul_res = suml.kul_wood + suml.kul_stone + suml.kul_iron;

				}else{//right

					sumr.units[unitname] = ((typeof sumr.units[unitname] == "undefined") ? (ossz[cellan][unitname] * 1) : (sumr.units[unitname] * 1 + ossz[cellan][unitname] * 1));

					sumr.db = sumr.db + ossz[cellan][unitname] * 1;

					sumr.wood = sumr.wood + unitdata[unitname].resources.wood * ossz[cellan][unitname];

					sumr.stone = sumr.stone + unitdata[unitname].resources.stone * ossz[cellan][unitname];

					sumr.iron = sumr.iron + unitdata[unitname].resources.iron * ossz[cellan][unitname];

					sumr.population = sumr.population + unitdata[unitname].population * ossz[cellan][unitname];

					sumr.favor = sumr.favor + unitdata[unitname].favor * ossz[cellan][unitname];

					sumr.res = sumr.wood + sumr.stone + sumr.iron;



					sumr.kul_units[unitname] = ((typeof sumr.kul_units[unitname] == "undefined") ? (kulonb * 1) : (sumr.kul_units[unitname] * 1 + kulonb * 1));

					sumr.kul_db = sumr.kul_db + kulonb *1;

					sumr.kul_wood = sumr.kul_wood + unitdata[unitname].resources.wood * kulonb;

					sumr.kul_stone = sumr.kul_stone + unitdata[unitname].resources.stone * kulonb;

					sumr.kul_iron = sumr.kul_iron + unitdata[unitname].resources.iron * kulonb;

					sumr.kul_population = sumr.kul_population + unitdata[unitname].population * kulonb;

					sumr.kul_favor = sumr.kul_favor + unitdata[unitname].favor * kulonb;

					sumr.kul_res = sumr.kul_wood + sumr.kul_stone + sumr.kul_iron;

				}

			}

		}



		var list = document.getElementsByClassName("game_list")[0];

		var li	= document.createElement('li');

		li.setAttribute("class", "even");

		li.innerHTML = '<div class="list_item_left"><h4><span class="wall_symbol wall_att"></span><span class="wall_symbol wall_def"></span>' + T.sum_l + '</h4></div><div class="list_item_right"><h4><span class="wall_symbol wall_att"></span><span class="wall_symbol wall_def"></span>' + T.sum_r + '</h4></div><div style="clear:both;"></div>';

		list.appendChild(li);



		var sum_li	= document.createElement('li');

		sum_li.setAttribute("class", "odd");

		var c = 0;

		uW.GM_wall_pop_sum = new Array();

		

		/*sumleft start*/

		var sum_li_left = '<div class="list_item_left"><div class="wall_unit_container">';

		for (unitname in suml.units){

			if (suml.units[unitname]>0){

			c++;

			sum_li_left += '<div id="GM_wall_sum' + c + '" style="background-image: url(http://static.grepolis.com/images/game/units/' + unitname + '_50x50.png);" class="wall_report_unit"><span class="place_unit_black bold">' + suml.units[unitname] + '</span><span class="place_unit_white bold">' + suml.units[unitname] + '</span><span class="GM_wall_place_unit_top_black bold">' +((sett.GM_wall_set_current_save != -1)? (suml.kul_units[unitname] + '</span><span class="GM_wall_place_unit_top_red bold">' + suml.kul_units[unitname] + '</span>'):'') + '</div>'; /*TODO*/

			uW.GM_wall_pop_sum[c] ="<div style=\"width: " + ((sett.GM_wall_set_show_info == 1) ? "520px" : "auto") + ";\"><div style=\"float:left;\">";

			if (sett.GM_wall_set_show_info == 1 || sett.GM_wall_set_show_res == 1){

			if (sett.GM_wall_set_show_info == 1){

			if (typeof unitdata[unitname].defense == "undefined"){//unit or ship

				//unit

				uW.GM_wall_pop_sum[c] += '<div class="temple_unit_popup" style="width: auto;"><h4>' + unitdata[unitname].name + '</h4><img src="http://static.grepolis.com/images/game/units/' + unitname + '_90x90.jpg" alt="' + unitdata[unitname].name + '" style="padding-right: 20px;"><div class="temple_unit_popup_info" style="width: auto;"><table id="unit_order_unit_info" style="font-weight: bold; top: 0px;" border="1"><tbody><tr><td><div id="unit_order_att_' + unitdata[unitname].attack_type + '"></div>' + ((typeof unitdata[unitname].attack !="undefined") ? unitdata[unitname].attack : "0") + '</td><td><div id="unit_order_def_hack"></div>' + ((typeof unitdata[unitname].def_hack !="undefined") ? unitdata[unitname].def_hack : "0") + '</td></tr><tr><td><div id="unit_order_speed"></div>' + ((typeof unitdata[unitname].speed !="undefined") ? unitdata[unitname].speed : "0") + '</td><td><div id="unit_order_def_pierce"></div>' + ((typeof unitdata[unitname].def_pierce !="undefined") ? unitdata[unitname].def_pierce : "0") + '</td></tr><tr><td><div id="unit_order_booty"></div>' + ((typeof unitdata[unitname].booty !="undefined") ? unitdata[unitname].booty : "0") + '</td><td><div id="unit_order_def_distance"></div>' + ((typeof unitdata[unitname].def_distance !="undefined") ? unitdata[unitname].def_distance : "0") + '</td></tr></tbody></table></div></div>';



				//popup += '<td><table id="unit_order_unit_info" style="font-weight: bold; top: 0px; align: left;" border="1"><tbody><tr><td><div id="unit_order_att_' + unitdata[nev].attack_type + '"></div>' + ((typeof unitdata[nev].attack !="undefined") ? unitdata[nev].attack : "0") + '</td><td><div id="unit_order_def_hack"></div>' + ((typeof unitdata[nev].def_hack !="undefined") ? unitdata[nev].def_hack : "0") + '</td></tr><tr><td><div id="unit_order_speed"></div>' + ((typeof unitdata[nev].speed !="undefined") ? unitdata[nev].speed : "0") + '</td><td><div id="unit_order_def_pierce"></div>' + ((typeof unitdata[nev].def_pierce !="undefined") ? unitdata[nev].def_pierce : "0") + '</td></tr><tr><td><div id="unit_order_booty"></div>' + ((typeof unitdata[nev].booty !="undefined") ? unitdata[nev].booty : "0") + '</td><td><div id="unit_order_def_distance"></div>' + ((typeof unitdata[nev].def_distance !="undefined") ? unitdata[nev].def_distance : "0") + '</td></tr></tbody></table></td></tr></tbody></table><p style="width: 240px;">' + unitdata[nev].description + '</p></div></div>';

			}else{

				//ship

				uW.GM_wall_pop_sum[c] += '<div class="temple_unit_popup" style="width: auto;"><h4>' + unitdata[unitname].name + '</h4><img src="http://static.grepolis.com/images/game/units/' + unitname + '_90x90.jpg" alt="' + unitdata[unitname].name + '" style="padding-right: 20px;"><div class="temple_unit_popup_info" style="width: auto;"><table id="unit_order_unit_info" style="font-weight: bold; top: 0px;" border="1"><tbody><tr><td><div id="unit_order_attack"></div>' + unitdata[unitname].attack + '</td><td><div id="unit_order_defense"></div>' + unitdata[unitname].defense + '</td></tr><tr><td><div id="unit_order_speed"></div>' + unitdata[unitname].speed + '</td><td><div id="unit_order_transport"></div>' + unitdata[unitname].capacity + '</td></tr></tbody></table></div></div>';

			}

			}

			uW.GM_wall_pop_sum[c] += "</div>";

			if (sett.GM_wall_set_show_res == 1){

					uW.GM_wall_pop_sum[c] += "<div style=\"top: 5px; float: " + ((sett.GM_wall_set_show_info == 1) ? "right" : "left") + ";\">";

					uW.GM_wall_pop_sum[c] += "<table border=\"1\" class=\"GM_wall_unit_values\" ><thead><tr><td colspan=\"2\" >" + T.res + "</td><td colspan=\"2\">" + T.sum_res + "</td></tr></thead><tbody>";



					uW.GM_wall_pop_sum[c] += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/wood.png\"  alt=\"" + T.wood + "\"></td><td>" + unitdata[unitname].resources.wood + "</td><td>" + szepszam(unitdata[unitname].resources.wood * suml.units[unitname]) + ( ((unitdata[unitname].resources.wood * suml.kul_units[unitname])>0)? ("<br/>(+" + szepszam(unitdata[unitname].resources.wood * suml.kul_units[unitname]) + ")") : ""  ) + "</td><td rowspan=\"3\">" + szepszam((unitdata[unitname].resources.wood + unitdata[unitname].resources.stone + unitdata[unitname].resources.iron) * suml.units[unitname] ) + ( (((unitdata[unitname].resources.wood + unitdata[unitname].resources.stone + unitdata[unitname].resources.iron) * suml.kul_units[unitname])>0)? ("<br/>(+" + szepszam(unitdata[unitname].resources.wood * suml.kul_units[unitname]) + ")") : ""  ) + "</td></tr>"; //((unitdata[unitname].resources.wood * suml.units[unitname]) + suml.res)



					uW.GM_wall_pop_sum[c] += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/stone.png\"  alt=\"" + T.stone + "\"></td><td>" + unitdata[unitname].resources.stone + "</td><td>" + szepszam(unitdata[unitname].resources.stone * suml.units[unitname]) + ( ((unitdata[unitname].resources.stone * suml.kul_units[unitname])>0)? ("<br/>(+" + szepszam(unitdata[unitname].resources.stone * suml.kul_units[unitname]) + ")") : ""  ) + "</td></tr>";



					uW.GM_wall_pop_sum[c] += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/iron.png\"  alt=\"" + T.iron+ "\"></td><td>" + unitdata[unitname].resources.iron + "</td><td>" + szepszam(unitdata[unitname].resources.iron* suml.units[unitname]) + ( ((unitdata[unitname].resources.iron * suml.kul_units[unitname])>0)? ("<br/>(+" + szepszam(unitdata[unitname].resources.iron * suml.kul_units[unitname]) + ")") : ""  ) + "</td></tr>";



					uW.GM_wall_pop_sum[c] += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/pop.png\"  alt=\"" + T.population + "\"></td><td>" + unitdata[unitname].population + "</td><td colspan=\"2\">" + szepszam(unitdata[unitname].population * suml.units[unitname]) + ( ((unitdata[unitname].population * suml.kul_units[unitname])>0)? ("<br/>(+" + szepszam(unitdata[unitname].population * suml.kul_units[unitname]) + ")") : ""  ) + "</td></tr>";



					uW.GM_wall_pop_sum[c] += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/favor.png\"  alt=\"" + T.favor + "\"></td><td>" + unitdata[unitname].favor + "</td><td colspan=\"2\">" + szepszam(unitdata[unitname].favor * suml.units[unitname]) + ( ((unitdata[unitname].resources.wood * suml.kul_units[unitname])>0)? ("<br/>(+" + szepszam(unitdata[unitname].favor * suml.kul_units[unitname]) + ")") : ""  ) + "</td></tr>" ;

					uW.GM_wall_pop_sum[c] += "</tbody></table></div>";

			}

			uW.GM_wall_pop_sum[c] += ((sett.GM_wall_set_show_res == 0) ? "<div style=\"position: relative; padding-top: 20px; padding-left: 5px;\">" : "<div>") + ((sett.GM_wall_set_show_info == 1) ? unitdata[unitname].description : "" ) + "</div></div>";

		}

		}

		}



		if (sett.GM_wall_set_show_info == 1 || sett.GM_wall_set_show_res == 1){

			sum_li_left += '<div id="GM_wall_l_sum" style="float: left; margin: 1px; position: relative; width: 50px; height: 50px; border: 1px solid #431; font-weight: bold; background-color: red; background-image: url(http://static.grepolis.com/images/game/place/simulator/ground_factor.png); background-repeat:no-repeat; background-position:center; "><span class="place_unit_black bold" style="font-size: 25px;">&#8721;</span><span class="place_unit_white bold" style="font-size: 25px;">&#8721;</span></div>';

			

			if (sett.GM_wall_set_show_comp == 1){

				popup = "<table border=\"1\" class=\"GM_wall_unit_values\" ><thead><tr><td colspan=\"3\" >" + T.sum_res + "</td></tr></thead><tbody>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/ally/leader.png\"></td><td colspan=\"2\" style=\"color: " + (((suml.db / sumr.db)<1) ? "red" : "green" ) + ";\">" + szepszam(suml.db) + " (&times;" + ((sumr.db / suml.db).toFixed(2)) + ")" + ((suml.kul_db>0)? ("<br/>(+" + szepszam(suml.kul_db) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/wood.png\"  alt=\"" + T.wood + "\"></td><td style=\"color: " + (((suml.wood / sumr.wood)<1) ? "red" : "green" ) + ";\">" + szepszam(suml.wood) + " (&times;" + ((sumr.wood / suml.wood).toFixed(2)) + ")" + ((suml.kul_wood>0)? ("<br/>(+" + szepszam(suml.kul_wood) + ")") : ""  ) + "</td><td rowspan=\"3\" style=\"color: " + (((suml.res / sumr.res)<1) ? "red" : "green" ) + ";\">" + szepszam(suml.res) + " (&times;" + ((sumr.res / suml.res).toFixed(2)) + ")" + ((suml.kul_res>0)? ("<br/>(+" + szepszam(suml.kul_res) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/stone.png\"  alt=\"" + T.stone + "\"></td><td style=\"color: " + (((suml.stone / sumr.stone)<1) ? "red" : "green" ) + ";\">" + szepszam(suml.stone) + " (&times;" + ((sumr.stone / suml.stone).toFixed(2)) + ")" + ((suml.kul_stone>0)? ("<br/>(+" + szepszam(suml.kul_stone) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/iron.png\"  alt=\"" + T.iron+ "\"></td><td style=\"color: " + (((suml.iron / sumr.iron)<1) ? "red" : "green" ) + ";\">" + szepszam(suml.iron) + " (&times;" + ((sumr.iron / suml.iron).toFixed(2)) + ")" + ((suml.kul_iron>0)? ("<br/>(+" + szepszam(suml.kul_iron) + ")") : ""  ) + "</tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/pop.png\"  alt=\"" + T.population + "\"></td><td colspan=\"2\"  style=\"color: " + (((suml.population / sumr.population)<1) ? "red" : "green" ) + ";\">" + szepszam(suml.population) + " (&times;" + ((sumr.population / suml.population).toFixed(2)) + ")" + ((suml.kul_population>0)? ("<br/>(+" + szepszam(suml.kul_population) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/favor.png\"  alt=\"" + T.favor + "\"></td><td colspan=\"2\"  style=\"color: " + (((suml.favor / sumr.favor)<1) ? "red" : "green" ) + ";\">" + szepszam(suml.favor) + " (&times;" + ((sumr.favor / suml.favor).toFixed(2)) + ")" + ((suml.kul_favor>0)? ("<br/>(+" + szepszam(suml.kul_favor) + ")") : ""  ) + "</td></tr>" ;

				popup += "</tbody></table>";

			}else{

				popup = "<table border=\"1\" class=\"GM_wall_unit_values\" ><thead><tr><td colspan=\"3\" >" + T.sum_res + "</td></tr></thead><tbody>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/ally/leader.png\"></td><td colspan=\"2\" >" + szepszam(suml.db) + ((suml.kul_db>0)? ("<br/>(+" + szepszam(suml.kul_db) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/wood.png\"  alt=\"" + T.wood + "\"></td><td>" + szepszam(suml.wood) + ((suml.kul_wood>0)? ("<br/>(+" + szepszam(suml.kul_wood) + ")") : ""  ) + "</td><td rowspan=\"3\">" + szepszam(suml.res) + ((suml.kul_res>0)? ("<br/>(+" + szepszam(suml.kul_res) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/stone.png\"  alt=\"" + T.stone + "\"></td><td>" + szepszam(suml.stone) + ((suml.kul_stone>0)? ("<br/>(+" + szepszam(suml.kul_stone) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/iron.png\"  alt=\"" + T.iron+ "\"></td><td>" + szepszam(suml.iron) + ((suml.kul_iron>0)? ("<br/>(+" + szepszam(suml.kul_iron) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/pop.png\"  alt=\"" + T.population + "\"></td><td colspan=\"2\" >" + szepszam(suml.population) + ((suml.kul_population>0)? ("<br/>(+" + szepszam(suml.kul_population) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/favor.png\"  alt=\"" + T.favor + "\"></td><td colspan=\"2\" >" + szepszam(suml.favor) + ((suml.kul_favor>0)? ("<br/>(+" + szepszam(suml.kul_favor) + ")") : ""  ) + "</td></tr>" ;

				popup += "</tbody></table>";

			}

			uW.GM_wall_popup_l_sum = popup;

		}

		sum_li_left += '</div></div>';

		/*sumleft end*/



		/*sumright start*/

		var sum_li_right = '<div class="list_item_right"><div class="wall_unit_container">';

		for (unitname in sumr.units){

			if (sumr.units[unitname]>0){

			c++;

			sum_li_right += '<div id="GM_wall_sum' + c + '" style="background-image: url(http://static.grepolis.com/images/game/units/' + unitname + '_50x50.png);" class="wall_report_unit"><span class="place_unit_black bold">' + sumr.units[unitname] + '</span><span class="place_unit_white bold">' + sumr.units[unitname] + '</span><span class="GM_wall_place_unit_top_black bold">' +((sett.GM_wall_set_current_save != -1)? (sumr.kul_units[unitname] + '</span><span class="GM_wall_place_unit_top_red bold">' + sumr.kul_units[unitname] + '</span>'):'') + '</div>'; /*TODO*/

			uW.GM_wall_pop_sum[c] ="<div style=\"width: " + ((sett.GM_wall_set_show_info == 1) ? "520px" : "auto") + ";\"><div style=\"float:left;\">";

			if (sett.GM_wall_set_show_info == 1 || sett.GM_wall_set_show_res == 1){

			if (sett.GM_wall_set_show_info == 1){

			if (typeof unitdata[unitname].defense == "undefined"){//unit or ship

				//unit

				uW.GM_wall_pop_sum[c] += '<div class="temple_unit_popup" style="width: auto;"><h4>' + unitdata[unitname].name + '</h4><img src="http://static.grepolis.com/images/game/units/' + unitname + '_90x90.jpg" alt="' + unitdata[unitname].name + '" style="padding-right: 20px;"><div class="temple_unit_popup_info" style="width: auto;"><table id="unit_order_unit_info" style="font-weight: bold; top: 0px;" border="1"><tbody><tr><td><div id="unit_order_att_' + unitdata[unitname].attack_type + '"></div>' + ((typeof unitdata[unitname].attack !="undefined") ? unitdata[unitname].attack : "0") + '</td><td><div id="unit_order_def_hack"></div>' + ((typeof unitdata[unitname].def_hack !="undefined") ? unitdata[unitname].def_hack : "0") + '</td></tr><tr><td><div id="unit_order_speed"></div>' + ((typeof unitdata[unitname].speed !="undefined") ? unitdata[unitname].speed : "0") + '</td><td><div id="unit_order_def_pierce"></div>' + ((typeof unitdata[unitname].def_pierce !="undefined") ? unitdata[unitname].def_pierce : "0") + '</td></tr><tr><td><div id="unit_order_booty"></div>' + ((typeof unitdata[unitname].booty !="undefined") ? unitdata[unitname].booty : "0") + '</td><td><div id="unit_order_def_distance"></div>' + ((typeof unitdata[unitname].def_distance !="undefined") ? unitdata[unitname].def_distance : "0") + '</td></tr></tbody></table></div></div>';



				//popup += '<td><table id="unit_order_unit_info" style="font-weight: bold; top: 0px; align: left;" border="1"><tbody><tr><td><div id="unit_order_att_' + unitdata[nev].attack_type + '"></div>' + ((typeof unitdata[nev].attack !="undefined") ? unitdata[nev].attack : "0") + '</td><td><div id="unit_order_def_hack"></div>' + ((typeof unitdata[nev].def_hack !="undefined") ? unitdata[nev].def_hack : "0") + '</td></tr><tr><td><div id="unit_order_speed"></div>' + ((typeof unitdata[nev].speed !="undefined") ? unitdata[nev].speed : "0") + '</td><td><div id="unit_order_def_pierce"></div>' + ((typeof unitdata[nev].def_pierce !="undefined") ? unitdata[nev].def_pierce : "0") + '</td></tr><tr><td><div id="unit_order_booty"></div>' + ((typeof unitdata[nev].booty !="undefined") ? unitdata[nev].booty : "0") + '</td><td><div id="unit_order_def_distance"></div>' + ((typeof unitdata[nev].def_distance !="undefined") ? unitdata[nev].def_distance : "0") + '</td></tr></tbody></table></td></tr></tbody></table><p style="width: 240px;">' + unitdata[nev].description + '</p></div></div>';

			}else{

				//ship

				uW.GM_wall_pop_sum[c] += '<div class="temple_unit_popup" style="width: auto;"><h4>' + unitdata[unitname].name + '</h4><img src="http://static.grepolis.com/images/game/units/' + unitname + '_90x90.jpg" alt="' + unitdata[unitname].name + '" style="padding-right: 20px;"><div class="temple_unit_popup_info" style="width: auto;"><table id="unit_order_unit_info" style="font-weight: bold; top: 0px;" border="1"><tbody><tr><td><div id="unit_order_attack"></div>' + unitdata[unitname].attack + '</td><td><div id="unit_order_defense"></div>' + unitdata[unitname].defense + '</td></tr><tr><td><div id="unit_order_speed"></div>' + unitdata[unitname].speed + '</td><td><div id="unit_order_transport"></div>' + unitdata[unitname].capacity + '</td></tr></tbody></table></div></div>';

			}

			}

			uW.GM_wall_pop_sum[c] += "</div>";

			if (sett.GM_wall_set_show_res == 1){

					uW.GM_wall_pop_sum[c] += "<div style=\"top: 5px; float: " + ((sett.GM_wall_set_show_info == 1) ? "right" : "left") + ";\">";

					uW.GM_wall_pop_sum[c] += "<table border=\"1\" class=\"GM_wall_unit_values\" ><thead><tr><td colspan=\"2\" >" + T.res + "</td><td colspan=\"2\">" + T.sum_res + "</td></tr></thead><tbody>";



					uW.GM_wall_pop_sum[c] += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/wood.png\"  alt=\"" + T.wood + "\"></td><td>" + unitdata[unitname].resources.wood + "</td><td>" + szepszam(unitdata[unitname].resources.wood * sumr.units[unitname]) + ( ((unitdata[unitname].resources.wood * sumr.kul_units[unitname])>0)? ("<br/>(+" + szepszam(unitdata[unitname].resources.wood * sumr.kul_units[unitname]) + ")") : ""  ) + "</td><td rowspan=\"3\">" + szepszam((unitdata[unitname].resources.wood + unitdata[unitname].resources.stone + unitdata[unitname].resources.iron) * sumr.units[unitname] ) + ( (((unitdata[unitname].resources.wood + unitdata[unitname].resources.stone + unitdata[unitname].resources.iron) * sumr.kul_units[unitname])>0)? ("<br/>(+" + szepszam(unitdata[unitname].resources.wood * sumr.kul_units[unitname]) + ")") : ""  ) + "</td></tr>"; //((unitdata[unitname].resources.wood * sumr.units[unitname]) + sumr.res)



					uW.GM_wall_pop_sum[c] += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/stone.png\"  alt=\"" + T.stone + "\"></td><td>" + unitdata[unitname].resources.stone + "</td><td>" + szepszam(unitdata[unitname].resources.stone * sumr.units[unitname]) + ( ((unitdata[unitname].resources.stone * sumr.kul_units[unitname])>0)? ("<br/>(+" + szepszam(unitdata[unitname].resources.stone * sumr.kul_units[unitname]) + ")") : ""  ) + "</td></tr>";



					uW.GM_wall_pop_sum[c] += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/iron.png\"  alt=\"" + T.iron+ "\"></td><td>" + unitdata[unitname].resources.iron + "</td><td>" + szepszam(unitdata[unitname].resources.iron* sumr.units[unitname]) + ( ((unitdata[unitname].resources.iron * sumr.kul_units[unitname])>0)? ("<br/>(+" + szepszam(unitdata[unitname].resources.iron * sumr.kul_units[unitname]) + ")") : ""  ) + "</td></tr>";



					uW.GM_wall_pop_sum[c] += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/pop.png\"  alt=\"" + T.population + "\"></td><td>" + unitdata[unitname].population + "</td><td colspan=\"2\">" + szepszam(unitdata[unitname].population * sumr.units[unitname]) + ( ((unitdata[unitname].population * sumr.kul_units[unitname])>0)? ("<br/>(+" + szepszam(unitdata[unitname].population * sumr.kul_units[unitname]) + ")") : ""  ) + "</td></tr>";



					uW.GM_wall_pop_sum[c] += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/favor.png\"  alt=\"" + T.favor + "\"></td><td>" + unitdata[unitname].favor + "</td><td colspan=\"2\">" + szepszam(unitdata[unitname].favor * sumr.units[unitname]) + ( ((unitdata[unitname].resources.wood * sumr.kul_units[unitname])>0)? ("<br/>(+" + szepszam(unitdata[unitname].favor * sumr.kul_units[unitname]) + ")") : ""  ) + "</td></tr>" ;

					uW.GM_wall_pop_sum[c] += "</tbody></table></div>";

			}

			uW.GM_wall_pop_sum[c] += ((sett.GM_wall_set_show_res == 0) ? "<div style=\"position: relative; padding-top: 20px; padding-left: 5px;\">" : "<div>") + ((sett.GM_wall_set_show_info == 1) ? unitdata[unitname].description : "" ) + "</div></div>";

		}

		}

		}



		if (sett.GM_wall_set_show_info == 1 || sett.GM_wall_set_show_res == 1){

			sum_li_right += '<div id="GM_wall_r_sum" style="float: left; margin: 1px; position: relative; width: 50px; height: 50px; border: 1px solid #431; font-weight: bold; background-color: red; background-image: url(http://static.grepolis.com/images/game/place/simulator/ground_factor.png); background-repeat:no-repeat; background-position:center; "><span class="place_unit_black bold" style="font-size: 25px;">&#8721;</span><span class="place_unit_white bold" style="font-size: 25px;">&#8721;</span></div>';

			

			if (sett.GM_wall_set_show_comp == 1){

				popup = "<table border=\"1\" class=\"GM_wall_unit_values\" ><thead><tr><td colspan=\"3\" >" + T.sum_res + "</td></tr></thead><tbody>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/ally/leader.png\"></td><td colspan=\"2\" style=\"color: " + (((suml.db / sumr.db)<1) ? "red" : "green" ) + ";\">" + szepszam(sumr.db) + " (&times;" + ((suml.db/ sumr.db).toFixed(2)) + ")" + ((sumr.kul_db>0)? ("<br/>(+" + szepszam(sumr.kul_db) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/wood.png\"  alt=\"" + T.wood + "\"></td><td style=\"color: " + (((suml.wood / sumr.wood)<1) ? "red" : "green" ) + ";\">" + szepszam(sumr.wood) + " (&times;" + ((suml.wood / sumr.wood).toFixed(2)) + ")" + ((sumr.kul_wood>0)? ("<br/>(+" + szepszam(sumr.kul_wood) + ")") : ""  ) + "</td><td rowspan=\"3\" style=\"color: " + (((suml.res / sumr.res)<1) ? "red" : "green" ) + ";\">" + szepszam(sumr.res) + " (&times;" + ((suml.res / sumr.res).toFixed(2)) + ")" + ((sumr.kul_res>0)? ("<br/>(+" + szepszam(sumr.kul_res) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/stone.png\"  alt=\"" + T.stone + "\"></td><td style=\"color: " + (((suml.stone / sumr.stone)<1) ? "red" : "green" ) + ";\">" + szepszam(sumr.stone) + " (&times;" + ((suml.stone / sumr.stone).toFixed(2)) + ")" + ((sumr.kul_stone>0)? ("<br/>(+" + szepszam(sumr.kul_stone) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/iron.png\"  alt=\"" + T.iron+ "\"></td><td style=\"color: " + (((suml.iron / sumr.iron)<1) ? "red" : "green" ) + ";\">" + szepszam(sumr.iron) + " (&times;" + ((suml.iron / sumr.iron).toFixed(2)) + ")" + ((sumr.kul_iron>0)? ("<br/>(+" + szepszam(sumr.kul_iron) + ")") : ""  ) + "</tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/pop.png\"  alt=\"" + T.population + "\"></td><td colspan=\"2\"  style=\"color: " + (((suml.population / sumr.population)<1) ? "red" : "green" ) + ";\">" + szepszam(sumr.population) + " (&times;" + ((suml.population / sumr.population).toFixed(2)) + ")" + ((sumr.kul_population>0)? ("<br/>(+" + szepszam(sumr.kul_population) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/favor.png\"  alt=\"" + T.favor + "\"></td><td colspan=\"2\"  style=\"color: " + (((suml.favor / sumr.favor)<1) ? "red" : "green" ) + ";\">" + szepszam(sumr.favor) + " (&times;" + ((suml.favor / sumr.favor).toFixed(2)) + ")" + ((sumr.kul_favor>0)? ("<br/>(+" + szepszam(sumr.kul_favor) + ")") : ""  ) + "</td></tr>" ;

				popup += "</tbody></table>";

			}else{

				popup = "<table border=\"1\" class=\"GM_wall_unit_values\" ><thead><tr><td colspan=\"3\" >" + T.sum_res + "</td></tr></thead><tbody>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/ally/leader.png\"></td><td colspan=\"2\" >" + szepszam(sumr.db) + ((sumr.kul_db>0)? ("<br/>(+" + szepszam(sumr.kul_db) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/wood.png\"  alt=\"" + T.wood + "\"></td><td>" + szepszam(sumr.wood) + ((sumr.kul_wood>0)? ("<br/>(+" + szepszam(sumr.kul_wood) + ")") : ""  ) + "</td><td rowspan=\"3\">" + szepszam(sumr.res) + ((sumr.kul_res>0)? ("<br/>(+" + szepszam(sumr.kul_res) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/stone.png\"  alt=\"" + T.stone + "\"></td><td>" + szepszam(sumr.stone) + ((sumr.kul_stone>0)? ("<br/>(+" + szepszam(sumr.kul_stone) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/iron.png\"  alt=\"" + T.iron+ "\"></td><td>" + szepszam(sumr.iron) + ((sumr.kul_iron>0)? ("<br/>(+" + szepszam(sumr.kul_iron) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/pop.png\"  alt=\"" + T.population + "\"></td><td colspan=\"2\" >" + szepszam(sumr.population) + ((sumr.kul_population>0)? ("<br/>(+" + szepszam(sumr.kul_population) + ")") : ""  ) + "</td></tr>";

				popup += "<tr><td><img src=\"http://static.grepolis.com/images/game/res/favor.png\"  alt=\"" + T.favor + "\"></td><td colspan=\"2\" >" + szepszam(sumr.favor) + ((sumr.kul_favor>0)? ("<br/>(+" + szepszam(sumr.kul_favor) + ")") : ""  ) + "</td></tr>" ;

				popup += "</tbody></table>";

			}

			uW.GM_wall_popup_r_sum = popup;

		}

		sum_li_right += '</div></div>';

		/*sumright end*/





		sum_li.innerHTML = sum_li_left + sum_li_right + '<div style="clear:both;">';

		list.appendChild(sum_li);



		if (sett.GM_wall_set_show_info == 1 || sett.GM_wall_set_show_res == 1){

			script = null;

			script	= document.createElement('script');

			script.setAttribute("type", "text/javascript");

			var nnn = 0;

			for (nnn=0; nnn<=c; nnn++){

				script.innerHTML += "$(\"#GM_wall_sum" + nnn + "\").mousePopup(new MousePopup(GM_wall_pop_sum[" + nnn + "]));\n";

			}

			script.innerHTML += "$(\"#" + "GM_wall_l_sum" + "\").mousePopup(new MousePopup(GM_wall_popup_l_sum));";

			script.innerHTML += "$(\"#" + "GM_wall_r_sum" + "\").mousePopup(new MousePopup(GM_wall_popup_r_sum));";

			list.appendChild(script);

		}

		}



		

	}



	

	function getUnitData(){



		var mygetrequest=new ajaxRequest();

		mygetrequest.onreadystatechange=function(){

			if (mygetrequest.readyState==4){

				if (mygetrequest.status==200 || window.location.href.indexOf("http")==-1){

					var jsondata = JSON.parse(mygetrequest.responseText); //retrieve result as an JavaScript object

					uW.GM_wall_res = jsondata;

					res(jsondata);

				}else{

					alert("An error has occured making the request");

				}

			}

		};

		mygetrequest.open("GET", "http://" + orszag + server + ".grepolis.com/data/units.json", true);

		mygetrequest.send(null);

	}



	function kiirasok(){

		var keret = document.getElementById("building_wall");



		var gomb_save = document.createElement("a");

		gomb_save.setAttribute("class", "button");

		gomb_save.setAttribute("href", "#");

		gomb_save.addEventListener("click", function(){mentes(most());}, true);

		gomb_save.innerHTML = "<span class=\"left\"><span class=\"right\"><span class=\"middle\">" + T.save + "</span></span></span><span style=\"clear:both;\"></span>";

		keret.appendChild(gomb_save);



		var gomb_settings = document.createElement("a");

		gomb_settings.setAttribute("class", "button");

		gomb_settings.setAttribute("href", "#");

		gomb_settings.addEventListener("click", function(){if(uW.sets){hide_settings();}else{show_settings();}}, true);

		gomb_settings.innerHTML = "<span class=\"left\"><span class=\"right\"><span class=\"middle\">" + T.settings + "</span></span></span><span style=\"clear:both;\"></span>";

		keret.appendChild(gomb_settings);
		
		var gomb_help = document.createElement("a");

		gomb_help.setAttribute("class", "button");

		gomb_help.setAttribute("href", "http://userscripts.org/scripts/show/106454");
		gomb_help.setAttribute("target", "_blank");

		gomb_help.innerHTML = "<span class=\"left\"><span class=\"right\"><span class=\"middle\">" + T.help + "</span></span></span><span style=\"clear:both;\"></span>";

		keret.appendChild(gomb_help);

	}



	function most(){

		/*var sum = {};

		sum[orszag] = {};

		sum[orszag][player] = {};

		sum[orszag][player][server] = {};*/

		var most = {}; //mentés tulajdonságai vannak

		var cellak = document.getElementsByClassName('wall_unit_container');

		var osszes = null;

		var db = null;

		most.idopont= uW.Game.server_time;

		var cella = 0;

		for (cella=0; cella<=3; cella++){

			osszes = null;

			osszes = cellak[cella].getElementsByClassName('wall_report_unit');

			most[cella] = {};

			for (egyseg=0; egyseg<osszes.length; egyseg++){

				db = osszes[egyseg].getElementsByTagName("span")[0].innerHTML;

				nev = getUnitName(osszes[egyseg]);

				most[cella][nev] = db;

				//alert("cella: " + cella + " egység: " + getUnitName(osszes[egyseg]) + " db: " + db);

			}

		}

		return most;

	}



	function mentes(mit){

		//a mit mentés tulajdonságú!

		var volt = olvas();

		if (volt == null){

			volt = {};

		}

		if (volt[orszag] == null){

			volt[orszag] = {};

		}

		if (volt[orszag][player] == null){

			volt[orszag][player] = {};

		}

		if (volt[orszag][player][server] == null){

			volt[orszag][player][server] = {};

		}

		var db=0;

		for (n in volt[orszag][player][server]){

			db++;

		}

		volt[orszag][player][server][db]=mit;

		GM_setValue("GM_grepowall_mentes", JSON.stringify(volt));
		alert(T.saved);

	}



	function olvas(){	uW.sets=false;

		return JSON.parse( GM_getValue("GM_grepowall_mentes", null));	

	}



	function show_settings(){

		var setwin = document.createElement("div");

		setwin.innerHTML = box(0);

		setwin.setAttribute("class" , "GM_wall_settings");

		var keret = document.getElementById("building_wall");

		keret.appendChild(setwin);



		var gomb_save = document.getElementById("GM_wall_settings_save");

		gomb_save.addEventListener("click", function(){if(uW.sets){save_settings(); hide_settings();}}, true);



		var back = document.createElement('div');

		back.id = "GM_wall_hide";

		document.body.appendChild(back);

		uW.sets=true;

		back_anim(-1);

	}



	function save_settings(){

		var values = {0: "GM_wall_set_show_res", 1: "GM_wall_set_show_info", 2: "GM_wall_set_show_sum", 3: "GM_wall_set_show_comp", 4: "GM_wall_set_color", 5: "GM_wall_set_current_save"};

		var sett = {};

		for (n in values){

			sett[values[n]] = document.getElementById(values[n]).value;

		}

		//alert(set["GM_wall_set_show_res"]);

		GM_setValue("GM_grepowall_settings", JSON.stringify(sett));

		window.location.reload();

	}



	function back_anim(irany){

		//irany -1: sötítít, +1: világosít

		var kezd = ((irany+1)/2) * 75;

		var vege = (((irany*-1)+1)/2) *75;

		uW.back_time(kezd, vege, irany);

	}



	uW.back_time = function(most, vege, irany){

		if ((most-irany)!=vege){

			most1=uW.nulla(most,2);

			document.getElementById("GM_wall_hide").setAttribute("style", "filter: alpha(opacity=" + most1 + "); -moz-opacity: ." + most1 + "; opacity: ." + most1 + ";");

			//alert(document.getElementById("GM_wall_hide").getAttribute("style"));



			var t = setTimeout("back_time(" + (most-irany) + ", " + vege + ", " + irany + ");" , 100);

		}

	}



	uW.nulla = function(szam, nullak){

		var ki = szam.toString();

		for (i=szam.toString().length; i<nullak; i++){

			ki = "0" + ki;

		}

		return ki;

	}



	function hide_settings(){

		var setwins = document.getElementsByClassName("GM_wall_settings");

		var keret = document.getElementById("building_wall");

		var hide = document.getElementById("GM_wall_hide");

		document.body.removeChild(hide);

		for (n in setwins){

			keret.removeChild(setwins[n]);

			uW.sets=false;

		}

	}



	function ajaxRequest(){

		var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"]; //activeX versions to check for in IE

		if (window.ActiveXObject){ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)

			for (var i=0; i<activexmodes.length; i++){

				try{

					return new ActiveXObject(activexmodes[i]);

				}

				catch(e){

					//suppress error

				}

			}

		}else if (window.XMLHttpRequest){ // if Mozilla, Safari etc

			return new XMLHttpRequest();

		}else{

			return false;

		}

}





	uW.hide_settings = function(){

		var setwins = document.getElementsByClassName("GM_wall_settings");

		var keret = document.getElementById("building_wall");

		var hide = document.getElementById("GM_wall_hide");

		document.body.removeChild(hide);

		for (n in setwins){

			keret.removeChild(setwins[n]);

			uW.sets=false;

		}

	}



    function getUnitName(element){

        var name = '';

        if (element.style) {

            var m = reUnit.exec(element.style.backgroundImage);

            if (m && m[1]) {

                name = m[1];

            }

        }

        return name;

    }

    



    





    



	function load_settings(){

		var values = {GM_wall_set_show_res: 1, GM_wall_set_show_info: 1, GM_wall_set_show_sum: 1, GM_wall_set_show_comp: 1, GM_wall_set_color: "red", GM_wall_set_current_save: -1}; //nevek és alapértelmezett értékek

		var sett = GM_getValue("GM_grepowall_settings", null);

		if (sett == null){

			sett = {};

		}else{

			sett = JSON.parse(sett);

		}

		for (value_name in values){

			if (typeof sett[value_name] === 'undefined'){

				sett[value_name] = values[value_name];

			}

			if (sett[value_name] == null){

				sett[value_name] = values[value_name];

			}

		}
		
		var mentesek = olvas();
		if (mentesek == null){
			sett.GM_wall_set_current_save = values.GM_wall_set_current_save;
		}



		return sett;

	}

	

	function szepszam(nStr){

		nStr += '';

		x = nStr.split('.');

		x1 = x[0];

		x2 = x.length > 1 ? '.' + x[1] : '';

		var rgx = /(\d+)(\d{3})/;

		while (rgx.test(x1)) {

			x1 = x1.replace(rgx, '$1' + ',' + '$2');

		}

		return x1 + x2;

	}



	function box(nn){

	//load settings

	var sett = load_settings();

	var values = { /*nevek, kiírások és lehetséges értékek*/

		GM_wall_set_show_res: {label: T.show_res, values: {0:1, 1:0}, text:{0:T.yes, 1:T.no}},

		GM_wall_set_show_info: {label: T.show_info, values: {0:1, 1:0}, text:{0:T.yes, 1:T.no}},

		GM_wall_set_show_sum: {label: T.show_sum, values: {0:1, 1:0}, text:{0:T.yes, 1:T.no}},

		GM_wall_set_show_comp: {label: (T.show_comp + "<br/><i>(Better working in the next version!)</i>"), values: {0:1, 1:0}, text:{0:T.yes, 1:T.no}},

		GM_wall_set_color: {label: T.save_color, values: {0:"red", 1:"white"}, text:{0:T.red, 1:T.white}},

		GM_wall_set_current_save: {label: T.calc_save, values: {no:-1}, text:{no: T.no_calc}}

	};

	//mentések betöltése

	var mentesek = olvas();
	if (mentesek != null){

	for (l in mentesek[orszag][player][server]){

		ido = new Date(mentesek[orszag][player][server][l].idopont*1000);

		idostr = ido.getFullYear() + "." + uW.nulla(ido.getMonth()+1, 2) + "." + uW.nulla(ido.getDate(),2) + " " + uW.nulla(ido.getHours(),2) + ":" + uW.nulla(ido.getMinutes(),2) + ":" + uW.nulla(ido.getSeconds(),2);

		values.GM_wall_set_current_save.values[l] =l;

		values.GM_wall_set_current_save.text[l] = (l*1+1) + " " + idostr;

	}
	}

	var box = new Array();

	box[1]='	<table style="text-align: left; width: 100%;" border="0" cellpadding="2" cellspacing="2">\

				<tbody>';



	for (set_name in values){

		box[1] += '<tr><td><label for="' + set_name + '">' + values[set_name].label + '</label></td><td><select name="' + set_name + '" id="' + set_name + '">';

		for (n in values[set_name].values){

			box[1] += '<option value="' + values[set_name].values[n] + '" ' + ((sett[set_name]==values[set_name].values[n])? 'selected="selected"' : '') + '>' + values[set_name].text[n] + '</option>';

		}

		box[1] += '</select></td></tr>';



	}

	box[1] += '					<tr style="height: 30px;">\

						<td colsapan="2"><a id="GM_wall_settings_cancel" title="' + T.cancel + '" href="#" onclick="hide_settings();" class="cancel" style="position:absolute; right:30px; bottom: 5px;" ></a><a id="GM_wall_settings_save" href="#" title="' + T.save + '" class="confirm" style="position:absolute; right:5px; bottom: 5px;"></a></td>\

					</tr>\

				</tbody>\

				</table>';









	box[0] = "<table class=\"game_border\" cellpadding=\"0\" cellspacing=\"0\">\

		<tr>\

\

			<td class=\"game_border_edge\"></td>\

			<td class=\"game_border_top\"></td>\

			<td class=\"game_border_edge game_border_edge_2\"></td>\

		</tr>\

		<tr>\

			<td class=\"game_border_left\"></td>\

				<td>\

					<div style=\"margin: 0px; display: inline-block;\">\

					<div class=\"game_border_socket game_border_socket1\"></div>\

\

					<div class=\"game_border_socket game_border_socket2\"></div>\

					<div class=\"game_border_socket game_border_socket3\"></div>\

					<div class=\"game_border_socket game_border_socket4\"></div>\

	\

		<div class=\"game_header bold\">" + T.settings + "</div>\

		<a class=\"cancel\" style=\"position:absolute; right:5px; top:4px;\" href=\"#\" onclick=\"hide_settings();\"></a>\

		<div class=\"game_body\" style=\"padding:9px;\">\

			<div>\

				<div style=\"float:left;\" ><img  src=\"http://static.grepolis.com/images/game/main/wall.png\" width=\"40px\" height=\"40px\" alt=\"\"/></div>\

				<div style=\"margin-left:60px;\">" + T.settings_text + "</div>\

\

				<br style=\"clear:both\"/>\

			</div>\

			\

							<div>" + box[1] + "</div>				\

					</div>\

		\

	\

					</div>\

\

				</td>\

			<td class=\"game_border_right\"></td>\

		</tr>\

		<tr>\

			<td class=\"game_border_edge game_border_edge_3\"></td>\

			<td class=\"game_border_bottom\"></td>\

			<td class=\"game_border_edge game_border_edge_4\"></td>\

		</tr>\

		</table>\

";

	return box[nn];

	}
