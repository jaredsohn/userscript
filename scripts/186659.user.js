// ==UserScript==
// @name       优酷订阅自动刷新
// @namespace  http://userscripts.org/users/clso
// @version    0.2
// @description  在优酷个人订阅页面自动刷新新视频而无需手动点更新
// @match     http://i.youku.com/u/home?type=subscribe*
// @updateURL https://userscripts.org/scripts/source/186659.meta.js
// @downloadURL https://userscripts.org/scripts/source/186659.user.js
// @copyright  2013+, CLE
// ==/UserScript==

//var notice = document.getElementById("YK_notice");
//if(notice && notice.style.display!="none"){
//    homeFavFriends.subscribeUpdate(1);
//}

notify.notice.show2 = notify.notice.show;

function switchaupd(e){
    if(localStorage.autoupd && localStorage.autoupd=="1"){
        localStorage.autoupd="0";
        notify.notice.show = notify.notice.show2;
        e.innerText="开启自动更新";
    } else {
        localStorage.autoupd="1";
        notify.notice.show = function() {
            homeFavFriends.subscribeUpdate(1);
        }
        e.innerText="关闭自动更新";
    }
}

var nlab = document.getElementsByClassName("YK_operate")[0];
var nspan = document.createElement("span");nspan.innerText="|";
nlab.appendChild(nspan);

var naupd = document.createElement("a");
if(localStorage.autoupd && localStorage.autoupd=="1"){
    notify.notice.show = function() {
       homeFavFriends.subscribeUpdate(1);
    }
    naupd.innerText="关闭自动更新";
} else {
    notify.notice.show = notify.notice.show2;
    naupd.innerText="开启自动更新";
}
naupd.onclick=function(){switchaupd(naupd);}
nlab.appendChild(naupd );
