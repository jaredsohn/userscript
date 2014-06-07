/*
ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
	اسم السكربت :
					مختصر الهجمات
ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
	مبرمج السكربت :
					Aywac
ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
	النسخة :
					3.0
ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
	اللعبة :
					حرب القبائل
ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
	اصدار اللعبة :
					8.21
ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
	آخر تعديل :
					2014/04/20 - 05:11 GMT
ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
	للاستفسار :
					http://forum.tribalwars.ae/member.php?32087-Aywac
ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
*/

// ==UserScript==
// @name           سكربت مختصر الهجمات
// @namespace      حرب القبائل
// @version        3.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php?*screen=place*
// @include        http://ae*.tribalwars.ae/game.php?*screen=info_player*
// ==/UserScript==

if(!document.URL.match(/screen=info_player/)){
	if (!document.URL.match(/screen=place/)){
		UI.InfoMessage("السكربت يشتغل من بروفيل اللاعبين",3000,true);
	}
}else if(!document.URL.match(/screen=place/)){
	if(!document.URL.match(/screen=info_player/)){
		UI.InfoMessage("السكربت يشتغل من بروفيل اللاعبين",3000,true);
	}
}
$(".vis:first").append('<tr id="tpop"><td colspan="2"><a style="cursor:pointer" onclick="SPopupOpen()" id="popup">» قراك الخاصة</a>');
function replace(e){
	$("#co_table").find(".quickedit-content").each(function(){
		var villageID = $(e).parent().attr("data-id");
		var villagID = $("#co_table").find(".quickedit-content:last").find("a").attr("href").match(/\d+/g)[1];
		$(this).html($(this).html().replace(""+villagID+"",""+villageID+""));
	});
}
function SPopupOpen(){
	$(".overlay").removeClass("hidden");
	setTimeout(function(){$(".overlay").addClass("show");},300);
	$("#tpop").hide();
}
function HPopupClose(){
	$(".overlay").removeClass("show");
	setTimeout(function(){$(".overlay").addClass("hidden");},300);
	$("#tpop").show();
}
function PopupMinimize(){
	var a = $(".overlay").width();
	$(".overlay").find("#inline_popup_main").slideToggle();
	$(".overlay").width(a);
}
function clk(e){
	$(e).next("a")[0].click();
}
$("#villages_list").find(".village_anchor").prepend('<input name="rdo" type="radio" onclick="replace(this)">');
$(".vis:first").after('<br><table class="vis bbcodetable" align="center"><tbody><tr>\
<th>المبرمج :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td>\
</tr></tbody></table>');
$("#villages_list").find("img").css("float","left");

$("#ds_body").append('<div id="inline_popup" class="ui-draggable show overlay" style="left:0px;top:60px;position:fixed;width:auto">\
<div id="inline_popup_menu" style="text-align:center"><a id="inline_popup_close" href="javascript:HPopupClose()">X</a>\
<a id="inline_popup_minimize" href="javascript:PopupMinimize()" style="float:right">&nbsp;─</a>\
<span id="inline_popup_title">القرى الخاصة بك</span></div>\
<div id="inline_popup_main" style="height:auto;max-height:950px">\
<div style="height:auto"><div id="inline_popup_content" style="height:auto">\
<div class="inner-border main content-border" style="border:none;font-weight:normal;height:auto">\
<div class="vis" style="max-height:600px;overflow:auto;overflow-x:hidden">\
<table id="co_table" class="vis"><tbody></tbody></table>\
</div>\
</div></div></div></div></div>');
UI.Draggable($(".overlay"));
$(".overlay").find("#inline_popup_main").css("padding","0px");
if(game_data.player.premium == false){
	$.ajax({
		url:"/game.php?screen=overview_villages",
		datatype:"html",
		cache:true,
		success:function(data){
			$("#co_table tbody").append($(data).find("#production_table").find("td:nth-child(1)"));
			$("#co_table tbody").find("td").wrap("<tr></tr>");
			$("#co_table tbody").find(".quickedit-content").each(function(){
				$(this).html($(this).html().replace(/screen=overview/g,"target=012345&screen=place"));
			});
			$("#co_table").find(".rename-icon").remove();
			$("#co_table tbody").find("a").attr("target","_blank");
			$("#co_table").find(".quickedit-content").prepend('<input name="clk" type="radio" onclick="clk(this)">');
			$("#co_table").find("tr").css({"width":"952px","height":"20px"});
		}
	});
}else if(game_data.player.premium == true){
	function up_sortVillages(){
		$("#combined_table").find(".nowrap").sort(asc_sort).appendTo("#combined_table tbody");
		function asc_sort(a,b){
			return $(b).find("td:eq(0)").text() < $(a).find("td:eq(0)").text() ? 1 : -1;    
		}
		$("#combined_table").find("th:first").find("a").attr("onclick","down_sortVillages()");
	}
	function down_sortVillages(){
		$("#combined_table").find(".nowrap").sort(dec_sort).appendTo("#combined_table tbody");
		function dec_sort(a,b){
			return $(b).find("td:eq(0)").text() > $(a).find("td:eq(0)").text() ? 1 : -1;    
		}
		$("#combined_table").find("th:first").find("a").attr("onclick","up_sortVillages()");
	}
	function up_sort(e){
		var ee = $(e).parent().index();
		$("#combined_table").find(".nowrap").sort(asc_sort).appendTo("#combined_table tbody");
		function asc_sort(a,b){
			return ($(b).find("td").eq(ee).text()) - ($(a).find("td").eq(ee).text());    
		}
		$("#combined_table").find("th").eq(ee).find("a").attr("onclick","down_sort(this);return false");
	}
	function down_sort(e){
		var ee = $(e).parent().index();
		$("#combined_table").find(".nowrap").sort(dec_sort).appendTo("#combined_table tbody");
		function dec_sort(a,b){
			return ($(a).find("td").eq(ee).text()) - ($(b).find("td").eq(ee).text());    
		}
		$("#combined_table").find("th").eq(ee).find("a").attr("onclick","up_sort(this);return false");
	}
	$(".overlay").find(".content-border").html('<div id="co_table" class="vis" style="max-height:600px;overflow:auto;overflow-x:hidden"></div>');
	$("#co_table").load("/game.php?mode=combined&screen=overview_villages #combined_table",function(){
		$("#combined_table").find("td:nth-child(1)").remove();
		$("#combined_table").find("th:nth-child(1)").remove();
		$("#combined_table").find(".nowrap").find("td:last").remove();
		$("#combined_table").find("tr").find("th:last").remove();
		for(i=0; i<6; i++){
			$("#combined_table").find("td:nth-child(2)").remove();
			$("#combined_table").find("th:nth-child(2)").remove();
		}
		if($(this).find("th").find("img[title=ميليشيا]").length == 1){
			$("#combined_table").find(".nowrap").find("td:last").remove();
			$("#combined_table").find("tr").find("th:last").remove();
		}
		var num = $("#combined_table").find("th:first").text().match(/\d+/g);
		$("#combined_table").find("th").find("a").attr("onclick","up_sort(this);return false");
		$("#combined_table").find("th:first").html('<a style="cursor:pointer;" onclick="up_sortVillages()">القرية</a> ('+num+')');
		$("#combined_table").find(".quickedit-vn").removeAttr("data-id");
		$("#combined_table").find("tr").css({"width":"952px","height":"20px"});
		$("#combined_table").find(".rename-icon").remove();
		$("#combined_table").css("margin-left","12px");
		$("#combined_table").find(".quickedit-content").each(function(){
			$(this).html($(this).html().replace(/screen=overview/g,"target=012345&screen=place"));
			$(this).find("a").attr("target","_blank");
			$(this).prepend('<input name="clk" type="radio" onclick="clk(this)">');
		});
	});
}