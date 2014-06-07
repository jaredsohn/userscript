// ==UserScript==
// @name           NYTimes Save to Delicious
// @namespace      http://nahhhh.com
// @description    Replaces SAVE link target to save single page article to del.icio.us instead.
// @include        http://*.nytimes.com/*
// @version        0.9.5
// ==/UserScript==
// 
// Versions:
//
// 0.9    Use nytimes link generator if available (http://nytimes.blogspace.com/genlink)
// 0.9.1  Use nytimes official permalink and place del.icio.us option under 'SHARE' section
// 0.9.2  Fix single-quote in title
// 0.9.3  Update for delicious 2.0
// 0.9.4  Update Javascript target; auto-close window after saving bookmark
// 0.9.5  Update to work with NYTimes changes
//

(
function()
{       
  var plist = document.getElementById('shareList');
  if (!plist) {
    return;
  }
  var link = window.location.href;
  link = link.substring(0, link.indexOf('.html') + 5);
  if (!link) {
    GM_log('link not found');
    return;
  }
  var li = document.createElement('li');
  li.setAttribute('class', 'delicious');
  var a = document.createElement('a');
  a.innerHTML = 'del.icio.us';
  a.setAttribute('href', "javascript:void window.open('" + encodeURI("http://del.icio.us/post?v=5&noui&jump=close&url=" + encodeURIComponent(link) + "&title=" + encodeURIComponent(document.title).replace(/'/g, "%27")) + "','delicious','toolbar=no,width=550,height=550');");
  a.setAttribute('style', "background-image: url(http://graphics8.nytimes.com/images/article/functions/delicious.gif);");
  li.appendChild(a);
  plist.insertBefore(li, plist.lastChild);
}
)();
