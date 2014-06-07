
// Blip.fm Comments Hack
// version 0.2 BETA!
// 2008-09-11
// Copyright (c) 2008, Lius Fontenelle Carneiro
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Blip.fm Comments Hack", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Blip.fm Comments Hack 0.2
// @namespace     http://hypercast.info/
// @description   Script that add Comments functionality to Blip.fm by Lius
// @include       http://blip.fm/home*
// ==/UserScript==


/*
 * Bloco de codigo para carregar uma funcao do escopo do greasemonkey na pagina real
 */
function embedFunction(s) {  
  document.body.appendChild(document.createElement('script')).innerHTML =  s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
} 

// definicao e implementacao das funcoes a serem carregadas (nao pode ser funcoes GM_*)
function toggle_element(obj) {
	var el = document.getElementById(obj);
	el.style.display = (el.style.display != 'none' ? 'none' : '' );
}

function show_all_comments() {
	var elements = document.evaluate("//div[@class='blip_comments']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < elements.snapshotLength; i++) {
	    elements.snapshotItem(i).style.display = '';
	}
}

// carregamento propriamente dito
embedFunction(toggle_element);
document.body.appendChild(document.createElement('script')).innerHTML = "toggle_element();";  
embedFunction(show_all_comments);
document.body.appendChild(document.createElement('script')).innerHTML = "show_all_comments();"; 



/*
 * Inicio dos procedimentos da aplicacao
 */

// encontra o elemento que tem o login
var usernameElement = document.evaluate(
    "//a[@class='primary']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// se nao encontrar, encerra a execucao do script
//if(usernameElement.snapshotLength == 0)	return;

// se encontrar, extrai somente o username para ser utilizado pelo resto do programa
var login = usernameElement.snapshotItem(0).innerHTML;


// adiciona a div que ira guardar os comentarios de cada blip
var dataDivs = document.evaluate(
			"//div[@class='tweem end']//div[@class='date']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

for (var i = 0; i < dataDivs.snapshotLength; i++) {
    dataDivs.snapshotItem(i).innerHTML += '<div class="comment"></div>';
}



// incluindo o link para mostrar todos os comentarios (tornar a div comment com style="display: true")
var menu_superior = document.evaluate("//div[@id='supermenu']/ul", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
menu_superior.snapshotItem(0).innerHTML += '<li><a href="javascript:func()" onclick="show_all_comments();">Mostrar comentários</a></li>';




// incluindo o iframe que servira de suporta para o retorno do form.submit nao causar reload geral
document.getElementById('attribution').innerHTML += '<iframe name="ifme" style="display: none;"></iframe>';


// cadastra no servidor, se ja nao estiver
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://blipfm.hypercast.info/users/check?login=' + login,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/xml,text/xml,text/html,text/json',
//		'Content-type': 'application/x-www-form-urlencoded',
    },
    onload: function(responseDetails) {
		var barraSuperior = document.getElementById('identity');
		if(responseDetails.responseText == 'ok'){
			barraSuperior.innerHTML += " Cadastrado";
		}
		if(responseDetails.responseText == 'existe'){
			barraSuperior.innerHTML += " Conectado";
		}
    }
});


// varredura sobre todos os blips
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='tweem end']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // checando navegacao por todos os elementos corretos
	// alert(thisDiv.id);

	// descobrindo o login de cada pessoa que blipou e que esta na sua lista
	var blip_author_div = document.evaluate(
		"//div[@id='" + thisDiv.id + "']//div[@class='body']//a",
		document,
		null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);

	var blip_author_login = blip_author_div.snapshotItem(0).innerHTML;

	// DEBUG Mostrar nome do autor de cada blip para checar se foi extraido corretamente
	//thisDiv.innerHTML += blip_author_login;
	
	var url = 'http://blipfm.hypercast.info/blips/check?login=' + blip_author_login + '&code=' + thisDiv.id + '&music=' + document.getElementById(thisDiv.id + 'headline').innerHTML;

	// DEBUG Mostrar a URL que esta sendo requisitada
	//thisDiv.innerHTML += url;

	GM_xmlhttpRequest({
		method: 'GET',
	    url: url,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/xml,text/xml,text/html,text/json'
		},
	    onload: function(responseDetails) {
			eval("hs = " + responseDetails.responseText);
			var allDataDivs = document.evaluate(
				"//div[@id='" + hs['blip_id'] + "']//div[@class='date']//div[@class='comment']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);

			allDataDivs.snapshotItem(0).innerHTML = 
				'<a href="javascript:func()" onclick="toggle_element(\'comments' + hs['blip_id'] + '\');">COMENTARIOS (' + hs['comments'] +')</a><br/>' +
				'<div id="comments' + hs['blip_id'] + '" class="blip_comments" style="display: none;"></div>' +
				'<div>' + 
					'<a href="javascript:func()" onclick="toggle_element(\'form' + hs['blip_id'] + '\');">Escrever comentario</a>' +				
				'</div>';

			if(hs['comments'] > 0){
				document.getElementById('comments' + hs['blip_id']).innerHTML = hs['texts'];
			}

				

			// colocando o form do lado de fora do quadro branco do blip, mas ainda dentro da sua div
			document.getElementById(hs['blip_id']).innerHTML += 
				'<div id="form' + hs['blip_id'] + '" style="display: none; float: right;">' +
					'<form target="ifme" method="POST" action="http://blipfm.hypercast.info/comments/save.json">' +
						'<textarea name="text" id="text' + hs['blip_id'] + '" rows="2" cols="74"></textarea><br/>' + 
						'<input type="hidden" name="login" value="' + login + '"/>' +
						'<input type="hidden" name="blip_author_login" value="'+ hs['blip_author_login'] +'"/>' +
						'<input type="hidden" name="code" value="' + hs['blip_id'] + '" />' + 
						'<input type="hidden" name="music" value="' + hs['music'] + '" />' + 
						'<input type="submit" onclick="' + 
							'document.getElementById(\'form' + hs['blip_id'] + '\').submit;' + 
//							'document.getElementById(\'text' + hs['blip_id'] + '\').value = \'\';' +
							'toggle_element(\'form' + hs['blip_id'] + '\');' +
							'" />' +
					'</form>' +
				'</div>';
		}
	});
}
