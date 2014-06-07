// ==UserScript==
// @name           GAF Interface
// @namespace      general
// @include        http://www.getafreelancer.com/projects/*
// ==/UserScript==


GM_addStyle('#projectResults a:visited { color:#B33 }');

var projDet = document.getElementById('projectDetailsContent');
projDet.innerHTML = projDet.innerHTML.replace(/(<\/h3>)([^\0]*?)(<div[^>]*?horizontalLine[^>]*?>)/, function(m,b,c,e){
	return b+m.replace(/(?:((?:ht|f)tps?:\/*)|www\.)[^\s<>]*[^\s()[\]{}<>,.]/g, function(a,s){
		return '<a href="'+a+'">'+a+'</a>';
	})+e;
});
