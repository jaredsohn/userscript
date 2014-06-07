// ==UserScript==
// @name           Download Trama
// @namespace      http://twitter.com/dirs
// @description    Download Trama Virtual
// @include        http://tramavirtual.uol.com.br/artista.jsp?id=*
// ==/UserScript==

// muda links no tramavirtual para download direto (sem login) da música
// para fazer download pode ser necessario dar um ctrl+s quando abrir o streaming da mp3

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js'; // JQUERY POWER
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
	setTimeout(function() {
		$(".tabela").unbind('onclick');
		$(".tabela").attr('onclick', '');

		$("tr.tabela").click(function(ev) {
			$this = $(this);
			var html = $this.html();
			var mp3_id = html.match(/onclick=\"play\(([^\"]*)\)\"/) || html.match(/onclick=\"review\(([^\"]*)\)\"/);
			
			$.get("http://tramavirtual.uol.com.br/mp3Player.jsp?id_musica="+mp3_id[1], function(data) {
				var mp3 = data.match(/http:\/\/media\.trama\.com\.br\/tramavirtual\/mp3\/[^\/]*\/[^\.]*\.mp3/);
				window.open(mp3, "_blank");
			   }
			)
			
			return false;
		});
	}, 500);
}