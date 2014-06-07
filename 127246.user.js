// ==UserScript==
// @name           StartSelect Plus
// @namespace      http://www.startselect.com.br/forum
// @description    Mods variados para o fórum
// @include        http://www.startselect.com.br/*
// @include        http://startselect.com.br/*
// ==/UserScript==

//========================= CONFIGURAÇÃO DE IGNORE ============================//
/* "true" para habilitar, "false" para desabilitar							   */
var ignorar_posts = true;
var ignorar_quotes = true;
var ignorar_topicos = true;
//=============================================================================//

//=====================LISTA DE USUÁRIOS A SEREM IGNORADOS=====================//
/* Colocar o nome dos users entre aspas simples, separados por vírgula */
var usr_ignore = new Array();
//=============================================================================//

//===================LISTA DE USUÁRIOS COM POSTS TROCADOS======================//
/* Inserir os nomes da mesma forma da lista de ignorados. Na variável "posts", 
 * definir os textos que serão inseridos no lugar do post, respeitando a ordem *
 * que está na variável usr_post											   */
var usr_post = new Array();
var posts = new Array();
//=============================================================================//

//======================LISTA DE USUÁRIOS COM TROCA DE NICK====================//
/*	Inserir os nomes da mesma forma da lista de posts trocados   			   */
var usr_nick = new Array();
var nicks = new Array();
//=============================================================================//

//==================LISTA DE USUÁRIOS COM AVATARES TROCADOS====================//
/* Inserir as informações da mesma forma que nas listas anteriores. Na variá-  *
 * vel "avatares_urls", informar o endereço das imagens						   */
var usr_avatar = new Array();
var avatares_urls = new Array();
//=============================================================================//

// ******************** NÃO MEXA EM NADA ABAIXO DESTA LINHA, CACETE **************************// 
//--------------------------------------------------------------------------------------------//
var tabelas = document.getElementsByClassName('ipbtable');

if(usr_ignore.length > 0) {

	for (var i = tabelas.length - 1; i >= 0; i--) {
		
		var tabela = tabelas[i];
		var html_tabela = tabela.innerHTML;
		
		if(ignorar_posts) {
		
			if(html_tabela.indexOf('Begin Topic Entry') < 0) {
		
				for(var j = 0; j < usr_ignore.length; j++) {
				
					if(html_tabela.indexOf('">' + usr_ignore[j] + '</a></span>') >= 0) {	
						if(html_tabela.indexOf('">' + usr_ignore[j] + '</a></span></td>') == -1) {				
							tabela.style.display = 'none';
						}
						
						
					}
				
				}
			 
			}
			
		}
		
		//IGNORA QUOTES
		if(ignorar_quotes) {
		
			var quotes = tabela.getElementsByClassName('quotetop');
			
			if (quotes.length > 0) {
			
				for(var j = 0; j < usr_ignore.length; j++) {
			
					for(var h = 0; h < quotes.length; h++) {
					
						var html_quote = quotes[h].innerHTML;
						
						if(html_quote.indexOf('QUOTE(' + usr_ignore[j]) >= 0) {
						
							var parent = quotes[h].parentNode;
							
							while(parent != null) {
								
								if(parent.className == 'signature') {
									break;
								}
								
								parent = parent.parentNode;
								
							}
						
							if(parent == null) {
								tabela.style.display = 'none';
							}
							
						}
					
					}
						
				}
			
			}
		
		}
		
	}

	if(ignorar_topicos) {
	
	var topicos = document.getElementsByTagName('tr');

		for (var i = topicos.length - 1; i >= 0; i--) {

			var topico = topicos[i];
			var html_topico = topico.innerHTML;
			
			for(var j = 0; j < usr_ignore.length; j++) {
			
				if(html_topico.indexOf('">' + usr_ignore[j] + '</a></td>') >= 0) {
				
					topico.style.display = 'none';
				
				}
			
			}

		}
	
	}
	
}

if(usr_post.length > 0) {

	for (var i = tabelas.length - 1; i >= 0; i--) {
		
		var tabela = tabelas[i];
		var html_tabela = tabela.innerHTML;
		
		for(var j = 0; j < usr_post.length; j++) {
		
			if(html_tabela.indexOf('">' + usr_post[j] + '</a></span>') >= 0) {

				var divsPost = tabela.getElementsByClassName('postcolor');
				
				if(divsPost.length > 0) {
					divsPost[0].innerHTML = posts[j];
				}
				
			}
		
		}
		
		//TROCA QUOTES
		var quotes = tabela.getElementsByClassName('quotetop');
		
		if (quotes.length > 0) {		
		
			for(var j = 0; j < usr_post.length; j++) {
			
				for(var h = 0; h < quotes.length; h++) {
		
					var html_quote = quotes[h].innerHTML;
					if(html_quote.indexOf('QUOTE(' + usr_post[j]) >= 0) {
					
						var quoteMain = tabela.getElementsByClassName('quotemain')[h];
						quoteMain.innerHTML = '<!--quotec-->' + posts[j] + '<!--QuoteEnd-->';
					}
				
				}
					
			}
		
		}
		
	}
		
}

if(usr_avatar.length > 0) {

	for (var i = tabelas.length - 1; i >= 0; i--) {
		
		var tabela = tabelas[i];
		var html_tabela = tabela.innerHTML;
		
		for(var j = 0; j < usr_avatar.length; j++) {
		
			if(html_tabela.indexOf('">' + usr_avatar[j] + '</a></span>') >= 0) {

				var avatares = tabela.getElementsByClassName('postdetails');
				if(avatares.length > 0) {
				
					var avatar = avatares[avatares.length - 1];
					var imgs = avatar.getElementsByTagName('img');			
					
					if(imgs.length > 0) {									
						
						var img = imgs[0];
						img.src = avatares_urls[j];
						
					}
					
				}
				
			}
		
		}
		
	}

}

//TROCA O NOME DO USER EM TUDO
for(var j = 0; j < usr_nick.length; j++) {

	var containers = new Array('normalname', 'postcolor', 'row1', 'row2', 'rte-iframe', 'signature');

	var strReplace = new RegExp('\\b' + usr_nick[j] + '\\b', 'gi');
	
	for(var k = 0; k < containers.length; k++){
	
		var container = document.getElementsByClassName(containers[k]);
		
		for(var l = 0; l < container.length; l++) {
			container[l].innerHTML = container[l].innerHTML.replace(strReplace, nicks[j]);			
		}
	
	}
	
	
}

//-------------------------------------------------------------------------------------------//