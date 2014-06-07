// ==UserScript==
// // @name        VK onunload
// // @include     http://vk.com/*
// // @include     https://vk.com/*
// // @run-at      document-start
// // ==/UserScript==
// This function is going to be stringified, and injected in the page
var code = function() {
    window.addEventListener('beforeunload', function () {
      return audioPlayer.id !== null ? "music’s playing, you sure you wanna leave?" : void 0;
    });
};

var script = document.createElement('script');
script.textContent = '(' + code + ')()';
(document.head || document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
