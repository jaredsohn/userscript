// ==UserScript==

// @name          FaceBookHidingNewListsCounts

// @namespace     WP

// @description   Hiding post counts of new Facebook's lists

// @include       http://www.facebook.com/
// @include       https://www.facebook.com/

// ==/UserScript==



var listsNav = document.getElementById('listsNav');
var lists = listsNav.getElementsByClassName('sideNavItem stat_elem');

for (i=0; i<lists.length; i++)

{
  
  c = lists[i].getElementsByClassName('rfloat');
  c[0].style.visibility = 'hidden';

}

