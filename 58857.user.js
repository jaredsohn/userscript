// ==UserScript==
// @name          PTWestScript - BBCode para Fórum da Cidade
// @namespace     Igo
// @description   Conjunto de Botões para utlizar, mais facilmente, o BBCode nos fóruns internos das cidades
// @include       http://*.the-west.*/*
// @include       http://zz1w1.tw.innogames.net/game.php*
// ==/UserScript==

// Este Script é uma modificação do Script "The West BBCode RUS" criado por Evgenatrix (http://userscripts.org/scripts/show/57369) //
      
      
    var TW_Use_Cache  = true;
    var TW_Image_Base = "/graphic/";
    var TW_World      = null;
    var TWT_World     = null;
    var TW_Domain     = null;
    var TW_DotWhat    = null;
    var TW_Hash       = null;
    var TW_Screen     = null;
    var TW_Mode       = null;
    var TW_Is_Premium = false;
    var TW_Quickbar   = null;
    var TW_Village_Id = null;
    var TW_Player_Id  = null;
    var TW_Villages   = null;
    var TW_Lang       = null;
    var TW_Mpt        = null;
    var TW_Is_Opera   = window.opera ? true : false;
      
    (function(){

		if (location.href.match( /forum\.php/ )) {
      		CambiaForo();
      		return;
      	}
      })();

      function CambiaForo() {
      	
      	var adframes = $$("iframe");
      	for (i = 0; i < adframes.length; i++) {
      		adframes[i].src = 'about:blank';
      	}
      	var posts = $$("div");
      	for (i = 0; i < posts.length; i++) {
      		if (posts[i].innerHTML.match(/<iframe/,"gi") != null) {
      			posts[i].style.display = "none";
      		}
      	}
      	
      	CambiaCuadroTexto();
      }
      
      function CambiaCuadroTexto() {
      
      	var body = $$("body");
      
      	var random = new Date;
      	random = random.getTime();
      
      	var xhtml = "<table border=\"1\"> " +
      		    "<tr>    " +
      		    '	<td><a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="http://west.igopt.com/images/jogador.png" alt="Jogador" title="Inserir Tags [player][/player]" /></a></td>' +
      		    '	<td><a tabindex="11" href="javascript:insertBB(\'town\','+random+');"><img src="http://west.igopt.com/images/cidade.png" alt="Cidade" title="Inserir Tags [town][/town]" /></a></td>' +
      		      '	<td><a tabindex="12" href="javascript:insertBB(\'fort\','+random+');"><img src="http://west.igopt.com/images/forte.png" alt="Forte" title="Inserir Tags [fort][/fort]" /></a></td>' +
      		    '	<td><a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://west.igopt.com/images/negrito.png" alt="Negrito" title="Inserir Tags [b][/b]" /></a></td>' +
      		    '	<td><a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://west.igopt.com/images/italico.png" alt="Itálico" title="Inserir Tags [i][/i]" /></a></td>' +
      		    '	<td><a tabindex="15" href="javascript:insertBB(\'u\','+random+');"><img src="http://west.igopt.com/images/sublinhado.png" alt="Sublinhado" title="Inserir Tags [u][/u]" /></a></td>' +
      		     '	<td><a tabindex="16" href="javascript:insertBB(\'del\','+random+');"><img src="http://west.igopt.com/images/restaurado.png" alt="Restaurado" title="Inserir Tags [del][/del]" /></a></td>' +
      		    '	<td><a tabindex="17" href="javascript:insertBB(\'quote\','+random+');"><img src="http://west.igopt.com/images/citacao.jpg" alt="Citação" title="Inserir Tags [quote][/quote]" /></a></td>' +
      		    '	<td><a tabindex="18" href="javascript:insertBB(\'url\','+random+');"><img src="http://west.igopt.com/images/link.png" alt="Link"  title="Inserir Tags [url][/url]" /></a></td>' +
      		    '	<td><a tabindex="19" href="javascript:insertBB(\'img\','+random+');"><img src="http://west.igopt.com/images/imagem.png" alt="Imagem" title="Inserir Tags [img][/img]" /></a></td>' +
		    '	<td><a tabindex="20" href="javascript:insertBB(\'large text\','+random+');"><img src="http://west.igopt.com/images/aumentar.jpg" alt="Aumentar Texto" title="Inserir Tags [size][/size]" /></a></td>' +
		    '	<td><a tabindex="21" href="javascript:insertBB(\'small_text\','+random+');"><img src="http://west.igopt.com/images/diminuir.jpg" alt="Diminuir Texto" title="Inserir Tags [size][/size]" /></a></td>' +


'	<td><a tabindex="25" href="javascript:insertBB(\'code\','+random+');"><img src="http://west.igopt.com/images/codigo.jpg" alt="Codigo" title="Inserir Tags [code][/code]" /></a></td>' +
		    
		    
		    '	<td><a tabindex="26" href="javascript:insertBB(\'white text\','+random+');"><img src="http://west.igopt.com/images/branco.png" alt="Branco" title="Alterar a cor do texto para branco" /></a></td>' +
		    '	<td><a tabindex="28" href="javascript:insertBB(\'red text\','+random+');"><img src="http://west.igopt.com/images/vermelho.png" alt="Vermelho" title="Alterar a cor do texto para vermelho" /></a></td>' +	
		    '	<td><a tabindex="29" href="javascript:insertBB(\'yellow text\','+random+');"><img src="http://west.igopt.com/images/amarelo.png" alt="Amarelo" title="Alterar a cor do texto para amarelo" /></a></td>' +
		    '	<td><a tabindex="30" href="javascript:insertBB(\'green text\','+random+');"><img src="http://west.igopt.com/images/verde.png" alt="Verde" title="Alterar a cor do texto para verde" /></a></td>' +
		    '	<td><a tabindex="32" href="javascript:insertBB(\'blue text\','+random+');"><img src="http://west.igopt.com/images/azul.png" alt="Azul" title="Alterar a cor do texto para azul" /></a></td>' +
      		    "</tr>   " +
                    '	<td><a tabindex="34" href="javascript:insertBB(\'smily1\','+random+');"><img src="http://west.igopt.com/images/icon1.gif" /></a></td>' +
                    '	<td><a tabindex="35" href="javascript:insertBB(\'smily2\','+random+');"><img src="http://west.igopt.com/images/icon2.gif" /></a></td>' +
                    '	<td><a tabindex="36" href="javascript:insertBB(\'smily3\','+random+');"><img src="http://west.igopt.com/images/icon3.gif" /></a></td>' +
                    '	<td><a tabindex="37" href="javascript:insertBB(\'smily4\','+random+');"><img src="http://west.igopt.com/images/icon4.gif" /></a></td>' +
                    '	<td><a tabindex="38" href="javascript:insertBB(\'smily5\','+random+');"><img src="http://west.igopt.com/images/icon5.gif" /></a></td>' +
		    '	<td><a tabindex="39" href="javascript:insertBB(\'smily6\','+random+');"><img src="http://west.igopt.com/images/icon6.gif" /></a></td>' +
                    '	<td><a tabindex="40" href="javascript:insertBB(\'smily7\','+random+');"><img src="http://west.igopt.com/images/icon7.gif" /></a></td>' +
                    '	<td><a tabindex="41" href="javascript:insertBB(\'smily8\','+random+');"><img src="http://west.igopt.com/images/icon8.gif" /></a></td>' +
                    '	<td><a tabindex="42" href="javascript:insertBB(\'smily9\','+random+');"><img src="http://west.igopt.com/images/icon9.gif" /></a></td>' +
                    '	<td><a tabindex="43" href="javascript:insertBB(\'smily10\','+random+');"><img src="http://west.igopt.com/images/icon10.gif" /></a></td>' +
		    '	<td><a tabindex="44" href="javascript:insertBB(\'smily11\','+random+');"><img src="http://west.igopt.com/images/icon11.gif" /></a></td>' +
		    "</tr>   " +
      		    "</table>";
      
		caixa_de_texto = "txt_"+random;
      	document.body.innerHTML = document.body.innerHTML.replace( /<textarea\s/gi, xhtml+"<textarea id=\""+caixa_de_texto+"\" ");
      	
      	NuevaFuncionTW("insertBB", function(insertType, ident){
      
      			txt = document.getElementById("txt_"+ident);
      
      			var start = txt.selectionStart;
      			var end   = txt.selectionEnd;
      			var txtlength = 0;
      			var insertButton = '';
      			var txtinsertBefore = '';
      			var txtinsertAfter = '';
      			var selection = '';
      			var selectionBefore = '';
      			var selectionAfter = '';
      
      			switch (insertType) {
      				case 'player':
      					txtinsertBefore = "[player]";
      					txtinsertAfter = "[/player]";
      					insertButton = 'P';
						document.getElementById(caixa_de_texto).focus();
      					break;
      				case 'town':
      					txtinsertBefore = "[town]";
      					txtinsertAfter = "[/town]";
      					insertButton = 'A';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'fort':
							txtinsertBefore = "[fort]";
							txtinsertAfter = "[/fort]";
							insertButton = 'F';
						document.getElementById(caixa_de_texto).focus();
							break;
					case 'b':
      					txtinsertBefore = "[b]";
      					txtinsertAfter = "[/b]";
      					insertButton = 'B';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'i':
      					txtinsertBefore = "[i]";
      					txtinsertAfter = "[/i]";
      					insertButton = 'I';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'u':
      					txtinsertBefore = "[u]";
      					txtinsertAfter = "[/u]";
      					insertButton = 'U';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'del':
      					txtinsertBefore = "[del]";
      					txtinsertAfter = "[/del]";
      					insertButton = 'del';
						document.getElementById(caixa_de_texto).focus();
      					break;
      				case 'quote':
      					txtinsertBefore = "[quote]";
      					txtinsertAfter = "[/quote]";
      					insertButton = 'Q';
						document.getElementById(caixa_de_texto).focus();
      					break;
      				case 'url':
      					txtinsertBefore = "[url]";
      					txtinsertAfter = "[/url]";
      					insertButton = 'L';
						document.getElementById(caixa_de_texto).focus();
      					break;
      				case 'img':
      					txtinsertBefore = "[img]";
      					txtinsertAfter = "[/img]";
      					insertButton = 'M';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'large text':
      					txtinsertBefore = "[size=20]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'R';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'small_text':
      					txtinsertBefore = "[size=8]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'Small';
						document.getElementById(caixa_de_texto).focus();
      					break;      				
      				case 'code':
      					txtinsertBefore = " [b][CODE][/b] [code]";
      					txtinsertAfter = "[/code]";
      					insertButton = 'code';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'smily1':
      					txtinsertBefore = "[img]http://west.igopt.com/images/icon1.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '1';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'smily2':
      					txtinsertBefore = "[img]http://west.igopt.com/images/icon2.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '2';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'smily3':
      					txtinsertBefore = "[img]http://west.igopt.com/images/icon3.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '3';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'smily4':
      					txtinsertBefore = "[img]http://west.igopt.com/images/icon4.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '4';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'smily5':
      					txtinsertBefore = "[img]http://west.igopt.com/images/icon5.gif";
       					txtinsertAfter = "[/img]";
      					insertButton = '5';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'smily6':
      					txtinsertBefore = "[img]http://west.igopt.com/images/icon6.gif";
       					txtinsertAfter = "[/img]";
      					insertButton = '6';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'smily7':
      					txtinsertBefore = "[img]http://west.igopt.com/images/icon7.gif";
       					txtinsertAfter = "[/img]";
      					insertButton = '7';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'smily8':
      					txtinsertBefore = "[img]http://west.igopt.com/images/icon8.gif";
       					txtinsertAfter = "[/img]";
      					insertButton = '8';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'smily9':
      					txtinsertBefore = "[img]http://west.igopt.com/images/icon9.gif";
       					txtinsertAfter = "[/img]";
      					insertButton = '9';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'smily10':
      					txtinsertBefore = "[img]http://west.igopt.com/images/icon10.gif";
       					txtinsertAfter = "[/img]";
      					insertButton = '10';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'smily11':
      					txtinsertBefore = "[img]http://west.igopt.com/images/icon11.gif";
       					txtinsertAfter = "[/img]";
      					insertButton = '11';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'white text':
      					txtinsertBefore = "[color=white]";
      					txtinsertAfter = "[/color]";
      					insertButton = '32';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'red text':
      					txtinsertBefore = "[color=red]";
      					txtinsertAfter = "[/color]";
      					insertButton = '33';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'yellow text':
      					txtinsertBefore = "[color=yellow]";
      					txtinsertAfter = "[/color]";
      					insertButton = '34';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'green text':
      					txtinsertBefore = "[color=green]";
      					txtinsertAfter = "[/color]";
      					insertButton = '35';
						document.getElementById(caixa_de_texto).focus();
      					break;
					case 'blue text':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = '37';
						document.getElementById(caixa_de_texto).focus();
      					break;
				}
      
      			if (start == end) {
      					txt.value = txt.value.substr(0, start) + txtinsertBefore + txtinsertAfter + txt.value.substr(end, txt.value.length);
      				} else {
      					txtlength = txt.value.length;
      					selection = txt.value.substr(start, (end - start));
      					selectionBefore = txt.value.substr(0, start);
      					selectionAfter = txt.value.substr(end, txtlength);
      
      					if (insertButton == 'V' && selection.match(/(\d+){3}([\/|]+){1}(\d+){3}/gi)) {
      						selection = selection.replace(/(.*)(\d+)(\d+)(\d+)([\/|]+){1}(\d+)(\d+)(\d+)(.*)/gi, "$2$3$4|$6$7$8");
      					}
      
      					txt.value = selectionBefore + txtinsertBefore + selection + txtinsertAfter + selectionAfter;
      					
      				}
      		});
      
      	
      }  
      
      
      // ======== Funciones necesarias ========
      
      // Atajos DOM
      function $(elm_id){
      	return document.getElementById(elm_id);
      }
      
      function $$(tag_name){
      	return document.getElementsByTagName(tag_name);
      }  
      
      function NuevaFuncionTW(func, new_func){
      
    	if(typeof unsafeWindow == "object"){
      		unsafeWindow[func] = new_func;
      	}else if(TW_Is_Opera){
      		window[func] = new_func;
      		/*
      		window.opera.defineMagicFunction(
      			func,
      			function(oRealFunc, oThis, oParam1, oParam2){
      				return oParam1.getElementById('oParam2').style;
      			}
      		);
      		*/
      	}
      }