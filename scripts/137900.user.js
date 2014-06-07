// ==UserScript==
// @name           Phantom
// @description    Phantom is Github Flavored Markdown Parser.
// @namespace      linyows
// @include        http://*
// @include        https://*
// @author         linyows <linyows@gmail.com>
// @version        1.0.2
// ==/UserScript==

function useLibrary(callback)
{
  var library = [
    '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
    '//pagedown.googlecode.com/hg/Markdown.Converter.js'
  ];
  var counter = 0;

  for (var i in library) {
    var script = document.createElement('script');
    script.setAttribute('src', library[i]);
    script.addEventListener('load', function() {
      var script = document.createElement('script');
      counter++;
      if (counter == library.length) { script.textContent = '(' + callback.toString() + ')();'; }
      document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
  }
}

function userScript()
{
  var style = '\
  <style type="text/css">\
  .parsed {\
    font-size: 14px;\
    line-height: 1.6;\
    padding-bottom: 20px;\
  }\
  .parsed h1,\
  .parsed h2,\
  .parsed h3,\
  .parsed h4,\
  .parsed h5 {\
    font-weight: bold;\
    color: #000;\
    margin: 20px 0 10px;\
    padding: 0;\
    position: relative;\
    display: block;\
    border: none!important;\
    background: none!important;\
  }\
  .parsed h1 {\
    font-size: 28px;\
  }\
  .parsed h2 {\
    border-bottom: 1px solid #ccc!important;\
    font-size: 24px!important;\
  }\
  .parsed p,\
  .parsed blockquote,\
  .parsed ul,\
  .parsed ol,\
  .parsed dl,\
  .parsed table,\
  .parsed hr,\
  .parsed pre {\
    margin: 15px 0;\
  }\
  .parsed p {\
    padding: 5px 0 10px;\
    font-size: 14px;\
    color: #333;\
  }\
  .parsed strong,\
  .parsed b {\
    font-weight: bold;\
  }\
  .parsed pre {\
    background-color: #F8F8F8;\
    border: 1px solid #ccc;\
    border-radius: 3px;\
    font-size: 13px;\
    line-height: 19px;\
    overflow: auto;\
    padding: 6px 10px;\
  }\
  .parsed hr {\
    display: block;\
    background: url("https://a248.e.akamai.net/assets.github.com/images/modules/pulls/dirty-shade.png?ac8b47a3") repeat-x scroll 0 0 transparent;\
    border: 0 none;\
    color: #ccc;\
    height: 4px;\
    padding: 0;\
  }\
  .parsed ul,\
  .parsed ol {\
    list-style-position: inside;\
    padding: 0 0 0 30px;\
  }\
  .switcher {\
    text-align: right;\
  }\
  .switcher a {\
    text-decoration: none;\
    font-weight: bold;\
    font-size: 12px;\
  }\
  .original {\
    color: #333;\
    padding: 20px;\
    margin: 10px 0 0;\
    font-size: 13px;\
    background-color: #F8F8F8;\
    border: 1px solid #ccc;\
    border-radius: 3px;\
  }\
  </style>';
  $('head').append(style);

  var i = 0;
  $('div').each(function(){
    var text = $(this).text()
                      .replace(/(^\s+)|(\s+$)/g, '')
                      .replace(/\b(a\w*)/gi, '$1')
                      .replace(/(\n)/gi, '  $1');// GitHub Flavored Markdown

    if (text.match(/^#! md/)) {
      i++;
      text = text.replace(/^(#! md)/, '')
                 .replace(/[`|~]{3}(\w+)/, '<pre class="$1">')
                 .replace(/[`|~]{3}/, '</pre>')
                 .replace(/>\s{2}(\n)/gi, '>$1');
      var converter = new Markdown.Converter();
      var parsed = $('<div/>').addClass('parsed')
                              .attr('id', 'parsed' + i)
                              .html(converter.makeHtml(text));
      var original = $('<div/>').addClass('original')
                                .attr('id', 'original' + i)
                                .html($(this).html()).hide();
      var switcher = $('<p/>').addClass('switcher')
                              .html($('<a/>').attr('href', 'javascript:void(0)')
                                             .attr('onclick', '$("#original' + i + '").slideToggle();')
                                             .html('original'));

      $(this).html(parsed);
      $(this).append(switcher);
      $(this).append(original);
    }
  });
}

useLibrary(userScript);