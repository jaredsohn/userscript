// ==UserScript==
// @name       Bangumi.tv Episodes Remover
// @version    0.0.2
// @author     Li Caomu a.k.a.Bonegumi
// @description  快速移动Bangumi.tv的重复章节，移动后信息有所丢失，使用前请谨慎核对。
// @icon       http://lain.bgm.tv/pic/icon/s/000/00/01/128.jpg
// @icon64     http://lain.bgm.tv/pic/icon/l/000/00/01/128.jpg
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include    http://bgm.tv/subject/*/ep
// @include    http://bangumi.tv/subject/*/ep
// @include    http://chii.in/subject/*/ep
// ==/UserScript==

$(document).ready(function(){
	var hash=$("[href*='logout']").attr("href").replace(/.*logout\/(.*)/,"$1");

	var css=".wrongep{font-size: large;font-weight: bold;text-align: center;background-color: rgb(221, 221, 221);width: 17px;height: 17px;margin-left: 5px;float: right;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;box-shadow: 1px 1px grey;-webkit-box-shadow: 1px 1px grey;-moz-box-shadow: 1px 1px grey;display: none;} .wrongep:hover{background-color: lightGrey;} a.wrongep_a{color: red;} a.wrongep_a:hover{color: rgb(204, 0, 0);}"
	var style = document.createElement('style');
		style.textContent = css;
		document.head.appendChild(style);
    
	var epremove="<div class=\"rr\" id=\"epremove\"><a class=\"chiiBtn\" href=\"javascript:void(0);\"><span>批量转移章节</span></a></div>"
	var wrongephtml="<div class=wrongep><a class=wrongep_a href=\"javascript:void(0);\"><div>X</div></a></div>";   
    
	$("h6 a").each(function(){
		if($(this).text().match(/^\d/)) {
			$($(this).parent()).prev().before(wrongephtml);
		};
	});
    
	var type0 = $(".cat:first");
        
	if (type0.text()=="本篇"){
		type0.prepend(epremove);
	};
       
	$("#epremove").click(function(){
		$(".wrongep").toggle();
	});

	var wrongep = $(".wrongep");

	wrongep.click(function(){
		var This = $(this)
		var title = $($(This.nextAll("h6")).find("a"))
		var link = title.attr("href");
		var url = link + "/edit"
		var epsort = title.text();
		var summary = $(This.parent()).text();
		var sortno = epsort.replace(/([0-9]*\.?[0-9]+)\..*/,"$1");
		var data = "formhash=" + hash + "&name=%E5%BE%85%E5%88%A0%E9%99%A4%E7%AB%A0%E8%8A%82&name_cn=%E5%BE%85%E5%88%A0%E9%99%A4%E7%AB%A0%E8%8A%82&type=6&sort=" + sortno + "&duration=&airdate=&summary=" + summary + "&submit=%E5%86%99%E5%A5%BD%E4%BA%86"
		function success(){
			$(This.parent()).css({"background-repeat": "repeat-x", "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAbCAYAAAC9WOV0AAAABHNCSVQICAgIfAhkiAAAACdJREFUCJlj+P///38mBgYGBtIJZklJyQYGBgaG/0wzZsxgYKDAKADtkgu8jo0dvAAAAABJRU5ErkJggg==)"});
			$($(This.parent()).find("*")).css("color","grey");
			$(This.children("a")).css("color","grey").removeAttr("href");
			$($(This.nextAll("h6")).find(".Air")).css("background","grey");
			This.unbind();
		};

		$.post(url,data,success());

	});

});