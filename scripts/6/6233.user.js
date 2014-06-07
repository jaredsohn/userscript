// NewsFox MediaWiki Tweaks
// version 0.1
// 2006-11-06
// Copyright (c) 2006, Jim R. Wilson (wilson.jim.r at gmail)
// Released under The MIT License (http://www.opensource.org/licenses/mit-license.php)
//
// Purpose:
//    Tweaks the NewsFox Extension (http://newsfox.mozdev.org/) to make it an acceptable client
//    for viewing MediaWiki (http://www.mediawiki.org/) recent change feeds.  It does so by injecting
//    CSS into relevant pages and importing a preview of the modified page.
//
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
// select "Google Code Search Autocomplete", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          NewsFox MediaWiki Tweaks
// @namespace     http://jimbojw.com/userscripts/
// @description   Tweaks NewsFox (http://newsfox.mozdev.org/) into an acceptable viewer of MediaWiki (http://www.mediawiki.org/) recent change feeds.
// @include       file://*/Profiles/*.default/newsfox/textview.html
// ==/UserScript==

// Anonymous function wrapper
(function() {

/**
 * Simple methods for retrieving the first instance of a tag.
 */
function first (tag, elem) {
    return (elem ? elem : document).getElementsByTagName(tag)[0];
}

/**
 * Wrapper method for injecting content into the document body ( GM_xmlhttpRequest has a tough time doing this on its own).
 */
function inject (tag) {
    first('body').appendChild(tag);
}

/**
 * Custom style for preview frame.
 */
var styleText = 
    "table.diff, td.diff-otitle, td.diff-ntitle { background-color: white; }\n" +
    "td.diff-addedline { background: #cfc; font-size: smaller; }\n" +
    "td.diff-deletedline { background: #ffa; font-size: smaller; }\n" +
    "td.diff-context { background: #eee; font-size: smaller; }\n" +
    "span.diffchange { color: red; font-weight: bold; }\n" +
    "table.diff td { font-size: small; }\n" +
    "body>p { display:none; }\n" +
    "body>p + p { display:block; background: #eef; padding: 0.5em 1em; }\n" +
    "body>p + p + p { background: inherit; padding: inherit; }\n" +
    "#contentSub { border: none; background: inherit; padding: inherit; }\n" +
    "#contentSub h1, #contentSub h2, #contentSub h3, #contentSub h4, #contentSub h5, #contentSub h6 { margin-top: 0em; }\n" +
    "#contentSub h1, #contentSub h2, #contentSub h3, #contentSub h4, #contentSub h5, #contentSub h6 { margin-top: 0em; }\n" +
    "#contentSub .editsection, #contentSub .printfooter { display:none; }\n" +
    "#contentSub dd, #contentSub dt { margin: 0.25em 0em; }\n" +
    "#contentSub dt { font-weight: bold; }\n" +
    "#contentSub ul li { list-style-type: square; margin: 0.125em 0em; }\n" +
    "#contentSub ul, #contentSub ol, #contentSub dd { padding-left: 2em; }\n" +
    "#contentSub img { border: none; }\n" +
    "#contentSub small { font-size: 0.85em; }\n" +
    "#contentSub a.new { color: #c00; }\n" +
    "#contentSub pre { padding: 1em; border: 1px dashed #2f6fab; color: black; background-color: #f9f9f9; line-height: 1.1em; }\n" +
    "#contentSub table { font-size: inherit; }\n" +
    "#contentSub a { text-decoration: none; }\n" +
    "#contentSub a:hover { text-decoration: underline; }\n" +
    "#contentSub p.catlinks { border: 1px solid #aaa; background: #eee; padding: 0.5em 1em; }    \n" +
    "#contentSub div.tright { clear:right; float:right; margin-left: 1em;}\n" +
    "#contentSub div.tleft { float:left; margin-right: 1em; }\n" +
    "#contentSub div.thumb { border: 1px solid #aaa; background: #eee; padding: 0.25em; }\n" +
    "#toc, .toc { border: 1px solid #aaa; background-color: #f9f9f9; padding: 5px; font-size: 95%; }\n" +
    "#toc h2, .toc h2 { display: inline; border: none; padding: 0; font-size: 1em; font-weight: bold; }\n" +
    "#toc #toctitle, .toc #toctitle, #toc .toctitle, .toc .toctitle { text-align: center; }\n" +
    "#toc ul, .toc ul { list-style-type: none; list-style-image: none; margin-left: 0; padding-left: 0; text-align: left; }\n" +
    "#toc ul ul, .toc ul ul { margin: 0 0 0 2em; }\n" +
    "#toc .toctoggle, .toc .toctoggle { font-size: 94%; }\n" +
    "#toc ul li { list-style-type: none; list-style-image: none; }\n" +
    "body>div { padding: 0.5em 1em; background: #eee; }\n" +
    ".golden, .notice, .warning { border: 3px double #a0a0a0; border-left: none; border-right: none; }\n" +
    ".golden, .notice, .warning { padding: 0.25em 1em; margin-bottom: 0.5em; }\n" +
    ".golden p, .notice p, .warning p { margin: 0em; padding: 0em; }\n" +
    ".golden { background: #ffffe0; }\n" +
    ".notice { background: #e0f0ff; }\n" +
    ".warning { background: #ffe0e0; }\n" +
    "#loadingMsg { padding: 0em 1em; font-weight: bold; font-size: 1.25em; color: navy; background: white; }\n" +
    "body>hr { margin: 1.25em 0em; }\n";
var style = document.createElement('style');
style.appendChild(document.createTextNode(styleText));

/**
 * When the window is finished loading, start tweaking.
 */
window.addEventListener('load', function(event) {

    // Check to see if this is a mediawiki page - if not, cut and run!
    var isWiki = false;
    var table = first('table');
    var title = first('b').innerHTML;
    
    if (table) {
        isWiki = (function(){
            if (table.className == 'diff') return true;
            var trs = table.getElementsByTagName('tr');
            if (!trs || !trs.length) return false;
            var tds = table.getElementsByTagName('td');
            var td0 = tds[0].innerHTML;
            var td1 = tds[1].innerHTML;
            return (
                (new RegExp("^(%[a-z0-9]{2})*Older%20revision", 'i')).test(encodeURI(td0)) && 
                (new RegExp("^Revision as of ").test(td1))
            );
        })();
    }
    if (!isWiki && /^Special:Log\/[a-z]{4,}/.test(title)) isWiki = true;
    if (!isWiki) {
        isWiki = (function(){
            if (document.getElementsByTagName('p').length != 4) return false;
            var p = document.getElementsByTagName('p')[2];
            var text = p.getElementsByTagName('b')[0].innerHTML;
            if (text=='New page') return true;
        })();
    }
    if (!isWiki) return;
    
    // Add style
    first('head').appendChild(style);
    
    // Mark non-summarized as such.
    var p = document.getElementsByTagName('p')[1];
    if (p.innerHTML == '') p.innerHTML = '&laquo; No Edit Summary provided. &raquo;';
    
    // Estabilsh a URL for the wiki page:
    var a = first('a', first('div'));
    a.target = '_blank';
    var url = a.href;
    var root = url.replace(new RegExp('^(.*?://.*?)(/.*)?$'),'$1');
    
    // Show loading message
    var loadingMsg = document.createElement('div');
    loadingMsg.id = 'loadingMsg';
    var spinner = document.createElement('img');
    spinner.src = "http://userscripts.org/images/spinner.gif";
    loadingMsg.appendChild(document.createTextNode(" Loading Preview ... "));
    loadingMsg.appendChild(spinner);  
    inject(document.createElement('hr'));
    inject(loadingMsg);
    
    // Grab the wiki page and inject it into a div on this page.
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails) {

            // Get page content.
            var text = responseDetails.responseText;
            text = text.replace(new RegExp('[\\s\\S]*<!-- start content -->','im'),'');
            text = text.replace(new RegExp('<!-- end content -->[\\s\\S]*','im'),'');

            // Make relative paths absolute
            text = text.replace(new RegExp('\\s(href|src|longdesc)=([\'"]?)/','ig'), ' $1=$2'+root+'/');

            // Create a node in this page with same contents.
            var div = document.createElement('div');
            div.id = 'contentSub';
            div.innerHTML = text;
            
            // Set all link targets to '_blank'
            var links = div.getElementsByTagName('a');
            for (var i in links) {
                links[i].target='_blank';
            }
            
            // Add node to DOM
            loadingMsg.style.display = 'none';
            inject(div);
            
        }
    });    

}, 'false');

})(); // end anonymous function wrapper


