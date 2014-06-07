// ==UserScript==
// @name           No more Masters of Unicorns!
// @namespace      DavidJCobb
// @include        http://forums.halo.xbox.com/*
// @include        https://forums.halo.xbox.com/*
// @include        http://forums.halowaypoint.com/*
// @include        https://forums.halowaypoint.com/*
// ==/UserScript==

$("#yafpage_posts div.yafUserBox span.rank").each(
   function() {
      var T = $(this);
      var kill = "Master of Unicorns";
      var fire = "Unranked";
      if (T.text().indexOf(kill) >= 0)
         T.text(fire).attr("title", "Rank: " + fire);
   }
);