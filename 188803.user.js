// ==UserScript==
// @name        Quake Live Alternative Menu (QLHM Edition)
// @version     1.12
// @author      PredatH0r
// @description	Replaces the Quake Live Logo area with a simple quick-navigation menu
// @include     http://*.quakelive.com/*
// @exclude     http://*.quakelive.com/forum*
// ==/UserScript==
/*

Version 1.12
- added option to use "vid_restart fast" (setting r_autoFullscreen += 4)

Version 1.11
- cleaned up code and improved stability

Version 1.10
- added "Start a Match" preset function into navigation bar
- added option to enable/disable embedding of Stream Notifier in UI content section

Version 1.9
- integrates information from Stream Notifier script in the UI content section

Version 1.8
- fixed a timing issue between setting r_fullscreen and calling vid_restart

Version 1.7
- prevent map from loading twice when connecting to a game and switching to fullscreen
- fixed: "vid_restart fast" didn't work to go into fullscreen

Version 1.6
- using "vid_restart fast" to switch to/from fullscreen mode

Verson 1.5
- fixed match browser "Customize" button

Version 1.4
- fixed: options for auto-switching were ignored and mode was always switched
- added options and cvars for auto-execution on game start/exit. This allows to change com_maxFps and other settings.

Version 1.3
- added option dialog
- added option to hide Quake Live logo area (web_hideLogo=1)
- added option for auto-switching to window/fullscreen mode on game start
- added option for auto-switching to window/fullscreen mode on game end

Version 1.2
- added Fullscreen / Windowed menu item
- auto toggling full screen / window mode on entering/exitting a game

Version 1.1
- added QL logo back in due to popular demand
- Quit link is now removed since the "Exit Game" link is now visible again

Version 1.0
- initial release

*/

(function (unsafeWindow) {
  var version = "1.12";
  var window = unsafeWindow;
  var quakelive = window.quakelive;
  var $ = window.jQuery;
  var oldOnCvarChanged;
  var oldLaunchGame;

  function error(e) {
    window.console.log("qlAltMenu.js:ERROR - " + e);
  }


  function init() {
    try {
      var header = $("#qlv_mainLogo");
      var $nav = $("#newnav_top");
      $nav.remove();

      addStyle(
        ".crop { margin: 0 0 0 0; overflow: hidden; }" +
          "img.cropLeft { margin: 0px -450px -21px 0px; }" +
          "img.cropRight { margin: 0px 0px -21px -450px; }" +
          ".menubar { float: left; position: relative; top: -21px; height: 0px }" +
          ".navButton { margin: 0px 0px 0px 0px } " +
          "#quicknav { float:left; width: 600px; height: 21px }" +
          "#quicknav div { display: inline-block; }" +
          "#quicknav ul li { display: inline; }" +
          "#quicknav ul li a { text-decoration: none; font-weight: bold; position: relative; top: -6px; padding: 3px 11px; color:#c00; background-color: #fff }" +
          "#quicknav ul li a.selected { color:#fff; background-color: #c00; border-color:white; border-style: solid; border-width: 1px; top: -6px; padding: 2px 10px; }" +
          ".qkTextOption { position: absolute; left: 110px; width: 410px }" +
          ".postlogin_nav ul { left: 5px; }" +
          ".postlogin_nav ul li { margin-right: 0px; }" +
          ".postlogin_nav div { margin-left: 3px }"
      );

      var $newTop = $(
        "<div id='quicknav'>" +
          "<div class='crop'><img class='cropLeft' src='/images/supernav/nav_buttons_v2013071601.0.png'></div>" +
          "<div>" +
          "<ul>" +
          "<li><a href='#!home' class='sf-with-ul' id='qkPlayOnline'>Play Online</a> </li>" +
          "<li><a href='#!practice/launcher' class='sf-with-ul' id='qkPractice'>Practice</a> </li>" +
          "<li><a href='#!profile/statistics/" + quakelive.username + "' class='sf-with-ul' id='qkStatistics'>Statistics</a> </li>" +
          "<li><a href='#!friends/manage' class='sf-with-ul' id='qkFriends'>Friends</a> </li>" +
          "<li><a href='javascript:void(0)' class='sf-with-ul' id='qkScreen'>Fullscreen</a> </li>" +
          "<li><a href='javascript:void(0)' class='sf-with-ul' id='qkOptions'>Options</a> </li>" +
          "<li id='quickHooka'></li>" +
          "</ul>" +
          "</div>" +
          "<div class='crop'><img class='cropRight' src='/images/supernav/nav_buttons_v2013071601.0.png'></div>" +
          "</div>");

      updateStreamNotifierLayout();

      relocateHooka($newTop);
      $(".startmatch_logo").css({ "top": "-7px", "left": "-120px" });
      $(".mainLogo").css({ "width": "290px", "height": "72px" });
      $("#logo_title").css({ "top": "72px", "left": "200px" }); // "Pro"
      var $menubar = $("<div class='menubar'></div>");
      $menubar.append($newTop).append($nav).append("<div class='cb'></div>");
      header.after($menubar);
      updateHeaderLayout();

      // shrink spacing on bottom
      $(".thirtypxhigh").css("height", "10px");

      $("#qkScreen").click(toggleFullscreen);
      $("#qkOptions").click(showConsole);

      // install hooks
      quakelive.AddHook("OnContentLoaded", OnLayoutLoaded);
      quakelive.AddHook("OnGameModeEnded", OnGameModeEnded);
      oldOnCvarChanged = window.OnCvarChanged;
      window.OnCvarChanged = OnCvarChanged;
      oldLaunchGame = window.LaunchGame;
      window.LaunchGame = LaunchGame;

      updateScreenModeMenu();
    }
    catch (e) { error(e); }
  }

  function addStyle(css) {
    $("head").append("<style>" + css + "</style>");
  }

  function updateStreamNotifierLayout() {
    // embed Live Stream Notifier in content area instead of blank top-row
    try {
      var embed = quakelive.cvars.Get("web_embedStreamNotifier").value == "1";
      var $streams = $("#qlsn_bar");
      if ($streams.length == 0) return;
      var isEmbedded = $streams.parent().prop("tagName") != "BODY";
      if (embed == isEmbedded) return;
      $streams.remove();
      if (embed) {
        if ($("#qlv_contentLeft").length == 0) {
          $streams.css({ "text-align": "left", "background-color": "#404040", "margin-bottom": "3px", "padding-left": "16px" });
          $("#qlv_contentBody").before("<div id='qlv_contentLeft' class='fl'></div>");
          $("#qlv_contentLeft").append($("#qlv_contentBody")); //.offlineGamev2
        }
        $("#qlv_contentLeft").prepend($streams);
      } else {
        $streams.css({ "background-color": "#000", "margin-bottom": "0px" });
        $("body").prepend($streams);
      }
    }
    catch (e) { error(e); }
  }

  function relocateHooka($newTop) {
    try {
      var $hooka = $("#hooka");
      $hooka.css({ "left": "0px", "bottom": "0px", "text-shadow": "none" });
      $newTop.find("#quickHooka").append($hooka);

      var $cust = $("#btn_customize").remove();

      var $nav = $(".postlogin_nav");
      $nav.children("a").remove();
      $nav.children("ul").css({ "position": "relative", "top": "5px", "bottom": "", "height": "35px" });
      var $stripedBarMenu = $("<div class='fl'></div>").append($cust);
      $("#home_chooser").before($stripedBarMenu);

      $("#quicknav").find("a").removeClass("selected");
      var url = window.document.location.href;
      if (url.indexOf("#!home") >= 0 || url.indexOf("#!startamatch") >= 0 || url.indexOf("#!join") >= 0)
        $("#qkPlayOnline").addClass("selected");
      else if (url.indexOf("#!practice") >= 0)
        $("#qkPractice").addClass("selected");
      else if (url.indexOf("#!profile") >= 0)
        $("#qkStatistics").addClass("selected");
      else if (url.indexOf("#!friends") >= 0)
        $("#qkFriends").addClass("selected");
    }
    catch (e) { error(e); }
  }

  function updateHeaderLayout() {
    try {
      var hideLogo = quakelive.cvars.Get("web_hideLogo").value == "1";
      var header = $("#qlv_mainLogo");
      if (hideLogo) {
        header.css("display", "none");
        $(".menubar").css({ "top": "0px", "height": "21px" });
      } else {
        header.css("display", "block");
        $(".menubar").css({ "top": "-21px", "height": "0px" });
      }
    }
    catch (e) { error(e); }
  }

  function toggleFullscreen() {
    try {
      var fs = quakelive.cvars.Get("r_fullscreen", "0").value;
      fs = fs == "0" ? "1" : "0";
      quakelive.cvars.Set("r_fullscreen", fs, true, true);
      qz_instance.SendGameCommand("seta r_fullscreen " + fs + ";vid_restart");
      window.setTimeout(updateScreenModeMenu, 500);
    }
    catch (e) { error(e); }
  }

  function updateScreenModeMenu() {
    try {
      var fs = quakelive.cvars.Get("r_fullscreen", "0").value;
      $("#qkScreen").html(fs == "0" ? "Fullscreen" : "Windowed");
    } catch (e) { error(e); }
  }

  function updateStartAMatchLayout() {
    try {
      var $div = $("<div style='margin-left: 16px'>" +
        "<a href='javascript:void(0)' data-handler='reset'>Reset to Default</a>" +
        " &nbsp;|&nbsp; <a href='javascript:void(0)' data-handler='preset'>Preset Manager</a>" +
        " &nbsp;|&nbsp; <a href='javascript:void(0)' data-handler='import'>Import Settings</a>" +
        " &nbsp;|&nbsp; <a href='javascript:void(0)' data-handler='export'>Export Settings</a>" +
        "</div>");
      $div.children("a").click(function () {
        return quakelive.mod_startamatch.sections['advanced'].controlsClicked.call(this);
      });
      $(".postlogin_nav").append($div);
      $(".cvarcontrols").remove();
    }
    catch (e) { error(e); }
  }

  function showConsole() {
    try {
      var out = [];
      out.push("<div id='qkConsole'>");
      out.push("<fieldset>");

      out.push("<b>UI Tweaks</b>");
      out.push("<ul style='list-style-type: none; margin-top: 15px'>");
      var hideLogo = quakelive.cvars.Get("web_hideLogo").value == "1";
      out.push("<li><input type='checkbox' id='qkHideLogo' value='1' " + (hideLogo ? "checked" : "") + ">");
      out.push(" Hide Quake Live logo area (web_hideLogo=1)</li>");
      var embedStream = quakelive.cvars.Get("web_embedStreamNotifier").value == "1";
      out.push("<li><input type='checkbox' id='qkEmbedStream' value='1' " + (embedStream ? "checked" : "") + ">");
      out.push(" Embed Stream Notifier in content area (web_embedStreamNotifier=1)</li>");
      out.push("</ul>");

      var mode = parseInt(quakelive.cvars.Get("r_autoFullscreen", "0").value);
      out.push("<br><br><b>Fullscreen / Windowed Mode</b>");
      out.push("<ul style='list-style-type: none; margin-top: 15px'>");
      out.push("<li><input type='checkbox' class='qkAutoFullscreen' value='1' " + (mode & 0x01 ? "checked" : "") + ">");
      out.push(" Go fullscreen when joining a game (r_autoFullscreen=+1)</li>");
      out.push("<li><input type='checkbox' class='qkAutoFullscreen' value='2' " + (mode & 0x02 ? "checked" : "") + ">");
      out.push(" Go window mode when leaving a game (r_autoFullscreen=+2)</li>");
      out.push("<li><input type='checkbox' class='qkAutoFullscreen' value='4' " + (mode & 0x04 ? "checked" : "") + ">");
      out.push(" Use 'vid_restart fast' to switch to/from fullscreen (r_autoFullscreen=+4)</li>");
      out.push("</ul>");

      var gameStart = quakelive.cvars.Get("onGameStart", "").value;
      var gameEnd = quakelive.cvars.Get("onGameEnd", "").value;
      out.push("<br><br><b>Commands executed when entering/leaving a game</b>");
      out.push("<br>(e.g. com_maxfps 125;r_gamma 1)");
      out.push("<ul style='list-style-type: none; margin-top: 15px'>");
      out.push("<li style='height:22px'>onGameStart: <input type='text' class='qkTextOption' name='onGameStart' value='" + gameStart + "'>");
      out.push("<li style='height:22px^'>onGameEnd: <input type='text' class='qkTextOption' name='onGameEnd' value='" + gameEnd + "'>");
      out.push("</ul>");
      out.push("</fieldset>");
      out.push("</div>");

      // Inject the console
      qlPrompt({
        id: "qkPrompt",
        title: "Quake Live Alternative Menu" + " <small>(v" + version + ")</small>",
        customWidth: 550,
        ok: handleConsoleOk,
        okLabel: "Ok",
        cancel: handleConsoleClose,
        cancelLabel: "Cancel",
        body: out.join("")
      });

      // Wait for the prompt to get inserted then do stuff...
      window.setTimeout(function () {
        $("#modal-cancel").focus();
      });
    }
    catch (e) {
      error(e);
      handleConsoleClose();
    }
  }

  function handleConsoleOk() {
    var val = 0;
    $("#qkConsole").find(".qkAutoFullscreen:checked").each(function (idx, item) {
      val += parseInt(item.value);
    });
    quakelive.cvars.Set("r_autoFullscreen", "" + val, true, false);
    quakelive.cvars.Set("web_hideLogo", $("#qkHideLogo").prop("checked") ? "1" : "0");
    quakelive.cvars.Set("web_embedStreamNotifier", $("#qkEmbedStream").prop("checked") ? "1" : "0");

    $("#qkConsole").find(".qkTextOption").each(function (idx, item) {
      quakelive.cvars.Set(item.name, '"' + item.value + '"', true, false);
    });

    // cvar changes take some time to apply
    window.setTimeout(function () {
      updateStreamNotifierLayout();
      updateHeaderLayout();
    }, 200);

    handleConsoleClose();
  }

  function handleConsoleClose() {
    $("#qkPrompt").jqmHide();
  }

  function OnLayoutLoaded() {
    try {
      relocateHooka($("#quicknav"));
      if (quakelive.activeModule.TITLE == "Start a Match")
        updateStartAMatchLayout();
    } catch (e) { error(e); }
  }

  function OnCvarChanged(name, val, replicate) {
    try {
      var lower = name.toLowerCase();
      if (lower == "r_fullscreen")
        updateScreenModeMenu();
      else if (lower == "web_hidelogo")
        updateHeaderLayout();
      else if (lower == "web_embedstreamnotifier")
        updateStreamNotifierLayout();

      oldOnCvarChanged.call(null, name, val, replicate);
    }
    catch (e) { error(e); }
  }

  function LaunchGame(launchParams, serverInfo) {
    try {
      var auto = quakelive.cvars.Get("r_autoFullscreen").value;
      if (auto != "" && (parseInt(auto) & 0x01) && quakelive.cvars.Get("r_fullscreen").value != "1") {
        // use both JS and QZ to avoid timing issues and make sure the value sticks
        quakelive.cvars.Set("r_fullscreen", "1", false, false);
        var fast = (parseInt(auto) & 0x04) ? " fast" : "";
        qz_instance.SendGameCommand("seta r_fullscreen 1;vid_restart" + fast);
      }
      qz_instance.SendGameCommand("vstr onGameStart");
    }
    catch (e) { error(e); }
    oldLaunchGame.call(null, launchParams, serverInfo);
  }

  function OnGameModeEnded() {
    try {
      var auto = quakelive.cvars.Get("r_autoFullscreen").value;
      if (auto != "" && (parseInt(auto) & 0x02) && quakelive.cvars.Get("r_fullscreen").value != "0") {
        // use both JS and QZ to avoid timing issues and make sure the value sticks
        quakelive.cvars.Set("r_fullscreen", "0", false, false);
        var fast = (parseInt(auto) & 0x04) ? " fast" : "";
        qz_instance.SendGameCommand("seta r_fullscreen 0;vid_restart" + fast);
      }
      qz_instance.SendGameCommand("vstr onGameEnd");
    } catch (e) { error(e); }
  }

  quakelive.AddOnceHook("OnContentLoaded", init);

})(window);