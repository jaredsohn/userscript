/***
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 ***/
 
// ==UserScript==
// @id             c2892b32-c3e1-4cf1-a4f6-e9d278cfd897
// @name           Google Plus Mobile for Desktop
// @namespace      http://userscripts.org/scripts/show/140490
// @version        2.0
// @description    Enhance Your Google Plus Experience on Desktop
// @include        https://plus.google.com/app/basic/*
// @run-at         document-end
// ==/UserScript==


// avoid GM_addStyle for coding portability
var style = document.createElement('style');
var styleHTML = 'body {width: 60%; margin: 0px auto; background-color: #EEE}';
styleHTML += ' #circles {background-color: #000; position: fixed; top: 0px; right: 10px; width: 150px; color: #FFF; padding: 10px;}';
  // sidebar style
styleHTML += ' #circles ul {list-style-type: none;}';
styleHTML += ' #circles ul li a {color: #FFF; text-decoration: none;}';
styleHTML += ' #circles h2 {padding-bottom: 10px;}';
style.innerHTML = styleHTML;
document.head.appendChild(style);

// set window title to circle's name
if (document.getElementsByClassName('H6XrU').length == 1 ){
  document.title = document
    .getElementsByClassName('H6XrU')[0]
    .textContent
    ;
}
if (document.getElementsByClassName('J0UdHd').length == 1 ){
  document.title = document
    .getElementsByClassName('J0UdHd')[0]
    .textContent
    ;
}

// sidebar Circles

function Circles() {
  
  this.init = function() {
    
    // layout
    var sidebarDiv = document.createElement('div');
    sidebarDiv.id = 'circles';
    sidebarDiv.innerHTML = 'Loading ..';
    document.body.appendChild(sidebarDiv);
    
    if (localStorage['sidebarCirclesHTML'] != undefined){
      document.getElementById('circles').innerHTML
        = localStorage['sidebarCirclesHTML']
        ;
      return true;
    }
    
    // circles data
    var xhr = new XMLHttpRequest();
    xhr.open('get'
      , 'https://plus.google.com/app/basic/stream/pick?cpsid=circles'
      );

    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var text = xhr.responseText;
          var circlesHTML = '<h2>Circles</h2><ul>';
          // All Circles
          circlesHTML += '<li><a href="/app/basic/stream">Home</a></li>';
          // What's Hot
          circlesHTML += '<li><a href="/app/basic/explore">What\'s Hot</a></li>';
          // Nearby
          circlesHTML += '<li><a href="/app/basic/stream/nearby?calcloc=1">Nearby</a></li>';
          
          var matchCircles = text.match(/circles\/.+?</g);
          for (var i=0 in matchCircles){
            var match = matchCircles[i].match(/circles\/(p[^\?]+).+?>([^<]+)</
            );
            circlesHTML += '<li>'
              +'<a href="/app/basic/stream/circles/'+match[1]+'">'
              +match[2]+'</a></li>'
              ;
          }
          circlesHTML += '<li>'
            +'<a onclick="javascript:localStorage.clear();location.reload();">&raquo; Reload</a></li>'
            ;
          circlesHTML += '</ul>';
          // use localStorage as cache
          localStorage['sidebarCirclesHTML'] = circlesHTML;
          document.getElementById('circles').innerHTML
            = localStorage['sidebarCirclesHTML']
            ;
        }
      }
    }
    xhr.send(null);
  };
}

(new Circles).init();
