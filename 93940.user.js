// ==UserScript==
// @name           No Thanks, Linuxac.org
// @namespace      http://people.sigh.asia/~sulaiman
// @description    Fixes many issues in the design and layout of the site.
// @include        http://www.linuxac.org/forum/*
// @match          http://www.linuxac.org/forum/*
// @version        2.1
// ==/UserScript==
// Copyrights: Public domain. Although I would appreceate it if you gave me credit :)

// Logical fixes: Removes anything that indecates rank including post count and thanks count. does not remove colors yet.
// Design fixes: Fixes the ugly ad placment issue at the top of each page by removing it. Also, removes google ads.

// remove useless social media bar that no one really uses.
// removes member rank. Guys, you shouldn't judge a message by rank but by content  
var s=document.createElement("style")
s.setAttribute("type", "text/css")

s.textContent = ".addthis_toolbox{ display:none !important; }\n"+
                ".userinfo_extra{ display:none !important; }\n"+
                ".rank{ display:none !important; }\n"+
                "#notices{ display:none !important; }\n"+
                ".postbitim {display:none; }\n"+
                ".postcontainer {display:block; }"+
                ".postcontent {font-size:120%; }";

document.getElementsByTagName("head")[0].appendChild(s);

// removes what must be the most worst ad placement / page design I have seen on a site I frequent. THIS is why I wrote this script.
i=document.getElementsByClassName("body_wrapper");
i[0].style.display="none";

// removes intrusive google ads AFTER they are displayed (not really usefull since I intend to install adblock once I install an operating system)
i[1].getElementsByTagName("div")[1].style.display="none";


