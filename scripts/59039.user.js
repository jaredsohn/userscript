// ==UserScript==
// @name           Youtube Recommendations Link
// @namespace      youtube_recommendations_link
// @description    Adds Recommendations link to navigation
// @include        http://www.youtube.com/watch*
// ==/UserScript==

var container = document.getElementById('masthead-nav-user');
var link = document.createElement('a');
link.href = "/videos?r=1";
link.innerHTML = 'Recommendations';
container.insertBefore(link, container.firstChild);
