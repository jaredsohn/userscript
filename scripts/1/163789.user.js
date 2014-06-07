// ==UserScript==
// @name  			px5x2_1
// @description     eksi guzellestirme
// @include         https://eksisozluk.com
// @include         http://eksisozluk.com
$(document).ready(
	function(){
		$('#aside').remove();
                $('body').css('background', 'black');
		$('#index-section').css('font-size', 'x-small');
		$('#content-section').css('width', '90%');
		$('#editbox').css('background', '#1F1F2E');
                $('h1#title').css('font-size', 'small');
                $('article').css('color', 'white')
		
		
});
// ==/UserScript==
