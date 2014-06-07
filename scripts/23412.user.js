// ==UserScript==
// @namespace http://ouseful.open.ac.uk/iPaper/
// @name iPaper this (embed)
// @description Runs the iPaper this (embed) bookmarklet from http://ouseful.open.ac.uk/iPaper/
// @include       *
// @exclude       https://*
// ==/UserScript==

javascript:(function(){var d=document;var db=d.body;var s=d.createElement('script');s.type='text/javascript';var t=d.createTextNode('var scribd_publisher_id = \'pub-64160908907150939988\';var scribd_type = 2;var scribd_keep_original_link = 1;var scribd_ipaper_params = [];scribd_ipaper_params[\'public\'] =true;');s.appendChild(t);db.appendChild(s);s=d.createElement('script');s.src='http://www.scribd.com/javascripts/auto.js';db.appendChild(s);})()