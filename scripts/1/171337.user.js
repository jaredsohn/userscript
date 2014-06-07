// ==UserScript==
// @name        Github Collapse Diff
// @namespace   https://github.com/matthewrobertson/Github-Collapse-Diff
// @description Hide unimportant diffs when reviewing pull requests or viewing commits on Github
// @include     https://github.com/*
// @author      Matthew Robertson (http://matthewrobertson.org/)
// @contributor Rob Wu (https://robwu.nl/)
// @version     0.0.3
// @grant       none
// ==/UserScript==

(function() {
  var butHtml = '<div class="button-group"><a href="#collapse_diff" style="margin-left: 5px" class="diff-collapse-button minibutton" rel="nofollow">Collapse</a></div>';
  var fileContainers = document.querySelectorAll('#files .file');

  var bindToggler = function(buttonContainer, tableToToggle) {
    buttonContainer.insertAdjacentHTML('afterbegin', butHtml);
    buttonContainer.querySelector('.diff-collapse-button').addEventListener('click', function(e) {
      e.preventDefault();
      if (this.textContent != 'Collapse') {
        this.textContent = 'Collapse';
        tableToToggle.style.display = ''; // Restore original display (table/block)
      } else {
        this.textContent = 'Expand';
        tableToToggle.style.display = 'none';
      }
    }, true);
  };

  for (var i = 0; i<fileContainers.length; ++i) {
    bindToggler(fileContainers[i].querySelector('.meta .actions'),
                fileContainers[i].querySelector('table.file-diff, .diff-table'));
  }
  
  var discussions = document.querySelectorAll('.mini-discussion-bubble-action');
  for (var i=0; i<discussions.length; ++i) {
    var buttonContainer = discussions[i].appendChild(document.createElement('div'));
    buttonContainer.style.cssText = 'float:right';
    bindToggler(buttonContainer, discussions[i].nextElementSibling);
  }
})();