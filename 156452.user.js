// ==UserScript==
// @name           pixiv manga full size
// @namespace      pixiv
// @include        http://www.pixiv.net/member_illust.php?mode=manga*
// @match          http://www.pixiv.net/member_illust.php?mode=manga*
// ==/UserScript==

if (location.href.substr(0,50)=="http://www.pixiv.net/member_illust.php?mode=manga&") {
	purl1 = location.href;
	purl2 = purl1.split("&");
	purlb = purl2[0] + "_big&" + purl2[1] + "&page=0";
	location.href = "javascript: name = pixiv.context.totalPages;";
	setTimeout("open(purlb,'_self')",250);
}

if (location.href.substr(0,54)=="http://www.pixiv.net/member_illust.php?mode=manga_big&") {
	nlink = document.getElementsByTagName("A").item(0);
	nlink.onclick = " ";
	nurl1 = location.href.split("=");
	nnum1 = Math.ceil(nurl1[3])+1
	document.title = nnum1 + "/" + name;
	if (nnum1!=name) {
		nurl2 = nurl1[0] + "=" + nurl1[1] + "=" + nurl1[2] + "=" + nnum1;
		nlink.href = nurl2;
	}
}