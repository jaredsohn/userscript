// ==UserScript==
// @name           Pitchfork Rdio
// @namespace      Sevik
// @version        0.1
// @author         Sevik
// @description    Embeds Rdio players on pitchfork reviews. Replaces spotify players if they exist
// @include        http://pitchfork.com/*
// ==/UserScript==

// Prevent running in frames
if (window.top != window.self)
    return;

function get_artist_album() {
  var current_review = {artist: "", album: ""};

  var review_meta = document.getElementsByClassName("review-meta")[0];
  if (review_meta == undefined) 
    return current_review;

  var review_info = review_meta.getElementsByClassName("info")[0];
  if (review_meta == undefined) 
    return current_review;

  current_review.artist = review_info.children[0].textContent.split(' ').join('_');
  current_review.album = review_info.children[1].textContent.split(' ').join('_');

  return current_review;
}

function load_rdio(review) {
  var rdio_oembed = "http://www.rdio.com/api/oembed/";
  options = {
    format: "json",
    url: "http://www.rdio.com/artist/" + review.artist + "/album/" + review.album + "/"
  };
  var query_string = "?";
  for (o in options) {
    query_string += o + '=' + options[o] + '&'; 
  }
  var url = rdio_oembed + query_string;

  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(response) {
      if (response.status != 200)
        return;

      var data = JSON.parse(response.responseText);
      var sidebar = document.getElementById("side");

      if (sidebar.children[1].className.indexOf("spotify") > -1) {
        sidebar.children[1].style.display = "none";
      }

      var new_player = document.createElement('div');
      new_player.innerHTML = data.html;
      new_player.children[0].width = 300;
      new_player.children[0].height = 200;

      sidebar.insertBefore(new_player, sidebar.children[1]);
    }
  });
}

(function check(current_review) {
  var review = get_artist_album();
  if (current_review != review.album) {
    current_review = review.album;
    if (review.album != "" && review.artist != "")
      load_rdio(review);
  }

  setTimeout(check, 1500, current_review);
})();