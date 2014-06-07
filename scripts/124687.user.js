// ==UserScript==
// @name           myDX_BR
// @namespace      http://stackoverflow.com/users/982924/rasg
// @author         RASG
// @version        2012.06.14
// @description    [EN] DealExtreme script to check the tracking number on the brazilian post office. [PT] Script para o DealExtreme que mostra o rastreio da encomenda direto na pagina, sem precisar ir no site do correio. 
// @require        http://code.jquery.com/jquery.min.js
// @include        http://my.dealextreme.com/*
// @include        https://my.dx.com/*
// @exclude        http://my.dealextreme.com/MyOrders/OrderDetail/*
// @exclude        https://my.dx.com/MyOrders/OrderDetail/*
// ==/UserScript==

/*  
    ----------------------------------------------------------------------------
    METODO DE CARREGAMENTO DO JQUERY (metodo_JQ):
    
    1 = usar o @require do greasemonkey
    2 = carregar o script de jquery.com e inserir na pagina
    
    Tente usar primeiro o metodo padrao (1) que e mais rapido
    Caso o script nao funcione, altere para (2)
    Se ainda assim nao funcionar, informe na pagina do script em userscripts.org
    ----------------------------------------------------------------------------
*/

metodo_JQ(1);

// wait until the DOM is ready
//$(function(){

// wait until the page is actually loaded
$(window).load(function(){
    
    var correio = "http://websro.correios.com.br/sro_bin/txect01$.Inexistente?P_LINGUA=001&P_TIPO=002&P_COD_LIS=";
    var dealext = "http://my.dealextreme.com/MyOrders/OrderTracking/";
    var dxptcom = "https://my.dx.com/MyOrders/OrderTracking/";
    var legacys = "http://www.dealextreme.com/accounts/summaries.dx/OrderNumber.";
    var iconeco = "data:image/gif;base64,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%3D%3D";
    var iconelo = "data:image/gif;base64,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";    
    
   	if (window.location.href.indexOf('my.dx.com') > -1) { 
   		$('.mac_orderbox').append("<div id='divdetalhe'></div>");
   		$('.myorders').append("<div id='divdetalhe'></div>");
   		$('.order_table tr').each(function(){
	        $(this)
	            .find('td:first')
	            .css({'textAlign':'left'})
	            .prepend("<img id='botao_new' src="+iconeco+" style='vertical-align:middle; border:3px solid transparent'>")
	    })
	    dealext = dxptcom;
   	}    

    $("<div id='divtempora'></div>").appendTo('body');	
    $("<div id='divdetalhe'></div>").prependTo('.orders_page:first').hide();
    $("<div id='divcorreio'></div>").appendTo('#divdetalhe');
   	
    $('.orders_middle_kuang:first tr').each(function(){
        $(this)
            .find('td:first')
            .css({'textAlign':'left'})
            .prepend("<img id='botao_new' src="+iconeco+" style='vertical-align:middle; border:3px solid transparent'>")
    })
    $('.orders_middle_kuang:eq(1) tr').each(function(){
        $(this)
            .find('td:first')
            .css({'textAlign':'left'})
            .prepend("<img id='botao_legacy' src="+iconeco+" style='vertical-align:middle; border:3px solid transparent'>")
    })

    $('body')
        .on("click", "#botao_new", function() {
            $(this).animate({opacity : 0.25}, 'slow');
           	$('#divcorreio').html("<img src="+iconelo+">")
            var ordem = $.trim( $(this).next('a').text() )
            $('#divdetalhe').css({'text-align':'center'}).show()
            $('#divtempora').load(dealext+ordem, function() {
                $('#divtempora tr').each(function(){
                    var celula = $(this).find('td').eq(2) 
                    var rastreio = $.trim( $(celula).text() )
                    if ( (rastreio.substr(rastreio.length - 2) == "HK") || (rastreio.substr(rastreio.length - 2) == "CN") ) {
                        conectar('GET', correio+rastreio, resp_correio)	
                    }
                    else { $('#divcorreio').html("") }
                })
            })
            $(this).animate({opacity : 100}, 'slow');
        })
        .on("click", "#botao_legacy", function() {
            $(this).animate({opacity : 0.25}, 'slow');
            $('#divcorreio').html("<img src="+iconelo+">")
            var ordem = $.trim( $(this).next('a').text() )
            $('#divdetalhe').css({'text-align':'center'}).show()
            conectar('GET', legacys+ordem, resp_dxlegacy)
            $(this).animate({opacity : 100}, 'slow');
        })


    function conectar(metodo, endereco, resposta, corpo) {
        callback = function(xhr) { resposta(xhr) };
        GM_xmlhttpRequest({
            "method"	: metodo,
            "url"		: endereco,
            "onerror"	: callback,
            "onload"	: callback,
            "headers"	: {'Content-Type' : 'application/x-www-form-urlencoded'},
            "data"		: corpo
        });
    }

    function resp_dxlegacy(detalhes) {
        var inicio = '>Tracked Air Mail</span><br />';
        var fim = '</span>';
        $('#divtempora').html(detalhes.responseText.split(inicio)[1].split(fim)[0])
        var rastreio = $.trim( $('#divtempora').text() )
        if ( (rastreio.substr(rastreio.length - 2) == "HK") || (rastreio.substr(rastreio.length - 2) == "CN") ) { 
            conectar('GET', correio+rastreio, resp_correio)	
        }
    }

    function resp_correio(detalhes) {
        var inicio = 'entrega.<p>';
        var fim = '<hr width=500';
        $('#divcorreio')
            .html(detalhes.responseText.split(inicio)[1].split(fim)[0])
            .css({'display':'inline-block','background':'#FAFAED'})
    }

});

function metodo_JQ(metodo){
    JQ      	= "http://code.jquery.com/jquery.js";
    JQmin   	= "http://code.jquery.com/jquery.min.js";
    
    if (metodo == 2) {
        var script = document.createElement('script');
            script.src = JQmin;
        var head = document.getElementsByTagName("head")[0];
            (head || document.body).appendChild(script);
    };
};