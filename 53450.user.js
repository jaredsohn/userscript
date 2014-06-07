// ==UserScript==
// @name           Pennergame Plunderrechner 1.0
// @namespace      gordon_vdlg.byethost16.com
// @description    Rechnet Werte wie z.B. Gesamtwert des Plunders aus.
// @include        http://pennergame.de/stock/plunder/
// @include        http://*.pennergame.de/stock/plunder/
// ==/UserScript==

var stocktabelle = document.getElementById("messageslist");
var currenttr = stocktabelle.firstChild.nextSibling.firstChild;

var newtd = document.createElement("td");
newtd.bgColor = "#272727";
newtd.style.cssText = '-moz-border-radius-topright: 4px; vertical-align: middle; width: 90px;';
newtd.innerHTML = '&nbsp;<strong>Gesamtwert</strong>';
currenttr.lastChild.previousSibling.style.cssText = 'vertical-align: middle;';
currenttr.appendChild(newtd);

var summe;
var summemenge = 0;
var summewert = 0;
var brk = 0;

while (brk == 0) {
  currenttr = currenttr.nextSibling.nextSibling;
  currenttd = currenttr.firstChild.nextSibling;
  if (currenttd.colSpan == "3") {
    break;
  }
  currenttd = currenttd.nextSibling.nextSibling;
  currenttd = currenttd.nextSibling.nextSibling;
  currentmenge = currenttd.firstChild.innerHTML;
  currentmenge = currentmenge.slice(0, currentmenge.indexOf(" "));

  currenttd = currenttd.nextSibling.nextSibling;
  currentwert = currenttd.innerHTML;
  currentwert = currentwert.slice(currentwert.indexOf("für")+5);
  currentwert = currentwert.slice(0, currentwert.indexOf("<"));
  currentwert = currentwert.replace((/,/g), ".");

  summe = currentmenge*parseFloat(currentwert);
  summe = summe.toFixed(2);
  summemenge += parseInt(currentmenge);
  summewert += parseFloat(summe);
  summe = summe.replace((/\./g), ",");

  newtd = document.createElement("td");
  newtd.style.borderBottom = '1px solid #272727';
  newtd.style.borderRight = '1px solid #272727';
  newtd.style.verticalAlign = "middle";
  newtd.innerHTML = "<center>&euro;"+summe+"</center>";
  currenttr.appendChild(newtd);
}

summewert = summewert.toFixed(2);
summewert = summewert.replace((/\./g), ",");
currenttr.innerHTML = '<td height="25" bgcolor="#272727"></td><td style="vertical-align:middle" height="25" bgcolor="#272727">Summe:</td>'+
'<td style="vertical-align:middle" height="25" bgcolor="#272727">'+summemenge+'</td><td height="25" bgcolor="#272727"></td>'+
'<td style="vertical-align:middle" height="25" bgcolor="#272727"><center>&euro;'+summewert+'</center></td>';