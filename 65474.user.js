// ==UserScript==
// @name         Unscript-ml 
// @namespace  tag:suresh.freeflux.net
// @description   Convert text typed in English to Malayalam (and vice versa) using Inscript keyboard mapping.
// ==/UserScript==

/*
*(C) 2010 Suresh P.
*Licensed under the GNU GPL, http://www.gnu.org/licenses/gpl.html
*/

var input, inputs;
var link_color = 'red';

UnscriptLookup = {
  'a'  :  '\u0D4B',
  'b'  :  '\u0D35',
  'c'  :  '\u0D2E',
  'd'  :  '\u0D4D',
  'e'  :  '\u0D3E',
  'f'  :  '\u0D3F',
  'g'  :  '\u0D41',
  'h'  :  '\u0D2A',
  'i'  :  '\u0D17',	
  'j'  :  '\u0D30',
  'k'  :  '\u0D15',
  'l'  :  '\u0D24',
  'm'  :  '\u0D38',
  'n'  :  '\u0D32',
  'o'  :  '\u0D26',
  'p'  :  '\u0D1C',
  'q'  :  '\u0D4C',
  'r'  :  '\u0D40',
  's'  :  '\u0D47',
  't'  :  '\u0D42',
  'u'  :  '\u0D39',
  'v'  :  '\u0D28',
  'w'  :  '\u0D48',
  'x'  :  '\u0D02',
  'y'  :  '\u0D2C',
  'z'  :  '\u0D46',

  'A'  :  '\u0D13',
  'B'  :  '\u0D34',
  'C'  :  '\u0D23',
  'D'  :  '\u0D05',
  'E'  :  '\u0D06',
  'F'  :  '\u0D07',
  'G'  :  '\u0D09',
  'H'  :  '\u0D2B',
  'I'  :  '\u0D18',
  'J'  :  '\u0D31',
  'K'  :  '\u0D16',
  'L'  :  '\u0D25',
  'M'  :  '\u0D36',
  'N'  :  '\u0D33',
  'O'  :  '\u0D27',
  'P'  :  '\u0D1D',
  'Q'  :  '\u0D14',
  'R'  :  '\u0D08',
  'S'  :  '\u0D0F',
  'T'  :  '\u0D0A',
  'U'  :  '\u0D19',
//  'V'  :  
  'W'  :  '\u0D10',
//  'X'  :  
  'Y'  :  '\u0D2D',
  'Z'  :  '\u0D0E',

  '='  :  '\u0D43',
  '+'  :  '\u0D0B',
  '_'  :  '\u0D03',
  '`'  :   '\u0D4A',
  '~'  :  '\u0D12',
  '/'  :  '\u0D2F',
  '\\'  :  '\u200C',
  ']'  :  '\u200D',
  '['  :  '\u0D21',
  '{'  :  '\u0D22',
  '}'  :  '\u0D1E',
  ':'  :  '\u0D1A',
  ';'  :  '\u0D1B',
  '\''  :  '\u0D1F',
  '\"'  : '\u0D20',
  '<' :  '\u0D37'
}

function Eng2Mal(text) {
  var len = text.length;
  for (var i=0; i<len; i++) {
    var c = text.charAt(i);
    if (c in UnscriptLookup) {
      text = text.replace(c, UnscriptLookup[c]);
    }
  }
  //alert("Eng text converted to Mal: " + text);
  return text;
}

function Mal2Eng(text) {
  var len = text.length;
  var _lookup = new Array();
  for (var k in UnscriptLookup) {
     var v = UnscriptLookup[k]; 
    _lookup[v] = k;
  }
  for (var i=0; i<len; i++) {
    var c = text.charAt(i);
    if (c in _lookup) {
     text = text.replace(c, _lookup[c]);
    }
  }
  //alert("Mal text converted to Eng: " + text);
  return text;
}

function convert(input) {
  this.input = input;
  var sl = this.input.scrollLeft;
  var st = this.input.scrollTop;
  var len = this.input.value.length;
  var start = this.input.selectionStart;
  var end = this.input.selectionEnd;
  var selText = this.input.value.substring(start, end);

  //alert("selected text is: " + selText)

  if(selText) {
    if (selText.charCodeAt(0) >= 3328) {
    //  alert("mal2eng")
      selText = Mal2Eng(selText);
      link_color = 'blue';
    }
    else {
    //   alert("eng2mal")
      selText = Eng2Mal(selText);
      link_color = 'green';
    }

  this.input.value = this.input.value.substring(0, start) + selText + this.input.value.substring(end, len);
  this.input.scrollLeft = sl;
  this.input.scrollTop = st;
  }
}

function createLink(input) {
  this.input = input;
  var frag = document.createDocumentFragment();
  frag.appendChild(document.createTextNode(' ['));
  var convertLink = document.createElement('a');
  convertLink.href = 'javascript:;';
  convertLink.appendChild(document.createTextNode('<=>'));
  convertLink.style.color = link_color;
  convertLink.title = 'Unscript-ml';
  //convertLink.setAttribute("accesskey", "M");
  frag.appendChild(convertLink);
  frag.appendChild(document.createTextNode('] '));
  convertLink.addEventListener('click', function() {convert(input); convertLink.style.color = link_color}, false);
  this.input.parentNode.insertBefore(frag, this.input.nextSibling);
}

inputs = document.evaluate('//input[not(@type) or @type="text"] | //textarea', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < inputs.snapshotLength; i++) {
  input = inputs.snapshotItem(i);
  createLink(input);
}

