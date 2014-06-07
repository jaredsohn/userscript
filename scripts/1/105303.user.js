// ==UserScript==
// @name           es-jira-colors
// @namespace      es-internal-web-plugin
// @include        https://homer.gk.gk-software.com/browse/*
// @include        https://jira.gk.gk-software.com/browse/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
  var colors = {
    implementation:  '#d6e4ff',
    specification:   '#daffd6',
    translation:     '#feffd6',
    businessreq:     '#ebd6ff',
    bug:             '#ff904e'
  };
  var bgElements = [
    'body',
    '.item-header',
    '.footer',
    '.command-bar',
    '.item-header'
  ];
  var defaultColor = '#f7f7f7';
  var issueType = $('#type-val').text().trim().toLowerCase();
  var color = colors[issueType] || defaultColor;
  $(bgElements.join(',')).css('background-color', color);
});