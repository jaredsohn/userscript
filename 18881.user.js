// Correct Russian Accent 0.0.4 (alpha) 2008-01-11
// ------------------------------------------
// Copyright (c) 2008, Ilya Dogolazky
// Released under the GPL license, see http://www.gnu.org/copyleft/gpl.html for details
// ------------------------------------------
// ==UserScript==
// @name           Correct Russian Accent
// @namespace      http://www.math.uni-bonn.de/people/ilyad/gm/stress
// @description    Replaces capitalized vowel letters in Russian words by the correct stress-mark: combining acute accent (U+0301).
// @include        *
// ==/UserScript==

var Rus={} ; Rus_init() ;

for each(var t in xpath_list("//text()[not(ancestor::script) and not(ancestor::style)]"))
{
  var txt = t.nodeValue, result = "" ;
  for(var x; x = Rus.findAccent.exec(txt); result+=x[1]+x[2]+x[3]+x[4])
  {
     // x[1]: text before the word x[2]: word prefix x[3]: accented vowel
     // x[4]: word suffix          x[5]: trailing text
    if(x[4]!="" || !x[2].match(Rus.singleCapital)) // don't modify words like "HO"
    {
      x[3] = x[3].toLowerCase() ;
      if(x[3]!=Rus.yo) // 'yo' does not need an accent mark
        x[3] += Rus.stressMark ;
    }
    txt = x[5] ;
  }
  result += txt ;
  if(result!=t.nodeValue)
    t.nodeValue = result ;
}

function Rus_init()
{
  Rus.yo = String.fromCharCode(0x451) ; // small Cyrillic letter yo
  Rus.x = Rus.yo ;
  for(var i=0x430; i<=0x44f; ++i)
    Rus.x += String.fromCharCode(i) ; // all 33 small Cyrillic letters
  Rus.X = Rus.x.toUpperCase() ; // capital Cyrillic letters
  Rus.o = Rus.yo + String.fromCharCode(0x430, 0x435, 0x438, 0x43E, 0x443, 0x44B, 0x44D, 0x44E, 0x44F) ;
  Rus.O = Rus.o.toUpperCase() ; // capital russian vowels (10 characters)
  Rus.stressMark = String.fromCharCode(0x301) ; // combining accute accent
  Rus.singleCapital = rus_re("^[X]$") ; // regexp matching single capital Cyrillic letter
  // main regexp:
  Rus.findAccent = rus_re ( '^(|[\\S\\s]*?[^xX])' + // 1: text before the word
    '([xX][x]*)' + // 2: word prefix
    '([O])' + // 3: accented vowel
    '([x]*)' + // 4: word suffix
    '([^xX][\\s\\S]*|)$' // 5: trailing text
  ) ;
}

// makes a special "Cyrillic" regexps:
//    'x' matches small Cyrillic letters
//    'X' matches capital Cyrillic letters
//    'O' matches capital Cyrillic vowels
function rus_re(str)
{
  str = str.replace(/X/g, Rus.X).replace(/x/g, Rus.x).replace(/O/g, Rus.O) ;
  return RegExp(str) ;
}

// returns results of a xpath-query as array
function xpath_list(xpath, root, order)
{
  if(!root)
    root = window.document ;
  var result = [] ;
  var snapshot = document.evaluate(xpath, root, null, (order ? XPathResult.ORDERED_NODE_SNAPSHOT_TYPE : XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE), null) ;
  for(var i=0; i<snapshot.snapshotLength; ++i)
    result.push(snapshot.snapshotItem(i)) ;
  return result ;
}

// vim:tw=0:smartindent
