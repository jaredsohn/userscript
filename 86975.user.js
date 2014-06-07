// ==UserScript==
// @name           TO
// @namespace      mTurk
// @include        https://www.mturk.com/mturk/*
// ==/UserScript==

GM_addStyle(
  '#hintDiv { display: none; background-color: #FFFCDF; border: 1px solid #000; padding: 3px; position: absolute; font: bold 11px "Courier New"; }'+
  '#hintDiv.show { display: block; }'
);

var ratings = {}
var currentRequester = '';
var hintDiv = document.createElement('div');
hintDiv.id = 'hintDiv';
document.body.appendChild(hintDiv);

var links = document.links;
for (var i=0; i<links.length; i++) {
  if (links[i].href.indexOf('requesterId=') != -1)
  links[i].addEventListener('mouseover', function (e) {
    hintDiv.style.top = (e.clientY+10)+'px';
    hintDiv.style.left = (e.clientX+10)+'px';
    var requesterId = currentRequester = this.href.match(/requesterId=(.+?)(#|&|$)/)[1];
    if (!ratings[requesterId]) {
      ratings[requesterId] = 'Loading...';
      GM_xmlhttpRequest({ method: "GET", url: 'http://turkopticon.differenceengines.com/attrsv2/'+requesterId, onload: function (response) {
        ratings[requesterId] = response.responseText != 'null' ? response.responseText.replace(/:\D+/g, ': ').replace('numReports:', 'reports: ') : 'No info';
        if (currentRequester == requesterId) showHint(requesterId);
      }});
    }
    showHint(requesterId);
  }, false);
  
  links[i].addEventListener('mouseout', function () {
    hideHint();
  }, false);
  
  links[i].addEventListener('mousemove', function (e) {
    hintDiv.style.top = (e.clientY+15)+'px';
    hintDiv.style.left = (e.clientX+10)+'px';
  }, false)
}

function hideHint()
{
  if (hintDiv) hintDiv.className = 'hide';
}

function showHint(requesterId)
{
  hintDiv.innerHTML = requesterId ? ratings[requesterId] : 'Loading...';
  hintDiv.className = 'show';
}