// ==UserScript==
// @name		CE forum redirector
// @namespace	CE
// @description 	Redireciona '...' a la ultima pagina
// @include	http://www.crisisenergetica.org/forum/
// @include	http://www.crisisenergetica.org/forum/index.php*
// ==/UserScript==

cpp=20;
document.addEventListener('click', 
	function(event) {
		if (event.target.href.match('forum')) {
			if (event.target.href.match('show') == null) { event.target.href = event.target.href+'&show'+cpp; }
			if (event.target.textContent=='...') {
				str = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.textContent;			
				str2 = event.target.href;
				str2 = str2.substring(0,str2.length-12);
				str2 = str2.substring(0,str2.lastIndexOf('&'));
				event.target.href = str2+'&show='+cpp+'&page='+Math.ceil(str/cpp);			
			}
		}		
}, true);