// ==UserScript==
// @name                reddit syntax highlight (nin)
// @description         enables stackoverflow-like code syntax highlighting on subreddits
// @version             0.2.3
// @date                2013-10-11
// @author              ninmonkey
// @namespace           http://userscripts.org/users/535024
// @match               http://www.reddit.com/*
// @history             0.2.1 StackOverflow style is now the default
// @history             0.1 initial
// @run-at              document-end
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

/*
Syntax highlighting colors / options:
    http://code.google.com/p/google-code-prettify/wiki/GettingStarted


todo:
    - front RES pages don't highlight , requires setting after expand fetches? ie: http://www.reddit.com/r/learnpython/ when expanded
*/

//(from boilerplate) Include external JS/CSS file onto the page
function include(url, type) {
    type = (type || url.split('.').pop()).toLowerCase();

    if (type === 'css') {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    } else if (type === 'js') {
        var script = document.createElement('script');
        script.src = url;
        script.async = false;
        document.head.appendChild(script);
    } else {
        throw new Error('Failed to include ' + url + ' due to unknown file type.');
    }
}

$(document).ready(function() {
    $("pre").addClass("prettyprint");
    include("https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js?skin=desert", "js");

    // manual override as my css
    GM_addStyle("pre{background-color:#eee!important}.str{color:maroon!important}.kwd{color:#00008b!important}.com{color:gray!important}.typ{color:#2b91af!important}.lit{color:maroon!important}.pun{color:#000!important}.pln{color:#000!important}.tag{color:maroon!important}.atn{color:red!important}.atv{color:#00f!important}.dec{color:purple!important}");

    // else:
    //include("http://www.foo.com/bar.css", "css");

    // todo: RES expando support
    /*
    $(".expando-button").click(function() {
        $("usertext-body pre").addClass("prettyprint");
    });
    */
});
