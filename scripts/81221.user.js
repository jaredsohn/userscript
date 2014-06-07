// ==UserScript==
// @name           PtP - Replace default avvy with fopkins
// @namespace      http://notsecret.dyndns.org
// @description    Replaces the default avatar with fopkins's avvy
// @author         p4lindromica
// @include        http://*passthepopcorn.me/*
// @include        https://*passthepopcorn.me/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==


$('img').each(function(){
    if ($(this).attr('src') == 'static/common/avatars/default.png')
    {
      $(this).attr('src', 'http://img7.imageshack.us/img7/8320/avatarxcy.png');
    }
  });
