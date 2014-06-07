// ==UserScript==
// @name		              ciyang.com
// @namespace	      http://wushi777.blogspot.com
// @description        Version:20090417     Require:5.0.0>Multi-Lang Lookup Bar>=4.0.0
// ==/UserScript==

if(document.documentElement.nodeName.match(/HTML/i) && window == top)
{
    if(!top.wrappedJSObject.multilanglookupbar)
    {
        top.wrappedJSObject.multilanglookupbar = {};
        top.wrappedJSObject.multilanglookupbar.lib = {};
    }
    
    top.wrappedJSObject.multilanglookupbar.lib['ciyang.com'] =  function(thisEngine,context)
    {
        thisEngine.restrictedTextLength = 15;
        thisEngine.doBeforeLookup = function()
        {
            thisEngine.url = "http://www.ciyang.com/search.php?q=" + context.selectedText;
        };
        thisEngine.renderDomain =
        {
            "ciyang.com":function()
            {
                GM_addStyle("* {font:9pt tahoma !important}");
                $("body > table").filter(
                    function(idx)
                    {
                        return idx<5 || idx >8; 
                    }).remove();
            }
        }
    };
	
    top.wrappedJSObject.multilanglookupbar.assemble = true;
}