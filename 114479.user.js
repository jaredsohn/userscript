// ==UserScript==
// @name           eRepublik News & Country Details link adder
// @namespace      100% Safe For Indonesia
// @version        0.1.1
// @description    Add News & Country Details links in Community Menu
// @include        http://www.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js
// ==/UserScript==

var link = $('div.user_info').find('a').attr('href');

$.ajax({
  url: link,
  context: document.body,
  success: function(data){
    var country_admin = $(data).find('div.citizen_info').find('a').eq(3).attr('href');
    var country_name = $(data).find('div.citizen_info').find('a').eq(3).find('img').attr('alt');
    var news_link = '</li><a rel="nofollow" href="/en/news/rated/all/Indonesia/1">News</a><li>';
    var country_link = '</li><a rel="nofollow" href="/en/country/society/Indonesia">Country Details</a><li>';
    $('#menu5').find('li').eq(0).append(news_link);
    $('#menu5').find('li').eq(4).append(country_link);
  }
});

