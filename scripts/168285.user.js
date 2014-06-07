// ==UserScript==
// @name       Friends Only Check Box
// @namespace  vk.com
// @version    0.1
// @description  ...
// @match     vk.com/*
// @copyright  ...
// @require    http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function main()
{    
    b = $('button#send_post')[0];
    fo = $('#friends_only')[0];
    
    if (!b || !!fo)
        return;    
    
    pn = b.parentNode;
    
    pn.outerHTML += '<div class="checkbox fl_l" id="friends_only" onclick="checkbox(this);checkbox(\'status_export\',!isChecked(this));checkbox(\'facebook_export\',!isChecked(this));"><div></div>Friends only</div>';
    
    cb = $("div#friends_only")[0];
    
    if (!unsafeWindow.isChecked(cb))
        cb.click();        
}

setInterval(main, 500);