// ==UserScript==
// @name           TW Attack confirmer
// @namespace      http://namespace
// @description    Confirms attacks
// @include        http://en34.tribalwars.net/
// ==/UserScript==


// click link
if(location.href.indexOf('&screen=info_village')>-1) 
{
location.href = location.href.replace("&screen=info_village&id=", "&screen=place&mode=command&target=");
}

// add a scout
if(location.href.indexOf('screen=place')>-1 && location.href.indexOf('try=confirm')==-1 )
{

//scout
document.forms[0].elements[3].value="1";
//light cavalry
//document.forms[0].elements[4].value="250";

// click attack
//document.forms[0].elements[12].click();

}




// submit form
if(location.href.indexOf('&screen=place&try=confirm')>-1 && document.forms[0].elements[3].value!="1" && location.href.indexOf('type=same')==-1) 
{
document.forms[0].submit();
}