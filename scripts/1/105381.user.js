// ==UserScript==
// @name           correct images to easy quoting on phpBB based forums
// @namespace      tuning
// @require http://code.jquery.com/jquery-1.5.2.min.js
// @include        http://velokrivbass.com/forum/viewtopic.php?*
// ==/UserScript==
jQuery('.postbody img[alt=Изображение]').each(function (index, img) {img.alt = "[img]" + img.src + "[/img]";})
