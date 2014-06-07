// ==UserScript==
// @name        BaiduPanMD5Button
// @include     http://pan.baidu.com/disk/home*
// @include     http://pan.baidu.com/share/link*
// @include     http://yun.baidu.com/share/link*
// @include     http://pan.baidu.com/s/*
// @match	http://pan.baidu.com/disk/home*
// @match	http://pan.baidu.com/share/link*
// @match	http://yun.baidu.com/share/link*
// @match	http://pan.baidu.com/s/*
// @version     1.3.3
// @author      nsps5606
// @date	2013-10-07
// @homepageURL	http://userscripts.org/scripts/show/156906
// @updateURL	https://userscripts.org/scripts/source/156906.meta.js
// ==/UserScript==

var url = document.URL;

var tbcss = "";
tbcss += ".md5table td{border: 1px solid black; padding: 2px; width: 100%;}";
GM_addStyle(tbcss);

var md5btn = document.createElement("button");
md5btn.innerHTML = "顯示MD5";
md5btn.type = "button";
md5btn.onclick = showMD5;
md5btn.style.cssText = 'margin: 0px 10px;height: 28px;';

// 分享頁面
if(url.indexOf("http://pan.baidu.com/share/link") != -1 || url.indexOf("http://yun.baidu.com/share/link") != -1 || url.indexOf("http://pan.baidu.com/s/") != -1)
{
	// 分享頁面中子目錄
	if(url.indexOf("#dir/path=") != -1)
	{
		document.getElementsByClassName("link-title clearfix")[0].appendChild(md5btn);
	}
	// 分享頁面根目錄
	else
	{
		// 根目錄只有單一檔案(會有mainContent DIV)
		if(document.getElementById("mainContent") != null)
		{
			var htmlbody = document.body.innerHTML;
			var idx = htmlbody.indexOf("\\\"md5\\\":");
			var md5 = htmlbody.substring(idx + 10, idx + 42);
			var md5info = document.createElement("dd");
			var md5info2 = document.createElement("span");
			var md5info3 = document.createElement("span");
			md5info.className = "view-file-content clearfix";
			md5info2.innerHTML = "MD5："
			md5info3.innerHTML = md5;
			md5info.appendChild(md5info2);
			md5info.appendChild(md5info3);
			
			/*
			  media_type_0: 以下種類之外的檔案
			  media_type_1: 圖片
			  media_type_2: 音樂
			  media_type_3: 文檔
			  media_type_4: 視頻
			  
			  圖片、音樂、文檔、視頻因有特殊顯示方式，故在下方鏈結上面添加MD5。
			  其他檔案在檔案資訊中添加MD5。
			*/
			if(document.getElementsByClassName("media_type_0").length > 0)
			{
				document.getElementsByClassName("view-file-content clearfix")[0].parentNode.appendChild(md5info);
			}
			else
			{
				var copy_div = document.getElementById("copy-outer");
				copy_div.parentNode.insertBefore(md5info, copy_div);
			}
		}
		// 根目錄中多於一個檔案
		else
		{
			document.getElementsByClassName("link-title clearfix")[0].appendChild(md5btn);
		}
	}
}
// 自己的網盤
else if(url.indexOf("http://pan.baidu.com/disk/home") != -1)
{
	document.getElementsByClassName("b-list-2 bar-cmd-list")[0].appendChild(md5btn);
}

/**
 * 點擊按鈕時執行的動作
 */
function showMD5()
{
	url = document.URL;
	var listurl = ""; // 請求檔案列表的URL
	
	// 自己的網盤
	if(url.indexOf("pan.baidu.com/disk/home#dir/path=") != -1)
	{
		listurl += "http://pan.baidu.com/api/list?channel=chunlei&clienttype=0&web=1&page=1&dir=";
		listurl += url.substring(url.indexOf("=") + 1);
		getList();
	}
	// 分享頁面
	else if(url.indexOf("pan.baidu.com/share/link") != -1 || url.indexOf("yun.baidu.com/share/link") != -1)
	{
		if(url.indexOf("#dir/path=") != -1)
		{
			listurl += "http://pan.baidu.com/share/list?channel=chunlei&clienttype=0&web=1&page=1&";
			listurl += url.replace(/.*(?:pan|yun).baidu.com\/share\/link[?]/,"").replace("#dir/path","&dir");
			getList();
		}
		else
		{
			showMD52();
		}
	}
	// 分享頁面(短網址)
	else if(url.indexOf("pan.baidu.com/s/") != -1)
	{
		if(url.indexOf("#dir/path=") != -1)
		{
			var shareid = /FileUtils\.share_id=\"(\d+)\"/.exec(document.body.innerHTML);
			var uk = /FileUtils\.share_uk=\"(\d+)\"/.exec(document.body.innerHTML);
			if(shareid && uk)
			{
				listurl += "http://pan.baidu.com/share/list?channel=chunlei&clienttype=0&web=1&page=1&order=name&desc=0";
				listurl += ("&shareid=" + shareid[1] + "&uk=" + uk[1]);
				listurl += url.replace(/.*#dir\/path/,"&dir");
				getList();
			}
		}
		else
		{
			showMD52();
		}
	}
	else if(url == "http://pan.baidu.com/disk/home")
	{
		listurl += "http://pan.baidu.com/api/list?channel=chunlei&clienttype=0&web=1&page=1&dir=";
		listurl += "%2f";
		getList();
	}

	// 取得檔案列表
	function getList()
	{
		GM_xmlhttpRequest
		({
			method : 'GET',
			synchronous : true,
			url : listurl,
			onload : function (reText)
			{
				var JSONobj = JSON.parse(reText.responseText);
				var x = JSONobj.list.length;
				var str = "";
				var str2 = "";
				for(i = 0;i < x; i++)
				{
					if(JSONobj.list[i].isdir == 1)
					{
					}
					else
					{
						str += (JSONobj.list[i].server_filename + "\t" + JSONobj.list[i].md5 + "\n");
						str2 += ("<tr><td>" + JSONobj.list[i].server_filename + "</td><td>" + JSONobj.list[i].md5 + "</td></tr>");
					}
				}
				//alert(str);
				showMD5Dlg(str2);
			}
		})
	}
}

function showMD52()
{

	var a = document.body.innerHTML.match(/\[\{\\\"fs_id\\\".+\}\]/);

	var b = a[0].split("\\\\");
	var c = b[0].replace(/\\/g,"");
	for(i = 1; i < b.length; i++)
	{
		c += ("\\" + b[i].replace(/\\/g,""));
	}
	c = "{\"list\":" + c + "}";

	var JSONobj = JSON.parse(c);

	var x = JSONobj.list.length;
	var str = "";
	var str2 = "";
	for(i = 0;i < x; i++)
	{
		if(JSONobj.list[i].isdir == 1)
		{
		}
		else
		{
			str += (JSONobj.list[i].server_filename + "\t" + JSONobj.list[i].md5 + "\n");
			str2 += ("<tr><td>" + JSONobj.list[i].server_filename + "</td><td>" + JSONobj.list[i].md5 + "</td></tr>");
		}
	}
	//alert(str);
	showMD5Dlg(str2);
}

function showMD5Dlg(content)
{
	var inner = "";
	inner += '<div class="dlg-hd b-rlv"> <span title="關閉" class="dlg-cnr dlg-cnr-r"></span> <h3><strong class="f333">MD5：</strong></h3> </div> <div class="dlg-bd"> <div id="_disk_id_5" class="dlg-inner-bd b-bdr-1"> <table class="md5table"> <tr><td>檔案名稱</td><td>MD5</td></tr>';
	inner += content;
	inner += '</table> </div> </div>';
	
	var dlgdiv = document.createElement("div");
	dlgdiv.className = "b-panel b-dialog move-dialog md5dlg";
	dlgdiv.innerHTML = inner;
	dlgdiv.style.cssText = 'display: block;';
	document.body.appendChild(dlgdiv);
	
	document.getElementsByClassName("dlg-cnr dlg-cnr-r")[0].onclick=function(e){
		document.body.removeChild(document.getElementsByClassName("md5dlg")[0]);
	}
}