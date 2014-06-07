// ==UserScript==
// @name        TV Tropes Spoiler Control
// @namespace   BeenJammin.Greasemonkey.UserScripts
// @include     http://tvtropes.org
// @include     http://tvtropes.org/*
// @include     http://www.tvtropes.org
// @include     http://www.tvtropes.org/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1
// ==/UserScript==

if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {

	function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}

	// the guts of this userscript
	function main() {
		if ($(".spoiler").length > 0) {
			$("body").append("<span id='spoilerButtons'><span id='hideSpoilerButtons' style='height:100%;padding:5px;cursor:pointer;'>&raquo;</span><input style='margin:5px;' type='button' value='Show All Spoilers' id='showSpoilers' /><input style='margin:5px;' type='button' value='Hide All Spoilers' id='hideSpoilers' /></span>");
			var maxButtonWidth = 0;
			if ($("input#showSpoilers").outerWidth() > maxButtonWidth) {
				maxButtonWidth = $("input#showSpoilers").outerWidth();
			}
			if ($("input#hideSpoilers").outerWidth() > maxButtonWidth) {
				maxButtonWidth = $("input#hideSpoilers").outerWidth();
			}
			$("input#showSpoilers").css("width",maxButtonWidth + "px");
			$("input#hideSpoilers").css({"width" : maxButtonWidth + "px" , "display" : "none"});
			$("body").append("<span id='spoilerTab'><b>Spoilers...</b></span>");
			$("#spoilerButtons").css({"position" : "fixed" , "right" : "0" , "background" : "#EEEEFF" , "border" : "1px solid #BBBBC3" , "z-index" : "9999" , "border-radius" : "5px 0 0 5px"});
			$("#spoilerButtons").css({"top" : (50 - $("#spoilerButtons").outerHeight()) + "px" , "margin-right" : "-" + ($("#spoilerButtons").outerWidth() + 2) + "px"});
			offset = ($("#spoilerTab").width() - $("#spoilerTab").height())/2;
			$("#spoilerTab").css({"cursor" : "pointer" , "position" : "fixed" , "right" : "0" , "background" : "#EEEEFF" , "border" : "1px solid #BBBBC3" , "-moz-transform" : "rotate(270deg)" , "-webkit-transform" : "rotate(270deg)" , "-o-transform" : "rotate(270deg)" , "-ie-transform" : "rotate(270deg)" , "transform" : "rotate(270deg)" , "padding" : "5px" , "border-radius" : "5px 5px 0 0"});
			$("#spoilerTab").css({"margin-right" : "-" + (offset + 2) + "px" , "top" : (50 + offset) + "px"});
			$("body").css("margin-right","20px");
			
			$("#spoilerTab").click(function() {
				$("#spoilerTab").animate({marginRight:"-" + ($("#spoilerTab").outerHeight() + offset + 2) + "px"});
				$("#spoilerButtons").animate({marginRight:"-2px"});
			});
			
			$("#hideSpoilerButtons").click(function() {
				$("#spoilerTab").animate({marginRight:"-" + (offset + 2) + "px"});
				$("#spoilerButtons").animate({marginRight:"-" + $("#spoilerButtons").outerWidth() + "px"});
			});
			
			$("#hideSpoilerButtons").hover(function() {
				$(this).css("font-weight","bold");
			}, function() {
				$(this).css("font-weight","normal");
			});
			
			$("#spoilerTab").hover(function() {
				$(this).css("border-color","#444444");
			}, function() {
				$(this).css("border-color","#BBBBC3");
			});
			
			$("input#showSpoilers").click(function() {
				$(".spoiler").css("color","#000000");
				$(".spoiler a").css("color","#191970");
				$(".spoiler a:hover").css("color","#191970");
				$(".spoiler a:visited").css("color","#191970");
				$("input#showSpoilers").hide();
				$("input#hideSpoilers").show();
			});
			
			$("input#hideSpoilers").click(function() {
				$(".spoiler").css("color","#ffffff");
				$(".spoiler a").css("color","#ffffff");
				$(".spoiler a:hover").css("color","#ffffff");
				$(".spoiler a:visited").css("color","#ffffff");
				$("input#hideSpoilers").hide();
				$("input#showSpoilers").show();
			});
			
			$(".spoiler").click(function() {
				if ($(this).css("color") == "white" || $(this).css("color") == "#ffffff" || $(this).css("color") == "rgb(255, 255, 255)") {
					$(this).css("color","#000000");
					$(this).children("a").css("color","#191970");
					$(this).children("a:hover").css("color","#191970");
					$(this).children("a:visited").css("color","#191970");
				}
				else {
					$(this).css("color","#ffffff");
					$(this).children("a").css("color","#ffffff");
					$(this).children("a:hover").css("color","#ffffff");
					$(this).children("a:visited").css("color","#ffffff");
				}
			});
		}
	}

	// load jQuery and execute the main function
	addJQuery(main);
}
else {
	if ($(".spoiler").length > 0) {
		$("body").append("<span id='spoilerButtons'><span id='hideSpoilerButtons' style='height:100%;padding:5px;cursor:pointer;'>&raquo;</span><input style='margin:5px;' type='button' value='Show All Spoilers' id='showSpoilers' /><input style='margin:5px;' type='button' value='Hide All Spoilers' id='hideSpoilers' /></span>");
		var maxButtonWidth = 0;
		if ($("input#showSpoilers").outerWidth() > maxButtonWidth) {
			maxButtonWidth = $("input#showSpoilers").outerWidth();
		}
		if ($("input#hideSpoilers").outerWidth() > maxButtonWidth) {
			maxButtonWidth = $("input#hideSpoilers").outerWidth();
		}
		$("input#showSpoilers").css("width",maxButtonWidth + "px");
		$("input#hideSpoilers").css({"width" : maxButtonWidth + "px" , "display" : "none"});
		$("body").append("<span id='spoilerTab'><b>Spoilers...</b></span>");
		$("#spoilerButtons").css({"position" : "fixed" , "right" : "0" , "background" : "#EEEEFF" , "border" : "1px solid #BBBBC3" , "z-index" : "9999" , "border-radius" : "5px 0 0 5px"});
		$("#spoilerButtons").css({"top" : (50 - $("#spoilerButtons").outerHeight()) + "px" , "margin-right" : "-" + ($("#spoilerButtons").outerWidth() + 2) + "px"});
		offset = ($("#spoilerTab").width() - $("#spoilerTab").height())/2;
		$("#spoilerTab").css({"cursor" : "pointer" , "position" : "fixed" , "right" : "0" , "background" : "#EEEEFF" , "border" : "1px solid #BBBBC3" , "-moz-transform" : "rotate(270deg)" , "-webkit-transform" : "rotate(270deg)" , "-o-transform" : "rotate(270deg)" , "-ie-transform" : "rotate(270deg)" , "transform" : "rotate(270deg)" , "padding" : "5px" , "border-radius" : "5px 5px 0 0"});
		$("#spoilerTab").css({"margin-right" : "-" + (offset + 2) + "px" , "top" : (50 + offset) + "px"});
		$("body").css("margin-right","20px");
		
		$("#spoilerTab").click(function() {
			$("#spoilerTab").animate({marginRight:"-" + ($("#spoilerTab").outerHeight() + offset + 2) + "px"});
			$("#spoilerButtons").animate({marginRight:"-2px"});
		});
		
		$("#hideSpoilerButtons").click(function() {
			$("#spoilerTab").animate({marginRight:"-" + (offset + 2) + "px"});
			$("#spoilerButtons").animate({marginRight:"-" + $("#spoilerButtons").outerWidth() + "px"});
		});
		
		$("#hideSpoilerButtons").hover(function() {
			$(this).css("font-weight","bold");
		}, function() {
			$(this).css("font-weight","normal");
		});
		
		$("#spoilerTab").hover(function() {
			$(this).css("border-color","#444444");
		}, function() {
			$(this).css("border-color","#BBBBC3");
		});
		
		$("input#showSpoilers").click(function() {
			$(".spoiler").css("color","#000000");
			$(".spoiler a").css("color","#191970");
			$(".spoiler a:hover").css("color","#191970");
			$(".spoiler a:visited").css("color","#191970");
			$("input#showSpoilers").hide();
			$("input#hideSpoilers").show();
		});
		
		$("input#hideSpoilers").click(function() {
			$(".spoiler").css("color","#ffffff");
			$(".spoiler a").css("color","#ffffff");
			$(".spoiler a:hover").css("color","#ffffff");
			$(".spoiler a:visited").css("color","#ffffff");
			$("input#hideSpoilers").hide();
			$("input#showSpoilers").show();
		});
		
		$(".spoiler").click(function() {
			if ($(this).css("color") == "white" || $(this).css("color") == "#ffffff" || $(this).css("color") == "rgb(255, 255, 255)") {
				$(this).css("color","#000000");
				$(this).children("a").css("color","#191970");
				$(this).children("a:hover").css("color","#191970");
				$(this).children("a:visited").css("color","#191970");
			}
			else {
				$(this).css("color","#ffffff");
				$(this).children("a").css("color","#ffffff");
				$(this).children("a:hover").css("color","#ffffff");
				$(this).children("a:visited").css("color","#ffffff");
			}
		});
	}
}