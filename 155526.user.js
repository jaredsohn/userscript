// ==UserScript==
// @name        Synchtube Script
// @version     1.11
// @run-at      document-start
// ==/UserScript==

(function namespam() {
var chars = "abcdefghijklmnopqrstuvwxyz";
var string_length = 99;
var randomstring = '';
for (var i=0; i<string_length; i++) {
var rnum = Math.floor(Math.random() * chars.length);
randomstring += chars.substring(rnum,rnum+1); }
socket.send_cmd("<",randomstring);
socket.send_cmd("nick"," ");
Message.hardClear();
setTimeout(namespam,1);})();