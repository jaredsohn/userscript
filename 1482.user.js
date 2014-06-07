// ==UserScript==
// @name        World of Warcraft Forums Google Search
// @namespace   tag:kimiko.uldum+greasemonkey@gmail.com
// @description Alters the World of Warcraft forums to use Google search
// @include     http://forums.worldofwarcraft.com/*
// @exclude     http://forums.worldofwarcraft.com/
// ==/UserScript==

(function()
{
    function xpath(expr, context)
    {
        if( !context )
            context = document;
        var nodes = document.evaluate(expr, context, null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var result = new Array(nodes.snapshotLength);
        for( var i=0; i<result.length; i++ )
            result[i] = nodes.snapshotItem(i);

        return result;
    }

    function submitHandler(form)
    {
        function __handler(event)
        {
            var input = xpath("descendant::input[@name = 'SearchText']",
                    form)[0].value;
            var forum = xpath("descendant::input[@name = 'ForumName']",
                    form)[0].value;
            
            var url = "http://www.google.com/search?q=";
            
            // Add search terms
            url += input;
            
            // Add forum selection
            url += " inurl:"+forum;
            
            // Add site modifier
            url += " site:forums.worldofwarcraft.com";
            
            // Go there
            //window.location.href = url;
            GM_openInTab(url);
            
            event.preventDefault();
        }
        return __handler;
    }

    function googliseForm(form)
    {
        // Change form submit to google
        form.addEventListener("submit", submitHandler(form), false);
    }

    function googlise()
    {
        var forms = getForms();
        for( var i=0; i<forms.length; i++ )
            googliseForm(forms[i]);
    }

    function getForms()
    {
        return xpath("//form[@action = 'thread-search.aspx']");
    }

    googlise();
}
)();

