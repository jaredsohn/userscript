// ==UserScript==
// @name        Ikariam-World Script
// @description Script for Ikariam (include ika-world into the game)
// @include     http://*.ikariam.*/*
// @include     http://s*.ikariam.*/index.php?view=island*
// @include     http://s*.ikariam.*/index.php?view=highscore*
// @exclude     http://s*.ikariam.*/index.php?view=city*
// @exclude     http://s*.ikariam.*/index.php?view=allyHighscore*
// @exclude     http://s*.ikariam.*/index.php?action=loginAvatar&function=login*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// ==/UserScript==

/*******************************************************************************************
Ikariam World Script

14 nov 08
 - added two exludes

13NOV08
 - Fixed the Coordinates
 - Fixed the Land variable
	
12NOV08
 - Now it work in the score view
 - The script charge the jquery library from Google and use the require metatag, faster =)
 - New button Allied Tag
 - Screen Size change
 - Movable Windows

*******************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////
// 2008-11-08													
// Copyright (c) 2008, Jeeba											
// Released under the GPL license of Jeeba								
// Created in Cooperation between										
// http://www.designbyjeeba.blogspot.com & http://www.ika-world.com				
// jquery functions ripped shameslesly from http://joanpiedra.com/jquery/greasemonkey	
// Some ikariam data ripped without shame from kissiscout script XD				
//															
// Please inform us when you edit the tool for yourself or so (RepmujNetsik@web.de)		
//															
////////////////////////////////////////////////////////////////////////////////////////////

/******************************************************************************************/
/* INIT - Do not remove
/******************************************************************************************/

var url = window.location.href;
var breadcrums = document.getElementById("breadcrumbs").firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
var islandid = getCoord(); 
var IKA_playerid = "";
var IKA_show=false;
var temp = islandid.split(':');
var x=temp[0];
var y=temp[1];
var queryserver=getserverindex();//get the servers for ogame option box//corsair hehe
//GM_script('http://jquery.com/src/jquery-latest.js');//jquery load
GM_wait();

/******************************************************************************************/
/* MAIN
/******************************************************************************************/	

//background:transparent url(http://s1.ikariam.pe/skin/layout/bg_stone.jpg) repeat-x;
var DOM_PLAYER_PANEL = '<a class="seePlayer" title="See all Player Cities" href="#"><img id="showPlayer" alt="See Player Cities" src="/skin/layout/icon-city2.gif"/></a>'; 
var DOM_PLAYER_SCORE = '<a class="seePlayer" title="See all Player Cities" href="#"><img id="showPlayerScore" alt="See Player Cities" src="/skin/layout/icon-city2.gif"/></a>';
var DOM_ALLIES_PANEL = '<a class="seeAllies" title="See all Allies Cities" href="#"><img id="showAllies" alt="See Allies Cities" src="/skin/layout/icon-city2.gif"/></a>';
var DOM_ALLIES_SCORE = '<a class="seeAllies" title="See all Allies Cities" href="#"><img id="showAlliesScore" alt="See Allies Cities" src="/skin/layout/icon-city2.gif"/></a>';
var MODAL_DOM = '<div id="modal" style="padding-top:10px;z-index:999;left: 440px;top: 270px;display:block;float:left;position:fixed">'
               +'  <div style="text-align:center;float:right;width:1.5em;background-color:#F6EBBC;border:1px solid black;margin: 1px 10px 1px 1px;"><a style="margin: 1px 1px 1px;display:block;" id="IKA_closeMe" href="#1">X</a></div>'
               +'    <div id="IKA_title" style="cursor:move;background-color:#DEAA5E;background:transparent url(http://ikariam.ogame-world.de/images/header-navi.JPG)  center;font-weight:bold;height:24px;width:100%;line-height:24px;padding-top:2px;text-align:center;">Players</div>'
               +'    <div id="IKA_content" style="padding:0px 0px 0px;">'
               +'  </div>'
               +'</div>';
$('li.owner').append(DOM_PLAYER_PANEL);//En island View
$('table td.name').append(DOM_PLAYER_SCORE);//En record View
$('li.ally').append(DOM_ALLIES_PANEL);//En record View
$('table td.allytag').append(DOM_ALLIES_SCORE);//En record View
$('div#mainview').append(MODAL_DOM);
$('div#modal').hide();
//$('div#modal').draggable({handle:'div#IKA_title',cursor:'move',scrollSpeed:300});
$('div#modal').draggable({cursor:'move',scrollSpeed:300});
$('div#information').click(function(event){showPlayer(event);});
$('table.table01 tr').click(function(event){showPlayer(event);});
$('div#mainview').click(function(event){hidePlayer(event);});
$('li.city').click(function(event){cityPlayer(event);});

/******************************************************************************************/
/* FUNCTIONS
/******************************************************************************************/

/*cityPlayer: Get the player id when you click a city*/
function cityPlayer(event)
  {
   var temp=$(event['currentTarget']).attr('id');
   IKA_playerid = temp.substring(12,temp.length);
  }
	
/*showPlayer: Show the div than contain all the info*/	
function showPlayer(event)
  {
   var target = $(event.target);
   if ($(target).is('img#showPlayer')) 
     {
	//var land = url.substring(url.indexOf("ikariam.", 0) + 8, url.indexOf("/index.php", 0));//country name
	var welt = url.substring(url.indexOf("http://s", 0) + 8, url.indexOf(".ikariam", 0));//world (1,2,3)
	var temp = $.trim($('li#cityLocation' + IKA_playerid + ' li.owner').text());
	var spieler = $.trim(temp.substring(temp.indexOf(':') + 1, temp.length));
	var temp = $.trim($('li#cityLocation' + IKA_playerid + ' li.ally').text());
	var allianz = $.trim(temp.substring(temp.indexOf(':') + 1, temp.length));
	var data = "land=" + queryserver + "&welt=" + welt + "&allianz=" + allianz + "&spieler=" + spieler + "&X=" + x + "&Y=" + y;
	$('div#IKA_title').html('Players');
	$('div#modal').show();
	//GM_debug(data);
	//GM_debug($('div.coords').text());
	var css = 'position:relative;width:610px;z-index:9999;top:0;min-height:250px; left:0;background:#FFF4DE';
	createIframe('http://www.ika-world.com/suche.php?view=suche_stadt_gm&' + data, css);
     }
   else 
   if ($(target).is('img#showAllies')) 
     {
	//var land = url.substring(url.indexOf("ikariam.", 0) + 8, url.indexOf("/index.php", 0));//country name
	var welt = url.substring(url.indexOf("http://s", 0) + 8, url.indexOf(".ikariam", 0));//world (1,2,3)
	var temp = $.trim($('li#cityLocation' + IKA_playerid + ' li.owner').text());
	var spieler = $.trim(temp.substring(temp.indexOf(':') + 1, temp.length));
	var temp = $.trim($('li#cityLocation' + IKA_playerid + ' li.ally').text());
	var allianz = $.trim(temp.substring(temp.indexOf(':') + 1, temp.length));
	var data = "land=" + queryserver + "&welt=" + welt + "&allianz=" + allianz + "&X=" + x + "&Y=" + y;
	$('div#IKA_title').html('Allies');
	$('div#modal').show();
	var css = 'position:relative;width:690px;z-index:9999;top:0;min-height:450px; left:0;background:#FFF4DE';
	createIframe('http://www.ika-world.com/suche.php?view=suche_stadt_gm&' + data, css);
     }
   else 
   if ($(target).is('img#showPlayerScore')) 
     {
      //var land = url.substring(url.indexOf("ikariam.", 0) + 8, url.indexOf("/index.php", 0));//country name
	var welt = url.substring(url.indexOf("http://s", 0) + 8, url.indexOf(".ikariam", 0));//world (1,2,3)
	var spieler = $.trim($(target).parents('td.name').text());
	var allianz = $.trim($(target).parents('tr').children('td.allytag').text());
	var data = "land=" + queryserver + "&welt=" + welt + "&allianz=" + allianz + "&spieler=" + spieler;
	$('div#IKA_title').html('Players');		
	$('div#modal').show();
	var css = 'position:relative;width:610px;z-index:9999;top:0;min-height:250px; left:0;background:#FFF4DE';
	createIframe('http://www.ika-world.com/suche.php?view=suche_stadt_gm&' + data, css);
     }
   else
   if ($(target).is('img#showAlliesScore')) 
     {
	//var land = url.substring(url.indexOf("ikariam.", 0) + 8, url.indexOf("/index.php", 0));//country name
	var welt = url.substring(url.indexOf("http://s", 0) + 8, url.indexOf(".ikariam", 0));//world (1,2,3)
	var allianz = $.trim($(target).parents('td.allytag').text());
	var data = "land=" + queryserver + "&welt=" + welt + "&allianz=" + allianz;
	$('div#IKA_title').html('Allies');
	$('div#modal').show();
	var css = 'position:relative;width:690px;z-index:9999;top:0;min-height:450px; left:0;background:#FFF4DE';
	createIframe('http://www.ika-world.com/suche.php?view=suche_stadt_gm&' + data, css);
     }
  }

/*showPlayer: Hide the div than contain all the info*/
function hidePlayer(event)
  {
   var target = $(event.target);
   if ($(target).is('a#IKA_closeMe')) 
     {
      $('div#modal').hide();
     }
  }
	
	
function getserverindex()
  {
   var servers=
     {
	'ikariam.de':'de',
	'ikariam.org':'en',
	'ae.ikariam.com':'ae',
	'ar.ikariam.com':'ar',
	'ba.ikariam.com':'ba',
	'ikariam.bg':'bg',
	'ikariam.com.br':'br',
	'by.ikariam.org':'by',
	'cl.ikariam.org':'cl',
	'ikariam.cn':'cn',
	'ikariam.cz':'cz',
	'ikariam.dk':'dk',
	'ee.ikariam.org':'ee',
	'eg.ikariam.org':'eg',
	'ikariam.es':'es',
	'fi.ikariam.com':'fi',
	'ikariam.fr':'fr',
	'ikariam.gr':'gr',
	'hr.ikariam.org':'hr',
	'ikariam.hk':'hk',
	'ikariam.hu':'hu',
	'id.ikariam.org':'id',
	'ih.ikariam.org':'ih',
	'ikariam.co.il':'il',
	'in.ikariam.org':'in',
	'ir.ikariam.org':'ir',
	'ikariam.it':'it',
	'jp.ikariam.org':'jp',
	'kr.ikariam.org':'kr',
	'ikariam.lt':'lt',
	'ikariam.lv':'lv',
	'me.ikariam.org':'me',
	'ikariam.com.mx':'mx',
	'ikariam.nl':'nl',
	'ikariam.no':'no',
	'ikariam.pe':'pe',
	'ph.ikariam.org':'ph',
	'ikariam.pl':'pl',
	'ikariam.com.pt':'pt',
	'ikariam.ro':'ro',
	'ikariam.ru':'ru',
	'sa.ikariam.org':'sa',
	'ikariam.se':'se',
	'si.ikariam.org':'si',
	'ikariam.sk':'sk',
	'ikariam.net':'tr',
	'ikariam.tw':'tw',
	'ikariam.com':'us',
	'ua.ikariam.org':'ua',
	'ikariam.com.ve':'ve',
	'vn.ikariam.org':'vn'
     }
   return servers[location.host.substr(location.host.indexOf('.')+1)];
  }
	
function createIframe(url,css)
  {
   $('div#IKA_content').html('');	
   var iframe = document.createElement('iframe');
   iframe.setAttribute('style', css);
   iframe.setAttribute('name','iframe');
   iframe.setAttribute('id','iframe');
   iframe.src = url;
   $('div#IKA_content').append(iframe);
  }

function getCoord()
  {
   var islandid1 = $('div.coords').text();
   var islandid2 = $('div.avatarCities').attr('title');
   if (islandid1.length > islandid2.length) 
     {
	islandid=islandid1;
     }
   else
     {
	islandid=islandid2;
     }
   //GM_debug('island:'+islandid);
   var start_coord = islandid.search(/\[/);
   var stop_coord = islandid.search(/\]/);
   islandid= islandid.substring(start_coord+1,stop_coord);
   return islandid;
  }
	
/******************************************************************************************/
/* AUXIKIAR FUNCTIONS
/******************************************************************************************/

/* GM_wait() Check if jQuery's loaded */
function GM_wait() 
  {
   if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
   else { $ = unsafeWindow.jQuery; letsJQuery(); }
  }

/* GM_wait() Check if jQuery's loaded */
function GM_script(src)
  {
   var GM_JQ = document.createElement('script');
   GM_JQ.src = src;
   GM_JQ.type = 'text/javascript';
   document.getElementsByTagName('head')[0].appendChild(GM_JQ);
  }

function GM_debug(value)
  {
   unsafeWindow.console.log(value);
  }

