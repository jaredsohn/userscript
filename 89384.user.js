// ==UserScript==
// @name pofScript
// @namespace http://www.416design.com/
// @copyright None, go to town.
// @description bigger Pof Pics
// @include http://www.pof.com/*
// @version 0.0.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript== 
// xpath for autopager: //div[@id='underlink']/text()[normalize-space()]/following-sibling::a[1]


$(document).ready(function() {  
  var pathname = window.location.pathname;
  var debug = false;

$("div#container").css({padding: "0px"});
$("div#container table").nextAll('br').remove()
$("div#images").after("</br>");
$("div#image-bar").after("</br></br>");	
$("span.username-headline").after("</br>");
    var t = $("img");
    var imgs = $("img");
    if (t.length > 0) {
      for(var i=0;i<t.length;i++) {
       	var img = imgs.slice(i,i+1);
		if (/thumbnails/i.test(img.attr("src"))) {
			src = img.attr("src").replace("thumbnails", "dating");
			img.attr("src", src);
			img.height("auto");
			if(pathname == "/basicsearch.aspx") {
				img.width(256);

			} else { 
				img.width(128);
				img.wrap('<div class="clipwrapper" style="padding:2px;position:relative;height:130px;width:130px"><div style="position:absolute;clip:rect(0px 130px 130px 0px);" class="new" /></>');
			img.css("{width: 130px; height:130px;position:absolute;}"); 

			}

			
 	}
      }  
    }
$("div#images").after("<br clear=all>");
});

