// ==UserScript==
// @name        TraficTube.ro pt monitoarele Full HD
// @namespace   TraficTubeHD
// @description	Modifica layoutul site-ului. Recomandat celor care au monitoare cu rezolutii mai mari de 1200x1600.
// @include     http://www.trafictube.ro/*
// @version     1.2
// @require     http://code.jquery.com/jquery.min.js
// @require 	http://lagoscript.org/files/jquery/autopager/jquery.autopager-1.0.0.min.js
// @require		http://usocheckup.redirectme.net/154341.js
// @run-at	document-end
// @grant GM_addStyle
// usoCheckup grant permissions for Greasemonkey 1.x+
// @grant GM_getValue
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// ==/UserScript==

// css
GM_addStyle ('.home #continut {width:auto;}');
GM_addStyle ('.home #sidebar{padding-top: 0;overflow:hidden;}');
GM_addStyle ('.home .grila{width:auto;}');
GM_addStyle ('.home #content{margin: 0 auto;width: auto;max-width:97%}');


// sterge clase si reclame
$('.wrapper object').remove();
$('body.home div#content.wrapper').removeClass('wrapper');

// modifica dimensiunea continutului
$(document).ready(sizeContent);
$(window).resize(sizeContent);

function sizeContent() {
    var newWidth = $('#content').width() - $('#sidebar').width() - 100 + 'px';
    $('#continut').css('max-width', newWidth);
}

// preincarca inca o pagina
$.autopager({
  autoLoad: true,
  page: 3,
  content: '#continut',
  link: '.nextpostslink',
  appendTo: '.bloc',
    
  load: function(cur,next) {
  $('.bloc>h2').hide();
  $('html body.home div#content.clearfix div#continut.fl div.bloc div#continut').removeClass('fl');
  },
 
});
$.autopager.load();

// ascundem navigatia
$('.wp-pagenavi').hide();