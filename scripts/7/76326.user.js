// ==UserScript==
// @author        Zxw
// @email 	  zxwwww@googlemail.com
// @name          Reddit Author Comments
// @description   Adds a button to reddit which when used Will only show comments that are by the author or provide context to comments by the author.
// @include       http://www.reddit.com/r/*/comments/*
// @include       http://www.reddit.com/comments/*
// ==/UserScript==

if (location.href.match(/http:\/\/www\.reddit\.com\/r\/.*\/comments\/.*/) ||
    location.href.match(/http:\/\/www\.reddit\.com\/comments\/.*/)) {

$ = unsafeWindow.jQuery;
  $(document).ready(function(){
    $(".menuarea").append("<a class=\"authorComments\" href=\"#\">[A] </a>");
    $(".authorComments").css("font-weight", "700");
    $(".authorComments").css("text-decoration", "underline");
    $(".authorComments").css("color", "#888888");
    $(".authorComments").css("position", "relative");
    $(".authorComments").css("left", "-0px");
    $(".authorComments").click(function (e) {
      e.preventDefault();
      var start = getStart();
      var author = $("#siteTable .author").text();
      start.each( function() {
        authorSearch($(this), author);
        hideAuthors($(this))
      });
    });
  });
}

function isVisible(item) {
  var disp = $(item).children(".entry").children(".noncollapsed").css("display");
  if (disp != "none") {
    return true;
  }
  return false;
}

function getStart() {
  return $(".nestedlisting").children(".thing");
}

function getName(item) {
 return $(item).find(".author:first").text();
}

function getChildren(item) {
 return item.children(".child").children(".sitetable").children(".thing");
}

function getText(item) {
 return item.find(".md:first").text();
}

function authorSearch(item, author) {
  var children = getChildren(item)
  var itemAuthor = getName(item);

  if (isVisible(item) == false) showItem(item);

  children.each( function () {
   tempAuthor = authorSearch($(this), author);
   if (tempAuthor == author ) itemAuthor = tempAuthor;
  });

  if (itemAuthor == author) $(item).attr("context", "show");//hideItem(item);

  return itemAuthor;
}

function hideAuthors(item) {
  var children = getChildren(item)

  if ($(item).attr("context") == "show") {
   children.each( function () {
    hideAuthors($(this));
   });
  } else {
   hideItem(item);
  }
}


function hideItem(item) {
 hidecomment(item.find(".expand:first"));
}

function showItem(item) {
 showcomment(item.find(".expand:first"));
}

function hidecomment(elem){var t=$(elem).closest(".thing");t.hide().find(".noncollapsed:first, .midcol:first").hide().end().show().find(".entry:first .collapsed").show();if(t.hasClass("message")){$.request("collapse_message",{"id":$(t).thing_id()});}else{t.find(".child:first").hide();}return false;};

function showcomment(elem){var t=$(elem).closest(".thing");t.find(".entry:first .collapsed").hide().end().find(".noncollapsed:first, .midcol:first").show().end().show();if(t.hasClass("message")){$.request("uncollapse_message",{"id":$(t).thing_id()});}else{t.find(".child:first").show();}return false;};