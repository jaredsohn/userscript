// ==UserScript==
// @name           Feedly Entry Link Fix
// @version        0.0.1.20130723
// @description    open in a tabのtarget属性を書き換えるついでにitemのリンクを修正します
// @include        http://cloud.feedly.com/*
// @include        https://cloud.feedly.com/*
// @run-at         document-end
// ==/UserScript==
var mo = null;
var moint = {childList:true, subtree : true};
var css = {
itemclose:"div.u0Entry"
,itemopen:"div.inlineFrame"
,linkclose1:"a[title='Open in a tab']"
,linkclose2:"a.title"
,linkopen:"div.entryHeader>a.entryTitle"
}
var definition = [
{originallink:"^http:\/\/torrentz\\.eu\/(\\w+)$", replacelink:"magnet:?xt=urn:btih:$1"}
,{originallink:"^http:\/\/www\\.nyaa\\.se\/\\?page=view&tid=(\\d+)$", replacelink:"http://www.nyaa.se/?page=download&tid=$1"}
];
definition.forEach(function (obj) {
	obj.originallink = new RegExp(obj.originallink, "i");
});
function initialize() {
	var item, link;
	definition.forEach(function (def) {
		item = Array.prototype.slice.call(document.querySelectorAll(css.itemclose));
		if (item.length!=0) {
			item.forEach(function (obj) {
				link = obj.querySelector(css.linkclose1);
				link.href = link.href.replace(def.originallink, def.replacelink);
				link.target = "_blank";
				link = obj.querySelector(css.linkclose2);
				link.href = link.href.replace(def.originallink, def.replacelink);
			})
		}
		item = document.querySelector(css.itemopen);
		if (item) {
			link = item.querySelector(css.linkopen);
			link.href = link.href.replace(def.originallink, def.replacelink);
		}
	});
};
mo = new MutationObserver(initialize);
mo.observe(document.getElementById("box"), moint);
