// ==UserScript==
// @name           ES_xp
// @namespace      escilon
// @include        http://escilon.ru/fight/*
// ==/UserScript==



var tbody = document.getElementsByTagName('tbody')[2]
var td_hp = tbody.getElementsByTagName('td')[1]
var a = new Array()
var b = new Array()
a = td_hp.innerHTML.split('/')
b = a[1].split(' ')
var mana = (b[0]-a[0])/2
var td_mp = tbody.getElementsByTagName('td')[4]
td_mp.innerHTML = td_mp.innerHTML +' '+Math.floor(mana)


var form = document.getElementById('action_form')
var div = form.getElementsByTagName('div')[4]
var input = document.createElement('input')
div.appendChild(input)
input.type = "button"
input.className = "btn"
input.value = "\u0425\u0438\u043B\u044F\u0446\u043E"
input.style.backgroundColor = "#219A00"
input.style.marginLeft = "4px"
input.id = "hil"
//input.onclick = function() {  alert('zzz')	}
//document.getElementById('med').click = alert('zzz')
input.addEventListener('click', function(){
document.getElementById('instrument').value = "spirit";
document.getElementById('blow_type').value = "heal";
document.getElementById('mn_power').value = Math.floor(mana);
document.getElementById('head_block').checked = 0;
document.getElementById('hand_block').checked = 0;
document.getElementById('body_block').checked = 1;
document.getElementById('leg_block').checked = 1;
document.getElementById('action_form').submit();
}, false);


 