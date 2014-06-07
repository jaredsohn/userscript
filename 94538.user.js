// ==UserScript==
// @name           Morse
// @namespace      http://userscripts.org/users/rincebrain
// @description    Morse code translator for MSPA-related usage
// @include        http://mspaintadventures.com/*
// @include        http://www.mspaintadventures.com/*
// @version        1.0.2
// ==/UserScript==

var mcode = {".-"     : "A",
         "-..."   : "B",
         "-.-."   : "C",
         "-.."    : "D",
         "."      : "E",
         "..-."   : "F",
         "--."    : "G",
         "...."   : "H",
         ".."     : "I",
         ".---"   : "J",
         "-.-"    : "K",
         ".-.."   : "L",
         "--"     : "M",
         "-."     : "N",
         "---"    : "O",
         ".--."   : "P",
         "--.-"   : "Q",
         ".-."    : "R",
         "..."    : "S",
         "-"      : "T",
         "..-"    : "U",
         "...-"   : "V",
         ".--"    : "W",
         "-..-"   : "X",
         "-.--"   : "Y",
         "--.."   : "Z",
         "--..--" : ",",
         ""       : "!",
         ".-.-.-" : ".",
         "..--.." : "?",
         ".----." : "'",
         "-..-."  : "/",
         "-.--."  : "(",
         "-.--.-" : ")",
         ".-..."  : "&",
         "---..." : ":",
         "-.-.-." : ";",
         "-...-"  : "=",
         ".-.-."  : "+",
         "-....-" : "-",
         "..--.-" : "_",
         ".-..-." : "\"",
         "...-..-": "$",
         ".--.-." : "@",
         ".----"  : "1",
         "..---"  : "2",
         "...--"  : "3",
         "....-"  : "4",
         "....."  : "5",
         "-...."  : "6",
         "--..."  : "7",
         "---.."  : "8",
         "----."  : "9",
         "-----"  : "0"
         };

function decodeMorse(morsey) {
  if (morsey === undefined) {
    return "";
  }
  var morse = morsey.trim();
  if (morse.length === 0) {
    return "";
  }
  //alert(morse);
  var words = morse.split("/");
  //alert(words);
  var final = "";
  for (var wor in words) {
    var word = words[wor];
    //alert(word);
    //alert(word);
    if (word.indexOf("\n") != -1 || word.indexOf("\r") != -1) {
      var breakdown = word.split("\n");
      for (var subwor in breakdown) {
        var subword = breakdown[subwor];
        final = final + decodeMorse(subword) + "\n";
      }
      final = final.substr(0,final.length) + " ";
    } else {
      var letters = word.trim().split(" ");
      //alert(letters);
      for (var lett in letters) {
        var letter = letters[lett];
        if ((letter in mcode) === false) {
          if ((letter in ["-","."]) == false) {
            final = final + letter;
          }
          else {
            final = final + "-";
          }
        }
        else {
          final = final + mcode[letter];
        }
      }
      final = final + " ";
    }
  }
  return final.substr(0,final.length);
}

function writeSpans(elem) {
  var sp = document.getElementsByTagName("span");
  var q = "";
  for (var elemID = 0; elemID < sp.length; elemID+=1) {
    if (sp[elemID].innerText != undefined) {
      q = decodeMorse(sp[elemID].innerText);
      sp[elemID].setAttribute("title",q);
    }
    else if (sp[elemID].innerText == undefined) {
      // god dammit firefox why aren't you setting innerText correctly here.
      // this is a terrible hack, but should work...for this, at least.
      if (sp[elemID].innerHTML.indexOf("<") == -1 || sp[elemID].innerHTML.indexOf(">") == -1) {
        q = decodeMorse(sp[elemID].innerHTML);
        sp[elemID].setAttribute("title",q);
      }
    //  writeSpans(sp[elemID]);
    }
    q = "";
  }
  sp = document.getElementsByTagName("p");
  for (var elemID = 0; elemID < sp.length; elemID+=1) {
    q = "";
    if (sp[elemID].innerText != undefined) {
      q = decodeMorse(sp[elemID].innerText);
      sp[elemID].setAttribute("title",q);
    }
    else if (sp[elemID].innerText == undefined) {
      // god dammit firefox why aren't you setting innerText correctly here.
      // this is a terrible hack, but should work...for this, at least.
      if (sp[elemID].innerHTML.indexOf("<") == -1 || sp[elemID].innerHTML.indexOf(">") == -1) {
        q = decodeMorse(sp[elemID].innerHTML);
        sp[elemID].setAttribute("title",q);
      }
    //  writeSpans(sp[elemID]);
    }
    q = "";
  }
}

writeSpans(document);