// ==UserScript==
// @name           Checkbox Clicker 1.0
// @namespace      Wilhackco xD
// @include        *
// ==/UserScript==
window.setTimeout (function() {
  var fn=function(evt) {  // called when a checkbox is clicked
    if (!evt.screenX && !evt.screenY) return;  // don't parse simulated clicks
    if (evt.ctlKey || evt.altKey) return;  // if non shift => exit
    var former = arguments.callee.prior;   // prior pressed checkbox
    var shiftP = evt.shiftKey && former;   // shift key pressed AND prior checkbox click
    if (shiftP) {
      if (former==this) return;
      var check = arguments.callee.prior.checked;  // state of prior checkbox

      var bubble = function(elem) { // return an array of ancestors
        for (var L=0, aV = [elem]; aV[L++]!=document.body; aV[L] = aV[L-1].parentNode);
        return aV; }
      var aPar1 = bubble (former), L1 = aPar1.length;   // ancestors of former
      var aPar2 = bubble (this),   L2 = aPar2.length;   // ancestors of this
      // Percolate backwards to find a common ancestor (to minimize extra results)
      for (var pos=0; aPar1[L1-pos]==aPar2[L2-pos]; ++pos);
      var common=aPar1[aPar1.length-pos+1];
      var aCh = common.getElementsByTagName("INPUT");   // get all checkboxes

      // Now set the checkboxes
      var setCheck = function(elem, bState) {
        elem.checked = !bState;
        elem.click(); }   // so any other click handler fires (eg. highlighting)
      for (var i=0,phase=0;i<aCh.length;++i) {
        if (aCh[i].type!="checkbox") continue;
        if (!phase) {  // we don't know which comes first
          if (aCh[i]==this) { phase=former; setCheck(this, check); }
          else if (aCh[i]==former) phase=this; }
        else {
          setCheck (aCh[i], check);
          if (aCh[i]==phase) break; } } }

      // else set the checkbox just clicked as anchor
      if (!evt.shiftKey || !shiftP) arguments.callee.prior = this;
    }

  // assign the same event handler to all checkboxes
  var aCh=document.body.getElementsByTagName("INPUT");
  for (var cb,idx=0;idx<aCh.length;++idx)
    if (aCh[idx].type=="checkbox")
      aCh[idx].addEventListener("click", fn, false);

  }, 20);

// END FILE 