// ==UserScript==
// @name           add Tags on Pixiv ranking
// @namespace      http://d.hatena.ne.jp/Youth07/
// @description    add Tags on Pixiv ranking
// @include        http://www.pixiv.net/ranking*
// ==/UserScript==

(function() {
	var javaScript =
		function getTags(url,index){
			var indexRef = "show" + index;
			var changeButton = document.getElementById(indexRef);	
			var req = new XMLHttpRequest();
			req.onreadystatechange = processReqChange;
			req.open("GET", url, true);
			req.send(null);

			function processReqChange(){
				if (req.readyState == 1) {
					changeButton.innerHTML = "loading...";
				}
				if (req.readyState == 4) {
					changeButton.innerHTML = "complete";
					var div = document.createElement('div');
					div.innerHTML = req.responseText;
					var tag = document.evaluate(".//*[@id='tags']/a | .//*[@id='tags']/span", div, null, 7, null);
					
					var emphasis = 0;
					var tagsSpace = document.createElement('div');
					var txtNode = document.createTextNode('Tags');
					tagsSpace.appendChild(txtNode);
					
					for (var i = 0; i < tag.snapshotLength; i++){
						var inner = tag.snapshotItem(i).innerHTML;

						if(inner.slice(0,4) == '<img'){
						}else{

							if (inner == '*'){
								emphasis = 1;
							}else{
								if (emphasis == 1){
									var interTags = document.createTextNode(' :: ');
									tagsSpace.appendChild(interTags);
									var bold = document.createElement('b');
									bold.innerHTML = inner;
									var font = document.createElement('font');
									font.color = "#b84e25";
									font.appendChild(bold);
									tagsSpace.appendChild(font);
									emphasis = 0;
								}else{
									var interTags = document.createTextNode(' :: ');
									tagsSpace.appendChild(interTags);
									var textNode = document.createTextNode(inner);
									tagsSpace.appendChild(textNode);
								}
							}
						}
					}
					changeButton.parentNode.insertBefore(tagsSpace, changeButton.nextSibling);
				}
			}
		}
	;
	var scriptSpace = document.createElement('script');
	scriptSpace.type = 'text/javascript';
	scriptSpace.innerHTML = javaScript;
	document.body.appendChild(scriptSpace);

	var allLinks;
	allLinks = document.evaluate("//span[@class='f14b']/a", document, null,XPathResult. ORDERED_NODE_SNAPSHOT_TYPE, null);
	var allTitles;
	allTitles = document.evaluate("//span[@class='f14b']", document, null,XPathResult. ORDERED_NODE_SNAPSHOT_TYPE, null);

	var thisTitle;
	for (var i = 0; i < allTitles.snapshotLength; i++){
		var j = i+1;
		thisTitle = allTitles.snapshotItem(j);
		var tagButton = document.createElement('span');
		var urlu = allLinks.snapshotItem(i);
		var linkId = "show" + i; 
		tagButton.innerHTML = " - <a href=\"#\" id=\"" + linkId + "\" onClick=\"getTags(\'" + urlu + "\'," + i + ");return false;\"> show_tag</a>";
		thisTitle.parentNode.insertBefore(tagButton, thisTitle.nextSibling);
	}
})();