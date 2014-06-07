// ==UserScript==
// @name           faturaCartaoParaCsvYNAB
// @namespace      http://portilho.com
// @version    	   0.3
// @description    gera um csv no formato YNAB com o texto (tabela) selecionado
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @include        https://www.santandernet.com.br/ibpf/transacoes/cartoes/*
// ==/UserScript==

(function() {
		function getSelectedText () {
            if (document.getSelection) {    // all browsers, except IE before version 9
                var sel = document.getSelection ();
                // sel is a string in Firefox and Opera,
                // and a selectionRange object in Google Chrome, Safari and IE from version 9
                return sel;
            }
            else {
                if (document.selection) {   // Internet Explorer before version 9
                    var textRange = document.selection.createRange ();
                    return textRange.text;
                }
            }
        }
		
		function geraCSV() {
            var cotacao = 1;
            if($('td:contains("Cotação do Dólar")').length > 0) {
                cotacao = parseDecimal($('td:contains("Cotação do Dólar")').next().text())
            }
            var csv = 'Date,Payee,Category,Memo,Outflow,Inflow\n';
			var txt = getSelectedText().toString();
            if(txt.trim().length <=0) {
				txt = getTabelaComoTexto();
            }
            
            var linhas = txt.split('\n');
            for (i=0;i<linhas.length;i++){ try {
                var colunas = linhas[i].split('\t');
                var data = colunas[0].trim()
                var descricao = colunas[1].trim()
                var RS = parseDecimal(colunas[2]);
                var US = parseDecimal(colunas[3]);
                
                var memo = ''
                var valor = RS
                //se a coluna dolar diferente de zero, usa ela
                if(US!=0) {
                    valor = US * cotacao
                    memo = '(U$' + US + ' * ' + cotacao +')'
                }
                
                var outflow = 0.0
                var inflow = 0.0
                //valores positivos no cartão são gastos (outflow), negativos são pagamentos (inflow)
                if(valor > 0) {
                    outflow = valor
                } else {
                    inflow = Math.abs(valor)
                }
                //formata com duas casas decimais
                inflow = inflow.toFixed(2);
                outflow = outflow.toFixed(2);
                
                csv += data + ',' + descricao + ',,'+ memo +',' + outflow + ',' + inflow

                csv += '\n'
            }catch(any){}}
            
            console.log(csv);
            
            //gera conteudo para download
            var encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
			window.open(encodedUri);
		}
    
        function getTabelaComoTexto() {
            var txt = ""
            $('#detfatura table tbody tr.trClaro').each(function(i, tr) {
                $( tr ).find('td').each(function(j, td) {
                    txt += $(td).text() + '\t'
                });
                txt += '\n'
            });
            return txt;
        }
    
    	//1.234,00 -> 1234.00 (NaN se nao conseguir)
    	function parseDecimal(decimalComoTexto) {
            //remove pontos, substitui virgulas por pontos e * 1 para garatir que é numero
            return decimalComoTexto.trim().replace(/\./g, '').replace(/,/g, '.')*1
        }

		$("body").append('<button id="csv" style="padding: 10px;background-color: forestgreen;color: whitesmoke;font-weight: bold;font-size: 11px;">Gerar CSV</button>');
		$("#csv").bind('click', function(event) {geraCSV();event.stopPropagation();event.preventDefault();});
})();