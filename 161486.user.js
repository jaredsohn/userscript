// ==UserScript==
// @name        HD-Area Youtube Trailer
// @include     http://www.hd-area.org
// @include     http://www.hd-area.org/index.php
// @include     http://www.hd-area.org/index.php?*s=default
// @include     http://www.hd-area.org/index.php?*s=top-rls
// @include     http://www.hd-area.org/index.php?*s=movies
// @include     http://www.hd-area.org/index.php?*s=Cinedubs
// @include     http://www.hd-area.org/index.php?*s=3D_Cine
// @include     http://www.hd-area.org/index.php?*s=3D
// @version     1.0.0
// @author		Surio
// @description    1-Click Youtube Trailer for HD-Area Movies
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http:////ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
	var keywords = new Array ("DL.","DTS","720p","1080p","AC3","AC3D","BluRay","x264","AVC","Remux","Repack","NFO","Instrumental","DL","DVD")
	ytID="";
	
		$(".download").each(function(){
			title = $(this).find(".inputbox").attr("value");
			//Split that shit
				if (/DTS/i.test(title)){
					title = title.split("DTS");
				}
				else{
				if (/AC3/i.test(title)){
					title = title.split("AC3");
				}
				else{
				if (/1080/i.test(title)){
					title = title.split("1080");
				}
				else{
				if (/720/i.test(title)){
					title = title.split("720");
				}
				else{
				if (/MULTI/i.test(title)){
					title = title.split("MULTI");
				}
				else{
				if (/COMPLETE/i.test(title)){
					title = title.split("COMPLETE");
				}	
				else{		
				if (/BLURAY/i.test(title)){
					title = title.split("COMPLETE");
				}				
				}}}}}}
			
			if( typeof title === 'string' ) {
				keywords.forEach(function(key){
				title = title.replace(key,"");
				});
				title = title.replace(/\./g,"+");
				ytID = getYTID(title+" Trailer");
				
			}else{
			
				keywords.forEach(function(key){
				title[0] = title[0].replace(key,"");
				});
				title[0] = title[0].replace(/\./g,"+");
				ytID = getYTID(title[0]+" Trailer");
			}
	
		if (ytID !== "oHg5SJYRHA0"){
		 link = '<a rel="noreferrer" style="margin-left:10px;" href="http://www.youtube.com/watch?v='+ytID+'&hd=1">Trailer</a>';
		 }else{
			if( typeof title === 'string' ) {
				link = '<a rel="noreferrer" style="margin-left:10px;" href="http://www.youtube.com/results?search_type=search_videos&search_query='+title+'">Trailer</a>';
				}else{
				link = '<a rel="noreferrer" style="margin-left:10px;" href="http://www.youtube.com/results?search_type=search_videos&search_query='+title[0]+'">Trailer</a>';
				}
		 }
		 
		 $(link).insertBefore($(this).next().find(".weiterlesen"));		
		

			function getYTID(keyword){	
				$.ajax({
					url: 'https://gdata.youtube.com/feeds/api/videos?q='+keyword+'&max-results=1&v=2&alt=jsonc',
					dataType: 'json',
					async: false,
					success: function(resp){
						if (resp !== undefined && resp.data !== undefined && resp.data.items !== undefined && resp.data.items[0].id !== undefined){
					id = resp.data.items[0].id;
					 }else{
					 id= "oHg5SJYRHA0";
					 }
					}
				});
				return(id);
			}			
		});			
	}


		
    
	