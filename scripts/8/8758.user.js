// ==UserScript==
// @name           Moderação C/C++ Brasil
// @description    Ferramentas para moderação da comunidade C/C++ Brasil
// @include        http://www.orkut.com/CommMsgs.aspx?cmm=64157*
// @include        http://www.orkut.com/Scrapbook.aspx?uid=*
// ==/UserScript==

// Modificação de um script do Diogo para a comunidade Programação/Computação Brasil
// Script original: http://userscripts.org/scripts/show/7656 


const ModeloMensagem = "[b]Registro de atividade do moderador[/b]\n" +
"[b]Tópico:[/b] $0$\n" +
"[b]Autor:[/b] $1$ ([link]http://www.orkut.com/Profile.aspx?uid=$2$[/link])\n" +
"[b]Ação: [/b]tópico excluído + autor advertido\n" +
"[b]Motivo: [/b]\n" +
"[b]Mensagem:[/b] [i][/i]";

//const ModeloLinkAdvertencia = "http://www.orkut.com/Scrapbook.aspx?uid=$2$#CCPPBRWARN,$0$";

const ModeloAdvertencia = "[b]Advertência do moderador[/b]\n" +
"Um moderador da comunidade C/C++ Brasil excluiu um dos seus tópicos por contrariar nossa política " +
"de conduta. O seguinte foi registrado no log dos moderadores:\n\n" +
"[b]Título do tópico:[/b] $1$\n" +
"[b]Motivo da exclusão: [/b]\n\n" +
"Pedimos que você leia as regras da comunidade antes de voltar a postar:\n" +
"http://tinyurl.com/g66ke\n\n" +
"[b]IMPORTANTE:[/b] não responda esta  mensagem. Caso tenha dúvidas ou reclamações, utilize o log dos moderadores. " +
"É possível que um backup total ou parcial da sua mensagem se encontre no log:\n" +
"http://tinyurl.com/ph992";

const PathLinhaExcluirTopico = "id('community')/tbody/tr/td[3]/table/tbody/tr/td/div[2]/form";
const PathTituloTopico = "id('community')/tbody/tr/td[3]/table/tbody/tr/td/div[1]";
const PathLinkAutorTopico = "id('community')/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr/td[1]/a[2]";
//const PathCaixaMensagem = "id('messageBody')";
const PathCaixaMensagem = "id('scrapText')";
/*const PathSeuTextoTem = '/html/body/table[2]/tbody/tr/td[3]/form[1]/table/tbody/tr[4]/td';*/
const PathParaLinkAdvertencia = "id('scrapInputContainer')/table/tbody/tr[3]/td";


//const UrlPostarTopicoGerenciamento = "http://www.orkut.com/CommMsgPost.aspx?cmm=70567&tid=2502998348303238297";
const UrlPostarTopicoGerenciamento = "http://www.orkut.com/Scrapbook.aspx?uid=3619393288361564198";
//const UrlPostarTopicoGerenciamento = "http://www.orkut.com/CommMsgPost.aspx?cmm=64157&tid=2527827468378970461";
const UrlTopico = "http://www.orkut.com/CommMsgs.aspx?cmm=64157&tid=";
const UrlScrapbook = "http://www.orkut.com/Scrapbook.aspx?uid=";

const PadraoIdAutorTopico = /(\d+)$/;

function elementoXpath(path) {
        return document.evaluate(
                        path,
                        document,
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE,
                        null
                        ).singleNodeValue;
}

function insereAntes(novo, referencia) {
        referencia.parentNode.insertBefore(novo, referencia);
}

function insereDepois(novo, referencia) {
        referencia.parentNode.insertBefore(novo, referencia.nextSibling);
}

function primeiraPaginaTopico() {
        return true;
        //var urlAtual = window.location.href;
        //return PadraoPrimeiraPaginaTopico.test(urlAtual);
}

function criaLinkParaGerenciamento() {
        var tituloTopico = elementoXpath(PathTituloTopico).innerHTML;
        var linkAutorTopico = elementoXpath(PathLinkAutorTopico);
        var nomeAutorTopico = linkAutorTopico.innerHTML;
        var idAutorTopico = linkAutorTopico.href.match(PadraoIdAutorTopico)[0];
        var dadosUrl = [escape(tituloTopico), escape(nomeAutorTopico), idAutorTopico].join();

        var novoLink = document.createElement("A");
        novoLink.innerHTML = "Postar no Gerenciamento da Comunidade";
        novoLink.style.fontSize = "smaller";
        novoLink.style.lineHeight = "250%";
        novoLink.href = UrlPostarTopicoGerenciamento + "#" + dadosUrl;
        novoLink.target = "_blank";
        return novoLink;
}

function montarLinkAdvertencia() {
        var link;
        var caixaMensagem = elementoXpath(PathCaixaMensagem);
        var url = window.location.href;
        var dadosUrl = url.replace(/[^#]+#/, "").split(",");
        /*if (dadosUrl.length == 3) {
                link = ModeloLinkAdvertencia.replace(/[$][^$]+[$]/g, function(substr) {
                                var indice = parseInt(substr.replace(/[$]/g, ""));
                                var substituicao = "";
                                var valor = dadosUrl[indice];
                                if (valor)
                                substituicao = unescape(valor);
                                return substituicao;
                                });
        }*/

        if (dadosUrl.length == 3) {
                //link = UrlScrapbook + dadosUrl[2] + "#CCPPBRWARN," + escape(dadosUrl[0]);
                link = UrlScrapbook + dadosUrl[2] + "#CCPPBRWARN," + dadosUrl[0];
        }

        return link;
}

function criaLinkParaAdvertencia() {
        var novoLink = document.createElement("A");
        novoLink.innerHTML = "Enviar advertência";
        novoLink.style.fontSize = "smaller";
        novoLink.style.lineHeight = "250%";
        novoLink.href = montarLinkAdvertencia();
        return novoLink;    
}

function insereLinkParaGerenciamento() {
        var linhaExcluirTopico = elementoXpath(PathLinhaExcluirTopico);
        if (!linhaExcluirTopico)
                return;

        if (primeiraPaginaTopico()) {
                var novoLink = criaLinkParaGerenciamento();
                insereAntes(novoLink, linhaExcluirTopico);
        }
}



function insereLinkParaAdvertencia() {
        //var alvo = elementoXpath(PathSeuTextoTem);
        var alvo = elementoXpath(PathParaLinkAdvertencia);
        //var alvo = elementoXpath(PathCaixaMensagem);
        if (!alvo) {
                return;
        }

        var novoLink = criaLinkParaAdvertencia();
        insereDepois(novoLink, alvo);
        window.alert(pegarTextoAdvertencia());
}

function insereFerramentasModelo() {
        var caixaMensagem = elementoXpath(PathCaixaMensagem);
        var dadosUrl = window.location.href.replace(/[^#]+#/, "").split(",");
        if (dadosUrl.length == 3 &&
		(!caixaMensagem.value || 
			caixaMensagem.value == "digite o texto ou cole HTML (HTML apenas para amigos)" ||
			caixaMensagem.value == "enter text or paste HTML (HTML for friends only)")) {
		caixaMensagem.focus();
                var texto = ModeloMensagem.replace(/[$][^$]+[$]/g, function(substr) {
                                var indice = parseInt(substr.replace(/[$]/g, ""));
                                var substituicao = ""; 
                                var valor = dadosUrl[indice];
                                if (valor)
                                substituicao = unescape(valor);
                                return substituicao;
                                });
                caixaMensagem.value = texto;
        }
}

function insereAdvertenciaModelo() {
        var caixaMensagem = elementoXpath(PathCaixaMensagem);
        var url = window.location.href.replace(/[^#]+#/, "");
        if (url.indexOf("CCPPBRWARN") != 0) {
                return;
        }
        var dadosUrl = window.location.href.replace(/[^#]+#/, "").split(",");
        if (!caixaMensagem.value && dadosUrl.length == 2) {
                var texto = ModeloAdvertencia.replace(/[$][^$]+[$]/g, function(substr) {
                                var indice = parseInt(substr.replace(/[$]/g, ""));
                                var substituicao = ""; 
                                var valor = dadosUrl[indice];
                                if (valor)
                                substituicao = unescape(valor);
                                return substituicao;
                                });
                caixaMensagem.value = texto;
        }
}

var urlAtual = window.location.href;
if (urlAtual.indexOf(UrlPostarTopicoGerenciamento) == 0) {
        insereFerramentasModelo();
        insereLinkParaAdvertencia();
}
else if (urlAtual.indexOf(UrlTopico) == 0) {
        insereLinkParaGerenciamento();
}
else if (urlAtual.indexOf(UrlScrapbook) == 0) {
        insereAdvertenciaModelo();
}
