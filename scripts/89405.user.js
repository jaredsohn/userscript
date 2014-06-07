(function () {
// ==UserScript==
// @name           Traditional Twitter RT (re-mixed) FF + Chrome
// @namespace      http://blog.thrsh.net
// @author         cecekpawon (THRSH)
// @description    Old School RT Functionality for New Twitter, Allows retweeting with Comments
// @version        5.1
// @updateURL      https://userscripts.org/scripts/source/89405.meta.js
// @match          http://twitter.com/*
// @match          https://twitter.com/*
// @run-at         document-start
// ==/UserScript==

const yodUpdate = {
  script_id : 89405,
  script_version : '5.1',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
}

function usoUpdate() {
  TWRT.$('<script/>', {type: 'text/javascript', src: '//usoupdater.herokuapp.com/?id=' + yodUpdate.script_id + '&ver=' + yodUpdate.script_version}).appendTo('head');
}

var TWRT = {};
TWRT.$ = null;
TWRT.UW = null;
TWRT.debug = 0;
TWRT.GRID = false;

// GLOBAL Variable
TWRT.setting_def = { yodEmote: 0, yodOption: 0, yodRT: "RT", yodAdvTop: 1, yodSound: 1, yodSoundVol: 7, yodGeo: 1, yodAuto140: 0, yodExpand: 1, yodMute: 1, yodMuteLists: '', yodMuteListsString: '', yodLastMention: 1, yodMarkMention: 1, yodLastData: 1, yodScreenName: '', yodLastInDMsg: 0, yodGIFAva: 1, yodGeo: 1, yodRTReply: 1, yodActRT: 1, yodActFB: 1, yodActStalking: 1, yodPromoted: 1, yodKeepBR: 1, yodBodyBG: 1 };
TWRT.setting = {};
TWRT.symbols = {
  reg: ('\\m/ ||| d(^_^)b ||| (^_^) ||| \\(^_^)/ ||| v(^_^)v ||| (*-*) ||| (*_*) ||| (T_T) ||| (!__!) ||| m(_ _)m ||| (>_<) ||| (=_=) ||| (-.-)Zzz ||| (-_-*) ||| (^_~) ||| (._.) ||| (<.<) ||| (-__-) ||| (@_@) ||| (X_X) ||| ($_$) ||| ( .__.)/||').split('|||'),
  utf: ('\u2605 | \u00B1 | \u00bd | \u2122 | \u2260 | \u2190 | \u2191 | \u2192 | \u2193 | \u2194 | \u00ab | \u00bb | \u25ba | \u266b | <( \u203e\u25bf\u203e)-\u03c3 | \u2512(\u0283\u0283\u0283_-)\u250e').split('|')
};

TWRT.css = '\
#global-actions {float:left!important;}\
.yodLegend legend{margin:auto!important;line-height:inherit!important;font-size:12px!important;font-weight:bold!important;text-align: center!important; padding: 0 5px!important; width: auto!important;border:none !important;}\
.yodLegend fieldset{border:none;}\
.yodLegend ul:not(:last-child) {margin-bottom:10px!important;}\
.yodLegend .tablex{font-size:11px!important;margin: 5px auto; width: 98%;}\
.yodLegend .tablex ul {text-align: center;}\
.yodLegend .tablex li {display: inline-block;cursor:pointer!important;min-width:15%;padding: 2px 0;}\
.yodLegend .tablex li:hover {font-size: 20px;font-weight: bold;}\
.yodLegend .tablex > div {display: inline-table; margin-right:5px}\
.yodShow {display: block !important;}\
.yodHide {display: none !important;position:absolute !important; left:-1000px !important; top:-1000px; !important}\
.fShow {border-top:solid 1px #CCC !important;}\
.fHide {}\
#yodSpace{padding: 10px 20px 20px;text-align: center}\
#yodSpace > div:not(:first-child) {margin-top:10px}\
#yodSpace .btn, #yodSpace checkbox, #yodSpace legend, #yodSpace label, #yodSpace li {cursor:pointer}\
#yodSpace .btn {padding:2px 5px!important}\
#yodRTCopyLeft{font-size:11px; text-align: center;border-top: 1px solid #CCC;}\
#yodRTOption > div {display: inline-table; margin-right:5px}\
#yodRT {margin-left: 5px;width:50px!important;padding:0 3px!important}\
span.geo-text{width:auto!important;}\
.yodSpace_ireply{padding: 5px 0 10px;}\
.yodSpace_ireply_wrapper{text-align: center;}\
.yodSpace_ireply_wrapper > a {display:inline-table;margin: 0 2px;}\
.forme {background-color: rgba(255,255,0,.3);}\
.debug {border:10px solid red!important;}\
div[id^=yod_tw_id] {color:red!important;font-size: 11px!important;background-color: black!important;display: inline!important;padding: 1px 3px!important;}\
#yodAdvTopEl {color:#66757F;width: 10px; margin: 10px; cursor: pointer; float:left!important;}\
#yodAdvTopEl > div {height: 13px;}\
.btn.yod-rt {float:left!important;}\
.tx_muted {margin-top: 10px;width: 100%;}\
.tx_muted textarea {width: 100%;resize:vertical;}\
.yodActions {}\
.yodActions_grid {float: left; margin-right: 31px;}\
.tweet-actions a, .tweet-actions button {margin-left: 5px!important}\
.tweet-inverted .yodActions .sm-more {background-position: -280px -250px!important;}\
#yodSoundVol{width: 50px; margin-left: 5px;}\
.yodmute_w {padding-left: 20px!important;}\
';

function createSound(play) {
  if (!(sound = elExists('#yodnotify'))) {
    var a_src = 'data:audio/ogg;base64,\
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\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAA\
ABDgAAAQYCEUGrIiAIgTAHBIEiQJkgTNA0iWBU2DpsE0AZJlQdOgaTBNAAAAAAAAAAAAACRN\
g6ZB0yCKAEnToGnQNIgiAAAAAAAAAAAAAJKmQdOgaRBFgKRp0DRoGkQRAAAAAAAAAAAAAM80\
IYoQRZgmwDNNiCJEEaYJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAABhwAAAIMKEMFBqyIgCI\
EwBwOIplAQCA4ziWBQAAjuNYFgAAWJYligAAYFmaKAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAGHAAAAgwoQwU\
GrISAIgCAHAoimUBx7Es4DiWBSTJsgCWBdA8gKYBRBEACAAAKHAAAAiwQVNicYBCQ1YCAFEA\
AAbFsSxNE0WSpGmaJ4okSdM8TxRpmud5nmnC8zzPNCGKomiaEEVRNE2YpmmqKjBNVRUAAFDg\
AAAQYIOmxOIAhYasBABCAgAcimJZmuZ5nieKpqmaJEnTPE8URdE0TVNVSZKmeZ4oiqJpmqaq\
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\
uD2DR7PhfhGW2hASnixtSABgpwA=\
';

    sound = TWRT.$('<audio/>', {type:'audio/ogg; codecs=vorbis', src: a_src, id: 'yodnotify', class: 'yodHide', controls: false, loop: false, autoplay: false});
    TWRT.$('body').append(sound);
    setSoundVol();
  }

  switch (play) {
    case 'play':
      play = doyodGetBoolOpt('yodSound');
      break;
    case 'force':
      play = 1;
      break;
    default:
      play = 0;
  }

  if (sound && play) sound.get(0).play();
}

function fixSoundVol(vol) {
  var volx;
  vol = parseInt(yodfixInt(vol));
  if (vol > 9) {
    vol = 10; volx = 1;
  } else {
    //volx = vol.toString().trim().replace(/^(\d){0,1}/g, "0,$1");
    volx = '0.' + vol;
  }
  var a = {v: vol, x: volx};
  return a;
}

function setSoundVol(vol) {
  if (!vol) vol = TWRT.setting['yodSoundVol'];
  var a = fixSoundVol(vol);
  saveSetting('yodSoundVol', a.v);
  if (sound = elExists('#yodnotify'))
    sound.get(0).volume = a.x;
}

function getSoundVol() {
  var sound, volx;
  var a = fixSoundVol(TWRT.setting['yodSoundVol']);
  saveSetting('yodSoundVol', a.v);
  return a;
}

function getValue(key, TW) {
  var val = localStorage.getItem(key);
  if (TW) val = JSON.parse(val);
  return val;
}

function setValue(key, val, TW) {
  if (TW) val = JSON.stringify(val);
  localStorage.setItem(key, val);
  return false;
}

function readSetting(s) {
  var str = getValue('yod_' + TWRT.setting['yodScreenName'] + '_twitsett');
  if (str = IsJsonString(str)) {
    TWRT.setting = str;
    if (!s) {
      for (var a in TWRT.setting_def) {
        if (!TWRT.setting.hasOwnProperty(a)) TWRT.setting[a] = TWRT.setting_def[a];
      }
    }
  } else {
    TWRT.setting_def['yodScreenName'] = TWRT.setting['yodScreenName'];
    TWRT.setting = TWRT.setting_def;
  }
  if (!s) saveSetting();
  else if (TWRT.setting.hasOwnProperty(s)) return TWRT.setting[s];
}

function saveSetting(k, v) {
  if (k) TWRT.setting[k] = v;
  setValue('yod_' + TWRT.setting['yodScreenName'] + '_twitsett', JSON.stringify(TWRT.setting));
}

function doyodGetBoolOpt(key, def) {
  readSetting();
  var val = parseInt(yodfixInt(TWRT.setting[key]));
  if (def) {
    val = parseInt(yodfixInt(TWRT.setting_def[key]));
    saveSetting(key, val);
  }
  return val;
}

function doyodGetNumOpt(key, def) {
  readSetting();
  var val = yodfixInt(TWRT.setting[key]);
  if (def) {
    val = yodfixInt(TWRT.setting_def[key]);
    saveSetting(key, val);
  }
  return val;
}

function o_debug(str) {
  if (TWRT.debug) console.log(str.toString() || '');
}

function yodfixInt(str) {
  if (!str) return 0;
  if (typeof str !== 'string') str = str.toString();
  str = str.replace(/[^0-9]/gmi, '');
  return str ? str : 0;
}

function IsJsonString(str) {
  try {
    str = JSON.parse(str);
    if (typeof str === 'object') return str;
  } catch (e) {}
  return false;
}

function yodUnique(Array) {
  return (typeof Array !== 'object') ? [] : TWRT.$.unique(removeEmptyArrayElements(Array));
}

function removeEmptyArrayElements(arr) {
  return arr.filter(function(elem){return elem !== null && elem !== ''});
}

function yodInArray(id, strArray) {
  if (typeof strArray !== 'string') strArray = yodUnique(strArray).join(',');
  var pattcontent = new RegExp(',?\s?(.*' + id + '+)\s?,?');
  return strArray.match(pattcontent);
}

function elExists(s, el) {
  var e = el ? el.find(s) : TWRT.$(s);
  return e.length ? e : 0;
}

function goParent(s, el) {
  var e = el.parents(s); if (e.length) return e;
}

function toClick(el) {
  var clickEvent  = document.createEvent('MouseEvents');
  clickEvent.initEvent('click', true, true);
  el.get(0).dispatchEvent(clickEvent);
}

function doKeyTouch(key) {
  var k, keys = key.toString().split(' ');
  for (var a in keys) {
    if (k = keys[a]) {
      var e = TWRT.$.Event('keydown', { keyCode: k });
      TWRT.$('body').trigger(e);
    }
  }
}

function deEntity(str, raw) {
  var el;
  if (el = elExists('#yodEVALdump')) {
    el.html(str);
    str = raw ? el.html() : el.val();
    el.empty();
  }

  return str;
}

function br2nl(s) {
  return s.replace(/<br\s?\/?>/gi, "\r\n");
}

function re_BR(s) {
  s = deEntity(ytrim(s), true);
  if (TWRT.setting['yodKeepBR'])
    s = s.replace(/(\r\n|\r|\n)/gmi, "<br />");
  return s;
}

function ytrim(s, keepBR) {
  var str = '';
  if (!(str = deEntity(s.toString(), true))) return str;
  str = str.replace(/(&nbsp;+)/gm, ' ');
  if (!keepBR) {
    str = str.replace(/[\r\n]/gm, ' ').trim()
    .split(/\s*\n\s*/)
    .join(' ');
  }

  return str.replace(/[ ]{2,}/gm, ' ').trim();
}

function compareDate(e) {
  var data_item_id = 0, key = 'yodLastData';
  try {data_item_id = yodfixInt(e.attr('data-item-id')) || 0;} catch (e) { return data_item_id; }
  var val = doyodGetNumOpt(key);
  if (data_item_id > val) {
    saveSetting(key, data_item_id);
  }
  return data_item_id;
}

function yodGetTweetBox() {
  return elExists('#tweet-box-global');
}

function yod_isHome() {
  return elExists('div[class*=mini-profile]');
}

function yod_isProfile(elx) {
  return elExists('div[class*=user-actions]', elx);
}

function yod_gallery() {
  TWRT.$(this).find('[class*=media-thumbnail]').not('.yodDone').each(function() {
    var el = TWRT.$(this);
    //el.show();
    el.addClass('yodDone');
    if (src = el.attr('data-url')) {
      if (yodInArray(encodeURIComponent(src), TWRT.yodImg_arr)) {
        el.hide();
        //el.addClass('debug');
      } else {
        TWRT.yodImg_arr.push(encodeURIComponent(src));
      }
    }
  });
}

function delContent(el, par) {
  if (par) {
    el.addClass('yodLinkParsed');
    el = el.parent();
  }
  el.slideUp('slow', function() {
    //TWRT.$(this).remove();
    //TWRT.$(this).addclass('yodHide');
  });
}

function fixGeo() {
  if (doyodGetBoolOpt('yodGeo')) {
    TWRT.$('.yodGeo.parsed').removeClass('yodHide');
    TWRT.$('.yodnoGeo').addClass('yodHide');
  } else {
    TWRT.$('.yodnoGeo').removeClass('yodHide');
    TWRT.$('.yodGeo.parsed').addClass('yodHide');
  }
}

function getFB(el) {
  var str = 'javascript:void(0);';
  if (str = el.find('a.js-permalink').attr('href')) {
    var fb_url = ytrim('http://twitter.com' + str || '');
    var fb_desc = ytrim(el.find('.js-tweet-text').eq(0).text() || '');
    var fb_ava = ytrim(el.find('.js-action-profile-avatar').eq(0).attr('src') || '').replace(/_normal/gmi, '');
    str = 'http://m.facebook.com/dialog/feed?app_id=2231777543&redirect_uri=https%3A%2F%2Fwww.facebook.com&to&display=touch'
      + '&caption=' + encodeURIComponent(fb_url)
      + '&description=' + encodeURIComponent(fb_desc)
      + '&link=' + encodeURIComponent(fb_url)
      + '&picture=' + encodeURIComponent(fb_ava);
  }
  return str;
}

function getRTby(entry) {
  var a = {};
  if (entry.attr('data-retweet-id')) {
    if (el = elExists('.js-retweet-text > a', entry)) {
      if (a.id = el.attr('data-user-id')) {
        if (str = el.attr('href')) {
          a.uname = str.replace(/\//g, '');
          return a;
        }
      }
    }
  }
}

function yod_render(newtweet) {
  var is_Home, is_Profile, mutesx;

  if (newtweet) {
    is_Home = yod_isHome();
    is_Profile = yod_isProfile();
    mutesx = doyodGetBoolOpt('yodMute') ? readMuteLists('yodMuteLists') : '';
  }

  TWRT.$('.js-stream-tweet, .permalink-tweet').not('.yodDone').each(function() {
    var data_item_id, parEntry, entry = TWRT.$(this);
    if (goParent('[class*=proxy]', entry)) return true;
    if (!(parEntry = entry.parent())) return true;

    // add parsed class
    entry.addClass('yodDone');

    var owntweet = entry.hasClass('my-tweet');
    var el, el2, str, str2, data_type = parEntry.attr('data-item-type') || '';

    mutesy = doyodGetBoolOpt('yodMute2') ? TWRT.mutesString : '';
    if (!owntweet && newtweet && mutesy/* && is_Home*/ && data_type.match(/tweet/i)) {
      txt = entry.find('.js-tweet-text').eq(0).text();
      if (txt) {
        pattmutesy = new RegExp('\s?' + mutesy + '\s?', 'gmi');
        if (txt.match(pattmutesy)) {
          delContent(entry, 1);
        }
      }
    }

    translate_link(entry);

    if (!entry.hasClass('yodLinkParsed')) {
      entry.addClass('yodLinkParsed');

      if (data_item_id = yodfixInt(entry.attr('data-item-id'))) {
        //el = entry.find('.tweet-actions > li').first();
        el = entry.find('.js-actions > li').first();

        var yodActions_class = 'yodActions';
        if (TWRT.GRID) {
          yodActions_class += ' yodActions_grid';
        }

        TWRT.$('<li/>', {class: 'yodActFB' + yodActions_class})
          .append(
            TWRT.$('<a/>', {id: 'FB_' + data_item_id, title: 'Share to facebook', role: 'button', class: 'with-icn', html: '<i class="sm-more"></i> <b>[FB]</b>', href: getFB(entry), target: '_blank'})
          ).insertBefore(el);

        TWRT.$('<li/>', {class: 'yodActRT' + yodActions_class})
          .append(
            TWRT.$('<a/>', {id: 'RT_' + data_item_id, title: 'Trad RT', role: 'button', class: 'with-icn', html: '<i class="sm-more"></i> <b>[RT]</b>', href: '#'})
          ).insertBefore(el);

        TWRT.$('<li/>', {class: 'yodActStalking' + yodActions_class})
          .append(
            TWRT.$('<a/>', {id: 'STALKING_' + data_item_id, title: 'Stalking', role: 'button', class: 'with-icn', html: '<i class="sm-more"></i> <b>[S]</b>', href: '#'})
          ).insertBefore(el);

        TWRT.$(document).on('click', 'a#FB_' + data_item_id, function() {
          TWRT.UW.open(this.href);
          return false;
        });

        TWRT.$(document).on('click', 'a#RT_' + data_item_id, function() {
          yod_toRT(TWRT.$(this));
          return false;
        });

        TWRT.$(document).on('click', 'a#STALKING_' + data_item_id, function() {
          yod_toStalk(TWRT.$(this));
          return false;
        });
      }

      if (el = entry.find('i.sm-geo').not('.parsed')) {
        if (el = goParent('.stream-item-footer', el)) {
          if (el = el.find('b > .expand-stream-item')) {
            el.addClass('yodGeo parsed');
            el2 = TWRT.$('<span/>', {class: 'expand-action-wrapper yodnoGeo yodHide', html: 'Expand'});
            el2.insertAfter(el);
          }
        }
      }

      if (newtweet) {
        if (!is_Profile && data_type) {
          var data_item_id, data_mentions = entry.attr('data-mentions') || '';
          if (!(data_item_id = compareDate(entry))) return true;

          var pattcontent = new RegExp('\s?' + TWRT.setting['yodScreenName'] + '\s?', 'gmi');
          if (data_mentions.match(pattcontent)) {
            var valLastMention = doyodGetNumOpt('yodLastMention');

            if (valLastMention < data_item_id) {
              TWRT.$('.forme').removeClass('forme');

              saveSetting('yodLastMention', data_item_id);

              if (!owntweet) {
                createSound('play');

                if (!data_type.match(/activity/i)) {
                  if (doyodGetBoolOpt('yodMarkMention')) entry.addClass('forme');
                }
              }
            }
          }
        }
      }
    }
  });

  fixGeo();
}

function translate_link(e) {
  if (!(e = TWRT.$(e.currentTarget || e))) return;
  if (!(e = elExists('[class*=js-tweet-text]', e))) return;
  e = e.eq(0);

  var el;
  if (el = elExists('#yodRTdump')) {
    el.html(e.html());

    var mod = 0;

    el.contents().filter(function() {
        return this.nodeType === 3;
    }).each(function() {
      var de =  deEntity(this.textContent);
      if (de !== this.textContent) {
        this.textContent = deEntity(this.textContent);
        mod++;
      }
    });

    var decoded = deEntity(unescape(e.text().trim()));

    // collect links
    el.find('a[data-expanded-url]').each(function() {
      var link = TWRT.$(this);
      var a1 = link.attr('data-ultimate-url') || '';
      var a2 = link.attr('data-expanded-url') || '';

      if (longURL = a1 || a2) {
        link.html(longURL).attr({href: longURL});
        mod++;
      }

      if (!doyodGetBoolOpt('yodGeo')) {
        if (link.attr('href').match(/myloc/i)) {
          link.remove();
          mod++;
        }
      }
    });

    //var decoded2 = deEntity(unescape(el.text().trim()));
    var decoded2 = unescape(el.text().trim());

    // is_entity / expanded links
    if (mod || (decoded !== decoded2)) {
      //e.html(deEntity(el.html()));
      e.html(el.html());
    }
  }

  el.empty();
}

function yodShowTweetBox(s, c, RT) {
  doKeyTouch('27');

  var nt, txa, content = TWRT.setting['yodRT'] + ' @' + s + ': ' + c;
  if (RT) content = TWRT.setting['yodRT'] + ' @' + RT + ': ' + content;

  if (nt = elExists('#global-new-tweet-button')) {
    if (doyodGetBoolOpt("yodAuto140")) content = toyodRTFit140(content);/*
    setValue('__draft_tweets__:global', content, 1);*/

    toClick(nt);

    if (txa = elExists('#global-tweet-dialog .tweet-box:visible, #tweet_dialog .twitter-anywhere-tweet-box-editor:visible'))
      txa.html(content).focus().change();
  }
}

function yod_toRT(e) {
  var entry, screen_name, RT, parent;

  if (parent = elExists(TWRT.$(e).parents('.yodDone'))) {
    e = parent.parent();
  }

  if (!(entry =
    elExists('div.js-stream-tweet', e)
    || elExists('div.twttr-dialog-content', e)
  )) return;

  if (!(screen_name = entry.attr('data-screen-name'))) return;
  if (RT = getRTby(entry)) RT = RT.uname;
  if (!(entry = elExists('[class*=js-tweet-text]', entry))) return;

  entry = entry.eq(0).text();
  entry = stripUser(entry, false, TWRT.setting['yodKeepBR']);
  yodShowTweetBox(screen_name, re_BR(entry), RT);
}

function yod_toStalk(e) {
  var entry, screen_name, RT;

  e = TWRT.$(e).parents('.yodDone').parent();

  if (!(entry =
    elExists('div.js-stream-tweet', e)
    || elExists('div.twttr-dialog-content', e)
  )) return;

  if (!(screen_name = entry.attr('data-screen-name'))) return;

  document.location.href = "https://twitter.com/search?q=\"" + screen_name + "\"%20%40" + screen_name + "&f=realtime";
}

function yod_rtDiag(e/*, e2*/) {
  var txt, target, elx = TWRT.$(/*e2 || */e.currentTarget);
  if (elExists('.yod-rt', elx)) return false;

  if (target = elExists('button.cancel-action, div.js-prompt-cancel', elx)) {
    return target.clone()
      .html('RT')
      .attr('class', 'btn yod-rt')
      .click(function(){
        yod_toRT(elx);
      })
      .appendTo(target.parent());
  } else {
    yod_goDiag(e);
  }
}

function cleanMuteLists(str) {
  return ytrim(ytrim(str).replace(/(\s,|,\s)/gm, ',').replace(/[,]{2,}/gm, ',')).replace(/^,/gm, '').replace(/,$/gm, '').trim();
}

function readMuteLists(target_str, a, save) {
  var str = cleanMuteLists(readSetting(target_str).toString()) || '';
  var arr = yodUnique(str.split(','));
  if (save) saveSetting(target_str, arr.join(','));
  return a ? arr : str;
}

function prettyMuteLists(target_str, str, el) {
  if (!(str = cleanMuteLists(str))) str = '';
  str = str.replace(/,/gm, ', ');
  if (!el)
    if (el = elExists('#' + target_str)) el.val(str);
  return str;
}

function checkMute(id, u, e, check) {
  target_str = 'yodMuteLists';
  var mutesx = readMuteLists(target_str, 1);
  var el, x, b = mutesx;
  for (var i in mutesx) {
    var s = mutesx[i];
    if (!s.match(/[0-9]{8,}/)) b.splice(mutesx.indexOf(s.trim()), 1);
  }

  var s1 = 'M'; var s2 = 'Mute this user';
  if (x = yodInArray(id, b.join(','))) {
    if (check) {
      s1 = 'U' + s1; s2 = 'UN-' + s2;
    } else {
      b.splice(b.indexOf(x[0]), 1);
    }
  } else {
    if (!check) {
      s1 = 'U' + s1; s2 = 'UN-' + s2;
      b.push(u);
    }
  }

  var str = doyodGetBoolOpt('yodMute') ? '' : '(disabled)';

  //TWRT.$(e).html(str + '<strong>' + s1 + '</strong>').attr('title', s2 + str);
  if (table = elExists(TWRT.$(e).parents('table'))) {
    e = table;
    s1 = '<strong>' + s1 + '</strong>';
  }
  TWRT.$(e).find('.yodmutelabel').html(str);
  TWRT.$(e).find('.yodmutevalue').html(s1);
  TWRT.$(e).attr('title', s2 + str);

  if (!check) {
    b = yodUnique(b);
    mutesx = b.join(',');
    saveSetting(target_str, mutesx);
    prettyMuteLists(target_str, mutesx);
    doCSS_dyn();
  }
}

function yod_BodyBG() {
  TWRT.$('body[class*=user-style-]').addClass('yodBodyBG');
}

function embedMute(elx) {
  var el, s, tw_id, u, popup = elx, id = 'yodMuteButtPop';
  if (!elx) { elx = TWRT.$('body'); id = 'yodMuteButt'; }


/*

  ____  _    _
 / __ \| |  | |
| |  | | |__| |
| |  | |  __  |
| |__| | |  | |
 \____/|_|  |_|















 ______   _______  _______  _______  _______  ______
(  ___ \ (  ___  )(  ___  )(  ___  )(  ___  )(  __  \
| (   ) )| (   ) || (   ) || (   ) || (   ) || (  \  )
| (__/ / | (___) || (___) || (___) || (___) || |   ) |
|  __ (  |  ___  ||  ___  ||  ___  ||  ___  || |   | |
| (  \ \ | (   ) || (   ) || (   ) || (   ) || |   ) |
| )___) )| )   ( || )   ( || )   ( || )   ( || (__/  )
|/ \___/ |/     \||/     \||/     \||/     \|(______/

 _______  _______  ______  _________ _        _______
(  ____ \(  ___  )(  __  \ \__   __/( (    /|(  ____ \
| (    \/| (   ) || (  \  )   ) (   |  \  ( || (    \/
| |      | |   | || |   ) |   | |   |   \ | || |
| |      | |   | || |   | |   | |   | (\ \) || | ____
| |      | |   | || |   ) |   | |   | | \   || | \_  )
| (____/\| (___) || (__/  )___) (___| )  \  || (___) |
(_______/(_______)(______/ \_______/|/    )_)(_______)

*/

  TWRT.GRID = elExists('.GridTimeline') ? true : false;

  if (s = yod_isProfile(elx)) {
    //if (el = elExists('[class*=js-mini-profile-stats]', elx)) {

    var profile_grid_el = elExists('[class*=ProfileNav]', el), profile_grid = !popup && profile_grid_el;
    //if (el = elExists((!popup && TWRT.GRID) ? '[class*=ProfileNav-list]' : '[class*=js-mini-profile-stats]', elx)) {
    if (el = elExists('[class*=js-mini-profile-stats]', elx) || profile_grid_el) {
      //if (elExists('[id=' + id + ']', el)) return;
      if (elExists('[class*=yodmute]', el)) return;
      if (tw_id = s.attr('data-user-id')) {
        u = tw_id + ' (' + s.attr('data-screen-name') + ')';

        var e_mute_w, e_mute;
        if (profile_grid) {
          e_mute_w = TWRT.$('<li/>', {'class': 'ProfileNav-item', id: id});
          e_mute = TWRT.$('<a/>', {
              'class': 'yodmute ProfileNav-stat u-textCenter js-tooltip',
              href: 'javascript:void(0);',
              html: '<span class="ProfileNav-label yodmutelabel"></span><span class="ProfileNav-value yodmutevalue"></span>'
            }).appendTo(e_mute_w);
          e_mute_w.insertAfter(el.find('.ProfileNav-item--favorites'));
        } else {
          e_mute = TWRT.$('<a/>', {
              'class': 'yodmute js-nav yodmutevalue',
              id: id,
              href: 'javascript:void(0);'
            });
          el.find('th').parent().append(TWRT.$('<th/>', {'class': 'yodmutelabel yodmute_w'}));
          e_mute_w = TWRT.$('<td/>', {'class': 'yodmute_w'});
          e_mute_w.append(e_mute);
          el.find('td').parent().append(e_mute_w);
        }

        checkMute(tw_id, u, e_mute, 1);

        e_mute.click(function(){
          checkMute(tw_id, u, this);
          return false;
        });

        if (TWRT.debug && (!elExists('#yod_tw_id' + tw_id))) {
          TWRT.$('<div/>', {id: 'yod_tw_id' + tw_id,html: tw_id}).insertBefore(s.find('.fullname'));
        }
      }
    }
  }
}

function yod_profile_popupDiag(e) {
  if (e = e.currentTarget) {
    embedMute(TWRT.$(e));
  }
}

function toCB(id, t, l) {
  var cb = TWRT.$('<input/>', {id: id, name: id, type: 'checkbox'})
    .click(function() {
      saveSetting(TWRT.$(this).attr('id'), this.checked ? 1 : 0);
      switch(id) {
        case 'yodMute':
          var el;
          if (el = elExists('#yodMuteLists')) {
            if (TWRT.$(this).is(':checked')) el.removeAttr('disabled');
            else el.attr('disabled', 'disabled');
          }
        case 'yodMute2':
          var el;
          if (el = elExists('#yodMuteListsString')) {
            if (TWRT.$(this).is(':checked')) el.removeAttr('disabled');
            else el.attr('disabled', 'disabled');
          }
        case 'yodGeo':
          fixGeo();
        case 'yodGIFAva':
        case 'yodActRT':
        case 'yodActFB':
        case 'yodActStalking':
        case 'yodPromoted':
        case 'yodBodyBG':
          doCSS_dyn();
          break;
      }
    });
  if (doyodGetBoolOpt(id)) cb.attr('checked', 'checked');
  return TWRT.$('<div/>')
    .append(
      TWRT.$('<label/>', {title: t, for: id, html: l, class: 'checkbox'})
      .append(cb)
    );
}

function buildEmoTable() {
  var em, el = TWRT.$('<ul/>');

  for (var a in TWRT.symbols) {
    var arr = TWRT.symbols[a];
    for (var i in arr) {
      if (em = arr[i].trim()) {
        TWRT.$('<li/>', {text: em})
        .click(function() {
          yodInsSmiley(TWRT.$(this).text());
          return false;
        }).appendTo(el);
      }
    }
  }

  return el;
}

function yodInsSmiley(text) {
  var target;
  if (text) {
    if (!(target = yodGetTweetBox())) return;

    text = ' ' + deEntity(unescape(text)) + ' ';
    target.focus();
    document.execCommand('insertText', false, text);
    target.focus().change();
  }
}

function yodSoundVol(e) {
  var v_vol;
  if (e) {
    setSoundVol(TWRT.$(e.target).val());
    createSound('force');
  }
  else {
    v_vol = getSoundVol();
    var el, i, v_opt, str, id = 'yodSoundVol';
    for (i = 0; i <= 10; i++) {
      str = '';
      if (i === v_vol.v) str = 'selected=selected';
      v_opt += '<option ' + str + '>' + i + '</option>';
    }
    return TWRT.$('<div/>')
      .append(TWRT.$('<label/>', {title: 'Set Notif Sound Volume', for: id, html: 'Vol'})
        .append(TWRT.$('<select/>', {id: id, html: v_opt}).change(yodSoundVol))
      );
  }
}

function yod_goDiag(e, re) {
  var el, e2, elx, target, txa, rep, placed/*, isreply*/;
  elx = TWRT.$(re || e.currentTarget);

  if (elx[0].tagName) {
    if (!(txa = elExists('textarea[class*=tweet-box-shadow]', elx))) return false;
    if (!(target = elExists('div[class*=tweet-content]', elx))) return false;

    if (placed = elExists('#yodRTOption')) {
      rep = elExists('div[class*=simple-tweet]', elx);

      if (el = elExists('#yodRTCopyReply')) el.addClass('yodHide');
      if (TWRT.$(rep).html()) {
        if (!el) {
          // Inject Copy Reply button
          var div2 = TWRT.$('<div/>', {id: 'yodRTCopyReply'});
          var a = TWRT.$('<a/>', {class: 'btn', html: 'Copy Reply', href: 'javascript:void(0);', title: 'Copy current text reply'})
          .click(function() {
            if (!(source = elExists('[data-tweet-id]', elx))) return;
            toReply('global', source);
            return false;
          }).appendTo(div2);
          placed.append(div2);
        } else
          el.removeClass('yodHide');
      }

      return false;
    }

    // Inject Our Space to Target
    var div = TWRT.$('<div/>', {id: 'yodSpace'});
    var div2 = TWRT.$('<div/>', {id: 'yodRTOption'});

    // Fit 140 - Cut Text to 140 char length
    var div3 = TWRT.$('<div/>');
    var a = TWRT.$('<a/>', {id: 'yodRTFit140', class: 'btn', html: 'Fit 140', href: 'javascript:void(0);', title: 'Fit 140 chars'})
    .click(function() {
      doyodRTFit140('global');
      return false;
    }).appendTo(div3);
    div2.append(div3);

    // Clear TweetBox
    div3 = TWRT.$('<div/>');
    a = TWRT.$('<a/>', {id: 'yodRTClear', class: 'btn', html: 'x', href: 'javascript:void(0);', title: 'Clear TweetBox'})
    .click(function() {
      doyodRTClean('global', true);
      return false;
    }).appendTo(div3);
    div2.append(div3);

    // Clean - freeup space
    div3 = TWRT.$('<div/>');
    a = TWRT.$('<a/>', {id: 'yodRTClean', class: 'btn', html: 'Clean', href: 'javascript:void(0);', title: 'Free Up Space'})
    .click(function() {
      doyodRTClean('global');
      return false;
    }).appendTo(div3);
    div2.append(div3);

    // Clean - my username
    div3 = TWRT.$('<div/>');
    a = TWRT.$('<a/>', {id: 'yodCleanMine', class: 'btn', html: 'Clean @', href: 'javascript:void(0);', title: 'Clean my username'})
    .click(function() {
      doyodMineClean('global');
      return false;
    }).appendTo(div3);
    div2.append(div3);

    // Clean - Hashtags
    div3 = TWRT.$('<div/>');
    a = TWRT.$('<a/>', {id: 'yodHashtagsClean', class: 'btn', html: 'Clean #', href: 'javascript:void(0);', title: 'Clean Hashtags'})
    .click(function() {
      doyodHashtagsClean('global');
      return false;
    }).appendTo(div3);
    div2.append(div3);

    div.append(div2);

    // Emoticons Table
    var state = doyodGetBoolOpt('yodEmote');
    var v_valEmote = state ? 'Show' : 'Hide';

    div.append(
      TWRT.$('<div/>', {id: 'yodEmote', class: 'yodLegend'})
      .append(
        TWRT.$('<fieldset/>', {class: 'f' + v_valEmote})
        .append(TWRT.$('<legend/>', {class: 'f' + v_valEmote, align: 'center', title: 'Toggle Show-Hide', html: '[ Emoticons ]'}))
        .append(
          TWRT.$('<div/>', {id: 'yodEmoteTableWrapper', class: 'tablex yod' + v_valEmote})
          .append(buildEmoTable())
        )
      )
    );

    // OPTION Table
    state = doyodGetBoolOpt('yodOption');
    var v_valOption = state ? 'Show' : 'Hide';
    var v_valRT = readSetting('yodRT');
    mute_target = 'yodMuteLists';
    var v_valMuted = prettyMuteLists(mute_target, readMuteLists(mute_target));
    mute_target2 = 'yodMuteListsString';
    var v_valMuted2 = prettyMuteLists(mute_target2, readMuteLists(mute_target2));

    div.append(
      TWRT.$('<div/>', {id: 'yodOption', class: 'yodLegend'})
      .append(
        TWRT.$('<fieldset/>', {class: 'f' + v_valOption})
        .append(TWRT.$('<legend/>', {class: 'f' + v_valEmote, align: 'center', title: 'Toggle Show-Hide', html: '[ OPTIONS ]'}))
        .append(
          TWRT.$('<div/>', {class: 'tablex yod' + v_valOption})
          .append(
            TWRT.$('<div/>', {id: 'yodRTTxt'})
            .append(
              TWRT.$('<label/>', {title: 'Opt RT Text', html: 'RT', for: 'yodRT'})
              .append(TWRT.$('<input/>', {id: 'yodRT', name: 'yodRT', type: 'text'}).val(v_valRT))
            )
          )
          .append(yodSoundVol())
          .append(toCB('yodAuto140', 'Auto cut 140 char', '140'))
          .append(toCB('yodAdvTop', 'Top Nav Scroller', 'TopNav'))
          .append(toCB('yodSound', 'Play Sound on new mention', 'Sound'))
          .append(toCB('yodMarkMention', 'Colorize on new mention', 'Mark @'))
          .append(toCB('yodMute', 'Mute user noise', 'Mute User'))
          .append(toCB('yodMute2', 'Mute String noise', 'Mute String'))
          .append(toCB('yodExpand', 'Auto expand new tweets', 'Expand'))
          .append(toCB('yodGIFAva', 'GIF Anim Ava', 'GIF-A'))
          .append(toCB('yodGeo', 'Geo loc', 'Geo'))
          .append(toCB('yodRTReply', 'Copy Reply with RT prefix', 'Copy RT'))
          .append(toCB('yodActRT', 'Inline RT Button', 'Act RT'))
          .append(toCB('yodActFB', 'Inline FB Button', 'Act FB'))
          .append(toCB('yodActStalking', 'Inline Stalking Button', 'Act Stalking'))
          .append(toCB('yodPromoted', 'Twitter Promoted', 'Promoted'))
          .append(toCB('yodKeepBR', 'Keep extra linebreak (new empty line space)', 'Keep Linebreak'))
          .append(toCB('yodBodyBG', 'Keep User custom Background Profile', 'BG Profile'))
          .append(
            TWRT.$('<div/>', {class: 'tx_muted'})
            .append(TWRT.$('<textarea/>', {id: 'yodMuteLists', rows: 4, title: 'Muted lists (ID comma-separated, goto target [popup] profile)'}).val(v_valMuted))
          )
          .append(
            TWRT.$('<div/>', {class: 'tx_muted'})
            .append(TWRT.$('<textarea/>', {id: 'yodMuteListsString', rows: 4, title: 'Muted String lists (comma-separated)'}).val(v_valMuted2))
          )
        )
      )
    );

    // Copyleft
    var str = '\
      Done by <a href="http://blog.thrsh.net" target="_blank" title="Dev Blog">Cecek Pawon 2010</a> \
      (<a href="http://twitter.com/cecekpawon" title="Dev Twitter">@cecekpawon</a>) \
      w/ <a href="http://userscripts.org/' + yodUpdate['script_id'] + '" target="_blank" title="Script Page">\
      Traditional ReTweet (v' + yodUpdate['script_version'] + ')</a>';

    div.append(
      TWRT.$('<div/>', {id: 'yodRTCopyLeft'})
      .append(TWRT.$('<span/>', {class: 'copyleft', html: str}))
    );

    div.insertAfter(target);

    var tx, Opts = ['MuteLists','MuteListsString','RT'];
    for (var a in Opts) {
      if (tx = elExists('#yod' +  Opts[a])) {
        var evts = ['change','paste'];
        tx.on(evts.join (' '), function(e) {
          saveSetting(TWRT.$(this).attr('id'), TWRT.$(this).val());
          if (Opts[a].match(/MuteListsString/i))
            TWRT.mutesString = readMuteLists('yodMuteListsString', 1, 1).join('|');
          doCSS_dyn();
        });
      }
    }

    // yodAdvTop Events
    if (yodAdvTop = elExists('#yodAdvTop')) {
      yodAdvTop.click(function() {
        if (elyodAdvTop = elExists('#yodAdvTopEl')) {
          saveSetting('yodAdvTop', this.checked ? 1 : 0);
          updateScroll();
        }
      });
    }

    if (el = elExists('#yodMuteLists')) {
      if (doyodGetBoolOpt('yodMute')) el.removeAttr('disabled');
      else el.attr('disabled', 'disabled');
    }

    if (el = elExists('#yodMuteListsString')) {
      if (doyodGetBoolOpt('yodMute2')) el.removeAttr('disabled');
      else el.attr('disabled', 'disabled');
    }

    var Opts = ['Emote','Option'];
    for (var a in Opts) {
      if (lgnd = elExists('#yod' +  Opts[a])) {
        var elgnd = elExists('legend', lgnd);
        elgnd.click(function() {
          var lgnd = TWRT.$(this);
          var el = lgnd.next();
          var state = el.is(':visible') ? 0 : 1;
          var sClass = state ? 'Show' : 'Hide';
          el.removeClass('yodShow yodHide').addClass('yod' + sClass);
          el.parent().removeClass().addClass('f' + sClass);
          saveSetting(lgnd.parents('.yodLegend').attr('id'), state);
        });
      }
    }
  }
}

function toyodRTFit140(txt) {
  txt = ytrim(txt, TWRT.setting['yodKeepBR']);
  if (txt.length > 140) {
    txt = txt.substr(0, 138) + '..';
  }
  return txt;
}

function fixDiv(el) {
  s = "";
  el.find("div").each(function(){
    s += "<br>" + TWRT.$(this).text();
  });

  return br2nl(s || el.text());
}

function doyodRTFit140(target, txt) {
  if (!(target = findReply(target))) return;
  txt = toyodRTFit140(txt || fixDiv(target));
  if (txt) {
    target.focus().html(re_BR(txt)).change();
  }
}

function doyodRTClean(target, wipe) {
  if (!(target = findReply(target))) return;
  var txt = wipe ? '' : ytrim(fixDiv(target), TWRT.setting['yodKeepBR']);
  target.focus().html(re_BR(txt)).change();
}

function doyodMineClean(target) {
  if (!(target = findReply(target))) return;
  var txt = ytrim(fixDiv(target), TWRT.setting['yodKeepBR']);
  target.focus().html(re_BR(stripUser(txt, true, TWRT.setting['yodKeepBR']))).change();
}

function doyodHashtagsClean(target) {
  if (!(target = findReply(target))) return;
  var txt = ytrim(fixDiv(target), TWRT.setting['yodKeepBR']);
  txt = txt.replace(/(#[a-z]{1,}[a-z0-9_]+)/ig, "");
  target.html(re_BR(txt));
  target.focus().html(re_BR(txt)).change();
}

function stripUser(str, wipe, keepBR) {
  var pattcontent = new RegExp('@?' + TWRT.setting['yodScreenName'], 'gmi');
  var s = wipe ? '' : TWRT.setting['yodScreenName'];
  return ytrim(str.replace(pattcontent, s), keepBR);
}

function expMentions(str) {
  var x, y = '', a = stripUser(str, true).split(' ');
  for (var i in a) { if (x = a[i]) y += ' @' + x.trim(); }
  return y.trim();
}

function findReply(target) {
  if ((TWRT.$.type(target) === 'string') && target.match(/global/i)) return yodGetTweetBox();
  if (target = goParent('.yodSpace_ireply', TWRT.$(target)))
    return elExists('[data-target]', target.parent());
}

function toReply(el, permaSource) {
  var actor, source, target, RT, txt = '';

  if (!(target = findReply(el))) return;

  if (permaSource) {
    source = permaSource;
  } else {
    var id = target.attr('data-target') || '';
    if (!(id = id.replace(/[^0-9]/g, ''))) return;
    if (!(source = elExists('[data-tweet-id=' + id + ']'))) return;
  }

  if (RT = getRTby(source) || '')
    RT = (doyodGetBoolOpt('yodRTReply') ? ' ' + TWRT.setting['yodRT'] : '') + ' @' + RT.uname + ': ';

  if (!(actor = source.attr('data-screen-name'))) return;
  if (!(source = elExists('[class*=js-tweet-text]', source))) return;
  source = source.eq(0);

  txt = RT + (doyodGetBoolOpt('yodRTReply') ? ' ' + TWRT.setting['yodRT'] : '') + ' @' + actor;
  txt += stripUser(': ' + source.text(), false, TWRT.setting['yodKeepBR']);

  if (doyodGetBoolOpt('yodAuto140')) txt = toyodRTFit140(txt);
  else {
    txt = re_BR(txt);
  }
  target.focus().html(txt).change();
}

function watchReply(e) {
  var el, txa, target, target_box;
  if (!(el = TWRT.$(e.currentTarget || e))) return;
  el = el.parent();

  if (elExists('div.yodSpace_ireply_wrapper', el)) return;
  if (!(txa = elExists('[id^=tweet-box-reply]', el))) return;
  if (!(target = goParent('[class^=inline-reply]', txa))) return;
  if (!(target_box = elExists('.tweet-box', target))) return;

  var y, permalink = false;
  if (y = goParent('[class^=permalink]', target)) permalink = true;
  else if (!(y = goParent('[class^=expan]', target))) return;

  var p = y.clone();
  if (!elExists('[class*=js-tweet-text]', p)) return;

  var d_id = txa.attr('id');
  target_box.attr('data-target', d_id);

  var div = TWRT.$('<div/>', {class: 'yodSpace_ireply'});
  var div2 = TWRT.$('<div/>', {class: 'yodSpace_ireply_wrapper'});
  var b_attr = {class: 'btn', href: 'javascript:void(0);'};

  // Fit 140 - Cut Text to 140 char length
  var a = TWRT.$('<a/>', b_attr)
  .attr('title', 'Fit 140 chars')
  .html('Fit 140')
  .on('mousedown', function(e) {
    if (!e.button) doyodRTFit140(this);
    return false;
  }).appendTo(div2);

  // Clean - freeup space
  a = TWRT.$('<a/>', b_attr)
  .attr('title', 'Free Up Space')
  .html('Clean')
  .on('mousedown', function(e) {
    if (!e.button) doyodRTClean(this);
    return false;
  }).appendTo(div2);

  // Clean my username
  a = TWRT.$('<a/>', b_attr)
  .attr('title', 'Clean my username')
  .html('Clean @')
  .on('mousedown', function(e) {
    if (!e.button) doyodMineClean(this);
    return false;
  }).appendTo(div2);

  // Clean Hashtags
  a = TWRT.$('<a/>', b_attr)
  .attr('title', 'Clean Hashtags')
  .html('Clean #')
  .on('mousedown', function(e) {
    if (!e.button) doyodHashtagsClean(this);
    return false;
  }).appendTo(div2);

  // Copy Reply
  a = TWRT.$('<a/>', b_attr)
  .attr('title', 'Copy current text reply')
  .html('Copy Reply')
  .on('mousedown', function(e) {
    if (!e.button) toReply(this);
    return false;
  }).appendTo(div2);

  target.append(div.append(div2));
}

function yodInlineReply(e) {
  if (e.className.match(/permalink/i)) {
    if (e = goParent('.permalink-tweet-container', TWRT.$(e))) {
      watchReply(e);
    }
  }
  else e.addEventListener('DOMNodeInserted', function(e){watchReply(e);} , true);
}

function expandNewTweet() {
  if (!doyodGetBoolOpt('yodExpand')) return;
  var el;
  if (el = elExists('div.new-tweets-bar')) toClick(el);
}

function checkDM(dm) {
  if (count = yodfixInt(dm.html())) {
    var m_last = yodfixInt(readSetting('yodLastInDMsg')) || 0;
    saveSetting('yodLastInDMsg', count);
    if (count > m_last) {
      createSound('play');
    }
  }
}

function initDM() {
  if (dm = elExists('.dm-new')) {
    dm.bind('DOMSubtreeModified', function(){checkDM(dm)});
  }
}

function initDump() {
  TWRT.$('#yoddump').remove();
  TWRT.$('<div/>', {id: 'yoddump', class: 'yodHide'})
    .append(TWRT.$('<div/>', {id: 'yodRTdump'}))
    .append(TWRT.$('<textarea/>', {id: 'yodEVALdump'}))
  .appendTo('body');
}

function updateScroll() {
  TWRT.$('#yodAdvTopEl > div').removeClass().addClass(doyodGetBoolOpt('yodAdvTop') ? 'yodShow' : 'yodHide');
}

function attachScroll(div, title, xchar, xtop) {
  TWRT.$('<div/>', {text: xchar, title: 'Scroll page to ' + title})
  .click(function(){
    TWRT.$('html, body').animate({scrollTop: xtop ? 0 : TWRT.$('body')[0].scrollHeight}); return false;
  }).appendTo(div);
}

function doAdvTop() {
  var logo;
  if (logo = elExists('#global-actions')) {
    var el = TWRT.$('<div/>', {id: 'yodAdvTopEl'});
    attachScroll(el, 'Top', '\u25B2', true);
    attachScroll(el, 'Bottom', '\u25BC');
    el.insertAfter(logo);
    updateScroll();
    return el;
  }
}

function doCSS() {
  if (elExists('#yod_RT_CSS')) return;
  TWRT.$('<style/>', {id: 'yod_RT_CSS', text: TWRT.css}).appendTo('head');
  TWRT.$('<style/>', {id: 'yod_RT_CSS_dyn'}).appendTo('head');
}

function doCSS_dyn() {
  TWRT.$('#yod_RT_CSS_dyn').empty();

  var str = '', s_css = [];
  var mutesx = readMuteLists('yodMuteLists', 1, 1);
  TWRT.mutesString = readMuteLists('yodMuteListsString', 1, 1).join('|');
  if (doyodGetBoolOpt('yodMute')) {
    for (var i in mutesx) {
      if (!(s = mutesx[i])) continue;
      if (s = s.toString().match(/[0-9]{8,}/))
        var streamblocks = ['home'/*, 'connect'*/, 'discover', 'search'];
        for (var i in streamblocks)
          s_css.push ('.' + streamblocks[i] + '-stream li div.tweet[data-user-id="' + s[0] + '"]');
    }
    if (s_css.length) str += '\r\n' + s_css.join(',') + '{display:none!important;}\r\n'
  }

  if (!doyodGetBoolOpt('yodGIFAva')) {
    str += '.avatar[src*=".gif"]{display:none!important}';
  }

  if (!doyodGetBoolOpt('yodGeo')) {
    str += '.tweet-geo-text,i.sm-geo{display:none!important}';
  }

  if (!doyodGetBoolOpt('yodActRT')) {
    str += '.yodActRT{display:none!important}';
  }

  if (!doyodGetBoolOpt('yodActFB')) {
    str += '.yodActFB{display:none!important}';
  }

  if (!doyodGetBoolOpt('yodActStalking')) {
    str += '.yodActStalking{display:none!important}';
  }

  if (!doyodGetBoolOpt('yodPromoted')) {
    str += '.promoted-tweet, .promoted-trend, .promoted-account{display:none!important}';
  }

  if (!doyodGetBoolOpt('yodBodyBG')) {
    str += '.yodBodyBG{background-image:none!important}';
  }

  TWRT.$('#yod_RT_CSS_dyn').html(str);

  yod_BodyBG();
}

function restart() {
  TWRT.yodImg_arr = [];
  doCSS_dyn();
  readSetting();
  initDump();
  initDM();
  embedMute();
  yod_render(1);
}

function starter() {
  doCSS();
  doAdvTop();
  restart();
}

function doStuff() {
  usoUpdate();

  var el;
  // Go if User Logged
  if (elExists('[class*=global-new-tweet]')) {
    if (!(el = elExists('div > div.js-mini-current-user'))) return;
    if (!(TWRT.setting['yodScreenName'] = el.attr('data-screen-name'))) return;

    starter();

    TWRT.$('div[id*=tweet-dialog]').bind('DOMNodeInserted', yod_rtDiag);
    TWRT.$('div[id*=profile_popup]').bind('DOMNodeInserted', yod_profile_popupDiag);
    //TWRT.$('div[class*=gallery-container]').bind('DOMNodeInserted', yod_render);
    TWRT.$('div[class*=media-grid]').bind('DOMNodeInserted', yod_gallery);

    document.addEventListener('DOMNodeInserted', function (event) {
      try {
        var cname, elmt = event.target;
        if (!(/(DIV|LI)/.test(elmt.tagName))) return;
        if (cname = elmt.className) {
          if (
            (/dashboard/.test(cname))
          ) {
            restart();
          }
          else if (
            (/(stream-item|content|Grid)/.test(cname))
          ) {
            expandNewTweet();
            yod_render(1);
          } else if (
            (/(original|permalink|stream-container)/.test(cname))
          ) {
            doCSS_dyn();
            yodInlineReply(elmt);
            yod_render();
          } else if (
            (/go-to-profile/.test(cname))
          ) {
            yod_render();
          } else {
          }
        } else {
          if (/LI/.test(elmt.tagName) && elExists('.simple-tweet', TWRT.$(elmt))) {
            yod_render();
          }
        }
      } catch (e) {}
    }, false);
  }
}

function doExec() {
  try {
    if (window.chrome && (unsafeWindow == window)) {
      TWRT.UW = (function() {
        var el = document.createElement('a');
        el.setAttribute('onclick', 'return window;');
        return el.onclick();
      }());
    }
    else if (typeof unsafeWindow !== 'undefined') {
      TWRT.UW = unsafeWindow;
    }

    if (typeof TWRT.UW.jQuery === 'undefined') {
      setTimeout(doExec, 200);
    } else {
      TWRT.$ = TWRT.UW.jQuery;
      doStuff();
    }
  } catch (e) {}
}

document.addEventListener("DOMContentLoaded", doExec, true);
})();