// ==UserScript==
// @name				iciba.com
// @namespace		http://wushi777.blogspot.com
// @description		Version:20091018		Require:5.0.0>Multi-Lang Lookup Bar>=4.0.0
// ==/UserScript==

if(document.documentElement.nodeName.match(/HTML/i) && window == top)
{
    if(!top.wrappedJSObject.multilanglookupbar)
    {
        top.wrappedJSObject.multilanglookupbar = {};
        top.wrappedJSObject.multilanglookupbar.lib = {};
    }
    
    top.wrappedJSObject.multilanglookupbar.lib['iciba.com'] = function(thisEngine,context)
    {
        thisEngine.doBeforeLookup = function()
        {
                thisEngine.url = 'http://www.iciba.com/' + context.selectedText + '/';  
        }
        
        thisEngine.renderDomain =
        {
            "http://www.iciba.com/":function()
            {
                GM_addStyle("* {font:9pt tahoma !important} " + 
                    "#spdc, #leader,#side_bar, #guoqingAD,#footer, body>div:first-child {display:none}");
            }
        }
    };
	
   top.wrappedJSObject.multilanglookupbar.assemble = true;
}