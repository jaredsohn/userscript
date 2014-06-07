// ==UserScript==
// @name        CURIT dichiarazioni e distinte ENANCHER
// @namespace   http://zawardo.it
// @include     http://prmilano.curit.it/curit-prmi/gestione-impianti/dichiarazioni/lista.action
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version     1
// @grant       GM_log
// @grant       GM_xmlhttpRequest

// ==/UserScript==

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

var dams= new Array();
$("table.dataTable tr th:first-child a.selector").each( function(index) {
    var str = $(this).attr('href');
    var str_sub = str.substr(str.lastIndexOf("=")+1);
    $(this).html(str_sub);
    dams[index]=str_sub;
});

$.each( dams, function( key, value ) {
	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://ambiente2.provincia.mi.it/energia/portale/webservice_CURIT_enancher/distinta/"+value,
	  onload: function(response) {
	    var rispostaJson=jQuery.parseJSON(response.responseText);
	    //console.log(rispostaJson);
	    if (rispostaJson.distinta) {
				$("table.dataTable td:nth-child(7) a.selector").eq(key).html(rispostaJson.distinta);
			}
	  }
	});
});