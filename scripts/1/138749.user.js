// ==UserScript==
// @name          Sort all selects 
// @namespace     http://www.catworkx.de
// @description   Sorts all dropdowns 
// @include       http://*
// @include       https://*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

function OptionsSort(a, b) {    
    if (a.innerHTML == 'NA') {
        return 1;   
    }
    else if (b.innerHTML == 'NA') {
        return -1;   
    }       
    return (a.innerHTML > b.innerHTML) ? 1 : -1;
};

$('select').each(function () {
    $(this).find('option').sort(OptionsSort).appendTo($(this));
});
