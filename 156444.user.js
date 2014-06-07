// ==UserScript==
// @id             twitch tv popout title
// @name           twitch tv popout title
// @version        1.0
// @namespace      http://userscripts.org/users/501085
// @author         
// @description    
// @include        http://*.twitch.tv/*/popout
// @run-at         document-idle
// ==/UserScript==

var dgfs = new RegExp(/^\/(.*)\/popout$/);
document.title = document.location.pathname.replace(dgfs,'$1')+' - Twitch Video';
