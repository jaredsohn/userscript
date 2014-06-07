// ==UserScript==
// @name        Script Biblioteca Nacional
// @namespace   http://www.erepublik.com
// @description	Plugin para envio de artigos para a Biblioteca Nacional
// @include     http://www.erepublik.com/*/article/*/*/20*
// @version     0.0.4
// @updateURL	http://userscripts.org/scripts/source/160239.meta.js
// @downloadURL	http://userscripts.org/scripts/source/160239.user.js
// @grant		GM_wait
// @grant		GM_xmlhttpRequest
// @grant		GM_addStyle
// ==/UserScript==

function GM_wait() {

	//jQuery is already defined by eRep, waits for it to load
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	}
	else {
		$ = unsafeWindow.jQuery;
		
		if($('.biggersection') == null) {
			return;
		}
		
		var loc = $('.full_content');
		loc.before('<div id="bn">Cadastrar na Biblioteca Nacional:<br/></div>');
		
		addButton('Humor', humor);
		addButton('Política', politica);
		addButton('Internacional', internacional);
		addButton('Interação', interacao);
		addButton('Militar', militar);
		$('#bn').append('<br/>');
		addButton('Diplomacia/Alianças', diplomacia);
		addButton('Tutorial', tutorial);
		addButton('Economia', economia);
		addButton('Governo', governo);
		addButton('Roleplay', roleplay);
		
	}
}

GM_wait();

function addButton(name, funct) {

	var loc = $('#bn');
	
	var btn = document.createElement('button');
	btn.appendChild(document.createTextNode(name));
	btn.addEventListener('click', funct, true);
	loc.append(btn);
		
}

function humor() {
	sendArticle('4');
}

function politica() {
	sendArticle('1003');
}

function internacional() {
	sendArticle('1004');
}

function interacao() {
	sendArticle('2003');
}

function militar() {
	sendArticle('4004');
}

function diplomacia() {
	sendArticle('4005');
}

function tutorial() {
	sendArticle('6006');
}

function economia() {
	sendArticle('8003');
}

function governo() {
	sendArticle('15001');
}

function roleplay() {
	sendArticle('16001');
}

function sendArticle(categoryId) {
	var formData = 'articleId='+findArticleId()+'&userId='+findUserId()+'&categoryId='+categoryId+'&description=';
	GM_xmlhttpRequest({
		url: 'http://bibliotecaerep.appspot.com/article/add',
		method: 'POST',
		data: formData,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			if(response.status == 200) {
				alert('Artigo enviado! Obrigado pela participação! (:');
			} 
			if(response.status == 400) {
				alert('Por favor verifique os dados com erro!');
			} 
			if(response.status == 500) {
				alert('Ocorreu um erro interno na Biblioteca ):');
			} 
		},
		onerror: function(response) {
			alert('Ocorreu um erro ao enviar o artigo ):');
		}
	});
}

function findArticleId() {
	var id = $('.post_content > h2 > a').attr('href').replace(/\/1\/20/, '');
	id = id.substring(id.lastIndexOf('-')+1);
	return id;
}

function findUserId() {
	var id = $('.user_name').attr('href').replace(/\/[a-z]*\/citizen\/profile\//, '');
	return id;
}