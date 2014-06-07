// ==UserScript==
// @name            Youtube enhanced
// @version         1.0b5
// @description     Plays a preview to a video after you move your mouse over it and allows one click to sign out.
// @description     Spielt eine Vorschau des Videos nachdem man die Maus darüber bewegt.
// @include         http://www.youtube.com/*
// ==/UserScript==

/**
 * preferences:
 * displayDelay  delay to display the video information after the mouse went 
 *               over an element, in ms
 * playDelay     delay to play the video after displaying its information.
 * volume        the volume the little video sould have
 * timeshift     the percentage where to start playing the little video
 */


// how long shall we wait before the tooltip is displayed
const DEFAULT_DISPLAYDELAY = 500;
//how long shall we wait before the video starts playing
const DEFAULT_PLAYDELAY= 2000;
// how loud should the mini video be
const DEFAULT_VOLUME= 50;
// where shall we start playing (in % of the video length)
const DEFAULT_TIMESHIFT= 10;
//what shall we do if there is already an other video playing?
const DEFAULT_COLLISSIONACTION= "ignore";

//how wide should the tooltip be. In pixel. default: 350px
const DEFAULT_TOOLTIPSIZE= 350;

//how big should the video be (in percent of the tooltip width (default: 34.28%)
const DEFAULT_VIDEOSIZE= 34.28;

//should we show the link to the settings?
const DEFAULT_SHOWSETTINGSLINK= true;
// shall we preload the video
const DEFAULT_PRELOAD= false;
// darkColor:lightColor
const DEFAULT_COLORTHEME= "hsl(222, 87%, 80%):hsla(212, 76%, 100%, 0.7):"

const XULNS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
const DEBUG = false;

function addZeros(number) {
  var desiredLength = arguments.length > 1 ? arguments[1] : 2;
  var numberString = number + "";
  while (numberString.length < desiredLength) {
    numberString = "0" + numberString;
  }
  return numberString;
}

/**
 * runs a x-path
 * @param node the node where the path sould start.
 * @param expr the xpath as String
 * @return an array of elements that match the xpath
 * @author see MDC
 */
// Evaluate an XPath expression aExpression against a given DOM node
// or Document object (aNode), returning the results as an array
// thanks wanderingstan at morethanwarm dot mail dot com for the
// initial work.
function evaluateXPath(aNode, aExpr) {
  var xpe = new XPathEvaluator();
  var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ?
    aNode.documentElement : aNode.ownerDocument.documentElement);
  var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
  var found = [];
  var res;
  while (res = result.iterateNext())
    found.push(res);
  return found;
}

i18n_data = {};
i18n_data["en"] = {
  "settings" : "settings",
  "TBD":
      "-not implemented yet-",
  timeParser : function(seconds) {
    if (seconds >= 60) {
      return Math.floor(seconds / 60) + ":" 
        + addZeros(Math.round(seconds % 60)) + " minutes"
    } else if (seconds < 0.1) {
      return i18n_data["en"].numberParser(seconds * 1000) + " milliseconds";
    } else if (seconds == 1) {
      return "one second";
    } else {
      return i18n_data["en"].numberParser(seconds) + " seconds";
    }
  },
  numberParser : function(number) {
    return (Math.round(number * 100) / 100 + "")
  }
}
i18n_data["de"] = {
  "author:" :
      "Autor:",
  "duration:" :
      "Länge:",
  "published:" :
      "Veröffentlicht:",
  "prewatch settings":
      "Tooltipp Einstellungen",
  "settings" :
      "Einstellungen",
  "youtube prewatch: " 
     : "Youtube Prewatch: ",
  "unknown" :
      "unbekannt",
  "data loading":
      "Daten werden geladen.",
  "data still loading":
      "Daten werden immernoch geladen.",
  //settings
  "Timing options":
      "Zeitliche Optionen",
  "when to display the tooltip":
      "Wann die Videoinformationen angezeigt werden.",
  "display delay":
      "Anzeigeverzögerung",
  "display video information after the mouse was %t over the element": 
      "Videoinformationen anzeigen wenn die Maus %t über dem Element war.",
  "additional play delay":
      "Zusätzliche Abspielverzögerung",
  "start playing video %t after the tooltip was displayed":
      "Beginne mit dem Abspielen des Videos %t nachdem die Infos angezeigt "
    + "werden. Vorher wird nur das Vorschaubild angezeigt.",
  "Play options":
      "Abspieloptionen",
  "how to play the mini video":
      "Wie das kleine Video abgespielt werden soll.",
  "volume":
      "Lautstärke",
  "volume: %d%":
      "Lautstärke: %d%",
  "timeshift":
      "Startpositionsverschiebung",
  "start position: %d%":
      "Startposition, relativ zur Videolänge: %d%",
  "if a video is played:":
      "Wenn schon ein Video abgespielt wird",
  "no action":
      "ignorieren",
  "mute preview":
      "Vorschau stumm abspielen",
  "mute player":
      "gerade abgespieltes Video stumm schalten",
  "pause player":
      "gerade abgespieltes Video pausieren",
  "TBD":
      "-Funktion noch nicht vorhanden-",
  "About":
      "Über",
  "%s by %s":
      "%s von %s",
  "Current Version: %s":
      "Aktuelle Version: %s",
  "Language code (selected by Youtube): %s":
      "Sprachcode (von Youtube übernommen): %s.",
  "More information at the scripts %s.":
    "Mehr Informationen und Updates gibt es auf der %s des Scripts.",
  "homepage" : 
    "Webseite",
  "settings are automatically saved":
      "Einstellungen werden automatisch gespeichert.",
  "close": "Schließen",
  "start preloading the video when the tooltip is displayed":
    "Beginne mit dem Laden des Videos sobald ein Tooltipp angezeigt wird.",
  timeParser : function(seconds) {
    if (seconds >= 60) {
      return Math.floor(seconds / 60) + ":" 
        + addZeros(i18n_data["de"].numberParser(seconds % 60)) + " Minuten"
    } else if (seconds < 0.1) {
      return i18n_data["de"].numberParser(seconds * 1000) + " Millisekunden";
    } else if (seconds == 1) {
      return "eine Sekunde";
    } else {
      return i18n_data["de"].numberParser(seconds) + " Sekunden";
    }
  },
  months : ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", 
            "August", "September", "Oktober", "November", "Dezember"],
  dateParser : function(date) {
    return date.getDate() + ". " + i18n_data["de"].months[date.getMonth()]
      + " " + date.getFullYear();
  },
  numberParser : function(number) {
    return (Math.round(number * 100) / 100 + "").replace(".", ",")
  }
}

function i18n(orginal) {
  var lang = document.documentElement.getAttribute("lang");
  if (!lang || typeof i18n_data[lang] == "undefined"
        || typeof i18n_data[lang][orginal] == "undefined") {
    var text = orginal;
  } else {
    var text = i18n_data[lang][orginal];
  }
  for (var i = 1; i < arguments.length; i++) {
    if (typeof arguments[i] == "string" && text.indexOf("%s") > -1) {
      text = text.replace("%s", arguments[i]);
    } else if (typeof arguments[i] == "number" && text.indexOf("%d") > -1) {
      text = text.replace("%d", arguments[i]);
    } else if (typeof arguments[i] == "number" && text.indexOf("%t") > -1) {
      text = text.replace("%t", 
        i18n_data[lang] && typeof i18n_data[lang].timeParser == "function"
          ? i18n_data[lang].timeParser(arguments[i])
          : arguments[i] + "s");
    } else if (arguments[i] instanceof Date && text.indexOf("%y") > -1) {
      text = text.replace("%y", 
        i18n_data[lang] && typeof i18n_data[lang].dateParser == "function"
          ? i18n_data[lang].dateParser(arguments[i])
          : arguments[i].getFullYear() + "-" + addZeros(arguments[i].getMonth() + 1) 
            + "-" + addZeros(arguments[i].getDate()));
    } else {
      text += arguments[i];
    }
  }
  return text;
}



var youtubePrewatch = {
  
  defaultValues : {
    displayDelay : parseInt(DEFAULT_DISPLAYDELAY),
    playDelay: parseInt(DEFAULT_PLAYDELAY),
    volume: parseInt(DEFAULT_VOLUME),
    timeshift: parseInt(DEFAULT_TIMESHIFT),
    collissionAction: DEFAULT_COLLISSIONACTION,
    videoSize: parseInt(DEFAULT_VIDEOSIZE), // in precent
    tooltipSize: parseInt(DEFAULT_TOOLTIPSIZE),
    showSettingsLink: DEFAULT_SHOWSETTINGSLINK == true,
    preload: DEFAULT_PRELOAD == true,
    colorTheme: DEFAULT_COLORTHEME
  },
  
  unsafeWindow : typeof unsafeWindow == "undefined" ? window : unsafeWindow,
  
  getSetting: function(name) {
    if (GM_getValue) {
      return GM_getValue(name, youtubePrewatch.defaultValues[name]);
    } else {
      return youtubePrewatch.defaultValues[name];
    }
  },
  setSetting: function(name, value) {
    if (GM_setValue) {
      GM_setValue(name, value);
    }
  },

  //the id of the video that is currently displayed
  currentVideoId : "",
  /* the data of known videos.
   * videoData[vid] = {name, duration, previewImage}
   * only full elements are allowed. If an element is undefined it was not 
   * loaded, if it is null it was not compleately loaded.
   */
  videoData : {},
  //the tooltips elements
  tooltipElement : null,
  //the div for the swfobject
  tooltipVideo : null,
  //the div for the preview
  tooltipPreview : null,
  //the title text for the video
  tooltipTitleText : null,
  //the time the video lasts
  tooltipDurationTime : null,
  
  /* initializes the text */
  init: function() {
    youtubePrewatch.activateAllTooltips(document.body);
    youtubePrewatch.initNodeInsertListener();
    youtubePrewatch.initSettingsElement();
    youtubePrewatch.loadCSS();
  },
  
  debug : function(data) {
    if (!DEBUG) {
    } else if (typeof youtubePrewatch.unsafeWindow.console == "object") {
      youtubePrewatch.unsafeWindow.console.debug(data)
    } else if (GM_log) {
      GM_log(data)
    }
  },
  
  //PageFunctions
  
  activateAllTooltips : function(element) {
    var as = document.body.getElementsByTagName("a");
    Array.filter(as, function(a) {
             return a.href && /v=([-\w]+)/.exec(a.href)
         })
         .forEach(youtubePrewatch.loadTextLink);
    
  },
  
  loadTextLink : function(a) {
    var videoid = /v=([-\w]+)/.exec(a.href)[1] + "";
    evaluateXPath(a, "//*[@title]|.[@title]").forEach(function(node) {
      if (node.hasAttribute("title")) {
        //e.g. for youtubeAutoplay
        node.setAttribute("oldtitle", node.getAttribute("title"));
        node.removeAttribute("title");
      }
    })
    youtubePrewatch.registerElement(a, videoid);
  },
  
  /* unneeded
  registerYoutubeVideo : function(div) {
    var img = div.getElementsByTagName("img")[0];
    if (img && img.hasAttribute("qlicon")) {
      var id = img.getAttribute("qlicon");
      youtubePrewatch.registerElement(div, id);
      img.title = "";
    }
  },*/
  
  /* watches some YoutubeElements to be changed, e.g. ajax video lists */
  /*watchYoutubeElements : function() {
    var naviOuterDiv = document.getElementById("playnav-play-panel");
    if (!naviOuterDiv) {
      return;
    }
    function renderPlaynavHolder(holderdiv) {
      if (!holderdiv.hasAttribute("_youtubePrewatchLoaded")) {
        var divs = holderdiv.getElementsByClassName("playnav-video");
        Array.forEach(divs, youtubePrewatch.registerYoutubeVideo);
        holderdiv.setAttribute("_youtubePrewatchLoaded", "true");
      }
    }
    var holder = naviOuterDiv.getElementsByClassName("playnav-playlist-holder");
    Array.forEach(holder, renderPlaynavHolder);
    youtubePrewatch.debug(holder)
    naviOuterDiv.addEventListener("overflow", function() {
      var holder = naviOuterDiv.getElementsByClassName("playnav-playlist-holder");
      Array.forEach(holder, renderPlaynavHolder)
    }, true);
  },*/
    /**
   * @param element a HTML-Element
   * @param video the video id, an object of video data (with the id) or a 
   *              function witch returns the id or the data object.
   */
  registerElement : function(element, video) {
    var videoid = typeof video == "object" ? video.id : video;
    if (typeof videoid != "string") {
      return false;
      throw "ID is not a string";
    }
    element.addEventListener("mousemove", function() {
      youtubePrewatch.showTooltip(videoid, {});
    }, true);
  },
  
  /* Tooltip */
  tooltipInitialzed : false,
  initTooltip : function() {
    document.body.addEventListener("mousemove", youtubePrewatch.moveTooltip1, true);
    document.body.addEventListener("mousemove", youtubePrewatch.moveTooltip2, false);
    document.documentElement.addEventListener("mouseout", youtubePrewatch.checkMouseOutOfPage, false);
    document.addEventListener("blur", youtubePrewatch.checkPageBlur, false);
    youtubePrewatch.initTooltipElements();
    youtubePrewatch.tooltipElement.addEventListener("mousemove", youtubePrewatch.moveTooltipMouseOverTooltip, false);
    youtubePrewatch.tooltipInitialzed = true;
  },
  
  initTooltipElements : function() {
    if (youtubePrewatch.tooltipElement != null) {
      return;
    }
    youtubePrewatch.debug("Initialisiere Tooltipp");
    youtubePrewatch.tooltipElement = document.createElement("div");
    youtubePrewatch.tooltipElement.id = "youtubePrewatch"
    document.body.appendChild(youtubePrewatch.tooltipElement);
    
    var tooltipInner = document.createElement("div");
    tooltipInner.className = "tooltipInner"
    youtubePrewatch.tooltipElement.appendChild(tooltipInner);
    
    youtubePrewatch.tooltipVideo = document.createElement("div");
    youtubePrewatch.tooltipVideo.className = "preview";
    youtubePrewatch.tooltipVideo.id = "youtubePrewatchVideo";
    tooltipInner.appendChild(youtubePrewatch.tooltipVideo);
    
    youtubePrewatch.tooltipPreview = document.createElement("img");
    youtubePrewatch.tooltipPreview.className = "preview";
    tooltipInner.appendChild(youtubePrewatch.tooltipPreview);
    
    var ratingBg = document.createElement("div");
    ratingBg.className = "rating_gray";
    youtubePrewatch.tooltipElement.appendChild(ratingBg);
    youtubePrewatch.tooltipRating = document.createElement("div");
    youtubePrewatch.tooltipRating.className = "rating_red";
    ratingBg.appendChild(youtubePrewatch.tooltipRating);
    
    
    var b = document.createElement("b");
    youtubePrewatch.tooltipTitleText = document.createTextNode(i18n("unknown"));
    b.appendChild(youtubePrewatch.tooltipTitleText);
    tooltipInner.appendChild(b);
    
    var p = document.createElement("p");
    youtubePrewatch.tooltipDescriptionText = document.createTextNode(i18n("unknown"));
    p.appendChild(youtubePrewatch.tooltipDescriptionText);
    tooltipInner.appendChild(p);
    
    var dl = document.createElement("dl");
    tooltipInner.appendChild(dl);
    
    var dt = document.createElement("dt");
    dt.appendChild(document.createTextNode(i18n("author:")));
    dl.appendChild(dt);
    
    var dd = document.createElement("dd");
    youtubePrewatch.tooltipAuthorText = document.createTextNode(i18n("unknown"));
    dd.appendChild(youtubePrewatch.tooltipAuthorText);
    dl.appendChild(dd);
    
    var dt = document.createElement("dt");
    dt.appendChild(document.createTextNode(i18n("published:")));
    dl.appendChild(dt);
    
    var dd = document.createElement("dd");
    youtubePrewatch.tooltipPublishedText = document.createTextNode(i18n("unknown"));
    dd.appendChild(youtubePrewatch.tooltipPublishedText);
    dl.appendChild(dd);
    
    var dt = document.createElement("dt");
    dt.appendChild(document.createTextNode(i18n("duration:")));
    dl.appendChild(dt);
    
    var dd = document.createElement("dd");
    youtubePrewatch.tooltipDurationText = document.createTextNode(i18n("unknown"));
    dd.appendChild(youtubePrewatch.tooltipDurationText);
    dl.appendChild(dd);
    
  },
  
  loadCSS : function() {
    if (!youtubePrewatch.styleElement) {
      youtubePrewatch.styleElement = document.createElement("style");
      (document.getElementsByTagName("head")[0] || document.documentElement)
          .appendChild(youtubePrewatch.styleElement)
    }
    colors = (youtubePrewatch.getSetting("colorTheme") + "").split(":");
    if (!colors[0])  {colors[0] = "#aaa";}  //dark background, border
    if (!colors[1])  {colors[1] = "white";}  //light background
    if (!colors[2])  {colors[2] = "black";}  //text on dark
    if (!colors[3])  {colors[3] = "black";}  //text on light
    var width = youtubePrewatch.getSetting("tooltipSize");
    var videoWidth = Math.floor((width) * youtubePrewatch.getSetting("videoSize") / 100);
    //player sometimes does not want to hide -> move it out the screen
    youtubePrewatch.styleElement.innerHTML =
          "#youtubePrewatch {position:fixed;left:0;top:0;visibility:hidden;width:" + (width + 4) + "px;overflow:auto/*=> above flash*/;margin-left:-20000px; -moz-box-shadow: rgba(100, 100, 100, 0.6) 5px 5px 5px;z-index:1100}"
        + "#youtubePrewatch > .tooltipInner {background:" + colors[1] + ";color:" + colors[3] + ";border:2px solid " + colors[0] + ";min-height:130px;position:relative;}"
        + "#youtubePrewatch.state1,#youtubePrewatch.state2 {margin-left:0;visibility:visible;}  "
        + "#youtubePrewatch .preview {position:absolute;left:10px;top:30px;width:" + videoWidth + "px; height:" + (videoWidth * 3/4) + ";}"
        + " #youtubePrewatch dl, #youtubePrewatch p {margin: 5px 10px 5px " + (videoWidth + 20) + "px;color:inherit; padding:0;display:block}"
        + "#youtubePrewatch p {white-space:pre-line; max-height:20em; overflow:hidden;}"
        + " #youtubePrewatch b {margin: 0 0 5px " + (videoWidth + 15) + "px; padding:5px 10px 5px 5px ;display:block; background-color:" + colors[0] + ";color:" + colors[2] + "; -moz-border-radius-bottomleft:4px;}"
        + " #youtubePrewatch dt {font-weight:bold;clear:left;float:left;width:80px; overflow:hidden; margin:0;}"
        + " #youtubePrewatch dd {margin:0 0 5px 90px;padding:0;}"
        + " #youtubePrewatch.state2 img {display:none}"
        + " #youtubePrewatch.state1 #youtubePrewatchVideo {left:-20000px}"
        + " #youtubePrewatch .rating_gray {position:absolute;top:10px;left:10px;height:15px;width:75px; background:white url(http://s.ytimg.com/yt/img/master-vfl125983.png) repeat-x;background-position:-75px -411px}"
        + ".rating_red {position:absolute;background-color:rgba(200,0,0,1); background-image:inherit;height:15px;background-position:0 -411px;}"
        + "#mizSettingsOuter {position:absolute;top:0;right:0;overflow:hidden;padding-bottom:5px;display:" + (youtubePrewatch.getSetting("showSettingsLink") ? "block" : "none")+ "}"
        + "#mizSettingsContainer {background-color:" + colors[0] + ";color:" + colors[2] + "; -moz-border-radius-bottomleft:4px;list-style-type:none; -moz-box-shadow: rgba(100, 100, 100, 0.6) 3px 3px 5px;}"
        + "#mizSettingsContainer > li {padding:3px 6px;}"
        + "#mizSettingsContainer a {color:inherit;}";
  },
  
  initSettingsElement : function() {
    var container = document.getElementById("mizSettingsContainer")
    if (!container) {
      var outer = document.createElement("div");
      outer.id = "mizSettingsOuter";
      document.body.appendChild(outer);
      container = document.createElement("ul");
      container.id = "mizSettingsContainer";
      outer.appendChild(container);
    }
    
    var item = document.createElement("li");
    container.appendChild(item);
    
    var settingsA = document.createElement("a");
    settingsA.href = "javascript:;";
    settingsA.addEventListener("click", youtubePrewatch.showSettings, true);
    settingsA.appendChild(document.createTextNode(i18n("prewatch settings")))
    item.appendChild(settingsA);
  },
  
  /**
   * dynamically added nodes
   */
  initNodeInsertListener : function() {
    document.body.addEventListener("DOMNodeInserted",  function(evt) {
        youtubePrewatch.nodesInsertedLately++;
        if (youtubePrewatch.nodesInsertedLately < 50) {
          youtubePrewatch.activateAllTooltips(evt.target);
        }
        setTimeout(function() {youtubePrewatch.nodesInsertedLately--}, 1000);
      }, true);
  },
  nodesInsertedLately : 0,

  //checking if a tooltip has to be displayed; onmousemove-Listeners
  videoToDisplay : null,
  moveTooltip1 : function(evt) {
    youtubePrewatch.videoToDisplay = null;
  },
  moveTooltip2 : function(evt) {
    var data = youtubePrewatch.videoToDisplay;
    if (data == null) {
      if (youtubePrewatch.currentState != 3) {
        youtubePrewatch.currentVideoId = "";
        youtubePrewatch.showTooltip_state3();
      }
    } else if (youtubePrewatch.currentVideoId != data.id) {
      //new video => reinit
      if (youtubePrewatch.currentState != 3) {
        //stop old tooltip normal
        youtubePrewatch.showTooltip_state3();
      }
      youtubePrewatch.debug("Video changed to " + data.id);
      youtubePrewatch.currentVideoId = data.id;
      youtubePrewatch.showTooltip_state0();
    }
    if (youtubePrewatch.currentVideoId) {
      youtubePrewatch.tooltipElement.realX = evt.clientX;
      youtubePrewatch.tooltipElement.realY = evt.clientY;
      youtubePrewatch.renderTooltipPosition();
    }
  },
  //prevent video from changing / prevent tooltip from hiding
  moveTooltipMouseOverTooltip : function() {
    youtubePrewatch.videoToDisplay = {id: youtubePrewatch.currentVideoId};
  },
  checkMouseOutOfPage : function(evt) {
    if (evt.clientX < 0 || evt.clientX >= window.innerWidth
        || evt.clientY < 0 || evt.clientY >= window.innerHeight) {
      if (youtubePrewatch.currentState != 3) {
        youtubePrewatch.currentVideoId = "";
        youtubePrewatch.showTooltip_state3();
      }
    }
  },
  checkPageBlur : function(evt) {
    if (evt.target == document) {
      youtubePrewatch.currentVideoId = "";
      youtubePrewatch.showTooltip_state3();
    }
  },
  /* call it after position or size was changed */
  renderTooltipPosition : function() {
    var x = youtubePrewatch.tooltipElement.realX;
    var y = youtubePrewatch.tooltipElement.realY;
    var width = youtubePrewatch.getSetting("tooltipSize");
    youtubePrewatch.tooltipElement.style.left = 
          x > window.innerWidth - width - 30
          ? (x - width - 20) + "px"
          : (x + 20) + "px";
    youtubePrewatch.tooltipElement.style.top =
         Math.min(
           window.innerHeight - youtubePrewatch.tooltipElement.offsetHeight - 15
           , y) + "px";
  },
  
  //call every time onmousemove
  /**
   * displays a tooltip for a video
   * the function waits some time until the tooltip is displayed
   * @param id the id of the video
   * @param knownData:
   *        - name
   *        - duration (String)
   *        - previewImage (src)
   */
  showTooltip : function(id, knownData) {
    if (location.href.indexOf(id) > -1) {
      return;
    }
    if (!youtubePrewatch.tooltipInitialzed) {
      youtubePrewatch.initTooltip();
    }
    //evaluated by moveTooltip2
    youtubePrewatch.videoToDisplay = {"id" : id, "data" : knownData}
  },
  
  /*
   * tooltip states : 0 => not displayed, but prepare to display. 
   *                   1 => displayed, no video. This state loads video data if 
   *                        neccessary
   *                   2 => video mode
   *                   3 => not displayed / hidden
   */
  stateTimeout : 0,
  currentState : 3,
  /**
   * private; shows the tooltip in state 0 and starts the state 1 timer
   */
  showTooltip_state0 : function() {
    youtubePrewatch.currentState = 0;
    youtubePrewatch.debug("state 0");
    youtubePrewatch.stateTimeout = setTimeout(youtubePrewatch.showTooltip_state1,
          youtubePrewatch.getSetting("displayDelay",
            youtubePrewatch.defaultValues.displayDelay));
    youtubePrewatch.tooltipElement.className = "state0";
  },
  
  showTooltip_state1 : function() {
    youtubePrewatch.currentState = 1;
    youtubePrewatch.debug("state 1");
    //youtubePrewatch.tooltipElement.style.visibility = "visible";
    youtubePrewatch.tooltipElement.className = "state1";
    youtubePrewatch.stateTimeout = setTimeout(youtubePrewatch.showTooltip_state2,
          youtubePrewatch.getSetting("playDelay", 
            youtubePrewatch.defaultValues.playDelay));
    youtubePrewatch.displayVideoData();
  },
  
  showTooltip_state2 : function() {
    youtubePrewatch.currentState = 2;
    youtubePrewatch.debug("state 2");
    //youtubePrewatch.tooltipElement.style.visibility = "visible";
    youtubePrewatch.tooltipElement.className = "state2";
    var doMute = youtubePrewatch.pageVideoTooltipShow();
    youtubePrewatch.playVideo(youtubePrewatch.currentVideoId, doMute);
  },
  
  showTooltip_state3 : function() {
    youtubePrewatch.currentState = 3;
    youtubePrewatch.debug("state 3");
    clearTimeout(youtubePrewatch.stateTimeout);
    //youtubePrewatch.tooltipElement.style.visibility = "";
    youtubePrewatch.tooltipElement.className = "state3";
    youtubePrewatch.pageVideoTooltipHide()
    setTimeout('youtubePrewatch.stopVideo();', 0);
  },
  
  
  /* player */
  /**
   * starts playing the video with an id
   */
  playVideo : function(id, doMute) {
    youtubePrewatch.debug("Playing " + id);
    if (doMute) {
      var volume = 0;
    } else {
      var volume = youtubePrewatch.getSetting("volume");
    }
    var timeshiftPercent = youtubePrewatch.getSetting("timeshift",
        youtubePrewatch.defaultValues.timeshift);
    var timeshift = ((youtubePrewatch.videoData[id] 
          || {duration:0}).duration || 0) * timeshiftPercent / 100;
    if (!id) {
      return;
    }
    youtubePrewatch.debug("Volume " + volume + "; Start time: " + timeshift)
    setTimeout('youtubePrewatch.startVideo("' 
            + id + '", ' + timeshift + ', ' + volume + ');', 0);
  },
  
  
  displayVideoData : function() {
    var id = youtubePrewatch.currentVideoId
    if (!id) {
    } else if (typeof youtubePrewatch.videoData[id] == "undefined") {
      youtubePrewatch.tooltipTitleText.data = i18n("data loading");
      youtubePrewatch.tooltipTitleText.parentNode.className = "dataLoading";
      
      GM_xmlhttpRequest({
        method: "GET",
        url: "http://gdata.youtube.com/feeds/api/videos/" + id,
        onload: youtubePrewatch.reciveVideoData
      });
      //check if we got something
      setTimeout(function() {
        //TODO
      }, 1000);
      youtubePrewatch.videoData[id] = null;
      youtubePrewatch.displayEmptyVideoData();
    } else if (youtubePrewatch.videoData[id] === null) {
      youtubePrewatch.tooltipTitleText.data = i18n("data still loading");
      youtubePrewatch.tooltipTitleText.parentNode.className = "dataLoading";
      youtubePrewatch.displayEmptyVideoData();
    } else {
      youtubePrewatch.tooltipTitleText.parentNode.className = "";
      youtubePrewatch.tooltipTitleText.data = youtubePrewatch.videoData[id].title;
      youtubePrewatch.tooltipDescriptionText.data = youtubePrewatch.videoData[id].description;
      youtubePrewatch.tooltipAuthorText.data = youtubePrewatch.videoData[id].author;
      youtubePrewatch.tooltipPublishedText.data = i18n("%y", youtubePrewatch.videoData[id].published);
      youtubePrewatch.tooltipDurationText.data = i18n("%t", youtubePrewatch.videoData[id].duration * 1);
      youtubePrewatch.tooltipPreview.src = youtubePrewatch.videoData[id].image;
      youtubePrewatch.tooltipRating.style.width = youtubePrewatch.videoData[id].rating * 15 + "px";
      youtubePrewatch.checkForPreload(id);
    }
    youtubePrewatch.renderTooltipPosition();
  },
  
  /* empties every tooltip element except the title */
  displayEmptyVideoData : function() {
    youtubePrewatch.tooltipDescriptionText.data = "";
    youtubePrewatch.tooltipAuthorText.data = "";
    youtubePrewatch.tooltipPublishedText.data = "";
    youtubePrewatch.tooltipDurationText.data = "";
    youtubePrewatch.tooltipPreview.src = "";
    youtubePrewatch.tooltipRating.style.width = "0";
  },
  
  reciveVideoData : function(request) {
    var text = request.responseText;
    youtubePrewatch.debug(text);
    var data = {
      id         : (/videos\/([\w-]+)<\/id>/.exec(text) || [false,false])[1],
      title      : (/<title type='text'>([^<]+)/.exec(text) || [false,false])[1],
      description: (/<content type='text'>([^<]+)/.exec(text) || [false,false])[1],
      duration   : (/<yt:duration seconds='(\d+)'/.exec(text) || [false,false])[1],
      author     : (/<author><name>([^<]+)/.exec(text) || [false,false])[1],
      image      : (/thumbnail url='([^']+)/.exec(text) || [false,false])[1],
      rating     : (/<gd:rating average='([^']+)/.exec(text) || [false,false])[1],
      published  : (/<published>([^<]+)/.exec(text) || [false,false])[1],
    }
    youtubePrewatch.debug(data);
    for(index in data) {
      if (!data[index]) {
        youtubePrewatch.debug("Ein Element fehlt (" + index + ")")
        return;
      } else {
        data[index] = data[index].replace(/&lt;/, "<").replace(/&gt;/, ">")
            .replace(/&quot;/, "\"").replace(/&amp;/, "&")
      }
    }
    if (data.description.length > 200) {
      data.description = data.description.substr(0, 200).replace(/[^\s]*$/, "") + " ..."
    }
    var dateData = /(\d+)-(\d+)-(\d+)/.exec(data.published);
    data.published = new Date(parseInt(dateData[1]), parseInt(dateData[2]) - 1, 
        parseInt(dateData[3]));
    data.rating = Math.round(data.rating * 2) / 2;
    youtubePrewatch.videoData[data.id] = data;
    youtubePrewatch.displayVideoData();
  },
  
  checkForPreload : function(possibleid) {
    if (youtubePrewatch.currentVideoId != possibleid) {
      //only preload if the request was for the current video
      return;
    }
    if (!GM_getValue("preload", 
            youtubePrewatch.defaultValues["preload"] || false)) {
      //disabled
      return;
    }
    var id = possibleid;
    var timeshiftPercent = GM_getValue("timeshift", youtubePrewatch.defaultValues.timeshift);
    var timeshift = ((youtubePrewatch.videoData[id]|| {duration:0}).duration || 0) * timeshiftPercent / 100;
    if (!id) {
      return;
    }
    youtubePrewatch.debug("Cueing Start time: " + timeshift)
    setTimeout('youtubePrewatch.cueVideo("' 
            + id + '", ' + timeshift + ');', 0);
  },
  
  /**
   * Functions to start/stop page video
   */
  getPageVideoPalyerId : function() {
    if (document.getElementById("movie_player")) {
      return "movie_player"
    }
    return null;
  },
  //stops if settings require it
  //@return if the tooltip should be muted
  pageVideoTooltipShow : function() {
    var action = youtubePrewatch.getSetting("collissionAction");
    var player = youtubePrewatch.getPageVideoPalyerId();
    if (!player) {
      return false;
    } else if (action == "muteSmall") {
      return true;
    } else if (action == "mutePlayer") {
      setTimeout("document.getElementById('" + player + "').mute()", 0);
      return false;
    } else if (action == "pausePlayer") {
      setTimeout("document.getElementById('" + player + "').pauseVideo()", 0);
      return false;
    } else {
      return false;
    }
  },
  //undoes the stop
  pageVideoTooltipHide : function() {
    var action = youtubePrewatch.getSetting("collissionAction");
    var player = youtubePrewatch.getPageVideoPalyerId();
    if (!player) {
    } else if (action == "mutePlayer") {
      setTimeout("document.getElementById('" + player + "').unMute()", 0);
    } else if (action == "pausePlayer") {
      setTimeout("document.getElementById('" + player + "').playVideo()", 0);
    }
  },
  /* SETTINGS */
  /*
<?xml version="1.0"?>
<?xml-stylesheet href="chrome://global/skin/" type="text/css"?>
<window title="' + getText('settings') + '"
        xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" 
        xmlns:html="http://www.w3.org/1999/xhtml">
<box style="overflow:auto" orient="vertical" flex="1">

<dialogheader title="' + getText('Timing options') + '" 
    description="' + getText('when to display the tooltip') + '"/>
<vbox style="padding:0 1em 1em">
  <label value="' + getText('display delay') + '" id="displayDelayText" 
      labelsource="display video information after the mouse was %t over the element"/>
  <hbox>
    <spacer flex="1"/>
    <scale min="0" max="100" id="displayDelayScale" flex="2"/>
  </hbox>
  <label value="' + getText('additional play delay') + '" id="playDelayText" 
      labelsource="start playing video %t after the tooltip was displayed"/>
  <hbox>
    <spacer flex="1"/>
    <scale min="0" max="100" id="playDelayScale" flex="2"/>
  </hbox>
  <checkbox label="' + getText('start preloading the video when the tooltip is displayed') + '" id="preloadCheckbox"/>
</vbox>

<dialogheader title="' + getText('Play options') + '" 
    description="' + getText('how to play the mini video') + '"/>
<grid style="padding:0 1em 1em">
  <columns>
    <column flex="1"/>
    <column flex="2"/>
  </columns>
  <rows>
    <row>
      <label value="' + getText('volume') + '" id="volumeText" 
          labelsource="volume: %d%"/>
      <scale min="0" max="100" id="volumeScale"/>
    </row>
    <row>
      <label value="' + getText('timeshift') + '" id="timeshiftText" 
          labelsource="start position: %d%"/>
      <scale min="0" max="100" id="timeshiftScale"/>
    </row>
    <row>
      <label value="' + getText('if a video is played') + '"/>
       <menulist id="collissionActionMenulist">
        <menupopup>
          <menuitem label="' + getText('no action') + '" value="ignore"/>
          <menuitem label="' + getText('mute preview') + '" value="muteSmall"/>
          <menuitem label="' + getText('mute player') + '" value="mutePlayer"/>
          <menuitem label="' + getText('pause player') + '" value="pausePlayer"/>
        </menupopup>
      </menulist>
    </row>
  </rows>
</grid>

<dialogheader title="' + getText('Display') + '" 
    description="' + getText('ho souldd the tooltip look like') + '"/>
<grid style="padding:0 1em 1em">
  <columns>
    <column flex="1"/>
    <column flex="2"/>
  </columns>
  <rows>
    <row>
      <label value="' + getText('Size of the tooltip') + '" id="tooltipSizeLabel" 
        labelsource="Size of the tooltip: %dpx"/>
      <scale min="250" max="500" id="tooltipSize" flex="2"/>
    </row>
    <row>
      <label value="' + getText('Size of the video') + '" id="videoSizeLabel" 
        labelsource="Size of the video: %d%"/>
      <scale min="10" max="60" id="videoSize" flex="2"/>
    </row>
    <row>
      <label value="' + getText('Color theme') + '" id="size"/>
      <scale min="0" max="100" id="playDelayScale" flex="2"/>
       <menulist id="collissionActionMenulist">
        <menupopup>
          <menuitem label="' + getText('blue') + '" value="blue:lighblue"/>
          <menuitem label="' + getText('green') + '" value="green:lightgreen"/>
          <menuitem label="' + getText('red') + '" value="red:lightred"/>
          <menuitem label="' + getText('orange') + '" value="orange:lightorange"/>
          <menuitem label="' + getText('yellow') + '" value="yellow:yellow"/>
          <menuitem label="' + getText('black') + '" value="black:white"/>
        </menupopup>
      </menulist>
    </row>
  </rows>
</grid>
<dialogheader title="' + getText('About') + '" description="Youtube Prewatch 1.0"/>
  <vbox style="padding:0 1em 1em">
    <description>
      ' + getText('%s by %s', 'Youtube Prewatch', '<html:a href="http://userscripts.org/users/michaelz" target="_blank">Michael Z.</html:a>') + '
    </description>
    <description>
      ' + getText('Current Version: %s', '1.0b5') + '
    </description>
    <description>
      ' + getText('Language code (selected by Youtube): %s', document.documentElement.getAttribute('lang') ) + '
    </description>
    <description>
      ' + getText('More information at the scripts %s',
      '<html:a href="http://userscripts.org/scripts/show/55315" target="_blank" title="">' + getText('homepage') + '</html:a>') + ' 
    </description>
</vbox>
<spacer flex="1"/>
<hbox>
  <label value="' + getText('settings are automatically saved') + '"/>
  <spacer flex="1"/><button label="' + getText('close') + '" oncommand="close()"/>
</hbox>
</box>
</window>*/
  settingsWindow : null,
  /**
   * shows a popup with the settings
   */
  showSettings : function() {
    if (youtubePrewatch.settingsWindow != null && !youtubePrewatch.settingsWindow.closed) {
      youtubePrewatch.settingsWindow.focus()
      return;
    }
    
    function getText(text) {
      return i18n.apply(window, arguments);
    }
    
    var settingsCode = 'data:application/vnd.mozilla.xul+xml,'
     + encodeURIComponent('<?xml version="1.0"?> <?xml-stylesheet href="chrome://global/skin/" type="text/css"?> <window title="' + getText('settings') + '" xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" xmlns:html="http://www.w3.org/1999/xhtml"> <box style="overflow:auto" orient="vertical" flex="1"> <dialogheader title="' + getText('Timing options') + '" description="' + getText('when to display the tooltip') + '"/> <vbox style="padding:0 1em 1em"> <label value="' + getText('display delay') + '" id="displayDelayText" labelsource="display video information after the mouse was %t over the element"/> <hbox> <spacer flex="1"/> <scale min="0" max="100" id="displayDelayScale" flex="2"/> </hbox> <label value="' + getText('additional play delay') + '" id="playDelayText" labelsource="start playing video %t after the tooltip was displayed"/> <hbox> <spacer flex="1"/> <scale min="0" max="100" id="playDelayScale" flex="2"/> </hbox> <checkbox label="' + getText('start preloading the video when the tooltip is displayed') + '" id="preloadCheckbox"/> </vbox> <dialogheader title="' + getText('Play options') + '" description="' + getText('how to play the mini video') + '"/> <grid style="padding:0 1em 1em"> <columns> <column flex="1"/> <column flex="2"/> </columns> <rows> <row> <label value="' + getText('volume') + '" id="volumeText" labelsource="volume: %d%"/> <scale min="0" max="100" id="volumeScale"/> </row> <row> <label value="' + getText('timeshift') + '" id="timeshiftText" labelsource="start position: %d%"/> <scale min="0" max="100" id="timeshiftScale"/> </row> <row> <label value="' + getText('if a video is played') + '"/> <menulist id="collissionActionMenulist"> <menupopup> <menuitem label="' + getText('no action') + '" value="ignore"/> <menuitem label="' + getText('mute preview') + '" value="muteSmall"/> <menuitem label="' + getText('mute player') + '" value="mutePlayer"/> <menuitem label="' + getText('pause player') + '" value="pausePlayer"/> </menupopup> </menulist> </row> </rows> </grid> <dialogheader title="' + getText('About') + '" description="Youtube Prewatch 1.0"/> <vbox style="padding:0 1em 1em"> <description> ' + getText('%s by %s', 'Youtube Prewatch', '<html:a href="http://userscripts.org/users/michaelz" target="_blank">Michael Z.</html:a>') + ' </description> <description> ' + getText('Current Version: %s', '1.0b5') + ' </description> <description> ' + getText('Language code (selected by Youtube): %s', document.documentElement.getAttribute('lang') ) + ' </description> <description> ' + getText('More information at the scripts %s', '<html:a href="http://userscripts.org/scripts/show/55315" target="_blank" title="">' + getText('homepage') + '</html:a>') + ' </description> </vbox> <spacer flex="1"/> <hbox> <label value="' + getText('settings are automatically saved') + '"/> <spacer flex="1"/><button label="' + getText('close') + '" oncommand="close()"/> </hbox> </box> </window>');
    youtubePrewatch.settingsWindow = window.open(settingsCode);
    youtubePrewatch.settingsWindow.addEventListener("load", youtubePrewatch.settingsWindowLoad, true);
    youtubePrewatch.settingsWindow.addEventListener("close", function() {
      youtubePrewatch.settingsWindow = null;
    }, true);
  },
  
  /**
   * adds the events to the settings window and initiates all settings
   */
  settingsWindowLoad : function() {
    youtubePrewatch.settingsRegisterScale("playDelay");
    youtubePrewatch.settingsRegisterScale("displayDelay");
    youtubePrewatch.settingsRegisterPercentageScale("volume");
    youtubePrewatch.settingsRegisterPercentageScale("timeshift");
    youtubePrewatch.settingsRegisterMenulist("collissionAction");
    youtubePrewatch.settingsRegisterCheckbox("preload");
  },
  
  /*
   milliseconds = scaleValue ^ 2; 
   */
  settingsRegisterScale : function(settingName) {
    var settingName = settingName;
    var doc = youtubePrewatch.settingsWindow.document;
    var scale = doc.getElementById(settingName + "Scale")
    var scaleText =  doc.getElementById(settingName + "Text")
    var defaultValue = youtubePrewatch.defaultValues[settingName] || 500;
    var milliseconds = GM_getValue(settingName, defaultValue);
    var scaleValue = Math.round(Math.sqrt(milliseconds));
    
    scale.setAttribute("value", scaleValue + "");
    scaleText.setAttribute("value", i18n(scaleText.getAttribute("labelsource"), milliseconds / 1000));
    scale.addEventListener("change", function(evt) {
      var scaleValue = evt.target.getAttribute("value") * 1
      var milliseconds = scaleValue * scaleValue;
      youtubePrewatch.setSetting(settingName, milliseconds);
      scaleText.setAttribute("value", i18n(scaleText.getAttribute("labelsource"), milliseconds / 1000));
    }, true);
  },
  
  settingsRegisterPercentageScale : function(settingName) {
    var settingName = settingName;
    var doc = youtubePrewatch.settingsWindow.document;
    var defaultValue = youtubePrewatch.defaultValues[settingName] || 50;
    var scale = doc.getElementById(settingName + "Scale")
    var scaleText = doc.getElementById(settingName + "Text")
    scale.setAttribute("value", youtubePrewatch.getSetting(settingName));
    scaleText.setAttribute("value", i18n(scaleText.getAttribute("labelsource"),
        scale.getAttribute("value")*1));
    scale.addEventListener("change", function(evt) {
      youtubePrewatch.setSetting(settingName, evt.target.getAttribute("value") * 1);
      scaleText.setAttribute("value", i18n(scaleText.getAttribute("labelsource"),
          scale.getAttribute("value")*1));
    }, true);
  },
  
  settingsRegisterMenulist : function(settingName) {
    var settingName = settingName;
    var doc = youtubePrewatch.settingsWindow.document;
    var defaultValue = youtubePrewatch.defaultValues[settingName] || "";
    var list = doc.getElementById(settingName + "Menulist");
    
    list.setAttribute("value", youtubePrewatch.setSetting(settingName, defaultValue));
    list.addEventListener("command", function(evt) {
      youtubePrewatch.setSetting(settingName, evt.target.getAttribute("value"));
    }, true);
  },

  settingsRegisterCheckbox : function(settingName) {
    var settingName = settingName;
    var doc = youtubePrewatch.settingsWindow.document;
    var checkbox = doc.getElementById(settingName + "Checkbox");
    checkbox.setAttribute("checked", youtubePrewatch.setSetting(settingName, 
            youtubePrewatch.defaultValues[settingName] || false));
    checkbox.addEventListener("command", function(evt) {
      youtubePrewatch.setSetting(settingName, evt.target.getAttribute("checked") == "true");
    }, true);
  }
}
youtubePrewatch.unsafeWindow.youtubePrewatch = {
  registerElement : youtubePrewatch.registerElement,
  debug: youtubePrewatch.debug,
  cuedVideoId : null,
  /* 0: nothing cued/tooltip not displayed, 1: loading and should not play, 2: waying for play command, 3:should play, but still loading, 4:playing */
  cuedVideoStatus: 0,
  youtubePlayer : null,
  youtubePlayerReady : false
}

var unsafeWinText = " \
youtubePrewatch.cueVideo = function(videoid, timeshift /* in s */) { \
  youtubePrewatch.debug('recived cue command for ' + videoid + ' at '+ timeshift); \
  var videoid = videoid, timeshift = timeshift; \
  youtubePrewatch.executeWhenPlayerReady(function() { \
    youtubePrewatch.stopVideo(); \
    youtubePrewatch.debug('cueing: ' + videoid); \
    youtubePrewatch.youtubePlayer.loadVideoById(videoid, timeshift - 0.2, 'small'); \
    /*youtubePrewatch.youtubePlayer.pauseVideo();*/ \
    youtubePrewatch.cuedVideoStatus = 1; \
    youtubePrewatch.cuedVideoId = videoid; \
    youtubePrewatch.youtubePlayer.setVolume(0); \
  }); \
}; \
youtubePrewatch.executeWhenPlayerReady = function(func) { \
  if (!youtubePrewatch.youtubePlayer) { \
    youtubePrewatch.onPlayerLoad = func; \
    youtubePrewatch.loadPlayer(); \
  } else if (!youtubePrewatch.youtubePlayerReady) { \
    youtubePrewatch.onPlayerLoad = func; \
  } else { \
    func(); \
  } \
}; \
youtubePrewatch.startVideo = function(videoid, timeshift /* in s */, volume) { \
  youtubePrewatch.debug('recived start command for ' + videoid + ' at '+ timeshift); \
  var videoid = videoid, timeshift = timeshift; \
  youtubePrewatch.executeWhenPlayerReady(function() { \
    youtubePrewatch.debug('cued:' + youtubePrewatch.cuedVideoId + '; cur: '+ videoid); \
    if (youtubePrewatch.cuedVideoId != videoid) { \
      youtubePrewatch.debug('Wrong/no video was cued.');\
      youtubePrewatch.youtubePlayer.loadVideoById(videoid, timeshift, 'small'); \
      youtubePrewatch.cuedVideoId = videoid; \
      youtubePrewatch.cuedVideoStatus = 4; \
    } else if (youtubePrewatch.cuedVideoStatus == 1){ \
      youtubePrewatch.debug('Marking video to be started once it was load.');\
      youtubePrewatch.cuedVideoStatus = 3; \
    } else if (youtubePrewatch.cuedVideoStatus == 2) { \
      youtubePrewatch.debug('Playing video, because it was load');\
      youtubePrewatch.cuedVideoStatus = 4; \
      youtubePrewatch.youtubePlayer.playVideo(); \
    } else if (youtubePrewatch.cuedVideoStatus == 0) { \
      youtubePrewatch.debug('Video was not cued (staus 0)');\
      youtubePrewatch.youtubePlayer.loadVideoById(videoid, timeshift, 'small'); \
      youtubePrewatch.cuedVideoStatus = 4; \
    } \
    youtubePrewatch.youtubePlayer.setVolume(volume); \
  }); \
}; \
youtubePrewatch.stopVideoTimeout = null; \
youtubePrewatch.stopVideo = function() { \
  youtubePrewatch.debug('recived stop/reset command'); \
  youtubePrewatch.cuedVideoId = null; \
  youtubePrewatch.cuedVideoStatus = 0; \
  try { \
    youtubePrewatch.youtubePlayer.stopVideo(); \
  } catch (e) { \
    try {\
      youtubePrewatch.youtubePlayer.setVolume(0); \
      youtubePrewatch.youtubePlayer.clearVideo(); \
    } catch (e) { \
      if (youtubePrewatch.stopVideoTimeout) {\
        clearTimeout(youtubePrewatch.stopVideoTimeout);\
      }\
      youtubePrewatch.stopVideoTimeout = setTimeout(youtubePrewatch.stopVideo, 200);\
    } \
  }\
}; \
 \
youtubePrewatch.loadPlayer = function() { \
  /*player ready event*/ \
  if (window.onYouTubePlayerReady == 'function') { \
    youtubePrewatch.onYouTubePlayerReadyCascade = window.onYouTubePlayerReady; \
  } \
  window.onYouTubePlayerReady = youtubePrewatch.onYouTubePlayerReady; \
  \
  /*var t = '', fmt_url_map = ''; \
  var pagePlayer = document.getElementById('movie_player'); \
  if (pagePlayer) { \
    var result = /&t=([^&]+)/.exec(pagePlayer.getAttribute('flashvars')); \
    var result = /&fmt_url_map=([^&]+)/.exec(pagePlayer.getAttribute('flashvars')); \
    t = result ? result[1] : ''; \
    fmt_url_map = result ? result[1] : ''; \
  }*/ \
  document.getElementById('youtubePrewatchVideo').innerHTML += \
      '<embed id=\\'youtubePrewatchPlayer\\' height=\\'100%\\' width=\\'100%\\' '\
    + 'type=\\'application/x-shockwave-flash\\' '\
    + 'allowscriptaccess=\\'always\\' allowfullscreen=\\'true\\' '\
    + 'src=\\'http://www.youtube.com/apiplayer?rel=0&loop=1&iv_load_policy=3'\
      + '&enablejsapi=1&playerapiid=youtubePrewatchPlayer\\'>'; \
  youtubePrewatch.youtubePlayer \
                   = document.getElementById('youtubePrewatchPlayer'); \
}; \
\
youtubePrewatch.playerStatusChange = function(state) { \
  youtubePrewatch.debug('player state: ' + state + ', cue status: ' + youtubePrewatch.cuedVideoStatus);\
  if (state == 1) { \
    if (youtubePrewatch.cuedVideoStatus == 1) {\
      youtubePrewatch.debug('cued video was load. Pausing it until it has to be played.');\
      youtubePrewatch.cuedVideoStatus = 2; \
      youtubePrewatch.youtubePlayer.pauseVideo(); \
    } else if (youtubePrewatch.cuedVideoStatus == 3) {\
      youtubePrewatch.debug('cued video was finally load. It should be played now.');\
      youtubePrewatch.cuedVideoStatus = 4; \
    } else if (youtubePrewatch.cuedVideoStatus == 0) { \
      youtubePrewatch.debug('cued video was finally load, but has not to be played. stopping it.');\
      youtubePrewatch.youtubePlayer.pauseVideo(); \
      youtubePrewatch.youtubePlayer.stopVideo(); \
    }\
  } \
}; \
youtubePrewatch.onYouTubePlayerReadyCascade = function() {}; \
youtubePrewatch.onYouTubePlayerReady = function(playerId) { \
  if (playerId == 'youtubePrewatchPlayer') { \
    youtubePrewatch.youtubePlayerReady = true; \
    youtubePrewatch.onPlayerLoad(); \
    youtubePrewatch.onPlayerLoad = function(){}; \
    youtubePrewatch.youtubePlayer.addEventListener('onStateChange', \
      'youtubePrewatch.playerStatusChange'); \
  } else { \
    youtubePrewatch.onYouTubePlayerReadyCascade(playerId); \
  } \
}; ";
youtubePrewatch.unsafeWindow.setTimeout(unsafeWinText, 0);

youtubePrewatch.init();
if (GM_registerMenuCommand) {
  GM_registerMenuCommand(i18n("youtube prewatch: ") + i18n("settings"), youtubePrewatch.showSettings)
}
(function(){
function createButton(signOutText) {
	var LiSep = document.createElement('li');
	LiSep.className = "gbt gbtb";

	var Span = document.createElement('span');
	Span.className = "gbts";
	LiSep.appendChild(Span);

	var Li = document.createElement('li');
	Li.className = "gbt";

	var A = document.createElement('a');
	if (location.host == 'mail.google.com') {
		A.href = "https://www.youtube.com/?logout";
		A.setAttribute('onclick',"parent.location.href='https://www.youtube.com/?logout'");
	} else {
		A.href = "https://www.youtube.com/accounts/Logout?continue="+location.protocol+"//"+location.host+"/";
	}
	A.className = "gbgt";
	A.setAttribute('onmouseover', "this.className = 'gbgt gbgt-hvr'");
	A.setAttribute('onmouseout', "this.className = 'gbgt'");

	Span = document.createElement('span');
	Span.className = "gbtb2";
	A.appendChild(Span);

	Span = document.createElement('span');
	Span.className = "gbts";
	Span.innerHTML = signOutText;
	A.appendChild(Span);

	Li.appendChild(A);

	return {LiSep:LiSep,Li:Li}
}

function YouTube() {
	if(document.getElementById('canvas_frame')) {
		var frame = document.getElementById('canvas_frame');

		var signOutText = "Log out";
		if(frame.contentDocument.getElementById('gb_71'))
			signOutText = frame.contentDocument.getElementById('gb_71').innerHTML;

		var logoutButton = createButton(signOutText);

		frame.contentDocument.getElementById('gbg').getElementsByTagName('ol')[0].appendChild(logoutButton.LiSep);
		frame.contentDocument.getElementById('gbg').getElementsByTagName('ol')[0].appendChild(logoutButton.Li);
	}
	document.body.removeEventListener ("DOMNodeInserted", YouTube, false);
}

function YouTube() {
	var signOutText = "Log out";
	if(document.getElementById('gb_71'))
		var signOutText = document.getElementById('gb_71').innerHTML;

	var logoutButton = createButton(signOutText);
	document.getElementById('gbg').getElementsByTagName('ol')[0].appendChild(logoutButton.LiSep);
	document.getElementById('gbg').getElementsByTagName('ol')[0].appendChild(logoutButton.Li);
}

if (window.top == window.self) {
	if(location.host == 'user.youtube.com') {
		document.body.addEventListener ("DOMNodeInserted", YouTube, false);
	} else if(!document.getElementById('gb_70')) {
		YouTube();
	}
}
})()

