// ==UserScript==
// @id tieba.baidu.com-auto-renyao@patwonder@163.com
// @name Auto Renyao
// @version 0.1
// @name space patwonder@163.com
// @author patwonder
// @description 自动点人妖
// @include http://tieba.baidu.com/f?*kw=*
// @include http://tieba.baidu.com/f?kz=*
// @include http://tieba.baidu.com/p/*
// @include http://tieba.baidu.com/f?*ct=*z=*
// @run-at document-end
// ==/UserScript==

// @author Pat
// License: Public Domain

(function(d, w) {
Array.prototype.removeDuplicatesNew = function() {
Array.prototype.sort.call(this);

var prev = undefined;
var res = [];
for (var i = 0, l = this.length; i < l; i++) {
if (this[i] !== prev)
res.push(this[i]);
prev = this[i];
}
return res;
};

var $ = unsafeWindow.$;
var PageData = unsafeWindow.PageData;

function doit() {
Array.prototype.filter.call(d.querySelectorAll(".d_name, .tb_icon_author"), function(elem) {
return !!elem.querySelector("img.meizhi_vip");
}).map(function(elem) {
return JSON.parse(elem.dataset.field).user_id;
}).removeDuplicatesNew().forEach(function(user_id) {
$.ajax({
type: "post",
url: "/encourage/post/meizhi/vote",
data: {
forum_id: PageData.forum.id || PageData.forum.forum_id,
forum_name: PageData.forum.name,
user_id: user_id,
vote_type: "renyao",
tbs: PageData.tbs
},
dataType: "json"
}).success(function(data) {
console.log("renyao[" + user_id + "] " + JSON.stringify(data));
}).error(function(jqxhr, status, ex) {
console.error("renyao[" + user_id + "] fail: " + status + "\n Exception: " + ex);
});
});
}
w.addEventListener("load", doit);
})(document, window);