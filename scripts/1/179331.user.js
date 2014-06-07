// ==UserScript==
// @name        Spiderman
// @description The script collects styles, moods and themes of an album at allmusic.com
// @namespace   http://www.allmusic.com
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @match       http://www.allmusic.com/album/*
// @match       http://www.allmusic.com/artist/*
// @grant       GM_setClipboard
// @grant       GM_addStyle
// @version     1
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var TagFormatter = {
  format: function(tag) {    
    slash = /\w+\/\w+/g.exec(tag);
    
    if (slash) {
      var tags = "";
      slash = slash.toString();
      ab = slash.split("/");
      
      var head = tag.indexOf(slash) == 0
      tag = tag.replace(slash, '').replace(/[-\s]/g, '');
      for (var i = 0; i < ab.length; i++) {
        if (head) {
          tags = tags + " " + ab[i] + tag;
        } else {
          tags = tags + " " + tag + ab[i];
        }
      }
      
      return tags.trim();
    } else {
      return tag.replace(/[-\s]/g, '');
    }
  }
};

var Main = {
  go: function() {
    var tags = "";

    var sections = [
      ".sidebar .basic-info .genre div a",
      ".sidebar .basic-info .styles div a",
      ".sidebar .moods div a",
      ".sidebar .themes div a"
    ];
    
    for (var i = 0; i < sections.length; i++) {
      var elements = $(sections[i]);
      var style;
      elements.each(function(index) {
        tag = TagFormatter.format($(this).text());
        tags = tags + " " + tag;
      });
    }
    
    tags = tags.trim();
    if (tags != "") {
      if ($("span.album-pick").length > 0) {
        tags = "AMGAlbumPick" + " " + tags;
      }
      
      unique_tags = tags.split(" ");
      unique_tags = unique_tags.filter(function(element, position, self) {
        return self.indexOf(element) == position;
      })
      
      tags = unique_tags.join(" ");

      console.log("tags: [" + tags + "]");
      GM_setClipboard(tags);
    }
  }
}

Main.go();
