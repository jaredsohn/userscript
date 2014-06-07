// ==UserScript==
// @name          SteamGifts Redux
// @namespace     http://stj.me
// @description   Reduces the noise when looking at SteamGifts
// @include       http://www.steamgifts.com/
// @version       1.0.0
// @author        St. John Johnson <st.john.johnson@gmail.com>
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

// Based a lot of this code on http://userscripts.org/scripts/show/115103
(function()
{
  // Manage link
  $('a[href="/manage/entries"]').attr('href','/manage/entries/open');

  // Featured
  $('.featured').css('display','none');

  // Add styles
  $('<style>').text(' \
    .sortby {font-weight:normal; margin-right: 20px} \
    .soon {background-color: rgba(255, 255, 0, 0.3);} \
    .real_soon {background-color: rgba(255, 100, 0, 0.3);} \
    .right_now {background-color: rgba(255, 0, 0, 0.3);} \
    .new,.pagination {display:none} \
  ').appendTo('body');

  $('.sub_navigation').append('<span class="sortby">\
    Close within: \
    <select id="time_limit"> \
    <option value="604800">1 Week</option> \
    <option value="86400" selected="selected">1 Day</option> \
    <option value="43200">12 Hours</option> \
    <option value="3600">1 Hour</option> \
    </select> \
    Hide Public: \
    <input type="checkbox" id="public" checked="checked" />\
    Hide Expensive: \
    <input type="checkbox" id="expensive" />\
  </span>');

  $('#time_limit').change(reload);
  $('#public').change(reload);
  $('#expensive').change(reload);

  var my_points = $('#navigation ol').text().match(/Account \((\d+)P\)/)[1];

  // Filter Giveaways
  function filterGiveaways() {
    // Hide ones already entered
    if ($(this).is('.fade')) {
      return false;
    }

    // Hide public ones
    if ($('#public').is(':checked') &&
        !$('.contributor_only', $(this)).length && !$('.group_only', $(this)).length) {
      return false;
    }

    // Hide ones we can't buy due to contrib
    if ($('.contributor_only', $(this)).length && !$('.contributor_only', $(this)).is('.green')) {
      return false;
    }

    // Hide ones we can't afford due to points
    var points = $('.title span', $(this)).text().replace(/[()PNew:]/g, '');
    if ($('#expensive').is(':checked') && points > my_points) {
      return false;
    }

    // Hide ones older than x seconds
    var left = $('.time_remaining strong:first', $(this)).text().split(' ');
    var time = getSeconds(left[0], left[1]);
    if (time > $('#time_limit').val()) {
      return false;
    }

    // Add time unit class
    $(this).addClass(left[1].replace(/s$/, ''));

    // Under 1 hour
    if (time < 3600) {
      $(this).addClass('soon');
    }

    // Under 30 minutes
    if (time < 1800) {
      $(this).addClass('real_soon');
    }

    // Under 15 minutes
    if (time < 900) {
      $(this).addClass('right_now');
    }

    return true;
  }

  // Sort by the population the giveaway is reaching
  function sortPopulation(a,b) {
    var aValue = $('.contributor_only', $(a)).length + $('.group_only', $(a)).length;
    var bValue = $('.contributor_only', $(b)).length + $('.group_only', $(b)).length;
    return aValue == bValue ? sortContributor(a,b) : (aValue > bValue ? -1 : 1);
  }

  // Sort by the required contributions
  function sortContributor(a,b) {
    var aValue = parseFloat($('.contributor_only', $(a)).text().replace('Contributor ($','').replace(')','').replace(',',''));
    var bValue = parseFloat($('.contributor_only', $(b)).text().replace('Contributor ($','').replace(')','').replace(',',''));
    if (isNaN(aValue)) {
      aValue = 0;
    }
    if (isNaN(bValue)) {
      bValue = 0;
    }
    return aValue == bValue ? sortEntries(a,b) : (aValue > bValue ? -1 : 1);
  }

  // Sort by the time left
  function sortTimeLeft(a,b) {
    var aLeft = $(a).find('.time_remaining strong:first').text().split(' ');
    var bLeft = $(b).find('.time_remaining strong:first').text().split(' ');
    var aValue = getSeconds(aLeft[0], aLeft[1]);
    var bValue = getSeconds(bLeft[0], bLeft[1]);
    return aValue == bValue ? 0 : (aValue > bValue ? -1 : 1);
  }

  // Sort by the number of entries the giveaway has received
  function sortEntries(a,b) {
    var aValue = parseInt($('.entries :first', $(a)).text().replace(',',''), 10);
    var bValue = parseInt($('.entries :first', $(b)).text().replace(',',''), 10);
    return aValue == bValue ? sortTimeLeft(a,b) : (aValue > bValue ? -1 : 1);
  }

  // Calculate seconds left
  function getSeconds(number, unit) {
    switch (unit) {
      case 'month':
      case 'months':
        return getSeconds(number * 4, 'weeks');
      case 'week':
      case 'weeks':
        return getSeconds(number * 7, 'days');
      case 'day':
      case 'days':
        return getSeconds(number * 24, 'hours');
      case 'hour':
      case 'hours':
        return getSeconds(number * 60, 'minutes');
      case 'minute':
      case 'minutes':
        return getSeconds(number * 60, 'seconds');
      case 'second':
      case 'seconds':
        return number;
      default:
        return number;
    }
  }

  function numberOfGiveaways() {
    $('.sub_navigation h1 a').text($('.post').length + ' Giveaways');
  }

  $(document).ready(function() {
    unsafeWindow.$(".post.fade").unbind();
  });


  // Load pagess
  function reload() {
    $('.post').remove();
    var pages = Math.ceil(parseInt($('.results strong:last').html(), 10) / 40);
    for (i = 1; i <= pages; i++) {
      $.ajax({
        type: "get",
        url: "http://www.steamgifts.com/open/page/" + i,
        dataType: "html",
        success: function(data) {
          var new_posts = $('.post', $(data)).filter(filterGiveaways);
          new_posts.add($('.post')).sort(sortPopulation).appendTo('.ajax_gifts');
          numberOfGiveaways();
        }
      });
    }
  }
  reload();

})();