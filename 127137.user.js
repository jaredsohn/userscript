// ==UserScript==
// @name           DMM.com list flipper (js part)
// @description    lager and flip-able package image at list.
// @author         iguu
// @include        http://www.dmm.com/*idol*list*
// @include        http://www.dmm.co.jp/*list*
// @include        http://www.dmm.co.jp/*search*
// @version        1.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        https://raw.github.com/desandro/imagesloaded/master/jquery.imagesloaded.min.js
// ==/UserScript==

//[IMPORTANT] use with http://userstyles.org/styles/61791/dmm-com-list-flipper

var targets = $("ul#list li");
if(targets.size()>=1){
	targets.map(function(i,e){
		a   = $(e).addClass("thumb");
		img = a.find("span.img img");
		if(img.size()>=1){
			if(img.attr("src").indexOf("pt.jpg")>=1){
				img.attr("src",img.attr("src").replace("pt.jpg","pl.jpg"));
			}else{
				a.addClass("not_package");
	                        a.append("<span class='alt'>"+img.attr("alt")+"</span>");
			}
		}
	});

	targets.map(function(i,e){
		a   = $(e).addClass("thumb");
		img = a.find("img");
		img.imagesLoaded( function(images){
			img = $(images);
			if(img.height()>=600){
				img.closest("a").addClass("front_only");
			}
		});
	});

	var sidebar = $("td#su");
	var mainbar = $("td#mu");
	var side_toggle_button = $("<button/>");
	side_toggle_button.text("サイドバー開閉");
	side_toggle_button.on("click",function(){
		sidebar.toggle();
		mainbar.css("padding","0");
	});
	$("table#w").prepend(side_toggle_button);
}


var packageImg = $(".tdmm");
if(packageImg.size()>=1){
	packageImg.attr("src",$(".tdmm").attr("src").replace("rps","rpl"));
}