// ==UserScript==
// @name        Gmail App Bar
// @namespace   local
// @description Restores the app bar and removes the new app button.
// @include     *://mail.google.com/*
// @version     1
// @grant       none
// ==/UserScript==

function addGlobalStyle(css) {
  try {
    var elmHead, elmStyle;
    elmHead = document.getElementsByTagName('head')[0];
    elmStyle = document.createElement('style');
    elmStyle.type = 'text/css';
    elmHead.appendChild(elmStyle);
    elmStyle.innerHTML = css;
  } catch (e) {
    if (!document.styleSheets.length) {
      document.createStyleSheet();
    }
    document.styleSheets[0].cssText += css;
  }
}
addGlobalStyle('.gb_i {padding: 1px 9px}');
addGlobalStyle('.gb_pj_a {font-size: 13px; font-weight: bold; text-decoration: none; color: rgb(187, 187, 187)}');
addGlobalStyle('.gb_pj_t {background-color: rgb(45, 45, 45);}');
var target = document.getElementsByTagName('body')[0];

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      var linksContainer = document.getElementsByClassName('gb_o gb_v')[0];
      if (!linksContainer) {
        linksContainer = document.getElementsByClassName('gb_o gb_p')[0];
      }
      var divTopParent = document.getElementsByClassName('nH oy8Mbf qp')[0];
      if (linksContainer && divTopParent) {
        observer.disconnect();
        var newDiv = document.createElement('div');
        newDiv.className = "gb_pj_t";
        var addHere = divTopParent.firstChild
        addHere.insertBefore(newDiv, addHere.firstChild);
        liList = linksContainer.getElementsByTagName('li');
        var elm;
        for (var i = liList.length - 1; i >= 0; i--) {
          liList[i].getElementsByClassName('gb_d')[0].className = "";
          liList[i].getElementsByClassName('gb_a')[0].className = "gb_pj_a";
          elm = liList[i].getElementsByClassName('gb_c')[0];
          elm.parentNode.removeChild(elm);
          oldli = liList[i].parentNode.removeChild(liList[i]);
          newDiv.insertBefore(oldli, newDiv.firstChild);
        };
        appButton = document.getElementById('gbwa');
        appButton.parentNode.removeChild(appButton);
        spacer = document.getElementById('gba');
        spacer.setAttribute("style", "height: 80px;");
      }
    }
  });
});

var config = { childList: true, subtree: true };

observer.observe(target, config);
