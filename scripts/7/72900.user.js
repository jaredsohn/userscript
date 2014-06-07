// ==UserScript==
// @name        Facebook: Clean title
// @namespace   http://userscripts.org/scripts/show/72900
// @description Removes "Facebook | " from the title. Also removes the profile name, so "Donald Duck is out smelling flowers" just becomes "is out smelling flowers". I find this makes it far easier to keep track of my tabs.
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @author      Fredrik Bränström
// @version     1.0
// ==/UserScript==

(function () {

// Remove "Facebook | " from title
var ti = document.title;
ti = ti.replace('Facebook | ', '');

// Remove profile name from title when it's not alone
var name = document.getElementById('profile_name');
if (name) {
  name = name.innerHTML;
  if (name != ti) {
    ti = ti.replace(name, '');
  }
}

document.title = ti;

})();
