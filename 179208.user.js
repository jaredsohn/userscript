// ==UserScript==
// @name       Estadão sem cadastro
// @match      http://*.estadao.com.br/*
// ==/UserScript==

// É recomendado o uso deste script com o Estadão sem Auto Refresh, por João Medrado
// http://userscripts.org/scripts/show/137462

$(document).ready(function() {
    var timeOutTempo = 7 * 1000; // Edite essa variável se a janela de cadastro leva muito tempo para ser removida. 
                                 // Conexões lentas podem precisar de um valor maior. Não deixe o valor muito baixo, 
                                 // ou a janela não será removida. Deixe sempre o * 1000, pois o valor é em milisegundos.
    							 // Valor padrão: 7 * 1000
    
    setTimeout(function() {
        // (script tirado do próprio pw.js do estadão
        $('.window').hide();
		$('#mask').hide();
		$('#pw-mask').hide();
		$('#pw-content').hide();
		
		if(typeof oReload != 'undefined') oReload.start();
		$('html').css('overflow','auto');
		
		if(document.body.addEventListener){
			document.body.removeEventListener('touchstart', scrollTop, false);
			document.body.removeEventListener('touchmove', scrollTop, false);
			document.body.removeEventListener('touchend', scrollTop, false);
		}else{
			document.body.detachEvent('touchstart', scrollTop, false);
			document.body.detachEvent('touchmove', scrollTop, false);
			document.body.detachEvent('touchend', scrollTop, false);
        }

        console.log("Paywall removida!");
    }, timeOutTempo);
});