//           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//                   Version 2, December 2004
//
//Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
//
//Everyone is permitted to copy and distribute verbatim or modified
//copies of this license document, and changing it is allowed as long
//as the name is changed.
//
//           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
//
// 0. You just DO WHAT THE FUCK YOU WANT TO.

// ==UserScript==
// @name        Wykop widget Czarna lista
// @namespace   http://wykop.pl/ludzie/arekarek/
// @include     http://www.wykop.pl/link/*
// @version     1
// @grant       GM_xmlhttpRequest
// @require     http://s1.cdn.imgwykop.pl/js/j/jquery_build_no_838.js
// ==/UserScript==

var URL_ADD = 'http://www.wykop.pl/ajax/profile/blacklistadd/';
var URL_REMOVE = 'http://www.wykop.pl/ajax/profile/blacklistremove/';

function request(url, data, callback){
  GM_xmlhttpRequest({
    method: 'POST',
    url: url,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    onload: function(response) {
      callback();
    }
  });
}

function blacklist_toggle(value, type, isBlacklisted, callback){
  request(
    isBlacklisted ? URL_REMOVE + type + 's' : URL_ADD,
    (isBlacklisted ? 'value=' : 'blacklist%5B' + type + '%5D=') + value,
    callback
  );
}

var widget = '<ul class="slidebutton fleft marginright10">\
<li class="rel slideoptions">\
<a title="Dodaj do czarnej listy" class="tip_right label rel bgfff tdnone button slide small br3"\ id="groupsListsBtn" href="#"><span class="inlblk">wypierdol</span><span class="icon slide3 mini inlblk\ vtop">&nbsp;</span></a>\
<ul id="groupsLists" class="abs bgfff small dnone">\
<li><a href="#" class="block tdnone href blackList user"><span class="icon inlblk checked mini vtop margintop3 fright dnone"> </span>użytkownika</a></li>\
<li><a href="#" class="block tdnone href blackList domain"><span class="icon inlblk checked mini vtop margintop3 fright dnone"> </span>domenę</a></li>\
</ul>\
</li>\
</ul>';

var e = $('.slidebutton.fleft.marginright10').last();
$(widget).insertAfter(e);

var user = $('a[title^="Przejdź do profilu"]').text().trim();
var domain = $('div.small.clr.c999.brtope8.pdingtop5.lheight16.marginleft313 > p > a').first().text().trim();

$('.blackList').bind('click', function(){
  var o = this;
  if(o.lockToggling){
    return false;
  }
  o.lockToggling = true;
  var callback = function(){
    $(o).toggleClass('fbold');
    $(o).find('span').toggleClass('dnone');
    o.lockToggling = false;
  };
  var isUser = $(o).hasClass('user');
  blacklist_toggle(
    isUser ? user : domain,
    isUser ? 'user' : 'domain',
    $(o).hasClass('fbold'),
    callback
  );
  return false;
});

