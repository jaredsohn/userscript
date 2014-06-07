// ==UserScript==
// @name           PostgreSQL documentation navigator
// @namespace      http://www.darkixion.com/
// @version        1.1.0
// @author         Thom Brown
// @description    Adds a generic navigation to PostgreSQL documentation
// ==/UserScript==


// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; main_function(); }
    }
    GM_wait();
    
    function main_function() {
    	full_url = window.location.href;
    	
    	url_path = full_url.substr(0,full_url.lastIndexOf("/")+1);
    	
    	if (url_path.search("postgresql.org/docs/"))
    	{
		pg_menu = '<div id="contents_container" style="z-index: 99; -moz-border-radius: 5px; text-align: left; border-radius: 5px; padding: 2px; position: fixed; top: 10px; right: 5px; font-size: 13px; background-color: #EFF2FF; border: 1px solid #BFBFBF;">';
		pg_menu += '<span id="show_contents" style="cursor: pointer;">Contents</span>';
		pg_menu += '<ul id="contents_list" style="padding-left: 5px; list-style-type: none; display: none;">';

		$('h2').each(function(){
		
			title_text = $(this).text();
			
			if ($(this).children('a').length > 0)
			{
				fragment = $(this).children('a').attr('name');
			}
			else if ($(this).siblings('a').length > 0)
			{
				fragment = $(this).siblings('a').attr('name');
			}
			
			pg_menu += '<li style="text-align: left; "><a href="#' + fragment + '">' + title_text + '</a>';
			
			if ($(this).parent('div').find('h3').length > 0)
			{
				pg_menu += '<ul>';
				
				$(this).parent('div').find('h3').each(function(){
						
					title_text = $(this).text();

					if ($(this).children('a').length > 0)
					{
						pg_menu += '<li style="text-align: left; height: 14px;"><a href="#' + $(this).attr('name') + '">' + title_text + '</a></li>';
					}
					else if ($(this).siblings('a').length > 0)
					{
						pg_menu += '<li style="text-align: left; height: 14px;"><a href="#' + $(this).attr('name') + '">' + title_text + '</a></li>';
					}
				});
				pg_menu += '</ul>';
			}
			
			pg_menu += '</li>';
		});

		pg_menu += '</ul></div>';

		$('#docContainerWrap').prepend(pg_menu);
		
		$('#contents_container').live('mouseenter', function(){
			$('#contents_list').fadeIn('fast');
		});
		
		$('#contents_container').live('mouseleave', function(){
			$('#contents_list').fadeOut('fast');
		});
	}
    }
    
    