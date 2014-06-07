// ==UserScript==
// @name          stackplonk
// @namespace     stackoverflow
// @description   Allows plonking a user you don't want to help anymore
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include       http://stackoverflow.com/questions/*
// @include       http://stackoverflow.com/users/*
// @include       http://meta.stackoverflow.com/questions/*
// @include       http://meta.stackoverflow.com/users/*
// @include       http://superuser.com/questions/*
// @include       http://superuser.com/users/*
// @include       http://meta.superuser.com/questions/*
// @include       http://meta.superuser.com/users/*
// @author        JB Nizet - http://stackoverflow.com/users/571407/jb-nizet
// ==/UserScript==

(function() {
  function getUserId(link) {
    var href = $(link).attr('href');
    var userId = href.substring(7);
    userId = userId.substring(0, userId.indexOf('/'));
    return userId;
  }
  
  function loadPlonkList() {
    var plonkListAsString = GM_getValue("plonkList");
    var plonkList = [];
    if (plonkListAsString) {
      plonkList = $.parseJSON(plonkListAsString);
    }
    return plonkList;
  }
  
  function savePlonkList(plonkList) {
    GM_setValue("plonkList", JSON.stringify(plonkList));
  }
  
  function isPlonked(userId, plonkList) {
    return ($.inArray(userId, plonkList) >= 0);
  }

  function addPlonkLink(h1) {
    $('#unplonkLink').remove();
    h1.append(' <button id="plonkLink">Plonk</button>');
    $('#plonkLink').click(function(event) {
      var plonkList = loadPlonkList();
      var userLink = $('#mainbar-full .user-tabs-nav a[href^="/users/"]');
      var userId = getUserId(userLink);
      if (!isPlonked(userId, plonkList)) {
        plonkList.push(userId);
        savePlonkList(plonkList);
      }
      addUnplonkLink(h1);
    });
  }
  
  function addUnplonkLink(h1) {
    $('#plonkLink').remove();
    h1.append(' <button id="unplonkLink">Unplonk</button>');
    $('#unplonkLink').click(function(event) {
      var plonkList = loadPlonkList();
      var userLink = $('#mainbar-full .user-tabs-nav a[href^="/users/"]');
      var userId = getUserId(userLink);
      if (isPlonked(userId, plonkList)) {
        var index = $.inArray(userId, plonkList);
        plonkList.splice(index, 1);
        savePlonkList(plonkList);
      }
      addPlonkLink(h1);
    });
  }
  
  if ($('h1#user-displayname').length > 0) {
    var plonkList = loadPlonkList();
    var userLink = $('#mainbar-full .user-tabs-nav a[href^="/users/"]');
    var userId = getUserId(userLink);
    var h1 = $('h1#user-displayname');
    if (isPlonked(userId, plonkList)) {
      addUnplonkLink(h1);
    }
    else {
      addPlonkLink(h1);
    }
  }
  
  if ($('.postcell a[href^="/users/"]').length > 0) {
    var userLink = $('.postcell a[href^="/users/"]');
	var userId = getUserId(userLink);
    var plonkList = loadPlonkList();
    if (isPlonked(userId, plonkList)) {
      $('.postcell').append('<div style="background-color: red; color: white; font-size: x-large; padding: 10px; margin: 5px; text-align: center;">Don\'t answer: this user is plonked</div>');
    }
  }
  
})();
