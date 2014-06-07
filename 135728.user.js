// ==UserScript==
// @name                Remove BronyCon RSVP List
// @namespace	        http://www.bronycon.org/
// @description	        Removes the RSVP list from the BronyCon Summer 2012 meetup page
// @include		http://www.meetup.com/BronyCon/events/47095752/*
// ==/UserScript==

var rsvp_list = document.getElementById("rsvp-list");
rsvp_list.parentNode.removeChild(rsvp_list);