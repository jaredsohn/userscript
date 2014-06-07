// ==UserScript==
// @name           reddit_toggle_buttons
// @description    Adds Toggle Images and Toggle Comments buttons to menu area of reddit comment pages
// @include        http://*.reddit.com/r/*/comments/*
// @include        http://reddit.com/r/*/comments/*
// ==/UserScript==

(function($)
{
	if(!window.frameElement)
	{
		
		//Toggle Images
		
        var href,ext,img,total=0;
        
        function countPics()
        {
            $('#siteTable .title a, .usertext-body a')
                .each(	function()
                        {
                            href = $(this).attr('href');
                            if(href.indexOf('www.reddit.com/domain/') < 0)
                            {
                                if(href.indexOf('imgur.') >= 0 || href.indexOf('.jpg') > 0 || href.indexOf('.png') > 0 || href.indexOf('.gif') > 0)
                                {
                                    total++;
                                }
                            }
                        }
                    );
        }
        
        function createAllPicView()
        {
            $('#siteTable .title a, .usertext-body a')
                .each(	function()
                        {
                            href = $(this).attr('href');
                            if(href.indexOf('www.reddit.com/domain/') < 0)
                            {
                                if(href.indexOf('imgur.') >= 0 || href.indexOf('.jpg') > 0 || href.indexOf('.png') > 0 || href.indexOf('.gif') > 0)
                                {
                                    ext = (href.indexOf('imgur.') >= 0 && href.indexOf('.jpg') < 0 && href.indexOf('.png') < 0 && href.indexOf('.gif') < 0) ? '.jpg' : '';
                                    img = $("<a class='GM_allpicview' href='" + href + "' onclick='window.open(this.href);return false;' style='display:none;'><img style='display:block;max-width:720px;' src='" + href + ext + "' /></a>");
                                    $(this).after(img);
                                 }
                            }
                        }
                    );
		}
        
        countPics(); // count total number of links to images on the page 
        
        // add 'Show/Hide n Images' to menuarea 
        
		$('<button id="GM_picbutton">Show '+total+' Images</button>')
            .click( function()
                    {
                        if($('.GM_allpicview').length==0)createAllPicView();
                        $('.GM_allpicview').toggle();
                        if($(this).text().indexOf('Show') >=0 )
                        {
                            $(this).text("Hide "+total+" Images");
                        }else
                        {
                            $(this).text("Show "+total+" Images");
                        }
                    }
                   )
            .appendTo(".menuarea");
		
		//Add 'Toggle Comments' button
		
		// This should work but doesn't for some reason.
		//$("<button>Toggle Comments</button>").click(function(){$('.collapsed, .noncollapsed').each(function(){if($(this).css('display')=='block')$(this).find('.expand').trigger('click');})}).appendTo('.menuarea');
		
        $("<button>Toggle Comments</button>").click(function(){$('div.commentarea > div.sitetable > div.thing > div.child').toggle()}).appendTo(".menuarea");
	}
})(unsafeWindow.jQuery);