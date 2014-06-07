// ==UserScript==
// @name		          jukuu.com
// @namespace	  http://wushi777.blogspot.com
// @description     Version:20090421	   Require:5.0.0>Multi-Lang Lookup Bar>=4.0.0
// ==/UserScript==

if(document.documentElement.nodeName.match(/HTML/i) && window == top)
{
    if(!top.wrappedJSObject.multilanglookupbar)
    {
        top.wrappedJSObject.multilanglookupbar = {};
        top.wrappedJSObject.multilanglookupbar.lib = {};
    }
    
    top.wrappedJSObject.multilanglookupbar.lib['jukuu.com'] = function(thisEngine,context)
    {
        thisEngine.doBeforeLookup = function()
        {				
                thisEngine.url = "http://jukuu.com/search.php?q=" + context.selectedText;
        }
        
        thisEngine.renderDomain =
        {
            "jukuu.com":function()
            {
                GM_addStyle("body {margin:0px !important} a[href='http://www.suiniyi.com'], .div1 , #Table2 ,noscript {display:none}");
                $("#Frm1 > table").filter(function(idx)
                    {
                        if(idx == 0) $(this).remove();
                        return true;
                    });
            }
        }
    };
    
	top.wrappedJSObject.multilanglookupbar.assemble = true;
}