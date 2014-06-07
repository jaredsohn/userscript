// ==UserScript==
// @name			phpMyAdmin Utilities
// @namespace      	http://dev.dixso.net/greasemonkey/phpmyadmin_utilities.js
// @description    	Plugin to select tables to the related word you entered.
// @version        	1.3
// @author         	Julio De La Calle Palanques
// @homepage       	http://dixso.net/
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @include        	*phpmyadmin*db*
// ==/UserScript==
var lang = navigator.browserLanguage ? navigator.browserLanguage : navigator.language
$(document).ready(function(){
	var selec_avan =  "select[name='table_select[]']";
	if ($(selec_avan).length > 0) {
		if (lang.substring(0,2) == "es"){
			var href = "Selección avanzada";
	        var txt = "Inserta la palabra relacionada.";
	        var txt2 = "Insertar palabra";
			var inv = "Invertir selección";
	    }else{
	    	var href = "Advanced selection";
	    	var txt = "Insert the related word.";
	    	var txt2 = "Insert word";
			var inv = "Invert selection";
	    }
		$(selec_avan).parent().find("a:nth-child(2)").after(' / <a href="javascript:void(0);" id="selec_avan" style="color: #090;">'+href+'</a>');
		$(selec_avan).after('<a href="javascript:void(0);" id="inv_avan" style="display: none; color: #090;">'+inv+'</a>');
		$("#selec_avan").click(function(){
			var view = prompt(txt,txt2);
			$(selec_avan).attr("selectedIndex","-1");
			$(selec_avan+" option:contains('"+view+"')").attr("selected","selected");
			$("#inv_avan").attr("rel",view).show();
		});
		$("#inv_avan").click(function(){
			var rel = $(this).attr("rel");
			$(selec_avan).attr("selectedIndex","-1");
			$(selec_avan+" option").not(":contains('"+rel+"')").attr("selected","selected")
		});
	}
});