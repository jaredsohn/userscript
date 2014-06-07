// ==UserScript==
// @name           Mixi OwnerLink
// @namespace      http://d.hatena.ne.jp/sucelie/
// @description    This script change ownername to linked-ownername links in mymixi's home page
// @include        http://mixi.jp/home.pl
// @include        http://mixi.jp/
// @version        0.2
// ==/UserScript==

(function() {
	var oElements = document.getElementsByTagName("dd");
	var n = oElements.length;
	for (var i = 0; i < n; i++) {
	    var oElement = oElements[i];
	    if (oElement.firstChild.tagName=="A" && oElement.firstChild.href.indexOf("view_diary.pl",0)>-1){
			var hiki = oElement.firstChild.href.split("&");
			for (var j = 0; j < hiki.length; j++) {
				var h = hiki[j];
				if(h.indexOf('owner_id',0)>-1){
					h = h.replace('owner_id=','');
					var re = /\(.*\)/;
					if(oElement.lastChild.nodeValue){
						var result = oElement.lastChild.nodeValue.match(re);
						var k = result[0];
						var c = document.createElement('a');
						k = k.substring(1,k.length-1);
						c.href = "http://mixi.jp/show_friend.pl?id=" + h;
						c.appendChild(document.createTextNode(k));
						
						//append
						oElement.removeChild(oElement.lastChild);
						oElement.appendChild(document.createTextNode(" ("));
						oElement.appendChild(c);
						oElement.appendChild(document.createTextNode(")"));
					}
				}
			}
		}
	}

})();
