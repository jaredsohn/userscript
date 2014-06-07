// ==UserScript==
// @name        Facebook Without Application Stories
// @namespace   http://underpantsgnome.com
// @description Facebook without those annoying application stories
// @include     http://www.facebook.com/
// @author      UnderpantsGnome
// ==/UserScript==

function UPGStripApps() {
  
  var stories = document.getElementsByClassName('UIStoryAttachment_Title')
  var i = 0

  while (story = stories[i++]) {
    var rootNode = story.parentElement.parentElement.parentElement.parentElement

    if (rootNode.innerHTML.indexOf('apps.facebook.com') != -1) {
      rootNode.style.display = 'none';
    }
  }
}

window.addEventListener('load', UPGStripApps, false);
document.body.addEventListener('DOMNodeInserted', UPGStripApps, false)
