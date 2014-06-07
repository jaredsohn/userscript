   1. // ==UserScript==
   2. // @name Ur Community Link in Home Page..
   3. // @description puts ur community link in ur homepage..
   4. // @include http://www.orkut.com/*
   5. // ==/UserScript==
   6.
   7. var td=document.getElementsByTagName("ul")[1];
   8. td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/Community.aspx?cmm=41271019'>No Life Without Friends™</a>&nbsp;|&nbsp;</li>";