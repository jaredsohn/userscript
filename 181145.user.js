// ==UserScript==
// @name         Skipp Baixaki Installer
// @namespace	 userscripts.org
// @version      0.0.0.3
// @description  Marca a opção 'Sem instalador' nas páginas de download do baixaki
// @include      http://www.baixaki.com.br/download/*
// @require	     http://code.jquery.com/jquery-2.0.3.min.js
// @copyright    2013+, Ronniery Borges Correa
// @downloadURL  http://userscripts.org/scripts/source/181145.user.js
// @updateURL    http://userscripts.org/scripts/source/181145.user.js
// ==/UserScript==

//Reorganiza os dados que o script original seta
$("div#chkcominstall").removeClass('selected');
$("div#chkseminstall").addClass('selected');
//Set info message to 'without installer'
$('#infoinstall').html('sem instalador').css({'background': '#D6D6D6',
                                              'padding': '0px 5px',
                                              'margin-top': '3px',
                                              'border-radius': '3px'});
//Prevents that the page, make you download trash.
urldowny = 1;