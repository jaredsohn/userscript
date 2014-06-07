// ==UserScript==
// @name       ErogameScape NoneDisplayGame
// @namespace  http://blueblueblue.fool.jp/wp/
// @version    0.1
// @description  エロスケの表示しないゲーム登録
// @include    http://erogamescape*/~ap2/ero/toukei_kaiseki/*
// @copyright  2012+, ebi
// ==/UserScript==

function main() {
$(function () {
    var style =
      "<style type=\"text/css\">" +
      ".filter-out-this {" +
      "  font-size:70%;" +
      "  font-weight:bold;" +
      "  color:#ff0000;" +
      "  cursor:pointer;" +
      "}" +
      ".filter-out-this:hover {" +
      "  background:#fccccc;" +
      "}" +
      "</style>";
    $("body").append(style);
    $("<span class=\"filter-out-this\">[×]</span>").insertAfter("a[href^='game.php']");
    $(".filter-out-this").live("mouseover", function() {
        $(this).attr("title","このゲームのコメントを非表示にする");
    })
    $(".filter-out-this").live("click", function() {
        location.href = "settei.php?add=" + $(this).prev().attr("href").split("game=")[1];
    })
        if (location.href.indexOf("toukei_kaiseki/settei.php" , -1)) {
            var txt = $("input[name='none_display_games']").val() + "," + location.href.split("add=")[1].split("#")[0].split("&")[0];
            txt = unique(txt.replace(/\s|^,|,$/g, "").split(",").sort(function(a,b) {return a-b;})).join(",");
            $("input[name='none_display_games']").val(txt);
        }

    })
    function unique(array) {
        var storage = {};
        var uniqueArray = [];
        var i,value;
        for ( i=0; i<array.length; i++) {
            value = array[i];
            if (!(value in storage)) {
                storage[value] = true;
                uniqueArray.push(value);
            }
        }
        return uniqueArray;
    }
}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(main);
