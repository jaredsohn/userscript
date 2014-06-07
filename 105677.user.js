﻿// ==UserScript==
// @name         Travian4 - NPC AddIn
// @author       armanda
// @version      1.0.0
// @size         ‏‏3.68 KB
// @description  Work With(Firefox, Chrome, Opera) - (T4 only!)
// @include      http://*.travian.*/*
// @exclude      http://*.travian*.*/hilfe.php*
// ==/UserScript==

function ID(id){ return document.getElementById(id) };
function CL(className){ return document.getElementsByClassName(className) };
function C(value){ return parseInt(value) };
function Create(tagName){ return document.createElement(tagName) };

//--------------------------------------------

var unit = [];

// R
unit[1] = [120, 100, 180, 40, 440];
unit[2] = [100, 130, 160, 70, 460];
unit[3] = [150, 160, 210, 80, 600];
unit[4] = [140, 160, 20, 40, 360];
unit[5] = [550, 440, 320, 100, 1410];
unit[6] = [550, 640, 800, 180, 2170];
unit[7] = [900, 360, 500, 70, 1830];
unit[8] = [950, 1350, 600, 90, 2990];
unit[9] = [30750, 27200, 45000, 37500, 140450];
unit[10] = [5800, 5300, 7200, 5500, 23800];

// T
unit[11] = [95, 75, 40, 40, 250];
unit[12] = [145, 70, 85, 40, 340];
unit[13] = [130, 120, 170, 70, 490];
unit[14] = [160, 100, 50, 50, 360];
unit[15] = [370, 270, 290, 75, 1005];
unit[16] = [450, 515, 480, 80, 1525];
unit[17] = [1000, 300, 350, 70, 1720];
unit[18] = [900, 1200, 600, 60, 2760];
unit[19] = [35500, 26600, 25000, 27200, 114300];
unit[20] = [7200, 5500, 5800, 6500, 25000];

// G
unit[21] = [100, 130, 55, 30, 315];
unit[22] = [140, 150, 185, 60, 535];
unit[23] = [170, 150, 20, 40, 380];
unit[24] = [350, 450, 230, 60, 1090];
unit[25] = [360, 330, 280, 120, 1090];
unit[26] = [500, 620, 675, 170, 1965];
unit[27] = [950, 555, 330, 75, 1910];
unit[28] = [960, 1450, 630, 90, 3130];
unit[29] = [30750, 45400, 31000, 37500, 144650];
unit[30] = [5500, 7000, 5300, 4900, 22700];

//---------------------------------------------------

function NPC(num, elm, child){
var Name = elm;
var source = C(C(ID("l1").innerHTML) + C(ID("l2").innerHTML) + C(ID("l3").innerHTML) + C(ID("l4").innerHTML));
var Resource = '' + C(C(source) / C(Name[num][4])) + '';

var Last = [];
Last[0] = C(Resource * Name[num][0]);
Last[1] = C(Resource * Name[num][1]);
Last[2] = C(Resource * Name[num][2]);
Last[3] = C(Resource * Name[num][3]);

var TD = Create("td");
TD.setAttribute("style", "background-color: white; border: 1px solid silver; padding: 0px 2px;");

var IMG = Create("img");
IMG.setAttribute("class", 'unit u' + num + '')
IMG.setAttribute("src", 'img/x.gif')

var Link = Create("a");
Link.setAttribute("href", 'javascript:void(0)');
Link.setAttribute("onclick", "document.getElementsByName('m2[]')[0].value='"+Last[0]+"';document.getElementsByName('m2[]')[1].value='"+Last[1]+"';document.getElementsByName('m2[]')[2].value='"+Last[2]+"';document.getElementsByName('m2[]')[3].value='"+Last[3]+"';calculateRest();");
Link.appendChild(document.createTextNode("(" + Resource + ")"));

TD.appendChild(IMG);
TD.appendChild(Link);

child.appendChild(TD);
};

if(window.location.href.match(/build\b[^>]*=\d*&t=3/) && CL("building big white g17")[0]){

var table = Create("table");
table.setAttribute("cellspacing", "0");
table.setAttribute("style", "width: auto; border-collapse: collapse;");

var tbody = Create("tbody");

var TrA = Create("tr");
for(i=0;i<10;i++){NPC((i+1), unit, TrA);};

var TrB = Create("tr");
for(i=0;i<10;i++){NPC((i+11), unit, TrB);};

var TrC = Create("tr");
for(i=0;i<10;i++){NPC((i+21), unit, TrC);};

tbody.appendChild(TrA);
tbody.appendChild(TrB);
tbody.appendChild(TrC);
table.appendChild(tbody);

ID("npc").parentNode.insertBefore(table, ID("npc"));
ID("npc").parentNode.insertBefore(Create("br"), ID("npc"));
};






