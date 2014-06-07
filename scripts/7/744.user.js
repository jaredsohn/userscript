// ==UserScript==
// @name          Webster-say-word
// @namespace     http://kailasa.net/userscripts
// @description	  say word on mouse hover
// @include       http://webster.com/*
// @include       http://www.webster.com/*
// @include       http://m-w.com/*
// @include       http://www.m-w.com/*
// ==/UserScript==

(function() {
    function play_word(str)
    {
	var matches = this.href.match(/([a-zA-Z0-9]+.wav)/);
	if (matches) {
	    var audio_file = matches[1];
	    var audio_href = 'http://cougar.eb.com/sound/' + audio_file.substring(0, 1) + '/' + audio_file;
	    add_embed_elem(audio_href);
	}
    }

    function add_embed_elem(href)
    {
	var audio_embed_el = document.getElementById('audio_embed');
	if (audio_embed_el) {
	    audio_embed_el.parentNode.removeChild(audio_embed_el);
	}
	audio_embed_el = document.createElement('embed');
	audio_embed_el.id = 'audio_embed';
	audio_embed_el.setAttribute('src', href);
	audio_embed_el.setAttribute('autostart', 'true');
	audio_embed_el.setAttribute('loop', 'false');
	audio_embed_el.setAttribute('hidden', 'href');

	document.getElementsByTagName('body')[0].appendChild(audio_embed_el);
    }

    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
	var matches = links[i].href.match(/javascript:popWin\('([^']+)'\)/);
	if (matches) {
	    //links[i].href = matches[1];
	    links[i].addEventListener("mouseover", play_word, true);
	}
    }
})();

