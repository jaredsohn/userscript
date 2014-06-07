//{
// Este script tenta permitir "colar" a linha digitável de um boleto
// nos sites do Banco do Brasil e do Bradesco.
//
// Copyright (c) 2010, Ricardo Mendonça Ferreira (ric@mpcnet.com.br)
// Released under the GPL license - http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Colar linha digitável - Banco do Brasil e Bradesco
// @description   Copie a linha digitável de um boleto gerado em um site e cole-o nos sites do Banco do Brasil e do Bradesco
// @namespace     http://userscripts.org/scripts/show/70852
// @include       https://www2.bancobrasil.com.br/*/pagamento*
// @include       https://*bradesco.com.br/*
// @version       2010.03.11
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// Isto e' um script Greasemonkey.
//
// Para usa'-lo e' preciso instalar o Greasemonkey: http://www.greasespot.net/
// Se não o tiver, instale-o, reinicie o Firefox e abra esta página novamente.
//
// Para desinstalar, entre em Ferramentas/Greasemonkey/Manage User Scripts,
// selecione este script e clique Uninstall.
//
// --------------------------------------------------------------------
//
// History:
// --------
// 2010.03.08  1a. versão
// 2010.03.11  Agora funciona também ao pagar boleto pela poupança no BB
// 2010.09.02  Atualização de compatibilidade c/ site do BB
// 2011.05.08  Suporte a no. de boleto sem nenhuma separação
//}

(function() {

   if (document.location.href.match(/bancobrasil/i)) {
      // Procure a tabela (pág. de pagamento via poupança é diferente - vai entender...) :P
      table = null;
      div = document.getElementById('divDadosPagamento');
      if (div) {
         table = div.children[0];
      } else {
         tables = document.getElementsByTagName('table');
         for (x=tables.length -1; x>0; x--) {
            if (tables[x].innerHTML.match(/name="campo1"/)) {
               table = tables[x];
               break;
            }
         }
      }
      // Achou a tabela? Continue...
      if (table) {
         var tr = document.createElement("tr");
         var td = document.createElement("td");
         tr.insertCell(td);
         tr.insertCell(td);
         table.appendChild(tr);
         row = table.rows.length -1;
         js = "v=this.value; r = v.match(/(\\d{5})(\\d{5})(\\d{5})(\\d{6})(\\d{5})(\\d{6})(\\d)(\\d+)/); if (r) {for (x=0;x<8;x++) { document.forms[0].elements[11+x].value = r[x+1] || '';}} else {r = v.match(/(\\d+)/g); for (x=0;x<8;x++) { document.forms[0].elements[11+x].value = r[x] || '';};}; document.forms[0].elements[18].focus(); return;";
         table.rows[row].cells[1].innerHTML = 
            '<input class="alinhadoAEsquerda" maxlength="85" name="paste" size="65" value="Cole aqui a linha digitável e tecle [TAB]" onChange="'+js+'">';
      }
   }
   else 
   if (document.location.href.match(/bradesco/i)) {
      table = document.getElementById('TABLE1');
      if (table) {
         row = 3;
         var tr = table.insertRow(row);
         var td = document.createElement("td");
         tr.insertCell(td);
         td.setAttribute('colspan','4');
         tr.insertCell(td);
         js = "v=this.value; r = v.match(/(\\d+)/g); for (x=0;x<8;x++) { document.forms[0].elements[3+x].value = r[x];}; return;";
         table.rows[row].cells[1].innerHTML = 
            '<input maxlength="85" name="paste" size="65" value="Cole aqui a linha digitável e tecle [TAB]" onChange="'+js+'">';
      }
   }
   
})()
