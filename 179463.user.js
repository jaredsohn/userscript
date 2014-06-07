// ==UserScript==
// @name       Crunchyroll Queue Fixer
// @namespace  http://myanimelist.net/profile/endium
// @version    0.3
// @description  queue page: automatically put shows with new episodes at top; always show "coming soon" icon on shows with no new episodes.
// @match      http://www.crunchyroll.com/home/queue*
// @copyright  2013+, endium7
// ==/UserScript==


(function() {
  // options
  var rearrange = true;
  var fixIcon = true;
  var minPercentage = 70;
  var comingSoonUrl = "http://static.ak.crunchyroll.com/i/coming_soon_beta_wide.jpg";
  
  // check querystring for "noarrange"
  if (window.location.search === "?norearrange") {
    rearrange = false;
  }

  // actual work
  var queued = document.querySelectorAll("#main_content li.queue-item");
  var toMove = [];

  for (var i = 0, len = queued.length; i < len; i++) {
    var item = queued[i];
    var img = item.querySelector("img");
    var progress = item.querySelector(".episode-progress[style]");

    if (!progress) continue;

    var percentage = parseInt(progress.style.width, 10);

    if (fixIcon && img && img.src !== comingSoonUrl && percentage > minPercentage) {
      img.src = comingSoonUrl;
      progress.style.backgroundColor = "#ccc";
    }

    if (rearrange && percentage < minPercentage && img.src !== comingSoonUrl) {
      toMove.push(item);
    }
  }

  if (rearrange) {
    toMove.reverse();
    for (var i = 0, len = toMove.length; i < len; i++) {
      var parent = toMove[i].parentNode;
      parent.insertBefore(toMove[i], parent.firstChild);
    }
  }

})();
