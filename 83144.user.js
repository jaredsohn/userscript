// ==UserScript==
// @name	Ikariam ZF Vorschau
// @version	0.2
// @namespace	ZF Vorschau
// @description	ZF Preview Ger
// @include	http://s*.ikariam.*/index.php?view=finances
// @exclude	http://*.support*

// ==/UserScript==
//-----------------------------------------------------------------------------

var mainview = document.getElementById("mainview");
var rows =  mainview.getElementsByTagName("table")[1].getElementsByTagName("tr");

var ecoFuture = (rows.length-2)*20*3;
// each town 20 additional citicen, 3 gold each

var sciFuture = parseInt((rows[rows.length-1].getElementsByTagName("td")[2].innerHTML.replace(/\D/g,"")));
// 2% more SciPoints, for the old amount of points you would pay 2% less
// x/1.02 - x = 

var rows = document.getElementById("upkeepReductionTable").getElementsByTagName("tr");

var milFuture = parseInt((rows[1].getElementsByTagName("td")[1].innerHTML.replace(/\D/g,"")));
// 2% less Military Funds

var seaFuture = parseInt((rows[3].getElementsByTagName("td")[1].innerHTML.replace(/\D/g,"")));


var table = document.createElement('table');
table.className="table01";
var innerHTML = '<tbody><tr><th>Vorschau Zukunftsforschung...</th><th/><th/></tr>';

// 2% less Seafaring Funds
innerHTML += '<tr><td style="text-align: left">ZF Seefahrt:</td>';
innerHTML += '<td style="text-align: right">' + seaFuture +' (2%)</td>';
innerHTML += '<td style="text-align: right">' + Math.round(seaFuture/50) +'</td></tr>';

innerHTML += '<tr class="alt"><td style="text-align: left">ZF Wirtschaft:</td>';
innerHTML += '<td style="text-align: right">' + Math.round(ecoFuture/60) +'x20x3</td>';
innerHTML += '<td style="text-align: right">' + ecoFuture +'</td></tr>';

innerHTML += '<tr><td style="text-align: left">ZF Wissenschaft:</td>';
innerHTML += '<td style="text-align: right">' + sciFuture +' (2%)</td>';
innerHTML += '<td style="text-align: right">' + Math.round(sciFuture-sciFuture/1.02) +'</td></tr>';

innerHTML += '<tr class="alt"><td style="text-align: left">ZF Milit&auml;r:</td>';
innerHTML += '<td style="text-align: right">' + milFuture +' (2%)</td>';
innerHTML += '<td style="text-align: right">' + Math.round(milFuture/50) +'</td></tr>';

innerHTML += '</tbody>';
table.innerHTML = innerHTML;

mainview.appendChild(table);
