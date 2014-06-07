// ==UserScript==
// @name       Yemeksepeti.com Maximum Fiyat Filtresi
// @description  Yemek Sepetinde yemek listesi sayfasında sepet üzerine maximum fiyat girerek yemeklere filtreleme yapabileceğiniz bir alan ekler.
// @version    1.1
// @namespace  http://suateyrice.com/
// @copyright  2013+, Suat Eyrice
// @require     http://code.jquery.com/jquery-latest.min.js
// @match      *://*.yemeksepeti.com/*/Restoran/*
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function(){
	var $input = $('<input type="text" />').css({
		width: "50px",
		"border-radius": "10px",
		border: "2px solid #F00",
		"text-align": "center"
	}).keyup(function(){
		$(".restoranMenuDetail").show().each(function(){
			$(".pv_new", this).each(function(){
				var val = parseFloat($input.val().replace(",", "."));
				if(val <= 0) val = Infinity;
				
				if(parseFloat($(this).text().replace(",", ".")) > val) {
					$(this).parents(".rmd_item:first").hide();
					return;
				}

				$(this).parents(".rmd_item:first").show();
			});
			
			if($(".rmd_item:visible", this).size() == 0) $(this).hide();
		})
	});

	$("#menu_wrapper table:eq(0)").after($('<div>Maximum Fiyat: </div>').css({
		background: "#9b0003",
		color: "#FFF",
		font: "11px arial",
		"padding": "10px"
	}).append($input));
});