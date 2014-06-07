// ==UserScript==
// @name           Home Redesigned - MySpace
// @namespace      WLBL
// @include        http://home.myspace.com/index.cfm?fuseaction=user*
// ==/UserScript==

s= 'body{ }';
s+= '#home_bulletins { height:150px !important; overflow:auto; width:445px !important; position:absolute; left:325px; margin-top:-150px !important; margin-bottom:-200px !important; }';
s+= '#home_friends { height:300px !important; overflow:auto; margin-top:200px !important; }';
s+= '#home_schools { display:none; }';
s+= '#home_activities { height:200px !important; overflow:auto; position:absolute; top:00px; }';
s+= '#StatusBox { height:200px !important; overflow:auto; }';
s+= '#home_featured_music { display:none; }';
s+= '#home_featured_books { display:none; }';
s+= '#home_featured_comedy { display:none; }';
s+= '#home_featured_filmmaker { display:none; }';
s+= '#PageThemeModule { display:none; }';
s+= '#home_setHomePage { display:none; }';
s+= '#home_greybox { display:none; }';
s+= '#home_infoBar { display:none; }';
s+= '#home_coolNewVideos { display:none; }';
s+= '#header { display:none; }';
s+= '#footer { display:none; }';

GM_addStyle(s);