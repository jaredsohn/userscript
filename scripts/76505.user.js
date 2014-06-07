// ==UserScript==
// @name           google suggest - select candidate with the Tab key
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://www.google.*
// @version        0.6
// @date           2010051409
// ==/UserScript==

document.getElementsByClassName('lst')[0].addEventListener('keydown', function(e) {
  var evt = document.createEvent('KeyboardEvent'),
  suggestHidden = document.getElementsByClassName('gac_od')[0].style.visibility === 'hidden';

  if (!e.shiftKey && e.keyCode === 9) {
    if (suggestHidden)
      return;
    e.preventDefault();
    evt.initKeyEvent(
                      'keypress',        //  in DOMString typeArg,
                       true,             //  in boolean canBubbleArg,
                       true,             //  in boolean cancelableArg,
                       null,             //  in nsIDOMAbstractView viewArg, Specifies UIEvent.view. This value may be null.
                       false,            //  in boolean ctrlKeyArg,
                       false,            //  in boolean altKeyArg,
                       false,            //  in boolean shiftKeyArg,
                       false,            //  in boolean metaKeyArg,
                       40,               //  in unsigned long keyCodeArg,
                       0);               //  in unsigned long charCodeArg);
    this.dispatchEvent(evt);
  }
  else if (e.shiftKey && e.keyCode === 9) {
    if (suggestHidden)
      return;
    e.preventDefault();
    evt.initKeyEvent(
                      'keypress',       //  in DOMString typeArg,
                      true,             //  in boolean canBubbleArg,
                      true,             //  in boolean cancelableArg,
                      null,             //  in nsIDOMAbstractView viewArg, Specifies UIEvent.view. This value may be null.
                      false,            //  in boolean ctrlKeyArg,
                      false,            //  in boolean altKeyArg,
                      false,            //  in boolean shiftKeyArg,
                      false,            //  in boolean metaKeyArg,
                      38,               //  in unsigned long keyCodeArg,
                      0);               //  in unsigned long charCodeArg);
    this.dispatchEvent(evt);
  }
}, false);