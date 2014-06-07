// ==UserScript==
// @name           Bing PDF/DOC Reusults Indicator
// @namespace      http://userscripts.org/users/copypastetada
// @include        http://www.bing.com/search?q=*
// ==/UserScript==
(function(){
		var l = document.getElementsByTagName("a");
		var i = l.length; 
		while (i--) {
			if (l[i].href.match(/^[^?]+\.(doc|docx)$/i)) { ///^https*:([^?]+|[^:]+)\.
				extxt = document.createElement("font");
				extxt.innerHTML = '<font color=\"#0044CC\" size=\"1\"><b>[DOC]</b> </font>';
				l[i].parentNode.insertBefore(extxt, l[i]);}
			if (l[i].href.match(/^[^?]+\.(pdf)$/i)) {
				extxt = document.createElement("font");
				extxt.innerHTML = '<font color=\"#0044CC\" size=\"1\"><b>[PDF]</b> </font>';
				l[i].parentNode.insertBefore(extxt, l[i]);}
		}

	//Delete File Type Text	
	//var repTxt = document.body.innerHTML.match(/PDF file/ig);
	//if (repTxt != null && repTxt.length > 0)	{
	//		document.body.innerHTML = document.body.innerHTML.replace(/PDF file/ig,'');
	//		document.body.innerHTML = document.body.innerHTML.replace(/DOC file/ig,'');}
})();
