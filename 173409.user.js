// ==UserScript==
// @name            Hack Forums Quick report threads
// @namespace       Snorlax
// @description     Report threads quick
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require         http://x.hackforums.net/jscripts/thread.js
// @include         *hackforums.net/forumdisplay.php?fid=*
// @version         1.0
// ==/UserScript==

$('a[class*="subject_"]').after(' <a class="quickReport" style="cursor:pointer;color:lime;">Report Thread</a>');


$(".quickReport").click(function(){
    tid = $(this).prev().attr("href");
    $.get(tid, function(data){
        str = $(data).find('a[name*="pid"]').attr("id");
        pid = str.replace(/[^0-9]/g, '');
        Thread.reportPost(pid);
    })
});