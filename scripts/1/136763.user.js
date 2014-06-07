// ==UserScript==
// @name           BRChan - Thread Reloader
// @include        http://*brchan.org/*/res/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

(function() {
    var auto_recarregar = function() {
        var iframe = document.getElementById("iframe_auto_recarregamento");
        var link = document.location.href;
        var pos = link.indexOf("?");
        link = link.substring(0,pos);
        iframe.src = link;


        $('#iframe_auto_recarregamento').load(function() {
            var iframe = document.getElementById("iframe_auto_recarregamento");
            var titulo = $( "#iframe_auto_recarregamento").contents( ).find( "title").html( );
            if(titulo == "BRCHAN - 404") {
                alert("A thread foi pro saco! Este recarregador de fios fica feliz em ser util.");
            } else {
                window.location = document.location.href;
            }
        });
    }
    var estadoAtual = jsGet("atualizaThread");
    var tempoAtualizacao = 0;
    if(estadoAtual == undefined
        || estadoAtual == null
        || estadoAtual == 0) {
        tempoAtualizacao = 0;
        estadoAtual = false;
    } else {
        tempoAtualizacao = estadoAtual;
        estadoAtual = true;
    }

    // form
    var postarea = document.getElementsByClassName('postarea');
    postarea = postarea[0];
    var campo = "<div>";
    campo += "Recarregador de fios<br/>";

    // se estiver no modo de atualizacao, expandir imagens e botar botao de parar atualizacao
    if(estadoAtual) {
        document.title = document.title + " - atualizando";
        expandir_imagens();
        var link = document.location.href;
        var pos = link.indexOf("?");
        link = link.substring(0,pos);
        campo += "<input type='button' onclick='javascript:window.location=\""+link+"\"' value='Parar de Auto-Recarregar'/>";
        campo += "</div>";
        campo += "<hr>";
        campo += "<div style='display:none;'><iframe id='iframe_auto_recarregamento' src=''></div>";
        postarea.innerHTML = postarea.innerHTML + campo;

        setTimeout(auto_recarregar,tempoAtualizacao*1000);
    } else {
        // se nao estiver atualizando, botar campo de texto "intervalo de atualizacao" e botao de atualizacao.
        var link = document.location.href;
        var pos = link.indexOf("?");
        if(pos > 0) {
            link += "&";
        } else {
            link += "?";
        }
        link += "atualizaThread=";

        var onclick = "javascript:window.location=\""+link+"\"+";
        onclick += "document.getElementById(\"intervalo_atualizacao\").value;";

        campo += "Intervalo de Atualizacao(em segundos):<input type='text' id='intervalo_atualizacao' value='10' size='3'/><br/>";
        campo += "<input type='button' onclick='"+onclick+"' value='Auto-Recarregar'/>";

        campo += "</div>";
        campo += "<hr>";
        postarea.innerHTML = postarea.innerHTML + campo;
    }

}).call(this);





function expandir_imagens() {
    var thread = document.getElementsByClassName('thread');
    var links = thread[0].getElementsByTagName('a');
    var onClick = "";
    var ignorar_primeiro = 0;
    for(var i = 0; i < links.length; i++) {
        var onclickLink = links[i].getAttribute('onclick');
        if(onclickLink == null || onclickLink == undefined) {
            continue;
        }
        onclickLink = onclickLink.replace(/\s/g, "").toLowerCase();
        if(onclickLink.substring(0,20) == "javascript:expandimg"
            ) {
            links[i].click();

            if(ignorar_primeiro == 0) {
                ignorar_primeiro = 1 ;
                continue;
            } else {
                break;
            }
        }
    }
}


function urlDecode(string, overwrite){
    if(!string || !string.length){
        return {};
    }
    var obj = {};
    var pairs = string.split('&');
    var pair, name, value;
    var lsRegExp = /\+/g;
    for(var i = 0, len = pairs.length; i < len; i++){
        pair = pairs[i].split('=');
        name = unescape(pair[0]);
        value = unescape(pair[1]).replace(lsRegExp, " ");
        //value = decodeURIComponent(pair[1]).replace(lsRegExp, " ");
        if(overwrite !== true){
            if(typeof obj[name] == "undefined"){
                obj[name] = value;
            }else if(typeof obj[name] == "string"){
                obj[name] = [obj[name]];
                obj[name].push(value);
            }else{
                obj[name].push(value);
            }
        }else{
            obj[name] = value;
        }
    }
    return obj;
}


function jsGet(param)
{
    var wl = window.location.href;
    var params = urlDecode(wl.substring(wl.indexOf("?")+1));
    return(params[param]);
}
