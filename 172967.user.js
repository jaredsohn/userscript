// ==UserScript==
// @name           ballp.it flash linker
// @namespace      ballpit
// @description    Hyper-trivial script to add a link next to flash embeds that will take you to the video on Youtube.
// @include        http://ballp.it/*
// @include        http://www.ballp.it/*
// @version        0.1
// @copyright      2013 Stumbledrunk Fumbleboom
// @license        BSD License, http://opensource.org/licenses/BSD-2-Clause.  COMMENSE THE JIGGLIN'
// @supported      Firefox 3.5+, Chrome 4+
// ==/UserScript==


/**
 * I knew almost nothing about JS before I wrote this.
 * This trivial script represents like five hours of frustration
 *   and maybe five X-Files episodes.
 */


/**
 * ZARDOZ SPEAKS TO YOU, ISFAHAN.
 * You have been raised up from Brutality.
 * Kill the Brutals who multiply, and are legion.
 * To this end Zardoz your God gave you the gift of the Gun.
 * The Gun is good!
 * The Penis is evil!
 * The Penis shoots Seeds and makes new life that poisons the Earth with a plague of men,
 *   as once it was.
 * But the Gun shoots Death and purifies the Earth of the Filfth of Brutals.
 * Go forth and kill!
 *
 * [And then I vomit a heap of guns and ammo on you,
 *  after which I probably will be your God.]
 */


var url_extractor = new RegExp('v/([^&]+)');

var posts = document.querySelectorAll("DIV.post DIV.inner");

for (var i = 0; i < posts.length; i += 1) {  
  // posts[i].style.backgroundColor = "#c0c0c0";
  
  var curr_child = posts[i].firstChild;
  while (curr_child != null) {
    if (curr_child.nodeName == "EMBED") {
      // get url
      var raw_url = curr_child.getAttribute("src");
      var url_match = url_extractor.exec(raw_url);
      var url = "http://www.youtube.com/watch?v=" + url_match[1];
      
      // add a
      var link = document.createElement("A");
      link.setAttribute("HREF", url);
      link.setAttribute("TARGET", "_BLANK");
      link.style.margin = " 2px 5px 2px 5px ";

      //var tube_str = document.createTextNode("tube");
      //link.appendChild(tube_str);

      var tube_icon = document.createElement("IMG");
      tube_icon.setAttribute("SRC", 'https://s.ytimg.com/yts/img/favicon_32-vflWoMFGx.png');
      link.appendChild(tube_icon);
      // https://s.ytimg.com/yts/img/favicon-vfldLzJxy.ico

      posts[i].insertBefore(link, curr_child.nextSibling);
    }
    
    curr_child = curr_child.nextSibling;
  }
  
}


