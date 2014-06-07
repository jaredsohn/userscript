// ==UserScript==
// @name           BibleGateway.com Reference Remover
// @author         James N. Anderson
// @namespace      http://www.proginosko.com
// @description    Removes superscript references in passages from BibleGateway.com
// @version        0.1
// @include        http://www.biblegateway.com/passage/*
// ==/UserScript==


var content = document.getElementById('content');

// Remove all superscript hyperlinked references
content.innerHTML = content.innerHTML.replace(/<sup>[\(\[]<a.*?a>[\)\]]<\/sup>/g, '');
