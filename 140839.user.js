// ==UserScript==
// @id             Focoforum Upside Down Edition
// @name           Focoforum Upside Down Edition
// @version        1.0
// @namespace      com.hunterstyler
// @author         Hunter S. Tyler
// @description    
// @include        http://focoblog.com/focoforo/
// @run-at         document-end
// ==/UserScript==
	
var discussions = document.getElementById('discussions');
var foros = document.getElementsByTagName('h2')[1];
var debates = document.getElementsByTagName('h2')[2];
var forumlist = document.getElementById('forumlist');
var latest = document.getElementById('latest');
var viewdiv = document.getElementById('viewdiv');

discussions.removeChild(foros);
discussions.removeChild(forumlist);
discussions.removeChild(debates);
discussions.removeChild(latest);
discussions.removeChild(viewdiv);

discussions.appendChild(debates);
discussions.appendChild(latest);
discussions.appendChild(foros);
discussions.appendChild(forumlist);
discussions.appendChild(viewdiv);