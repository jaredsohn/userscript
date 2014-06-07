// ==UserScript==
// @name         Facebook Auto Add Friends
// @description  Facebook Auto Add Friends
// @namespace    Facebook
// @version      0.1
// @include      http://www.facebook.com/reqs.php
// @homepage     http://userscripts.org/scripts/review/55753
// ==/UserScript==

var inputbuttons = $$('input.inputbutton');
for (var i = 0; i < inputbuttons.length; i++){
  if (inputbuttons[i].value=="Confirm"){
    if (inputbuttons[i].attributes['onclick'].value.substring(8,24)
                                               == "click_add_friend"){
      inputbuttons[i].click();
    }
  }
}