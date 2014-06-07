// ==UserScript==
// @name       DAN SCSM
// @namespace  http:///
// @version    0.3
// @description  enter something useful
// @include        http://www2.diasystem.com.br/corporativo/servlet/hscsm0002
// @include        http://192.168.10.220/corporativo/servlet/hscsm0002
// @copyright  2013+, You
// ==/UserScript==

/*
script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
head.appendChild(script);
*/

//carrega os styles externos
/*
function loadStyles(array,callback){
    var loader = function(href,handler){
        var link = document.createElement("link");
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = href;
        var head = document.getElementsByTagName("head")[0];
        (head || document.body).appendChild( link );
    };
    (function(){
        if(array.length!=0){
        	loader(array.shift(),arguments.callee);
        }else{
        	callback && callback();
        }
    })();
}
loadStyles([
   "http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/themes/redmond/jquery-ui.css"
]);
*/

//carega os scripts externo e executa o script
function loadScripts(array,callback){
    var loader = function(src,handler){
        var script = document.createElement("script");
        script.src = src;
        script.onload = script.onreadystatechange = function(){
        script.onreadystatechange = script.onload = null;
        	handler();
        }
        var head = document.getElementsByTagName("head")[0];
        (head || document.body).appendChild( script );
    };
    (function(){
        if(array.length!=0){
        	loader(array.shift(),arguments.callee);
        }else{
        	callback && callback();
        }
    })();
}

loadScripts([
   "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"
    /*,
   "https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"*/
],function(){

    //alert('All things are loaded');
    
    var styleCard = "<style type='text/css'>" +
".task {" +
"    float: left;" +
"    width: 250px;" +
"    margin: 7px;" +
"    background-color: #FFFFFF;" +
"    border: 1px solid #CCC;" +
"    border-radius: 3px;" +
"    x-font-family: HelveticaNeueRoman, tahoma, verdana, arial, sans-serif;" +
"    font-family:  Arial, Verdana, Tahoma, sans-serif;" +
"    font-size: 11px;" +
"    line-height: 12px;" +
"    color: #333333;" +
"    list-style-type: none;" +
//"    cursor: pointer;" +
"}" +
".footer {" +
"    border-top: 1px solid #CCC;" +
"}" +
".title_card {" +
"    color: #999999;" +
"    x-font-family: HelveticaNeueRoman, tahoma, verdana, arial, sans-serif;" +
"    font-family:  Arial, Verdana, Tahoma, sans-serif;" +
"}" +
".task .head {" +
"    color: #FFFFFF;" +
"    line-height: 20px;" +
"    margin: -1px -1px 0;" +
"    border-radius: 3px 3px 0 0;" +
"    overflow: hidden;" +
"}" +
".task .head > span {" +
"    float: right;" +
"    height: 20px;" +
"    width: 20px;" +
"    background: url('../images/icons_sprite.png') no-repeat -275px -65px;" +
"}" +
".task .task_tab {" +
"    float: left;" +
"    min-width: 40px;" +
"    height: 16px;" +
"    color: #333333;" +
"    margin: 4px 0 0 1px;" +
"    padding: 0 6px 0 3px;" +
"    overflow: hidden;" +
"    font-size: 9px;" +
"    line-height: 16px;" +
"    border-radius: 3px 3px 0 0;" +
"    background-color: #FFFFFF;" +
"}" +
".task .task_tab img {" +
"    float: left;" +
"    margin: 1px 5px 0 0;" +
"    cursor: pointer;" +
"}" +
".task .assignee {" +
"    line-height: 20px;" +
"    color: #FFF;" +
"    padding-right: 5px;" +
"    font-weight: bold;" +
"    height: 20px;" +
"    overflow: hidden;" +
"    text-align: right;" +
"    cursor: pointer;" +
"}" +
".task .body {" +
"    padding: 10px;" +
"}" +
".titulo_tabela {" +
"    border-left: 1px solid #CCC;" +
"    color: white;" +
"    background-color: #999;" +
"    padding: 5px;" +
"    text-align: center;" +
"    x-font-family: HelveticaNeueRoman, tahoma, verdana, arial, sans-serif;" +
"    font-family:  Arial, Verdana, Tahoma, sans-serif;" +
"    font-size: 12px;" +
"	 font-weight:bold;" +
"}" +
".conteudo_tabela {" +
"    border-left: 1px solid #CCC;" +
"    border-bottom: 1px solid #CCC;" +
"    padding: 10px;" +
"}" +
"</style>";
    
	$('html > head').append(styleCard);
    
    var tabela = 	"<table id='tabela' cellspacing='0' cellpadding='0'>" +
                        "<tr>" +
        					"<td colspan='8' height='40' style='background-color:#ccc; color:white; padding:10px;'>DAN SCSM</td>" +
                        "</tr>"  +
                        "<tr>" +
                            "<td width='300' class='titulo_tabela	titulo_tabela_analisada' 		style='background-color:#1E98D6'>ANALISADA</td>" +
                            "<td width='300' class='titulo_tabela 	titulo_tabela_especificada' 	style='background-color:#1E98D6'>ESPECIFICADA</td>" +
                            "<td width='300' class='titulo_tabela	titulo_tabela_emdesenvolvimento' style='background-color:#1E98D6'>EM DESENVOLVIMENTO</td>" +
                            "<td width='300' class='titulo_tabela	titulo_tabela_concluida' 		style='background-color:green'>CONCLUÍDA</td>" +
                            "<td width='300' class='titulo_tabela	titulo_tabela_homologada'	 	style='background-color:green'>HOMOLOGADA</td>" +
                            "<td width='300' class='titulo_tabela	titulo_tabela_depurada' 		style='background-color:green'>DEPURADA</td>" +
                            "<td width='300' class='titulo_tabela	titulo_tabela_fechada' 			style='background-color:green'>FECHADA</td>" +
                            "<td width='300' class='titulo_tabela	titulo_tabela_cancelada' 		style='background-color:red'>CANCELADA</td>" +
                        "</tr>"  +
                        "<tr>" +
                            "<td class='conteudo_tabela' id='Analisada'			valign='top'></td>" +
                            "<td class='conteudo_tabela' id='Especificada'		valign='top'></td>" +
                            "<td class='conteudo_tabela' id='EmDesenvolvimento' valign='top'></td>" +
                            "<td class='conteudo_tabela' id='Concluida'			valign='top'></td>" +
                            "<td class='conteudo_tabela' id='Homologada'		valign='top'></td>" +
                            "<td class='conteudo_tabela' id='Depurada'			valign='top'></td>" +
                            "<td class='conteudo_tabela' id='Fechada'			valign='top'></td>" +
                            "<td class='conteudo_tabela' id='Cancelada'			valign='top'></td>" +
                        "</tr>"  +
                    "</table><BR><BR>";
    
    $("body").append(tabela);
       
    var cards   = new Array();
    var linha	= 0;
    var coluna	= 0;
    
    var tabelaItensSM = new Array();
    
    $('table#GRID > tbody > tr:even').each(function (){        
        cards[linha] = new Array();
        
        coluna = 0;
        
        $('td:not(:first)',this).each(function (){
            cards[linha][coluna] = $(this).html();
            //$(this).css('background-color','black');    
            coluna++;
        });
        
        //Itens de uma S
        //0 Item
        //1 Componente
        //2 Descrição
        //3 Tempo
        //4 Implementador
        //5 Status
        //6 Apontamento
        
        var naoIniciado 	= 0;
        var parado 			= 0;
        var emAndamento 	= 0;
        var tempoRestanteMinuto	= 0;
        var tempoRestanteHora 	= 0;
        
        var tempoRestanteAux		= "";
        var tempoRestanteHoraAux 	= 0;
        var tempoRestanteMinutoAux	= 0;
        
        var analistasItens = "";
        var analistasItensAux = "";
        

        //Guarda a tabela inteira de itens da SM
        tabelaItensSM[linha] = $('table#TBLDET_0001000'+(linha+1)).html();
        
		//percore cada linha de itens da SM
		$('table#FSGESP_0001000'+(linha+1)+' > tbody > tr').each(function (){
			
			coluna = 0;
            
            //percorre cada coluna de uma linha de item da SM
			$('td',this).each(function (){
                
                //Guarda tempo de cada item
                if(coluna == 3){
                    tempoRestanteAux		= $('span',this).html().trim().split(':');
                    
                	tempoRestanteHoraAux   = parseInt(tempoRestanteAux[0]);
                    tempoRestanteMinutoAux = parseInt(tempoRestanteAux[1]);
                }
                
                //Guarda o noem dos analistas dos itens "parados" "em andamento"
                if(coluna == 0){
                    analistasItensAux = $('span',this).html() + ' - ';
                }else if( coluna == 4){
                    analistasItensAux += $('span',this).html();
                }
                
                
                //funca a ser usada no switch
                function calculaTempoRestante(){
                    tempoRestanteMinuto += tempoRestanteMinutoAux;
                    if( tempoRestanteMinuto > 60 ){
                        tempoRestanteMinuto = tempoRestanteMinuto-60;
                        tempoRestanteHora += 1;    
                    }
                    tempoRestanteHora += tempoRestanteHoraAux;
                }
                
                //Item status
                if(coluna == 5){
                    
                    switch ($('span',this).html()) {
                        case "Não Iniciado":
                            naoIniciado++;
                            calculaTempoRestante();
                            break;
                        
                        case "Parado":
                            parado++;
                            calculaTempoRestante();
                            analistasItens += '<span style="color:#FFBB00;">' + analistasItensAux + '</span><BR>';
                            break;
                        
                        case "Em Andamento":
                            emAndamento++;
                            calculaTempoRestante();
                            analistasItens += '<span style="color:#34A97B;">' + analistasItensAux + '</span><BR>';
                            break;   
                    }
                }// if(coluna == 5){
                
                coluna++;
            });
		});
        
		//cria os cards
        criaCard(cards[linha], naoIniciado, parado, emAndamento, (tempoRestanteHora + ':' + tempoRestanteMinuto), linha, analistasItens);
       
		//alert(linha + ' - ' + cardsItens[linha].length);
        //criaItemCard(cards[linha],cardsItens[linha]);
        
		linha++;
	});
    
    function criaCard(cardEntrada, naoIniciadoEntrada, paradoEntrada, emAndamentoEntrada, tempoRestanteEntrada, linha, analistasItensEntrada){
        //0  -
        //1  +
        //2  SM
        //3  Versão
        //4  Chamado
        //5  Tipo
        //6  Produto
        //7  Criado em
        //8  Status atual 		(Analisada, Especificada, Em Desenvolvimento, Concluida, Homologada, Depurada, Fechada, Cancelada)
        //9  Responsável atual
        //10 Esforço Total
        //11 Relógio (Apontamento de horas)

		var aux2  = "<div>" +cardEntrada[2] + "</div>";
        var aux4  = "<div>" +cardEntrada[4] + "</div>";
        var aux8  = "<div>" +cardEntrada[8] + "</div>";
        var aux9  = "<div>" +cardEntrada[9] + "</div>";
        var aux10 = "<div>" +cardEntrada[10] + "</div>";
        var aux11 = "<div>" +cardEntrada[11] + "</div>";
        
        var auxNaoIniciado	= "";
        var auxParado		= "";
        var auxEmAndamento	= "";
        
        var divAnalistas = "";
        
        var corCard	= "gray"; //padrao cinza
        
        //Caso o tempo restante seja 0(Zero) poe o tempo total da atividade
        //pois a ativdade ja foi concluída, ou não esta aprovada ainda
        if ( tempoRestanteEntrada == "0:0" ){
            tempoRestanteEntrada = $('span',aux10).html()
        }
        
        
        if(naoIniciadoEntrada > 0){
			auxNaoIniciado = 	'<div style="float:left; width:10px; height:10px; background-color:gray; color:white;"></div>' +
								'<div style="float:left; padding-left:5px; padding-right:5px; height:10px;">'+ naoIniciadoEntrada +'</div>';
        }
        
        if(paradoEntrada > 0){
			auxParado = 	'<div style="float:left; width:10px; height:10px; background-color:#FFBB00;"></div>' +
							'<div style="float:left; padding-left:5px; padding-right:5px; height:10px;">'+ paradoEntrada +'</div>';
        }
        
        if(emAndamentoEntrada > 0){
			auxEmAndamento = 	'<div style="float:left; width:10px; height:10px; background-color:#34A97B;"></div>' +
								'<div style="float:left; padding-left:5px; padding-right:5px; height:10px;">'+ emAndamentoEntrada +'</div>';
        }                           

        //se tem ao menos uma atividade "Em Andamento"
        if (emAndamentoEntrada > 0){
            corCard = "#34A97B";
        //se nao tem nada em andamento, mas tem ao menos 1 "Parado"
        }else if (paradoEntrada > 0){
			corCard = "#Ffbb00"; 
        }else if (naoIniciadoEntrada == 0){
            corCard = "green"; 
        }
            
            
		if (analistasItensEntrada != ""){
		//if (false){
            divAnalistas = '<div class="body footer title_card div_analistas">' + analistasItensEntrada + '</div>';
        }
          
        var card = 		'<div class="task" style="float:left">' +
                            '<div class="head" linha="'+linha+'" style="background-color: ' + corCard + '">' + //#1E98D6 cod do antigo azul
                                '<span class="task_context">&nbsp;</span>' +
                                '<div class="task_tab">' +
                                    '<img class="task_type" alt="" src="http://kanbanize.com/application/resources/images/types/default_small.png"><strong class="task_id"> SM '+ $('span',aux2).html()+'</strong>' +
                                '</div>' +
                                '<div class="assignee" style="color: #FFFFFF">' +$('span',aux9).html()+ '</div>' +
                            '</div>' +
                            '<div class="body title_card">' +
            					'<div align="right" >'+ $('span',aux4).html() + '</div>' +
            					'<div>' +$('a',aux4).attr('onmouseover').substring(33,$('a',aux4).attr('onmouseover').indexOf("Criado por")).substring(0,200) + '</div>' +
                            '</div>' +
							'<div class="body footer title_card">' +
           						'<div style="float:right;">' + tempoRestanteEntrada + '</div>' +
                                auxNaoIniciado +
                                auxParado +
								auxEmAndamento +
        					'&nbsp;</div>' + 
            				divAnalistas +
                        '</div>';
        
        //coloca a tabela com os itens da SM respectiva a este Card
        //$('body').append(tabelaItensSmEntrada);
        
        switch ($('span',aux8).html()) {
            case "ANALISADA":
				$('#Analisada').append(card + '<BR>');
       			break;
            
            case "ESPECIFICADA":
				$('#Especificada').append(card + '<BR>');
       			break;
            
            case "EM DESENVOLVIMENTO":
                $('#EmDesenvolvimento').append(card + '<BR>');
                break;
            
            case "CONCLUIDA":
				$('#Concluida').append(card + '<BR>');
       			break;
			
            case "HOMOLOGADA":
				$('#Homologada').append(card + '<BR>');
       			break;
            
            case "DEPURADA":
				$('#Depurada').append(card + '<BR>');
       			break;
			
            case "FECHADA":
				$('#Fechada').append(card + '<BR>');
       			break;
            
            case "CANCELADA":
				$('#Cancelada').append(card + '<BR>');
       			break;
            
		}// switch ($('span',aux8).html()) {
    }//function criaCard


    var fundoPopup =		'<div id="fundoPopup" style="display:none; visiblity:hidden; position:fixed; left:0px; top:0px; float:left; width:100%; height:100%;"></div>';
    
    var popupFlutuante = 	'<div id="popupFlutuante" style="display:none; '+
                                                             'visiblity:hidden; ' +
                                                             'overflow:auto; ' +
                                                             'border: 3px solid black; ' +
                                                             'position:fixed; ' +
                                                             'left:5%; ' +
                                                             'top:5%; ' +
                                                             'float:left; ' +
                                                             'width:90%; ' +
                                                             'height:90%; ' +
                                                             'background-color:#f5f5f5;' +
                                                             '-moz-box-shadow:    5px 5px 6px #999;' +
                                                             '-webkit-box-shadow: 5px 5px 6px #999;' +
                                                             'box-shadow:         5px 5px 6px #999;' +
    														 '">' +
        					'</div>';
        
    //adiciona uma div invisivel para ao clicar sair da popup
    $('body').append(fundoPopup);
    
    //adiciona uma div que é a popup dos itens de uma SM
    $('body').append(popupFlutuante);
    
    //Clique em um card, para abrir a popup com os itens da SM
    $("div.head").click(function() {
        $("#popupFlutuante").css('display','block').css('visibility','visible');
        $("#fundoPopup").css('display','block').css('visibility','visible');
        $("#popupFlutuante").append($(this).parent().clone());
        $("#popupFlutuante").append('<div>'+tabelaItensSM[$(this).attr('linha')]+'</div>');
        
	});
    
    //Clique fora do popupflutuante, na div grande, entao fecha o popup
    $("#fundoPopup").click(function() {
        $("#popupFlutuante").css('display','none').css('visibility','hidden');
        $("#fundoPopup").css('display','none').css('visibility','hidden');
        $("#popupFlutuante").empty();
	});
    
    
    
    
    //Deleta a tabela de dados
   // $('table#TBLSOL').css('display','none');
    //$('table#TBLSOL').css('visibility','hidden');
    
   // $('#TABLE11').css('width','1000px');
    
   // $('body').css('width','2400px');
        
    //$('a').css('color','red');
});
