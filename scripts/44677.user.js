// ==UserScript==
// @name           hvymetal.com Tag Cloud
// @namespace      www.madin.jp
// @description    "この曲を聴け!" のタグをクラウドっぽく表示
// @include        http://www.hvymetal.com/song2/*.html
// ==/UserScript==

(function(){
	// find <font color=green size=-1>hoge/fuga/moge</font>
	var tagCounter = new Array();
	{
		var fontTags = document.getElementsByTagName('FONT');
		for (var unitIndex=0, unitLength=fontTags.length; unitIndex<unitLength; unitIndex++) {
			if ('green'==fontTags[unitIndex].color) {
				var tags = fontTags[unitIndex].innerHTML.split('/');
				for (var tagIndex=0, tagLength=tags.length; tagIndex<tagLength; tagIndex++) {
					var tag = tags[tagIndex];
					if (tagCounter[tag]) tagCounter[tag] ++;
					else tagCounter[tag] = 1;
				}
			}
		}
	}
	var tables = document.getElementsByTagName('TABLE');
	var table = tables[0];
	var cloudContainer = document.createElement('DIV');
	for (var key in tagCounter) {
		cloudContainer.appendChild ((function(key, count){
			var tagNode = document.createElement('SPAN');
			tagNode.innerHTML = key;
			// set tag style
			tagNode.style.color = 'green';
			tagNode.style.fontWeight = 'bold';
			tagNode.style.whiteSpace = 'nowrap';
			tagNode.style.paddingRight = '0.5em';
			tagNode.style.fontSize = (100 + 5 * Math.min(30, count)) + '%';
			return tagNode;
		})(key, tagCounter[key]));
	}
	table.parentNode.insertBefore(cloudContainer, table);
})();