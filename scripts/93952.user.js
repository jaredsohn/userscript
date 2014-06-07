// ==UserScript==
// @name           Megaupload Download Instantaneo
// @namespace      http://leonardosite.altervista.org/
// @version        1
// @description    Porta a 3 secondi il tempo di attesa prima di scaricare
// @include        http://www.megaupload.com/?d=*
// ==/UserScript==

// Access to Jquery
$ = unsafeWindow.$;

GM_registerMenuCommand("MegaUpload download instantaneo - Set Count", setCount);

var count = (GM_getValue('count') != null) ? GM_getValue('count') : 3;
unsafeWindow.count = count;

$('.down_table_pad2 table tbody tr:eq(5) td:eq(2)').html(count+' secondi!!!');
$('.down_butt_bg3 script').before('<p style="margin-left: 15px; display: none;" id="MG_down_credits">Grazie a <a href="http://userscripts.org/scripts/show/93952" target="_blank">Megaupload Download instantaneo v.1</a> by <a href="http://leonardosite.altervista.org/" target="_blank">Leonardo I</a></p>')

setTimeout(function () {
	$('div.down_butt_pad1#downloadlink').css({'padding-top' : '20px'});
	$('#MG_down_credits').show();
}, count*1000);

function setCount() {
	var count = prompt('Inserisci i secondi da aspettare prima del download (consigliato: 3)', count);
	GM_setValue('count', count);
}