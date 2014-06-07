// ==UserScript==
// @name        Limpa TextBox
// @namespace   gandra
// @include     http://bdf/bdf/Servicos/srv001/frmsrv001.cfm*
// @version     1
// ==/UserScript==

//alert('begin');

//abrindo container para melhor visualização
document.forms[0].elements['Servliberados'].setAttribute('size',10);

//autoclear da caixa de texto de serviço 
var obj = document.forms[0].elements['pesquisaSrv'];
var attr = 'if (event.keyCode == 13) {FiltraServ(document.forms[0]); this.value=""; return false}';
obj.setAttribute('onkeypress',attr);


//alert('end');