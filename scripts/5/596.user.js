// MSDNLanguageFilter
// version 0.2
// 2005-04-12 (last update: 2005-05-16)
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MSDNLanguageFilter", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            MSDN Language Filter
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Allows you to filter the samples on MSDN for certain languages
//
// @include         http://msdn.microsoft.com/*
// ==/UserScript==

// The msdn reference pages look like:
// <grouping>
// <span class="lang">C#</span> ...many nodes...
// <span class="lang">JScript</span> ...many nodes...
// </grouping>
	
var MSDNLanguageFilter = {
    // Clean span will remove the startSpan and all the nodes til the endSpan
    CleanSpan: function(startSpan, endSpan) 
    {
        var currentNode = startSpan;
        while (currentNode != null && (endSpan == null || currentNode != endSpan)) 
        {
            var nextNode = currentNode.nextSibling;
            currentNode.parentNode.removeChild(currentNode);
            currentNode = nextNode;
        }
    },

    FilterLanguages: function() 
    {
        // select all the spans that have class="lang" and are directly under a pre tag
        var xpath = "//span[@class = 'lang']";
        var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        for (var i = 0; i < res.snapshotLength; i++) 
        {
            var spanElement = res.snapshotItem(i);
            
            var isVB = (spanElement.innerHTML.match(/Visual.*Basic/i) != null);
            var isCS = (spanElement.innerHTML.match(/C#/i) != null);
            var isCPP = (spanElement.innerHTML.match(/C\+\+/i) != null);
            var isJScript = (spanElement.innerHTML.match(/JScript/i) != null);
            
            if  (!isVB && !isCS && !isCPP && !isJScript)
            {
                return;
            }
            
            // which languages to erase/keep:
            //  - if any language you want to show was listed
            //  - if no language was matched
            var keepLang = 
                (isCPP && this.ShowLang("cpp")) || 
                (isCS && this.ShowLang("cs")) || 
                (isVB && this.ShowLang("vb")) ||
                (isJScript && this.ShowLang("js")) ||
                (!isCPP && !isCS && !isVB && !isJScript);
            
            if (!keepLang) 
            {
                this.CleanSpan(res.snapshotItem(i), res.snapshotItem(i+1));
            }
        }
    },
    
    ShowLang: function(lang) 
    {
        switch(lang) {
            case "cpp": 
                return !this.GetOptionFromConfig("configCPP");
            case "cs": 
                return !this.GetOptionFromConfig("configCS");
            case "vb": 
                return !this.GetOptionFromConfig("configVB");
            case "js": 
                return !this.GetOptionFromConfig("configJS");
        }
    },
    
    // Is that language filtered?
    GetOptionFromConfig: function(id) 
    {
        return GM_getValue(id, false);
    },

    SetOptionFromConfig: function(id, filtered)
    {
        GM_setValue(id, filtered);
    },

    AddGlobalStyle: function(css) 
    {
        style = document.createElement("style");
	    style.type = "text/css";
        style.innerHTML = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    },

    // display the options box in the navbar
    AddOptionsDiv: function() 
    {
        var separator = "<span class='ltsep'>|</span>";

        var innerHTML =
            "<a id='configCS' onclick='return ToggleOption(\"configCS\");' href='#'>C#</a>" + separator + 
            "<a id='configCPP' onclick='return ToggleOption(\"configCPP\");' href='#'>C++</a>" + separator + 
            "<a id='configJS' onclick='return ToggleOption(\"configJS\");' href='#'>JScript</a>" + separator + 
            "<a id='configVB' onclick='return ToggleOption(\"configVB\");' href='#'>Visual Basic</a>";
        
        this.AddDivInternal(innerHTML);
    },
    
    AddErrorDiv: function() 
    {        
        var innerHTML = "<a><b>MSDNLanguageFilter requires GM 0.3 or above</b></a>";
        this.AddDivInternal(innerHTML);
    },
    
    AddDivInternal: function(innerHTML) 
    {
        var xpath = "//div[@id = 'msviLocalToolbar']/table//tr/td[last()]";
        var res = document.evaluate(xpath, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
        
        if (!res.singleNodeValue) 
        {
            return;
        }
        
        this.AddGlobalStyle(".optionUnactive { text-decoration: line-through ! important; }");
        
        var newNode = document.createElement("div");
        newNode.align = "right";
        newNode.className = "lt0";
                
        newNode.innerHTML = innerHTML;
        res.singleNodeValue.appendChild(newNode);
    },
    
    // initialize the selected options in the option box
    InitOptionsDiv: function(options) 
    {
       this.SetOption("configCS", !this.GetOptionFromConfig("configCS"));
       this.SetOption("configCPP", !this.GetOptionFromConfig("configCPP"));
       this.SetOption("configJS", !this.GetOptionFromConfig("configJS"));
       this.SetOption("configVB", !this.GetOptionFromConfig("configVB"));
    },

    // read an option from the option box
    GetOption: function(id) 
    {
        return (document.getElementById(id).className != "optionUnactive");
    },
    
    // set an option in the option box
    SetOption: function(id, active) 
    {
        var element = document.getElementById(id);
        if (!element) return;
        
        if (active) 
        {
            element.className = "";
        } 
        else 
        {
            element.className = "optionUnactive";
        }
    }
}

// this method is left global, since the "onclick" event on the option links is going to call it
ToggleOption = function(id) 
{
    // persist the selected option
    var element = document.getElementById(id);
    var filtered = false;
    if (element.className == "optionUnactive") 
    {
        element.className = "";
    } 
    else 
    {
        element.className = "optionUnactive";
        filtered = true;
    }
    MSDNLanguageFilter.SetOptionFromConfig(id, filtered);

    // find the right frame    
    var xpathRightFrame = "//frame[@name='fraRightFrame']";
    var rightFrameXPathRes = document.evaluate(xpathRightFrame, parent.document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
    
    if (!rightFrameXPathRes.singleNodeValue) 
    {
        return false;
    }
        
    // find the content frame (within the right frame)
    var xpathContentFrame = "//frame[@name='fraContent']";
    var contentFrameXPathRes = document.evaluate(xpathContentFrame, rightFrameXPathRes.singleNodeValue.contentDocument, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);

    if (!contentFrameXPathRes.singleNodeValue) 
    {
        return false;
    }
    
    // reload the content frame
    contentFrameXPathRes.singleNodeValue.contentDocument.location.reload();
    return false;
}

// This script requires the GM_getValue function implemented in GM 0.3 or above
if(GM_getValue) 
{ 
    MSDNLanguageFilter.AddOptionsDiv();
    MSDNLanguageFilter.InitOptionsDiv();
    MSDNLanguageFilter.FilterLanguages();
} else {
    MSDNLanguageFilter.AddErrorDiv();
}
