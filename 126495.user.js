// ==UserScript==
// @name            Yammer-Fluid
// @description     Yammer extension for FluidApp. Adds a dock badge when you have unread messages in yammer. 
// @version         0.11
// @copyright       2012, Philip Gatt
// ==/UserScript==


window.fluid.dockBadge = '';
setTimeout(updateDockBadge, 1000);
setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 15000);

function updateDockBadge() {
  var newBadge = '';

  // loop thru anchor tags
  var anchorEls = document.getElementsByTagName('span');
  //console.log('anchors: ' + anchorEls.length);

  var regex = /Click to see (\d+) new message/;

  for (var i = 0; i < anchorEls.length; i++) {
    if (anchorEls[i].classList.contains('yj-notice-text')) {
      var anchorEl = anchorEls[i];
      if (anchorEl.offsetHeight == 0 && anchorEl.offsetWidth == 0) {
        continue;
      }
      var text = '' + anchorEl.innerText;
      if (!text.length) { 
        continue;
      }
      var res = text.match(regex);
      if (res && res.length > 1) {
        //console.log('res: '+ res);
        newBadge = res[1];
        break;
      }
    }
  }

  window.fluid.dockBadge = newBadge;
}

