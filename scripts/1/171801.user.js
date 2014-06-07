// ==UserScript==
// @name        T411 Download Column
// @namespace   t411
// @description Adds a DL button to the T411 result list
// @include     http://www.t411.me/torrents/search/*
// @include		http://www.t411.me/top/*
// @version     1.0
// @grant       none
// ==/UserScript==

$.fn.addT411DownloadColumn = function() {
  return this.each(function() {
    var id = this.href.split('?')[1]; // Should be something like 'id=1234'
    var newTdElement = $("<td></td>");
    if( id != undefined && id.match(/id=[0-9]+/) ) {
      var newLinkHtml = '<a href="/torrents/download/?' + id + '"><center><img src="http://www.vakarm.net/statics/images/others/download.png"/></center></a>';
      var newLinkElement = $(newLinkHtml);
      newLinkElement.css("float","left");
      newLinkElement.css("padding-left","7px");
      newLinkElement.appendTo(newTdElement);
    }
    newTdElement.insertBefore($(this).parent());
  });
};

// New distinct column header for downloading
var newThElement = $("<th>DL</th>");
newThElement.insertBefore( $('th:contains(NFO)') );

// Insert all the buttons in the new column
$('a.nfo').addT411DownloadColumn();