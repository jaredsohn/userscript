//
//
// ==UserScript==
// @name          Dirty Ban Decoder
// @namespace     http://dirty.ru/
// @description   Декодер бан-ветки
// @include       http://dirty.ru/banned/*
// @include       http://dirty.ru/banned
// @include       http://www.dirty.ru/banned/*
// @include       http://www.dirty.ru/banned
// ==/UserScript==
//

var txt_str;
var divs = [];
var checkArray = document.getElementsByTagName('*');

for(var i=0; i<checkArray.length; i++){

	if((' '+checkArray[i].className+' ').indexOf(' dt ')>-1) divs[divs.length] = checkArray[i];
}

var fake_ar = ['Ð»','Ð¾','Ð¿','Ð°','Ð¹','Ð²','Ð½','Ð´','Ð³','Ð·','Ð±','Ð¸','Ð¶','Ðµ','Ð¼','Ñ','Ð','Ñ','Ñ','Ð','Ñ','Ñ','Ñ','Ñ','Ñ','Ñ','Ñ','Ñ'];
var normal_ar = ['л','о','п','а','й','в','н','д','г','з','б','и','ж','е','м','т','А','у','с','И','ю','я','р','ш','ь','ы','ч','ё'];

for(var i=0; i<divs.length; i++){
	txt_str = divs[i].innerHTML;
	for(var j=0; j<fake_ar.length; j++) txt_str = txt_str.split(fake_ar[j]).join(normal_ar[j]);
	divs[i].innerHTML = txt_str;
}
