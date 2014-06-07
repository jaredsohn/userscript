// ==UserScript==
// @name         GitHub Move Master Branch To Top Of Switch Branch List
// @namespace    githubMoveMaster2Top
// @include      http*://github.com/*/*
// @datecreated  2010-06-02
// @lastupdated  2010-06-03
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will move the master branch to the top of the 'switch branches' drop down list.
// ==/UserScript==


(function(w, d){
setTimeout(function() {
  var switchBranches = d.evaluate("//div[contains(@class,'subnav-bar')]//a[contains(text(),'Switch Branches')]", d, null, 9, null).singleNodeValue;
  if (!switchBranches) return;

  switchBranches = switchBranches.nextSibling.nextSibling;
  if (!switchBranches || switchBranches.tagName != 'UL') return;

  var master = d.evaluate(".//li/a[text()='master']", switchBranches, null, 9, null).singleNodeValue;
  if (!master) master = d.evaluate(".//li/strong[contains(text(),'master ')]", switchBranches, null, 9, null).singleNodeValue;
  if (!master) return;

  switchBranches.insertBefore(master.parentNode, switchBranches.children[0]);
}, 998);
})((unsafeWindow || window), document);
