// ==UserScript==
// @name           Yahoo.com Mail's "What's New" Tab Tidy Up
// @namespace      http://example.org
// @description    Hides news content and associated clutter on Yahoo.com Mail's "What's New" Tab
// @include        http://*.yahoo.*/*
// ==/UserScript==

var discussion = document.getElementById('feedSelector');
if(discussion)
discussion.style.display = 'none';

var discussion1 = document.getElementById('news_list');
if(discussion1)
discussion1.style.display = 'none';
	
var discussion2 = document.getElementById('feedItem');
if(discussion2)
discussion2.style.display = 'none';

var discussion3 = document.getElementById('user_name');
if(discussion3)
discussion3.style.display = 'none';

var discussion4 = document.getElementById('gx_prof_name');
if(discussion4)
discussion4.style.display = 'none';

var discussion5 = document.getElementById('user_msg');
if(discussion5)
discussion5.style.display = 'none';

var discussion6 = document.getElementById('gxInboxCount');
if(discussion6)
discussion6.style.display = 'none';

var discussion7 = document.getElementById('gx_user_inbx_tran');
if(discussion7)
discussion7.style.display = 'none';

var discussion8 = document.getElementById('gxNoUnread');
if(discussion8)
discussion8.style.display = 'none';

var discussion9 = document.getElementById('gxW_bd');
if(discussion9)
discussion9.style.display = 'none';

var discussion10 = document.getElementById('gx_vnews_body');
if(discussion10)
discussion10.style.display = 'none';

var discussion11 = document.getElementById('gx_vnews_header');
if(discussion11)
discussion11.style.display = 'none';

var discussion12 = document.getElementById('avatar');
if(discussion12)
discussion12.style.display = 'none';

var discussion13 = document.getElementById('userprofileimage');
if(discussion13)
discussion13.style.display = 'none';