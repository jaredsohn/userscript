// ==UserScript==
// @name           Reach - Bnet theme
// @namespace      Reach - Bnet theme
// @author         Duardo
// @contributor    Zoidberg25
// @include        http://*bungie.net/*
// @exclude        http://*bungie.net/Projects/ODST*
// @exclude        http://*bungie.net/Projects/Reach*
// @exclude        http://*bungie.net/Stats/LiveFriends.aspx
// ==/UserScript==

function addGlobalStyle(css) {
    try {
        var elmHead, elmStyle;
        elmHead = document.getElementsByTagName('head')[0];
        elmStyle = document.createElement('style');
        elmStyle.type = 'text/css';
        elmHead.appendChild(elmStyle);
        elmStyle.innerHTML = css;
    } catch (e) {
        document.styleSheets[0].cssText += css;
    }
}

addGlobalStyle('body {background:#093E60 url(http://admin.bungie.net/images/reachStatsNew/bg_body.jpg) repeat-x fixed top center;}');
addGlobalStyle('div.sContent-head {background: url(/images/base_struct_images/top_nav/bg_nav.jpg) repeat-x scroll 0 0;}');
addGlobalStyle('div.bgRepeat {background: url();}');
addGlobalStyle('.boxB {background: url();}');
addGlobalStyle('div.block-a {background-color: transparent; width:100%;}');
addGlobalStyle('.forum_main_col {background-color: transparent ! important; height: 100%; overflow: hidden; width: 611px;}')
addGlobalStyle('.forum_cols {background: url() repeat-y scroll 0 0; width: 902px;}');
addGlobalStyle('.forum_cols_posts {background: url();}');
addGlobalStyle('div.block-a h2 { background: none !important; text-transform: capitalize !important; font-weight: bold !important;} ')
addGlobalStyle('div.forum_cols_posts div.block-a, div.forum_cols div.block-a { background: none !important; height: 79px !important; } ');
addGlobalStyle('div.col.forum_main_col div.block-a { height: auto !important; } ');
addGlobalStyle('div.block-a div.gforumtitle { width: auto; float: left; } ');
addGlobalStyle('div table.grid tr.odd { background: none; border-color: transparent !important;} ');
addGlobalStyle('div table.grid tr.even { background: url("") repeat-x scroll left top transparent !important; } ');
addGlobalStyle('div table.pinned_topic_grid tr { background-color: transparent !important; border;} ');
addGlobalStyle('table.pinned_topic_grid tr { background-color:none; } ');
addGlobalStyle('div.col.forum_main_col_posts div.forum-actions, div.pagination_container {background: none !important; border:none!important;} ');
addGlobalStyle('div.col.forum_main_col_posts div.block-a,div.col.forum_main_col div.block-a { background: transparent url(http://www.deckofmany.com/bngl/newsheader.png) repeat-x top left !important; height: auto !important; } ');
addGlobalStyle('div.boxA { background:transparent url(http://www.deckofmany.com/bngl/newsblock.png) repeat-x top left !important; border:1px solid #63605d; border-top: none !important; border-bottom: none !important;} ');
addGlobalStyle('.RadMenu_topNav2.RadMenu .rmHorizontal .navTopLevel:hover {background: #EDA92C;}');
addGlobalStyle('.pagination_container {background: url();}');
addGlobalStyle('.HeaderTheSeptagonForumId {background-image: url(http://img801.imageshack.us/img801/6938/headerseptagon.png) ! important;}');
addGlobalStyle('.forum_main_col_posts {background: url() ! important;}');
addGlobalStyle('.block-a {background: transparent url() ! important; background-color: transparent;}');
addGlobalStyle('.forumpost p span.IBBquotedtable {background: url() ! important;}');
addGlobalStyle('.forum_sidebar_hub_posts ul a:link {background: transparent url(http://img823.imageshack.us/img823/8527/button1b.png) no-repeat scroll left top ! important; width: 202px;}');
addGlobalStyle('.forum_sidebar_hub_posts ul a:visited {background: transparent url(http://img823.imageshack.us/img823/8527/button1b.png) no-repeat scroll left bottom ! important;}');
addGlobalStyle('.forum_sidebar_hub ul a:link {background: transparent url(http://img823.imageshack.us/img823/8527/button1b.png) no-repeat scroll left bottom ! important;}');
addGlobalStyle('.forum_sidebar_hub ul a:visited {background: transparent url(http://img823.imageshack.us/img823/8527/button1b.png) no-repeat scroll left bottom ! important;}');
addGlobalStyle('div.fContent {background: url() repeat-x scroll 0 0; border-top: 0px solid #000000;}');