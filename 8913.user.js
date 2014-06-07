// ==UserScript==
// @name           UserScripts Top Installs [Reloaded]
// @namespace      http://www.iescripts.org/
// @description    UserScripts Top Installs
// @include        http://*userscripts.org/
// ==/UserScript==


(function() {

function getValue(s, start, end)
{
	var p1 = s.indexOf(start);
	if(p1 == -1) return '';

	p1 += start.length;

	var p2 = s.indexOf(end, p1);
	if(p2 == -1) return '';

	return s.substring(p1, p2);
}

function trim(str)
{
	return str.replace(/^\s*|\s*$/g,"");
}

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://opencjk.org/~yumj/userscripts/',
	onload: function(resp){

		var form = document.getElementsByTagName('form')[0];
		var div = document.createElement('div');
		div.style.width='220px';
		div.style.marginTop = '15px';
		div.style.marginLeft = '4px';
		div.style.marginBottom = '12px';
		div.style.padding = '0px';
		div.style.fontSize = '11px';

 
		div.innerHTML = resp.responseText;

		form.parentNode.insertBefore(div, form.nextSibling);
	}
});

})();
