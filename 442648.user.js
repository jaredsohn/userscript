// ==UserScript==
// @name        mmmturkeybacon Avatar Switcheroo
// @author      mmmturkeybacon
// @description Add the image name of an avatar you want to replace to 
//              the list and it will be switched with a robot. Automatically 
//              turns users without avatars into robots.
// @namespace   http://userscripts.org/users/523367
// @match       http://www.mturkgrind.com/threads/*
// @match       http://www.mturkgrind.com/showthread.php?*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/442648.user.js
// @updateURL   http://userscripts.org/scripts/source/442648.meta.js
// @version     1.01
// @grant       none
// ==/UserScript==

var avatars = new Array();
//avatars.push('avatar1682_1.gif');

for(var i = 0; i < avatars.length; i++)
{
    var avatar_name = avatars[i].split('.')[0];
    var new_avatar = 'http://robohash.org/'+avatar_name+'png?size=100x100';
    $('a[class="postuseravatar"] > img[src$="'+avatars[i]+'"]').each(function()
    {
        $(this).attr('src', new_avatar);
    });
}

$('div > img[border=""][alt=""][src^="STAR/rating"]').parent().next('div').each(function()
{
    var username = $(this).parent().find('a[id][title][href^="member.php"]').text();
    var avatar = 'http://robohash.org/'+username+'png?size=100x100';
    $(this).before('<a class="postuseravatar"><img src="'+avatar+'"></a>');
});
