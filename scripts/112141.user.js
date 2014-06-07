// ==UserScript==
// @name ES_Battle
// @namespace 3k
// @version 1.2
// @source google.ru
// @description ABBYS
// @include http://escilon.ru/fight/*
//
// ==/UserScript==

// Math.floor( Math.random( ) * (n - m + 1) ) + m // îò m äî n
var x = Math.floor( Math.random( ) * 3 ) + 1 
//alert(x)
if (document.getElementById('resource_form')){
document.getElementById('captcha_value').value = x
document.getElementById('resource_form').submit()
}

var tbody = document.getElementsByTagName('tbody')[2]
var td_hp = tbody.getElementsByTagName('td')[1]
var a = new Array()
var b = new Array()
a = td_hp.innerHTML.split('/')
b = a[1].split(' ')
var mana = (b[0]-a[0])/2
var td_mp = tbody.getElementsByTagName('td')[4]
var span_mp = td_mp.getElementsByTagName('span')[0]
var min_hp = 450
var min_mp = 700



if (document.getElementById('total_ap').innerHTML == '11'){
document.getElementById('head_block').checked = 0;
document.getElementById('hand_block').checked = 0;
document.getElementById('body_block').checked = 0;
document.getElementById('leg_block').checked = 1;
document.getElementById('action_form').submit();
}

if (span_mp.innerHTML==0){
document.getElementById('instrument').value = "spirit";
document.getElementById('blow_type').value = "meditation";
document.getElementById('head_block').checked = 0;
document.getElementById('hand_block').checked = 0;
document.getElementById('body_block').checked = 1;
document.getElementById('leg_block').checked = 1;
document.getElementById('action_form').submit();
}

if (a[0]<min_hp){
document.getElementById('instrument').value = "spirit";
document.getElementById('blow_type').value = "heal";
if ( (span_mp.innerHTML) < (Math.floor(mana)) ) {document.getElementById('mn_power').value = span_mp.innerHTML}
else {document.getElementById('mn_power').value = Math.floor(mana)}
document.getElementById('head_block').checked = 0;
document.getElementById('hand_block').checked = 0;
document.getElementById('body_block').checked = 1;
document.getElementById('leg_block').checked = 1;
document.getElementById('action_form').submit();
}

if (span_mp.innerHTML<min_mp){
document.getElementById('instrument').value = "spirit";
document.getElementById('blow_type').value = "meditation";
document.getElementById('head_block').checked = 0;
document.getElementById('hand_block').checked = 0;
document.getElementById('body_block').checked = 1;
document.getElementById('leg_block').checked = 1;
document.getElementById('action_form').submit();
}

document.getElementById('instrument').value = "spirit";
document.getElementById('blow_type').value = "spirit_lash";
//document.getElementById('instrument').value = "leg";
//document.getElementById('blow_type').value = "swinged";
document.getElementById('blow_target').value = "head";
document.getElementById('mn_power').value = "100";
document.getElementById('head_block').checked = 0;
document.getElementById('hand_block').checked = 0;
document.getElementById('body_block').checked = 1;
document.getElementById('leg_block').checked = 1;
document.getElementById('action_form').submit();