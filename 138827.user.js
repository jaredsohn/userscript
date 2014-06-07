// ==UserScript==
// @name           Various Waypoint Rank Changes
// @namespace      The Little Moa & DavidJCobb
// @description    Change some ranks like Master of Unicorns to be a lot more obvious...
// @include        https://forums.halowaypoint.com/*
// @version        1.3
// ==/UserScript==

unsafeWindow.$("#yafpage_posts div.yafUserBox>div.section").each(
   function() {
      var T = unsafeWindow.$(this);
      var kill = "Master of Unicorns";
      var fire = "N/A";
      if (T.text().indexOf(kill) >= 0) {
         for(var i=0;i<this.childNodes.length;i++) {
            var CN = this.childNodes[i];
            if (CN.nodeName == "#text" && CN.nodeValue.indexOf(kill) > 0) {
               CN.nodeValue = CN.nodeValue.replace(kill, fire);
               break
            }
         }
      }
   }
);
unsafeWindow.$("#yafpage_posts div.yafUserBox>div.section").each(
   function() {
      var T = unsafeWindow.$(this);
      var kill = "Monitor";
      var fire = "Moderator";
      if (T.text().indexOf(kill) >= 0) {
         for(var i=0;i<this.childNodes.length;i++) {
            var CN = this.childNodes[i];
            if (CN.nodeName == "#text" && CN.nodeValue.indexOf(kill) > 0) {
               CN.nodeValue = CN.nodeValue.replace(kill, fire);
               break
            }
         }
      }
   }
);
unsafeWindow.$("#yafpage_posts div.yafUserBox>div.section").each(
   function() {
      var T = unsafeWindow.$(this);
      var kill = "Superintendent";
      var fire = "Mini Moderator";
      if (T.text().indexOf(kill) >= 0) {
         for(var i=0;i<this.childNodes.length;i++) {
            var CN = this.childNodes[i];
            if (CN.nodeName == "#text" && CN.nodeValue.indexOf(kill) > 0) {
               CN.nodeValue = CN.nodeValue.replace(kill, fire);
               break
            }
         }
      }
   }
);
unsafeWindow.$("#yafpage_posts div.yafUserBox>div.section").each(
   function() {
      var T = unsafeWindow.$(this);
      var kill = "Discharged";
      var fire = "Banned";
      if (T.text().indexOf(kill) >= 0) {
         for(var i=0;i<this.childNodes.length;i++) {
            var CN = this.childNodes[i];
            if (CN.nodeName == "#text" && CN.nodeValue.indexOf(kill) > 0) {
               CN.nodeValue = CN.nodeValue.replace(kill, fire);
               break
            }
         }
      }
   }
);
unsafeWindow.$("#yafpage_posts div.yafUserBox>div.section").each(
       function() {
          var T = unsafeWindow.$(this);
     
          var usernames = // keep lowercase
             {
                "godlyperfection": 0,
                "fyrewulff": 0,
                "ghaleoneb": 0,
                "homeboyd903": 0,
                "hwm luv gunn": 0,
                "insane54": 0,
                "joeski73": 0,
                "obi wan stevobi": 0,
                "petetheduck": 0,
                "runnokyardrun": 0,
                "slightly live": 0,
                "ttl l askan": 0
             };
     
          var newrank = "Cartographer";
     
          var U = unsafeWindow.$(this).closest("table.content").find("a.UserPopMenuLink");
     
          if (U.text().toLowerCase() in usernames) {
             for(var i=0;i<this.childNodes.length;i++) {
                var CN = this.childNodes[i];
                if (CN.nodeName == "#text" && CN.nodeValue.indexOf("Rank: ") >= 0) {
                   CN.nodeValue = "Rank: " + newrank;
                   break
                }
             }
          }
       }
    );
unsafeWindow.$("#yafpage_posts div.yafUserBox>div.section").each(
       function() {
          var T = unsafeWindow.$(this);
     
          var usernames = // keep lowercase
             {
                "snickerdoodle": 0
             };
     
          var newrank = "The Doodle";
     
          var U = unsafeWindow.$(this).closest("table.content").find("a.UserPopMenuLink");
     
          if (U.text().toLowerCase() in usernames) {
             for(var i=0;i<this.childNodes.length;i++) {
                var CN = this.childNodes[i];
                if (CN.nodeName == "#text" && CN.nodeValue.indexOf("Rank: ") >= 0) {
                   CN.nodeValue = "Rank: " + newrank;
                   break
                }
             }
          }
       }
    );
unsafeWindow.$("#yafpage_posts div.yafUserBox>div.section").each(
       function() {
          var T = unsafeWindow.$(this);
     
          var usernames = // keep lowercase
             {
                "the little moa": 0
             };
     
          var newrank = "Post Booter";
     
          var U = unsafeWindow.$(this).closest("table.content").find("a.UserPopMenuLink");
     
          if (U.text().toLowerCase() in usernames) {
             for(var i=0;i<this.childNodes.length;i++) {
                var CN = this.childNodes[i];
                if (CN.nodeName == "#text" && CN.nodeValue.indexOf("Rank: ") >= 0) {
                   CN.nodeValue = "Rank: " + newrank;
                   break
                }
             }
          }
       }
    );
unsafeWindow.$("#yafpage_posts div.yafUserBox>div.section").each(
   function() {
      var T = unsafeWindow.$(this);
      var kill = "Dormant Monitor";
      var fire = "Dormant Moderator";
      if (T.text().indexOf(kill) >= 0) {
         for(var i=0;i<this.childNodes.length;i++) {
            var CN = this.childNodes[i];
            if (CN.nodeName == "#text" && CN.nodeValue.indexOf(kill) > 0) {
               CN.nodeValue = CN.nodeValue.replace(kill, fire);
               break
            }
         }
      }
   }
);