// ==UserScript==
// @name           Whirlpool Tool Suite
// @namespace      wp_tool_suite
// @description    Adds user controllable tools on the sidebar. For quickly viewing posts by certain users.
// @include        *whirlpool.net.au*
// @require                http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
       
	  var url  = document.location.toString();
      var html = '<dt>Tools</dt>';
      if(url.match('forum-replies.cfm')){
              var thread_id = url.split('t=')[1];
                      thread_id = thread_id.split('&')[0];
              var user_id = $('.userinfo dd:first').text().split('#')[1];
              var user_name = $('.userinfo dt').text();
              html += '<dd><strong>Thread</strong></dd><dd><a href="/forum-replies.cfm?t=' + thread_id + '&p=-2">Show All</a> · <a href="/forum-replies.cfm?ur=1&t='+ thread_id +'">Rep</a> · <a href="/forum-replies.cfm?um=1&t='+ thread_id +'">Mod</a> · <a href="/forum-replies.cfm?t=' + thread_id + '&ux='+ user_id +'">Mine</a></dd>';
      }
       
      $('.userinfo').after('<dl>' + html + '</dl>');
	  
