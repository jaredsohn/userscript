// ==UserScript==
// @name           dolc 清理美分党
// @namespace
// @include        http://dolc.de/*
// @include        http://*.dolc.de/*
// ==/UserScript==
var dogs = new Array("hh2", "伟大领袖", "ein", "面瘫胡","flh", "Dortmund110","GCD支部","柳桂花");

// 主题列表页
for (x in dogs) {
	dog = document.evaluate('//table/tbody[tr[1]/td[2]//cite/a[text()="' + dogs[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (dog.snapshotLength) {
		for (var i = 0, c = ""; i < dog.snapshotLength; i++) {
			dog.snapshotItem(i).innerHTML = "<tr><td class='icn'><img src='static/image/common/folder_common.gif' /></a></td><th class='common'><b>造谣一时爽，全家火葬场：被屏蔽帖子 " + c + "<font color=red></th><td class='by'><cite><font color=red>" +  "</font></cite></td><td class='num'></td><td class='by'></td></tr>";
		}
	}
}

// 内容页
for (x in dogs) {
	dog = document.evaluate('//table/tbody[tr[1]/td[1]//a[text()="' + dogs[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (dog.snapshotLength) {
		for (var i = 0, c = ""; i < dog.snapshotLength; i++) {
			c = dog.snapshotItem(i).firstChild.childNodes[3].textContent.replace(/\s*/g, "").slice(0, 2);
			c = (Number(c) > 9) ? c + "楼" : c;
			dog.snapshotItem(i).innerHTML = "<b><center>清扫垃圾人人有责：被屏蔽帖子 " + c + " <font color=red>" +  "</font></center></b>";
		}
	}
}

for (x in dogs) {
	dog = document.evaluate('//table/tbody[tr[1]/td[1]/div[1]//font[text()="' + dogs[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (dog.snapshotLength) {
		for (var i = 0, c = ""; i < dog.snapshotLength; i++) {
			c = String(dog.snapshotItem(i).firstChild.childNodes[3].textContent.match(/\d+#/)).replace(/#/, "楼");
			dog.snapshotItem(i).innerHTML = "<b><center>c被屏蔽帖子 " + c + " <font color=red>" +  "</font></center></b>";
		}
	}
}