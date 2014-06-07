// ==UserScript==
// @name            Stop Capitalizing Every Fucking Word In Your Headlines
// @version         20140410a
// @namespace       CAPITALFUCKINGLETTERS
// @homepage        none
// @downloadURL     none
// @icon            none
// @description     Stops Every Fucking Word In Headlines From Being Capitalized
// ==/UserScript==

// This script is licensed under the BSD 2-clause license

var tags = document.getElementsByTagName('h1');
for (var i_tag = 0; i_tag < tags.length; i_tag++) {
  var words = tags[i_tag].textContent.split(' ');
  for (var i_word = 1; i_word < tags.length; i_word++) {
    words[i_word] = words[i_word].toLowerCase();
  }
  tags[i_tag].textContent = words.join(' ');
}