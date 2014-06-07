// -----------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// -----------------------------------------------------
// Author: Michael Zangl, michael@jautis.net
// Version 1.0pre7
// Date: 2009-08-21
//
// -----------------------------------------------------
//
// ==UserScript==
// @name            Youtube autoplay
// @namespace       http://www.jautis.net/
// @version         1.0pre7
// @description     plays related youtube videos automaticaly
// @include         http://www.youtube.com/watch*
// ==/UserScript==

/**
 * preferences:
 * <id>.watchedVideos = []
 * <id>.proposedVideos = [{id:..., name:..., rating: ...}]
 * <id>.lastAccess = unixTimestamp
 * <id>.settingVersion = settingVersion
 * settingVersion (random int after settings were changed);
 *
 * Video objects:
 *  id
 *  name
 *  compare      see getCompareString
 *  distance     Distance to the start video
 *  unliked      The number of times a video that has this one in its related
 *               list was marked as unliked.
 *  linked       the number of times the video was linked.
 *  rank         the advantage of ranks the video had. The first video has 1;
 *  rating       a temporary variable of the rating. Is automatically calculated
 *               by the proposed videos heap.
 */
const XULNS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
const DEBUG = false;


i18n_data = {};
i18n_data["en"] = {
  "start autoplay" : "autoplay",
  "stop autoplay" : "stop autoplay",
  "play next" : "next",
  "settings" : "settings",
  "mark as  unliked": "skip"
}
i18n_data["de"] = {
  "start autoplay" : "Autoplay starten",
  "stop autoplay" : "Autoplay stoppen",
  "play next" : "Nächstes",
  "settings" : "Einstellungen",
  "mark as  unliked": "Video überspringen",
  "next video: %s": "Nächstes Video: «%s»",
  "autoplay not started yet": "Autoplay noch nicht gestartet. " +
          "Klicken zu starten und zum springen zum nächsten Video.",
  "hate this": "Video hassen",
  "go to the next video and do not play the related videos of this one":
       "Spiele das nächste Video und werte die ähnlichen Videos von diesem ab.",
  //settings
  "Rating": "Bewertung",
  "video with the best rating will be played next":
      "Das Video mit der besten Bewertung wird als nächstes abgespielt.",
  "close to the start video": "Nahe am Startvideo.",
  "high in the related videos list": "Weit oben in der Ähnliche-Videos-Liste",
  "often related": "Oft verlinkt",
  "Play options": "Weitere Optionen",
  "what else affects the order of videos":
      "Was die Bewertung der Videos sonst noch beeinflusst",
  "randomisation": "Zufälligkeit",
  "do not play unliked videos": "Ungewollte Videos abwerten",
  "do not play videos with the same title twice":
      "Kein Video mit einem öhnlichen Titel nochmal spielen",
  "About": "Über",
  "%s by %s": "%s von %s",
  "Current Version: %s": "Aktuelle Version: %s",
  "Language code (selected by Youtube): %s": "Sprachcode (von Youtube): %s",
  "settings are automatically saved": "Einstellungen werden automatisch gespeichert.",
  "close": "Schließen"
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
    } else {
      text += arguments[i];
    }
  }
  return text;
}

/**
 * constructs a heap that allows you to quickly chose the best rated videos
 */
function VideoHeap() {
  if (arguments[0]) {
    youtubeAutoplay.debug("constructed with " + arguments[0].length + " elements");
    this.array = arguments[0];
  }
}
//invariant: array[i] <= array [i*2 + 1] && array[i] <= array [i*2 + 2]
VideoHeap.prototype.array = [];
//checks the invariant
VideoHeap.prototype.check = function() {
  var correct = true;
  for (var i = 1; i < this.array.length; i++) {
    if (this.array[i].rating > this.array[Math.ceil(i/2) - 1].rating) {
      youtubeAutoplay.debug("Error in Heap: " + i + " should be smaller than " + (Math.ceil(i/2) - 1))
      correct = false;
    }
  }
  return correct;
}
/**
 * rebuilds the heap. Use it if ratings ettings have changed.
 */
VideoHeap.prototype.rebuild = function() {
  for (var i = 0; i < this.array.length; i++) {
    this.array[i].rating = youtubeAutoplay.getRating(this.array[i]);
  }
  youtubeAutoplay.debug("rebuilding " + this.array.length + " elements");
  this.array.sort(function(v1, v2) {
    return v1.rating < v2.rating ? 1
         : v1.rating > v2.rating ? -1
         :                         0});
}
/**
 * sets the array of the heap
 * @param array must be a valid heap array
 */
VideoHeap.prototype.setArray = function(array) {
  this.array = array;
}
/**
 * gets the current heap array.
 * use getFirst or hasVide/getVideo instead.
 */
/*VideoHeap.prototype.getArray = function() {
  return this.array;
}*/
/**
 * gets the current number of videos in the heap
 */
VideoHeap.prototype.getLength = function() {
  return this.array.length;
}
/**
 * removes the first element
 * @return the first element
 */
VideoHeap.prototype.getFirst = function(id) {
  return this.array[0];
}
/**
 * removes the first element
 * @return the first element
 */
VideoHeap.prototype.removeFirst = function(id) {
  var first = this.array[0];
  this.array[0] = this.array.pop();
  this.siftDown(0);
  return first;
}
/**
 * gets an video by its id
 * @return the video or null if it does not exist.
 */
VideoHeap.prototype.getVideoById = function(id) {
  for (var i = 0; i < this.array.length; i++) {
    if (this.array[i].id == id) {
      return this.array[i];
    }
  }
  return null;
}
/**
 * checks if a video with an id is in the heap
 */
VideoHeap.prototype.hasVideoWithId = function(id) {
  for (var i = 0; i < this.array.length; i++) {
    if (this.array[i].id == id) {
      return true;
    }
  }
  return false;
}
/**
 * gets an video by its id
 * @return the video or null if it does not exist.
 */
/*VideoHeap.prototype.getVideoByIndex = function(index) {
  return this.array[index];
}*/

/**
 *
 */
VideoHeap.prototype.getVideo = function(video) {
  for (var i = 0; i < this.array.length; i++) {
    if (youtubeAutoplay.compareVideos(video, this.array[i])) {
      return this.array[i];
    }
  }
  return null;
}
/**
 * gets an video by its id
 * @return true if the video was updatet, false if it was not found
 */
VideoHeap.prototype.updateVideo = function(id, video) {
  for (var i = 0; i < this.array.length; i++) {
    if (this.array[i].id == id) {
      this.array[i] = video;
      this.array[i].rating = youtubeAutoplay.getRating(video);
      this.sift(i);
      return true
    }
  }
  return false;
}

/**
 * gets an video by its id
 * @return true if the video was updatet, false if it was not found
 */
VideoHeap.prototype.removeVideoById = function(id) {
  youtubeAutoplay.debug("removing id " + id + "")
  for (var i = 0; i < this.array.length; i++) {
    if (this.array[i].id == id) {
      var oldRating = this.array[i].rating;
      if (i < this.array.length - 1) {
        this.array[i] = this.array.pop();
        if (oldRating > this.array[i].rating) {
          this.siftDown(i);
        } else {
          this.siftUp(i);
        }
        youtubeAutoplay.debug("id " + id + " removed")
      }
      return true
    }
  }
  youtubeAutoplay.debug("id " + id + " not found")
  return false;
}

/**
 * gets an video by its id
 */
VideoHeap.prototype.insertVideo = function(video) {
  video.rating = youtubeAutoplay.getRating(video);
  this.array.push(video);
  this.siftUp(this.array.length - 1);
}

//private
VideoHeap.prototype.switch = function(index1, index2) {
  youtubeAutoplay.debug("switch: " + index1 + "←→" + index2)
  var video = this.array[index1];
  this.array[index1] = this.array[index2];
  this.array[index2] = video;
}

/**
 * let a video shift, if the invariant is not correct around it.
 * the direction is automaticaly calculated.
 */
VideoHeap.prototype.sift = function(index) {
  if (index > 0 && this.array[index].rating
          > this.array[Math.ceil(index / 2) - 1].rating) {
    this.siftUp(index);
  } else {
    this.siftDown(index);
  }
}
/* private. reconstructs the invariant by moving an element down the tree */
VideoHeap.prototype.siftDown = function(index) {
  //switch with the subtree element that is bigger
  if ( index * 2 + 2  < this.array.length
      && this.array[index * 2 + 1].rating < this.array[index * 2 + 2].rating) {
    //switch with the right one
    // only switch if the right child is bigger than the current element
    if (this.array[index * 2 + 2].rating > this.array[index].rating) {
      this.switch(index, index * 2 + 1);
      this.siftDown(index * 2 + 2);
    }
  } else if (index * 2 + 1 < this.array.length) {
    //switch with the left one
    // only switch if the left child is bigger than the current element
    if (this.array[index * 2 + 1].rating > this.array[index].rating) {
      this.switch(index, index * 2 + 1);
      this.siftDown(index * 2 + 1);
    }
  }
}
VideoHeap.prototype.siftUp = function(index) {
  if (index < 1) {
    return;
  }
  var newIndex = Math.ceil(index / 2) - 1;
  //sift up if the rating of the current element (lower) is bigger than the one
  //of the upper element
  if (this.array[index].rating > this.array[newIndex].rating) {
    this.switch(index, newIndex)
    this.siftUp(newIndex);
  }
}
/**
 * gets the source
 * @return the source of this object
 */
VideoHeap.prototype.toSource = function() {
  return "new VideoHeap(" + this.array.toSource() + ")";
}

var youtubeAutoplay = {
  /* how long is a session saved ?*/
  SAVE_DAYS : 2,

  /* the id of the autoplay session, or 0 if no session is set. */
  autoplaySession : 0,
  proposedVideos : new VideoHeap(),
  watchedVideos : [],

  startLinkTextNode : null,

  currentVideo : {},

  /* calculate once, so if getNextVideo is called twice there are no problems */
  randomConstant : Math.random(),

  /* initializes the text */
  init: function() {
    youtubeAutoplay.addLinks();
    var autoplayFound = location.href.match(/#autoplay(\d+)/);
    if (autoplayFound) {
      youtubeAutoplay.resumeAutoplay(autoplayFound[1]);
      youtubeAutoplay.checkForError();
    }
  },

  debug : function(data) {
    if (!DEBUG) {
    } else if (typeof unsafeWindow.console == "object") {
      unsafeWindow.console.debug(data)
    } else {
      GM_log(data)
    }
  },

  /* SESSION MANAGEMENT */

  /** loads the videos for the current session from the storage, and overwrites the old ones. */
  loadVideoSession : function() {
    //assert autoplaySession != 0
    var videos = GM_getValue(youtubeAutoplay.autoplaySession + ".proposedVideos", null);
    try {
      youtubeAutoplay.debug("Video data:  " + videos)
      var videos = eval(videos);
    } catch(e) {
      youtubeAutoplay.debug("Eval-Error: " + e)
      var videos = new VideoHeap();
    }
    if (typeof videos.getFirst == "undefined") {
      var videos = new VideoHeap();
    }
    //if settings were changed
    if (GM_getValue(youtubeAutoplay.autoplaySession + ".settingVersion", 0)
        != GM_getValue("settingVersion", 1)) {
      videos.rebuild();
    }

    youtubeAutoplay.proposedVideos = videos;

    // watched videos
    var videos = GM_getValue(youtubeAutoplay.autoplaySession + ".watchedVideos", "[]");
    try {
      youtubeAutoplay.watchedVideos = eval(videos);
    } catch(e) {
      youtubeAutoplay.debug("Eval-Error: " + e)
      youtubeAutoplay.watchedVideos = [];
    }
    GM_setValue(youtubeAutoplay.autoplaySession + ".lastAccess", (new Date()).getTime()+"");
  },

  /**  saves the videos of the current session */
  saveVideoSession : function() {
    //assert autoplaySession != 0
    GM_setValue(youtubeAutoplay.autoplaySession + ".proposedVideos", youtubeAutoplay.proposedVideos.toSource());
    GM_setValue(youtubeAutoplay.autoplaySession + ".watchedVideos", youtubeAutoplay.watchedVideos.toSource());
    GM_setValue(youtubeAutoplay.autoplaySession + ".lastAccess", (new Date()).getTime()+"");
    GM_setValue(youtubeAutoplay.autoplaySession + ".settingVersion",
      GM_getValue("settingVersion", 0));
  },

  /* cleans up the sessions */
  deleteOldSessions : function() {
    var allValues = GM_listValues();
    var minimalTimestamp = (new Date()).getTime() - youtubeAutoplay.SAVE_DAYS * 24 * 60 * 60 * 1000;
    for (var i = 0; i < allValues.length; i++) {
      if (allValues[i].indexOf(".lastAccess")> -1
        && GM_getValue(allValues[i]) * 1 < minimalTimestamp) {
        youtubeAutoplay.deleteSession(allValues[i].replace(".lastAccess", ""));
      }
    }
  },

  deleteSession: function(sessionId) {
    GM_deleteValue(sessionId + ".proposedVideos");
    GM_deleteValue(sessionId + ".watchedVideos");
    GM_deleteValue(sessionId + ".lastAccess");
  },

  /*       VIDEO LISTS */

  getRating : function(video) {
    youtubeAutoplay.debug(
        "rank: " + video.rank + "=>" + Math.max(0, 1 - video.rank / 20) + "*" +  youtubeAutoplay.getSetting("ratingRank")
        + "\nlinked: " + video.linked + "=>" + (-1 / (video.linked) + 1) * youtubeAutoplay.getSetting("ratingLinked")
        + "\ndistance: " + video.distance + "=>" + (-1 / (video.distance) + 1) * youtubeAutoplay.getSetting("ratingDistance")
        + "\n*unliked: " + video.unliked + "=>" + Math.pow(youtubeAutoplay.getSetting("unlikedFactor"), video.unliked));
    var rating = ( 1 / (video.distance) * youtubeAutoplay.getSetting("ratingDistance")
          + (-1 / (video.linked) + 1) * youtubeAutoplay.getSetting("ratingLinked")
          + Math.max(0, 1 - video.rank / 20) *  youtubeAutoplay.getSetting("ratingRank"))
      * Math.pow(1-youtubeAutoplay.getSetting("unlikedFactor"), video.unliked);
   youtubeAutoplay.debug(rating);
   rating *= 1 + (Math.random() - 0.5) * youtubeAutoplay.getSetting("randomisationFactor");
   return rating;
  },

  recalculateRatings : function() {
    GM_getValue("settingVersion", Math.floor(Math.random() * 10000));
    youtubeAutoplay.proposedVideos.rebuild();
    youtubeAutoplay.saveVideoSession();
  },
  /**
   * recalculates all ratings like recalculateRatings, but waits a moment before
   * doing so.
   */
  recalculateRatings_timeout : false,
  recalculateRatings2 : function() {
    if (youtubeAutoplay.recalculateRatings_timeout !==  false) {
      clearTimeout(youtubeAutoplay.recalculateRatings_timeout);
    }
    youtubeAutoplay.recalculateRatings_timeout = setTimeout(youtubeAutoplay.recalculateRatings, 500);
  },

  // Todo: use a hash table of compare strings and move this to rating?
  compareVideos : function(video1, video2) {
    return GM_getValue("useCompareString", false) == true
              ? video1.compare == video2.compare
              : video1.id == video2.id;
  },

  getNextVideo : function() {
    /**
     * TODO: (?)
     * for randomisation, we use a linear function. its highest point is at x=0
     * it reaches zero at |proposedVideos| / randomisationFactor. f(x) is the
     * possibility with wich a video is played.
     *
     * currently we just use a simple x^2-function
     */
    //TODO: fix unsafeWindow problem!
    /*var randomisationFactor = youtubeAutoplay.getSetting("randomisationFactor");
    randomisationFactor = Math.min(1, Math.abs(randomisationFactor));

    var maxIndex = (youtubeAutoplay.proposedVideos.getLength() - 1) * randomisationFactor;
    var temporaryRandomConstant = (youtubeAutoplay.randomConstant
        + randomisationFactor * 13 * youtubeAutoplay.randomConstant) % 1;
    //f(rand) = floor(c * x^2); f(0) = 0; f(1) = maxIndex; c = maxIndex
    var index = Math.floor(temporaryRandomConstant * temporaryRandomConstant * maxIndex);
    if (index == NaN || !youtubeAutoplay.proposedVideos.getVideoByIndex(index)) {
      youtubeAutoplay.debug("wrong index: " + index)
      index = 0;
    }*/
    return youtubeAutoplay.proposedVideos.getFirst();
  },

  // loads the current video variable
  loadCurrentVideo : function() {
    var id = unsafeWindow.pageVideoId;
    if (!id) {
      return;
    }
    
    var name = document.title.replace("YouTube - ", "");
    var video = youtubeAutoplay.proposedVideos.getVideoById(id);
    if (video) {
      youtubeAutoplay.currentVideo = video;
      youtubeAutoplay.proposedVideos.removeVideoById(id)
    } else {
      //watrching a video that was never seen bevore
      youtubeAutoplay.currentVideo = {
          id        : id,
          name      : name,
          compare   : youtubeAutoplay.getCompareStringForName(name),
          distance  : 0, //start
          unliked   : 0,
          linked    : 1,
          rank      : 1
      };
    }
    youtubeAutoplay.watchedVideos.push(youtubeAutoplay.currentVideo);
  },
  
  /** adds a possible video to the list or increases the rank of a given one */
  addPossibleVideo : function(video, currentRank) {
    var oldVideo = youtubeAutoplay.proposedVideos.getVideoById(video.id);
    if (oldVideo != null) {
      youtubeAutoplay.debug("Updating possible video " + video.id)
      youtubeAutoplay.debug(youtubeAutoplay.currentVideo);

      oldVideo.distance = Math.min(oldVideo.distance, youtubeAutoplay.currentVideo.distance + 1);
      oldVideo.rank = (oldVideo.rank * oldVideo.linked + currentRank) / (oldVideo.linked + 1);
      oldVideo.linked++;
      youtubeAutoplay.proposedVideos.updateVideo(oldVideo.id, oldVideo);
    } else {
      youtubeAutoplay.debug("Adding possible video " + video.id)
      //add it
      video.distance = youtubeAutoplay.currentVideo.distance + 1;
      video.unliked = 0;
      video.linked = 1;
      video.rank = currentRank;
      youtubeAutoplay.proposedVideos.insertVideo(video);
    }
  },

  videoWasWatched : function(video) {
    var video1 = video;
    return youtubeAutoplay.watchedVideos.some(function(video2) {
      return youtubeAutoplay.compareVideos(video1, video2);
    });
  },

  loadPageVideos : function() {
    //search related videos
    var videos = youtubeAutoplay.getVideosOnPage();
    for (var index = 0; index < videos.length; index++) {
      if (youtubeAutoplay.videoWasWatched(videos[index]) || !videos[index].id) {
        continue;
      } else {
        youtubeAutoplay.addPossibleVideo(videos[index], index);
      }
    }

  },


  /*
   * checks if youtube shows an error, and skips the next movie. Because we
   possibly came to this error while trying to open the next video TODO!!
   * @rturn if there was an error*/
  checkForError : function() {
    if (document.getElementById("error-box")) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * @return an array of videos that are on the page.
   */
  getVideosOnPage : function() {
     //search related videos
    var panel = document.getElementById("watch-related-discoverbox");
    if (!panel) {
      return [];
    }

    var possibleDivs = panel.getElementsByTagName("div");
          panel.addEventListener('mouseover', function(evt) {
        var as = evt.target.getElementsByTagName("a");
        Array.forEach(as, function(a) {
          if (a.href.indexOf("v=")) {
            a.href = a.href.replace(/#autoplay\d+/, "");
            if (youtubeAutoplay.autoplaySession != 0) {
              a.href += "#autoplay" + youtubeAutoplay.autoplaySession;
            }
          }
        })
      }, true)
    var videos = [];

    for (var divIndex = 0; divIndex < possibleDivs.length; divIndex++) {
      if (!possibleDivs[divIndex].className
        || possibleDivs[divIndex].className.indexOf("video-entry") < 0) {
        continue;
      }


      var data = youtubeAutoplay.getVideoByDiv(possibleDivs[divIndex]);
      videos.push(data);
    }
    return videos;
  },

  /**
   * gets a video for a given div of a related videos list
   * @return an array of small video objects with the properties name, id and compare
   */
  getVideoByDiv : function(div) {
    var a = div.getElementsByTagName("a")[3];
    var idMatch = /v=([\w-]+)/.exec(a.href)
    return {name: a.title,
            id: idMatch ? idMatch[1] : "",
            compare: youtubeAutoplay.getCompareStringForName(a.title)}
  },

  /**
   * returns a string that represents the title of the video. If two videos have
   * the same CompareString, they are most likely the same.
   */
  getCompareStringForName : function(name) {
    var match = /\"([^\"]+)\"/.exec(name + "");
    var realname = match ? match[1] : (name + "").replace(/^[^\-]+\-|\([^\(]*\)/g, "");
    return realname.replace(/\W/g, "").toLowerCase();
  },

  /** marks all related videos as unliked */
  unlikeThisVideo : function() {
    var videos = youtubeAutoplay.getVideosOnPage();
    for (var i = 0; i < videos.length; i++) {
      youtubeAutoplay.debug("video " + i + "; id=" + videos[i].id)
      var video = youtubeAutoplay.proposedVideos.getVideoById(videos[i].id);
      if(video) {
        youtubeAutoplay.debug("video: " + video);
        video.unliked += 2 - i * 0.05;
        youtubeAutoplay.proposedVideos.updateVideo(videos[i].id, video);
      }
    }
    youtubeAutoplay.saveVideoSession();
  },


  /*           INTERACTIVITY     */
  // ads an "autoplay"-link to the related videos list
  addLinks : function() {
    var panel = document.getElementById("watch-related-videos-panel");
    if (!panel) {
      return false;
    }
    var linkDiv = document.createElement("div");
    linkDiv.className = "expand-content floatR";
    panel.insertBefore(linkDiv, panel.firstChild);

    var link = document.createElement("a");
    youtubeAutoplay.startLinkTextNode = document.createTextNode(i18n("start autoplay"));
    link.appendChild(youtubeAutoplay.startLinkTextNode);
    link.href = "javascript:;"
    link.addEventListener("click", function() {
      if (youtubeAutoplay.autoplaySession == 0) {
        youtubeAutoplay.startAutoplay();
      } else {
        youtubeAutoplay.stopAutoplay();
      }
    }, true);
    linkDiv.appendChild(link);

    var seperator = document.createElement("a");
    seperator.appendChild(document.createTextNode(" | "));
    seperator.className = "smallText grayText";
    linkDiv.appendChild(seperator);

    var link = document.createElement("a");
    link.appendChild(document.createTextNode(i18n("play next")));
    link.href = "javascript:;"
    link.addEventListener("click", function() {
      if (youtubeAutoplay.autoplaySession == 0) {
        youtubeAutoplay.startAutoplay();
      }
      youtubeAutoplay.playNextVideo();
    }, true);
    link.addEventListener("mouseover", function(evt) {
      if (youtubeAutoplay.autoplaySession && youtubeAutoplay.getNextVideo()) {
        evt.target.title = i18n("next video: %s", youtubeAutoplay.getNextVideo().name);
      } else {
        evt.target.title = i18n("autoplay not started yet");
      }
    }, true);
    linkDiv.appendChild(link);

    linkDiv.appendChild(document.createElement("br"));

    var link = document.createElement("a");
    link.appendChild(document.createTextNode(i18n("settings")));
    link.href = "javascript:;"
    link.addEventListener("click", function() {
      youtubeAutoplay.showSettings();
    }, true);
    linkDiv.appendChild(link);

    var seperator = document.createElement("a");
    seperator.appendChild(document.createTextNode(" | "));
    seperator.className = "smallText grayText";
    linkDiv.appendChild(seperator);

    var link = document.createElement("a");
    link.appendChild(document.createTextNode(i18n("hate this")));
    link.href = "javascript:;"
    link.addEventListener("click", function() {
      if (youtubeAutoplay.autoplaySession == 0) {
        youtubeAutoplay.startAutoplay();
      }
      youtubeAutoplay.unlikeThisVideo();
      youtubeAutoplay.playNextVideo();
    }, true);
    link.title = i18n("go to the next video and do not play the related videos of this one");
    youtubeAutoplay.playNextLink = link;
    linkDiv.appendChild(link);

    // clean right
    GM_addStyle("#watch-related-vids-body {clear:right}");
  },

  /* resumes the autoplay session, and adds the listeners for the next video */
  resumeAutoplay : function(sessionID) {
    if (youtubeAutoplay.startLinkTextNode) {
      youtubeAutoplay.startLinkTextNode.data = i18n("stop autoplay");
    }

    youtubeAutoplay.autoplaySession = sessionID;
    location.href = location.href.replace(/#+(autoplay\d+)?/, "")
        + "#autoplay" + youtubeAutoplay.autoplaySession;
    youtubeAutoplay.loadVideoSession();
    youtubeAutoplay.loadCurrentVideo();
    youtubeAutoplay.loadPageVideos();
    youtubeAutoplay.saveVideoSession();
    youtubeAutoplay.startNextVideoInterval();
  },

  /* start the autoplaying, and delete the old session */
  startAutoplay : function() {
    if (youtubeAutoplay.startLinkTextNode) {
      youtubeAutoplay.startLinkTextNode.data = i18n("stop autoplay")
    }
    youtubeAutoplay.autoplaySession = Math.ceil(Math.random() * 10000);
    location.href = location.href.replace(/#+(autoplay\d+)?/, "")
        + "#autoplay" + youtubeAutoplay.autoplaySession;
    youtubeAutoplay.proposedVideos = new VideoHeap();
    youtubeAutoplay.loadCurrentVideo();
    youtubeAutoplay.loadPageVideos();
    youtubeAutoplay.saveVideoSession();

    youtubeAutoplay.startNextVideoInterval();
    youtubeAutoplay.deleteOldSessions();
  },

  /* stop autoplaying */
  stopAutoplay : function() {
    if (youtubeAutoplay.startLinkTextNode) {
      youtubeAutoplay.startLinkTextNode.data = i18n("start autoplay");
    }
    location.href = location.href.replace(/#+(autoplay\d+)?/, "#")
    youtubeAutoplay.autoplaySession = 0;
    youtubeAutoplay.stopNextVideoInterval();
    youtubeAutoplay.deleteOldSessions();
  },

  /**
   * opens the site of the next video
   */
  playNextVideo : function() {
    if (youtubeAutoplay.autoplaySession == 0) {
      return;
    }
    youtubeAutoplay.stopNextVideoInterval();
    nextVideo = youtubeAutoplay.getNextVideo();
    location.href = "/watch?v=" + nextVideo.id + "&feature=related#autoplay"
      + youtubeAutoplay.autoplaySession;

  },


  /* check all 100ms if the video has terminated. */
  /*
   * this bloody flash does not allow access out of safe window, and we dont
   * have access to GM function in unsafeWindow. so we need this dirty trick :-(
   */
  finishedPlayback  : false,
  nextVideoInterval : -1,
  unsafeNextVideoInterval : -1,
  /**
   * starts an interval that checks if the video was finished yet
   * and plays the next video if it was finished.
   */
  startNextVideoInterval : function() {
    youtubeAutoplay.stopNextVideoInterval();

    //this bloody flash...
    // use a string => executed in unsafe Window
    youtubeAutoplay.unsafeNextVideoInterval = setInterval(
        'var p = document.getElementById("movie_player");'
      + 'var finishedPlayback = false;'
      + 'try {var isPlaying = p.GetVariable("movie.is_playing");'
      + 'if (isPlaying == null) {'
      + 'isPlaying = p.GetVariable("is_playing");'
      + '}'
      + 'var restart = p.GetVariable("movie.restart");'
      + 'if (restart == null) {'
      + 'restart = p.GetVariable("restart");'
      + '}'
        //export for save window
      + 'youtubeAutoplay.finishedPlayback = isPlaying == "false" && restart == "true";'
      + '} catch (err) {'
        //export for save window
      + 'youtubeAutoplay.finishedPlayback = p.GetVariable("is_playing") == "false" && p.GetVariable("restart") == "true";'
      + '}'
    , 100);
    youtubeAutoplay.nextVideoInterval = setInterval(function() {
      if (youtubeAutoplay.finishedPlayback && youtubeAutoplay.autoplaySession != 0) {
        youtubeAutoplay.playNextVideo();
      }
    }, 50)
  },

  /**
   * stops the interval that checks if the video was finished.
   * call it after the finihing of the video was handeled
   */
  stopNextVideoInterval : function() {
    if (youtubeAutoplay.nextVideoInterval > -1) {
      clearInterval(youtubeAutoplay.nextVideoInterval);
      youtubeAutoplay.nextVideoInterval = -1
    }
    if (youtubeAutoplay.unsafeNextVideoInterval > -1) {
      clearInterval(youtubeAutoplay.unsafeNextVideoInterval);
      youtubeAutoplay.unsafeNextVideoInterval = -1
    }
  },


  /* SETTINGS */
  /*
<?xml version="1.0"?>
<?xml-stylesheet href="chrome://global/skin/" type="text/css"?>
<window title="' + getText('settings') + '"
        xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
        xmlns:html="http://www.w3.org/1999/xhtml">

<dialogheader title="' + getText('Rating') + '" description="' + getText('video with the best rating will be played next') + '"/>
<vbox style="padding:0 1em 1em">
  <hbox id="ratingParts">
    <box value="" style="background: #3191FF;height:40px;" flex="1" id="ratingDistance"/>
    <splitter collapse="both" id="ratingSplitter1"/>
    <box value="" style="background: #1F35FF;height:40px;" flex="1" id="ratingRank"/>
    <splitter collapse="both" id="ratingSplitter2"/>
    <box value="" style="background: #001AFF;height:40px" flex="1" id="ratingLinked"/>
  </hbox>
  <hbox>
    <box flex="1">
      <box style="background:#3191FF;width:1.5em;height:1em;margin:.3em;"/>
      <label value="' + getText('close to the start video') + '"/>
    </box>
    <box flex="1">
      <box style="background:#1F35FF;width:1.5em;height:1em;margin:.3em;"/>
      <label value="' + getText('mostly high in the related videos list') + '"/>
    </box>
    <box flex="1">
      <box style="background: #001AFF;width:1.5em;height:1em;margin:.3em;"/>
      <label value="' + getText('often related') + '"/>
    </box>
  </hbox>
</vbox>

<dialogheader title="' + getText('Play options') + '" description="' + getText('what else affects the order of videos') + '"/>
<vbox style="padding:0 1em 1em">
  <grid>
    <columns>
      <column/>
      <column flex="1"/>
    </columns>
    <rows flex="1">
      <row>
        <label value="' + getText('randomisation') + '"/>
        <scale min="0" max="100" id="randomisationScale"/>
      </row>
      <row>
        <label value="' + getText('do not play unliked videos') + '"/>
        <scale min="0" max="100" id="unlikedScale"/>
      </row>
    </rows>
  </grid>
  <checkbox id="useCompareString" label="' + getText('do not play videos with the same title twice') + '"/>
</vbox>

<dialogheader title="' + getText('About') + '" description="Youtube autoplay 1.0"/>
  <vbox style="padding:0 1em 1em">
  <label value="' + getText('%s by %s', 'Youtube Autoplay', 'Michael Z.') + '"/>
  <label value="' + getText('Current Version: %s', '1.0pre7') + '"/>
+  <label value="' + getText('Language code (selected by Youtube): %s', document.documentElement.getAttribute('lang')) + '"/>  <description>
    More information at the scripts
    <html:a href="http://userscripts.org/scripts/show/54901" target="_blank">homepage</html:a>
  </description>
</vbox>
<spacer flex="1"/>
<hbox>
  <label value="' + getText('settings are automatically saved') + '"/>
  <spacer flex="1"/><button label="' + getText('close') + '" oncommand="close()"/>
</hbox>
</window>*/
  settingsWindow : null,
  /**
   * shows a popup with the settings
   */
  showSettings : function() {
    if (youtubeAutoplay.settingsWindow != null && !youtubeAutoplay.settingsWindow.closed) {
      return;
    }

    function getText(text) {
      return i18n.apply(window, arguments).replace(/\"/g, "&quot;");
    }

    var settingsCode = 'data:application/vnd.mozilla.xul+xml,'
       + encodeURIComponent('<?xml version="1.0"?> <?xml-stylesheet href="chrome://global/skin/" type="text/css"?> <window title="' + getText('settings') + '" xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" xmlns:html="http://www.w3.org/1999/xhtml"> <dialogheader title="' + getText('Rating') + '" description="' + getText('video with the best rating will be played next') + '"/> <vbox style="padding:0 1em 1em"> <hbox id="ratingParts"> <box value="" style="background: #3191FF;height:40px;" flex="1" id="ratingDistance"/> <splitter collapse="both" id="ratingSplitter1"/> <box value="" style="background: #1F35FF;height:40px;" flex="1" id="ratingRank"/> <splitter collapse="both" id="ratingSplitter2"/> <box value="" style="background: #001AFF;height:40px" flex="1" id="ratingLinked"/> </hbox> <hbox> <box flex="1"> <box style="background:#3191FF;width:1.5em;height:1em;margin:.3em;"/> <label value="' + getText('close to the start video') + '"/> </box> <box flex="1"> <box style="background:#1F35FF;width:1.5em;height:1em;margin:.3em;"/> <label value="' + getText('mostly high in the related videos list') + '"/> </box> <box flex="1"> <box style="background: #001AFF;width:1.5em;height:1em;margin:.3em;"/> <label value="' + getText('often related') + '"/> </box> </hbox> </vbox> <dialogheader title="' + getText('Play options') + '" description="' + getText('what else affects the order of videos') + '"/> <vbox style="padding:0 1em 1em"> <grid> <columns> <column/> <column flex="1"/> </columns> <rows flex="1"> <row> <label value="' + getText('randomisation') + '"/> <scale min="0" max="100" id="randomisationScale"/> </row> <row> <label value="' + getText('do not play unliked videos') + '"/> <scale min="0" max="100" id="unlikedScale"/> </row> </rows> </grid> <checkbox id="useCompareString" label="' + getText('do not play videos with the same title twice') + '"/> </vbox> <dialogheader title="' + getText('About') + '" description="Youtube autoplay 1.0"/> <vbox style="padding:0 1em 1em"> <label value="' + getText('%s by %s', 'Youtube Autoplay', 'Michael Z.') + '"/> <label value="' + getText('Current Version: %s', '1.0pre7') + '"/> <label value="' + getText('Language code (selected by Youtube): %s', document.documentElement.getAttribute('lang')) + '"/> <description> More information at the scripts <html:a href="http://userscripts.org/scripts/show/54901" target="_blank">homepage</html:a> </description> </vbox> <spacer flex="1"/> <hbox> <label value="' + getText('settings are automatically saved') + '"/> <spacer flex="1"/><button label="' + getText('close') + '" oncommand="close()"/> </hbox> </window>');    youtubeAutoplay.settingsWindow = window.open(settingsCode);
    youtubeAutoplay.settingsWindow.addEventListener("load", youtubeAutoplay.settingsWindowLoad, true);
    youtubeAutoplay.settingsWindow.addEventListener("close", function() {
      youtubeAutoplay.settingsWindow = null;
    }, true);
  },

  /**
   * adds the events to the settings window and initiates all settings
   */
  settingsWindowLoad : function() {
    var doc = youtubeAutoplay.settingsWindow.document;
    /*youtubeAutoplay.settingsRegisterScale(doc.getElementById("distanceScale"), "distanceFactor");
    youtubeAutoplay.settingsRegisterScale(doc.getElementById("rankScale"), "rankFactor");
    youtubeAutoplay.settingsRegisterScale(doc.getElementById("linkedScale"), "linkedFactor");*/
    youtubeAutoplay.settingsRegisterScale(doc.getElementById("unlikedScale"), "unlikedFactor");
    youtubeAutoplay.settingsRegisterScale(doc.getElementById("randomisationScale"), "randomisationFactor");

    //rating scales
    doc.getElementById("ratingParts").addEventListener("command", youtubeAutoplay.settingsChangedRatings, true);
    var totalWidth = doc.getElementById("ratingParts").boxObject.width
                   - 2 * doc.getElementById("ratingSplitter1").boxObject.width;
    doc.getElementById("ratingDistance").setAttribute("width", youtubeAutoplay.getSetting("ratingDistance") * totalWidth)
    doc.getElementById("ratingRank").setAttribute("width", youtubeAutoplay.getSetting("ratingRank") * totalWidth)
    doc.getElementById("ratingLinked").setAttribute("width", youtubeAutoplay.getSetting("ratingLinked") * totalWidth)

    var checkbox = doc.getElementById("useCompareString");
    checkbox.setAttribute("checked", GM_getValue("useCompareString", false));
    checkbox.addEventListener("command", function(evt) {
      GM_setValue("useCompareString", evt.target.getAttribute("checked") == "true");
    }, true);
  },

  /*
   all values are recalculated using the getValue method!
   */
  settingsRegisterScale : function(scale, settingName) {
    scale.setAttribute("value", GM_getValue(settingName, 50));
    var settingName = settingName;
    scale.addEventListener("change", function(evt) {
      GM_setValue(settingName, evt.target.getAttribute("value") * 1);
      youtubeAutoplay.recalculateRatings2();
    }, true);
  },

  /**
   * TODO ?
   */
  settingsShowTooltipp : function() {
  },

  /**
   * recalculates the rating settings by the current position of the splitters
   */
  settingsChangedRatings : function() {
    var doc = youtubeAutoplay.settingsWindow.document;

    var ratingDistance = doc.getElementById("ratingDistance").boxObject.width;
    var ratingRank = doc.getElementById("ratingRank").boxObject.width;
    var ratingLinked = doc.getElementById("ratingLinked").boxObject.width;
    youtubeAutoplay.debug("Bar dinemsions: " + ratingDistance + "-" + ratingRank + "-" + ratingLinked)
    var wholeWidth = ratingDistance + ratingRank + ratingLinked;
    ratingDistance = Math.floor(ratingDistance / wholeWidth * 100);
    ratingRank = Math.floor(ratingRank / wholeWidth * 100);
    ratingLinked = 100 - ratingRank - ratingDistance;
    youtubeAutoplay.debug("Result (%): " + ratingDistance + "-" + ratingRank + "-" + ratingLinked)
    GM_setValue("ratingDistance", ratingDistance);
    GM_setValue("ratingRank", ratingRank);
    GM_setValue("ratingLinked", ratingLinked);

    youtubeAutoplay.recalculateRatings2();
  },
  /*
   * gets a GM - setting value (0 .. 100) and recalculates it to our setting values (0 => 0, 100=>1)
   * @return a value (0...1) depending on the user setting
   */
  getSetting : function(settingName)  {
    try {
      var value = GM_getValue(settingName, 33) / 100;
    } catch(e) {
      var value = 0.33;
    }
    if (settingName == "ratingRank") {
      value = Math.min(value, 1 - youtubeAutoplay.getSetting("ratingDistance"));
    } else if (settingName == "ratingLinked") {
      value = Math.min(value, 1 - youtubeAutoplay.getSetting("ratingDistance")
                                - youtubeAutoplay.getSetting("ratingRank"));
    }
    if (value == NaN) {
      value = 0.33;
    }
    return value * 1;
  }
}
unsafeWindow.youtubeAutoplay = youtubeAutoplay;

//initialize
youtubeAutoplay.init();
GM_registerMenuCommand(i18n("start autoplay"), youtubeAutoplay.startAutoplay)
GM_registerMenuCommand(i18n("stop autoplay"), youtubeAutoplay.stopAutoplay)