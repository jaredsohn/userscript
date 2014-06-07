// ==UserScript==
// @name     YouTube With No JavaScript
// @version	0.2.22
// @description This hack will eliminate the need of Javascript for playing clips on YouTube site. (Handy if you have NoScript extension on) 
// @namespace     http://userscripts.org/scripts/show/21900
// @include    http://youtube.com/*
// @include    http://www.youtube.com/*
// @include    https://youtube.com/*
// @include    https://www.youtube.com/*
// ==/UserScript==
function $(id,doc){ if (!doc || doc == '') {doc = document ; } return doc.getElementById(id); }
function $xpath(q,doc) { if (!doc || doc == '') {doc = document ; } return doc.evaluate(q, doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); }
(function(){
	
	if (window.self === window.top) { 
		//not in a frame 
		
		try {
		
			if($('alerts')){
				$('alerts').style.display = 'none';
			}
			
			if($('ticker')){
				$('ticker').style.display = 'none';
			}
						
			if($('watch-description')){
				$('watch-description').setAttribute('class','watch-expander yt-uix-expander yt-uix-expander-animated');
				var watch_expander_body = $xpath('//html//div[@id="watch-description"]//div[@class="watch-expander-body yt-uix-expander-body"]');
				if(watch_expander_body.snapshotItem(0)){
					watch_expander_body.snapshotItem(0).setAttribute('style','overflow: scroll');
				}
			}
			
			
			if ($('player-api') && document.body.innerHTML.match('ytplayer.config.loaded = true')) {
				var already_reached_player_ip_element = false; 
				var scripts_txt = '';
				var scripts = document.getElementsByTagName('script');
				for(var i = 0, k = scripts.length; i < k ; i++) {
					if (already_reached_player_ip_element === true) {
						break;
					}
					if (scripts[i].textContent.match('ytplayer.config.loaded = true')) {
						already_reached_player_ip_element = true;
					}
					scripts_txt += scripts[i].textContent;
				}
				if (scripts_txt.trim() != '') {
					eval(scripts_txt);
				}
			}
			
			
			if($('watch-related')){
				// /watch#!v=3iejdFZr6CY&feature=fvw
				var all_thumbnails_links = $('watch-related').getElementsByTagName('a');
				for (var i = 0 , k = all_thumbnails_links.length; i < k; i++){
					var link = all_thumbnails_links[i];
					if (link.getAttribute('href').match('watch#!v')){
						link.setAttribute('href', link.getAttribute('href').replace(/watch#!v/,'watch?v'));
					}
				}
				
			}
			
			var video_thumbnails = document.getElementsByTagName('img');
			for (var i = 0 , k = video_thumbnails.length; i < k; i++){
				var img = video_thumbnails[i];
				if(img.getAttribute('src').match(/pixel-/)){
					var img_thumb = img.getAttribute('data-thumb');
					if(img_thumb){
						img.setAttribute('src', img_thumb);
					}
				}
			}
			
			if ($('guide')) {
				$('guide').parentNode.removeChild($('guide'));
			}
				
		}
		catch(e){
			 //console.log('Error: ' + e);
			 //alert(e);
		}
	
	} else { 
		//we are in a frame. Use my other userscript at  http://userscripts.org/scripts/show/97748 to show embedded youtube videos without javascript 
	}
})();