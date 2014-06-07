// ==UserScript==
// @description Small script with various emprovements of Juick.com
// @name        Juick Emprovements
// @namespace   juick_emp
// @include     http://juick.com/*
// @version     1
// ==/UserScript==
var emp = {
    ads:function(){ // Juick, I pooped four times today.
        $('a[href="/help/ru/adv"]').parents('.msg').css('display','none');
    },
    links:function(){ // Links should be links!
        $('.msg-txt a').each(function (i, u) {
            if ((index = u.href.search(u.text)) != -1) {
                var before = u.href.substr(0, index),
                    after = u.href.substr(index + u.text.length);
                u.innerHTML = '<span class="invisible">' + before + '</span>'
                + u.text +
                '<span class="invisible">' + after + '</span>'
                + '\xA0';
            }
        });
        $('head').append('<style>.invisible { font-size:0; line-height:0; }</style>');
    },
    tags:function(){ // Fuck Tonya Ugnich. Anyone?
        var tag = location.search.replace(/\?tag\=(\S+)/,'$1');
        $('#content').prepend($('<p>').addClass('tagall').append(
            $('<a>').attr('href','/tag/' + tag).text(' / Everyone')
                .prepend($('<b>').text(decodeURIComponent(tag)))
            )
        )
        $('head').append('<style>.tagall{text-align:center}.tagall a{color:#999}.tagall b{color:#069}</style>');
    }
}
function runer() {
    if (window.$){
        emp.ads();
        if(/\?tag\=/.test(location.search)) {
            emp.tags();
        }
        if($('.msg-txt a').text()) {
            emp.links();
        }
    } else {
        setTimeout(runer, 50);
    }
}
runer();