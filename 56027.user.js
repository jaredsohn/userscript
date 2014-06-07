// ==UserScript==
// @name           Jive SBS Local Links
// @namespace      http://userscripts.org/users/38044
// @description    Updates file anchors to work with Firefox
// @include        http*
// ==/UserScript==

var body = document.getElementsByTagName('body');

	if(body.length == 1)
	{		
		var divs = document.getElementsByTagName('div');
		if(divs.length > 0)
		{
			for (var i=0; i < divs.length; i++)
			{

				if( (divs[i].className=="jive-wiki-body-content" || divs[i].className=="jive-rendered-content") && divs[i].innerHTML.indexOf('href="file://') != -1){
					var htmlTxt = divs[i].innerHTML;
					var filerefs = htmlTxt.split("file://");
					var replacementHTML = filerefs[0];
					for(var j=1; j<filerefs.length;j++){
						replacementHTML=replacementHTML+"file://///"+filerefs[j];
					}
					divs[i].innerHTML=replacementHTML;
				}

			}
		}
	
	}