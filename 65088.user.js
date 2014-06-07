// ==UserScript==
// @author        Zxw
// @email 	  zxwwww@googlemail.com
// @name          Reddit Comment Crusher-Opera
// @description   Will only display comments that have more points than the selected comment
// @include       http://www.reddit.com/r/*/comments/*
// ==/UserScript==

if (location.href.match(/http:\/\/www\.reddit\.com\/r\/.*\/comments\/.*/) ||
    location.href.match(/http:\/\/www\.reddit\.com\/comments\/.*/)) {
  $(document).ready(function(){
    $(".tagline > .expand").parent().append("<a class=\"expand crush\">[#]</a>");
    $(".crush").css("position", "relative");
    $(".crush").css("left", "-10px");
    $(".crush").click(function (e) {
      e.preventDefault();

      var t = $(this).closest(".thing");
      var score = getScore(t);

      var start = getStart();
      start.each( function() {
        crush($(this), score);
      });
    });
  });
}

function getStart() {
  return $(".nestedlisting").children(".thing");
}
function getScore(item) {
  var s = $(item).children(".entry").children(".noncollapsed").children(".tagline").children(".unvoted").text();
  s = s.replace(" points", "");
  s = s.replace(" point", "");
  return parseInt(s);
}

function crush(item, score) {
  var tempScore = 0;
  var newScore = 0;
  var children = item.children(".child").children(".sitetable").children(".thing");

  newScore = getScore(item);

  children.each( function () {
    tempScore = crush($(this), score);
    if (tempScore > newScore) newScore = tempScore;
  });

  if (newScore <= score) collapseItem(item);

  return newScore;
}

function collapseItem(item) {
  var temp = $(item).find(".entry");
  hidecomment(temp);
}