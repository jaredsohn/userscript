// 
//		      _|  _|      _|        _|_|_|  _|                    _|
//		      _|  _|      _|      _|        _|_|_|      _|_|_|  _|_|_|_|
//		      _|  _|      _|      _|        _|    _|  _|    _|    _|
//		_|    _|    _|  _|        _|        _|    _|  _|    _|    _|
//		  _|_|        _|            _|_|_|  _|    _|    _|_|_|      _|_|
//
//
// JV Flux présente JV Chat <http://jvflux.com/jvchat/>,
// discutez en temps réel sur les forums de jeuxvideo.com.
// charset: utf-8
//
// Copyright (c) 2011 JV Flux <http://jvflux.com/> Tous droits réservés
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name			JV Chat Loader
// @namespace		http://jvflux.com/jvchat/
// @description		Discussions en temps réel sur les forums de jeuxvideo.com
// @version			1.2
// @include			http://www.jeuxvideo.com/forums/0-*
// @include			http://www.jeuxvideo.com/forums/1-*
// @include			http://www.jeuxvideo.com/forums/3-*
// @include			http://www.jeuxvideo.com/jvchat*
// ==/UserScript==

/* Variables */
window._jvchat = window._jvchat || {};
var i, elems, elem;

/* Variables url */
var url = location.href.split('/').pop();
var url_parts = url.split('-');


if (location.pathname == '/jvchat') {
	/* On est sur le module JV Chat */

	/* Chargement de la dernière version */
	elem = document.createElement('script');
	elem.src = '//'+(document.getElementById('_jvchat_localhost') ? '127.0.0.1' : 'limerain.fr')+'/JVChat.js';
	document.body.appendChild(elem);
}
else if (url_parts.length >= 6) {
	/* On est sur une page de forum */

	var url_parts_names = ['mode', 'forum', 'topic', 'page', 'zero', 'index'];
	for (i in url_parts_names) {
		if (i >= url_parts.length) {
			break;
		}
		eval('url_'+url_parts_names[i]+' = '+url_parts[i]+';');
	}


	/* Liens sur la liste des topics */
	if (url_mode === 0 && url_index === 1) { // première page uniquement
		elems = document.getElementsByClassName('navig_prec');
		for (i in elems) {
			elems[i].innerHTML = '<a target="jvchat" class="jvchat" href="/jvchat#'+url+'">JV Chat</a>';
		}
	}

	/* Liens à côté des boutons alerte mail */
	if (url_mode === 1 && document.getElementsByClassName('bt_repondre').length > 0) { // pas sur topics bloqués
		elems = document.getElementsByClassName('moder');
		for (i in elems) {
			//alert(typeof elems[i]);

			if (typeof elems[i] == 'object') {
				//elems[i].innerHTML += '<a target="jvchat" class="jvchat" href="/jvchat#'+url+'">JV Chat</a>';
				elem = document.createElement('a');
				elem.setAttribute('target', 'jvchat');
				elem.setAttribute('class', 'jvchat');
				elem.setAttribute('href', '/jvchat#'+url);
				elem.appendChild(document.createTextNode('JV Chat'));
				elems[i].appendChild(elem);
			}
		}
	}

	/* Lien en bas du formulaire de réponse (mode 3), à côté de la liste des smileys */
	elems = document.getElementsByClassName('lien_base');
	if (url_mode === 3 
		&& elems.length
			&& elems[0].getElementsByTagName('a').length
				&& elems[0].getElementsByTagName('a')[0].href === 'http://www.jeuxvideo.com/smileys/legende.htm') {
		elems[0].innerHTML += ' | <a target="jvchat" class="jvchat" href="/jvchat#'+url+'">JV Chat</a>';
	}

	/* Lien dans la liste des forums */
	if (0) {
		elem = document.getElementById('liste_forums') || document.getElementById('liste_forums_pref');
		if (elem !== null) {
			elem.innerHTML += '<li><a target="jvchat" class="jvchat" href="/jvchat#">JV Chat</a><li>';
		}
	}

	/* Stylisation des liens */
	elem = document.createElement('style');
	elem.setAttribute('type', 'text/css');
	elem.innerHTML = '/* CSS généré par JV Chat */ \
		.moder .jvchat, .navig_prec .jvchat { color: #666;  font-weight: bold;  border: 1px solid white;  border-top-right-radius: 5px;  border-bottom-left-radius: 5px; } \
		.moder .jvchat { padding: 1px 15px; } \
		.navig_prec .jvchat { padding: 1px 5px; } \
		.moder .jvchat:hover, .navig_prec .jvchat:hover { color: #333 !important;  border-color: #ccc; \
			background: -moz-linear-gradient(top, #fff 0%, #eee 50%, #e8e8e8 50%, #e8e8e8 100%); \
			background: -webkit-linear-gradient(top, #fff 0%,#eee 50%,#e8e8e8 50%,#e8e8e8 100%); \
			background: -o-linear-gradient(top, #fff 0%,#eee 50%,#e8e8e8 50%,#e8e8e8 100%); \
			background: -ms-linear-gradient(top, #fff 0%,#eee 50%,#e8e8e8 50%,#e8e8e8 100%); \
			background: linear-gradient(top, #fff 0%,#eee 50%,#e8e8e8 50%,#e8e8e8 100%); \
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#fff\', endColorstr=\'#e8e8e8\',GradientType=0 ); \
		} \
		.moder .jvchat:active, .navig_prec .jvchat:active { background: #ddd; } \
		.lien_base .jvchat:hover { color: #333 !important; } \
		.lien_base .jvchat:active { background: #e8e8e8; } \
	';
	document.getElementsByTagName('head')[0].appendChild(elem);
}