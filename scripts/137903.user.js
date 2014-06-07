// ==UserScript==
// @name       Not Premium
// @namespace  http://use.irr.by/
// @version    0.1
// @description  Selects all but premium ad.
// @match      http://irr.by/*
// @copyright  2012+, CreativeHTML
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$(document).ready(function()
{
		$("tr.rowsButton.premium td").css('background-color','#4c93eb');
		//$(".premium > .firstTd").html('<i></i>');
		//$("ul .lft:first").html('<div class="button-style btn-a" style="width:160px"><a href="#" onclick="adPsellerAction.checkAll(); return false;"><i></i>Выбрать все на странице</a></div><div class="protas button-style btn-a" style="width:160px"><a href="#"><i></i>Все кроме премиумов</a></div>');
		$("ul .lft:first")
			.html('<div class="protas button-style btn-a" style="width:160px"><a href="#"><i></i>Все кроме премиумов</a></div>');
		$(".protas")
			.click(function(eventObject){
				eventObject.preventDefault();
				$(".adSelect:not(.premium input)")
					.attr("checked","checked")
	});
});