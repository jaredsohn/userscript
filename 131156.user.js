// ==UserScript==
// @name           Bonifica CURIT
// @namespace      http://zawardo.it
// @include        http://prmilano.curit.it/iter/src/coimbimp-gest?destinazione*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js

// ==/UserScript==

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}
$('<div style="font-size:16px;font-weight:bold;color:#9E0404">BONIFICA PROVINCIA ATTIVA</div>').insertAfter('input.form_submit');
var continua=false;
var utente=$.cookie('iter_login_http://iterpr.milano.curit.it');
var destinazione=$("input[name='destinazione']").val();
var origini=$("input[name='compatta_list']").val();
origini=origini.replace(/ /gi, "_");

//console.log(utente);


$("form[name='coimbimp']").submit(function(e){
	if (!continua) {
			e.preventDefault();
			var formAttuale=$(this);
			GM_xmlhttpRequest({
		  method: "GET",
		  url: "http://ambiente2.provincia.mi.it/energia/portale/webservice_CURIT_bonifiche/bonifica/"+utente+"/"+destinazione+"/"+origini,
		  onload: function(response) {
		    var rispostaJson=jQuery.parseJSON(response.responseText);
		    //console.log(rispostaJson);
		    var stato=rispostaJson.stato;
		    var dettagli=rispostaJson.dettagli;
		    alert(stato+" "+dettagli);
		    if (stato=="KO") return false;
		    continua=true;
		    formAttuale.submit();
		  }
		});
	}
});