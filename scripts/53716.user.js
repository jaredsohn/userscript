// TweetQ
// version 0.1 BETA!
// 2009-07-13
// Copyright (c) 2009, Travis Briggs
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TweetQ", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TweetQ
// @namespace     com.boxofmonocles.userscripts
// @description   Add movies to your Netflix queue directly from twitter feeds
// @include       http://*.twitter.com/*
// @include       http://twitter.com/*
// ==/UserScript==

function getByClass(classname, node) {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("span");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

//This method checks if the url redirects to a netflix movie. If so, it adds a save button, which in turn contains the popup logic.
var is_movie_re = new RegExp('body id="page-Movie"');
var movie_id_re = new RegExp('movieid=(.*?)&');
function addButtonIfMovie(the_url, the_element) {
  GM_xmlhttpRequest({
      method: 'GET',
      url: the_url,
      onload: function(details) {
        if(is_movie_re.test(details.responseText)) {
          var movie_id = movie_id_re.exec(details.responseText);
          if(movie_id == null) {
            //Couldn't find a movie id. Bail!
            return;
          }
          movie_id = movie_id[1];
          var img = document.createElement('div');
          img.style.width  = '65px';
          img.style.height = '18px';
          img.style.backgroundRepeat = 'no-repeat';
          img.style.backgroundImage = 'url(http://cdn.nflximg.com/us/pages/moviebuttons/v5/save_d30.gif)';
          
          //The following two events are to do the rollover
          img.addEventListener(
            "mouseover",
            function () { img.style.backgroundPosition = "0px -18px"; },
            true
          );
          img.addEventListener(
            "mouseout",
            function () { img.style.backgroundPosition = "0px 0px"; },
            true
          );
          
          //This is the function that adds the popup when the save button is clicked
          img.addEventListener(
            "click",
            function () {
              div = document.createElement('div');
              div.style.border = "1px solid black";
              div.style.position = "absolute";
              div.style.top = the_element.parentNode.parentNode.offsetTop + 100 + "px";
              div.style.left = "110px";
              div.style.background = "white";
              
              iframe = document.createElement('iframe');
              iframe.style.width = "430px";
              iframe.style.height = "225px";
              iframe.style.border = "none";
              iframe.frameborder = "0";
              iframe.style.overflow = 'hidden';
              iframe.scrolling = "no";
              iframe.src = "http://widgets.netflix.com/addToQueue.jsp?output=json&devKey=5cw86twej4ss35upf27wwn37&queue_type=disc" +
                           "&movie_id=http://api.netflix.com/catalog/titles/movies/" +
                           movie_id;
              
              button = document.createElement('button');
              button.innerHTML = "Close";
              //Remove the div when you click the button
              button.addEventListener(
                "click",
                function () { div.parentNode.removeChild(div); },
                true
              );
              
              div.appendChild(iframe);
              div.appendChild(document.createElement('br'));
              div.appendChild(button);
              document.getElementsByTagName("body")[0].appendChild(div);
            },
            true
          );
          
          the_element.appendChild(img);
        }
      }
  });
}

//Get all the posts on the page
var content = getByClass('entry-content');
for(var i=0; i<content.length; i++) {
  //Get all the links in the posts
  var links = content[i].getElementsByTagName('a');
  for(var j=0; j<links.length; j++) {
    if(links[j].href.match('twitter')) {
      //ignore @links to other users
      continue;
    }
    
    if(links[j].href.match('tinyurl.com') ||
       links[j].href.match('twurl.nl') ||
       links[j].href.match('bit.ly') ||
       links[j].href.match('twurl.cc') ||
       links[j].href.match('mochida.cc') ||
       links[j].href.match('cli.gs') ||
       links[j].href.match('zi.ma') ||
       links[j].href.match('is.gd') ||
       links[j].href.match('su.pr') ||
       links[j].href.match('tr.im') ||
       links[j].href.match('u.nu') ||
       links[j].href.match('short.ie') ||
       links[j].href.match('kl.am') ||
       links[j].href.match('poprl.com') ||
       links[j].href.match('snurl.com') ||
       links[j].href.match('snipurl.com') ||
       links[j].href.match('snipr.com') ||
       links[j].href.match('sn.im')
    ) {
      addButtonIfMovie(links[j].href, content[i]);
    }
  }
}