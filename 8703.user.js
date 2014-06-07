// ==UserScript==
// @name          English-Malayalam Transliteration Tool
// @namespace     tag:p-suresh.port5.com,firefox
// @description   Add controls to every text input to enter either normal  English, or to transliterate to Malayalam.The code base has inspiration(read 'shameless lift') from Latin-Cyrillic (English-Russian) Transliteration Tool by Lenny Domnitser.
// ==/UserScript==

/*
(C) 2007 Suresh P.
Licensed under the GNU GPL, http://www.gnu.org/licenses/gpl.html
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
  'A': '\u0D05',  		'a': '\u0D05', 		//അ
  'AA': '\u0D06',						//ആ
  'aa': '\u0D3E',						//ാ
  'I': '\u0D07',						//ഇ
  'i': '\u0D3F',						//ി
  'II': '\u0D08',						//ഈ
  'ii': '\u0D40',						//ീ
  'U': '\u0D09',						//ഉ
  'UU' :'\u0D0A',						//ഊ
  'u': '\u0D41',						//ു
  'uu': '\u0D42',						//ൂ
  '~R': '\u0D0B',						//ഋ
  '~r': '\u0D43',						//ൃ

  '~L': '\u0D0C',						//ഌ
  'E': '\u0D0E',						//എ
  'e': '\u0D46',						//െ
  'EE': '\u0D0F',						//ഏ
  'ee': '\u0D47',						//േ
  'AI': '\u0D10',						//ഐ
  'ai': '\u0D48',						//ൈ
  'O': '\u0D12',						//ഒ
  'o': '\u0D4A',						//ൊ
  'OO': '\u0D13',						//ഓ
  'oo': '\u0D4B',						//ോ
  'AU': '\u0D14',						//ഔ
  'au': '\u0D4C',						//ൌ

  'k': '\u0D15',						//ക
  'kh': '\u0D16',						//ഖ
  'g': '\u0D17',						//ഗ
  'gh': '\u0D18',						//ഘ
  '~g': '\u0D19',						//ങ

  'c': '\u0D1A',						//ച
  'ch': '\u0D1B',						//ഛ
  'j': '\u0D1C',						//ജ
  'jh': '\u0D1D',						//ഝ
  '~j': '\u0D1E',						//ഞ

  'T': '\u0D1F',						//ട
  'Th': '\u0D20',						//ഠ
  'D': '\u0D21',						//ഡ
  'Dh': '\u0D22',						//ഢ
  'N': '\u0D23',						//ണ

  't': '\u0D24',						//ത
  'th': '\u0D25',						//ഥ
  'd': '\u0D26',						//ദ
  'dh': '\u0D27',						//ധ
  'n': '\u0D28',						//ന

  'p': '\u0D2A',						//പ
  'ph': '\u0D2B',						//ഫ
  'b': '\u0D2C',						//ബ
  'bh': '\u0D2D',						//ഭ
  'm': '\u0D2E',						//മ

  'y': '\u0D2F',						//യ
  'r': '\u0D30',						//ര
  'rh': '\u0D31',						//റ
  'l': '\u0D32',						//ല
  'lh': '\u0D33',						//ള
  'zh': '\u0D34',						//ഴ
  'v': '\u0D35',						//വ
  'S': '\u0D36',						//ശ
  'sh': '\u0D37',						//ഷ
  's': '\u0D38',						//സ
  'H': '\u0D39',						//ഹ

  'M': '\u0D02',						//ം
  'ah': '\u0D03',						//ഃ

  'x': '\u0D4D',						//്
  ']': '\u0D4D\u200D',					//് + ZWJ
  '[': '\u0D4D\u200C',					//് + ZWNJ

  'V': '\u0D4D\u0D35',					//്വ
  'Y': '\u0D4D\u0D2F',					//്യ
  'L': '\u0D4D\u0D32',					//്ല
  'R': '\u0D4D\u0D30'					//്ര
};

Transliterator.prototype.keyListener = function(event) {
  if(event.ctrlKey || event.altKey || event.metaKey) {
    return;
  }

  var sl = this.input.scrollLeft;
  var st = this.input.scrollTop;
  var curChar = String.fromCharCode(event.which);
  var malText = Transliterator.lookup[this.lastChar + curChar];
  if(malText) {
    event.preventDefault();
    var ss = this.input.selectionStart;
    this.input.value = this.input.value.substring(0, this.input.selectionStart - 1) + malText + this.input.value.substring(this.input.selectionEnd, this.input.textLength);
    this.input.selectionStart = ss;
    this.input.selectionEnd = ss;
  } else {
    malText = Transliterator.lookup[curChar];
    if(malText) {
      event.preventDefault();
      var ss = this.input.selectionStart;
      this.input.value = this.input.value.substring(0, this.input.selectionStart) + malText + this.input.value.substring(this.input.selectionEnd, this.input.textLength);
      this.input.selectionStart = this.input.textLength;
      this.input.selectionEnd = this.input.textLength;
    }
  }
  if(malText) {
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
//  translit.enable();

  var frag = document.createDocumentFragment();
  frag.appendChild(document.createTextNode(' ['));
  var enableLink = document.createElement('a');
  enableLink.href = 'javascript:;';
  enableLink.appendChild(document.createTextNode('Mal'));
  enableLink.style.color = 'red';
//  enableLink.title = 'മലയാളം';
  enableLink.setAttribute("accesskey", "M");

  frag.appendChild(enableLink);
  frag.appendChild(document.createTextNode(' / '));
  var disableLink = document.createElement('a');
  disableLink.href = 'javascript:;';
  disableLink.appendChild(document.createTextNode('Eng'));
  disableLink.style.color = 'green';
//  disableLink.title = 'ഇംഗ്ലിഷ്';
  disableLink.setAttribute("accesskey", "E");

  frag.appendChild(disableLink);
  frag.appendChild(document.createTextNode('] '));

  enableLink.addEventListener('click', function() {translit.enable(); enableLink.style.color = 'green'; disableLink.style.color = 'red'; }, false);

  disableLink.addEventListener('click', function() { translit.disable(); disableLink.style.color = 'green'; enableLink.style.color = 'red'; }, false);

  input.parentNode.insertBefore(frag, input.nextSibling);
}
