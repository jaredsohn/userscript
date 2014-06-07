// ==UserScript==
// @name           verycd fixed toolbar
// @namespace      tmp
// @description    fixed the button
// @include        http://www.verycd.com/topics/*
// ==/UserScript==




var tr_list = document.getElementById('iptcomED2K').getElementsByTagName('tr');
var button_tr = tr_list[tr_list.length-1];

var table = document.createElement('table'); 
table.appendChild(button_tr);

var regex = /topics\/(\d+)\//;
regex.test(location.href);
var topic_id = RegExp.lastParen;

if(topic_id) {
	var simplecd_tr = document.createElement('tr');
	var link="http://www.simplecd.org/id/"+topic_id;
	
	simplecd_tr.innerHTML+='<td><a href="'+link+'" target="_blank">Goto SimpleCD</a></td>';
	table.appendChild(simplecd_tr);
}
var div = document.createElement('div');
div.setAttribute('class','emulemain');

div.style.position = 'fixed';
div.style.left =0;
div.style.top =0;


div.appendChild(table);
document.body.appendChild(div);

