// ==UserScript==
// @name           Show PutLocker/Sockshare FLV links
// @namespace      http://userscripts.org/users/231879
// @description    Show link to PutLocker/Sockshare FLV XML
// @include        http://www.putlocker.com/*
// @include        http://www.sockshare.com/*
// ==/UserScript==

var p = unsafeWindow;

if(window.navigator.vendor.match(/Google/)) {
	var div = document.createElement("div");
	div.setAttribute("onclick", "return window;");
	p = div.onclick();
};

var $ = p.$;
var console = p.console;

$(function(){
  $('#playdiv').before('<div id="flv_link" style="border: 1px solid #777777; text-align: center;">'+
                      '<a href="#" onclick="fetch_flv_link()">Click here to fetch flv video link.</a>'+
                      '</div>');
  p.play_video('play');
  p.fetch_flv_link();
});

p.fetch_flv_link = function() {
  var url = $('#player_api').html().match(/\/get_file\.php\?stream=[0-9A-Za-z]*/)[0];
  if (url){
    $('#flv_link').html('Fetching FLV link from <a href="'+url+'">'+url+'</a>... '+
                        '<img src="http://www.pocketmovies.net/img/spinner.gif.pagespeed.ce.TFUe6Q5wBV.gif"/>');
    $.get(url, function(data) {
      // $('#player').remove();
      var serializer = new XMLSerializer();
      var xml = serializer.serializeToString(data);
      var flv_url = xml.match(/<media:content url="([^"]*)"/)[1];
      if (flv_url){
        $('#flv_link').html('Download flv from: <a href="'+flv_url+'">'+flv_url+'</a>');
      } else {
        $('#flv_link').html('Sorry, something went wrong!');
      };
    });
  };
};

