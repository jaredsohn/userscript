// ==UserScript==
// @name           togetter fav all
// @revision       1
// @author         KID the Euforia a.k.a. blueberrystream
// @description    とぅぎゃられたのを全部ふぁぼる
// @namespace      http://kid0725.usamimi.info
// @include        http://togetter.com/li/*
// ==/UserScript==

void(function() {

var scriptFunctions = '';
scriptFunctions += " function replaceTgtrFavorite() { tgtr.favorite=function(elm,idx){if(userid){$.post(baseuri+'/api/addFavorite/'+index,{ idx : idx },function(text){});}else{openOAuth();}}; }";
scriptFunctions += " function allFav() { if(confirm('マジで？')){replaceTgtrFavorite(); $('.icon_favo').click();} }";
var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.innerHTML = scriptFunctions;
document.getElementsByTagName('body')[0].appendChild(script);

var button = document.createElement('button');
button.setAttribute('onclick', 'allFav();');
button.innerHTML = "全部ふぁぼる";
document.getElementById('tweet_list_head').appendChild(button);

/*
function byId(id, parent) {
  var e = parent ? parent : document;
  return e.getElementById(id);
}
function byTag(tagName, parent) {
  var e = parent ? parent : document;
  return e.getElementsByTagName(tagName);
}
function appendNewElement(element, parent) {
  var e = parent ? parent : byTag('body')[0];
  e.appendChild(element);
}*/

})();