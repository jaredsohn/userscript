
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Offsite Blank", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Maracugina PXB
// @namespace     http://www.portalxbox.com.br/e107_plugins/forum
// @namespace     http://www.portalxbox.com.br/e107_themes/portal2006/forum/
// @description   Esconde posts de usuários imbecis.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @include       http://www.portalxbox.com.br/e107_plugins/forum/*
// ==/UserScript==

$(".forumposter").each(function () {
    $(this).append('&nbsp;&nbsp;<img src="http://www.portalxbox.com.br/e107_themes/portal2006/forum/admin_delete.png" name="botao_maracugina" babaca="'+ this.textContent + '" />');
})

$('img[name="botao_maracugina"]').each(function () {
    this.addEventListener('click', fecharPost, false);
    var nomeDoBabaca = this.getAttribute('babaca');
    if (estaNaLista(nomeDoBabaca)) {
        fecharPost(nomeDoBabaca);
    }
})

function fecharPost(nome) {
    var conteudoDoPost = null;
    var nomeDoBabaca = null;
    if (!(typeof nome === "string")) {
        nomeDoBabaca = this.getAttribute('babaca');
        conteudoDoPost = $('img[babaca="' + nomeDoBabaca + '"]').parent().parent().parent();
    }
    else {
        conteudoDoPost = $('img[babaca="' + nome + '"]').parent().parent().parent();
        nomeDoBabaca = nome;
    }
    conteudoDoPost.hide();
    conteudoDoPost.prev().hide();
    conteudoDoPost.next().next().hide();
    
    var link = document.createElement('a');
    link.setAttribute('href', '#');
    link.setAttribute('name', 'tirar_da_lista');
    link.setAttribute('class', 'babaca_"' + nomeDoBabaca + '"');
    link.textContent = 'Clique aqui para retirá-lo da sua lista negra';

    var italico = document.createElement('i');
    italico.textContent = 'Babaca detectado! ';
    italico.appendChild(link);
    conteudoDoPost.next().replaceWith(italico);

    colocarNaLista(nomeDoBabaca);
    $('a[name="tirar_da_lista"]').click(function () { tirarDaLista(nomeDoBabaca); })
    
}

function tirarDaLista(nomeDoBabaca) {
    if (estaNaLista(nomeDoBabaca)) {
        var babacas = GM_getValue('babacas');
        babacas = babacas.replace(nomeDoBabaca + ";", "");
        GM_setValue('babacas', babacas);
        window.location.reload();
    }
}

function colocarNaLista(nomeDoBabaca) {
    if (!estaNaLista(nomeDoBabaca)) {
        var babacas = GM_getValue('babacas');
        if (babacas == null)
            babacas = '';
        babacas = babacas.concat(nomeDoBabaca + ";");
        GM_setValue('babacas', babacas);
    }
}

function estaNaLista(nomeDoBabaca) {
    var babacas = GM_getValue('babacas');
    if (babacas == null)
        babacas = '';
    return babacas.search(nomeDoBabaca + ';') > -1;
}

//GM_setValue(key, value);
