// ==UserScript==
// @name Direct Downloaf FZDownload
// @description Redirect to Download Link
// @include http://www.fzdownloads.com/link.php?link=download.php*
// ==/UserScript==
var url = window.location.href;
var matchPos1 = url.search(myRegExp);
var visitorName = "http://www.fzdownloads.com/download2.php?";
var myNewString = url.replace("http://www.fzdownloads.com/link.php?link=download.php?", visitorName);
window.location.href = myNewString;