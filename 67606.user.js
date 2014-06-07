// ==UserScript==
// @name           forum.xitek.com improve
// @include        http://forum.xitek.com/forum*.html
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description	   This script make the thread display in ascend order and added a small [img] icon right behind the thread title, move your cursor above this icon will pop up a box display the images within that thread.
// @copyright 	   2013, overpro[overlite] (http://userscripts.org)
// @version 	   0.0.3
// ==/UserScript==

var imageBoxHeight = 440;

function DetermineImgBoxTop(obj){
	var linkPosition = $(obj).position();
	var topPosition = 0;
	if (linkPosition.top + $(obj).height() + imageBoxHeight > 
		$("body").attr("scrollTop") + $("body").attr("clientHeight") )
	{
		topPosition = $("body").attr("scrollTop")
		+ $("body").attr("clientHeight") - imageBoxHeight; 
	}
	else
	{
		topPosition = linkPosition.top + $(obj).height();
	}
	return topPosition;			
}

$(document).ready( function (){
	var reqAjax;
	//var regImgs = /(<div id="postlist".+>.+<\/div>)/im;
	var regImgs = /<img.+src="(.+)".+onclick="zoom\(this.*\).+">/ig;
	var imgIcon = $("<a class='op_imgIcon'>").text("img")
		.css({border:"solid 1px #000060", padding:"0 5 0 5",
			"font-family":"verdana", "font-size":"10px"});
		
	$("a[href^='thread-'][class='xst']").attr("href", 
		function(){ 
			//return $(this).attr("href").replace("showthread", "sorthread");
		}
	).after( imgIcon );
	$("a.op_imgIcon").each( function () {
		var $link = $(this).prev();
		var threadNumberReg = /thread-(\d+)/i;
		//console.log ( $link );
		var url = $link.attr("href");
		var threadNumber = url.match( threadNumberReg );
		imgThreadUrl = "forum-viewthread-tid-" + threadNumber[1] + "-extra-page%3D1-showtype-pic.html";
		$(this).attr("href", imgThreadUrl); 
	});
	$("a.op_imgIcon").bind("mouseenter", function(){
			var div_imgBox = $(this).next("div.imgBoxView")[0];
			if (div_imgBox)
			{//use the img box which has already been created.  
				var isImageDownloaded = div_imgBox.getAttribute("isImageRetrived");

				clearTimeout(div_imgBox.getAttribute("timerId"));
				$(div_imgBox).show().css("top", DetermineImgBoxTop(this));
				if (isImageDownloaded == "false")
				{
					//retry download images
					reqAjax = $.ajax({
					type: "GET", 
					url: $(this).attr("href"), 
					dataType: "html",
					success: function (data, textStatus){
						var matches = data.match(regImgs);
						if (matches)
						{
							$(div_imgBox).html(matches[0] + matches[1]); 
						}
						else
						{
							$(div_imgBox).text("没有图像");
						}
						$(div_imgBox)[0].setAttribute("isImageRetrived", true );
					}
					});	
				}
				return;
			}
			//Here we need to create a new img box
			div_imgBox = $("<div>").css({
				"width":"778px", 
				"height":imageBoxHeight, 
				"border":"solid 1px #cccccc", 
				"background-color":"#ffffff", 
				"position":"absolute",
				"overflow":"scroll",
				"top":  DetermineImgBoxTop(this), 
				"left":	$(this).position().left + $(this).width() + 10
				})
				.html("<div style='padding:10px; text-align:center;'>加载图像中，请稍候...</div>")
				.attr("class","imgBoxView")
				.bind("mouseenter",function(evt){
					 //prevent img box from hidden after mouse entered
					clearTimeout( this.getAttribute("timerId"));
				})
				.bind("mouseleave", function(evt){
					var obj = this;
					obj.setAttribute("timerId", setTimeout( function() { $(obj).hide(); }, 500 ));
				});
			div_imgBox[0].setAttribute("isImgsGot", false);
			div_imgBox[0].setAttribute("isImageRetrived", false);
			$(this).after(div_imgBox);
			reqAjax = $.ajax({
				type: "GET", 
				url: $(this).attr("href"), 
				dataType: "html",
				success: function (data, textStatus)
				{
					var matches = data.match(regImgs);
					//console.log( matches );
					if (matches)
					{
						$(div_imgBox).html(matches.toString()); 
					}
                                        else if ( data.match(/抱歉！本功能目前只对登录在线的注册用户开放/))
                                        { 
						$(div_imgBox.text("请首先登录论坛"));
					}
					else
					{
						$(div_imgBox).text("没有图像");
					}
					div_imgBox[0].setAttribute("isImageRetrived", true );
				}
			});
		}) //mouseenter
		.bind("mouseleave", function (){
			switch(reqAjax.readyState)
			{
				case 0:
				case 1:
				case 2:
				case 3:
					reqAjax.abort();
					break;
			}
			var imgBox = $(this).next("div.imgBoxView")[0];
			imgBox.setAttribute("timerId",setTimeout( function() {
					$(imgBox).hide();
				}, 500) );
		});

}); //document.ready

function EnumProperties(obj)
{
	console.log("\n\n\n" + obj);
	for( var p in obj)
	{
		console.log( p + "=" + obj[p] );
	}
}
