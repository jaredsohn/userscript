// ==UserScript==
// @name           Moderação Programação/Computação Brasil
// @description    Ferramentas para moderação da comunidade Programação/Computação Brasil.
// @include        http://www.orkut.com/CommMsg*
// ==/UserScript==
//
// TODO
//   * PathTextoTopico deve selecionar apenas o texto (mas está
//   selecionando também o título e a hora). Ver referência XPath.
//   * Corrigir o regex que detecta URL (não deveria precisar de um
//   espaço no final).
//
// HISTÓRICO
//   Versão 2.1 (Bruno Leonardo Michels)
//     * Adiciona "Tópico excluido" ao titulo da mensagem.
//     * Adiciona a mensagem removendo os links e cortando a mensagem
//     em 500 caracteres.
//   Versão 2.0 (Diogo Kollross)
//     * Tópico de moderação excluído; URL atualizada.
//   Versão RC3 (Diogo Kollross)
//     * Dados para postagem no Gerenciamento agora são passados na
//     URL em vez de usar as preferências do script.
//   Versão 1.0 (Diogo Kollross)
//     * Protótipo.


// Configurações
const ModeloMensagem = "[b]Título:[/b] $0$"
    + "\n[b]Autor:[/b] $1$ - http://www.orkut.com/Profile.aspx?uid=$2$"
    + "\n[b]Mensagem:[/b] [i]$3$[/i]"
    + "\n[b]Motivo:[/b] "
;

//const UrlPostarTopicoGerenciamento = "http://www.orkut.com/CommMsgPost.aspx?cmm=70567&tid=2502998348303238297";
const UrlPostarTopicoGerenciamento = "http://www.orkut.com/CommMsgPost.aspx?cmm=70567&tid=2528359597612954957";
const UrlTopico = "http://www.orkut.com/CommMsgs.aspx?cmm=70567&tid=";

const TamMaxTexto = 500;


// Constantes do Orkut
const PathLinhaExcluirTopico = "/html/body/div[4]/div[3]/table/tbody/tr/td/p";
const PathTituloTopico = "/html/body/div[4]/div[3]/table/tbody/tr[2]/td/div[3]/h3[2]";
const PathLinkAutorTopico = "/html/body/div[4]/div[3]/table/tbody/tr[2]/td/div[3]/h3/a";
const PathTextoTopico= "/html/body/div[4]/div[3]/table/tbody/tr[2]/td/div[3]/div[2]";

const PathCaixaAssunto = "id('subject')";
const PathCaixaMensagem = "id('messageBody')";

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

    var messageTopico = elementoXpath(PathTextoTopico).textContent;

    var dadosUrl = [escape(tituloTopico), escape(nomeAutorTopico), idAutorTopico, escape(messageTopico)].join();

    var novoLink = document.createElement("div");
    
    var onclick = "onclick=\"window.open('" + UrlPostarTopicoGerenciamento + "#" + dadosUrl + "');\" ";
    var button = '<span class="grabtn" ' +
                onclick +
                'style="cursor: pointer;">' +
				'<a class="btn" style="cursor: pointer;" href="javascript:void(0);"' +
                '>mod</a>' +
				'</span>' +
				'<span class="btnboxr">' +
				'<img width="5" height="1" alt="" src="http://img1.orkut.com/img/b.gif"/>' +
				'</span>';
    
    novoLink.style.cssFloat = "right";
    novoLink.id = "moderacao";
    novoLink.innerHTML = button;
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

function linksRemovidos(texto) {
    const removeLinks = /(http|www|ftp)\S+\s/gi;
    return texto.replace(removeLinks, "\(Link Removido\) ");
}

function insereFerramentasModelo() {
    var caixaMensagem = elementoXpath(PathCaixaMensagem);
    var dadosUrl = window.location.href.replace(/[^#]+#/, "").split(",");
    if (!caixaMensagem.value && dadosUrl.length >= 3) {
        var texto = ModeloMensagem.replace(/[$][^$]+[$]/g, function(substr) {
            var indice = parseInt(substr.replace(/[$]/g, ""));
            var substituicao = "";
            var valor = dadosUrl[indice];
            if (valor)
                substituicao = unescape(valor);
            if (indice == 3) {
                substituicao = linksRemovidos(substituicao);
                substituicao = substituicao.substr(0, TamMaxTexto);
            }
            return substituicao;
        });
        caixaMensagem.value = texto + " ";
        var end = caixaMensagem.value.length - 1;
        caixaMensagem.selectionStart = end;
        caixaMensagem.selectionEnd = end;
        caixaMensagem.focus();
    }
    elementoXpath(PathCaixaAssunto).value = "Tópico excluído";
}

var urlAtual = window.location.href;
if (urlAtual.indexOf(UrlPostarTopicoGerenciamento) == 0) {
    insereFerramentasModelo();
} else if (urlAtual.indexOf(UrlTopico) == 0) {
    insereLinkParaGerenciamento();
}