// ==UserScript==
// @name                Meneame+Panoramio
// @namespace        	http://www.imanoliglesias.com/userscripts/meneame+panoramio
// @description        	Muestra fotos de Panoramio en aquellas noticias que tienen información geográfica
// @include            	http://meneame.net/story/*
// @require            	http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

(function() {
  
GM_xmlhttpRequest({
	method: "GET",
   	url: "http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js",
   	onload: run
});

function run(responseDetails) 
{
	if (responseDetails.status != 200) 
	{
    	GM_log("no jQuery found!");
       	return;
   	}

   	eval(responseDetails.responseText);
  
	// Hay mapa en la noticia?
   	if ($('#map').size <= 0)
   		return;
   	
   	// Hay script con coordenadas?
   	if ($('script:eq(5)').size() <= 0)
   		return;
   		
	var js_text = $('script:eq(5)').text();
	var pattern = /geo_coder_load[\(](.*),(.*),(.*),/i; //$(function(){geo_coder_load(39.4616436421,-0.3515625, 5, 'published');})
	
	var point = js_text.match(pattern);
	
	if (point && point.length > 2)
	{
		var minx = parseFloat(point[2]) - 0.05;
		var miny = parseFloat(point[1]) - 0.05;
		var maxx = parseFloat(point[2]) + 0.05;
		var maxy = parseFloat(point[1]) + 0.05;
	
		var api_panoramio = 'http://www.panoramio.com/map/get_panoramas.php?order=popularity&set=public&from=0&to=20&minx='+minx+'&miny='+miny+'&maxx='+maxx+'&maxy='+maxy+'&size=square';
	
		GM_xmlhttpRequest({
			method: "GET",
	   		url: api_panoramio,
	   		onload: getPhotos
		});
	}
}

function getPhotos(responseDetails)
{
	if (responseDetails.status != 200) 
       	return;
       	
    var data = eval('('+responseDetails.responseText+')');
    
    if (data)
	    if (data.photos.length > 0)
	    {
	    	GM_addStyle("ul#photos { clear: both; overflow: hidden; list-style-type: none; } ul#photos li { float: left; }");
	    	
	    	var ul = $('<ul/>').attr('id', 'photos').hide();
	    	
	    	$.each(data.photos, function(i, photo) {
	    		var li = $('<li/>');
	    		
	    		var img = $('<img/>').attr({'title': photo.photo_title, 'alt': photo.photo_title, 'src': photo.photo_file_url});
				var a = $('<a/>').attr({'href': photo.photo_url, 'title': photo.photo_title});
									
	    		img.appendTo(a);
	    		a.appendTo(li);
	    		li.appendTo(ul);
	    	});
	    	
	    	$('#map').after(ul).after($('<h4><a href="#">Ver fotos</a></h4>').click(function(e) { $('ul#photos').toggle(400); e.preventDefault(); }));
	    }
}

})();