// ==UserScript==
// @name           NUMA Rates Per Map
// @namespace      http://userscripts.org/scripts/show/56064
// @include        http://www.nmaps.net/user/*
// @description    Adds a rates/map property on the NUMA profile page.
// ==/UserScript==

form = document.getElementsByClassName("formtable")[0];
rows = form.getElementsByTagName("tr");

re = />(.+?) \(/

maps = re.exec(rows[1].childNodes[3].innerHTML)[1];
fo = 0;
featured = 0;
if (rows[4].childNodes[1].innerHTML == 'Featured Maps'){
	fo = 1;
	featured = re.exec(rows[4].childNodes[3].innerHTML)[1]; }
ratings = rows[5+fo].childNodes[3].innerHTML;

email = '';
if (rows.length > (6+fo)){
	email = rows[6+fo].childNodes[3].innerHTML;
	r_email = rows[6+fo]; }

rpmr = document.createElement("tr");
rpmh = document.createElement("th");
rpmd = document.createElement("td");

rpmh.innerHTML = "Rates Per Map";
rpmd.innerHTML = Math.round((ratings/maps)*100)/100;

rpmr.appendChild(rpmh);
rpmr.appendChild(rpmd);
form.appendChild(rpmr);
if ( email ) { r_email.style.display = 'none'; }