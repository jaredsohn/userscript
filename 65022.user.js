// ==UserScript==
// @name           TinyPic Auto-Tag
// @namespace      http://davidjcobb.deviantart.com/
// @description    Automatically adds one or more user-customizable tags when uploading to TinyPic.com.
// @include        http://www.tinypic.com/
// @include        http://tinypic.com/
// @include        http://www.tinypic.com/*
// @include        http://tinypic.com/*
// ==/UserScript==

window.Autotag = Autotag =
   {
      tags:[],
      insertTags: // comma-separated list
         function() {
            var D = document.getElementById("description"),
                I = D.value,
                S = this.tags.join(",");
            if (I)
               D.value += ","+S;
            else
               D.value = S;
         },
      editTags:
         function() {
            if (this!=window.Autotag)return arguments.callee.apply(window.Autotag,arguments);
            var I = prompt("Type in a list of tags you wish to be automatically added when uploading to Tinypic.",this.tags.join(","));
            if (I)
               this.tags = I.replace(/\s+,|,\s+/g,",").split(",");
            else if (confirm("Delete all auto-tags?\n\n(THIS ACTION CANNOT BE UNDONE)"))
               this.tags = "";
            var T = this.tags.join(",").replace(/,,|^,|,$/g,"");
            GM_setValue("autotags",T);
            alert("Your changes have been saved.");
         },
      init:
         function() {
            this.tags = GM_getValue("autotags","").split(",");
            if (this.tags == [""])
               this.tags = [];
            GM_registerMenuCommand("TinyPic: Edit Auto-Tags",window.Autotag.editTags);
            this.insertTags();
         }
   };
Autotag.init();