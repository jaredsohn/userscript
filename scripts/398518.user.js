// ==UserScript==
// @name       DAN CHAMADOS
// @namespace  http:///
// @version    0.1
// @description  enter something useful
// @include        http://www2.diasystem.com.br/corporativo/servlet/hcorp0062*
// @include        http://192.168.10.220/corporativo/servlet/hcorp0062*
// @copyright  2013+, You
// ==/UserScript==

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
],function(){

    //alert('All things are loaded');
    
    var styleCard = "<style type='text/css'>" +
".task {" +
"    float: left;" +
"    width: 135px;" +
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
"    visibility: hidden;" +
"    display: none;" +
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
"    cursor: pointer;" +
"}" +
".task .head > span {" +
"    float: right;" +
"    height: 20px;" +
"    width: 20px;" +
"    background: url('../images/icons_sprite.png') no-repeat -275px -65px;" +
"    cursor: pointer;" +
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
"}" +
".task .body {" +
"    padding: 10px;" +
"}" +
".titulo_tabela {" +
"    border-left: 1px solid #CCC;" +
"    border-top: 1px solid #CCC;" +
"    color: white;" +
"    background-color: #999;" +
"    padding: 5px;" +
"    text-align: center;" +
"    x-font-family: HelveticaNeueRoman, tahoma, verdana, arial, sans-serif;" +
"    font-family:  Arial, Verdana, Tahoma, sans-serif;" +
"    font-size: 12px;" +
"	 font-weight:bold;" +
//"    min-width: 300px;" +
"}" +
".conteudo_tabela {" +
"    border-left: 1px solid #CCC;" +
"    border-bottom: 1px solid #CCC;" +
"    padding: 5px;" +
"}" +
".iconeComentarios {" +
"	 float: left;  " +
"	 margin-bottom:10px;" +
"	 margin-right:3px;" +
"	 background-repeat: no-repeat;  " +
"    background-image: url(\"http://kanbanize.com\/application\/resources\/images\/icons_sprite.png\"); "+
"	 background-position: -366px -34px;  " +
"    width: 18px;  " +
"    height: 18px; " +
"    font-size: 10px; " +
"    text-align: center; " +
"	 padding-top:2px;" +
"	 font-weight:bold;" +
"}" +
"</style>";
    
	$('html > head').append(styleCard);
    
    var tabela = 	"<table id='tabela' cellspacing='0' cellpadding='0'>" +
                        "<tr>" +
        "<td colspan='15' height='40' style='background-color:#ccc; color:white; padding:10px;'>DAN CHAMADOS</td>" +
                        "</tr>"  +
                        "<tr>" +
        					"<td colspan='15'>&nbsp;</td>" +
                        "</tr>"  +
                        "<tr>" +
        					"<td colspan='2' class='' 				style='font-size:12px; text-align:center; padding:10px;'><a href='#' class='mini'>Mini</a> / <a href='#' class='medio'>Médio</a></td>" +
                            "<td colspan='4' class='titulo_tabela' 	style='background-color:#FFBB00; color:white; text-align:center; padding:10px;'>AGUARDANDO</td>" +
        					"<td colspan='1' class='' 				style='background-color:white;   color:white; text-align:center; padding:10px;'></td>" +
        					"<td colspan='3' class='titulo_tabela' 	style='background-color:green;   color:white; text-align:center; padding:10px;'>SUCESSO</td>" +
        					"<td colspan='2' class='' 				style='background-color:white;   color:white; text-align:center; padding:10px;'></td>" +
					        "<td colspan='3' class='titulo_tabela' 	style='background-color:red; 	color:white; text-align:center; padding:10px;'>FALHARAM</td>" +
                        "</tr>"  +
                        "<tr>" +
                            "<td width='300' class='titulo_tabela' style='background-color:#1E98D6'>Aberto</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:#1E98D6'>Em análise</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:#FFBB00'>Especificação do cliente</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:#FFBB00'>Teste do cliente</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:#FFBB00'>Aprovação do orçamento</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:#FFBB00'>Priorização (Cliente)</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:#34A97B'>Solução em andamento</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:green'>Atendido</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:green'>Atendido / Sem Resposta do Cliente</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:green'>Atendido (Não utilizar)</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:#ccc'>Encerrado / Pedido do Cliente</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:#ccc'>Encerrado / Implementação Futura</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:red'>Encerrado / Falta de Resposta</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:red'>Orçamento não Aprovado</td>" +
                            "<td width='300' class='titulo_tabela' style='background-color:red'>Recusado</td>" +
                        "</tr>"  +
                        "<tr>" +
                            "<td class='conteudo_tabela' id='Aberto'					valign='top'></td>" +
                            "<td class='conteudo_tabela' id='EmAnalise'					valign='top'></td>" +
                            "<td class='conteudo_tabela' id='EspecificacaoDoCliente' 	valign='top'></td>" +
                            "<td class='conteudo_tabela' id='TesteDoCliente'			valign='top'></td>" +
                            "<td class='conteudo_tabela' id='AprovacaoDoOrcamento'		valign='top'></td>" +
                            "<td class='conteudo_tabela' id='PriorizaçãoCliente'		valign='top'></td>" +
                            "<td class='conteudo_tabela' id='SolucaoEmAndamento'		valign='top'></td>" +
                            "<td class='conteudo_tabela' id='Atendido'					valign='top'></td>" +
                            "<td class='conteudo_tabela' id='AtendidoSemRespostaDoCliente'	valign='top'></td>" +
                            "<td class='conteudo_tabela' id='AtendidoNaoUtilizar'			valign='top'></td>" +
                            "<td class='conteudo_tabela' id='EncerradoPedidoDoCliente'		valign='top'></td>" +
                            "<td class='conteudo_tabela' id='EncerradoImplementacaoFutura'	valign='top'></td>" +
                            "<td class='conteudo_tabela' id='EncerradoFaltadeResposta'		valign='top'></td>" +
                            "<td class='conteudo_tabela' id='OrçamentoNaoAprovado'			valign='top'></td>" +
                            "<td class='conteudo_tabela' id='Recusado'						valign='top'></td>" +
                        "</tr>"  +
                    "</table><BR><BR>";
    
    $("#TBLGRID").parent().prepend(tabela);
    
    var cards   = new Array();
    var linha	= 0;
    var coluna	= 0;
    
    $('table#FSGCHAMADOS > tbody > tr').each(function (){        
        cards[linha] = new Array();
        
        coluna = 0;
        
        $('td',this).each(function (){
            cards[linha][coluna] = $(this).html();
            //$(this).css('background-color','black');    
            coluna++;
        });
        
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
        var tabelaItensSM = $('table#TBLDET_0001000'+(linha+1)).html();     
        
		//cria os cards
        criaCard(cards[linha], naoIniciado, parado, emAndamento, (tempoRestanteHora + ':' + tempoRestanteMinuto), tabelaItensSM, analistasItens);
       
		linha++;
	});
    
    function criaCard(cardEntrada, naoIniciadoEntrada, paradoEntrada, emAndamentoEntrada, tempoRestanteEntrada, tabelaItensSmEntrada, analistasItensEntrada){
        //0 icone tipo chamado
        //1 chamado
        //2 produto
        //3 programa
        //4 cliente
        //5 pótencial
        //6 data abertura
        //7 data previsao
        //8 versao
        //9 status
        //10 atencao
        //11 ultima anotacao
        //12 detalhes
        //13 tipo anotacao

        var aux0  = "<div>" +cardEntrada[0] + "</div>";
        var aux1  = "<div>" +cardEntrada[1] + "</div>";
		/*
		var aux2  = "<div>" +cardEntrada[2] + "</div>";
        */
        var aux5  = "<div>" +cardEntrada[5] + "</div>";
        var aux6  = "<div>" +cardEntrada[6] + "</div>";
        /*
        var aux8  = "<div>" +cardEntrada[8] + "</div>";
        */
        var aux9  = "<div>" +cardEntrada[9] + "</div>";
        var aux10 = "<div>" +cardEntrada[10] + "</div>";
        var aux11 = "<div>" +cardEntrada[11] + "</div>";
        var aux13 = "<div>" +cardEntrada[13] + "</div>";
        
        var auxNaoIniciado	= "";
        var auxParado		= "";
        var auxEmAndamento	= "";
        
        var divAnalistas = "";
        
        var corCard	= "gray"; //padrao cinza
        
        switch ($('img',aux0).attr('title')) {
                
            case "Consulta":
				corCard = '#AA6600';
       			break;
                
            case "Comunicação de Erro":
				corCard = 'blue';
       			break;

            case "Sugestão de Alteração ao Produto":
				corCard = 'green';
       			break;
                
            case "Cliente C":
				corCard = 'green';
       			break;
                
            case "Urgente":
				corCard = '#FFBB00';
       			break;
                
            case "Sistema Parado":
				corCard = 'red';
       			break;
                                
        }//switch ($('span',aux0).html()) {
          
        /*
        var corBordaAlertaCard = 'white';
        
        if($('img',aux10).css('display') == ""){
            corBordaAlertaCard = "black";
        }
        
        //vai dento do card
        border: 1px solid '+corBordaAlertaCard+';
        
        */
        
        var dataExibidaStr = 0;
        var dataHoje = new Date();
        var mesInt;
        
        var dataAberturaStr  = $('span',aux6).html().trim().split('/');
		mesInt = parseInt(dataAberturaStr[1]);
        mesInt = mesInt-1;

        var dataAberturaDate = new Date(dataAberturaStr[2], mesInt, dataAberturaStr[0]);
        
        //se o chamado for do mesmo ano
        if(dataAberturaDate.getFullYear() == dataHoje.getFullYear()){
            
            //se for do mesmo mes
            if(dataAberturaDate.getMonth() == dataHoje.getMonth()){
                dataExibidaStr = dataHoje.getDate() - dataAberturaDate.getDate();
                
                //correção ortografica
                if(dataExibidaStr == 0){
                    dataExibidaStr = 'Hoje';
                }else if(dataExibidaStr == 1){
                    dataExibidaStr = 'Ontem';
                }else{
                    dataExibidaStr += ' dias';
                }
                
                localDesenho = '';
                
            //se for de algume mes pra tras, do mesmo ano
            }else{
                dataExibidaStr = dataHoje.getMonth() - dataAberturaDate.getMonth();
                
                //correção ortografica
                if(dataExibidaStr == 1){
                    dataExibidaStr += ' mês';
                }else{
                    dataExibidaStr += ' meses';
                }
                
                localDesenho = 'EsteAno';
            }
            
        //se o chamado for de um ano anterior
        }else{
            localDesenho = 'AnoPassado';
            dataExibidaStr = ((12 - dataAberturaDate.getMonth()) + dataHoje.getMonth()) + ' meses' ;
        }
        
        
        var letraCliente = '';
		var aux5Split = $('img',aux5).attr('src').split('/');
        
        switch (aux5Split[aux5Split.length-1]) {
                
            case "sde_icon_vermelho.png":
                letraCliente = '<div style="float:right; text-align:center; height:12px; width:12px; background-color:red; color:white; margin-top: -5px; margin-right: -5px;"><strong>A</strong></div>';
       			break;
                
            case "sde_icon_dourado.png":
                letraCliente = '<div style="float:right; text-align:center; height:12px; width:12px; background-color:#FFBB00; color:white; margin-top: -5px; margin-right: -5px;"><strong>B</strong></div>';
       			break;

            case "sde_icon_verde.png":
                letraCliente = '<div style="float:right; text-align:center; height:12px; width:12px; background-color:green; color:white; margin-top: -5px; margin-right: -5px;"><strong>C</strong></div>';
       			break;
                                
        }//switch ($('span',aux5).html()) {
        
        
        //imagem das anotações no sistema
        var divComentarios = '<div class="iconeComentarios">2</div>';
        
        var diaHoraComentario = $('span',aux11).html()
                                    .replace('/2013','').replace('-','')
                                    .replace(("0" + dataHoje.getDate()).slice(-2) + '/' + ("0" + (dataHoje.getMonth() + 1)).slice(-2),'Hoje')
        							.replace(("0" + (dataHoje.getDate()-1)).slice(-2) + '/' + ("0" + (dataHoje.getMonth() + 1)).slice(-2),'Ontem');
        
		//desenha o cardMedio        
        var cardMedio = '<div class="task" style="float:left">' +
                            '<div ancoraId="#'+$('img',aux0).attr('id')+'" class="head" style="background-color: ' + corCard + '">' + //#1E98D6 cod do antigo azul
                                
                                '<div class="task_tab">' +
                                    '<img class="task_type" alt="" src="http://kanbanize.com/application/resources/images/types/default_small.png"><strong class="task_id"> '+$('span',aux1).html()+'</strong>' +
                                '</div>' +
            
            				//'<div class="assignee" style="color: #FFFFFF; float:left;padding-left:5px;" >'+ $('span > a',aux1).html()+'</div>' +
                                '<div class="assignee" style="color: #FFFFFF" title="'+ $('span',aux6).html().trim() + '">' + dataExibidaStr + '</div>' +
                            '</div>' +
            				'<div class="body title_card">' +
            					letraCliente +
            					//divComentarios +
            					'<div >'+ diaHoraComentario + '</div>' +
            					'<div style="padding-top:5px;">' + $('span',aux13).html() + '</div>' +
                            '</div>' +
                        '</div>';
        
		//desenha o card (quadradinho com a cor do status)
        var card = 		'<a class="cardA" ancoraId="#'+$('img',aux0).attr('id')+'" href="#"><div style="float:left; width:7px; height:7px; background-color:'+corCard+'; margin:2px; "></div></a>';
        
        //Verifica qual eh o status do chamado
		switch ($('span',aux9).html()) {
            case "Aberto":
                
                $('#Aberto').append(card);
                $('#Aberto').append(cardMedio);
       			break;
            
            case "Em analise":  
                
				$('#EmAnalise').append(card);
                $('#EmAnalise').append(cardMedio);
       			break;
            
            case "Aguarda especificacao do cliente": 
                
                $('#EspecificacaoDoCliente').append(card);
                $('#EspecificacaoDoCliente').append(cardMedio);
                break;
                
            case "Aguarda teste do cliente":
                
                $('#TesteDoCliente').append(card);
                $('#TesteDoCliente').append(cardMedio);
                break;
                
            case "Aguarda aprovacao do orcamento":
                
                $('#AprovacaoDoOrcamento').append(card);
                $('#AprovacaoDoOrcamento').append(cardMedio);
                break;

            case "Aguardando Priorização (Cliente)":
                
                $('#PriorizaçãoCliente').append(card);
                $('#PriorizaçãoCliente').append(cardMedio);
                break;
            
			case "Solucao em andamento":
                
                $('#SolucaoEmAndamento').append(card);
                $('#SolucaoEmAndamento').append(cardMedio);
                break;

			case "Atendido":                
                $('#Atendido').append(card);
                $('#Atendido').append(cardMedio);
                break;
                
			case "Atendido / Sem Resposta do Cliente":
                
                $('#AtendidoSemRespostaDoCliente').append(card);
                $('#AtendidoSemRespostaDoCliente').append(cardMedio);
                break;
                
			case "Atendido (Não Utilizar)":
                
                $('#AtendidoNaoUtilizar').append(card);
                $('#AtendidoNaoUtilizar').append(cardMedio);
                break;
                
			case "Encerrado / Pedido do Cliente":
                
                $('#EncerradoPedidoDoCliente').append(card);
                $('#EncerradoPedidoDoCliente').append(cardMedio);
                break;
                
			case "Encerrado / Implementação Futura":
                
                $('#EncerradoImplementacaoFutura').append(card);
                $('#EncerradoImplementacaoFutura').append(cardMedio);
                break;
                
			case "Encerrado / Falta de Resposta":
                
                $('#EncerradoFaltadeResposta').append(card);
                $('#EncerradoFaltadeResposta').append(cardMedio);
                break;
                
			case "Orçamento não Aprovado":
                
                $('#OrçamentoNaoAprovado').append(card);
                $('#OrçamentoNaoAprovado').append(cardMedio);
                break;
                
			case "Recusado":
                
                $('#Recusado').append(card);
                $('#Recusado').append(cardMedio);
                break;
            
            default:
                
                $('#Recusado').append(card);
                $('#Recusado').append(cardMedio);
                break;
                
		}// switch ($('span',aux8).html()) {

    }//function criaCard
    
    //funcao que faz ancora com scroll lento
    function scrollToAnchor(aid){
        var aTag = $(aid);
        $('html,body').animate({scrollTop: (aTag.offset().top-100)},'slow');
    }
    
    
    //ao clicar no card, quadradinho, marca em amarelo a linha do chamado e desce até ela
    $('.cardA').click(function(){
        scrollToAnchor($(this).attr('ancoraId'));
        
        $('.corporativo_fsgOdd').css('background-color','');
        $('.corporativo_fsgEven').css('background-color','');
        $($(this).attr('ancoraId')).parent().parent().parent().css('background-color','yellow');
    });
    
    //clique no card Medio, marca em amarelo a linha do chamado e desce até ela
    $('.head').click(function(){
        scrollToAnchor($(this).attr('ancoraId'));
        
        $('.corporativo_fsgOdd').css('background-color','');
        $('.corporativo_fsgEven').css('background-color','');
        $($(this).attr('ancoraId')).parent().parent().parent().css('background-color','yellow');
    });
    
    //ao clicar para mostrar card tamanho Mini
    $('.mini').click(function(){
        $('.task').css('visibility','hidden');
        $('.task').css('display','none');
        $('.task').parent().css('min-width','');
        
        $('.cardA').css('visibility','visible');
        $('.cardA').css('display','block');        
    });
    
    //ao clicar para mostrar card tamanho Medio
    $('.medio').click(function(){
       	$('.task').css('visibility','visible');
        $('.task').css('display','block');
        $('.task').parent().css('min-width','305px');
        
        
        $('.cardA').css('visibility','hidden');
        $('.cardA').css('display','none');
    });
                     
    //$('a').css('color','red');
});
