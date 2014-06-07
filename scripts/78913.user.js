// ==UserScript==
// @name           SkreemR Downloader
// @namespace      http://skreemr.org/
// @description    Inserts download links to SkreemR songs.
// @include        http://skreemr.org*
// @include        *.skreemr.org*
// @include        skreemr.org*
// ==/UserScript==
try {
	var finished = false;
	var point = 0;
	try {
		var page = document.body.innerHTML;
	} catch (e) {}
	if (page != null) {
		while (!finished) {
			var start = page.indexOf("soundFile=", point);
			if (start < 0) {
				finished = true;
				break;
			}
			start += 10;
			point = start;
			var end = page.indexOf("\">", point);
			if (end < 0) {
				finished = true;
				break;
			}
			point = end;
			var save = page.indexOf("</tr>", point);
			if (save < 0) {
				finished = true;
				break;
			}
			save += 5;
			point = save;
			var before = page.substring(0, save);
			var url = unescape(page.substring(start, end));
			var after = page.substring(save + 1);
			page = before + "<tr><td><a href=\"" + url + "\">Download File</a></td></tr>" + after;
		}
		document.body.innerHTML = page;
	}
} catch (e) {
	alert(e);
}