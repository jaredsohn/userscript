// ==UserScript==
// @name           TravianV4 - easy stats value from troops & animals
// @namespace      http://userscripts.org/users/202611
// @description    A small script for the page "dorf1.php" who's give you the total value attack and/or defence from all your troops and all animals that your hero had caught. This script are principaly customised for teutons but contain txt for gauls and romans. 
// @include        http://ts*.travian.*/dorf1.*
// @author         Tapirboy
// @modify by      Boulouloubi (Fr)
// @version        1
// ==/UserScript==

(function troopwatch() {

    // unit purpose constants - don't edit
    var NONE=0,OFF=1,DEF=2,ALL=3;

    /* SIMPLE SETTINGS - feel free to edit values */

    // Hero stats
    var SS_hero_isCavallery = true; // false if infantery, true if cavallery
    var SS_hero_attack = 0; // default 0
    var SS_hero_def_inf = 0; // default 0
    var SS_hero_def_cav = 0; // default 0
    var SS_hero_purpose = ALL; // choose between: ALL | OFF | DEFF | NONE
    var SS_hero_speed = 0; // set hero speed

    /* END OF SIMPLE SETTINGS */

    function $id(id) {
        return (id!=''? document.getElementById(id): null);
    };
    function $class(aName) {
        return (aName != '' ? document.getElementsByClassName(aName) : null);
    };

    function roundK(v){
        if (v>10000){
            v = v>100000? Math.round(v/1000): Math.round(v/100)/10;
            v = v+"k";
        }
        return v;
    };

    var total = new Array();
    var unit = new Array();

    // constants
    var PURPOSE=0,TYPE=1,ATT=2,DEF_INF=3,DEF_CAV=4,CROP=5,SPEED=6,ATT_INF=0,ATT_CAV=1;

    // change unit purpose to include/exclude unit from total calculation
    // unit purpose: ALL | OFF | DEF | NONE
    // Roman
    unit[1] = new Array(ALL,false,40,35,50,1,6); // lego
    unit[2] = new Array(DEF,false,30,65,35,1,5); //praet
    unit[3] = new Array(OFF,false,70,40,25,1,7); // imp
    unit[4] = new Array(NONE,true,0,20,10,2,16); // scout
    unit[5] = new Array(OFF,true,120,65,50,3,14); // Imp cav
    unit[6] = new Array(OFF,true,180,80,105,4,10); //ceasar
    unit[7] = new Array(NONE,false,60,30,75,4,4); // ram
    unit[8] = new Array(NONE,false,75,60,10,6,3); // cata
    unit[9] = new Array(NONE,false,50,40,30,5,5); // senator
    unit[10] = new Array(NONE,false,0,80,80,1,5); // settler
    // Teutons
    unit[11] = new Array(ALL,false,40,20,5,1,7); // club
    unit[12] = new Array(ALL,false,10,35,60,1,7); // spear
    unit[13] = new Array(ALL,false,60,30,30,1,6); // axe
    unit[14] = new Array(NONE,false,0,10,5,1,9); // scout
    unit[15] = new Array(ALL,true,55,100,40,2,10); // paladin
    unit[16] = new Array(ALL,true,150,50,75,3,9); // knight
    unit[17] = new Array(ALL,false,65,30,80,3,4); // ram
    unit[18] = new Array(ALL,false,50,60,10,6,3); // cata
    unit[19] = new Array(ALL,false,40,60,40,5,4); // chief
    unit[20] = new Array(ALL,false,0,80,80,1,5); // settler
    // Gaul
    unit[21] = new Array(DEF,false,15,40,50,1,7); // phalanx
    unit[22] = new Array(OFF,false,65,35,20,1,6); // sword
    unit[23] = new Array(NONE,true,0,20,10,2,17); // scout
    unit[24] = new Array(OFF,true,90,25,40,2,19); // tt
    unit[25] = new Array(DEF,true,45,115,55,2,16); // druid
    unit[26] = new Array(OFF,true,140,50,165,3,13); // haeduan
    unit[27] = new Array(NONE,false,50,30,105,3,4); // ram
    unit[28] = new Array(NONE,false,70,45,10,6,3); // cata
    unit[29] = new Array(NONE,false,40,50,50,4,5); // senator
    unit[30] = new Array(NONE,false,0,80,80,1,5); // settler
    // Other (don't change)
    unit[31] = new Array(DEF,false,0,25,20,0,0); // rat
	unit[32] = new Array(DEF,false,0,35,40,0,0); // spider
	unit[33] = new Array(DEF,false,0,40,60,0,0); // snake
	unit[34] = new Array(DEF,false,0,66,50,0,0); // bat
	unit[35] = new Array(DEF,false,0,70,33,0,0); // wolf bear
	unit[36] = new Array(DEF,false,0,80,70,0,0); // wolf
	unit[37] = new Array(DEF,false,0,140,200,0,0); // beat
	unit[38] = new Array(DEF,false,0,380,240,0,0); // crocodile
	unit[39] = new Array(DEF,false,0,170,250,0,0); // tiger
	unit[40] = new Array(DEF,false,0,440,520,0,0); // elephant
	unit[0] = new Array(SS_hero_purpose,SS_hero_isCavallery,SS_hero_attack,SS_hero_def_inf,SS_hero_def_cav,6,SS_hero_speed); // hero

    total[ATT_INF] = 0;
    total[ATT_CAV] = 0;
    total[DEF_INF] = 0;
    total[DEF_CAV] = 0;
    total[CROP] = 0;

    var u = $class("unit");
    var n = $class("num");
    var t = $class("un");

    // get values
    for (var i=0; i<u.length; i++) {
        var x = u[i].className.split(" u")[1];
        var tip = document.createElement("span");
        if (x.match(/hero/)) {
            x = 0;
        }
        if (unit[x]){
            var y = new Number(n[i+4].innerHTML);

            // offensive points
            if (unit[x][PURPOSE]==OFF || unit[x][PURPOSE]==ALL) {
                total[ATT_INF] += unit[x][TYPE]? 0: unit[x][ATT]*y;
                total[ATT_CAV] += unit[x][TYPE]? unit[x][ATT]*y: 0;
            }

            // defensive points
            if (unit[x][PURPOSE]==DEF || unit[x][PURPOSE]==ALL) {
                total[DEF_INF] += unit[x][DEF_INF]*y;
                total[DEF_CAV] += unit[x][DEF_CAV]*y;
            }

            // add tooltip
            tip.title += roundK(unit[x][ATT]*y) +" | " +roundK(unit[x][DEF_INF]*y) +" | " +roundK(unit[x][DEF_CAV]*y) +" | " +unit[x][SPEED] +" | " +roundK(unit[x][CROP]*y);
            tip.innerHTML = t[i].innerHTML;
            t[i].innerHTML = "";
            t[i].appendChild(tip);

            // crop consumption
            total[CROP] += unit[x][CROP]*y;
        }
    }

    // add crop consumption
    var row = $id("troops").rows[0];
    var cell = row.cells[0];
    cell.setAttribute("colspan", 2);
    cell = document.createElement("td");
    cell.setAttribute("style","background:#fff;");
    cell.innerHTML ="<span title='"+total[CROP]+"'>"+roundK(total[CROP])+"<img class='r5' src='img/x.gif' /></span>";
    row.appendChild(cell);

    // add off/deff values
    row = $id("troops").insertRow(1);
    cell = row.insertCell(0);
    cell.colSpan = "3";
    cell.innerHTML = "<span title='"+roundK(total[ATT_INF])+" | "+roundK(total[ATT_CAV])+"'><img class='att_all' src='img/x.gif' style='vertical-align:middle;padding:0 2px;'/>"+roundK(total[ATT_INF]+total[ATT_CAV])+"&nbsp;</span><span title='"+total[DEF_INF]+"'><img class='def_i' src='img/x.gif' style='vertical-align:middle;padding:0 2px;'/>"+roundK(total[DEF_INF])+"&nbsp;</span><span title='"+total[DEF_CAV]+"'><img class='def_c' src='img/x.gif' style='vertical-align:middle;padding:0 2px;'/>"+roundK(total[DEF_CAV])+"</span>";
})();