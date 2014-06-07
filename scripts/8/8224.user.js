// ==UserScript==
// @name           Orkut Pics Enlarger!
// @namespace     http://www.devilsworkshop.org/2007/03/30/orkut-pics-enlarger-script/
// @description    Displays medium size pictures wherever there is some picture need to be shown in orkut! 
// @include        http://*.orkut.*/*
// ==/UserScript==


(function() {
		var i=document.getElementsByTagName('img');
		for (var j=i.length-1; j>1; j--) {
			var linkdata =  i[j].getAttribute("src");
			if (linkdata.match("small") == "small" ) {
				linkdata=linkdata.replace(/small/,'medium');
				//GM_log(linkdata);
				var newi = document.createElement ('img');
				newi.src = linkdata;
				i[j].parentNode.replaceChild( newi ,i[j]);
			}
 		}

	})();

//CSS fix needed here on window OnLoad event