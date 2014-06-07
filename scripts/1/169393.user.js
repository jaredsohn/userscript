// ==UserScript==
// @name         fight c8
// @version      1.0
// @include      http://*.sofiawars.com/fight/*
// @author       Mr_Rage
// @run-at       document-end
// ==/UserScript==
/*
//groups
$('td.group').eq(0).css('background-color', '#EEFFEE');
$('td.group').eq(1).css('background-color', '#FFEEEE');

var ch1 = $('div.group1 i');

if (ch1.hasClass('resident')) {
   $('td.group').eq(0).css('background-color', '#EEFFEE');
   $('td.group').eq(1).css('background-color', '#FFEEEE'); 
}
if (ch1.hasClass('arrived')) {
   $('td.group').eq(0).css('background-color', '#FFEEEE');
   $('td.group').eq(1).css('background-color', '#EEFFEE'); 
}

*/
//fr
$('li.alive span.user i.resident').parent().css('color', '#008800').find("a").css('color', '#008800');
$('li.dead span.user i.resident').parent().css('color', '#008800').find("a").css('color', '#008800');
$('li.alive span.user i.arrived').parent().css('color', '#880000').find("a").css('color', '#880000');
$('li.dead span.user i.arrived').parent().css('color', '#880000').find("a").css('color', '#880000');


//fr-logs
$('span.name-resident b').css('color', '#008800');
$('span.name-arrived b').css('color', '#880000');


//npcs
$("span.user a:contains('Плъхотрол')").css('color', '#ed7408').parent().css('color', '#ed7408');
$("span.user a:contains('Рушветчия')").css('color', '#297ACC').parent().css('color', '#297ACC');
$("span.user a:contains('Брокер')").css('color', '#297ACC').parent().css('color', '#297ACC');
$("span.user a:contains('Панк')").css('color', '#297ACC').parent().css('color', '#297ACC');
$("span.user a:contains('Бомж')").css('color', '#297ACC').parent().css('color', '#297ACC');
$("span.user a:contains('Мафиот')").css('color', '#297ACC').parent().css('color', '#297ACC');
$("span.user a:contains('Охрана')").css('color', '#297ACC').parent().css('color', '#297ACC');
$("span.user a:contains('Началник охрана')").css('color', '#297ACC').parent().css('color', '#297ACC');


//npcs-logs
$("span.name-neutral b:contains('Рушветчия')").css('color', '#297ACC');
$("span.name-neutral b:contains('Брокер')").css('color', '#297ACC');
$("span.name-neutral b:contains('Панк')").css('color', '#297ACC');
$("span.name-neutral b:contains('Бомж')").css('color', '#297ACC');
$("span.name-neutral b:contains('Мафиот')").css('color', '#297ACC');
$("span.name-neutral b:contains('Охрана')").css('color', '#297ACC');
$("span.name-neutral b:contains('Началник охрана')").css('color', '#297ACC');
$("span.name-neutral b:contains('Плъхотрол')").css('color', '#ed7408');


//me-all
var name = $('li.me.alive span.user a').text();
var name2 = $('li.me.dead span.user a').text();

if ($('li.me.alive').length) {
   $("div.text p:contains('" + name + "')").not('p.killed').css('background-color', '#FFD699');
   $("div.text p").find("span:eq(0):contains('" + name + "')").parent().not('p.killed').not('p.bang').css('background-color', '#A3FFA3');
   $("div.text p").find("span:eq(1):contains('" + name + "')").parent().not('p.killed').not('p.bang').css('background-color', '#A3FFA3');

   $('li.me.alive span.user a').css('color', '#000099').parent().css('color', '#000099');
   $("span.name-resident b:contains('" + name + "')").css('color', '#000099');
   $("span.name-arrived b:contains('" + name + "')").css('color', '#000099');
}

if ($('li.me.dead').length) {
   $("div.text p:contains('" + name2 + "')").not('p.killed').css('background-color', '#FFD699');
   $("div.text p").find("span:eq(0):contains('" + name2 + "')").parent().not('p.killed').not('p.bang').css('background-color', '#A3FFA3');
   $("div.text p").find("span:eq(1):contains('" + name2 + "')").parent().not('p.killed').not('p.bang').css('background-color', '#A3FFA3');
   
   $('li.me.dead span.user a').css('color', '#000099').parent().css('color', '#000099');
   $("span.name-resident b:contains('" + name2 + "')").css('color', '#000099');
   $("span.name-arrived b:contains('" + name2 + "')").css('color', '#000099');
}


   
