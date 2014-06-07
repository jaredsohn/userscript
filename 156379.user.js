// ==UserScript==
// @name           Hupu Highlight
// @namespace      King(legendlee)
// @description    突出今日主题;
// @include        http://bbs.hupu.com/*
// ==/UserScript==

var all_data_td, this_td;
all_data_td = document.evaluate(
    "//table[@id='ajaxtable']//td[@class='smalltxt']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (all_data_td.snapshotLength == 0) { //new_style	
	all_data_td = document.evaluate(
		"//table[@id='pl']//td[@class='p_author']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
}
var date = new Date();
var year= date.getFullYear().toString();
var month = (date.getMonth()+1).toString();
var day = date.getDate().toString();
if(month.length == 1) {
	month = "0" + month;
}
if(day.length == 1) {
	day = "0" + day;
}
var today_str = year + "-" + month + "-" + day;


date.setDate(date.getDate()-1);
month = (date.getMonth()+1).toString();
day = date.getDate().toString();
if(month.length == 1) {
	month = "0" + month;
}
if(day.length == 1) {
	day = "0" + day;
}
var yesterday_str = year + "-" + month + "-" + day;

var reg_today = new RegExp(today_str);
var reg_yesterday = new RegExp(yesterday_str);
for (var i = 0; i < all_data_td.snapshotLength; i++) {
    this_td = all_data_td.snapshotItem(i);
    var html = this_td.innerHTML;
    
    if(reg_today.test(html)){
    	this_td.parentNode.style.backgroundColor = '#FFFFCC';
    	this_td.parentNode.style.fontWeight = "bold";
    }
	if(reg_yesterday.test(html)){
    	this_td.parentNode.style.backgroundColor = '#CCFFFF';
    	this_td.parentNode.style.fontWeight = "bold";
    }
}