// ==UserScript==
// @name           quick_build-tribalwars-plapl
// @namespace      JS
// @description    Ø³ÙƒØ±Ø¨Ø§Øª Ø®Ø§Øµ ÙÙŠ ØªØ·ÙˆÙŠØ± Ø§Ù„Ù…Ø¨Ø§Ù†ÙŠ ÙÙŠ Ø­Ø±Ø¨ Ù‚Ø¨Ø§Ø¦Ù„
// @include        http://ae*.tribalwars.ae*screen=main*
// ==/UserScript==


/* * * * ab hier darf geÃ¤ndert werden ... * * * */

var max = 5; 	// max. Auftraege mehr als 2 nur mit PA
var verstecken_anzeige_opt = true; // bei Problemen statt "true", "false" versuchen
//var verstecken_anzeige_opt = false;    			< < <---------- so

var sollStufeGeb = {	/* Stufen auf die ein GebÃ¤ude gebracht wird */
		"main": 25,     // soll Hauptgebaeude-Stufe
		"barracks": 25, // soll Kasernen-Stufe
		"stable": 20,   // soll Stall-Stufe
		"garage": 10,   // soll Werkstatt-Stufe
		"church": 0,    // soll Kirche
		"church_f": 0,  //      erste Kirche
		"snob": 1,      // soll Adelshof-Stufe
		"smith": 20,    // soll Schmiede-Stufe
		"place": 1,     //      Versammlungsplatz
		"statue": 1,    //      Statue
		"market": 20,   // soll Marktplatz-Stufe
		"wood": 30,     // soll Holzfaeller-Stufe
		"stone": 30,    // soll Lehmgrube-Stufe
		"iron": 30,     // soll Eisenmine-Stufe
		"farm": 30,     // soll Bauernhof-Stufe
		"storage": 30,  // soll Speicher-Stufe
		"hide": 0,      // soll Versteck-Stufe
		"wall": 20      // soll Wall-Stufe
};

var gebPrio = { 	/* PrioritÃ¤t ( hÃ¶here PrioritÃ¤t wird zu erst gebaut, niedrigere zu erst abgerissen ) */
		"main": 8,     // Hauptgebaeude-prio
		"barracks": 5, // Kasernen-prio
		"stable": 3,   // Stall-prio
		"garage": 1,   // Werkstatt-prio
		"church":  0,  // Kirche-prio
		"church_f": 0, // Erste Kirche-prio
		"snob": 1,     // Adelshof-prio
		"smith": 8,    // Schmiede-prio
		"place": 20,   // Versammlungsplatz-prio
		"statue": 5,   // Statue-prio
		"market": 3,   // Marktplatz-prio
		"wood": 16,    // Holzfaeller-prio
		"stone": 16,   // Lehmgrube-prio
		"iron": 14,    // Eisenmine-prio
		"farm": 14,    // Bauernhof-prio
		"storage": 14, // Speicher-prio
		"hide": 0,     // Versteck-prio
		"wall": 20     // Wall-prio
};

/* Hier darf nur die linke Seite angepasst werden !! nur nodwendig auf nicht 'de' Welten    wurde nicht getestet */

var de2en = { 				/* Namensumsetzung: deutsch - englisch */
		"مركز القرية":"main",
		"الثكنات":"barracks",
		"الاسطبل":"stable",
		"الورشة":"garage",
		"Kirche":"church",
		"Erste":"church_f",
		"الاكاديمية":"snob",
		"الحداد":"smith",
		"نقطة التجمع"place",
		"النصب التذكاري":"statue",
		"السوق":"market",
		"الخشاب":"wood",
		"الطمي":"stone",
		"الحديد":"iron",
		"المزارع":"farm",
		"المخازن":"storage",
		"المخابئ":"hide",
		"الحائط":"wall"
};

/* Hier darf nur die rechte Seite angepasst werden !! nur nodwendig auf nicht 'de' Welten    wurde nicht getestet */

var en2de = { 				/* Namensumsetzung: englisch - deutsch */
		"main" : "مركز القرية",
		"barracks" : "الثكنات",
		"stable" : "الاسطبل",
		"garage" : "الورشة",
		"church" : "Kirche",
		"church_f" : "Erste",
		"snob" : "الاكاديمية",
		"smith" : "الحداد",
		"place" : "نقطة التجمع",
		"statue" : "النصب التذكاري",
		"market" : "السوق",
		"wood" : "الخشاب",
		"stone" : "الطمي",
		"iron" : "الحديد",
		"farm" : "المزارع",
		"storage" : "المخازن",
		"hide" : "المخابئ",
		"wall" : "الحائط"
};

/* * * * ... bis hier * * * */

var gData = unsafeWindow.game_data;
gData.link_base = gData.link_base.replace(/amp;/g, "").replace(/screen=/, "screen=main");

var tobuild="";
var todestroy="";
var maxAb=5;
var nachBau = 0;
var nachHelp = 0;
var nFertigeGeb = Array();
var search = Array();
var hiddenGeb = Array();
var hiddenGebAnz = 0;
var gebText = "";

var buttbuild = document.createElement("input");
buttbuild.type = "button";
buttbuild.value = "Ù„Ø§ ÙŠÙˆØ¬Ø¯ ØªØ·ÙˆÙŠØ±";
buttbuild.id = "build";
buttbuild.accessKey = "1";
buttbuild.disabled = true;

var buttdestroy = document.createElement("input");
buttdestroy.type = "button";
buttdestroy.value = "Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù‡Ø¯Ù…";
buttdestroy.id = "destroy";
buttdestroy.accessKey = "v";
buttdestroy.disabled = true;
buttdestroy.visibility = "hide";

var geb	 = ["main","barracks","stable","garage","church","church_f","snob","smith","place","statue","market","wood","stone","iron","farm","storage","hide","wall"];

if(gData.mode == "destroy" || gData.mode == "build" ){  /*lÃ¶sche den mode=destroy und mode=build */
	window.location.href = window.location.href.replace(/&mode=[a-z]+$/,"");
}
else{
	search = document.getElementsByTagName("a"); /* alle links einlesen */

	for(var i = 0; i < search.length; i++) {

		/* Buttons einfuegen */
		if( search[i].getAttribute("href") == "help2.php?article=buildings" ) {
			search[i].parentNode.appendChild(document.createElement("br"));
			search[i].parentNode.appendChild(buttbuild);
			search[i].parentNode.appendChild(document.createElement("br"));
			search[i].parentNode.appendChild(buttdestroy);
			nachHelp++;
		}

		/* Build / Abriss entfernen */
		if( search[i].getAttribute("href").match(/mode=build$/) && verstecken_anzeige_opt == true ){
			search[i].parentNode.parentNode.parentNode.removeChild(search[i].parentNode.parentNode);
			nachBau++;
		}

		/* Bauschleife einlesen und verrechnen */
		if ( nachHelp != 0 ) {
			if( search[i].getAttribute("href").match(/action=cancel/) ) {

				var x = search[i].parentNode.parentNode.childNodes[1].innerHTML;
				x = x.split(" ");

				if(x[2] == "Ù‡Ø¯Ù…)"){ 
					gData.village.buildings[de2en[x[0]]]--;
					maxAb--;
				}
				else{
					gData.village.buildings[de2en[x[0]]]++;
					max--;
				}
			}
			if( gData.village.buildings["main"] < 14 || verstecken_anzeige_opt == false ) nachBau++;
		}

		if ( nachBau != 0 ) {

			/* ausbaubare GebÃ¤ude ermitteln */
			if ( max > 0 ) { 
				if (search[i].getAttribute("href").match(/action=build/)) {

					building = search[i].getAttribute("href").match(/id=[a-z]+/) + "";
					building = building.substring(3);

					if (gData.village.buildings[building] < sollStufeGeb[building]) {
						if (tobuild == "") {
							tobuild = building;
						} else {
							if (gebPrio[tobuild] < gebPrio[building]) {
								tobuild = building;
							}
						}
					}
				}
			}
			/* fertige GebÃ¤ude verstecken  */
			if(verstecken_anzeige_opt == true){
				for(var j = 0; j < geb.length; j++){

					var searchString = gData.link_base.replace(/screen=main/, "screen=" + geb[j]);
					var link = search[i].getAttribute("href");

					if(link == searchString  && de2en[search[i].innerHTML.split("> ")[1]] == geb[j] ) {

						building = searchString.match(/screen=[a-z]+/)+"";
						building = building.substring(7);

						if(gData.village.buildings[building] >= sollStufeGeb[building]){

							if(gData.village.buildings[building] == sollStufeGeb[building])  gebText = "ØªÙ… Ø¨Ù†Ø§Ø¡ Ø§Ù„Ù…Ø¨Ù†ÙŠ Ø¨Ø§Ù„ÙƒØ§Ù…Ù„";
							else gebText = "<a href=" + gData.link_base + "&action=destroy&h=" + gData.csrf + "&building_id=" + building + ">Ù‡Ø¯Ù… Ø¨Ù…Ù‚Ø¯Ø§Ø± Ù…Ø³ØªÙˆÙ‰ ÙˆØ§Ø­Ø¯</a>";

							if(document.getElementById("hide_completed").checked == true){ /* Komplett ausgebaute GebÃ¤ude verstecken */
								search[i].parentNode.parentNode.parentNode.removeChild(search[i].parentNode.parentNode);
							}
							else{
								if(search[i].parentNode.parentNode.childNodes[3].innerHTML == "ØªÙ… Ø¨Ù†Ø§Ø¡ Ø§Ù„Ù…Ø¨Ù†ÙŠ Ø¨Ø§Ù„ÙƒØ§Ù…Ù„"){
									search[i].parentNode.parentNode.childNodes[3].innerHTML = "<span style='color:#C5A76B'>" + gebText + "</span>";
								}
								else{
									for(var k = 0; k < 11; k++){
										search[i].parentNode.parentNode.removeChild(search[i].parentNode.parentNode.lastChild);
									}
									search[i].parentNode.parentNode.lastChild.colSpan = "6";
									search[i].parentNode.parentNode.lastChild.align = "center";
									search[i].parentNode.parentNode.lastChild.innerHTML = "<span style='color:#C5A76B'>" + gebText + "</span>";
								}
							}
						}
					}
					if( i+1 > search.length) break;
				}
			}
		}
	}

	for(var i = 0; i < geb.length; i++){

		if( gData.village.buildings[geb[i]] > sollStufeGeb[geb[i]] ){

			/* abzureisendes GebÃ¤ude suchen */		
			if( maxAb > 0 ){
				if( todestroy == "" ){
					todestroy = geb[i];
				}
				else{
					if ( gebPrio[todestroy] > gebPrio[geb[i]] ) {
						todestroy = geb[i];
					}
				}
			}			
			hiddenGeb[hiddenGebAnz] = geb[i];
			hiddenGebAnz++;
		}
	}

	/* nicht fertige GebÃ¤ude wieder anzeigen */
	if(document.getElementById("hide_completed").checked == true && hiddenGebAnz > 0 && verstecken_anzeige_opt == true ){	 /* Komplett ausgebaute GebÃ¤ude verstecken */

		var leer = document.createElement("tr");
		leer.appendChild(document.createElement("td"));
		leer.appendChild(document.createElement("td"));
		leer.childNodes[1].innerHTML = "<span style='color:#C5A76B'>...</span>";
		leer.childNodes[1].colSpan = "6";
		leer.childNodes[1].align = "center";
		document.getElementById("buildings").childNodes[1].appendChild(leer);

		for(var k = 0; k < hiddenGeb.length; k++){

			nFertigeGeb[k] = document.createElement("tr");
			nFertigeGeb[k].appendChild(document.createElement("td"));
			nFertigeGeb[k].childNodes[0].innerHTML = "<a href = " + gData.link_base.replace(/screen=main/, "screen=" + hiddenGeb[k]) + ">" +
			"<img src = " + "graphic/buildings/" + hiddenGeb[k] + ".png?1" + " alt=\"\" /> " + 
			en2de[hiddenGeb[k]] + "</a> <span class=\"nowrap\"> (Ù…Ø³ØªÙˆÙŠ " + gData.village.buildings[hiddenGeb[k]] + ")</span>";
			nFertigeGeb[k].appendChild(document.createElement("td"));
			nFertigeGeb[k].childNodes[1].colSpan = "6";
			nFertigeGeb[k].childNodes[1].align = "center";
			nFertigeGeb[k].childNodes[1].innerHTML = "<a href=" + gData.link_base + "&action=destroy&h=" + gData.csrf + "&building_id=" + hiddenGeb[k] + ">Ø®ÙØ¶ Ù…Ø³ØªÙˆÙŠ ÙˆØ§Ø­Ø¯</a>";

			document.getElementById("buildings").childNodes[1].appendChild(nFertigeGeb[k]);
		}
	}

	/* Bau button aktivieren */
	if(tobuild != "") {
		document.getElementById("build").value = ("Ø¨Ù†Ø§Ø¡: " + en2de[tobuild] + " (c)");
		document.getElementById("build").setAttribute("onclick","location.replace('" + gData.link_base + "&action=build&h=" + gData.csrf + "&id=" + tobuild + "&force=');");
		document.getElementById("build").disabled=false;
	}

	/* Abriss button aktivieren */
	if(todestroy != "" && gData.village.buildings["Ù‡Ø¯Ù…"] > 14) {
		document.getElementById("destroy").value = ("Ù‡Ø¯Ù…: " + en2de[todestroy] + " (v)");
		document.getElementById("destroy").setAttribute("onclick","location.replace('" + gData.link_base + "&action=destroy&h=" + gData.csrf + "&building_id=" + todestroy + "');");
		document.getElementById("destroy").disabled=false;
	}
}