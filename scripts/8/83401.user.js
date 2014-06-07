scr_meta=<><![CDATA[
// ==UserScript==
// @name         Quake Live Backup Filter
// @version      0.25
// @namespace    http://userscripts.org/scripts/show/83401
// @description  Switches to local storage if QL won't save your filter.
// @author       wn
// @require      http://sizzlemctwizzle.com/updater.php?id=83401
// @include      http://*.quakelive.com/*
// @exclude      http://*.quakelive.com/forum*
// ==/UserScript==
]]></>.toString();




/* vars from the window */
var $ = unsafeWindow.jQuery,
    JSON = unsafeWindow.JSON,
    quakelive = unsafeWindow.quakelive,
    module = quakelive.mod_home;




/* no jquery == no joy */
if (typeof $ == 'undefined') return;




/* modified to check local storage if BROWSER_FILTER is empty */
module.FetchFilter = function () {
    var c, q = quakelive.Eval(module.defaultFilter);

    if (quakelive.userinfo.BROWSER_FILTER.length) {
        c = quakelive.userinfo.BROWSER_FILTER;
    } else {
        c = localStorage ? localStorage.getItem('sfilter') : "";
    }
    
    if (c.length > 0) {
        c = quakelive.Eval(c);
        if (typeof c == "object") {
            module.bHasCustomFilter = true;
            module.filter = $.extend(q, c);
            module.savedFilter = $.extend(q, c);
        } else module.savedFilter = module.filter = q;
    } else module.savedFilter = module.filter = q;
}



/* modified to save to local storage */
module.SaveBrowserFilter = function () {
    localStorage.setItem('sfilter', JSON.stringify(module.filter));
    $.ajax({
        type: "post",
        url: "/browser/filter/update",
        mode: "abort",
        port: "filterupdate",
        dataType: "json",
        data: "filter_obj=" + localStorage.getItem('sfilter'),
        success: module.SaveBrowserFilter_Success,
        error: module.SaveBrowserFilter_Error
    })
}



/* modified to set the localStorage filter to default */
module.ResetBrowserFilter = function () {
    if(confirm("Are you sure you want to reset to the default online games view?")) {
        localStorage.setItem('sfilter', module.defaultFilter);
        $.ajax({
            type: "get",
            url: "/browser/filter/reset",
            mode: "abort",
            port: "filterreset",
            success: module.ResetBrowserFilter_Success,
            error: module.ResetBrowserFilter_Error
        })
    }
}
