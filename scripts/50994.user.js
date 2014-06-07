// ==UserScript==
// @name           YouTube Perfect - Previews, mp4/flash, HQ/HD, download
// @namespace      http://victorpimentel.com/
// @description    No autoplay; buttons to play HD/HQ with MP4 or Flash plugin; download.
// @include        http://208.65.153.238/*
// @include        http://208.65.153.238/watch*
// @author         Victor Pimentel <victor.pimentel@gmail.com>
// @copyright      2009 by Victor Pimentel
// @license        Public Domain
// @version        1.1
// @lastupdated    2009-04-08
// ==/UserScript==*/

// Wrap everything in an anonymous function because this script doesn't run
// in a wrapper when used in GreaseKit or other contexts other than Firefox
(function(){

// PREVIEWS:  true: avoid autoplay with previews.  false: allow autoplay.
var previews = true;

// EMBED:   true: use MP4 plug-in.  false: use the youtube flash player.
var embed = true;

// HD SUPPORT:  true: force HD when available.  false: never force HD.
var hdSupport = true;

// AUTO EXPAND:  true: always expand videos.  false: don't expand videos but HD.
var autoExpand = true;

// CORRECT 4:3:  true: expand 4:3 videos to fill all width.  false: don't expand.
var correct43 = true;

// AUTO LIGHTS OUT:  true: auto-trigger lights out.  false: don't.
var autoLightsOut = true;

// HIDE COMMENTS:  true: hide youtube comments.  false: show them.
var hideComments = true;

// HIDE ANNOTATIONS:  true: hide youtube annotations.  false: show them.
var hideAnnotations = true;

// BUTTON STYLE:  true: blue buttons.  false: yellow buttons.
var buttonStyle = true;

// AUTO CHECK UPDATES:  true: auto check updates.  false: ignore updates.
var autoCheckUpdates = true;

// DEBUG MODE:  true: generate logs.  false: ignore logs.
var debugMode = false;

/////////////////////////////////////////////////////////

// LOCALIZATION (Send me your translations if you want)
var lang = document.getElementsByTagName('html')[0].getAttribute('lang');

// Spanish
if (lang == 'es') {

  var playMP4 = 'Reproducir MP4';
  var playFlash = 'Reproducir Flash';
  var stop = 'Detener';
  var expand = 'Expandir';
  var contract = 'Contraer';
  var hdOn = 'HD activado';
  var hdOff = 'HD desactivado';
  var download = 'Descargar';
  var optionsMenu = 'Opciones';
  var optionsTooltip = 'Haz click para cambiar esta opción';
  var update = 'Actualizar Script';
  var previewsOption = 'Desactivar reproducción automática';
  var embedOption = 'Cambiar Flash por MP4';
  var hdSupportOption = 'HD por defecto';
  var autoExpandOption = 'Expandir todos los vídeos';
  var correct43Option = 'Corregir vídeos en 4:3';
  var autoLightsOutOption = 'Activar modo "luces fuera"';
  var hideCommentsOption = 'Ocultar comentarios';
  var hideAnnotationsOption = 'Ocultar anotaciones';
  var buttonStyleOption = 'Usar botones azules';
  var autoCheckUpdatesOption = 'Comprobar actualizaciones';
  var debugModeOption = 'Activar modo desarrollador';

// German (Thanks to Lucas Bares http://luke-b.com )
} else if (lang == 'de') {

  var playMP4 = 'MP4 abspielen';
  var playFlash = 'Flash abspielen';
  var stop = 'Stop';
  var expand = 'Vergrößern';
  var contract = 'Verkleinern';
  var hdOn = 'HD an';
  var hdOff = 'HD aus';
  var download = 'Herunterladen';
  var optionsMenu = 'Optionen';
  var optionsTooltip = 'Klicken Sie auf, um diese Option';
  var update = 'Script Aktualisieren';
  var previewsOption = 'Autoplay deaktivieren';
  var embedOption = 'Veränderung Flash für MP4';
  var hdSupportOption = 'HD Videos spielen';
  var autoExpandOption = 'Alle Videos vergrößern';
  var correct43Option = '4:3 Videos korrigieren';
  var autoLightsOutOption = 'Weniger Licht';
  var hideCommentsOption = 'Kommentare ausblenden';
  var hideAnnotationsOption = 'Anmerkungen ausblenden';
  var buttonStyleOption = 'Blaue Buttons verwenden';
  var autoCheckUpdatesOption = 'Aktualisierungen suchen';
  var debugModeOption = 'Debug Modus aktivieren';

// English
} else {

  var playMP4 = 'Play MP4';
  var playFlash = 'Play Flash';
  var stop = 'Stop';
  var expand = 'Expand';
  var contract = 'Contract';
  var hdOn = 'HD on';
  var hdOff = 'HD off';
  var download = 'Download';
  var optionsMenu = 'Options';
  var optionsTooltip = 'Click to toggle this option';
  var update = 'Update Script';
  var previewsOption = 'Disable autoplay';
  var embedOption = 'Change Flash with MP4';
  var hdSupportOption = 'Enable HD';
  var autoExpandOption = 'Expand all videos';
  var correct43Option = 'Correct 4:3 videos';
  var autoLightsOutOption = 'Enable lights out';
  var hideCommentsOption = 'Hide comments';
  var hideAnnotationsOption = 'Hide annotations';
  var buttonStyleOption = 'Use blue buttons';
  var autoCheckUpdatesOption = 'Check for updates';
  var debugModeOption = 'Enable debug mode';

}

// Actual Window
var myWindow;

if (typeof(unsafeWindow) != "undefined") {
  myWindow = unsafeWindow;
} else {
  myWindow = window;
}

// Is the video widescreen?
var wideView = false;

if (typeof(isWidescreen) != "undefined" && isWidescreen) {
  wideView = true;
} else if (myWindow.isWidescreen) {
  wideView = true;
}

// Is the video in HD?
var hdAvailable = false;

if (typeof(isHDAvailable) != "undefined" && isHDAvailable) {
  hdAvailable = true;
} else if (myWindow.isHDAvailable) {
  hdAvailable = true;
}

/////////////////////////////////////////////////////////

// UTILITIES:  to ensure Cross-browser compatibility

// Shortcut for getElementById
function $(id) {
  return typeof id == 'string' ? document.getElementById(id) : id;
}

// Shortcut for createElement
function $E(name, attributes, content) {
  if (typeof attributes == 'string') {
    content = attributes;
    attributes = null;
  }
  var node = document.createElement(name);
  if (attributes) for (var attr in attributes) node.setAttribute(attr, attributes[attr]);
  if (content) node.innerHTML = content;
  return node;
}

// Add a style, no matter if we are in GreaseMonkey or GreaseKit
function addStyle(css) {
  if (typeof GM_addStyle == 'function') {
    GM_addStyle(css);
  } else {
    if (!styleElement) {
      var head = document.getElementsByTagName('head')[0];
      var styleElement = $E('style', { type: 'text/css' });
      head.appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}

// Add a log, no matter if we are in GreaseMonkey or GreaseKit
function log(message) {
  if (debugMode) {
    for (var i = 1; i < arguments.length; i++)
      message = message.replace('%s', arguments[i]);

    if (typeof GM_log == 'function') GM_log(message);
    else if (window.console) console.log(message);
    else if (window.opera) window.opera.postError(message);
    else alert(message);
  }
}

// Greasemonkey functions that can be implemented
if (typeof GM_getValue == 'function') {
  var getValue = GM_getValue;
  var setValue = GM_setValue;
  var xhr = GM_xmlhttpRequest;
  var firefox = true;
} else {
  var setValue = function (name, value) {
    document.cookie = [
      name, '=', escape(value), ';expires=',
      (new Date(new Date().getTime() + 365 * 1000 * 60 * 60 * 24)).toGMTString()
      ].join('');
  };
  var getValue = function (name, defaultValue) {
    var r = new RegExp(name + '=([^;]*)'), m;
    if (m = document.cookie.match(r)) {
      var dirty = unescape(m[1]);
      if (dirty == "true") {
        return true;
      } else if (dirty == "false") {
        return false
      } else {
        return dirty;
      }
    }
    return defaultValue;
  }
  var xhr = function(params) { return null }
  var firefox = false;
  autoCheckUpdates = false;
}

/////////////////////////////////////////////////////////

// SPECIFIC FUNCTIONS:  they only make sense in this context

// Generate an HTML button
function buildButton(text, id, target) {

  // Create the button (it's a normal link)
  var l = $E('a',
    { 'id': id,
      'href': target != null ? target : 'javascript:void(0);',
      'class': 'yt-button yt-button-' +
            (id == 'update' ? 'urgent' : (buttonStyle ? 'primary' : 'urgent'))
    },
    '<span>' + text + '</span>');

  // Create a container TD
  var n = $E('td', { 'id': id + '_td' });

  // Append the link to the TD
  n.appendChild(l);

  // Return the TD node
  return n;

}

// Generate the lights-out button
function buildLightsOutButton() {

  // Create the button (it's a normal link)
  var l = $E('a',
    { 'id': 'lightsout',
      'class': 'lights-off',
      'href': 'javascript:void(0);'
    });

  // Create a container TD
  var n = $E('td', { 'id': 'lightsout_td' });

  // Append the link to the TD
  n.appendChild(l);

  // Return the TD node
  return n;

}

// Generate the player
function buildPlayer(player) {

  // Enable lights out if desired
  if (autoLightsOut) lightsOut();

  setTimeout(
    (function() {
      // Change the dimensions, if necessary
      if (height != '385')
        player = player.replace(/(height=")385/g, "$1" + height);

      // Set the player and its height
      $('watch-player-div').innerHTML = player;
      $('watch-player-div').style.height = height + 'px';

      // Get some elements
      var flash = $('movie_player');
      var mp4 = $('mp4-player');
      var mode = $('hdplay').innerHTML;

      // If the player is the Flash version, force HQ if desired
      if (flash) {
        if (hdState || (hdSupport && !hdAvailable)) {
          setTimeout('_gel("movie_player").setPlaybackQuality(yt.VideoQualityConstants.HIGH);', 1000);
          log('Changing Flash version to HQ.');
        }
        if (mode.match(contract)) {
          // Trick to force wideview
          setTimeout('toggleWidePlayer(true)', 3000);
        }
        if (correct43 && mode.match(expand)) {
          flash.style.height = height + 'px';
          flash.height = height + 'px';
        }
      // If not, it is the MP4 version, so only set its height if is HD
      } else if (hdState) {
        setTimeout('toggleWidePlayer(true)', 1);
        mp4.height = '575px';
        mp4.width = '960px';
        log('Changing MP4 version to HD.');
      // Fix it if HD is available but the user wants it disabled
      } else if (!hdState && hdAvailable) {
        mp4.src = mp4.src.replace(/fmt=22/g, 'fmt=18');
        if (mode.match(contract)) {
          // Trick to force wideview mode
          setTimeout('toggleWidePlayer(true)', 1);
          mp4.height = '575px';
          mp4.width = '960px';
        }
      } else if (mode.match(contract)) {
        // Trick to force wideview mode
        setTimeout('toggleWidePlayer(true)', 1);
        mp4.height = '575px';
        mp4.width = '960px';
      }

    }),
  10);
}

// Stop the player, show the previews
function stopPlayer() {
  // Little trick to revert the size of the video if we were in HD mode
  setTimeout('toggleWidePlayer(false)', 1);
  setTimeout(
    (function() {
      video_player.innerHTML = '';
      video_player.appendChild(play_video_link);
      $('watch-player-div').style.height = '385px';
    }),
  10);
}

// Stop the player, show the previews (very tricky)
function toggleHD() {

  // Player (flash or mp4) and play mode
  var flash = $('movie_player');
  var mp4 = $('mp4-player');
  var mode = $('hdplay').innerHTML;

  // First, we face the case when we were in HD
  if (hdState) {
    // Toggle HD state
    hdState = !hdState;

    // Change the text in the button
    $('hdplay').innerHTML = $('hdplay').innerHTML.
      replace('>' + hdOn + '<', '>' + hdOff + '<');

    // Change the quality in the flash or mp4 player
    if (flash) {
      setTimeout('_gel("movie_player").setPlaybackQuality(yt.VideoQualityConstants.LOW);', 1);
    } else if (mp4) {
      setTimeout('toggleWidePlayer(false)', 1);
      mp4.src = mp4.src.replace(/fmt=22/g, 'fmt=18');
      mp4.height = height + 'px';
      mp4.width = '640px';
      // Trick to force repainting in Safari
      if (!firefox) buildPlayer(mp4.parentNode.innerHTML);
    }

  // The case when we want to expand the video (only in non-HD videos)
  } else if (mode.match(expand)) {
    // Change the text in the button
    $('hdplay').innerHTML = $('hdplay').innerHTML.
      replace('>' + expand + '<', '>' + contract + '<');

    // Change the size of the flash or mp4 player
    if (flash) {
      setTimeout('toggleWidePlayer(true)', 1);
    } else if (mp4) {
      setTimeout('toggleWidePlayer(true)', 1);
      mp4.height = '575px';
      mp4.width = '960px';
    }

  // The case when we want to contract a video (only in non-HD videos)
  } else if (mode.match(contract)) {
    // Change the text in the button
    $('hdplay').innerHTML = $('hdplay').innerHTML.
      replace('>' + contract + '<', '>' + expand + '<');

    // Change the size of the flash or mp4 player
    if (flash) {
      setTimeout('toggleWidePlayer(false)', 1);
      flash.style.height = height + 'px';
      flash.height = height + 'px';
    } else if (mp4) {
      setTimeout('toggleWidePlayer(false)', 1);
      mp4.height = height + 'px';
      mp4.width = '640px';
    }

  // And finally, the case when we want HD
  } else {
    // Toggle HD state
    hdState = !hdState;

    // Change the text in the button
    $('hdplay').innerHTML = $('hdplay').innerHTML.
      replace('>' + hdOff + '<', '>' + hdOn + '<');

    // Change the quality in the flash or mp4 player
    if (flash) {
      setTimeout('_gel("movie_player").setPlaybackQuality(yt.VideoQualityConstants.HIGH);', 1);
    } else if (mp4) {
      setTimeout('toggleWidePlayer(true)', 1);
      mp4.src = mp4.src.replace(/fmt=18/g, 'fmt=22');
      mp4.height = '575px';
      mp4.width = '960px';
      // Trick to force repainting in Safari
      if (!firefox) buildPlayer(mp4.parentNode.innerHTML);
    }
  }

}

// Expand the player for 4:3 videos
function expandPlayer() {

  // Height of the player
  height = '520';

  // Change the height of MP4 and/or Flash versions
  if ($('mp4-player')) {
    $('mp4-player').height = height + 'px';
    $('watch-player-div').style.height = height + 'px';
  }
  if ($('movie_player')) {
    $('movie_player').style.height = height + 'px';
    $('movie_player').height = height + 'px';
    $('watch-player-div').style.height = height + 'px';
  }

}

// Toggle the lights
function lightsOut() {

  // Get the image link that triggers this method
  var lights = $('lightsout');

  // Get the image that cover the page (if created previously)
  var lightsImg = $('img-lights-out');

  // Image that will put a dark gray overlay
  var mediumImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUAAACnej3aAAAAAXRSTlPNpTNmawAAAA5JREFUGJVjYBgFgwkAAAGQAAHY85U/AAAAAElFTkSuQmCC';

  // Image that will put a 100% black overlay
  var outImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUCAgJ4xuoaAAAADklEQVQYlWNgGAWDCQAAAZAAAdjzlT8AAAAASUVORK5CYII=';

  // Change the link image to show lights-out mode is on
  lights.className = 'lights-on';

  // Create an special image
  var imgLightsOut = $E('img',
    { 'id': 'img-lights-out',
      'src': outImg,
      'style': 'position:absolute;top:0;left:0;width:100%;height:' +
               document.height + 'px;z-index:100;' });

  // When the user clicks on the overlay, we want to darken it the first time
  // and erase it the second time
  imgLightsOut.addEventListener('click', function (e) {
      if ($('img-lights-out').src != outImg) {
        $('img-lights-out').src = outImg;
      } else {
        $('lightsout').className = 'lights-off';
        document.body.removeChild($('img-lights-out'));
      }
    }, false);

  // Put the image on the page
  document.body.appendChild(imgLightsOut);

  // Navigate nicely to the title of the page
  location.replace(location.href.replace(location.hash, '') + '#watch-vid-title');

}

// Insert the Options menu
function insertOptionsMenu() {

  // Searching for the menubar
  var menuItems = document.getElementsByClassName('util-item');
  var lastMenuItem = menuItems.item(menuItems.length-1);
  var parentMenu = lastMenuItem.parentNode;
  var newMenuItem = $E('span', { 'id' : 'options-link', 'class': 'basic-dropdown-link util-item' });

  // Custom images for the options menu
  var checkedImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAN9JREFUeNpifHTxobvhs+sMCKCpyXAdyA8WZfr68ofLYtV79/Wv39a9ft/g+nlZY0H25m5uhmt/mYAKxQQ4OHhY+AXY+HmYjlQ+fhOnEG3PwXCdASTHwPr35dk3T/4w/Ln9MHWHQH8wD8P3/0BhoBwj27fv8zweHn386/D09/3HFPgZGP6CLWZhYPjPwMcXO5fTzOyyVZrUClVmuKNAZv76wyjjpxjDwJCYK8kCFmVnZQTpY2H4t2zpI9nXHLp1Al9OPd0K1vDl0nsGK0HGRw/fX7ry/TcDGmCS1hECCDAASMhNiGDcZRIAAAAASUVORK5CYII=';
  var uncheckedImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHxJREFUeNpifHTxobvhs+sMGCBYlOXryx8ui1W32nD9/PMPIsjCwvz+yj2zsr8sQI6YAAcHDwsHkh5mPhaG6wxMYPY/NPP+gkkmBtyAoBwrC5ooOysj2FEM/5YtfSz7mu33L4SGL5feM1gJMj56+P7Sle+/McyT1hECCDAASe4kkicK9k8AAAAASUVORK5CYII=';

  // To select the image that apply for that option
  var checkboxStatus = { 'true' : '<img src="' + checkedImg + '" /> ',
                         'false' : '<img src="' + uncheckedImg + '" /> ' };

  // Insert element before the last item (log-out)
  parentMenu.insertBefore(newMenuItem, lastMenuItem);

  // Generate every element we need
  var optionsLink = $('options-link');
  optionsLink.appendChild($E('div', { 'id' : 'options-dropdown', 'class': 'dropdown wasblock',
                                'style' : 'display: none' }));

  // These are the options links: note that a reload() is needed
  var optionsDropdown = $('options-dropdown');
  optionsDropdown.appendChild($E('div', { 'class': 'first' },
                                '<a id="previews-option" href="javascript:location.reload()" title="' +
                                optionsTooltip + '">' + checkboxStatus[previews] + previewsOption + '</a>'));
  optionsDropdown.appendChild($E('div', '<a id="embed-option" href="javascript:location.reload()" title="' +
                                optionsTooltip + '">' + checkboxStatus[embed] + embedOption + '</a>'));
  optionsDropdown.appendChild($E('div', '<a id="hd-support-option" href="javascript:location.reload()" title="' +
                                optionsTooltip + '">' + checkboxStatus[hdSupport] + hdSupportOption + '</a>'));
  optionsDropdown.appendChild($E('div', '<a id="auto-expand-option" href="javascript:location.reload()" title="' +
                                optionsTooltip + '">' + checkboxStatus[autoExpand] + autoExpandOption + '</a>'));
  optionsDropdown.appendChild($E('div', '<a id="correct-43-option" href="javascript:location.reload()" title="' +
                                optionsTooltip + '">' + checkboxStatus[correct43] + correct43Option + '</a>'));
  optionsDropdown.appendChild($E('div', '<a id="auto-lights-out-option" href="javascript:location.reload()" title="' +
                                optionsTooltip + '">' + checkboxStatus[autoLightsOut] + autoLightsOutOption + '</a>'));
  optionsDropdown.appendChild($E('div', '<a id="hide-comments-option" href="javascript:location.reload()" title="' +
                                optionsTooltip + '">' + checkboxStatus[hideComments] + hideCommentsOption + '</a>'));
  optionsDropdown.appendChild($E('div', '<a id="hide-annotations-option" href="javascript:location.reload()" title="' +
                                optionsTooltip + '">' + checkboxStatus[hideAnnotations] + hideAnnotationsOption + '</a>'));
  optionsDropdown.appendChild($E('div', '<a id="button-style-option" href="javascript:location.reload()" title="' +
                                optionsTooltip + '">' + checkboxStatus[buttonStyle] + buttonStyleOption + '</a>'));
  if (firefox)
  optionsDropdown.appendChild($E('div', '<a id="auto-check-updates-option" href="javascript:location.reload()" title="' +
                                optionsTooltip + '">' + checkboxStatus[autoCheckUpdates] + autoCheckUpdatesOption + '</a>'));
  optionsDropdown.appendChild($E('div', '<a id="debug-mode-option" href="javascript:location.reload()" title="' +
                                optionsTooltip + '">' + checkboxStatus[debugMode] + debugModeOption + '</a>'));

  // The actual code for the links, it is only a bunch of setValues
  $('previews-option').addEventListener('click', function(e){setValue('previews', !previews);}, false);
  $('embed-option').addEventListener('click', function(e){setValue('embed', !embed);}, false);
  $('hd-support-option').addEventListener('click', function(e){setValue('hdSupport', !hdSupport);}, false);
  $('auto-expand-option').addEventListener('click', function(e){setValue('autoExpand', !autoExpand);}, false);
  $('correct-43-option').addEventListener('click', function(e){setValue('correct43', !correct43);}, false);
  $('auto-lights-out-option').addEventListener('click', function(e){setValue('autoLightsOut', !autoLightsOut);}, false);
  $('hide-comments-option').addEventListener('click', function(e){setValue('hideComments', !hideComments);}, false);
  $('hide-annotations-option').addEventListener('click', function(e){setValue('hideAnnotations', !hideAnnotations);}, false);
  $('button-style-option').addEventListener('click', function(e){setValue('buttonStyle', !buttonStyle);}, false);
  if (firefox)
  $('auto-check-updates-option').addEventListener('click', function(e){setValue('autoCheckUpdates', !autoCheckUpdates);}, false);
  $('debug-mode-option').addEventListener('click', function(e){setValue('debugMode', !debugMode);}, false);

  // The link that will be showing always
  optionsLink.appendChild($E('div', { 'class': 'dropdown-link'},
                     '<a href="javascript:void()" class="hLink" onmouseover="dropdown(event, \
                     \'options-dropdown\', \'options-link\', \'mouseover\')">' +
                     '<img class="master-sprite" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif">' +
                     optionsMenu + '</a>'));

}

// Window's title
var lastTitle = document.title;

// Show the playback of the MP4 player on the Window's title
function showPlayback() {

  var mp4 = myWindow.document.getElementById('mp4-player');
  if (mp4) {
    var mp4Status = mp4.GetPluginStatus();
      if (mp4Status == 'Complete' || mp4Status == 'Playable') {
        var duration = formatTimeString(mp4.GetDuration() / mp4.GetTimeScale());
        var time = formatTimeString(mp4.GetTime() / mp4.GetTimeScale());
        document.title = time + ' / ' + duration;
      }
  } else if (document.title != lastTitle) {
    document.title = lastTitle;
  }

  // Repeat after one second...
  setTimeout(showPlayback, 1000);

}

// Simple function to format a seconds count
function formatTimeString(sec) {

  var timeString = "";
  var min = Math.floor(sec / 60);
  var hour = Math.floor(min / 60);

  sec = Math.floor(sec - (min * 60));
  min = Math.floor(min - (hour * 60));

  if(min<10) min = '0' + min;
  if(sec<10) sec = '0' + sec;

  if(hour > 0) timeString = hour + ':';

  timeString += min + ':' + sec;

  return timeString;

}

/////////////////////////////////////////////////////////

// MAIN:  actual code to execute

// Continue only if there's a Video Player
var video_player = $('watch-player-div');

if (video_player) {

  // Styles come first so things aren't ugly while loading
  addStyle("\
    #play_btn { position: absolute; left: 0; margin-left: 5px;\
    padding: 130px 170px; opacity: 0.6; z-index: 200; }\
    #play_btn:hover { opacity: 1; cursor: pointer; }\
    #no_play_btn { display: none; }\
    #still0 { height: 370px; margin-left: 6px; }\
    div:hover > #play_btn { opacity: 1; cursor: pointer; }\
    .stilli { display: block; padding: 0 0 5px 5px; }\
    #play_video_link { display: block; margin: 0 0 0 -6px; }\
    #watch-player-div { height: 385px; width: 640px; }\
    #control_table a { margin: 15px 5px 0; }\
    #control_table td { vertical-align: top; text-align: center; }\
    #lightsout { vertical-align: middle; white-space: nowrap;\
    text-decoration: none; display: inline-block; height: 24px; width: 32px; }\
    .lights-on { background: url(/img/lights_on_32x24.gif) no-repeat 0 0; }\
    .lights-off { background: url(/img/lights_off_32x24.gif) no-repeat 0 0; }\
    #mp4-player, #movie_player { z-index: 200 !important; position: absolute; }\
    #watch-longform-buttons { display: none; }\
    .watch-wide-mode #watch-this-vid #watch-player-div {\
    padding-left: 0px !important; height: 575px !important;}\
    .watch-wide-mode #watch-this-vid #watch-player-div #movie_player {\
    width: 960px !important; height: 575px !important; }\
    #options-link { z-index: 100; }\
    #options-link a { font-weight: bold; text-decoration: none }\
    #options-link img { height: 18px; width: 18px;\ margin: 0 5px 0 0;\
    background-position: 0 -268px }\
    #options-link a:hover img { background-position: -18px -268px }\
    #options-link #options-dropdown img { height: 9px; width: 9px;\ margin: 0 0 1px;\ }\
    #options-dropdown { left: -3em; }\
    .es_ES #options-dropdown { left: -10em; }\
    .es_MX #options-dropdown { left -6em; }\
    .de_DE #options-dropdown { left: -4em; }\
    #update_td { width: 100% }\
    #update_td * { float: right; }".
      replace(/}/g,"}\n"));

  // Get the user preferences for Greasemonkey
  // For other browsers these options have to be changed manually from above
  previews = getValue('previews', previews);
  embed = getValue('embed', embed);
  hdSupport = getValue('hdSupport', hdSupport);
  autoExpand = getValue('autoExpand', autoExpand);
  correct43 = getValue('correct43', correct43);
  autoLightsOut = getValue('autoLightsOut', autoLightsOut);
  hideComments = getValue('hideComments', hideComments);
  hideAnnotations = getValue('hideAnnotations', hideAnnotations);
  buttonStyle = getValue('buttonStyle', buttonStyle);
  autoCheckUpdates = getValue('autoCheckUpdates', autoCheckUpdates);
  debugMode = getValue('debugMode', debugMode);

  // Set the height of the player
  var height = '385';

  // Calculate the HD State
  var hdState = hdSupport && hdAvailable;

  // Remove the Channel Ad the hard way
  var ad = $('watch-channel-brand-div');
  if (ad) ad.parentNode.removeChild(ad);

  // Remove annotations
  if (hideAnnotations)
    video_player.innerHTML = video_player.innerHTML.
                               replace(/&amp;iv_module=[^&]*&/, '&').
                               replace(/&amp;iv_storage_server=[^&]*&/, '&');

  // Hide comments
  if (hideComments) {
    var com = $('watch-comment-panel');
    if (com) com.className = com.className.replace(/(^| )expanded\b/g, '');
    var res = $('watch-video-responses-children');
    if (res) res.parentNode.className = res.parentNode.className.replace(/(^| )expanded\b/g, '');
  }

  // Retrieve the video source in HQ
  var video_id = location.search.replace(/.*v=/,'').replace(/&.*/,'');
  var video_t = $('movie_player').getAttribute('flashvars').
                replace(/.*&t=/,'').replace(/&.*/,'');
  var video_src = location.protocol + '//' + location.host
                + '/get_video?video_id=' + video_id + '&t=' + video_t + '&fmt=18';

  // Set the HD source if possible
  if (hdState)
    video_src = video_src.replace(/fmt=18/,'fmt=22');

  // Generate the players
  var old_player = video_player.innerHTML;
  var new_player = '<embed id="mp4-player" type="video/mp4" src="'
        + video_src.replace(/&/g, "&amp;") + '" '
        + 'height="385" width="640" scale="aspect"></embed>';

  // Remove the video_player
  video_player.innerHTML = '';

  // Container div for the previews and button to play
  var stills = $E('div');
  var play_btn = $E('img',
        { 'id': 'play_btn',
          'src': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABkCAYAAABkW8nwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABR9JREFUeNrsm21olWUYx69z5o57OxtJUjRaTIzJYrDQtl4oyZVNhKCoL4YQBEEfRlEkQYEkfgikPknRIIIgKcSiSBwI0UASRdictjRfivVOsTE5eM42z9Z1PZ2HDoezdbZzn5c9z+8Hf89kTnguft73dd/PZUSOTMkyaNE8rtmp2ajZLBBUkppxzXHNkGZ4OT8cKVCsVs2bml2aemoeSv7SvKc5oEkUK5atUK9pXkQoyBJsr2ZQk16JWLbVHct8AuRiW+OTmsl834wu8kP9mhGkgiXYqjml6ShULGvOv9I0UTv4H2zh+TbfApQrVo/msKaGmkGBrNN8kenH84plf+ATTYxawTLpzLiTV6z9mnZqBCvE+vLnck+FZtwYWyA4uIrYoEn4K9arSAUOWO+vWrZiWdP1u3ABCm64qNkUzVwvIBW4wu61uqKZpgvAJTtNrPuoAzimx8Rqow7gejuMchqEEtAapQZQApoQC0pBDWJBSUAsQCxALEAsAMQqms/ubZSNHIYRyzVP3FYrY31x2d9ZJ01rIhiAWO6or4nI65vq5NL2uDx7B5PYiOWYW+ui8uHmBjn1cFx6buLNFmI5xqQyuT6+p0Fa6ykJYjlm1+0xufBo3NsmbbsExHKGNfTW2JtgT7XWUhDEcktbQ1QO9zbKNw81SXcL/RdiOWbrzWtkpC8u79/dIOtibI+I5Zjn22Ny9bFmefnOtRKjaojlkpbaiLzdVS9jfc3Sfwv9F2I5piMelWMPNHrpbKb/QizH2Ko1si3urWK2mgFiOcP6Leu7rP96YcNaCoJYbrET47vd9d4J0k6SiAVOsTsvu/uy8Ry7C0MscIqN59jtfVjHcxCrhGSP5+xuiyEWuMXGcz7aEq7xHMQqI/54jklmsiEWOMW2Rdsegzyeg1gVwh/P+e6RuNfoIxY4pb0x6l1NBG08B7GqBLtUPbMt7l2yBmE8B7GqCGu37LWQP56zmtsvxKpC/hvPia/a8RzEqmJi0dW7ZPG2tAqZnluQfRdScvDKjMzOIxY44IOfZmXP+aRMzi6s6udArCph+O8b8tLZpIxOpwPxPIhVYSauz3sr1Ke/zAXquRCrQiRuLMhbP8zIO5dmJJleCNzzIVYFOPSz9VEp+TU5H9hnRKwycnoqLQOj173PoINYZeCP1Ly8MZ7yTnxhAbFKiPVO1kNZL2U9VZhArBLx+W9z3mnvcmI+lM+PWI45d836qKR3LxVmEMsRdlNufdTgjzOSXqAeiFUkJpG909v7fcp7xweIVTRDf87JK+dSMn4tTTEQq3isIR84m/TEAsQqmiCMsyBWlRGUcRbEqhKCNs6CWBUmqOMsiFUhgj7OglgVIAzjLIhVRsI0zoJYZSCM4yyIVULCPM6CWCUi7OMs5SIiR6b4JwvO4b/YA2IBYgFiASAWIBaEmFnEglKQMLF4nwGumTCxLlMHcMy4iTVMHcAxJ0ysr6kDOOaoiXVUM0ktwBEn/R4rqTlIPcARB+wXm26wzybNVc166gJFrlb32xf+PVZCs4+6QJHs8b/IviAd1JymNrBCrJ064f/G3wp92jRn2BJhmRzX7NCk861YxoRmO6dEWAYXNU9nS5VPLGNU0yvcyENhK5U169O531jsJbRJtUUzRO1giZ5qx2K721LTDdOZH3yG1QuysAPeg5qB3O2vULF8DmnuyvxFCBZeTmZ6qd7s099i5J4KC6Fb06/p0nTIv5erHdQ9UIxmVqPRTL7MHOwK5h8BBgAHUHTXJ6KlKQAAAABJRU5ErkJggg==' });

  stills.appendChild(play_btn);

  // First preview
  var still0 = $E('img',
        { 'id': 'still0',
          'src': 'http://i3.ytimg.com/vi/' + video_id + '/0.jpg', });
  still0.style.cssFloat = 'left';
  stills.appendChild(still0);

  // Others previews
  for (var i = 1; i <= 3; i++) {
    var stilli = $E('img',
        { 'class': 'stilli',
          'src': still0.src.replace(/0.jpg/, i + '.jpg') });
    stills.appendChild(stilli);
  }

  // Link to play the video
  var play_video_link = $E('a',
      { 'id': 'play_video_link',
        'href': 'javascript:void(0);' });
  play_video_link.appendChild(stills);
  play_video_link.addEventListener('click', function(e){buildPlayer(embed ? new_player : old_player)}, false);

  // Create the buttons
  var control_table = $E('table', { 'id': 'control_table' });
  var control_row = $E('tr');
  control_row.appendChild(buildButton(playMP4, 'mp4play'));
  control_row.appendChild(buildButton(playFlash, 'flashplay'));
  control_row.appendChild(buildButton(stop, 'stop'));
  if (hdState) {
    control_row.appendChild(buildButton(hdOn, 'hdplay'));
  } else {
    control_row.appendChild(buildButton(expand, 'hdplay'));
  }
  control_row.appendChild(buildButton(download, 'download', video_src));
  control_row.appendChild(buildLightsOutButton());
  control_row.appendChild($E('div', {id: 'playback-display'}));
  control_table.appendChild(control_row);

  // Insert the buttons
  video_player.parentNode.insertBefore(control_table, video_player.nextSibling);

  // Append eventListeners (actual links)
  $('mp4play').addEventListener('click', function(e){buildPlayer(new_player)}, false);
  $('flashplay').addEventListener('click', function(e){buildPlayer(old_player)}, false);
  $('stop').addEventListener('click', function(e){stopPlayer()}, false);
  $('hdplay').addEventListener('click', function(e){toggleHD()}, false);
  $('lightsout').addEventListener('click', function(e){lightsOut()}, false);

  // Insert the options menu
  insertOptionsMenu();

  // Autoexpand if the video is not widescreen
  if (!wideView && !hdState && correct43) expandPlayer();

  // Autoexpand if the user wants
  if (autoExpand && !hdState) toggleHD();

  // Autoplay if the user wants
  if (previews) {
    // Append the link to the video_player
    video_player.appendChild(play_video_link);
  } else {
    buildPlayer(embed ? new_player : old_player);
  }

  // Calculate time every second if MP4 is being played
  showPlayback();

}

/////////////////////////////////////////////////////////

// UPDATE:  code needed to autocheck for updates
if (autoCheckUpdates) {

  // Some general variables about the update process
  var scriptURL = 'http://userscripts.org/scripts/show/38074';
  var sourceURL = scriptURL.replace(/show\/(\d+)$/, 'source/$1.user.js');

  // Size of this script in bytes, hardcoded
  var scriptLength = 34213;

  // Update frequency of the scripts in days. Default is 2 days.
  var updateFrequency = getValue('updateFrequency', 2);

  // If a previous check says that an update is available
  var updateAvailable = getValue('updateAvailable', false);
  var time = Math.floor(new Date().getTime() / 1000);

  // Last time the script was checked
  var lastUpdate = getValue('updateTimestamp', time);

  // If the last update was long time ago, it should check again
  var performCheck = time > lastUpdate + updateFrequency*86400;

  // Function to check the length of the local and remote scripts
  function validateScriptLength(length) {
    if (updateAvailable = scriptLength != length)
      setValue('updateAvailable', length);
    else
      setValue('updateAvailable', false);
  }

  // Function that shows the button if there's any update
  function showUpdates() {
    if (getValue('updateAvailable')) {
      if (getValue('updateAvailable') != scriptLength) {
        control_row.appendChild(buildButton(update, 'update', scriptURL));
      } else {
        setValue('updateAvailable', false);
      }
    }
  }

  // If we have to check...
  if (performCheck) {
    xhr({
      method: 'HEAD',
      url: sourceURL,
      headers: { 'Accept-Encoding': '' },
      onload: function(r) {
        var m = r.responseHeaders.match(/Content-Length: (\d+)/);
        validateScriptLength(Number(m[1]));
        if (getValue('updateAvailable'))
          showUpdates();
        setValue('updateTimestamp', time);
        log('Performed check for script updates. Local: %s Server: %s', scriptLength, Number(m[1]));
      }
    })
  } else {
    showUpdates();
  }

}

})()