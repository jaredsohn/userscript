// ==UserScript==
// @name           Grepolis 2.0 toolkit for FireFox
// @version        0.2
// @namespace      http://userscripts.org/users/420416
// @description    Script for Grepolis 2.0 game. Displays permanently troops, movements, trades in top right part of the screen.
// @include        http://*.grepolis.com/game/*
// ==/UserScript==

var $;
//var log = unsafeWindow.console.log;
var log = nullLog;
var troops = true;
var movement = true;
var trade = true;

if (unsafeWindow.jQuery === undefined) {
  log("jquery is undefinde");
} else {
  log("jquery is loaded");
  $ = unsafeWindow.jQuery;
  init();
}

function nullLog(date){
}

function init(){
  //redefine renderHtml
  var f = unsafeWindow.MenuBubbleOrders.renderHtml;
  unsafeWindow.MenuBubbleOrders.renderHtml = function(data) {
    var r = f(data);
    log("renderHtml in MenuBubbleOrders");
    displayHiddenDivs();
    return r;
  }
  
}

function displayHiddenDivs(){
  var defaultTop = 68;
  var top = 0;
  var h = 0;
  log("troops " + troops +" movement " + movement + " trade " + trade);
  if (troops){
    $("div#lbox_cont_troops").css("left","").css("right",130).css("z-index",1000).css("display","block");
    h = ( unsafeWindow.MenuBubbleOrders.orders_count == 0 ? 35: unsafeWindow.MenuBubbleOrders.orders_count * 50 + 19);
    h > 389 ? top += 389: top+=h; 
    top = defaultTop + top;
  }else{
    $("div#lbox_cont_troops").css("display","none");
    top = defaultTop;
  }
  log("movement top " + top);
  if (movement){
    $("div#lbox_cont_movement").css("left","").css("right",130).css("top",top).css("z-index",1000).css("display","block");
    h = unsafeWindow.MenuBubbleMovement.commands_count == 0 ? 35: unsafeWindow.MenuBubbleMovement.commands_count * 40 + 19;
    h > 389 ? top += 389 : top+=h;
  }else{
    $("div#lbox_cont_movement").css("display","none");
  }
  log("trade top " + top);
  if (trade){
    $("div#lbox_cont_trade").css("left","").css("right",130).css("top",top).css("z-index",1000).css("display","block");
  }else{
    $("div#lbox_cont_trade").css("display","none");
  }
  $("a#icon_troops").unbind();
  $("a#icon_movement").unbind();
  $("a#icon_trade").unbind();
  $("a#icon_troops").bind("click",toggleMenuBubble);
  $("a#icon_movement").bind("click",toggleMenuBubble);
  $("a#icon_trade").bind("click",toggleMenuBubble);
}

function toggleMenuBubble(event){
  log(event.currentTarget.id)
  if (event.currentTarget.id == "icon_movement") movement = !movement;
  if (event.currentTarget.id == "icon_troops") troops = !troops;
  if (event.currentTarget.id == "icon_trade") trade = !trade;
  displayHiddenDivs();
}