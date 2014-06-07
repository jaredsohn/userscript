// ==UserScript==
// @name           Miprimerscript
// @include        http://trophymanager.com/*
// @include        http://static.trophymanager.com/*
// @exclude        http://trophymanager.com/banners*
// @exclude        http://static.trophymanager.com/banners*
// ==/UserScript==

// @version        0.99


if (myurl.match(/players/))

	    function setClubList() {
      // Show clubs for every line of history
      var lastClub;
      $('table.history_table div.club_name').each(function (index) {
        var currentClub = $(this).html();

        // Replace club name on dash, store club name otherwise
        if (currentClub == '-') {
          $(this).html(lastClub);
        }
        else {
          lastClub = currentClub;
        }
      });
    }