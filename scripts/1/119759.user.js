// ==UserScript==
// @name	Fragment identifier search
// @description	Provides the #~search+terms anchor (raw string version, no regex support)
// @version     0.1
// @author	milki
// @include	http://*
// ==/UserScript==
(function(){


   // if there is a #~... fragment identifier
   if ((location.hash.length > 2) && (location.hash[1] == "~")) {


       // needs jQuery currently
       if (!window.jQuery) {
           var script = document.createElement('script');
           script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
           document.body.appendChild(script);
       }


       // run slightly delayed
       window.setTimeout(function(){
       
       
           // recursively get .offsetTop
           var findoffset = function(el) {
               var y = 0;
               while (el) {
                   y += el.offsetTop;
                   el = el.offsetParent;
               }
               return y;
           }


           // extract text string from #~... fragment identifier
           var string = location.hash.match(/^#~(.+)/); //new RegExp('/^#~([\w\pL.,;:+!$&/()=*_@ -]+)/'));
           if (string[1]) {
               string = string[1].replace(/[+]/, " ");

               // traverse and search text nodes
               var found = $("*").contents().filter(function(){
                    return ((this.nodeType == 3) && (this.nodeValue.indexOf(string) >= 0));
               });
               if (found) {
                   // get parent of found text nodes
                   found = found[0].parentNode;
               
                   // let's go there!
                   $("html,body").animate({'scrollTop': $(found).offset().top}, 500);
               }
           }

       },500);
       

   }
})();
