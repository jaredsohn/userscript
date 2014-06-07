// ==UserScript==
// @name       NotasSOLByKessiler
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Ver as notas na página inicial do SOL
// @include https://aluno.unibh.br/SOL/aluno/index.php
// @copyright  2013+, Kessiler
// ==/UserScript==

var headerDiv = '<div class="column ui-sortable">' +
'<div class="portlet true ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" id="0">'+
'<div class="portlet-header ui-widget-header ui-corner-all"><strong>Notas</strong></div>'+
'<div class="portlet-content">';
var bodyDiv = '<span class="dev-widget" jquery-template="1" id="listamaterial"><span id="lista-material-template-box" class=""><ul class="material">';
var footerDiv = '</span></span></u></div></div></div>';
$.ajax({
	data: {
		CODPERIODOLETIVO: "2117",
		INDBUSCARDISCIPLINAS: 'S'
	},    
	type: "POST",
	async: false,
	url:"https://aluno.unibh.br/SOL/aluno/index.php/disciplinas/index/buscar", // acao ou url a ser executada
	success: function (objJson){
		$.each(objJson.DADOS, function(i, item) {
			bodyDiv +='<li><strong>'+item.NOMDISCIPLINA+'</strong>';                   
			$.ajax({
				data: {
					CODPERIODOLETIVO: "2117",
					CODDISCIPLINA: item.CODDISCIPLINA,
					CODDIARIOCLASSE: item.CODDIARIOCLASSE,
					INDBUSCARMATERIAL: 'N',
					INDBUSCACALENDARIO: 'N',
					INDBUSCARNOTAS: 'S',
					INDDETALHESNOTAS: 'N'
				},
				type: "POST",
				async: false,  
							url:"https://aluno.unibh.br/SOL/aluno/index.php/disciplinas/index/buscar", // acao ou url a ser executada                                    
							success: function(obj){

								$.each(obj.notas, function(j, list) {
                                    bodyDiv += '<span class="dev-material">Nota total = ' + list.VALTOTAL.toString() + "  </span><span>Total Faltas = "+ list.NUMFALTAS.toString()+'</span>';
								});                                        
								bodyDiv +='</li>';      
							}

				});	
		});                
	}
}

);
$(headerDiv+bodyDiv+footerDiv).insertAfter('#main .box-hold #7');
