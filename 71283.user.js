// ==UserScript==
// @name         Wall Street Journal Remove Social Tools From Articles
// @namespace    wsjRemoveSocialToolsFromArticles
// @include      http://*.wsj.com/article/*
// @include      http://wsj.com/article/*
// @include      https://*.wsj.com/article/*
// @include      https://wsj.com/article/*
// @match        http://*.wsj.com/article/*
// @match        http://wsj.com/article/*
// @match        https://*.wsj.com/article/*
// @match        https://wsj.com/article/*
// @datecreated  2010-03-12
// @lastupdated  2010-03-13
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will remove the social tools from articles at the Wall Street Journal.
// ==/UserScript==

(function(d){
	var tools = d.getElementById('ambt.at.containers');
	if(tools){
		tools.parentNode.removeChild(tools);
	}
	tools = d.getElementById('abt.at.container');
	if(tools){
		tools.parentNode.removeChild(tools);
	}
})(document);
