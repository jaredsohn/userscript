// ==UserScript==
// @name          DNUK keyboard navigation
// @include       http://www.doctors.net.uk/forum/viewPost.aspx*
// @author        Christopher Lam
// ==/UserScript==

(function() {
  var i,li,a,key;
  all = document.getElementsByTagName('li');
  for (i=0; i < all.length; i++) {
    li = all[i];
    if (i < 10) {
        a = li.firstChild;
        key = ((i+1) % 10).toString();
        a.setAttribute('accesskey', key)
        a.textContent = '['+key+'] '+a.textContent;
    }
  }
  
  nextButton = document.getElementById('NavBar1_NextPost');
  nextButton.setAttribute('accesskey',']');
  
  prevButton = document.getElementById('NavBar1_PreviousPost');
  prevButton.setAttribute('accesskey','[');
  
  topicButton = document.getElementById('NavBar1_ToTopic');
  topicButton.setAttribute('accesskey','.');
})();


