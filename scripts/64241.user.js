// ==UserScript==
// @name  Delicious Tagger
// @namespace  http://satomacoto.blogspot.com/
// @include   http://delicious.com/save?*
// @include   http://www.delicious.com/save?*
// @description  Adds the populer and recommended tags automatically.
// ==/UserScript==

(function () 
{
  var d = document;
  // get tags
  var li = d.getElementById('save-reco-tags');
  if (!li) li = d.getElementById('recommendedField');
  
  var recos = li.getElementsByClassName('m');
  if (recos != null) 
  {
    var newTagsInput = d.getElementById('newTagsInput');
    // set tags
    for (var i = 0; i < recos.length; i++) {
      newTagsInput.value += recos[i].title + " ";
    }
    // focus
    d.getElementById('saveSaveBtn').focus();
  }
})();