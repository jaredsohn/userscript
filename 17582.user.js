// ==UserScript==
// @name                  baidu.com
// @namespace       http://wushi777.blogspot.com
// @description       Version:20090414	Require:5.0.0>Multi-Lang Lookup Bar>=4.0.0
// ==/UserScript==

if(document.documentElement.nodeName.match(/HTML/i) && window == top)
{
    if(!top.wrappedJSObject.multilanglookupbar)
    {
        top.wrappedJSObject.multilanglookupbar = {};
        top.wrappedJSObject.multilanglookupbar.lib = {};
    }
    
    top.wrappedJSObject.multilanglookupbar.lib['baidu.com'] = function(thisEngine,context)
    {
        thisEngine.restrictedTextLength = 30;
        thisEngine.parameters = ["default","domain"];
        thisEngine.doBeforeLookup = function()
        {
            thisEngine.url = "http://www.baidu.com/s?ie=utf-8&wd=" + context.selectedText +
                (context.session[thisEngine.name] =="default"?"":" site:" + document.domain);
        };
        
        thisEngine.renderDomain =
        {
            "http://www.baidu.com":function()
            {
                GM_addStyle("* {font:9pt tahoma} " + 
                    "font[size='3'],font[color] {font-weight:bold !important}" +
                    "font[color='#c60a00'] {color:red}" + 
                    "#ft {display:none}");
                
                $("table").filter(function (index) {
                  return $(this).attr("id") == "";
                }).remove();
            }
        }   
    }
	
     top.wrappedJSObject.multilanglookupbar.assemble = true;
}