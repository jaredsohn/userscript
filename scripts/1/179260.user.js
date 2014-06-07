// ==UserScript==
// @name       Crunchyroll Languages
// @version    0.1
// @author     Rafael Moreira Fonseca
// @description  To show options of language.
// @match      http://www.crunchyroll.com/*
// @match      http://www.crunchyroll.com.br/*
// @match      http://www.crunchyroll.co.uk/*
// @match      http://www.crunchyroll.es/*
// ==/UserScript==

div = $('#showmedia_about_info_details div:first-child span');
show_media = div.html();
if(div.length == 0) {
  //it doesn't exist
}else{
	if(show_media == ''){
		var url = window.location.href;
		var n = url.split('-');
		var video_id = n[n.length-1];
		
		var mediadata = 'http://www.crunchyroll.com/xml/?req=RpcApiVideoPlayer_GetMediaMetadata&media_id='+video_id;
		$.ajax({
			type: "GET",
			url: mediadata,
			dataType: "xml",
			success: function (xml) {
				$(xml).find('media_metadata').each(function () {
					var media_id = $(this).find('media_id').text();
					var get_listing = 'http://www.crunchyroll.com/xml/?req=RpcApiSubtitle_GetListing&media_id='+media_id;
					
						$.ajax({
						type: "GET",
						url: get_listing,
						dataType: "xml",
						success: function (xml2) {
							var x = [];
							
							$(xml2).find('subtitles').each(function(){
								$(this).find('subtitle').each(function(){
								
									var title = $(this).attr('title');
									var link = $(this).attr('link');
									link= url+"?ssid="+link.match(/subtitle_script_id=([^&]+)/)[1];
									
									if(title == "[English (US)] English (US)"){
									
										x.push('<img src="http://static.ak.crunchyroll.com/i/country_flags/us.gif"><a href="'+link+'">English (US)</a>');
										
									}else if(title == "[Español] Español"){
									
										x.push('<img src="http://static.ak.crunchyroll.com/i/country_flags/mx.gif"><a href="'+link+'">Español</a>');
									
									}else if(title == "[Español (España)] Español (España)"){
									
										x.push('<img src="http://static.ak.crunchyroll.com/i/country_flags/es.gif"><a href="'+link+'">Español (España)</a>');
										
									}else if(title == "[Français (France)] Français (France)"){
									
										x.push('<img src="http://static.ak.crunchyroll.com/i/country_flags/fr.gif"><a href="'+link+'">Français (France)</a>');
										
									}else if(title == "[Português (Brasil)] Português (Brasil)"){
									
										x.push('<img src="http://static.ak.crunchyroll.com/i/country_flags/br.gif"><a href="'+link+'">Português (Brasil)</a>');
									}else{

									}
									
								});
								div.html(x.join(", "));
								
							});
						},
						error: function () {
							alert("Error!");
						}
					});
					
				});
			},
			error: function () {
				alert("Error!");
			}
		});


	}else{

	}
}