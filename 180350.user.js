// ==UserScript==
// @name        贴吧名片还原旧版
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f*ct=*
// @version     2014.04.21
// ==/UserScript==

var $ = unsafeWindow.$;
var un = '',
    l_panelHtml = '',
    offsetTop = '',
    offsetLeft = '';
$('.j_user_card,.p_author_face,a.at').hover(function() {
    userHover(this);
});

var addOldPanel = function(records) {
    records.forEach(function(record) {
        Array.prototype.forEach.call(record.addedNodes, function(element) {
            if (element.id == "user_visit_card") {
                var l_card = $(element);
                GM_addStyle('#user_visit_card *{\
                    display:block !important;\
                }');
                l_card.html(l_panelHtml);
            }
        });
    });
};

//监听动态添加的用户节点（楼中楼）
var observeNewUserDom = function(records) {
    records.forEach(function(record) {
        Array.prototype.forEach.call(record.addedNodes, function(element) {
            if (element.getAttribute('class') && element.getAttribute('class').indexOf("lzl_cnt")) {
                $(element).find('.j_user_card,a.at').hover(function() {
                    userHover(this);
                });
            }
        });
    });
};

//悬浮触发事件
var userHover = function(user) {
    // console.log(user);
    un = JSON.parse($(user).attr('data-field')).un;
    offsetTop = $(user).offset().top;
    offsetLeft = $(user).offset().left + $(user).width();
    l_panelHtml = '<iframe src="http://tieba.baidu.com/i/data/panel?un=' + un + '" width="330px" height="135px"></iframe>';
    GM_addStyle('#user_visit_card{\
        top:' + offsetTop + 'px !important;\
        left:' + offsetLeft + 'px !important;\
        }');
};

var mo = new MutationObserver(addOldPanel);
var mp = new MutationObserver(observeNewUserDom);

var option = {
    'childList': true,
    'subtree': true
};

mo.observe(document.body, option);
mp.observe(document.body, option);

GM_addStyle('#user_visit_card{\
    width:330px !important;\
    height:135px !important;\
    border:2px solid #F0F0F0;\
    background:white !important;\
    }\
    #user_visit_card .ui_card_content,#user_visit_card .ui_white_down{\
    display:none !important;\
    }');
