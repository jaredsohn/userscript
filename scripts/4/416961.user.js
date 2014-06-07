// ==UserScript==
// @name       Estiliza workflowy
// @namespace  	http://portilho.com/
// @version    	0.5
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @description Estiliza workflowy
// @match      http://workflowy.com/*
// @match      https://workflowy.com/*
// ==/UserScript==
(function() {

function estilizaTags() {
    console.log('estilizando...');
    $('.contentTag[title="Filter @asap"]').css('background-color', 'orangered').css('color', 'white');
    $('.contentTag[title="Filter @hoje"]').css('background-color', 'magenta').css('color', 'white').css('font-weight','bold');
    $('.contentTag[title="Filter @aguardando"]').css('background-color', 'gold').css('color', 'rgb(116, 116, 116)');
    $('.contentTag[title="Filter @agendado"]').css('background-color', 'rgb(0, 153, 255)').css('color', 'white');
    $('.contentTag[title="Filter @emandamento"]').css('background-color', 'rgb(37, 182, 37)').css('color', 'gold');
    $('.contentTag[title="Filter @epico"]').css('background-color', 'rgb(123, 242, 246)').css('color', 'rgb(173, 0, 166)');
    $('.contentTag[title="Filter @decidir"]').css('background-color', 'blueviolet').css('color', 'white');
};
 
    setTimeout(function(){
        estilizaTags();
        $('.pageStar').hover(estilizaTags);
    },1500);
})();