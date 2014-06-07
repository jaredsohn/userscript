// ==UserScript==
// @name           hypem - change default to all blogs
// @version        0.1
// @namespace      http://denbuzze.com/
// @description    Change the default setting for the home page to all blogs instead of subscriptions
// @match          http://hypem.com/*
// @include        http://hypem.com/*
// ==/UserScript==

// Overwrite the default hypem.com function
var page_init_function = 'function page_url_state_init(){update_page_contents(); setInterval("check_hash_change()",300); };';

// Add a script tag to the head element of the page
var script = document.createElement('script');
script.type="text/javascript";
script.id="testtt";
script.innerHTML = page_init_function;
document.getElementsByTagName('head')[0].appendChild(script);

// 
if(document.location.href.search(/\/#!\/$/)!=-1&&is_logged_in){url='/#!/'+logged_in_username+'/latest';top.location=url;}else if(document.location.href.search(/\/#/)==-1&&document.location.href.search(/ax=1/)==-1&&document.location.href.search(/_escaped_fragment_/)==-1){url=document.location.pathname+document.location.search;url=url.replace(/\?ax=1/,'');if(url.match(/^\/$/)&&is_logged_in){url='/'+logged_in_username+'/latest';} url="/#!"+url;top.location=url;}else if(document.location.href.search(/\/#!/)==-1&&document.location.href.search(/\/#\//)!=-1&&document.location.href.search(/ax=1/)==-1){url=document.location.href.replace(/\/#\//,'/#!/');top.location=url;} if(document.location.href.search(/_escaped_fragment_/)==-1){currentUrl=document.location.pathname+document.location.hash;}