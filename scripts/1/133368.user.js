// ==UserScript==
// @name        Remove annoying banner from Lotus connections
// @namespace   http://ibm.com/
// @description remove banners
// @include        *ibm.com/blogs*
// @include        *ibm.com/wikis*
// @exclude        *auth/login*
// @exclude        *ibm.com/blogs/roller-ui/login*
// @exclude        *ibm.com/files/login*
// @exclude        *ibm.com/wikis/login*
// @exclude        *auth/error*
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/dojo/1.7.2/dojo/dojo.js
// ==/UserScript==


(function(){
   function RemoveBanner() {
      // Clear the attempt in case
      if (attemptCount++ > 100) 
         window.clearInterval(findMenuSection);

      var banner = document.getElementById("lotusBanner");
      if (banner){
         banner.setAttribute("style","display:none;");
         window.clearInterval(findBannerInterval);
      }
   }

   function AddCloseSidebar() {
      // Clear the attempt in case
      if (attemptCount2++ > 100) 
         window.clearInterval(findMenuSection);

      try {
         var menuSection = dojo.query(".lotusInner .lotusMenuSection")[0];
         if (menuSection) {
            var node;
            node = dojo.create("div", 
                               { style: { "clear": "both" } }, 
                               menuSection,
                               "first");
            node = dojo.create("div", 
                               { id: "shrinkx",
                                 style: { "float": "right",
                                          "background": "url('http://ajax.googleapis.com/ajax/libs/dojo/1.7.2/dijit/icons/images/commonIconsObjActEnabled.png') no-repeat -80px 0",
                                          //"background-position": "-80px 0",
                                          "width": "16px",
                                          "height": "16px" }
                               },
                               menuSection,
                               "first");
            var node = dojo.query("#shrinkx");
            node.onclick(function(e) {
               dojo.style("lotusColLeft", "width", "0px");
            });            

            window.clearInterval(findMenuSection);
         } else {
            console.log("no menu section");
         }
      } catch(e) {
         console.log("exception ", e);
         window.clearInterval(findMenuSection);
      }
   }

	var attemptCount = 0;
   var findBannerInterval = window.setInterval(RemoveBanner, 200);

   var attemptCount2 = 0;
   var findMenuSection = window.setInterval(AddCloseSidebar, 200); 
})();

