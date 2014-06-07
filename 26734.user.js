// ==UserScript==
// @name           pg_pin
// @description    Pin PostgreSQL docs to the current version with comments
// @include        http://www.postgresql.org/docs/*/*/*
// @exclude        http://www.postgresql.org/docs/current/interactive/*
// ==/UserScript==

(function(){

var p = document.location.pathname.split('/')
	.filter(function(x) { return x != ''; });
p[1] = 'current';
p[2] = 'interactive';
document.location.pathname = p.join('/');

})();
