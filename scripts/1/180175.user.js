// ==UserScript==
// @name       first
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      **/**
// @copyright  2012+, You
// ==/UserScript==

KISSY.use("core", function () {
    KISSY.ready(function (S) {
        var S = KISSY,
        DOM = S.DOM, Event = S.Event;
        if (location.href.indexOf("item.taobao.com") !== -1) {//detail     page
            console.log("detail page start");
            DOM.append(DOM.create('<div id="dianwo"  class="tb-btn-buy"><a href="https://login.taobao.com/member/login.jhtml?style=minisimple&from=alimama&redirectURL=http%3A%2F%2Flogin.taobao.com%2Fmember%2Ftaobaoke%2Flogin.htm%3Fis_login%3d1&full_redirect=true&disableQuickLogin=true&userscript"  class="J_ClickCatcher J_LinkBuy">淘宝客购买</a></div>'),'#J_juValid');

            Event.on('#dianwo', 'click', function (e) {
                GM_setValue("fuck", document.querySelectorAll('.tb-detail-hd h3')[0].innerText);
                e.halt();
                var b = window.open(e.target.href, "taoke");
            })
        }

        if (GM_getValue("fuck")) {
            if (location.href.indexOf("https://login.taobao.com/member/login.jhtml") !== -1 && location.href.indexOf("from=alimama") !== -1 ) {

                DOM.val('#TPL_username_1', 'lorrylockie');
                DOM.val('#TPL_password_1', 'liulei.123');
                DOM.get('#J_SubmitStatic').click();
            }

            if (location.href.indexOf('http://www.alimama.com/index.htm') !== -1) {
                location.href = "http://u.alimama.com/union/spread/selfservice/taokeSearch.htm";
            }

            if (location.href.indexOf("http://u.alimama.com/union/spread/selfservice/taokeSearch.htm") !== -1) {
                DOM.val('#q', GM_getValue("fuck"));
                setInterval(function () {
                    console.log('search');
                    DOM.get('.search-btn').click();
                }, 10);


            }
            if (location.href.indexOf('http://u.alimama.com/union/spread/selfservice/merchandisePromotion.htm') !== -1) {
                console.log('get code');
                var k =setInterval(function () {
                    if(!DOM.get('.med-dialog')){

                        KISSY.Event.fire(DOM.get('.get-code'), 'click');
                    }else{
                        clearInterval(k);
                    }
                }, 200)
            }

            if (location.href.indexOf('http://re.taobao.com/eauction') !== -1) {
                GM_deleteValue("fuck")
                DOM.get('.btnBuy').click();
            }


        }


    })
})
