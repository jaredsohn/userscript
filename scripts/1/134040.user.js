// ==UserScript==
// @name       Atualizar Campos Relatório Interativo
// @namespace  http://your.sever.apex/*
// @version    0.1
// @description  Padronização dos campos relatório interativos do apex
// @include    http://your.sever.apex/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @copyright  2011 Raphael Nunes Garcia. Todos os direitos reservados
// ==/UserScript==

/*
 *  Script para padronização dos campos do relatório interativo apex.
 *  Created on: 14.05.12
 *  Version: 0.1
 *  By: Raphael Nunes Garcia  
*/

$(document).ready(function(){

  if($('#P687_COLUMN_TYPE_DISPLAY').length > 0){
	tp = $('#P687_COLUMN_TYPE_DISPLAY').text();
	if(tp == 'STRING'){
	  $('#P687_HEADING_ALIGNMENT,#P687_COLUMN_ALIGNMENT').val('LEFT');
	}else if(tp == 'NUMBER'){
	  $('#P687_HEADING_ALIGNMENT,#P687_COLUMN_ALIGNMENT').val('RIGHT');
	}else if(tp == 'DATE'){
	  $('#P687_HEADING_ALIGNMENT,#P687_COLUMN_ALIGNMENT').val('CENTER');
	}
	
    if($('button.button-next-gray-gray-bg').length > 0){
	   $('button.button-next-gray-gray-bg').click();
    }else{
      $('button.button-small-orange-gray-bg').click(); 
    }
  }else{
     alert('Processo Realizado com sucesso! Não se esqueça de desligar o script!');
  }	

});