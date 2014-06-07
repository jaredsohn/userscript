// ==UserScript==
// @name        DT auto recruiter
// @namespace   http://www.darkthrone.com/
// @include     http://www.darkthrone.com/recruiter/recruit/*
// @version     1
// @grant	none
// ==/UserScript==


function recruiter_click() {
  var link = document.getElementById('recruit_link');
  window.submit_link_as_post_with_opacity(link, 'recruit_image');
}

setTimeout(recruiter_click, 2500);

