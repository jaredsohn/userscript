// ==UserScript==
// @name            Auto-Interstitial para postagem de imagens externas no orkut antigo
// @description     Testado em conjunto com o Orkut Manager 3.7.8.2 com Main# Kill ativado
// @namespace       http://www.orkut.com.br/Profile?uid=8304011258785211759
// @include         http://*orkut.*/CommMsg*
// @version         1.1
// ==/UserScript==

Xiao = function() {
    textow = document.getElementById(txtname).value;
    var corrigido = [];
    var eita = textow.match(/((https?:\/\/)?[\w-]+\.[\w-.]+\/(\S+)\.(jpg|jpeg|gif|png|bmp))/gi);
    for(imag = 0; imag < eita.length; imag++) {
        if(!eita[imag].match(/\/\/?([^\/]*)/i)[1].match(/orkut\./gi)) {
            corrigido[imag] = "www.orkut.com.br/Interstitial?u="+encodeURIComponent(encodeURI(unescape(eita[imag])));
            eita[imag] = eita[imag].replace(/[$-\/?[-^{|}]/g, '\\$&');
        } else {
            corrigido[imag] = eita[imag];
        }
        var zRegEx = new RegExp (eita[imag], '');
        textow = textow.replace(zRegEx,corrigido[imag]);
    }
    document.getElementById(txtname).value = textow;
}

if(location.href.match('Post')) {
    txtname = 'messageBody';
    document.getElementById('QreplyButtonSend').addEventListener('mouseup', Xiao, false);
} else {
    txtname = 'OMQuickReply';
    window.addEventListener('mouseup', function(e) {
        if(e.target.innerHTML == 'Reply' || e.target.innerHTML == 'Responder'){
            Xiao();
        }
    }, false);
}

window.addEventListener('keydown', function(e) {
    if(document.getElementById('QreplyButtonSend')) {
        var keys = false;
        if(document.getElementById('QreplyButtonSend').getElementsByTagName('a')[0].title == 'Ctrl-Enter')
            keys = !e.altKey && e.ctrlKey && !e.shiftKey;
        else if(document.getElementById('QreplyButtonSend').getElementsByTagName('a')[0].title == 'Alt-Enter')
            keys = e.altKey && !e.ctrlKey && !e.shiftKey;
        else
            keys = !e.altKey && !e.ctrlKey && e.shiftKey;
        if (e.keyCode == 13 && (keys || /-Enter/.test(e.target.title) || e.target.innerHTML == 'Reply' || e.target.innerHTML == 'Responder'))
            Xiao();
    }
}, true);