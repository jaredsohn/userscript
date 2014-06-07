// ==UserScript==
// @name        okfun
// @namespace   com.samliu
// @include     http://*okfun.org/*
// @version     1.1
// ==/UserScript==

//讓 複製文字 可以在 Firefox 下運作	
unsafeWindow.copycode = function(obj) {
	try 
	{
		unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	} 
	catch (e) 
	{
		alert("被瀏覽器拒絕！\n請在瀏覽器網址列輸入'about:config'\n，將'signed.applets.codebase_principal_support'設為'true'");
	}

	var clipboard = unsafeWindow.Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(unsafeWindow.Components.interfaces.nsIClipboardHelper);  
	clipboard.copyString(obj.textContent);
	obj.style.color = "yellow";
	setTimeout(function() { obj.style.color = null }, 3000);
};

//捲動畫面	
if(location.href.indexOf("viewthread.php?") > 0)
{
	//捲動到 主題 區塊
	if(location.href.indexOf("#pid") < 0 && location.href.indexOf("&page=") < 0)
	{
		document.getElementsByClassName("mainbox viewthread")[0].getElementsByTagName("table")[0].scrollIntoView();
	}
	
	//如果有 隱藏區塊 且 感謝 過, 捲動到 隱藏內容
	var hidepass = document.getElementsByClassName("hidepass")[0];
	if (hidepass) hidepass.scrollIntoView();
}

//TAG 標籤搜尋，標示兩天內的文章出來
//一天之內 黃色標題
//兩天之內 粉色標題
if(location.href.indexOf("tag.php?") > 0)
{
	var today = new Date();
	var columns = document.getElementsByTagName("table")[0].tBodies;
	for each (var col in columns)
	{
		var coldate = new Date(col.getElementsByClassName("author")[0].children[1].innerHTML);
		var diffdate = (today - coldate) / 86400000;
		if (diffdate <= 1)
		{
			col.getElementsByTagName("th")[0].getElementsByTagName("a")[0].style.color = "yellow";
		}
		else if (diffdate <= 2)
		{
			col.getElementsByTagName("th")[0].getElementsByTagName("a")[0].style.color = "pink";
		}
		else
		{
			col.getElementsByTagName("th")[0].getElementsByTagName("a")[0].style.color = null;
		}
	}
}
