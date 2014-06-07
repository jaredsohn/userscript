// ==UserScript==
// @name          udacity hotkeys
// @namespace     http://timerworks.org
// @description   Hotkeys for udacity buttons
//
//                ctrl + alt - highlight hotkeys
//                ctrl + alt + space - play/pause video
//                ctrl + alt + c - continue to answer or continue
//                ctrl + alt + v - view answer
//                ctrl + alt + s - submit answer
//                ctrl + alt + r - rewatch instructions
//                ctrl + alt + q - skip to quiz
// @include       https://www.udacity.com/course/viewer*
// @include       https://www.youtube.com/*
// @version       0.1
// @require       http://code.jquery.com/jquery-1.6.2.min.js
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_listValues
// @grant         GM_deleteValue
// ==/UserScript==


// TODO: get rid of jquery

$(document).ready(function(){
  "use strict";
  var CTRL_KEY = 17;
  var ALT_KEY = 18;
  var SPACE_KEY = 32;

  var C_KEY = 67;
  var N_KEY = 78;
  var P_KEY = 80;
  var S_KEY = 83;
  var Q_KEY = 81;
  var R_KEY = 82;
  var V_KEY = 86;

  var CONTINUE_SELECTOR = 'button.btn[ng-click="goToNextMorsel()"]:visible';
  var CONTINUE_TO_ANSWER_SELECTOR = 'button.btn[ng-click="goToMorsel(morsel.containingExercise.answer_ref)"]:visible';
  var VIEW_ANSWER_SELECTOR = CONTINUE_TO_ANSWER_SELECTOR;
  var SUBMIT_ANSWER_SELECTOR = 'button.btn[ng-click="submitQuiz()"]:visible';
  var REWATCH_INSTRUCTIONS_SELECTOR = 'button.btn[ng-click="goToMorsel(morsel.containingExercise.lecture_ref)"]:visible';
  var TO_QUIZ_SELECTOR = 'button.btn[ng-click="goToMorsel(morsel.containingExercise.quiz_ref)"]:visible';
  var PREVIOUS_SELECTOR = 'button.btn[ng-click="goToPreviousMorsel()"]:visible';
  var NEXT_SELECTOR = 'button.btn[ng-click="goToNextMorsel()"]:visible';

  var HIGHLIGHT_COMMAND = "highlight";
  var CONTINUE_COMMAND = "continue";
  var SUBMIT_COMMAND = "submit";
  var TO_QUIZ_COMMAND = "to_quiz";
  var REWATCH_INSTRUCTIONS_COMMAND = "rewatch_instructions";
  var VIEW_ANSWER_COMMAND = "view_answer";
  var NEXT_COMMAND = "next";
  var PREVIOUS_COMMAND = "previous";
  var PLAY_COMMAND = "play";
  var IS_IFRAME = (window.top != window.self);

  var keyToCommandMap = {};
  keyToCommandMap[C_KEY] = CONTINUE_COMMAND;
  keyToCommandMap[S_KEY] = SUBMIT_COMMAND;
  keyToCommandMap[Q_KEY] = TO_QUIZ_COMMAND;
  keyToCommandMap[R_KEY] = REWATCH_INSTRUCTIONS_COMMAND;
  keyToCommandMap[V_KEY] = VIEW_ANSWER_COMMAND;
  keyToCommandMap[N_KEY] = NEXT_COMMAND;
  keyToCommandMap[P_KEY] = PREVIOUS_COMMAND;
  keyToCommandMap[SPACE_KEY] = PLAY_COMMAND;

  var commandToSelectorMap = {};
  commandToSelectorMap[VIEW_ANSWER_COMMAND] = VIEW_ANSWER_SELECTOR;
  commandToSelectorMap[SUBMIT_COMMAND] = SUBMIT_ANSWER_SELECTOR;
  commandToSelectorMap[TO_QUIZ_COMMAND] = TO_QUIZ_SELECTOR;
  commandToSelectorMap[REWATCH_INSTRUCTIONS_COMMAND] = REWATCH_INSTRUCTIONS_SELECTOR;
  commandToSelectorMap[NEXT_COMMAND] = NEXT_SELECTOR;
  commandToSelectorMap[PREVIOUS_COMMAND] = PREVIOUS_SELECTOR;

  var highlightChar = function($elem, char) {
    // highlights with underscore given char in the $elem.
    if ($(".hotkeys-highlight", $elem).size() > 0) {
      // already highlighted
      return;
    }
    // replace character with underscored character
    var html = $elem.text().replace(char, '<span class="hotkeys-highlight" style="text-decoration:underline;">' + char + '</span>');
    $elem.html(html);
  };

  var highlight = function() {
    // highlights all hot keys in the current page.
    var $rewatch = $(REWATCH_INSTRUCTIONS_SELECTOR + " span:visible");
    var $submitAnswer = $(SUBMIT_ANSWER_SELECTOR);
    var $continue = $(CONTINUE_SELECTOR);
    var $toQuiz = $(TO_QUIZ_SELECTOR);
    var $next = $(NEXT_SELECTOR);
    var $previous = $(PREVIOUS_SELECTOR);

    highlightChar($rewatch, "R");
    highlightChar($submitAnswer, "S");
    highlightChar($continue, "C");
    highlightChar($toQuiz, "Q");
    highlightChar($next, "N");
    highlightChar($previous, "P");
    
    // continue to answer and view answer differ only with button text, and should highlight differently
    var $answer = $(CONTINUE_TO_ANSWER_SELECTOR);
    if ($answer.text() == "Continue to Answer") {
       highlightChar($(CONTINUE_TO_ANSWER_SELECTOR), "C");
    } else {
       // it's `view answer`
       highlightChar($answer, "V");
    }
  };
  
  var keyDownHandler = function(event) {
    if (event.altKey && event.ctrlKey) {
      if (event.keyCode == CTRL_KEY || event.keyCode == ALT_KEY) {
        sendCommand(HIGHLIGHT_COMMAND);
      }
    }  
  }

  var sendCommand = function(command) {
    GM_setValue(command, "");
  }

  var keyUpHandler = function(event) {
    if (event.altKey && event.ctrlKey) {
      // alert(event.keyCode); // helps to recognize key codes;
      if (keyToCommandMap[event.keyCode]) {
        sendCommand(keyToCommandMap[event.keyCode]);
      }
    }
  };
 
  var iframeInit = function() {
    // that code runs on youtube iframe
    // TODO: try to find better way of status observing
    var isPlaying = false;  // is video playing right now?
    var video = document.getElementsByTagName("video");

    if (video.length > 0) {
      video[0].addEventListener("pause", function() {isPlaying = false;});
      video[0].addEventListener("play", function() {isPlaying = true;});
    }

    var playOrPause = function() {
      if (video.length > 0) {
        if (isPlaying) {
          video[0].pause();
        } else {
          video[0].play();
        }
      }
    };

    var runCommand = function() {
      for each (var command in GM_listValues()) {
        if (command == PLAY_COMMAND) {
          playOrPause();
          GM_deleteValue(command);
          continue;
        }
      }
    }
    setInterval(runCommand, 200);
  };

  var topInit = function() {
    // that code should work only on top udacity window.
    var runCommand = function() {
      for each (var command in GM_listValues()) {
        if (command == HIGHLIGHT_COMMAND) {
          highlight();
          GM_deleteValue(command);
          continue;
        }
        if (command == CONTINUE_COMMAND) {
          // it's special case:
          if ($(CONTINUE_TO_ANSWER_SELECTOR).size() > 0) {
            $(CONTINUE_TO_ANSWER_SELECTOR).trigger("click");
          }
          if ($(CONTINUE_SELECTOR).size() > 0) {
            $(CONTINUE_SELECTOR).trigger("click");
          }
          GM_deleteValue(command);
          continue;
        }
        if (command != PLAY_COMMAND) {
          // default
          $(commandToSelectorMap[command]).trigger("click");
          GM_deleteValue(command);
        }
      }
    }
    setInterval(runCommand, 500);

    // move cursor to the top page
    if (document.getElementsByTagName("h1")) {
      var r = document.createRange();
      r.selectNode(document.getElementsByTagName("h1")[0]);
      window.getSelection().addRange(r);
    }

  };

  if (IS_IFRAME) {
    iframeInit();
  } else {
    topInit();
  }

  window.addEventListener('keydown', keyDownHandler, true);
  window.addEventListener('keyup', keyUpHandler, true);
});

