// ==UserScript==
// @name       Old YouTube Popout (non-tv version)
// @version    0.2
// @description  Returns old popout instead of YouTube TV
// @match      https://www.youtube.com/tv?*/watch*
// @match      http://www.youtube.com/tv?*/watch*
// @copyright  2012+, Saucyio
// ==/UserScript==
unsafeWindow.location.href = "/watch_popup" + unsafeWindow.location.href.substr(unsafeWindow.location.href.lastIndexOf("/watch")+6);