// ==UserScript==
// @name           Radit killms
// @namespace      AutoLike
// @description    Auto Like Dari radit killims
// @include        http://www.twitter.com/*
// @include        https://www.twitter.com/*
// ==/UserScript==


// npm install rem read
var rem = require('rem')
, fs = require('fs')
, read = require('read');
 
var tw = rem.connect('twitter.com', '1.1')
, oauth = rem.oauth(tw);
 
// Add whichever API keys you want to test here.
// Including the iPhone/Android apps, these keys are configured as "desktop"
// applications, and so include an OOB token you must enter manually.
tw.configure({
key: IQKbtAYlXLripLGPWd0HUA
secret: GgDYlkSvaPxGxC4X8liwpUoqKwwr3lCADbz8A7ADU
});
 
oauth.start(function(url, token, secret) {
console.log("Visit:", url);
read({
prompt: "Type in the verification code: "
}, function (err, verifier) {
oauth.complete(verifier, token, secret, authorizedRequests);
});
});
 
function authorizedRequests (err, user) {
if (err) return console.log(err);
 
user('statuses/home_timeline').get(function (err, json) {
console.log(err, json);
})
};
// ==============