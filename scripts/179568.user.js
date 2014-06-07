// ==UserScript==
// @name         Drawception ANBT
// @author       Grom PE
// @namespace    http://grompe.org.ru/
// @version      0.44.2014.5
// @description  Enhancement script for Drawception.com - Artists Need Better Tools
// @downloadURL  https://raw.github.com/grompe/Drawception-ANBT/master/drawception-anbt.user.js
// @match        http://drawception.com/*
// @match        https://drawception.com/*
// @grant        none
// @run-at       document-start
// @license      Public domain
// ==/UserScript==

function wrapped() {

var SCRIPT_VERSION = "0.44.2014.5";

// == DEFAULT OPTIONS ==

var options =
{
  asyncSkip: 0, // Whether to try loading next game pages asynchronously when skipped
  enableWacom: 0, // Whether to enable Wacom plugin and thus pressure sensitivity support
  fixTabletPluginGoingAWOL: 1, // Fix pressure sensitivity disappearing in case of stupid/old Wacom plugin
  hideCross: 0, // Whether to hide the cross when drawing
  enterToCaption: 1, // Whether to submit caption by pressing Enter
  pressureExponent: 0.5, // Smaller = softer tablet response, bigger = sharper
  brushSizes: [2, 5, 12, 35], // Brush sizes for choosing via keyboard
  loadChat: 1, // Whether to load the chat
  chatAutoConnect: 0, // Whether to automatically connect to the chat
  removeFlagging: 1, // Whether to remove flagging buttons
  ownPanelLikesSecret: 0,
  backup: 1,
}

/*
== HOW TO USE ==
- Chrome/Iron: (Recommended: all features, best performance)
  - add the script in Tampermonkey addon 
  - or open URL: chrome://extensions then drag and drop this .user.js file on it
- Firefox: add the script in Greasemonkey addon
- Opera 12.x: add the script in "site properties"

== FEATURES ==
General
- Menu buttons in the header for easier access
- Fix keyboard scrolling after pages load
- Fix notifications showing in Opera and Firefox < 5
- No temptation to judge
- An embedded chat
Canvas:
- Wacom tablet eraser and smooth pressure support; doesn't conflict with mouse
- Secondary color, used with right mouse button; palette right-clicking
- Alt+click picks a color from the canvas
- Brush cursor
- Current colors indicator
- X swaps primary and secondary colors
- E selects eraser
- [ ] and - = changes brush sizes
- Shift+F fills with the current color
- Confirm closing a page if it has a canvas and is painted on
- Don't confirm clearing, but allow to undo it
Sandbox
- Re-add background button
- Add drawing time indicator
- Add palettes
- Upload directly to imgur
View game
- Add reverse panels button
- Add "like all" button
- Track new comments
- Show when the game was started
- Ability to favorite panels
Play
- Much faster skipping
- Play modes for those who only caption or only draw
- Enter pressed in caption mode submits the caption
- Ability to bookmark games without participating
Forum
- Better-looking timestamps with correct timezone
- Clickable drawing panels
- Clickable links
- Show and highlight direct links to forum posts

== TODO ==
- fix scrollbar appearing when brush crosses lower page boundary (rare)
- fix friend games timer (and show likes)
- smoother tablet pressure change; react to pressure change even on same position
- optimize performance
- add stroke smoothening
- add simple layers(?)

== CHANGELOG ==
0.44.2014.5
- Numpad +/- also changes brush size
0.43.2014.3
- If Ctrl is pressed, ignore brush color and size shortcuts 
0.42.2014.3
- Delete saved drawing if playing another game
0.41.2014.3
- Adjust forum timezone
0.40.2014.2
- Fix upload to imgur
- Small backup/undo fix
0.39.2014.2
- Confirm deleting the cover image
0.38.2014.2
- Save drawings from page reload and place timed out ones in sandbox
0.37.2014.2
- Fix undo/redo buttons after fast skip
- Fix default color with custom palette game
0.36.2014.2
- Small fix for old broken image links in the forum
- Fix scroll position not being kept
- Show direct links to forum posts
0.35.2014.2
- An option to disable submitting captions with Enter
0.34.2014.2
- Support for https URL
0.33.2014.2
- Experimental: fast async skip while playing (enabled on settings page)
0.32.2014.2
- Included update/download URLs in script metadata
0.31.2014.2
- Stop confirming leaving the page if submitted a contest drawing
- Fix making small and slow strokes with tablet even without pressure sensitivity
0.30.2014.2
- Small fixes
0.29.2014.01
- Corrected colors of 7 sandbox palettes to be exact
- Added direct links for installing Wacom plugin in settings page
- Fixed minor sandbox undo bug that covered background color
0.28.2014.01
- Re-added like all button that was gone because of style change
0.27.2014.01
- Removed undo/redo improvements (implemented on site)
0.26.2014.01
- Added "the blues" palette to sandbox
0.25.2014.01
- Prevented some usernames from breaking panel layout in contest results
- Style change fixes
0.24.2014.01
- Fixed incorrect year display on the forum mainpage
0.23.2013.12
- Added a random daily greeting on your userpage
- Added ability to bookmark games from play without participating
- Added ability to favorite panels from panel and game pages
- Small fix for "Upload to imgur" button icon
0.22.2013.12
- Small correction of game start date displayed (month with leading zero)
- An option to make likes for your own panels secret ingame
- Show forum times according to user timezone
- Make text links in the forum clickable
- Make drawing panels in the forum clickable
0.21.2013.12
- In a finished game, show when it was started
- Show an error if notifications cannot be loaded
- Show script and site versions in the top right corner
- Made script settings configurable on the settings page
0.20.2013.12
- Easy configuration to switch off tablet support
0.19.2013.12
- Don't hide the cross cursor by default
- Clearing the canvas is now instant but undoable, also resets the timer in sandbox
- Small chat fixes
0.18.2013.12
- Cache the chat script for faster loading
0.17.2013.12
- Experimental: added an embedded chat
- Stop confirming leaving the page if submitted a drawing
0.16.2013.12
- Inlined dark style as userstyles.org is unreliable and removed a feature
- Fixed comment tracking
0.15.2013.12
- Prevent loading multiple times
0.14.2013.12
- Minor fixes
- Added dark style
- Script now loads at the beginning (Opera 12 users should edit ".user." part out of the script file name!)
- Added tracking new comments in games
0.13.2013.11
- Fixed broken link to Leaderboards in quick menu
- More colorful quick menu
- Fixed canvas broken with the site script change 
0.12.2013.11
- Minor fixes
- Can now be installed in Chrome Extensions without Tampermonkey
- Faster undo function
- Redo function (Ctrl+Y)
0.11.2013.11.08
- Removed the temptation to judge
0.10.2013.11.05
- Added ability to upload directly to imgur from sandbox
- Fixed background sometimes appearing as foreground in sandbox
- Verified code in JSHint
- Added reverse panels in viewgame
- Fixed some events broken in previous script version for Chrome/Firefox
0.9.2013.11.03
- Fixed options button not working after hiding the popover and displaying again
- Enter pressed in caption mode submits the caption
- Added palettes in sandbox
- Changed eraser display in color indicator
0.8.2013.11.02
- Fixed brush size changing in the middle of a stroke with eraser
- Inconspicuous like all panels function
- Adjusted the color indicators size to keep with the style change
- Added drawing time indicator in sandbox
- Added background button in sandbox
0.7.2013.10.28
- Restored notifications functionality and keyboard scrolling for Firefox 4 and older
0.7.2013.10.26
- Adjusted the header to keep with the style change
- Added keyboard shortcuts:
  - = and [ ] for changing brush sizes,
  E for eraser, 0..9 and Shift+0..Shift+9 for colors
  Shift+F to fill with current color
0.6.2013.10.23
- New notifications are now discernable from the old ones
- Restored notifications functionality and keyboard scrolling for Opera browser
0.5.2013.10.21
- Added menu buttons to the header for easier access for higher resolutions
0.4.2013.10.16
- Added caption-only and drawing-only play modes
0.3.2013.10.11
- Removed zoom because the new style is zoomed enough
- Adjusted colors indicator to keep with the style change
- Fixed color picking and eraser broken with the style change
0.2.2013.10.09
- First public version

*/

var __DEBUG__, prestoOpera, firefox4OrOlder, username, userid;
var usingTablet, bgoptions, fileInput, sandboxDrawingStart;

var playMode = localStorage.getItem("gpe_playMode");
playMode = (playMode === null) ? 0 : parseInt(playMode, 10);
var inDark = localStorage.getItem("gpe_inDark");
inDark = (inDark === null) ? 0 : parseInt(inDark, 10);
var seenComments = localStorage.getItem("gpe_seenComments");
seenComments = (seenComments === null) ? {} : JSON.parse(seenComments);

var MODE_ALL = 0;
var MODE_CAPTION_ONLY = 1;
var MODE_DRAW_ONLY = 2;
var availablePlayModes = ["Mode: captions and drawings", "Mode: only make captions", "Mode: only draw"];
var palettes =
[
  {
    name: "Normal",
    class: "label-normalpal",
    colors:
    [
      '#000000', '#444444', '#999999', '#ffffff',
      '#603913', '#c69c6d', '#FFDAB9', '#FF0000',
      '#FFD700', '#FF6600', '#16ff00', '#0fad00',
      '#00FFFF', '#0247fe', '#ec008c', '#8601af',
      '#fffdc9',
    ],
  },
  {
    name: "Sepia",
    class: "label-sepia",
    colors:
    [
      '#402305', '#503315', '#604325', '#705335',
      '#806345', '#907355', '#a08365', '#b09375',
      '#bfa284', '#cfb294', '#dfc2a4', '#ffe2c4',
    ],
  },
  {
    name: "Grayscale",
    class: "label-darkgray",
    colors:
    [
      '#000000', '#111111', '#222222', '#333333',
      '#444444', '#555555', '#666666', '#777777',
      '#888888', '#999999', '#c0c0c0', '#ffffff',
      '#eeeeee'
    ],
  },
  {
    name: "B&W",
    longname: "Black and white",
    class: "label-inverse",
    colors:
    [
      '#ffffff', '#000000',
    ],
  },
  {
    name: "CGA",
    class: "label-cga",
    colors:
    [
      '#555555', '#000000', '#0000AA', '#5555FF',
      '#00AA00', '#55FF55', '#00AAAA', '#55FFFF',
      '#AA0000', '#FF5555', '#AA00AA', '#FF55FF',
      '#AA5500', '#FFFF55', '#AAAAAA', '#FFFFFF',
    ],
    background: '#FFFF55',
  },
  {
    name: "Gameboy",
    class: "label-theme_gameboy",
    colors:
    [
      '#8bac0f', '#9bbc0f', '#306230', '#0f380f',
    ],
  },
  {
    name: "Neon",
    class: "label-neon",
    colors:
    [
      '#ffffff', '#000000', '#adfd09', '#feac09',
      '#fe0bab', '#ad0bfb', '#00abff',
    ],
  },
  {
    name: "Thxgiving",
    longname: "Thanksgiving",
    class: "label-theme_thanksgiving",
    colors:
    [
      '#673718', '#3c2d27', '#c23322', '#850005',
      '#c67200', '#77785b', '#5e6524', '#cfb178',
      '#f5e9ce',
    ],
  },
  {
    name: "Holiday",
    class: "label-theme_holiday",
    colors:
    [
      '#3d9949', '#7bbd82', '#7d1a0c', '#bf2a23',
      '#fdd017', '#00b7f1', '#bababa', '#ffffff',
    ],
  },
  {
    name: "Valentine",
    longname: "Valentine's",
    class: "label-theme_valentines",
    colors:
    [
      '#8b2158', '#a81f61', '#bb1364', '#ce0e62',
      '#e40f64', '#ff0000', '#f5afc8', '#ffccdf',
      '#e7e7e7', '#ffffff',
    ],
  },
  {
    name: "Halloween",
    class: "label-warning",
    colors:
    [
      '#444444', '#000000', '#999999', '#FFFFFF',
      '#603913', '#c69c6d', '#7A0E0E', '#B40528',
      '#FD2119', '#FA5B11', '#FAA611', '#FFD700',
      '#602749', '#724B97', '#BEF202', '#519548',
      '#B2BB1E',
    ],
    background: '#444444',
  },
  {
    name: "the blues",
    class: "label-theme_blues",
    colors:
    [
      '#b6cbe4', '#618abc', '#d0d5ce', '#82a2a1',
      '#92b8c1', '#607884', '#c19292', '#8c2c2c',
      '#295c6f',
    ],
  },
  {
    name: "???",
    class: "label-normalpal",
    colors:
    [
      '#000000', '#ffffff', '#ff0000', '#00ff00',
      '#0000ff', 'rgba(0,0,0,0.3)', 'rgba(255,255,255,0.3)', 'rgba(255,0,0,0.3)',
      'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'
    ],
  },
];

if (typeof GM_addStyle == 'undefined')
{
  var GM_addStyle = function(css)
  {
    var parent = document.getElementsByTagName("head")[0];
    if (!parent) parent = document.documentElement;
    var style = document.createElement("style");
    style.type = "text/css";
    var textNode = document.createTextNode(css);
    style.appendChild(textNode);
    parent.appendChild(style);
  };
}

function enhanceCanvas(insandbox)
{
  var canvas = document.getElementById("drawingCanvas");
  if (!canvas) return;

  var drawCursor = document.getElementById("drawCursor");

  $(document.body).append('<object id="wtPlugin" type="application/x-wacomtabletplugin" width="1" height="1"></object>');
  var wtPlugin = document.getElementById("wtPlugin");
  var penAPI, strokeSize, dynSize, pressureUpdater, backupTimer;

  GM_addStyle(
    "#primaryColor, #secondaryColor {width: 49px; height: 20px; float: left; border: 1px solid #AAA}" +
    ".label-normalpal {background: #888}" +
    ".selectable {-webkit-user-select: text; -moz-user-select: text; user-select: text}"
  );
  if (!prestoOpera)
  {
    GM_addStyle(
      (options.hideCross ? "#drawingCanvas.active {cursor: none !important}" : "") +
      "#drawCursor {display: block; z-index: 10; border: 1px solid #FFFFFF }"
    );
  }

  function updateCursorColor(hexcolor)
  {
    drawCursor.style.background = hexcolor;
    drawCursor.style.borderColor = invertColor(hexcolor);
  }

  var oldX, oldY, oldTabletX = 0, oldTabletY = 0, oldTabletPressure = 0, tabletActive = false;
  usingTablet = function()
  {
    if (!options.enableWacom) return false;
    if (!tabletActive) return false;
    var result = false;
    try
    {
      result = wtPlugin.penAPI;
    } catch(e) {}
    return result;
  };

  // Chrome: seems to be the slowest function
  function updateTabletPos(moved)
  {
    if (!options.enableWacom) return false;
    var result = false;
    try
    {
      result = wtPlugin.penAPI;
    } catch(e) {}
    if (result)
    {
      var tabletMoved = (result.sysX !== oldTabletX) || (result.sysY !== oldTabletY) || (result.pressure !== oldTabletPressure);
      if (tabletMoved) tabletActive = true;
      else if (moved) tabletActive = false;
      oldTabletX = result.sysX;
      oldTabletY = result.sysY;
      oldTabletPressure = result.pressure;
    }
  }

  function isEraser()
  {
    var result = false;
    try
    {
      result = wtPlugin.penAPI.isEraser;
    } catch(e) {}
    return result;
  }

  function getPressure()
  {
    var result = 1;
    try
    {
      result = wtPlugin.penAPI.pressure;
    } catch(e) {}
    return result;
  }

  function updatePressure()
  {
    var goal = strokeSize * Math.pow(getPressure(), options.pressureExponent);
    dynSize = (dynSize + goal) / 2;
  }

  function updateDrawCursor()
  {
    var s = drawApp.context.lineWidth;
    drawCursor.style.width = s + "px";
    drawCursor.style.height = s + "px";
    drawCursor.style.marginLeft = "-" + (s / 2) + "px";
    drawCursor.style.marginTop = "-" + (s / 2) + "px";
  }

  function nextSize(d)
  {
    var idx = 0, m = options.brushSizes.length - 1;
    for (var i = m; i > 0; i--)
    {
      if (strokeSize >= options.brushSizes[i])
      {
        idx = i;
        break;
      }
    }
    strokeSize = options.brushSizes[Math.min(Math.max(idx + d, 0), m)];
    drawApp.context.lineWidth = strokeSize;
    cursorOffset = strokeSize / 2;
    updateDrawCursor();
  }

  function saveBackup()
  {
    if (!options.backup) return;
    var o = {game: null, image: drawApp.toDataURL(), timeleft: timeleft};
    var which_game = $('input[name=which_game]');
    if (which_game.length) o.game = which_game.val();
    localStorage.setItem("anbt_drawingbackup", JSON.stringify(o));
  }

  // Make right-click draw secondary color and alt+click pick colors
  var waitForDrawApp = setInterval(function()
    {
      if (typeof drawApp == "undefined") return;
      clearInterval(waitForDrawApp);

      // Clear leaving page warning on submitting the drawing
      var old_savePanelDrawing = savePanelDrawing;
      savePanelDrawing = function(a, b, c)
      {
        window.onbeforeunload = function(){};
        return old_savePanelDrawing(a, b, c);
      }

      // And contest panel too
      var old_saveContestDrawing = saveContestDrawing;
      saveContestDrawing = function(a, b, c)
      {
        window.onbeforeunload = function(){};
        return old_saveContestDrawing(a, b, c);
      }

      // Make resetting have no confirmation but undoable, and reset sandbox timer
      drawApp.reset = function()
      {
        sandboxDrawingStart = Date.now();
        drawApp.context.clearRect(0, 0, drawApp.context.canvas.width, drawApp.context.canvas.height);
        save();
        return false;
      }

      drawApp.old_setColor = drawApp.setColor;
      drawApp.setPrimaryColor = function(color)
      {
        this.primary_color = color;
        document.getElementById("primaryColor").style.background =
          (color === null) ? "url(http://drawception.com/img/draw_eraser.png)" : color;
        updateCursorColor((color === null) ? defaultFill : color);
      };
      drawApp.setSecondaryColor = function(color)
      {
        this.secondary_color = color;
        document.getElementById("secondaryColor").style.background =
          (color === null) ? "url(http://drawception.com/img/draw_eraser.png)" : color;
        updateCursorColor((color === null) ? defaultFill : color);
      };
      drawApp.setColor = function(color, bypass)
      {
        if (!bypass) this.setPrimaryColor(color);
        var disp = (color === null) ? defaultFill : color;
        updateCursorColor(disp);
        if (color === null)
        {
          this.context.globalCompositeOperation = "destination-out";
          this.context.strokeStyle = "rgba(0,0,0,1.0)";
          return;
        }
        return this.old_setColor(color);
      };
      defaultColor = $('#colorOptions').find('.selected').attr('data-color');
      drawApp.primary_color = defaultColor;
      drawApp.secondary_color = null;

      // Can't remove canvas event listeners, so need to clone the element without events
      var oldcanvas = canvas;
      canvas = oldcanvas.cloneNode(true);
      oldcanvas.parentNode.replaceChild(canvas, oldcanvas);
      drawApp.canvas = $(canvas);
      drawApp.context = canvas.getContext("2d");
      drawApp.canvas.bind("contextmenu", function() {return false});

      drawApp.old_setSize = drawApp.setSize;
      drawApp.setSize = function(size)
      {
        strokeSize = size;
        return this.old_setSize(size);
      };
      drawApp.context.lineWidth = 12;
      drawApp.context.lineCap = "round";
      strokeSize = drawApp.context.lineWidth;
      cursorOffset = strokeSize / 2;
      dynSize = 0;
      if (insandbox)
      {
        drawApp.context.clearRect(0, 0, drawApp.context.canvas.width, drawApp.context.canvas.height);
        restorePoints = [drawApp.context.getImageData(0, 0, drawApp.context.canvas.width, drawApp.context.canvas.height)];
      }
      //drawApp.context.putImageData = CanvasRenderingContext2D.prototype.putImageData;

      var backup = localStorage.getItem("anbt_drawingbackup");
      if (options.backup && backup)
      {
        backup = JSON.parse(backup);
        var which_game = $('input[name=which_game]');
        if (insandbox || which_game.length && (which_game.val() == backup.game))
        {
          var img = new Image;
          img.onload = function()
          {
            drawApp.context.drawImage(this, 0, 0, drawApp.context.canvas.width, drawApp.context.canvas.height);
            save();
          };
          img.src = backup.image;
        }
        // Delete backup if playing another game
        if (which_game.length && (which_game.val() != backup.game))
        {
          localStorage.removeItem("anbt_drawingbackup");
        }
      }
      
      drawApp.old_canvasMouseDown = drawApp.onCanvasMouseDown();
      drawApp.canvas.on('mousedown', function(e)
        {
          clearTimeout(backupTimer);
          $(canvas).addClass("active");
          e.preventDefault();
          var x, y;
          if (typeof e.offsetX === "undefined")
          {
            var targetOffset = $(e.target).offset();
            x = e.pageX - targetOffset.left;
            y = e.pageY - targetOffset.top;
          } else {
            x = e.offsetX;
            y = e.offsetY;
          }
          updateTabletPos((oldX != x) || (oldY != y));
          oldX = x;
          oldY = y;
          var rightButton = (e.which === 3 || e.button === 2);
          var leftButton = !rightButton;
          if (e.altKey)
          {
            if (eyedropper(x, y) === null) return;
            if (leftButton)
            {
              drawApp.setPrimaryColor(eyedropper(x, y));
            } else {
              drawApp.setSecondaryColor(eyedropper(x, y));
            }
          } else {
            if (isEraser())
            {
              drawApp.setColor(null, 1);
            } else {
              if (leftButton)
              {
                drawApp.setColor(drawApp.primary_color, 1);
              } else {
                drawApp.setColor(drawApp.secondary_color, 1);
              }
            }
            if (usingTablet())
            {
              dynSize = 0.1;
              drawApp.context.lineWidth = dynSize;
              //pressureUpdater = setInterval(updatePressure, 20);
            }
            return drawApp.old_canvasMouseDown(e);
          }
        }
      );
      drawApp.canvas.on('mouseup', function(e)
        {
          backupTimer = setTimeout(saveBackup, 1000);
          $(canvas).removeClass("active");
          if (usingTablet())
          {
            dynSize = 0.1;
            drawApp.context.lineWidth = 0;
            //clearInterval(pressureUpdater);
          }
        }
      );
      $(window).keydown(function(e)
        {
          if (document.activeElement instanceof HTMLInputElement) return true;
          if (e.keyCode == 18) // Alt
          {
            drawCursor.style.display = "none";
          }
          else if (e.keyCode == "Y".charCodeAt(0) && e.ctrlKey)
          {
            redo();
          }
          else if (e.keyCode == "X".charCodeAt(0))
          {
            e.preventDefault();
            var tmp = drawApp.secondary_color;
            drawApp.setSecondaryColor(drawApp.primary_color);
            drawApp.setPrimaryColor(tmp);
          }
          else if (e.keyCode == "E".charCodeAt(0))
          {
            e.preventDefault();
            $(".eraserPicker").click();
            drawApp.setPrimaryColor(null);
          }
          else if (!e.ctrlKey && (e.keyCode >= 48 && e.keyCode <= 57))
          {
            e.preventDefault();
            var i = (e.keyCode == 48) ? 9 : e.keyCode - 49;
            if (e.shiftKey) i += 8;
            var el = $(".colorPicker").get(i);
            if (el)
            {
              el = $(el);
              el.click();
              drawApp.setPrimaryColor(el.attr("data-color"));
            }
          }
          else if (e.keyCode == "F".charCodeAt(0) && e.shiftKey)
          {
            e.preventDefault();
            drawApp.context.fillStyle = drawApp.primary_color;
            drawApp.context.fillRect(0, 0, drawApp.context.canvas.width, drawApp.context.canvas.height);
            save();
          }
          else if (!e.ctrlKey && (e.keyCode == 109 || e.keyCode == 189 || e.keyCode == 219)) // Numpad - or - or [
          {
            e.preventDefault();
            nextSize(-1);
          }
          else if (!e.ctrlKey && (e.keyCode == 107 || e.keyCode == 187 || e.keyCode == 221)) // Numpad + or = or ]
          {
            e.preventDefault();
            nextSize(+1);
          }
        }
      );
      drawApp.canvas.mousemove(function(e)
        {
          updateTabletPos(true);
          if (usingTablet())
          {
            var goal = strokeSize * Math.pow(getPressure(), options.pressureExponent);
            dynSize = (dynSize + goal) / 2;
            drawApp.context.lineWidth = dynSize;
          } else {
            drawApp.context.lineWidth = strokeSize;
          }
        }
      );

      // Brush-specific events
      if (!prestoOpera)
      {
        $(window).keyup(function(e)
          {
            if (e.keyCode == 18) // Alt
            {
              drawCursor.style.display = "block";
            }
          }
        );
        drawApp.canvas.mousemove(function(e)
          {
            drawCursor.style.left = e.clientX + "px";
            drawCursor.style.top = e.clientY + "px";
            updateDrawCursor();
          }
        );
        drawApp.canvas.mouseleave(function(e)
          {
            drawCursor.style.display = "none";
          }
        );
        drawApp.canvas.mouseenter(function(e)
          {
            drawCursor.style.display = "block";
          }
        );
      }

      // Fix brush cursor location
      $('#drawCursor').prependTo($(document.body));

      // Add primary and secondary color indicators
      var pr = $('<div id="primaryColor" title="Primary color (left click)" style="background: ' + defaultColor +'">');
      var se = $('<div id="secondaryColor" title="Secondary color (right click)" style="background: url(http://drawception.com/img/draw_eraser.png)">');
      $(".btn-drawtool").first().before(pr).before(se);

      // Adjust palette buttons to handle left and right clicks
      drawApp.eraser = function(){};
      $(".eraserPicker").parent().mousedown(function(e)
        {
          e.preventDefault();
          var rightButton = (e.which === 3 || e.button === 2);
          var leftButton = !rightButton;
          if (leftButton)
          {
            drawApp.setPrimaryColor(null);
          } else {
            drawApp.setSecondaryColor(null);
          }
        }
      );
      $(".eraserPicker").parent().contextmenu(function(e){ return false; }); 
      $(".colorPicker").parent().mousedown(colorPickerMousedown);
      $(".colorPicker").parent().contextmenu(function(e){ return false; });

      // Fix sandbox background layer because we re-add the button
      drawApp.exportImage = function()
      {
        var t = new Image();
        t.src = this.toDataURL();
        t.onload = function()
        {
          var e = document.getElementById("tempCanvas"),
              n = e.getContext("2d");
          n.fillStyle = bglayer ? bglayer : "#fffdc9";
          n.fillRect(0, 0, 300, 250);
          n.drawImage(t, 0, 0, 300, 250);
          var r = e.toDataURL("image/png");
          $("#newimg").html($("<img src=" + r + " width=300 height=250 />"));
        };
      };
    }, 100
  );

  if (insandbox)
  {
    $(".drawingForm").before('<p class="text-muted">Your drawing time: <span id="drawingTime">00:00</span></p>');
    var drawingTime = $("#drawingTime");
    sandboxDrawingStart = Date.now();
    setInterval(
      function()
      {
        var s = Math.floor((Date.now() - sandboxDrawingStart) / 1000);
        var minutes = Math.floor(s / 60);
        var seconds = s - (minutes * 60);
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        drawingTime.text(minutes+':'+seconds);
      }, 1000
    );

    // Allow to choose a palette to test
    var paloptions = $('<ul style="list-style: none; padding: 0; line-height: 200%">');
    for (var i = 0; i < palettes.length; i++)
    {
      paloptions.append('<li><a class="label ' + palettes[i].class +
        '" href="#" onclick="return setPalette(' + i + ');">' +
        (palettes[i].longname || palettes[i].name) +'</a></li>');
    }
    var pallabel = $('<a id="paletteChooser" class="label label-normalpal" href="#" title="Choose the palette">Normal &#x25BC;</a>');
    pallabel.popover({container: "body", placement: "bottom", html: 1, content: paloptions});
    pallabel.attr("title", "Click to choose the palette");
    $("#colorOptions").prepend($('<p style="text-align: center"></p>').append(pallabel));
    
    // Re-add missing background color selection in sandbox
    bgoptions = $('<div id="bgOptions">');
    $(".colorPicker").each(
      function()
      {
        var c = $(this).attr("data-color");
        bgoptions.append('<a class="bglayerPicker" onclick="drawApp.setBglayer(\'' + c + '\')" data-color="' + c + '" style="background:' + c + '">');
      }
    );
    var newbutton = $('<button onclick="return false;" id="btn-bglayer" class="btn btn-yellow btn-drawtool" title="Background Layer"><span class="glyphicon glyphicon-bold"></span></button>');
    newbutton.popover({container: "body", placement: "top", html: 1, content: bgoptions});
    newbutton.attr("title", "Background Layer");
    $(".drawingForm .btn-group").slice(2, 3).before($('<div class="btn-group">').append(newbutton).after(" "));

    // Add upload to imgur button
    $(".drawingForm .btn-info").after(
      '&nbsp;' +
      '<a id="imgurup" href="#" onclick="return uploadCanvasToImgur();" class="btn btn-info"><span class="glyphicon glyphicon-upload"></span> <b>Upload to imgur</b></a>' +
      '<br><br><a id="imgurimgurl" class="selectable lead" href="#" style="display:none"></a>' +
      '<a id="imgurdelurl" class="lead glyphicon glyphicon-remove btn btn-sm btn-danger" href="#" target="_blank" title="Delete from imgur" style="margin: -10px 0 0 10px; display:none"></a>'
    );
    // Help selecting for copying
    $("#imgurimgurl").mousedown(
      function(e)
      {
        if (window.getSelection)
        {
          var range = document.createRange();
          range.selectNodeContents(e.target);
          var selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    );
  }

  if (options.enableWacom && options.fixTabletPluginGoingAWOL)
  {
    window.onblur = function(e)
    {
      document.body.removeChild(wtPlugin);
    };
    window.onfocus = function(e)
    {
      document.body.appendChild(wtPlugin);
    };
  }
}

function documentReadyOnPlay() // Mostly copied from the $(document).ready function
{
  var timeleft = $("#timeleft").text();

  if ($('#drawingCanvas').length)
  {
    defaultBgColor = $('#colorOptions').find('.defaultBgColor').attr('data-color');
    $('#drawingCanvas').css('background', defaultBgColor ? defaultBgColor : defaultFill);

    $('#btn-color').popover({ 
      html: true,
      content: function() {
        return $('#colorOptions').html();
      }
    }); 

    if ($('#btn-bglayer').html() != null) {
      $('#btn-bglayer').popover({ html : true, placement: 'top' });
      if (defaultBgColor) {
        bglayer = defaultBgColor;
        defaultFill = defaultBgColor;
      } else {
        bglayer = defaultFill;
      }
    } else {
      bglayer = null;
    }
    $('#brush-default').button('toggle');

    drawApp = new DrawApp("drawingCanvas");

    var ctx = drawApp.context;
    restorePoints = [ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)];
    
    $('#timeleft').countdown({until: +timeleft, compact: true, format: "MS", onTick: highlightCountdown, onExpiry: timesUpWarning});

    $('#undo-button').click(function() {
      undo();
      return false;
    });

    $('#redo-button').click(function() {
      redo();
      return false;
    });

    // Fix broken submit button
    if ($("#play-submit").parent().get(0).childNodes[2].textContent.match(/Submit!/))
    {
      $("#play-submit").text("Submit!");
      $("#play-submit").parent().get(0).childNodes[2].textContent = "";
    }

  } else {
    if (timeleft != "") {
      $('#timeleft').countdown({until: +timeleft, compact: true, format: "MS", onTick: highlightCountdown, onExpiry: timesUp});
    }
  }
}

function loadNextGameAsync()
{
  if (document.location.href.indexOf("/play/") == -1)
  {
    console.log("loadNextGameAsync(): doesn't seem to be playing... o_O");
    return;
  }
  $.ajax({
    url: '/play/',
    cache: false,
    timeout: 15000,
    success: function(s)
    {
      var beginning = '<div class="wrapper">';
      var a = s.indexOf(beginning);
      var b = s.indexOf('</div> <!-- ./wrapper -->');
      if (a != -1 && b != -1)
      {
        var newContent = s.substring(a + beginning.length, b);
        $(".wrapper").html(newContent);

        // Kick-start the patient
        $('[rel=tooltip]').tooltip();
        documentReadyOnPlay();
        empowerPlay();
        enhanceCanvas(false);
      } else {
        // In case of mismatch, fallback
        document.location.replace("/play/");
      }
    },
    error: function()
    {
      // In case of error, fallback
      document.location.replace("/play/");
    }
  });
}


function empowerPlay()
{
  if (!document.getElementById("gameForm")) return;

  // Add options 
  var optionsButton = $('<input type="button" value="Options &#x25BC;" class="btn btn-primary btn-sm">');
  var optionsDiv = $('<div>');
  var playModeButton = $('<input id="playMode" type="button" onclick="return playModeClick();" class="btn btn-default btn-sm">');
  playModeButton.attr("value", availablePlayModes[playMode]);
  optionsDiv.prepend(playModeButton);

  $(".gameControls").prepend(optionsButton);
  optionsButton.popover({container: "body", placement: "bottom", html: 1, content: optionsDiv});
  
  // Remake skip function to async
  if (options.asyncSkip)
  {
    DrawceptionPlay.skipPanel = function()
    {
      var skipButton = $('input[value="Skip"]');
      if (skipButton.length) skipButton.attr("value", "Skipping...").attr("disabled", "disabled");
      $.ajax({
        url: '/play/skip.json',
        data: { game_token: $('input[name=which_game]').val()},
        type: 'post',
        cache: false,
        timeout: 15000,
        success: function(o)
        {
          if (o.redirect)
          {
            loadNextGameAsync();
          } else {
            // Error: reload the page anyway
            loadNextGameAsync();
          }
        },
        error: function(o)
        {
          if (skipButton.length) skipButton.attr("value", "Skip").attr("disabled", null);
          DrawceptionPlay.handleError(o);
        }
      });
    };
  }

  // Handle auto-skipping
  var captioning = !document.getElementById("drawingCanvas");
  if (captioning && playMode == MODE_DRAW_ONLY) autoSkip("Playing drawing-only mode");
  else if (!captioning && playMode == MODE_CAPTION_ONLY) autoSkip("Playing caption-only mode");

  // Make Enter work for submitting a caption
  if (captioning)
  {
    var submitclick = $(".button-form[value='Submit!']").attr("onclick");
    if (submitclick)
    {
      $("#gameForm").attr("action", "#");
      if (options.enterToCaption)
      {
        $("#gameForm").attr("onsubmit", submitclick + "; return false;");
      } else {
        $("#gameForm").attr("onsubmit", "return false;");
      }
    }
  }

  // Add bookmark button
  var bookmarkButton = $('<input type="button" value="Bookmark" class="btn btn-primary btn-sm">');
  bookmarkButton.click(function(e)
    {
      e.preventDefault();
      var games = localStorage.getItem("gpe_gameBookmarks");
      games = games ? JSON.parse(games) : {};
      var token = $('input[name="which_game"]').val();
      var pp = $(".play-phrase");
      var caption;
      if (pp.length) caption = pp.first().text().trim();
      games[token] = {time: Date.now(), caption: caption};
      localStorage.setItem("gpe_gameBookmarks", JSON.stringify(games));
      $(this).attr("value", "Bookmarked!").attr("disabled", "disabled").removeClass("btn-primary");
    }
  );
  optionsButton.before(bookmarkButton).before(" ");

  // Remove the temptation to judge
  if (options.removeFlagging) $('input.btn[value="Report"]').remove();
}

// Event functions referred to in HTML must have unwrapped access

window.playModeClick = playModeClick;
function playModeClick()
{
  playMode = (playMode + 1) % availablePlayModes.length;
  localStorage.setItem("gpe_playMode", playMode.toString());
  $("#playMode").attr("value", availablePlayModes[playMode]);
  return false;
}

window.setPalette = setPalette;
function setPalette(num)
{
  var pc = $("#paletteChooser");
  pc.popover("toggle");
  pc.text(palettes[num].name + " \u25BC");
  pc.removeClass().addClass("label").addClass(palettes[num].class);

  $(".colorPicker").parent().remove();
  var c, l, p = $("#tool-eraser").parent();
  bgoptions.empty();
  var falsefunc = function(){ return false; };
  for (var i = 0; i < palettes[num].colors.length; i++)
  {
    c = palettes[num].colors[i];
    l = $(
      '<label class="btn btn-default btn-sm btn-drawtool" style="margin-left: -1px;">' +
        '<input type="radio" name="options" id="color-' + (i+1) + '"/>' +
        '<button class="colorPicker" data-color="' + c + '" style="background:' + c + ';"/>' +
      '</label>'
    );
    l.mousedown(colorPickerMousedown);
    l.contextmenu(falsefunc);
    bgoptions.append('<a class="bglayerPicker" onclick="drawApp.setBglayer(\'' + c + '\')" data-color="' + c + '" style="background:' + c + '">');
    p.before(l);
  }
  return false;
}

window.colorPickerMousedown = colorPickerMousedown;
function colorPickerMousedown(e)
{
  e.preventDefault();
  var rightButton = (e.which === 3 || e.button === 2);
  var leftButton = !rightButton;
  var color = $(this).find(".colorPicker").attr("data-color");
  if (leftButton)
  {
    drawApp.setPrimaryColor(color);
  } else {
    drawApp.setSecondaryColor(color);
  }
  return false;
}

window.uploadCanvasToImgur = uploadCanvasToImgur;
function uploadCanvasToImgur()
{
  if ($("#imgurup b").text() == "Uploading...") return false;
  $("#imgurup b").text("Uploading...");
  $("#imgurimgurl").hide();
  $("#imgurdelurl").hide();
  var data, t = new Image();
  t.onload = function()
  {
    var e = document.getElementById("tempCanvas"),
        n = e.getContext("2d");
    n.fillStyle = bglayer ? bglayer : "#fffdc9";
    n.fillRect(0, 0, 300, 250);
    n.drawImage(t, 0, 0, 300, 250);
    data = e.toDataURL("image/png").split(',')[1];
    $.ajax(
      {
        url: 'https://api.imgur.com/3/image',
        type: 'post',
        headers: {Authorization: 'Client-ID dc1240eb1fddf64'},
        data: {image: data},
        dataType: 'json',
        success: function(r)
        {
          $("#imgurup b").text("Upload to imgur");
          $("#imgurimgurl").show();
          if (r.success)
          {
            $("#imgurimgurl").attr({target: "_blank", href: r.data.link}).text("![Uploaded image](" + r.data.link + ")");
            $("#imgurdelurl").show();
            $("#imgurdelurl").attr("href", "http://imgur.com/delete/" + r.data.deletehash);
          } else {
            var err = r.status ? ("Imgur error: " + r.status) : ("Error: " + r.responseText);
            $("#imgurimgurl").attr({target: "", href: "#"}).text(err);
          }
        },
        error: function(e)
        {
          console.log(e);
          $("#imgurup b").text("Upload to imgur");
          $("#imgurimgurl").show().attr({target: "", href: "#"}).text(("Error: " + e.statusText));
        }
      }
    );
  };
  t.src = drawApp.toDataURL();
  return false;
}

window.reversePanels = reversePanels;
function reversePanels()
{
  var e = $(".thumbnail").parent();
  e.parent().append(e.get().reverse());
  return false;
}

window.likePanelById = likePanelById;
function likePanelById(id)
{
  $.ajax({url: '/viewgame/like/panel.json?panelid=' + id + '&action=Like'});
}

window.likeAll = likeAll;
function likeAll()
{
  $("img[src='/img/thumb_up_off.png']").parent().each(
    function(k, v)
    {
      if ($(v).parent().parent().find("a:last-child").text().trim() != username) v.click();
    }
  );
  return false;
}

window.toggleLight = toggleLight;
function toggleLight()
{
  var css = document.getElementById("darkgraycss");
  if (!inDark)
  {
    if (!css)
    {
      css = document.createElement("style");
      css.id = "darkgraycss";
      css.type = "text/css";
      css.appendChild(document.createTextNode(localStorage.getItem("gpe_darkCSS")));
    }
    document.head.appendChild(css);
    inDark = 1;
  } else {
    document.head.removeChild(css);
    inDark = 0;
  }
  localStorage.setItem("gpe_inDark", inDark.toString());
  return;
}

function betterView()
{
  // Show approximate creation time from the first drawing panel
  var m = $('img[src^="/pub/panels/"]').attr("src").match(/\/pub\/panels\/(\d+)\/(\d+)-(\d+)\//);
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  var day = (100 + parseInt(m[3], 10)).toString().slice(-2);
  var startDate = monthNames[parseInt(m[2], 10) - 1] + " " + day + ", " + m[1];
  var lead = $("#main .lead");
  lead.text(lead.text().replace("game completed", "game started on " + startDate + " and completed"));
  
  // Hide your own number of likes
  if (options.ownPanelLikesSecret)
    $(".panel-user").find('a[href*="/' + userid + '/"]').parent().parent().find("span.disabled .numlikes").text("?").css("opacity", "0.5");
  
  // Reverse panels button and like all button
  $("#btn-copy-url")
    .after(' <a href="#" class="btn btn-default" onclick="return reversePanels();" title="Reverse panels"><span class="glyphicon glyphicon-refresh"></span> Reverse</a>')
    .after(' <a href="#" class="btn btn-default" onclick="return likeAll();" title="Like all panels"><span class="glyphicon glyphicon-thumbs-up"></span> Like all</a>');

  // Remove the temptation to judge
  if (options.removeFlagging) $(".flagbutton").remove();

  // Panel favorite buttons
  var favButton = $('<span class="panel-number anbt_favpanel glyphicon glyphicon-heart text-muted" title="Favorite"></span>');
  favButton.click(function(e)
    {
      e.preventDefault();
      var t = $(this);
      if (t.hasClass("anbt_favedpanel")) return;
      var tp = t.parent();
      var id = scrambleID(t.next().attr("id").slice(6));

      var panels = localStorage.getItem("gpe_panelFavorites");
      panels = panels ? JSON.parse(panels) : {};

      var panel = {time: Date.now(), by: tp.find(".panel-user a").text()};
      var img = tp.find(".gamepanel img");
      if (img.length)
      {
        // Drawing panel
        panel.image = img.attr("src");
        panel.caption = img.attr("alt");
      } else {
        // Caption panel
        panel.caption = tp.find(".gamepanel").text().trim();
      }
      panels[id] = panel;
      localStorage.setItem("gpe_panelFavorites", JSON.stringify(panels));
      t.addClass("anbt_favedpanel");
    }
  );
  $(".panel-number").after(favButton);

  // Highlight new comments and remember seen comments
  var gameid = document.location.href.match(/viewgame\/([^\/]+)\//)[1];
  var comments = $("#comments");
  var check = setInterval(function()
  {
    var holders = comments.find(".comment-holder");
    if (!holders.length) return;
    clearInterval(check);
    // Clear old tracked comments
    var hour = Math.floor(Date.now() / (1000 * 60*60)); // timestamp with 1 hour precision
    for (var tempgame in seenComments)
    {
      // Store game entry for up to a week after last tracked comment
      if (seenComments[tempgame].h + 24*7 < hour)
      {
        delete seenComments[tempgame];
      }
    }

    var maxseenid = 0;
    holders.each(function()
    {
      var t = $(this);
      var ago = t.find(".text-muted").text();
      var commentid = parseInt(t.attr("id").slice(1), 10);
      // Track comments from up to week ago
      if (ago.match(/just now|min|hour| [1-7] day/))
      {
        if (seenComments[gameid] && seenComments[gameid].id >= commentid) return;
        t.addClass("comment-new");
        if (maxseenid < commentid) maxseenid = commentid;
      }
    });
    if (maxseenid) seenComments[gameid] = {h: hour, id: maxseenid};
    localStorage.setItem("gpe_seenComments", JSON.stringify(seenComments));
  }, 500);
}

function betterPanel()
{
  var favButton = $('<button class="btn btn-info" style="margin-top: 20px"><span class="glyphicon glyphicon-heart"></span> <b>Favorite</b></button>');
  favButton.click(function(e)
    {
      e.preventDefault();
      var panels = localStorage.getItem("gpe_panelFavorites");
      panels = panels ? JSON.parse(panels) : {};
      var panel = {time: Date.now(), by: $(".lead a").text()};
      var id = document.location.href.match(/\/panel\/[^\/]+\/([^\/]+)\//)[1];
      var img = $(".gamepanel img");
      if (img.length)
      {
        // Drawing panel
        panel.image = img.attr("src");
        panel.caption = img.attr("alt");
      } else {
        // Caption panel
        panel.caption = $(".gamepanel").text().trim();
      }
      panels[id] = panel;
      localStorage.setItem("gpe_panelFavorites", JSON.stringify(panels));
      $(this).attr("disabled", "disabled").find("b").text("Favorited!");
    }
  );
  $(".gamepanel").after(favButton);
}

function simpleHash(s)
{
  return s.toString().split("").reduce(function(a, b)
    {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0
  );
}

function rot13(s)
{
  return s.toString().split("").map(function(c)
    {
      c = c.charCodeAt(0);
      if (c >= 97 && c <= 122) c = (c - 97 + 13) % 26 + 97;
      if (c >= 65 && c <= 90) c = (c - 65 + 13) % 26 + 65;
      return String.fromCharCode(c)
    }
  ).join("");
}

function randomGreeting()
{
  // Spoilers!
  var g = ["Oruvaq lbh!", "Ubcr vg'f abg envavat gbqnl.", "Jurer vf lbhe tbq abj?",
    "Lbh fubhyq srry 5% zber cbjreshy abj.", "Fhqqrayl, abguvat unccrarq!", "^_^",
    "Guvf gnxrf fb ybat gb svavfu...", "Jungrire lbh qb, qba'g ernq guvf grkg.",
    "Pyvpx urer sbe 1 serr KC", "Or cngvrag.", "Whfg qba'g fgneg nal qenzn nobhg vg.",
    "47726S6Q2069732074686520677265617465737421", "Cynl fzneg.", "Cynl avpr.",
    "Fzvyr!", "Qba'g sbetrg gb rng.", "V xabj jung lbh'ir qbar.", "Fpvrapr!",
    "Gbqnl vf n tbbq qnl."];
  var change_every_half_day = Math.floor(Date.now() / (1000 * 60 * 60 * 12));
  var rnddata = simpleHash(change_every_half_day + parseInt(userid, 10) + 178889);
  return rot13(g[rnddata % g.length]);
}

function formatTimestamp(d)
{
  if (typeof d == "number") d = new Date(d);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var s = [
    (100 + d.getDate() + "").slice(-2),
    " ",
    months[d.getMonth()],
    " ",
    d.getFullYear(),
    " ",
    (100 + d.getHours() + "").slice(-2),
    ":",
    (100 + d.getMinutes() + "").slice(-2)
  ].join("");
  return s;
}

window.viewMyPanelFavorites = viewMyPanelFavorites;
function viewMyPanelFavorites()
{
  var panels = localStorage.getItem("gpe_panelFavorites");
  panels = panels ? JSON.parse(panels) : {};
  var result = "";
  for (var id in panels)
  {
    result += '<div id="' + id + '" class="col-xs-6 col-sm-4 col-md-2" style="min-width: 150px;">' +
      '<div class="thumbnail" style="overflow:hidden"><a class="anbt_paneldel" href="#" title="Remove">X</a>' +
      '<a href="/panel/-/' +
      id + '/-/" class="thumbnail thumbpanel" rel="tooltip" title="' +
      panels[id].caption + '">' +
      (panels[id].image
        ? '<img src="' + panels[id].image + '" width="125" height="104" alt="' + panels[id].caption + '" />'
        : panels[id].caption) +
      '</a><span class="text-muted" style="white-space:nowrap">by ' + panels[id].by +
      '</span><br><span class="text-muted"><span class="glyphicon glyphicon-heart"></span> ' +
      formatTimestamp(panels[id].time) + '</span></div></div>';
  }
  if (result == "") result = "You don't have any favorited panels.";
  $("#anbt_userpage").html(result);
  $("#anbt_userpage").on("click", ".anbt_paneldel", function(e)
    {
      e.preventDefault();
      var id = $(this).parent().parent().attr("id");
      $("#" + id).fadeOut();
      delete panels[id];
      localStorage.setItem("gpe_panelFavorites", JSON.stringify(panels));
    }
  );
}

window.viewMyGameBookmarks = viewMyGameBookmarks;
function viewMyGameBookmarks()
{
  var removeButtonHTML = '<a class="anbt_gamedel pull-right lead glyphicon glyphicon-remove btn btn-sm btn-danger" href="#" title="Remove" style="margin-left: 10px"></a>';
  var games = localStorage.getItem("gpe_gameBookmarks");
  games = games ? JSON.parse(games) : {};
  var result = "";
  for (var id in games)
  {
    if (id.length == 43) // token
    {
      result += '<p class="well" id="' + id + '"><span>' + id + '</span>' + removeButtonHTML + '</p>';
      (function(id)
        {
          $.ajax(
            {
              url: '/play/' + id,
              cache: false,
              error: function(e)
              {
                $("#" + id).find("span").text("Error while retrieving game: " + e.statusText);
                return;
              },
              success: function(e)
              {
                if (e.match(/Game is not private/))
                {
                  var gamename = "";
                  if (games[id].caption) gamename += " " + games[id].caption;
                  if (games[id].time) gamename += " bookmarked on " + formatTimestamp(games[id].time);
                  if (gamename == "") gamename = id;
                  $("#" + id).find("span").text("Unfinished public game" + gamename);
                  return;
                }
                var title = e.match(/<title>(.+)<\/title>/)[1];
                var m = e.match(/\/viewgame\/([^\/]+)\/[^\/]+\//);
                var url = m[0];
                var gameid = m[1];
                delete games[id];
                games[gameid] = {title: title, url: url};
                $("#" + id).attr("id", gameid).find("span").replaceWith('<a href="' + url +'">' + title + '</a>');
                localStorage.setItem("gpe_gameBookmarks", JSON.stringify(games));
              }
            }
          );
        }
      )(id);
    }
    else if (id.length == 10) // game ID
    {
      result += '<p class="well" id="' + id + '"><a href="' + games[id].url + '">' + games[id].title + '</a>' + removeButtonHTML + '</p>';
    }
  }
  if (result == "") result = "You don't have any bookmarked games.";
  $("#anbt_userpage").html(result);
  $("#anbt_userpage").on("click", ".anbt_gamedel", function(e)
    {
      e.preventDefault();
      var id = $(this).parent().attr("id");
      $("#" + id).fadeOut();
      delete games[id];
      localStorage.setItem("gpe_gameBookmarks", JSON.stringify(games));
    }
  );
}

function betterPlayer()
{
  // Remove the temptation to judge
  if (options.removeFlagging) $('a.btn:contains("Report")').remove();

  var loc = document.location.href;
  // If it's user's homepage, add new buttons in there
  if (loc.match(new RegExp('/player/' + userid + '/[^/]+/(?:$|#)')))
  {
    var a = $("<h3>ANBT stuff: </h3>");
    a.append('<a class="btn btn-primary" href="#anbt_panelfavorites" onclick="viewMyPanelFavorites();">Panel Favorites</a> ');
    a.append('<a class="btn btn-primary" href="#anbt_gamebookmarks" onclick="viewMyGameBookmarks();">Game Bookmarks</a>');
    var newrow = $('<div class="row"></div>');
    newrow.append($('<div class="col-md-12"></div>').append(a).append('<div id="anbt_userpage">' + randomGreeting() + '</div>'));
    $("div.col-md-8").first().parent().before(newrow);

    if (document.location.hash.indexOf("#anbt_panelfavorites") != -1) viewMyPanelFavorites();
    if (document.location.hash.indexOf("#anbt_gamebookmarks") != -1) viewMyGameBookmarks();

    // Make delete cover button safer
    var old_deleteCover = DrawceptionPlay.deleteCover;
    DrawceptionPlay.deleteCover = function()
    {
      apprise('Delete the whole cover, really?', {'verify': true}, function(r)
        {
          if (r) { old_deleteCover(); }
        }
      );
    };
  }
}

function betterForum()
{
  // Convert times
  // Forum time seems to be Florida, GMT-6, +1 DST since 09 Mar 2014
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function convertForumTime(year, month, day, hours, minutes)
  {
    var d = new Date(year, month, day, hours, minutes);
    var tzo = d.getTimezoneOffset() * 60 * 1000;
    return formatTimestamp(d.getTime() - tzo + 5 * 60 * 60 * 1000);
  }

  $("span.muted, span.text-muted").each(function()
    {
      var m, t = $(this), tx = t.text();
      // Don't touch relative times
      if (tx.indexOf('ago') != -1) return;
      if (m = tx.match(/^\s*\(last post (...) (\d+).. (\d+):(\d+)([ap]m)\)\s*$/))
      {
        var month = months.indexOf(m[1]);
        var day = parseInt(m[2], 10);
        var hours = parseInt(m[3], 10) % 12;
        var minutes = parseInt(m[4], 10);
        var d = new Date();
        var year = d.getFullYear();
        if ((d.getMonth() < 6) && (month >= 6)) year--;
        hours += (m[5] == 'pm') ? 12 : 0;
        t.text("(last post " + convertForumTime(year, month, day, hours, minutes) + ")");
      }
      else if (m = tx.match(/^\s*\[ (\d+):(\d+) ([ap]m) ... (...) (\d+).., (\d{4}) \]\s*$/))
      {
        var hours = parseInt(m[1], 10) % 12;
        var minutes = parseInt(m[2], 10);
        hours += (m[3] == 'pm') ? 12 : 0;
        var month = months.indexOf(m[4]);
        var day = parseInt(m[5], 10);
        var year = parseInt(m[6], 10);
        t.text("[ " + convertForumTime(year, month, day, hours, minutes) + " ]");
      }
    }
  );

  // Linkify the links
  $('.comment-body p').each(function()
    {
      var t = $(this);
      if (t.text().indexOf("://") == -1) return;
      t.html(t.html().replace(/([^"]|^)(https?:\/\/[^\s<]+)/g, '$1<a href="$2">$2</a>'));
    }
  );

  // Linkify drawing panels
  $('img[src*="/pub/panels/"]').each(function()
    {
      var t = $(this);
      if (!t.parent().is("a"))
      {
        var gameid = t.attr("src").match(/\/([^-]+)-\d+.png/)[1];
        var gameurl = "/viewgame/" + gameid + "/-/";
        t.wrap('<a href="' + gameurl +'"></a>');
      }
    }
  );
  $('img[src*="/panel/"]').each(function()
    {
      var t = $(this);
      if (!t.parent().is("a"))
      {
        t.wrap('<a href="' + t.attr("src") + '-/"></a>');
      }
    }
  );
  // Fix the dead link
  $('img[src*="/display-panel.php?"]').each(function()
    {
      var t = $(this);
      if (!t.parent().is("a"))
      {
        var panelid = t.attr("src").match(/x=(\d+)/)[1];
        var newsrc = "/panel/drawing/" + scrambleID(panelid) + "/";
        t.attr("src", newsrc);
        t.wrap('<a href="' + newsrc + '-/"></a>');
      }
    }
  );

  // Show posts IDs and link
  var lastid = 0;
  $("span.muted").each(function()
    {
      var t = $(this), anch, id;
      try
      {
        anch = t.parent().parent().parent().parent().attr("id");
      } catch(e) {}
      if (anch)
      {
        id = parseInt(anch.substring(1), 10);
        if (id > lastid)
        {
          t.after(' <a class="text-muted" href="#' + anch + '">#' + id + '</a>');
        } else {
          t.after(' <a class="text-muted wrong-order" href="#' + anch + '">#' + id + '</a>');
        }
        lastid = id;
      }
    }
  );
}

function loadScriptSettings()
{
  var result = localStorage.getItem("gpe_anbtSettings");
  if (!result) return;
  result = JSON.parse(result);
  for (var i in result) options[i] = result[i];
}

window.updateScriptSettings = updateScriptSettings;
function updateScriptSettings(theForm)
{
  var result = {};
  $(theForm).find("input").each(function()
    {
      if (this.type == "checkbox")
      {
        result[this.name] = this.checked ? 1 : 0;
      }
      else if (this.getAttribute("data-subtype") == "number")
      {
        result[this.name] = parseFloat(this.value);
      }
      else
      {
        result[this.name] = this.value;
      }
    }
  );
  localStorage.setItem("gpe_anbtSettings", JSON.stringify(result));
  loadScriptSettings();
  $("#anbtSettingsOK").fadeIn("slow").fadeOut("slow");
  return false;
}

function addScriptSettings()
{
  var theForm = $('<form class="regForm form-horizontal" action="#" onsubmit="return updateScriptSettings(this);"></form>');
  theForm.append('<legend>ANBT script settings</legend>');

  var addGroup = function(name, settings)
  {
    var div = $('<div class="control-group"></div>');
    div.append('<label class="control-label" for="">' + name + '</label>');
    settings.forEach(function(id)
      {
        var v = options[id[0]], name = id[0], t = id[1], desc = id[2];
        var c = $('<div class="controls"></div>');
        if (t == "boolean")
        {
          c.append('<input type="checkbox" id="anbt_' + name + '" name="' + name + '" value="1" ' + (v ? 'checked="checked"' : '') + '">');
          c.append('<label for="anbt_' + name + '">' + desc + '</label>')
        }
        else if (t == "number")
        {
          c.append('<b>' + desc + ':</b><input class="form-control" type="text" data-subtype="number" name="' + name + '" value="' + v + '">');
        }
        else
        {
          c.append('<b>' + desc + ':</b><input class="form-control" type="text" name="' + name + '" value="' + v + '">');
        }
        div.append(c);
      }
    );
    theForm.append(div);
  };
  addGroup('Pen Tablet (requires plugin: <a href="http://www.wacomeng.com/web/fbWTPInstall.zip">Windows</a> | <a href="http://www.wacomeng.com/web/Wacom%20Mac%20Plug-in%20Installer.zip">Mac OS</a> | <a href="https://github.com/ZaneA/WacomWebPlugin">Linux</a>)',
    [
      ["enableWacom", "boolean", "Enable Wacom plugin / pressure sensitivity support"],
      ["fixTabletPluginGoingAWOL", "boolean", "Try to prevent Wacom plugin from disappearing"],
      ["pressureExponent", "number", "Pressure exponent (smaller = softer tablet response, bigger = sharper)"],
    ]
  );
  addGroup("Play",
    [
      ["asyncSkip", "boolean", "Fast Async Skip (experimental)"],
      ["hideCross", "boolean", "Hide the cross when drawing"],
      ["enterToCaption", "boolean", "Submit captions by pressing Enter"],
      ["backup", "boolean", "Save drawings from page reload and place timed out ones in sandbox"],
    ]
  );
  addGroup("Chat",
    [
      ["loadChat", "boolean", "Load the embedded chat"],
      ["chatAutoConnect", "boolean", "Automatically connect to the chat"],
    ]
  );
  addGroup("Miscellaneous",
    [
      ["removeFlagging", "boolean", "Remove flagging buttons"],
      ["ownPanelLikesSecret", "boolean", "Make likes for your own panels secret (in game only)"],
    ]
  );
  theForm.append('<div class="control-group"><div class="controls"><input name="submit" type="submit" class="btn btn-primary" value="Apply"> <b id="anbtSettingsOK" class="label label-theme_holiday" style="display:none">Saved!</b></div></div>');
  $("#main").prepend(theForm);
}

function autoSkip(reason)
{
  var autoSkipInfo = $('<div id="autoSkipInfo" class="text-warning" style="cursor: pointer">(CLICK TO CANCEL)<br>Auto-skipping in <span id="autoSkipCounter">3</span>...<br>Reason: ' +  reason + '</div>');
  $(".play-instruction").append(autoSkipInfo);
  autoSkipInfo.click(function(e)
    {
      e.preventDefault();
      $("#autoSkipCounter").countdown("pause");
      autoSkipInfo.hide();
    }
  );
  $("#autoSkipCounter").countdown({
      until: 3,
      compact: 1,
      format: "S",
      onExpiry: timesUp
  });
}

function uploadToCanvas()
{
  if (!fileInput)
  {
    fileInput = $('<input type="file">');
    $(document.body).append(fileInput);
    fileInput.on("change", function(theEvt)
      {
        var thefile = theEvt.target.files[0];
        var reader = new FileReader();
        reader.onload = function(evt)
        {
          // can't do this with new undo
          //restorePoints.push(evt.target.result);
          //undo();
        };
        reader.readAsDataURL(thefile);
      }
    );
  }
  fileInput.get(0).click();
}

var theAlphabet = "36QtfkmuFds0UjlvCGIXZ125bEMhz48JSYgipwKn7OVHRBPoy9DLWaceqxANTr";
// Game IDs will never contain these symbols: u 0U lv I J i V o
// So they are base 52 for some reason...

function decTo62(n)
{
  var b = theAlphabet;
  var result = '';
  var bLen = b.length;
  while (n != 0) {
    var q = n % bLen;
    result = b[q] + result;
    n = (n - q) / bLen;
  }
  return result;
}

function _62ToDec(n)
{
  n = n.toString();
  var b = theAlphabet;
  var cache_pos = {};
  var bLen = b.length;
  var result = 0;
  var pow = 1;
  for (var i = n.length-1; i >= 0; i--) {
    var c = n[i];
    if (typeof cache_pos[c] == 'undefined') {
      cache_pos[c] = b.indexOf(c);
    }
    result += pow * cache_pos[c];
    pow *= bLen;
  }
  return result;
}

window.scrambleID = scrambleID;
function scrambleID(num)
{
  return decTo62(parseInt(num, 10) + 3521614606208).split("").reverse().join("");
}

window.unscrambleID = unscrambleID;
function unscrambleID(str)
{
  return _62ToDec(str.split("").reverse().join("")) - 3521614606208;
}

window.drawingHint = drawingHint;
function drawingHint()
{
  var gp = $(".gamepanel");
  if (!gp.length) return;
  var id = gp.attr("src").match(/\d+/)[0];
  $.ajax(
    {
      url: '/panel/get.json?panelid=' + id,
      complete: function(result)
      {
        result = JSON.parse(result.responseText);
        
        alert("Title: " + result.data.title + "\nImage: http://drawception.com" + result.data.image);
      }
    }
  );
}

window.dataToCanvas = dataToCanvas;
function dataToCanvas()
{
  var url = prompt("Enter data:URI of the image you want to paste");
  if (url)
  {
    var img = new Image();
    if (url.indexOf("http://") != -1 && url.indexOf("//drawception.com/") == -1) img.crossOrigin = "Yes please";
    img.src = url;
    img.onload = function()
    {
      var oo = drawApp.context.globalCompositeOperation;
      drawApp.context.globalCompositeOperation = "copy";
      drawApp.context.drawImage(this, 0, 0, drawApp.context.canvas.width, drawApp.context.canvas.height);
      drawApp.context.globalCompositeOperation = oo;
      save();
    };
  }
}

function valueToHex(val)
{
  return (Math.floor(val/16)%16).toString(16)+(Math.floor(val)%16).toString(16);
}

function eyedropper(x, y)
{
  var p = drawApp.context.getImageData(x, y, 1, 1).data;
  return (p[3] > 0) ? ("#" + valueToHex(p[0]) + valueToHex(p[1]) + valueToHex(p[2])) : null;
}

function invertColor(c)
{
  // Support only hex color
  if (c.charAt(0) != "#") return c;
  c = c.substring(1);
  // Ensure it's in long form
  if (c.length == 3) c = c.charAt(0) + c.charAt(0) + c.charAt(1) + c.charAt(1) + c.charAt(2) + c.charAt(2);
  return "#" + ("000000" + (parseInt(c, 16) ^ 0xFFFFFF).toString(16)).slice(-6);
}

function dbg()
{
  if (!__DEBUG__) return;
  var out = [];
  for (var i = 0; i < arguments.length; i++)
  {
    out.push(arguments[i]);
  }
  __DEBUG__.innerHTML = out.join(", ");
}

function pageEnhancements()
{
  __DEBUG__ = document.getElementById("_debug_");
  prestoOpera = jQuery.browser.opera && (parseInt(jQuery.browser.version, 10) <= 12);
  firefox4OrOlder = jQuery.browser.mozilla && (parseInt(jQuery.browser.version, 10) < 5);
  var loc = document.location.href;
  var scroll = $("#content").scrollTop();

  // Stop tracking me! Best to block
  // api.mixpanel.com and cdn.mxpnl.com
  if (typeof mixpanel != "undefined") mixpanel = {track: function(){}, identify: function(){}};

  loadScriptSettings();

  try
  {
    var tmpuserlink = $(".glyphicon-user").parent();
    username = tmpuserlink.text().trim();
    userid = tmpuserlink.attr("href").match(/\/player\/(\d+)\//)[1];
    // Fix keyboard scrolling without clicking on the window
    $("#content a[href='/play/']").get()[0].focus();
  }
  catch(e){}

  var insandbox = loc.match(/drawception\.com\/sandbox\/$/);
  var inplay = loc.match(/drawception\.com\/play\/$/);
  if (insandbox || inplay || __DEBUG__)
  {
    enhanceCanvas(insandbox);
  }
  if (inplay || __DEBUG__)
  {
    empowerPlay();
  }
  if (loc.match(/drawception\.com\/viewgame\//))
  {
    betterView();
  }
  if (loc.match(/drawception\.com\/panel\//))
  {
    betterPanel();
  }
  if (loc.match(/drawception\.com\/player\//))
  {
    betterPlayer();
  }
  if (loc.match(/drawception\.com\/forums\//))
  {
    betterForum();
  }
  if (loc.match(/drawception\.com\/settings\//))
  {
    addScriptSettings();
  }
  GM_addStyle(
    ".thumbnail > .panel-details {max-height: 30px}" +
    ".gpe-wide {display: none}" +
    ".gpe-btn {padding: 5px 8px; height: 28px}" +
    ".gpe-spacer {margin-right: 7px; float:left}" +
    "@media (min-width:992px) {#open-left {display: none} .gpe-wide {display: inline}}" +
    "@media (min-width:1200px) {.gpe-btn {padding: 5px 16px;} .gpe-spacer {margin-right: 20px;}}" +
    "#anbtver {font-size: 10px; position:absolute; opacity:0.3; right:10px; top:50px}" +
    ".anbt_paneldel {position:absolute; padding:1px 6px; color:#FFF; background:#d9534f; text-decoration: none !important; right: 18px; border-radius: 5px}" +
    ".anbt_paneldel:hover {background:#d2322d}" +
    ".anbt_favpanel {top: 40px; font-weight: normal; padding: 4px 2px}" +
    ".anbt_favpanel:hover {color: #d9534f; cursor:pointer}" +
    ".anbt_favedpanel {color: #d9534f; border-color: #d9534f}" +
    ""
  );
  // Enhance menu for higher resolutions
  var p = $("#open-left").parent();
  //p.prepend('<a href="/" class="gpe-wide" style="float:left; margin-right:8px"><img src="/img/logo-sm.png" width="166" height="43" alt="drawception" /></a>');
  p.append('<span class="gpe-wide gpe-spacer">&nbsp</span>');
  p.append('<a href="/sandbox/" class="gpe-wide gpe-btn btn btn-success navbar-btn navbar-user-item" style="background:#5A5"><span class="glyphicon glyphicon-edit" style="color:#BFB" title="Sandbox" /></a>');
  p.append('<a href="/browse/all-games/" class="gpe-wide gpe-btn btn btn-success navbar-btn navbar-user-item"><span class="glyphicon glyphicon-folder-open" title="Browse Games" /></a>');
  p.append('<a href="/contests/" class="gpe-wide gpe-btn btn btn-success navbar-btn navbar-user-item"><span class="glyphicon glyphicon-tower" title="Contests" /></a>');
  p.append('<a href="javascript:toggleLight()" class="gpe-wide gpe-btn btn btn-success navbar-btn navbar-user-item" style="background:#AA5"><span class="glyphicon glyphicon-eye-open" style="color:#FFB" title="Toggle light" /></a>');
  p.append('<a href="/leaderboard/" class="gpe-wide gpe-btn btn btn-success navbar-btn navbar-user-item"><span class="glyphicon glyphicon-fire" title="Leaderboards" /></a>');
  p.append('<a href="/faq/" class="gpe-wide gpe-btn btn btn-success navbar-btn navbar-user-item"><span class="glyphicon glyphicon-info-sign" title="FAQ" /></a>');
  p.append('<a href="/forums/" class="gpe-wide gpe-btn btn btn-success navbar-btn navbar-user-item" style="background:#55A"><span class="glyphicon glyphicon-comment" style="color:#BBF" title="Forums" /></a>');
  p.append('<a href="/search/" class="gpe-wide gpe-btn btn btn-success navbar-btn navbar-user-item"><span class="glyphicon glyphicon-search" title="Search" /></a>');
  p.append('<a href="/settings/" class="gpe-wide gpe-btn btn btn-success navbar-btn navbar-user-item"><span class="glyphicon glyphicon-cog" title="Settings" /></a>');
  p.append('<a href="/account/logout/" class="gpe-wide gpe-btn btn btn-success navbar-btn navbar-user-item" style="background:#A55"><span class="glyphicon glyphicon-log-out" style="color:#FBB" title="Log Out" /></a>');

  // Make new notifications actually discernable from the old ones
  var num = $("#user-notify-count").text().trim();
  GM_addStyle(
    "#user-notify-list .list-group .list-group-item .glyphicon {color: #888}" +
    "#user-notify-list .list-group .list-group-item:nth-child(-n+" + num + ") .glyphicon {color: #2F5}" +
    "a.wrong-order {color: #F99} div.comment-holder:target {background-color: #DFD}" +
    "#comments .comment-new .text-muted:after {content: 'New'; color: #2F5; font-weight: bold; background-color: #183; border-radius: 9px; display: inline-block; padding: 0px 6px; margin-left: 10px;}"
  );

  // Fix usability in Opera and old Firefox browsers
  if (prestoOpera || firefox4OrOlder)
  {
    $(".snap-drawers").remove();
    GM_addStyle(
      ".snap-content {position: static !important}" +
      "a.list-group-item:focus {background-color: #555 !important}" // CSS bug on the site
    );
    // Remake the notification list into a modal dialog
    $("#user-notify-list").remove();
    $(document.body).append(
      '<div class="modal fade" id="myNotifications" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog">' +
          '<div class="modal-content">' +
            '<div class="modal-header">' +
              '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
              '<h4 class="modal-title">Notifications</h4>' +
            '</div>' +
            '<div id="user-notify-list" class="modal-body" style="background-color: #333">' + // Ugly hack to make background visible
            '</div>' +
            '<div class="modal-footer">' +
              '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
    $("#open-right").attr({"data-toggle": "modal", "href": "#myNotifications"});
  }
  // Restore scroll position
  $("html").scrollTop(scroll);

  // Show an error if it occurs instead of "loading forever"
  window.getNotifications = function()
  {
    if (!notificationsOpened)
    {
      $("#user-notify-list").html('<img src="/img/loading.gif" alt="Loading...."/>');
      $.ajax(
        {
          url: "/notification/view/",
          cache: false,
          error: function(e)
          {
            $("#user-notify-list").html(e.statusText);
            notificationsOpened = true;
          },
          success: function (e)
          {
            $("#user-notify-list").html(e);
            $("#user-notify-count").text("0");
            notificationsOpened = true;
          }
        }
      );
    }
  };

  var jsVersion, cssVersion, versionDisplay;
  try
  {
    jsVersion = $('script[src*="script-ck.js"]').attr("src").match(/\?v=([^&]+)/)[1];
    cssVersion = $('head link[href*="main.css"]').attr("href").match(/\?v=([^&]+)/)[1];
    versionDisplay = "ANBT v" + SCRIPT_VERSION + " | js v" + jsVersion + " | css v" + cssVersion;
  } catch(e)
  {
    versionDisplay = "ANBT v" + SCRIPT_VERSION + " | js/css unknown";
  }
  $("#navbar-user").append('<div id="anbtver">' + versionDisplay + '</div>');
  
  window.onbeforeunload = function() {if ($("#drawingCanvas").length && painted) return "Did you finish drawing?";};

  if (options.loadChat)
  {
    $.ajax(
      {
        dataType: "script",
        cache: true,
        url: "http://chat.grompe.org.ru/jappix-mini.js"
      }
    ).success(function()
    {
      MINI_GROUPCHATS = ["drawception"];
      MINI_GROUPCHATS_NOCLOSE = ["drawception@chat.grompe.org.ru"];
      MINI_NICKNAME = username;
      MINI_RESOURCE = userid + "/jm" + Math.random().toString(36).slice(1, 5);
      launchMini(Boolean(options.chatAutoConnect), true, "ip");
    });
  }
}

var mark = document.createElement("b");
mark.id = "_anbt_";
mark.style = "display:none";
document.body.appendChild(mark);

pageEnhancements();

} // wrapped

// From http://userstyles.org/styles/93911/dark-gray-style-for-drawception-com
localStorage.setItem("gpe_darkCSS",
  ("a{color:#77c0ff$}.wrapper{~#444$}#nav-drag{~#353535$}.btn-default{~#7f7f7f$;border-bottom-color:#666$;border-left-color:#666$;border-right-color:#666$;border-top-color:#666$;color:#CCC$}" +
  ".btn-default:hover,.btn-default:focus,.btn-default:active,.btn-default.active,.open .dropdown-toggle.btn-default{~#757575$;border-bottom-color:#565656$;border-left-color:#565656$;border-right-color:#565656$;border-top-color:#565656$;color:#DDD$}" +
  ".btn-success{~#2e2e2e$;border-bottom-color:#262626$;border-left-color:#262626$;border-right-color:#262626$;border-top-color:#262626$;color:#CCC$}" +
  ".btn-success:hover,.btn-success:focus,.btn-success:active,.btn-success.active,.open .dropdown-toggle.btn-success{~#232323$;border-bottom-color:#1c1c1c$;border-left-color:#1c1c1c$;border-right-color:#1c1c1c$;border-top-color:#1c1c1c$;color:#DDD$}" +
  ".btn-primary{~#212184$;border-bottom-color:#1a1a68$;border-left-color:#1a1a68$;border-right-color:#1a1a68$;border-top-color:#1a1a68$;color:#CCC$}" +
  ".btn-primary:hover,.btn-primary:focus,.btn-primary:active,.btn-primary.active,.open .dropdown-toggle.btn-primary{~#191964$;border-bottom-color:#141450$;border-left-color:#141450$;border-right-color:#141450$;border-top-color:#141450$;color:#DDD$}" +
  ".btn-info{~#2d8787$;border-bottom-color:#236969$;border-left-color:#236969$;border-right-color:#236969$;border-top-color:#236969$;color:#CCC$}" +
  ".btn-info:hover,.btn-info:focus,.btn-info:active,.btn-info.active,.open .dropdown-toggle.btn-info{~#1c5454$;border-bottom-color:#133939$;border-left-color:#133939$;border-right-color:#133939$;border-top-color:#133939$;color:#DDD$}" +
  ".navbar-default .navbar-toggle:hover,.navbar-default .navbar-toggle:focus{~#3b3b3b$}.navbar-toggle{~#393939$}.navbar{border-bottom:1px solid #000$}.forum-thread-starter,.breadcrumb,.regForm{~#555$}" +
  ".form-control{~#555$;border:1px solid #000$;color:#EEE$}code,pre{~#656$;color:#FCC$}body{color:#EEE$}footer{~#333$;border-top:1px solid #000$}" +
  ".pagination>li>a:hover,.pagination>li>span:hover,.pagination>li>a:focus,.pagination>li>span:focus{~#444$}.pagination>li>a,.pagination>li>span{~#555$;border:1px solid #000$}" +
  ".pagination>.active>a,.pagination>.active>span,.pagination>.active>a:hover,.pagination>.active>span:hover,.pagination>.active>a:focus,.pagination>.active>span:focus{~#666$;border-top:1px solid #444$;border-bottom:1px solid #444$}" +
  ".drawingForm{~#555$}.well{~#666$;border:1px solid #333$}#timeleft{color:#AAA$}legend{border-bottom:1px solid #000$}.thumbnail{~#555$}.panel-number,.modal-content,.profile-user-header{~#555$}" +
  "#commentForm{~#555$;border:1px solid #000$}.comment-holder,.modal-header,.nav-tabs{border-bottom:1px solid #000$}hr,.modal-footer{border-top:1px solid #000$}" +
  ".store-item{~#666$;~-moz-linear-gradient(top,#666 0,#333 100%)$;~-webkit-gradient(linear,left top,left bottom,color-stop(0,#666),color-stop(100%,#333))$;~-webkit-linear-gradient(top,#666 0,#333 100%)$;~-o-linear-gradient(top,#666 0,#333 100%)$;~-ms-linear-gradient(top,#666 0,#333 100%)$;~linear-gradient(to bottom,#666 0,#333 100%)$;border:1px solid #222$}" +
  ".store-item:hover{border:1px solid #000$}.store-item-title{~#222$;color:#DDD$}.store-title-link{color:#DDD$}.profile-award{~#222$}.profile-award-unlocked{~#888$}.progress-bar{color:#CCC$;~#214565$}.progress{~#333$}" +
  ".progress-striped .progress-bar{background-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(.25,rgba(0,0,0,0.15)),color-stop(.25,transparent),color-stop(.5,transparent),color-stop(.5,rgba(0,0,0,0.15)),color-stop(.75,rgba(0,0,0,0.15)),color-stop(.75,transparent),to(transparent))$;background-image:-webkit-linear-gradient(45deg,rgba(0,0,0,0.15) 25%,transparent 25%,transparent 50%,rgba(0,0,0,0.15) 50%,rgba(0,0,0,0.15) 75%,transparent 75%,transparent)$;background-image:-moz-linear-gradient(45deg,rgba(0,0,0,0.15) 25%,transparent 25%,transparent 50%,rgba(0,0,0,0.15) 50%,rgba(0,0,0,0.15) 75%,transparent 75%,transparent)$;background-image:linear-gradient(45deg,rgba(0,0,0,0.15) 25%,transparent 25%,transparent 50%,rgba(0,0,0,0.15) 50%,rgba(0,0,0,0.15) 75%,transparent 75%,transparent)$}" +
  ".nav-tabs>li.active>a,.nav-tabs>li.active>a:hover,.nav-tabs>li.active>a:focus{color:#DDD$;~#555$;border:1px solid #222$}.nav>li>a:hover,.nav>li>a:focus{~#333$;border-bottom-color:#222$;border-left-color:#111$;border-right-color:#111$;border-top-color:#111$}" +
  ".nav>li.disabled>a,.nav>li.disabled>a:hover,.nav>li.disabled>a:focus{color:#555$}.table-striped>tbody>tr:nth-child(2n+1)>td,.table-striped>tbody>tr:nth-child(2n+1)>th{~#333$}" +
  ".table-hover>tbody>tr:hover>td,.table-hover>tbody>tr:hover>th{~#555$}.table thead>tr>th,.table tbody>tr>th,.table tfoot>tr>th,.table thead>tr>td,.table tbody>tr>td,.table tfoot>tr>td{border-top:1px solid #333$}.news-alert{~#555$;border:2px solid #444$}" +
  ".btn-menu{~#2e2e2e$}.btn-menu:hover{~#232323$}.btn-yellow{~#8a874e$}.btn-yellow:hover{~#747034$}" +
  "a.label{color:#fff$}a.text-muted{color:#999$}a.wrong-order{color:#F99$}div.comment-holder:target{~#454$}" +
  "#jappix_mini a{color:#000$}" +
  // Some lamey compression method!
  "").replace(/~/g, "background-color:").replace(/\$/g, " !important")
);

if (parseInt(localStorage.getItem("gpe_inDark"), 10) == 1)
{
  var css = document.createElement("style");
  css.id = "darkgraycss";
  css.type = "text/css";
  css.appendChild(document.createTextNode(localStorage.getItem("gpe_darkCSS")));
  if (document.head)
  {
    document.head.appendChild(css);
  } else {
    var darkLoad = setInterval(
      function()
      {
        if (!document.head) return;
        document.head.appendChild(css);
        clearInterval(darkLoad);
      },
      100
    );
  }
}

function anbtLoad()
{
  if (document.getElementById("_anbt_")) return;
  var script = document.createElement("script");
  script.textContent = "(" + wrapped.toString() + ")();";
  document.body.appendChild(script);
  return true;
}

if (document.getElementById("content"))
{
  anbtLoad();
  if (opera && parseInt(localStorage.getItem("gpe_operaWarning"), 10) != 1)
  {
    var w = document.createElement("h2");
    w.innerHTML = "ANBT speaking:<br/>Rename your script file so it doesn't contain \".user.\" part for smoother loading!<br/>This warning is only shown once.";
    var m = document.getElementById("main");
    m.insertBefore(w, m.firstChild);
    localStorage.setItem("gpe_operaWarning", 1);
  }
}
document.addEventListener("DOMContentLoaded", anbtLoad, false);
