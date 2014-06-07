// ==UserScript==
// @name		qdb.hu
// @include	http://qdb.hu/latest
// @include	http://qdb.hu/random
// @include	http://qdb.hu/top100
// @include	http://qdb.hu/top100r
// @include	http://qdb.hu/median
// @include	http://qdb.hu/bottom100
// @include	http://qdb.hu/archivum
// @include	http://qdb.hu/smorgasbord
// @include	http://qdb.hu/inside
// @include	http://qdb.hu/archivum*
// ==/UserScript==

var elr = GM_getValue('hidden', true);

var menu = document.getElementsByClassName('menu2')[0];
var sw = document.createElement('a');
sw.href = 'javascript:elrejt()';
sw.appendChild(document.createTextNode(''));

if(elr) sw.innerHTML = 'értékeltek elrejtése: ON';
else sw.innerHTML = 'értékeltek elrejtése: OFF';

menu.appendChild(sw);
hide();

if(typeof unsafeWindow == "object"){
		unsafeWindow['elrejt'] = function(){changeHidden(); hide();}
}

function hide(){
	var votedandpending = document.getElementsByClassName("votedandpending");
	var voted = document.getElementsByClassName("voted");
	voted = [].concat(Array.prototype.slice.call(voted), Array.prototype.slice.call(votedandpending));
	for (x in voted){
		if(elr) voted[x].style.display = 'none';
		else voted[x].style.display = '';
	}
}

function changeHidden(){
	if(elr){
		elr = false;
		save(false);
		sw.innerHTML = 'értékeltek elrejtése: OFF';
	}else{
		elr = true;
		save(true);
		sw.innerHTML = 'értékeltek elrejtése: ON';
	}
	hide();
}

function save(b){
	window.setTimeout(function() {
		GM_setValue("hidden", b);
	}, 0);
}
