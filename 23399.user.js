   // ==UserScript==
   // @name          ORKUT spin in your profile name
   // @description   Get spin in your prof name like this one   http://www.orkut.com/Profile.aspx?uid=12104562956028501111
   // @author          DJ
   // @include     http://www.orkut.com/Profile.aspx*
   // ==/UserScript==
   if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
      var p = document.getElementsByTagName('h1')[0];
      p.innerHTML += "<img src='http://img1.orkut.com/img/spin.gif''>";   
   }