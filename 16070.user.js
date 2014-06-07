// ==UserScript==
// @name        extratoVisaToOFX
// @namespace   dbb9hells
// @description gera o conteudo do OFX relativo a pagina do extrato do cartao do banco Santander
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @include     https://www.santandernet.com.br/ibpf/transacoes/cartoes/ConsultaFaturaDetalhes.asp*
// @include     *ConsultaFaturaDetalhes.asp*
// ==/UserScript==
(function(){	
  String.prototype.trim = function () {return this.replace(/^\s*/, "").replace(/\s*$/, "");}
  // faz o parse da pagina retornando o OFX
  function generateOFX() {    
    // funcoes utilitarias
    function padTab(n) {return ("						").substr(6-n);}
    function parseDate(date) {return date.substr(6,4)+date.substr(3,2)+date.substr(0,2);}
    function parseValue(value) {return parseFloat(value.trim().replace(".","").replace(",","."));}
    function formatValue(value) {return (""+Math.round(value*100)/100).replace(".",",");}
    function pad0(value) {return value<10?"0"+value:""+value;}
    function serialDate(d) {return d.getFullYear()+pad0(d.getMonth())+pad0(d.getDay())+pad0(d.getHours())+pad0(d.getMinutes())+pad0(d.getSeconds());}
    // funcoes para ajudar no XML
    function BeginNode(name) {return padTab(indent++)+"<"+name+">\n";}
    function EndNode(name) {return padTab(--indent)+"</"+name+">\n";}
    function Node(name,value) {return padTab(indent)+"<"+name+">"+value+"</"+name+">\n";}
    
    function makeTransaction(datePosted, transactionAmount, memo) {
      // cria o contador de transacoes do dia se necessario
      if(!dates[datePosted]) dates[datePosted]=0;
      // incrementa o contador de transacoes do dia
      dates[datePosted]++; 
      // atualiza o saldo global
      balanceAmount+=transactionAmount;
      // atualiza os limites de datas
      if (maxDate<datePosted) maxDate=datePosted;
      if (minDate>datePosted) minDate=datePosted;
      STMTTRNs+=BeginNode("STMTTRN");
      STMTTRNs+=Node("TRNTYPE",transactionAmount<0?"CREDIT":"DEBIT");
      STMTTRNs+=Node("DTPOSTED", datePosted+"080000");
      STMTTRNs+=Node("TRNAMT", formatValue(-transactionAmount));
      STMTTRNs+=Node("FITID",datePosted+dates[datePosted]);
      STMTTRNs+=Node("CHECKNUM","00000");//???
      STMTTRNs+=Node("PAYEE", memo.replace("&","E"));
      STMTTRNs+=Node("MEMO", memo.replace("&","E"));
      STMTTRNs+=EndNode("STMTTRN");
    }

    // inicializacoes
    XML="OFXHEADER:100\nDATA:OFXSGML\nVERSION:102\nSECURITY:NONE\nENCODING:USASCII\nCHARSET:1252\nCOMPRESSION:NONE\nOLDFILEUID:NONE\nNEWFILEUID:NONE\n";
    indent=0;
    balanceAmount=0;
    minDate="99999999";
    maxDate="00000000";

    // recupera numero do cartao e valor da fatura anterior
    credicardNumber = $("#NumCartao").val().trim();
    saldoAtual=0;
    element = $("td:contains('Saldo Anterior') ~ td");
    if (element.length) {
      saldoAtual = -parseValue(element.text());
    } else {
      element = $("td:contains('PAGAMENTO') ~ td");
      if (!element.length)  element = $("td:contains('PGTO DE FATURA') ~ td");
      if (element.length) saldoAtual = parseValue(element.text());
    }
    
		// o valor da cotacao do dolar mostrado eh arredondado entao calcula o valor correto a partir do total
    element = $("tr:contains('No Exterior (US$)') ~ tr td:eq(1)");
    if (element.length) { 
      totalDolar = parseValue(element.text());
      totalReal = parseValue($("td:contains('Convertido em R$') ~ td").text());
      cotacaoDolar = totalReal/totalDolar;
    }
   
    // inicio do OFX
    XML+=BeginNode("OFX");

    XML+=BeginNode("SIGNONMSGSRSV1");
    XML+=BeginNode("SONRS");
    XML+=BeginNode("STATUS");
    XML+=Node("CODE",0)
    XML+=Node("SEVERITY","INFO");
    XML+=EndNode("STATUS");
    XML+=Node("DTSERVER", serialDate(new Date()));
    XML+=Node("LANGUAGE","POR");
    XML+=EndNode("SONRS");
    XML+=EndNode("SIGNONMSGSRSV1");
    XML+=BeginNode("BANKMSGSRSV1");
    XML+=BeginNode("STMTTRNRS");
    XML+=Node("TRNUID",1);
    XML+=BeginNode("STATUS");
    XML+=Node("CODE",0);
    XML+=Node("SEVERITY","INFO");
    XML+=EndNode("STATUS")  ;
    XML+=BeginNode("STMTRS");
    XML+=Node("CURDEF","BRL");
    XML+=BeginNode("BANKACCTFROM");
    XML+=Node("BANKID","0356");//???
    XML+=Node("ACCTID",credicardNumber);
    XML+=Node("ACCTTYPE","CHECKING");
    XML+=EndNode("BANKACCTFROM");
    XML+=BeginNode("BANKTRANLIST");

    STMTTRNs=""
    // recupera as linhas da tabela de transacoes nacionais
    tableTransacoesNacionais = $("table.lista > tbody > tr:not(.trDestaque)");

    lastDate="";
    var dates = new Array();
    // percorre as linhas
    tableTransacoesNacionais.each(function (index) {
      td = $(this).children();
      if (td.get(2) != null) {
        // recupera a descricao
        memo = td.get(1).textContent;
        
        // recupera a data
        datePosted = parseDate(td.get(0).textContent);
        // recupera o valor
        transactionAmount = parseValue(td.get(2).textContent);
        if (transactionAmount == 0) {
        	transactionAmount = parseValue(td.get(3).textContent)*cotacaoDolar;
        }
        // monta o texto da tansacao para o OFX
        makeTransaction(datePosted, transactionAmount, memo);
      }
    });
    
    // coloca limites de datas no OFX
    XML+=Node("DTSTART",minDate+"080000");
    XML+=Node("DTEND",maxDate+"080000");
    
    // coloca transacoes no OFX
    XML+=STMTTRNs;

    // fim do OFX
    XML+=EndNode("BANKTRANLIST");
    XML+=BeginNode("LEDGERBAL");
    XML+=Node("BALAMT", formatValue(saldoAtual-balanceAmount));
    XML+=Node("DTASOF", maxDate);
    XML+=EndNode("LEDGERBAL");
    XML+=EndNode("STMTRS");
    XML+=EndNode("STMTTRNRS");
    XML+=EndNode("BANKMSGSRSV1");
    
    XML+=EndNode("OFX");
    
    return XML;
  }
  
  function generateOFXIntoTextArea() {
      // cria o textarea se jah nao existir
      if (!$("#OFX").length) {
        $("body").append('<br/><textarea id="OFX" style="width:800px;height:600px"></textarea>');
        $('#iDetalhes', window.parent.document).height(3000);
      }
      $("#OFX").val(generateOFX());
  }                      
  
  // coloca o botao no final
  if (true) {
      $("body").append('<input type="button" id="ofxButton" value="Gerar OFX" />');
      $("#ofxButton").bind('click', function(event) {generateOFXIntoTextArea();});
  }
})();