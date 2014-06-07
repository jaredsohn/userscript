// ==UserScript==
				// @name           起点-书本详情页
				// @namespace      mmmm
				// @description    加入点推比
				// @include        http://www.qidian.com/Book/*.aspx
				// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
				// @tags          
// ==/UserScript==
$(document).ready(function(){
	 var wholeClick = $('#contentdiv .data td')[0].innerHTML.split('>')[2];	
	 var wholeSuggest = $('#contentdiv .data td')[2].innerHTML.split('>')[2];
	 var words = $('#contentdiv .data td')[3].innerHTML.split('>')[2];
	 var rate = wholeSuggest/wholeClick*100;
	 var rate2 = Math.round(rate*100)/100
	 $('#contentdiv .data td')[2].innerHTML = "<b>点推比:</b><font color='red'>"+rate2+"%</font>"
 });