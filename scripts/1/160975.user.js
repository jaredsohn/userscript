// ==UserScript==
// @name        cpautologin
// @namespace   http://www.gurevin.net/gmscripts
// @description Untangle Captive Portal Auto Login
// @grant       none
// @include     http://192.168.27.3/cpd/index.php*
// @include     https://192.168.27.3/cpd/index.php*
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js
// @version     1
// ==/UserScript==

var username = 'mehmetg';
var password = 'U2FsdGVkX199ZZ/+qcbxGEiBO3rkuEcEt+HMe7eWa/o='

// echo -ne "YOUR_LDAP_PASSWORD" | openssl enc -aes-256-cbc -pass pass:"YOUR_PASSPHARSE" -e -base64

window.addEventListener('load', function(){
    if (document.body.getAttribute('class').match(/captive-portal/i)) {
        document.getElementById("username").value = username;
       
        var passphrase = prompt("Enter your passphrase key");
        document.getElementById("password").value = CryptoJS.AES.decrypt(password, passphrase).toString(CryptoJS.enc.Utf8);

        authenticateUser("content");
    }
});