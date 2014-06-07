// ==UserScript==
// @name       auto mark A
// @version    0.1
// @description  自动全A评价 for SUIBE 教务系统
// @match      http://210.35.72.21:8888/edu/student/estimateItem.do*
// @copyright  2012+, luckyluke
// @require    http://code.jquery.com/jquery-1.10.0.min.js
// @run-at         document-end
// ==/UserScript==

$("input[value=0]").attr("checked",true);