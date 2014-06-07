// ==UserScript==
// @name           سكربت إرسال الهجمات من دفتر الملاحظات
// @namespace      حرب القبائل
// @version        1.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php?*&screen=memo
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });
if(window.document.URL.match(/screen=memo/) == null){
	UI.InfoMessage('سيتم تحويلك الآن ...',3000,true);
	var ID = window.document.URL.match(/\d+/g)[1];
	window.open("/game.php?village="+ID+"&screen=memo","_self");
}
if($(".mem").length == 0 || $(".sended").length == 0){
	var id = $(".memo_container:visible").attr("id");
	var N = $("#"+id).find(".show_row").find("td:first").find(".village_anchor").length/2;
	var S = $("#"+id).find(".show_row").find("td:first").html().split("<br>");
	$("#"+id).find(".show_row").find("td:first").html("");
	for(var i=0; i<N; i++){
		$("#"+id).find(".show_row").find("td:first").append('<tr class="mem"></tr><br>');
		$(".mem:empty:first").append(S[i]);
	}
	$(".mem").each(function(){
		var b = $(this).find(".village_anchor:last").attr("data-id");
		var c = $(this).find(".village_anchor:first").attr("data-id");
		$(this).find(".village_anchor:last").html($(this).find(".village_anchor:last").html().replace(/screen=info_village/g,"screen=place"));
		$(this).find(".village_anchor:last").html($(this).find(".village_anchor:last").html().replace(/id=\d+/g,"target="+b));
		$(this).find(".village_anchor:last").html($(this).find(".village_anchor:last").html().replace(/village=\d+/g,"village="+c));
		$(this).find(".village_anchor:last").find("a:first").attr("target","_blank");
	});
	$(".memo_container:visible").after('<br><table class="vis bbcodetable" align="center"><tbody><tr><th>المبرمج :</th><td><a href="http://forum.tribalwars.ae/member.php?32087" target="_blank">Aywac</a> ©</td></tr></tbody></table>');
}
var P = prompt("حدد عدد التابات التي تريد فتحها :");
for(var j=0; j<P; j++){
	$(".mem:first").find(".village_anchor:last").find("a:first")[0].click();
}
$(".mem:first").addClass("sended");
$(".mem:first").removeClass("mem");
$(".sended:last").css("background","green");
void(0);