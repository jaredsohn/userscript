# // ==UserScript==
# // @name          Neopets - Grumpy Old King Randomizer
# // @namespace     http://userscripts.org/users/39597
# // @description   Randomly chooses question and answer to submit.
# // @include       http://www.neopets.com/*
# // @include       http://neopets.com/*
# // ==/UserScript==
# //
# // ==Features==
# // ==1.0==
# // Grumpy Old King - Chooses a randomized question and answer.  Changes results page to

#
# var loc = document.location.href;
# var frm = document.forms[1];
#
# // // // // The Kings
# if (loc.match(/neopets\.com\/medieval\/(wise|grumpy)king\.phtml/)) {
#   for (var i = 0; i < frm.elements.length; i++) {
#     if (frm.elements[i].name) {
#       var thisChoice = Math.ceil(Math.random()*(frm.elements[i].options.length - 1));
#       frm.elements[i].options.selectedIndex = thisChoice;
#     }
#   }
# }
#  
# else if (loc.match('neopets.com/medieval/grumpyking2.phtml')) {
#   if (document.referrer.match(/\?/) == null){
#     if (frm.action.match('index_castle.phtml')){
#       frm.action = 'grumpyking.phtml';
#       frm.elements[0].value = 'Back to the Grumpy Old King!';
#     }
#   }
# }