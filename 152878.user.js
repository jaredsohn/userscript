// ==UserScript==
// @name       Clarify Sina Weibo
// @namespace  http://shouya.github.com/
// @version    0.1
// @description  Delete annoying stuff on sina weibo
// @match      http://weibo.com/*
// @match      http://www.weibo.com/*
// @copyright  2012+, Shou
// ==/UserScript==
function addJQuery(callback) {
  var script = document.createElement("script");
    script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main() {
    $("#pl_guide_oldUser").remove();
    $("#Box_right").remove();
    $("div[node-type=deskpop_root]").remove();
    $(".newFilter").remove();
    $("span.W_level_ico").remove();
    $(".declist").remove();
    $("div.title").remove();
    $("img.ico_club").remove();
    $("img.ico_member").remove();
    $("img[type=face]").replaceWith('');
    $("li[node-type=plaza]").remove();
    $("li[node-type=group]").remove();
    $("li[node-type=app]").remove();
    $("li[node-type=game]").remove();
    $("li[node-type=vip]").remove();
    $(".left_nav div:gt(2)").hide();
    // $(".left_nav div:nth-child(4)").hide();
    $("div[node-type=layerAccount] ul li:gt(4)").hide();
    $("div[node-type=layerAccount] ul li:last").show();
    $(".honour").remove();
    
    //setTimeout("main()", 1000);
}
addJQuery(main);
