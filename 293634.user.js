// ==UserScript==
// @name       SkyDrive External Links Button
// @namespace  http://shinohane.github.com/
// @version    0.1
// @description  不可視境界線を示す！ Permanent external links from skydrive, useful to share links with friends or apply as source for image/audio
// @match      https://onedrive.live.com/*
// @copyright  2014, shinh
// ==/UserScript==

var sekai = function () {

  // これは謎です
  var $ = jQuery;

  // これは眼帯（封印）でーす
  var $gantai = $('<li><a href="#" role="button"><span>Get Link(s)!</span></a></li>');

  // そして秘密のカラです
  var $kara = $('<div style="position: absolute; left: 120px; top: 60px; width: 457px; height: 310px; background: #FFFFFF; border: 1px solid black; text-align: right;"><textarea style="overflow: auto; width: 417px !important; height: 240px; outline: 0; margin: 10px 10px 10px 10px; display: block;"/><input class="default close" type="button" style="display: inline-block; margin: 0px 10px 10px 10px;" value="Close"/></div>').appendTo('body').hide();

  $kara.find('input.close').click($kara.hide.bind($kara));

  // 眼帯を装備する
  $('.c_cc li:last').before($gantai);

  // 呪われた術
  var arawaru = function () {

    // ここは術の柱
    var $selected = $('.surface .child .isSelected');

    if (!$selected.is('a.file')) {
      // 他にも、柱の形がある
      $selected = $selected.find('a.file');
    }

    // 境界線を具現化する
    var kyoukaisen = $selected.map(function (k, el) {

      var $el = $(el), $parent = $el.parents('.child');

      var filename = $el.attr('aria-label');

      var urikey = $parent.attr('item-key');
      var match = RegExp.prototype.exec.call(
        /^id=([0-9a-z!]*)[&$]/gi, // 境界線の裏で特異点を発見
        decodeURIComponent(urikey)
      ), resid = match && match[1];

      return {
        filename: filename,
        resid: resid
      };

    }).map(function (k, data) {

      // 境界線の歪みを正しくに修正します
      return data.filename + '\n' + 'http://storage.live.com/items/' + data.resid + '?filename=' + encodeURIComponent(data.filename);

    });

    // 人間の文字で示す
    $kara.show().find('textarea').val(Array.prototype.join.call(kyoukaisen, '\n'));

    return false;

  };

  // 眼帯を解除なら現る
  $gantai.click(arawaru);

};

// 世界の始まり
window.addEventListener('DOMContentLoaded', sekai, false);
