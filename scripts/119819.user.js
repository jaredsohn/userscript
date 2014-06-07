// ==UserScript==
// @name   Supersoldier,Schulterglatze,SlickSleeve donations link 
// @include   *supersoldier.pl/masterfile
// @include   *slick-sleeve.com/masterfile
// @include   *schulterglatze.de/masterfile
// ==/UserScript==


var wklej = document.getElementsByTagName('li')[8];
var url = document.getElementsByClassName('userprofil_link_form')[1].getElementsByTagName('input')[0].value;  
var link = '<a href="http://www.hitfake.eu/index.php?url='+url+'&v=2" target="_blank" style="color:red;">Donations</a>';
var mylink = document.createElement('li');
mylink.innerHTML = link;
wklej.parentNode.insertBefore(mylink, wklej.nextSibling);


