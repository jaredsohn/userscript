// ==UserScript==
// @name           mfcad_download
// @namespace      http://userscripts.org/users/double0z
// @include        http://www.mfcad.com/cad/*/*
// @require http://userscripts.org/scripts/source/122726.user.js
// ==/UserScript==

var link_xpath = "//div[@class='down_left_list']/div[@class='down_left_list down_boder']/div[@class='help_bottom_list']/div[@class='list_shuoming_list']/dl/dd[@class='list_more']/a";
GMZ.xPath(link_xpath, function(link) {
	// http://www.mfcad.com/cad/119/1913.html
	// http://www.mfcad.com/plus/download.php?aid=1913

	// make link
	var page_path = link.href.replace(
			/www.mfcad.com\/[0-9|a-z|A-Z]*\/[0-9]*\/([0-9]*)\.html/ig,
			"www.mfcad.com/plus/download.php?aid=$1");

	GM_xmlhttpRequest({
		method : 'GET',
		url : page_path,
		overrideMimeType : 'text/html; charset=x-user-defined',
		onload : function(response) {
			var rows = response.responseText.split('\n');
//			alert(response.responseText.split('\n').length);
//			for ( var i = 0; i < rows.length; i++) {
//				if(rows[i].indexOf("98c1ab4436e12b76ebd3a81e") != -1){
//					alert(i);
//				}
//			}
// 这段代码帮忙找到特定的行数        			
			//<li><a href="/plus/download.php?open=2&id=1913&uhash=98c1ab4436e12b76ebd3a81e" target="_blank">迅雷用户下载</a></li>
			link.href = rows[103].replace(/.*href="([^"]*)".*/,"$1");
		}
	});
})