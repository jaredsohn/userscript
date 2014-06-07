// ==UserScript==
// @name           ek$iue
// @namespace      http://userscripts.org/users/134635/scripts
// @description    '/@', yazarın başlık altındaki tüm yazılarını yeni bir sayfada gösterir.
// @author         dandikos
// @version        0.1
// @include        http://sozluk.sourtimes.org/show.asp?*
// @include        http://www.eksisozluk.com/show.asp?*
// ==/UserScript==

window.addEventListener(
	'load',
	function() {
		var authors = document.evaluate("//div[@class='aul']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
		for (var i = 0; i < authors.snapshotLength; i++) {
			author = authors.snapshotItem(i);
			injection = author.getElementsByTagName('tr')[0];						
			athrbtn = '<td><a target="_blank" onmousedown="md(this)" onmouseup="bn(this)" '
					  +'onmouseover="ov(this)" onmouseout="bn(this)" class="but" '
					  +'title="yazarın bu başlıktaki tüm yazıları"'
					  +'href="http://sozluk.sourtimes.org/show.asp?t='
					  +document.getElementsByName('t').item(0).value
					  +'/@'+author.childNodes[1].innerHTML+'">&nbsp;'+'/@'+'&nbsp;</a></td>';			
			injection.innerHTML += athrbtn;
		}
	},
false);