// ==UserScript==
// @name           Portal do aluno FIO - Selecionar primeira opção
// @version        1.3
// @author         Bruno Barbieri
// @description    Seleciona a primeira opção no portal do aluno da FIO automaticamente
// @include        http://*/erptnt/ACTPortalAluIES
// @namespace      http://userscripts.org/scripts/show/170215
// @updateURL      http://userscripts.org/scripts/source/170215.meta.js
// @downloadURL    http://userscripts.org/scripts/source/170215.user.js
// ==/UserScript==
 
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);

	document.body.appendChild(script);
}

function main() {
	// Checar se é o portal da FIO mesmo, outras faculdades usam esse sistema
	var n1 = "Faculdades Integradas ";
	var n2 = "de Ourinhos";
	
	if ((jQ("html:contains('" + n1.concat(n2) + "')").length < 1) &&
		(jQ("html:contains('" + n1.concat(n2).toUpperCase() + "')").length < 1)) {
		return false;
	}

	// Encontrar link do primeiro formulário
	var link = jQ("h3 > a");
	var linkAlt = jQ("a:contains('Sou aluno e desejo entrar no Portal do Aluno')");
	
	// Clicar no link se a sua ação foi substituida por javascript
	var evento = document.createEvent("HTMLEvents");
	evento.initEvent("click", true, true);
	
	if (link && link[0]) {
		link[0].dispatchEvent(evento);
	} else {
		linkAlt[0].dispatchEvent(evento);
	}
	
	// Selecionar a FIO no campo Unidade em todos os formulários
	jQ("select option[selected]").each(function() {
		jQ(this).removeAttr('selected');
	});
	jQ("select option[value='1']").each(function() {
		jQ(this).attr('selected', 'selected');
	});
	
	// Capturar tecla enter na página
	jQ(window).keypress(function(e) {
		var jQtarget = jQ(e.target);
		var e2 = jQuery.Event("keypress");
		e2.keyCode = 32;
		
		if (e.which == 13)
		{	
			// Fechar caixa de dialogo com enter
			if (jQ("#popup_overlay").is(":visible")) {
				jQ("#popup_overlay").focus();
				jQ('#popup_overlay, #popup_container').remove();
			}
			
			// Clicar no botáo entrar do formulário de login com enter
			else if (jQtarget.is("input[name='idalunoLogin']") ||
				jQtarget.is("input[name='senhaLogin']"))
			{
				jQ("#login .dhx_list_btn").focus();
				jQ("#login .dhx_list_btn").trigger(e2);
			}
			
			// Clicar no botão entrar do formulário de obter novo código com enter
			else if (jQtarget.is("input[name='codlegado']") ||
					 jQtarget.is("input[name='senhaID']"))
			{
				jQ("#recuperarID .dhx_list_btn").focus();
				jQ("#recuperarID .dhx_list_btn").trigger(e2);
			}
			
			// Clicar no botão entrar do formulário de rematricula com enter
			else if (jQtarget.is("input[name='idalunoMatricula']") ||
					 jQtarget.is("input[name='senhaMatricula']"))
			{
				jQ("#matricula .dhx_list_btn").focus();
				jQ("#matricula .dhx_list_btn").trigger(e2);
			}
		}
	});
}

// Carregar jQuery e executar a função principal
window.addEventListener('load', function() {
	addJQuery(main);
}, false);