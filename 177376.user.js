// ==UserScript==
// @name        NYX-@user
// @namespace   http://userscripts.org/scripts/source/177376.user.js
// @description Dodá odkaz na @user v diskusi a odešle zmiňovanému zprávu; přidá odkaz na FB z obrázku hot-linkovaného z FB
// @include     http://www.nyx.cz/index.php?l=topic;*
// @include     http://www.nyx.cz/index.php?l=topicexec
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     2.07
// ==/UserScript==

function addTag (t, startTag, endTag) {
  var s = t.selectionStart;
  var e = t.selectionEnd;
  if (s != e) {
    var v = t.value;
    t.value = v.substr(0, s) + startTag + v.substr(s, e - s) + endTag + v.substr(e, v.length - e);
  }
}

function keyUp (e) {
  if (e.ctrlKey) {
    switch (e.keyCode) {
      case 73:
        addTag(e.target, '<i>', '</i>');
        return false;
        break;
      case 66:
        addTag(e.target, '<b>', '</b>');
        return false;
        break;
    }
  }
  return true;
}

function sendInfoMessage ($recipient, $text) {
  $.ajax({
    'url': 'http://www.nyx.cz/index.php?l=mailexec',
    'type': 'POST',
    'data': {
      'recipient': $recipient,
      'message':	$text,
      'send': 'odeslat'
    },
    'success': function (data) {
    }
  });
}

function sendInfoMessageFromPost ($el, name) {
  var $postInfo = $('div.wh', $el);
  sendInfoMessage(
    name || $('a.nick', $postInfo).text(),
    'Ahoj, zmiňuji Tě ve svém <a href="' + $('a.wl', $postInfo).attr('href') + '">příspěvku</a><br />[Odesláno automaticky prostřednictvím <a href="http://userscripts.org/scripts/show/177376">GM Skriptu</a>]'
  );
}

// Zkontroluj, zda uživatel právě odeslal post s odkazem na jiného uživatele:
$('#topic_form > div.mine').each(function (i, el) {
  var $el = $(el);
  if ($el.hasClass('new')) {
    $('div.wc > div.wci', $el)
      .html()
      .replace(/@(\b[a-z0-9_]+)\b/gi, function (full, parsed) {
        sendInfoMessageFromPost($el, parsed.toUpperCase());
        return full;
      });
  }
});

var $posts = $('#topic_form div.wci')
  .each(function (i, el) {
    // Zkontroluj, zda je v textu postů odkaz na uživatele:
    var $el = $(el);
    $el.html($el.html().replace(/@(\b[a-z0-9_]+)\b/gi, function(full, parsed) {
      return ('<a href="http://www.nyx.cz/index.php?l=people;l2=6&search_type=nick&people_search=' + (parsed.toUpperCase()) + '">' + (full.toUpperCase()) + '</a>');
    }));
  });
// Projdi obrázky v postech:
$('img', $posts).each(function (i, el) {
  var src = el.src;
  // U FB obrázků přidej link:
  if (src.match(/^https:\/\/.*\.fbcdn\.net\/.*$/)) {
    try {
      $(el)
        .wrap('<div style="padding: 0; position: relative; display: inline-block;">')
        .after('<a href="http://facebook.com/' + src.split('/').pop().split('_')[1] + '" style="font-size: 20px; overflow: hidden; font-weight: bold; display: block; background: linear-gradient(#00f, #000); width: 20px; height: 20px; line-height: 20px; color: #fff; text-align: center; position: absolute; right: 5px; top: 5px; border: 2px solid #fff; border-radius: 5px;">f</a>');
    } catch (e) {
    }
  }
});

$('#message_box').bind('keydown', keyUp);