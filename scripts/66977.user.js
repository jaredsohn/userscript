// ==UserScript==
// @name           FilesTube.Clean
// @namespace      http://userscripts.org/users/83191
// @description    Gets rid of all stuff you'll never need on FilesTube
// @include        http://*.filestube.com/*
// @include        http://filestube.com/*
// @copyright      ClaudeHenchoz
// @version        1.0.5
// ==/UserScript==

// Define GM_addStyle if we're not running under Firefox
if(typeof GM_addStyle==='undefined') 
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
    }

// get rid of stuff
GM_addStyle("#recent, #top_options, #divWildfirePost, #wfmodule_divWildfirePost, #addPlayer, #addFFExtension, #dfr_outer, .resultadv, .resultadv2, .other_adv, .other_adv2, .fb_image, .boxpromo, .newcomm, .linkbox, .trends, .file_details_title, .gobut , .n_right_detail, .sharebox, .vbg, .vbg2, a[href='http://www.filestube.com/account/register.html'], iframe[width='728'], img[width='728'], object[width='728'], p[align='center'], div[style='text-align: center;'], div[style='text-align:center;'], div[style='padding: 0pt 10px;'], div[style='float: left; line-height: 16px;'], div[style='width: 99%;'], br[style='color: rgb(148, 49, 0); font-size: 12px;'], a[href='http://www.filestube.com/account/register_choice.html'], a[href='http://www.addthis.com/bookmark.php'], a[href='http://www.filestube.com/account/login.html'] {\ndisplay:none !important;\n}");     


// modify links to not use the filestube-frame
allSourceLinks = document.evaluate(
    "//a[@rel='nofollow']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allSourceLinks.snapshotLength; i++) {
    thisSourceLink = allSourceLinks.snapshotItem(i);
    thisSourceLink.setAttribute('href',thisSourceLink.getAttribute('href').replace("http://www.filestube.com/source.html?url=",""))
}

