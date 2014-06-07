// ==UserScript==
// @name           YouTube Cleaner 2.0
// @namespace      http://tankadillo.com/youtube
// @description    Gets rid of worthless stuff on YouTube! Need NoYouNoobs sript also installed.
// @include        http://*youtube.com/watch?*
// ==/UserScript==

var javashit = document.body.appendChild(document.createElement('script'));
javashit.type = 'text/javascript';
javashit.innerHTML =
  "var commentsDiv = document.getElementById('commentsDiv');"
+ "var wsWrapper   = 'wsWrapper';"
+ "var expand      = 0;"

+ "function toggleThis(id)"
+ "{"
+ "  if(id.style.display == 'none')"
+ "    id.style.display = 'block';"
+ "  else id.style.display = 'none';"
+ "}"

+ "function toggleThat(theclass)"
+ "{"
+ "  expandbc();"
+ "  y = document.getElementsByTagName('div');"
+ "  for(x in y)"
+ "    if(y[x].className == theclass && y[x].id != 'channelVidsDiv')"
+ "      if(y[x].style.display == 'none')"
+ "        y[x].style.display = 'block';"
+ "      else"
+ "        y[x].style.display = 'none';"
+ "}"

+ "function expandbc()"
+ "{"
+ "  if(expand == 0)"
+"   {"
+ "    closeDiv('videoDetailsMoreLink'); openDiv('videoDetailsLessLink'); closeDiv('videoDescBegin'); openDiv('videoDescRemain'); openDiv('videoDetailsMoreBody'); _hbLink('MoreVideoDetails','Watch3VideoDetails');"
+ "    expand = 1;"
+ "  }"
+ "  else"
+ "  {"
+ "    closeDiv('videoDetailsLessLink'); openDiv('videoDetailsMoreLink'); closeDiv('videoDetailsMoreBody'); closeDiv('videoDescRemain'); openDiv('videoDescBegin'); _hbLink('LessVideoDetails','Watch3VideoDetails');"
+ "    expand = 0;"
+ "  }"
+ "}"

+ "toggleThis(commentsDiv);"
+ "toggleThat(wsWrapper);"

;

var controls = document.body.appendChild(document.createElement('div'));
controls.style.position = 'fixed';
controls.style.top = '2px';
controls.style.left = '2px';
controls.style.fontSize = '10px';
controls.style.backgroundColor = '#FFFFFF';
controls.innerHTML = '<a href="#" onclick="toggleThat(wsWrapper);return false;">Toggle Related</a>';
