// ==UserScript==
// @name           XBMC EX.UA
// @namespace      http://somespace.com/
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
      frame.attr('src', 'http://10.1.2.3:8080/jsonrpc?request={"jsonrpc":"2.0","id":1,"method":"Player.Open","params":{"item":{"file":"http://ex.ua' + i.attr('href') + '"}}}&_rnd=' + Math.round(Math.random() * 100000));
      $('body').append(frame);
    });
    i.before(btn);
  });
}

addJQuery(main);
