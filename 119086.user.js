// ==UserScript==
// @name           StackExchange™ Accessible CustomSort for /review
// @namespace      http://shawnchin.github.com
// @description    Make "custom sort" options more accessible
// @include        http://stackoverflow.com/review/*
// @include        http://superuser.com/review/*
// @include        http://serverfault.com/review/*
// @include        http://meta.stackoverflow.com/review/*
// @include        http://meta.superuser.com/review/*
// @include        http://meta.serverfault.com/review/*
// @include        http://stackapps.com/review/*
// @include        http://askubuntu.com/review/*
// @include        http://meta.askubuntu.com/review/*
// @include        http://*.stackexchange.com/review/*
// ==/UserScript==

// Here I borrowed a couple of functions written by Nathan Osman
// for the StackExchange™ SuperCollider Freehand Circle™ Editor UserScript
// This makes it easy to provide functions
// with complete access to the page.
function EmbedFunctionOnPageAndExecute(function_contents)
{
    var exec_script = document.createElement('script');
    exec_script.type = 'text/javascript';
    exec_script.textContent = "(" + function_contents.toString() + ")()";
    document.getElementsByTagName('head')[0].appendChild(exec_script);
}

EmbedFunctionOnPageAndExecute(function() {
    var sidebar = $('#sidebar');
    
    // Move custom-sort module higher up
    var sortbox = sidebar.find("div.module > h4:contains('Custom Sort')").parent()
                    .remove().prependTo(sidebar);
                    
    // Place a copy of bottom-notice links at the top
    $('#content').find('h2.bottom-notice').find("a").clone().each(function() {
        switch (this.text) {
            case 'enable random ordering':
                this.text = "Random";
                sortbox.find("ul.selector").append($("<li>").append(this));
                break;
            case 'disable':
                var header = $('#questions').find(".subsubheader:first > h2:first");
                header.html(header.text() + "(<a href='" + this + "'>disable random ordering</a>)");
                break;
        };
    });
    
});