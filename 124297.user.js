// ==UserScript==
// @name           NMT EX.UA
// @namespace      http://in-square.net/nmtexua/grease
// @include        http://www.ex.ua/view/*
// ==/UserScript==
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main()
{
  $('a[href^="/get/"]').each(function() {
    var i = $(this);
    var btn = $('<span style="cursor: pointer; color: red; font-weight: bold;">[Play!] </span>').click(function() {
      $('iframe#nmt').remove();

      var frame = $('<iframe/>').attr('id', 'nmt').css('width', '0px').css('height', '0px');
      frame.attr('src', 'http://10.1.2.3:8008/playback?arg0=start_vod&arg1=Test&arg2=http://ex.ua' + i.attr('href') + '&arg3=show&arg4=0&_rnd=' + Math.round(Math.random() * 100000));
      //alert('http://10.1.2.3:8008/playback?arg0=start_vod&arg1=Test&arg2=http://ex.ua' + i.attr('href') + '&arg3=show&arg4=0&_rnd=' + Math.round(Math.random() * 100000));
      $('body').append(frame);
      //alert('Started playback of ' + i.text());
    });
    i.before(btn);
  });
}

addJQuery(main);
