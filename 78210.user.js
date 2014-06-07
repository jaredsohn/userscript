// ==UserScript==
// @name         GitHub Gists Link On Profiles
// @namespace    githubGistsProfileLink
// @include      http*://github.com/*
// @datecreated  2010-06-02
// @lastupdated  2010-06-03
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will add a link to a GitHub user's gists to their profile page.
// ==/UserScript==

(function(w, d){
  var actions = d.evaluate("//div[contains(@class,'userpage')]/ul[contains(@class,'actions')]", d, null, 9, null).singleNodeValue;
  if (!actions) return;

  if (!w.GitHub.profileName) return;

  var newLi = d.createElement('li');
  var newA = d.createElement('a');
  newA.href = 'http://gist.github.com/' + w.GitHub.profileName;
  newA.className = "minibutton btn-msg";
  var newSpan = d.createElement('span');
  newSpan.innerHTML = 'Gists';
  newA.appendChild(newSpan);
  newLi.appendChild(newA);
  actions.insertBefore(newLi, actions.firstChild);
})((unsafeWindow || window), document)
