// ==UserScript==
// @name          fb no suggested posts
// @namespace     fb
// @description   my second, remove suggested posts
// @include        http://*.facebook.com/
// @include        https://*.facebook.com/

// @grant					none
// ==/UserScript==


function removeSuggestedPosts(){
  var docSpans = document.getElementsByTagName('span');
  for(i=0;i<docSpans.length;++i){
    theSpan = docSpans[i];
    if (theSpan.textContent == "Suggested Post"){
      theSpan.parentElement.parentElement.parentElement.style.display = "none";
    }
  };
};

window.addEventListener("scroll", removeSuggestedPosts, false);

removeSuggestedPosts();