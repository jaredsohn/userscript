// ==UserScript==
// @name           CURIT Enancher MINI
// @namespace      http://zawardo.it
// @include        http://prmilano.curit.it/iter/src/coimaimp-gest*
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

var impianto=getParameterByName('cod%5fimpianto');
if (!impianto) impianto=getParameterByName('cod_impianto');
//console.log(impianto);

GM_xmlhttpRequest({
  method: "GET",
  url: "http://ambiente2.provincia.mi.it/energia/portale/webservice_CURIT_enancher/ricerca/"+impianto,
  onload: function(response) {
    var rispostaJson=jQuery.parseJSON(response.responseText);
    //console.log(rispostaJson);
    $('<div id="curit_ext" style="text-align:left; background-color:#FFFFFF;padding:5px;"></div>').insertAfter('table.func-menu2');
		$("#curit_ext").append("N. TOT. verbali ispezioni:"+rispostaJson.num_ispezioni);
		$("#curit_ext").append("&nbsp;&nbsp;&nbsp;Assegnazione aperta:"+rispostaJson.assegnazione);
		var ispezione=rispostaJson.last_ispezione;
		if (ispezione) {
			$("#curit_ext").append("&nbsp;&nbsp;&nbsp;Data ispezione:"+ispezione.data_ispezione);
		}
  }
});