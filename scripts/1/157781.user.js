// ==UserScript==
// @name        CartoonMad Fixer
// @namespace   CartoonMadFixer
// @include     http://www.cartoonmad.com/comic/*
// @include     http://web.cartoonad.com/comic/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// ==/UserScript==
const gBaseUrl = location.href;

var parsed_gBaseUrl = gBaseUrl.split('/');
var strTmp = parsed_gBaseUrl[parsed_gBaseUrl.length-1];
var book_id = strTmp.substring(0,strTmp.indexOf('0'));
var strLink = "";
var testloc="";
var i=0;

if ($("img").length==3) {
	var that = $("img").eq(1);
	testloc = "FP";
} else if ($("img").length==5) {
	var that = $("img").eq(2);
	testloc = "MP";
}

function reloadImages(d) {
	for (i=0;IMG=d.images[i];++i) {
		if (IMG.readyState!='complete')
			IMG.src=IMG.src;
	}
}

function retrieveIt(link) {
	GM_xmlhttpRequest({
		method: "GET",
		url: link,
		onload: function(r) {
			var tmp = $(r.responseText).find("img").eq(Math.floor($(r.responseText).find("img").length/2));
			
			strLink = "<hr><img src='" + tmp.attr("src") + "' border='0' oncontextmenu='return false' onload='if(this.width>screen.width*0.96) {this.resized=true; this.width=screen.width*0.92;}'>";
			
			if (testloc=="FP") {
				$("img").eq($("img").length-2).after(strLink);
			} else if (testloc=="MP") {
				$("img").eq($("img").length-3).after(strLink);
			}
			i++;
			if ($(r.responseText).find("img").length!=3) {
				if (i%10==0) {
					sleep(1);
					retrieveIt(tmp.parent().attr("href"));
				} else {
					retrieveIt(tmp.parent().attr("href"));
				}
			} else {
				reloadImages(window.document);
			}
		}
	});
}

if ($("select").attr("name")=="jump") {
	retrieveIt($(that).parent().attr("href"));
}

function sleep( seconds ) {
	
	var timer = new Date();
	var time = timer.getTime();
	do
		timer = new Date();
	while( (timer.getTime() - time) < (seconds * 1000) );
}
