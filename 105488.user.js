// ==UserScript==
// @name           reCAPTCHA Mailhide
// @namespace      http://userscripts.org/users/vovcacik
// @description    Protects your email address on the internet by captcha.
// @include        *
// @require        http://code.jquery.com/jquery-latest.min.js
// @require        http://www.notifier.addons.32teeth.org/js/notifier.min.js
// @require        http://slowaes.googlecode.com/svn/trunk/js/aes.js
// @require        http://slowaes.googlecode.com/svn/trunk/js/cryptoHelpers.js
// @require        http://slowaes.googlecode.com/svn/trunk/js/jsHash.js
// @require        http://plugins.jquery.com/files/jquery.field_selection.js__0.txt
// @license        Creative Commons Attribution-Share Alike http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.1
// ==/UserScript==

var publicKey = "01Kv9zQDQpGcbh2gofzvozDA==";
var privateKey = "FD32D1A537831870E25568F6A2808AA5";
var emailRegex = /.*?([A-Z0-9._%\-]+@[A-Z0-9.\-]+\.[A-Z]{2,4}).*/i;

function mailhide(email) {
    var bytesIn = cryptoHelpers.convertStringToByteArray(cryptoHelpers.encode_utf8(email));
    var mode = slowAES.modeOfOperation.CBC;
    var key= cryptoHelpers.toNumbers(privateKey);
    var iv = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var output = slowAES.encrypt(bytesIn, mode, key, iv);
    var url = "http://www.google.com/recaptcha/mailhide/d?k="+publicKey+"&c="+cryptoHelpers.base64.encode_line(output);
    return url;
}

function getSelectedText() {
    var textarea = $("textarea:focus");
    var input = $("input:focus");
    if (input.length > 0) {
        return input.getSelection().text;
    } else if (textarea.length > 0) {
        return textarea.getSelection().text;
    } else if (window.getSelection) {
        return window.getSelection();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}

function getSelectedEmail() {
    var selection = getSelectedText();
    var match = emailRegex.exec(selection);
    if (match != null) {
        return match[1];
    } else {
        return null;
    }
};

$(document).mouseup(function(){
    var email = getSelectedEmail();
    if (email != null) {
        var url = mailhide(email);
        $.notifier.broadcast({
            ttl:'<a href="' + url + '" style="color:white;font-size:10pt">' + email +'</a>', 
            msg:'<input type="text" value="' + url + '" />'
        });
    }
});
