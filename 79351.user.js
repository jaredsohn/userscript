// ==UserScript==
// @name         StackOverflow Question @placeholder
// @namespace    stackoverflowQuestionPlaceholders
// @include      http://stackoverflow.com/questions/ask
// @datecreated  2010-06-16
// @lastupdated  2010-06-16
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will update the ask a question form on StackOverflow to use @placeholder, instead of their wacky junk.
// ==/UserScript==

(function(d){
  // title
  var title = d.getElementById("title"), text;
  if (title) {
    text = d.evaluate(".//span[contains(@class, 'edit-field-overlay')]", title.parentNode, null, 9, null).singleNodeValue;
    title.setAttribute("placeholder", text.innerHTML);
    text.innerHTML = '';
  }

  // tags
  var tagnames = d.getElementById('tagnames');
  if (tagnames) {
    text = d.evaluate(".//span[contains(@class, 'edit-field-overlay')]", tagnames.parentNode, null, 9, null).singleNodeValue;
    tagnames.setAttribute("placeholder", text.innerHTML);
    text.innerHTML = '';
  }
})(document);
