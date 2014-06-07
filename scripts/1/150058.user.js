// ==UserScript==
// @name        Waypoint - Remove Threads
// @namespace   DavidJCobb
// @description Hides undesired threads' data.
// @include     http://forums.halo.xbox.com/*

// @include     http://forums.halowaypoint.com/*

// @include     https://forums.halo.xbox.com/*

// @include     https://forums.halowaypoint.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1.3
// ==/UserScript==

if (window.top !== window.self) // do not run in IFRAMEs
  return;

function GM_unwrap(x){if(!x)return x;if(!x.jquery)return x.wrappedJSObject||XPCNativeWrapper.unwrap(x)||x;var a=$.makeArray(x),i=0,al=a.length;for(;i<al;i++)a[i]=GM_unwrap(a[i]);return $(a)}

Modal =
   {
      show:
         function() {
            if (!this.node)
               return;
            this.node.addClass("show");
            this.load();
         },
      hide:
         function() {
            if (!this.node)
               return;
            this.node.removeClass("show");
            $("body").focus();
         },
      save:
         function() {
            if (!this.node)
               return;
            var enable = $(this.document.getElementById("enable"));
            var list = $(this.document.getElementById("thread-list"));

            GM_setValue("enabled", !!enable.attr("checked"));

            var threads = [];
            list.children("li.entry").each(
               function() {
                  var title = $.trim($(this).children("input").val()).replace(/\0/g,"");
                  if (title)
                     threads.push(title);
               }
            );
            GM_setValue("threads", threads.join("\u0001"));

            alert("Your changes will take effect when you reload the page.");
         },
      load:
         function() {
            if (!this.node)
               return;
            var enable = $(this.document.getElementById("enable"));
            var list = $(this.document.getElementById("thread-list"));
            var add = $(this.document.getElementById("add-list-item"));

            enable[["removeA","a"][+GM_getValue("enabled",false)]+"ttr"]("checked", "checked");

            list.children("li.entry").html("").remove();
            var threads = GM_getValue("threads", "").split("\u0001");
            for(var i=0;i<threads.length;i++) {
               if (!$.trim(threads[i]))
                  continue;
               add.closest("li").before( $("<li class='entry'></li>").append( $("<input type='text'>").val(threads[i]) ) );
            }
         },
      init:
         function() {
            GM_addStyle("\
               #cobb-thread-hide-dialog{position:fixed;z-index:18003;left:50%;top:50%;width:0;height:0;padding:0;margin:0;border:0}\n\
               #cobb-thread-hide-dialog[data-loaded]{display:none}\n\
               #cobb-thread-hide-dialog.show{display:-moz-initial;width:640px;height:240px;margin:-100px -320px}\
            ");
            this.node = $("<iframe id='cobb-thread-hide-dialog'></iframe>");
            this.node[0].addEventListener(
               "load",
               $.proxy(
                  function(){
                     this.node.attr("data-loaded", true);
                     var D = this.document = this.node[0].contentDocument;
                     $("<style></style>").appendTo(D.body).html("\
                        html{border:1px solid #444;overflow-x:hidden;overflow-y:auto}\n\
                        body{position:relative;width:590px;height:214px;padding:12px 24px;margin:0;background:rgba(0,0,0,.85);color:#BBB;font:12/15px Arial,Helvetica,sans-serif}\n\
                           ul{list-style:none;padding:0;margin:1em 0}\n\
                              li>input{width:100%}\n\
                           div.center{text-align:center}\
                     ");
                     $(D.body)
                        .append("<h1>Hide Threads</h1>")
                        .append("<input type='checkbox' id='enable'> <label for='enable'>Hide the following threads</label>")
                        .append("<p>(Titles are case-sensitive. Whitespace on either end will be trimmed. To delete a thread from the list, clear its name out and then save.)</p>");
                     $("<ul id='thread-list'></ul>")
                        .append("<li class='persistent'><input type='button' id='add-list-item' value='+'></li>")
                        .appendTo(D.body);
                     $(D.body).append("<div class='center'><input type='button' id='save' value='Save Changes'> <input type='button' id='cancel' value='Cancel'></div>");

                     $(D.body).find("#add-list-item").click(
                        function() {
                           $("<li class='entry'><input type='text'></li>").insertBefore($(this).closest("li"));
                        }
                     );
                     $(D.body).find("#save").click(
                        $.proxy(
                           function() {
                              this.save();
                              this.hide()
                           },
                           this
                        )
                     );
                     $(D.body).find("#cancel").click($.proxy(this.hide, this));
                  },
                  this
               ),
               true
            );
            document.body.appendChild(this.node[0])
         }
   };
GM_registerMenuCommand("Waypoint Thread Hide - Options",function(){Modal.show()});

$(document).ready(function(){

   GM_addStyle("\
tr.cobb-thread-masked>td>*,\n\
tr.cobb-thread-masked>td>*{visibility:hidden}\n\
   tr.cobb-thread-masked>td.topicReplies,\n\
   tr.cobb-thread-masked>td.topicViews{font-size:0;line-height:0;color:transparent}");

   var threads = $("tr.topic_row,tr.topic_row_alt");
   var titles = GM_getValue("threads", "").split("\u0001");

   threads.each(
      function() {
         var T = $(this);
         var title = $.trim( T.children("td.topicMain").children("a.post_link").text() );
         var date_created = $.trim( T.children("td.topicMain").children("span.topicPosted").children("abbr.timeago").attr("title") );

         $.each(titles,
            function(i, e) {
               if (e == title) {
                  T.addClass("cobb-thread-masked");
                  return false;
               }

               // Regexes
               var RE = e.match(/^\/(.+)\/(g?i?m?)$/i);
               if (RE) {
                  RE = new RegExp(RE[1], RE[2]);
                  if (title.match(RE)) {
                     T.addClass("cobb-thread-masked");
                     return false
                  }
               }

               // Timecodes of the syntax $COBB:TIME:5 days
               var RE = e.match(/^\$COBB\:TIME\:(.+)$/);
               if (RE) {
                  var code = $.trim(RE[1]);

                  var number = code.match(/^([\d\.,]+)/);
                  if (!number || !number[1])
                     return;
                  number = parseInt(number, 10);

                  var unit = code.match(/([dhms]|ms|days?|h(?:ou)?rs?|min(?:ute)?s?|(?:mill?i)?sec(?:ond)?s?)$/i);
                  if (!unit || !unit[1])
                     return;
                  unit = unit[1].toLowerCase();

                  var time =
                     {
                        milliseconds:		   1,
                        seconds:		1000,
                        minutes:	   60 * 1000,
                        hours:	      60 * 60 * 1000,
                        days:	 24 * 60 * 60 * 1000,

                        // aliases:
                        ms:	      "milliseconds",
                        miliseconds:  "milliseconds",
                        millisecond:  "milliseconds",
                        milisecond:   "milliseconds",
                        s:                 "seconds",
                        sec:               "seconds",
                        secs:              "seconds",
                        second:            "seconds",
                        m:                 "minutes",
                        min:               "minutes",
                        mins:              "minutes",
                        minute:            "minutes",
                        h:                   "hours",
                        hr:                  "hours",
                        hrs:                 "hours",
                        hour:                "hours",
                        d:                    "days",
                        day:                  "days"
                     };

                  var base = time[unit];
                  if (+base !== base)
                     base = time[base];

                  var date = new Date(date_created);
                  if (date.getTime() && date_created.match(/^\d+-\d+-\d+T\d+\:\d+\:\d+(\.\d+)?$/)) {
                     // ISO8601 timestamps are in server's local time; we need to shift them
                     var zone = (new Date()).getTimezoneOffset() / 60;
                     date.setHours(date.getHours() - zone);
                  }
                  if (isNaN(date.getTime()) && date_created.indexOf("Today at ") == 0) {
                     // If we run after the timeago plugin on the site, then some timestamps will be 
                     // in the format "Today at XX:YY:ZZQM", which is invalid. We need to catch that.
                     date = new Date();
                     var stamp = date_created.substring(("Today at ").length).match(/(\d+)\:(\d+)\:(\d+)\s+([AP])M/i);
                     if (stamp[4] == "P" && stamp[1] != "12")
                        stamp[1] = parseInt(stamp[1], 10) + 12;
                     date.setHours(stamp[1], stamp[2], stamp[3], 0);
                  }
                  var elapsed = $.now() - date.getTime();
                  if (elapsed < number * base) {
                     T.addClass("cobb-thread-masked");
                     return false
                  }
                  //console.log([title,date_created,new Date(),date,elapsed,number,unit]);
               }
            }
         );

         if ($.inArray(title, titles) >= 0)
            T.addClass("cobb-thread-masked");
      }
   );

   Modal.init();

});