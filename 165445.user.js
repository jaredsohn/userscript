// ==UserScript==
// @name       Mythic Spoiler Expander
// @namespace  https://github.com/bobisme/magiczoomer
// @version    0.2
// @description  middle click to expand images on mythic spoiler, it rotates fuse cards
// @match      http://mythicspoiler.com/*
// @copyright  2013+, bobisme
// @require    http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==
var popover = $('<div id="popover" style="position:absolute;display:none;transition: all .2s;border-radius: 8px; transform: scale(1) rotate(0);"></div>');
var popoverimage = $('<img style="border-radius: 8px" />');
popover.append(popoverimage);
popover.appendTo('body');
var sidere = /wide\.html$/;

var biggify = function($img, sideways) {
    var w = $img.width(),
      h = $img.height(),
      top = $img.position().top,
      left = $img.position().left,
      props = {
        'box-shadow': '0 0 10px rgba(0,0,0,1.0)'
      };
    popoverimage.attr('src', $img.attr('src'));
    popoverimage.width(w);
    popoverimage.height(h);
    popover.css({
      top: top,
      left: left
    });
    if (sideways === true) {
      props.transform = 'scale(2.0) rotate(85deg)';
    } else {
      props.transform = 'scale(2.0) rotate(0)';
    }
    popover.show(0).promise().done(function() {
      popover.css(props);
    });
  };

function debiggify() {
  popover.css({
    'box-shadow': '0',
    'transform': 'scale(1) rotate(0)',
  });
  setTimeout(function() {
    popover.hide();
  }, 300);
}

function isSideways(href) {
  var matches = ['protectserve', 'profitloss', 'faraway', 'turnburn', 'toiltrouble', 'downdirty', 'armeddangerous', 'weartear', 'alivewell', 'givetake', 'beckcall', 'fleshblood', 'catchrelease', 'readywilling', ];
  for (var i in matches) {
    if (href.search(matches[i]) !== -1) {
      return true;
    }
  }
  return sidere.test(href);
}

$('a > img').parent().on('mousedown', function(ev) {
  if (ev.which == 2) {
    ev.preventDefault();
    biggify($(this).find('img').first(), isSideways(this.href));
  }
});
$(document).on('mouseup', function(ev) {
  if (ev.which == 2) {
    ev.preventDefault();
    debiggify();
  }
});