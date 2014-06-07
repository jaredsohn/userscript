// ==UserScript==
// @name            buildings-points_plapl.com-tribalwars
// @namespace       Die Staemme
// @description     Version 2.1.0|  buildings-points-in-the-main-building
// @version         2.1.0
// @injectframes    1
// @include                    http://*.tribalwars.*/game.php?village=*&screen=main
// @include                    http://*.tribalwars.*/staemme.php?village=*&screen=main
// @include                    http://*.tribalwars.*/game.php?screen=main&village=*
// @include                    http://*.tribalwars.*/staemme.php?screen=main&village=*
// ==/UserScript==

//********************************************************************************************
// (c) By gamer1990 (2009), (Original from Softyx)
//********************************************************************************************

//Punkte
var gebaudepunkte = new Array();
gebaudepunkte['main'] = new Array(10,2,2,3,4,4,5,6,7,9,10,12,15,18,21,26,31,37,44,53,64,77,92,110,133,159,191,229,274,330);
gebaudepunkte['barracks'] = new Array(16,3,4,5,5,7,8,9,12,14,16,20,24,28,34,42,49,59,71,85,102,123,147,177,212);
gebaudepunkte['stable'] = new Array(20,4,5,6,6,9,10,12,14,17,21,25,29,36,43,51,62,74,88,107);
gebaudepunkte['garage'] = new Array(24,5,6,6,9,10,12,14,17,21,25,29,36,43,51);
gebaudepunkte['church_f'] = new Array(10,0);
gebaudepunkte['church'] = new Array(10,2,2);
gebaudepunkte['snob'] = new Array(512,102,123);
gebaudepunkte['smith'] = new Array(19,4,4,6,6,8,10,11,14,16,20,23,28,34,41,49,58,71,84,101);
gebaudepunkte['place'] = new Array(0,0);
gebaudepunkte['statue'] = new Array(24,0);
gebaudepunkte['market'] = new Array(10,2,2,3,4,4,5,6,7,9,10,12,15,18,21,26,31,37,44,53,64,77,92,110,133);
gebaudepunkte['wood'] = new Array(6,1,2,1,2,3,3,3,5,5,6,8,8,11,13,15,19,22,27,32,38,46,55,66,80,95,115,137,165,198);
gebaudepunkte['stone'] = new Array(6,1,2,1,2,3,3,3,5,5,6,8,8,11,13,15,19,22,27,32,38,46,55,66,80,95,115,137,165,198);
gebaudepunkte['iron'] = new Array(6,1,2,1,2,3,3,3,5,5,6,8,8,11,13,15,19,22,27,32,38,46,55,66,80,95,115,137,165,198);
gebaudepunkte['farm'] = new Array(5,1,1,2,1,2,3,3,3,5,5,6,8,8,11,13,15,19,22,27,32,38,46,55,66,80,95,115,137,165);
gebaudepunkte['storage'] = new Array(6,1,2,1,2,3,3,3,5,5,6,8,8,11,13,15,19,22,27,32,38,46,55,66,80,95,115,137,165,198);
gebaudepunkte['hide'] = new Array(5,1,1,2,1,2,3,3,3,5);
gebaudepunkte['wall'] = new Array(8,2,2,2,3,3,4,5,5,7,9,9,12,15,17,20,25,29,36,43);

// Tabelle ausfindig machen
var erste = document.getElementsByTagName("table")[0];
var vis = document.getElementsByClassName("vis").length-1;
var table = document.getElementsByClassName("vis")[vis];

// Titelzeile
var AG =  table.rows[0].insertBefore(document.createElement('th'),null);
AG.innerHTML = "نقاط";




for (var i = 1; i < table.rows.length; i++)
{
    // Rohstoffe Zug entfernen
    if (table.rows[i].cells.length > 6)
    {
        var ausbau = table.rows[i].cells[6];
        var notver = ausbau.innerHTML.length;
        var fertig = ausbau.innerHTML.substr(21,(notver-21));
        var capita = ausbau.innerHTML.substr(19,2).toUpperCase();
        if (ausbau.innerHTML.match("Rohstoffe verfügbar"))
        {
            ausbau.innerHTML = capita + fertig
        }
        else if (ausbau.innerHTML.match("Zu wenig Rohstoffe um in der Bauschleife zu produzieren."))
        {
            ausbau.innerHTML = "Nicht in Bauschleife möglich";
        }
        else if (ausbau.innerHTML.match("Rohstoffe ausreichend verfügbar"))
        {
            ausbau.innerHTML = "Rohstoffe verfügbar";
        }
    }

    //Punkteanzeige
    var gebaude = new Object;

    if (table.rows[i].cells.length > 6)
    {
        gebaude.zelle_anzeige = table.rows[i].insertBefore(document.createElement('td'),null);
        gebaude.zelle_anzeige.setAttribute("align","right");
        gebaude.zelle_typ = table.rows[i].cells[0];
        
        gebaude.stufe = gebaude.zelle_typ.innerHTML.match(/مستوي ([0-9]+)/);

        if(gebaude.stufe == undefined) {
                 gebaude.stufe = new Array(0, 0);
        }  

        gebaude.typ = gebaude.zelle_typ.innerHTML.match(/buildings[\/\\](.*?)\.png/);
                
        if (gebaude.stufe && gebaude.typ && gebaudepunkte[gebaude.typ[1]])
        {
            gebaude.zelle_anzeige.innerHTML = gebaude.zelle_anzeige.innerHTML + " <span style=\"color:#4169E1;\">+" + 

gebaudepunkte[gebaude.typ[1]][gebaude.stufe[1]] + " نقطه</span>";
        }
    }
}

function addCaption()
{

  var tab = document.forms[0].childNodes[1];
  var newTab = tab.cloneNode(false);
  
  var newTr = document.createElement("tr");
  newTr.className = "nowrap";
  
  var newTd = document.createElement("td");
  newTd.className = "small";
  
 
  newTd.innerHTML = "<a href=http://www.plapl.com/forum.php>------------------------------------------>>>>>>>>>>>>>بلابل<<<<<<<<<<<<------------------------------------------</a> &nbsp;";
  newTr.appendChild(newTd);
  
  newTab.appendChild(newTr);
  tab.parentNode.insertBefore(newTab, tab.previousSibling);
  tab.parentNode.insertBefore(tab.previousSibling.cloneNode(false), newTab);
}
addCaption();