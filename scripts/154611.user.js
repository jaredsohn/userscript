// ==UserScript==
// @name        macau
// @namespace   worm
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description ticket
// @include     http://www.turbojet50.com/public_qna/FBFullFeatureTab/desktop*
// @version     1
// ==/UserScript==



$(document).ready(function() {
   //start();
 });


function macauticket1 () {
    $('input[name=name]').val('name');
$('input[name=hkid]').val('hkid first 5 char');
$('input[name=email]').val('email');
$('input[name=postal]').val('852');
$('input[name=mobile]').val('phone');
$('input[name=terms]').attr('checked',true);
$('input:radio[name=ans]')[0].checked = true;
$('#btnSubmit').click();
}
function macauticket2 () {
    $('input[name=name]').val('name');
$('input[name=hkid]').val('hkid first 5 char');
$('input[name=email]').val('email');
$('input[name=postal]').val('852');
$('input[name=mobile]').val('phone');
$('input[name=terms]').attr('checked',true);
$('input:radio[name=ans]')[1].checked = true;
$('#btnSubmit').click();
}
function macauticket3 () {
    $('input[name=name]').val('name');
$('input[name=hkid]').val('hkid first 5 char');
$('input[name=email]').val('email');
$('input[name=postal]').val('852');
$('input[name=mobile]').val('phone');
$('input[name=terms]').attr('checked',true);
$('input:radio[name=ans]')[2].checked = true;
$('#btnSubmit').click();
}

var orginele_pagina =  $('#main_container');
orginele_pagina.before (
    '<button style="left:180px;top:800px;width:100px;position:absolute;" id="myButton1" value="haha">ANS 1</button><button style="left:180px;top:830px;width:100px;position:absolute;" id="myButton2" value="haha">ANS 2</button><button style="left:180px;top:860px;width:100px;position:absolute;" id="myButton3" value="haha">ANS 3</button>'
);

$("#myButton1").click (macauticket1);
$("#myButton2").click (macauticket2);
$("#myButton3").click (macauticket3);

