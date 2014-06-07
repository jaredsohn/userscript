// ==UserScript==
// @name          Typo No More
// @author        Raffles
// @namespace     http://ratherodd.com
// @description   Corrects common typos as you type.
// @version       0.2
// @include       *
// @exlude        http*://mail.google.tld/*
// ==/UserScript==
var words = {
  'accomadation': 'accommodation',
  'accomadate': 'accommodate',
  'accomodate': 'accommodate',
  'agressive': 'aggressive',
  'apparantly': 'apparently',
  'seperate': 'separate',
  'definately': 'definitely',
  'definatly': 'definitely',
  'definetly': 'definitely',
  'definetely': 'definitely',
  'definately': 'definitely',
  'defanately': 'definitely',
  'genious': 'genius',
  'intellegent': 'intelligent'
};

var punctuation = ' \n\':!?.,";)/';
Array.forEach(document.getElementsByTagName('textarea'), function(ta) {
  ta.addEventListener('keyup', correctTypos, false);
  ta.addEventListener('blur', correctTypos, false);
});
function correctTypos(e) {
  var word, text = this.value, scrolled = this.scrollTop;
  if (e.type === 'keyup') {
    var start = this.selectionStart, end = this.selectionEnd;
    if (punctuation.indexOf(text.charAt(end - 1)) > -1) {
      word = text.substring(end-25, end-1).match(/[\s'"(\/]?([a-zA-Z]+)$/)[1];
      startmark = end - word.length - 1;
      endmark = end - 1;
    }
    else {
      var first, second;
      if (second = text.substring(start, start+25).match(/(^[a-zA-Z]+)[\s'"(\/]?/)[1]) {
        if (first = text.substring(start-25, start).match(/[\s'"(\/]?([a-zA-Z]+)$/)[1]) {
          word = first + second;
          startmark = end - first.length;
          endmark = end + second.length;
        }
        else return;
      }
      else return;
    }
  }
  else if (e.type === 'blur') {
    if (punctuation.indexOf(text.charAt(text.length-1)) > -1) return;
    word = text.substring(text.length-25).match(/[\s'"(\/]?([a-zA-Z]+)$/)[1];
    startmark = text.length - word.length;
    endmark = text.length;
  }
  if (word && words.hasOwnProperty(word)) {
    this.value = text.substring(0, startmark) + words[word] + text.substring(endmark);
    this.selectionStart = this.selectionEnd = start - word.length + correction.length;
    this.scrollTop = scrolled;
  }
}