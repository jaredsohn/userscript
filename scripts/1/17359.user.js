// ==UserScript==
// @name					dict.cn
// @namespace			http://wushi777.blogspot.com
// @description			Version:20091018    Require:5.0.0>Multi-Lang Lookup Bar>=4.0.0
// ==/UserScript==

if(document.documentElement.nodeName.match(/HTML/i) && window == top)
{
    if(!top.wrappedJSObject.multilanglookupbar)
    {
        top.wrappedJSObject.multilanglookupbar = {};
        top.wrappedJSObject.multilanglookupbar.lib = {};
    }

    top.wrappedJSObject.multilanglookupbar.lib['dict.cn'] = function(thisEngine,context)
    {
        thisEngine.doBeforeLookup = function()
        {
            thisEngine.url = "http://dict.cn/mini.php?utf8=true&q=" + context.selectedText;
        };
		
		thisEngine.renderDomain = 
		{
			"http://dict.cn/mini.php":function()
			{
				$("body").append(
					"<style>" +
						"body,div {background-color:white;font:9pt tahoma}" 	+
						"body {margin:5px}" +
						"i {font-style:normal;font-weight:bold;color:#0066ff}" +
						".p {font-weight:bold;color:#0066ff} "+
						"a {font-weight:bold;color:ff3333}" +
						".t,.g,.b {font-style:normal;color:#999900}"+
						".k, .h {font-weight:bold;color:#cc0066}" 	+
					"</style>"
				);
			}
		}
    }

   top.wrappedJSObject.multilanglookupbar.assemble = true;
}