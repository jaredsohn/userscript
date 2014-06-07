// ==UserScript==
// @name           Feedly Engagement based Color
// @version        0.0.3.20131202
// @description    color a Feedly list based on the engagement
// @include        http://feedly.com/*
// @include        https://feedly.com/*
// @run-at         document-end
// ==/UserScript==
var mo = null;
var colors = {};
var css = {
    entry:"div.u0Entry"
    ,nbrRecommendations:"span.nbrRecommendations"
}
function MakeColor(str) {
    if (str > 1000) {
        str = 1000;
    }
    return str/1000;
}
function Colored() {
    //var itemid;
    var recommend = 0;
    var items = Array.prototype.slice.call(document.querySelectorAll(css.entry));
    if (items.length!=0) {
        items.forEach(function (item) {
            if (item.querySelector(css.nbrRecommendations)) {
//                recommend = item.querySelector(css.nbrRecommendations).title.replace(/^([0-9]+).*$/, "$1");
                recommend = item.querySelector(css.nbrRecommendations).textContent.replace(/[\s\+]/g, "").replace(/^([0-9]+)[A-Z]$/, "$1" + "000");
                
                if (recommend > 0) {
                    item.setAttribute("colored", "engagement-color"+recommend);
                    if (colors[recommend] == undefined) {
                        colors[recommend] = MakeColor(recommend);
                        GM_addStyle(
                            "div[colored='" + "engagement-color"+recommend + "'] {background:rgba(0,204,0," + colors[recommend] + ") !important;}"
                            + "div[colored='" + "engagement-color"+recommend + "']:hover {background:rgba(0,204,0," + colors[recommend] + ") !important;}"
                        );
                    }                
                }
            }
        })
    }
};
mo = new MutationObserver(Colored);
mo.observe(document.getElementById("box"), {childList:true, subtree : true});