// ==UserScript==
// @name           kalkulator_kosztu
// @namespace      sg
// @include        http://*sguni.pl/pages/fleet/send_transport.seam*
// ==/UserScript==


function wybierz(typ) {
  switch(typ)
  {
  case 0: var SP = new Array(85000, 67000, 18800, 10600, 37200); return(SP); break;
  case 1: var BO = new Array(21000, 9500, 4300, 5000, 5000); return(BO); break;
  }
}

var targetForm = document.getElementById("targetForm");
var div = targetForm.getElementsByTagName("div");
div = div[2];

var select = document.createElement("select");
select.style.width = "80px";
select.options[0] = new Option("SP", 0, 1, 1)
select.options[1] = new Option("BO", 1, 0, 0)

//-----

table = document.createElement("table");
table.className = "containers";
div.appendChild(table);
tr0 = document.createElement("tr");
table.appendChild(tr0);
td0 = document.createElement("td");
tr0.appendChild(td0);
td0.className = "title";
td0.colSpan = 3;
td0.style.width = "5%";
td0text = document.createTextNode('Kalkulator');
td0.appendChild(td0text);

tr = document.createElement("tr");
table.appendChild(tr);
td1 = document.createElement("td");
tr.appendChild(td1);
td2 = document.createElement("td");
tr.appendChild(td2);
td3 = document.createElement("td");
tr.appendChild(td3);

var input0 = document.createElement("input");
input0.style.width = "80px";
input0.type = "text";
input0.value = 0;
td1.appendChild(select);
td2.appendChild(input0);

var butt = document.createElement('button');
var buttext = document.createTextNode('Wpisz');
butt.appendChild(buttext);
butt.style.width = "80px";
butt.className = "submit"
butt.addEventListener('click', function() { wpisz(input0.value, wybierz(select.selectedIndex)); } , true);
td3.appendChild(butt);

function wpisz(ile, tab) {
m = document.getElementById("targetForm:metalCargo");
m.value = ile*tab[0];
k = document.getElementById("targetForm:krystalCargo");
k.value = ile*tab[1];
z = document.getElementById("targetForm:goldCargo");
z.value = ile*tab[2];
n = document.getElementById("targetForm:naquadahCargo");
n.value = ile*tab[3];
d = document.getElementById("targetForm:deuterCargo");
d.value = ile*tab[4];
}