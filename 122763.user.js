// ==UserScript==
// @name          Memrise Hangul IME
// @namespace     레디트
// @description	  A Korean keyboard simulator for memrise 
// @author        sander314 @ reddit
// @include       http://www.memrise.com/*
// ==/UserScript==

// License: GNU GPL (http://www.gnu.org/licenses/gpl.html)

/// general helper functions

function elem(tag,content) {
  var ret = document.createElement(tag);
  ret.innerHTML = content;
  return ret;
}

function div(content) {
  return elem("div",content);
}

function get(id) {
  return document.getElementById(id);
}

function find(xpath,xpres) {
  var ret = document.evaluate(xpath,document,null,xpres,null);
  return  xpres == XPFirst ? ret.singleNodeValue : ret;
}
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE, XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

function trim(s) {
  return s.replace(/^\s*(.*?)\s*$/,'$1');
}


// hangul character tables in unicode order , with keyboard maps

c1_table = new Array(
  "r|ㄱ",
  "R|ㄲ",
  "s|ㄴ",
  "e|ㄷ",
  "E|ㄸ",
  "r|ㄹ",
  "a|ㅁ",
  "q|ㅂ",
  "Q|ㅃ",
  "t|ㅅ",
  "T|ㅆ",
  "d|ㅇ",
  "w|ㅈ",
  "W|ㅉ",
  "c|ㅊ",
  "z|ㅋ",
  "x|ㅌ",
  "v|ㅍ",
  "g|ㅎ"
)
v_table = new Array(
  "k|ㅏ",
  "o|ㅐ",
  "i|ㅑ",
  "O|ㅒ",
  "j|ㅓ",
  "p|ㅔ",
  "u|ㅕ",
  "P|ㅖ",
  "h|ㅗ",
  "ㅗㅏ|ㅘ", 
  "ㅗㅐ|ㅙ",
  "ㅗㅣ|ㅚ", 
  "y|ㅛ",
  "n|ㅜ",
  "ㅜㅓ|ㅝ",
  "ㅜㅔ|ㅞ",
  "ㅜㅣ|ㅟ",
  "b|ㅠ",
  "m|ㅡ",
  "ㅡㅣ|ㅢ",
  "l|ㅣ" 
)

c2_table = new Array(
  "",
  "r|ㄱ",
  "R|ㄲ",
  "ㄱㅅ|ㄳ",
  "s|ㄴ",
  "ㄴㅈ|ㄵ",
  "ㄴㅎ|ㄶ",
  "e|ㄷ",
  "f|ㄹ",
  "ㄹㄱ|ㄺ",
  "ㄹㅁ|ㄻ",
  "ㄹㅂ|ㄼ",
  "ㄹㅅ|ㄽ",
  "ㄹㅌ|ㄾ",
  "ㄹㅍ|ㄿ",
  "ㄹㅎ|ㅀ",
  "a|ㅁ",
  "q|ㅂ",
  "ㅂㅅ|ㅄ",
  "t|ㅅ",
  "T|ㅆ",
  "d|ㅇ",
  "w|ㅈ",
  "c|ㅊ",
  "z|ㅋ",
  "x|ㅌ",
  "v|ㅍ",
  "g|ㅎ"
)


function hashify(arr) {
  var h={}
  for(var i=0;i<arr.length;i++) { 
    var c=arr[i].split("|")
    h[c[0]] = c[1]
    h[c[1]] = c[1]
  }
  for(var i=0;i<arr.length;i++) { 
    var c=arr[i].split("|")
    if(h[c[0].toUpperCase()]===undefined) h[c[0].toUpperCase()] = c[1]; // when shift+key is not used, alias it
  }
  return h
}

var codehash_v  = hashify(v_table),
    codehash_c1 = hashify(c1_table),
    codehash_c2 = hashify(c2_table),
    codehash    = hashify(c1_table.concat(c2_table,v_table))

// this is where the magic happens

function codes_to_hangul(c1, v, c2) {
  return String.fromCharCode(44032 + (c1 * 21 + v) * 28 + c2)
}

function cl(arr,ch) {
  for(var i=0;i<arr.length;i++) {
    c=arr[i].split("|");
    if(c[0]==ch||c[1]==ch) return i;
  }
  alert("error, failure in character lookup " + ch + " from " + arr);
}

function hangulize(input) {
  var output=new Array(input.length);
  for(var i=0;i<input.length;i++) {
     output[i] = codehash[input[i]];
     if(output[i]===undefined) output[i]=input[i];
  }
  return output.join('');
}


function translatestr(inputtxt,outputtxt) {
  // hangulize and keep caret
  var caretS = inputtxt.selectionStart;
  var caretE = inputtxt.selectionEnd;
  inputtxt.value= hangulize(inputtxt.value);
  inputtxt.setSelectionRange(caretS,caretE)

  // parse
  var i=0;
  var is = inputtxt.value, output = [];
  while(i<is.length) {
    while(!codehash[is[i]]&&i<is.length) output.push(is[i++]) // copy other stuff, ,.!? etc
    if(i==is.length) break;

    var c1_start = i; // c1 consonant block
    while(i<is.length && codehash_v[is[i]]===undefined) i++;
    var c1_end = i-1;
    for(var j=c1_start;j<c1_end;j++) output.push(is[j]); // just copy redundant consonants ㅋㅋㅋ
    if(i==is.length) { // did not find a vowel
      output.push(is[i-1]);
      break;
    }
    // we have a vowel!
    var c1    = c1_end < c1_start ? 'ㅇ' : is[i-1]; // use ㅇ if no consonant
    var vowel = is[i];
    if(codehash_v[is[i]+is[i+1]]) {vowel += codehash_v[is[i+1]]; i++;}
    var c2 = '';
    while(codehash_c2[c2+is[i+1]]) { //0,1,2 chars for c2, 
       if(codehash_v[is[i+2]] && codehash_c1[is[i+1]]) break; // never concat consonant and auto-assume missing ㅇ
       c2+=is[i+1]; i++;
    }
//    output.push("["+c1+vowel+c2+"]") // debugging
    output.push(codes_to_hangul(cl(c1_table,c1),cl(v_table,vowel),cl(c2_table,c2))) // magic
    i++;
  }
  outputtxt.value = output.join('') // .replace(/\-/g,'') // don't remove dashes -- is this still needed ?
  return false;
}


function addHangulIME(input) {
  if(input.getAttribute('hime')==1) return;
  input.setAttribute('hime',1)
  var d = get('Korean-accent-keyboard') // memrise plans?
  // add korean keyboard image and input thing
//  d.innerHTML = '<img src="http://kpopchan.com/kr/src/131228926627.png"/><br>' // TODO: replace this - currently a hotlinked and errr. 'borrowed' image..
  d.innerHTML = '<img src="http://i.imgur.com/fOZdA.png"/><br>' 
  var hinput = elem('input',''); hinput.type='text'; hinput.style.fontSize='150%'; hinput.style.width='525px'; hinput.className="myInput"
  d.appendChild(hinput);
  hinput.addEventListener("keypress",function(){translatestr(hinput,input)} , true)
  hinput.addEventListener("keyup",function(){translatestr(hinput,input)} , true)
  hinput.addEventListener("change",function(){translatestr(hinput,input)} , true)
  translatestr(hinput,input)
  hinput.focus()
} 





window.setInterval(function(){
// disable the damn timer
  var inputs=find("//div[@class='timer']/span[@class='value']",XPList); 
  for(var j=0;j<inputs.snapshotLength;++j) { // different timers exist?
    inputs.snapshotItem(j).innerHTML='999'
  }

// hangul input on text boxes
var inputs = find("//input[@class='input text test-typing-input']",XPList);  

for(var j=0;j<inputs.snapshotLength;++j) {
  var inp = inputs.snapshotItem(j);
  if(inp.className!="myInput" && inp.clientHeight > 0) { // prevent infinite loop :o, and don't do things to hidden future questions
   //inp.addEventListener("mouseup",  toggleHangulIMEf(inp), 0); 
   addHangulIME(inp)
//   inp.style.border="1px dashed black"
 }
}

},1000)



