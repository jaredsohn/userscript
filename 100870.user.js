// ==UserScript==
// @name           sg.hu Fórum Kedvenceim
// @namespace      http://malakai.hu/
// @description    Kis varia a kedvenclistán
// @include        http://www.sg.hu/forum.php
// @version        1.0.1
// @require        http://malakai.hu/userscripts/gen/us_updater.js?id=100870&days=2
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

$(function () {
  var favTree = [];

  $('#center > table:nth-child(3) > tbody > tr > td:first-child > div:nth-child(3) > div:last-child').children('div.std0').each(function(index) {
    var levelName = $(this).text();
    $(this).data('folded', false);
    favTree[index] = {
      'name' : levelName,
      'obj' : $(this),
      'favs' : []
    };
    $(this).nextUntil('div.std0').each(function() {
      var theFav = {
        'name' : $(this).text(),
        'unread' : 0,
        'obj' : null
      };
      theFav.unread = ( $(this).find('font[color=RED]').length > 0 ) ? parseInt( $(this).find('font[color=RED]').text().split(' ')[0].substr(1) ) : 0;
      theFav.obj = $(this);
      favTree[index].favs.push(theFav);
    });
  });

  $.each(favTree, function(iLevel) {
    var nShown = favTree[iLevel].favs.length;
    $.each(favTree[iLevel].favs, function(iFav) {
        if ( favTree[iLevel].favs[iFav].unread === 0 ) {
          favTree[iLevel].favs[iFav].obj.hide();
          nShown--;
        }
      if ( nShown !== favTree[iLevel].favs.length ) {
        addFolding(favTree[iLevel]);
      }
    });
  });

  GM_log( favTree );

  function toggleHiddenFavs(category) {
    $.each(favTree, function(iLevel) {
      if ( favTree[iLevel].name === category ) {
        if ( favTree[iLevel].obj.data('folded') ) {
          $.each(favTree[iLevel].favs, function(iFav) {
            favTree[iLevel].favs[iFav].obj.show();
          });
          favTree[iLevel].obj.data('folded', false);
        } else {
          $.each(favTree[iLevel].favs, function(iFav) {
            if ( favTree[iLevel].favs[iFav].unread === 0 )
              favTree[iLevel].favs[iFav].obj.hide();
          });
          favTree[iLevel].obj.data('folded', true);
        }
      }
    });
  }

  function addFolding(level) {
    if ( level.obj.children('div.fav-folding').length == 0 ) {
      level.obj.children('a').css('clear', 'right');
      level.obj.data('folded', true).append('<div class="fav-folding"></div>');
      level.obj.children('div.fav-folding').css({
        'width' : '14px',
        'height' : '12px',
        'float' : 'right',
        'background' : 'url("images/ful_cim_icon3.png") no-repeat scroll 0 2px #FFFFFF',
        'cursor' : 'pointer'
      }).click(function() {
        toggleHiddenFavs(level.name);
      });
    }
  }
});
