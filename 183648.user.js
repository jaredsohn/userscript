// ==UserScript==
// @name       WaniKani External Frame Placer
// @namespace  
// @version    1.0
// @description  Inserts a frame containing an external definition page for a given Kanji or Vocab. This is displayed during lessons and when viewing the individual item.
// @match      http://www.wanikani.com/*
// @match      https://www.wanikani.com/*
// @copyright  2013 jeshuam
// @grant       GM_registerMenuCommand
// ==/UserScript==

// Just add some namespacing.
(function() {
  /**
   * Custom String.format() method. Can be called using "".format(args).
   * Does very basic formatting, Python3 style.
   */
  if (typeof String.prototype.format != 'function') {
    String.prototype.format = function() {
      var s = this.valueOf();
      for (var i = 0; i < arguments.length; i++) {
        s = s.replace(new RegExp("\\{" + i + "\\}", "gm"), arguments[i]);
      }

      return s;
    }
  }

  // Register GM commands for changing to definition source and URLs.
  if (GM_registerMenuCommand) {
    GM_registerMenuCommand('WaniKani External Frame Placer: Change Kanji URL', function() {
      var newKanjiURL = prompt('New Kanji URL:');
      if (newKanjiURL) {
        $.jStorage.set(Utility.URL_KEY_FORMAT.format(Utility.KANJI), newKanjiURL);
      }
    });

    GM_registerMenuCommand('WaniKani External Frame Placer: Change Vocab URL', function() {
      var newVocabURL = prompt('New Vocab URL:');
      if (newVocabURL) {
        $.jStorage.set(Utility.URL_KEY_FORMAT.format(Utility.VOCAB), newVocabURL);
      }
    });
  }
  
  var Utility = {
    /*
     * Some variables (which don't have to be configurable) but make the code
     * nicer to read.
     */
    KANJI: 'kan', VOCAB: 'voc', HEADING_FORMAT: 'External Definition',
    LESSON_INSERTION_POINT_FORMATS: ['#supplement-{0} #supplement-{0}-meaning .col2', '#supplement-{0} #supplement-{0}-reading .col2'],
    DETAIL_INSERTION_POINT: 'section.information',
    
    /*
     * Keys to use in local storage and their defaults.
     */
    URL_KEY_FORMAT: 'jisho-frame-placer-{0}-url',
    DEFINITION_SOURCE_KEY: 'jisho-frame-placer-definition-source', DEFINITION_SOURCE_DEFAULT: 'Jisho.org',
    WK_CURRENT_ITEM_KEY: 'l/currentLesson',
    KANJI_URL_DEFAULT: 'http://jisho.org/kanji/details/{0}', VOCAB_URL_DEFAULT: 'http://jisho.org/words?common=on&jap={0}',
    
    /*
     * Utility functions to make the main body simpler.
     */
    /**
     * Obtain the frame URL type from storage. Defaults to vocabulary if the given
     * type is not recognized.
     */
    getFrameURL: function(type) {
      // Instantiate the defaults if they aren't in place already.
      if (!$.jStorage.get(Utility.URL_KEY_FORMAT.format(Utility.KANJI))) {
        $.jStorage.set(Utility.URL_KEY_FORMAT.format(Utility.KANJI), Utility.KANJI_URL_DEFAULT);
      }
      
      if (!$.jStorage.get(Utility.URL_KEY_FORMAT.format(Utility.VOCAB))) {
        $.jStorage.set(Utility.URL_KEY_FORMAT.format(Utility.VOCAB), Utility.VOCAB_URL_DEFAULT);
      }
      
      // Get the requested type, or default to a vocab item if `type` is invalid.
      return $.jStorage.get(Utility.URL_KEY_FORMAT.format(type)) || $.jStorage.get(Utility.URL_KEY_FORMAT.format(Utility.VOCAB));
    },
    
    /**
     * Obtain the name of the source of the definition.
     */
    getDefinitionSource: function() {
      if (!$.jStorage.get(Utility.DEFINITION_SOURCE_KEY)) {
        $.jStorage.set(Utility.DEFINITION_SOURCE_KEY, Utility.DEFINITION_SOURCE_DEFAULT);
      }
      
      return $.jStorage.get(Utility.DEFINITION_SOURCE_KEY);
    },
     
    /**
     * Given a container to store a frame, insert both a frame and heading, matching roughly this format:
     *
     *  <h2>{Heading}</h2>
     *  <div>
     *    <iframe />
     *  </div>
     *
     * If the heading is clicked, the following div will collapse and hide.
     * @param container A HTML element (using document.createElement).
     * @param japanese The Japanese query to inject into the frame.
     * @param type The type of query to make (either KANJI or VOCAB).
     */
    insertFrame: function(container, japanese, type) {
      // Get the URL to construct the frame with, based on 'type'. Assume it is
      // vocabulary if the defined type is invalid.
      var frameURL = Utility.getFrameURL(type).format(japanese);
      
      // Try and find an iframe in the target container. It may already exist there
      // from a previous invocation of this method. If it does, just replace the URL.
      var currentIframe = container.querySelector('iframe');
      if (currentIframe) {
        currentIframe.setAttribute('src', frameURL);
        return;
      }
      
      // There must be no iframe... let's construct a new one! Frames can be a little
      // tricky... if an input is selected in the frame, all keyboard shortcuts (e.g.
      // during lessons) won't work; to work around this, create a text box in the main
      // DOM, focus it and then remove it.
      // If there is no iframe, create a new one.
      var newIframe = document.createElement('iframe');
      newIframe.onload = function() {
        // Create a temporary input and get a reference to the body.
        var tempInput = document.createElement('input');
        var body = document.querySelector('body');
        
        // Insert the temporary element and focus it.
        body.insertBefore(tempInput, body.firstChild);
        tempInput.focus();
        
        // Remove the temporary element.
        body.removeChild(tempInput);
      }
      newIframe.setAttribute('src', frameURL);
      newIframe.style.width = '100%';
      newIframe.style.height = '600px';
      
      // Create a container div for the iframe and insert it.
      var iframeContainerDiv = document.createElement('div');
      iframeContainerDiv.appendChild(newIframe);
      
      // Create a header to put into the top level of the container.
      // When the header is clicked, hide the iframe container div.
      var header = document.createElement('h2');
      header.innerHTML = '<i class="icon-chevron-down"></i> ' + Utility.HEADING_FORMAT.format(Utility.getDefinitionSource());
      header.onclick = function() {
        if (iframeContainerDiv.style.display === 'none') {
          iframeContainerDiv.style.display = 'block';
          header.querySelector('i').setAttribute('class', 'icon-chevron-down');
        } else {
          iframeContainerDiv.style.display = 'none';
          header.querySelector('i').setAttribute('class', 'icon-chevron-right');
        }
      }
      
      // Add the header first, then the frame to the container.
      container.appendChild(header);
      container.appendChild(iframeContainerDiv);
    }
  };
  
  function main() {
    // If we are currently in a lesson...
    var currentURL = window.location.href;
    if (currentURL.indexOf('lesson/session') >= 0) {
      $.jStorage.listenKeyChange(Utility.WK_CURRENT_ITEM_KEY, function(key) {
        // Get the new value of the current item.
        var newValue = $.jStorage.get(key);
        
        // Get the Japanese text and they type.
        var japaneseType = japanese = null;
        if (newValue.voc) {
          japaneseType = Utility.VOCAB;
          japanese = newValue[Utility.VOCAB];
        } else if (newValue.kan) {
          japaneseType = Utility.KANJI;
          japanese = newValue[Utility.KANJI];
        } else {
          // Unrecognized type?
          return;
        }
        
        // Find the div containing the meaning.
        for (var i in Utility.LESSON_INSERTION_POINT_FORMATS) {
          var container = document.querySelector(Utility.LESSON_INSERTION_POINT_FORMATS[i].format(japaneseType));
          Utility.insertFrame(container, japanese, japaneseType);
        }
      });
    }
    
    // Otherwise, we must be one either the vocab or kanji page.
    else {
      // Decide what type the word is, and get the word.
      var japanese = currentURL.substr(currentURL.lastIndexOf('/') + 1);
      var japaneseType = Utility.VOCAB;
      if (currentURL.indexOf('kanji') >= 0) {
        japaneseType = Utility.KANJI;
      }
      
      // Make a container for the iframe.
      var container = document.createElement('div');
      document.querySelector('section#information').appendChild(container);
      
      // Insert the frame into the page.
      Utility.insertFrame(container, japanese, japaneseType);
    }
  }

  var waitForjStorageInterval = setInterval(function() {
    if ($ && $.jStorage) {
      clearInterval(waitForjStorageInterval);
      main();
    }
  }, 50);
})()