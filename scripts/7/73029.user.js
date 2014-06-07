// ==UserScript==
// @name                    detect_art
// @namespace         http://d.hatena.ne.jp/SandRiver/
// @description          detect art!
// @include                 *
// ==/UserScript==
var text = new Array();
text=document.body.innerHTML.match(/<\/?[^>]+?\/?>|[^<>]*/gi);
for (var i=0; i<text.length; i++) {
  if(!text[i].match(/<\/?[^>]+?\/?>/)){
    text[i] = text[i].replace(/(art)/gi,'<span style=\"font-size: xx-large; color: red;\">$1</span>');
    text[i] = text[i].replace(/(アート)/gi,'<span style=\"font-size: xx-large; color: red;\">$1</span>');
    text[i] = text[i].replace(/(あ、あと)/gi,'<span style=\"font-size: xx-large; color: red;\">$1</span>');
    text[i] = text[i].replace(/(ああ、と)/gi,'<span style=\"font-size: xx-large; color: red;\">$1</span>');
    text[i] = text[i].replace(/(ああと)/gi,'<span style=\"font-size: xx-large; color: red;\">$1</span>');
    text[i] = text[i].replace(/(あーと)/gi,'<span style=\"font-size: xx-large; color: red;\">$1</span>');
  };
};
document.body.innerHTML=text.join('');
