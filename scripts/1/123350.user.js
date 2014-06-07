// ==UserScript==
// @name           FSE-getAircrafts
// @namespace      ansorg.fse
// @include        http://atilla.hinttech.nl/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

//var $ = unsafeWindow.jQuery;
//http://userscripts.org/scripts/admin/123350

String.prototype.getValueByKey = function(k){
    var p = new RegExp('\\b'+k+'\\b','gi');
    return this.search(p) != -1 ? decodeURIComponent(this.substr(this.search(p)+k.length+1).substr(0,this.substr(this.search(p)+k.length+1).search(/(&|;|$)/))) : "";
};


$(document).ready(function() {  
        //alert( $.fn.jquery );
        //alert( unsafeWindow.jQuery.fn.jquery );

	$('.dataTable a[name="gmap"]').attr("onclick", null);
	
	$('body').append("<ul id='acfList' style='margin-left: 5em; position:absolute; background:yellow; padding:1ex 0 0 4ex;'></ul>");
	$('#acfList').click(
		function() {
			$(this).hide();
		}
	);
	
	$('.dataTable a[name="gmap"]').hover( 
		function() { 
			$(this).append($("<span> ***</span>"));
		}, 
		function () {
			$(this).find("span:last").remove();
		}
	).click(
		function() {
			var anchor = $(this).parent();
			var icao = $(this).next().attr('href').getValueByKey("icao") ;
			//alert( icao );
			
			if (icao != "") {
				$.ajax({
					url: "http://atilla.hinttech.nl/fseconomy/xml?query=ICAOAircraft&icao=" + icao,
					cache: true,
					dataType: "xml",
					async: false,
					success: function(xml) {
						$('#acfList').html('<li><b>' + icao + '</b></li>');
						$(xml).find('Aircraft').each(function(){
							var title = $(this).find('MakeModel').text();
							var eqpmt = $(this).find('Equipment').text();
							//alert(title);
							 $('#acfList').first().append("<li>" + title + ", " + eqpmt + "</li>");
						});
						anchor.append( $('#acfList')  ); 
						$('#acfList').show();
					}
				});
			}
		}
	)

});

