// ==UserScript==
// @name        MSPA Morse Hints
// @namespace   moonbase.rydia.net
// @description Mouseover hints for MSPA morse code
// @include     http://www.mspaintadventures.com/*
// @include     http://mspaintadventures.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==

var MORSE = {
  ".-":      "A",
  "-...":    "B",
  "-.-.":    "C",
  "-..":     "D",
  ".":       "E",
  "..-.":    "F",
  "--.":     "G",
  "....":    "H",
  "..":      "I",
  ".---":    "J",
  "-.-":     "K",
  ".-..":    "L",
  "--":      "M",
  "-.":      "N",
  "---":     "O",
  ".--.":    "P",
  "--.-":    "Q",
  ".-.":     "R",
  "...":     "S",
  "-":       "T",
  "..-":     "U",
  "...-":    "V",
  ".--":     "W",
  "-..-":    "X",
  "-.--":    "Y",
  "--..":    "Z",
  "-----":   "0",
  ".----":   "1",
  "..---":   "2",
  "...--":   "3",
  "....-":   "4",
  ".....":   "5",
  "-....":   "6",
  "--...":   "7",
  "---..":   "8",
  "----.":   "9",
  ".-.-.-":  ".",
  "--..--":  ",",
  "..--..":  "?",
  ".----.":  "'",
  "-.-.--":  "!",
  "-..-.":   "/",
  "-.--.":   "(",
  "-.--.-":  ")",
  ".-...":   "&",
  "---...":  ":",
  "-.-.-.":  ";",
  "-...-":   "=",
  ".-.-.":   "+",
  "-....-":  "-",
  "..--.-":  "_",
  ".-..-.":  "\"",
  "...-..-": "$",
  ".--.-.":  "@",
  "/":       " "
};

var MATCH_MORSE_SEQUENCE = /(?:\s+(?:[\.-]+|\/))+/;

$(".spoiler").first().find("span").each(function () {
  var e = $(this);
  var m = MATCH_MORSE_SEQUENCE.exec(e.text());
  if (m) {
    var tokens = m[0].split(/\s+/);
    var expansion = [];
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (MORSE.hasOwnProperty(token)) {
        expansion.push(MORSE[token]);
      }
    }
    e.attr("title", expansion.join(""));
  }
});

