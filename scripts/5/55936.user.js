// ==UserScript==
// @name           The Sims 3 EA Exchange Content Download
// @namespace      http://userscripts.org/scripts/show/55936
// @description    Um simples script para Greasemonkey utilizado para efetuar downloads de itens diretamente da EA Exchange (Página oficial de The Sims 3)
// @include        *thesims3.com/assetDetail.html?assetId=*
// ==/UserScript==

//<![CDATA[

/*
 * Update: 04/03/2010
 * 
 * - Biblioteca convertida para JSON
 * - Otimização de código
 * - Removido trechos de código desnecessários
 */

/*
 * Objeto EA
 * Responsável por todas as operações deste script
 */
var EA = {
  /*
   * @Propriedade 
   * @Nome Page
   * Utilizada para obter a página atual. Ex: index.html
   */	
	
  'page' : window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1),
  
  /*
   * @Método 
   * @Nome Trim
   * Utilizado para remover os espaços em branco de uma string
   * 
   * @param str String - Uma string
   * @return String - A string formatada
   */
  'trim' : function (str) {
    return str.replace(/^\s+|\s+$/g, "");
  },
  
  /*
   * @Método
   * @Nome getId
   * Utilizado para obter o identificador (ID) do item personalizado
   * 
   * @param void
   * @return String - Uma string representando o ID
   */
  'getId' : function () {
    if (this.page == 'assetDetail.html') {
      return document.location.href.substring(document.location.href.lastIndexOf('=') + 1)
    }
    else {
      return undefined;
    }
  },
  
  /*
   * @Método
   * @Nome formatId
   * Utilizado para formatar o identificador (ID) para a sintaxe 000/000/000/00
   * Exemplo: ID = "123456"; Formato de saída: 000/001/234/56
   * 
   * @param id String - Uma string representando um ID
   * @return String - Uma string representando o ID formatado
   */
  'formatId' : function (id) {
    var l = id.length;
    var z = '0';
    var newstr;
    for (i = 1; i < (11 - l); i++) { z = z + '0'; }
    newstr = z + id;
    newstr = newstr[0] + newstr[1] + newstr[2] + '/' + newstr[3] + newstr[4] + newstr[5] + '/' + newstr[6] + newstr[7] + newstr[8] + '/' + newstr[9] + newstr[10];
    return newstr;
  },
  
  /*
   * @Método
   * @Nome getLink
   * Utilizado para exibir o verdadeiro link para download do item
   * 
   * @param id String - Uma string representando o ID do item
   * @return String - Uma string representando o link para download
   */
  'getLink' : function(id) {
    var name = encodeURI(this.trim(document.getElementById('assetName').innerHTML));
    var extension = 'Sims3Pack';
    var link = 'llnw.thesims3.com/sims3_asset/sims3_asset/bin/';
    var realLink = link+this.formatId(id)+'/'+name+'.'+extension;
    return this.trim(realLink);
  },
  
  /*
   * @Método
   * @Nome replaceDownload
   * Utilizado para modificar a página do item. Modifica o texto do botão "Adicionar ao Jogo" para "Download", seu link 
   * original para o verdadeiro link de download e modifica o link do botão "Salvar Arquivo", sendo que este link
   * já executa diretamente no Inicializador do Jogo The Sims 3.
   */
  'replaceDownload' : function(Link) {
    var buttonDownload = document.getElementById('downloadImgId');
    var textDownload = document.getElementById('addToGameLinkId');
    var saveDownload = document.getElementById('saveToFileLinkId');
	
    buttonDownload.href = 'http://'+Link;
    textDownload.href = 'http://'+Link;
    saveDownload.href = 'sims3://'+Link;
    textDownload.innerHTML = 'DOWNLOAD';
  }
};

/*
 * Inicialização
 */

var Id = EA.getId();
if (Id) {
  var Link = EA.getLink(Id);
  EA.replaceDownload(Link);	
}

//]]>