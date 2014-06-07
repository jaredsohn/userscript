// ==UserScript==
// @name         Тредометр
// @namespace    udp://insomnia/*
// @version      0.0.6
// @description  Считает текущую скорость треда и количество десу!
// @match        http://dobrochan.com/*/*
// @match        http://dobrochan.ru/*/*
// @include      http://dobrochan.com/*/*
// @include      http://dobrochan.ru/*/*
// @copyright    2013+, tranquility.yuki
// @grant        none
// ==/UserScript==

ParseUrl = function(url){
    m = (url || document.location.href).match( /https?:\/\/([^\/]+)\/([^\/]+)\/((\d+)|res\/(\d+)|\w+)(\.x?html)?(#i?(\d+))?/)
    return m?{host:m[1], board:m[2], page:m[4], thread:m[5], pointer:m[8]}:{};
};

var Hanabira_URL = ParseUrl();
var reDate = /(\d+\s\w+)\s2?0?(\d+)\s\(\w+\)(\s\d+:\d+)/i;

var toDate = function(str){
  var parts = str.match(reDate);
  return new Date(parts[1] + ' 20'+parts[2]+parts[3]);
}

var countValues = function(){
  
  var posts = $("td.reply");
  var last_date = Math.round(toDate(posts.last().find("label").text()).getTime() / 1000) - 60*60;
  var last_id = parseInt($('td.reply').last().attr('id').replace('reply',''));
  var total_desu = 0;
  var total_posts = 0;
  var total_posts_board = 0;

  $(posts.get().reverse()).each(function(idx, el) {
    var post = $(el);
    var cnt = post.find("div.message").text().match(/[^а-я]д+е+с+у+|[^a-z]d+e+s+u+/ig);
    var date = toDate(post.find("label").text());
    
    if (Math.round(date.getTime() / 1000) > last_date){
      total_posts_board = last_id - parseInt(post.attr('id').replace('reply',''));
      total_posts++;
      if(cnt){
        total_desu += cnt.length;
      }
    } else {
      return false;
    }

  });

  var meter = $('#tredoMeter');

  if(meter.length == 0){
      $('html').append('<div id="tredoMeter" style="background: #ddd;border: 1px solid #ccc;border-radius: 5px;position: fixed;top: 60px;right: 20px;box-shadow: 0 0 10px rgba(0,0,0,0.5);padding: 3px;font-size: 10px;">' + total_posts + ' постов/час (' + Math.round(100*total_posts/total_posts_board) + '%)<br>' + total_desu + ' десу/час<br>борда: ' + total_posts_board + ' постов/час</div>');
  }else{
    meter.replaceWith('<div id="tredoMeter" style="background: #ddd;border: 1px solid #ccc;border-radius: 5px;position: fixed;top: 60px;right: 20px;box-shadow: 0 0 10px rgba(0,0,0,0.5);padding: 3px;font-size: 10px;">' + total_posts + ' постов/час (' + Math.round(100*total_posts/total_posts_board) + '%)<br>' + total_desu + ' десу/час<br>борда: ' + total_posts_board + ' постов/час</div>');
  }

  $('#tredoMeter').click(countValues);
  
}

if(Hanabira_URL.thread){
  countValues();
  setInterval(countValues, 29000);
}