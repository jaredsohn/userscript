// ==UserScript==
// @name           Prohardver_Redesigned
// @namespace      http://boooot.com/prohardver
// @description   Prohardver Redesigned v0.22
// @version       0.22
// @include        http://prohardver.hu/*
// @exclude		http://prohardver.hu/muvelet/*
// @exclude		http://prohardver.hu/tag/*

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

var logo = document.createElement("adsense");
logo.innerHTML = '<center><iframe src="http://boooot.com/ph/ad.html" width="760" height="120"></center>';
document.body.insertBefore(logo, document.body.adsense160);

addGlobalStyle("body {background: url(http://www.boooot.com/landingpage_bg.jpg) repeat-x 0 0;background-repeat:no-repeat;background-attachment:fixed; color:#000000;font-family:Verdana,Arial,Helvetica,sans-serif;margin:0;padding:0;}");
addGlobalStyle("#page { background-color:#121212; margin:0 auto; position:relative; text-align:left; width:984px;}");
addGlobalStyle("#top a:hover { text-decoration: none; } #top .logo { float: left; width: 220px; height: 41px; padding: 0 0 0 9px;}");
addGlobalStyle("#top .logo a {color: #fff; font: bold 26px Tahoma, sans-serif; background: url(http://boooot.com/public/prohardver/redesign/ph/logo.png) no-repeat 0 0;");
addGlobalStyle("#top { width: 980px; height: 47px; background: #fdf4d0 url(http://boooot.com/public/prohardver/redesign/ph/headbcg.png) repeat-x 0 0; border-bottom: 1px solid #b5b5b5;}");
addGlobalStyle("#top #topsep { clear: both; width: 100%; height: 5px; overflow: hidden; background: #edd05b url(http://boooot.com/public/prohardver/redesign/ph/headbcg.png) repeat-x 0 -42px; border-top: 1px solid #b5b5b5;");
addGlobalStyle("#top .chip a {color: #b42224;font: bold 13px Tahoma, sans-serif; background: url(http://boooot.com/public/prohardver/redesign/ph/slogan.png) no-repeat 0 0;");
addGlobalStyle("#top .menu_nw { float: left; margin-left: 41px; margin-top: 5px; width: 540px; height: 36px; background: url(http://boooot.com/public/prohardver/redesign/ph/menu.png) no-repeat 0 0;}#top .menu_nw ul { padding-top: 15px;}#top .menu_nw ul li { margin: 0 2px 0 2px; width: 104px; height: 21px;}#top .menu_nw a { color: #999; font: bold 13px Tahoma, sans-serif; background: url(http://boooot.com/public/prohardver/redesign/ph/menu.png) no-repeat 0 -15px;}");
addGlobalStyle("#top .menu_nw .nw_1 a { background-position: -2px -15px; }");
addGlobalStyle("#top .menu_nw .nw_2 a { background-position: -110px -15px; }");
addGlobalStyle("#top .menu_nw .nw_3 a { background-position: -218px -15px; }");
addGlobalStyle("#top .menu_nw .nw_4 a { background-position: -326px -15px; }");
addGlobalStyle("#top .menu_nw .nw_5 a { background-position: -434px -15px; }");
addGlobalStyle("#top .menu_nw span { width: 102px; height: 20px; line-height: 20px; vertical-align: middle; text-transform: uppercase; background-color: white; border: 1px solid #999; border-bottom: none;}");
addGlobalStyle(".menu_navi li.alfejlec { padding-left: 4px;font: bold 10px Verdana, sans-serif;color: #000;background: #9d9177 url(http://boooot.com/public/prohardver/redesign/ph/lefthead.png) repeat-y 0 0;");
addGlobalStyle(".menu_navi ul { list-style-type: none; margin: -1px 0 0 0; padding: 0; font: bold 10px Verdana, sans-serif;color: #fff;background: #d6d1b9 url(http://boooot.com/public/prohardver/redesign/ph/leftback.png) repeat-y 0 0;;");
addGlobalStyle(".menu_navi { width: 165px; font: bold 10px Tahoma, sans-serif;color: #fff;");
addGlobalStyle(".menu_navi select { width: 163px; }.menu_navi span, .menu_navi a { color: #fff; }.menu_macro a:hover { color: #e9d94e; }.menu_navi li.aktiv a { color: #fad852; } .menu_navi a:hover { text-decoration: none; color: #121212; }.menu_navi span { font-weight: normal; color: #fbd94f; }");
addGlobalStyle(".forum td { overflow: hidden; padding: 3px 6px; vertical-align: middle; text-align: left; background-color: #f0efe7;");
addGlobalStyle(".menu_navi li.top { background: #e8c0a5 url(http://boooot.com/public/prohardver/redesign/ph/lefthead2.png) repeat-y 0 0; }");