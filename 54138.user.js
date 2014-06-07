// ==UserScript==
// @name           KinsokuJikou
// @namespace      net.mui-style.gm
// @description    禁則事項
// @include        http://twitter.com/*
// @include        http://favotter.matope.com/*
// ==/UserScript==
(function()
{
    function replace()
    {
        replaceEntries(document);
    }
   
    function replaceEntries(node)
    {
    	var entries = null;
        if(location.href.indexOf('http://twitter.com/') == 0)
        {
            entries = document.evaluate('//span[@class=\'entry-content\']', node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        }
        else if(location.href.indexOf('http://favotter.matope.com/') == 0)
        {
            entries = document.evaluate('//span[contains(@class, \'status_text\')]', node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        }
        if(entries != null)
        {
        	var len = entries.snapshotLength;
	        for(i = 0; i < len; i++)
	        {
	            var entry = entries.snapshotItem(i);
	            replaceEntry(entry);
	        }
	    }
    }
   
    function replaceEntry(entry)
    {
        entry.innerHTML = entry.innerHTML.replace(/(█{2,}|▓{2,})/g,'<span style="color:red;font-weight:bold">[禁則事項]</span>');
        entry.innerHTML = entry.innerHTML.replace(/(█|▓)/g,'<span style="color:red;font-weight:bold">[禁]</span>');
	   	//GM_log(entry.innerHTML);
    }
    
    function init()
    {
	    replace();
	    if(typeof($) != 'function')
    	{
    		window.setTimeout(init, 100);
    		return;
		}
	    var timeline = $('timeline');
	    if(timeline != null)
	    {
	        timeline.addEventListener('DOMNodeInserted', function(e)
	        {
	            if(e.target.tagName = 'li' && e.target.className.indexOf('status') >= 0)
	            {
	                replaceEntries(e.target);
	            }
	        }, false);
	    }
	}
	init();
})();