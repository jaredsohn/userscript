// ==UserScript==
// @name           Debug
// @namespace      My Prizee
// @include        http://www.prizee.com/forum/index.php*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
function addstyle(url)
{
var script = document.createElement('link');
script.setAttribute('href', url);
script.setAttribute('rel', 'stylesheet');
script.setAttribute('type', 'text/css');
head.appendChild(script);
}
addstyle("http://www.prizee.com/forum/public/style_css/css_6/calendar_select.css");
addstyle("http://www.prizee.com/forum/public/style_css/css_6/ipb_styles.css");
addstyle("http://www.prizee.com/forum/public/style_css/css_6/ipb_editor.css");
addstyle("http://www.prizee.com/forum/public/style_css/css_6/ipb_prizee.css");
addstyle("http://www.prizee.com/forum/public/style_css/prettify.css");
addstyle("http://media.prizee.com/pz2/css/forum/style.css?v=d5cda47");
