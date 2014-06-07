// Modificação de um script do Diogo para a comunidade Clube Náutico Capibaribe. Script original: http://userscripts.org/scripts/show/7656 
// Modificado por Pedro Camplelo Cavalcanti
// Versão 0.0.1

/*
 *   Para gerar o log de exclusão de tópico é necessário estar 
 *   na primeira página do tópico (para pegar autor)
 *   Caso o autor do tópico tenha apagado a postagem o script pegará
 *    o próximo usuário que postou (por não haver informação do autor)
 *    Gera a entrada dos usuários banidos
 *
 * Para alterar o script deve-se:
 *
 * - Alterar o cmm e tid dos @includes e das constantes Url*
 * - Alterar o texto utilizando as marcações $$ conforme está no comentário
 *
 * Funcionalidades implementadas:
 *
 * - Remove os botões de excluir tópico da tela de listagem dos tópicos (evita excluir tópicos acidentalmente e sem postar no log)
 * - Insere link para postar log de exclusão de mensagem e de tópico, enviando diretamente à tela de responder no tópico log e com vários ítens preenchidos
 * - Remove o botão excluir tópico do tópico de logs (evita excluir o tópico acidentalmente)
 */

// ==UserScript==
// @name		Moderação Comunidade Clube Náutico Capibaribe
// @namespace	http://userscripts.org/scripts/show/13366
// @description	Ferramenta para moderação da Comunidade Clube Náutico Capibaribe
// @include	http://www.orkut*/CommTopics.aspx?cmm=57353*
// @include	http://www.orkut*/CommMsgs.aspx?cmm=57353*
// @include	http://www.orkut*/CommMsgPost.aspx?cmm=21210471&tid=5303103464494032269*
// @include	http://www.orkut*/CommMsgPost.aspx?cmm=21210471&tid=5311570438467315085*

// ==/UserScript==

// URLs utilizadas para definir as ações e auxiliar na composição dos links
const UrlComm         = "CommTopics.aspx?cmm=57353";                          	    // Url da comunidade
const UrlTopico       = "CommMsgs.aspx?cmm=57353";                                  // Url do tópico atual
const UrlLog          = "CommMsgs.aspx?cmm=21210471&tid=5303103464494032269";       // Url do tópico de log Tópicos Excluidos
const UrlLogBan       = "CommMsgs.aspx?cmm=21210471&tid=5311570438467315085";       // Url do tópico de log Banidos
const UrlPostarLog    = "CommMsgPost.aspx?cmm=21210471&tid=5303103464494032269";    // Url de responder o tópico de log Tópicos Excluidos
const UrlPostarLogBan = "CommMsgPost.aspx?cmm=21210471&tid=5311570438467315085";    // Url de responder o tópico de log Banidos

/*
 * $0$ -> título do tópico
 * $1$ -> nome do autor do tópico
 * $2$ -> id do autor do tópico
 */
const ModeloExclusaoTopico = "[b]Tópico:[/b] $0$\n" +
"[b]Autor:[/b] $1$ ([link]/Profile.aspx?uid=$2$[/link])\n" +
"[b]Ação: [/b]tópico excluído\n" +
"[b]Motivo: [/b]\n" +
"[b]Mensagem:[/b] [i][/i]";

/*
 * $0$ -> título do tópico
 * $1$ -> url do tópico
 * $2$ -> nome do autor do mensagem
 * $3$ -> id do autor da mensagem
 */
const ModeloExclusaoMensagem = "[b]Tópico: [/b]$0$ \n" +
"[b]Autor:[/b] $2$ ([link]/CommMemberManage.aspx?cmm=57353&uid=$3$[/link])\n" +
"[b]Pena:[/b]  \n" + 
"[b]Motivo:[/b]  \n" +
"[b]Observação:[/b] Leia as regras da comunidade ([link]/CommMsgs.aspx?cmm=21210471&tid=5218370172130125197&start=1[/link])\n";

// XPath para itens do tópico
const PathTituloTopico  = "//h1";
const PathLinkAutorTopico = "//h3[@class='smller']//a[last()-1]"
const PathLinkExclusaoTopico = "//div[@class='parabtns']//form[last()]";

// XPath para itens das mensagens
const PathMensagens = "//div[@class='listitem']";
const PathMensagem = "div[@class='para']";
const PathLinkAutorMensagem = "h3[@class='smller']//a[last()-1]";
const PathLinkExclusaoMensagem = "div[@class='rfdte']//form";

// XPath da resposta
const PathCaixaMensagem = "//textarea[@id='messageBody']";

// XPath dos botões excluir
const PathTHExcluir = "//table[@class='displaytable']//th[last()]";
const PathTDExcluir = "//table[@class='displaytable']//td[last()]";

// ERs para identificar id do autor e do tópico
const PadraoIdAutor = /(\d+)$/;
const PadraoIdTopico = /tid=(\d+)/;

function xpath(expr, contexto, varios)
{
	contexto = contexto || document;
	var type = varios ?
		XPathResult.ORDERED_NODE_ITERATOR_TYPE :
		XPathResult.FIRST_ORDERED_NODE_TYPE;
	var result = document.evaluate(expr, contexto, null, type, null);
	return varios ? result : result.singleNodeValue;
}

function insereAntes(novo, referencia) {
	if (!novo || !referencia) {
		return;
	}
	referencia.parentNode.insertBefore(novo, referencia);
}

function insereDepois(novo, referencia) {
	if (!novo || !referencia) {
		return;
	}
	referencia.parentNode.insertBefore(novo, referencia.nextSibling);
}

function remove(elemento) {
	if (!elemento) {
		return;
	}
	elemento.parentNode.removeChild(elemento);
}

function criaLinkExcluirTopico()
{
	var titulo = xpath(PathTituloTopico).innerHTML;
	var linkAutor = xpath(PathLinkAutorTopico);
	var nomeAutor = linkAutor.innerHTML;
	var idAutor = linkAutor.href.match(PadraoIdAutor)[0];
	var dadosUrl = [escape(titulo), escape(nomeAutor), idAutor].join();
	
	var novoLink = document.createElement("a");
	novoLink.innerHTML = "Log - Excluir Tópico";
	novoLink.style.fontSize = "smaller";
	novoLink.style.lineHeight = "250%";
	novoLink.href = "/"+UrlPostarLog + "#" + dadosUrl;
	novoLink.target = "_blank";
	return novoLink;
}

function criaLinkExcluirMensagem(post) {
	var tituloTopico = xpath(PathTituloTopico).innerHTML;
	var idTopico = urlAtual.match(PadraoIdTopico)[1]
	var linkAutor = xpath(PathLinkAutorMensagem, post);
	var nomeAutor;
	var idAutor;
	
	if (!linkAutor) {
		nomeAutor = "Anônimo";
		idAutor = 0;
	} else {
		nomeAutor = linkAutor.innerHTML;
		idAutor = linkAutor.href.match(PadraoIdAutor)[0];
	}
	var dadosUrl = [escape(tituloTopico), idTopico, escape(nomeAutor), idAutor].join();
	
	var novoLink = document.createElement("a");
	novoLink.innerHTML = "Log - Banir Usuário";
	novoLink.style.fontSize = "smaller";
	novoLink.style.display = "block";
	novoLink.style.textAlign = "right";
	novoLink.style.lineHeight = "250%";
	novoLink.href = "/"+UrlPostarLogBan + "#" + dadosUrl;
	novoLink.target = "_blank";
	return novoLink;
}

function insereLinkGerenciaTopico() {
	var linhaLink = xpath(PathLinkExclusaoTopico);
	if (!linhaLink) return;
	insereDepois(criaLinkExcluirTopico(), linhaLink);
}

function insereLinksGerenciaMensagem() {
	var iterator = xpath(PathMensagens, null, true);
	if (!iterator) return;
	
	var posts = new Array();
	var post = iterator.iterateNext();
	
	while (post) {
		posts.push(post);
		post = iterator.iterateNext();
	}
	
	for (var i = 0; i < posts.length; ++i) {
		insereDepois(criaLinkExcluirMensagem(posts[i]), xpath(PathLinkExclusaoMensagem, posts[i]));
	}
	
}

function insereFerramentaModelo() {
	var caixaMensagem = xpath(PathCaixaMensagem);
	if (!caixaMensagem || caixaMensagem.value.length) return;
	
	var dadosUrl = window.location.href.replace(/[^#]+#/, "").split(",");
	
	if (dadosUrl.length == 3) {
		insereExclusaoTopico(caixaMensagem, dadosUrl);
	} else if (dadosUrl.length == 4) {
		insereExclusaoMensagem(caixaMensagem, dadosUrl);
	}
}

function insereExclusaoTopico(caixaMensagem, dados) {
	var texto = ModeloExclusaoTopico.replace(/[$][^$]+[$]/g, function(substr) {
						var indice = parseInt(substr.replace(/[$]/g, ""));
						var substituicao = ""; 
						var valor = dados[indice];
						if (valor) substituicao = unescape(valor);
						return substituicao;
					}
				);
	caixaMensagem.value = texto;
}

function insereExclusaoMensagem(caixaMensagem, dados) {
	var texto = ModeloExclusaoMensagem.replace(/[$][^$]+[$]/g, function(substr) {
			var indice = parseInt(substr.replace(/[$]/g, ""));
			var substituicao = "";
			var valor = dados[indice];
			if (valor) substituicao = unescape(valor);
			return substituicao;
		}
	);
	caixaMensagem.value = texto;
}

function removeBotaoExcluir() {
	var el = xpath(PathLinkExclusaoTopico);
	remove(el);
}

function removeBotoesExcluir() {
	var th = xpath(PathTHExcluir);
	remove(th);
	
	var iterator = xpath(PathTDExcluir, null, true);
	if (!iterator) return;
	
	var botoes = new Array();
	var botao = iterator.iterateNext();
	
	while (botao) {
		botoes.push(botao);
		botao = iterator.iterateNext();
	}
	for (var i = 0; i < botoes.length; ++i) {
		remove(botoes[i]);
	}
}

var urlAtual = window.location.href;

if (urlAtual.indexOf(UrlComm, 19) != -1) {
	removeBotoesExcluir();
} else if (urlAtual.indexOf(UrlPostarLog, 19) != -1) {
	insereFerramentaModelo();
} else if (urlAtual.indexOf(UrlLog, 19) != -1) {
	insereLinksGerenciaMensagem();
	removeBotaoExcluir();
} else if (urlAtual.indexOf(UrlPostarLogBan, 19) != -1) {
	insereFerramentaModelo();
} else if (urlAtual.indexOf(UrlLogBan, 19) != -1) {
	insereLinksGerenciaMensagem();
	removeBotaoExcluir();
} else if (urlAtual.indexOf(UrlTopico, 19) != -1) {
	insereLinkGerenciaTopico();
	insereLinksGerenciaMensagem();
}