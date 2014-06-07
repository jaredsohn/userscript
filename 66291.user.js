// ==UserScript==
// @name           Spice up the profile
// @namespace      none
// @author				 Crazy Monk (Laoujin / De Goede Fee)
// @include http://nl*.tribalwars.nl/game.php?*village=*&screen=info_player&id=*
// @include http://nl*.tribalwars.nl/game.php?*village=*&screen=info_village&id=*
// @include *
// ==/UserScript==
var mainlist = findByInner(document, "Profiel")[0].parentNode;
var server = 'nl';
var srv = document.location.href.match(/nl(\d+)\D*\.tribalwars\./)[1];
var playerid = document.location.href.match(/screen=info_player&id=(\d+)/)[1];
var andere = "&pn=-1&type=";

//Aan te passen variabelen:
var alleen_gewonnen_dorpen = false;
var alleen_verloren_dorpen = false;
var alle_dorpen = true;
var min_punten = 0;
var max_punten = 100000;
var alleen_verlaten = false;
var alleen_spelers_zonder_stam = false;
var hoogte = 200
var breedte = 700


if(alleen_verloren_dorpen==true){
andere = andere + "lose"
}
if (alle_dorpen==true){
andere = andere + "all";
}
if (alleen_gewonnen_dorpen==true){
andere = andere + "gain";
}
if(alleen_verlaten==false){
andere = andere + "&enemy=-1"
}
if(alleen_verlaten==true){
andere = andere + "&enemy=0"
}
if(alleen_spelers_zonder_stam==true){
andere = andere + "&enemyt=0"
}
if(alleen_spelers_zonder_stam==false){
andere = andere + "&enemyt=-1"
}
andere = andere + "&min="+min_punten+"&max="+max_punten+""

var zich = true;
var twLink = 'http://'+server+'.twstats.com/nl'+srv+'/index.php?page=player&mode=conquers&id='+playerid+andere+"";


var iframe = document.createElement('div');

iframe.innerHTML = "TW-Stats";

addRow(iframe, mainlist, 'th');
if (zich){

		var iframe = document.createElement("iframe");

		iframe.setAttribute('src', twLink);

		iframe.setAttribute('width', breedte);

		iframe.setAttribute('height', hoogte);

		addRow(iframe, mainlist, 'td');

}


function addRow(element, table, rowType)
{

	var tr = document.createElement('tr');
	var td = document.createElement(rowType);
	td.colSpan = 2;

	td.appendChild(element);
	tr.appendChild(td);
	table.parentNode.appendChild(tr,mainlist);

}

function findByInner(obj,value)
{

    var len = obj.getElementsByTagName('th');
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len.length; i++)
    {
        if(len[i].innerHTML.indexOf(value) != -1)
        {
          list[a] = len[i];
          a++;
        }
    }
    list['length'] = a;
    return list;
}
