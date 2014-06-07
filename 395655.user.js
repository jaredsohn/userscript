// ==UserScript==
// @name           Quake Live ToolTip Fix (QLHM)
// @description    Shows a ToolTip popup when hovering the mouse over a UI element with additional information. E.g. QLranks Elo information, weapon accuracy, ...
// @author         PredatH0r
// @version        1.3
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==

/*

Description:
  If you hover your mouse over UI elements which have additional information, that info
  will be shown in a ToolTip popup.

  This standard web browser feature is somehow broken in the QuakeLive standalone client. 
  This script takes care of displaying this information text.
  
  e.g. Server modification, QLranks Elo information, weapon accuracy, ...

Version 1.3:
  - Fixed ToolTip position when window is scrolled
  - ToolTip now activated, when QL is started fullscreen
  - ToolTip is now showing on top of other elements (like player list popup)

Version 1.2.1:
  Fixed issue with empty ToolTip text

Version 1.2:
  This alternative ToolTip is activated only after game-mode was entered, which is what breaks the QL built-in
  tool tips. The alternative ToolTip can manually be enabled/disabled with cvar web_tooltip.
 
Version 1.1:
  Rewritten based on tips from 'wn'.

Version 1.0:
  First release

*/

(function () { // scope
  var $tooltip;
  var enabled = false;
  var oldOnCvarChanged;

  function init() {
    $("head").append(
      '<style>' + "\n" +
      ' #ttip { display:none; position:absolute; z-index:32000; background-color:#ccc; color:black; padding:5px; border-color:black; border-style:solid; border-width:1px; } ' + "\n" +
      '</style>');

    $("body").append('<div id="ttip"></div>');
    $tooltip = $("#ttip");

    // activate the ToolTip when it was loaded through the QLHM UI or we are in fullscreen mode
    if ($("#qlhmPrompt").length > 0 || quakelive.cvars.Get("r_fullscreen").value == "1")
      enable();
    else
      disable();

    // install hook to react on changed cvar "web_tooltip"
    oldOnCvarChanged = window.OnCvarChanged;
    window.OnCvarChanged = OnCvarChanged;
    
    // The standard QL tool-tip implementation breaks when game mode is started.
    // So when game mode is started, activate the alternative tool tip
    quakelive.AddHook("OnGameModeStarted", enable);
  }

  function OnCvarChanged(name, val, replicate) {
    try {
      var lower = name.toLowerCase();
      if (lower == "web_tooltip") {
        if (val == "0")
          disable();
        else
          enable();
      }
    }
    catch (e) { }
    oldOnCvarChanged.call(null, name, val, replicate);
  }

  function enable() {
    quakelive.cvars.Set("web_tooltip", 1);
    if (!enabled) {
      enabled = true;
      $("body").on("hover", "[title]", onHover);
    }
  }

  function disable() {
    quakelive.cvars.Set("web_tooltip", 0);
    if (enabled) {
      enabled = false;
      $("body").off("hover", "[title]", onHover);
      hideTip();
    }
  }

  function onHover(e) {
    if ("mouseenter" === e.type)
      showTip(e.pageX, e.pageY, this.title);
    else
      hideTip();
  }

  function showTip(x, y, text) {
    $tooltip.empty();
    $tooltip.append(text);
    if (text && text.trim() != "")
      $tooltip.css({ "left": x + 16, "top": y + 16, "display": "block" });
  }

  function hideTip() {
    $tooltip.css("display", "none");
  }

  init();
})(window);
