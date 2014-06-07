// ==UserScript==
// @name           favotter compress
// @namespace      http://twitter.com/rokudenashi
// @include        http://favotter.matope.com/*
// @description        ふぁぼったーの同じPOSTを圧縮
// ==/UserScript==
/*
javascript:(function(){var l={};$('.status_text').each(function(){var s=$(this);var e=s.parents('.entry');var c=s.text();if(l[c]){e.remove();var n=l[c].parents('.entry').children('.o').show().children('.n');n.text(Number(n.text())+1);}else{if(!e.children('.o').length)e.append('<div class="o LV5">他<span class="n">0</span>人</div>').children('.o').hide();l[c]=s;}})})()
*/

(function(){

var w = this.unsafeWindow || window;
var $=w.$;

function comp(){
var l={};
$('.status_text').each(function(){
	var s=$(this);
	var e=s.parents('.entry');
	var c=s.text();
	if(l[c]){
		e.remove();
		var n=l[c].parents('.entry').children('.o').show().children('.n');
		n.text(Number(n.text())+1);
	}else{
		if(!e.children('.o').length)e.append('<div class="o LV5">他<span class="n">0</span>人</div>').children('.o').hide();
		l[c]=s;
	}
})
}

if (window.AutoPagerize) {
	boot();
}else{
	window.addEventListener('GM_AutoPagerizeLoaded',boot,false);
}
function boot() {
	comp()
	window.AutoPagerize.addFilter(function(){
		comp();
	});
}

})()
