// ==UserScript==
// @name           اختيار الهجمات
// @namespace      حرب القبائل
// @version        2.1
// @author         Aywac
// @include        http://ae*.tribalwars.ae/*screen=info_player*
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
function replace(){
	$("#co_table").find("tr").each(function(){
		var villageID = $("#villages_list").find("tr").find(":checked + span").find("a:eq(0)").attr("href").match(/\d+/g)[1];
		var villagID = $("#co_table").find("tr:last").find("td:eq(0)").find("a:eq(0)").attr("href").match(/\d+/g)[1];
		var $this = $(this);
		var t = $this.html();
		$this.html(t.replace(""+villagID+"",""+villageID+""));
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
function clk(){
	$("#co_table tbody").find(":checked + span").find("a")[0].click();
}
$("#villages_list").find("tr").find("td:eq(0)").prepend('<input name"rdo" type="radio" onclick="replace()">');
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
$.ajax({
	url:"/game.php?screen=overview_villages",
	datatype:"html",
	cache:true,
	success:function(data){
		$("#co_table tbody").append($(data).find("#production_table").find("td:nth-child(1)"));
		$("#co_table tbody").find("td").wrap("<tr></tr>");
		$("#co_table tbody").find("tr").each(function(){
			var $this = $(this);
			var t = $this.html();
			$this.html(t.replace(/screen=overview/g,"target=012345&screen=place"));
		});
		$("#co_table tbody").find("a").attr("target","_blank");
		$("#co_table tbody").find("tr").find("td:eq(0)").prepend('<input name="clk" type="radio" onclick="clk()">');
		$("#co_table").after('<br><br><table class="vis bbcodetable" align="center"><tbody><tr>\
<th>المبرمج :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td>\
</tr></tbody></table>');
		$("#co_table").find("tr").css({"width":"952px","height":"20px"});
	}
});