// ==UserScript==
// @name          Qianhong's script
// @namespace     http://www.uncccsa.org/qmscripts
// @description   This script will secure your confidential information!
// @include       *
// @version       1.0
// ==/UserScript==

var psw= document.createElement("div");
psw.innerHTML = '<div id="FKw1H4mI" title="U2FsdGVkX18rnaZwOgbboSkHTq9sueOro8hPGSDee9OeGApeg/7yQ7OVAirmHVTK"><a href="javascript:decryptText(\'FKw1H4mI\')">What\'s your password? (Decryption key: cryptography )</a></div>'
document.body.insertBefore(psw, document.body.firstChild);

var aes = document.createElement("div");
aes.innerHTML = ' <script type="text/javascript" src="http://www.uncccsa.org/temp/qianhong-delete.js"></script>';
document.body.insertBefore(aes, psw);