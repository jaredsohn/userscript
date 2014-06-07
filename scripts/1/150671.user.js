// ==UserScript==
// @name        Automatically select your country in drop-down lists
// @version     1.0
// @include     *
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$('select').each(function () {

// edit var mycountry and add your own country ... :
var mycountry = ["US","USA","Usa","United States","U.S.A","U.S.A.","USofA","US America","US. America","U.S. America","US of America","US. of America","U.S. of America","UnitedStates","United States of Ame","United States of Am","United States of A","United States of Amer","UnitedStates of Ameri","United States of Americ","United States of America","UnitedStatesofAmerica","America","UNITED STATES","UNITED STATES OF AMERICA","usa","united states","united states of america","America, United States of"]; 
for(var i = 0; i < mycountry.length; i++) {
$(this).find("option").filter(function(){return $(this).text()== mycountry[i] ;}).prop('selected', true);}});