// ==UserScript==
// @name           YT-720p
// @namespace      http://www.w3.org/1999/xhtml
// @include        *.youtube.com*
// ==/UserScript==
// Add jQuery
	var usage=0;
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	var yt720p_check_times = 0;
	var isWide = get_value('wide');
	if(!isWide || isWide == '0'){
		store_value('wide','1',99);
	}
// Check if jQuery's loaded
    function GM_wait() {
		if(usage>1) return;
        if(typeof unsafeWindow.jQuery == 'undefined') { 
			window.setTimeout(GM_wait,100); 
		}
		else { 
			$ = unsafeWindow.jQuery; 
			letsJQuery();
			usage++;			
		}
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
		var url = window.location.toString();
		$("#yt-admin").addClass('collapsed');
        if(url.indexOf('/tv?')!=-1)
        {
            return;
        }
		if(url.indexOf('watch?')!=-1)
		 {
			var query_char='?';
			var title = $('#watch-title').text();
			//var fm_ls = yt.config_.PLAYER_CONFIG.args.fmt_list;
			//$('#watch-title').text(title + ' ' + fm_ls);
			if( url.indexOf('hd=1')!=-1)
			{
				$('.watch-video')
					.addClass('wide');
				process_links();
				return;
			}
			
			if( url.indexOf('?')!=-1)
			{
				query_char='&';
			}
			
			if( url.indexOf('#')!=-1 )
			{
				tmp=url.split('#');
				url=tmp[0];
			}
			
			window.location=url + query_char + 'hd=1';
		 }
		 
		if(url.indexOf('my_subscriptions')!=-1)
		{
			$('tbody#videos div.video-box').each(function(){
				var id = $(this).find('input.checkbox').val();
				$(this).find('a').attr('href','/watch?v='+id+'&hd=1');
			});
			process_links();
		}
		
		if( (url.indexOf('playlist')!=-1) || (url.indexOf('user')!=-1) || (url.indexOf('show')!=-1) || (url.indexOf('subscriptions')!=-1))
		{
			process_links();
		}
		
    }
	
	function process_links(){
		//console.log('yt720p check');
		//console.log(yt720p_check_times);
		yt720p_check_times = 0
		$("a[href*='watch?']").each(function(){
			var href = $(this).attr('href');
			if( href.indexOf('hd=1')==-1){
				$(this).attr('href',href+'&hd=1');
				yt720p_check_times++;
			}
		});
		$("a[id^='video-thumb-']").each(function(){
			var id = $(this).attr('id');
			id = id.substring(12,id.lastIndexOf('-'));
			$(this).attr('href','/watch?v='+id+'&hd=1');
			yt720p_check_times++;
		});
		
		$("a[id^='video-short-title-']").each(function(){
			var id = $(this).attr('id');
			id = id.substring(18);
			$(this).attr('href','/watch?v='+id+'&hd=1');
			yt720p_check_times++;
		});
		
		$("a[id^='video-long-title-']").each(function(){
			var id = $(this).attr('id');
			id = id.substring(17);
			$(this).attr('href','/watch?v='+id+'&hd=1');
			yt720p_check_times++;
		});
		setTimeout(process_links,1000);
	}
	function store_value(c_name,value,exdays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	};
	function get_value(c_name){
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
		{
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name)
			{
				var yy = unescape(y);
				if(yy!=null && yy!="")
					return yy;
			}
		}
		return false;
	};
	