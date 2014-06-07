// ==UserScript==
// @name           Folha de Sao Paulo
// @author         anonimo
// @description    Remove a limitação do jornal folha de sao paulo.
// @version        0.1
// @include        http*folha.uol.com.br/*
// @include		   http*blogfolha.uol.com.br/*
// ==/UserScript==

(function() {
	var script = document.createElement('script');
	
	script.type = 'text/javascript';
	script.innerHTML = (<><![CDATA[
        /*
         * Opcao A - Alguns subdominios da folha nao faz chamadas ajax ao paywall (ou faz mas em outro dominio), o codigo abaixo nao e' 100% mas deve funcionar em tais casos */
         window.setTimeout(function() {
            window.paywall = {};
            window.paywall.inicio = function() {
                return;
            };
        }, 1500);
        
        /* Opcao B - Intercepta chamadas ajax para o paywall */
        (function (open) {
            XMLHttpRequest.prototype.open = function(m,url,async,u,p) {
                if ( !(/(paywall|controller)/.test( url )) ) {
                	open.call(this, m, url, async, u, p);
                }
            }
        })( XMLHttpRequest.prototype.open );
	]]></>).toString();
	
	document.getElementsByTagName('head')[0].appendChild(script);
})();