// ==UserScript==
// This script will change your Google search such that the first result points wherever you want it to.
//
// @name           Google Search Mucker
// @namespace      Salesforce
// @include        http://www.google.com/*ZTS*
// ==/UserScript==
(function()
{	
	//First, be sure to install this other script also to remove redirects: http://userscripts.org/scripts/show/29812
	
	var currentUrl = location.href;
	
	GM_log("url:"+currentUrl);
	if (currentUrl.indexOf("www.google.com/#")>0 || currentUrl.indexOf("btnG")>0) {
		var searchHashPattern = /&q=([^&]*)/;
		//var  = currentUrl.match(searchHashPattern);
		var matches = searchHashPattern.exec(currentUrl);

		GM_log("searchTerm:"+matches[0]);
		
		if (matches[0]!=null) {
			var split = matches[0].split("=");
			var newUrl = "http://www.google.com/search?q=" + split[1];
			GM_log("redirect to "+newUrl);
			location.href = newUrl;
		}
	} else {
		//Now change these variables to say and point to where you want them.
		var searchUrl = "http://sdo-129a67ec89d.force.com/Public/articles/How_To/How-do-I-upgrade-the-memory-in-my-ZTS-Home-Laptop?retURL=%2Fapex%2FSite_KnowledgeHome%3Fc%3DProduct_Support%26k%3D";
		var searchTitle = "Adding Memory To A ZTS Laptop";
		var searchDescription = "Details how to install new memory into a ZTS laptop";

		var allOLs = document.getElementsByTagName("ol");
		
		if (allOLs.length!=0) {	
		
			var liHtml = 	'<li class="g w0">' +
								'<h3 class="r">' +
									'<a href="' + searchUrl + '">' +
										searchTitle +
									'</a>' +
								'</h3>' +
								'<span style="display: inline-block;">' +
									'<button class="ws" title=""></button>' +
								'</span>' +
								'<div class="s">'+
									searchDescription +
									'<b>...</b>' +
									'<br/>' +
									'<cite>' +
										searchUrl +
									'</cite>' +
									'<span class="g1">' +
										' - <a href="javascript:false;">Cached</a> - <a href="javascript:false;">Similar</a>' +
									'</span>' +
								'</div>' +
							'</li>';
						
			for (i=0; i<allOLs.length; i++) {
				var ol = allOLs[i];
				if (ol.firstChild!=null) {
					ol.innerHTML = liHtml + ol.innerHTML;
				}
			}
		}
	}
	
	var m=document.getElementsByTagName("body");
	m[0].innerHTML=m[0].innerHTML.replace(/return rwt/g, "hÃ³gyne"); 
}
)();