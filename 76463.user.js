// ==UserScript==
// @name           reddit_ploink
// @description    Replaces content of evil redditors with PLOINK!
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

(function($)
{
	if(!window.frameElement)
	{
        function createPloinkHash(p)
        {
            var h={};
            p = p.split(' ');
            for(var i in p) h[p[i]]=i;
            return h;
        }
        
        var ploink = createPloinkHash( 'redrover IConrad itsnotlupus' ); // <--- add evil redditors' usernames (seperated by a space character)to string
        
        $('.entry .author').each(function()
                                 {
                                    if($(this).text() in ploink)
                                    {
                                        $(this).text("PLOINK!").css('color','lightgrey')
                                            .closest('.entry')
                                                .find('.usertext-body p').each(function(){$(this).remove()}).end()
                                                .find('.md p').each(function(){$(this).remove()}).end()
                                                .find('.title .title').each(function(){$(this).text("PLOINK!").css('color','lightgrey')});
                                    }
                                 }
                                )
    }
    
})(unsafeWindow.jQuery)