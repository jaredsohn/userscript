// ==UserScript==
// @name	  The-West Menü Buton Düzeltmesi
// @namespace	  www.the-west.org
// @description	  Sağ ve sol menülerdeki kaybolan buton (tuş)'ların görünmesini sağlar.
// @include	  http://*.the-west.*/game.php*
// @author        JohnCooper
// @version       1.00 Beta
// ==/UserScript==

function getMoCheckVersion() {
	return "1.00";
}

function getAuthor() {
	var hrefStr = '';
	switch(window.location.hostname.substr(0,window.location.hostname.search(/\./))) {
		case 'tr1':
			hrefStr = 'javascript:AjaxWindow.show(\'profile\',{char_id:38340},\'38340\');';
			win_op = '';
			break;
		default:
			hrefStr = 'http://userscripts.org/users/202825';
			win_op = 'target=\'_blank\'';
	}
	return '&nbsp;Yazan: <a href=\"' + hrefStr + '\" style=\"color:black\"' + win_op + '>JohnCooper</a>';
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var $=unsafeWindow.$;
var $$=unsafeWindow.$$;

// Oyuncu / Çalışma Bilgileri
addGlobalStyle('#workbar_left { display:block; z-index:3; }');
addGlobalStyle('#workbar_right { position:absolute; right:0px; top:70px; display:block; z-index:3; margin-top:0px; }');
addGlobalStyle('#wb_task_0, #wb_task_1, #wb_task_2, #wb_task_3, #wb_task_4, #wb_task_5, #wb_task_6, #wb_task_7 { float:left; margin-left:33px; top:30px; width:60px; }');
addGlobalStyle('#wb_task_4, #wb_task_5, #wb_task_6, #wb_task_7 { margin-left:0px; margin-right:5px; }');