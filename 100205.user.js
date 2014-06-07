// ==UserScript==
// @id            raptor-gif-hell-BludgeoningDeath
// @name          Raptor GIF Hell
// @author        BludgeoningDeath
// @copyright     BludgeoningDeath
// @namespace     http://www.reddit.com/r/reddit.com/comments/geduj/everytime_i_see_a_gif_i_wish_it_was_this_one/
// @version       1.0
// @license       GPL: http://www.gnu.org/copyleft/gpl.html
// @description   Replace all GIFs with The Raptor
// @include       *
// @exclude       http://assets.sbnation.com/assets/516980/2009.gif
// @run-at        document-start
// ==/UserScript==

var raptorGif = 'http://assets.sbnation.com/assets/516980/2009.gif';

if (window.location.toString().search(/\.gif$/) != '-1') {
  window.location = raptorGif;
}

function raptorMe() {
  var imgs = document.getElementsByTagName("img");
  for (var i = 0; i < imgs.length; i++) {
    var imgsrc = imgs[i].src;
    if (imgsrc && imgsrc.search(/\.gif$/) != '-1') {
	    imgs[i].src = raptorGif;
    }
  }
};

window.addEventListener('load', raptorMe, true);

