// ==UserScript==
// @name           Better Rep-report
// @namespace      stackoverflow
// @include        http://stackoverflow.com*/reputation*
// @include        http://meta.stackoverflow.com*/reputation*
// @include        http://superuser.com*/reputation*
// @include        http://serverfault.com*/reputation*
// ==/UserScript==

lines=document.body.textContent.split('\n');
document.body.textContent='Loading...';

GM_xmlhttpRequest({
  method: "GET",
  url: "http://"+location.hostname+"/users/logout",
  onload: function(response){
	document.body.textContent='';
	rep=+response.responseText.match(/title="reputation score">([\d\,]+)<\/span>/)[0].replace(/\D+/g,'');
	pre = document.createElement('pre');
	cap_total=0, cap=0;
	lines.push("** rep-cap: ")
	for(i=0;i<lines.length;i++){
		if (/[*-]{2}/.test(lines[i])) cap>=200?cap_total++:null, cap=0;
		cap+=/\s+[23]\s+\d+\s+[\[\(]([\d-]+)[\)\]]/.test(lines[i]) && +RegExp.$1 || 0;
		div = document.createElement('div');
		if(/:\)/.test(lines[i])) lines[i]=lines[i].replace(/(\d+)( :\))/,function(x,a){return +a<rep?a+' ('+(+a-rep)+') :(':a+' (+'+(+a-rep)+') :-)';});
		if(/rep-cap/.test(lines[i])) lines[i]+=cap_total;
		t = document.createTextNode(lines[i]);
		div.appendChild(t);
		pre.appendChild(div);
	}
	document.body.appendChild(pre); 
  }
});

