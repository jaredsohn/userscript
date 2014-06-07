var meta = <><![CDATA[
// ==UserScript==
// @name        iR
// @namespace   T, iR
// @license     Creative Commons Attribution-Noncommercial-Share Alike 3.0 English License
// @userscripts http://userscripts.org/users/442636
// @source      http://userscripts.org/scripts/review/142804
// @identifier  http://userscripts.org/scripts/show/142804.user.js
// @copyright   © SunAdobe™, 2011 - 2015
// @icon        
// @include 	  http://*.travian*.*/*.php*
// @exclude 	  http://*.travian*.*/
// @exclude 	  http://*.travian*.*/hilfe.php*
// @exclude     http://*.travian*.*/log*.php*
// @exclude 	  http://*.travian*.*/index.php*
// @exclude 	  http://*.travian*.*/anleitung.php*
// @exclude 	  http://*.travian*.*/impressum.php*
// @exclude 	  http://*.travian*.*/anmelden.php*
// @exclude 	  http://*.travian*.*/gutscheine.php*
// @exclude 	  http://*.travian*.*/spielregeln.php*
// @exclude 	  http://*.travian*.*/links.php*
// @exclude 	  http://*.travian*.*/geschichte.php*
// @exclude 	  http://*.travian*.*/karte.php*
// @exclude 	  http://*.travian*.*/gold.php*
// @exclude 	  http://*.travian*.*/tutorial.php*
// @exclude 	  http://*.travian*.*/manual.php*
// @exclude 	  http://*.travian*.*/manual.php*
// @exclude 	  http://*.travian*.*/ajax.php*
// @exclude 	  http://*.travian*.*/ad/*
// @exclude 	  http://*.travian*.*/chat/*
// @exclude 	  http://forum.travian*.*
// @exclude 	  http://board.travian*.*
// @exclude 	  http://shop.travian*.*
// @exclude 	  http://*.travian*.*/activate.php*
// @exclude 	  http://*.travian*.*/support.php*
// @exclude  	  http://help.travian*.*
// @exclude  	  http://analytics.traviangames.com/*
// @exclude 	  http://*.traviantoolbox.com/*
// @exclude 	  http://*.traviandope.com/*
// @exclude 	  http://*.travianteam.com/*
// @exclude 	  http://travianutility.netsons.org/*
// @exclude 	  *.css
// @exclude 	  *.js
// ==/UserScript==
]]></>.toString();
*/
// *--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*
var crrlng={}; function validatorActionForm(){
this.crrHost=window.location.host;
this.crrPage=window.location.href;
this.crrProto=window.location.protocol;
this.crrPathNm=window.location.pathname;
this.crrAgent=navigator.userAgent;z
this.pgeNow=window.location.pathname + window.location.search;
this.defPrefix=this.crrProto + '//';
this.version='0.0.11';
this.dTimer=[3600,1800,900,60,30,20,10,343030];
this.defRaces=['nationBig nationBig1','nationBig nationBig2','nationBig nationBig3'];
this.numArray=['1','2','3','4','5','6','7','8','9','0'];
this.numArrCdFa=['&#1777;','&#1778;','&#1779;','&#1780;','&#1781;','&#1782;','&#1783;','&#1784;','&#1785;','&#1776;'];
this.numArrVlFa=['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
this.zIndex=10001;
this.deflng='fa';
this.defcnt='ir';
this.jVoid='javascript:void(0)';
this.basePgs=['dorf1.php','a2b.php','help.php','build.php','karte.php','ajax.php'];
this.eXValue=1 * (24 * 60 * 60 * 1000);
this.winW=window.innerWidth;
this.winH=window.innerHeight;
this.cenW=this.winW / 2;
this.cenH=this.winH / 2;
this.oriName='iR ';
this.usoURL=this.defPrefix + 'userscripts.org/scripts/';
this.usoNo='116466';
this.defUser=this.usoURL