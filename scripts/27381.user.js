// ==UserScript==
// @name           retweet
// @namespace      tzangms.com
// @description    twitter retweet function
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
// version: 0.7

// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait,100);
  } else {
    $ = unsafeWindow.jQuery;
    letsJQuery();
  }
}
GM_wait();

// update text chars count
function updateStatusTextCharCounter(value) {
  var len = value.length;
  var char_counter = $('#status-field-char-counter');
  char_counter.html('' + (140-len));
  if (len <= 0 || len > 140) {
    if(len == 0) { char_counter.css( 'color', '#cccccc'); }
    $('.status-btn .round-btn').attr('disabled', 'disabled').addClass('disabled');
  } else {
    $('.status-btn .round-btn').removeAttr('disabled').removeClass('disabled');
    if (len > 130) { char_counter.css( 'color', '#d40d12'); }
    else if (len > 120) { char_counter.css( 'color', '#5c0002'); }
    else { char_counter.css( 'color', '#cccccc'); }
  }
}
	
// fix url in tweet content
function fixUrl(content){
  arySearch = new Array;
  aryReplace = new Array;
  myRegExp = new RegExp(/<a href="(.*?)".*?>(.*?)<\/a>/gi);
  r = myRegExp.exec(content);
  while(r != null){
    arySearch.push(r[0]);
    if(r[2] == '...'){
      aryReplace.push('');
    }else if(r[1].search(/^https?:\/\//gi) > -1){
      aryReplace.push(r[1]);
    }else{
      aryReplace.push(r[2]);
    }
    r = myRegExp.exec(content);
  }
  for(i = 0; i < arySearch.length; i++){
    content = content.replace(arySearch[i], aryReplace[i]);
  }

  return content;
}

// main action
function letsJQuery() {
  $('.hentry .actions div').livequery(function(){
    var r = document.createElement('a');
    r.setAttribute('class', 'retweet');
    r.innerHTML = 'R';
    r.style.color = '#aaa';
    r.style.fontWeight = 'bold';
    r.style.cursor = 'pointer';
    r.style.margin = '0px';
    r.style.padding = '3px 8px';
    $('.actions').css('top', '0px');

    $(this).append(r);
    
    $('a.retweet', $(this)).each(function(){
      e = $(this).parents('.hentry').children('.status-body');
      // on friend-timeline(home) or @replies page
      id = $('strong a', e).text();
      
      // on favorites or user's page
      if(id.length == 0){
        id = $.trim($('#content .profile-head .thumb').text());
      }
      
      content = fixUrl($('span.entry-content', e).html());
      msg = 'RT: @' + $.trim(id) + ' ' + $.trim(content);
      
      if($('#status').length == 0){
        // on favorites or user's page
        $(this).attr('href', '/home?status=' + encodeURIComponent(msg));
      }else{
        // on friend-timeline(home) or @replies page
        $(this).attr('rt_content', msg);
        $(this).click(function(){
          msg = $(this).attr('rt_content');
          $('#status').val(msg).focus();
          updateStatusTextCharCounter(msg);
          window.scroll(0,0);
        });
      }
    });
  });
}