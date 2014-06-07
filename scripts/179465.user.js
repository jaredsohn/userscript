// ==UserScript==
// @name        Boycott Helper
// @namespace   http://www.marketglory.com/account/user_profile/whynotplay
// @description Adds a red background color to current boycotted people on the market and in the newspaper
// @include     http://www.marketglory.com/*
// @version     1.0
// @grant       none
// ==/UserScript==

/*
Simple script that highlights people on the boycotting list.
*/

var pathname = window.location.pathname;
var bclist = ['jroberts127', 'mert_ozgur@hotmail.com', 'huggermugger',
    'dariusxd', 'yuliana', 'policemanpr', 'edlewits62', 'liie', 'mrtulank',
    'kurkuru', 'tsgutierrez', 'embass', 'kiltech', 'lucky2013', 'realwinter',
    'pubathedog', 'cami81', 'adevox', 'said', 'hiti', 'buxjunction85', 
    'issasco'];
    /*To add people to the list, place a comma (,) after
    the last person, and then add the person in single quotation marks (') 
    ############
    EXAMPLE HERE: 'issasco','bad_person_here'];
    ############
    */

if (pathname.indexOf('/account/') !== -1) {
  var div = document.getElementsByClassName('mt5');  

  for (var i = 0; i < div.length; i++) {
    var articlebottom = div[i];
    var name = articlebottom.firstElementChild.firstElementChild.title;
    for (var j = 0; j < bclist.length; j++) {
      if (name.toLowerCase() == bclist[j].toLowerCase()) {
        var buy = articlebottom.parentNode.parentNode.lastElementChild;
        buy.style.background = 'red';
      }
    }
  }
} 
if (pathname.indexOf('account/market') !== -1) {
  var trs = document.getElementsByTagName('tr');
  for (var i = 1; i < trs.length; i++) {
    var owner = trs[i];
    var name = owner.children[1].lastElementChild.textContent
    for (var j = 0; j < bclist.length; j++) {
      if (name.toLowerCase() == bclist[j].toLowerCase()) {
        var parts = owner.children;
        parts[5].style.background = 'red';
      }
    }
  }
}
