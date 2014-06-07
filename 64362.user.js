// ==UserScript==
// @author        Zxw
// @email 	  zxwwww@googlemail.com
// @name          Collapser-Firefox
// @description   Collapses comments more efficiently
// @include       http://www.reddit.com/r/*/comments/*
// ==/UserScript==

$ = unsafeWindow.jQuery;

$(document).ready(function(){
  $(".tagline > .expand").parent().append("<a href=\"#\"class=\"expand collapse\">[~]</a>");
  $(".collapse").click(function (e) {
    e.preventDefault();
    var t = $(this).closest(".thing");

    t = collapse(t);

    document.documentElement.scrollTop = findPos(t[0]);
  });
  $(".collapse").css("position", "relative");
  $(".collapse").css("left", "-10px");
});

function findPos(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
  }
  return curtop;
}


function collapse(item, ignoreItem) {
  var temp = item;
  var disp;

  if (ignoreItem == true) temp = temp.prev().prev();

  while (temp.length != 0) {
    collapseItem(temp);
    temp = temp.prev().prev();
  }

  temp = item.next().next();
  var status = getStatus(temp);

  while (status == "collapsed") {
    item = temp;
    temp = temp.next().next();
    status = getStatus(temp);
  }

  if ((status == "collapsed") || (status == "empty")){
    item = $(item).parent().closest(".thing");
    if (item.length != 0) return collapse(item);
  } else if (status == "comment") {
    item = $(item).parent().closest(".thing");
    if (item.length != 0) collapse(item, true);
    return temp;
  } else if (status == "morechildren") {
    item = $(item).parent().closest(".thing");
    if (item.length != 0) return collapse(item, true);
  }
}

function collapseItem(item) {
  var temp = $(item).find(".entry");
  hidecomment(temp);
}

function getStatus(item) {
  var name = item.attr("class")
  if (name == undefined) return "empty";

  var more = name.match("morechildren")
  if (more == "morechildren") return "morechildren";

  var display = item.children(".entry").children(".noncollapsed").css("display");
  if (display == "none") return "collapsed";
  
  return "comment";
}

function hidecomment(elem){
  $(elem).closest(".thing").hide().find(".noncollapsed:first, .midcol:first, .child:first").hide().end().show().find(".entry:first .collapsed").show();
  return false;
}