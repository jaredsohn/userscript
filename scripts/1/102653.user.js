// ==UserScript==
// @name           add_links_to_pixort
// @namespace      http://d.hatena.ne.jp/firemagma/
// @description    Add links to Pixort next to tags./Pixivのイラストについたタグの隣に、Pixortで検索するリンクを追加します。
// @include        http://www.pixiv.net/*
// ==/UserScript==
(function(){
	var tags = document.evaluate('//*[@id="tags"]', document, null, 7, null );

	if(tags.snapshotLength)
	{
		var tagNames = tags.snapshotItem(0).getElementsByTagName("a");
		var length = tagNames.length;
		for(var i=0; i<length/2; i++ )
		{
			var tagElem = tagNames.item(3*i+1);
			var URL = tagElem.href.substring(23);
			URL = "http://www.pixort.net/index.php?word=" + URL;
			
			var linkElem = document.createElement('a');
			linkElem.href = URL;
			linkElem.target = "_blank";//新ウインドウで開きたくない場合はこの行を削除
			linkElem.innerHTML = "Px";
		
			if (tagElem) 
			{
				tagElem.parentNode.insertBefore(linkElem, tagElem.nextSibling);
			}
		}
	}
	else
	{
	}
})();