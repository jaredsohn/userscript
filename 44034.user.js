// ==UserScript==
// @name MAfiaWars
// @description game
// @namespace facebook
// @version 0.2
// @include http://apps.facebook.com/inthemafia/*
// ==/UserScript==



if (document.body.innerHTML.indexOf('Error while loading page from Mafia Wars') != -1)
{
window.location = "http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=recruit&xw_action=view";
}


if (document.body.innerHTML.indexOf('<label class="clearfix"><input class="inputcheckbox" id="ids[]" name="ids[]" value="') != -1)
{
//url to follow
var url = document.body.innerHTML.split('<label class="clearfix"><input class="inputcheckbox" id="ids[]" name="ids[]" value="')[1].split('"')[0];
window.location = "http://apps.facebook.com/inthemafia/status_invite.php?from="+url;
window.location = "http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=recruit&xw_action=view";


}