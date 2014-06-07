// ==UserScript==
// @name           ES_medit
// @namespace      escilon
// @include        http://escilon.ru/fight/*
// ==/UserScript==

var form = document.getElementById('action_form')
var div = form.getElementsByTagName('div')[4]
var input = document.createElement('input')
div.appendChild(input)
input.type = "button"
input.className = "a_btnr"
input.value = "\u041C\u0435\u0434\u0438\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"
input.style.backgroundColor = "#7B68EE"
input.id = "med"
//input.onclick = function() {  alert('zzz')	}
//document.getElementById('med').click = alert('zzz')
input.addEventListener('click', function(){
document.getElementById('instrument').value = "spirit";
document.getElementById('blow_type').value = "meditation";
document.getElementById('head_block').checked = 0;
document.getElementById('hand_block').checked = 0;
document.getElementById('body_block').checked = 1;
document.getElementById('leg_block').checked = 1;
document.getElementById('action_form').submit();
}, false);


/*if (document.getElementById('total_ap').innerHTML == '10')
{
document.getElementById('head_block').checked = 0;
document.getElementById('hand_block').checked = 0;
document.getElementById('body_block').checked = 0;
document.getElementById('leg_block').checked = 1;
document.getElementById('action_form').submit();
}
else{
document.getElementById('instrument').value = "spirit";
document.getElementById('blow_type').value = "meditation";
document.getElementById('head_block').checked = 0;
document.getElementById('hand_block').checked = 0;
document.getElementById('body_block').checked = 1;
document.getElementById('leg_block').checked = 1;
document.getElementById('action_form').submit();
}
*/

