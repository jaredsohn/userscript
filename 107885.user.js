// ==UserScript==
// @match http://mog.com/chrome*
// @match https://mog.com/chrome*
// @include http://mog.com/chrome*
// @include https://mog.com/chrome*
// @match http://mog.com/m*
// @match https://mog.com/m*
// @include http://mog.com/m*
// @include https://mog.com/m*
// @name MOG Chrome Enhancer (jdanbrown fork)
// @namespace http://mog.com/
// @description Make MOG Chrome Player better.
// @version 0.3
// ==/UserScript==

function main() {

  /*
   * Titles, reviews, etc. [From http://userscripts.org/scripts/show/102008]
   */

  function addTitles() {
    var donePage = ""
    var h = setInterval(function () {
      var page = document.location.hash
      if(page.match(/(#playlist|#play_queue|#album)/) && page!=donePage) {
        var divToLookFor
        if(page.match(/#playlist/))
          divToLookFor = "#playlist_container"
        else if(page.match(/#album/))
          divToLookFor = ".album_pic"
        else if(page.match(/#play_queue/))
          divToLookFor = "#queue"

        if ($(divToLookFor).length > 0){
          //clearInterval(h) => can't because page doesn't load again
          donePage = page
          addTrackTitles()
          addAlbumTitles()
          if(divToLookFor == ".album_pic")
            addReviews();
        }
      }
    }, 1000);
  }

  function addTrackTitles() {
    var $trackTitles = $(".track_name")
    $trackTitles.each(function(){
      $(this).attr("title",cleanupName($(this).html()))
    })
  }

  function addAlbumTitles() {
    var $albumTitles = $(".album_name")
    $albumTitles.each(function(){
      $(this).attr("title",cleanupName($(this).html()))
    })
  }

  function addReviews() {
    var page = document.location.hash
    var albumID = page.match(/#album\/(.*)/)[1]
    var url = "http://mog.com/albums/mn" + albumID

    $.ajax({
      url: url,
      dataType: "html",
      success: function processData(datastring) {
          var labelPosition = $(".album_label").position()
          var reviewcontent = $(datastring).find("div.reviewlist.pro").html()
          if(reviewcontent) {
            //new positioning code so added MOG metadata doesn't mess up review positioning
            $("li.clrfx.album").after("<div style=\"width:540px;float:left;margin-top:3px;\">" + reviewcontent + "</div>")
            var stars = $(datastring).find("div.stars.inactive").attr("title")
            $("div.stars.inactive").html("AMG Rating: <span style=\"color:red\">" + stars + "</span> stars")
          } else {
            $("li.clrfx.album").after("<div style=\"width:540px;float:left;margin-top:3px;\">" + "No Reviews Yet" + "</div>")
          }
        }
    });
  }

  function cleanupName(name) {
    return name.replace(/&amp;/g, "&");
  }

  addTitles();

  /*
   * Shuffle [From http://userscripts.org/scripts/show/102008]
   */

  function addShuffleButton() {
    $("<a/>")
      .attr({ "id" : "shuffle_button",
       "title" : "Shuffle tracks in Queue"})
      .addClass("control")
      .css({ "float" : "right",
       "padding" : "6px 5px",
       "color" : "gray" })
      .html("Shuffle")
      .click(shuffleQueue)
      .appendTo($("#queue_controls"));
  }

  function shuffleQueue() {
    var ul = $("#realized");
    var lis = ul.find(".track").detach();
    lis = shuffled(lis);
    lis.appendTo(ul);
    Mog.detectWebDb() && Mog.ui.saveRealized();
  }

  function shuffled(l) {
    l.swap = function(i,j) { var t = this[i]; this[i] = this[j]; this[j] = t; };
    var n = l.length;
    for (var i = 0; i < n; i++) {
      var r = Math.floor(Math.random() * (n-i));
      l.swap(i, i + r);
    }
    return l;
  }

  addShuffleButton();

  /*
   * Keybindings
   */

  var _debug = function(e, msg) {
    console.log(e);
    console.log(msg + ': ' + String.fromCharCode(e.which) + ' (' + e.which + ')');
  };

  lastNonSearchUrl = null;
  $('#searchbox').focus(function(e) {
    if (!window.location.hash.match(/^#search\//)) {
      lastNonSearchUrl = window.location.toString(); // (Copy!)
    }
  });

  $('input, textarea').keydown(function(e) {
    _debug(e, 'input down');
    if (13 == e.which) { // enter
      $(e.target).blur();
    }
    if (27 == e.which) { // esc
      $(e.target).val('');
      $(e.target).blur();
      if (lastNonSearchUrl) {
        window.location  = lastNonSearchUrl;
        lastNonSearchUrl = null;
      }
    }
    e.stopPropagation();
  });
  $('input, textarea').keypress(function(e) {
    _debug(e, 'input press');
    e.stopPropagation();
  });

  $(document).keydown(function(e) {
    _debug(e, 'document down');
    if (37 == e.which && !(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)) { // left
      Mog.ui.previousTrack();
    }
    if (39 == e.which && !(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)) { // right
      Mog.ui.nextTrack();
    }
  });
  $(document).keypress(function(e) {
    _debug(e, 'document press');
    if ('/' == String.fromCharCode(e.which)) {
      $('#searchbox').select().focus();
      e.preventDefault(); // Don't emit '/' into the search box
    }
    if ('p' == String.fromCharCode(e.which)) {
      $('#play').click();
    }
    if ('q' == String.fromCharCode(e.which)) {
      if ($('#play_queue').css('display') == 'none') {
        window.location.hash = '#play_queue';
      } else {
        history.back();
      }
    }
    if ('r' == String.fromCharCode(e.which)) {
      $('#radio_toggle').click();
    }
    if ('R' == String.fromCharCode(e.which)) {
      $('#repeat_toggle').click();
    }
    if ('F' == String.fromCharCode(e.which)) {
      if ($('#full_view').css('display') == 'none') {
        $('#full_view_toggle').click();
      } else {
        $('#full_view').click();
      }
    }
    if ('t' == String.fromCharCode(e.which)) {
      if ($('#play_queue').css('display') == 'none') {
        window.location.hash = '#play_queue';
      }
      Mog.ui.scrollToPlaying();
    }
  });

}

var script = document.createElement("script");
script.appendChild(document.createTextNode("(" + main + ")();"));
(document.body || document.head || document.documentElement).appendChild(script);