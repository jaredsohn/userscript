// ==UserScript==
// @name = Ryan V.
// This is a test
// ==/UserScript==
javascript:(function(){
var main = document.getElementsByTagName('div')[0];
var links = document.getElementsByTagName('div')[1];
var body = document.getElementsByTagName('body')[0];
var foot = document.getElementsByClassName('tradeindex')[0];
main.removeChild(links);
body.removeChild(foot);
document.getElementById('player_api').setAttribute('style','width:70%;height:70%;position:fixed;top:0px;left:25px;');
document.getElementById('player').setAttribute('style','width:0px;height:0px;');
document.getElementsByTagName('h2')[0].setAttribute('style','display:none;');
document.getElementsByTagName('h2')[1].setAttribute('style','display:none;');
document.getElementsByClassName('rightside')[0].setAttribute('style','display:none;');
})();