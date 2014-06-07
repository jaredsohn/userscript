// ==UserScript==
// @name          TSSMaxWindow99%[by-WARBRAIN]
// @description   Play The Sims Social with max scale window (NoAds top,bottom, and removed right panel)
// @author        Hikari Hendri
// @version       5.5.2.0
// @copyright     WARBRAIN 2013
// @license       GNU GPL
// @homepage      http://about.me/suara
// @include       runs on page
// @include       *apps.facebook.com/thesimssocial/*
// @include       *apps.facebook.com/144959615576466/*
// @include       *cloudfront.net*
// @include       *simssoc.game.playfish.com*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle(
'body.canvas.center_fixed_width_app #pagelet_canvas_content{margin:0 auto;width:100%!important;}' +
'#leaderboard_container{margin-top:0px;height:0px;width:0px;display:none!important;}' +
'.pf-cross-promos-header, #pf-cross-promos-header{margin-top:0px;margin-bottom:0px;height:78px;}' +
'#menu_bar{width:758px!important;}' +
'#simssoc{width:100%!important; background:#000!important;}' +
'.pf-console-footer{padding-top:0px;}' +
'#pf-cross-promos-footer, .image{display:none!important;}' +
'#pagelet_ego_pane{display:none!important;}' +
'body.canvas #rightCol{display:none!important}' +
'body.canvas #mainContainer{border:none;}');