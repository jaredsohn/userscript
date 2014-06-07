// ==UserScript==
// @name           RS Col Link Export
// @namespace      .
// @description    Export all files with DL link on a collectors acc on RapidShare.com
// @include        https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi*
// ==/UserScript==

var function_ = "";
var toFind = "<a href=\"#\" onclick=\"return FileMigratorFilesMaske('', 1)\">Transfer all files</a>";
var toWrite = "<a href=\"javascript:" + "var page = document.body.innerHTML; var regex = new RegExp('>http://rapidshare\\\\.com/files/[0-9]+/[a-z0-9_\\\\-\\\\.,]+', 'i');var result = regex.exec(page);var newpage = '';	while(result != null) {newpage += result.toString().replace('>','') + '<br>'; page = page.toString().replace(result.toString(), '__RS_LINK_SHOULD_BE_HERE__'); result = regex.exec(page); } document.body.innerHTML = newpage;" + "\">Export all links</a>&nbsp;-&nbsp;" + toFind;
document.body.innerHTML = document.body.innerHTML.replace(toFind, toWrite);
