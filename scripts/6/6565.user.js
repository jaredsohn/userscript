// ==UserScript==
// @name          Latin-Cyrillic (English-Russian) Transliteration Tool
// @namespace     tag:domnit.org:2006-11-29,translit
// @description   Add controls to every text input to enter either normal Latin text, such as English, or to transliterate to Cyrillic, such as Russian. IT IS ADVISED THAT YOU CHANGE THE INCLUDE SETTING FROM THE GREASEMONKEY SCRIPT MANAGER.
// ==/UserScript==

/*
(C) 2006 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html
*/
function bind(func, this_) {
  return function() {
    func.apply(this_, arguments);
  };
}

function Transliterator(input) {
  this.input = input;
  this.keyListener = bind(this.keyListener, this);
  function clearLastKey() {
    delete this.lastChar;
  }
  clearLastKey = bind(clearLastKey, this);
  input.addEventListener('click', clearLastKey, false);
  input.addEventListener('blur', clearLastKey, false);
}

Transliterator.lookup = {
  'A': '\u0410',                       'a': '\u0430',
  'B': '\u0411',                       'b': '\u0431',
  'V': '\u0412',                       'v': '\u0432',
  'G': '\u0413',                       'g': '\u0433',
  'D': '\u0414',                       'd': '\u0434',
  'E': '\u0415',                       'e': '\u0435',
  'Yo': '\u0401',                      'yo': '\u0451',
  'Zz': '\u0416',                      'zh': '\u0436',
  'Z': '\u0417',                       'z': '\u0437',
  'I': '\u0418',                       'i': '\u0438',
  'J': '\u0419',                       'j': '\u0439',
  'K': '\u041A',                       'k': '\u043A',
  'L': '\u041B',                       'l': '\u043B',
  'M': '\u041C',                       'm': '\u043C',
  'N': '\u041D',                       'n': '\u043D',
  'O': '\u041E',                       'o': '\u043E',
  'P': '\u041F',                       'p': '\u043F',
  'R': '\u0420',                       'r': '\u0440',
  'S': '\u0421',                       's': '\u0441',
  'T': '\u0422',                       't': '\u0442',
  'U': '\u0423',                       'u': '\u0443',
  'F': '\u0424',                       'f': '\u0444',
  'X': '\u0425', 'H': '\u0425',        'x': '\u0445', 'h': '\u0445',
  'C': '\u0426', 'Ts': '\u0426',       'c': '\u0446', 'ts': '\u0446',
  'Ch': '\u0427',                      'ch': '\u0447',
  'Sh': '\u0428',                      'sh': '\u0448',
  'w': '\u0429',                       'w': '\u0449',
  '""': '\u042A',                      "''": '\u044A',
  'Y': '\u042B',                       'y': '\u044B',
  '"': '\u042C',                       "'": '\u044C',
  'Je': '\u042D',                      'je': '\u044D',
  'Ju': '\u042E', 'Yu': '\u042E',      'ju': '\u044E', 'yu': '\u044E',
  'Ja': '\u042F', 'Ya': '\u042F',      'ja': '\u044F', 'ya': '\u044F'
};

Transliterator.prototype.keyListener = function(event) {
  if(event.ctrlKey || event.altKey || event.metaKey) {
    return;
  }
  var sl = this.input.scrollLeft;
  var st = this.input.scrollTop;
  var curChar = String.fromCharCode(event.which);
  var rusText = Transliterator.lookup[this.lastChar + curChar.toLowerCase()];
  if(rusText) {
    event.preventDefault();
    var ss = this.input.selectionStart;
    this.input.value = this.input.value.substring(0, this.input.selectionStart - 1) + rusText + this.input.value.substring(this.input.selectionEnd, this.input.textLength);
    this.input.selectionStart = ss;
    this.input.selectionEnd = ss;
  } else {
    rusText = Transliterator.lookup[curChar];
    if(rusText) {
      event.preventDefault();
      var ss = this.input.selectionStart;
      this.input.value = this.input.value.substring(0, this.input.selectionStart) + rusText + this.input.value.substring(this.input.selectionEnd, this.input.textLength);
      this.input.selectionStart = ss + 1;
      this.input.selectionEnd = ss + 1;
    }
  }
  if(rusText) {
    this.input.scrollLeft = sl;
    this.input.scrollTop = st;
  }
  this.lastChar = curChar;
};

Transliterator.prototype.enable = function() {
  this.input.addEventListener('keypress', this.keyListener, false);
};

Transliterator.prototype.disable = function() {
  this.input.removeEventListener('keypress', this.keyListener, false);
};
var result = document.evaluate('//input[not(@type) or @type="text"] | //textarea', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var c = 0; input = result.snapshotItem(c); c++) {
  var translit = new Transliterator(input);
  translit.enable();
  var frag = document.createDocumentFragment();
  frag.appendChild(document.createTextNode(' ['));
  var enableLink = document.createElement('a');
  enableLink.href = 'javascript:;';
  enableLink.appendChild(document.createTextNode('cyr'));
  enableLink.addEventListener('click', bind(translit.enable, translit), false);
  frag.appendChild(enableLink);
  frag.appendChild(document.createTextNode(' / '));
  var disableLink = document.createElement('a');
  disableLink.href = 'javascript:;';
  disableLink.appendChild(document.createTextNode('lat'));
  disableLink.addEventListener('click', bind(translit.disable, translit), false);
  frag.appendChild(disableLink);
  frag.appendChild(document.createTextNode('] '));
  input.parentNode.insertBefore(frag, input.nextSibling);
}
