// ==UserScript==
// @name				google.com
// @namespace		http://wushi777.blogspot.com
// @description		Version:20100906  Require:5.0.0>Multi-Lang Lookup Bar>=4.0.0
// ==/UserScript==

if(document.documentElement.nodeName.match(/HTML/i) && window == top)
{	
    if(! top.wrappedJSObject.multilanglookupbar)
    {
        top.wrappedJSObject.multilanglookupbar = {};
        top.wrappedJSObject.multilanglookupbar.lib = {};
    }
        
    top.wrappedJSObject.multilanglookupbar.lib['google.com'] = function(thisEngine,context)
    {
        thisEngine.parameters = ["default","domain","define"];
        
        thisEngine.doBeforeLookup = function()
        {
				switch(context.$("#parameter",context.doc).text())
				{
					case "default":
						thisEngine.url = "http://www.google.com/search?&q=" +  context.selectedText;break;
					case "domain":
						thisEngine.url = "http://www.google.com/search?&q=" + 
								context.selectedText + " site:" + document.domain;break;
					case "define":
						thisEngine.url = "http://www.google.com/search?&q=define:" + context.selectedText;break;
				}
        }
		
		 thisEngine.renderDomain =
		 {
			 "http://www.google.*/search":function()
			 {
				 if(document.location.toString().indexOf("q=define:") != -1)
				 {
					GM_addStyle(
						".med {margin:0px 0px px 0px;padding:0px;font:9pt tahoma !important}" +
					   " h.r  {font-weight:bold !important}");

					var $med = $(".med");
					$("body").html("").append($med);
				 }
				else
				{
					GM_addStyle(								
						"#gog,#sfcnt,#subform_ctrl {display:none}" +
						"#cnt, .g,a,.s {margin:0px 0px 5px 0px;padding:0px;font:9pt tahoma !important}" +
						".r,.l{font-weight:bold !important} em{color:red;font-weight:bolder}");
				}
			 }
		 }
    }

    top.wrappedJSObject.multilanglookupbar.assemble = true;
}