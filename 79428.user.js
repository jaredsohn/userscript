// ==UserScript==
// @name           Exile recherche
// @namespace      http://sheflaprod.free.fr
// @description    Ajoute des fonctionnalités de recherche au menu de navigation.
// @include        http://genesis.exile.fr/game/*
// ==/UserScript==

var d = document,
    menu   = d.getElementById('leftnav'),
    title  = d.createElement('a'),
    label  = ['Nation', 'Alliance'],
    form   = [d.createElement('form'),  d.createElement('form')],
    input  = [d.createElement('input'), d.createElement('input')],
    param  = ['name', 'tag'],
    action = [
		'http://genesis.exile.fr/game/nation.asp?name=',
    	'http://genesis.exile.fr/game/alliance.asp?tag='
	];
function placeHolder(label, isFocus){
	return function(){
		if (isFocus){
			if (this.value == label){ this.value = ''; }
		} else {
			if (this.value == ''){ this.value = label; }
		}
	};
};
for (var i = 0; i < 2; i++){
	input[i].type = 'text';
	input[i].value = label[i];
	input[i].name = param[i];
	input[i].size = 12;
	input[i].style.height = '15px';
	input[i].addEventListener('focus', placeHolder(label[i], true),  false);
	input[i].addEventListener('blur',  placeHolder(label[i], false), false);
	form[i].method = 'GET';
	form[i].action = action[i];
	form[i].className = 'menu lvl2';
	form[i].appendChild(input[i]);
	form[i].style.paddingBottom = '2px';
	menu.insertBefore(form[i], menu.firstChild);
}

title.textContent = 'Recherche';
title.className = 'menu lvl1';
title.href = '#';
menu.insertBefore(title, menu.firstChild);





