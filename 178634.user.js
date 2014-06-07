// ==UserScript==
// @id             FeedlyKillADS
// @name           Feedly Kill ADS
// @version        0.1.6.20140403
// @description    PR or ADで始まるitemをread and hideします。
// @include        http://feedly.com/*
// @include        https://feedly.com/*
// @run-at         document-end
// ==/UserScript==
var filterrules = [
{feedtitle:null, feedurl:null, itemtitle:"^(PR|AD|Info):", itemurl:null, itemdescription:null}
];
var css = {
entry:"div.u0Entry"
,itemtitle:"a.title"
,itemfeedtitle:"span.sourceTitle>a"
,feedtitle:"a.feedTitle"
,itemdescription:"span.u0Summary"
,button:"img[title=\"Mark as read and hide\"]"
}
filterrules.forEach(function (obj) {
	for (var i in obj) {
		if (obj[i]!=null) {
			obj[i] = new RegExp(obj[i], "i");
		};
	};
});
var feedlyfilter = function () {
	this.initialize.apply(this, arguments);
};
feedlyfilter.prototype = {
	initialize:function (item) {
		this.feedtitle = (item.querySelector(css.itemfeedtitle) || document.querySelector(css.feedtitle)).textContent;
		this.feedurl = (item.querySelector(css.itemfeedtitle))? item.querySelector(css.itemfeedtitle).getAttribute("data-uri"):document.querySelector(css.feedtitle).getAttribute("data-feedid");
		this.itemtitle = item.querySelector(css.itemtitle).textContent;
		this.itemurl = item.querySelector(css.itemtitle).href;
		this.itemdescription = item.querySelector(css.itemdescription).textContent;
	}
	,filter:function (rule) {
		if (rule.feedtitle!=null && !rule.feedtitle.test(this.feedtitle)) {
			return null;
		} else if (rule.feedurl!=null && !rule.feedurl.test(this.feedurl)) {
			return null;
		} else if (rule.itemtitle!=null && !rule.itemtitle.test(this.itemtitle)) {
			return null;
		} else if (rule.itemurl!=null && !rule.itemurl.test(this.itemurl)) {
			return null;
		} else if (rule.itemdescription!=null && !rule.itemdescription.test(this.itemdescription)) {
			return null;
		};
		return true;
	}
};
var killDuplication = function () {
	this.initialize.apply(this, arguments);
};
killDuplication.prototype = {
	initialize:function () {
		this.title = [];
		this.url = [];
	}
	,filter:function (item) {
		var title = item.querySelector(css.itemtitle).textContent;
		var link = item.querySelector(css.itemtitle).href;
		if (this.url.toString().indexOf(link) > -1 || this.title.toString().indexOf(title) > -1) {
			item.style.display = "none";
			item.querySelector(css.button).click();
		} else {
			this.title.push(title);
			this.url.push(link);
		};
	}
};
var mo = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		Array.prototype.slice.call(mutation.addedNodes).forEach(function (node) {
			if (node.tagName=="DIV" && node.className=="u0Entry ") {
				var feedlyfilterobj = new feedlyfilter(node);
				filterrules.forEach(function (rule) {
					if (feedlyfilterobj.filter(rule)) {
						node.style.display = "none";
						node.querySelector(css.button).click();
						return null;
					};
				});
			};
		});
	});
	var killDuplicationObj = new killDuplication();
	Array.prototype.slice.call(document.querySelectorAll(css.entry)).forEach(function (node) {
		killDuplicationObj.filter(node);
	});
});
mo.observe(document.getElementById("box"), {childList:true, subtree:true});