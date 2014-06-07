// ==UserScript==
// @name        ScrollFix
// @namespace   http://jental.name/scrollfix
// @include     http://spisok.math.spbu.ru/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant       none
// @version     1.11
// ==/UserScript==

(function() {
  var leftColumnContent = $("#l")[0].outerHTML;
  $("#l").html("");
  $("#l").attr("id", "lo");
  var rightColumnContent = $("#r")[0].outerHTML;
  $("#r").html("");
  $("#r").attr("id", "ro");
  var leftArrowContent = $("#al")[0].outerHTML;
  $("#al").html("");
  $("#al").attr("id", "alo");
  var rightArrowContent = $("#ar")[0].outerHTML;
  $("#ar").html("");
  $("#ar").attr("id", "aro");

  var placeholders = $("#main td.w");
  $(placeholders[0]).append(leftColumnContent);
  $(placeholders[0]).append(leftArrowContent);
  $(placeholders[1]).append(rightColumnContent);
  $(placeholders[1]).append(rightArrowContent);

  $("#l").css("position", "static");
  $("#l").css("min-height", "768px");
  $("#r").css("position", "static");
  $("#r").css("min-height", "768px");

  var chkSize_orig = window.chkSize;
  window.chkSize = function() {
    chkSize_orig();
    $(oL).css("height", "100%");
    $(oR).css("height", "100%");
    $(oAr).css("display", "block");
    $(oAl).css("display", "block");
  }
})();
