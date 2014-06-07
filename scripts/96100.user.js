// ==UserScript==
// @name           Find Broken Links
// @namespace      guarascio
// @description    Finds all broken links in A HREF tags, and highlight in yellow.
// @require        http://code.jquery.com/jquery-1.5.min.js
// ==/UserScript==

$("[href]").each(function(){
	//alert("link name = " + $(this).attr('href'));
	
	getUrlStatus($(this), $(this).attr('href'), function(linkObject, status) {
		//alert(linkObject.attr('href') + " = " + status);
		if(status >= 400 || status == 0)
		{
		    linkObject.css("background","#ff0");
		}
	});
});

function getUrlStatus(linkObject, url, callback) {
     $.ajax({
         url: url,
         complete: function(xhr) {
             callback(linkObject, xhr.status);
         }
     });
 }
