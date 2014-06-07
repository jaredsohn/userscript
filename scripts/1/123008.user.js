// ==UserScript==
// @name           barcodeSantander
// @namespace      http://dbb.9hells.org
// @description    coloca o codigo de barra nos campos separados do pagamento de boleto do santander
// @require     	 http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @include        https://www.santandernet.com.br/ibpf/transacoes/BoletoBancario/BoletoBancario.asp
// @include        https://www.santandernet.com.br/ibpf/transacoes/ContasConsumo/ContasConsumo.asp*
// @include        https://www.santandernet.com.br/ibpf/transacoes/PagCodigoBarras/*
// ==/UserScript==

(function() {
		//12345 67890 12345 678901 23456 789012 3 456789012
		function setValue(id, text) {
			document.getElementById(id).value = text;
		}

		function setValue2(id, text) {
			document.getElementsByName(id)[0].value = text;
		}
		
		function fillBoleto(text) {
			setValue('txtBloco1a', text.substr(0, 5));
			setValue('txtBloco1b', text.substr(5, 5));
			setValue2('txtBloco1', text.substr(0, 10));
			setValue('txtBloco2a', text.substr(10, 5));
			setValue('txtBloco2b', text.substr(15, 6));
			setValue2('txtBloco2', text.substr(10, 11));
			setValue('txtBloco3a', text.substr(21, 5));
			setValue('txtBloco3b', text.substr(26, 6));
			setValue2('txtBloco3', text.substr(21, 11));
			setValue('txtBloco4', text.substr(32, 1));
			setValue('txtBloco5', text.substr(33));
			onCompleta();
		}
		
		function fillConvenio(text) {
			setValue('bloco1', text.substr(0, 12));
			setValue('bloco2', text.substr(12, 12));
			setValue('bloco3', text.substr(24, 12));
			setValue('bloco4', text.substr(36, 12));
			AbreValor(document.f1.p5);
		}
		
		function parseBarCode(text) {
			text = text.replace(/[ -.]/g,'');
			if (document.getElementById('bloco1')) {
				fillConvenio(text);
			} else {
				fillBoleto(text);
			}
		}

		$("body").append('código de barras completo:<br/><input id="barcode" type="text" size="100" />');
		$("#barcode").bind('change', function(event) {parseBarCode(this.value);event.stopPropagation();event.preventDefault();});
})();