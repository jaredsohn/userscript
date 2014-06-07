// ==UserScript==
// @name        Modify Bangumi onair
// @description 修改当日放送为绿标、去除默认绿标
// @namespace   http://dazzyd.org/
// @version     0.2
// @include     http://bangumi.tv/
// @include     http://bgm.tv/
// @include     http://chii.in/
// @run-at      document-end
// ==/UserScript==

var today = new Date();
var yyyy = today.getFullYear();
var mm = today.getMonth()+1; if(mm<10) {mm='0'+mm};
var dd = today.getDate(); if(dd<10) {dd='0'+dd};
today = yyyy+'-'+mm+'-'+dd;


$('a.load-epinfo.epBtnToday')
    .removeClass('epBtnToday').addClass('epBtnNA');
$('ul#prgSubjectList').find('li.clearit.onAir')
    .removeClass('onAir');
$('span.rr.onAir')
    .remove();

sub = $('#prgSubjectList').find('.clearit');
$('a.load-epinfo.epBtnAir').each(function() {
    if ( $($(this).attr('rel')).text().indexOf(today) > -1) {
        
        $(this).removeClass('epBtnAir').addClass('epBtnToday');
        sid = $(this).attr('subject_id');
        sub.each(function() {
            if ($(this).find('.gridThumb').attr('subject_id') == sid)
                $(this).addClass('onAir');
        });
        $('#subjectPanel_'+sid).find('.header')
            .prepend('<span class="onAir rr">放送中</span>');
    }
});
