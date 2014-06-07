// ==UserScript==
// @name           Wachsende Stadt
// @namespace      Script by Mdna / Grafik by amandil & Falkenauge
// @description    Mit steigender GebÃ¤ude-Stufe verÃ¤ndert sich das Design der GeÃ¤ude
// @include        http://*.ikariam.com/index.php*
// ==/UserScript==

var Position1 = document.getElementById('position1');
if(Position1){
if (Position1.innerHTML.search('port') != -1) {port_1();}
else if (Position1.innerHTML.search('shipyard') != -1) {shipyard_1();}
}

var Position2 = document.getElementById('position2');
if(Position2){
if (Position2.innerHTML.search('port') != -1) {port_2();}
else if (Position2.innerHTML.search('shipyard') != -1) {shipyard_2();}
}

var Position3 = document.getElementById('position3');
if(Position3){
if (Position3.innerHTML.search('museum') != -1) {museum_3();}
if (Position3.innerHTML.search('warehouse') != -1) {warehouse_3();}
if (Position3.innerHTML.search('tavern') != -1) {tavern_3();}
if (Position3.innerHTML.search('palace') != -1) {palace_3();}
if (Position3.innerHTML.search('academy') != -1) {academy_3();}
if (Position3.innerHTML.search('workshop') != -1) {workshop_3();}
if (Position3.innerHTML.search('safehouse') != -1) {safehouse_3();}
if (Position3.innerHTML.search('branchOffice') != -1) {branchOffice_3();}
if (Position3.innerHTML.search('embassy') != -1){embassy_3();}
if (Position3.innerHTML.search('palaceColony') != -1) {palaceColony_3();}
if (Position3.innerHTML.search('barracks') != -1) {barracks_3();}
if (Position3.innerHTML.search('alchemist') != -1) {alchemist_3();}
if (Position3.innerHTML.search('architect') != -1) {architect_3();}
//if (Position3.innerHTML.search('dump') != -1) {dump_3();}
if (Position3.innerHTML.search('stonemason') != -1) {stonemason_3();}
if (Position3.innerHTML.search('winegrower') != -1) {winegrower_3();}
if (Position3.innerHTML.search('carpentering') != -1) {carpentering_3();}
if (Position3.innerHTML.search('fireworker') != -1) {fireworker_3();}
if (Position3.innerHTML.search('forester') != -1) {forester_3();}
if (Position3.innerHTML.search('glassblowing') != -1) {glassblowing_3();}
if (Position3.innerHTML.search('temple') != -1) {temple_3();}
}

var Position4 = document.getElementById('position4');
if(Position4){
if (Position4.innerHTML.search('museum') != -1) {	museum_4();}
if (Position4.innerHTML.search('warehouse') != -1) {warehouse_4();}
if (Position4.innerHTML.search('tavern') != -1) {	tavern_4();}
if (Position4.innerHTML.search('palace') != -1) {	palace_4();}
if (Position4.innerHTML.search('academy') != -1) { academy_4();}
if (Position4.innerHTML.search('workshop') != -1) { workshop_4();}
if (Position4.innerHTML.search('safehouse') != -1) { safehouse_4();}
if (Position4.innerHTML.search('branchOffice') != -1) { branchOffice_4();}
if (Position4.innerHTML.search('embassy') != -1){ embassy_4();}
if (Position4.innerHTML.search('palaceColony') != -1) { palaceColony_4();}
if (Position4.innerHTML.search('barracks') != -1) { barracks_4();}
if (Position4.innerHTML.search('alchemist') != -1) { alchemist_4();}
if (Position4.innerHTML.search('architect') != -1) { architect_4();}
//if (Position4.innerHTML.search('dump') != -1) { dump_4();}
if (Position4.innerHTML.search('stonemason') != -1) { stonemason_4();}
if (Position4.innerHTML.search('winegrower') != -1) { winegrower_4();}
if (Position4.innerHTML.search('carpentering') != -1) { carpentering_4();}
if (Position4.innerHTML.search('fireworker') != -1) { fireworker_4();}
if (Position4.innerHTML.search('forester') != -1) { forester_4();}
if (Position4.innerHTML.search('glassblowing') != -1) { glassblowing_4();}
if (Position4.innerHTML.search('temple') != -1) { temple_4();}
}

var Position5 = document.getElementById('position5');
if(Position5){
if (Position5.innerHTML.search('museum') != -1) {	museum_5();}
if (Position5.innerHTML.search('warehouse') != -1) {warehouse_5();}
if (Position5.innerHTML.search('tavern') != -1) {	tavern_5();}
if (Position5.innerHTML.search('palace') != -1) {	palace_5();}
if (Position5.innerHTML.search('academy') != -1) { academy_5();}
if (Position5.innerHTML.search('workshop') != -1) { workshop_5();}
if (Position5.innerHTML.search('safehouse') != -1) { safehouse_5();}
if (Position5.innerHTML.search('branchOffice') != -1) { branchOffice_5();}
if (Position5.innerHTML.search('embassy') != -1){ embassy_5();}
if (Position5.innerHTML.search('palaceColony') != -1) { palaceColony_5();}
if (Position5.innerHTML.search('barracks') != -1) { barracks_5();}
if (Position5.innerHTML.search('alchemist') != -1) { alchemist_5();}
if (Position5.innerHTML.search('architect') != -1) { architect_5();}
//if (Position5.innerHTML.search('dump') != -1) { dump_5();}
if (Position5.innerHTML.search('stonemason') != -1) { stonemason_5();}
if (Position5.innerHTML.search('winegrower') != -1) { winegrower_5();}
if (Position5.innerHTML.search('carpentering') != -1) { carpentering_5();}
if (Position5.innerHTML.search('fireworker') != -1) { fireworker_5();}
if (Position5.innerHTML.search('forester') != -1) { forester_5();}
if (Position5.innerHTML.search('glassblowing') != -1) { glassblowing_5();}
if (Position5.innerHTML.search('temple') != -1) { temple_5();}
}

var Position6 = document.getElementById('position6');
if(Position6){
if (Position6.innerHTML.search('museum') != -1) {	museum_6();}
if (Position6.innerHTML.search('warehouse') != -1) {warehouse_6();}
if (Position6.innerHTML.search('tavern') != -1) {	tavern_6();}
if (Position6.innerHTML.search('palace') != -1) {	palace_6();}
if (Position6.innerHTML.search('academy') != -1) { academy_6();}
if (Position6.innerHTML.search('workshop') != -1) { workshop_6();}
if (Position6.innerHTML.search('safehouse') != -1) { safehouse_6();}
if (Position6.innerHTML.search('branchOffice') != -1) { branchOffice_6();}
if (Position6.innerHTML.search('embassy') != -1){ embassy_6();}
if (Position6.innerHTML.search('palaceColony') != -1) { palaceColony_6();}
if (Position6.innerHTML.search('barracks') != -1) { barracks_6();}
if (Position6.innerHTML.search('alchemist') != -1) { alchemist_6();}
if (Position6.innerHTML.search('architect') != -1) { architect_6();}
//if (Position6.innerHTML.search('dump') != -1) { dump_6();}
if (Position6.innerHTML.search('stonemason') != -1) { stonemason_6();}
if (Position6.innerHTML.search('winegrower') != -1) { winegrower_6();}
if (Position6.innerHTML.search('carpentering') != -1) { carpentering_6();}
if (Position6.innerHTML.search('fireworker') != -1) { fireworker_6();}
if (Position6.innerHTML.search('forester') != -1) { forester_6();}
if (Position6.innerHTML.search('glassblowing') != -1) { glassblowing_6();}
if (Position6.innerHTML.search('temple') != -1) { temple_6();}
}

var Position7 = document.getElementById('position7');
if(Position7){
if (Position7.innerHTML.search('museum') != -1) {	museum_7();}
if (Position7.innerHTML.search('warehouse') != -1) {warehouse_7();}
if (Position7.innerHTML.search('tavern') != -1) {	tavern_7();}
if (Position7.innerHTML.search('palace') != -1) {	palace_7();}
if (Position7.innerHTML.search('academy') != -1) { academy_7();}
if (Position7.innerHTML.search('workshop') != -1) { workshop_7();}
if (Position7.innerHTML.search('safehouse') != -1) { safehouse_7();}
if (Position7.innerHTML.search('branchOffice') != -1) { branchOffice_7();}
if (Position7.innerHTML.search('embassy') != -1){ embassy_7();}
if (Position7.innerHTML.search('palaceColony') != -1) { palaceColony_7();}
if (Position7.innerHTML.search('barracks') != -1) { barracks_7();}
if (Position7.innerHTML.search('alchemist') != -1) { alchemist_7();}
if (Position7.innerHTML.search('architect') != -1) { architect_7();}
//if (Position7.innerHTML.search('dump') != -1) { dump_7();}
if (Position7.innerHTML.search('stonemason') != -1) { stonemason_7();}
if (Position7.innerHTML.search('winegrower') != -1) { winegrower_7();}
if (Position7.innerHTML.search('carpentering') != -1) { carpentering_7();}
if (Position7.innerHTML.search('fireworker') != -1) { fireworker_7();}
if (Position7.innerHTML.search('forester') != -1) { forester_7();}
if (Position7.innerHTML.search('glassblowing') != -1) { glassblowing_7();}
if (Position7.innerHTML.search('temple') != -1) { temple_7();}
}

var Position8 = document.getElementById('position8');
if(Position8){
if (Position8.innerHTML.search('museum') != -1) {	museum_8();}
if (Position8.innerHTML.search('warehouse') != -1) {warehouse_8();}
if (Position8.innerHTML.search('tavern') != -1) {	tavern_8();}
if (Position8.innerHTML.search('palace') != -1) {	palace_8();}
if (Position8.innerHTML.search('academy') != -1) { academy_8();}
if (Position8.innerHTML.search('workshop') != -1) { workshop_8();}
if (Position8.innerHTML.search('safehouse') != -1) { safehouse_8();}
if (Position8.innerHTML.search('branchOffice') != -1) { branchOffice_8();}
if (Position8.innerHTML.search('embassy') != -1){ embassy_8();}
if (Position8.innerHTML.search('palaceColony') != -1) { palaceColony_8();}
if (Position8.innerHTML.search('barracks') != -1) { barracks_8();}
if (Position8.innerHTML.search('alchemist') != -1) { alchemist_8();}
if (Position8.innerHTML.search('architect') != -1) { architect_8();}
//if (Position8.innerHTML.search('dump') != -1) { dump_8();}
if (Position8.innerHTML.search('stonemason') != -1) { stonemason_8();}
if (Position8.innerHTML.search('winegrower') != -1) { winegrower_8();}
if (Position8.innerHTML.search('carpentering') != -1) { carpentering_8();}
if (Position8.innerHTML.search('fireworker') != -1) { fireworker_8();}
if (Position8.innerHTML.search('forester') != -1) { forester_8();}
if (Position8.innerHTML.search('glassblowing') != -1) { glassblowing_8();}
if (Position8.innerHTML.search('temple') != -1) { temple_8();}
}

var Position9 = document.getElementById('position9');
if(Position9){
if (Position9.innerHTML.search('museum') != -1) {	museum_9();}
if (Position9.innerHTML.search('warehouse') != -1) {warehouse_9();}
if (Position9.innerHTML.search('tavern') != -1) {	tavern_9();}
if (Position9.innerHTML.search('palace') != -1) {	palace_9();}
if (Position9.innerHTML.search('academy') != -1) { academy_9();}
if (Position9.innerHTML.search('workshop') != -1) { workshop_9();}
if (Position9.innerHTML.search('safehouse') != -1) { safehouse_9();}
if (Position9.innerHTML.search('branchOffice') != -1) { branchOffice_9();}
if (Position9.innerHTML.search('embassy') != -1){ embassy_9();}
if (Position9.innerHTML.search('palaceColony') != -1) { palaceColony_9();}
if (Position9.innerHTML.search('barracks') != -1) { barracks_9();}
if (Position9.innerHTML.search('alchemist') != -1) { alchemist_9();}
if (Position9.innerHTML.search('architect') != -1) { architect_9();}
//if (Position9.innerHTML.search('dump') != -1) { dump_9();}
if (Position9.innerHTML.search('stonemason') != -1) { stonemason_9();}
if (Position9.innerHTML.search('winegrower') != -1) { winegrower_9();}
if (Position9.innerHTML.search('carpentering') != -1) { carpentering_9();}
if (Position9.innerHTML.search('fireworker') != -1) { fireworker_9();}
if (Position9.innerHTML.search('forester') != -1) { forester_9();}
if (Position9.innerHTML.search('glassblowing') != -1) { glassblowing_9();}
if (Position9.innerHTML.search('temple') != -1) { temple_9();}
}

var Position10 = document.getElementById('position10');
if(Position10){
if (Position10.innerHTML.search('museum') != -1) {	museum_10();}
if (Position10.innerHTML.search('warehouse') != -1) {warehouse_10();}
if (Position10.innerHTML.search('tavern') != -1) {	tavern_10();}
if (Position10.innerHTML.search('palace') != -1) {	palace_10();}
if (Position10.innerHTML.search('academy') != -1) { academy_10();}
if (Position10.innerHTML.search('workshop') != -1) { workshop_10();}
if (Position10.innerHTML.search('safehouse') != -1) { safehouse_10();}
if (Position10.innerHTML.search('branchOffice') != -1) { branchOffice_10();}
if (Position10.innerHTML.search('embassy') != -1){ embassy_10();}
if (Position10.innerHTML.search('palaceColony') != -1) { palaceColony_10();}
if (Position10.innerHTML.search('barracks') != -1) { barracks_10();}
if (Position10.innerHTML.search('alchemist') != -1) { alchemist_10();}
if (Position10.innerHTML.search('architect') != -1) { architect_10();}
//if (Position10.innerHTML.search('dump') != -1) { dump_10();}
if (Position10.innerHTML.search('stonemason') != -1) { stonemason_10();}
if (Position10.innerHTML.search('winegrower') != -1) { winegrower_10();}
if (Position10.innerHTML.search('carpentering') != -1) { carpentering_10();}
if (Position10.innerHTML.search('fireworker') != -1) { fireworker_10();}
if (Position10.innerHTML.search('forester') != -1) { forester_10();}
if (Position10.innerHTML.search('glassblowing') != -1) { glassblowing_10();}
if (Position10.innerHTML.search('temple') != -1) { temple_10();}
}

var Position11 = document.getElementById('position11');
if(Position11){
if (Position11.innerHTML.search('museum') != -1) {	museum_11();}
if (Position11.innerHTML.search('warehouse') != -1) {warehouse_11();}
if (Position11.innerHTML.search('tavern') != -1) {	tavern_11();}
if (Position11.innerHTML.search('palace') != -1) {	palace_11();}
if (Position11.innerHTML.search('academy') != -1) { academy_11();}
if (Position11.innerHTML.search('workshop') != -1) { workshop_11();}
if (Position11.innerHTML.search('safehouse') != -1) { safehouse_11();}
if (Position11.innerHTML.search('branchOffice') != -1) { branchOffice_11();}
if (Position11.innerHTML.search('embassy') != -1){ embassy_11();}
if (Position11.innerHTML.search('palaceColony') != -1) { palaceColony_11();}
if (Position11.innerHTML.search('barracks') != -1) { barracks_11();}
if (Position11.innerHTML.search('alchemist') != -1) { alchemist_11();}
if (Position11.innerHTML.search('architect') != -1) { architect_11();}
//if (Position11.innerHTML.search('dump') != -1) { dump_11();}
if (Position11.innerHTML.search('stonemason') != -1) { stonemason_11();}
if (Position11.innerHTML.search('winegrower') != -1) { winegrower_11();}
if (Position11.innerHTML.search('carpentering') != -1) { carpentering_11();}
if (Position11.innerHTML.search('fireworker') != -1) { fireworker_11();}
if (Position11.innerHTML.search('forester') != -1) { forester_11();}
if (Position11.innerHTML.search('glassblowing') != -1) { glassblowing_11();}
if (Position11.innerHTML.search('temple') != -1) { temple_11();}
}

var Position12 = document.getElementById('position12');
if(Position12){
if (Position12.innerHTML.search('museum') != -1) {	museum_12();}
if (Position12.innerHTML.search('warehouse') != -1) {warehouse_12();}
if (Position12.innerHTML.search('tavern') != -1) {	tavern_12();}
if (Position12.innerHTML.search('palace') != -1) {	palace_12();}
if (Position12.innerHTML.search('academy') != -1) { academy_12();}
if (Position12.innerHTML.search('workshop') != -1) { workshop_12();}
if (Position12.innerHTML.search('safehouse') != -1) { safehouse_12();}
if (Position12.innerHTML.search('branchOffice') != -1) { branchOffice_12();}
if (Position12.innerHTML.search('embassy') != -1){ embassy_12();}
if (Position12.innerHTML.search('palaceColony') != -1) { palaceColony_12();}
if (Position12.innerHTML.search('barracks') != -1) { barracks_12();}
if (Position12.innerHTML.search('alchemist') != -1) { alchemist_12();}
if (Position12.innerHTML.search('architect') != -1) { architect_12();}
//if (Position12.innerHTML.search('dump') != -1) { dump_12();}
if (Position12.innerHTML.search('stonemason') != -1) { stonemason_12();}
if (Position12.innerHTML.search('winegrower') != -1) { winegrower_12();}
if (Position12.innerHTML.search('carpentering') != -1) { carpentering_12();}
if (Position12.innerHTML.search('fireworker') != -1) { fireworker_12();}
if (Position12.innerHTML.search('forester') != -1) { forester_12();}
if (Position12.innerHTML.search('glassblowing') != -1) { glassblowing_12();}
if (Position12.innerHTML.search('temple') != -1) { temple_12();}
}

var Position13 = document.getElementById('position13');
if(Position13){
if (Position13.innerHTML.search('museum') != -1) {	museum_13();}
if (Position13.innerHTML.search('warehouse') != -1) {warehouse_13();}
if (Position13.innerHTML.search('tavern') != -1) {	tavern_13();}
if (Position13.innerHTML.search('palace') != -1) {	palace_13();}
if (Position13.innerHTML.search('academy') != -1) { academy_13();}
if (Position13.innerHTML.search('workshop') != -1) { workshop_13();}
if (Position13.innerHTML.search('safehouse') != -1) { safehouse_13();}
if (Position13.innerHTML.search('branchOffice') != -1) { branchOffice_13();}
if (Position13.innerHTML.search('embassy') != -1){ embassy_13();}
if (Position13.innerHTML.search('palaceColony') != -1) { palaceColony_13();}
if (Position13.innerHTML.search('barracks') != -1) { barracks_13();}
if (Position13.innerHTML.search('alchemist') != -1) { alchemist_13();}
if (Position13.innerHTML.search('architect') != -1) { architect_13();}
//if (Position13.innerHTML.search('dump') != -1) { dump_13();}
if (Position13.innerHTML.search('stonemason') != -1) { stonemason_13();}
if (Position13.innerHTML.search('winegrower') != -1) { winegrower_13();}
if (Position13.innerHTML.search('carpentering') != -1) { carpentering_13();}
if (Position13.innerHTML.search('fireworker') != -1) { fireworker_13();}
if (Position13.innerHTML.search('forester') != -1) { forester_13();}
if (Position13.innerHTML.search('glassblowing') != -1) { glassblowing_13();}
if (Position13.innerHTML.search('temple') != -1) { temple_13();}
}

var Position0 = document.getElementById('position0');
if(Position0){
if (Position0.innerHTML.search('townHall') != -1) {townhall();}
}

function addCSS(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function academy_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ10.png) !important}');}}
}

function academy_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ10.png) !important}');}}
}

function academy_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ10.png) !important}');}}
}

function academy_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ10.png) !important}');}}
}

function academy_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ10.png) !important}');}}
}

function academy_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ10.png) !important}');}}
}

function academy_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ10.png) !important}');}}
}

function academy_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ10.png) !important}');}}
}

function academy_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ10.png) !important}');}}
}

function academy_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ10.png) !important}');}}
}

function academy_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .academy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/academ10.png) !important}');}}
}



function tavern_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern10.png) !important}');}}
}

function tavern_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern10.png) !important}');}}
}

function tavern_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern10.png) !important}');}}
}

function tavern_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-3px;top:-42px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern10.png) !important}');}}
}

function tavern_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern10.png) !important}');}}
}

function tavern_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern10.png) !important}');}}
}

function tavern_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern10.png) !important}');}}
}

function tavern_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern10.png) !important}');}}
}

function tavern_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern10.png) !important}');}}
}

function tavern_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern10.png) !important}');}}
}

function tavern_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .tavern .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/tavern10.png) !important}');}}
}


function museum_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 10 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 11 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum10.png) !important}');}}
}

function museum_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 10 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 11 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum10.png) !important}');}}
}

function museum_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 10 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 11 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum10.png) !important}');}}
}

function museum_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 10 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 11 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum10.png) !important}');}}
}

function museum_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 10 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 11 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum10.png) !important}');}}
}

function museum_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 10 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 11 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum10.png) !important}');}}
}

function museum_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 10 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 11 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum10.png) !important}');}}
}

function museum_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 10 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 11 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum10.png) !important}');}}
}

function museum_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 10 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 11 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum10.png) !important}');}}
}

function museum_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 10 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 11 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum10.png) !important}');}}
}

function museum_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 10 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 11 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .museum .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/museum10.png) !important}');}}
}



function warehouse_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 24 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho12.png) !important}');}
		else if ( levelBuilding > 14 && levelBuilding < 25 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho10.png) !important}');}}
}

function warehouse_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 24 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho12.png) !important}');}
		else if ( levelBuilding > 14 && levelBuilding < 25 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho10.png) !important}');}}
}

function warehouse_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 24 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho12.png) !important}');}
		else if ( levelBuilding > 14 && levelBuilding < 25 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho10.png) !important}');}}
}

function warehouse_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 24 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho12.png) !important}');}
		else if ( levelBuilding > 14 && levelBuilding < 25 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho10.png) !important}');}}
}

function warehouse_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 24 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho12.png) !important}');}
		else if ( levelBuilding > 14 && levelBuilding < 25 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho10.png) !important}');}}
}

function warehouse_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 24 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho12.png) !important}');}
		else if ( levelBuilding > 14 && levelBuilding < 25 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho10.png) !important}');}}
}

function warehouse_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 24 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho12.png) !important}');}
		else if ( levelBuilding > 14 && levelBuilding < 25 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho10.png) !important}');}}
}

function warehouse_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 24 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho12.png) !important}');}
		else if ( levelBuilding > 14 && levelBuilding < 25 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho10.png) !important}');}}
}

function warehouse_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 24 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho12.png) !important}');}
		else if ( levelBuilding > 14 && levelBuilding < 25 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho10.png) !important}');}}
}

function warehouse_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 24 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho12.png) !important}');}
		else if ( levelBuilding > 14 && levelBuilding < 25 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho10.png) !important}');}}
}

function warehouse_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 24 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho12.png) !important}');}
		else if ( levelBuilding > 14 && levelBuilding < 25 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .warehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/wareho10.png) !important}');}}
}


function palace_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast10.png) !important}');}}
}

function palace_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast10.png) !important}');}}
}

function palace_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast10.png) !important}');}}
}

function palace_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast10.png) !important}');}}
}

function palace_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast10.png) !important}');}}
}

function palace_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast10.png) !important}');}}
}

function palace_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast10.png) !important}');}}
}

function palace_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast10.png) !important}');}}
}

function palace_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast10.png) !important}');}}
}

function palace_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast10.png) !important}');}}
}

function palace_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palace .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palast10.png) !important}');}}
}


function workshop_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh10.png) !important}');}}
}

function workshop_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh10.png) !important}');}}
}

function workshop_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh10.png) !important}');}}
}

function workshop_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh10.png) !important}');}}
}

function workshop_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh10.png) !important}');}}
}

function workshop_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh10.png) !important}');}}
}

function workshop_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh10.png) !important}');}}
}

function workshop_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh10.png) !important}');}}
}

function workshop_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh10.png) !important}');}}
}

function workshop_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh10.png) !important}');}}
}

function workshop_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .workshop .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/worksh10.png) !important}');}}
}

//Kontor
function branchOffice_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 14 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch10.png) !important}');}}
}

function branchOffice_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 14 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch10.png) !important}');}}
}

function branchOffice_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 14 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch10.png) !important}');}}
}

function branchOffice_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 14 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch10.png) !important}');}}
}

function branchOffice_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 14 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch10.png) !important}');}}
}

function branchOffice_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 14 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch10.png) !important}');}}
}

function branchOffice_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 14 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch10.png) !important}');}}
}

function branchOffice_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 14 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch10.png) !important}');}}
}

function branchOffice_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 14 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch10.png) !important}');}}
}

function branchOffice_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 14 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch10.png) !important}');}}
}

function branchOffice_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 14 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch12.png) !important}');}
		else if ( levelBuilding > 6 && levelBuilding < 15 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .branchOffice .buildingimg {left:-25px;top:-45px;width:120px;height:120px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/branch10.png) !important}');}}
}


function embassy_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:110px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass10.png) !important}');}}
}

function embassy_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:110px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass10.png) !important}');}}
}

function embassy_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:110px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass10.png) !important}');}}
}

function embassy_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-8px;top:-50px;width:110px;height:110px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass10.png) !important}');}}
}

function embassy_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:110px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass10.png) !important}');}}
}

function embassy_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:110px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass10.png) !important}');}}
}

function embassy_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:110px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass10.png) !important}');}}
}

function embassy_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:110px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass10.png) !important}');}}
}

function embassy_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:110px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass10.png) !important}');}}
}

function embassy_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:110px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass10.png) !important}');}}
}

function embassy_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:110px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .embassy .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/embass10.png) !important}');}}
}



function palaceColony_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace10.png) !important}');}}
}

function palaceColony_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace10.png) !important}');}}
}

function palaceColony_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace10.png) !important}');}}
}

function palaceColony_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace10.png) !important}');}}
}

function palaceColony_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace10.png) !important}');}}
}

function palaceColony_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace10.png) !important}');}}
}

function palaceColony_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace10.png) !important}');}}
}

function palaceColony_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace10.png) !important}');}}
}

function palaceColony_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace10.png) !important}');}}
}

function palaceColony_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace10.png) !important}');}}
}

function palaceColony_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 6 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace12.png) !important}');}
		else if ( levelBuilding > 2 && levelBuilding < 7 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 3 ){addCSS('#city #container #mainview #locations .palaceColony .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/palace10.png) !important}');}}
}


function barracks_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac10.png) !important}');}}
}

function barracks_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac10.png) !important}');}}
}

function barracks_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac10.png) !important}');}}
}

function barracks_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac10.png) !important}');}}
}

function barracks_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac10.png) !important}');}}
}

function barracks_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac10.png) !important}');}}
}

function barracks_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac10.png) !important}');}}
}

function barracks_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac10.png) !important}');}}
}

function barracks_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac10.png) !important}');}}
}

function barracks_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac10.png) !important}');}}
}

function barracks_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .barracks .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/barrac10.png) !important}');}}
}


function alchemist_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 9 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem10.png) !important}');}}
}

function alchemist_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 9 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem10.png) !important}');}}
}

function alchemist_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 9 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem10.png) !important}');}}
}

function alchemist_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 9 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem10.png) !important}');}}
}

function alchemist_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 9 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem10.png) !important}');}}
}

function alchemist_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 9 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem10.png) !important}');}}
}

function alchemist_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 9 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem10.png) !important}');}}
}

function alchemist_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49//album/alchem12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 9 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem10.png) !important}');}}
}

function alchemist_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 9 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem10.png) !important}');}}
}

function alchemist_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 9 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49//album/alchem10.png) !important}');}}
}

function alchemist_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 19 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 20 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 9 ){addCSS('#city #container #mainview #locations .alchemist .buildingimg {left:-25px;top:-55px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/alchem10.png) !important}');}}
}


function architect_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit10.png) !important}');}}
}

function architect_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit10.png) !important}');}}
}

function architect_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit10.png) !important}');}}
}

function architect_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit10.png) !important}');}}
}

function architect_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit10.png) !important}');}}
}

function architect_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit10.png) !important}');}}
}

function architect_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit10.png) !important}');}}
}

function architect_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit10.png) !important}');}}
}

function architect_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit10.png) !important}');}}
}

function architect_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit10.png) !important}');}}
}

function architect_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .architect .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/archit10.png) !important}');}}
}


function dump_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde310.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde210.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde110.png) !important}');}}
}

function dump_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde310.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde210.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde110.png) !important}');}}
}

function dump_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde310.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde210.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-60px;top:-125px;width:250px;height:250px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde110.png) !important}');}}
}

function dump_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde310.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde210.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde110.png) !important}');}}
}

function dump_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde310.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde210.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde110.png) !important}');}}
}

function dump_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde310.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde210.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde110.png) !important}');}}
}

function dump_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde310.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde210.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde110.png) !important}');}}
}

function dump_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde310.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde210.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde110.png) !important}');}}
}

function dump_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde310.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde210.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde110.png) !important}');}}
}

function dump_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde310.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde210.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde110.png) !important}');}}
}

function dump_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde310.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde210.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .dump .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/halde110.png) !important}');}}
}


function stonemason_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm15.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm14.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm13.png) !important}');}}
}

function stonemason_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm15.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm14.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm13.png) !important}');}}
}

function stonemason_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm15.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm14.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm13.png) !important}');}}
}

function stonemason_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm15.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm14.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm13.png) !important}');}}
}

function stonemason_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm15.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm14.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm13.png) !important}');}}
}

function stonemason_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm15.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm14.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm13.png) !important}');}}
}

function stonemason_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm15.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm14.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm13.png) !important}');}}
}

function stonemason_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm15.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm14.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm13.png) !important}');}}
}

function stonemason_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm15.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm14.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm13.png) !important}');}}
}

function stonemason_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm15.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm14.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm13.png) !important}');}}
}

function stonemason_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm15.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm14.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .stonemason .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/steinm13.png) !important}');}}
}


function winegrower_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr10.png) !important}');}}
}

function winegrower_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr10.png) !important}');}}
}

function winegrower_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr10.png) !important}');}}
}

function winegrower_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr10.png) !important}');}}
}

function winegrower_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr10.png) !important}');}}
}

function winegrower_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr10.png) !important}');}}
}

function winegrower_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr10.png) !important}');}}
}

function winegrower_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr10.png) !important}');}}
}

function winegrower_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr10.png) !important}');}}
}

function winegrower_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr10.png) !important}');}}
}

function winegrower_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .winegrower .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/winegr10.png) !important}');}}
}

//Zimmerei
function carpentering_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen10.png) !important}');}}
}

function carpentering_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen10.png) !important}');}}
}

function carpentering_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen10.png) !important}');}}
}

function carpentering_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen10.png) !important}');}}
}

function carpentering_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen10.png) !important}');}}
}

function carpentering_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen10.png) !important}');}}
}

function carpentering_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen10.png) !important}');}}
}

function carpentering_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen10.png) !important}');}}
}

function carpentering_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen10.png) !important}');}}
}

function carpentering_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen10.png) !important}');}}
}

function carpentering_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .carpentering .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/carpen10.png) !important}');}}
}


function fireworker_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo10.png) !important}');}}
}

function fireworker_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo10.png) !important}');}}
}

function fireworker_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo10.png) !important}');}}
}

function fireworker_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo10.png) !important}');}}
}

function fireworker_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo10.png) !important}');}}
}

function fireworker_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo10.png) !important}');}}
}

function fireworker_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo10.png) !important}');}}
}

function fireworker_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo10.png) !important}');}}
}

function fireworker_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo10.png) !important}');}}
}

function fireworker_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo10.png) !important}');}}
}

function fireworker_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .fireworker .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/firewo10.png) !important}');}}
}


function forester_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest10.png) !important}');}}
}

function forester_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest10.png) !important}');}}
}

function forester_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest10.png) !important}');}}
}

function forester_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest10.png) !important}');}}
}

function forester_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest10.png) !important}');}}
}

function forester_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest10.png) !important}');}}
}

function forester_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest10.png) !important}');}}
}

function forester_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest10.png) !important}');}}
}

function forester_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest10.png) !important}');}}
}

function forester_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest10.png) !important}');}}
}

function forester_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .forester .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/forest10.png) !important}');}}
}



function glassblowing_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb10.png) !important}');}}
}

function glassblowing_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb10.png) !important}');}}
}

function glassblowing_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb10.png) !important}');}}
}

function glassblowing_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb10.png) !important}');}}
}

function glassblowing_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb10.png) !important}');}}
}

function glassblowing_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb10.png) !important}');}}
}

function glassblowing_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb10.png) !important}');}}
}

function glassblowing_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb10.png) !important}');}}
}

function glassblowing_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb10.png) !important}');}}
}

function glassblowing_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb10.png) !important}');}}
}

function glassblowing_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .glassblowing .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/glassb10.png) !important}');}}
}



function temple_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple10.png) !important}');}}
}

function temple_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple10.png) !important}');}}
}

function temple_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple10.png) !important}');}}
}

function temple_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple10.png) !important}');}}
}

function temple_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple10.png) !important}');}}
}

function temple_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple10.png) !important}');}}
}

function temple_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple10.png) !important}');}}
}

function temple_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple10.png) !important}');}}
}

function temple_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple10.png) !important}');}}
}

function temple_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple10.png) !important}');}}
}

function temple_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .temple .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/temple10.png) !important}');}}
}


function safehouse_3() {
if(document.getElementById('position3')){
		var titleBuilding = document.getElementById('position3').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho10.png) !important}');}}
}

function safehouse_4() {
if(document.getElementById('position4')){
		var titleBuilding = document.getElementById('position4').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho10.png) !important}');}}
}

function safehouse_5() {
if(document.getElementById('position5')){
		var titleBuilding = document.getElementById('position5').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho10.png) !important}');}}
}

function safehouse_6() {
if(document.getElementById('position6')){
		var titleBuilding = document.getElementById('position6').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho10.png) !important}');}}
}

function safehouse_7() {
if(document.getElementById('position7')){
		var titleBuilding = document.getElementById('position7').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho10.png) !important}');}}
}

function safehouse_8() {
if(document.getElementById('position8')){
		var titleBuilding = document.getElementById('position8').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho10.png) !important}');}}
}

function safehouse_9() {
if(document.getElementById('position9')){
		var titleBuilding = document.getElementById('position9').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho10.png) !important}');}}
}

function safehouse_10() {
if(document.getElementById('position10')){
		var titleBuilding = document.getElementById('position10').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho10.png) !important}');}}
}

function safehouse_11() {
if(document.getElementById('position11')){
		var titleBuilding = document.getElementById('position11').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho10.png) !important}');}}
}

function safehouse_12() {
if(document.getElementById('position12')){
		var titleBuilding = document.getElementById('position12').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho10.png) !important}');}}
}

function safehouse_13() {
if(document.getElementById('position13')){
		var titleBuilding = document.getElementById('position13').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .safehouse .buildingimg {left:-25px;top:-45px;width:110px;height:100px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/safeho10.png) !important}');}}
}

function townhall() {
if(document.getElementById('position0')){
		var titleBuilding = document.getElementById('position0').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if (  levelBuilding > 15 ){
		addCSS('#city #container #mainview #locations .townHall .buildingimg {left:-25px;top:-80px;width:150px;height:150px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/rathau12.png) !important}');
		}
		else if ( levelBuilding > 10 && levelBuilding < 16 ){addCSS('#city #container #mainview #locations .townHall .buildingimg {left:-25px;top:-75px;width:130px;height:130px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/rathau11.png) !important}');}
		}
}

function port_1() {
if(document.getElementById('position1')){
		var titleBuilding = document.getElementById('position1').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .port .buildingimg {left:-85px;top:-65px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/port310.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .port .buildingimg {left:-85px;top:-85px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/port210.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .port .buildingimg {left:-85px;top:-85px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/port110.png) !important}');}}
}

function port_2() {
if(document.getElementById('position2')){
		var titleBuilding = document.getElementById('position2').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 21 ){addCSS('#city #container #mainview #locations .port .buildingimg {left:-85px;top:-65px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/port310.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .port .buildingimg {left:-85px;top:-85px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/port210.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .port .buildingimg {left:-85px;top:-85px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/port110.png) !important}');}}
}

function shipyard_1() {
if(document.getElementById('position1')){
		var titleBuilding = document.getElementById('position1').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
		if ( levelBuilding > 30 && levelBuilding < 50 ){addCSS('#city #container #mainview #locations .shipyard .buildingimg left:-85px;top:-65px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/shipya12.png) !important}');}
		else if ( levelBuilding > 21 && levelBuilding < 29 ){addCSS('#city #container #mainview #locations .shipyard .buildingimg {left:-85px;top:-65px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/shipya12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 31 ){addCSS('#city #container #mainview #locations .shipyard .buildingimg {left:-65px;top:-95px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/shipya11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .shipyard .buildingimg {left:-65px;top:-95px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/shipya10.png) !important}');}}
}

function shipyard_2() {
if(document.getElementById('position2')){
		var titleBuilding = document.getElementById('position2').getElementsByTagName('a')[0].title;
		var levelBuilding = titleBuilding.substr(titleBuilding.length-2)*1;
    if ( levelBuilding > 30 && levelBuilding < 50 ){addCSS('#city #container #mainview #locations .shipyard .buildingimg left:-85px;top:-65px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/shipya12.png) !important}');}
		else if ( levelBuilding > 21 && levelBuilding < 31 ){addCSS('#city #container #mainview #locations .shipyard .buildingimg left:-85px;top:-65px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/shipya12.png) !important}');}
		else if ( levelBuilding > 9 && levelBuilding < 22 ){addCSS('#city #container #mainview #locations .shipyard .buildingimg {left:-65px;top:-95px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/shipya11.png) !important}');}
		else if ( levelBuilding > 0 && levelBuilding < 10 ){addCSS('#city #container #mainview #locations .shipyard .buildingimg {left:-65px;top:-95px;width:200px;height:200px;background-image: url(http://twlg.forumieren.de/users/1611/63/79/49/album/shipya10.png) !important}');}}
}

var SUC_script_num = 90787; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
