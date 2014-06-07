// ==UserScript==
// @name           ChatAnywhere
// @author         Tei Modifications: exactiond7 
// @include        http://www.erepublik.com/*
// ==/UserScript==

var mainBlock = document.getElementById('content');

var text = "<div id='cboxdiv' style='text-align: center; line-height: 0pt;'><div><iframe src='http://qchat.rizon.net/?channels=condor.guardian&amp;boxtag=wp670q&amp;sec=main' marginheight='2' marginwidth='2' allowtransparency='yes' name='cboxmain' style='' id='cboxmain' scrolling='auto' frameborder='0' height='500' width='100%'></iframe></div></div>";


var containerForChat = document.createElement("div");

containerForChat .innerHTML = text;

//crappy append
//mainBlock.insertBefore( containerForChat  ,mainBlock.firstChild );

mainBlock.appendChild( containerForChat  );