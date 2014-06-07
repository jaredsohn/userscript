// ==UserScript==
// @name         نسبة سيطرة القبيلة على العالم
// @description  يقوم بإظهار خانة بجوار نقاط القبيلة في صفحة الترتيب بها نسبة سيطرة كل قبيلة على قرى العالم
// @version      1.0
// @author       IaM GenIuS
// @copyright    (C) 2013 IaM GenIuS
// @include      http://ae*.tribalwars.ae/game.php?*mode=ally&screen=ranking
// @include      http://ae*.tribalwars.ae/game.php?village=*&mode=ally&screen=ranking
// @include      http://ae*.tribalwars.ae/game.php?village=*&mode=ally&from=*&lit=*&screen=ranking
// @include      http://ae*.tribalwars.ae/game.php?*&mode=ally*&screen=ranking
// @include      http://ae*.tribalwars.ae/guest.php?screen=ranking&mode=ally*
// ==/UserScript==
var $ = unsafeWindow.jQuery;
var $unsafeWindow = $(unsafeWindow);
$(function(){
    var ae = document.URL.match(/http:\/\/\w+/);
    var uu = ae+".tribalwars.ae/stat.php";
    $.ajax({
		url : uu,
        datatype: "xml",
        success : function (data){
			var allV = $(data).find("table:eq(2) tr:eq(2) td:eq(1)").text();
			var allV2 = allV.replace(".","");
			$("#ally_ranking_table tr th:last-child").after("<th>نسبة السيطرة</th>");
			$("#ally_ranking_table tr td:last-child").after("<td></td>");
			$("#ally_ranking_table tr").each(function(i){
				var allyV = $(this).find("td:eq(6)").text();
				var nesba = ((allyV/allV2)*100).toFixed(2);
				$(this).find("td:eq(8)").text(nesba+"%");
				if ($(this).find("td:eq(7)").css("backgroundColor") == "rgb(255, 243, 211)" ){
					$(this).find("td:eq(8)").css("backgroundColor","rgb(255, 243, 211)");
					$(this).find("td:eq(8)").html("<b>"+$(this).find("td:eq(8)").text()+"</b>");
				}
			});
        }
    });
});