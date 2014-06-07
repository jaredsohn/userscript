// ==UserScript==
// @id             serienjunkies.org-5a8c109c-0832-474d-a9f7-6f852ae7ffb6@scriptish
// @name           Serienjunkies Tools
// @version        1.6
// @namespace      
// @author         pshot
// @description    Ein paar Tools fuer Serienjunkies.
// @include        *serienjunkies.org*
// @run-at         document-end
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function addFolding(){
	var par = $(".post-content");
	var release = [];
	
	par.children().each(function(){
		var child = $(this);
		
		if(child.hasClass("qsep"))
		{
			release = []
			release = $("<div>").addClass("release");
			release.append(
							$("<button>")
								.addClass("click")
								.text("+")
								.css("background-color", "#F4F4F4")
								.css("border", "1px solid #CCCCCC")
								.css("padding", "0")
								.css("float", "left")
								.css("position", "relative")
								.css("top", "-5px")
								.css("left", "-5px")
								.css("width", "20px")
			);
			child.before(release);
		}
		
		$(release).append(child);
	})

	$(".click").click(function() {
		$(this).siblings("p").not('[class="qsep"]').slideToggle('slow');
		if($(this).html()=="-") {
			$(this).html("+");
		} else {
			$(this).html("-");
		}
	});
	
	$(".click").each(function(){
		var anzahl =$(this).siblings("p").not('[class="qsep"]').hide().find("#download_mirrors").length;
		
		$(this).siblings('.qsep').append(' | <strong>Anzahl:</strong> '+ anzahl);
	});
}

function redesign(){
	$(".post-content").css("word-wrap", "normal");

	var download = $(".download_main");
	download.css("padding", "2px").css("padding-left", "5px");
	$(".download_main div:last-child").remove();
	download.find("strong, span, br, img").remove();
	
	$(".download_main").each(function (){
		var blub = $(this);
		var children = $(this).find("div").children().detach()
		.each(function(){
			$(this).css("font-weight", "bold").css("font-size", "14px");
			blub.append(" | ");
			blub.append($(this));
		});
	});
}

$(document).ready(function (){
	addFolding();
	redesign();
});