// ==UserScript==
// @name        H4 File Browser: Fix "Stacking Submit" Bug
// @namespace   DavidJCobb
// @description Fixes a bug where the textbox for adding tags will clear itself repeatedly after applying a tag, depending on how many times you've opened any file's Details View. PLEASE PLEASE PLEASE check the Browser periodically to see if 343i has fixed this on their own, and if so, uninstall this userscript to prevent possible problems in the future.
// @include     http://www.halowaypoint.com/en-us/games/halo4/filebrowser

// @include     http://www.halowaypoint.com/en-us/games/halo4/filebrowser?*

// @include     https://www.halowaypoint.com/en-us/games/halo4/filebrowser

// @include     https://www.halowaypoint.com/en-us/games/halo4/filebrowser?*
// @version     1
// ==/UserScript==

(function() {
   var n = UGC;
   var t = n.Tags;

   t.init =
      function(n) {

         // This function gets called multiple times when it 
         // shouldn't be. We're "monkeypatching" it so that 
         // it deletes itself after executing.

         // Defining this because whatever sorcery 343i did 
         // with their local vars won't work here and I 
         // don't care to figure out why:
         var n = n || UGC;

         t.$tagInput=$("#add-tag-input");
         t.initFieldValue=t.$tagInput.val();
         $(document).on(
            "click",
            ".add-tag",
            function(i){
               i.preventDefault();
               $(".add_tags").hide();
               var r=n.FileList2.cleanupTag($("#add-tag-input").val());
               r!=t.initFieldValue.toLocaleLowerCase()&&t.submit(r)
            }
         );
         $(document).on(
            "click",
            ".tag .icon",
            function(n){
               n.preventDefault();
               t.submit(
                  $(".text a", $(this).parent()).attr("title")
               )
            }
         );

         t.init = function(n){}; // So that we only init once.
      };
})();