// ==UserScript==
// @name إخفاء البار السريع
// @description سكربت مساعد للي عنده البار ثقيل نوعاً ما , فـ سنحت لك إخفائة متى ما أظهرته .
// @author Mr.403
// @include http://ae*.tribalwars.ae/game.php*
// ==/UserScript==
// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benötigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------

/*

	Script: [Script] Compactador universal para barra de acesso rápido.


	Histórico:
		Versão 1.0 (17:22 30/08/2011):
					+) Versão inicial.


	Desenvolvedor: Przyr.

*/










/* (Início) Executar script após carregamento do DOM da página */

$(document).ready(function () {

	/* (Início) Checagem de problemas de configuração e modo de uso */
	
	

	/* (Fim) Checagem de problemas de configuração e modo de uso */










	/* (Início) Funções */
	
	
	
	/* (Fim) Funções */










	/* (Início) Algorítmo */

	$("\
	<td id='compactador_td_1'>\
		<input type='button' id='compactador_input_button' value='Fechar'/>\
	</td>").insertBefore("#quickbar_inner");
	
	$("#compactador_input_button").click(function() {
		if ($("#quickbar_inner").is(":visible")) {
			if (efeito == 1) $("#quickbar_inner").hide("slow");
			else $("#quickbar_inner").hide();
			
			$("#compactador_input_button").attr("value", "إظهار");
		} else {
			if (efeito == 1) $("#quickbar_inner").show("slow");
			else $("#quickbar_inner").show();
			
			$("#compactador_input_button").attr("value", "إخفاء");
		}
	});
	
	if (fechar_ao_iniciar == 1) {
		$("#compactador_input_button").click();
		$("#compactador_input_button").attr("value", "إظهار");
	}
	
	/* (Fim) Algorítmo */

});

void(0);

/* (Fim) Executar script após carregamento do DOM da página */