// ==UserScript==
// @name           es-jira-flags
// @namespace      es-internal-web-plugin
// @include        https://homer.gk.gk-software.com/*
// @include        https://jira.gk.gk-software.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
  var imgUrlPath = 'http://home.es.gk-software.com/~tkrejci/';
  var urlPath = window.location.pathname;
  var flaggedPages = {
    browse: {
      regex: /browse/i,
      elems: {
        '#customfield_10200-val a': 'German',
        '#customfield_10201-val a': 'Czech',
        '#customfield_10202-val a': 'English'
      },
      appendFunc: function(flagElems) {
        appendFlags(flagElems, '4', false);
      }
    },
    create: {
      regex: /CreateIssue/i,
      elems: {
        'label[for=customfield_10200]': 'German',
        'label[for=customfield_10201]': 'Czech',
        'label[for=customfield_10202]': 'English'
      },
      appendFunc: function(flagElems) {
        var issueType = $('#issue-create-issue-type').text().trim().toLowerCase();
        if (issueType === 'specification') {
          appendFlags(flagElems, '-9', true);
        }
      }
    }
  };
  
  for (var page in flaggedPages) {
    var logic = flaggedPages[page];
    if (logic.regex.test(urlPath)) {
      logic.appendFunc(logic.elems);
      break;
    }
  }
  
  function appendFlags(flagElems, offsetY, removeLangName) {
    for (var flagElem in flagElems) {
      var lang = flagElems[flagElem];
      var imgName = lang.toLowerCase();
      var flag = '<img src="' + imgUrlPath + 'flag_' + imgName + '.png" alt="' + lang + '" title="' + lang + '" style="float:left; padding-right: 5px; margin-top: ' + offsetY + 'px"/>';
      if (removeLangName) {
        $(flagElem).text($(flagElem).text().replace(lang + ' ', ''));
      }
      $(flagElem).prepend(flag);
    }
  }
});