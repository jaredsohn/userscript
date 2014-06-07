// ==UserScript==
// @name           github.tarball.user.js
// @description    add a link to download a repo as tarball from github.com
// @include        https://github.com/*
// @created date   20120403
// @modified date  20130829
// ==/UserScript==

var zipLink = document.querySelector("a[title^='Download this']");

if (zipLink) {
	var tarLink = zipLink.cloneNode(true);

	tarLink.title = tarLink.title.replace("zip", "tar.gz");
	tarLink.href = tarLink.href.replace(/zip$/, "tar.gz");
	tarLink.innerHTML = zipLink.innerHTML.replace("ZIP", "TAR.GZ");

	zipLink.parentNode.insertBefore(tarLink, zipLink.nextSibling);
}
