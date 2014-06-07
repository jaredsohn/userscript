// ==UserScript==
// @name           Normal Ambrosia
// @namespace      Polska
// @author         Thogamer revieved by Smok_z
// @description    Changes the annoying ambrosia symbol(v0.4.0)back to normal(v 0.3.5)
// @include        http://s*.*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/68732.user.js
// @version        1.01
// ==/UserScript==

ScriptUpdater.check(83928, "1.01");

var URL= "http://a.imageshack.us/";

GM_addStyle("#globalResources .ambrosia a                                          {background-image:url("+URL+"img412/535/61009737.png)}");
GM_addStyle("#globalResources .ambrosia a:hover                                    {background-image:url("+URL+"img840/6773/96049693.png)}"); 
GM_addStyle("#globalResources .ambrosia a.down                                     {background-image:url("+URL+"img186/3195/48522111.png)}"); 
