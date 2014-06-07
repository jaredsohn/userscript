// ==UserScript==
// @name           HTS Prog Mission 1 Solver - Unscramble the Words
// @description    Automatically solves the first programming mission for Hack This Site(https://www.hackthissite.org/missions/prog/1/).
// @namespace      http://userscripts.org/scripts/show/185998
// @updateURL      https://userscripts.org/scripts/source/185998.meta.js
// @downloadURL    https://userscripts.org/scripts/source/185998.user.js
// @include        https://www.hackthissite.org/missions/prog/1/
// @require        //ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version        1.1.3
// @grant          none
// ==/UserScript==
// http://lmgtfy.com/?q=jQuery+CSS+child+selector These selectors will most-likely break in the future *IF* they change the page/mission layout
var ROOT_SELECTOR = "td.sitebuffer > table > tbody > tr > td";
var LI_SELECTOR = ROOT_SELECTOR + " > table > tbody > tr > td > li";
var FORM_SELECTOR = ROOT_SELECTOR + " > form";
var ZIP_SELECTOR = ROOT_SELECTOR + " > a";
var INPUT_SELECTOR = FORM_SELECTOR + " > input";
//
var WORD_LISTSTR = "";
$(document).ready(function () {
  $('head').append('<script type="text/javascript" src="http://stuk.github.io/jszip/jszip.js"></script>')
	         .append('<script type="text/javascript" src="http://stuk.github.io/jszip/jszip-load.js"></script>')
			 .append('<script type="text/javascript" src="http://stuk.github.io/jszip/jszip-inflate.js"></script>');
  main(); // this isn't really needed since userscripts by default load after the page loads but it better safe than sorry.
});

function main() {
  //WORD_LIST is the constant list of all the possible words for this mission; possible break in the future if they change the list
  var WORD_LIST = getWordList();
  WORD_LISTERSTR = null; // Hopefully that will free a little bit of memory that was taken by the read word list.
  var scrambledWords = $(LI_SELECTOR); //returns a list of elements that match the selector(which happen to be the line items that contain the scrambled words)
  var resolvedWords = new Array(); // initialize empty array variable
  for (var x = 0; x < scrambledWords.length; x++) { // loop through every scrambled word
    for (var y = 0; y < WORD_LIST.length; y++) { // loop through every word in the WORD_LIST for every scrambled word
      var tempW = scrambledWords[x].innerHTML; // assign the current element's value(scrambled word) to a temp variable
      if (tempW.length != WORD_LIST[y].length || (tempW.length == WORD_LIST[y].length && !compareWords(tempW, WORD_LIST[y])))
        continue; // if the 2 word lengths aren't the same or they are the same but the aren't the same word, then continue to the next word in the list
      else
        resolvedWords.push(WORD_LIST[y]); // else they were the same length and the words are the same, then add the current word in the list to the array of resolved words.
    }
  }
  $(INPUT_SELECTOR).val(resolvedWords); // sets the value of the input text box equal to the list of resolved words
  $(FORM_SELECTOR).submit(); // submits the form so you don't have to.
}

function getWordList() {
  var fileurl = "https://www.hackthissite.org"+$(ZIP_SELECTOR).attr('href'); // grab the url to the zip file
  var xhr1 = new XMLHttpRequest(); // http://lmgtfy.com/?q=xhr+javascript
  xhr1.open('GET', fileurl, false);
  if (xhr1.overrideMimeType) {
    xhr1.overrideMimeType('text/plain; charset=x-user-defined'); // http://lmgtfy.com/?q=xmlhttprequest+handling+binary+data
  }
  xhr1.onreadystatechange = function (e) {
    if (this.readyState == 4 && this.status == 200) {
      var zip = new JSZip(this.responseText); // create a JSZIP object from the server response; loads the zip
      WORD_LISTSTR = zip.file("wordlist.txt").asText(); // assigns the wordlist text file to WORDLISTSTR as a string
    }
  };
  xhr1.send();
  return WORD_LISTSTR.replace("\u000d\u000a", " ").split(" "); // replace all CRLF with spaces, then split the string into an array delimited my a space and return
}

function compareWords(scram, unscr) { // parameters: scram = the scrambled word, unscr = the unscrambled word
  scram.toUpperCase(); // to make case insensitive
  unscr.toUpperCase(); // ditto...
  for (var a = 0; a < unscr.length; a++) // *OUTER* loop for as many characters as there are in the unscrambled word because the scrambled word will get smaller as characters are matched
    for (var b = 0; b < scram.length; b++) // *INNER* loop for as many characters are left in the scrambled word
      if (scram[b] == unscr[a]) {
        scram = updateWord(scram, b); // if the current characters are equal then update the scrambled word by removing the matched char and
        break; // break this current *INNER* loop and continue to the next iteration in the *OUTER* loop else continue the *INNER* loop
      }
  return scram.length == 0; // return if the scrambled words length equals 0 if it is true then the word is a match
}

function updateWord(word, idx) { // parameters: word = the word to update, idx = the character's--to remove--index
  /*if(word.length<idx)
	  throw new RangeError("Index provided was out of range."); // haven't tested this wanted to add an exception if the index is too great but I believe the "substr" function has a way to handle that issue.
	else */
  if (idx == 0)
    return (word.length == 1) ? "" : word.substr(1); // if the char is the first letter check if the word is only 1 char in length; if true return an empty string, else return the word minus the first char
  else if (word.length - 1 == idx)
    return word.substr(0, idx); // if the char is the last letter then return the word minus the last char
  else
    return word.substr(0, idx) + word.substr(idx + 1); // if the char is in the middle then return the concatenated substrings before and after the char
}