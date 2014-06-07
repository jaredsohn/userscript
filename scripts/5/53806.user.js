// ==UserScript==
// @name           Blip.fm Auto song name on Blips
// @namespace      http://www.vortexr.es
// @description    Auto add song's name (author - title) to your Blips
// @date           2009-07-16
// @creator        Ignacio Lago [eXr]
// @include        http://blip.fm/*
// ==/UserScript==
//
// author:  Ignacio Lago [eXr] http://twitter.com/nachoexr
// version: 2009-07-16
//

(function(){
   window.addEventListener('load',
      function()
      {
         document.getElementById('feedme').addEventListener('DOMAttrModified',   //something changed
               function()
               {
                  if(document.getElementById('messageDiv').style.display=='block')  //is message area visible?
                  {
                     msg=document.getElementById('message');               //Blips textarea
                     sel=document.getElementById('selection').innerHTML;   //song's name
                     msg.value=' ♫ '+sel;                                  //message
                     msg.setSelectionRange(0,0);                           //cursor at the beginning
                  }
               },true);
      },false
   );
})();
