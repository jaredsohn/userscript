// ==UserScript==
// @name           MoTK_Annoyances
// @namespace      http://forums.penny-arcade.com/member.php?u=8153
// @description    A little script to fix some things that irk me at Shrinemaiden.org
// @include        http://www.shrinemaiden.org/*
// @require        http://dl.dropbox.com/u/1565165/jquery.js
// ==/UserScript==

DEBUG = false;

var href = window.location.href;
prefs = null;

if (GM_getValue("preferences")) {
  prefs = JSON.parse(GM_getValue("preferences"));

} else {
  prefs = new Object();
  prefs.watched = new Object();
  prefs.user_renames = new Object();
  prefs.dark_cpmc = false;
  GM_setValue("preferences", JSON.stringify(prefs));
}
function savePrefs() {
  GM_setValue("preferences", JSON.stringify(prefs));
}
function rmDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}

function profileRename() {
  
  userid = /u=(\d+)/.exec(href)[1]

  dt = "<dt>Override username? <input type='checkbox' name='override' value='yes'></dt>";
  dd = "<dd><input type='text' name='username' size=25><input type='button' name='save' value='save'></dd>";
  $(dt + dd).insertBefore($("dt:contains(Username: )"));

  save_button = $("input[type=button][name=save]")
  textbox = $("input[type=text][name=username]");
  checkbox = $("input[type=checkbox][name=override]")

  if (userid in prefs.user_renames) {
    checkbox.attr("checked", "true");
    textbox.val(prefs.user_renames[userid]);
  }

  checkbox.change(function () {
    checked = $(this).attr("checked");
      if (checked) {
        name = $("div.username > h4").text();
        position = $("div.username span.position").text();
        name = name.replace(position, "").trim();

        textbox = $("input[type=text][name=username]");
        textbox.val(name);
    } else {
      textbox.val("");
    }
  });

  save_button.click(function () {
    if (checkbox.attr("checked")) {
      prefs.user_renames[userid] = textbox.val();
    } else {
      delete prefs.user_renames[userid];
    }
    GM_setValue("preferences", JSON.stringify(prefs));
  });
}

function renameUsers() {
  uids = new Object();
  uids_re = /u=(\d+)/;
  $("a[title^=View the profile of]").each(function () {
    uid = uids_re.exec($(this).attr("href"));
    uids[uid[1]] = "";
  });

  for (uid in uids) {
    if (uid in prefs.user_renames) {
      name_links = $("a[href$=u\\=" + uid +"]").filter("a[title^=View the profile of]");
      old_name = name_links.filter(":first").text();

      if ( !old_name ) { continue; }

      name_links.each(function () {
        $(this).text(prefs.user_renames[uid]);
      });
      quotes = $("a[text^=Quote from: " + old_name + "]");
      quotes.each(function () {
        $(this).text($(this).text().replace(old_name, prefs.user_renames[uid]));
      });
      console.log("User " + old_name + " renamed to " + prefs.user_renames[uid]);
    }
  }
}

function watchThreads() {
  
  stickies = prefs.stickies
  watched = prefs.watched
  
  if (/board,/.exec(href)) {
    if (!prefs.dark_cpmc) {
      locked_stickies = $("tr:has(td.locked_sticky2)");
      locked_stickies.each(function (j) {
        $("td.locked_sticky2", $(this)).each(function (k) {
          td = $(this);
          td.removeClass("locked_sticky2");
          td.addClass("stickybg2");
        });
      });
    }

    for (i in watched) {
      lastSticky = $("td.stickybg:last").parents("tr");
      post = $("a[href$=\\/topic," + i + "\\.0\\.html]:not(.navPages)").parents("tr:first");
      if (post.length == 0) {continue; }
      $("td", post).each(function (j) {
        t = $(this);
        if (prefs.dark_cpmc) {
        t.attr("class", t.attr("class").replace(/windowbg[^ ]*?$/, "stickybg"));
        }
        else {
          t.attr("class", t.attr("class").replace(/windowbg[^ ]*?$/, "stickybg"));
          if (t.hasClass("subject") || t.hasClass("lastpost")) {
            t.removeClass("stickybg");
            t.addClass("stickybg2");
          }
          
        }
      });

      name = $("a:first", post);
      $("<span><b>Watched:</b> </span>").insertBefore(name);
      
      if ((lastSticky.length == 0) && (href.search(/.*?board,[0-9]*?\.[1-9][0-9]*?\.html$/) == 0)) {
        userlist = $("tr[class*=whos_viewing]");
        post.insertAfter(userlist);
      }
      else {
        post.insertAfter(lastSticky);
      }
    }
  }

  if ((/topic,/.exec(href)) && !(/action=post/.exec(href))) {
    watch_div = $("<span id='watch'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Watch? <input type='checkbox' name='watched' value='yes'></span>");
    watch_div.appendTo($("h3.catbg:first"));
    checkbox = $("input[type=checkbox][name=watched]");

    thread_name = $("div.navigate_section li.last span").filter(":first").text();
    thread_id = /.*?topic,(\d+)/.exec(href)[1];

    if (thread_id in watched) {
      checkbox.attr("checked", true);
    }

    checkbox.change(function () {
      if (checkbox.attr("checked")) {
        watched[thread_id] = thread_name;
        savePrefs();
      } else {
        delete watched[thread_id];
        savePrefs();
      }
    });
  }

}

$(document).bind("DOMContentLoaded", function() {
  if (prefs.dark_cpmc) {
    if ($("link[href*=x-mas_20rc3\\/css]").length != 0) {
      username = $("#userarea > strong").text();
      $("#top-banner").remove();
      $("#topmenu").remove();
      $("#toolbar").append($('<h1 id="forumtitle"><a href="http://www.shrinemaiden.org/forum/index.php"><img src="http://www.shrinemaiden.org/images/shrinemaidenlogo3.png" alt="Maidens of the Kaleidoscope" /></a></h1><div id="user"><form id="search_form" style="margin: 0;" action="http://www.shrinemaiden.org/forum/index.php?action=search2" method="post" accept-charset="ISO-8859-1"><input type="text" name="search" value="" class="input_text" />&nbsp;<input type="submit" name="submit" value="Search" class="button_submit" /><input type="hidden" name="advanced" value="0" /><input type="hidden" name="brd[6]" value="6" /></form><ul><li class="first"><a href="http://www.shrinemaiden.org/forum/index.php?action=profile">Hello <b>' + username + '</b></a></li><li><a href="http://www.shrinemaiden.org/forum/index.php?action=unread">Unread</a></li><li><a href="http://www.shrinemaiden.org/forum/index.php?action=unreadreplies">Replies</a></li></ul></div><div id="menu_container"><ul id="nav"><li id="button_home"><a class="active firstlevel" href="http://www.shrinemaiden.org/forum/index.php"><span class="last firstlevel">Home</span></a></li><li id="button_help"><a class="firstlevel" href="http://www.shrinemaiden.org/forum/index.php?action=help"><span class="firstlevel">Help</span></a></li><li id="button_search"><a class="firstlevel" href="http://www.shrinemaiden.org/forum/index.php?action=search"><span class="firstlevel">Search</span></a></li><li id="button_profile"><a class="firstlevel" href="http://www.shrinemaiden.org/forum/index.php?action=profile"><span class="firstlevel">Profile</span></a><ul><li><a href="http://www.shrinemaiden.org/forum/index.php?action=profile"><span>Summary</span></a></li><li><a href="http://www.shrinemaiden.org/forum/index.php?action=profile;area=account"><span>Account Settings</span></a></li><li><a href="http://www.shrinemaiden.org/forum/index.php?action=profile;area=forumprofile"><span class="last">Forum Profile</span></a></li></ul></li><li id="button_pm"><a class="firstlevel" href="http://www.shrinemaiden.org/forum/index.php?action=pm"><span class="firstlevel">My Messages</span></a><ul><li><a href="http://www.shrinemaiden.org/forum/index.php?action=pm"><span>Read your messages</span></a></li><li><a href="http://www.shrinemaiden.org/forum/index.php?action=pm;sa=send"><span class="last">Send a message</span></a></li></ul></li><li id="button_calendar"><a class="firstlevel" href="http://www.shrinemaiden.org/forum/index.php?action=calendar"><span class="firstlevel">Calendar</span></a></li><li id="button_mlist"><a class="firstlevel" href="http://www.shrinemaiden.org/forum/index.php?action=mlist"><span class="firstlevel">Members</span></a><ul><li><a href="http://www.shrinemaiden.org/forum/index.php?action=mlist"><span>View the memberlist</span></a></li><li><a href="http://www.shrinemaiden.org/forum/index.php?action=mlist;sa=search"><span class="last">Search For Members</span></a></li></ul></li><li id="button_logout"><a class="firstlevel" href="http://www.shrinemaiden.org/forum/index.php?action=logout;dce64c0=fa9dc772e1f20dbb4ccf63ca72115ff2"><span class="last firstlevel">Logout</span></a></li></ul></div><br style="clear: both;" />'));

      $("link[href*=x-mas_20rc3\\/css]").attr({href : "http://www.shrinemaiden.org/forum/Themes/ModernDark64_2rc3/css/index.css?rc2"});
      $('<link rel="stylesheet" href="http://www.shrinemaiden.org/forum/Themes/ModernDark64_2rc3/css/MenuMatic.css?fin11" type="text/css" media="screen" charset="utf-8" />').insertAfter($("link[href*=ModernDark64_2rc3\\/css]"));
      $("script[src*=x-mas_20rc3\\/scripts]").attr({src : "http://www.shrinemaiden.org/forum/Themes/ModernDark64_2rc3/scripts/theme.js?rc3"});
      $("script:contains('CDATA'):first").attr({text : '<!-- // --><![CDATA[\
            var smf_theme_url = "http://www.shrinemaiden.org/forum/Themes/ModernDark64_2rc3";\
            var smf_default_theme_url = "http://www.shrinemaiden.org/forum/Themes/default";\
            var smf_images_url = "http://www.shrinemaiden.org/forum/Themes/ModernDark64_2rc3/images";\
            var smf_scripturl = "http://www.shrinemaiden.org/forum/index.php";\
            var smf_iso_case_folding = false;\
            var smf_charset = "ISO-8859-1";\
            var ajax_notification_text = "Loading...";\
            var ajax_notification_cancel_text = "Cancel";\
        // ]]>'});
      $('<script src="http://www.shrinemaiden.org/forum/Themes/ModernDark64_2rc3/js/mootools.1.2.js" type="text/javascript" charset="utf-8"></script>').insertAfter($("script:contains('CDATA'):first"))
      $("img[src*=x-mas_20rc3\\/images]").each(function () {
        t = $(this);
        t.attr("src", t.attr("src").replace(/x-mas_20rc3/, "ModernDark64_2rc3"));
      });
    }
  }

  if (/action=profile/.exec(href)) {
    profileRename();
  }
  //text area for settings
  $("<div id='motk_annoyances'><textarea id='watchedthreads'></textarea></div>").appendTo($("body"));
  $("#motk_annoyances").css({"display": "none", "z-index": "1000",
  "position": "absolute", "top": "0px", "left": "0px"});
  $("#watchedthreads").css({"height": "400px", "width": "600px", "wrap": "off"});

  renameUsers();
  watchThreads();

});

$(document).bind("keypress", function(e) {
    thread_re = /.*?topic=(\d+)/;
    //e.which, e.altKey, e.ctrlKey

    div = $("#motk_annoyances");
    textarea = $("#watchedthreads");
    if (DEBUG && console.log) {
        console.log("Key: " + e.which);
        console.log("Alt? " + e.altKey);
        console.log("Ctrl? " + e.ctrlKey);
    }
    if ((e.which == 111) && (e.altKey == true)) {
      if (DEBUG && console.log) {console.log("Alt + o"); }
      div.css("display", "");
      threads = new Array();
      for (i in prefs.watched)
        threads.push("http://www.shrinemaiden.org/forum/index.php?topic=" + i + ".0 => " + prefs.watched[i]);
      textarea.val(threads.join("\n"));
    }

    if ((e.which == 99) && (e.altKey == true)) {
      div.css("display", "none");
      lines = textarea.val().split("\n");
      threads = new Array();
      for (i = 0; i < lines.length; i++) {
        res = thread_re.exec(lines[i]);
        if (res) { threads.push(res[1]); }
      }
      for (i = 0; i < threads.length; i++) {
        if ( !(threads[i] in prefs.watched)) {
          prefs.watched[threads[i]] = "";
        }
      }
      GM_setValue("preferences", JSON.stringify(prefs));
      prefs = JSON.parse(GM_getValue("preferences"));
    }
    if ((e.which == 120) && (e.altKey == true)) {
      if (DEBUG && console.log) { console.log("Alt + x"); }
      prefs.dark_cpmc = ~ prefs.dark_cpmc;
      savePrefs();
    }
});
