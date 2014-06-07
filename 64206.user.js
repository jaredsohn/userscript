// ==UserScript==
// @name           Milos on FB
// @namespace      www.facebook.com
// @description    Moja poruka
// @version        1.0
// @include        *.facebook.com/*
// ==/UserScript==





latest = document.getElementById('pagelet_presence');

/*
element = document.getElementById('adcolumn_advertise').style.display = "none";
element = document.getElementById('ssponsor').style.display = "none";
element = document.getElementById('adcolumn_more_ads').style.display = "none";
*/


/*
element = document.createElement("h3");
element.textContent = "Milos je car";
*/


/*params_el = document.createElement("h3");
params_el.textContent = orders + ' ' + region;*/
var link = "http://www.google.com/";

element = document.createElement("a"); 
element.setAttribute('href',link);
element.innerHTML = link;

/*
updated_el=document.createElement("h3")
updated_el.textContent ='Vreme izdavanja komande: ' + date_issued;*/





latest.parentNode.insertBefore(element, latest);



