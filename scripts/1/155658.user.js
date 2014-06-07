// ==UserScript==
// @name       ExoClick Table Sort
// @namespace  http://matt-curtis.me/
// @version    0.1
// @description  (.\/.) NO.
// @match      https://admin.exoclick.com/campaigns-stats.php*
// @copyright  2012+, You
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @include    https://admin.exoclick.com/campaigns-stats.php*
// @grant      none
// ==/UserScript==

$.fn.reverse = [].reverse;

var start = 1;
var desc_arrow = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAHCAYAAADTcMcaAAAAYUlEQVR42o3MOw5AUBRF0RONRiFGYyamozYNCULEbLQ+nUKiRMMuXiGCZyerujlXkjIs6NF9GDAihgK0OCw25LrkYbIMari6FWJ+GRTm8WMR1tugkSUHCXajgq+fpSjfjicNwC46lO555wAAAABJRU5ErkJggg==";
var asc_arrow = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAHCAYAAADTcMcaAAAAZElEQVR42mNgwA4WA/EqBiIBExA3AvEvKF4NxAKENIUD8Q8g/g/FP4F4PT4NFkD8EkkDssYVQMyDrgEk8BSLBmSNa4GYHaZBCIiv4dGArHE5TNMyIP4AxA+A+D4e/BCIHwFxAwChPi4pR+pp6QAAAABJRU5ErkJggg==";

var sortByNum = function(a, b){
	var aNum = Number($("td", a).eq(start).text());
	var bNum = Number($("td", b).eq(start).text());
	return aNum > bNum ? 1 : -1;
};

$("tr[class*='td_active']:not(:last-child)").each(function(i, el){
	var td = $(".td_title", el);
	
	for(var i=1; i<td.length; i++){
		td.eq(i).append("<img class='asc_arrow' src='"+asc_arrow+"' style='cursor: pointer' />")
		.append("<img class='desc_arrow' src='"+desc_arrow+"' style='cursor: pointer' />");
	}
});

$(".asc_arrow, .desc_arrow").on("click", function(e){
	start = $(this).parent().index();
	
	if(start == 0) return;
	
	var el = $(this).parent();
	
	var rows = $("tr", $(this).parents("tbody:first")).slice(1, -1);
	var newOrderRows = rows.clone().sort(sortByNum);
	
	if(this.className == "desc_arrow") newOrderRows.reverse();
	
	for(var i=0; i<rows.length; i++){
		rows.eq(i).replaceWith(newOrderRows[i]);
	}
});