// ==UserScript==
// @name           سكربت خاص لتطوير المباني بسهولة By:KOPc
// @namespace      JS
// @description    سكربات خاص في تطوير المباني في حرب قبائل
// @include        http://ae*.tribalwars.ae*screen=main*
// ==/UserScript==


/* * * * ab hier darf geändert werden ... * * * */

var max = 5; 	// max. Auftraege mehr als 2 nur mit PA
var verstecken_anzeige_opt = true; // bei Problemen statt "true", "false" versuchen
//var verstecken_anzeige_opt = false;    			< < <---------- so

var sollStufeGeb = {	/* Stufen auf die ein Gebäude gebracht wird */
		"main": 20,     // soll Hauptgebaeude-Stufe
		"barracks": 25, // soll Kasernen-Stufe
		"stable": 20,   // soll Stall-Stufe
		"garage": 10,   // soll Werkstatt-Stufe
		"church": 0,    // soll Kirche
		"church_f": 0,  //      erste Kirche
		"snob": 1,      // soll Adelshof-Stufe
		"smith": 20,    // soll Schmiede-Stufe
		"place": 1,     //      Versammlungsplatz
		"statue": 1,    //      Statue
		"market": 18,   // soll Marktplatz-Stufe
		"wood": 30,     // soll Holzfaeller-Stufe
		"stone": 30,    // soll Lehmgrube-Stufe
		"iron": 30,     // soll Eisenmine-Stufe
		"farm": 30,     // soll Bauernhof-Stufe
		"storage": 30,  // soll Speicher-Stufe
		"hide": 0,      // soll Versteck-Stufe
		"wall": 20      // soll Wall-Stufe
};

var gebPrio = { 	/* Priorität ( höhere Priorität wird zu erst gebaut, niedrigere zu erst abgerissen ) */
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
		"مركز القريه":"main",
		"الثكنات":"barracks",
		"الاسطبل":"stable",
		"الورشه":"garage",
		"Kirche":"church",
		"Erste":"church_f",
		"الاكادميه":"snob",
		"الحداد":"smith",
		"نقطة التجمع":"place",
		"نصب تذكاري":"statue",
		"السوق":"market",
		"الخشاب":"wood",
		"حفرة طمي":"stone",
		"منجم حديد":"iron",
		"مزارع":"farm",
		"مخازن":"storage",
		"المخبأ":"hide",
		"حائط":"wall"
};

/* Hier darf nur die rechte Seite angepasst werden !! nur nodwendig auf nicht 'de' Welten    wurde nicht getestet */

var en2de = { 				/* Namensumsetzung: englisch - deutsch */
		"main" : "مركز قريه",
		"barracks" : "الثكنات",
		"stable" : "الاسطبل",
		"garage" : "الورشه",
		"church" : "Kirche",
		"church_f" : "Erste",
		"snob" : "الاكادميه",
		"smith" : "الحداد",
		"place" : "نقطة تجمع",
		"statue" : "نصب تذكاري",
		"market" : "السوق",
		"wood" : "الخشاب",
		"stone" : "حفرة طمي",
		"iron" : "منجم حديد",
		"farm" : "المزارع",
		"storage" : "المخازن",
		"hide" : "المخبأ",
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
buttbuild.value = "لا يوجد تطوير";
buttbuild.id = "build";
buttbuild.accessKey = "1";
buttbuild.disabled = true;

var buttdestroy = document.createElement("input");
buttdestroy.type = "button";
buttdestroy.value = "لا يوجد هدم";
buttdestroy.id = "destroy";
buttdestroy.accessKey = "v";
buttdestroy.disabled = true;
buttdestroy.visibility = "hide";

var geb	 = ["main","barracks","stable","garage","church","church_f","snob","smith","place","statue","market","wood","stone","iron","farm","storage","hide","wall"];

if(gData.mode == "destroy" || gData.mode == "build" ){  /*lösche den mode=destroy und mode=build */
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

				if(x[2] == "هدم)"){ 
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

			/* ausbaubare Gebäude ermitteln */
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
			/* fertige Gebäude verstecken  */
			if(verstecken_anzeige_opt == true){
				for(var j = 0; j < geb.length; j++){

					var searchString = gData.link_base.replace(/screen=main/, "screen=" + geb[j]);
					var link = search[i].getAttribute("href");

					if(link == searchString  && de2en[search[i].innerHTML.split("> ")[1]] == geb[j] ) {

						building = searchString.match(/screen=[a-z]+/)+"";
						building = building.substring(7);

						if(gData.village.buildings[building] >= sollStufeGeb[building]){

							if(gData.village.buildings[building] == sollStufeGeb[building])  gebText = "تم بناء المبني بالكامل";
							else gebText = "<a href=" + gData.link_base + "&action=destroy&h=" + gData.csrf + "&building_id=" + building + ">هدم بمقدار مستوى واحد</a>";

							if(document.getElementById("hide_completed").checked == true){ /* Komplett ausgebaute Gebäude verstecken */
								search[i].parentNode.parentNode.parentNode.removeChild(search[i].parentNode.parentNode);
							}
							else{
								if(search[i].parentNode.parentNode.childNodes[3].innerHTML == "تم بناء المبني بالكامل"){
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

			/* abzureisendes Gebäude suchen */		
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

	/* nicht fertige Gebäude wieder anzeigen */
	if(document.getElementById("hide_completed").checked == true && hiddenGebAnz > 0 && verstecken_anzeige_opt == true ){	 /* Komplett ausgebaute Gebäude verstecken */

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
			en2de[hiddenGeb[k]] + "</a> <span class=\"nowrap\"> (مستوي " + gData.village.buildings[hiddenGeb[k]] + ")</span>";
			nFertigeGeb[k].appendChild(document.createElement("td"));
			nFertigeGeb[k].childNodes[1].colSpan = "6";
			nFertigeGeb[k].childNodes[1].align = "center";
			nFertigeGeb[k].childNodes[1].innerHTML = "<a href=" + gData.link_base + "&action=destroy&h=" + gData.csrf + "&building_id=" + hiddenGeb[k] + ">خفض مستوي واحد</a>";

			document.getElementById("buildings").childNodes[1].appendChild(nFertigeGeb[k]);
		}
	}

	/* Bau button aktivieren */
	if(tobuild != "") {
		document.getElementById("build").value = ("بناء: " + en2de[tobuild] + " (c)");
		document.getElementById("build").setAttribute("onclick","location.replace('" + gData.link_base + "&action=build&h=" + gData.csrf + "&id=" + tobuild + "&force=');");
		document.getElementById("build").disabled=false;
	}

	/* Abriss button aktivieren */
	if(todestroy != "" && gData.village.buildings["هدم"] > 14) {
		document.getElementById("destroy").value = ("هدم: " + en2de[todestroy] + " (v)");
		document.getElementById("destroy").setAttribute("onclick","location.replace('" + gData.link_base + "&action=destroy&h=" + gData.csrf + "&building_id=" + todestroy + "');");
		document.getElementById("destroy").disabled=false;
	}
}