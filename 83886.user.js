// ==UserScript==
// @author         Rohit Patali
// @version        0.1
// @name           Techcrunch Ad Remover
// @namespace      patali
// @description    Remove right vertical sidebar, Ads, Comments
// @include        http://techcrunch.com/*
// ==/UserScript==

//find and remove div by Id
var sidebar_features_remove = document.getElementById('col2');
if (sidebar_features_remove) {
    sidebar_features_remove.parentNode.removeChild(sidebar_features_remove);
}

var header_features_remove = document.getElementById('header_features');
if (header_features_remove) {
    header_features_remove.parentNode.removeChild(header_features_remove);
}

var comments_remove = document.getElementById('comments_area');
if (comments_remove) {
    comments_remove.parentNode.removeChild(comments_remove);
}

var comments_form_remove = document.getElementById('addcomment');
if (comments_form_remove) {
    comments_form_remove.parentNode.removeChild(comments_form_remove);
}

var footer_remove = document.getElementById('footer');
if (footer_remove) {
    footer_remove.parentNode.removeChild(footer_remove);
}

//find and remove div by class
var ad_class= document.evaluate("//*[@class='post_unit post_sponsor_unit'] | //*[@class='post_unit']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var item;
for(var i=0;i<ad_class.snapshotLength;i++) {
		item=ad_class.snapshotItem(i);
		item.parentNode.removeChild(item);
	}