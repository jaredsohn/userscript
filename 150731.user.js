// ==UserScript==
// @name       Filtru Fisierulmeu
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  remove unwanted files from 
// @include      http://*fisierulmeu.ro/*
// @copyright  2012+, drakulaboy
// @updateURL	http://userscripts.org/scripts/source/150731.user.js
// ==/UserScript==

$(document).ready(function () {
    var exclude = ['Susanu',
                  'Guta',
                  'Susanu',
                  'Printesa',
                  'Salam',
                  'Juve',
                  'Dules',
                  'GUTA',
                  'Nek',
                  'Asu',
                  'SALAM',
                  'FLORIN PESTE',
                  'Florin Peste',
                  'Denisa',
                  'DENISA',
                  'Ticy',
                  'Vijelie',
                  'VIJELIE',
                  'SORINEL PUSTIU',
                  'Sorinel Pustiu',
                  'TICY',
                  'FANTASTICK',
                  'Fantastick',
                  'DULES',
                  'MR.JUVE',
                  'BABI MINUNE',
                  'Babi Minune',
                  'NARCISA',
                  'Adrian Minune',
                  'ADI DE LA VILCEA',
                  'SUSANU',
                  'Susanu',
                  'LIVIU',
                  'Liviu',
                  'IONUT CERCEL',
                  'Ionut Cercel',
                  'Dorel',
                  'DOREL',
                  'DE LA VALCEA',
                  'MARIANO',
                  'BABANU',
                  'BURSUC',
                  'PITICU',
                   'ALESSIO',
                   'Pustiu',
                   'Narcisa',
                   'Piticu',
                   'Alessio',
                   'Ciofu',
                   'CIOFU',
                   'De Aur',
                   'DE AUR',
                   'Ionut',
                   'Ionut',
                   'Bodo',
                   'BODO',
                   'Brandy',
                   'BRANDY',
                   'de Aur',
                   'ASU',
                   'Asu',
                   'asu',
                   'DeMARCO',
                   'DEMARCO',
                   'Demarco',
                   'ADRIAN MINUNE',
                  'De Marco'];
        
    exclude.forEach(function(i){
        $('.tbl1 tr:contains(' + i + ')').hide();
    });
});