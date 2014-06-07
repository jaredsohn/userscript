// ==UserScript==
// @name        facebook-anti-subscribe
// @namespace   facebook_anti_subscribe@add.ph
// @description Remove People To Subscribe TO
// @include     http://www.facebook.com/
// @include     http://www.facebook.com/*.php
// @match          http://www.facebook.com/
// @match          http://www.facebook.com/*.php
// @version     1
// @author         albertdiones@gmail.com
// ==/UserScript==

ego_pane = document.getElementById('pagelet_ego_pane_w')
if (ego_pane) {
   ego_divs = ego_pane.getElementsByTagName('div');
   ego_sections = [];

   for (x in ego_divs) {
      ego_div = ego_divs[x];
      if ((" "+ego_div.className+" ").indexOf('ego_section')!==-1) {
         ego_sections[ego_sections.length] = ego_div;
      }
   }

   for (var x=0; x<ego_sections.length; x++) {
      ego_section = ego_sections[x];
      if (ego_section.innerHTML.toLowerCase().indexOf('people to subscribe to')!==-1) {
         console.log(ego_section.innerHTML.toLowerCase().indexOf('people to subscribe to')!=-1);
         people_to_subscribe_to_div = ego_section;
         people_to_subscribe_to_div.parentNode.removeChild(people_to_subscribe_to_div);
      }
   }
}