// ==UserScript==
// @name           vkontakte_activity_editor_fix
// @author         DenisN
// @description    Makes activity editor (status field) not to accept status when focus leaves it.
// @namespace      http://userscripts.org/scripts/show/62150
// @include        http://vk.com/id*
// @include        http://vkontakte.ru/id*
// @include        http://vk.com/profile.php*
// @include        http://vkontakte.ru/profile.php*
// ==/UserScript==


if ( navigator.userAgent.indexOf('Chrome') != -1 )
{ // i.e. browser == Chrome
    location.href = 'javascript:window.activity_editor.blur = function() {};';
}
else if ( navigator.userAgent.indexOf('Opera') != -1 )
{
    window.activity_editor.blur = function() {};
}
else
{
    unsafeWindow.activity_editor.blur = function() {};
}
