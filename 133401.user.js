// ==UserScript==
// @name        Dshini Nav Plus
// @namespace   http://userscripts.org/scripts/show/133401
// @description Improve the navigation of the website at least a little
// @include     http://*.dshini.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version     1.2
// ==/UserScript==

var subnav = $('#subnavigation_content');
var daily = '<ul><li><a href="/de/daily/index"> Übersicht </a></li><li><a href="/de/daily/bonus"> Sponsor Dshins </a></li></ul>';
var markt = '<ul><li><a href="/de/marketplace/"> Übersicht </a></li><li><a href="/de/marketplace/offers/mine"> Meine Angebote </a></li><li><a href="/de/marketplace/swaps/mine"> Meine Swaps </a></li><li><a href="/de/marketplace/subscriptions/mine"> Merkliste </a></li><li><a href="/de/marketplace/rating_profile"> Bewertungen </a></li></ul>';
var wish = '<ul><li><a href="/de/wish/teaser"> Übersicht </a></li><li><a href="/de/wish/list"> Mein Wunschzettel </a></li><li><a href="/de/user/flashbacks"> Spendenliste </a></li></ul>';
var game = '<ul><li><a href="/de/game/"> Übersicht </a></li><li><a href="/de/game/daily"> Daily Games </a></li><li><a href="/de/game/activity"> Activity Games </a></li><li><a href="/de/game/lottery"> Lotterie </a></li></ul>';
var tv = '<ul><li><a href="/de/entertainment/1/page/1"> Nachrichten </a></li><li><a href="/de/entertainment/2/page/1"> Stars </a></li><li><a href="/de/entertainment/3/page/1"> Musik </a></li><li><a href="/de/entertainment/4/page/1"> Sport </a></li><li><a href="/de/entertainment/5/page/1"> Kino </a></li><li><a href="/de/entertainment/6/page/1"> Games </a></li><li><a href="/de/entertainment/7/page/1"> Dokus </a></li><li><a href="/de/entertainment/8/page/1"> Autos </a></li><li><a href="/de/entertainment/9/page/1"> Kochen </a></li></ul>';
var temp = $(subnav).html();

function changeColor(x){
  $('nav li').css('background','#7DA0A1');
  $(x).css('background','#FFC743');
}

$('nav li:eq(0)').mouseover(function(){
  changeColor(this);
  $(subnav).html(temp);
});
$('nav li:eq(1)').mouseover(function(){
  changeColor(this);
  if( $(this).hasClass('active') ){ $(subnav).html(temp); }
  else { $(subnav).html(daily); }
});
$('nav li:eq(2)').mouseover(function(){
  changeColor(this);
  if( $(this).hasClass('active') ){ $(subnav).html(temp); }
  else { $(subnav).html(markt); }
});
$('nav li:eq(3)').mouseover(function(){
  changeColor(this);
  if( $(this).hasClass('active') ){ $(subnav).html(temp); }
  else { $(subnav).html(wish); }
});
$('nav li:eq(4)').mouseover(function(){
  changeColor(this);
  if( $(this).hasClass('active') ){ $(subnav).html(temp); }
  else { $(subnav).html(game); }
});
$('nav li:eq(5)').mouseover(function(){
  changeColor(this);
  $(subnav).html(tv);
});