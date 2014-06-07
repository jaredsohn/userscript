// ==UserScript==
// @name           ResortProductCollections
// @namespace      YD
// @description    Resort Product Collections
// @version        0.1.5
// @include        https://*.myshopify.com/admin/custom_collections
// @require 			 http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require 			 http://tinysort.googlecode.com/svn/trunk/web/scripts/jquery.tinysort.min.js
// ==/UserScript==

$("table.collection-list").each(function() {
	var CollectionsUL = $("<ul class='collection'>");
	$(this).find("td").tsort("a",{attr:"title"}).each(function(){
		if( $.trim($(this).text()) != "") {
			var newLI = $("<li>");
			newLI.html($(this).html());
			var oHandle = $("<p class='handle'>");
			oHandle.text($(this).find("a").attr("title").replace("handle: ","").replace(/_/g, " » "));
			newLI.prepend(oHandle);
			CollectionsUL.append(newLI);
		}
	});
	$(this).replaceWith(CollectionsUL);	
});

$("p.handle").css("color","#8DB252").css("font-size","14px");
$("h3").css("clear","both");
$("ul.collection").css("list-style-type", "none");
$("ul.collection li").css("float", "left").css("width","395px").css("min-height","100px").css("margin","13px");
