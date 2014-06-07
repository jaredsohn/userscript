// ==UserScript==
// @name NuTz Fakescript
// @description	Fakescript for Tribalwars
// ==/UserScript==

coords = coords.split(' ');  index = 0;  
farmcookie = document.cookie.match('(^|;) ?NuTzz_fakes=([^;]*)(;|$)');  
if (farmcookie != null) index = parseInt(farmcookie[2]);  
if (index >= coords.length) alert('last village');  
if (index >= coords.length) index = 0;  
coords = coords[index];  coords = coords.split('|');  
index = index + 1;  cookie_date = new Date(2069, 11, 11);  
document.cookie = 'NuTzz_fakes=' + index + ';expires=' + cookie_date.toGMTString();  
document.forms[0].x.value = coords[0];  
document.forms[0].y.value = coords[1];
scout = parseInt(document.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/\d+/)); 
rams = parseInt(document.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/)); 
cats = parseInt(document.forms[0].catapult.nextSibling.nextSibling.innerHTML.match(/\d+/)); 
farm = (cats*8)+(rams*5);
if (rams >= 21) rams = 20;
if (scout >10) document.forms[0].spy.value = 10; 
else if (scout <10) document.forms[0].spy.value = scout; 
if (cats <=100) document.forms[0].catapult.value = cats; 
if (cats >100) document.forms[0].catapult.value = 100; 
if (cats <= 9&&rams !=0) document.forms[0].ram.value = rams;
if ((farm <=100)&&scout >=((100-farm)/2)) document.forms[0].spy.value = ((100-farm)/2);
if (cats+rams = 0) alert('Sorry you don\'t have any rams or cats available!');
else if (farm+(scout*2) <=100) alert('Sorry you are a n00b');