// ==UserScript==
// @name          ScriptRunner
// @namespace     http://blog.wsktoolbar.com
// @description	  Adds a button to every userscript link on the web which let you run it without installing.
// @version       0.0.1
// @include       http://*userscripts.org*
// @include       *
// ==/UserScript==

//By WKSTB.
(function() {

	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.user.js$/i))
		{
			var executeButton = document.createElement("button");
			executeButton.innerHTML = "Run script";
			executeButton.href = page_links[i].href;
			with(executeButton.style)
			{
				border = "1px solid black";
				fontSize = "-1";
			}
			executeButton.addEventListener("click",
			function(){
			GM_xmlhttpRequest ( 
			{
				method : "GET",
				url : executeButton.href,
				onload : function(details) 
				{
				    if (details.readyState == 4) 
				    {
				      if (details.status != 200) {
					return;
				      }
					try{
						eval(details.responseText);
						alert("Script executed");
					}
					catch(e){
					   alert("Error on script:"+e);				
					}
				     }
				 }
			});
			},true);
			page_links[i].parentNode.insertBefore(executeButton, page_links[i].nextSibling)
		}
	}
})();
