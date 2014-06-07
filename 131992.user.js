// ==UserScript==
// @name           TF2TP craft hat selector
// @include        *tf2tp.com/propose.php
// @require 	   http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==


main = function () {

$(function(){
	button=$("<input value='Select Craft hats!' type='button'/>").click(function(){
$("#step2").children('.allItems').children('[data-itemslot="hat"]')
.each(
	function(){
		source=$(this).children().attr("src").substring(45,48);
		if(source!="hwn" && source!="hal"){
			$(this).click();
		}
		
		
	});


});
	$('#step2').children('.wishlistMode').append(button);
});

};

var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);