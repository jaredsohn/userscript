// ==UserScript==
// @name        TMD Tweaks
// @description Tweaks for TMD
// @include     *torrentsmd.com/*
// @include     *torrentsmd.eu/*
// @include     *torrentsmd.me/*
// @include     *torrentsmoldova.com/*
// @include     *torrentsmoldova.org/*
// @include     *torrentsmoldova.net/*
// @version     2.0.1
// ==/UserScript==



TMDTweaks(); //run


function TMDTweaks()
{
    var _window = window;
    try {
        _window = unsafeWindow; //'cause chrome security policy
    } catch(e){}

    (!_window.jQuery) && window.setTimeout(TMDTweaks, 500) || init(_window.jQuery, _window);
}

function init($, _window) //all code goes here
{
  _window = _window || window;

  var
    _message = _window.message || {'lang':'ro'},
    User = {
      loggedIn: ($('#user_box').length>0),
      lang: _message.lang
    },
    __ = function() //arguments=> (Ro, Ru)
    {
      var currentLang = {
        'ro':0,
        'ru':1
      }[User.lang];

      return arguments[currentLang];
    },
    msg = {
      sf_t : __('Torente', 'Раздачи'),
      sf_u : __('Utilizatori', 'Пользователи'),
      sf_f : __('Forum', 'Форум')
    },

    $style = $('<style>').appendTo('head');

    var q = {};
    q.t = (location.href.match(/search.php\?search_str=(.*)/g)) ? decodeURIComponent(location.search.replace(/\?search_str=/g, '').replace(/\+/g, ' ')) : '';
    q.u = (location.href.match(/users.php\?search=/g)) ? decodeURIComponent(location.search.replace(/\?search=/g, '').replace('+', '%20')) : '';
    q.f = (location.href.match(/forum.php\?action=search&keywords=/g)) ? decodeURIComponent(location.search.replace(/\?action=search&keywords=/g, '').replace(/\+/g, ' ')) : '';

  //Search form
  if(User.loggedIn)
  {
    var html   = {};
    html.sf    = {};
    html.sf.t  = '<form id="search-torrents" action="search.php" method="get"><input class="searchness" type="text" name="search_str" placeholder="' + msg.sf_t + '..." value="' + q.t + '"><input class="srcbtn" type="submit" value="↩"></form>';
    html.sf.u  = '<form id="search-users" action="users.php" method="get"><input class="searchness" type="text" name="search" placeholder="' + msg.sf_u + '..." value="' + q.u + '"><input class="srcbtn" type="submit" value="↩"></form>';
    html.sf.f  = '<form id="search-forum" action="forum.php" method="get"><input type="hidden" name="action" value="search"><input class="searchness" type="text" name="keywords" placeholder="' + msg.sf_f + '..." value="' + q.f + '"><input class="srcbtn" type="submit" value="↩"></form>';
    html.cnt   = '<div id="search-cntnr">' + html.sf.t + html.sf.u + html.sf.f + '</div>';
    var style  =
      '#search-cntnr{ margin: 0 auto; width: 880px; overflow: hidden; padding: 10px 0 20px; }'+
      '#search-cntnr>*{ float: left; margin-left: 108.5px; }'+
      '#search-cntnr>:first-child{ margin-left: 0; }'+
      '#search-cntnr .searchness{ border: 1px solid #ccc; height: 24px; padding: 2px 5px; width: 200px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }'+
      '.searchness:focus{ outline: none; }'+
      '#search-cntnr .srcbtn{ background: transparent; border: 1px solid #ccc; height: 24px; margin-left: -1px; padding: 2px 1px; }';

    $('#main_search_text').parent().remove();
    $style.append(style);
    $('#no_td_border').after(html.cnt);
  }


  // topic/torrent title block (as is - to be optimized)
  if(document.title.match(/((Vezi tema)|(Detaliile torrentului)|(Просмотр темы)|(Детали торрента))/g))
  {
    var tt_html  = '<div id="entry-title">' + document.title.replace(/( :: Torrents(.+)$)/g, '') + '</div>';
    var tt_style =
        '#entry-title{ background-color: #ECE9D8; border: 1px solid #A79F72; max-width: 350px; padding: 10px; position: fixed; right: 10px; bottom: 10px; transition: all .5s ease; }'+
        '#entry-title:hover{opacity: 0;}';

    $style.append(tt_style);
    $('body').append(tt_html);
  }

}
