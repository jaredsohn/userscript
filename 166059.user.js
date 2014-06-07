// ==UserScript==
// @name        Allegro 2013 trash killer
// @namespace   allegro2013
// @description Removes some annoying elements of new 2013 look
// @include     *allegro.pl/*
// @version     1.3
// @grant   oku
// ==/UserScript==





function wytnijDiv(div_id) {
var element_znikaj = document.getElementById(div_id);
	if (element_znikaj) {
	    element_znikaj.parentNode.removeChild(element_znikaj);
	}
}

function ZniknijSmieci() {
wytnijDiv('main-nav');
wytnijDiv('cookie-policy-banner');
wytnijDiv('toggle-layout-bar');
wytnijDiv('items-carousel-recommended');
wytnijDiv('10');
wytnijDiv('13');

// zdjęcia
var elements = document.getElementsByClassName('photo loading');
for (i = 0; i < elements.length; i++){
    elements[i].style.padding = '0px';                  // usuwanie cienia wokół obrazków
	elements[i].setAttribute('data-hidetooltip', 1);    // zaprzestanie wyświetlania powiększenia po najechaniu myszą
}

// ceny
var elements = document.getElementsByClassName('buy-now dist');
for (i = 0; i < elements.length; i++){
    elements[i].style.fontSize = '18px';                  // mniejsze ceny
}    
    
var elements = document.getElementsByClassName('bid dist');
for (i = 0; i < elements.length; i++){
    elements[i].style.fontSize = '18px';      
}

// prosty listing
var elements = document.getElementsByClassName('view-option view-simple');
for (i = 0; i < elements.length; i++){
    elements[i].click();      
}

/*
var element = document.getElementById('listing');
 if (element) {
    element.setAttribute('class', 'listing  listing-simple');  
	}
*/

}

//---------------------- start -----------------

ZniknijSmieci();

var menubar = document.getElementById('sidebar-params');
if (menubar) {
    menubar.style.fontSize="15px";
}

//------------- po załadowaniu jeszcze raz!
window.addEventListener(
    'load', 
    function() { ZniknijSmieci(); },
    true);
