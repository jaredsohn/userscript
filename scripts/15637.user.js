// ==UserScript==
// @name           Highlighter
// @namespace      http://slayeroffice.com/?c=/content/tools/highlighter.html
// @description    Highlighter Favelet, ported to GreaseMonkey by SanskritFritz
// ==/UserScript==
(function()
{
	// Words to get highlighted:
	void( s=  'foo|bar|something'  );

	s='('+s+')';
	x=new RegExp(s,'gi');
	rn=Math.floor(Math.random()*100);
	rid='z' + rn;
	b = document.body.innerHTML;
	b=b.replace(x,'<span name=' + rid + ' id=' + rid + ' style=\'color:#FFF;background-color:red;\'>$1</span>');
	void(document.body.innerHTML=b);
})();
