// ==UserScript==
// @name        Fantasy Anime ETI Topic Labeler
// @namespace   shaldengeki
// @version     0.1
// @description Labels a topic with an anime that's currently-airing.
// @include     http://boards.endoftheinter.net/topics/*
// @include     https://boards.endoftheinter.net/topics/*
// @copyright   2014+, Shal Dengeki
// @grant       GM_xmlhttpRequest
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==

this.$=this.jQuery=jQuery.noConflict(true);

function generateTopicButton(index, topicID) {
  return $('<a></a>').text('+').attr('href', '#').attr('data-row', index).attr('data-topic', topicID).click(function() {
    loadAnimeMenu(this);
  });
}

function submitTopic(elt) {
  var menu = $(elt.previousSibling);
  var parentElt = menu.parent();
  var rowNum = menu.attr('data-row');
  var topicID = menu.attr('data-topic');
  var anime_id = menu.val();
  var username = $('div.userbar').find('>a:first-child').text().split(' (')[0];
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://fantasy.llanim.us/anime/' + anime_id + '/add_topic?user_name=' + encodeURIComponent(username) + '&topic_id=' + encodeURIComponent(topicID),
    onload: function(response) {
      data = $.parseJSON(response.responseText);
      if (typeof(data.error) !== 'undefined') {
        // error
        console.log('Error: ' + data.error);
      }
      var topicButton = generateTopicButton(rowNum, topicID);
      parentElt.empty();
      parentElt.append(topicButton);
    }
  });
}

function loadAnimeMenu(elt) {
  var rowNum = $(elt).attr('data-row');
  var topicID = $(elt).attr('data-topic');
  var menu = $('<select>').attr('id', 'fantasy_anime_label_' + rowNum).attr('data-row', rowNum).attr('data-topic', topicID);
  var button = $('<a></a>').text('Submit').attr('href', '#').click(function() {
    submitTopic(this);
  });
  var parentElt = $(elt).parent();
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://fantasy.llanim.us/anime/current_season',
    onload: function(response) {
      data = $.parseJSON(response.responseText);
      $.map(data, function(val, i) {
        return $('<option>').val(val.mal_id).text(val.title).appendTo(menu);
      });
      parentElt.empty();
      parentElt.append(menu);
      parentElt.append(button);
    }
  });
}

function addTableColumns() {
  $('.grid').find('tr').each(function(index) {
    if (index == 0) {
      // append table heading column
      var headingCol = $('<th>').text('Fantasy Anime');
      $(this).append(headingCol);
    } else {
      // append button.
      var topicLink = $($($(this).find('div.fl')[0]).find('a')[0]).attr('href');
      var topicID = topicLink.split('?topic=')[1];
      var topicButton = generateTopicButton(index, topicID);
      var buttonElt = $('<td>').append(topicButton);
      $(this).append(buttonElt);
    }
  })
}
addTableColumns();