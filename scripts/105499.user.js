// ==UserScript==
// @name           LUEser Photo Album script
// @namespace      TheAmazingOne@gamefaqs.com
// @include        http://www.gamefaqs.com/boards/402-*
// @version        1.8.2
// ==/UserScript==
//
//   LUEser Photo Album script
//   Author: The Amazing One (the.amazing.one@gmail.com)
//
//   This script takes photos from the LUEser photo album and loads them
//   in topics. The placement and visibility of the images can be
//   controlled by some settings (see below). The script is designed to
//   work on any version of GameFAQs, with any stylesheet. Thanks to 
//   SpudY2K for the original idea.
//
//   To access the settings, find the appropriate option under User Script
//   Commands. A dialog will pop up with the settings that can be controlled.
//
//
//   Version 1.8.2
//
//   Last update caused problems because people had TTI on and it stupidly
//   was trying to TTI-ify the userpic links even though they were already
//   images. I managed to find a hack that tricks TTI into not doing this.
//
//   Version 1.8
//
//   This update had one major goal: improve the loading time penalty of this
//   script. That is, minimize the amount of time from when you click on a
//   topic to when you can actually start reading the posts. To achieve this,
//   I made some changes that, in hindsight, I should have made a long time
//   ago:
//   - By default, userpics will now use Photobucket's thumbnail version of
//     the images, and not the full-size version. This cuts down the amount
//     of data that has to be loaded on the page massively. Note that
//     Photobucket's thumbnails are 160px max, and the script used to use
//     200px as the max size of userpics. So this change makes the userpics
//     smaller. But the huge savings in bandwidth make it well worth it.
//     If you REALLY want the bigger pictures back, you can always go to the
//     settings, put 200 as the max width and max height, and pick
//     "Default photo album (big)" as the album.
//   - It used to be that while userpics were still loading, you couldn't
//     start reading posts because as the pics loaded the page would keep
//     shifting around. I've fixed this. Now, you can start reading the topic
//     right away even while userpics are still being loaded, because the
//     page doesn't move around as the userpics show up.
//   - In the spirit of user-friendliness, there's now a little loading icon
//     for userpics that are still being loaded.
//
//   There's also one other major change in this update. I took out the first
//   names stuff. It was a mistake to ever bundle it with this script in the
//   first place. Userpic functionality and first name functionality are
//   totally separate, and shouldn't be in the same script. That's why I
//   put the first names stuff into its own script, which you can install
//   here if you want it:
//     
//   http://userscripts.org/scripts/show/82743
// __________________________________________________________________________

var Align = { RIGHT: 0, LEFT: 1, UNDER: 2, HOVER: 3 };
var Silhouette = { COLOR: 0, BW: 1, DISABLED: 2 };
var UserpicVars = {};
var NOPIC = getNopicImage();
var LOADING = getLoadingImage();

var Urls = {
  standard:  "http://s1123.photobucket.com/albums/l560/LUEserpics/th_*.jpg",
  std_big:   "http://s1123.photobucket.com/albums/l560/LUEserpics/*.jpg",
  clown:     "http://smg.photobucket.com/albums/v202/Thelordofyouall/Clowns/ClownFAQs/*.jpg\n" +
             "http://s141.photobucket.com/albums/r47/Jonoleth/LUEsers2/*.jpg\n" +
             "http://smg.photobucket.com/albums/v202/Thelordofyouall/Clowns/ClownFAQs/index.gif",
  felhound:  "http://s162.photobucket.com/albums/t271/Ghsdkgb/LUE/Felhoundart/*.png"
};

var Defaults = {
  url:        Urls.standard,
  align:      Align.RIGHT,
  silhouette: Silhouette.COLOR,
  maxWidth:   160,
  maxHeight:  160
};




if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
  // We're not in Firefox
  var Settings = Defaults;
} else {
  var Settings = loadSettings();

  if (!GM_getValue('v1.8_update', false)) {
    var keys = GM_listValues();
    for (var i = 0; i < keys.length; i++) {
      GM_deleteValue(keys[i]);
    }
    if (Settings.url == Urls.std_big) {
      Settings.url = Defaults.url;
      Settings.maxWidth = Defaults.maxWidth;
      Settings.maxHeight = Defaults.maxHeight;
    }
    saveSettings(Settings);
    GM_setValue('v1.8_update', true)
  }

  // We need this crazy work-around because of bugs in GM_registerMenuCommand... it'd probably be a
  // security hole too, if we didn't trust SBAllen to not add code to GameFAQs that hijacks userscripts.
  unsafeWindow.doUserpicSettings = function() { openSettings(document.body); };
  GM_registerMenuCommand("LUEser Photo Album script - Settings", function() { unsafeWindow.doUserpicSettings(); });

  doUpdateCheck();
}

/**
 * Message List
 */
if (/\/boards\/.*\/[0-9]+/.test(window.location.href)) {
  var urls = Settings.url.split("\n");
  var allLinks = docEval('//table[@class="board message"]//a[@href]');
  for (var i = 0; i < allLinks.snapshotLength; i++) {
    var userLink = allLinks.snapshotItem(i);
    if (!userLink.href.match(/users\/.*\/boards/))
      continue;
    var username = userLink.textContent;
    var userID = getHashValue(username);

    // Create the userpic element
    username = username.replace(/ /g, "");
    var userpic = document.createElement('img');
    userpic.src = urls[0].replace("*", username);
    userpic.style.maxWidth = Settings.maxWidth + "px";
    userpic.style.maxHeight = Settings.maxHeight + "px";
    userpic.style.display = "none";
    (function(userpic, username) {
      var i = 0;
      userpic.addEventListener('error', function() {
        i++;
        if (i < urls.length) {
          userpic.src = urls[i].replace("*", username);
        } else {
          userpic.src = NOPIC;
        }
      }, true);
    })(userpic, username);

    if (Settings.align == Align.HOVER) {
      var container = document.createElement('div');
      container.style.border = '1px solid black';
      container.style.backgroundColor = 'white';
      container.style.visibility = 'hidden';
      container.style.position = 'absolute';
      container.appendChild(userpic);
      var divText = document.createElement('div');
      divText.style.padding = '5px';
      divText.appendChild(document.createTextNode('=Photo is not available='));
      container.appendChild(divText);
      userpic.addEventListener('load', function(userLink, divText){return function(){
        if(this.src != NOPIC) {
          this.style.display = 'inline';
          divText.style.display = 'none';
          userLink.style.border = '1px solid';
        }
      };}(userLink, divText), true);
      setTimeout(function(container, userLink) { return function() {
        insertAfter(container, userLink);
      };}(container, userLink), 0);
      userLink.addEventListener('mouseover', function(container){return function(){
        container.style.visibility = 'visible';
      };}(container), true);
      userLink.addEventListener('mouseout', function(container){return function(){
        container.style.visibility = 'hidden';
      };}(container), true);
    } else {
      var container = document.createElement('div');
      container.style.width = (Settings.maxWidth+2)+"px";
      container.style.height = (Settings.maxHeight+2)+"px";
      container.style.backgroundImage = "url("+LOADING+")";
      container.style.backgroundRepeat = "no-repeat";
      container.style.backgroundPosition = "center";
      var imageLink = document.createElement('a');
      imageLink.appendChild(userpic);
      container.appendChild(imageLink);
      userpic.style.border = '1px solid black';
      if (Settings.align == Align.RIGHT) {
        container.style.cssFloat = 'right';
        container.style.textAlign = 'right';
      } else if (Settings.align == Align.LEFT) {
        container.style.cssFloat = 'left';
        container.style.textAlign = 'center';
      }
      if (Settings.silhouette != Silhouette.BW)
        userpic.style.backgroundColor = getColor(userID);
      userpic.addEventListener('load', function(event) {
        this.parentNode.parentNode.style.backgroundImage = "none";
        if (Settings.silhouette == Silhouette.DISABLED && this.src == NOPIC) {
          this.parentNode.parentNode.style.display = "none";
        } else {
          this.style.display = 'inline';
          if (this.src != NOPIC) {
            var url = this.src.replace("/th_", "/");
            // This is a hack to get TTI to ignore the userpic links. The .jpg
            // in the href of the link is changed to .jp%67. In the textarea,
            // we change it back in case someone wants to post the URL.
            url = url.replace(/g([^g]*)$/, "%67$1");
            this.parentNode.href = url;
          }
        }
      }, true);
      if (Settings.align == Align.UNDER) {
        container.style.margin = "5px auto -5px";
        container.style.textAlign = 'center';
        userLink.parentNode.appendChild(container);
      } else {
        container.style.margin = "5px";
        // Ugly code ahoy!
        if(userLink.parentNode.className == "msg_stats_left") // username left of message
          var msg = userLink.parentNode.parentNode.nextSibling.firstChild;
        else // username above message
          var msg = userLink.parentNode.parentNode.parentNode.nextSibling.firstChild.firstChild;
        msg.insertBefore(container, msg.firstChild);
      }
    }
  }
  setTimeout(fixQuickpost, 0);
}

function fixQuickpost() {
  var quickpostBox = document.getElementById('gamefox-message');
  if (!quickpostBox) {
    return;
  }
  if (Settings.align == Align.HOVER) {
    var filter = /=Photo is not available=/g;
    var filterRep = "";
  } else {
    var urls = Settings.url.split("\n");
    for (var i = 0; i < urls.length; i++) {
      urls[i] = escapeRegExp(urls[i]).replace("\\*", "[^\\. ]+");
    }
    urls.push(escapeRegExp(NOPIC));
    var filterText = urls.join('|');
    var filter = new RegExp(
      "([^\\n])\\n((?:<.>)*)(?:" + urls.join('|') + ")", "g");
    var filterRep = "$1\n$2";
  }   

  quickpostBox.addEventListener('focus', function(){setTimeout(function(){
    var selStart = quickpostBox.selectionStart;
    var newText1 = quickpostBox.value.substring(0, selStart).replace(filter, filterRep);
    var newText2 = quickpostBox.value.substring(selStart).replace(filter, filterRep);
    if (newText1 + newText2 != quickpostBox.value) {
      quickpostBox.value = newText1 + newText2;
      quickpostBox.setSelectionRange(newText1.length, newText1.length);
    }
  },0);},true);

  // This is a hack to get TTI to ignore the userpic links. The .jpg in the
  // href of the link is changed to .jp%67. In the textarea, we change it back
  // in case someone wants to post the URL.
  quickpostBox.addEventListener('blur', function(){
    quickpostBox.value = quickpostBox.value.replace(/%67/g, "g");
  },true);
}

function getHashValue(username) {
  var hash = 0;

  for (var i=0; i<username.length; i++) {
    hash = (hash + 3548023*(username.charCodeAt(i)))%16777216;
  }

  return hash;
}

function getColor(userID) {
  var color = (3548023*userID+11066021)%16777216;
  var colorString = color.toString(16);
  colorString = "000000".substr(0,6-colorString.length)+colorString;
  return "#"+colorString;
}

function loadSettings() {
  return {
    url:        GM_getValue("AlbumURL",     Defaults.url),
    align:      GM_getValue("Align",        Defaults.align),
    silhouette: GM_getValue("Silhouette",   Defaults.silhouette),
    maxWidth:   GM_getValue("MaxWidth",     Defaults.maxWidth),
    maxHeight:  GM_getValue("MaxHeight",    Defaults.maxHeight)
  };
}

function saveSettings(Settings) {
  GM_setValue("AlbumURL",     Settings.url);
  GM_setValue("Align",        Settings.align);
  GM_setValue("Silhouette",   Settings.silhouette);
  GM_setValue("MaxWidth",     Settings.maxWidth);
  GM_setValue("MaxHeight",    Settings.maxHeight);
}

function openSettings(body) {
  var div = document.createElement('div');
  var s = '\
  <form name="userpicSettings" id="userpicSettings">\
    <style type="text/css">\
      #userpicSettings .container {\
        position: fixed;\
        z-index: 100;\
        top: 50px;\
        left: 50px;\
        background-color: #ddd;\
        border: 1px solid black;\
        font-size: 12px;\
        font-family: arial, sans-serif;\
      }\
      \
      #userpicSettings .header {\
        width: 300px;\
        background-color: #36b;\
        padding: 2px;\
        color: white;\
      }\
      \
      #userpicSettings .body {\
        width: 294px;\
        height: 400px;\
        overflow: auto;\
        padding: 5px;\
        color: black;\
      }\
      \
      #userpicSettings input[type=button] {\
        line-height: 27px;\
        height: 27px;\
        min-width: 60px;\
        float: right;\
      }\
      \
      #userpicSettings input[type=button].left {\
        float: left;\
      }\
      \
      #userpicSettings input[type=text] {\
        width: 30px;\
      }\
    </style>\
    <div class="container">\
      <div class="header">\
        Settings\
      </div>\
      <div class="body">\
        Display photos<br />\
        <input type="radio" name="alignSetting" value="'+Align.RIGHT+'" /> on the right<br />\
        <input type="radio" name="alignSetting" value="'+Align.LEFT+'" /> on the left<br />\
        <input type="radio" name="alignSetting" value="'+Align.UNDER+'" /> under the username<br />\
        <input type="radio" name="alignSetting" value="'+Align.HOVER+'" /> only on hover<br />\
        <hr />\
        Show default photos<br />\
        <input type="radio" name="silhouetteSetting" value="'+Silhouette.COLOR+'" /> in color<br />\
        <input type="radio" name="silhouetteSetting" value="'+Silhouette.BW+'" /> in black and white<br />\
        <input type="radio" name="silhouetteSetting" value="'+Silhouette.DISABLED+'" /> never<br />\
        <hr />\
        Maximum size of photos:<br />\
        <input type="text" name="maxWidth" />px width<br />\
        <input type="text" name="maxHeight" />px height<br />\
        <hr />\
        Photo Album URLs - Enter each URL on a separate line. Put an\
        asterisk where the username is supposed to go. Note that the username\
        MUST be followed directly by a period. The script will look for\
        photos at each successive URL until it finds one. If it doesn\'t find\
        a photo at any of the URLs, it will use the default silhouette photo.<br />\
        <textarea name="albumURL" rows="4" cols="30" wrap="off"> </textarea><br />\
        Presets: <br />\
        <input type="radio" name="urlPresets" value="standard" /> Default photo album (thumbnails)<br />\
        <input type="radio" name="urlPresets" value="std_big" /> Default photo album (big)<br />\
        <input type="radio" name="urlPresets" value="clown" /> ClownFAQs<br />\
        <input type="radio" name="urlPresets" value="felhound" /> Felhound art<br />\
        <hr />\
        <input type="button" name="defaults" value="Defaults" class="left" />\
        <input type="button" name="cancel" value="Cancel" />\
        <input type="button" name="save" value="Save" />\
      </div>\
    </div>\
  </form>';
  div.innerHTML = s;
  var form = div.childNodes[1]; // First child is a text node, second child is the form
  body.appendChild(form);
  var f = form.wrappedJSObject;
  var _ = function(s) { return form.elements.namedItem(s); }
  setRadioValue(f.alignSetting, Settings.align);
  setRadioValue(f.silhouetteSetting, Settings.silhouette);
  _('maxWidth').value = Settings.maxWidth;
  _('maxHeight').value = Settings.maxHeight;
  _('albumURL').value = Settings.url;
  _('albumURL').addEventListener('change', function(){
    for (var i = 0; i < f.urlPresets.length; i++) {
      f.urlPresets[i].checked = false;
    }
  },true);
  for (var i = 0; i < f.urlPresets.length; i++) {
    if (_('albumURL').value == Urls[f.urlPresets[i].value]) {
      f.urlPresets[i].checked = true;
    }
    f.urlPresets[i].addEventListener('click', function(val){return function(){
      _('albumURL').value = Urls[val];
    };}(f.urlPresets[i].value),true);
  }
  _('save').addEventListener('click', function(){
    Settings.align = getRadioValue(f.alignSetting);
    Settings.silhouette = getRadioValue(f.silhouetteSetting);
    Settings.maxWidth = parseInt(_('maxWidth').value);
    Settings.maxHeight = parseInt(_('maxHeight').value);
    Settings.url = _('albumURL').value;
    saveSettings(Settings);
    window.location.reload(true);
  },true);
  _('cancel').addEventListener('click', function(){
    f.parentNode.removeChild(f);
  },true);
  _('defaults').addEventListener('click', function(){
    setRadioValue(f.alignSetting, Defaults.align);
    setRadioValue(f.silhouetteSetting, Defaults.silhouette);
    _('maxWidth').value = Defaults.maxWidth;
    _('maxHeight').value = Defaults.maxHeight;
    _('albumURL').value = Defaults.url;
    setRadioValue(f.urlPresets, 'standard');
  },true);
}

function getRadioValue(radios) {
  for (var i = 0; i < radios.length; i++)
    if (radios[i].checked)
      return radios[i].value;
}

function setRadioValue(radios, val) {
  for (var i = 0; i < radios.length; i++) {
    radios[i].checked = (radios[i].value == val);
  }
}

function docEval(str) {
  return document.evaluate(
    str,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
}

function insertAfter(elemToInsert, node) {
   node.parentNode.insertBefore(elemToInsert, node.nextSibling);
}

function toArray(obj) {
    return Array.prototype.slice.call(obj);
}

function bind(obj, func) {
  return function () {
    return func.apply(obj, toArray(arguments));
  };
}

// Code snippet from http://simonwillison.net/2006/Jan/20/escape/
function escapeRegExp(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return text.replace(arguments.callee.sRE, '\\$1');
}


/**
 * Data URI stuff
 */
function getNopicImage() {
  return "\
data:image/gif;base64,R0lGODlheABzAPAAAAAAAAAAACH5BAEAAAEALAAAAAB4AHMAAAL+jI+py\
+0Po5y0VoAX3rb7DyLbKI5AiKaqwZmuu8ay89Y2fHDzbt3+nzHxhhGg8UhMKo5Mo/LZjDqfO6l1SlVd\
t78sigvuenvh8m1MMatt6OL6jWs34HSSnFHP3zV5/T7X5/cX2PcXQBi4h5h4t1jY6FinGEk3SQkn98j\
3lokpsdZp9iHaRjoaVlqWgoqmqsUVeiUDm7o1axsb9ZkBQVsr9VDTK5vbFPwybAWpPMdGQ1yM1Cz8zB\
yNtYlcDWzJOM3dLYiHG155bF3OeY6+bL4OPui+DR+v/k6fDpbsa3iotk+unz9X3/QJZEFwnKmDCbOxO\
jiQn8OHAhsmkGfIYgnUe4MiXoJW76PEayJ1ZSxpMCTFJZ5OagTEMR+7iy1VjtwIqt+/gi9JmlS4s2JP\
j0NbDa3pMuXElTZBsswpFCU+mVJ9QCRaVQzDrNIgcu269avWsGLPXMVaVsfZtHbO8qzq9p7UuPPg0gW\
a9S5eu3ppfu37lCtgv4IH4+RrGK3IxIdRMoaJmHHhx4opUYZc8jLCuZorL+rsGRHoyI9JS+asOW9q1a\
X/ni5rmG2Lu7LjrK0t5DZubUl3O/Ppu+2Y4FOrEHe64sRxpiGWL/Sg3HnMCdL9FAAAOw==";
}
function getLoadingImage() {
  return "\
data:image/gif;base64,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\
gRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA==";
}

//---------------------------------------------------------------------------
// Check for updates
// 
// Much thanks to Jarett - http://userscripts.org/users/38602 - for the code
//---------------------------------------------------------------------------
function doUpdateCheck() {
  var version_scriptNum = 37350;
  var version_timestamp = 1280902767875;
  function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/&#x000A;/g,"\n").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);
}