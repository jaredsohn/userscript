// ==UserScript==
// @name        Waypoint Tweaks
// @namespace   DavidJCobb
// @description A set of random fixes and improvements for the Halo Waypoint Forums.
// @include     http://forums.halo.xbox.com/*
// @include     https://forums.halo.xbox.com/*
// @include     http://forums.halowaypoint.com/*

// @include     https://forums.halowaypoint.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     0, iteration 27
// ==/UserScript==

if (window.top !== window.self) // do not run in IFRAMEs
  return;

// CHANGELOG
//
// [v0-i0023]   BBCodeToolbar - improved handling of nested QUOTE highlighting.
// [v0-i0023]   BBCodeToolbar - fixed errors stemming from the feature trying 
//              and failing to activate on non-reply pages.
// [v0-i0023]   BBCodeToolbar - fixed bug where improper text collection resulted 
//              in "[object Text]" being added to posts when submitted.
// [v0-i0023]   BBCodeToolbar - highlight now triggers on compositionupdate.
// [v0-i0023]   BBCodeToolbar - fixed bug with faux textarea's border and last 
//              line.
// [v0-i0023]   BBCodeToolbar - attempted to fix bug where QUOTE highlights 
//              would be improperly placed when #editor had a scrollbar, due to 
//              inconsistent word-wrapping between #editor and #underlay.
// [v0-i0023]   BBCodeToolbar - QUOTE highlights now scroll.
// [v0-i0024]   BBCodeToolbar - Unicode and meta characters are highlighted in 
//              green.
// [v0-i0024]   BBCodeToolbar - All highlight types can be enabled or disabled.
// [v0-i0024]   When a Feature's Option is changed, the "change" event has an 
//              "option" property pointing to the Option.
// [v0-i0025]   Added WideQuickReply.
// [v0-i0026]   BBCode Toolbar - crude fix to prevent "[object Text]" bug.
// [v0-i0027]   BBCode Toolbar - posts message when removed, to notify other 
//              userscripts.
//
// TODO
//  - BBCode Toolbar
//     - QUOTE-highlighting interprets the following as valid nesting, even 
//       though YAF doesn't. This is the result of a fix for an edge-case. See 
//       if you can make the fix ignore this case.
//
//       [quote][quote]...[/quote][/quote]
//
//       YAF will treat the nesting as valid if there is anything between the 
//       two start tags, or if either or both of the two start tags have an 
//       attribute value (even if it's the same value on both).
//
//  - BBCode Toolbar faux textarea suffers from weird browser bugs.
//     - Switching focus from the Waypoint window to the textarea IFRAME is 
//       broken -- you need TWO clicks to activate the contenteditable editor. 
//       However, switching from anything else -- Firebug, another tab, 
//       another application -- only requires ONE click to properly focus the 
//       faux textarea.
//        - Doesn't happen in my textcase on my hard drive, ever.
//        - Doesn't happen with contenteditable content in text/html IFRAMEs 
//          injected elsewhere on the Waypoint reply page.
//  - BBCode Toolbar
//     - Add colorpicker modal triggered by a "Custom" option in color SELECT
//        - Best way: re-abstract PrefsDialog back into reusable Dialog code.
//  - Quick Links feature.
 
function GM_unwrap(x){
   if (!x || !window.XPCNativeWrapper)
      return x;
   if (!x.jquery)
      return x.wrappedJSObject || XPCNativeWrapper.unwrap(x) || x;
   var a = $.makeArray(x), i = 0, al = a.length;
   for (;i<al;i++)
      a[i] = GM_unwrap(a[i]);
   return $(a)
}

// Makes jQuery include these properties in its normalized event objects; this 
// allows us to use jQuery for StorageEvent listeners without breaking things.
$.event.props.push("key", "newValue", "oldValue", "url", "storageArea");

Waypoint =
   {
      instance_id: $.now(),
      features: {}
   };

Waypoint.Prefs =
   {
      last_update: -1,
      registry: {},
      cache: {},
      Subsystem:
         {
            prefix: "[GM][DAVIDJCOBB][WAYPOINT TWEAKS]",
            getKey:
               function(name, value) {
                  var r = localStorage.getItem(this.prefix + name);
                  return r !== null ? r : value;
               },
            setKey:
               function(name, value) {
                  localStorage.setItem(this.prefix + name, value);
                  return value
               },
            delKey:
               function(name) {
                  localStorage.removeItem(this.prefix + name)
               },
            listen:
               function(callback) {
                  $(window).bind("storage.CobbWaypointTweaks", callback);
               }
         },
      checkForUpdates:
         function() {
            var u = this.Subsystem.getKey("LastPrefChange");
            return (+u > this.last_update) ? +u : false;
         },
      registerPref:
         function(name) {
            this.registry[name] = 1;
         },
      load:
         function(name, value) {
            var i, u, r;
            if (u = this.checkForUpdates()) {
               let o;
               for(i in this.registry) {
                  o = this.cache[i];
                  this.cache[i] = this.Subsystem.getKey("[PREF]" + i);
                  if (o != this.cache[i])
                     $(this).trigger($.Event("prefchange", { pref_name: i }));
               }
               this.last_update = u;
            }
            r = this.cache[name];
            return r !== void 0 ? r : value;
         },
      save:
         function(name, value, failIfAltered) {
            if (this.checkForUpdates() && failIfAltered)
               return false;
            this.cache[name] = this.Subsystem.setKey("[PREF]" + name, value);
            this.Subsystem.setKey("LastPrefChange", (this.last_update = $.now()));
            $(this).trigger($.Event("prefchange", { pref_name: name }));
            return true
         },
      saveBatch:
         function(d, failIfAltered) {
            if (this.checkForUpdates() && failIfAltered)
               return false;
            for(var i in d)
               this.cache[i] = this.Subsystem.setKey("[PREF]" + i, d[i]);
            this.Subsystem.setKey("LastPrefChange", (this.last_update = $.now()));
            for(var i in d)
               $(this).trigger($.Event("prefchange", { pref_name: i }));
            return true
         },
      del:
         function(name, failIfAltered){
            if(this.checkForUpdates() && failIfAltered)
               return false;
            delete this.cache[name];
            this.Subsystem.delKey("[PREF]" + name);
            return true
         },
      init:
         function() {
            this.load("[DUMMY]");
            this.Subsystem.listen(
               $.proxy(
                  function (e) {
                     if (!e || (!e.key && e.key !== null))
                        throw "DavidJCobb Userscript: Waypoint Tweaks: Setting change occurred in another tab, but we can't get info on it!";

                     if (e.key === null) // localStorage cleared
                        return;

                     if (e.newValue === null) // key deleted
                        return;

                     if (e.key == this.Subsystem.prefix + "LastPrefChange")
                        this.load("[DUMMY]");
                  },
                  this
               )
            );
         }
   };



/*===========================================================================*\

   START OF AUXILIARY UTILITIES

\*===========================================================================*/
Waypoint.URLs =
   {
      to:
         function(s) {
            var A = document.createElement("a");
            A.href = s ? (s.href || s) : window.location.href;
            return ({hash:A.hash,hostname:A.hostname,href:A.href,pathname:A.pathname,port:A.port,protocol:A.protocol,search:A.search})
         },
      queryMatches:
         function(url, map) {
            var q = this.parseQuery(url);
            for(var i in map)
               if (!q[i] || q[i] != map[i])
                  return false;
               else if (q[i] != map[i])
                  if (!(map[i] instanceof RegExp) || !q[i].match(map[i]))
                     return false;
            return true
         },
      parseQuery:
         function(url) {
            var m = {}, i = 0, s = (url || location).search.replace(/^\?|(&)&+/g,"$1").split("&"), sl = s.length;
            for(;i<sl;i++)
               m[s[i].split("=")[0]] = s[i].split("=").slice(1).join("=");
            return m
         },
      $_GET:
         function(url, param) {
            var i = 0, s = (url || location).search.replace(/^\?|(&)&+/g,"$1").split("&"), sl = s.length;
            for(;i<sl;i++) {
               s[i] = s[i].split("=");
               if(s[i][0] == param)
                  return s[i][1]
            }
         },
      $_SET:
         function(url, query) {
            var i, a = $.extend(this.parseQuery(url), query), out = "";
            for(i in a)
               out += "&" + i + "=" + a[i];
            return this.to(url.href.substring(0, url.href.length - url.search.length) + "?" + out.substring(1))
         }
   };

Waypoint.Forums =
   {
      section_names:
         [
            "unknown 0",		// 0
            "unknown 1",		// 1
            "unknown 2",		// 2
            "unknown 3",
            "unknown 4",		// 4
            "Announcements",
            "Roll Call",
            "Community Creations",
            "Recruiting",
            "Halo Universe",
            "Matchmaking",		// 10
            "General Discussion",
            "Halo 4",
            "Halo: Combat Evolved Anniversary",
            "Halo: Reach",
            "Halo 3: ODST",
            "Halo Wars",
            "Halo 3",
            "Halo 2",
            "Halo: Combat Evolved",
            "unknown 20",		// 20
            "Polling Booth",
            "Halo Waypoint"
         ],
      section_aliases:
         {
            "0": "???",
            "1": "???",
            "2": "???",
            "3": "???",
            "11": "General",
            "13": "Halo Annie",
            "19": "Halo 1",
            "20": "???",
            "21": "Polls",
            "22": "Waypoint"
         },
      isInForums: 	function(url) let (u = Waypoint.URLs.to(url)) !!u.hostname.match(/forums\.halowaypoint\.com$/i) ,
      isInThread: 	function(url) let (u = Waypoint.URLs.to(url)) !!(this.isInForums(u) && u.pathname.match(/^\/+yaf_posts[mt]\d+(?:p\d+)?(?:.*?)\.aspx/i)) ,
      isThread: 	function(url) let (u = Waypoint.URLs.to(url)) !!(this.isInThread(u) && u.pathname.match(/^\/+yaf_postst/i)) ,
      isPost: 		function(url) let (u = Waypoint.URLs.to(url)) !!(this.isInThread(u) && u.pathname.match(/^\/+yaf_postsm/i)) ,
      isErrorMessage: 	function(url) let (u = Waypoint.URLs.to(url)) !!(this.isInForums(u) && u.pathname.match(/^\/+yaf_info\.aspx/i)) ,
      isInPMs:		function(url) let (u = Waypoint.URLs.to(url)) !!(this.isInForums(u) && u.pathname.match(/^\/yaf_cp_pm\.aspx/i)) ,
      isPM:		function(url) let (u = Waypoint.URLs.to(url)) !!(this.isInForums(u) && u.pathname.match(/^\/yaf_cp_message\.aspx/i)) ,
      isInBuddies:	function(url) let (u = Waypoint.URLs.to(url)) !!(this.isInForums(u) && u.pathname.match(/^\/yaf_cp_editbuddies\.aspx/i)) ,
      isInProfile:	function(url) let (u = Waypoint.URLs.to(url)) !!(this.isInForums(u) && u.pathname.match(/\/yaf_profile\d+?\.aspx$/i)) ,
      oldToNew:
         function(url) {
            var u = Waypoint.URLs.to(url);
            var old1 = u.hostname.match(/halo\.xbox\.com$/i) && u.pathname.match(/^\/Forums\//i);
            var old2 = u.hostname.match(/forums\.halo\.xbox\.com$/i);
            if (old1 || old2) {
               var v = u.href.substring(0, u.href.indexOf(u.hostname)) + "forums.halowaypoint.com/";
               v += u.pathname.replace(/^\/Forums\//i,"");
               v += u.search + u.hash;
               return v
            }
            return url
         },
      getPostID:
         function(url) {
            var u = Waypoint.URLs.to(url);
            if (this.isThread(u))
               return (u.hash.match(/^#post(\d+)$/)||[0,null])[1];
            if (this.isPost(u))
               return (u.pathname.match(/\/yaf_postsm(\d+)(?:p\d+)?[^<>"#%{}|\\\/^~\[\]`;?]*?\.aspx$/i)||[0,null])[1];
            return null
         },
      getSectionID:
         function(url) {
            var u = Waypoint.URLs.to(url);

            if (u.pathname.match(/^\/Default\.aspx/i))					// There is an alternate URL syntax used only by (broken) Windows LIVE redirects: 
               if (Waypoint.URLs.queryMatches(u, { g: "topics", f_yaf: /\d+/ }))	// https://forums.halo.xbox.com/Default.aspx?g=topics&f_yaf=10&lc=1033&id=66262
                  return Waypoint.URLs.$_GET(u, "f_yaf");

            if (u.pathname.match(/^\/yaf_postmessage\.aspx/i))				// Reply page URLs sometimes have section IDs
               return Waypoint.URLs.$_GET(u, "f_yaf");

            return (u.pathname.match(/\/yaf_topics(\d+)(?:p\d+)?[^<>"#%{}|\\\/^~\[\]`;?]*?\.aspx$/i)||[0,null])[1];
         },
      getSectionIDFromName: function(name) this.section_names.indexOf(name) ,
      getSectionName:
         function(id, use_alias) {
            var n = this.section_names[id];
            if (use_alias)
                n = this.section_aliases[id] || n;
            return n || (use_alias ? "???" : "Unknown Section");
         },
      getCurrentPageData:
         function() {
            var data = {};

            var first_reply_link = $("li.tool.ReplyLI>a[id$='_DisplayPost1_ReplyA']");
            var first_reply_href = first_reply_link.attr("href");

            data.is_index =
               (function() {
                  return $.trim($("#article>div.page_header h1.gigantic").text()) == "forum";
               })();

            data.section_id =
               (function() {
                  var s = Waypoint.Forums.getSectionID();
                  if (s || s === 0)
                     return s;
                  if (first_reply_href)
                     s = Waypoint.Forums.getSectionID(first_reply_href);
                  if (s || s === 0)
                     return s;
               })();

            data.thread_id =
               (function() {
                  var s;
                  if (Waypoint.Forums.isThread())
                     return window.location.pathname.match(/^\/yaf_postst(\d+)/i)[1];
                  else if (Waypoint.Forums.isInThread())
                     return Waypoint.URLs.$_GET(Waypoint.URLs.to(first_reply_href), "t");
               })();

            data.thread_name =
               (function() {
                  if (Waypoint.Forums.isThread() || Waypoint.Forums.isInThread())
                     return $("#article>div.page_header h1.gigantic").text();
                  return "";
               })();

            data.user_ids =
               (function() {
                  var uids = {};
                  $("a[href^='/yaf_profile'][title='View profile']").each(
                     function() {
                        var name = $.trim($(this).text());
                        var u_id = $(this).attr("href").match(/^\/yaf_profile(\d+)/)[1];
                        uids[name] = u_id;
                     }
                  );
                  return uids
               })();

            data.profile_id =
               (function() {
                  if (Waypoint.Forums.isInProfile())
                     return +(location.pathname.match(/\/yaf_profile(\d+?)\.aspx$/i)||[0,-1])[1];
                  return -1;
               })();

            data.profile_name =
               (function() {
                  if (Waypoint.Forums.isInProfile())
                     return $("#ctl00_MainContent_forum_ctl03_Name").text() || "";
                  return "";
               })();

            data.profile_gamertag =
               (function() {
                  if (!Waypoint.Forums.isInProfile())
                     return "";
                  var h4_service_record = Waypoint.URLs.to($("#ctl00_MainContent_forum_ctl03_serviceRecordAnchor").attr("href"));
                  var path = h4_service_record.pathname;
                  var gamertag = (path.match(/^\/en-us\/players\/([^\/]+?)\/halo4\/?$/) || [0,""])[1];
                  return decodeURIComponent(gamertag);
               })();

            data.inbox_section = // note: can change post-load due to AJAX
               (function() {
                  if (Waypoint.Forums.isPM()) {
                     var view = Waypoint.URLs.$_GET(null, "v") || "";
                     if (view == "in")
                        return "inbox";
                     if (view == "out")
                        return "sent";
                     if (view == "arch")
                        return "archive";
                  }
                  var tabs = $("#ctl00_MainContent_forum_ctl03_PmTabs");
                  if (!tabs.length)
                     return null;
                  var sel = tabs.find(">ul>li.ui-tabs-selected");
                  switch ($.trim(sel.text())) {
                     case "Inbox":
                        return "inbox";
                     case "Sent Items":
                        return "sent";
                     case "Archive":
                        return "archive";
                  }
                  return null
               })();
            data.inbox_page = // note: can change post-load due to AJAX
               (function() {
                  var panel;
                  switch (data.inbox_section) {
                     case null:
                        return null;
                     case "inbox":
                        panel = $("#View1");
                        break;
                     case "sent":
                        panel = $("#View2");
                        break;
                     case "archive":
                        panel = $("#View3");
                        break;
                  }
                  var pager = panel.find("div.yafpager").eq(0);
                  var page = +$.trim(pager.find("span.pagecurrent").text() || 0) - 1;
                  return page;
               })();
            data.inbox_counts =
               (function() {
                  var counts = { inbox: -1, sent: -1, archive: -1, total_max: -1 };
                  var stats = $("#ctl00_MainContent_forum_ctl03_InboxPMList_PMInfoLink");
                  if (stats.length) {
                     stats = stats.text();
                     counts.inbox	= +(stats.match(/(\d+) in Inbox/) || [0,-1])[1];
                     counts.sent	= +(stats.match(/(\d+) in Outbox/) || [0,-1])[1];
                     counts.archive	= +(stats.match(/(\d+) In Archive/) || [0,-1])[1];
                     counts.total_max	= +(stats.match(/of (\d+) allowed/) || [0,-1])[1];
                  }
                  return counts;
               })();

            data.pm_id =
               (function() {
                  if (Waypoint.Forums.isPM())
                     return Waypoint.URLs.$_GET(null, "pm") || -1;
                  return -1
               })();

            return data
         }
   };



/*===========================================================================*\

   START OF FEATURE UNDER-THE-HOOD CODE

\*===========================================================================*/
function Feature(d) {
   if (!(this instanceof Feature))
      return new Feature(d);

   Waypoint.features[d.name] = this;
   this.name = d.name;
   this.display = d.display || this.name;

   this.options = {};

   if (d.options)
      for(var i in d.options)
         this.options[i] = new Feature.Option(this, i, d.options[i]);

   this.init = d.init || $.noop;
   for(var i in d)
      if (!this[i])
         this[i] = d[i];
}
$.extend(true, Feature.prototype,
   {
      
   }
);
Feature.loadAllOptions =
   function() {
      var d = {};
      for(var i in Waypoint.features) {
         d[i] = {};
         var Fi = Waypoint.features[i];
         for (var j in Fi.options) {
            var Oj = Fi.options[j];
            if (Oj.$OMIT)
               continue;
            d[i][j] = Oj.value();
         }
      }
      return d;
   };
Feature.saveAllOptions =
   function(d) {
      for(var i in d) {
         if (!Waypoint.features[i])
            continue;
         var Fi = Waypoint.features[i];
         for (var j in d[i]) {
            var Oj = Fi.options[j];
            if (!Oj)
               return;
            Oj.value(d[i][j]);
         }
      }
   };

Feature.Option =
   function Option(feature, oName, d) {
      if (!(this instanceof Feature.Option))
         return new Feature.Option(feature, oName, d);

      this.feature_name = feature.name;
      this.option_name = oName;

      Waypoint.Prefs.registerPref(this.getKeyName());
      $(Waypoint.Prefs).bind("prefchange", $.proxy(this._check, this));

      for(var i in d)
         if (!this[i])
            this[i] = d[i];
   };
$.extend(true, Feature.Option.prototype,
   {
      _cache: void 0,
      _check:
         function(e) {
            var c = this._cache;
            if (e.pref_name == this.getKeyName() && c != this.value())
               $(this).triggerHandler({ type: "change", option: this });
         },
      _coerce:
         function(v) {
            switch (this.type) {
               case "bool":
                  if (v == "false" || v == "0" || v == "NaN" || v == "null" || v == "undefined")
                     v = false;
                  else
                     v = !!v;
                  break;
               case "password":
               case "text":
               case "textarea":
                  v = "" + v;
                  break;
            }
            return v
         },
      getKeyName:
         function() {
            return "[Feature:" + this.feature_name + "]" + this.option_name
         },
      value:
         function(v) {
            var k = this.getKeyName();
            if (v === void 0) {
               return ( this._cache = this._coerce(Waypoint.Prefs.load(k, this.default_to)) );
            }
            v = this._coerce(v);
            if (Waypoint.Prefs.save(k, v)) {
               this._cache = v;
               return true;
            }
            return false
         }
   }
);



/*===========================================================================*\

   START OF PREFS DIALOG CODE

\*===========================================================================*/
Waypoint.PrefsDialog =
   {
      show:
         function() {
            if (!this.node)
               return;
            this.node.addClass("show");
            this.renderFeatureList();
         },
      hide:
         function() {
            if (!this.node)
               return;
            this.node.removeClass("show");
            $("body").focus();
         },
      renderFeatureList:
         function() {
            if (!this.node)
               return;
            var content = $(this.document.getElementById("content"));
            content.removeClass("settings").addClass("features").empty().append("<ul id='feature-list'></ul>");

            var ul = content.children("ul");
            for(var i in Waypoint.features) {
               var Fi = Waypoint.features[i];
               ul.append("<li><a href='javascript:// View and edit settings for this feature' data-feature-name=\"" + Fi.name + "\">" + Fi.display + "</a></li>");
            }
         },
      renderFeatureSettings:
         function(fName) {
            if (!this.node)
               return;

            var F = Waypoint.features[fName];
            if (!F)
               return;

            var content = $(this.document.getElementById("content"));
            content.addClass("settings").removeClass("features").empty().append("<ul id='feature-list'></ul>");
            content.empty().append("<ul id='setting-list' data-feature-name=\"" + fName + "\"></ul>");

            var ul = content.children("ul");
            if (F.description)
               ul.append("<li><p>" + F.description.replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>") + "</p></li>");
            for(var i in F.options) {
               var Oi = F.options[i];
               var li = $("<li data-option-name=\"" + Oi.option_name + "\"></li>");

               var value = Oi.value();
               if (Oi.load)
                  value = Oi.load();

               var input;

               switch (Oi.type) {
                  case "bool":
                     input = $("<input id=\"OPT-" + Oi.option_name + "\" type='checkbox' data-original-value='false'>");
                     if (value && value != "false")
                        input.attr("checked", "checked").attr("data-original-value", "true");
                     li.append(input).append('<label for="OPT-' + Oi.option_name + '">' + Oi.name + '</label>');
                     break;
                  case "password":
                  case "text":
                     input = $("<input id=\"OPT-" + Oi.option_name + "\" type='" + Oi.type + "'>").val(value).attr("data-original-value", value);
                     li.append('<label class="main" for="OPT-' + Oi.option_name + '">' + Oi.name + '</label>').append(input);
                     break;
                  case "textarea":
                     input = $("<textarea type='textarea' id=\"OPT-" + Oi.option_name + "\"></textarea>").html(value).attr("data-original-value", value);
                     li.append('<label class="main" for="OPT-' + Oi.option_name + '">' + Oi.name + '</label>').append(input);
                     break;
               }

               li.appendTo(ul);
            }
         },
      changesMade:
         function() {
            if (!this.node)
               return false;
            var content = $(this.document.getElementById("content"));

            var ul = content.children("#setting-list");
            if (!ul.length)
               return;
            var changed = false;
            ul.children("li").each(
               function() {
                  var input = $(this).find("input[id^='OPT-'],textarea[id^='OPT-']");
                  if (!input.length)
                     return true;
                  var iVal = input.attr("data-original-value");
                  var oVal;
                  switch (input.attr("type")) {
                     case "checkbox":
                        oVal = "" + !!input.attr("checked");
                        break;
                     case "password":
                     case "text":
                     case "textarea":
                        oVal = input.val();
                        break;
                  }

                  if (iVal != oVal)
                     return (changed = true);
               }
            );
            return changed
         },
      saveFeatureSettings:
         function() {
            if (!this.node)
               return;
            var content = $(this.document.getElementById("content"));

            var ul = content.children("#setting-list");
            if (!ul.length)
               return;
            var feature = ul.attr("data-feature-name");
            var map = {};
            ul.children("li").each(
               function() {
                  var input = $(this).find("input[id^='OPT-'],textarea[id^='OPT-']");
                  if (!input.length)
                     return true;
                  var oName = input.attr("id").substring(("OPT-").length);
                  var oVal;
                  switch (input.attr("type")) {
                     case "checkbox":
                        oVal = !!input.attr("checked");
                        break;
                     case "password":
                     case "text":
                     case "textarea":
                        oVal = input.val();
                        break;
                  }

                  var option = Waypoint.features[feature].options[oName];
                  if (option && option.save) {
                     try {
                        option.save(oVal);
                     } catch (e) {
                        if (e != "skip")
                           alert("One setting could not be saved!\nFeature: " + Waypoint.features[feature].name + "\nOption: " + option.name + "\n\nError details:\n" + e + "\n\nThis option's failure to save will not affect the rest of your settings.");
                        // Find a better way to output that!
                     }
                     return true;
                  }

                  map["[Feature:" + feature + "]" + oName] = oVal;
               }
            );
            var success = Waypoint.Prefs.saveBatch(map, true);
            if (!success) {
               if (confirm("Your settings have been changed from another tab. Do you want to override those settings with the changes you have just made?\n\nClick \"OK\" to overwrite any previous changes, and save these settings.\nClick \"Cancel\" to do nothing."))
                  Waypoint.Prefs.saveBatch(map, false);
               else
                  return;
            }
            alert("Your settings have been saved.");
            this.renderFeatureList();
         },
      init:
         function() {
            GM_addStyle("\
               #cobb-tweaks-dialog{position:fixed;z-index:18003;left:50%;top:50%;width:0;height:0;padding:0;margin:0;border:0}\n\
               #cobb-tweaks-dialog[data-loaded]{display:none}\n\
               #cobb-tweaks-dialog.show{display:block;width:640px;height:240px;margin:-100px -320px}\
            ");
            this.node = $("<iframe id='cobb-tweaks-dialog'></iframe>");
            this.node[0].addEventListener(
               "load",
               $.proxy(
                  function(){
                     this.node.attr("data-loaded", true);
                     var D = this.document = this.node[0].contentDocument;
                     $("<style></style>").appendTo(D.body).html("\
                        html{border:1px solid #444;background:rgba(0,0,0,.85);overflow-x:hidden;overflow-y:auto}\n\
                        body{position:relative;width:590px;height:214px;padding:12px 24px;margin:0;color:#BBB;font-size:12px;font-family:KonsensRegular,Verdana,Arial,sans-serif;border-radius:7px}\n\
                           h1{padding:0;margin:0;font-size:1.5em}\n\
                           #content{height:118px;margin:12px 0;border:0 solid #444;border-width:1px 0;padding:12px 0;overflow-y:auto}\n\
                              #feature-list{list-style:none;padding:0;margin:0;columns:3 auto;column-fill:auto;column-gap:0;-moz-columns:3 auto;-moz-column-fill:auto!important;-moz-column-gap:0!important;-webkit-columns:3 auto;-webkit-column-fill:auto!important;-webkit-column-gap:0!important}\n\
                                 #feature-list>li{padding:0;margin:0}\n\
                                    #feature-list>li>a{display:block;padding:.25em}\n\
                                    #feature-list>li>a:hover{background:#333}\n\
                              #setting-list{list-style:none;padding:0;margin:0}\n\
                                 #setting-list>li{padding:.25em 0;margin:0;border:0 solid #333;border-bottom-width:1px}\n\
                                 #setting-list>li:last-child{border-bottom:0}\n\
                                    #setting-list>li>p{padding:0;margin:0 0 12px 0}\n\
                                    #setting-list>li>label.main{display:block;font-weight:bold}\n\
                                    #setting-list>li>textarea{display:block;width:99.5%;min-height:6.25em}\n\
                           #inner-buttons,\n\
                           #outer-buttons{text-align:center}\n\
                           #content.features~#inner-buttons{display:none}\n\
                           #content.settings~#outer-buttons{display:none}\n\
                        \n\
                        a:link{color:#7AE}\n\
                        a:visited{color:#C7E}\
                     ");
                     $(D.body)
                        .append("<h1>Waypoint Tweaks</h1>")
                        .append("<div id='content'></div>")
                        .append("<div id='inner-buttons'><input type='button' id='save' value='Save Changes'> <input type='button' id='cancel' value='Cancel'></div>")
                        .append("<div id='outer-buttons'><input type='button' id='close' value='Close'></div>");

                     $(D.body).find("#content").delegate(
                        "#feature-list a",
                        "click",
                        function(e) {
                           Waypoint.PrefsDialog.renderFeatureSettings($(this).attr("data-feature-name"));
                        }
                     );

                     $(D.body).find("#save").click($.proxy(this.saveFeatureSettings, this));
                     $(D.body).find("#close").click($.proxy(this.hide, this));
                     $(D.body).find("#cancel").click(
                        $.proxy(
                           function() {
                              if (this.changesMade()) {
                                 if (!confirm("Do you want to discard the changes you have just made, and return to the list of features?"))
                                    return false;
                              }
                              this.renderFeatureList();
                           },
                           this
                        )
                     );
                  },
                  this
               ),
               true
            );
            document.body.appendChild(this.node[0])
         }
   };
GM_registerMenuCommand("Waypoint Tweaks - Options",function(){Waypoint.PrefsDialog.show()});
$(function(){Waypoint.PrefsDialog.init()});



/*===========================================================================*\

   START OF FEATURE CODE

\*===========================================================================*/
Feature(
   {
      name: "BackupAndRestore",
      display: "Backup / Restore Settings",
      description: "This feature allows you to export and import all of your settings in a raw format. It is highly recommended that you use it to backup often.",
      options:
         {
            rawdata:
               {
                  name: 	"Your settings for all features in this script, as raw data:",
                  type: 	"textarea",
                  $OMIT:	true, // this option is not included in backups
                  load:
                     function() {
                        return JSON.stringify(Feature.loadAllOptions());
                     },
                  save:
                     function(value) {
                        if (!confirm("Are you sure you wish to restore the entered backup?\n\nDoing so will completely overwrite all settings currently active in this userscript. The operation is NOT reversible.\n\nClick \"OK\" to continue with the restoration.\nClick \"Cancel\" to abort."))
                           return;
                        var d;
                        try {
                           d = JSON.parse(value);
                        } catch (e) {
                           throw "Could not process the entered value. It was probably in an invalid format.\nOriginal error: " + e.message;
                        }
                        Feature.saveAllOptions(d);

                        throw "skip"; // sentinel value
                     }
               }
         }
   }
);


Feature(
   {
      name: "BBCodeToolbar",
      display: "BBCode Toolbar",
      description: "Replaces the BBCode toolbar on reply pages with a custom-made one that supports multi-selections. This feature is experimental and may cause conflicts with other userscripts, so it is disabled by default.\n\nThis bug may introduce textbox \"focus\" bugs that I have no way of fixing. If you click on the reply/PM textbox and it doesn't gain a blue glow on its border, then it's not \"focused\" and won't respond to your keypresses.",
      options:
         {
            enable:
               {
                  name: 	"Enable this feature",
                  type: 	"bool",
                  default_to: 	false
               },
            highlight_quotes:
               {
                  name: 	"Highlight the starts/ends of QUOTEs as you edit them",
                  type: 	"bool",
                  default_to: 	true
               },
            highlight_unicode:
               {
                  name: 	"Highlight Unicode characters",
                  type: 	"bool",
                  default_to: 	true
               },
            highlight_metas:
               {
                  name: 	"Highlight meta characters",
                  type: 	"bool",
                  default_to: 	true
               }
         },
      shim:
         {
            faux_textarea:
               {
                  real: $("#ctl00_MainContent_forum_ctl03_YafTextEditor"),
                  mask: null,
                  fake: null,
                  mask_value: "",
                  mask_interval: null,
                  create:
                     function() {
                        if (this.mask && this.fake)
                           return;
                        if (!this.real || !this.real.length)
                           return;

                        for(var i in this.feature.options)
                           if (i.indexOf("highlight_") === 0)
                              $(this.feature.options[i]).unbind("change.faux_textarea").bind("change.faux_textarea", $.proxy(this.selectionHandler, this));

                        this.mask = $("<input type='hidden' class='BBCodeEditor'>"); // Class is so that we benefit from Waypoint's confirmation-on-beforeunload code.
                        this.mask.attr("id", this.real.attr("id")).attr("name", this.real.attr("name"));
                        this.real.replaceWith(this.mask);

                        this.mask_value = this.real.val();
                        this.mask.val(this.real.val());

                        this.mask_interval =
                           window.setInterval(
                              $.proxy(
                                 function() {
                                    if (this.mask.val() != this.mask_value) {
                                       this.mask_value = this.mask.val();
                                       this.mask.trigger("programmatic-change");
                                    }
                                 },
                                 this
                              ), 1
                           );

                        this.fake = $("<iframe id='CobbTweaks-BBCodeToolbar-FakeTextarea' src='data:text/plain,'></iframe>"); // SRC ensures we only allow plain-text input/pastes
                        this.fake.one(
                           "load",
                           $.proxy(
                              function(e) {
                                 var body = $(e.target.contentDocument.body).empty();
                                 body.append("<div id='editor'></div><div id='underlay'></div>");
                                 (body)
                                    .children().text(this.mask.val())
                                    .filter("#editor")
                                       .prop("contenteditable", true)
                                       .bind(
                                          "click compositionupdate keyup paste",
                                          $.proxy(this.selectionHandler, this)
                                       ).bind(
                                          "scroll",
                                          function(e) {
                                             $(this).siblings("#underlay").css("top", -$(this).prop("scrollTop") + 1 + "px"); // +1 is to account for #editor's border
                                          }
                                       );

                                 this.observer =
                                    new MutationObserver(
                                       $.proxy(
                                          function() {
                                             function getText(node) { // treats BR as \n
                                                if (node.jquery)
                                                   node = node[0];
                                                var s = "";
                                                var i = 0, c = node.childNodes;
                                                for(;i<c.length;i++) {
                                                   if (c[i].nodeName == "#text" || c[i] instanceof CDATASection)
                                                      s += c[i].textContent || c[i].nodeValue || c[i].data || "";
                                                   else if (c[i].nodeName == "BR")
                                                      s += "\n";
                                                   else if (c[i] instanceof Element)
                                                      s += getText(c[i]);
                                                }
                                                return s
                                             }

                                             editor = body.children("#editor");
                                             underlay = body.children("#underlay");
                                             underlay.html(editor.html());

                                             //var text = getText(editor);
                                             var text = this.val();
                                             if (!text.replace(/\s/g, ""))
                                                text = "";
                                             this.mask_value = text;
                                             this.mask.val( text );
                                             this.real.val( text ); // for teardown

                                             this.mask.triggerHandler("change");

                                             // Support Waypoint's character counter
                                             var remaining = 7500 - this.mask.val().length;
                                             $("#charCount").html(remaining + " characters left");
                                             if (remaining <= 0)
                                                $("#charCount").html("<strong>You may only have up to 7500 characters.</strong><br>You've entered " + this.mask.val().length + ".");
                                          },
                                          this
                                       )
                                    );

                                 var observe =
                                    $.proxy(
                                       function observe() {
                                          this.observer.observe(
                                             body.children("#editor")[0],
                                             {
                                                characterData: true,
                                                childList: true,
                                                subtree: true
                                             }
                                          )
                                       },
                                       this
                                    )
                                 observe();

                                 this.mask.bind(
                                    "programmatic-change",
                                    function() {
                                       body.children().text(this.value);
                                    }
                                 );

                                 // For some reason, Firefox unpredictably clobbers STYLE tags in a contentEditable IFRAME, so we gotta go inline for a lot of things...
                                 body
                                    .css("padding",	"0")
                                    .css("margin",	"0")
                                    .css("cursor",	"text")
                                    .css("background",	"#FFF")
                                    .css("font-family",	"monospace")
                                    .css("position",	"absolute")
                                    .css("left",	"0")
                                    .css("right",	"0")
                                    .css("top",		"0")
                                    .css("bottom",	"0")
                                    .css("white-space",	"pre-wrap") // Necessary so that line breaks in the initial value display properly.
                                 ;

                                 body.parent().css("overflow", "hidden");
                                 this.fake
                                    .css("width", "100%")
                                    .css("height", "250px")
                                    .css("border", "1px solid #AAA");

                                 body.prev("head").append("<style>\
body{word-wrap:break-word}\n\
   #editor{position:absolute;z-index:1;left:0;right:0;bottom:0;top:0;padding:.25em .5em;border:1px solid transparent;overflow:auto}\n\
   #editor:focus{border:1px solid #9DF}\n\
   #underlay{position:absolute;z-index:0;left:1px;right:1px;bottom:1px;top:1px;padding:.25em 0 .25em .5em;color:transparent}\n\
      #underlay mark{color:transparent}\n\
      #underlay mark.zero{position:relative}\n\
         #underlay mark.zero::before{content:' ';position:absolute;left:-0.5ch;top:0;width:1ch;background:inherit}</style>")
                              },
                              this
                           )
                        ).insertAfter(this.mask);
                     },
                  destroy:
                     function() {
                        if (this.observer)
                           this.observer.disconnect();
                        this.observer = null;
                        window.clearInterval(this.mask_interval);
                        this.mask_interval = null;
                        this.fake.remove();
                        this.fake = null;
                        this.mask.replaceWith(this.real);
                        this.mask = null;
                     },
                  selectionHandler:
                     function() {
                        // If there is no selection (just a caret) and the caret is inside QUOTE tags, show the nearest start and end.
                        if (this.fake) {
                           var body = $(this.fake.prop("contentDocument").body);
                           var editor = body.children("#editor");
                           var text = this.val();

                           var highlights = []; // prep highlights

                           // Highlight QUOTEs.
                           //
                           if (this.feature.options.highlight_quotes.value()) {

                              function getText(node) { // treats BR as \n
                                 if (node.jquery)
                                    node = node[0];
                                 var s = "";
                                 var i = 0, c = node.childNodes;
                                 for(;i<c.length;i++) {
                                    if (c[i].nodeName == "#text" || c[i] instanceof CDATASection)
                                       s += c[i].textContent || c[i].nodeValue || c[i].data || "";
                                    else if (c[i].nodeName == "BR")
                                       s += "\n";
                                    else if (c[i] instanceof Element)
                                       s += getText(c[i]);
                                 }
                                 return s
                              }

                              var selections = this.getSelections();
                              var only_caret = (selections.length == 1 && selections[0].range.collapsed);

                              if (only_caret) {

                                 var before = selections[0].range.cloneRange();
                                 before.setStart( editor[0], 0 );
                                 before = getText(before.cloneContents());

                                 // Find all start and end tags' indices and lengths.
                                 //
                                 var begins = [];
                                 var ends = [];
                                 function collect(array, regex, which) {
                                    var analysis = 0;
                                    var match;
                                    while (match = text.substring(analysis).match(regex)) {
                                       analysis += match.index;
                                       array.push({ start: analysis, length: match[0].length, end: analysis + match[0].length, type: which, index: array.length });
                                       analysis += match[0].length;
                                    }
                                 }
                                 collect(begins, /\[quote(=[^\]]*)?\]/i, "start");
                                 collect(ends, /\[\/quote\]/i, "end");

                                 var pairs = [];
                                 (function() {
                                    var RE = /\[quote(?:=[^\]]*)?\]((?:[^](?!\[quote(?:=[^\]]*)?\]))*?)\[\/quote\]/i;
                                    var current = text;
                                    var match;
                                    while (match = current.match(RE)) {

                                       // We need to handle an edge-case where [quote][quote]...[/quote][/quote] is considered invalid.
                                       // 
                                       var after = current.substring(match.index + match[0].length);
                                       var edge_case = match[0].match(/(?:\[quote(?:=[^\]]*)?\]){2}/) && after.match(/(?!\[quote(?:=[^\]]*)?\])\[\/quote\]/i);
                                       if (edge_case) {
                                          var first = match[0].match(/^\[quote(?:=[^\]]*)?\]/i)[0];
                                          match =
                                             {
                                                "0": match[0].replace(/^\[quote(?:=[^\]]*)?\]/i, ""),
                                                length: 1,
                                                index: match.index + first.length
                                             };
                                       }
                                 
                                       var match2 = match[0].match(/\[quote(=[^\]]*)?\]/i);
                                       var match3 = match[0].match(/\[\/quote\]/i);

                                       pairs.push(
                                          {
                                             start: match.index,
                                             end: match.index + match[0].length,
                                             seen_string: match[0],
                                             sTag:
                                                {
                                                   start: match.index + match2.index,
                                                   end: match.index + match2.index + match2[0].length,
                                                   length: match2[0].length
                                                },
                                             eTag:
                                                {
                                                   start: match.index + match3.index,
                                                   end: match.index + match3.index + match3[0].length,
                                                   length: match3[0].length
                                                }
                                          }
                                       );

                                       // Replace the matched content with spaces, so that we can match the QUOTE tags' next sibling or parent on the next loop iteration.
                                       //
                                       if (edge_case) {
                                          // Handle the edge-case from before.
                                          //
                                          var cNew = current.substring(0, match.index);
                                          while (cNew.length < match.index + match[0].length)
                                             cNew += " ";
                                          cNew += current.substring(match.index + match[0].length);
                                          current = cNew;
                                       } else
                                          current = current.replace(
                                             RE,
                                             function(a) {
                                                var s = "";
                                                while (s.length < a.length)
                                                   s += " ";
                                                return s
                                             }
                                          );
                                    }
                                 })();

                                 // Find the innermost pair that the caret is inside of.
                                 //
                                 var which = -1;
                                 for(var i=0;i<pairs.length && which < 0;i++)
                                    if (before.length >= pairs[i].start && before.length <= pairs[i].end)
                                       which = i;
                                 if (which >= 0)
                                    highlights.push(
                                       [
                                          pairs[which].sTag.start,
                                          pairs[which].sTag.end
                                       ],
                                       [
                                          pairs[which].eTag.start,
                                          pairs[which].eTag.end
                                       ]
                                    );

                              }
                           }
                           // End of QUOTE highlighting.

                           // Now we need to prep highlights for special characters.
                           // 
                           function allIndicesOf(s, re) {
                              var indices = [];
                              var exec;
                              var re =
                                 new RegExp(
                                    re.source,
                                    "" + ["","g"][+re.global] + ["","i"][+re.ignoreCase] + ["","m"][+re.multiline]
                                 );
                              while (exec = re.exec(s))
                                 indices.push(exec.index);
                              return indices
                           }

                           // Highlight non-weird unicode in pale green
                           //
                           if (this.feature.options.highlight_unicode.value()) {
                              var indices = allIndicesOf(text, /[^\x00-\xFF\u200B\u200C\u200D\u2028-\u2029\u2060-\u2064\uFDD0-\uFDFF\uFEFF\uFFF0-\uFFF8\uFFFE\uFFFF]/g);
                              for(var i=0;i<indices.length;i++)
                                 highlights.push([indices[i], indices[i] + 1, "#8F8"]);
                           }

                           // Highlight weird stuff in faded red
                           //
                           if (this.feature.options.highlight_metas.value()) {
                              var indices = allIndicesOf(text, /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\xAD\u200B\u200C\u200D\u2028-\u2029\u2060-\u2064\uFDD0-\uFDFF\uFEFF\uFFF0-\uFFF8\uFFFE\uFFFF]/g);
                              for(var i=0;i<indices.length;i++)
                                 highlights.push([indices[i], indices[i] + 1, "#F88"]);
                           }

                           this.highlightSubstrings.apply(this, highlights);
                        }
                     },
                  highlightSubstrings:
                     function() {
                        if (this.fake) {
                           var body = $(this.fake.prop("contentDocument").body);
                           var editor = body.children("#editor");
                           var underlay = body.children("#underlay").empty();

                           if (!arguments.length)
                              return;

                           var text = this.val();
                           var pieces = [];

                           chunks =
                              ([]).slice.call(arguments).sort(
                                 function(a, b) {
                                    return a[0] - b[0]
                                 }
                              );

                           var color = "";
                           var content = "";
                           var is_zero = "";
                           var last_end = 0;
                           for(var i=0;i<chunks.length;i++) {

                              // Handle overlapping highlights by disentangling them, if possible.
                              //
                              if (chunks[i][0] < last_end)
                                 chunks[i][0] = last_end;
                              if (chunks[i][1] <= last_end)
                                 continue;

                              // Account for unhighlighted text prior to this highlight.
                              //
                              if (chunks[i][0] > last_end) {
                                 content = text.substring(last_end, chunks[i][0]);
                                 pieces.push( document.createTextNode(content) );
                              }

                              // Prepare the highlighted chunk.
                              //
                              color = chunks[i][2] || "";
                              content = text.substring(chunks[i][0], chunks[i][1]);
                              is_zero = !!content.match(/^[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\xAD\u200B\u200C\u200D\u2028-\u2029\u2060-\u2064\uFDD0-\uFDFF\uFEFF\uFFF0-\uFFF8\uFFFE\uFFFF]+$/g);
                              pieces.push( $("<mark></mark>").text(content).css("background", color).addClass(is_zero ? "zero" : "") );
                              last_end = chunks[i][1];
                           }
                           for(i=0;i<pieces.length;i++)
                              underlay.append(pieces[i]);

                           // Fix so that scrollbars on #editor don't cause inconsistent word wrapping between 
                           // #editor and #underlay.
                           // 
                           var scrollbar_width = editor.outerWidth() - editor.prop("scrollWidth");
                           underlay.css("margin-right", scrollbar_width + "px");
                        }
                     },
                  val:
                     function(v) {
                        if (this.fake) {

                           function getText(node) { // treats BR as \n
                              if (node.jquery)
                                 node = node[0];
                              var s = "";
                              var i = 0, c = node.childNodes;
                              for(;i<c.length;i++) {
                                 if (c[i].nodeName == "#text" || c[i] instanceof CDATASection)
                                    s += c[i].textContent || c[i].nodeValue || c[i].data || "";
                                 else if (c[i].nodeName == "BR")
                                    s += "\n";
                                 else if (c[i] instanceof Element)
                                    s += getText(c[i]);
                              }
                              return s
                           }

                           var body = $(this.fake.prop("contentDocument").body);
                           if (v)
                              this.mask.val(v);
                           return getText(body.children("#editor"));
                        }
                     },
                  getSelections:
                     function() {
                        if (!this.fake)
                           return;
                        var win = this.fake.prop("contentWindow");
                        var doc = this.fake.prop("contentDocument");
                        var sel = win.getSelection();
                        var ranges = [];
                        var out = [];
                        for(var i=0;i<sel.rangeCount;i++)
                           ranges.push(sel.getRangeAt(i));
                        for(i=0;i<ranges.length;i++) {
                           var range = ranges[i];
                           rStart = range.cloneRange();
                           rStart.collapse(true);
                           rEnd = range.cloneRange();
                           rEnd.collapse(false);

                           out.push({ range: range, start: rStart, end: rEnd });
                        }
                        return out
                     }
               },
            last_after_undo: null,
            last_before_undo: null,
            handler:
               function(input, event) {
                  var start = "";
                  var end = "";
                  var tag = input.attr("data-tag");
                  if (!tag)
                     return;
                  var tagname = tag.replace(/=./g,"");
                  if (input.is("span")) {
                     switch (tagname) {
                        case "font":
                           var face = prompt("Enter the name of the font (or font category) you wish to use, or a blank value to cancel.\n\nFont categories: cursive, monospace, sans-serif, serif\nCommon fonts: Arial, Courier New, Verdana, Tahoma, Times New Roman\nFonts built into this website as of May 6 2013: BlenderProBookRegular (default), BaksheeshRegular, HaloWaypoint");
                           if (!face)
                              return;
                           start = "[" + tagname + "=" + face.replace(/^"(.*)"$/m, "$1") + "]";
                           end = "[/" + tagname + "]";
                           break;
                        case "url":
                           var url = prompt("Enter the URL you wish to link to, or a blank value to cancel.");
                           if (!url)
                              return;
                           start = "[" + tagname + "=" + url + "]";
                           end = "[/" + tagname + "]";
                           break;
                        case "userlink":
                           var str = prompt("Enter the name of the user you wish to link to, or a blank value to cancel.");
                           if (!str)
                              return;
                           start = "";
                           end = "[" + tagname + "]" + str + "[/" + tagname + "]";
                           break;
                        default:
                           start = "[" + tag + "]";
                           end = "[/" + tagname + "]";
                           if (tagname == "list") {
                              start += "\n[*]"
                              end = "\n" + end;
                           }
                           break;
                     }
                  } else {
                     if (!input.val())
                        return;
                     start = "[" + tagname + "=" + input.val() + "]";
                     end = "[/" + tagname + "]";
                  }

                  this.last_before_undo = this.faux_textarea.val();
                  $("#CobbTweaks-BBCode .CobbTweaks-BBCodeToolbar-undo").removeClass("disabled");

                  var selections = this.faux_textarea.getSelections();
                  for(i=0;i<selections.length;i++) {
                     var start_text_node = document.createTextNode(start);
                     selections[i].end.insertNode(document.createTextNode(end));
                     selections[i].start.insertNode(start_text_node);
                     selections[i].range.setStartAfter(start_text_node);
                  }

                  this.last_after_undo = this.faux_textarea.val();

                  if (input.is("select"))
                     input.val(input.attr("data-default"));
               }
         },
      apply:
         function() {
            if ($("#yafpage_reportpost, #ctl00_MainContent_forum_ctl03_QuickReplyLine").length)
               return;
            if (!$("#bbcodeFeatures").length)
               return;

            $("#bbcodeFeatures")
               .after("\
<div id='CobbTweaks-BBCode'>\n\
   <style>\n\
#bbcodeFeatures{display:none}\n\
#CobbTweaks-BBCode{position:relative;font-size:14px;line-height:1.33em}\n\
   #CobbTweaks-BBCode .CobbTweaks-button,\n\
   #CobbTweaks-BBCode .CobbTweaks-fauxbutton{display:inline-block;padding:2px 10px;margin:0 1ch 0 0;border:1px solid #888;border-radius:5px 0 5px 0;background:#EEE;color:#000;font-family:'BlenderProBookRegular';font-size:14px;line-height:1.33em}\n\
      #CobbTweaks-BBCode .CobbTweaks-fauxbutton>select{border:0;color:#000;font-family:'BlenderProBookRegular';font-size:14px;line-height:1.33em;text-align:center}\n\
         #CobbTweaks-BBCode .CobbTweaks-fauxbutton>select>option{background:#FFF;text-align:left}\n\
   #CobbTweaks-BBCode .CobbTweaks-button{cursor:pointer}\n\
   #CobbTweaks-BBCode .CobbTweaks-button:hover{border-color:#974;background:#FDA}\n\
   #CobbTweaks-BBCode .CobbTweaks-BBCodeToolbar-undo{float:right;margin-right:0;/*height:3.66em;line-height:3.66em*/}\n\
   #CobbTweaks-BBCode .CobbTweaks-BBCodeToolbar-undo.disabled{border-color:#999!important;background:#EEE!important;cursor:default;color:#888}\n\
   #CobbTweaks-BBCode span.CobbTweaks-buttongroup{margin:0 1ch 0 0}\n\
      #CobbTweaks-BBCode span.CobbTweaks-buttongroup>span.CobbTweaks-button{margin:0!important;border-left-width:0;border-radius:0}\n\
      #CobbTweaks-BBCode span.CobbTweaks-buttongroup>span.CobbTweaks-button:first-child{border-left-width:1px;border-radius:5px 0 0 0}\n\
      #CobbTweaks-BBCode span.CobbTweaks-buttongroup>span.CobbTweaks-button:last-child{border-radius:0 0 5px 0}\n\
\n\
   #CobbTweaks-BBCode select[data-tag='color']>option{background:#000}\n\
\n\
   #CobbTweaks-BBCode>div{margin-bottom:.5em}\n\
   </style>\n\
   <span class='CobbTweaks-button CobbTweaks-BBCodeToolbar-undo disabled' data-function='undo-last'>Undo Last</span>\n\
   <div>\n\
      <span class='CobbTweaks-buttongroup'>\n\
         <span class='CobbTweaks-button' data-tag='b'><b>B</b></span><!--\n\
      --><span class='CobbTweaks-button' data-tag='i'><i>I</i></span><!--\n\
      --><span class='CobbTweaks-button' data-tag='u'><u>U</u></span><!--\n\
      --><span class='CobbTweaks-button' data-tag='s'><s>S</s></span><!--\n\
      --><span class='CobbTweaks-button' data-tag='h'><span style='background:#FCD74D'>H</span></span><!--\n\
   --></span><!--\n\
      --><span class='CobbTweaks-button' data-tag='url'>Link...</span><!--\n\
      --><span class='CobbTweaks-button' data-tag='quote'>Quote</span><!--\n\
      --><span class='CobbTweaks-button' data-tag='spoiler'>Spoiler</span><!--\n\
      --><span class='CobbTweaks-button' data-tag='code'>Code</span><!--\n\
   --><span class='CobbTweaks-buttongroup'><!--\n\
      --><span class='CobbTweaks-button' data-tag='left'>Left</span><!--\n\
      --><span class='CobbTweaks-button' data-tag='center'>Center</span><!--\n\
      --><span class='CobbTweaks-button' data-tag='right'>Right</span>\n\
      </span>\n\
   </div>\n\
   <div>\n\
      <span class='CobbTweaks-fauxbutton'>\n\
         <label>Color:</label>\n\
         <select data-tag='color' data-default=''>\n\
            <option selected value=''>...</option>\n\
            <option value='darkred'>Dark Red</option>\n\
            <option>Red</option>\n\
            <option>Brown</option>\n\
            <option>Orange</option>\n\
            <option>Yellow</option>\n\
            <option>Olive</option>\n\
            <option>Green</option>\n\
            <option value='#0A8'>Teal</option>\n\
            <option>Cyan</option>\n\
            <option value='#18F'>Sky Blue</option>\n\
            <option>Blue</option>\n\
            <option value='darkblue'>Dark Blue</option>\n\
            <option>Indigo</option>\n\
            <option>Violet</option>\n\
            <option>Black</option>\n\
            <option value='#AAA'>Grey</option>\n\
            <option>White</option>\n\
         </select>\n\
      </span><!--\n\
   --><span class='CobbTweaks-fauxbutton'>\n\
         <label>Size:</label>\n\
         <select data-tag='size' data-default='5'>\n\
            <option>1</option>\n\
            <option>2</option>\n\
            <option>3</option>\n\
            <option>4</option>\n\
            <option selected value='5'>Default</option>\n\
            <option>6</option>\n\
            <option>7</option>\n\
            <option>8</option>\n\
            <option>9</option>\n\
         </select>\n\
      </span><!--\n\
   --><span class='CobbTweaks-buttongroup'>\n\
         <span class='CobbTweaks-button' data-tag='font'>Font...</span><!--\n\
      --><span class='CobbTweaks-button' data-function='help-font'>?</span><!--\n\
   --></span><!--\n\
   --><span class='CobbTweaks-buttongroup'><!--\n\
      --><span class='CobbTweaks-button' data-tag='list'>Bulleted List</span><!--\n\
      --><span class='CobbTweaks-button' data-tag='list=1'>Numbered List</span>\n\
      </span><!--\n\
   --><span class='CobbTweaks-button' data-tag='userlink'>Userlink...</span>\n\
   </div>\n\
   <div class='extensible'>\n\
      <!-- For other userscripts to add their own extensions -->\n\
   </div>\n\
</div>\n\
               ");

            $("#CobbTweaks-BBCode select[data-tag='color']>option").each(
               function() {
                  $(this).css("color", $(this).val() || $(this).text());
               }
            );

            this.shim.faux_textarea.create();

            this.shim.faux_textarea.mask.bind(
               "change",
               $.proxy(
                  function() {
                     if ( this.shim.faux_textarea.val() == this.shim.last_after_undo )
                        return;
                     this.shim.last_after_undo = null;
                     this.shim.last_before_undo = null;
                     $("#CobbTweaks-BBCode .CobbTweaks-BBCodeToolbar-undo").addClass("disabled")
                  },
                  this
               )
            );

            $("#CobbTweaks-BBCode").delegate(
               "select",
               "change.CobbTweaks-BBCodeToolbar",
               $.proxy(
                  function(e) {
                     var input = $(e.target);
                     if (!input.is("select"))
                        input = input.closest("select");
                     this.shim.handler(input);
                  },
                  this
               )
            ).delegate(
               "span.CobbTweaks-button",
               "click.CobbTweaks-BBCodeToolbar",
               $.proxy(
                  function(e) {
                     if (e.which != 1) // not a normal click
                        return;
                     var input = $(e.target);
                     if (!input.is("span.CobbTweaks-button"))
                        input = input.closest("span.CobbTweaks-button");
                     if (!input.attr("data-function"))
                        this.shim.handler(input);
                     else
                        switch (input.attr("data-function")) {
                           case "help-font":
                              alert("The FONT tag allows you to specify a font or font category to display a piece of text in. If a user doesn't have the specified font installed, they will see that text in a default (usually Times New Roman).\n\nYou can get a little more advanced with this tag, by using a comma-separated list of multiple fonts. When someone reads your post, their web browser will use the first font that is available (installed on their computer or built into the website). If none of those fonts are available, the default (Times) gets used.\n\nYou can also mix-and-match font names and font categories, to do something like this:\n\n[font=Verdana,Arial,sans-serif] Test [/font]\n\nIn that example, the text appears in Verdana for readers with that font installed. Readers who don't have Verdana but do have Arial will see the text in Arial. For readers with neither of those fonts, a sans-serif font on their machine will be selected automatically to display the text.");
                              break;
                           case "undo-last":
                              if (this.shim.last_after_undo == this.shim.faux_textarea.val() && this.shim.last_before_undo != null)
                                 this.shim.faux_textarea.val( this.shim.last_before_undo );
                              this.shim.last_after_undo = null;
                              this.shim.last_before_undo = null;
                              $("#CobbTweaks-BBCode .CobbTweaks-BBCodeToolbar-undo").addClass("disabled");
                              break;
                        }
                  },
                  this
               )
            );

            window.postMessage.call(unsafeWindow, "GREASEMONKEY:COBB:Waypoint Tweaks:BBCodeToolbar:Added", "*");
         },
      undo:
         function() {
            this.shim.faux_textarea.destroy();
            $("#CobbTweaks-BBCode").undelegate().remove();
            window.postMessage.call(unsafeWindow, "GREASEMONKEY:COBB:Waypoint Tweaks:BBCodeToolbar:Removed", "*");
         },
      init:
         function() {
            this.shim.faux_textarea.feature = this;

            if (this.options.enable.value())
               this.apply();
            $(this.options.enable).bind("change",
               $.proxy(
                  function() {
                     if (this.options.enable.value())
                        this.apply();
                     else
                        this.undo();
                  },
                  this
               )
            );
         }
   }
);


Feature(
   {
      name: "CODETagFix",
      display: "CODE Tag Fix",
      description: "Styles CODE tags in posts to resemble QUOTE tags. Disabled by default, in case the Waypoint devs fix things on their end later.",
      options:
         {
            enable:
               {
                  name: 	"Enable this feature",
                  type: 	"bool",
                  default_to: 	false
               },
            monospace:
               {
                  name: 	"Show CODE contents in monospace without word-wrap",
                  type: 	"bool",
                  default_to: 	false
               }
         },
      applyMonospace:
         function() {
            var go = this.options.monospace.value();
            var is = $("#CobbTweaks-CODETagFix-Monospace").length;
            if(!is && go)
               $("<style id='CobbTweaks-CODETagFix-Monospace'></style>")
                  .text(
                     "div.innercode{font-family:'Lucida Console','Courier New',monospace;font-size:.8em;white-space:pre;overflow:auto}"
                  ).appendTo("head");
            else if (is && !go)
               $("#CobbTweaks-CODETagFix-Monospace").remove();
         },
      apply:
         function() {
            if(!$("#CobbTweaks-CODETagFix").length)
               $("<style id='CobbTweaks-CODETagFix'></style>")
                  .text(
                     "div.code{margin:0 10px;border:2px solid #262626}\n\
                         div.code>strong{display:block;padding:5px;background:#262626;color:#FFF}\n\
                         div.code>div.innercode{padding:10px}"
                  ).appendTo("head");
            this.applyMonospace();
         },
      undo:
         function() {
            $("#CobbTweaks-CODETagFix, #CobbTweaks-CODETagFix-Monospace").remove();
         },
      init:
         function() {
            if (this.options.enable.value())
               this.apply();
            $(this.options.enable).bind("change",
               $.proxy(
                  function() {
                     if (this.options.enable.value())
                        this.apply();
                     else
                        this.undo();
                  },
                  this
               )
            );
            $(this.options.monospace).bind("change", $.proxy(this.applyMonospace, this));
         }
   }
);


Feature(
   {
      name: "Colorless",
      display: "Colorless",
      description: "Cancels out custom text colors in posts. Disabled by default.",
      options:
         {
            enable:
               {
                  name: 	"Enable this feature",
                  type: 	"bool",
                  default_to: 	false
               }
         },
      apply:
         function() {
            $("#yafpage_posts")
               .find("div.individual_forum_post")
               .find("div[id$='_MessagePost1']").find("span").each(
                  function() {
                     var color = $(this).css("color");
                     if (color && !$(this).attr("id") && !$(this).attr("class")) {
                        $(this).addClass("CobbTweaks-Colorless-IOnceWasABeautifulOceanOfHue")
                           .attr("data-cobb-tweaks-old-color", color)
                           .css("color", "inherit");
                     }
                  }
               );
         },
      undo:
         function() {
            $("span.CobbTweaks-Colorless-IOnceWasABeautifulOceanOfHue").each(
               function() {
                  var color = $(this).attr("data-cobb-tweaks-old-color");
                  $(this).css("color", color)
                     .removeAttr("data-cobb-tweaks-old-color")
                     .removeClass("CobbTweaks-Colorless-IOnceWasABeautifulOceanOfHue");
               }
            );
         },
      init:
         function() {
            if (this.options.enable.value())
               this.apply();
            $(this.options.enable).bind("change",
               $.proxy(
                  function() {
                     if (this.options.enable.value())
                        this.apply();
                     else
                        this.undo();
                  },
                  this
               )
            );
         }
   }
);


Feature(
   {
      name: "Debugging",
      display: "Debugging",
      description: "This \"feature\" was implemented as a simple test for handling option changes without requiring a refresh.",
      options:
         {
            enable:
               {
                  name: 	"Enable this feature (tests response to option changes)",
                  type: 	"bool",
                  default_to: 	true
               }
         },
      apply:
         function(initial) {
            $("body").attr("data-cobb-tweaks-pref-test", true);
            if (!initial)
               alert("Detected pref change! APPLY called.");
         },
      undo:
         function() {
            if ($("body").attr("data-cobb-tweaks-pref-test"))
               alert("Detected pref change! UNDO called.");
            $("body").removeAttr("data-cobb-tweaks-pref-test");
         },
      init:
         function() {
            if (this.options.enable.value())
               this.apply(true);
            $(this.options.enable).bind("change",
               $.proxy(
                  function() {
                     if (this.options.enable.value())
                        this.apply();
                     else
                        this.undo();
                  },
                  this
               )
            );
         }
   }
);


Feature(
   {
      name: "FixLinksToSamePage",
      display: "Fix Links To Same Page",
      description: "If someone links to a post on the same page, this script'll fix the link so that you scroll to that post, rather than reloading the page you're already on.",
      options:
         {
            enable:
               {
                  name: 	"Enable this feature",
                  type: 	"bool",
                  default_to: 	true
               }
         },
      apply:
         function() {
            $("#yafpage_posts")
               .find("div.individual_forum_post")
               .find("div[id$='_MessagePost1']").find("a").each(
                  function() {
                     if ($(this).attr("data-cobb-same-page-fix"))
                        return true;
                     var H = this.href,
                         mID = Waypoint.Forums.getPostID(Waypoint.Forums.oldToNew(H));
                     if (mID && $("a[name='post" + mID + "']").length)
                        $(this).bind(
                           "click.CobbWaypointTweaks-FixLinksToSamePage",
                           function(e) {
                              window.location.hash = "#post" + mID;
                              e.preventDefault();
                              return false
                           }
                        ).attr("data-cobb-same-page-fix", true);
                  }
               );
         },
      undo:
         function() {
            $("a[data-cobb-same-page-fix]").unbind("click.CobbWaypointTweaks-FixLinksToSamePage");
         },
      init:
         function() {
            if (this.options.enable.value())
               this.apply();
            $(this.options.enable).bind("change",
               $.proxy(
                  function() {
                     if (this.options.enable.value())
                        this.apply();
                     else
                        this.undo();
                  },
                  this
               )
            );
         }
   }
);


Feature(
   {
      name: "NotificationDialog",
      display: "Notification Dialog Tweaks",
      description: "Improves the notification dialog shown for PMs and other actions, by making it scroll with the page.",
      options:
         {
            enable:
               {
                  name: 	"Enable this feature",
                  type: 	"bool",
                  default_to: 	true
               }
         },
      apply:
         function() {
            var css = $("<style id='CobbTweaks-NotificationDialog'></style>");
            css.text(
               ".ModalDialog{position:fixed!important;z-index:99999;left:50%!important;top:50%!important;margin:-100px 0 0 -198px;font-family:BlenderProBookRegular}"
            ).appendTo("head");
            $("<span id='CobbTweaks-NotificationDialog-DialogPlaceholder'></span>").insertBefore(".ModalDialog");
            $("<span id='CobbTweaks-NotificationDialog-ScreenPlaceholder'></span>").insertBefore(".ModalDialog_overlayBG");
            $(".ModalDialog, .ModalDialog_overlayBG").appendTo("body");

            this._original_function = unsafeWindow.$.fn.YafModalDialog.Close;
            unsafeWindow.$.fn.YafModalDialog.Close =
               function(d) {
                  var d = $.extend({ Dialog: "#MessageBox", ImagePath: "images/" }, d);
                  var dID = d.Dialog;
                  var mdID = dID + "Box";

                  if (d.Dialog == "#ctl00_MainContent_forum_YafForumPageErrorPopup1") {
                     $("#ctl00_MainContent_forum_YafForumPageErrorPopup1, #CobbTweaks-NotificationDialog-DialogPlaceholder").remove();
                     $("#ctl00_MainContent_forum_YafForumPageErrorPopup1Box").remove();
                     $("#ctl00_MainContent_forum_YafForumPageErrorPopup1Box_overlay").remove();
                  } else {
                     var node = $(d.Dialog);
                     node.hide();
                     $(d.Dialog + "Box_overlay").fadeOut().remove();
                     $(document).unbind("keydown." + node.attr("id"));

                     var kids = $(d.Dialog + "Box .DialogContent").contents();
                     $(d.Dialog + "Box").replaceWith(kids);

                     $(d.Dialog + '#ModalDialog' + ' #' + node.attr("id") + 'Close').remove();
                     $(d.Dialog + '#ModalDialog_overlay').remove();
                  }

                  return this
               };
         },
      undo:
         function() {
            $("#CobbTweaks-NotificationDialog").remove();
            $("#CobbTweaks-NotificationDialog-DialogPlaceholder").replaceWith($(".ModalDialog"));
            $("#CobbTweaks-NotificationDialog-ScreenPlaceholder").replaceWith($(".ModalDialog_overlayBG"));
            unsafeWindow.$.fn.YafModalDialog.Close = this._original_function;
            delete this._original_function;
         },
      init:
         function() {
            if (this.options.enable.value())
               this.apply();
            $(this.options.enable).bind("change",
               $.proxy(
                  function() {
                     if (this.options.enable.value())
                        this.apply();
                     else
                        this.undo();
                  },
                  this
               )
            );
         }
   }
);


Feature(
   {
      name: "QUOTETagFix",
      display: "QUOTE Tag Tweaks",
      description: "Modifies QUOTE tags that refer to a specific post ID, so that they link to the post.",
      options:
         {
            post_id_fix:
               {
                  name: 	"For QUOTE tags with post IDs, add direct links to the quoted post",
                  type: 	"bool",
                  default_to: 	true
               },
            show_inner_quotes:
               {
                  name: 	"Show deeply-nested QUOTEs, and add a button to expand/collapse them",
                  type: 	"bool",
                  default_to: 	false
               }
         },
      getQuotes:
         function() {
            return $("#postList div.quote");
         },
      post_id_fix:
         {
            apply:
               function() {
                  this.getQuotes().children("span.quotetitle").each(
                     function() {
                        var text = $(this).text();
                        var id = text.match(/(.+);(\d+)( wrote\:\s*)$/);
                        if (id) {
                           $(this).closest("div").addClass("CobbTweaks-QUOTETagFix-IDs").attr("data-cobb-tweaks-quote-id", id[2]);
                           var link = $("<a><img src='/themes/waypoint/icon_latest_reply.gif' title='Go to Quoted Post' /></a>").attr("href", "/yaf_postsm" + id[2] + ".aspx#post" + id[2]);
                           $(this).text(id[1] + id[3] + " ").append(link);
                        }
                     }
                  );
               },
            undo:
               function() {
                  this.getQuotes().filter(".CobbTweaks-QUOTETagFix-IDs").each(
                     function() {
                        var id = $(this).attr("data-cobb-tweaks-quote-id");
                        var text = $(this).children("span.quotetitle").text() || "";
                        var name = text.replace(/ wrote\:\s*$/,"");
                        if (id && text.length) {
                           var s = name + ";" + id + " wrote:";
                           $(this).children("span.quotetitle").text(s);
                           $(this).removeClass("CobbTweaks-QUOTETagFix-IDs").removeAttr("data-cobb-tweaks-quote-id");
                        }
                     }
                  );
               }
         },
      show_inner_quotes:
         {
            apply:
               function() {
                  var applied =
                     this.getQuotes().filter("div.quote div.quote div.quote").each(
                        function() {
                           var head = $(this).children("span.quotetitle");
                           var body = $(this).children("div.innerquote");

                           head.append("<a class='CobbTweaks-QUOTETagFix-Expando' href='#'>+</a>");
                           $(this).addClass("CobbTweaks-QUOTETagFix-Collapsed");
                        }
                     ).length;

                  if (applied) {
                     $("body").delegate(
                        "a.CobbTweaks-QUOTETagFix-Expando",
                        "click.CobbTweaks-QUOTETagFix-ShowInnerQuote",
                        function(e) {
                           var quote = $(this).closest("div.quote");
                           if (quote.hasClass("CobbTweaks-QUOTETagFix-Collapsed")) {
                              quote.removeClass("CobbTweaks-QUOTETagFix-Collapsed").addClass("CobbTweaks-QUOTETagFix-Expanded");
                              $(this).text("-");
                           } else {
                              quote.removeClass("CobbTweaks-QUOTETagFix-Expanded").addClass("CobbTweaks-QUOTETagFix-Collapsed");
                              $(this).text("+");
                           }
                           e.preventDefault();
                        }
                     );
                     $("<style id='CobbTweaks-QUOTETagFix-ShowInnerQuoteCSS'></style>")
                        .text(
                           "div.quote.CobbTweaks-QUOTETagFix-Collapsed,\n\
                            div.quote.CobbTweaks-QUOTETagFix-Expanded{display:block!important}\n\
                            div.quote.CobbTweaks-QUOTETagFix-Collapsed{border-bottom:0!important}\n\
                               div.quote.CobbTweaks-QUOTETagFix-Collapsed>span.quotetitle,\n\
                               div.quote.CobbTweaks-QUOTETagFix-Expanded>span.quotetitle{position:relative}\n\
                                  div.quote.CobbTweaks-QUOTETagFix-Collapsed>span.quotetitle>a.CobbTweaks-QUOTETagFix-Expando,\n\
                                  div.quote.CobbTweaks-QUOTETagFix-Expanded>span.quotetitle>a.CobbTweaks-QUOTETagFix-Expando{position:absolute;right:5px;top:5px;bottom:5px;width:1.25em;border:1px solid #2A6C99;background:#193E57;font-weight:normal!important;text-align:center}\n\
                               div.quote.CobbTweaks-QUOTETagFix-Collapsed>div.innerquote{display:none}"
                        ).appendTo("head");
                  }
               },
            undo:
               function() {
                  this.getQuotes().filter(".CobbTweaks-QUOTETagFix-Collapsed, .CobbTweaks-QUOTETagFix-Expanded").each(
                     function() {
                        $(this)
                           .removeClass("CobbTweaks-QUOTETagFix-Expanded")
                           .removeClass("CobbTweaks-QUOTETagFix-Collapsed")
                           .children("span.quotetitle")
                           .children("a.CobbTweaks-QUOTETagFix-Expando")
                           .remove();
                        $("body").undelegate(".CobbTweaks-QUOTETagFix-ShowInnerQuote");
                        $("#CobbTweaks-QUOTETagFix-ShowInnerQuoteCSS").remove();
                     }
                  );
               }
         },
      apply:
         function(n) {
            if (this[n] && this[n].apply)
               return this[n].apply.apply(this, arguments);
         },
      undo:
         function(n) {
            if (this[n] && this[n].undo)
               return this[n].undo.apply(this, arguments);
         },
      init:
         function() {

            var listen =
               $.proxy(
                  function(e) {
                     var n = e.data.name;
                     if (this.options[n].value())
                     this.apply(n);
                     else
                        this.undo(n);
                  },
                  this
               );

            for(var i in this.options) {
               if (this.options[i].value())
                  this.apply(i);
               $(this.options[i]).bind("change", { name: i }, listen);
            }
         }
   }
);


Feature(
   {
      name: "RemovePostbacks",
      display: "Remove Postbacks",
      description: "Changes postbacks (fake links) into real links that can be opened in new tabs and that might load a bit faster when the site is bogged down.",
      options:
         {
            enable:
               {
                  name: 	"Enable this feature",
                  type: 	"bool",
                  default_to: 	true
               }
         },
      apply:
         function(initial) {
            var id, url;

            var info = Waypoint.Forums.getCurrentPageData();

            // NEW TOPIC BUTTONS
            //id = Waypoint.Forums.getSectionID();
            id = info.section_id;
            if (id || id === 0) {
               url = "https://forums.halowaypoint.com/yaf_postmessage.aspx?f_yaf=";
               $("#ctl00_MainContent_forum_ctl03_NewTopic1, #ctl00_MainContent_forum_ctl03_NewTopic2").each(
                  function() {
                     $(this)
                        .attr("data-old-onclick", $(this).attr("onclick"))
                        .attr("data-old-href", $(this).attr("href"))
                        .attr("href", url + id);
                  }
               );
            }

            // POST REPLY BUTTONS
            if ($("#ctl00_MainContent_forum_ctl03_MessageList_ctl00_DisplayPost1_ReplyA").length) {
               url = $("#ctl00_MainContent_forum_ctl03_MessageList_ctl00_DisplayPost1_ReplyA").attr("href");
               $("#ctl00_MainContent_forum_ctl03_PostReplyLink1, #ctl00_MainContent_forum_ctl03_PostReplyLink2").each(
                  function() {
                     $(this)
                        .attr("data-old-onclick", $(this).attr("onclick"))
                        .attr("data-old-href", $(this).attr("href"))
                        .attr("href", url);
                  }
               );
            }

            // PM REPLY BUTTON
            if (info.pm_id >= 0) {
               url = "https://forums.halowaypoint.com/yaf_pmessage.aspx?p=" + info.pm_id + "&q=0";
               $("#ctl00_MainContent_forum_ctl03_Inbox_ctl00_ReplyMessage").each(
                  function() {
                     $(this)
                        .attr("data-old-onclick", $(this).attr("onclick"))
                        .attr("data-old-href", $(this).attr("href"))
                        .attr("href", url);
                  }
               );
            }

            // PM QUOTE BUTTON
            if (info.pm_id >= 0) {
               url = "https://forums.halowaypoint.com/yaf_pmessage.aspx?p=" + info.pm_id + "&q=1";
               $("#ctl00_MainContent_forum_ctl03_Inbox_ctl00_QuoteMessage").each(
                  function() {
                     $(this)
                        .attr("data-old-onclick", $(this).attr("onclick"))
                        .attr("data-old-href", $(this).attr("href"))
                        .attr("href", url);
                  }
               );
            }
         },
      undo:
         function() {
            // NEW TOPIC BUTTONS
            // POST REPLY BUTTONS
            // PM REPLY BUTTON
            // PM QUOTE BUTTON
            $("#ctl00_MainContent_forum_ctl03_NewTopic1, #ctl00_MainContent_forum_ctl03_NewTopic2")
               .add("#ctl00_MainContent_forum_ctl03_PostReplyLink1, #ctl00_MainContent_forum_ctl03_PostReplyLink2")
               .add("#ctl00_MainContent_forum_ctl03_Inbox_ctl00_ReplyMessage")
               .add("#ctl00_MainContent_forum_ctl03_Inbox_ctl00_QuoteMessage")
               .each(
                  function() {
                     if (!$(this).attr("data-old-onclick") || !$(this).attr("data-old-href"))
                        return true;
                     $(this)
                        .attr("onclick", $(this).attr("data-old-onclick"))
                        .attr("href", $(this).attr("data-old-href"));
                  }
               );
         },
      init:
         function() {
            if (this.options.enable.value())
               this.apply(true);
            $(this.options.enable).bind("change",
               $.proxy(
                  function() {
                     if (this.options.enable.value())
                        this.apply();
                     else
                        this.undo();
                  },
                  this
               )
            );
         }
   }
);


Feature(
   {
      name: "UnHidePosts",
      display: "Un-Hide Posts",
      description: "This feature was added to fix a problem in older forum layouts, that made it impossible to un-mute users. The May 1st 2013 update to the forums made it possible to un-hide a user's posts for good by visiting their profile, so use that instead.",
      options:
         {
            enable:
               {
                  name: 	"Enable this feature",
                  type: 	"bool",
                  default_to: 	false
               }
         },
      apply:
         function() {
            var css = $("<style id='CobbTweaks-UnHidePosts-CSS'></style>");
            css.text(
              "div.CobbTweaks-UnHidePosts{display:block!important}"
            ).appendTo("head");

            $("#yafpage_posts")
               .find("div.individual_forum_post")
               .find("div[id$='_DisplayPost1_panMessage']").each(
                  function() {
                     if ($(this).css("display") == "none")
                        $(this).addClass("CobbTweaks-UnHidePosts");
                  }
               );
         },
      undo:
         function() {
            $("div.CobbTweaks-UnHidePosts").removeClass("CobbTweaks-UnHidePosts");
            $("#CobbTweaks-UnHidePosts-CSS").remove();
         },
      init:
         function() {
            if (this.options.enable.value())
               this.apply();
            $(this.options.enable).bind("change",
               $.proxy(
                  function() {
                     if (this.options.enable.value())
                        this.apply();
                     else
                        this.undo();
                  },
                  this
               )
            );
         }
   }
);


Feature(
   {
      name: "Usermenus",
      display: "Usermenus",
      description: "Adds a small \"User info\" button at the bottom of each post. Clicking it will show or hide a menu with links to the user's post history, game stats, and similar information.",
      options:
         {
            enable:
               {
                  name: 	"Enable this feature",
                  type: 	"bool",
                  default_to: 	true
               }
         },
      apply:
         function() {
            var css = $("<style id='CobbTweaks-Usermenu'></style>");
            css.text(
               "div.CobbTweaks-Usermenu{position:relative;font-size:14px;line-height:1.33em}\n\
                   div.CobbTweaks-Usermenu>a{display:block;float:right;padding:2px 10px;margin-top:5px;border:1px solid #262626;border-radius:5px 0 5px 0;background:#262626;color:#D1D1D1;text-align:center}\n\
                   div.CobbTweaks-Usermenu>ul{display:none;position:absolute;bottom:100%;right:0;list-style:none;padding:0;margin:0 0 -7px 0;border:1px solid #1E4D6D;border-radius:5px 0 0 0;background:#0F2534;text-align:center}\n\
                     div.CobbTweaks-Usermenu>ul>li{padding:0;margin:0}\n\
                        div.CobbTweaks-Usermenu>ul>li>a{display:block;padding:.25em .75em;color:#FFF}\n\
                        div.CobbTweaks-Usermenu>ul>li>a:hover{background:#2A6C99}\n\
                   div.CobbTweaks-UsermenuOpen>a{border-radius:0 0 5px 0}\n\
                   div.CobbTweaks-UsermenuOpen>ul{display:block}"
            ).appendTo("head");

            $("#yafpage_posts")
               .find("div.individual_forum_post").each(
                  function() {
                     var u_av = $(this).find("img.avatarimage");
                     var u_id = (Waypoint.URLs.to(u_av.closest("a").attr("href")).pathname.match(/yaf_profile(\d+)\.aspx/)||[0,-1])[1];
                     var name = u_av.attr("alt");

                     var target = $(this).children("div.parent_section").eq(1).find("div.section.col6").eq(1);
                     target.prepend(
                        $("<div class='CobbTweaks-Usermenu'></div>")
                           .append("<a href='#'>User info</a>")
                           .append(
                              $("<ul></ul>")
                                 .append("<li><a href='https://forums.halowaypoint.com/yaf_viewthanks.aspx?u=" + u_id + "'>View Thanks</a></li>")
                                 .append("<li><a href='https://forums.halowaypoint.com/yaf_search.aspx?postedby=" + encodeURIComponent(name) + "'>View All Posts</a></li>")
                                 .append("<li><a href='https://www.halowaypoint.com/en-us/players/" + encodeURIComponent(name.toLowerCase()) + "/haloreach'>Reach Stats</a></li>")
                                 .append("<li><a href='https://www.halowaypoint.com/en-us/players/" + encodeURIComponent(name.toLowerCase()) + "/halo4'>Halo 4 Stats</a></li>")
                                 .append("<li><a href='https://live.xbox.com/en-US/Profile?gamertag=" + encodeURIComponent(name.toLowerCase()) + "'>Xbox.com</a></li>")
                           )
                     );

                     target.find("div.CobbTweaks-Usermenu>a").bind(
                        "click.CobbWaypointTweaks-Usermenus",
                        function(e) {
                           e.preventDefault();
                           var node = $(this).closest("div");
                           node.toggleClass("CobbTweaks-UsermenuOpen");
                        }
                     );
                  }
               );
         },
      undo:
         function() {
            $("div.CobbTweaks-Usermenu").parent()
               .unbind("click.CobbWaypointTweaks-Usermenus")
               .children("div.CobbTweaks-Usermenu").add("#CobbTweaks-Usermenu").remove();
         },
      init:
         function() {
            if (this.options.enable.value())
               this.apply();
            $(this.options.enable).bind("change",
               $.proxy(
                  function() {
                     if (this.options.enable.value())
                        this.apply();
                     else
                        this.undo();
                  },
                  this
               )
            );
         }
   }
);


Feature(
   {
      name: "WideQuickReply",
      display: "Wide Quick Reply",
      description: "Doubles the width of the Quick Reply box.",
      options:
         {
            enable:
               {
                  name: 	"Enable this feature",
                  type: 	"bool",
                  default_to: 	true
               }
         },
      apply:
         function() {
            var root = $("#ctl00_MainContent_forum_ctl03_QuickReplyWrapper");
            root.children().eq(0).removeClass("col8").addClass("col4");
            root.children().eq(1).removeClass("col4").addClass("col8");
         },
      undo:
         function() {
            var root = $("#ctl00_MainContent_forum_ctl03_QuickReplyWrapper");
            root.children().eq(0).removeClass("col4").addClass("col8");
            root.children().eq(1).removeClass("col8").addClass("col4");
         },
      init:
         function() {
            if (this.options.enable.value())
               this.apply();
            $(this.options.enable).bind("change",
               $.proxy(
                  function() {
                     if (this.options.enable.value())
                        this.apply();
                     else
                        this.undo();
                  },
                  this
               )
            );
         }
   }
);





/*===========================================================================*\

   START OF TRIGGER CODE

\*===========================================================================*/
$(function(){
   for(var i in Waypoint.features)
      Waypoint.features[i].init();
   Waypoint.Prefs.init();
});

//unsafeWindow.CobbWaypoint = Waypoint;