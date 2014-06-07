// ==UserScript==
// @name        Ankama prevention page enhancement
// @description Suppresses the annoying 8 seconds timer and shows the domain of the URL in the question
// @namespace   xn
// @include     http://go.ankama.com/*
// @include     https://go.ankama.com/*
// @version     1
// ==/UserScript==
if ('bind' in Function.prototype &&
	'getElementsByClassName' in document)
(function () {
	// Function manipulation
	var bind = Function.prototype.bind;
	var call = Function.prototype.call;
	var uncurryThis = bind.bind(call);
	
	// Array manipulation
	var slice = Array.prototype.slice;
	var toArray = uncurryThis(slice);
	var takeFirst = function (array) { return array[0]; };
	
	// More function manipulation
	var compose = function (f, g) {
		return function () {
			return g(f.apply(null, toArray(arguments)));
		};
	};
	
	// DOM manipulation
	var byClassAll = document.getElementsByClassName.bind(document);
	var byClass = compose(byClassAll, takeFirst);
	
	// Regular expressions
	var uri = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/;
	var closedTLDs = /^(?:a[lru]|b[dnrtv]|c[sy]|dd|e[rt]|fk|g[bhnu]|i[dl]|jm|k[ehpw]|l[brs]|m[mqtz]|n[ipz]|om|p[agy]|qa|s[bjvxz]|t[hz]|(?:sch\.)?uk|v[ae]|y[eu]|z[amw])$/;
	var thisSite = /(?:ce|this|este) site|questo sito|diese webseite|esta p[aá]gina/gi;
	var dot = /\./g;
	
	// Page DOM nodes
	var gotowebsite = byClass('gotowebsite');
	var btn_timer = byClass('btn_timer');
	var btn_yes = byClass('btn_yes');
	var gotowebsiteLabel = gotowebsite ? gotowebsite.firstChild : null;
	
	// Here we go
	if (btn_yes && gotowebsiteLabel) {
		var uriParts = uri.exec(btn_yes.href);
		var domain = uriParts[4].toLowerCase().split(dot);
		if (domain[0] == 'www')
			domain.shift();
		var tld = domain.pop();
		while (domain.length > 1 && closedTLDs.test(tld))
			tld = domain.pop() + '.' + tld;
		gotowebsiteLabel.nodeValue = gotowebsiteLabel.nodeValue.replace(
			thisSite, domain.pop() + '.' + tld);
	}
	if (btn_yes && btn_timer) {
		btn_timer.style.display = 'none';
		btn_yes.style.display = 'inline-block';
	}
})();