// ==UserScript==
// @name           TF2Outpost Tagger
// @version        1.0
// @description    Tag users on tf2outpost
// @include        http://www.tf2outpost.com/*
// @run-at         document-end
// @grant          none
// ==/UserScript==

function tagg(e)
{
    $(this).attr('contentEditable', true);
    $(this).focus();
    if($(this).text() == "Tag User")
    {
        $(this).text("");
    }
}	

function finalize(e)
{
    $(this).attr('contentEditable', false);
    if($(this).text() != "")
    	localStorage[$(this).attr('sid')] = $(this).text();
    else
    	$(this).text('Tag User');
}


var trades = $('.trade').each(
    function()
    {
        var href = $(this).find('.details a').attr("href");
        var x = this;
        $.post(href, 
               function(data)
               {
					var sid = $(data).find('.tools').eq(1).find('[href^=steam]').attr('href').split('/')[4];
                    var z = $("<li sid='"+sid+"' style='font-size:10px; background:black; color:white;border:1px solid black; padding:2px; line-height:12px; margin:4px; z-index:100; margin-top:12px; margin-right:0px; border-radius:5px;' class='gmtag'></li>");
                    z.dblclick(tagg);
                    z.blur(finalize);
                    $(x).find('.details').prepend(z);
                    if(localStorage.hasOwnProperty(sid))
                    {
                        z.text(localStorage[sid]);
                    }
                    else
                    {
                        z.text("Tag User");
                    }
               });
        
        
    }
);


var comments = $('.offer:not(:first), .reply').each(
    function()
    {
        try
        {
    		var sid = $(this).find('.tools').eq(0).find('[href^=steam]').attr('href').split('/')[4];
            var z = $("<li sid='"+sid+"' style='font-size:10px; background:black; color:white;border:1px solid black; padding:2px; line-height:12px; margin:4px; z-index:100; margin-top:12px; margin-right:0px; border-radius:5px;' class='gmtag'></li>");
			z.dblclick(tagg);
            z.blur(finalize);
            $(this).find('.details').prepend(z);
            if(localStorage.hasOwnProperty(sid))
            {
                z.text(localStorage[sid]);
            }
            else
            {
                z.text("Tag User");
            }
        }
        catch(e)
        {
        }
    }
);