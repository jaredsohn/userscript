// Neopets - Gormball 1 second
// by nungryscpro (nungryscpro@yahoo.com)
// Version 1.0
// Created: 2007.11.18
//
// ==UserScript==
// @name           Neopets - Gormball 1 second
// @namespace      http://userscripts.org/users/22349
// @description    Adds the option to hold the ball for 1 second.
// @include        http://www.neopets.com/space/gormball*
// @include        http://neopets.com/space/gormball*
// ==/UserScript==
//
// They used to have this option but after they revised the game, the only way you 
// were able to hold the ball for 1 second was to refresh the page.
//

if (document.body.innerHTML.indexOf('Your Move') != -1){
  for (x = 0; x < document.forms.length; x++){
    if (document.forms[x].elements[3]){
      if (document.forms[x].elements[3].value == 'Throw!'){
        var onesecond = document.createElement('option');
        onesecond.text = 'Wait 1 second';
        onesecond.value = '1';
        document.forms[x].elements[2].add(onesecond, document.forms[x].elements[2].options[1]);
      }
    }
  }
}