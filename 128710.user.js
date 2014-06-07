// ==UserScript==
// @name           PUA Decoder
// @author         Not Tony Danza Claus and Definitely Not Robot Anna
// @namespace      www.reddit.com
// @description    Decodes PUA
// @include        http://www.reddit.com/r/*seddit*
// @include        http://www.reddit.com/r/seduction*
// ==/UserScript==

var word_list = 
[
  [/\bkino/gi, "groping"],
  [/\bneg/gi, "belittle"],
  [/\bslut/gi, "classy lady"],
  [/\bwhore/gi, "classy lady"],
  [/\bbitch/gi, "classy lady"],
  [/\bHB/gi, "Konami Code "],
  [/\balpha/gi, "rapist"],
  [/\bbeta/gi, "failed rapist"],
  [/\blmr/gi, "saying no"],
  [/\bcock.?block.*?\W/gi, "somebody tried to stop me from being a rapist "],
  [/\bk-close/gi, "cry"],
  [/\bf-close/gi, "cry in the shower"],
  [/\bAFC/gi, "normal"],
  [/\bPUA/gi, "formulaic rapist"],
  [/\bshit test/gi, "told me to fuck off"],
  [/\bIOI/gi, "attention"],
  [/\bpeacock/gi, "for attention, blatantly cry"]
];


paragraphs = document.getElementsByTagName('p');
var i = 0;
var j = 0;
for (i=0;i<paragraphs.length;i++){
  text = paragraphs[i].innerHTML;
  
  for (j=0;j<word_list.length;j++){
    text = text.replace(word_list[j][0], word_list[j][1]);
  }
  
  paragraphs[i].innerHTML = text;
}

