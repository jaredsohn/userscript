// ==UserScript==
// @name        Ausrechner
// @namespace   Happy
// @include     *cp.rpg-city.de/*funktion=_casino*
// @version     1
// ==/UserScript==

var fonts = document.getElementsByTagName("font");
var lose = 0;
var win = 0;
for(var i=0;i<fonts.length;i++)
{
  if(fonts[i].getAttribute("color") == "red")
  {
    lose++;
  }
  else if(fonts[i].getAttribute("color") == "green")
  {
    win++;
  }
}

var tr;
var td;


tr = document.createElement("tr");
td = document.createElement("td");
td.innerHTML = "Gewonnen: ";
tr.appendChild(td);
td = document.createElement("td");
td.innerHTML = win;
td.setAttribute("style", "color:green;");
tr.appendChild(td);

document.getElementsByTagName("table")[0].appendChild(tr);


tr = document.createElement("tr");
td = document.createElement("td");
td.innerHTML = "Verloren: ";
tr.appendChild(td);
td = document.createElement("td");
td.innerHTML = lose;
td.setAttribute("style", "color:red;");
tr.appendChild(td);

document.getElementsByTagName("table")[0].appendChild(tr);


tr = document.createElement("tr");
td = document.createElement("td");
td.innerHTML = "Gewinnverhältnis:";
tr.appendChild(td);
td = document.createElement("td");
td.innerHTML = Math.round(win/(win+lose)*100)+"/"+Math.round(lose/(win+lose)*100);
tr.appendChild(td);

document.getElementsByTagName("table")[0].appendChild(tr);


//Bewundert nicht das Coding, es würde bestimmt schöner gehen.
//Und stalkt keine Quelltexte :-P