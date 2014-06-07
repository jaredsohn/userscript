// ==UserScript==
// @name       map reduce monitor
// @version    0.1
// @include      http://*.szwg01.baidu.com*/*
// @copyright  2013, ekousp
// @require http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// ==/UserScript==

//add the monitor button
var st = GM_getValue('monitoring', false);

if (st) {
    
    var tr = $('table tr').filter(':contains(reduce)');
    var progress = tr.children().eq(1).text();
    if (progress == '100.00%') {
        alert('Job Done!');
    } else {
        console.log('progress: %s', progress);
    }
    
    $('<button id="beginMonitor">停止监视</button>').click(function () {
        GM_setValue('monitoring', false);
        location.reload();
    }).insertBefore($('table').eq(0));
} else {
    $('<button id="beginMonitor">监视进度</button>').click(function () {
        GM_setValue('monitoring', true);
        location.reload();
    }).insertBefore($('table').eq(0));
}