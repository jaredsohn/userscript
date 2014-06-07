// ==UserScript==
// @name Google+ AA Tweak
// @version 1.2.3
// @include https://plus.google.com/*
// @match https://plus.google.com/*
// ==/UserScript==

var TARGET_STREAM = "#contentPane";
var TARGET_POST = '.vg';
var TARGET_COM = '.zj';
var FLAG = "AsciiArt";
var lines_aa = 3;

var SHRINK_BR = 1;  // 1=enable, 0=disable
var lines_br = 4;
var rep = '<br><font color="#ccc">...</font><br>';	

var css = {
'.AA_post':'font-family: "MaruGoR-AA","IPAモナーPゴシック","ＭＳ Ｐゴシック",sans-serif; font-size: 10px; line-height: 1.2;',
'.AA_com':'font-family: "MaruGoR-AA","IPAモナーPゴシック","ＭＳ Ｐゴシック",sans-serif; font-size: 8px; line-height: 1.2;'
};

var regs = [
	'[|:;, 　]{2}[|!:;.,]',
	'([ 　"-*,./:-<@\]-`]{3,}["-*,./:-<@\]-`{-~／].*){2}',
	'[蠶笵醴蹟黼鬱黌麌鬣蠻鼎面髟米]{3,}',
	'[>%-]{3,}.+[#>]{3,}'
	];

/****************************************************************************/

var s = document.styleSheets[0];
for (var e in css){
  s.insertRule(e + '{' + css[e] + '}', s.cssRules.length);
}
var re = new RegExp();
regs = '(' + regs.join(')|(') + ')';
re.compile(regs);
var re_ = new RegExp();
var reg = '(.+?<br>){' + lines_aa + ',}';
re_.compile(reg);

var re_shrink_br = new RegExp();
var reg = '([ 　]*<br>){'+ lines_br + ',}';
re_shrink_br.compile(reg);

function shrinkBreak(e){
	while(e.match(re_shrink_br)){
		e = e.replace(re_shrink_br,rep);
	}
	return e;
}

function AATweak(){
	//Posts
	var i;
	var posts = document.querySelectorAll(TARGET_POST);
	for(i=0; i<posts.length; i++){
		if(posts[i].className.indexOf(FLAG) == -1){
			if(posts[i].innerHTML.match(re_) && posts[i].innerText.match(re)){
				posts[i].className = posts[i].className + ' AA_post';
			}
			posts[i].className = posts[i].className + ' ' + FLAG;
		}
		if(SHRINK_BR == 1) posts[i].innerHTML = shrinkBreak(posts[i].innerHTML);
	}

	var comments = document.querySelectorAll(TARGET_COM);
	for(i=0; i<comments.length; i++){
		if(comments[i].className.indexOf(FLAG) == -1){
			if(comments[i].innerHTML.match(re_) && comments[i].innerText.match(re)){
				comments[i].innerHTML = "<div class='AA_com'>" + comments[i].innerHTML + "</div>";
			}
			comments[i].className = comments[i].className + ' ' + FLAG;
		}
		if(SHRINK_BR == 1) comments[i].innerHTML = shrinkBreak(comments[i].innerHTML);
	}
}

var timer = 0;
var nodeTarget = document.querySelector(TARGET_STREAM);
if (!nodeTarget) nodeTarget = document.body;

nodeTarget.addEventListener('DOMNodeInserted', function (){
	if (timer) return;
	timer = setTimeout(function () {
		AATweak();
		timer = 0;
	}, 300);
});