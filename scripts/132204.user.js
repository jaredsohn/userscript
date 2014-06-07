// ==UserScript==
// @name           Ultra Hardcore Despoiler
// @namespace      127.0.0.1
// @description    Hides comments in Ultra Hardcore videos to prevent spoiling the video.
// @include        http*youtube.com/watch?v=*
// ==/UserScript==

// User configurable variables...
var commentsLabel = 'Toggle Comments';
var conditionalTitle = ['Ultra Hardcore', 'UHC'];
var defaultOption = 'none';
// End config options.

var shownComments = 0;
var vidTitle = document.getElementById('eow-title');
var commentsArea = document.getElementById('comments-view');
var watchActions = document.getElementById('watch-actions');
var buttonClasses = 'yt-uix-button-default yt-uix-button';
var toggleButton = null;

function main() {
  
  function toggleComments() {
    shownComments += 1;
    if (shownComments % 2 == 1) {
      commentsArea.style.display = 'block';
    }
    else {
      commentsArea.style.display = 'none';
    }
  }
  
  toggleButton = document.createElement('input');

  // Button attributes...
  toggleButton.setAttribute('type', 'button');
  // The text to be displayed on the button (can be changed above)...
  toggleButton.setAttribute('value', commentsLabel);
  toggleButton.setAttribute('class', buttonClasses);

  watchActions.insertBefore(toggleButton, document.getElementById('watch-flag'));

  // Comments will be invisibile by default (can be changed above)...
  commentsArea.style.display = defaultOption;
  
  toggleButton.addEventListener('mouseup', toggleComments, false);
}

// Just in case the default option is changed by the user...
if (defaultOption == 'none') {
  shownComments = 0;
}
else {
  shownComments = 1;
}

// Checks to see whether key words (can be customized above) are in the video title; if so, it launches the main() function...
for (var x = 0; x < conditionalTitle.length; x++) {
  if (vidTitle.innerHTML.indexOf(conditionalTitle[x]) > -1) {
    main();
  }
}