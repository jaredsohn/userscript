// -*- c-basic-offset: 2; indent-tabs-mode: nil -*-
// ==UserScript==
// @name Better Route 50
// @namespace http://shinkirou.org/projects
// @description Improve your Route 50 experience!
// @include http://*.route50.net/*
// @include http://route50.net/*
// ==/UserScript==

var win = unsafeWindow || window, locals = { bmBoxShown: false, seShown: false };
window.addEventListener('load', function() {

(function($) {

// type P a = a -> Boolean

// beginsW :: String -> P String
function beginsW(x) {
  return function(y) {
    return y.substr(0, x.length) == x;
  }
}

// or :: P a -> P a -> P a
function or(p, q) {
  return function(x) {
    return p(x) || q(x);
  }
}

const motes = {':!:':"/library/img/eeveemotes/exc.gif", ':heart:':"http://route50.net/library/img/eeveemotes/heart.gif", ':note:':"/library/img/eeveemotes/note.gif", ':smile:':"http://route50.net/library/img/eeveemotes/bigsmile.gif", ':laugh:':"/library/img/eeveemotes/laugh.gif", ':grumpy:':"/library/img/eeveemotes/grumpy.gif", ':mad:':"http://route50.net/library/img/eeveemotes/mad.gif", ':sad:':"/library/img/eeveemotes/sad.gif", ':?:':"/library/img/eeveemotes/que.gif", ':hm:':"/library/img/eeveemotes/hm.gif", ':bleh:':"/library/img/eeveemotes/bleh.gif", ':meow:':"/library/img/eeveemotes/meow.gif", ':gg:':"/library/img/eeveemotes/gg.gif", ':blush:':"/library/img/eeveemotes/blush.gif", ':bulb:':"/library/img/eeveemotes/bulb.gif", ':swt:':"http://route50.net/library/img/eeveemotes/swt.gif", ':argh:':"/library/img/eeveemotes/argh.gif", ':byob:':"/library/img/eeveemotes/byob.gif", ':tongue:':"/library/img/eeveemotes/p2.gif", ':spit:':"/library/img/eeveemotes/tongue.gif", ':pif:':"/library/img/eeveemotes/pif.gif", ':1up:':"http://route50.net/library/img/eeveemotes/1up.gif", ':spin:':"http://route50.net/library/img/eeveemotes/spin.gif", ':lol:':"http://route50.net/library/img/eeveemotes/xD.gif", ':ditto:':"/library/img/eeveemotes/ditto.gif", ':wink:':"/library/img/eeveemotes/wink.gif", ':uneasy:':"http://route50.net/library/img/eeveemotes/uneasy.gif", ':what:':"/library/img/eeveemotes/what.gif", ':ninja:':"/library/img/eeveemotes/ninja.gif", ':pirate:':"http://route50.net/library/img/eeveemotes/pirate.gif", ':shifty:':"http://route50.net/library/img/eeveemotes/shifty.gif", ':umm:':"/library/img/eeveemotes/umm.gif", ':badass:':"/library/img/eeveemotes/badass.gif", ':shades:':"http://route50.net/library/img/eeveemotes/shades.gif", ':drool:':"http://route50.net/library/img/eeveemotes/drool.gif", ':waha:':"/library/img/eeveemotes/waha.gif", ':nom:':"http://route50.net/library/img/eeveemotes/nom.gif", ':rock:':"/library/img/eeveemotes/rock.gif", ':paper:':"/library/img/eeveemotes/paper.gif", ':scissors:':"/library/img/eeveemotes/scissors.gif", ':omg:':"/library/img/eeveemotes/omg.gif", ':P:':"http://route50.net/library/img/eeveemotes/p2.gif", ':tinysmile:':"http://route50.net/library/img/eeveemotes/tinysmile.gif", ':rolleyes:':"http://route50.net/library/img/eeveemotes/rolleyes.gif", ':tear:':"http://route50.net/library/img/eeveemotes/tear.gif", ':sob:':"http://route50.net/library/img/eeveemotes/sob.gif", ':ooh:':"http://route50.net/library/img/eeveemotes/ooh.gif"};

function addBubblemoteSel() {
  var boxHTML = '<div id="bubblemotesbox" style="width: 10em; margin: 1.2em; margin-top: 1.7em; border: 1px solid #99A; background-color: #DDD; padding: 0.5em;">';

  var i = 0, j = 0, y = 0;
  for (var k in motes) {
    boxHTML += '<a href="#" onclick="_insertText($(\'#textmsg\').get(0), \'' + k + '\'); return false;"><img src="' + motes[k] + '" title="' + k + '"/></a>';
  }

  boxHTML += '</div>';

  var a = $('#postbodything form a:last');
  a.after('<a class="c-bigbutton" onclick="_showBubblemotes()">\
<div class="c-rbtl c-rbbl c-rbtr c-rbbr">Bubblemotes</div>\
</a>' + boxHTML);
  var box = $('#bubblemotesbox').hide();
}

function addBaseCSSTools() {
  $('#toolbar #pad').append(
    '<a href="#" class="edit" onclick="_toggleBaseCSS();return false;" accesskey="W">\
       <img src="/library/img/icons/delete.png" /> Toggle Style</a>\
     <a href="#" class="edit" onclick="_showBaseCSSEditor(); return false;">\
       <img src="/library/img/icons/upload.png"> Test Style</a>');
  $('body').prepend(
    '<div id="baseCSSEditor" style="width: 100% !important; background: black; padding: 0;">\
       <form action="/account/style" method="post">\
         <textarea id="bsetext" name="css" style="width: 95%; height: 20em; "></textarea><br />\
         <input type="button" value="Update Style" onclick="_updateStyle(); return false;" />\
         <input type="button" value="Revert" onclick="_loadBaseCSS(); return false;" />' +
         (win.document.userinfo.id == window.location.pathname.split('/').pop() ?
    '       <input type="submit" value="Save Style"\
               onclick="return confirm(\'To continue, You must agree to the Terms and the Code of Conduct.\')" />\
            <input type="hidden" name="agree" value="on" />' : '') +
    '       <input type="button" value="&uarr; Collapse" onclick="_showBaseCSSEditor(); return false;" />\
       </form>\
     </div>');
  $('#baseCSSEditor').hide();
  $('head').append('<style id="newBaseStyle"></style>');
  exports.loadBaseCSS();
}

function getBaseStyle() {
  var ts = win.document.getElementsByTagName('link');
  for (var i = 0, l = ts.length; i < l; i ++)
    if (/\?id=\d+$/.test(ts[i].href)) return ts[i];
}

var exports = {
  showBubblemotes: function() {
    $('#bubblemotesbox')[locals.bmBoxShown ? 'hide' : 'show'](500);
    locals.bmBoxShown = !locals.bmBoxShown;
  },
  insertText: function(box, text) {
    if (box.selectionStart) {
      var st = box.selectionStart;
      box.value = box.value.substr(0, st) + text + box.value.substr(st);
    } else {
      box.value += text;
    }
    box.focus();
  },
  toggleBaseCSS: function() {
    if (!locals.seShown) {
      var style = getBaseStyle();
      style.disabled = !style.disabled;
      $('#newBaseStyle')[0].disabled = true;
    }
  },
  showBaseCSSEditor: function() {
    $('#baseCSSEditor')[locals.seShown ? 'hide' : 'show'](500);
    locals.seShown = !locals.seShown;
    getBaseStyle().disabled = locals.seShown;
    $('#newBaseStyle')[0].disabled = !locals.seShown;
  },
  updateStyle: function() {
    $('#newBaseStyle').html($('#baseCSSEditor textarea').val());
  },
  loadBaseCSS: function() {
    $.ajax({
      url: getBaseStyle().href,
      success: function(t) {
        $('#baseCSSEditor textarea').val(t);
        $('#newBaseStyle').html(t);
      }
    });
  }
};

var handlers = [
  [ or(beginsW('/forum/newthread'), beginsW('/forum/thread/')), addBubblemoteSel ],
  [ beginsW('/base/'), addBaseCSSTools ]
];

var url = window.location.pathname;

for (var i = 0, l = handlers.length; i < l; i ++) {
  // f: test condition g: action
  var f = handlers[i][0], g = handlers[i][1];
  if (f(url)) g(url);
}

for (var k in exports) win['_' + k] = exports[k];

})(win.jQuery);
}, false);
