// ==UserScript==
// @id             tieba.baidu.com-3123e940-15dc-4da9-aed3-0a66df870e96@simon
// @name           Tieba user card enhancer
// @version        1.0.1
// @namespace      simon
// @author         Simon Chan
// @description    Makes user card more beautiful.
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?ct=*
// @include        http://tieba.baidu.com/f?kz=*
// @match          http://tieba.baidu.com/p/*
// @match          http://tieba.baidu.com/f?ct=*
// @match          http://tieba.baidu.com/f?kz=*
// @grant          unsafeWindow
// @run-at         document-end
// ==/UserScript==

GM_addStyle("\
    #user_visit_card {\
        margin-left: 111px !important;\
    }\
    \
    #user_visit_card .j_ui_white_arrow {\
        display: none !important;\
    }\
    \
    #user_visit_card .userinfo_head,\
    #user_visit_card .j_avatar,\
    #user_visit_card .j_avatar img {\
        height: 80px !important;\
        width: 80px !important;\
    }\
    \
    #user_visit_card .userinfo_head,\
    #user_visit_card .j_avatar {\
        margin-left: 12.5px !important;\
        margin-top: 12.5px !important;\
    }\
    ");

new MutationObserver(function(records) {
    records.forEach(function(record) {
        Array.prototype.forEach.call(record.addedNodes, function(element) {
            if(element.id == "user_visit_card") {
                var card = unsafeWindow.$(element);
                card.css("margin-top", card.find(".ui_white_down").length == 1 ?
                           "122.5px" : "-178.5px");
            }
        });
    });
}).observe(document.body, { childList: true });