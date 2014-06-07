// ==UserScript==
// @name         GitHub Your Fork Switcher
// @namespace    githubYourForkSwitcher
// @include      http*://github.com/*/*
// @datecreated  2010-06-02
// @lastupdated  2010-06-04
// @version      0.2
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will make the ux of switching from your fork to the parent project much better, because you won't be taken to the root of the project when you switch, but instead you will be taken to the same page on the other repo.
// ==/UserScript==

(function(d){

function onOtherFork(yourForkBtn) {
  var baseURL = yourForkBtn.href;
  var switchURL = baseURL + d.location.href.replace(/https?:\/\/github\.com(\/[^\/]+){2}/i, "");
  yourForkBtn.href = switchURL;
  var newForkFlag = d.createElement('span');
  newForkFlag.setAttribute("class", "fork-flag");
  newForkFlag.innerHTML =
      "<span class='text'>your fork <a href='" +
      baseURL +
      "'>" +
      yourForkBtn.href.match(/https?:\/\/github\.com\/([^\/]*\/[^\/]*)/i)[1] +
      "</a></span>";

  var h1 = d.evaluate("//div[contains(@class,'site')]//h1", d, null, 9, null).singleNodeValue;
  h1.appendChild(newForkFlag);

  var class = h1.parentNode.getAttribute("class") + " fork";
  h1.parentNode.setAttribute("class", class);
}

function onYourFork(forkFlagLink) {
  var switchURL = forkFlagLink.href + d.location.href.replace(/https?:\/\/github\.com(\/[^\/]+){2}/i, "");

  var actions = d.evaluate("//ul[contains(@class,'actions')]", d, null, 9, null).singleNodeValue;
  if (!actions) return;

  var newBtn = d.createElement('li');
  newBtn.class = "";
  var newLink = d.createElement('a');
  newLink.href = switchURL;
  newLink.setAttribute("class", "minibutton btn-fork"); 
  newLink.innerHTML = "<span><span class='icon'></span>Parent Fork</span>";
  newBtn.appendChild(newLink);
  actions.insertBefore(newBtn, d.getElementById('pull_request_item'));

}

setTimeout(function() {
  var yourForkBtn = d.getElementById('your_fork_button');
  if (yourForkBtn && !/#$/i.test(yourForkBtn.href)) {
    onOtherFork(yourForkBtn);
    return;
  }

  var forkFlagLink = d.evaluate("//span[contains(@class,'fork-flag')]/span/a", d, null, 9, null).singleNodeValue;
  if (forkFlagLink) {
    onYourFork(forkFlagLink);
    return;
  }
}, 999);

})(document);
