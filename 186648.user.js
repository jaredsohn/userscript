// ==UserScript==
// @name        Getty Images contributor Flickr Helper
// @namespace   http://userscripts.org/users/163777
// @include     https://contribute.gettyimages.com/producer/images/flickr/*
// @require 	http://code.jquery.com/jquery.min.js
// @version     1.01
// @grant       GM_xmlhttpRequest
// ==/UserScript==
// define waitUntilExists from https://gist.github.com/PizzaBrandon/5709010

(function(e,f){var b={},g=function(a){b[a]&&(f.clearInterval(b[a]),b[a]=null)};e.fn.waitUntilExists=function(a,h,j){var c=this.selector,d=e(c),k=d.not(function(){return e(this).data("waitUntilExists.found")});"remove"===a?g(c):(k.each(a).data("waitUntilExists.found",!0),h&&d.length?g(c):j||(b[c]=f.setInterval(function(){d.waitUntilExists(a,h,!0)},500)));return d}})(jQuery,window);
       
var COPYRIGHT = '© 2008 - 2013 Volanthevist';
var photo_taken = 'Tomada el';

var currentPhoto = '', stylesAdded = false;    
var checkPhoto = function () { 
	var photoLink = $('#detail-actions a');      
	if (photoLink.length != 2) { 
		return;    
	}    

	photoLink = photoLink.eq(1); 
	if (photoLink.attr('href').indexOf('flickr') < 0 || currentPhoto == photoLink.attr('href')) {
		return;    
	}    
       
	currentPhoto = photoLink.attr('href');       
	$('div.photo-data').remove();
       
	$('#detail-actions').append('<span class="pipe">|</span> <a href="#metadata" class="loadingMetadata"><img src="/producer/images/ajax-loader.gif"></a>');     
       
	GM_xmlhttpRequest({  
		method: "GET",     
		url: currentPhoto.replace("http://www.","https://secure.") + 'meta/',      
		onload: function (response) {      
			var response$ = $(response.responseText);
			if (!stylesAdded) {      
				stylesAdded = true;    
				$('head').append(response.responseText.match(/<link[^>]+combo[^>]+>/));
			}
			response$.find('div.photo-data').appendTo('#imageDetails');      
			$('div.photo-data h2:eq(0)').append('<a name="metadata" />');    
			$('#detail-actions .loadingMetadata').text('Metadata loaded');   
      		$("div.photo-data th:contains('"+photo_taken+"')").closest('tr').each(function() {       
   				url = $(this).find("a").attr("href");
				fecha = url.split("/");
				$('#asset_capture_date_1i').waitUntilExists(function(){
					var fecha_actual = $('#asset_capture_date_1i');   
		    		if (!fecha_actual.val()) { 
						$("#asset_capture_date_1i").val(parseInt(fecha[5]));
						$("#asset_capture_date_2i").val(parseInt(fecha[6]));
  						$("#asset_capture_date_3i").val(parseInt(fecha[7]));
                    }
                });    
 			});      
    }      
	});  
};     
       
$('#asset_taken_with_mobile').waitUntilExists(function(){      
    $('#asset_taken_with_mobile > option')[2].selected = 'selected';   
});    
       
$('#asset_copyright_notice').waitUntilExists(function(){       
    var copy = $('#asset_copyright_notice');   
    if (!copy.val()) { 
copy.val(COPYRIGHT);    
    }  
});    

var eventTimeout;      
$("#imageDetails").bind('DOMSubtreeModified', function () {    
	clearTimeout(eventTimeout);  
	eventTimeout = setTimeout(checkPhoto, 100);  
}).trigger('DOMSubtreeModified');      
