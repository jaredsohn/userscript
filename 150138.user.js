// ==UserScript==
// @name           Cartographer Rank Changes
// @namespace      The Little Moa & DavidJCobb
// @description    Changes the Community Cartographer ranks to Cartographer
// @include        https://forums.halowaypoint.com/*
// @version        1.0
// ==/UserScript==

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