// ==UserScript==
// @name        Fug select
// @namespace   Khan
// @include     *32429&target_fleet=&target_ship=
// @version     1
// @require 	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==


$('select').each(function () {

// edit var mycountry and add your own country ... :
var mycountry = ["Bless"]; 
for(var i = 0; i < mycountry.length; i++) {
$(this).find("option").filter(function(){return $(this).text()== mycountry[i] ;}).prop('selected', true);}});


var elems =document.getElementsByClassName("imarket");

for(var i=0;i<elems.length;i++)
{
    if(elems[i].name =="submit")
    {
        elems[i].click();        
        break;
    }
}
