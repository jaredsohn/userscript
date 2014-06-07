// ==UserScript==
// @name           SteamGifts 4 Linux
// @namespace      thulinma.com
// @version        1.0
// @description    Will automatically filter out non-linux games, adds enter/remove buttons to overview, filters out contributor-only, adds steam-store link to overview.
// @include        http://*steamgifts.com/*
// ==/UserScript==

// http://userscripts.org/scripts/show/120905 <-- Based on this

$ = unsafeWindow.$;
console = unsafeWindow.console;

//retrieve url asynchonously, then calls hook h
function get(url, h){
  setTimeout(function(){GM_xmlhttpRequest({method: "GET", url: url, onload: h});}, 0);
}

//posts data to url asynchronously, then calls hook h
function post(url, data, h) {
  setTimeout(function(){GM_xmlhttpRequest({ method: "POST", url: url, data: data, headers: {"Content-Type": "application/x-www-form-urlencoded"}, onload: h});}, 0);
}

function parseGiveawayPage(url, html, e) {
  //find form, if not found, cancel
  var form = $("form", html);
  if (!form[0]){return false;}
  var f = $(form[0]).attr("id", "").attr("action", url).css("float", "left");
  //get enter button and enter button text
  var button_text = $("a", f).first().text();
  //if can enter or remove, add hook to link for submitting form
  if (button_text.indexOf("Enter") != -1 || button_text.indexOf("Remove") != -1) {
    $("a", f).first().click(function(){
      post(url, f.serialize(), function(){
        get(url, function(r){parseGiveawayPage(url, r.responseText, e);});
      });
      return false;
    });
  }
  //do changes of appearance
  if (button_text.indexOf("Remove") != -1) {
    $(e).addClass("fade").hover(function(){$(e).addClass("over");}, function(){$(e).removeClass("over");})
  } else if (button_text.indexOf("Enter") != -1) {
    $(e).removeClass("fade").hover(function(){}, function(){})
  }else{
    //remove anything we cannot participate in
    $(e).remove();
  }
  //insert the form instead of the created by text
  $(".magic", e).remove();
  $("<div>").html(f).attr("class", "magic").appendTo($(".created_by", e).html(""));
  //get the steam URL link
  var steam_link = $(".steam_store a", html);
  //replace the created_ago span with the link
  $(".time_remaining span", e).html("").append(steam_link);
  //if no steam ID was known yet, check for linux support now
  if (!$(e).data("steamid")){
    //if it is indeed a steam image, extract the game id
    var steam_id = steam_link.attr("href").split("/")[4];
    //check if this game id has linux support
    doSteam(steam_id, e, false);
  }
  $(e).data('handled', false);
}

function doSteam(id, e, noOpen){
  $(e).data("steamid", id);
  //check if we know about this game ID yet
  var status = localStorage["game_"+id];
  if (status){
    //if we're getting the page, loop
    if (status == "Wait..."){
      setTimeout(function(){doSteam(id, e);}, 500);
      return;
    }
    //not linux? remove it
    if (status == "No"){
      $(e).remove();
    }
    //linux! yay! retrieve the giveaway page and insert the form
    if (status == "Yes" && !noOpen){
      var gameurl = "http://www.steamgifts.com"+$(".title a", e).attr("href");
      if (gameurl) {
        get(gameurl, function(r){parseGiveawayPage(gameurl, r.responseText, e);});
      }
    }
  }else{
    //this is the first time we're checking this game - retrieve the steam page and check for linux support
    localStorage.setItem("game_"+id, "Wait...");
    get("http://store.steampowered.com/app/"+id+"/", function(r){
      var platform = $(".game_area_purchase_platform", r.responseText);
      localStorage["game_"+id] = $(".linux", platform).length == 0 ? "No" : "Yes";
    });
    //trigger the loop
    setTimeout(function(){doSteam(id, e);}, 500);
  }
}

function doMagic(e) {
  //if not handled yet...
  if ($(e).data('handled') || $(e).find('[name="form_key"]').length > 0) return true;
  $(e).data('handled', true);
  //remove anything contributor-only
  if ($(".contributor_only", e).length > 0){
    $(e).remove();
  }
  //check the artwork image, which is usually pulled from steam itself
  var img_url = $(".right img", e).attr("src");
  if (img_url.indexOf("steam") != -1){
    //if it is indeed a steam image, extract the game id
    var steam_id = img_url.split("/")[6];
    //check if this game id has linux support
    doSteam(steam_id, e, false);
  }else{
    //we don't know how to handle this (yet?) - mark red and assume linux is supported so we never miss out
    $(e).css({"border-top":"10px solid red", "padding":"0px", "border-bottom":"10px solid red"});
    //print a console message for debugging
    console.log("Unknown image:", img_url);
    //retrieve the giveaway page and insert the form
    var gameurl = "http://www.steamgifts.com"+$(".title a", e).attr("href");
    if (gameurl) {
      get(gameurl, function(r){parseGiveawayPage(gameurl, r.responseText, e);});
    }
  }
}

//remove any waiting data from local storage
for (var i in localStorage){
  if (localStorage[i] == "Wait..."){delete localStorage[i];}
}

//if user is logged in
if ($("#navigation ol a:eq(6)").attr("href").indexOf("/?login") == -1) {

  //run doMagic on all posts in the content field
  $(".content .post").each(function(index, e){doMagic(e)});

  //also run on anything new that may may be added to ajax_gifts
  $(".ajax_gifts").bind('DOMNodeInserted', function(e) {
    if($(e.target).hasClass('post')){doMagic(e.target)}
  });
}