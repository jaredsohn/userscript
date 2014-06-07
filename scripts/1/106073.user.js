/* Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php */
// ==UserScript==
// @name           napsterShuffleAlbum
// @namespace      mbeenen
// @description    Provides a link title "sa" in the napster music player to shuffle the queue by album.
//                 Caveats:
//                   Requires the player window to be refreshed after shuffling to have the shuffle take effect.
//                   May not work gracefully if the player is currently playing music.
//                   Will maintain album groupings as they are ordered in the current playlist (i.e. if the playlist
//                     is already shuffled, albums will likely be fragmented in the final result).
// @require http://code.jquery.com/jquery-1.6.2.js
// @include http://music.napster.com/player/getPlayer*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


//Handler for the window load event
function main() {

  var usWindow = unsafeWindow;

  if(window.navigator.vendor.match(/Google/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    usWindow = div.onclick();
  };

  // Wait a couple seconds after the document is ready to start my script (wasn't sure
  // which event I should be listening to).
  window.setTimeout( function() {
    
    jQuery("#nx_shuffle_button").after("<a id='shuffleByAlbum' style='position:absolute; right:60px; top:6px;'>sa</a>");
    jQuery('#shuffleByAlbum').click(function () {

      // Get the napster queue object and queue of songs
      var queue = usWindow.player.queue.Q;
      var order = queue.getQueue();
      var albumsArray = new Array();
      var finalOrder = new Array();
      var albumsArrayIndex = -1;
      var currentAlbumId = -1;
      var tmp;

      // Add a few functions to Array which the updateSongOrder function by Napster expects.
      // These would typically be added by the library Prototype, but I'm just throwing them in here.
      Array.prototype._each = Array.prototype.forEach;
      Array.prototype.each = function(iterator, context) {
        var index = 0;
        try {
          this._each(function(value) {
            iterator.call(context, value, index++);
          });
        } catch (e) {
          throw e;
        }
        return this;
      };

      // Sort the playlist queue into an array of arrays, with each inner array holding the song indices of
      // an album.
      order.forEach(function(song) {
        if(song.album_id != currentAlbumId) {
          currentAlbumId = song.album_id;
          albumsArrayIndex++;
          albumsArray[albumsArrayIndex] = new Array();
        }
        albumsArray[albumsArrayIndex].push(song.song_index);
      });

      // Shuffle the array of arrays (i.e. shuffle the album order)
      for (i = albumsArray.length-1; i > 0; i--) {
        var randomnumber = Math.floor(Math.random()*(i));
        tmp = albumsArray[i];
        albumsArray[i] = albumsArray[randomnumber];
        albumsArray[randomnumber] = tmp;
      }

      // Join the albums back together
      for (i = 0; i < albumsArray.length; i++) {
        finalOrder = finalOrder.concat(albumsArray[i]);
      }

      // Call the napster queue to update the order of the songs.
      queue.updateSongOrder(finalOrder);
      queue.updateSongIndexes();
      // Toggle shuffle to update the order of the display.
      queue.enableShuffle();
      queue.disableShuffle();
    });
  }, 2000);
}

addJQuery(main);
