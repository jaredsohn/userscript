// ==UserScript==
// @name           StackExchange™ RestickSticky for /review
// @author         Shawn Chin
// @namespace      http://shawnchin.github.com
// @description    Restick view preference on /review
// @include        http://stackoverflow.com/review/suggested-edits?*
// @include        http://superuser.com/review/suggested-edits?*
// @include        http://serverfault.com/review/suggested-edits?*
// @include        http://meta.stackoverflow.com/review/suggested-edits?*
// @include        http://meta.superuser.com/review/suggested-edits?*
// @include        http://meta.serverfault.com/review/suggested-edits?*
// @include        http://stackapps.com/review/suggested-edits?*
// @include        http://askubuntu.com/review/suggested-edits?*
// @include        http://meta.askubuntu.com/review/suggested-edits?*
// @include        http://*.stackexchange.com/review/suggested-edits?*
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
    var qs = window.location.href.slice(window.location.href.indexOf('?'));
    var add_opts = function(href) { return href.slice(0, href.indexOf('?')) + qs; };
    $("#tabs").find("a").each(function(){ this.href = add_opts(this.href) });
});