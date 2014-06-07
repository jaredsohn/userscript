// ==UserScript==
// @name           ltpTurbinator
// @namespace      org.ninehells.dbb
// @description    turbina ltp
// @require     	 http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @require     	 http://code.jquery.com/ui/1.10.0/jquery-ui.js
// @include        http://ltp.petrobras.com.br/main/header.asp
// ==/UserScript==

(function() {   
    //adiciona css de jquery-ui
    $('head', parent.document).append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css" />');    
    
    //adiciona a janela de saida
    $('body',parent.document).prepend('<div id="dialog" style="width:400px;"><textarea style="width:600px;height:500px" id="console"></textarea></div>');
    var dialog = $("#dialog",parent.document);
    dialog.dialog({autoOpen:false, width:620});    

    //adiciona botao para gerar lista    
    $('img[src="images/bt_limpar.gif"]').after('<input id="lista" type="button" value="lista" />').after('<input id="fotos" type="button" value="fotos" />');

    //callback do botao limpa
    $('#lista').click(function() {
      //itera nos elementos
      var texto = [];      
      getListaLinhas().each(function(index, element) {          
          texto.push(getNome(element)+';'+getChave(element));
      });
      
      //joga o texto na janela de saida
      $('#console',parent.document).val(texto.join('\n'))
      dialog.dialog('open');
    });    

    function getListaLinhas() {
      var listaDocument = $('iframe[name="lista"]',parent.document).contents();    
      return $('tr', listaDocument);    
    }
    
    function getChave(linha) {
      return $(linha).html().match(/exibe_01\(&quot;(.*)&quot;\)/)[1];
    }
    
    function getNome(linha) {
      return $(linha).text().trim().replace(/ +/g,' ');
    }
    
    //callback do botao fotos
    $('#lista').click(function() {
    });
    
    //recupera a foto de uma chave
    function getFoto(chave) {
      $.get('http://ltp.petrobras.com.br/main/usuario.asp?chave='+chave, function(content) {
          return content.match(/exibe_foto\.asp\?url=(.*?\/\d+\.jpg)/)[1].replace("..","http://ltp.petrobras.com.br");
      });
    }      

})();