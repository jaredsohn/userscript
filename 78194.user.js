// ==UserScript==
// @name         GitHub Compare Branch w/ Master Link
// @namespace    githubCompareBranchMaster
// @include      http*://github.com/*/*
// @datecreated  2010-06-02
// @lastupdated  2010-06-03
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will add a link to every page w/in a branch of a repo on GitHub that will allow you to quickly compare the branch to the master branch, if the branch is not the master.
// ==/UserScript==

(function(w, d){
setTimeout(function() {
  var branchDisplay = d.evaluate("//ul[contains(@class,'tabs')]/li[contains(@class,'contextswitch')]", d, null, 9, null).singleNodeValue;
  if (!branchDisplay) return;

  var isMaster = d.evaluate(".//code[text()='master']", branchDisplay, null, 9, null).singleNodeValue;
  if (isMaster) return;

  var projectLink = d.location.href.match(/https?:\/\/github.com\/[^\/]+\/([^\/]+)/i)[0];
  var curRef = (w.GitHub.currentRef != "") ? w.GitHub.currentRef : w.GitHub.currentCommitRef;

  var newSpan = d.createElement('span');
  newSpan.setAttribute("class", "toggle leftwards");
  var newLink = d.createElement('a');
  newLink.id = "ev-compare2MasterLink";
  newLink.href = projectLink + "/compare/master..." + curRef;
  var newEM = d.createElement('em');
  newEM.innerHTML = 'Compare: ';
  var newCode = d.createElement('code');
  newCode.innerHTML = 'master';
  newLink.appendChild(newEM);
  newLink.appendChild(newCode);
  newSpan.appendChild(newLink);
  branchDisplay.appendChild(newSpan);

  GM_addStyle(
    '.pagehead ul.tabs li.contextswitch span.toggle {line-height: 0; height: auto;}' +
    '#ev-compare2MasterLink {font-size: 11px; float: auto !important; line-height: 0; height: auto; padding: 0; margin: 0;}'
  );
}, 999);
})((unsafeWindow || window), document);
