// ==UserScript==
// @name           MeMeDouble
// @namespace      MeMe
// @description    DoubleMeMe - Load 2 pages of MeMes on MeMe Dashboard Page
//                            - Carrega duas páginas de MeMes na página do MeMe Dashboard
// @include        http://meme.yahoo.com/dashboard/*
// @require        http://updater.usotools.co.cc/61341.js
// @Author         Bruno Caimar - bruno.caimar@gmail.com 
// @Version        0.0.2_20091116 - Little adjust to work with new Meme UI
//                 0.0.1_20091105 - Initial Version - lots of bugs ):-P
// @Licence        MIT
//
// ToDo: 
//       Adjust to load more pages (more post button)
//       Check how to get #content from page 2 with jQuery without using a index [25]
//       Remove the 'magic' stuff (numbers)
//       Check about new YMeme UI
//
// ==/UserScript==
(function () {
  try {
    var $ = unsafeWindow.jQuery;
    var next = $('#button_next');
    $.get(next.attr('href'), function (data) {
      var novoNext = $('#button_next', $(data));
      next.attr('href', novoNext.attr('href'));
      var c = $($(data)[25]);
      var _width = $('body').outerWidth() / 2;
      _width -= 20;
      c.css('width', _width - 20);

      $('#content').css('width', _width);
      $('#content').css('marginLeft', 20);
      $('.pagination').css('marginLeft', -300);

      c.css('top', $('#content').offset().top);
      c.css('left', $('#content').offset().left + $('#content').width() + 20);
      c.css('position', 'absolute');

      $('body').append(c);
      $('.post').css('width', _width);
      $('.video_comment').css('width', _width - 100);
      $('.post .text').css('width', _width - 100);
    });
  } catch(err) {
    GM_log('GM_MeMeDouble');
    GM_log(err);
  }
})();