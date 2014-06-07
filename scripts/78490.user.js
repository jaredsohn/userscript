// ==UserScript==
// @name           FREE DA UserScript Browse Fast
// @namespace      world
// @description    show More button for DA Menu
// @include        http://*.deviantart.com*
// @exclude        http://www.deviantart.com/*
// @exclude        http://my.deviantart.com/*
// @exclude        http://www.deviantart.com/submit/*
// ==/UserScript==     
 
var $ = unsafeWindow.jQuery;  

$(document).ready(function(){              
  search = location.href.search("/dds/");
  if(search == -1) {
    var content = "<td style='padding-top: 20px;' class='f'><a class='gtab' href='/dds/' gpage_id='209495' gpage_name='dds'><i class='icon i2' style='background-image: url(\"http://st.deviantart.net/minish/gruzecontrol/icons-userpagetoolbar.png?1\"); background-position:-800px 0;'></i>DDs</a></td>";
  }else {
    var content = "<td style='padding-top: 20px;' class='f'><a class='gtab gtab-selected gtabi-mc' href='/dds/' gpage_id='209495' gpage_name='dds'><i class='gtab-i gtabi-mc'></i><i class='icon i2' style='background-image: url(\"http://st.deviantart.net/minish/gruzecontrol/icons-userpagetoolbar.png?1\"); background-position:-800px 0;'></i>DDs</a></td>";
  }
                 
  search = location.href.search("/critique/");
  if(search == -1) {
    content += "<td style='padding-top: 20px;' class='f'><a class='gtab' href='/critique/' gpage_id='209495' gpage_name='critique'><i class='icon i2' style='background-image: url(\"http://st.deviantart.net/minish/gruzecontrol/icons-userpagetoolbar.png?1\"); background-position:-1000px 0;'></i>Critiques</a></td>";
  }else {
    content += "<td style='padding-top: 20px;' class='f'><a class='gtab gtab-selected gtabi-mc' href='/critique/' gpage_id='209495' gpage_name='critique'><i class='gtab-i gtabi-mc'></i><i class='icon i2' style='background-image: url(\"http://st.deviantart.net/minish/gruzecontrol/icons-userpagetoolbar.png?1\"); background-position:-1000px 0;'></i>Critiques</a></td>";
  }
                 
  search = location.href.search("/journal/poll/");
  if(search == -1) {
    content += "<td style='padding-top: 20px;' class='f'><a class='gtab' href='/journal/poll/' gpage_id='209495' gpage_name='poll'><i class='icon i2' style='background-image: url(\"http://st.deviantart.net/minish/gruzecontrol/icons-userpagetoolbar.png?1\"); background-position:-920px 0;'></i>Poll</a></td>";
  }else {
    content += "<td style='padding-top: 20px;' class='f'><a class='gtab gtab-selected gtabi-mc' href='/journal/poll/' gpage_id='209495' gpage_name='poll'><i class='gtab-i gtabi-mc'></i><i class='icon i2' style='background-image: url(\"http://st.deviantart.net/minish/gruzecontrol/icons-userpagetoolbar.png?1\"); background-position:-920px 0;'></i>Poll</a></td>";
  }
                 
  search = location.href.search("/wishlist/");
  if(search == -1) {
    content += "<td style='padding-top: 20px;' class='f'><a class='gtab' href='/wishlist/' gpage_id='209495' gpage_name='wishlist'><i class='icon i2' style='background-image: url(\"http://st.deviantart.net/minish/gruzecontrol/icons-userpagetoolbar.png?1\"); background-position:-840px 0;'></i>Wishlist</a></td>";
  }else {
    content += "<td style='padding-top: 20px;' class='f'><a class='gtab gtab-selected gtabi-mc' href='/wishlist/' gpage_id='209495' gpage_name='wishlist'><i class='gtab-i gtabi-mc'></i><i class='icon i2' style='background-image: url(\"http://st.deviantart.net/minish/gruzecontrol/icons-userpagetoolbar.png?1\"); background-position:-840px 0;'></i>Wishlist</a></td>";
  }
    
    
    $(".iconset-gruser tbody tr").append(content);  
 });