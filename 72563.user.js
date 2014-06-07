// ==UserScript==
// @name           tanasinn-chamber
// @namespace      http://userscripts.org/users/133663
// @description    Don't think, feel.
// @include        http://img.secretareaofvipquality.net/*.html
// @include        http://img.secretareaofvipquality.net/
// ==/UserScript==

document.getElementsByTagName('div')[0].innerHTML = '[<span><a href="javascript:tanatoggle();">Tanasinn</a></span>]' + document.getElementsByTagName('div')[0].innerHTML;
var tanabutt = document.getElementsByTagName('div')[0].getElementsByTagName('span')[0];
tanabutt.addEventListener('click', tanatoggle, false);
if (GM_getValue('feeling-tanasinn', false)){ tanasinn();}

function tanasinn() {
	var blocks = document.getElementsByTagName('blockquote');
	for(var i=0;i<blocks.length;i++){
		var str = blocks[i].innerHTML; var par = blocks[i].parentNode.id.substr(5) + 9000;
		if (/delform/.test(blocks[i].parentNode.id)){par=9000;}
		if(/\d/.test(par)){
			for(var j=Math.round(str.length/5);j<Math.round(str.length*1.2);j++){
				if(!/ /.test(str.substr(par%j,1))){str = str.replace(str.substr(par%j,1),'∵');}
				if(!/ /.test(str.substr(par%(j+1),1))){str = str.replace(str.substr(par%(j+1),1),'∴');}
			} blocks[i].innerHTML = str;
	}}
	document.title = 'Welcome to the Tanasinn Chamber';
	document.getElementsByTagName('div')[1].innerHTML = document.getElementsByTagName('div')[1].innerHTML.replace(/Secret Area of VIP Posters/g,'Welcome to the Tanasinn Chamber');
	var tds = document.getElementsByTagName('td');
	tds[0].innerHTML = 'Don\'t';
	tds[2].innerHTML = 'think,';
	tds[4].innerHTML = 'feel';
	tds[6].innerHTML = 'and you\'ll';
	tds[8].innerHTML = 'be';
	tds[10].innerHTML = 'tanasinn';
	tds[12].innerHTML = '<div class="rules"><ul> <li>Don\'t think, post and you\'ll b∵ <a href="http://tanasinn.info/wiki/tanasinn">t∴∵a∵∴nn</a>.</li></ul></div>';
}

function tanatoggle() {
	if (GM_getValue('feeling-tanasinn',false)){
		GM_setValue('feeling-tanasinn',false);
		window.location.href = window.location.href;
	}else {
		GM_setValue('feeling-tanasinn',true);
		tanasinn();
}}