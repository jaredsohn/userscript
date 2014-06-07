// ==UserScript==
// @name           HashTagTwitterKensaku
// @namespace      gm.hcm.wankumc.com
// @description    ハッシュタグをTwitterの検索機能からTwitter検索(http://pcod.no-ip.org/yats/)に置換します。
// @include        http://twitter.com/*
// ==/UserScript==
(function()
{
    function replace()
    {
        replaceHashTags(document);
    }
   
    function replaceHashTags(node)
    {
        var hashtags = document.evaluate("//span[@class='entry-content']/a[@class='hashtag'][starts-with(@href,'/search')]", node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var len = hashtags.snapshotLength;
        for(var i = 0; i < len; i++)
        {
            var hashtag = hashtags.snapshotItem(i);
            replaceHashTag(hashtag);
            //GM_log(hashtag.innerHTML);
        }
    }
   
    function replaceHashTag(hashtag)
    {
        hashtag.href = 'http://pcod.no-ip.org/yats/search?query=%23' + hashtag.textContent.substr(1);
    }
    
    function init()
    {
    	if(typeof($) != 'function')
    	{
    		window.setTimeout(init, 100);
    		return;
		}
    	var timeline = $('#timeline');
    	if(timeline != null)
    	{
    	    timeline.addEventListener('DOMNodeInserted', function(e)
    	    {
    	       	if(e.target.tagName == 'li' && e.target.className.indexOf('status') >= 0)
    	        {
    	            replaceHashTags(e.target);
    	        }
    	    }, false);
    	}
    }

    replace();
    init();
})();