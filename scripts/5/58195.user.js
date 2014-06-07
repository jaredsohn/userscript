// ==UserScript==
// @name           Ukranian_chat
// @namespace      LionHeart
// @include        http://www.erepublik.com/en/*
// ==/UserScript==

var mainBlock = document.getElementById('content');

//var text = "<div id='freeshout' style='text-align: center; line-height: 0pt;'><iframe src="http://erepua.freeshoutbox.net/" height="300" width="500" frameborder="0"></iframe></div>";
var text = "<div id='cboxdiv' style='text-align: center; line-height: 0pt;'><div><iframe src='http://www.freeshoutbox.net/erepua' marginheight='2' marginwidth='2' allowtransparency='yes' name='cboxmain' style='' id='cboxmain' scrolling='auto' frameborder='0' height='300' width='100%'></iframe></div></div>";

var containerForChat = document.createElement("div");

containerForChat .innerHTML = text;

mainBlock.appendChild( containerForChat  );