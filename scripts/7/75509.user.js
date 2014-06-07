// ==UserScript==
// @name           set_pixiv_embed
// @namespace      http://twitter.com/ichiyonnana
// @description    set 'pixiv_embed=pix'
// @include        http://www.pixiv.net/*
// ==/UserScript==
( function(){
  document.cookie = 'pixiv_embed=pix; domain=.pixiv.net; path=/';
  document.cookie = 'pixiv_mypage=token%3D20100713%26n_o%3D1%26n_v%3D0%26t_o%3D2%26t_v%3D0%26e_o%3D3%26e_v%3D0%26b_o%3D0%26b_v%3D0%26m_o%3D4%26m_v%3D0; domain=.pixiv.net; path=/'
}) ();