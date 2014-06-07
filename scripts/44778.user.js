// ==UserScript==
// @name           Travian IGM encoder
// @namespace      
// @description    You can now encode your IGM messages so admin won't be able to read it... It's recomended to change IGM_CODE and IGM_CODE_INDEX values because if you don't change the values, someone who knows the key will be able to read the message. Reciever is only able to read the message if he's also got that script, and above specified values must be the same. It's in fact quite simple caesar's cypher, but it also flips words... apple first becomes ppael, and than encrypts.
// @include        http://s*.travian.*/nachrichten.php*
// ==/UserScript==

/** Settings **/

IGM_CODE="#$2947+#"; //define your IGM code
IGM_CODE_INDEX = 27; // Define your IGM code index between 5 and alphabet length

//Define cesar cypher alphabet
var alphabet = "abcd4567efgh;i.jABCD*EFGHI,JKLklmnUVopqrst#$&%=/uvzxywMNOPQRSTZXYW012389+-?({[]})!:";

/** No changes below **/

/** Flip and reverse word " apple -> ppael" **/
function flipWord(word) {
var len = word.length;
var len1 = parseInt(len/2);
var len2 = len-len1;

var tmp="";
for(var i=0; i<=len; i++) {
    tmp+=word.charAt(len-i);
}

word=tmp.substr(len1,len)+tmp.substr(0,len1);
return word;
}

/** Encode txt **/
function IGMEncode(txt) {

words = txt.split(' ');
for(var y=0; y<words.length; y++) {
    txt=words[y];
    var output="";
    for(var x=0; x<txt.length; x++) {
        char = txt.charAt(x);
        ind = alphabet.indexOf(char);
        if(ind==-1) output+=char;
        else {
            ind+=IGM_CODE_INDEX;
            if(ind>alphabet.length) ind-=alphabet.length;
            output+=alphabet.charAt(ind);
        }
    }
    words[y]=flipWord(output);
}
return words.join(' ');
}

/** Decode encoded txt **/
function IGMDecode(txt) {

words = txt.split(' ');
for(var y=0; y<words.length; y++) {
    txt=words[y];
    var output="";
    for(var x=0; x<txt.length; x++) {
        char = txt.charAt(x);
        
        ind = alphabet.indexOf(char);
        if(ind==-1) output+=char;
        else {
            ind-=IGM_CODE_INDEX;
            if(ind<0) ind+=alphabet.length;
            output+=alphabet.charAt(ind);
        }
    }
    words[y]=flipWord(output);
}
return words.join(' ');
}

function encodeIGM() {
	/** Encode message **/
	textarea = document.getElementsByTagName('textarea')[0];
	encoded = IGMEncode(textarea.value);
	textarea.value = IGM_CODE+encoded;

	/** Encode Topic **/
}

/** Add encode button **/
url = document.location.href;

/** Add encode button when replying **/
if(document.getElementById('igm')) {
    div = document.getElementById('lmid2');
    td = div.getElementsByTagName('td')[9];

    button = document.createElement('input');
    button.setAttribute('type','button');
    button.setAttribute('value','Kodiraj sporocilo');
    button.setAttribute('style','margin-left:5px;position:relative;top:-5px;');
    button.addEventListener('click',encodeIGM,false);
    div.appendChild(button);
}

/** Automaticaly decode message if it starts with IGM code **/
id = parseInt(url.split('?id=')[1]);
if(!isNaN(id)) {
    div = document.getElementById('lmid2');
    if(div) {
        td = div.getElementsByTagName('td')[12];
        if(td.innerHTML.substr(0,IGM_CODE.length)==IGM_CODE) {
       
        msg = HTMLspecialcharsdecode(td.innerHTML.replace(/<br>/g,"").toString());
        
        td.innerHTML=HTMLspecialchars(IGMDecode(msg.substring(IGM_CODE.length,msg.length))).replace(/\n/g,"<br>");
        }
    }
}

function HTMLspecialchars(txt) {
    return txt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function HTMLspecialcharsdecode(txt) {
    return txt.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}