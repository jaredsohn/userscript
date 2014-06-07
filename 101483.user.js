// ==UserScript==
// @name          No XXX torrents - FileList.ro
// @description   Remove porn torrents from FileList.ro
// @version       2.0
// @include       *filelist.ro/browse.php*
// @author        Cezar Derevlean - www.dcezar.com - contact@dcezar.com
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$('tr > td > a[href="browse.php?cat=7"]').each(function() {
    $(this).parent().parent().remove();
});