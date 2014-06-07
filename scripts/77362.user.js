// ==UserScript==
// @name           View Stewart and Colbert on bittorrent
// @namespace      http://t-a-w.blogspot.com/
// @description    No more "Sorry, Videos are not currently available in your country"
// @include        http://www.thedailyshow.com/*
// @include        http://www.colbertnation.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var month_names = {
  'January': '01',
  'February': '02',
  'March': '03',
  'April': '04',
  'May': '05',
  'June': '06',
  'July': '07',
  'August': '08',
  'September': '09',
  'October': '10',
  'November': '11',
  'December': '12'
};

$(".date, .airDate, .clipDate").each(function() {
  var txt = $(this).text();
  var m = txt.match(/(\S+)\s*(\d+),\s*(\d{4})/);
  var date = m[3] + "+" + month_names[m[1]] + "+" + m[2];
  var url;
  if(window.location.hostname == "www.thedailyshow.com") {
    url = 'http://www.yourbittorrent.com/?q=Daily+Show+' + date;
  } else {
    url = 'http://www.yourbittorrent.com/?q=Colbert+Report+' + date;
  }
  $(this).append("<div><a href='"+ url + "'>Download on bittorrent</a></div>");
});