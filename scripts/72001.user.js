// ==UserScript==
// @name           gametrailers.com tweaker
// @include        http://www.gametrailers.com/*
// ==/UserScript==

// OPTIONS ------------------------------------
var trimTitle     = true;   // if set to true, the title will be shortened significantly
var corrOffsets   = true;   // corrects dimensions/positions if sizes and minimum sizes don't fit together
var stopAutoplay  = true;   // works with flash ONLY! stops the autoplay feature

// CONSTANTS ----------------------------------
var PLAYER_FLASH_SD = "SDMovie";      // Flash SD player
var PLAYER_FLASH_HD = "HDMovie";      // Flash HD player
var PLAYER          = "Player";
// other variables
var ID_MOVIE_LAYER  = "MovieLayer";   // movie container
var FLASH_OBJECT    = "PRODUCT_OBJECT";
var PLACEHOLDER_ID  = "PlaceholderDIV"
var mainSite        = true;
var userMovies      = false;
var VIDEO_PATTERN   = /\/video\//i;
var USER_PATTERN    = /\/user-movie\//i;

// CSS
var css = "#TOP_ADROW, .ad_box_div {display:none;}\n" +
          ".page_middle {padding-top: 5px;}\n" +
          ".RightAdvertisement {display:none}\n" +
          ".media_agegate {height:230px;margin-top:10px;}";

// helper functions ---------------------------
function createReplacement(elementToReplace, attributeNameToChange, newAttributeValue) {
  // replaces elements with updated settings
  var embedReplacement = elementToReplace.cloneNode(true);
  embedReplacement.setAttribute(attributeNameToChange, newAttributeValue);
  elementToReplace.parentNode.replaceChild(embedReplacement, elementToReplace);
}

function getObj(obj, xpath) {
  // evaluates XPath expressions and returns a single node
  try {
    return document.evaluate(xpath, obj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  } catch(e) {
    return null;
  }
}

function remAgeCheck() {
  // bypasses the age verification process
  var ID_AGE_GATE   = "AgegateLayer",  ID_AGE_YEAR = "ageCheckYear";
  var ID_AGE_MONTH  = "ageCheckMonth", ID_AGE_DAY  = "ageCheckDay";

  if (document.getElementById(ID_AGE_GATE))	{
    // age verification necessary
    if (document.getElementById(ID_AGE_MONTH) && document.getElementById(ID_AGE_DAY) && document.getElementById(ID_AGE_YEAR))	{
      // this date certainly qualifies
      document.getElementById(ID_AGE_MONTH).selectedIndex = Math.floor(11 * Math.random());
      document.getElementById(ID_AGE_DAY).selectedIndex = Math.floor(27 * Math.random());
      // the year array starts with 2004. an index of 15 makes you at least 18 years old.
      // add another few years for good measure.
      document.getElementById(ID_AGE_YEAR).selectedIndex = 15 + Math.floor(14 * Math.random());

      // find and activate the go button on the AgegateLayer
      var cButton = getObj(document.getElementById(ID_AGE_GATE), "//input[@type='button' and contains(translate(@value, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'go')]");
      if (cButton) cButton.click();
    }
  }
}

function setPlaceholderOptions(cP, cSrc) {
  var cPh = cP.style;
  cPh.width = getComputedStyle(cSrc, '').width;
  cPh.height = getComputedStyle(cSrc, '').height;
  cPh.top = getComputedStyle(cSrc, '').top;
  cP.setAttribute("id", PLACEHOLDER_ID);
}

function addPlaceholderContent(cP, isHD) {
  var PH_A = "PlaceholderA";
  var PLAYER_USER = "RegularPlayer";
  var p = document.createElement("a")
  p.setAttribute("href", "#");
  p.setAttribute("id", PH_A);
  if (isHD) p.setAttribute("style", "vertical-align:middle;display:table-cell;");
  // add event listeners
  document.addEventListener("click", aCfunc = function(e){
      var placeH = document.getElementById(PLACEHOLDER_ID);
      var placeA = document.getElementById(PH_A);
      if (e.target == placeH || e.target == placeA) {
        var player = document.getElementById(FLASH_OBJECT);
        if (player != null) {
          var hPlayer;
          player.setAttribute("src", GM_getValue("flashSource"));
          placeH.parentNode.removeChild(placeH);
          if (document.getElementById(PLAYER_FLASH_SD) || userMovies) {
            hPlayer = (userMovies)?getObj(document, "//div[@class='" + PLAYER + "']"):document.getElementById(PLAYER_FLASH_SD);
            document.getElementById(((userMovies)?PLAYER_USER:ID_MOVIE_LAYER)).style.marginTop = "";
          } else {
            hPlayer = document.getElementById(PLAYER_FLASH_HD);
            getObj(document, "//div[@class='" + ID_MOVIE_LAYER + "']").style.marginTop = "";
          }
          if (hPlayer) {
            hPlayer.style.display = "";
            hPlayer.style.marginTop = "10px";
          }
          document.removeEventListener("click", aCfunc, false);
          document.removeEventListener("mouseover", aMfunc, false);
          arrangePlayers();
        }
      }
    }, false);
  document.addEventListener("mouseover", aMfunc = function(e) {
      var placeH = document.getElementById(PLACEHOLDER_ID);
      var placeA = document.getElementById(PH_A);
      if (e.target == placeH || e.target == placeA) {
        placeA.style.color = "#009100"
        placeA.style.fontSize = "2em";
      } else {
        placeA.style.color = "";
        placeA.style.fontSize = "1em";
      }
    }, false);
  p.appendChild(document.createTextNode("Click to play movie"));
  cP.appendChild(p);
}

function stopFlashAutoplay() {
  var PLAYER_USER = "RegularPlayer";
  var cPlayer = document.getElementById(FLASH_OBJECT);
  if (cPlayer != null) {
    // get the attributes
    var flashsrc = cPlayer.getAttribute("src");
    if (flashsrc != null) {
      GM_setValue("flashSource", flashsrc);
      cPlayer.setAttribute("src", "");
      
      // create and display placeholder
      var hiddenPlayer;
      var placeholder = document.createElement("div");
      var playerHD = !(document.getElementById(PLAYER_FLASH_SD) || userMovies);
      if (!playerHD) {
        hiddenPlayer = (userMovies)?getObj(document, "//div[@class='" + PLAYER + "']"):document.getElementById(PLAYER_FLASH_SD);
        placeholder.setAttribute("style", "background-color:#fff;vertical-align:middle;display:table-cell;font-weight:bolder;text-align:center;");
      } else {
        hiddenPlayer = document.getElementById(PLAYER_FLASH_HD);
        placeholder.setAttribute("style", "background-color:#fff;vertical-align:middle;display:table;font-weight:bolder;");
        placeholder.style.marginLeft = getComputedStyle(hiddenPlayer, '').marginLeft;
      }
      setPlaceholderOptions(placeholder, hiddenPlayer);

      // fix the margin issue
      if (!playerHD) {
        if (userMovies)
          document.getElementById(PLAYER_USER).style.marginTop = "10px";
        else
          document.getElementById(ID_MOVIE_LAYER).style.marginTop = "10px";
      } else
        getObj(document, "//div[@class='" + ID_MOVIE_LAYER + "']").style.marginTop = "10px";

      addPlaceholderContent(placeholder, playerHD);

      if (!playerHD)
        if (userMovies)
          getObj(document, "//div[@class='" + PLAYER + "']").parentNode.insertBefore(placeholder, hiddenPlayer); 
        else
          document.getElementById(ID_MOVIE_LAYER).insertBefore(placeholder, hiddenPlayer);
      else
        getObj(document, "//div[@class='" + ID_MOVIE_LAYER + "']").insertBefore(placeholder, hiddenPlayer);
      hiddenPlayer.style.display = "none";
    }
  }
}

function arrangePlayers() {
  var PLAYER_SD      = "RegularPlayer";      // SD player container
  var PLAYER_HD      = "HDPlayer";           // HD player container
  var OFFSET_CORR_HD = "20px";               // Offset correction for non-Flash HD players
  if (userMovies || document.getElementById(PLACEHOLDER_ID)) return;
  if (!document.getElementById(PLAYER_HD)) {
    // correct SD player offsets (vertical)
    // Flash SD player
    if (document.getElementById(PLAYER_FLASH_SD)) {
      var flashSD = document.getElementById(PLAYER_FLASH_SD);
      var player = getObj(document, "//div[@class='" + PLAYER + "']");
      player.setAttribute("style", "height:" + flashSD.style.height);
      player.style.minHeight = Number(document.getElementById(FLASH_OBJECT).height) + 10 + "px";
    }
  } else {
    // HD Player
    if (document.getElementById(PLAYER_FLASH_HD)) {
      var regPlayer = getObj(document, "//div[@class='" + ID_MOVIE_LAYER + "']");
      regPlayer.style.minHeight = Number(document.getElementById(FLASH_OBJECT).height) + 9 + "px";
    }
  }
}

function removeAnnoyances() {
  // remove all iframes except the digg button
  var cSource = document.getElementById("RightAdvertisement");
  var cSnap = document.evaluate("//iframe[not(contains(@src, 'http://digg.com'))]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0, l = cSnap.snapshotLength; i < l; i++) {
    cSnap.snapshotItem(i).parentNode.removeChild(cSnap.snapshotItem(i));
  }
  // it's only fair to show the alertbox
  cSnap = getObj(document, "//div[@class='alertbox']");
  if (cSnap && cSource) {
    cSource.parentNode.replaceChild(cSnap, cSource);
    cSnap.setAttribute("style", "margin:10px auto 0;float:none;padding:0 5px 0 0;width:236px;");
  }
}

function dontExecute(url) {
  var pattern = [ /ad_frame.php/i, /dlcount_iframe.php/i ];
  var retVal = false;
  for (var i = 0, n = pattern.length; i < n; i++) {
    if (url.match(pattern[i])) return true;
  }
  return retVal;
}

// ############# actual code #############
// add CSS modifications
if (typeof GM_addStyle != "undefined") {
  GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
  addStyle(css);
} else {
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0)
  {
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    heads[0].appendChild(node);
  }
}

// if we're on a video page, mainSite is false
var URI = window.location.href; //window.location.href;
if (!dontExecute(URI)) {
  userMovies = (URI.search(USER_PATTERN) != -1);
  mainSite = ((URI.search(VIDEO_PATTERN) == -1) && !userMovies);

  if (trimTitle) {
    if (document.title.indexOf("|") != -1)
      document.title = document.title.substring(0, document.title.indexOf("|")+2) + "Gametrailers.com";
  }
  removeAnnoyances();

  if (!mainSite) {
    // remove age verification and stop autoplay
    if (document.getElementById(PLAYER_FLASH_SD) || document.getElementById(PLAYER_FLASH_HD) || userMovies) {
      remAgeCheck();
      stopFlashAutoplay();
    }
    // correct the player offsets
    if (corrOffsets) arrangePlayers();
  }
 }