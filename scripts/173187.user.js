// ==UserScript==
// @name         إخفاء زر مخفض
// @description  يقوم بإخفاء زر مخفض من المبنى الرئيس
// @version      1.0
// @author       IaM GenIuS
// @copyright    (C) 2013 IaM GenIuS
// @include      http://ae*.tribalwars.ae/game.php?*screen=main*
// @include      http://en*.tribalwars.net/game.php?*screen=main*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var $unsafeWindow = $(unsafeWindow);
$(function(){
	$("#buildings tr").each(function(i){
		$(".tooltip").hide();
		$(".tooltip").parent("b").hide();
	});
});
