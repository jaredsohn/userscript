// ==UserScript==
// @name Service Desk fixer
// @description Service Desk fixer
// @namespace servicedeskfixer
// @include http*://ENTER.YOUR.DOMAIN.HERE/*
// ==/UserScript==

var yourbases = document.getElementsByTagName("base");

for (var i = 0; i < yourbases.length; i++) {
	var yourbase = yourbases[i];
	yourbase.parentNode.removeChild(yourbase);
}

// see http://www.servicedeskusers.com/forum/index.php?showtopic=7301&view=findpost&p=26470