// ==UserScript==
// @name       设置用户名
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://i.360.cn/profile/chusername
// @copyright  2012+, You
// ==/UserScript==


function $(tid){
    return document.getElementById(tid);
}


var now = new Date().getTime(); 

var uname = $("userName");
uname.value= _getRandomString(4)+(now%1000);
uname.focus();
 

// 获取长度为len的随机字符串
function _getRandomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}