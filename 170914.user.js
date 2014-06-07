// ==UserScript==
// @name         bank
// @version      1.0
// @include      http://*.sofiawars.com/bank/
// @author       Mr_Rage
// @run-at       document-end
// ==/UserScript==


x = $('.tugriki-block').attr("title").replace(/\Монети:/g,"");
y = Math.floor(x/750);
z = y*750;
$('.ruda input').val(y);
$('#tugriks.tugriki').text(z).append('<i></i>');