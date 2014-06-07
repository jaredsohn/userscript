// ==UserScript==
// @name           Userscript.org 正體中文化
// @namespace      Ian Chu
// @include        http://userscripts.org/*
// @version        0.4.1
// ==/UserScript==

// 完成度 30%~40%


function doHeader(header) {
	for (j in header.getElementsByTagName("li")) {
		a = header.getElementsByTagName("li")[j].getElementsByTagName("a")[0];
		switch (a.innerHTML) {
			case "Blog":			a.innerHTML = "網絡日誌";		break;
			case "Scripts":			a.innerHTML = "所有腳本";		break;
			case "Forums":		a.innerHTML = "論譠";			break;
			case "People":			a.innerHTML = "用戶列表";		break;
			case "Signup":			a.innerHTML = "新登記";		break;
			case "Login":			a.innerHTML = "登入";			break;
			case "Settings":		a.innerHTML = "設定";			break;
			case "Logout":			a.innerHTML = "登出";			break;
			
			case "comments":		a.innerHTML = "相關留言";		break;
			case "favorite scripts":	a.innerHTML = "喜愛的腳本";	break;
			case "monitored topics":	a.innerHTML = "留意的論題";	break;
			case "scripts":			a.innerHTML = "所寫腳本";		break;
			case "settings":		a.innerHTML = "設定";			break;
			case "public profile":		a.innerHTML = "個人檔案";		break;
			}
	}
}

function doScriptTable(scriptTable) {
	scriptTable.rows[0].cells[0].getElementsByTagName("a")[0].innerHTML = "名稱";
	scriptTable.rows[0].cells[1].innerHTML = "編輯";
	scriptTable.rows[0].cells[2].innerHTML = "粉絲";
	scriptTable.rows[0].cells[3].getElementsByTagName("a")[0].innerHTML = "留言";
	scriptTable.rows[0].cells[4].getElementsByTagName("a")[0].innerHTML = "安裝";
	scriptTable.rows[0].cells[5].getElementsByTagName("a")[0].innerHTML = "最後更新";
	for (j=1; j<scriptTable.rows.length; j++) {
		scriptTable.rows[j].cells[0].getElementsByTagName("img")[0].title = "安裝腳本";
		scriptTable.rows[j].cells[2].getElementsByTagName("a")[0].innerHTML = "程式碼";
		scriptTable.rows[j].cells[2].getElementsByTagName("a")[1].innerHTML = "介紹";
		scriptTable.rows[j].cells[6].childNodes[1].innerHTML = doTimeText(scriptTable.rows[j].cells[6].childNodes[1].innerHTML);
	}
}

function doPagination(div) {
	if (div) {
		div.firstChild.innerHTML = "« 上一頁";
		div.lastChild.innerHTML = "下一頁 »";
	}
}

function doSearchBox(promptText) {
	originalText = document.getElementById("q_label").innerHTML;
	document.getElementById("q_label").innerHTML = promptText;
	if (document.getElementById("q").value==originalText) document.getElementById("q").value = promptText;
}

function doTimeText(text) {
	text = text.replace(/ hours? ago/," 小時前");
	text = text.replace(/ minutes? ago/," 分鐘前");
	text = text.replace(/a few seconds ago/, "一分鐘內")
	return text;
}

function doCountText(text) {
	var num = text.replace(/([0-9]+).+/, "$1");
	var keys = [ ["script","腳本"], ["comment","留言"], ["fan","粉絲"], ["topic","主題"], ["post","貼文"], ["user","用戶"] ];
	for (j in keys) {
		if (text.indexOf(keys[j][0]) > 0) {
			return text.replace(RegExp(keys[j][0]+"s?"), "個"+keys[j][1]);
		}
	}
}



// header
doHeader(document.getElementById("header"));



// hompage
if (window.location.pathname.match(/^\/(\?.+)?$/)) {
	container = document.body.getElementsByTagName("div")[1];
	quickstart = container.getElementsByTagName("div")[0];
	latestnews = container.getElementsByTagName("div")[2];
	updatedscripts = container.getElementsByTagName("div")[3];
	recentcomments = container.getElementsByTagName("div")[4];
	recentscripts = container.getElementsByTagName("div")[5];
	browseall = container.getElementsByTagName("h2")[0];
	footer = container.getElementsByTagName("div")[6];
	// quickstart
	document.getElementById("q_label").innerHTML = "搜尋腳本";
	for (i in quickstart.getElementsByTagName("li")) {
		a = quickstart.getElementsByTagName("li")[i].getElementsByTagName("a")[0];
		switch (a.innerHTML) {
			case "Update your profile":	a.innerHTML = "更改戶口資料"; break;
			case "Your scripts":		a.innerHTML = "你所寫的腳本"; break;
			case "Add a script":		a.innerHTML = "加入新腳本"; break;
		}
	}
	// latestnews
	latestnews.childNodes[1].innerHTML = "最新消息: ";
	// updatedscripts
	updatedscripts.childNodes[1].innerHTML = "最近更新的腳本";
	// recentcomments
	recentcomments.childNodes[1].innerHTML = "最近的留言";
	for (i=0; i<recentcomments.getElementsByTagName("a").length; i=i+2) {
		saidText = recentcomments.getElementsByTagName("a")[i].nextSibling;
		saidText.textContent = " 說: ";
	}
	// recentscripts
	recentscripts.childNodes[1].innerHTML = "最近加入的腳本";
	// browseall
	browseall.getElementsByTagName("a")[0].innerHTML = "瀏覧所有腳本";
}



// login page
else if (window.location.pathname.match(/^\/login\/?(\?.+)?$/)) {
	container = document.getElementById("container");
	content = document.getElementById("content");
	right = document.getElementById("right");
	footer = document.getElementById("footer");
	// content
	content.childNodes[1].innerHTML = "登入";
	content.getElementsByTagName("label")[0].innerHTML = "電郵地址";
	content.getElementsByTagName("label")[1].innerHTML = "密碼";
	content.getElementsByTagName("label")[2].childNodes[1].textContent = "在這台電腦上記住這個戶口";
	content.getElementsByTagName("input")[4].value = "登入";
	content.getElementsByTagName("input")[4].nextSibling.childNodes[0].textContent = "或 ";
	content.getElementsByTagName("input")[4].nextSibling.childNodes[1].innerHTML = "重設密碼";
	// right
	right.getElementsByTagName("h5")[0].innerHTML = "未有戶口?";
	right.getElementsByTagName("h5")[0].nextSibling.nextSibling.innerHTML =
		"若您還沒有戶口, 可以<a href=/signup>在此</a>登記";
	// footer

}



// all scripts
else if (window.location.pathname.match(/^\/scripts\/?(\?.+)?$/)) {
	container = document.getElementById("container");
	content = document.getElementById("content");
	right = document.getElementById("right");
	footer = document.getElementById("footer");
	// content
	content.childNodes[1].innerHTML = "所有腳本";
	content.childNodes[3].innerHTML = doCountText(content.childNodes[3].innerHTML);
	doScriptTable(content.getElementsByTagName("table")[0]);
	doPagination(content.getElementsByTagName("div")[0]);
	doPagination(content.getElementsByTagName("div")[1]);
	// right
	doSearchBox("搜尋任何腳本");
	right.getElementsByTagName("h5")[0].innerHTML = "關於 Greasemonkey";
/*	right.getElementsByTagName("h5")[0].nextSibling.nextSibling.innerHTML =
	'<a href="http://www.greasespot.net/">Greasemonkey</a> 是一款適用於 <a href="http://www.spreadfirefox.com/?q=affiliates&amp;id=208179&amp;t=1">Firefox 瀏覧器</a> 上的擴充套件. 它能讓您<strong>在喜愛的網頁上更改或加添你想要的外貌和特性</strong>. There are many scripts that have already been written, and if you know javascript you can easily create your own! This site is a repository to download and install Greasemonkey scripts.';
	right.getElementsByTagName("h5")[0].nextSibling.nextSibling.nextSibling.nextSibling.innerHTML; */
}


// all users
else if (window.location.pathname.match(/^\/users\/?(\?.+)?$/)) {
	container = document.getElementById("container");
	content = document.getElementById("content");
	right = document.getElementById("right");
	footer = document.getElementById("footer");
	// content
	content.childNodes[1].innerHTML = "用戶列表";
	content.childNodes[3].innerHTML = doCountText(content.childNodes[3].innerHTML);
	////doScriptTable(content.getElementsByTagName("table")[0]);
	doPagination(content.getElementsByTagName("div")[0]);
	doPagination(content.getElementsByTagName("div")[1]);
	// right
	doSearchBox("搜尋任何用戶");
}



// someone's scripts
else if (window.location.pathname.match(/^\/users\/[0-9]+\/scripts\/?(\?.+)?$/) ||
	window.location.pathname.match(/home\/scripts\/?/) )
{
	container = document.getElementById("container");
	content = document.getElementById("content");
	right = document.getElementById("right");
	footer = document.getElementById("footer");
	// content
	switch (content.childNodes[1].innerHTML) {
		case "Your scripts":
		content.childNodes[1].innerHTML = "你所寫的腳本";		break;
		default:
		content.childNodes[1].innerHTML = content.childNodes[1].innerHTML.replace(/Scripts by (.+)/,"$1 所寫的腳本");		break;
	}
	content.childNodes[3].innerHTML = doCountText(content.childNodes[3].innerHTML);
	doScriptTable(content.getElementsByTagName("table")[0]);
	doPagination(content.getElementsByTagName("div")[0]);
	doPagination(content.getElementsByTagName("div")[1]);
	// right
	for (i in right.getElementsByTagName("h5")) {
		switch (right.getElementsByTagName("h5")[i].innerHTML) {
			case "Got scripts?":
			right.getElementsByTagName("h5")[i].innerHTML = "有自己的腳本了嗎?";
			break;
		}
	}
	iOfA = 0;
	for (i=iOfA; i<right.getElementsByTagName("a").length; i++) {
		switch (right.getElementsByTagName("a")[i].innerHTML) {
			case "Comments on these scripts":	right.getElementsByTagName("a")[i].innerHTML = "這些腳本的留言";		break;
			case "add another script":			right.getElementsByTagName("a")[i].innerHTML = "加入新的腳本";		break;
			default:							iOfA = i;	i = right.getElementsByTagName("a").length;				break;
		}
	}
}


// someone's favorites
else if (window.location.pathname.match(/^\/users\/[0-9]+\/favorites\/?(\?.+)?$/)) {
	container = document.getElementById("container");
	content = document.getElementById("content");
	right = document.getElementById("right");
	footer = document.getElementById("footer");
	// content
	switch (content.childNodes[1].innerHTML) {
		case "Your favorites":
		content.childNodes[1].innerHTML = "你所喜愛的腳本";		break;
		default:
		content.childNodes[1].innerHTML = content.childNodes[1].innerHTML.replace(/Favorites of (.+)/,"$1 所喜愛的腳本");		break;
	}
	content.childNodes[3].innerHTML = doCountText(content.childNodes[3].innerHTML);
	doScriptTable(content.getElementsByTagName("table")[0]);
	doPagination(content.getElementsByTagName("div")[0]);
	doPagination(content.getElementsByTagName("div")[1]);
	// right

}



// searched scripts
else if (window.location.pathname.match(/^\/scripts\/search\/?(\?.+)?$/)) {
	container = document.getElementById("container");
	content = document.getElementById("content");
	right = document.getElementById("right");
	footer = document.getElementById("footer");
	// content
	content.childNodes[1].innerHTML = "搜尋有結果了!";
	for (i in content.getElementsByTagName("h5")) {
		switch (content.getElementsByTagName("h5")[i].innerHTML) {
			case "Tags Results:":
			content.getElementsByTagName("h5")[i].innerHTML = "找到的標簽:";
			break;
			case "Script Results:":
			content.getElementsByTagName("h5")[i].innerHTML = "找到的腳本:";
			break;
		}
	}
	doScriptTable(content.getElementsByTagName("table")[0]);
	contentPagination = content.getElementsByTagName("div")[1];
	contentPagination.firstChild.innerHTML = "« 上一頁";
	contentPagination.lastChild.innerHTML = "下一頁 »";
	// right
	doSearchBox("搜尋任何腳本");
	right.getElementsByTagName("h5")[0].innerHTML = "關於 Greasemonkey";
	right.getElementsByTagName("h5")[0].nextSibling.nextSibling.innerHTML =
	'<a href="http://www.greasespot.net/">Greasemonkey</a> 是一款適用於 <a href="http://www.spreadfirefox.com/?q=affiliates&amp;id=208179&amp;t=1">Firefox 瀏覧器</a> 上的擴充套件. 它能讓您<strong>在喜愛的網頁上更改或加添你想要的外貌和特性</strong>. There are many scripts that have already been written, and if you know javascript you can easily create your own! This site is a repository to download and install Greasemonkey scripts.';
	right.getElementsByTagName("h5")[0].nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
}



// script details
else if (window.location.pathname.match(/^\/scripts\/show\/[0-9]+\/?(\?.+)?$/)) {
	container = document.getElementById("container");
	content = document.getElementById("content");
	right = document.getElementById("right");
	footer = document.getElementById("footer");
	// content
	// right
	doSearchBox("搜尋任何腳本");
	document.getElementById("install_script").getElementsByTagName("a")[0].innerHTML = "安裝這個腳本";
	for (i in right.getElementsByTagName("h6")) {
		switch (right.getElementsByTagName("h6")[i].innerHTML) {
			case "Admin for script":
			right.getElementsByTagName("h6")[i].innerHTML = "腳本管理";
			break;
			case "Written by":
			right.getElementsByTagName("h6")[i].innerHTML = "作者";
			installedTimes = right.getElementsByTagName("h6")[i].previousSibling.previousSibling;
			installedTimes.innerHTML = installedTimes.innerHTML.replace(/Installed ([0-9]+) times?/,"被安裝過 $1 次");
			break;
			case "Last updated":
			right.getElementsByTagName("h6")[i].innerHTML = "最後更新";
			uploadedTime = right.getElementsByTagName("h6")[i].nextSibling.nextSibling
			uploadedTime.innerHTML = doTimeText(uploadedTime.innerHTML);
			break;
			case "First uploaded":
			right.getElementsByTagName("h6")[i].innerHTML = "首次上載";
			uploadedTime = right.getElementsByTagName("h6")[i].nextSibling.nextSibling
			uploadedTime.innerHTML = doTimeText(uploadedTime.innerHTML);
			break;
			case "Tags":
			right.getElementsByTagName("h6")[i].innerHTML = "標簽";
			break;
		}
	}
	iOfA = 1;
	for (i=iOfA; i<right.getElementsByTagName("a").length; i++) {
		switch (right.getElementsByTagName("a")[i].className) {
			case "fans":	right.getElementsByTagName("a")[i].innerHTML =
							doCountText(right.getElementsByTagName("a")[i].innerHTML);				break;
			case "add":		right.getElementsByTagName("a")[i].innerHTML = "加入愛好名單";			break;
			case "flag":	right.getElementsByTagName("a")[i].innerHTML = "標記為有害或灌水腳本";		break;
			case "home":	right.getElementsByTagName("a")[i].innerHTML =
				right.getElementsByTagName("a")[i].innerHTML.indexOf("homepage") >= 0 ?
				"官方首頁" : "官方的副本";																break;
			case "source":	right.getElementsByTagName("a")[i].innerHTML = "檢視原始碼";				break;
			case "feed":	right.getElementsByTagName("a")[i].innerHTML = "訂閱腳本留言";			break;
			case "":		iOfA = i;	i = right.getElementsByTagName("a").length;					break;
		}
	}
	for (i=iOfA; i<right.getElementsByTagName("a").length; i++) {
		switch (right.getElementsByTagName("a")[i].innerHTML) {
			case "Delete script":			right.getElementsByTagName("a")[i].innerHTML = "刪除腳本";		break;
			case "Edit/update metadata":	right.getElementsByTagName("a")[i].innerHTML = "編輯/更新詳情";	break;
			case "Edit/update source":		right.getElementsByTagName("a")[i].innerHTML = "編輯/更新原始碼";	break;
			default:						iOfA = i;	i = right.getElementsByTagName("a").length;			break;
		}
	}
}



// user details
else if (window.location.pathname.match(/^\/users\/[0-9]+\/?(\?.+)?$/)) {
	container = document.getElementById("container");
	content = document.getElementById("content");
	right = document.getElementById("right");
	footer = document.getElementById("footer");
	// content
	for (i in content.getElementsByTagName("h4")) {
		switch (content.getElementsByTagName("h4")[i].innerHTML) {
			case "Scripts":
				content.getElementsByTagName("h4")[i].innerHTML = "所寫腳本";
				tmp = content.getElementsByTagName("h4")[i].nextSibling.nextSibling.childNodes[0];
				tmp.textContent = doCountText(tmp.textContent);												break;
			case "Favorite scripts":
				content.getElementsByTagName("h4")[i].innerHTML = "喜愛的腳本";
				tmp = content.getElementsByTagName("h4")[i].nextSibling.nextSibling.childNodes[0];
				tmp.textContent = doCountText(tmp.textContent);												break;
			case "Comments posted on scripts":
				content.getElementsByTagName("h4")[i].innerHTML = "在腳本上的留言";
				tmp = content.getElementsByTagName("h4")[i].nextSibling.nextSibling.childNodes[0];
				tmp.textContent = doCountText(tmp.textContent);												break;
			case "Forums":
				content.getElementsByTagName("h4")[i].innerHTML = "論壇裡的足跡";
				tmp = content.getElementsByTagName("h4")[i].nextSibling.nextSibling.getElementsByTagName("span")[0].childNodes[0];
				tmp.textContent = doCountText(doCountText(tmp.textContent));								break;
		}
	}
	iOfA = 0;
	for (i=iOfA; i<content.getElementsByTagName("a").length; i++) {
		switch (content.getElementsByTagName("a")[i].innerHTML) {
			case "view all":			content.getElementsByTagName("a")[i].innerHTML = "檢視全部";			break;
			case "monitored posts":		content.getElementsByTagName("a")[i].innerHTML = "注視的文章";		break;
		}
	}
	// right
}



// footer
//footer.appendChild(document.createElement("br"));
footer.appendChild(document.createTextNode("中文翻譯由 XXVi 提供"));
