// ==UserScript==
// @name           YouTube Beta Channel Fix
// @namespace      http://userscripts.org/users/114767
// @description    Removes JavaScript from Grid view links, quickly changes view to Grid/Uploads (configurable) and moves the User's profile to the top of the page (experimental).
// Removes JavaScript links in Grid view so they take you to the video's page instead of the video in Player view. Also takes you strait to Grid/Uploads (configurable) on first visit to a channel.
// @include        http://*.youtube.com/user/*
// @include        http://youtube.com/user/*
// @include        http://*.youtube.com/profile
// @include        http://youtube.com/user/profile
// @copyright      2009, Robert DaSilva
// @version        3.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States; http://creativecommons.org/licenses/by-nc/3.0/us/
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://userscripts.org/scripts/source/50018.user.js
// ==/UserScript==

var YouTubeBetaChannelFixConfigCSS = GM_config.eCSS +
    ".field_label { padding-left: 5px }";

GM_config.init("YouTube Beta Channel Fix", {
  fix_links: { label:'Video Link Fix', 
    title:"View vides selected from Grid view on their page.",
    type:'checkbox', _def:true },
  view: { label:'View:', type:'select', _def:'grid',
    options: {'def':'Channel Default', 'grid':'Grid View',
      'play':'Player View' }},
  tab: { label:'Tab:', type:'select', _def:'uploads',
    options: {'def':'Channel Default', 'all':'All Tab',
      'uploads':'Uploads Tab', 'favorites':'Favorites Tab',
      'playlists':'Playlists Tab'}},
  move_profile: { label:'Move Profile', 
    title:"Move User Profile to the top of the page (experimental).",
    type:'checkbox', _def:false },
  }, YouTubeBetaChannelFixConfigCSS , {
    open: function()
    {
        GM_config.fadeOut();
        GM_config.resizeFrame('240px', '180px');
        GM_config.center();

        // Hack to put current settings into  select elements.
        var frame = document.getElementById("GM_config").contentDocument;
        frame.getElementById("field_view").value = GM_config.read().view;
        frame.getElementById("field_tab").value = GM_config.read().tab;
        //*/
    },
    save: function() { location.reload(); },
    close: function() { GM_config.fadeIn(); }
  });

GM_registerMenuCommand("YouTube Beta Channel fix", GM_config.open);

if(location.hash == "")
{
    if(GM_config.read().view != 'def')
        unsafeWindow.playnav.selectView(GM_config.read().view);
    if((GM_config.read().tab != 'def') && document.evaluate(
            '//a[contains(@onmousedown, "playnav.selectTab(\'' +
                GM_config.read().tab + '\');")]', document, null,
            XPathResult.BOOLEAN_TYPE, null))
    {
        unsafeWindow.playnav.selectTab(GM_config.read().tab);
    }
}

if(GM_config.read().fix_links)
{
    function yt_grid_link_fix()
    {
        var links = document.evaluate("//div[@id = 'playnav-gridview']" +
                "//a[contains(@onClick, 'playnav.playVideo(')]", document,
                null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for(var i=0, l; (l=links.snapshotItem(i)); i++)
            l.removeAttribute('onClick');
    }

    yt_grid_link_fix();
    document.addEventListener("DOMNodeInserted", yt_grid_link_fix, false);
}

if(GM_config.read().move_profile)
{
    var playnav = document.getElementById("playnav-body");
    document.getElementById("user_playlist_navigator").removeChild(playnav);
    document.getElementById("main-channel-right").insertBefore(playnav,
            document.getElementById("main-channel-right").firstChild);

    var style = document.createElement("style");
    style.type= "text/css";
    style.innerHTML = "#playnav-body { margin-bottom: 7px; " +
        "margin-top: 0 !important; overflow: visible !important; } " +
        "#playnav-left-panel { margin-right: 0 !important; } " +
        "#playnav-gridview .playnav-playlist-non-all .playnav-video, " +
        "#playnav-gridview .playnav-playlist-non-all .playnav-playlist { " +
        "width: 140px !important; } ";
    document.getElementsByTagName("head")[0].appendChild(style);

    function fix_scroll_page_height()
    {
        var holders = document.evaluate("id('playnav-grid-content')" + 
                "/div[.//div[contains(@class, 'scrollbox-page') and " +
//                "contains(@class, 'loaded') and " +
                "not(contains(@style, 'height'))]]",
                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
        var tab_name, pages, div_count;

        for(var i=0, h; (h=holders.snapshotItem(i)); i++)
        {
            div_count = 0;
            tab_name = h.id.substring(22, h.id.length - 7);

            pages = document.evaluate("id('playnav-grid-" + tab_name +
                "-items')/div",
                document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

            for(var j=0, p; (p=pages.snapshotItem(j)); j++)
            {
                if(p.className.indexOf("loaded") != -1)
                {
                    div_count += document.evaluate("count(./div)", p, null,
                            XPathResult.NUMBER_TYPE, null).numberValue;
                }
                else
                {
                    div_count += parseInt(p.className.substring(
                               p.className.indexOf("videos-rows-") + 12)) * 6;
                }
                p.style.height = (Math.floor(div_count /4) * 154) + "px";
                div_count %= 4;
            }
        }
    }

    fix_scroll_page_height();
    document.addEventListener("DOMNodeInserted",
            fix_scroll_page_height, false);
}

