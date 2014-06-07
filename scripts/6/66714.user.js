// ==UserScript==

// @name           bahahome

// @namespace      ronmi@rmi.twbbs.org

// @description    remove redir

// @include        http://home.gamer.com.tw/*

// ==/UserScript==





(function(){
	var h=document.getElementsByTagName('head')[0];

	var e=document.createElement('script');
	var f=function(){jQuery('a').each(function(i){

		var a=this.getAttribute('href');

		var f;

		if(/redir\.php\?url/.test(a))

		{

			f=a.substr(a.search(/redir\.php\?url=/)+"redir.php?url=".length);

			this.setAttribute('href', unescape(f));

		}		

	});};

	e.src='http://code.jquery.com/jquery-latest.min.js';

	e.type='text/javascript';

	h.appendChild(e);

	e=document.createElement('script');
	e.type='text/javascript';

	e.innerHTML="<!--\n("+f.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')+")()\n// -->";

	document.body.appendChild(e);

})()
