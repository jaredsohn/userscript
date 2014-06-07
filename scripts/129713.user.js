// ==UserScript==
// @name           Memrise French Gender Hilighter
// @namespace      http://userscripts.org/users/slagfan
// @description    Hilight the gender of nouns in memrise when learning introductory french words
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        http://www.memrise.com/cave/*
// ==/UserScript==

var css_f = ".gender_f { color: hotpink !important; }";
var css_m = ".gender_m { color: blue !important; }";

GM_addStyle(css_f);
GM_addStyle(css_m);

function check_again (count) {
  var words = $('.word-value');
  var genders = $('.gender-value');
  if (words.length > 0) {
    $('li.meaning-pres, li.meaning-rev').each(function(i, val) {
      var gender = $('.gender-value', $(this)).text();
      if (gender == 'f') {
        $('.word-value', $(this)).addClass('gender_f');
      } else if (gender == 'm') {
        $('.word-value', $(this)).addClass('gender_m');
      }
    });
  } else {
    var newcount = count - 1;
    setTimeout(function() { check_again(newcount); }, 500);
  }
}

setTimeout(function() {check_again(20); }, 3000); // wait 3 seconds for load

