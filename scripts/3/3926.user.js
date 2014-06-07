// ==UserScript==
// @name		Anchor Links
// @namespace	http://www.citizenx.cx/greasemonkey/
// @description	Adds a link to anchors that may not have one
// ==/UserScript==

(function()
{
	var icon_url = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%0F%08%02%00%00%00R%9D%C9Y%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%01%3AIDATx%DA%5C%90%A1%CB%C2P%14%C5%2FoOlj%D2%F4%C0a2%2C%AC%0A%3A%FD7%166%B0%8E%C1%92i%B6%FD%03%06Y5%DB%AC%06%A3e%16%83%88%08%83%A5%C1%40%26%C2%E0%F1%1E%F3%19%9E%EE%1B%DFI%E7%FE%EE%E5%5C8%20~%8A%E3%D8%B6m%CF%F3%F6%FB%7D%051%FCD)%25%84%F4%FB%FD%E7%F3YA%105m%B7%5B%D7u%85%10%94%D2%B2%2C%85%10%08%00%5E%AFW%18%86%E7%F3%B9(%8A%2C%CB%0E%87%83%E38%C7%E3%11%00%B0%0C%B8%DDn%9A%A61%C68%E7%BA%AEw%BB%DD%5E%AF%F7%3F%FCr%B9%2C%16%8B%3AAP%13%C6%B8%D3%E9%D4%09%BA%DF%EF%F5YQ%94%CA%9FN'4%9F%CF%93%24%F9%DE%A2%BF%B0%24I%2C%CBB%84%90%A2(%24j6%9B%18%7F%9Bh%B5Z%A6i%22%C30%AA%7FB%88%B2%2C%A5o%B7%DB%8A%A2%20UU7%9B%8DD%8C%B1%F7%FB-%7D%14E%9Cs4%9B%CD%AE%D7%EBn%B7%03%00%CE9%A5T%AE%D7%EB%F5d2%C1%8DFc%B9%5C%BA%AE%FBx%3C%86%C3!c%2CMS%DF%F7UU%9DN%A7%DFZ%F2%3C%0F%82%604%1A%0D%06%83%F1x%BCZ%AD%24%FF%0C%00%A4%40%CB%B7Iu%D5%1F%00%00%00%00IEND%AEB%60%82";
	var icon = document.createElement('img');
	    icon.src = icon_url;
	    icon.style.border = 'none';
	    icon.width  = 10;
	    icon.height = 15;
	
	var anchors = document.evaluate('//a[@name]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < anchors.snapshotLength; i++)
	{
		var anchor = anchors.snapshotItem(i);
		
		var link = document.createElement('a');
		    link.href = '#' + anchor.name;
		    link.appendChild(icon.cloneNode(false));
		
		anchor.parentNode.insertBefore(link, anchor.nextSibling);
	}
})();
