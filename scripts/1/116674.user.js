// ==UserScript==
// @name           Barclays Fantasy Fundmanager - stay logged in
// @namespace      http://userscripts.org/users/lorriman
// @description    Stops annoying (and unnecessary) auto-logout
// @include        https://www.barclaysfantasyfundmanager.co.uk/*
// @version .2
// ==/UserScript==


function setup(){
	window.setTimeout(fetchpage,60000);
}

window.fetchpage = function(){
	 



	GM_xmlhttpRequest({
					method: 'get',
					url: "https://www.barclaysfantasyfundmanager.co.uk/Default.aspx",
					
			
					onload:function(){ setup();}
				});
			
	}
	
	
setup();
