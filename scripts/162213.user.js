// ==UserScript==
// @name        Wikimedia Print friendly
// @namespace   org.wikimedia.printfriendly
// @description Printer friendly style & easy content selection for Wikimedia pages
// @include     http://*.wikipedia.org/*printable=yes*
// @include     http://*.wikivoyage.org/*printable=yes*
// @include     http://*.wikibooks.org/*printable=yes*
// @include     http://*.wikiquote.org/*printable=yes*
// @include     http://*.wiktionary.org/*printable=yes*
// @include     http://*.wikiversity.org/*printable=yes*
// @include     http://*.wikimedia.org/*printable=yes*
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// @version     1
// ==/UserScript==

(function() {
  $("body").css({
    "font-family": '"Linux Libertine",Georgia,"Times New Roman",Times,serif',
    "text-align": "justify",
  });

  // make a column layout after table of content (or all content if ther is
  // no toc at all)
  var columnContainer = $('<div id="printfriendly-columnContainer"/>').css({
    "clear": "both",
    "-moz-column-count": 2,
    "-webkit-column-count": 2,
    "column-count": 2,
  });

  var content = $("#toc ~")
  if (content.length == 0) content = $("#bodyContent").contents();
  content.wrapAll(columnContainer);

  // remove toc itself as it is just useless
  // in future, with target-counter CSS function, we could do a true ToC
  $("#toc").remove()

  // thumbnails are not fload anymore but cetnered on their column
  content.filter(".thumb").
    removeAttr("class"). // leave only thumb class and remove any other
    addClass("thumb").
    css("display", "inline-block").
    wrap($("<div>").css("text-align", "center"));

  // not yet supported by Gecko & Webkit...
  $("h2").css({
    "-moz-column-break-before": "always",
    "-webkit-column-break-before": "always",
    "column-break-before": "always",
    
    "-moz-column-span": "all",
    "-webkit-column-span": "all",
    "column-span": "all",
  });

  // revert floating boxes to full width
  // TODO: this will likely cause a page break if the infobox is tall:
  // repack it into a div to instrcut the brower to span it across pages
  $(".infobox").add(".infobox_v2").css({
    "float": "none",
    "width": "100%",
  }).prependTo("#printfriendly-columnContainer");
  $(".pp_infobox").removeAttr("style"); // sometimes found on WikiVoyage

  // make lists more compact
  $("ul,ol").css({
    "margin-top": "0.2em",
    "margin-bottom": "0em",
    "padding-left": "1em",
  })

  // allow to easily drop sections
  var nextSection = function(headerType) {
    var nextHeaders = [];
    for (var i = parseInt(headerType.charAt(1)); i >= 1; i--) {
      nextHeaders.push("h" + i);
    }
    return nextHeaders.join(",");
  }

  $("h2,h3,h4").append(function() {
      var section = $(this).nextUntil(nextSection(this.nodeName)).add(this);
      return $('<span class="delhelper"> (click to delete)</span>').
        css("color", "transparent").
        hover(
          function() {
            $(this).css("color", "darkred");
            section.wrapAll($("<div/>").css("background", "#F7C5C5"));
          },
          function() {
            $(this).css("color", "transparent");
            section.unwrap();
          }
        ).
        click(function() {
          section.unwrap().remove();
        })
  });
})();
