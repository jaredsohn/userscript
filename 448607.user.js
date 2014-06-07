// ==UserScript== 
// @name REDIRECT
// @namespace MafiaRedirect
// @description Try to avoid blank page.
// @grant none
// @include *://facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?*
// @include *://www.facebook.com/dialog/oauth?client_id=10000000001*
// @include *://apps.facebook.com/inthemafia/?install_source*
// @include *://apps.facebook.com/inthemafia/?next_params=*
// @exclude *://mwscripts.com/happyplace/*
// @exclude *://daimon.webuda.com/unframe.*
// @exclude *://facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=index&xw_action=view&xw_city=*
// ==/UserScript== 


window.location.replace("http://apps.facebook.com/inthemafia");

