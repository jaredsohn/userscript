// ==UserScript==
// @id             ddgeverywhere
// @name           DDG Everywhere
// @version        1.0
// @namespace      *://*
// @author         
// @description    Replaces each google search box by a duckduckgo one
// @run-at         document-end
// ==/UserScript==

ddg_q = new Array();
ddg_submit = new Array();
ddgs = 0;

for(var i = 0 ; i < document.forms.length ; i ++)
{
	if(document.forms[i].action.match("https?://(www)|(encrypted)\.google\..{0,3}/.*"))
	{
        document.forms[i].action = "https://duckduckgo.com";
        submit_value = "";
        submit_button = false
        
        for(var j = 0 ; j < document.forms[i].elements.length ; j ++)
        {
            if(document.forms[i].elements[j].type.match("(hidden)|(text)|(submit)"));
            {
                if(document.forms[i].elements[j].type == "submit")
                {
                    submit_button = true;
                    submit_value = document.forms[i].elements[j].value;
                    if(submit_value == null)
                        submit_value = "Search";
                }
                document.forms[i].elements[j].parentNode.removeChild(document.forms[i].elements[j]);
            }
        }
        
        ddg_q.push(document.createElement("input"));
        ddg_q[ddgs].type = "text";
        ddg_q[ddgs].name = "q";
        
        document.forms[i].appendChild(ddg_q[ddgs]);
        
        if(submit_button)
        {
            ddg_submit.push(document.createElement("input"));
            ddg_submit[ddgs].type = "submit";
            ddg_submit[ddgs].value = submit_value;
            
            document.forms[i].appendChild(ddg_submit[ddgs]);
        }
        
        document.forms[i].onsubmit = function(event)
        {
            this.elements["q"].value += " site:" + document.location.host;
        };
        j ++;
    }
}
