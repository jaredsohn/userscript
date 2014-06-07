// ==UserScript==
// @name           Citas en menéame
// @author         HeavyBoy
// @namespace      http://meneame.net/notame
// @description    Citas básicas en el nótame
// @include        http://meneame.net/notame*
// ==/UserScript==

// Creamos el nodo con el script
var js = document.createElement('script');
js.setAttribute('id', 'notame_hacks');
js.setAttribute('type', 'text/javascript');

    js.text += "\nvar esperar = 1000;";
    js.text += "\nvar refresco = 100;";
    js.text += "\nvar cancelarBusqueda = false;";
    js.text += "\nvar it;";
    js.text += "\nvar invocarTextarea = function(usuario) {";
    js.text += "\n    get_votes('post_edit.php','edit_comment','addpost',0,0);";
    js.text += "\n    it = setInterval('comprobarTextarea(\\'' + usuario + '\\')', refresco);";
    js.text += "\n    setTimeout(function() { cancelarBusqueda = true; }, esperar);";
    js.text += "\n}";
    js.text += "\nvar comprobarTextarea = function(usuario) {";
    js.text += "\ntexto = document.getElementById('post');";
    js.text += "\n    if(texto) {";
    js.text += "\n        clearInterval(it);";
    js.text += "\n        citar(usuario);";
    js.text += "\n    } else if(cancelarBusqueda) {";
    js.text += "\n        clearInterval(it);";
    js.text += "\n    }";
    js.text += "\n}";
    js.text += "\nvar citando, texto;";
    js.text += "\nvar citar = function(usuario) {";
    js.text += "\n    texto = document.getElementById('post');";
    js.text += "\n    if(!citando || (!texto)) {";
    js.text += "\n        if(!texto) {";
    js.text += "\ncitando = false;";
    js.text += "\n            invocarTextarea(usuario);";
    js.text += "\n\n        } else {";
    js.text += "\ncitando = true;";
    js.text += "\n            texto.value = '@' + usuario + ' ';";
    js.text += "\n        }";
    js.text += "\n    } else {";
    js.text += "\n        texto.value += ' @' + usuario + ' ';";
    js.text += "\n    }";
    js.text += "\n}";
    js.text += "\nvar notas = document.getElementsByTagName('ol')[1].childNodes;";
    js.text += "\nvar nota, url, usuario;";
    js.text += "\nfor(i = 0; i < notas.length; i++) {";
    js.text += "\n    nota = notas[i];";
    js.text += "\n    if(nota.nodeType == 3) continue;";
    js.text += "\n    url = nota.childNodes[1].childNodes[1].getElementsByTagName('a')[0].href;";
    js.text += "\n    usuario = url.substring(url.lastIndexOf('/')+1);";
    js.text += "\n    obj = nota.childNodes[1].childNodes[0].innerHTML += '&nbsp;&nbsp;&nbsp;<a href=\"javascript:citar(\\'' + usuario + '\\')\">Citar</a>';";
    js.text += "\n}";

// Añadimos el nodo al <head>
document.getElementsByTagName('head')[0].appendChild(js);