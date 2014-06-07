// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Andaloria Gildenpage Button
// @description   Fuegt dem Andaloria Menue einen Gildenbutton hinzu
// @include       http://*andaloria*/*
// @exclude       http://phpmap1.andaloria.de/*
// @exclude       http://tt.andaloria.de/*
// @exclude       http://forum.andaloria.de/*
// ==/UserScript==


var page_conf = GM_getValue('page');

GM_registerMenuCommand('Adresse festlegen', setYourPage);


function setYourPage()
{
var page_prompt = prompt('Gib hier die Adresse deiner Gildenseite ein, inklusive http:// ', (page_conf ? page_conf : ''));
if(page_prompt)
{
GM_setValue('page', page_prompt);

}
}


function init(){
if(!page_conf) {
alert("Du hast noch keine Gilden-Adresse gespeichert!");
setYourPage();
location.reload();
}

}

init();

// ==/UserScript==



var submenu_extras, newElement;
navbar = document.getElementById('submenu_extras');

if (navbar) {

    newElement = document.createElement('a');
    newElement.innerHTML = '<a href=\"'+page_conf+'" target=\"_blank\" style=\"margin-left:-4px;margin-top:-4px;\"> Gildenpage</a>';
    document.getElementById("submenu_extras").appendChild(newElement);

}

