// ==UserScript==
// @name           SO Flags in Toolbar
// @namespace      stackoverflow
// @author         Michael Mrozek (http://stackoverflow.com/users/309308)
// @author         jmort253 (http://stackoverflow.com/users/552792)
// @description    Show the number of flags in the top bar next to the tools link
// @include        http://*.stackoverflow.com/*
// @include        http://*.serverfault.com/*
// @include        http://serverfault.com/*
// @include        http://*.superuser.com/*
// @include        http://superuser.com/*
// @include        http://*.stackexchange.com/*
// @include        http://mathoverflow.net/*
// ==/UserScript==

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
    // tools link means tools or review
    tools_link = $('#hlinks-nav > a[href]:first');

    var reputation = parseInt($('#hlinks-user').find('.reputation-score').html().replace(',',''));
    var isBeta = $('#hlogo').find('.beta-title').length == 1;
    if(reputation < (isBeta ? 2000 : 10000)) // not enough rep to process flags
        return;

    if($('#hlinks-nav > .mod-flag-indicator:not(.suggested-edits-count)').length > 0) // flags indicator already present
        return;

    base_url = location.href.substring(0, location.href.indexOf("/", 7));
    $.get("/tools", function(tools_data) {
        tools = $(tools_data);
        var flagVal = $(tools_data).find('.bounty-indicator-tab').html();
        if(flagVal != null) {
            link = $('<a href="/tools/flagged" class="mod-flag-indicator supernovabg" title="we have posts flagged for moderator attention, perhaps you can help">'+flagVal+''+'</a><span>&nbsp;</span>');
            tools_link.before(link);
        }
    });
});