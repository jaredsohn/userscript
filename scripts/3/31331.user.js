// ==UserScript==
// @name           Projectplaylist
// @namespace      sizzlemctwizzle
// @description    Download Songs off of Projectplaylist. Works on all songs.
// @include        *search.playlist.com*
// ==/UserScript==

function hexToChars (hex) {
          var a = new Array();
          var b = (hex.substr(0, 2) == '0x') ? 2 : 0;
          while (b < hex.length) {
            a.push(parseInt(hex.substr(b, 2), 16));
            b += 2;
          }
          return a;
}

function charsToStr (chars) {
          var a = '';
          var b = 0;
          while (b < chars.length) {
            a += String.fromCharCode(chars[b]);
            ++b;
          }
          return a;
}

function strToChars (str) {
          var a = new Array();
          var b = 0;
          while (b < str.length) {
            a.push(str.charCodeAt(b));
            ++b;
          }
          return a;
}

function initialize (pwd) {
          var a = 0;
          var b;
          var c = pwd.length;
          var d = 0;
          while (d <= 255) {
            mykey[d] = pwd[d % c];
            sbox[d] = d;
            ++d;
          }
          d = 0;
          while (d <= 255) {
            a = (a + sbox[d] + mykey[d]) % 256;
            b = sbox[d];
            sbox[d] = sbox[a];
            sbox[a] = b;
            ++d;
          }
}

function calculate (plaintxt, psw) {
          initialize(psw);
          var a = 0;
          var b = 0;
          var c = new Array();
          var d;
          var e;
          var f;
          var g = 0;
          while (g < plaintxt.length) {
            a = (a + 1) % 256;
            b = (b + sbox[a]) % 256;
            e = sbox[a];
            sbox[a] = this.sbox[b];
            sbox[b] = e;
            var h = (sbox[a] + sbox[b]) % 256;
            d = sbox[h];
            f = plaintxt[g] ^ d;
            c.push(f);
            ++g;
          }
          return c;
}

function decrypt  (src, key) {
          var plaintxt = hexToChars(src);
          var psw = strToChars(key);
          var chars = calculate(plaintxt, psw);
          return charsToStr(chars);
}

function getSongs() {
var dev = document.evaluate(
	'//a[contains(@id,"playimg")]',
	document, 
	null, 
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < dev.snapshotLength; i ++) {
item = dev.snapshotItem(i);
id = item.getAttribute('id').split('playimg')[1];
src = unsafeWindow.trackdata[id - 1].song_url;
if (src.substring(0, 4) != 'http') {
var key = 'sdf883jsdf22';
sbox = new Array(255);
mykey = new Array(255);
src = decrypt(src, key);
}
link = document.createElement('a');
link.href = src;
txt = document.createTextNode("Download");
link.appendChild(txt);
link.setAttribute('style', 'font-size:11px;');
item.parentNode.parentNode.appendChild(link);
}
}

GM_addStyle('.marklink { display:none; } ');
getSongs();