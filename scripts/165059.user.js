// ==UserScript==
// @name        Map Maker Rewiever
// @description 
// @namespace	Yashkin Kot
// @include		http://*google.com/mapmaker*
// @include		http://*google.com.ua/mapmaker*
// @include		https://*google.com/mapmaker*
// @include		https://*google.com.ua/mapmaker*
// @version		1.1
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @grant		none
// ==/UserScript==

	var cs=document.createElement('link');
	cs.href="https://sites.google.com/site/gmmtesting2013/files/style.css";
        cs.type="text/css"
        cs.rel="stylesheet";
	document.getElementsByTagName('head')[0].appendChild(cs);


var templ1 = 'Дякуємо за покращення карт. Детально про створення та редагування будівель читайте тут - http://goo.gl/HmVhg';
var templ2 = 'Дякуємо за покращення карт. Дізнайтесь більше про дороги тут - http://goo.gl/qlnNR';
var templ3 = 'Дякуємо за покращення карт. Дізнайтесь більше про будівлі тут - http://goo.gl/HmVhg';
var templ4 = 'Будь ласка, вкажіть назву ще українською та англійською мовами. Англійська транслітерація http://goo.gl/FcrkN';
//var templ5 = 'шаблон 1';
//var templ6 = 'шаблон 1';






var swf_file = 'https://sites.google.com/site/gmmtesting2013/files/clipboard.swf';
var png_file = 'normal=https://sites.google.com/site/gmmtesting2013/files/a1.png&pressed=https://sites.google.com/site/gmmtesting2013/files/a2.png&hover=https://sites.google.com/site/gmmtesting2013/files/a3.png';
var embedd_1 = '<object width="100" height="15"><embed src="'+swf_file+'?'+png_file+'&clipboard=';
var embedd_2 = '" quality="high"  width="72" height="19"   type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';



var rw_panel = '<ul id="menu_rew"><li><div class="rotate">Будівля</div><div class="drop1">'+templ1+'<br>'+embedd_1+''+templ1+''+embedd_2+'<hr>'+templ3+'<br>'+embedd_1+''+templ3+''+embedd_2+'<hr></div></li>';
rw_panel = rw_panel +'<li><div class="rotate">Дорога</div><div class="drop2">'+templ2+'<br>'+embedd_1+''+templ2+''+embedd_2+'<hr><hr></div</li>';
rw_panel = rw_panel +'<li><div class="rotate">Назви</div><div class="drop3">'+templ4+'<br>'+embedd_1+''+templ4+''+embedd_2+'<hr><hr></div</li></ul>';
$("#page").after(rw_panel);

