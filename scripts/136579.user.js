// ==UserScript==
// @name           BRChan - alterações no catalogo para exibir o texto dos posts
// @include        http://*brchan.org/*/catalog.html*
// @include        http://*brchan.org/*/catalog.html
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
function mostra_texto () {
	// encontrando a tabela de posts
	var tabelas = document.getElementsByTagName('table');
	var tabela = '';
	for(var i = 0; i < tabelas.length; i++) {
		if(tabelas[i].getAttribute('border') == '1'
		&& tabelas[i].getAttribute('align') == 'center') {
			tabela= tabelas[i];
			break;
		}
	}

	var tds = tabela.getElementsByTagName('td');

	for(var i = 0; i < tds.length; i++) {
		var as = tds[i].getElementsByTagName('a');
		
		var texto = as[0].getAttribute('title');
		tds[i].innerHTML = tds[i].innerHTML + '<br/>' + texto;
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

(function() {
	var logo = document.getElementsByClassName('logo');
	logo = logo[0];
	var estadoAtual = jsGet("mT");
	var link = "";
	if(estadoAtual == undefined || estadoAtual != 1) {
		estadoAtual = false;
		link = "<a href='?mT=1'>Mostrar texto</a>";
	} else {
		estadoAtual = true;
		var add = document.location.href;
		var pos = add.indexOf("?");
		add = add.substring(0,pos);
		link = "<a href='"+add+"'>Esconder texto</a>";
	}
	
	document.title = document.title + " - Catálogo";
	
	// Colocando o link para exibir texto abaixo do logo
	if(logo != undefined) {
		logo.innerHTML = logo.innerHTML +
			"<br/><div style='font-size:12pt;'>" + link + "</div>";;
	}
	if(estadoAtual) {
		mostra_texto();
	}
}).call(this);