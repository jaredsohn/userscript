// ==UserScript==
// @name        SteamGifts Enhanced
// @namespace   http://userscripts.org/users/319356
// @description Enhancements for SteamGifts.com
// @downloadURL https://userscripts.org/scripts/source/180730.user.js
// @updateURL   https://userscripts.org/scripts/source/180730.user.js
// @include     http://www.steamgifts.com/
// @include     http://www.steamgifts.com/open
// @include     http://www.steamgifts.com/open/page/*
// @include     http://www.steamgifts.com/new
// @include     http://www.steamgifts.com/new/page/*
// @include     http://www.steamgifts.com/coming-soon
// @include     http://www.steamgifts.com/coming-soon/page/*
// @include     http://www.steamgifts.com/closed
// @include     http://www.steamgifts.com/closed/page/*
// @version     1.0.2013-10-28.02
// @grant       none
// ==/UserScript==

// List of titles to highlight
var highlightedGames = JSON.parse(localStorage.getItem('highlightedGames') || "[]");

// List of titles to hide
var hiddenGames = JSON.parse(localStorage.getItem('hiddenGames') || "[]");

function addStyle(css) {
  var style = document.head.appendChild(document.createElement('style'));
  style.innerHTML = css;
}

function hideGame(title) {
  hiddenGames.push(title);
  localStorage.setItem('hiddenGames', JSON.stringify(hiddenGames));
  location.reload();
}

function highlightGame(title) {
  highlightedGames.push(title);
  localStorage.setItem('highlightedGames', JSON.stringify(highlightedGames));
  location.reload();
}

function unhighlightGame(title) {
  highlightedGames.splice(highlightedGames.indexOf(title), 1);
  localStorage.setItem('highlightedGames', JSON.stringify(highlightedGames));
  location.reload();
}

// Start when page is ready
$(document).ready(function(){

  addStyle('.post { padding: 7px 7px; } ' +
           '.post .left { width: 700px; } ' +
	   '.sgeHighlight { background: #d0ffd0; outline: 1px solid green; } ' +
	   '.sgeTinyButton { margin: 0; padding: 0 2px; height: 15px; font-size: 8px; } ' +
	   '');
  
  // Iterate through all giveaways on page
  $('div.post').each(function() {
    
    var title = $(this).find('div.title a').first().text();
    
    // Hide alredy entered giveaways
    if ($(this).hasClass('fade')) {
      $(this).hide();
      return true;
    }
    
    if ($.inArray( title, hiddenGames) > -1) {
      $(this).hide();
      return true;
    }
    
    // Hide "contributor only" giveaways
    if ($(this).find('div.contributor_only').length) {
      $(this).hide();
      return true;
    }
    
    var entries = $(this).find('.entries').first();
    $(entries).append('<button class="sgeTinyButton" title="Hide all giveaways by that name">Hide</button> ');
    $(entries).find('.sgeTinyButton').first().click(function() { hideGame(title); });
    
    // Highlight if title exists on list of wanted
    if ($.inArray( title, highlightedGames) > -1) {
      $(this).addClass('sgeHighlight');
      $(entries).append('<button class="sgeTinyButton" title="Unhighlight all giveaways by that name">Unhighlight</button>');
      $(entries).find('.sgeTinyButton').last().click(function() { unhighlightGame(title); });
    }
    else {
      $(entries).append('<button class="sgeTinyButton" title="Highlight all giveaways by that name">Highlight</button>');
      $(entries).find('.sgeTinyButton').last().click(function() { highlightGame(title); });
    }
    
  });
  
 
});

