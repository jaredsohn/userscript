// ==UserScript==
// @name        makeBestcoordeLink
// @namespace   inukoya
// @description make bestcoorde link
// @include     http://sns.atgames.jp/friend/list*
// @include     http://sns.atgames.jp/friend/favoriteList/*
// @include     http://sns.atgames.jp/friend/funList/*
// @version     4
// @grant       none
// ==/UserScript==
jQuery('.friendlist li').each(function(){
var makeBestcoordeLink_i = jQuery('a' , this).attr('href');
makeBestcoordeLink_i = makeBestcoordeLink_i.split('/');
makeBestcoordeLink_i = makeBestcoordeLink_i[makeBestcoordeLink_i.length-1];
//console.log(i);
var s = '<p style="position:absolute;left:-3px;top:29px;"><a href="http://www.atgames.jp/atgames/calendar.do?id=' + makeBestcoordeLink_i + '" style="display:block;width:20px;height:20px;background:#fff;border:1px solid #ddd;"><span style="width: 15px;position:relative;top:2px;" class="mod_profileavatar02parts btn_closet"></span></a></p>';
jQuery(this).append(s);
});