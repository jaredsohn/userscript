// ==UserScript==
// @name        AUTO FLAG SYSTEM
// @grant       GM_getValue
// @grant       GM_setValue
// @include     http://*craigslist.*/*
// @require       http://code.jquery.com/jquery-1.7.min.js
// ==/UserScript==

window.onload = function(){
    if($('.row').length>0){
        var link,links='';
        $('.row').each(function(){
            link = $(this).find('a').attr('href');
            if(link && link!='undefined'){
                links = links +','+link;
            }
        });
		var link_collection = links.split(',');
    	var total_links = link_collection.length;
    	var iframe;
    	var i=1, j=total_links;
		
    	var stop_at = 100;
    	if(total_links>0){
			$('body').html('');
			function iframe_loop() {
				if(i<j && stop_at>=i){
					if(link_collection[i]){
						var iframe = '<iframe width="800px" scrolling="yes" height="250px" frameborder="0" src="'+link_collection[i]+'"></iframe>';
						$('body').append(iframe);
					}
					var min = 2000;
					var max = 3000;
					setTimeout(iframe_loop,Math.floor(Math.random() * (max - min + 1)) + min);
				}
				i++;
			}
			iframe_loop();
		}
	}
}
$().ready(function(e) {
	var flag_code;
	if($('.flags a').length>0){
		$('.flags a').each(function(index, element) {
			flag_code = $(element).attr('data-flag');
			if(flag_code==15){
				var flag_link = $(element).attr('href');
				posting_id = flag_link.split('postingID=')
				var cl_posting_id = posting_id[posting_id.length - 1];
				$.get("/flag/?async=async&flagCode="+$(this).data('flag')+"&postingID="+cl_posting_id);
				$('.flags').html("Thanks for flagging!");
			}
		});
	}
});