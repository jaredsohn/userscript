// ==UserScript==
// @name           phaze movie category
// @namespace      http://www.coolhd.in/
// @include        http://www.phazeddl.com/submit.php
// ==/UserScript==


	
SelectObject = document.getElementById('autoTypes');
  for(index = 0; 
    index < SelectObject.length; 
    index++) {
   if(SelectObject[index].value == 'Movie')
     SelectObject.selectedIndex = index;
   }
unsafeWindow.auto_types();