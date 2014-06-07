// ==UserScript==
// @name           Sex141 HD
// @version		30/Dec/2013
// @namespace      Sex141HD
// @description    自動放大首頁/地區分類/廣告內的囡囡圖片，移除不必要網頁元素，提升搵囡囡效率。
// @icon		http://i.imgur.com/h9IhB.jpg
// @grant       none
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include        http://*141.com/*/
// @include        http://*141.com/*/*
// @include        http://*141.com/*/*region-*.html
// @include        http://*141.com/*/main.php
// @include        http://*141.com/*/*gal-*.html?building=*&region=*
// @include        http://*141.com/*/*gal-*.html
// @include        http://*141.com/*/*girl-*.html
// @include        http://*141.com/*/*-girls.html?page=*
// @include        http://*141.com/*/*gals.html?page=*
// @include        http://*141.com/*/*building-*.html?region=*
// @downloadURL http://userscripts.org/scripts/source/161439.user.js
// @updateURL http://userscripts.org/scripts/source/161439.user.js
// @run-at document-end
// ==/UserScript==

// Google Chrome does not support the @require rule.
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function RevampPage()
{
		//增加頁面寬度
		$('#header_menu, #core, #coretable, #header, #core > table').css('width','100%');
		$('table.cat , #outer, div.category.cl').css('width', '90%');
		
		//移除141真人語音Banner
		$('div.category.cl').first().remove();
		$('div.category.cl div.cl').first().remove();
		 
		//移除頂部足浴廣告
		$('#core iframe').remove();
		 
		//移除其他垃圾網頁元素
		$('#adanc, #topten, #avtable, span.icon, span.overlap, #gamerules_menu, h2.mbm').remove();

		//改變列表圖片大小
		$("img[src*='photoasia'], img.pframe").not("[src*='gif']").not("[src*='png']").each(function(index, item) {
			var s = $(item).attr('src');
			s = s.replace(/picprofile/g ,"middle");
			s = s.replace(/small/g ,"main");
			$(item).attr('src', s);
			$(item).attr('width', '222');
			$(item).attr('height', '296');
		});
		
		$('div.item').css('width','232px');
		
		//改變內文圖片大小
		$("img[id*='aimg_']").not("[src*='gif']").not("[src*='png']").each(function(index, item) {
			var s = $(item).attr('src');
			$(item).attr('src', s);
			$(item).attr('width', '480');
			$(item).attr('height', '640');
		});
		
		$('#flip-container, div.scrolldiv, #girlpage, #flip-tabs,  #content-0').css('width','100%');
}

function ResizeImage()
{
		$("img[src*='photoasia'], img.pframe").not("[src*='gif']").not("[src*='png']").each(function(index, item) {
			var s = $(item).attr('src');
			s = s.replace(/picprofile/g ,"middle");
			s = s.replace(/small/g ,"main");
			$(item).attr('src', s);
			$(item).attr('width', '222');
			$(item).attr('height', '296');
		});
}

$(document).ready(function() {
	addJQuery(RevampPage);
})

if ($("#morebtn").length > 0){
	  $('#searchpg').bind("DOMSubtreeModified", function() {
		ResizeImage();
	  });
}

