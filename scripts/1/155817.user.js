// ==UserScript==
// @name           nijie_no_carousel
// @version        1.1
// @namespace      http://userscripts.org/users/438377
// @author         henge
// @description    ニジエの「この絵で抜いた人はこんな絵でも抜いています」をカルーセルを使わずにすべて表示する
// @include        http://nijie.info/view.php?id=*
// @updateURL      https://userscripts.org/scripts/source/155817.meta.js
// @run-at         document-end
// ==/UserScript==

(function(){
	var css ='\
	#carouselPrev-view,#carouselNext-view{display:none;}\
	#carouselWrap-view,#carouselWrap-view ul.column{height:254px;}\
	#carouselInner-view{width:auto!important;margin-left:0!important;}\
	#carouselInner-view ul.column li a img{max-width:118px;margin:0,padding:0}\
	#carouselInner-view ul.column li{width:120px;height:122px;margin-top:5px;margin-right:5px}';

	(function(csstext){
		var sheet = document.body.appendChild(document.createElement("style"))
		sheet.type="text/css";
		sheet.textContent = csstext;
		sheet.id = 'outercss';
		return sheet;
	})(css);

	function reform(node){
		view = document.evaluate('.//div[@id="carouselInner-view"]', node, null, 7, null).snapshotItem(0);
		if(view){
			ul = view.getElementsByClassName("column");
			while(ul[1]){
				list = ul[1].getElementsByTagName("li");
				while(list[0]){
					ul[0].appendChild(list[0]);
				}
				view.removeChild(ul[1]);
			}
		}
	}

	document.body.addEventListener('AutoPagerize_DOMNodeInserted', function (evt) {
	    var node = evt.target;
	    reform(node);
	}, false);

	reform(document);
})();
