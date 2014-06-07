// ==UserScript==
// @version       1.0
// @name          Unixy.fr -> Eolia default Selection
// @namespace     http*://www.unixy.fr*
// @icon          http://unixy.fr/favicon.ico
// @description   automatically selects Eolia
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==


$('#univers option').attr('selected','');
$('#univers option[value="eolia"]').attr('selected','selected');