// ==UserScript==
// @name Tieba User Signature Remover
// @namespace wavetl.tieba-user-signature-remover
// @description 百度贴吧主题页用户签名移除器
// @include http://tieba.baidu.com/p/*
// @include http://post.baidu.com/p/*
// ==/UserScript==

// Author: Long Tang
// Created: 2011-12-07
// Version: 1.3

GM_addStyle("div.d_sign_split { display:none; }");
GM_addStyle("div.d_sign_split + img { display:none; }");