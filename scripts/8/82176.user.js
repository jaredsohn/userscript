// ==UserScript==
// @name           Status Bar
// @description    Replaces the statusbar to save some screen space, modified from the original Status Bar script by Bennett Blodinger
// @version        1.0.0
// ==/UserScript==

var GMStatusBar = document.createElement('div');
GMStatusBar.id = 'GMStatusBar'

GM_addStyle("#GMStatusBar { background-color: #333; color: #fff; position: fixed; height: 22px; line-height: 22px; bottom: 0px; left: 0px; display: none; padding: 0px 10px; z-index: 9999; opacity: 0.9; font-size: 10px; }");

document.body.appendChild(GMStatusBar);

for (var index in document.links) {
  var link = document.links[index];

  link.addEventListener('mouseover', function(event) {
    GMStatusBar.innerHTML = event.currentTarget.href;
    GMStatusBar.style.display = 'block';
  }, true);

  link.addEventListener('mouseout', function(event) {
    GMStatusBar.innerHTML = '';
    GMStatusBar.style.display = 'none';
  }, true);
}
