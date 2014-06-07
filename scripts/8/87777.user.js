// ==UserScript==
// @name           SSSwitcher
// @namespace      vispillo
// @include        http://www.flickr.com/*
// @exclude        http://www.flickr.com/organize*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(function(){
  var magicCookie = getAuthHash();
  if (GM_getValue('safe_search') == undefined) {
    jQuery.get('http://www.flickr.com/account/prefs/safesearch/',function (data,text) {
      var resp = $(data);
      GM_setValue('safe_search',resp.find('input[type=radio]:checked').val());
      resp.find('form input[type=checkbox]').each(function (i,item) {
        GM_setValue(item.id,item.checked);
      });
    });
  }
  var opacities = [.6, .6, .6 ];
  var cursors   = ['pointer','pointer','pointer'];
  opacities[GM_getValue('safe_search')] = 1;
  cursors[GM_getValue('safe_search')] = 'default';
  
  $('<li>' ).attr('id','safesearchcontainer').attr('style','margin:3px 0 0 0').addClass('no_menu_li').appendTo($('#flickr_nav > ul'));
  $('<img>').attr('width',15).attr('height',15).attr('style','cursor:'+cursors[0]+';opacity:'+opacities[0]).attr('src','http://l.yimg.com/g/images/spaceout.gif').attr('id','set-ss-safe').addClass('f-sprite fs-icon_public force-left privacy-icons'       ).appendTo($('#safesearchcontainer'));
  $('<img>').attr('width',15).attr('height',15).attr('style','cursor:'+cursors[1]+';opacity:'+opacities[1]).attr('src','http://l.yimg.com/g/images/spaceout.gif').attr('id','set-ss-mod' ).addClass('f-sprite fs-icon_a_bit_private force-left privacy-icons').appendTo($('#safesearchcontainer'));
  $('<img>').attr('width',15).attr('height',15).attr('style','cursor:'+cursors[2]+';opacity:'+opacities[2]).attr('src','http://l.yimg.com/g/images/spaceout.gif').attr('id','set-ss-rest').addClass('f-sprite fs-icon_private force-left privacy-icons'      ).appendTo($('#safesearchcontainer'));
  $('#safesearchcontainer img').click(clickHandler);
  
  if (document.location.href.indexOf('flickr.com/account/prefs/safesearch/') != -1 ) {
    $('input[name=Submit2]').click(storeSettings);
  }
  function storeSettings () {
    GM_setValue('safe_search',$('input[type=radio]:checked').attr('value'));
    $('form input[type=checkbox]').each(function (i,item) {
      GM_setValue(item.id,item.checked);
    });
  }
  function clickHandler ( ev ) {
    var values = {'set-ss-safe':0, 'set-ss-mod':1, 'set-ss-rest':2};
    $('#'+ev.target.id).attr('height',8).attr('width',16).attr('src','http://l.yimg.com/g/images/progress/balls-16x8-white.gif');
    GM_setValue('safe_search',values[ev.target.id]);
    var params = {
      'Submit2':'SAVE CHANGES',
      'done':1,
      'magic_cookie': magicCookie,
      'prefs_other': GM_getValue('prefs_other') ? 1 : 0,
      'prefs_screenshots': GM_getValue('prefs_screenshots') ? 1 : 0,
      'prefs_video': GM_getValue('prefs_video') ? 1 : 0,
      'safe_search': values[ev.target.id],
    };
    jQuery.post('http://www.flickr.com/account/prefs/safesearch/',params,
      function () {
        var opacities = [.6, .6, .6 ];
        var cursors   = ['pointer','pointer','pointer'];
        opacities[GM_getValue('safe_search')] = 1;
        cursors[GM_getValue('safe_search')] = 'default';
          $('#set-ss-safe').attr('height',15).attr('width',15).attr('src','http://l.yimg.com/g/images/spaceout.gif').attr('style','cursor:'+cursors[0]+';opacity:'+opacities[0]);
          $('#set-ss-mod' ).attr('height',15).attr('width',15).attr('src','http://l.yimg.com/g/images/spaceout.gif').attr('style','cursor:'+cursors[1]+';opacity:'+opacities[1]);
          $('#set-ss-rest').attr('height',15).attr('width',15).attr('src','http://l.yimg.com/g/images/spaceout.gif').attr('style','cursor:'+cursors[2]+';opacity:'+opacities[2]);
      }
    );
  }
  function getAuthHash () {
    // Credit for this function goes to Alesa Dam
    // Some slight modifications for use with jQuery
    var reMatch = /global_auth_hash[ =]+\'([^\']+)\'/;
    var retval;
    $('script[type=text/javascript]').each( function (i,script) {
            if (retval != undefined) {
                return;
            }
            var html = script.innerHTML;
            if (html.match(reMatch)) {
                try {
                    retval = html.match(reMatch)[1];
                } catch (e) {
                    GM_log("error executing RegExp: " + e);
                    retval = undefined;
                }
            }
        });
        if (retval == undefined) { // new photo page layout?
            reMatch = /\"?auth_hash\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/;
            $('script').each( function (i,script) {
                    if (retval != undefined) {
                        return;
                    }
                    var html = script.innerHTML;
                    try {
                        retval = html.match(reMatch)[1];
                    } catch (e) {
                        GM_log("error executing RegExp (yconf): " + e);
                    }
            });
    }
    return retval;
  }
});

