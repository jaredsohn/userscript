// ==UserScript==
// @name         context menu
// @version      1.0
// @include      http://*.sofiawars.com/*
// @exclude      http://forum.sofiawars.com/*
// @author       Mr_Rage
// @run-at       document-end
// ==/UserScript==


$('.main-bg').append('<div id="menu"><div>Профил</div><div>Съобщение</div><div>Атакувай</div><div>Ловен</div><div>Прасенце</div><div>Троянски кон</div><div>Каръшки заек</div><div>Респиратор</div><div>Противогаз</div><div>Тайсънки</div><div>Тайсънки «Heavy Edition»</div></div>');

$('#menu').css({'cursor': 'default', 'text-align': 'left', 'color': '#975D17', 'display': 'none', 'position': 'absolute', 'text-shadow': 'none', 'padding': '1px 0px 1px 0px', 'background': '#F7EAB4', 'margin-right': '2px', '-moz-border-radius': '5px', '-webkit-border-radius': '5px', 'border-radius': '5px', 'border': '2px solid #dc9151', 'z-index': '10'});
$('#menu div').css({'font-weight': 'bold', 'font-size': '10px', 'height': '20px', 'padding': '4px 4px 0px 20px'});
$('#menu div:not(":last")').css({'border-bottom': '1px dotted #FFD699'});



$('#menu div:eq(2)').css('color', '#590000');
$('#menu div:eq(3)').css('color', '#590000');

$('#menu div:eq(4)').css('color', 'red');
$('#menu div:eq(5)').css('color', 'red');
$('#menu div:eq(6)').css('color', 'red');

$('#menu div:eq(7)').css('color', 'green');
$('#menu div:eq(8)').css('color', 'green');
$('#menu div:eq(9)').css('color', 'green');
$('#menu div:eq(10)').css('color', 'green');




$('.user a:not(:has(img))').mousedown(function() {
   var a0 = $(this).attr('href');
   var a01 = "/dgp";
   var a = $(this).attr('href');
   a = a.replace("/player/","");
   var b = a.replace("/","");
   var c = $(this).text();
   var pras = "/pig/";
   var zaek = "/zaek/";
   var kon = "/kon/";
   var resp = "/resp/";
   var prot = "/prot/";
   var tais = "/tais/";
   var taish = "/taish/";
   
  
   
   
   $('#menu div:eq(0)').click(function(e) {if(e.ctrlKey) {window.open(a0, '_blank');return false;} else {document.location.href = a0;}}); 


   $('#menu div:eq(1)').click(function(e) {if(e.ctrlKey) {window.open('/phone/message/send/' + a + a01, '_blank');return false;}else {document.location.href = '/phone/message/send/' + a + a01;}}); 
                          
   
   $('#menu div:eq(2)').attr('onclick', 'alleyAttack('+b+');');
   
   
   $('#menu div:eq(3)').click(function(e) {if(e.ctrlKey) {window.open('/huntclub/revenge/' + a, '_blank');return false;}else {document.location.href = '/huntclub/revenge/' + a;}});
   

   $('#menu div:eq(4)').click(function(e) {if(e.ctrlKey) {window.open("/shop/section/gifts/present/" + a + c + pras, '_blank');return false;}else {document.location.href = "/shop/section/gifts/present/" + a + c + pras;}});

   
   $('#menu div:eq(5)').click(function(e) {if(e.ctrlKey) {window.open("/shop/section/gifts/present/" + a + c + kon, '_blank');return false;}else {document.location.href = "/shop/section/gifts/present/" + a + c + kon;}});
   

   $('#menu div:eq(6)').click(function(e) {if(e.ctrlKey) {window.open("/shop/section/gifts/present/" + a + c + zaek, '_blank');return false;}else {document.location.href = "/shop/section/gifts/present/" + a + c + zaek;}});
   

   $('#menu div:eq(7)').click(function(e) {if(e.ctrlKey) {window.open("/shop/section/gifts/present/" + a + c + resp, '_blank');return false;}else {document.location.href = "/shop/section/gifts/present/" + a + c + resp;}});
   

   $('#menu div:eq(8)').click(function(e) {if(e.ctrlKey) {window.open("/shop/section/gifts/present/" + a + c + prot, '_blank');return false;}else {document.location.href = "/shop/section/gifts/present/" + a + c + prot;}});
   

   $('#menu div:eq(9)').click(function(e) {if(e.ctrlKey) {window.open("/shop/section/gifts/present/" + a + c + tais, '_blank');return false;}else {document.location.href = "/shop/section/gifts/present/" + a + c + tais;}});
   

   $('#menu div:eq(10)').click(function(e) {if(e.ctrlKey) {window.open("/shop/section/gifts/present/" + a + c + taish, '_blank');return false;}else {document.location.href = "/shop/section/gifts/present/" + a + c + taish;}});
   
   
});


if(window.location.href.indexOf("/pig/") > -1) {setTimeout(function(){$(".object .data .actions #shop-item-gift_piggy .f").trigger("onclick");},100);}
if(window.location.href.indexOf("/kon/") > -1) {setTimeout(function(){$(".object .data .actions #shop-item-gift_piggy_super .f").trigger("onclick");},100);}
if(window.location.href.indexOf("/zaek/") > -1) {setTimeout(function(){$(".object .data .actions #shop-item-unluck_rabbit .f").trigger("onclick");},100);}
if(window.location.href.indexOf("/resp/") > -1) {setTimeout(function(){$(".object .data .actions #shop-item-gift_resperator .f").trigger("onclick");},100);}
if(window.location.href.indexOf("/prot/") > -1) {setTimeout(function(){$(".object .data .actions #shop-item-gift_protivogaz .f").trigger("onclick");},100);}
if(window.location.href.indexOf("/tais/") > -1) {setTimeout(function(){$(".object .data .actions #shop-item-gift_valuyki .f").trigger("onclick");},100);}
if(window.location.href.indexOf("/taish/") > -1) {setTimeout(function(){$(".object .data .actions #shop-item-gift_valuyki_super .f").trigger("onclick");},100);}


if(window.location.href.indexOf("/dgp") > -1) {setTimeout(function(){$('#text').trigger('focus');},100);}







$('#menu div').mouseover(function() {
   $(this).css({'background': '#FFED87'});//#FFD699
   $('#menu div:eq(0)').css('color', '#975D17');
   $('#menu div:eq(1)').css('color', '#975D17');
});
$('#menu div').mouseleave(function() {
   $(this).css({'background': '#F7EAB4'});
});



$('.user a:not(:has(img))').bind("contextmenu", function(e) {

    $('#menu').css({
        top: e.pageY+'px',
        left: e.pageX+'px'
    }).show();

    return false;

});

$(document).bind("contextmenu", function() {
   $('#menu').hide();
});

$('#menu').click(function() {
   $('#menu').hide();
});

$(document).click(function() {
   $('#menu').hide();
});

$(document).scroll(function() {
   $('#menu').hide();
});

