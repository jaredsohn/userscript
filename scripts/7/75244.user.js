// ==UserScript==
// @name           Yahoo Fantasy Baseball Hide Video Highlights
// @description    Hide video highlight image/links
// @namespace      http://glenncarr.com/greasemonkey
// @include        http://baseball.fantasysports.yahoo.com/*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 564 $
// $LastChangedDate: 2010-05-05 08:36:14 -0500 (Wed, 05 May 2010) $
// ==/UserScript==
/*
	5-May-2010 - Also hide 'new' video images
*/

GM_addStyle ( '.teamtable td.player div.detail a.mlb-view-video, a.mlb-view-video, .teamtable td.player div.detail a.mlb-view-video-new, a.mlb-view-video-new { display: none !important }' );
