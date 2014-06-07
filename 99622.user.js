// ==UserScript==
// @author			Kreaus
// @date			14:07 23/03/2011
// @id				JsFiddle Toggle Sidebar
// @name			JsFiddle Toggle Sidebar
// @namespace		kreaus
// @include			http://jsfiddle.net/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
$(document).ready(function(){var a=$('<ul class="actionCont collapsed"><li class="actionItem"><a id="kBtn" class="aiButton" href="#" title="Kreaus\' button :)"><span>Hide sidebar</span></a></li></ul>');$(a).find("span").css("background-position","6px -236px");$(a).insertBefore($(".actionCont").first());$("#kBtn").click(function(){$("#content").toggleClass("kExtended");if($("#content").hasClass("kExtended")){$("#kBtn > span").html("Show sidebar");$("#sidebar").animate({left:"-220px",opacity:"0"},500);$("#handler_vertical").hide();$("#content").animate({"margin-left":"14px"},500,function(){$("#handler_vertical").show();var b=parseFloat($("fieldset.left").first().attr("style").replace("width","").replace(":","").replace(";",""));$("#handler_vertical").css("left",parseInt(b*parseInt($("#content").css("width")+8)/100-3))})}else{$("#kBtn > span").html("Hide sidebar");$("#sidebar").animate({left:"0px",opacity:"1"},500);$("#handler_vertical").hide();$("#content").animate({"margin-left":"232px"},500,function(){$("#handler_vertical").show();var b=parseFloat($("fieldset.left").first().attr("style").replace("width","").replace(":","").replace(";",""));$("#handler_vertical").css("left",parseInt(b*parseInt($("#content").css("width")+8)/100-3))})}})});