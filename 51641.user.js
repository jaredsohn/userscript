// ==UserScript==
// @name           FUMBBL Replay Downloader
// @description    You can optionally download the result .ZIP files from match pages
// @include        http://fumbbl.com/FUMBBL.php?page=match*
// ==/UserScript==
var regex = /FUMBBL\.php.*\page=match.*\&id=([0-9]+)/;
var matches = regex.exec(window.location.href);
if ( matches != null ) {
   var gId = matches[1];
   if(confirm('Download the replay ZIP file?')) {
      window.location = 'http://fumbbl.com/results/' + gId.substring(0, (gId.length - 4)) + '/' + gId + '.zip';
   }
}