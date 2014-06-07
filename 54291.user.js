// ==UserScript==
// @name           Wiki audio/video embed
// @namespace      ratherodd.com
// @description    Embeds linked audio and video into wiki articles using the new HTML 5 audio and video tags
// @include        http://*/wiki/*
// @exclude        http://*/wik/File:*
// @exclude        http://*/wiki/Image:*
// ==/UserScript==
GM_addStyle('audio, video {list-style:none}');
var bodyContent = document.getElementById('bodyContent'), containers = {}, k = 0;
var anchors = document.evaluate("//a[starts-with(@href, 'http://upload.wikimedia.org/') and (substring(@href, string-length(@href)-3) = '.ogg' or substring(@href, string-length(@href)-3) = '.ogv' or substring(@href, string-length(@href)-3) = '.wav')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, bodyContent);
for (var i = 0, j = anchors.snapshotLength; i < j; i++) {
  anchors.snapshotItem(i).addEventListener('click', makeContainer, false)
}

function makeContainer(e, media) {
  e.preventDefault();
  if (containers[this.rel]) {
    var container = containers[this.rel]
    if (container.currentTime > 0 && !container.parentNode) {
      this.parentNode.parentNode.insertBefore(container, this.parentNode);
    }
    container.play();
    return;
  }
  var anchor = this;
  if (!this.rel) this.rel = 'media' + k++;
  var ext = this.href.substring(this.href.length - 3);
  if (!media) var media = ext === 'wav' ? 'audio' : 'video' 
  var container = containers[this.rel] = document.createElement(media);
  container.setAttribute('src', this.href);
  container.setAttribute('controls', null);
  container.addEventListener('durationchange', function() {
    if (media !== 'audio') {
      if (this.videoWidth) {
        anchor.parentNode.parentNode.insertBefore(this, anchor.parentNode);
        this.width = Math.min(this.videoWidth, bodyContent.clientWidth);
      }
      else {
        delete(containers[anchor.rel]);
        makeContainer.call(anchor, e, 'audio');
        return;
      }
    }
    this.play();
  }, false);
  container.load();
}