// ==UserScript==
// @name           Moderação C/C++ Brasil
// @description    Ferramentas para moderação da comunidade C/C++ Brasil
// @include        http://www.orkut.com/CommMsgs.aspx?cmm=64157*
// @include        http://www.orkut.com/Scrapbook.aspx?uid=3619393288361564198*
// ==/UserScript==

// Modificaýýo de um script do Diogo para a comunidade Programação/Computação Brasil
// Script original: http://userscripts.org/scripts/show/7656 


const ModeloMensagem = "[b]Registro de atividade do moderador[/b]\n" +
	"[b]Tópico:[/b] $0$\n" +
	"[b]Autor:[/b] $1$ ([link]http://www.orkut.com/Profile.aspx?uid=$2$[/link])\n" +
	"[b]Ação: [/b]tópico excluído\n" +
	"[b]Motivo: [/b]\n" +
	"[b]Mensagem:[/b] [i][/i]\n" +
	"[silver].[/silver]"
;

const PathLinhaExcluirTopico = "id('community')/tbody/tr/td[3]/table/tbody/tr/td/div[2]/form";
const PathTituloTopico = "id('community')/tbody/tr/td[3]/table/tbody/tr/td/div[1]";
const PathLinkAutorTopico = "id('community')/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr/td[1]/a[2]";
//const PathCaixaMensagem = "id('messageBody')";
const PathCaixaMensagem = "id('scrapText')";

//const UrlPostarTopicoGerenciamento = "http://www.orkut.com/CommMsgPost.aspx?cmm=70567&tid=2502998348303238297";
const UrlPostarTopicoGerenciamento = "http://www.orkut.com/Scrapbook.aspx?uid=3619393288361564198";
//const UrlPostarTopicoGerenciamento = "http://www.orkut.com/CommMsgPost.aspx?cmm=64157&tid=2527827468378970461";
const UrlTopico = "http://www.orkut.com/CommMsgs.aspx?cmm=64157&tid=";

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

function insereLinkParaGerenciamento() {
    var linhaExcluirTopico = elementoXpath(PathLinhaExcluirTopico);
    if (!linhaExcluirTopico)
        return;

    if (primeiraPaginaTopico()) {
        var novoLink = criaLinkParaGerenciamento();
        insereAntes(novoLink, linhaExcluirTopico);
    }
}

function insereFerramentasModelo() {
    var caixaMensagem = elementoXpath(PathCaixaMensagem);
    var dadosUrl = window.location.href.replace(/[^#]+#/, "").split(",");
    if (!caixaMensagem.value && dadosUrl.length == 3) {
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

var urlAtual = window.location.href;
if (urlAtual.indexOf(UrlPostarTopicoGerenciamento) == 0) {
    insereFerramentasModelo();
} else if (urlAtual.indexOf(UrlTopico) == 0) {
    insereLinkParaGerenciamento();
}
