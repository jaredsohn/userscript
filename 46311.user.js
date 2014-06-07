// ==UserScript==
// @name           random post
// @namespace      http://userscripts.org/users/54612
// @description    Creates a button to show a random post on most blogspot blogs.
// @include        http://*.blogspot.com/*
// ==/UserScript==
//
//
// This greasemonkey script will add a "Random Post" button to any blogspot blog.
//
// http://*.blogspot.com/*
//
//
//
//

/**
* looks on this page for the blogspot blog id and returns it.
* returns null if it cannot be found.
*/
function get_my_blogid() {
  var links = document.getElementsByTagName('link');
  for (i=0; i<links.length; i++) {
    var link = links[i];
    var href = link.href;
    if (href) {
      var result = href.match(/blogID=(\d+)/);
      if (result && result[1]) return result[1]; 
    }
  }//endfor
  return null;
}//get_my_blogid

/**
* Looks through the page and finds a suitable place to put the button
*/
function get_place_to_append() {
  var canidates = ['crosscol-wrapper','navbar','main-wrapper'];
  for (i=0;i<canidates.length;i++) {
    var e = document.getElementById(canidates[i]);
    if (e) return e;
  }
  return null;
}//get_place_to_append


var blogid = get_my_blogid();
if (blogid) {
  var url = 'http://scissorsoft.com/cgi-bin/random_blogpost.cgi?blogid=';
  var daddy = get_place_to_append();
  var button = document.createElement("input");
  button.setAttribute("type",'button');
  button.setAttribute("value",'Random Post');
  button.setAttribute("onclick","document.location ='" + url + blogid + "';");
  daddy.appendChild(button);
}