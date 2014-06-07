// ==UserScript==
// @name        Bahamut title notification
// @namespace   http://mmis1000.byethost31.com/
// @include     *.gamer.com.tw/*
// @version     1.0.02
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     http://userscripts.org/scripts/source/186910.user.js#3
// ==/UserScript==
$.noConflict();
(function($){
if (window!=window.top) { return;/*prevent Iframe*/ }

var shouldTitle_0, shouldTitle_1, shouldTitle_2, shouldAlert_0, shouldAlert_1, shouldAlert_2

var testmenu = new mmis1000_BahaMenu($);
testmenu._addFullBar().text('通知提示設定');
testmenu._addHalfBar().text('標題顯示 :');
var title_checkbox_0 = testmenu.addCheckbox('通知').change(function(event){GM_setValue('title_notification_title0', $(this).is(':checked'));reload();})
var title_checkbox_1 = testmenu.addCheckbox('訂閱').change(function(event){GM_setValue('title_notification_title1', $(this).is(':checked'));reload();})
var title_checkbox_2 = testmenu.addCheckbox('推薦').change(function(event){GM_setValue('title_notification_title2', $(this).is(':checked'));reload();})
testmenu.addLine()
testmenu._addHalfBar().text('聲音提示 :');
var alert_checkbox_0 = testmenu.addCheckbox('通知').change(function(event){GM_setValue('title_notification_alert0', $(this).is(':checked'));reload();})
var alert_checkbox_1 = testmenu.addCheckbox('訂閱').change(function(event){GM_setValue('title_notification_alert1', $(this).is(':checked'));reload();})
var alert_checkbox_2 = testmenu.addCheckbox('推薦').change(function(event){GM_setValue('title_notification_alert2', $(this).is(':checked'));reload();})
testmenu.addLine()
function reload() {
    shouldTitle_0 = GM_getValue('title_notification_title0', true);
    shouldTitle_1 = GM_getValue('title_notification_title1', true);
    shouldTitle_2 = GM_getValue('title_notification_title2', true);
    shouldAlert_0 = GM_getValue('title_notification_alert0', true);
    shouldAlert_1 = GM_getValue('title_notification_alert1', true);
    shouldAlert_2 = GM_getValue('title_notification_alert2', true);
    title_checkbox_0.attr('checked', shouldTitle_0);
    title_checkbox_1.attr('checked', shouldTitle_1);
    title_checkbox_2.attr('checked', shouldTitle_2);
    alert_checkbox_0.attr('checked', shouldAlert_0);
    alert_checkbox_1.attr('checked', shouldAlert_1);
    alert_checkbox_2.attr('checked', shouldAlert_2);
    inited = false;
    changeTitle();
}

var originalTitle = $('title').text();
var soundResource = 'https://dl.dropboxusercontent.com/u/20467293/alertSound/fbalert.mp3';
var soundResourceType = 'audio/mpeg'
var audioElement = document.createElement("audio");
$(audioElement).append($('<source></source>').attr('src', soundResource).attr('type', soundResourceType));
audioElement.load();
var traceCount = 0;
var inited = false;

function changeTitle () {
    var count0, count1, count2, all, newTitle, oldTraceCount, newTraceCount;
    count0 = $('#topBar_light_0>span').text() === '' ? 0 : parseInt($('#topBar_light_0>span').text(), 10);
    count1 = $('#topBar_light_1>span').text() === '' ? 0 : parseInt($('#topBar_light_1>span').text(), 10);
    count2 = $('#topBar_light_2>span').text() === '' ? 0 : parseInt($('#topBar_light_2>span').text(), 10);
    /**change title*/
    all = (shouldTitle_0 ? count0 : 0) + (shouldTitle_1 ? count1 : 0) + (shouldTitle_2 ? count2 : 0);
    if(all !== 0) {
        newTitle = ['(', all, ') ', originalTitle].join('');
    } else {
        newTitle = originalTitle;
    }
    $('title').text(newTitle);
    
    /**play alert*/
    oldTraceCount = traceCount;
    newTraceCount = (shouldAlert_0 ? count0 : 0) + (shouldAlert_1 ? count1 : 0) + (shouldAlert_2 ? count2 : 0);
    if(inited) {
        if(newTraceCount > oldTraceCount) {
            audioElement.play();
        }
        traceCount = newTraceCount;
    } else {
        inited = true;
    }
}
function delayChange(func) {
    function newfunc() {
        setTimeout(func, 1000);
    }
    return newfunc;
}
delayChange(reload)();
setInterval(changeTitle, 10000);
$('#topBar_light_0').bind('click', delayChange(changeTitle));
$('#topBar_light_1').bind('click', delayChange(changeTitle));
$('#topBar_light_2').bind('click', delayChange(changeTitle));

}(jQuery))
