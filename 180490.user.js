// ==UserScript==
// @name           الجديد Sort Attack سكربت
// @namespace      حرب القبائل
// @version        1.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php?*&mode=commands&screen=overview_villages
// @include        http://ae*.tribalwars.ae/game.php?*&mode=incomings&screen=overview_villages
// ==/UserScript==

if(document.URL.match("mode=commands")){
	function down_sorts(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(b).find(".id_attack").text()) < ($(a).find(".id_attack").text()) ? 1 : -1;    
		}
	}
	function up_sorts(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find(".id_attack").text()) > ($(a).find(".id_attack").text()) ? 1 : -1;    
		}
	}
	function down_sortNames1(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(1)").text()) < ($(a).find("td:eq(1)").text()) ? 1 : -1;    
		}
	}
	function up_sortNames1(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(1)").text()) > ($(a).find("td:eq(1)").text()) ? 1 : -1;    
		}
	}
	function down_sortCoords1(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(2)").text().match(/\d+\|\d+/g)) < ($(a).find("td:eq(2)").text().match(/\d+\|\d+/g)) ? 1 : -1;    
		}
	}
	function up_sortCoords1(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(2)").text().match(/\d+\|\d+/g)) > ($(a).find("td:eq(2)").text().match(/\d+\|\d+/g)) ? 1 : -1;    
		}
	}
	function down_sortKs1(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(2)").text().match(/\d+\|\d+/g)) < ($(a).find("td:eq(2)").text().match(/\d+\|\d+/g)) ? 1 : -1;    
		}
	}
	function up_sortKs1(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(2)").text().match(/K\d+/g)) > ($(a).find("td:eq(2)").text().match(/K\d+/g)) ? 1 : -1;    
		}
	}
	function down_sortNames2(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(2)").text()) < ($(a).find("td:eq(2)").text()) ? 1 : -1;    
		}
	}
	function up_sortNames2(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(2)").text()) > ($(a).find("td:eq(2)").text()) ? 1 : -1;    
		}
	}
	function down_sortCoords2(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(2)").text().match(/\d+\|\d+/g)) < ($(a).find("td:eq(2)").text().match(/\d+\|\d+/g)) ? 1 : -1;    
		}
	}
	function up_sortCoords2(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(2)").text().match(/\d+\|\d+/g)) > ($(a).find("td:eq(2)").text().match(/\d+\|\d+/g)) ? 1 : -1;    
		}
	}
	function down_sortKs2(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(2)").text().match(/\d+\|\d+/g)) < ($(a).find("td:eq(2)").text().match(/\d+\|\d+/g)) ? 1 : -1;    
		}
	}
	function up_sortKs2(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(2)").text().match(/K\d+/g)) > ($(a).find("td:eq(2)").text().match(/K\d+/g)) ? 1 : -1;    
		}
	}
	function down_sortNames3(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(3)").text()) < ($(a).find("td:eq(3)").text()) ? 1 : -1;    
		}
	}
	function up_sortNames3(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(3)").text()) > ($(a).find("td:eq(3)").text()) ? 1 : -1;    
		}
	}
	function down_sortNames4(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(a).find("td:eq(4)").text()) - ($(b).find("td:eq(4)").text());    
		}
	}
	function up_sortNames4(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(4)").text()) - ($(a).find("td:eq(4)").text());    
		}
	}
	function down_sortNames5(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(a).find("td:eq(5)").text()) - ($(b).find("td:eq(5)").text());    
		}
	}
	function up_sortNames5(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(5)").text()) - ($(a).find("td:eq(5)").text());    
		}
	}
	function down_sortNames6(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(a).find("td:eq(6)").text()) - ($(b).find("td:eq(6)").text());    
		}
	}
	function up_sortNames6(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(6)").text()) - ($(a).find("td:eq(6)").text());    
		}
	}
	function down_sortNames7(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(a).find("td:eq(7)").text()) - ($(b).find("td:eq(7)").text());    
		}
	}
	function up_sortNames7(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(7)").text()) - ($(a).find("td:eq(7)").text());
		}
	}
	function down_sortNames8(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(a).find("td:eq(8)").text()) - ($(b).find("td:eq(8)").text());    
		}
	}
	function up_sortNames8(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(8)").text()) - ($(a).find("td:eq(8)").text());    
		}
	}
	function down_sortNames9(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(a).find("td:eq(9)").text()) - ($(b).find("td:eq(9)").text());    
		}
	}
	function up_sortNames9(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(9)").text()) - ($(a).find("td:eq(9)").text());    
		}
	}
	function down_sortNames10(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(a).find("td:eq(10)").text()) - ($(b).find("td:eq(10)").text());    
		}
	}
	function up_sortNames10(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(10)").text()) - ($(a).find("td:eq(10)").text());    
		}
	}
	function down_sortNames11(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(a).find("td:eq(11)").text()) - ($(b).find("td:eq(11)").text());    
		}
	}
	function up_sortNames11(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(11)").text()) - ($(a).find("td:eq(11)").text());    
		}
	}
	function down_sortNames12(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(a).find("td:eq(12)").text()) - ($(b).find("td:eq(12)").text());    
		}
	}
	function up_sortNames12(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(12)").text()) - ($(a).find("td:eq(12)").text());    
		}
	}
	function down_sortNames13(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(a).find("td:eq(13)").text()) - ($(b).find("td:eq(13)").text());    
		}
	}
	function up_sortNames13(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(13)").text()) - ($(a).find("td:eq(13)").text());    
		}
	}
	function down_sortNames14(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(a).find("td:eq(14)").text()) - ($(b).find("td:eq(14)").text());    
		}
	}
	function up_sortNames14(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(14)").text()) - ($(a).find("td:eq(14)").text());    
		}
	}
	function down_sortNames15(){
		$("#commands_table").find(".nowrap").sort(asc_sort).appendTo("#commands_table tbody");
		function asc_sort(a, b){
			return ($(a).find("td:eq(15)").text()) - ($(b).find("td:eq(15)").text());    
		}
	}
	function up_sortNames15(){
		$("#commands_table").find(".nowrap").sort(dec_sort).appendTo("#commands_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(15)").text()) - ($(a).find("td:eq(15)").text());    
		}
	}

	$("#commands_table").find("th:eq(0)").before('<th style="text-align:center;"><a href="javascript:;" class="attk">ID Attack</a><br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sorts();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sorts();"></th>');
	$("#commands_table").find(".nowrap").each(function(){
		var ID = $(this).find("td:first").find("input:eq(0)").val();
		$(this).find("td:eq(0)").before('<td style="text-align:center;"><b class="id_attack">'+ID+'</b></td>');
	});
	var col = $("#commands_table").find("th:last").attr("colspan");
	var cl = col*1+1;
	$("#commands_table").find("th:last").attr("colspan",cl);
	var tr = $("#commands_table").find("tr:last");
	$("#commands_table tbody").after(tr);
	var sll = $("#commands_table").find("th:eq(1)").text();
	$("#commands_table").find("th:eq(1)").html('<span class="small">'+sll+'</span>');
	$("#commands_table").find("th:eq(1)").append(' <img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortNames1();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortNames1();"><br><a href="javascript:;" class="small">الإحـداثـيـات</a> &nbsp;<img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortCoords1();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortCoords1();"><br><a href="javascript:;" class="small">الـقـا ر ا ت</a> &nbsp;&nbsp;<img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortKs1();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortKs1();">');
	$("#commands_table").find("th:eq(2)").append(' <img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortNames2();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortNames2();"><br><a href="javascript:;" class="small">الإحـداثـيـات</a> <img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortCoords2();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortCoords2();"><br><a href="javascript:;" class="small">الـقـا ر ا ت</a> &nbsp;<img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortKs2();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortKs2();">');
	$("#commands_table").find("th:eq(2)").find("a:first").attr("class","small");
	$("#commands_table").find("th:eq(3)").append(' <img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortNames3();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortNames3();">');
	$("#commands_table").find("th:eq(3)").find("a:first").attr("class","small");
	$("#commands_table").find("th:eq(4)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="up_sortNames4();"><br><img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="down_sortNames4();">');
	$("#commands_table").find("th:eq(5)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="up_sortNames5();"><br><img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="down_sortNames5();">');
	$("#commands_table").find("th:eq(6)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="up_sortNames6();"><br><img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="down_sortNames6();">');
	$("#commands_table").find("th:eq(7)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="up_sortNames7();"><br><img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="down_sortNames7();">');
	$("#commands_table").find("th:eq(8)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="up_sortNames8();"><br><img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="down_sortNames8();">');
	$("#commands_table").find("th:eq(9)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="up_sortNames9();"><br><img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="down_sortNames9();">');
	$("#commands_table").find("th:eq(10)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="up_sortNames10();"><br><img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="down_sortNames10();">');
	$("#commands_table").find("th:eq(11)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="up_sortNames11();"><br><img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="down_sortNames11();">');
	$("#commands_table").find("th:eq(12)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="up_sortNames12();"><br><img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="down_sortNames12();">');
	$("#commands_table").find("th:eq(13)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="up_sortNames13();"><br><img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="down_sortNames13();">');
	$("#commands_table").find("th:eq(14)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="up_sortNames14();"><br><img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="down_sortNames14();">');
	$("#commands_table").find("th:eq(15)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="up_sortNames15();"><br><img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="down_sortNames15();">');
	$("#commands_table").after('<br><table class="vis bbcodetable" align="center"><tbody><tr><th>المبرمج :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr></tbody></table>');
	
	var Th0 = $("#commands_table").find("th:eq(0)").find(".attk");
	
	var Th1s0 = $("#commands_table").find("th:eq(1)").find(".small:eq(0)");
	var Th1s1 = $("#commands_table").find("th:eq(1)").find(".small:eq(1)");
	var Th1s2 = $("#commands_table").find("th:eq(1)").find(".small:eq(2)");

	var Th2s0 = $("#commands_table").find("th:eq(2)").find(".small:eq(0)");
	var Th2s1 = $("#commands_table").find("th:eq(2)").find(".small:eq(1)");
	var Th2s2 = $("#commands_table").find("th:eq(2)").find(".small:eq(2)");

	var Th3 = $("#commands_table").find("th:eq(3)").find(".small");
	
	Th0.attr("title","فلترة الإرساليات حسب معرفها (ID Attack)");
	
	Th1s0.attr("title","فلترة الإرساليات");
	Th1s1.attr("title","فلترة الإرساليات حسب احداثيات القرى الهدف");
	Th1s2.attr("title","فلترة الإرساليات حسب قارات القرى الهدف");

	Th2s0.attr("title","فلترة الإرساليات حسب القرى المنشأ");
	Th2s1.attr("title","فلترة الإرساليات حسب إحداثيات القرى المنشأ");
	Th2s2.attr("title","فلترة الإرساليات حسب قارات القرى المنشأ");

	Th3.attr("title","فلترة الإرساليات حسب أوقات وصولها");
	
	UI.ToolTip(Th0);
	
	UI.ToolTip(Th1s0);
	UI.ToolTip(Th1s1);
	UI.ToolTip(Th1s2);

	UI.ToolTip(Th2s0);
	UI.ToolTip(Th2s1);
	UI.ToolTip(Th2s2);
	
	UI.ToolTip(Th3);

}else if(document.URL.match("mode=incomings")){
	function down_sort(){
		$("#incomings_table").find(".nowrap").sort(asc_sort).appendTo("#incomings_table tbody");
		function asc_sort(a, b){
			return ($(b).find(".id_attack").text()) < ($(a).find(".id_attack").text()) ? 1 : -1;    
		}
	}
	function up_sort(){
		$("#incomings_table").find(".nowrap").sort(dec_sort).appendTo("#incomings_table tbody");
		function dec_sort(a, b){
			return ($(b).find(".id_attack").text()) > ($(a).find(".id_attack").text()) ? 1 : -1;    
		}
	}
	function down_sortName1(){
		$("#incomings_table").find(".nowrap").sort(asc_sort).appendTo("#incomings_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(1)").text()) < ($(a).find("td:eq(1)").text()) ? 1 : -1;    
		}
	}
	function up_sortName1(){
		$("#incomings_table").find(".nowrap").sort(dec_sort).appendTo("#incomings_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(1)").text()) > ($(a).find("td:eq(1)").text()) ? 1 : -1;    
		}
	}
	function down_sortName2(){
		$("#incomings_table").find(".nowrap").sort(asc_sort).appendTo("#incomings_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(2)").text()) < ($(a).find("td:eq(2)").text()) ? 1 : -1;    
		}
	}
	function up_sortName2(){
		$("#incomings_table").find(".nowrap").sort(dec_sort).appendTo("#incomings_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(2)").text()) > ($(a).find("td:eq(2)").text()) ? 1 : -1;    
		}
	}
	function down_sortCoord2(){
		$("#incomings_table").find(".nowrap").sort(asc_sort).appendTo("#incomings_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(2)").text().match(/\d+\|\d+/g)) < ($(a).find("td:eq(2)").text().match(/\d+\|\d+/g)) ? 1 : -1;    
		}
	}
	function up_sortCoord2(){
		$("#incomings_table").find(".nowrap").sort(dec_sort).appendTo("#incomings_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(2)").text().match(/\d+\|\d+/g)) > ($(a).find("td:eq(2)").text().match(/\d+\|\d+/g)) ? 1 : -1;    
		}
	}
	function down_sortK2(){
		$("#incomings_table").find(".nowrap").sort(asc_sort).appendTo("#incomings_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(2)").text().match(/\d+\|\d+/g)) < ($(a).find("td:eq(2)").text().match(/\d+\|\d+/g)) ? 1 : -1;    
		}
	}
	function up_sortK2(){
		$("#incomings_table").find(".nowrap").sort(dec_sort).appendTo("#incomings_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(2)").text().match(/K\d+/g)) > ($(a).find("td:eq(2)").text().match(/K\d+/g)) ? 1 : -1;    
		}
	}
	function down_sortName3(){
		$("#incomings_table").find(".nowrap").sort(asc_sort).appendTo("#incomings_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(3)").text()) < ($(a).find("td:eq(3)").text()) ? 1 : -1;    
		}
	}
	function up_sortName3(){
		$("#incomings_table").find(".nowrap").sort(dec_sort).appendTo("#incomings_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(3)").text()) > ($(a).find("td:eq(3)").text()) ? 1 : -1;    
		}
	}
	function down_sortCoord3(){
		$("#incomings_table").find(".nowrap").sort(asc_sort).appendTo("#incomings_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(3)").text().match(/\d+\|\d+/g)) < ($(a).find("td:eq(3)").text().match(/\d+\|\d+/g)) ? 1 : -1;    
		}
	}
	function up_sortCoord3(){
		$("#incomings_table").find(".nowrap").sort(dec_sort).appendTo("#incomings_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(3)").text().match(/\d+\|\d+/g)) > ($(a).find("td:eq(3)").text().match(/\d+\|\d+/g)) ? 1 : -1;    
		}
	}
	function down_sortK3(){
		$("#incomings_table").find(".nowrap").sort(asc_sort).appendTo("#incomings_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(3)").text().match(/K\d+/g)) < ($(a).find("td:eq(3)").text().match(/K\d+/g)) ? 1 : -1;    
		}
	}
	function up_sortK3(){
		$("#incomings_table").find(".nowrap").sort(dec_sort).appendTo("#incomings_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(3)").text().match(/K\d+/g)) > ($(a).find("td:eq(3)").text().match(/K\d+/g)) ? 1 : -1;    
		}
	}
	function down_sortName4(){
		$("#incomings_table").find(".nowrap").sort(asc_sort).appendTo("#incomings_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(4)").text()) < ($(a).find("td:eq(4)").text()) ? 1 : -1;    
		}
	}
	function up_sortName4(){
		$("#incomings_table").find(".nowrap").sort(dec_sort).appendTo("#incomings_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(4)").text()) > ($(a).find("td:eq(4)").text()) ? 1 : -1;    
		}
	}
	function down_sortName5(){
		$("#incomings_table").find(".nowrap").sort(asc_sort).appendTo("#incomings_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(5)").text()) < ($(a).find("td:eq(5)").text()) ? 1 : -1;    
		}
	}
	function up_sortName5(){
		$("#incomings_table").find(".nowrap").sort(dec_sort).appendTo("#incomings_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(5)").text()) > ($(a).find("td:eq(5)").text()) ? 1 : -1;    
		}
	}
	function down_sortName6(){
		$("#incomings_table").find(".nowrap").sort(asc_sort).appendTo("#incomings_table tbody");
		function asc_sort(a, b){
			return ($(b).find("td:eq(6)").text()) < ($(a).find("td:eq(6)").text()) ? 1 : -1;    
		}
	}
	function up_sortName6(){
		$("#incomings_table").find(".nowrap").sort(dec_sort).appendTo("#incomings_table tbody");
		function dec_sort(a, b){
			return ($(b).find("td:eq(6)").text()) > ($(a).find("td:eq(6)").text()) ? 1 : -1;    
		}
	}
	
	$("#incomings_table").find("th:eq(0)").before('<th style="text-align:center;"><a href="javascript:;" class="attk">ID Attack</a><br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sort();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sort();"></th>');
	$("#incomings_table").find(".nowrap").each(function(){
		var ID = $(this).find("td:eq(0)").find("input:first").attr("name").match(/\d+/g);
		$(this).find("td:eq(0)").before('<td style="text-align:center;"><b class="id_attack">'+ID+'</b></td>');
	});
	var col = $("#incomings_table").find("th:last").attr("colspan");
	var cl = col*1+1;
	$("#incomings_table").find("th:last").attr("colspan",cl);
	var tr = $("#incomings_table").find("tr:last");
	$("#incomings_table tbody").after(tr);
	var sll1 = $("#incomings_table").find("th:eq(1)").text();
	$("#incomings_table").find("th:eq(1)").html('<span class="small">'+sll1+'</span>');
	$("#incomings_table").find("th:eq(1)").append(' <img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortName1();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortName1();">');
	$("#incomings_table").find("th:eq(1)").find("a:first").attr("class","small");
	$("#incomings_table").find("th:eq(2)").append(' &nbsp;&nbsp;&nbsp;&nbsp;<img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortName2();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortName2();"><br><a href="javascript:;" class="small">الإحداثـيات</a> <img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortCoord2();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortCoord2();"><br><a href="javascript:;" class="small">الـقـا ر ا ت</a> <img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortK2();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortK2();">');
	$("#incomings_table").find("th:eq(2)").find("a:first").attr("class","small");
	$("#incomings_table").find("th:eq(3)").append(' &nbsp;&nbsp;&nbsp;&nbsp;<img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortName3();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortName3();"><br><a href="javascript:;" class="small">الإحداثـيات</a> <img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortCoord3();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortCoord3();"><br><a href="javascript:;" class="small">الـقـا ر ا ت</a> <img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortK3();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortK3();">');
	$("#incomings_table").find("th:eq(3)").find("a:first").attr("class","small");
	$("#incomings_table").find("th:eq(4)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortName4();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortName4();">');
	$("#incomings_table").find("th:eq(4)").find("a:first").attr("class","small");
	$("#incomings_table").find("th:eq(5)").append(' <img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortName5();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortName5();">');
	$("#incomings_table").find("th:eq(5)").find("a:first").attr("class","small");
	$("#incomings_table").find("th:eq(6)").append('<br><img src="/graphic/overview/up.png" style="cursor:pointer;" onclick="down_sortName6();"> <img src="/graphic/overview/down.png" style="cursor:pointer;" onclick="up_sortName6();">');
	$("#incomings_table").find("th:eq(6)").find("a:first").attr("class","small");
	$("#incomings_table").after('<br><table class="vis bbcodetable" align="center"><tbody><tr><th>المبرمج :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr></tbody></table>');
	
	var th0 = $("#incomings_table").find("th:eq(0)").find(".attk");
	
	var th1 = $("#incomings_table").find("th:eq(1)").find(".small");
	
	var th2s0 = $("#incomings_table").find("th:eq(2)").find(".small:eq(0)");
	var th2s1 = $("#incomings_table").find("th:eq(2)").find(".small:eq(1)");
	var th2s2 = $("#incomings_table").find("th:eq(2)").find(".small:eq(2)");

	var th3s0 = $("#incomings_table").find("th:eq(3)").find(".small:eq(0)");
	var th3s1 = $("#incomings_table").find("th:eq(3)").find(".small:eq(1)");
	var th3s2 = $("#incomings_table").find("th:eq(3)").find(".small:eq(2)");

	var th4 = $("#incomings_table").find("th:eq(4)").find(".small");
	
	var th5 = $("#incomings_table").find("th:eq(5)").find(".small");
	
	var th6 = $("#incomings_table").find("th:eq(6)").find(".small");
	
	th0.attr("title","فلترة الهجمات حسب معرف الهجمة (ID Attack)");

	th1.attr("title","فلترة الهجمات");
	
	th2s0.attr("title","فلترة الهجمات حسب القرى الهدف");
	th2s1.attr("title","فلترة الهجمات حسب إحداثيات القرى الهدف");
	th2s2.attr("title","فلترة الهجمات حسب قارات القرى الهدف");

	th3s0.attr("title","فلترة الهجمات حسب القرى البداية");
	th3s1.attr("title","فلترة الهجمات حسب إحداثيات القرى البداية");
	th3s2.attr("title","فلترة الهجمات حسب قارات القرى البداية");

	th4.attr("title","فلترة الهجمات حسب اللاعبين");
	
	th5.attr("title","فلترة الهجمات حسب أوقات وصولها");
	
	th6.attr("title","فلترة الهجمات حسب مدة وصولها");
	
	UI.ToolTip(th0);

	UI.ToolTip(th1);
	
	UI.ToolTip(th2s0);
	UI.ToolTip(th2s1);
	UI.ToolTip(th2s2);

	UI.ToolTip(th3s0);
	UI.ToolTip(th3s1);
	UI.ToolTip(th3s2);
	
	UI.ToolTip(th4);
	
	UI.ToolTip(th5);
	
	UI.ToolTip(th6);
}