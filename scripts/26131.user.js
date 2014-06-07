// ==UserScript==
// @name        Moderação Programação Computação Brasil
// @namespace    user
// @description    Ferramentas para moderação da comunidade Programação/Computação Brasil
// @include   http://www.orkut.com/CommMsgs.aspx?cmm=70567&tid=* 
// @include   http://www.orkut.com/CommMsgPost.aspx?cmm=70567&tid=2528359597612954957* 
// ==/UserScript==
// Modificação de um script do Diogo para a comunidade Programação/Computação Brasil
// Script original: http://userscripts.org/scripts/show/7656 

// XPath para ítens do tópico
const PathTituloTopico  = "//h1";
const PathLinkAutorTopico = "//h3[@class='smller']//a"
const PathLinkExclusaoTopico = "//div[@class='parabtns']//form";

// XPath para ítens das mensagens
const PathMensagens = "//div[@class='listitem']";
const PathMensagem = "div[@class='para']";
const PathLinkAutorMensagem = "h3[@class='smller']//a";
const PathLinkExclusaoMensagem = "div[@class='rfdte']//form";

// XPath da resposta
const PathCaixaMensagem = "//textarea[@id='messageBody']";

// Urls utilizadas
const UrlTopico = "http://www.orkut.com/CommMsgs.aspx?cmm=70567&tid=";
const UrlPostarLog = "http://www.orkut.com/CommMsgPost.aspx?cmm=70567&tid=2528359597612954957";

// ERs para identificar id do autor e do tópico
const PadraoIdAutor = /(\d+)$/;
const PadraoIdTopico = /tid=(\d+)/;

const ModeloExclusaoTopico = "[b]Exclusão de tópico[/b]\n" +
"[b]Tópico:[/b] $0$\n" +
"[b]Autor:[/b] $1$ ([link]http://www.orkut.com/Profile.aspx?uid=$2$[/link])\n" +
"[b]Ação: [/b]tópico excluído\n" +
"[b]Motivo: [/b]\n" +
"[b]Mensagem:[/b] [i][/i]";

const ModeloExclusaoMensagem = "[b]Exclusão de mensagem em tópico[/b]\n" +
"[b]Tópico: [/b]$0$ ([link]"+UrlTopico+"$1$[/link])\n" +
"[b]Autor: [/b] $2$([link]http://www.orkut.com/Profile.aspx?uid=$3$[/link])\n" +
"[b]Ação: [/b]mensagem excluída\n" +
"[b]Motivo: [/b]\n" +
"[b]Mensagem: [/b] [i][/i]\n" +
"[b]Observação: [/b] apenas a mensagem em questão foi excluída. O tópico não foi apagado.\n";

function xpath(expr, contexto, varios) {
	contexto = contexto || document;
	var type = varios ?
		XPathResult.ORDERED_NODE_ITERATOR_TYPE :
		XPathResult.FIRST_ORDERED_NODE_TYPE;
	var result = document.evaluate(expr, contexto, null, type, null);
	return varios ? result : result.singleNodeValue;
}

function insereAntes(novo, referencia) {
	referencia.parentNode.insertBefore(novo, referencia);
}

function insereDepois(novo, referencia) {
	referencia.parentNode.insertBefore(novo, referencia.nextSibling);
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
	novoLink.href = UrlPostarLog + "#" + dadosUrl;
	novoLink.target = "_blank";
	return novoLink;
}

function criaLinkExcluirMensagem(post) {
	var tituloTopico = xpath(PathTituloTopico).innerHTML;
	var idTopico = urlAtual.match(PadraoIdTopico)[1]
	var linkAutor = xpath(PathLinkAutorMensagem, post);
	var nomeAutor = linkAutor.innerHTML;
	var idAutor = linkAutor.href.match(PadraoIdAutor)[0];
	var dadosUrl = [escape(tituloTopico), idTopico, escape(nomeAutor), idAutor].join();
	
	var novoLink = document.createElement("a");
	novoLink.innerHTML = "Log - Excluir Mensagem";
	novoLink.style.fontSize = "smaller";
	novoLink.style.display = "block";
	novoLink.style.textAlign = "right";
	novoLink.style.lineHeight = "250%";
	novoLink.href = UrlPostarLog + "#" + dadosUrl;
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

var urlAtual = window.location.href;

if (urlAtual.indexOf(UrlTopico) == 0) {
	insereLinkGerenciaTopico();
	insereLinksGerenciaMensagem();
} else if (urlAtual.indexOf(UrlPostarLog) == 0) {
	insereFerramentaModelo();
}
