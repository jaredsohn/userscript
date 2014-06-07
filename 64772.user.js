// ==UserScript==
// @name           Pipisker
// @namespace      LeproCherdak
// @description    pipiskomer of cherdakers
// @include        *cherdak.leprosorium.ru*
// ==/UserScript==

(function() {

function action(){
	
	var tools = document.evaluate("//div[@class='kgb_sublepro_desc']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if(tools) {
		var toolsdiv=tools.snapshotItem(0);
		toolsdiv.innerHTML = toolsdiv.innerHTML + '<br/><br/><center><strong>Пиписькомер</strong><center><br/><a href="http://cherdak.leprosorium.ru/comments/720969"><img src="http://remizyaka.homeip.net/cherdak/top.png" style="margin:5px;border:0;"></a>';
	}
	
	
}

action();
})();