// ==UserScript==
// @name          Quick-Adopt-Form
// @description   Adds form that allows you to adopt pets like with the quick-adopt-link
// @include       http://www.neopets.com/pound/adopt.*
// ==/UserScript==
// This script is free to use and modify for any purpose without any restrictions.
var newhtml;
var warning;
var pos=document.cookie.lastIndexOf('lang=');
var lang = document.cookie.substr(pos+5, 2);
switch (lang){
case "de": 
warning="Warnung: Das Script ist m&ouml;glicherweise gegen die Regeln. Benutzung auf eigene Gefahr.";
break;
case "es":
warning="Advertencia, esta escritura &egrave;sta posiblemente contra las reglas. Uso en propio peligro.";
break;
case "en":
default:
warning="Warning: This script may be against the rules. You are using it at your own risk!";
break;

}

newhtml='<form action="process_adopt.phtml" method="post">Adopt pet directly:\n<input type="text" name="pet_name" id="qal_adopt">\n<input type="submit" name="qal_submit"></form>\n<b style="color:red">'+warning+'</b><br><br>'+document.getElementById('search').innerHTML;
document.getElementById('search').innerHTML=newhtml;


document.getElementsByName('qal_submit')[0].addEventListener('click',function (qal_confirmation){
var petname=document.getElementById('qal_adopt').value;
check=confirm("Are you sure you want to adopt "+petname+"?\nSorry, we can't display the required Neopoints for technical reasons. This is a hack, after all.");
if (check==false){qal_confirmation.stopPropagation(); qal_confirmation.preventDefault();}
}, true);

//History
//1.0 (1st May, 08) Initial release. Contains warning on Spanish, German and English