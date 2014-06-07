// ==UserScript==
// @name           Flickr Wider Discussion Page
// @namespace      http://zoolcar9.lhukie.net/greasemonkey
// @include        http://www.flickr.com/groups/*/discuss/*
// @include        http://flickr.com/groups/*/discuss/*
// @include        http://www.flickr.com/help/forum/*
// @include        http://flickr.com/help/forum/*
// @description    Toggle hide left navigation panel on a topic to make the discussion page wider
// ==/UserScript==

({
  leftArrow: "url(data:image/gif;base64,R0lGODlhBQAJAIAB\
AJmZmf///yH5BAEAAAEALAAAAAAFAAkAAAIMjAMHidsLXTRQMVoAADs=)",
  rightArrow: "url(data:image/gif;base64,R0lGODlhBQAJAIA\
BAJmZmf///yH5BAEAAAEALAAAAAAFAAkAAAIMRB5gp9v2YlJsJRQKADs=)",
  leftWhiteArrow: "url(data:image/gif;base64,R0lGODlhBQA\
JAIAAAJmZmf///yH5BAEAAAAALAAAAAAFAAkAAAILhBEXidsLXTRQMVoAOw==)",
  rightWhiteArrow: "url(data:image/gif;base64,R0lGODlhBQ\
AJAIAAAJmZmf///yH5BAEAAAAALAAAAAAFAAkAAAIMDA5hp9v2YlJsJQQKADs=)",

  get left() {
    return document.getElementById("Hint");
  },

  get right() {
    return document.getElementById("GoodStuff");
  },

  get prefs() {
    return GM_getValue("wide_mode", false);
  },

  toggle: function(aEvent) {
    var l = this.left; var r = this.right;
    if (l.style.display == "") {
      l.style.display = "none";
      r.style.paddingLeft = "0";
      r.style.paddingRight = "0";
      aEvent.target.style.backgroundImage = this.rightWhiteArrow;
      GM_setValue("wide_mode", true);
    } else {
      l.style.display = "";
      r.style.paddingLeft = "";
      r.style.paddingRight = "";
      aEvent.target.style.backgroundImage = this.leftWhiteArrow;
      GM_setValue("wide_mode", false);
    }
  },

  blueBack: function(aEvent) {
    var style = aEvent.target.style;
    var bg = style.backgroundImage;
    style.backgroundColor = "#428ce7";
    style.backgroundImage = (bg == this.leftArrow)
                              ? this.leftWhiteArrow
                              : this.rightWhiteArrow;
  },

  redBack: function(aEvent) {
    var style = aEvent.target.style;
    var bg = style.backgroundImage;
    style.backgroundColor = "#ff0084";
  },

  greyBack: function(aEvent) {
    var style = aEvent.target.style;
    var bg = style.backgroundImage;
    style.backgroundColor = "#e5e5e5";
    style.backgroundImage = (bg == this.leftWhiteArrow)
                              ? this.leftArrow
                              : this.rightArrow;
  },

  div: function() {
    var height = getComputedStyle(document.getElementById("TopBar"), "")
                                          .height;
    var div = document.createElement("div");
    div.style.position = "fixed";
    div.style.left = "0";
    div.style.top = height;
    div.style.bottom = height;
    div.style.width = "10px";
    div.style.cursor = "pointer";
    div.style.backgroundColor = "#e5e5e5";
    div.style.backgroundImage = (this.left.style.display == "none")
                                  ? this.rightArrow : this.leftArrow 
    div.style.backgroundPosition = "center center";
    div.style.backgroundRepeat = "no-repeat";
    div.appendChild(document.createTextNode(""));
    return div;
  },

  init: function() {
    if (!document.getElementById("DiscussTopic")) return;
    this.left.style.display = this.prefs ? "none" : "";
    var main = document.getElementById("Main");
    var div = this.div();
    main.parentNode.insertBefore(div, main);
    var foo = this;
    div.addEventListener("click", function(e) {
      foo.toggle(e);
    }, false);
    div.addEventListener("mousedown", function(e) {
      foo.redBack(e);
    }, false);
    div.addEventListener("mouseup", function(e) {
      foo.blueBack(e);
    }, false);
    div.addEventListener("mouseover", function(e) {
      foo.blueBack(e);
    }, false);
    div.addEventListener("mouseout", function(e) {
      foo.greyBack(e);
    }, false);
  }

}).init();