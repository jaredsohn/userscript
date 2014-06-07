// ==UserScript==
// @name          Readable Ingress Comm
// @namespace     https://plus.google.com/u/0/105896207304932060857/posts
// @version       0.1
// @description   Increases the readability of the Ingress Comm
// @include     http://www.ingress.com/intel
// @match         *://www.ingress.com/intel
// @copyright     2013+, Bertram Simon
// ==/UserScript==

GM_addStyle('#nav{display: none;}');
GM_addStyle('#player_stats{top: -101px}');
GM_addStyle('#comm{width: 600px}');
GM_addStyle('#comm .comm_expanded{bottom:0;position:absolute;top:0}');
GM_addStyle('#comm,.pl_timestamp{font-size:11px}');
GM_addStyle('#plext_container{background-color: rgba(16, 32, 35, 0.95)}');
GM_addStyle('#plexts{font-family:Tahoma, Arial, Helvetica, sans-serif;font-size:11px}');
GM_addStyle('.pl_content{line-height:11px;padding:0}');
GM_addStyle('.pl_portal_address{display:none!important}');
GM_addStyle('.pl_portal_name{color:#ecc979;text-decoration:none}');
GM_addStyle('.pl_timestamp{color:#eee}');
GM_addStyle('.pl_timestamp_spacer{height:15px}');
GM_addStyle('.comm_expanded #plext_container {height: ' + ($('#dashboard_container').innerHeight() +23) + 'px;}');