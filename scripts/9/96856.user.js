// ==UserScript==
// @name           Adira_Jamal_Tooltips
// @version        2.3.1
// @history        2.3.1 Убраны ненужные переменные
// @history        2.3 Поставлено время до загрузки скрипта и соответсвующая опция.
// @history        2.2 Добавлена стыковка с AutoPagerize
// @history        2.1 Добавлен пункт временная
// @history        2.0 Изменён код, добавлена кроссбраузерность. 
// @history        1.0 Уменьшен и отклиброван код.
// @namespace      tooltips
// ==/UserScript==

/* Fading Tooltips By Frank Bueltge*/
body div#toolTip {
	position:absolute;
	z-index:1000;
	min-width:150px;
	background-image:url('http://farm4.static.flickr.com/3405/3582443182_80cf2d4f23.jpg');
	border:2px double #fff;
	text-align:left;
	padding:5px;
	min-height:1em;
	-moz-border-radius:5px;
}

body div#toolTip p {
	margin:0;
	padding:0;
	color:#fff;
	font:11px/12px verdana,arial,sans-serif;
	font-weight:bold;
}

body div#toolTip p em {
	display:block;
	margin-top:3px;
	color:#fff;
	font-style:normal;
	font-weight:normal;
}

body div#toolTip p em span {
	font-weight:bold;
	color:#fff;
}
