// ==UserScript==
// @name        Runkeeper: Miles and Kilometers
// @namespace   http://userscripts.org/users/ccjr/runkeeper
// @description A script for Runkeeper that puts the distances in miles and kilometers.
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include     http://runkeeper.com/*
// @include     http://*.runkeeper.com/*
// @history     0.01 Testing initial version.
// ==/UserScript==

//const version = '0.01';
//ScriptUpdater.check(102220, version);

alert('my GM script - start.');

$('#feedItemsOuterContainer .detailBox .mainText:contains("Completed")').each(function(index) {
  var str = $.trim($(this).text());
  var distance_miles = str.match(/([0-9\.]*)\smi/)[1];
  var distance_km = (distance_miles * metersPerMile / 1000).toFixed(2);
  $(this).append("<small>(" + distance_km + "km)</small>");
});

alert('my GM script - end.');
