// ==UserScript==
// @name           r/tf2trade downvote enabler
// @version        1.03
// @author         94m3k1n9
// @description    shows downvote button hidden by subreddit's css
// @include http://*.reddit.com/r/tf2trade
// @include http://*.reddit.com/r/tf2trade/
// @include http://*.reddit.com/r/tf2trade/*
// @include https://*.reddit.com/r/tf2trade
// @include https://*.reddit.com/r/tf2trade/
// @include https://*.reddit.com/r/tf2trade/*
// ==/UserScript==

var newscript = document.createElement('script');
newscript.setAttribute('type', 'text/javascript');
var content = document.createTextNode("$('div.content div#siteTable.linklisting .link.self div.arrow.down').each(function(i) {"
                                     +"this.style.setProperty('display', 'block', 'important');"
                                     +"this.style.setProperty('color', 'black', 'important');"
                                     +"this.style.setProperty('fontSize', '16px', 'important');"
                                     +"this.style.setProperty('fontWeight', 'bold', 'important');"
                                     +"this.style.setProperty('lineHeight', '1.8em', 'important');"
                                     +"});");
newscript.appendChild(content);
document.getElementsByTagName("body")[0].appendChild(newscript); 
