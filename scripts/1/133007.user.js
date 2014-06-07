// ==UserScript==
// @name           extratoCartaoToCSV
// @namespace      rcsilva83
// @description    Gera o conteudo da pagina do extrato do cartao de credito do Banco Santander no formato CSV
// @include        https://www.santandernet.com.br/ibpf/transacoes/cartoes/ConsultaFaturaDetalhes.asp*
// ==/UserScript==
(function(){

  String.prototype.trim = function () {return this.replace(/^\s*/, "").replace(/\s*$/, "");}

  function getElements(xpath) {return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);};
  function getElement(xpath) { elements = getElements(xpath); if(elements) return elements.snapshotItem(0);};
  
  // faz o parse da pagina retornando o CSV
  function generateCSV() {  
    
    // funcoes utilitarias
    function parseDate(date) {return date.substr(6,4)+date.substr(3,2)+date.substr(0,2);}
    function parseValue(value) {return parseFloat(value.trim().replace(".","").replace(",","."));}
    function formatToSave(value) {
      // Funcao coloca o numero no formato brasileiro e inverte o sinal, pois o extrato do cartao se refere debitos
      return (""+Math.round(value*-100)/100).replace(".",",");
    }

    // funcao para gravar linha no CSV
    function makeTransaction(datePosted, transactionAmount, desc, separator) {
       return datePosted + separator + desc + separator + transactionAmount + '\n';
    }

    // inicializacoes
    csv='';
    separator=';';
	
    // recupera as linhas da tabela de transacoes nacionais
    tableTransacoesNacionais = getElements("id('detfatura')/table/tbody/tr");

    cotacaoDolar = parseValue(getElement("//td[contains(.,'Dólar')]/following-sibling::td").textContent);

    // percorre as linhas
    for (i=0,j=1; i<tableTransacoesNacionais.snapshotLength; i++) {
      e = tableTransacoesNacionais.snapshotItem(i);    
      if (e.cells[3] != null) {

        datePosted = e.cells[0].textContent;

        // recupera o valor
        transactionAmount = parseValue(e.cells[2].textContent);
        // Se for transação internacional
        if (transactionAmount == 0.00 && e.cells[3] != null) {
          transactionAmount = parseValue(e.cells[3].textContent) * cotacaoDolar;
        }

        // recupera a descricao
        desc = e.cells[1].textContent;

        // monta o texto da tansacao para o CSV
        csv += makeTransaction(datePosted, formatToSave(transactionAmount), desc, separator);
      }
    }
    
    return csv;
  }
  
  CSV = document.getElementById("CSV");
  // cria o textarea se jah nao existir
  if (CSV == null) {
    CSV = document.createElement("textarea");
    CSV.id = "CSV";
    CSV.style.width = "800";
    CSV.style.height = "200";
  }
  CSV.innerHTML = generateCSV();
  document.body.insertBefore(CSV, document.body.lastChild);

})();