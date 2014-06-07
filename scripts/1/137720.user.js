// ==UserScript==
// @name        Forum Hide Post
// @namespace   srazzano
// @description Hide unwanted posts/posters.
// @include     http://forum.userstyles.org*
// @version     1.0.1
// ==/UserScript==

(function() {
  // edit to suit (i = ignore case) 
  // Example: [/hideheader/i] For multiple entries separate with comma and no spacing.
  var hideThese = [/hideheader/];
  var pList = document.getElementsByClassName("ProfileLink");
  for(var i = 0; i < pList.length; i++) { 
    var link = pList[i].title; 
    for(var j = 0; j < hideThese.length; j++) 
      if(link.match(hideThese[j]) != null) pList[i].offsetParent.style.display = "none"; 
  } 
})();