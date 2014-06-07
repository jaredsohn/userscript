// ==UserScript==
// @name           IgnoreThemAll!
// @namespace      http://www.theiceman.co.il/
// @include        http://www.facebook.com/reqs.php*
// @include        http://www.facebook.com/#!/reqs.php*
// @include        http://www.facebook.com/games*
// ==/UserScript==

var a = document.getElementsByClassName("UITwoColumnLayout_Content")[0];

var input = document.createElement("input");
input.setAttribute("type","button");
input.setAttribute("onclick", "GM_IA_IGNORE_ALL()");
input.setAttribute("value", "IGNORE ALL");
input.setAttribute("class", "inputbutton");

a.insertBefore(input, a.firstChild.nextSibling);

var script = document.createElement('script');
script.type="text/javascript";
script.innerHTML = "\
\
function GM_IA_pausecomp(millis)\
{\
var date = new Date();\
var curDate = null;\
\
do { curDate = new Date(); }\
while(curDate-date < millis);\
}\
\
function GM_IA_IGNORE_ALL() {\
    var rejs = document.getElementsByName('actions[reject]');\
    for(var i=0; i < rejs.length; i++){\
        rejs[i].click();\
        GM_IA_pausecomp(500);\
    }\
}\
";

document.getElementsByTagName("head")[0].appendChild(script);