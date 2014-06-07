// ==UserScript==
// @name           CURIT Enancher
// @namespace      http://zawardo.it
// @include        http://prmilano.curit.it/curit-prmi/gestione-impianti/dati-tecnici*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js

// ==/UserScript==

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}
function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

var impianto=getParameterByName('id');
//if (!impianto) impianto=getParameterByName('cod_impianto');
//console.log(impianto);
GM_xmlhttpRequest({
  method: "GET",
  url: "http://ambiente2.provincia.mi.it/energia/portale/webservice_CURIT_enancher/ricerca/"+impianto,
  onload: function(response) {
    var rispostaJson=jQuery.parseJSON(response.responseText);
    //console.log(rispostaJson);
    $('<div id="curit_ext" style="text-align:left; background-color:#FFFFFF;padding:5px;"></div>').insertAfter('div.toolbar');
    $('#curit_ext').html("<table border='1' width='100%'><tr><td id='curit_ext_1' width='50%'></td><td id='curit_ext_2' width='50%'></tr></table>");
		$("#curit_ext_1").append("N. TOT. verbali ispezioni:"+rispostaJson.num_ispezioni);
		$("#curit_ext_1").append("&nbsp;&nbsp;&nbsp;Assegnazione aperta:"+rispostaJson.assegnazione+"<br/>");
		var lastAssegnazione=rispostaJson.last_assegnazione;
		if (lastAssegnazione) {
			$("#curit_ext_1").append("Stato:"+lastAssegnazione.stato);
			$("#curit_ext_1").append("&nbsp;&nbsp;&nbsp;Motivazione:"+lastAssegnazione.motivazione);
			$("#curit_ext_1").append("&nbsp;&nbsp;&nbsp;Note chiusura:"+lastAssegnazione.note_chiusura+"<br/>");
		}
		var ispezione=rispostaJson.last_ispezione;
		if (ispezione) {
			$("#curit_ext_1").append("Ultimo verbale:"+ispezione.ultimo_verbale);
			$("#curit_ext_1").append("&nbsp;&nbsp;&nbsp;Data ispezione:"+ispezione.data_ispezione);
			$("#curit_ext_1").append("&nbsp;&nbsp;&nbsp;Ispettore:"+ispezione.cognome_isp+" "+ispezione.nome_isp);
			$("#curit_ext_1").append("<br/>Numero verbali ultima ispezione:"+ispezione.n_verbali);
			$("#curit_ext_1").append("&nbsp;&nbsp;&nbsp;Anomalia:"+ispezione.anomalia);
			$("#curit_ext_1").append("&nbsp;&nbsp;&nbsp;8a:"+ispezione.punto_8a);
			$("#curit_ext_1").append("&nbsp;&nbsp;&nbsp;8b:"+ispezione.punto_8b);
			$("#curit_ext_1").append("&nbsp;&nbsp;&nbsp;8c:"+ispezione.punto_8c);
			$("#curit_ext_1").append("&nbsp;&nbsp;&nbsp;8d:"+ispezione.punto_8d);
		}
  }
});

GM_xmlhttpRequest({
  method: "GET",
  url: "http://ambiente2.provincia.mi.it/energia/portale/webservice_CURIT_enancher/accertamento/"+impianto,
  onload: function(response) {
    var rispostaJson=jQuery.parseJSON(response.responseText);
    var accertamento=rispostaJson.accertamento;
    //console.log(rispostaJson);
    if (accertamento) {
	    //$('<div id="curit_ext2" style="text-align:left; background-color:#FFFFFF;padding:5px;"></div>').insertAfter('#curit_ext');
			$("#curit_ext_2").append("N. dichiarazioni accertate:"+accertamento.accertamenti);
			$("#curit_ext_2").append("&nbsp;&nbsp;&nbsp;Accertatore :"+accertamento.accertatore);
			$("#curit_ext_2").append("&nbsp;&nbsp;&nbsp;Data accertamento :"+accertamento.data_accertamento);
			$("#curit_ext_2").append("<br/>Tapiro:"+accertamento.tapiro);
			$("#curit_ext_2").append("&nbsp;&nbsp;&nbsp;Cod. Valutazione :"+accertamento.cod_valutazione);
			$("#curit_ext_2").append("&nbsp;&nbsp;&nbsp;Altro :"+accertamento.altro);
			$("#curit_ext_2").append("<br/>Note Standard:"+accertamento.note_standard);
			$("#curit_ext_2").append("&nbsp;&nbsp;&nbsp;Bonifica effettuata :"+accertamento.bonifica_effettuata);
			$("#curit_ext_2").append("&nbsp;&nbsp;&nbsp;Anomalia Bollino :"+accertamento.anomalia_bollino);
			$("#curit_ext_2").append("<br/>Informatizzazione CURIT scorr. :"+accertamento.informatizzazione_curit_scorretta);
			$("#curit_ext_2").append("&nbsp;&nbsp;&nbsp;Comunicazione Sportello :"+accertamento.flag_comunicazione_sportello);
		}
  }
});