// ==UserScript==
// @name          googleOgle: SI Swimsuit & Maxim 100
// @namespace     http://www.alkemis.com/gm
// @description   Change links for SI Swimsuit Models and Maxim 100 to go to Google Images
// @include       http://sportsillustrated.cnn.com/swimsuit/collection/
// @include       http://www.maximonline.com/girls_of_maxim/index_gallery.html
// ==/UserScript==


(function() {

  reStripHTML= /<\S[^>]*>/g; 
  tableObjs= document.getElementsByTagName("table");
  for (t=0;t<tableObjs.length;t++) {
   if (
       tableObjs[t].className=="cnnSwimColModelListFront" || //SI
       (tableObjs[t].innerHTML.indexOf(' class="standard"')>0 && tableObjs[t].innerHTML.indexOf("<table")<1) //Maxim
      ) modAllTDs(tableObjs[t]);
  }

  function modAllTDs(containerObj) {
   tdObjs= containerObj.getElementsByTagName("td");
   for (td=0;td<tdObjs.length;td++) {
    aObjs= tdObjs[td].getElementsByTagName("a");
    if (aObjs) {
     if (aObjs[0]) {
      str= aObjs[0].innerHTML.replace(reStripHTML,"");
      if (str) {
       tdObjs[td].innerHTML= "<span style='color:blue; '>gO:</span> " +tdObjs[td].innerHTML;
       aObjs[0].href= "googleOgle: " +str;
       aObjs[0].onclick= 
        function() {
         googleWindow(this);
         return false;
        };
      }
     }
    }
   }
  }

  function googleWindow(aObj) {
   url= "http://images.google.com/images?q=" +aObj.innerHTML.replace(reStripHTML,"");
   gWindow= window.open(url,"gW");
   gWindow.focus();
  }

})();

